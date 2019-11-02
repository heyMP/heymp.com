import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { HAXCMSTheme } from "@lrnwebcomponents/haxcms-elements/lib/core/HAXCMSThemeWiring.js";
import { autorun, toJS } from "mobx/lib/mobx.module.js";
import { store } from "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js";
import { stylesFromTemplate } from "@polymer/polymer/lib/utils/style-gather.js";

class KillswitchTheme extends HAXCMSTheme(PolymerElement) {
  static get properties() {
    return {
      layout: { type: String, value: "default", observer: "__layoutChanged"}
    }
  }

  constructor() {
    super();
    import("@lrnwebcomponents/haxcms-elements/lib/ui-components/active-item/site-active-title.js");
    this.__disposer = []
    this.__disposer.push(autorun(() => {
      this.__getLayout(toJS(store.activeItem))
    }))
    this.__counter = 0;
    this.getCSS("default");
    this.getHTML("default");
    window.addEventListener(
      "haxcms-custom-theme-template-ready",
      this.templateReady.bind(this)
    );
  }

  connectedCallback() {
    super.connectedCallback();
    this.contentContainer = this.shadowRoot.querySelector("#contentcontainer");
  }

  /**
   * Detached life cycle
   */
  disconnectedCallback() {
    // this disposes of each item in the disposer
    this.__disposer.forEach(i => i())
    window.removeEventListener(
      "haxcms-custom-theme-template-ready",
      this.templateReady.bind(this)
    );
    super.disconnectedCallback();
  }

  /**
   * Get css
   */
  async getCSS(layout) {
    /**
     * @todo this definitely needs sanitized
     */
    return await fetch(`theme/${layout}/theme.css`)
      .then(response => response.text())
      .then(response => {
        const evt = new CustomEvent("haxcms-custom-theme-template-ready", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: {
            css: response
          }
        });
        this.dispatchEvent(evt);

        return response;
      });
  }

  /**
   * Get css
   */
  async getHTML(layout) {
    /**
     * @todo this definitely needs sanitized
     */
    return await fetch(`theme/${layout}/theme.html`)
      .then(response => response.text())
      .then(response => {
        const evt = new CustomEvent("haxcms-custom-theme-template-ready", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: {
            html: response
          }
        });
        this.dispatchEvent(evt);
        return response;
      });
  }

  // when the layout changes then we need to rebuild the light dom
  __layoutChanged(value, oldValue) {
    if (value === "") return
    this.getCSS(value)
    this.getHTML(value)
  }

  __getLayout(activeItem) {
    /**
     * @todo replace with core function that checks for deeply nested objects
     */
    if (activeItem) {
      if (typeof activeItem.metadata !== 'undefined') {
        if (typeof activeItem.metadata.layout !== 'undefined') {
          // make sure there is something in there
          if (activeItem.metadata.layout && activeItem.metadata.layout !== '') {
            this.layout = activeItem.metadata.layout
          }
        }
      }
    }
  }

  templateReady(e) {
    this.__counter++;
    if (e.detail.css) {
      this._css = e.detail.css;
    }
    if (e.detail.html) {
      this._html = e.detail.html;
    }
    if (this.__counter === 2) {
      let t = document.createElement("template");
      t.innerHTML = `
      <style>
        /**
         * Hide the slotted content during edit mode. This must be here to work.
         */
        :host([edit-mode]) #slot {
          display: none;
        }
        ${this._css ? this._css : ""}
      </style>
      ${this._html ? this._html : ""}`;
      const styles = stylesFromTemplate(t);
      while (this.shadowRoot.firstChild) {
        this.shadowRoot.removeChild(this.shadowRoot.firstChild);
      }
      // add in all styles found
      for (var i in styles) {
        t.innerHTML = styles[i].outerHTML + t.innerHTML;
      }
      this.__instance = this._stampTemplate(t);
      // now the template
      this.shadowRoot.appendChild(this.__instance);
    }
  }

  static get template() {
    return html`
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
    `;
  }
}
window.customElements.define("killswitch-theme", KillswitchTheme);
