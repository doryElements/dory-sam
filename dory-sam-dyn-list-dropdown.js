import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
/**
 * `dory-sam-dyn-list-dropdown`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DorySamDynListDropdown extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }

            paper-input{
                display : inline-block;
                width : 40%;
                min-width: 300px;
                padding : 10px;
            }
            h4 {
                color: var(--h4-color);
            }

            paper-input.uppercase {
                --paper-input-container-input: {
                    text-transform:uppercase;
                }
            }
        </style>

        <template is="dom-repeat" items="{{list}}" as="it">

            <paper-dropdown-menu value="{{it}}" label="[[labelItem]] [[_add(index,1)]]">
                <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{it}}">

                    <template is="dom-repeat" items="{{options}}" as="option">
                        <paper-item value="{{option}}">{{option}}</paper-item>
                    </template>

                </paper-listbox>
            </paper-dropdown-menu>
            <paper-icon-button icon="clear" on-tap="_deleteElt"></paper-icon-button>

        </template>
        <paper-icon-button icon="add-circle-outline" on-tap="_addElt"></paper-icon-button>
`;
  }

  static get is() {
      return 'dory-sam-dyn-list-dropdown';
  }

  static get properties() {
      return {
          list: {
              type: Array,
              value: function() { return []; }
          },
          options: {
              type: Array,
              notify: true
          },
          labelItem: {
              type: String,
          }
      };
  }

  _addElt() {
      if(!this.list) {
          this.set('list', []);
      }
      this.push('list','');
  }

  _deleteElt(e) {
      let index = e.model.index;
      this.splice('list', index, 1);
  }

  _add(op1, op2) {
      return op1 + op2;
  }
}

window.customElements.define(DorySamDynListDropdown.is, DorySamDynListDropdown);
