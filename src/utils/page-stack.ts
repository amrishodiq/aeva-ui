import { ReactiveController, ReactiveElement } from 'lit';

export interface PageElement extends ReactiveElement {
    open: boolean;
    disableHistory: boolean;
    close(fromPopState?: boolean): Promise<void>;
    show(): void;
}

/**
 * A module and Reactive Controller that manages the active page stack.
 * Adheres to SOLID by isolating stack memory and browser history interaction into this controller.
 * It ensures the component closes when the user clicks the browser back button,
 * solving overlapping popstate issues by associating instances with unique history states.
 */
class PageStackManager {
    private stack: PageElement[] = [];

    push(page: PageElement) {
        if (!this.stack.includes(page)) {
            this.stack.push(page);
        }
    }

    remove(page: PageElement) {
        const index = this.stack.indexOf(page);
        if (index > -1) {
            this.stack.splice(index, 1);
        }
    }

    isTop(page: PageElement): boolean {
        if (this.stack.length === 0) return false;
        return this.stack[this.stack.length - 1] === page;
    }

    isFirst(page: PageElement): boolean {
        if (this.stack.length === 0) return false;
        return this.stack[0] === page;
    }
}

// Module pattern singleton
export const globalPageStack = new PageStackManager();

export class PageStackController implements ReactiveController {
    private stateId: string = '';

    constructor(private host: PageElement) {
        this.host.addController(this);
    }

    hostConnected() {
        window.addEventListener('popstate', this.handlePopState);
    }

    hostDisconnected() {
        window.removeEventListener('popstate', this.handlePopState);
        globalPageStack.remove(this.host);
    }

    /**
     * Called when the component opens. Pushes a new state to the browser history
     * and registers the page in the global stack.
     */
    register() {
        globalPageStack.push(this.host);

        if (this.host.disableHistory) return;

        // Check if we're already in the correct state (e.g., from forward navigation)
        if (window.history.state?.aevaPageId === this.stateId && this.stateId !== '') {
            return; // State is already active
        }

        // Generate a unique identifier for this instance's open state
        this.stateId = Date.now().toString(36) + Math.random().toString(36).substring(2);
        window.history.pushState({ aevaPageId: this.stateId }, '');
    }

    /**
     * Called when the component closes. Removes it from the global stack.
     */
    unregister() {
        globalPageStack.remove(this.host);
    }

    /**
     * Handles the popstate event fired by the browser back/forward buttons.
     */
    private handlePopState = (e: PopStateEvent) => {
        if (this.host.disableHistory) return;

        const currentHistoryId = e.state?.aevaPageId;

        if (currentHistoryId === this.stateId) {
            // Returned to this component's exact history state (e.g., Forward navigation)
            if (!this.host.open) {
                this.host.show();
            }
        } else {
            // We left this component's active history state (e.g., Back navigation to previous page)
            // If we are currently open, that means it's time to close us.
            // Additionally, we check if we are the top-most page to ensure we only close one modal at a time.
            if (this.host.open && globalPageStack.isTop(this.host)) {
                // Close but intercept history.back() since the state has already been popped.
                this.host.close(true);
            }
        }
    };
}
