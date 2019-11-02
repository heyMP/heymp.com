import { LitElement, html, css } from 'lit-element/lit-element.js';
import "@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-title.js";
import "@lrnwebcomponents/haxcms-elements/lib/ui-components/site/site-breadcrumb.js";

class KillswitchTheme extends LitElement {
  render() {
    return html`
      <site-title></site-title>
      <site-breadcrumb></site-breadcrumb>
    `
  }
}
customElements.define('killswitch-theme', KillswitchTheme);