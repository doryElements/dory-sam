import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@vaadin/vaadin-icons/vaadin-icons.js';
/**
 * `dory-sam-card`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DorySamCard extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: inline-block;
                padding: 10px;
            }

            paper-card{
                width: 300px;
                height: 300px;
                --paper-card-header-color: var(--h4-color);
                --paper-card-header-text : {
                    text-align: center;
                }
            }

            div.card-content{
                overflow: hidden;
                height : 150px;
                text-overflow: ellipsis;
            }

            .right-ellipsis{
                background: -webkit-gradient(linear, left top, right top, from(rgba(255,255,255,0)), to(#fff));
                position : absolute;
                height : 100%;
                right : 0;
                top : 0;
                width : 70px;
            }

            h4{
                color : var(--h4-color);
                font : 14px 'Roboto';
            }

            .info{
                padding : 5px;
                overflow : hidden;
                white-space:nowrap;
            }

            #url{
                --iron-icon-fill-color: #B2EBF2;
            }
            #servers{
                --iron-icon-fill-color: #FFE0B2;
            }
            #bdds{
                --iron-icon-fill-color: #FF8A65;
            }
            span{
                position : absolute;
                margin-left : 4px;
            }
            paper-card{
                --paper-card-header: {
                    height : 70px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                };
                --paper-card-header-text: {
                    padding: 0;
                    text-align: center;
                };
            }
        </style>

        <paper-card heading="[[data.app]]">
            <div class="card-content">
                <div class="content">
                    <h4>Production</h4>
                    <div class="info">
                        <iron-icon id="url" icon="cloud"></iron-icon>
                        <span>[[data.production.urls.0]]</span>
                    </div>
                    <div class="info">
                        <iron-icon id="servers" icon="vaadin:server"></iron-icon>
                        [[servers]]
                    </div>
                    <div class="info">
                        <iron-icon id="bdds" icon="vaadin:database"></iron-icon>
                        [[bdds]]
                    </div>
                    <div class="right-ellipsis"></div>
                </div>
            </div>
        </paper-card>
`;
  }

  static get is() {
      return 'dory-sam-card';
  }

  static get properties() {
      return {
          data: {
              type: Object,
              notify : true
          },
          servers : {
              type : String,
              computed: 'computeServers(data.production.serveursDmz,data.production.serveursLan)'
          },
          bdds : {
              type : String,
              computed: 'computeDbs(data.production.bdds)'
          }
      };
  }

  computeDbs(dbs) {
      if(dbs){
          return dbs.join(' / ');
      }
      return '';
  }

  computeServers(dmz,lan){
      let res='';
      if(dmz){
          res = res+dmz.join(' / ');
          if(lan && res.length>0){
              res = res+ ' / ';
          }
      }
      if(lan){
          res = res+lan.join(' / ');
      }
      return res;
  }
}

window.customElements.define(DorySamCard.is, DorySamCard);
