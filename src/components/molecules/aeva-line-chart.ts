import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

interface ChartData {
    label: string;
    values: number[];
}

/**
 * A minimalist SVG line chart component for Aeva UI.
 *
 * @cssprop --aeva-chart-height - Height of the chart (default: 250px)
 * @cssprop --aeva-chart-grid-color - Color of horizontal grid lines
 * @cssprop --aeva-chart-text-color - Color of axis labels
 * @cssprop --aeva-chart-[1-10] - Predefined colors for chart series
 */
@customElement('aeva-line-chart')
export class AevaLineChart extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            font-family: var(--aeva-font-family, inherit);
            --chart-height: var(--aeva-chart-height, 250px);
            --grid-color: var(--aeva-chart-grid-color, rgba(128, 128, 128, 0.2));
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
            stroke-dasharray: 4 4;
        }

        .axis-label {
            fill: var(--text-color);
            font-size: 12px;
        }
        
        .axis-label.y-axis {
            text-anchor: end;
        }

        .axis-label.x-axis {
            text-anchor: middle;
        }

        .line-path {
            fill: none;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
        }

        .area-path {
            opacity: 0.15;
            stroke: none;
        }

        .data-point {
            cursor: pointer;
            transition: r 0.2s ease;
        }
        
        .data-point:hover {
            r: 8;
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
     * Fills the area under the lines
     */
    @property({ type: Boolean })
    area = false;

    // ViewBox dimensions (internal logical resolution)
    private readonly VB_WIDTH = 1000;
    private readonly VB_HEIGHT = 400;

    // Margins inside the ViewBox
    private readonly M_TOP = 20;
    private readonly M_RIGHT = 30;
    private readonly M_BOTTOM = 40;
    private readonly M_LEFT = 60;

    private readonly CHART_W = this.VB_WIDTH - this.M_LEFT - this.M_RIGHT;
    private readonly CHART_H = this.VB_HEIGHT - this.M_TOP - this.M_BOTTOM;

    private getSeriesNames(): string[] {
        if (!this.series) return [];
        return this.series.split(',').map(s => s.trim());
    }

    private parseData(): ChartData[] {
        if (!this.data) return [];
        try {
            return this.data.split(';').map(row => {
                const cols = row.split(',').map(c => c.trim());
                if (cols.length === 0 || (cols.length === 1 && cols[0] === '')) return null;
                return {
                    label: cols[0],
                    values: cols.slice(1).map(v => parseFloat(v) || 0)
                };
            }).filter(item => item !== null) as ChartData[];
        } catch (e) {
            return [];
        }
    }

    private getMaxValue(parsedData: ChartData[]): number {
        if (parsedData.length === 0) return 100;
        let max = 0;
        for (const item of parsedData) {
            for (const val of item.values) {
                if (val > max) max = val;
            }
        }
        return max === 0 ? 100 : max * 1.1; // 10% headroom
    }

    private getGridLines(maxValue: number) {
        const lines = [];
        const numLines = 5;
        for (let i = 0; i <= numLines; i++) {
            const val = (maxValue / numLines) * i;
            const y = this.M_TOP + this.CHART_H - (val / maxValue) * this.CHART_H;
            lines.push({ value: val.toFixed(0), y });
        }
        return lines;
    }

    private handlePointClick(item: ChartData, valueIndex: number, value: number) {
        const seriesNames = this.getSeriesNames();
        this.dispatchEvent(new CustomEvent('chart-click', {
            detail: {
                label: item.label,
                value: value,
                seriesIndex: valueIndex,
                seriesName: seriesNames[valueIndex] || `Series ${valueIndex + 1}`
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        const parsedData = this.parseData();
        const numDataPoints = parsedData.length;

        if (numDataPoints === 0) return html`<div class="chart-container"></div>`;

        const maxValue = this.getMaxValue(parsedData);
        const gridLines = this.getGridLines(maxValue);
        const maxSeriesCount = Math.max(...parsedData.map(d => d.values.length));
        const seriesNames = this.getSeriesNames();

        // Calculate X spacing (points exactly on intersections, unlike bars which are centered in buckets)
        const xStep = numDataPoints > 1 ? this.CHART_W / (numDataPoints - 1) : this.CHART_W / 2;

        return html`
            ${seriesNames.length > 0 ? html`
                <div class="legend-container">
                    ${seriesNames.map((name, i) => html`
                        <div class="legend-item">
                            <div class="legend-color" style="background-color: var(--c${(i % 10) + 1})"></div>
                            <span>${name}</span>
                        </div>
                    `)}
                </div>
            ` : ''}
            <div class="chart-container">
                <svg viewBox="0 0 ${this.VB_WIDTH} ${this.VB_HEIGHT}" preserveAspectRatio="none">
                    
                    <!-- Y-Axis Grid -->
                    <g class="grid">
                        ${gridLines.map(line => svg`
                            <line 
                                x1="${this.M_LEFT}" 
                                y1="${line.y}" 
                                x2="${this.M_LEFT + this.CHART_W}" 
                                y2="${line.y}" 
                                class="grid-line" 
                            />
                            <text x="${this.M_LEFT - 10}" y="${line.y + 4}" class="axis-label y-axis">
                                ${line.value}
                            </text>
                        `)}
                    </g>
                    
                    <!-- X-Axis Labels -->
                    <g class="x-labels">
                        ${parsedData.map((item, i) => {
            const x = this.M_LEFT + (numDataPoints > 1 ? i * xStep : xStep);
            return svg`
                                <text x="${x}" y="${this.M_TOP + this.CHART_H + 25}" class="axis-label x-axis">
                                    ${item.label}
                                </text>
                            `;
        })}
                    </g>

                    <!-- Lines & Points -->
                    <g class="series">
                        ${Array.from({ length: maxSeriesCount }).map((_, sIdx) => {
            const color = `var(--c${(sIdx % 10) + 1})`;

            // Build SVG Path 'd' attribute string
            let dStr = '';
            let areaStr = '';
            const points = [];

            parsedData.forEach((item, i) => {
                const val = item.values[sIdx];
                if (val === undefined) return;

                const x = this.M_LEFT + (numDataPoints > 1 ? i * xStep : xStep);
                const y = this.M_TOP + this.CHART_H - (val / maxValue) * this.CHART_H;

                if (i === 0) {
                    dStr += `M ${x},${y} `;
                } else {
                    dStr += `L ${x},${y} `;
                }

                points.push({ x, y, val, item });
            });

            if (points.length === 0) return svg``;

            if (this.area) {
                const startX = points[0].x;
                const endX = points[points.length - 1].x;
                const baseY = this.M_TOP + this.CHART_H;
                areaStr = `${dStr} L ${endX},${baseY} L ${startX},${baseY} Z`;
            }

            return svg`
                                ${this.area ? svg`<path class="area-path" d="${areaStr}" fill="${color}" />` : ''}
                                <path class="line-path" d="${dStr}" stroke="${color}" />
                                
                                <!-- Interaction Points overlayed on top -->
                                ${points.map(pt => svg`
                                    <circle 
                                        cx="${pt.x}" 
                                        cy="${pt.y}" 
                                        r="5" 
                                        fill="white" 
                                        stroke="${color}" 
                                        stroke-width="3"
                                        class="data-point"
                                        @click="${() => this.handlePointClick(pt.item, sIdx, pt.val)}"
                                    >
                                        <title>${pt.item.label}: ${pt.val}</title>
                                    </circle>
                                `)}
                            `;
        })}
                    </g>
                    
                    <!-- X-Axis Line -->
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
        'aeva-line-chart': AevaLineChart;
    }
}
