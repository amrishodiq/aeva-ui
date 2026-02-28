import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ChartData {
  label: string;
  values: number[]; // Doughnut only uses the first value
}

/**
 * A minimalist SVG doughnut chart component for Aeva UI.
 *
 * @cssprop --aeva-chart-size - Width/Height of the chart (default: 300px)
 * @cssprop --aeva-chart-cutout - How thick the doughnut is (default: 65%)
 * @cssprop --aeva-chart-text-color - Color of legend labels
 * @cssprop --aeva-chart-[1-10] - Predefined colors for chart slices
 */
@customElement('aeva-doughnut-chart')
export class AevaDoughnutChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--aeva-font-family, inherit);
      --chart-size: var(--aeva-chart-size, 300px);
      --chart-cutout: var(--aeva-chart-cutout, 65%);
      --text-color: var(--aeva-chart-text-color, #777);

      --c1: var(--aeva-chart-1, #3b82f6);
      --c2: var(--aeva-chart-2, #10b981);
      --c3: var(--aeva-chart-3, #f59e0b);
      --c4: var(--aeva-chart-4, #ef4444);
      --c5: var(--aeva-chart-5, #8b5cf6);
      --c6: var(--aeva-chart-6, #ec4899);
      --c7: var(--aeva-chart-7, #06b6d4);
      --c8: var(--aeva-chart-8, #f97316);
      --c9: var(--aeva-chart-9, #64748b);
      --c10: var(--aeva-chart-10, #84cc16);
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .chart-wrapper {
      width: var(--chart-size);
      height: var(--chart-size);
      position: relative;
    }

    svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg); /* Start from top (12 o'clock) */
      overflow: visible;
    }

    .doughnut-slice {
      fill: none;
      cursor: pointer;
      transition:
        stroke-width 0.2s ease,
        opacity 0.2s ease;
    }

    .doughnut-slice:hover {
      opacity: 0.8;
      /* Stroke width increases slightly on hover, handled in render loop */
    }

    .legend-container {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 24px;
      justify-content: center;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-color);
    }

    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  `;

  /**
   * CSV-style string: "Label, value; Label2, value"
   */
  @property({ type: String })
  data = '';

  private parseData(): ChartData[] {
    if (!this.data) return [];
    try {
      return this.data
        .split(';')
        .map((row) => {
          const cols = row.split(',').map((c) => c.trim());
          if (cols.length === 0 || (cols.length === 1 && cols[0] === '')) return null;
          return {
            label: cols[0],
            values: cols.slice(1).map((v) => parseFloat(v) || 0),
          };
        })
        .filter((item) => item !== null) as ChartData[];
    } catch (e) {
      return [];
    }
  }

  private handleSliceClick(item: ChartData, value: number) {
    this.dispatchEvent(
      new CustomEvent('chart-click', {
        detail: {
          label: item.label,
          value: value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const parsedData = this.parseData();
    if (parsedData.length === 0) return html`<div>No data available</div>`;

    // Doughnut logic (using stroke-dasharray approach)
    // SVG circle with radius 25 -> circumference = 2 * PI * 25 ≈ 157.08
    const radius = 25;
    const circumference = 2 * Math.PI * radius;

    // Sum total values
    const totalValue = parsedData.reduce((sum, item) => sum + Math.max(0, item.values[0] || 0), 0);

    // Dashoffset starts at 0, negative offsets shift the dash forward around the circle
    let currentOffset = 0;

    return html`
      <div class="container">
        <div class="chart-wrapper">
          <!-- viewBox 0 0 100 100 means center is 50, 50 -->
          <svg viewBox="0 0 100 100">
            <!-- Background track (optional) -->
            <circle
              cx="50"
              cy="50"
              r="${radius}"
              fill="none"
              class="doughnut-slice"
              stroke="transparent"
              stroke-width="15"
            />

            ${parsedData.map((item, i) => {
              const val = Math.max(0, item.values[0] || 0);
              if (val === 0) return svg``;

              const slicePercentage = val / totalValue;
              const dashLength = slicePercentage * circumference;

              // To create the slice, dash array is "dashLength, circumference"
              const strokeDasharray = `${dashLength} ${circumference}`;

              // The offset pushes the dash to start where the previous one left off
              // Stroke dash offset goes backwards (closer to 0 fills more clockwise)
              const strokeDashoffset = currentOffset;

              currentOffset -= dashLength; // Update offset for next slice

              return svg`
                                <circle
                                    cx="50" cy="50" r="${radius}"
                                    fill="none"
                                    stroke="var(--c${(i % 10) + 1})"
                                    stroke-width="15"
                                    stroke-dasharray="${strokeDasharray}"
                                    stroke-dashoffset="${strokeDashoffset}"
                                    class="doughnut-slice"
                                    @click="${() => this.handleSliceClick(item, val)}"
                                >
                                    <title>${item.label}: ${val}</title>
                                </circle>
                            `;
            })}
          </svg>
        </div>

        <div class="legend-container">
          ${parsedData.map(
            (item, i) => html`
              <div class="legend-item">
                <div class="legend-color" style="background-color: var(--c${(i % 10) + 1})"></div>
                <span>${item.label} (${item.values[0] || 0})</span>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-doughnut-chart': AevaDoughnutChart;
  }
}
