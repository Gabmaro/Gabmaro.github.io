var $validator ;
function init(){
	
    
	
	
 }
 function regUser(){
	swal({
  title: "Modificar usuario",
  text: "Ingresa el RPE del usuario a modificar",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: true,
  inputPlaceholder: "Ingresa el RPE del usuario."
}, function (inputValue) {
  if (inputValue === false) return false;
  if (inputValue === "") {
    swal.showInputError("Es necesario que ingreses el RPE");
    return false
  }
  //swal("Nice!", "You wrote: " + inputValue, "success");
  //generaReporte(inputValue,false,"");
  buscaUsuario(inputValue);
});
 }
 function limpiaForm(){
  	$("#id").val("");
			$("#nombre").val("");
			$("#rpe").val("");
			$("#area").val("");
			$("#cargo").val("");
			$("#ubicacion").val("");
			$("#usuario").val("");
   $("#mail").val("");
   $("#pass").val("");
   $("#vacaciones").val("");
			
 }
 
 function nuevoUsuario(){
	$("#titleUsr").html("Nuevo usuario");
 limpiaForm();
 
	$("#modalUsr").modal("show");
 }
 
 function modificarUsuario(){
	swal({
  title: "Modificar usuario",
  text: "Ingresa el RPE del usuario a modificar",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: true,
  inputPlaceholder: "Ingresa el RPE del usuario."
}, function (inputValue) {
  if (inputValue === false) return false;
  if (inputValue === "") {
    swal.showInputError("Es necesario que ingreses el RPE");
    return false
  }
  //swal("Nice!", "You wrote: " + inputValue, "success");
  //generaReporte(inputValue,false,"");
  buscaUsuario(inputValue);
});
 }
 
 
 function buscaUsuario(rpe){
	
	$.ajax({
		type: "GET",
		url: "buscar.php?rpe="+rpe,
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		hidePleaseWait();
		data = JSON.parse(data);
		if(data.success){
			
			$("#id").val(data.id);
			$("#nombre").val(data.nombre);
			$("#rpe").val(data.rpe);
			$("#area").val(data.area);
			$("#cargo").val(data.cargo);
			$("#ubicacion").val(data.ubicacion);
			$("#usuario").val(data.usuario);
   $("#mail").val(data.mail);
   $("#vacaciones").val(data.vacaciones);
			
			$("#modalUsr").modal("show");
			
			
		}else{
			//alert("No se encontro información.");
			swal("Atención", "Ocurrio un error al procesar la información.", "error");
		}
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al procesar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
	
 }
 
 
 
 function eliminarUsuario(){
	swal({
		title: "Eliminar usuario",
		text: "Ingresa el RPE del usuario a eliminar",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: true,
		inputPlaceholder: "Ingresa el RPE del usuario."
		}, function (inputValue) {
		if (inputValue === false) return false;
		if (inputValue === "") {
			swal.showInputError("Es necesario que ingreses el RPE");
		return false;
		}
		eliminaUsuario(inputValue);
		});
 }
 
 function eliminaUsuario(rpe){
	showPleaseWait();
	$.ajax({
		type: "GET",
		url: "registra.php?delete=true&rpe="+rpe,
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		hidePleaseWait();
		data = JSON.parse(data);
		if(data.success){
			//swal("", data.message, "success");
			alert(data.message);
		}else{
			//alert("No se encontro información.");
			
			alert("Ocurrio un error al procesar la información.");
		}
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al procesar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
 }
 
 function bloquearUsuario(){
	swal({
		title: "Bloquear usuario",
		text: "Ingresa el RPE del usuario a bloquear",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: true,
		inputPlaceholder: "Ingresa el RPE del usuario."
		}, function (inputValue) {
		if (inputValue === false) return false;
		if (inputValue === "") {
			swal.showInputError("Es necesario que ingreses el RPE");
		return false;
		}
		bloqueaUsuario(inputValue);
		});
 }
 function bloqueaUsuario(rpe){
	showPleaseWait();
	$.ajax({
		type: "GET",
		url: "registra.php?bloquea=true&rpe="+rpe,
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		hidePleaseWait();
		data = JSON.parse(data);
		if(data.success){
			swal("", data.message, "success");
		}else{
			//alert("No se encontro información.");
			swal("Atención", "Ocurrio un error al procesar la información.", "error");
		}
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al procesar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
 }
 
 
 function guarda(){
		var nombre = $.trim( $("#nombre").val());
		var usuario = $.trim($("#usuario").val());
		var rpe = $.trim($("#rpe").val());
		var area = $.trim($("#area").val());
		var cargo = $.trim($("#cargo").val());
		var ubicacion =$.trim( $("#ubicacion").val());
		var pass =$.trim( $("#pass").val());
  var mail =$.trim( $("#mail").val());
  var vacaciones = $.trim($("#vacaciones").val());
		
		if(nombre != ""){
			if(usuario != ""){
			if(rpe != ""){
			if(area != ""){
			if(cargo != ""){
			if( ubicacion!= ""){
			if(mail != ""){
    if(validateEmail(mail)){
     
     if(vacaciones != ""){
      
      
      	showPleaseWait();
        $.ajax({
         type: "GET",
         url: "registra.php?"+$("#usuariofrm").serialize(),
         cache: false
        })
        .done(function( data, textStatus, jqXHR ) {
         hidePleaseWait();
         data = JSON.parse(data);
         if(data.success){
          
          $("#modalUsr").modal("hide");
          swal("", data.message, "success");
         }else{
          //alert("No se encontro información.");
          swal("Atención", "Ocurrio un error al procesar la información.", "error");
         }
        })
        .fail(function(jqXHR, textStatus ) {
         try {
          hidePleaseWait();
           //swal("Error", "Ocurrio un error al recuperar la información.", "error");
           alert("Ocurrio un error al procesar la información.");
         } catch (e) {
          // TODO: handle exception
         }
        });
      
      
     }else{
      swal("Atención", "Favor de ingresar los días de vacaciones." , "error");
     }
     
    }else{
     swal("Atención", "Favor de ingresar una cuenta de correo electrónico válida." , "error");
    }
		
			
			}else{
				swal("Atención", "Favor de ingresar el correo electrónico" , "error");
			}
			}else{
				swal("Atención", "Favor de ingresar la ubicación" , "error");
			}
			}else{
				swal("Atención", "Favor de ingresar el cargo" , "error");
			}
			}else{
				swal("Atención", "Favor de ingresar el área" , "error");
			}
			}else{
				swal("Atención", "El RPE es obligatorio" , "error");
			}
			}else{
				swal("Atención", "El usuario es obligatorio" , "error");
			}
		}else{
			swal("Atención", "El  nombre es obligatorio" , "error");
		}
		
 }
 
 function showReporte(tipoReporte){
  if(tipoReporte ==1 ){
   $('#divrpe').removeClass("hidden");
    $('#divArea').addClass("hidden");
  }else if(tipoReporte ==3 ){
	  $('#divArea').removeClass("hidden");
   $('#divrpe').addClass("hidden");
  }else{
   $('#divrpe').addClass("hidden");
   $('#divArea').addClass("hidden");
  }
  
   $('input[type="radio"]:checked').each(function(){
      $(this).checked = false;  
  });
  $("#inpTipo").val(tipoReporte);
  $("#myModalReporte").modal("show");
 }
 
 function reporte(){
  var tipoPeriodo = $("input[name='tipo']:checked").val();
  var value = "";
  var desde ="";
  var hasta="";
  var tipoReporte = $("#inpTipo").val();
  if(tipoPeriodo !=""  && tipoPeriodo != undefined){
   if(tipoPeriodo ==1){
     value = $("#inpDia").val();
     var arrayFecha = value.split("/");
     value = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
   }else if(tipoPeriodo == 2){
    value = $("#slcmes").val();
   }else if(tipoPeriodo == 3){
     desde = $("#from").val();
     hasta = $("#to").val();
     if(desde != "" && hasta !=""){
       var arrayFecha = desde.split("/");
     desde = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
      
      
      arrayFecha = hasta.split("/");
     hasta = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
     
     
      value = desde+"|"+hasta;
     }
   }
   
   if(value != undefined &&  $.trim(value) != "" ){
    
    if(tipoReporte == 1){ // reporte por usuario
     var rpe = $.trim( $("#rpeReporte").val());
     if(rpe != ""){
     $("#myModalReporte").modal("hide");
     generaReporte(rpe,false,tipoReporte,value);
     }else{
      alert("Ingresa el RPE del usuario.");
     }
    }
    
    if(tipoReporte == 2){ // reporte general
     $("#myModalReporte").modal("hide");
     generaReporte('',true,tipoReporte,value)
    }
	
	if(tipoReporte == 3){ //reporte area
     $("#myModalReporte").modal("hide");
	 var area  =$("#slcArea").val();
	 if(area != ""){
     $("#myModalReporte").modal("hide");
     generaReporte("",false,tipoReporte,value);
     }else{
      alert("Selecciona el área");
     }
    }
	
	if(tipoReporte == 4){// reporte alimentos
		generaReporte("",false,tipoReporte,value);
		
	}
	
   }else{
    alert("Completa la información");
   }
  }else{
   alert("Debes seleccionar el tipo de reporte");
   return false;
  }
  
 }
 
 function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
 
 
function reporteUsuario(){
	swal({
  title: "Reporte por  usuario",
  text: "Ingresa el RPE del usuario:",
  type: "input",
  showCancelButton: true,
  closeOnConfirm: true,
  inputPlaceholder: "Ingresa el RPE del usuario."
}, function (inputValue) {
  if (inputValue === false) return false;
  if (inputValue === "") {
    swal.showInputError("Es necesario que ingreses el RPE");
    return false
  }
  //swal("Nice!", "You wrote: " + inputValue, "success");
  generaReporte(inputValue,false,undefined,undefined);
});
}

function openVacacional(){
	$("#myModalVacaciones").modal("show");
}


function reporteVacacional(){
	
	
	var tipoPeriodo = $("input[name='tipoVC']:checked").val();
  var value = "";
  var desde ="";
  var hasta="";
  if(tipoPeriodo !=""  && tipoPeriodo != undefined){
   if(tipoPeriodo ==1){
     value = $("#inpDiaVC").val();
     var arrayFecha = value.split("/");
     value = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
   }else if(tipoPeriodo == 2){
    value = $("#slcmesVC").val();
   }else if(tipoPeriodo == 3){
     desde = $("#desdeVC").val();
     hasta = $("#hastaVC").val();
     if(desde != "" && hasta !=""){
       var arrayFecha = desde.split("/");
     desde = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
      
      
      arrayFecha = hasta.split("/");
     hasta = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
     
     
      value = desde+"|"+hasta;
     }
   }
   
   if(value != undefined &&  $.trim(value) != "" ){
    
		
		showPleaseWait();
		
		$.ajax({
			type: "GET",
			url: "../usuario/generarReporte.php?vc=true&tipo="+tipoPeriodo+"&value="+value,
			cache: false
		})
		.done(function( data, textStatus, jqXHR ) {
			hidePleaseWait();
			if(data){
				$("#myModalVacaciones").modal("hide");
				$("#contentReporteVC").html(data);
				$("#table").val( $("#exportVC").html());
					//swal("Atención", data.message, "error");
					
					 $("#reporteVC").modal("show");
			}else{
				alert("No se encontro información.");
				//swal("Atención", data.message, "error");
			}
		})
		.fail(function(jqXHR, textStatus ) {
			try {
				hidePleaseWait();
				 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
				 alert("Ocurrio un error al procesar la información.");
			} catch (e) {
				// TODO: handle exception
			}
		});
	
	
   }else{
    alert("Completa la información");
   }
  }else{
   alert("Debes seleccionar el tipo de reporte");
   return false;
  }
	
	
	
	
	
	
}

function reporteUsuariosRegistado(){
	showPleaseWait();
	var url = "../usuario/generarReporte.php?registrados=true";
	$.ajax({
		type: "GET",
		url: url,
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		hidePleaseWait();
		if(data){
			$("#contentUR").html(data);
			
			$("#table").val($("#exportUR").html());
				//swal("Atención", data.message, "error");
				//$('#exampleUR').DataTable({
				//	paging: false,
				//	scrollY: 400,
				//	"searching": false,
				//	dom: 'Bfrtip',
				//	buttons: [
				//		'excel'
				//	]
				// });
				 $("#reporteUR").modal("show");
		}else{
			alert("No se encontro información.");
			//swal("Atención", data.message, "error");
		}
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al procesar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
}

function generaReporte(empleado,todos,tipo,value){
	
	var area = $("#slcArea").val();
	var url = "../reporte.php?";
	if(tipo == 2){ // reporte general
		url += "val="+value+"&t=1&vr=";
	}else if(tipo == 1){ //reporte por  rpe
		url += "t=3&val="+value+"&vr="+empleado;
	}else if(tipo == 3){
		if(area!=""){ // reporte por area
			url += "t=2&val="+value+"&vr="+area;
		}else{
			alert("Selecciona el área");
			return false;
		}
	}else if(tipo == 4){//reporte alimentos
		url += "t=4&val="+value+"&vr=";
	}
	window.open(url);
	/*
	showPleaseWait();
	$.ajax({
		type: "GET",
		url: url,
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		hidePleaseWait();
		if(data){
			$("#contentReporte").html(data);
			$("#table").val($("#exportR").html());
				//swal("Atención", data.message, "error");
				//$('#example').DataTable({
				//	paging: false,
				//	scrollY: 400,
				//	"searching": false
				// });
				 $("#reporte").modal("show");
		}else{
			alert("No se encontro información.");
			//swal("Atención", data.message, "error");
		}
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al procesar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
	*/
}


function descargaTabla(idTabla){
	//datos_a_enviar
	var tabla = $("#table").val();
	console.log(tabla);
	//datos_a_enviar
	var url = "descargaTabla.php?datos_a_enviar="+encodeURI(tabla);
	//console.log("tabla"+url);
	//window.open(url);
	 $("#exportTable").submit();
	
}



function showPleaseWait() {
    $("#pleaseWaitDialog").modal("show");
}

/**
 * Hides "Please wait" overlay. See function showPleaseWait().
 */
function hidePleaseWait() {
    $("#pleaseWaitDialog").modal("hide");
}

function habilitaReporteVC(tipoReporte){
	switch(tipoReporte){
		case 1:
			$("#divDiaVC").removeClass("hidden");
			$("#divMesVC").addClass("hidden");
			$("#divPeriodoVC").addClass("hidden");
			break;
		case 2:
			//$("#divMesVC").removeClass("hidden");
			$("#divDiaVC").addClass("hidden");
			$("#divPeriodoVC").addClass("hidden");
			break;
		case 3:
			$("#divPeriodoVC").removeClass("hidden");
			$("#divDiaVC").addClass("hidden");
			$("#divMesVC").addClass("hidden");
			break;


	}


}



function habilitaReporte(tipoReporte){
switch(tipoReporte){
case 1:
$("#divDia").removeClass("hidden");
$("#divMes").addClass("hidden");
$("#divPeriodo").addClass("hidden");
break;
case 2:
//$("#divMes").removeClass("hidden");
$("#divMes").addClass("hidden");
$("#divDia").addClass("hidden");
$("#divPeriodo").addClass("hidden");
break;
case 3:
$("#divPeriodo").removeClass("hidden");
$("#divDia").addClass("hidden");
$("#divMes").addClass("hidden");
break;


}


}