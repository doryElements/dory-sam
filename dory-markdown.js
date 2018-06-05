import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/marked-element/marked-element.js';
/**
 * `dory-markdown`
 *
 *
 * @customElement
 * @polymer
 */
class DoryMarkdown extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }
        </style>
        <marked-element markdown="[[value]]">
            <div slot="markdown-html" class="markdown-html custom"></div>
        </marked-element>
`;
  }

  static get is() {
      return 'dory-markdown';
  }

  static get properties() {
      return {
          value: {
              type: String
          }
      };
  }
}

window.customElements.define(DoryMarkdown.is, DoryMarkdown);
