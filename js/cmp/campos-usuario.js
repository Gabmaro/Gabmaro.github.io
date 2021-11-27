customElements.define("campos-usuario", class extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
        `<p>
          <label accesskey="A">
            Afición
            <select name="aficion"></select>
          </label>
        </p>
        <p>
          <label accesskey="R">
            Roles
            <select name="roles" multiple></select>
          </label>
        </p>`;
  }
});
