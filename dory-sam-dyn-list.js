import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `dory-sam-dyn-list`
 *
 *
 * @customElement
 * @polymer
 */
class DorySamDynList extends PolymerElement {
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

        <h4>[[title]]</h4>
        <div>
            <template is="dom-repeat" items="{{list}}" as="it">
                <paper-input value="{{it}}" label="[[labelItem]] [[_add(index,1)]]" required="" placeholder="[[placeholder]]" class\$="{{getClasses()}}">
                    <paper-icon-button slot="suffix" icon="clear" on-tap="_deleteElt"></paper-icon-button>
                </paper-input>
            </template>
            <paper-icon-button icon="add-circle-outline" on-tap="_addElt"></paper-icon-button>
        </div>
`;
  }

  static get is() { return 'dory-sam-dyn-list'; }

  static get properties() {
      return {
          list: {
              type: Array,
              value: function() { return []; }
          },
          title: {
              type: String,
          },
          placeholder:{
              type:String,
          },
          labelItem: {
              type: String,
          },
          buttonLabel: {
              type: String,
          },
          uppercase: {
              type: Boolean,
              value: false
          }
      };
  }

  getClasses() {
      if(this.uppercase){
          return 'uppercase'
      }
      else return ''
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

window.customElements.define(DorySamDynList.is, DorySamDynList);
