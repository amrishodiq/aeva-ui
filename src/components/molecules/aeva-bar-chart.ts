import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ChartData {
  label: string;
  values: number[];
}

/**
 * A minimalist SVG bar chart component for Aeva UI.
 *
 * @cssprop --aeva-chart-height - Height of the chart (default: 250px)
 * @cssprop --aeva-chart-grid-color - Color of horizontal grid lines
 * @cssprop --aeva-chart-text-color - Color of axis labels
 * @cssprop --aeva-chart-[1-10] - Predefined colors for chart series
 */
@customElement('aeva-bar-chart')
export class AevaBarChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--aeva-font-family, inherit);
      --chart-height: var(--aeva-chart-height, 250px);
      --grid-color: var(--aeva-chart-grid-color, rgba(128, 128, 128, 0.2));
      --text-color: var(--aeva-chart-text-color, #777);

      /* Built-in default palette fallback */
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

    .chart-container {
      width: 100%;
      height: var(--chart-height);
      position: relative;
    }

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .grid-line {
      stroke: var(--grid-color);
      stroke-width: 1;
      /* Dash array to make slightly dotted/dashed grid lines if desired */
      stroke-dasharray: 4 4;
    }

    .axis-label {
      fill: var(--text-color);
      font-size: 12px;
      /* alignment-baseline: middle; */
    }

    .axis-label.y-axis {
      text-anchor: end;
    }

    .axis-label.x-axis {
      text-anchor: middle;
    }

    .bar {
      transition:
        height 0.3s ease,
        y 0.3s ease;
      cursor: pointer;
    }

    .bar:hover {
      opacity: 0.8;
    }

    .legend-container {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
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
      border-radius: 2px;
    }
  `;

  /**
   * CSV-style string: "Label, val1, val2; Label2, val1, val2"
   */
  @property({ type: String })
  data = '';

  /**
   * Optional comma-separated series names for legend: "Sales, Profit"
   */
  @property({ type: String })
  series = '';

  /**
   * Stack bars instead of grouping them side-by-side
   */
  @property({ type: Boolean })
  stacked = false;

  // ViewBox dimensions (internal logical resolution)
  private readonly VB_WIDTH = 1000;
  private readonly VB_HEIGHT = 400;

  // Margins inside the ViewBox
  private readonly M_TOP = 20;
  private readonly M_RIGHT = 20;
  private readonly M_BOTTOM = 40;
  private readonly M_LEFT = 60; // Space for Y-Axis labels

  // Usable chart area
  private readonly CHART_W = this.VB_WIDTH - this.M_LEFT - this.M_RIGHT;
  private readonly CHART_H = this.VB_HEIGHT - this.M_TOP - this.M_BOTTOM;

  private getSeriesNames(): string[] {
    if (!this.series) return [];
    return this.series.split(',').map((s) => s.trim());
  }

  private parseData(): ChartData[] {
    if (!this.data) return [];

    try {
      return this.data
        .split(';')
        .map((row) => {
          const cols = row.split(',').map((c) => c.trim());
          // Note: Ignoring empty rows
          if (cols.length === 0 || (cols.length === 1 && cols[0] === '')) return null;

          return {
            label: cols[0],
            values: cols.slice(1).map((v) => parseFloat(v) || 0),
          };
        })
        .filter((item) => item !== null) as ChartData[];
    } catch (e) {
      console.error('AevaBarChart: Failed to parse data string', e);
      return [];
    }
  }

  private getMaxValue(parsedData: ChartData[]): number {
    if (parsedData.length === 0) return 100;

    let max = 0;
    for (const item of parsedData) {
      if (this.stacked) {
        // For stacked, find the max sum of a row
        const sum = item.values.reduce((a, b) => a + (b > 0 ? b : 0), 0);
        if (sum > max) max = sum;
      } else {
        // For grouped, find the absolute max value among all numbers
        for (const val of item.values) {
          if (val > max) max = val;
        }
      }
    }

    // Add 10% headroom, handle 0 case
    return max === 0 ? 100 : max * 1.1;
  }

  private getGridLines(maxValue: number) {
    // Simple logic to generate 5 horizontal grid lines
    const lines = [];
    const numLines = 5;
    for (let i = 0; i <= numLines; i++) {
      const val = (maxValue / numLines) * i;
      // Calculate Y position (inverted because SVG 0,0 is top-left)
      const y = this.M_TOP + this.CHART_H - (val / maxValue) * this.CHART_H;
      lines.push({ value: val.toFixed(0), y });
    }
    return lines;
  }

  private handleBarClick(item: ChartData, valueIndex: number, value: number) {
    const seriesNames = this.getSeriesNames();
    this.dispatchEvent(
      new CustomEvent('chart-click', {
        detail: {
          label: item.label,
          value: value,
          seriesIndex: valueIndex,
          seriesName: seriesNames[valueIndex] || `Series ${valueIndex + 1}`,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private renderLegend() {
    const seriesNames = this.getSeriesNames();
    if (seriesNames.length === 0) return '';

    return html`
      <div class="legend-container">
        ${seriesNames.map(
          (name, i) => html`
            <div class="legend-item">
              <div class="legend-color" style="background-color: var(--c${(i % 10) + 1})"></div>
              <span>${name}</span>
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    const parsedData = this.parseData();
    const numDataPoints = parsedData.length;

    if (numDataPoints === 0) {
      return html`<div
        class="chart-container"
        style="display:flex;align-items:center;justify-content:center;color:var(--text-color)"
      >
        No data available
      </div>`;
    }

    const maxValue = this.getMaxValue(parsedData);
    const gridLines = this.getGridLines(maxValue);

    // Calculate widths
    const groupWidth = this.CHART_W / numDataPoints;
    const availableGroupWidth = groupWidth * 0.8; // 80% occupied, 20% gap between groups
    const maxSeriesCount = Math.max(...parsedData.map((d) => d.values.length));

    return html`
      ${this.renderLegend()}
      <div class="chart-container">
        <svg viewBox="0 0 ${this.VB_WIDTH} ${this.VB_HEIGHT}" preserveAspectRatio="none">
          <!-- Y-Axis Grid Lines -->
          <g class="grid">
            ${gridLines.map(
              (line) => svg`
                            <line 
                                x1="${this.M_LEFT}" 
                                y1="${line.y}" 
                                x2="${this.M_LEFT + this.CHART_W}" 
                                y2="${line.y}" 
                                class="grid-line" 
                            />
                            <text 
                                x="${this.M_LEFT - 10}" 
                                y="${line.y + 4}" 
                                class="axis-label y-axis"
                            >
                                ${line.value}
                            </text>
                        `
            )}
          </g>

          <!-- Data Bars -->
          <g class="bars">
            ${parsedData.map((item, i) => {
              const groupX = this.M_LEFT + i * groupWidth + (groupWidth - availableGroupWidth) / 2;

              // X-Axis Text Label
              const labelEl = svg`
                                <text 
                                    x="${groupX + availableGroupWidth / 2}" 
                                    y="${this.M_TOP + this.CHART_H + 25}" 
                                    class="axis-label x-axis"
                                >
                                    ${item.label}
                                </text>
                            `;

              let bars = [];

              if (this.stacked) {
                // Stacked Bars
                let currentYOffset = 0;
                bars = item.values.map((val, valIdx) => {
                  if (val <= 0) return svg``; // Ignore negative for simple stacked

                  const barH = (val / maxValue) * this.CHART_H;
                  const barY = this.M_TOP + this.CHART_H - barH - currentYOffset;
                  currentYOffset += barH; // Accumulate offset for next bar

                  return svg`
                                        <rect 
                                            x="${groupX}" 
                                            y="${barY}" 
                                            width="${availableGroupWidth}" 
                                            height="${barH}" 
                                            fill="var(--c${(valIdx % 10) + 1})"
                                            class="bar"
                                            rx="2"
                                            @click="${() => this.handleBarClick(item, valIdx, val)}"
                                        >
                                            <title>${item.label}: ${val}</title>
                                        </rect>
                                    `;
                });
              } else {
                // Grouped Bars (Side-by-side)
                const singleBarW = availableGroupWidth / maxSeriesCount;

                bars = item.values.map((val, valIdx) => {
                  const barH = (Math.max(0, val) / maxValue) * this.CHART_H; // Prevent negative height errors
                  const barY = this.M_TOP + this.CHART_H - barH;
                  const barX = groupX + valIdx * singleBarW;

                  // Add slight inner gap between grouped bars
                  const innerGap = 2;
                  const finalBarW = Math.max(1, singleBarW - innerGap);

                  return svg`
                                        <rect 
                                            x="${barX}" 
                                            y="${barY}" 
                                            width="${finalBarW}" 
                                            height="${barH}" 
                                            fill="var(--c${(valIdx % 10) + 1})"
                                            class="bar"
                                            rx="2"
                                            @click="${() => this.handleBarClick(item, valIdx, val)}"
                                        >
                                            <title>${item.label}: ${val}</title>
                                        </rect>
                                    `;
                });
              }

              return svg`${labelEl}${bars}`;
            })}
          </g>

          <!-- X-Axis Line (Bottom border) -->
          <line
            x1="${this.M_LEFT}"
            y1="${this.M_TOP + this.CHART_H}"
            x2="${this.M_LEFT + this.CHART_W}"
            y2="${this.M_TOP + this.CHART_H}"
            stroke="var(--grid-color)"
            stroke-width="2"
          />
        </svg>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-bar-chart': AevaBarChart;
  }
}
