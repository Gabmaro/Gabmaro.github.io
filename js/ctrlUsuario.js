import {Util} from "./lib/util.js";
import {Dao} from "./lib/dao.js";
import {Navegacion} from "./navegacion.js";
Util.registraServiceWorker();
const parametros = new URLSearchParams(location.search);
const id = parametros.get("id");
const vista = document.vista;
let cue;
Navegacion.sesionInicia(["Administrador"]);
if (WebComponents.ready) {
  carga();
} else  {
  document.addEventListener('WebComponentsReady', carga);
}
function carga() {
  Dao.busca("Usuario", id)
      .then(modelo => {
        if (modelo == null) {
          alert("Usuario no encontrado.");
          Navegacion.veAUsuarios();
        } else {
          cue = Util.texto(modelo.cue);
          document.title = cue;
          vista.titulo.value = cue;
          vista.elimina.addEventListener("click", confirmaEliminar);
          vista.addEventListener("submit", guarda);
          Dao.consulta("Aficion", "upperNombre",
              aficion => ({texto: aficion.nombre}))
              .then(filas => Util.agregaOpciones(vista.aficion,
                  Util.seleccion(modelo.aficionId), filas))
              .catch(Util.muestraError);
          Dao.consulta("Rol", "upperId",
              rol => ({texto: rol.id + ": " + rol.descripcion}))
              .then(filas => 
                  Util.agregaOpciones(vista.roles, modelo.rolIds, filas))
              .catch(Util.muestraError);
        }
      })
      .catch(Util.muestraError);
}
function guarda() {
  try {
    const modelo = {
      id: id,
      cue: cue,
      aficionId: vista.aficion.value,
      rolIds: Util.getValores(vista.roles),
      upperCue: cue.toUpperCase()};
    Dao.modifica("Usuario", modelo)
        .then(Navegacion.veAUsuarios)
        .catch(Util.muestraError);
  } catch (e) {
    Util.muestraError(e)
  }
}
function confirmaEliminar() {
  if (confirm("Confirma la eliminación\nPerderás los datos.")) {
    Dao.elimina("Usuario", id)
        .then(Navegacion.veAUsuarios)
        .catch(Util.muestraError);
  }
}
