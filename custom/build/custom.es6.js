import{PolymerElement as e,html as t}from"../../build/es6/node_modules/@polymer/polymer/polymer-element.js";import{HAXCMSTheme as s}from"../../build/es6/node_modules/@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSThemeWiring.js";import{autorun as o,toJS as i}from"../../build/es6/node_modules/mobx/lib/mobx.module.js";import{store as n}from"../../build/es6/node_modules/@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js";import{stylesFromTemplate as a}from"../../build/es6/node_modules/@polymer/polymer/lib/utils/style-gather.js";class l extends(s(e)){static get properties(){return{layout:{type:String,value:"default",observer:"__layoutChanged"}}}constructor(){super(),import("../../build/es6/node_modules/@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-active-title.js"),this.__disposer=[],this.__disposer.push(o(()=>{this.__getLayout(i(n.activeItem))})),this.__counter=0,this.getCSS("default"),this.getHTML("default"),window.addEventListener("haxcms-custom-theme-template-ready",this.templateReady.bind(this))}connectedCallback(){super.connectedCallback(),this.contentContainer=this.shadowRoot.querySelector("#contentcontainer")}disconnectedCallback(){this.__disposer.forEach(e=>e()),window.removeEventListener("haxcms-custom-theme-template-ready",this.templateReady.bind(this)),super.disconnectedCallback()}async getCSS(e){return await fetch(`theme/${e}/theme.css`).then(e=>e.text()).then(e=>{const t=new CustomEvent("haxcms-custom-theme-template-ready",{bubbles:!0,composed:!0,cancelable:!1,detail:{css:e}});return this.dispatchEvent(t),e})}async getHTML(e){return await fetch(`theme/${e}/theme.html`).then(e=>e.text()).then(e=>{const t=new CustomEvent("haxcms-custom-theme-template-ready",{bubbles:!0,composed:!0,cancelable:!1,detail:{html:e}});return this.dispatchEvent(t),e})}__layoutChanged(e,t){""!==e&&(this.getCSS(e),this.getHTML(e))}__getLayout(e){e&&void 0!==e.metadata&&void 0!==e.metadata.layout&&e.metadata.layout&&""!==e.metadata.layout&&(this.layout=e.metadata.layout)}templateReady(e){if(this.__counter++,e.detail.css&&(this._css=e.detail.css),e.detail.html&&(this._html=e.detail.html),2===this.__counter){let e=document.createElement("template");e.innerHTML=`\n      <style>\n        /**\n         * Hide the slotted content during edit mode. This must be here to work.\n         */\n        :host([edit-mode]) #slot {\n          display: none;\n        }\n        ${this._css?this._css:""}\n      </style>\n      ${this._html?this._html:""}`;const s=a(e);for(;this.shadowRoot.firstChild;)this.shadowRoot.removeChild(this.shadowRoot.firstChild);for(var t in s)e.innerHTML=s[t].outerHTML+e.innerHTML;this.__instance=this._stampTemplate(e),this.shadowRoot.appendChild(this.__instance)}}static get template(){return t`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }

        :host([edit-mode]) #slot {
          display: none;
        }
      </style>
      <div id="contentcontainer">
        <div id="slot">
          <slot></slot>
        </div>
      </div>
    `}}window.customElements.define("killswitch-theme",l);
