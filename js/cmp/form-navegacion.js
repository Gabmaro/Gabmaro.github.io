customElements.define("form-navegacion", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
        `<ul>
          <li><a href="index.html">Sesión</a></li>
          <li id="navUsuarios"><a href="usuarios.html">Usuarios</a></li>
        </ul>`;
  }
});
