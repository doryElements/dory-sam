import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-list/iron-list.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/iron-scroll-threshold/iron-scroll-threshold.js';
import '@polymer/paper-progress/paper-progress.js';
import './dory-sam-card.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `dory-sam-list`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DorySamList extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
                height : 100%;
            }

            paper-fab{
                position:fixed;
                bottom : 16px;
                right:16px;
            }

            h2{
                color: var(--h2-color);
                font : 30px "Roboto";
                padding : 30px;
            }

            h4{
                color : var(--sidebar-text-color);
                text-align : center;
                font : 15px "Roboto" bold;
            }

            paper-progress {
                display: block;
                width: 95%;
                margin: 10px auto 0 auto;
            }

            paper-progress.blue {
                --paper-progress-active-color: var(--paper-light-blue-500);
                --paper-progress-secondary-color: var(--paper-light-blue-100);
            }
        </style>

        <iron-list id="list" items="[[items]]" grid="">
            <template>
                <div class="card">
                    <dory-sam-card data="[[item]]" on-tap="_openDetails"></dory-sam-card>
                    <paper-fab mini="" icon="create" on-tap="_handleEditTap"></paper-fab>
                </div>
            </template>
        </iron-list>

        <template is="dom-if" if="[[fetching]]">
            <paper-progress indeterminate="" class="blue"></paper-progress>
        </template>
`;
  }

  static get is() {
      return 'dory-sam-list';
  }

  static get properties() {
      return {
          items : {
              type : Array,
          },
          entityId: {
              type:String
          },
          fetching : {
              type : Boolean
          }
      };
  }

  _handleEditTap(e){
      let item = e.model.item;
      if(item){
          this.entityId= item.id;
          this.dispatchEvent(new CustomEvent('dory-open-editor',{detail:{id:this.entityId}}));
      }
  }

  _openDetails(e){
      let item= e.model.item;
      if(item){
          this.entityId= item.id;
          this.dispatchEvent(new CustomEvent('dory-open-details',{detail:{id:this.entityId}}));
      }
  }

  clearProgressBar(){
      this.fetching = false;
  }
}

window.customElements.define(DorySamList.is, DorySamList);
