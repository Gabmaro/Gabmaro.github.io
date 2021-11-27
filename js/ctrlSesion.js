import {Util} from "./lib/util.js";
import {Dao} from "./lib/dao.js";
import {Navegacion} from "./navegacion.js";
Util.registraServiceWorker();
const sesionNombre = document.getElementById("sesionNombre");
const sesionCue = document.getElementById("sesionCue");
const campoIcono = document.getElementById("campoIcono");
const icono = document.getElementById("icono");
const iniciaSesion = document.getElementById("iniciaSesion");
const terminaSesion = document.getElementById("terminaSesion");
Navegacion.sesionInicia();
Util.setVisible(campoIcono, false);
Util.setVisible(iniciaSesion, false);
Util.setVisible(terminaSesion, false);
iniciaSesion.addEventListener("click", onIniciaSesion);
terminaSesion.addEventListener("click", onTerminaSesion);
firebase.auth().onAuthStateChanged(
    user => {
      const hayUsuario = user && user.email;
      Util.setVisible(campoIcono, hayUsuario);
      Util.setVisible(iniciaSesion, !hayUsuario);
      Util.setVisible(terminaSesion, hayUsuario);
      sesionNombre.textContent = "";
      sesionCue.textContent = "";
      Navegacion.sesionInicia();
      if (hayUsuario) {
        sesionCue.textContent = user.email;
        sesionNombre.textContent = user.displayName;
        icono.src = user.photoURL;
        Dao.buscaCampo("Usuario", "upperCue", user.email.toUpperCase())
            .then(usuarios => {
                for (const usuario of usuarios) {
                  Navegacion.sesionActualiza(usuario.rolIds);
                }
            })
            .catch(Util.muestraError);
      }
    },
    Util.muestraError);
function onIniciaSesion() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: "select_account"});
  firebase.auth().signInWithRedirect(provider)
}
function onTerminaSesion() {
  firebase.auth().signOut();
  window.location = 'index.html';
}
