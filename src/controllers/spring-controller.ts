import { ReactiveController, ReactiveControllerHost } from 'lit';

export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass?: number; // Optional: for element weight control
}

export class SpringController implements ReactiveController {
  private host: ReactiveControllerHost;

  // Physics state
  value: number = 1;
  target: number = 1;
  private velocity: number = 0;
  private config: SpringConfig;
  private isAnimating: boolean = false;

  constructor(
    host: ReactiveControllerHost,
    config: SpringConfig = { stiffness: 0.15, damping: 0.6 },
    initialValue: number = 1
  ) {
    (this.host = host).addController(this);
    this.config = config;
    this.value = initialValue;
    this.target = initialValue;
  }

  // Called when the component is disconnected (prevents memory leaks)
  hostDisconnected() {
    this.isAnimating = false;
  }

  setTarget(v: number) {
    this.target = v;
    if (!this.isAnimating) {
      this.isAnimating = true;
      this._animate();
    }
  }

  private _animate() {
    if (!this.isAnimating) return;

    // Spring Formula: F = -k(x) - c(v)
    const distance = this.target - this.value;
    const force = distance * this.config.stiffness;
    const mass = this.config.mass || 1;
    const acceleration = force / mass;

    this.velocity = (this.velocity + acceleration) * this.config.damping;
    this.value += this.velocity;

    this.host.requestUpdate();

    // Threshold to stop animation to save CPU
    const isStationary = Math.abs(this.velocity) < 0.0001;
    const isAtTarget = Math.abs(this.target - this.value) < 0.0001;

    if (!isStationary || !isAtTarget) {
      requestAnimationFrame(() => this._animate());
    } else {
      this.value = this.target; // Snap to final target
      this.isAnimating = false;
      this.host.requestUpdate();
    }
  }
}
