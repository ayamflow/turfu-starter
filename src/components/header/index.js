import template from "./template.html";
import * as style from "./style";

export default class Header {
  constructor() {
    this.render();
  }

  render() {
    this.el = document.createElement("div");
    this.el.classList.add("Header");
    this.el.innerHTML = `
            <h1>Header</h1>
            <ul class="${style.list}">
                <li>One</li>
                <li>Two</li>
                <li>Three</li>
            </ul>
        `;

    return this;
  }
}
