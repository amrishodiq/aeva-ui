import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '../../src/components/atoms/aeva-card.js';
import '../../src/components/atoms/aeva-text.js';
import '../../src/components/atoms/aeva-code.js';
import '../../src/components/templates/layout/aeva-container.js';
import '../../src/components/templates/layout/aeva-stack.js';
import '../../src/components/templates/layout/aeva-grid.js';
import '../../src/components/templates/layout/aeva-grid-item.js';
import '../../src/components/molecules/aeva-bar-chart.js';

@customElement('docs-aeva-bar-chart')
export class DocsAevaBarChart extends LitElement {
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
  private clickLog: string = 'Click on any bar to see details here...';

  private handleChartClick(e: CustomEvent) {
    const { label, value, seriesName } = e.detail;
    this.clickLog = `Tapped: ${label} | Series: ${seriesName} | Value: ${value}`;
  }

  render() {
    return html`
      <aeva-doc-page title="Bar Chart" description="A highly minimalist, performant, SVG-based bar chart.">
        <aeva-container size="lg">
          <aeva-stack spacing="2rem">
            
            <!-- Intro -->
            <section>
              <aeva-text variant="h2" weight="bold">Overview</aeva-text>
              <aeva-text variant="body" color="secondary" style="margin-top: 0.5rem; display: block;">
                The <code>&lt;aeva-bar-chart&gt;</code> is designed for maximum developer experience. 
                Instead of passing complex JSON objects, you simply pass a delimited string.
                It automatically uses the beautiful built-in 10-color palette of Aeva UI.
              </aeva-text>
            </section>

            <!-- Basic Usage -->
            <section>
              <aeva-text variant="h3" weight="bold">Basic Usage</aeva-text>
              <aeva-text variant="body" color="secondary" style="margin-top: 0.5rem; margin-bottom: 1rem; display: block;">
                Pass data as a string: <code>Label, Value; Label, Value</code>. Each semicolon represents a new row.
              </aeva-text>
              
              <div class="demo-box">
                <aeva-bar-chart 
                    data="Jan, 40; Feb, 60; Mar, 80; Apr, 55; May, 90" 
                    @chart-click=${this.handleChartClick}>
                </aeva-bar-chart>
                <div class="log-panel">${this.clickLog}</div>
              </div>

              <aeva-code language="html">
&lt;aeva-bar-chart 
  data="Jan, 40; Feb, 60; Mar, 80; Apr, 55; May, 90"
  @chart-click="console.log"
&gt;&lt;/aeva-bar-chart&gt;
              </aeva-code>
            </section>

            <!-- Grouped (Multi Series) -->
            <section>
              <aeva-text variant="h3" weight="bold">Multiple Series (Grouped)</aeva-text>
              <aeva-text variant="body" color="secondary" style="margin-top: 0.5rem; margin-bottom: 1rem; display: block;">
                Add more comma-separated values for multiple series. Use the <code>series</code> attribute to define legend names.
              </aeva-text>
              
              <div class="demo-box">
                <aeva-bar-chart 
                    data="2020, 120, 80, 50; 2021, 150, 100, 70; 2022, 110, 140, 90" 
                    series="Sales, Marketing, R&D"
                    @chart-click=${this.handleChartClick}>
                </aeva-bar-chart>
                <div class="log-panel">${this.clickLog}</div>
              </div>

              <aeva-code language="html">
&lt;aeva-bar-chart 
  data="2020, 120, 80, 50; 2021, 150, 100, 70; 2022, 110, 140, 90" 
  series="Sales, Marketing, R&D"
&gt;&lt;/aeva-bar-chart&gt;
              </aeva-code>
            </section>

            <!-- Stacked -->
            <section>
              <aeva-text variant="h3" weight="bold">Stacked Bar</aeva-text>
              <aeva-text variant="body" color="secondary" style="margin-top: 0.5rem; margin-bottom: 1rem; display: block;">
                Add the <code>stacked</code> attribute to stack the multi-series data visually.
              </aeva-text>
              
              <div class="demo-box">
                <aeva-bar-chart 
                    data="Q1, 30, 40, 20; Q2, 50, 20, 30; Q3, 60, 50, 40; Q4, 70, 80, 60" 
                    series="Direct, Organic, Referral"
                    stacked
                    @chart-click=${this.handleChartClick}>
                </aeva-bar-chart>
                <div class="log-panel">${this.clickLog}</div>
              </div>

              <aeva-code language="html">
&lt;aeva-bar-chart 
  data="Q1, 30, 40, 20; Q2, 50, 20, 30; Q3, 60, 50, 40; Q4, 70, 80, 60" 
  series="Direct, Organic, Referral"
  stacked
&gt;&lt;/aeva-bar-chart&gt;
              </aeva-code>
            </section>

            <!-- Events -->
            <section>
                <aeva-text variant="h3" weight="bold">Events</aeva-text>
                <aeva-text variant="body" color="secondary" style="margin-top: 0.5rem; margin-bottom: 1rem; display: block;">
                    The component emits a <code>chart-click</code> event containing details about the tapped area.
                </aeva-text>
                
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
                              <td>Fired when a bar is clicked.</td>
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
                              <td class="property-name">stacked</td>
                              <td><code>boolean</code></td>
                              <td><code>false</code></td>
                              <td>When true, renders the bar chart as a stacked chart instead of a grouped chart.</td>
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
                    You can customize the 10-color categorical palette used by all Aeva charts:
                </aeva-text>
                <div style="overflow-x: auto;">
                  <table>
                      <thead>
                          <tr>
                              <th>CSS Variable</th>
                              <th>Description</th>
                              <th>Default</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><code>--aeva-chart-1</code></td>
                              <td>Data Series 1 color</td>
                              <td><code>#667eea</code></td>
                          </tr>
                          <tr>
                              <td><code>--aeva-chart-2</code></td>
                              <td>Data Series 2 color</td>
                              <td><code>#764ba2</code></td>
                          </tr>
                          <tr>
                              <td><code>--aeva-chart-3</code></td>
                              <td>Data Series 3 color</td>
                              <td><code>#10b981</code></td>
                          </tr>
                          <tr>
                              <td><code>--aeva-chart-4</code></td>
                              <td>Data Series 4 color</td>
                              <td><code>#f59e0b</code></td>
                          </tr>
                          <tr>
                              <td><code>--aeva-chart-5</code></td>
                              <td>Data Series 5 color</td>
                              <td><code>#ef4444</code></td>
                          </tr>
                          <tr>
                              <td><code>--aeva-chart-6</code></td>
                              <td>Data Series 6 color</td>
                              <td><code>#06b6d4</code></td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </section>

          </aeva-stack>
        </aeva-container>
      </aeva-doc-page>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'docs-aeva-bar-chart': DocsAevaBarChart;
  }
}
