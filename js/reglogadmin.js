function registrar(){
	var registroemail = document.getElementById('registroemail').value;
	var registrocontrasena = document.getElementById('registrocontrasena').value;

	firebase.auth().createUserWithEmailAndPassword(registroemail, registrocontrasena)
	.then(function(res){
		window.location = 'eventosadmin.html';
	})
	.then(function(){
			verficar()
	})
	
	.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			// ...
		});
}

function ingresar(){
	
	var email = document.getElementById('email').value;
	var contrasena = document.getElementById('contrasena').value;
	
	firebase.auth().signInWithEmailAndPassword(email, contrasena)
	.then(function(res){
		window.location = 'admin.html';
	})
	.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorCode);
			console.log(errorMessage);
			// ...
		});
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  var userAux = firebase.auth().currentUser;

if (userAux != null) {
  userAux.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
	if(profile.email=="townart.gf@gmail.com"){
		window.location = 'admin.html';
	}else{
		window.location = 'galeria.html';
	}
  });
}
	} else {
		
	
	}
  });

  function iniciogoogle(){
	if(!firebase.auth().currentUser){	
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(error)
    // ...
    });
}
  }

    function iniciofacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        
        provider.addScope('public_profile');
        firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error)
            // ...
        });
}
function cerrarSesion() {
  firebase.auth().signOut();
}
