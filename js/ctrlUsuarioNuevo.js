import {Util} from "./lib/util.js";
import {Dao} from "./lib/dao.js";
import {Navegacion} from "./navegacion.js";
Util.registraServiceWorker();
const vista = document.vista;
Navegacion.sesionInicia(["Administrador"]);
if (WebComponents.ready) {
  carga();
} else  {
  document.addEventListener('WebComponentsReady', carga);
}
function carga() {
  vista.addEventListener("submit", guarda);
  Dao.consulta("Aficion", "upperNombre",
      aficion => ({texto: aficion.nombre}))
      .then(filas => Util.agregaOpciones(vista.aficion, {}, filas))
      .catch(Util.muestraError);
  Dao.consulta("Rol", "upperId",
      rol => ({texto: rol.id + ": " + rol.descripcion}))
      .then(filas => Util.agregaOpciones(vista.roles, {}, filas))
      .catch(Util.muestraError);
}
function guarda() {
  try {
    const cue = vista.cue.value.trim();
    Util.valida(cue, "Falta el cue.");
    Util.valida(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(cue),
        "El cue debe ser un email.");
    const modelo = {
      cue: cue,
      aficionId: vista.aficion.value,
      rolIds: Util.getValores(vista.roles),
      upperCue: cue.toUpperCase()};
    Dao.buscaCampo("Usuario", "upperCue", modelo.upperCue)
      .then(usuarios => {
          if (usuarios.length > 0) {
            throw new Error("El cue ya está asignado.");
          } else {
            Dao.agrega("Usuario", modelo)
          }
      })
      .then(Navegacion.veAUsuarios)
      .catch(Util.muestraError);
  } catch (e) {
    Util.muestraError(e)
  }
}
