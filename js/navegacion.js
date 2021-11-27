import {Util} from "./lib/util.js";
import {Dao} from "./lib/dao.js";
const navUsuarios = document.getElementById("navUsuarios");
export class Navegacion {
  static veAIndex() {
    window.location = "index.html";
  }
  static veAUsuarios() {
    window.location = "usuarios.html";
  }
  static sesionActualiza(roles) {
    Util.setVisible(navUsuarios, roles["Administrador"]);
  }
  static sesionInicia(roles) {
    Util.setVisible(navUsuarios, false);
    if (roles) {
      firebase.auth().onAuthStateChanged(
          user => {
            const hayUsuario = user && user.email;
            if (hayUsuario) {
              Dao.buscaCampo("Usuario", "upperCue",
                  user.email.toUpperCase())
                  .then(usuarios => {
                    let autorizado = false;
                    for(const usuario of usuarios) {
                      Navegacion.sesionActualiza(usuario.rolIds);
                      if (roles.filter(r => usuario.rolIds[r])) {
                        autorizado = true;
                      }
                    }
                    if (!autorizado) {
                    
                    }
                  })
                  .catch(e => {
                    Util.muestraError(e);
                    
                  });
            } else {
              
            }
          },
          Util.muestraError);
    }
  }
}
