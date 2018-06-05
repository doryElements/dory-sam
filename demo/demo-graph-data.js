import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
/**
 * `demo-graph-data`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DemoGraphData extends PolymerElement {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
            }
        </style>
`;
  }

  static get is() {
      return 'demo-graph-data';
  }

  static get properties() {
      return {
          data: {
              type: Object,
              notify : true
          }
      };
  }

  ready(){
      super.ready();
      this._createGraphData();
  }

  _createGraphData() {
      console.log('Creating');
      this.data = {
          nodes:[{'name':'PAI','color':'#FFCC80','icon':'tab'},
              {'name':'Norvege','color':'#B0BEC5','icon':'dns'},
              {'name':'PAPP01','color':'#B0BEC5','icon':'dns'},
              {'name':'PAPP02','color':'#B0BEC5','icon':'dns'},
              {'name':'PAPP03','color':'#B0BEC5','icon':'dns'},
              {'name':'Serveur BDD 1','color':'#FF7043','icon':'device:storage'},
              {'name':'Serveur BDD 2','color':'#FF7043','icon':'device:storage'},
              {'name':'Serveur BDD 3','color':'#FF7043','icon':'device:storage'}],
          links:[{'source':'PAI','target':'Norvege'},
              {'source':'PAI','target':'PAPP01'},
              {'source':'PAI','target':'PAPP02'},
              {'source':'PAI','target':'PAPP03'},
              {'source':'PAI','target':'Serveur BDD 1'},
              {'source':'PAI','target':'Serveur BDD 2'},
              {'source':'PAI','target':'Serveur BDD 3'}]
      };
  }
}

window.customElements.define(DemoGraphData.is, DemoGraphData);
