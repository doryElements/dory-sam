import { html,  PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/iron-pages/iron-pages.js';

import '@bower_components/air-cruddy/air-cruddy-mixin.js';

import './dory-sam-card-details-tab.js';
import './dory-markdown.js';

//import '@bower_components/tags-input/tags-input.html';

/**
 * `dory-sam-card-details`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DorySamCardDetails extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
                --details-label-color : #D7CCC8;
                --details-h2-color :#80CBC4;
                --details-h3-color :#FFAB40 ;
                --dory-background-color : #EFEBE9;
            }
            label{
                color: var(--details-label-color);
            }
            h2{
                color: var(--details-h2-color);
                text-align: center;
                padding : 20px;
            }
            h3{
                color: var(--details-h3-color);
            }
            .details-content{
                margin:20px;
                padding:15px;
                background-color: white;
                border-radius : 5px;
                box-shadow : 2px 2px 1px #999999;
            }
            .info{
                margin:10px;
            }
            .details{
                background-color: var(--dory-background-color);
                padding : 10px;
            }
            tags-input{
                display : inline-block;
                --tags-existing-tag: {
                    border-radius : 4px;
                    padding : 5px;
                }
            }

            paper-tabs{
                --paper-tabs-selection-bar-color: var(--details-h2-color);
            }
            paper-tab.iron-selected {
                color: var(--details-h2-color);
            }
        </style>

        <air-cruddy id="cruddy" mode="cors" url="https://localhost:8181/api/sams" data="{{data}}" entity-id="{{entityId}}" credentials="include">

            <div class="details">
                <h2>[[data.app]]</h2>

                <div class="details-content">
                    <div class="info">
                        <label>Description : </label>
                        [[data.description]]
                    </div>
                </div>

                <div class="details-content">
                    <h3>Informations</h3>

                    <div class="info">
                        <label>Nom : </label>
                        [[data.name]]
                    </div>
                    <div class="info">
                        <label>Type : </label>
                        [[data.type]]
                    </div>
                    <div class="info">
                        <label>Departement propriétaire : </label>
                        [[data.dpt]]
                    </div>
                    <div class="info">
                        <label>Documentation : </label>
                        [[data.doc]]
                    </div>
                    <div class="info">
                        <label>Etat : </label>
                        [[data.state]]
                    </div>
                    <div class="info">
                        <label>Intégration continue : </label>
                        [[data.ci]]
                    </div>
                    <div class="info">
                        <label>Git : </label>
                        [[data.git]]
                    </div>
                    <div class="info">
                        <label>Tags : </label>
                        <tags-input no-edit="" tags="[[data.tags]]"></tags-input>
                    </div>
                </div>

                <div class="details-content">
                    <h3>Environnements Disponibles</h3>
                    <paper-tabs selected="{{tabSelected}}" fit-container="">
                        <paper-tab>QUALIFICATION</paper-tab>
                        <paper-tab>RECETTE</paper-tab>
                        <paper-tab>PRODUCTION</paper-tab>
                    </paper-tabs>

                    <iron-pages selected="[[tabSelected]]" fallback-selection="fallback">
                        <dory-sam-card-details-tab data="[[data.qualif]]" app="[[data.app]]"></dory-sam-card-details-tab>
                        <dory-sam-card-details-tab data="[[data.recette]]" app="[[data.app]]"></dory-sam-card-details-tab>
                        <dory-sam-card-details-tab data="[[data.production]]" app="[[data.app]]"></dory-sam-card-details-tab>
                    </iron-pages>
                </div>

                <div class="details-content">
                    <h3>Schéma Applicatif</h3>
                    <dory-d3-relationship-graph id="graphApplicatif" data="[[appGraphData]]" width="720" height="720">
                    </dory-d3-relationship-graph>
                </div>
            </div>

        </air-cruddy>
`;
  }

  static get is() {
      return 'dory-sam-card-details';
  }

  static get properties() {
      return {
          tabSelected:{
              type: Number,
              value : 2
          },
          entityId: {
              type : String
          },
          data: {
              type: Object,
              notify: true,
              observer: '_createGraphData'
          },
          appGraphData: {
              type : Object,
              notify : true
          }
      };
  }

  _createGraphData() {
      if(this.data){
          const request={
              method:'GET',
              mode:'cors',
              credentials:'include'
          };
          fetch('/api/sams/relatives/'+this.entityId,request)
              .then( (response) => {
                  if(response.status !== 200) {
                      console.error('Fetch error : Error code ', response.status);
                      this.dispatchEvent(new CustomEvent('dory-request-error', {
                          detail: response,
                          bubbles: true,
                          composed: true
                      }));
                  }
                  else{
                      response.json().then(data => {
                          let nodes = [];
                          let links = [];

                          nodes.push({name:this.data.app,color:'#FFCC80',icon:'tab'});
                          data.nodes.map( node => {
                              nodes.push({name:node,color:'#FFCC80',icon:'tab'});
                          });
                          data.links.map( link => {
                              links.push(link);
                          });
                          this.appGraphData = {nodes:nodes,links:links};
                          this.$.graphApplicatif.draw();
                      })
                  }
              });
      }
  }
}

window.customElements.define(DorySamCardDetails.is, DorySamCardDetails);
