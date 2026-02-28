import { LitElement, html, css, TemplateResult } from 'lit';
import './aeva-input.js';
import '../molecules/aeva-pagination.js';
import { customElement, property, state } from 'lit/decorators.js';

export interface TableColumn {
  key: string;
  label: string | TemplateResult;
}

/**
 * A simple table component supporting both string attributes and property binding.
 *
 * @cssprop --aeva-border-color - Border color of the table and cells
 * @cssprop --aeva-border-radius-md - Border radius of the table container
 * @cssprop --aeva-surface-color - Background color of the header and table container
 * @cssprop --aeva-surface-color-light - Slightly lighter color for header backgrounds
 * @cssprop --aeva-text-color - Normal text color
 * @cssprop --aeva-text-muted-color - Text color for header labels
 * @cssprop --aeva-hover-color - Background color when hovering over a row
 * @cssprop --aeva-font-size-sm - Font size for content
 */
@customElement('aeva-simple-table')
export class AevaSimpleTable extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .table-wrapper {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }

    .table-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
    }

    .search-input {
      width: 100%;
      max-width: 300px;
    }

    .table-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 0.5rem;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--aeva-border-color, rgba(128, 128, 128, 0.2));
      border-radius: var(--aeva-border-radius-md, 8px);
      background: var(--aeva-surface-color, rgba(128, 128, 128, 0.05));
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-family: inherit;
      color: var(--aeva-text-color, #e2e8f0);
      font-size: var(--aeva-font-size-sm, 0.875rem);
    }

    th {
      font-weight: 500;
      color: var(--aeva-text-muted-color, #64748b);
      background: var(--aeva-surface-color-light, rgba(128, 128, 128, 0.02));
      border-bottom: 2px solid var(--aeva-border-color, rgba(128, 128, 128, 0.2));
      padding: 0.75rem 1rem;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s ease, color 0.2s ease;
    }

    th:hover {
      background: var(--aeva-hover-color, rgba(128, 128, 128, 0.05));
      color: var(--aeva-text-color, inherit);
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }

    .sort-icon {
      display: inline-flex;
      align-items: center;
      opacity: 0.2;
      transition: opacity 0.2s ease, transform 0.2s ease;
      width: 1em;
      height: 1em;
    }

    th:hover .sort-icon {
        opacity: 0.6;
    }

    th.sorted .sort-icon {
      opacity: 1;
      color: var(--aeva-primary-color, #3b82f6);
    }

    th.sorted-desc .sort-icon {
      transform: rotate(180deg);
    }

    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--aeva-border-color, rgba(128, 128, 128, 0.2));
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: var(--aeva-hover-color, rgba(128, 128, 128, 0.05));
    }
  `;

  /**
   * Header definition as a comma-separated string 
   * (e.g., "#,Name,Role")
   */
  @property({ type: String }) header = '';

  /**
   * Data definition as a semicolon-separated list of comma-separated rows
   * (e.g., "1,Amri,ST;2,Naufal,ST")
   */
  @property({ type: String }) data = '';

  /**
   * JS array definition for columns. Overrides the `header` attribute.
   * Can be an array of strings or objects like { key: 'userid', label: 'User ID' }
   */
  @property({ type: Array }) columns?: Array<string | TableColumn>;

  /**
   * JS array definition for rows. Overrides the `data` attribute.
   * Can be an array of objects or an array of arrays.
   */
  @property({ type: Array }) rows?: Array<any>;

  /**
   * Enables a global search bar above the table.
   */
  @property({ type: Boolean }) searchable = false;

  /**
   * Placeholder text for the search input.
   */
  @property({ type: String }) searchPlaceholder = 'Search...';

  /**
   * Enables pagination for the table.
   */
  @property({ type: Boolean }) paginated = false;

  /**
   * Number of items to display per page when paginated is true.
   */
  @property({ type: Number, attribute: 'items-per-page' }) itemsPerPage = 10;

  @state() private sortKey?: string;
  @state() private sortDesc = false;
  @state() private searchQuery = '';
  @state() private currentPage = 1;

  private handleSort(key: string) {
    if (this.sortKey === key) {
      if (this.sortDesc) {
        this.sortKey = undefined;
        this.sortDesc = false;
      } else {
        this.sortDesc = true;
      }
    } else {
      this.sortKey = key;
      this.sortDesc = false;
    }
    this.currentPage = 1; // Reset to page 1 on sort
  }

  private handleSearchInput(e: Event) {
    this.searchQuery = (e.target as HTMLInputElement).value;
    this.currentPage = 1; // Reset to page 1 on search
  }

  private handlePageChange(e: CustomEvent) {
    this.currentPage = e.detail.page;
  }

  get computedColumns() {
    if (this.columns && this.columns.length > 0) {
      return this.columns;
    }
    if (this.header) {
      return this.header.split(',').map((h) => h.trim());
    }
    return [];
  }

  get computedRows() {
    let rows: any[] = [];
    if (this.rows && this.rows.length > 0) {
      rows = [...this.rows];
    } else if (this.data) {
      rows = this.data.split(';').map((row) => row.split(',').map((cell) => cell.trim()));
    }

    // Apply filtering first
    if (this.searchQuery && rows.length > 0) {
      const query = this.searchQuery.toLowerCase();
      const isObjectArray = typeof rows[0] === 'object' && !Array.isArray(rows[0]);

      rows = rows.filter(row => {
        if (isObjectArray) {
          return Object.values(row).some(val =>
            String(val).toLowerCase().includes(query)
          );
        } else {
          return row.some((val: any) =>
            String(val).toLowerCase().includes(query)
          );
        }
      });
    }

    // Then apply sorting
    if (this.sortKey && rows.length > 0) {
      const isObjectArray = typeof rows[0] === 'object' && !Array.isArray(rows[0]);
      let sortIndex = -1;

      if (!isObjectArray) {
        const cols = this.computedColumns;
        sortIndex = cols.findIndex(c => {
          const k = typeof c === 'string' ? c.toLowerCase().replace(/\s+/g, '') : c.key;
          return k === this.sortKey;
        });
      }

      rows.sort((a, b) => {
        let valA = isObjectArray ? a[this.sortKey!] : a[sortIndex];
        let valB = isObjectArray ? b[this.sortKey!] : b[sortIndex];

        if (typeof valA === 'string' && typeof valB === 'string') {
          const numA = Number(valA);
          const numB = Number(valB);
          if (!isNaN(numA) && !isNaN(numB)) {
            return this.sortDesc ? numB - numA : numA - numB;
          }
          return this.sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
        }

        if (valA < valB) return this.sortDesc ? 1 : -1;
        if (valA > valB) return this.sortDesc ? -1 : 1;
        return 0;
      });
    }

    return rows;
  }

  renderHeaderCell(col: string | TableColumn) {
    const label = typeof col === 'string' ? col : col.label;
    const key = typeof col === 'string' ? col.toLowerCase().replace(/\s+/g, '') : col.key;

    const isSorted = this.sortKey === key;
    const sortIcon = html`<svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5l0 14M19 12l-7-7-7 7"/>
        </svg>`;

    let classes = '';
    if (isSorted) {
      classes = 'sorted';
      if (this.sortDesc) classes += ' sorted-desc';
    }

    return html`<th class="${classes}" @click="${() => this.handleSort(key)}">
            <div class="header-content">
                <span>${label}</span>
                ${sortIcon}
            </div>
        </th>`;
  }

  renderRow(row: any, cols: Array<string | TableColumn>) {
    // Handling array of arrays
    if (Array.isArray(row)) {
      return html`<tr>${row.map(cell => html`<td>${cell}</td>`)}</tr>`;
    }

    // Handling array of objects
    if (typeof row === 'object' && row !== null) {
      return html`
        <tr>
          ${cols.map(col => {
        const key = typeof col === 'string' ? col.toLowerCase().replace(/\s+/g, '') : col.key;
        return html`<td>${row[key]}</td>`;
      })}
        </tr>
      `;
    }
    return html``;
  }

  render() {
    const cols = this.computedColumns;
    const rows = this.computedRows;

    if (cols.length === 0 && rows.length === 0) {
      return html``;
    }

    let displayRows = rows;

    // Apply pagination
    if (this.paginated) {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      displayRows = rows.slice(startIndex, startIndex + this.itemsPerPage);
    }

    const searchIcon = html`<svg slot="prefix" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>`;

    return html`
      <div class="table-wrapper">
        ${this.searchable ? html`
            <div class="table-header">
                <aeva-input 
                    class="search-input"
                    placeholder="${this.searchPlaceholder}"
                    .value="${this.searchQuery}"
                    @input="${this.handleSearchInput}"
                >
                    ${searchIcon}
                </aeva-input>
            </div>
        ` : ''}
        <div class="table-container">
          <table>
            <thead>
              <tr>
                ${cols.map(col => this.renderHeaderCell(col))}
              </tr>
            </thead>
            <tbody>
              ${displayRows.map((row: any) => this.renderRow(row, cols))}
            </tbody>
          </table>
        </div>
        ${this.paginated && rows.length > this.itemsPerPage ? html`
            <div class="table-footer">
                <aeva-pagination
                    .total="${rows.length}"
                    .current="${this.currentPage}"
                    page-size="${this.itemsPerPage}"
                    @change="${this.handlePageChange}"
                ></aeva-pagination>
            </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'aeva-simple-table': AevaSimpleTable;
  }
}
