import {Util} from "./lib/util.js";
import {Dao} from "./lib/dao.js";
import {Navegacion} from "./navegacion.js";
Util.registraServiceWorker();
const ul = document.getElementById("lista");
const templateDatos = document.getElementById("templateDatos");
const templateVacio = document.getElementById("templateVacio");
Navegacion.sesionInicia(["Administrador"]);
Dao.observa("Usuario", "upperCue",
    usuario => ({
      texto1: usuario.cue,
      texto2: usuario.rolIds
          ? Object.keys(usuario.rolIds).join(", ") : ""}),
    lista => Util.agregaFilas(ul, lista, "usuario.html?id=",
        templateDatos, templateVacio));
