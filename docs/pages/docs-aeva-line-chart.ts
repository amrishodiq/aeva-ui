import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../src/components/atoms/aeva-card.js';
import '../../src/components/atoms/aeva-text.js';
import '../../src/components/atoms/aeva-code.js';
import '../../src/components/templates/layout/aeva-container.js';
import '../../src/components/templates/layout/aeva-stack.js';
import '../../src/components/molecules/aeva-line-chart.js';

@customElement('docs-aeva-line-chart')
export class DocsAevaLineChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding-bottom: 2rem;
    }
    
    .demo-box {
      border: 1px solid var(--aeva-surface-300);
      border-radius: var(--aeva-border-radius-lg);
      padding: 2rem;
      background: var(--aeva-surface-100);
      margin-bottom: 1rem;
    }

    .log-panel {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--aeva-surface-200);
        color: var(--aeva-text-color);
        border-radius: var(--aeva-border-radius-md);
        font-family: monospace;
        font-size: 0.875rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        color: var(--aeva-text-color);
        margin: 1rem 0;
        font-size: 0.9rem;
    }

    th {
        text-align: left;
        padding: 12px;
        border-bottom: var(--aeva-table-header-border, 2px solid rgba(255, 255, 255, 0.1));
        color: var(--aeva-table-header-color, var(--aeva-text-color));
        background: var(--aeva-table-header-bg, rgba(255, 255, 255, 0.05));
    }

    td {
        padding: 12px;
        border-bottom: var(--aeva-table-row-border, 1px solid rgba(255, 255, 255, 0.05));
    }

    code {
        font-family: 'Fira Code', monospace;
        background: var(--aeva-text-code-bg, rgba(255, 255, 255, 0.1));
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.85em;
    }
  `;

  @state()
  private clickLog: string = 'Click on any data point to see details here...';

  private handleChartClick(e: CustomEvent) {
    const { label, value, seriesName } = e.detail;
    this.clickLog = `Tapped: ${label} | Series: ${seriesName} | Value: ${value}`;
  }

  render() {
    return html`
      <aeva-doc-page title="Line Chart" description="A highly minimalist, performant, SVG-based line chart.">
        <aeva-container size="lg">
          <aeva-stack spacing="2rem">
            
            <!-- Basic Usage -->
            <section>
              <aeva-text variant="h3" weight="bold">Basic Usage</aeva-text>
              <aeva-text variant="body" color="secondary" style="margin-top: 0.5rem; margin-bottom: 1rem; display: block;">
                Pass data as a string: <code>Label, Value; Label, Value</code>. Each semicolon represents a new point in time.
              </aeva-text>
              
              <div class="demo-box">
                <aeva-line-chart 
                    data="Mon, 12; Tue, 19; Wed, 15; Thu, 25; Fri, 22" 
                    @chart-click=${this.handleChartClick}>
                </aeva-line-chart>
                <div class="log-panel">${this.clickLog}</div>
              </div>

              <aeva-code language="html">
&lt;aeva-line-chart 
  data="Mon, 12; Tue, 19; Wed, 15; Thu, 25; Fri, 22"
&gt;&lt;/aeva-line-chart&gt;
              </aeva-code>
            </section>

            <!-- Multi Series & Area -->
            <section>
              <aeva-text variant="h3" weight="bold">Multiple Series & Area</aeva-text>
              <aeva-text variant="body" color="secondary" style="margin-top: 0.5rem; margin-bottom: 1rem; display: block;">
                Add the <code>area</code> attribute to fill the space under the curve. Use <code>series</code> for the legend.
              </aeva-text>
              
              <div class="demo-box">
                <aeva-line-chart 
                    data="2020, 100, 80; 2021, 120, 95; 2022, 110, 105; 2023, 140, 115"
                    series="Revenue, Expenses"
                    area
                    @chart-click=${this.handleChartClick}>
                </aeva-line-chart>
                <div class="log-panel">${this.clickLog}</div>
              </div>

              <aeva-code language="html">
&lt;aeva-line-chart 
  data="2020, 100, 80; 2021, 120, 95; 2022, 110, 105; 2023, 140, 115"
  series="Revenue, Expenses"
  area
&gt;&lt;/aeva-line-chart&gt;
              </aeva-code>
            </section>

            <!-- Events -->
            <section>
                <aeva-text variant="h3" weight="bold">Events</aeva-text>
                <div style="overflow-x: auto;">
                  <table>
                      <thead>
                          <tr>
                              <th>Event</th>
                              <th>Detail</th>
                              <th>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code>chart-click</code></td>
                              <td><code>{ label, value, seriesIndex, seriesName }</code></td>
                              <td>Fired when a data point is clicked.</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </section>

            <!-- Properties -->
            <section>
                <aeva-text variant="h3" weight="bold">Properties</aeva-text>
                <div style="overflow-x: auto;">
                  <table>
                      <thead>
                          <tr>
                              <th>Property</th>
                              <th>Type</th>
                              <th>Default</th>
                              <th>Description</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td class="property-name">data</td>
                              <td><code>string</code></td>
                              <td><code>""</code></td>
                              <td>The data to display. Format: <code>Label, Value1, Value2; Label2, Value1, Value2</code>.</td>
                          </tr>
                          <tr>
                              <td class="property-name">series</td>
                              <td><code>string</code></td>
                              <td><code>""</code></td>
                              <td>The names of the series. Format: <code>Series1, Series2</code>.</td>
                          </tr>
                          <tr>
                              <td class="property-name">area</td>
                              <td><code>boolean</code></td>
                              <td><code>false</code></td>
                              <td>Fills the area under the line with color.</td>
                          </tr>
                          <tr>
                              <td class="property-name">smooth</td>
                              <td><code>boolean</code></td>
                              <td><code>false</code></td>
                              <td>Renders a curved (spline) line instead of a straight line.</td>
                          </tr>
                          <tr>
                              <td class="property-name">height</td>
                              <td><code>string</code></td>
                              <td><code>"250px"</code></td>
                              <td>The CSS height of the chart.</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </section>

            <!-- Customization -->
            <section>
                <aeva-text variant="h3" weight="bold">Customization</aeva-text>
                <aeva-text variant="body" color="secondary" style="margin-top: 0.5rem; margin-bottom: 1rem; display: block;">
                    You can customize the 10-color categorical palette used by all Aeva charts via standard CSS variables <code>--aeva-chart-1</code> to <code>--aeva-chart-10</code>.
                </aeva-text>
            </section>

          </aeva-stack>
        </aeva-container>
      </aeva-doc-page>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-aeva-line-chart': DocsAevaLineChart;
  }
}
