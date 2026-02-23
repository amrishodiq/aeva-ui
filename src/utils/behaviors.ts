import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * A mixin that adds a standardized 'closing' state and animated close logic to a component.
 * This is useful for modals, pages, toasts, and popups that need to wait for a CSS transition
 * before being removed from the DOM or hidden.
 */
export const WithCloseAnimation = <T extends Constructor<LitElement>>(superClass: T) => {
  class WithCloseAnimation extends superClass {
    /**
     * Whether the component is currently in the process of closing (playing animation)
     */
    @property({ type: Boolean, reflect: true })
    closing = false;

    /**
     * Closes the component after a specified delay to allow for animations.
     * @param duration - The duration of the close animation in milliseconds or a CSS variable name.
     * @param onComplete - Optional callback to execute before setting open = false.
     */
    public async closeWithAnimation(duration: number | string = 300, onComplete?: () => void) {
      const openProp = 'open' in this ? 'open' : null;

      // Ensure the 'closing' attribute is applied for CSS selection
      await new Promise((resolve) => requestAnimationFrame(resolve));
      this.closing = true;

      // Resolve duration if it's a CSS variable
      let delay = 300;
      if (typeof duration === 'number') {
        delay = duration;
      } else if (typeof duration === 'string' && duration.startsWith('--')) {
        const style = getComputedStyle(this);
        const cssVal = style.getPropertyValue(duration).trim();
        if (cssVal.endsWith('ms')) {
          delay = parseFloat(cssVal);
        } else if (cssVal.endsWith('s')) {
          delay = parseFloat(cssVal) * 1000;
        }
      }

      await new Promise((resolve) => setTimeout(resolve, delay));

      if (onComplete) {
        onComplete();
      }

      // Finalize states
      if (openProp) {
        (this as any)[openProp] = false;
      }
      this.closing = false;
    }
  }

  return WithCloseAnimation as T &
    Constructor<{
      closing: boolean;
      closeWithAnimation(duration?: number | string, onComplete?: () => void): Promise<void>;
    }>;
};
