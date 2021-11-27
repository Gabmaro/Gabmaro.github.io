var $validator, $validator2;

function init() {
	var error = getUrlParameter("a");
	if(error != undefined && error != null && error != ""){
		$("#loginError").html(error);
	}
	$(document).on('click', '.toolbar a[data-target]', function(e) {
		e.preventDefault();
		var target = $(this).data('target');
		$('.widget-box.visible').removeClass('visible'); //hide others
		$(target).addClass('visible'); //show target
	});

	$validator = $('#login form').validate({
		rules: {
			inpUsuario: {
				required: true,
				minlength: 5,
				maxlength: 30
			},
			inpPass: {
				required: true
			}
		},
		messages: {
			inpUsuario: {
				required: "Ingresa tu usuario.",
				minlength: "El usuario debe tener minimo 5 caracteres.",
				maxlength: "El usuario debe de tener m&aacute;ximo 30 caracteres."
			},
			inpPass: "Ingresa tu contrase&ntilde;a."
		},

		errorPlacement: function(error, element) {
			$(element).parent('div').addClass('has-error');
			error.insertAfter(element.parent());
		}
	});


	$validator2 = $('#reset form').validate({
		rules: {
			inpMail: {
				required: true,
				email: true
			}
		},
		messages: {
			inpMail: {
				required: "Ingresa tu correo electr&oacute;nico.",
				email: "El correo electr&oacute;nico no tiene una estructura v&aacute;lida."
			}
		},

		errorPlacement: function(error, element) {
			$(element).parent('div').addClass('has-error');
			error.insertAfter(element.parent());
		}
	});

}

function iniSs() {
	var $valid = $('#login form').valid();
	if (!$valid) {
		$validator.focusInvalid();
		return false;
	} else {
		var data = $("#frmLogin");
		data.submit();
	}
}

function resPass() {
	var $valid = $('#reset form').valid();
	if (!$valid) {
		$validator2.focusInvalid();
		return false;
	} else {
		var data = $("#frmReset");
		data.submit();
	}
}



function validarEmail(valor) {
	if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
		return true;
	} else {
		return false;
	}
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? null : sParameterName[1];
        }
    }
}

function limpiar() {
		$("#loginError").html("");
}