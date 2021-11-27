
var hora =null;
var min = null;
var sec = null;
var ampm = "";

function relog(){
	//fecha = new Date();
	hora = fecha.getHours();
	//ampm = hora >12 ? " pm" : " am";
	//hora = hora % 12;
	//hora = hora ? hora : 12; 
	min = fecha.getMinutes();
	sec = fecha.getSeconds();
	
	if(hora < 10){
		   hora = "0"+hora;
	}
	if(min < 10 ){
		   min = "0"+min;
	}
	if(sec < 10){
		   sec = "0"+sec;
	}
	
	fecha.setSeconds(sec+1, 0)
	document.getElementById("hora").innerHTML=hora;
	document.getElementById("minutos").innerHTML=min;
	document.getElementById("segundos").innerHTML=sec;
	setTimeout("relog()", 1000)
	
}






function registraActividad(idActividad){
	
	if(idActividad == 2){
		//swal({
		//title: "Atención",
		//text: "¿Estas seguro que deseas registrar el inicio de comida?",
		//type: "warning",
		//showCancelButton: true,
		//cancelButtonText: "No",
		//confirmButtonClass: "btn-danger",
		//confirmButtonText: "Si",
		//closeOnConfirm: true
		//},
		//function(isConfirm){
		  //if (isConfirm) {
		  if(confirm("¿Estas seguro que deseas registrar el inicio de comida?")){
			guardaActividad(idActividad);
		  }
		//  else {
		//	return;
		//  }
		//});
	}else{
		guardaActividad(idActividad);
	}
	
//	swal("Atención", "No se encontro información con los datos proporcionados.", "warning");
//swal("Error", "Ocurrio un error al recuperar la información.", "error");
//swal("Gracias por utilizar nuestro sistema", "Tu factura será enviada al correo electrónico que nos proporcionaste", "success");
//swal({
//title: "Ticket facturado",
//text: confirm,
//type: "warning",
//showCancelButton: true,
//cancelButtonText: "No",
//confirmButtonClass: "btn-danger",
//confirmButtonText: "Si",
//closeOnConfirm: true
//},
//function(isConfirm){
//  if (isConfirm) {
//	  $("#btnNext").css("display","none");
//	  $("#rfc").val("");
//	  $("#nombre").val("");
//	  $("#mail").val("");
//	  $("#usoCFDI").val("");
//	  if(data.cliente != null && data.cliente.rfc != ""){
//		  $("#rfc").val(data.cliente.rfc);
//		  $("#nombre").val(data.cliente.razonSocial);
//		  $("#mail").val(data.cliente.mail);
//		  $("#usoCFDI").val(data.cliente.usoCFDI);
//	  }
//	  datosNoCambiados();
//	  wizard.bootstrapWizard('next');
//  } else {
//	  resetForm(false);
//	  
//  }
//});
}

function guardaActividad(idActividad){
	showPleaseWait();
	//var fecha = new Date();
	//var fechaActividad  = ""+fecha.getFullYear()+"/"+fecha.getMonth()+"/"+fecha.getDay();
	var fechaActividad = ("0" + fecha.getDate()).slice(-2) + "-" + ("0"+(fecha.getMonth())).slice(-2) + "-" +
    fecha.getFullYear() + " " + ("0" + fecha.getHours()).slice(-2) + ":" + ("0" + fecha.getMinutes()).slice(-2)+ ":" + ("0" + fecha.getSeconds()).slice(-2);

	//alert(fechaActividad);
	$.ajax({
					type: "GET",
					url: "registraActividad.php?a="+idActividad+"&f="+fechaActividad,
					cache: false
				})
				.done(function( data, textStatus, jqXHR ) {
					data = JSON.parse(data);
					hidePleaseWait();
					if(data.success){
						alert(data.message);
							//swal("Atención", data.message, "error");
					}else{
						alert(data.message);
						//swal("Atención", data.message, "error");
					}
					location.reload(); 
				})
				.fail(function(jqXHR, textStatus ) {
					try {
						hidePleaseWait();
						 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
						 alert("Ocurrio un error al recuperar la información.");
					} catch (e) {
						// TODO: handle exception
					}
				});
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


function registraVacaciones(diasVacaciones){
	//$("#datepicker").datepicker({
	//	minDate: new Date(),
	//	changeMonth: true,
	//	changeYear: true
	//	});
	 var dateFormat = "yy-mm-dd";
	
	from = $( "#datepicker" )
        .datepicker({
          minDate: new Date(),
		changeMonth: true,
		 beforeShowDay: setHoliDays,
		dateFormat: 'yy-mm-dd',
		changeYear: true
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
		  //to.datepicker( "option", "maxDate", '+'+(diasVacaciones+2)+'d');
        }),
      to = $( "#to" ).datepicker({
		beforeShowDay: setHoliDays,
		minDate: new Date(),
		changeMonth: true,
		dateFormat: 'yy-mm-dd',
		changeYear: true
      })
      .on( "change", function() {
        //from.datepicker( "option", "maxDate", getDate( this ) );
		validateVacaciones(diasVacaciones);
      });
 
 function setHoliDays(date) {
   for (i = 0; i < holiDays.length; i++) {
     if (date.getFullYear() == holiDays[i][0]
    	  && date.getMonth() == holiDays[i][1] - 1
          && date.getDate() == holiDays[i][2]) {
        return [true, 'holiday', holiDays[i][3]];
     }
   }
  return [true, ''];
}
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
	

  var myInput = document.getElementById('datepicker');
  myInput.onpaste = function(e) {
    e.preventDefault();
    alert("esta acción está prohibida");
  }
  
   var myInputTo = document.getElementById('to');
  myInputTo.onpaste = function(e) {
    e.preventDefault();
    alert("esta acción está prohibida");
  }

	
	 $("#myModal").modal("show");
	 
			
}

function validateVacaciones(diasVacaciones){
	var dateFormat = "yy-mm-dd";
	var inicio = $.datepicker.parseDate( dateFormat, $( "#datepicker" ).val()) ;
	var fin = $.datepicker.parseDate( dateFormat, $( "#to" ).val()) ;
	var diasHab = 0;
	
	while (inicio <= fin){
		diasHab++;
		if ((inicio.getDay()==0) || (inicio.getDay()==6)  || inArray( ((inicio.getMonth()+1)  < 10 ? "0"+(inicio.getMonth()+1): (inicio.getMonth()+1))+"-"+ (inicio.getDate()<10 ? "0"+inicio.getDate():inicio.getDate()) ,feriadosArray) ){
	 		diasHab--;
	}
		inicio.setDate(inicio.getDate() + 1)
	}
	
	
	if(diasHab > diasVacaciones){
		swal("Atención", "El número de días solicitados es mayor al numero de días disponibles.", "error");
		return false;
	}else{
		return true;
	}
}

function inArray(needle, haystack) {
    var length = haystack.length;
	//console.log(needle);
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle){
			//console.log(needle +"=="+ haystack[i]);
			return true;
		}
    }
    return false;
}

function guardaVacaciones(numDias){
	
	if(validateVacaciones(numDias)){
		showPleaseWait();
		$.ajax({
					type: "GET",
					url: "registraVacaciones.php?action=setVacaciones&d=0&fi="+ $( "#datepicker" ).val()+"&ff="+$( "#to" ).val(),
					cache: false
				})
				.done(function( data, textStatus, jqXHR ) {
					data = JSON.parse(data);
					hidePleaseWait();
					if(data.success){
						alert(data.message);
							//swal("Atención", data.message, "error");
					}else{
						alert(data.message);
						//swal("Atención", data.message, "error");
					}
					location.reload(); 
				})
				.fail(function(jqXHR, textStatus ) {
					try {
						hidePleaseWait();
						 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
						 alert("Ocurrio un error al guardar la información.");
					} catch (e) {
						// TODO: handle exception
					}
				});
	}else{
		swal("Atención", "El número de días solicitados es mayor al numero de días disponibles.", "error");
	}
}

function editarComentario(comentario,id){
	
	swal({
		title: "Comentario",
		text: "Ingresa o edita tú comentario",
		type: "input",
		showCancelButton: true,
		closeOnConfirm: false,
		inputValue: ""+comentario,
		inputPlaceholder: "Ingresa tú comentario."
		}, function (inputValue) {
			console.log(">"+inputValue+"<");
		if (inputValue === false) return false;
		if (inputValue == "") {
			swal.showInputError("Es necesario que ingreses tú comentario");
		return false;
		}
		guardaComentario(inputValue,id);
		});
	
}

function guardaComentario(comentario,id){
	showPleaseWait();
	 	swal.close();
	$.ajax({
		type: "GET",
		url: "registraComentario.php?c="+comentario+"&id="+id,
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		data = JSON.parse(data);
		hidePleaseWait();
		if(data.success){
			alert(data.message);
				//swal("Atención", data.message, "error");
		}else{
			alert(data.message);
			//swal("Atención", data.message, "error");
		}
		location.reload(); 
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al guardar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
}

function iniciaVacaciones(){
	showPleaseWait();
	$.ajax({
		type: "GET",
		url: "registraVacaciones.php?action=iniciaVacaciones",
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		data = JSON.parse(data);
		hidePleaseWait();
		if(data.success){
			alert(data.message);
				//swal("Atención", data.message, "error");
		}else{
			alert(data.message);
			//swal("Atención", data.message, "error");
		}
		location.reload(); 
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al guardar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
}

function terminaVacaciones(){
	showPleaseWait();
	$.ajax({
		type: "GET",
		url: "registraVacaciones.php?action=terminaVacaciones",
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		data = JSON.parse(data);
		hidePleaseWait();
		if(data.success){
			alert(data.message);
				//swal("Atención", data.message, "error");
		}else{
			alert(data.message);
			//swal("Atención", data.message, "error");
		}
		location.reload(); 
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al guardar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
}


function generaReporte(empleado,tipo,val){
	showPleaseWait();
	$.ajax({
		type: "GET",
		url: "generarReporte.php?empleado="+empleado+"&tipo="+tipo+"&val="+val,
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		hidePleaseWait();
		if(data){
			$("#contentReporte").html(data);
			
			
				//swal("Atención", data.message, "error");
				 $("#reporte").modal("show");
		}else{
			//alert(data.message);
			swal("Atención", "No se encontro información con los datos proporcionados.", "warning");
		}
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al recuperar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
}


 function showReporte(){

  
   $('input[type="radio"]:checked').each(function(){
      $(this).checked = false;  
  });
  $("#myModalReporte").modal("show");
 }
 
 
 function habilitaReporte(tipoReporte){
switch(tipoReporte){
case 1:
$("#divDia").removeClass("hidden");
$("#divMes").addClass("hidden");
$("#divPeriodo").addClass("hidden");
break;
case 2:
$("#divMes").removeClass("hidden");
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



function reporte(idEmpleado){
  var tipo = $("input[name='tipo']:checked").val()
  var value = "";
  var desde ="";
  var hasta="";
  if(tipo !=""  && tipo != undefined){
   if(tipo ==1){
     value = $("#inpDia").val();
     var arrayFecha = value.split("/");
     value = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
   }else if(tipo == 2){
    value = $("#slcmes").val();
   }else if(tipo == 3){
     desde = $("#desde").val();
     hasta = $("#hasta").val();
     if(desde != "" && hasta !=""){
       var arrayFecha = desde.split("/");
     desde = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
      
      
      arrayFecha = hasta.split("/");
     hasta = arrayFecha[2]+"-"+arrayFecha[1]+"-"+arrayFecha[0];
     
     
      value = desde+"|"+hasta;
     }
   }
   
   if(value != undefined &&  $.trim(value) != "" ){
     $("#myModalReporte").modal("hide");
     generaReporte(idEmpleado,tipo,value)
   }else{
    alert("Completa la información");
   }
  }else{
   alert("Debes seleccionar el tipo de reporte");
   return false;
  }
  
 }
 
 
 function solicitudAusencia(){
	 $("#otroMotivo").addClass("hidde");
	  $("#modalAusencia").modal("show");
 }
 
 function validaTipoPermiso(){
	var slctipo= $("#slctipo").val();
	//alert(slctipo);

	if(slctipo == 4 ){
		$("#otroMotivo").removeClass("hidde");
	}else{
		$("#otroMotivo").addClass("hidde");
	}
	 
 }
 
 function registraAusencia(idEmpleado){
	 var slctipo= $("#slctipo").val();
	 var inpMotivo = $.trim($("#inpMotivo").val());
	 var dateFormat = "dd/mm/yy";
	//var desde = $.datepicker.parseDate( dateFormat, $( "#fromPermiso" ).val()) ;
	//var hasta = $.datepicker.parseDate( dateFormat, $( "#toPermiso" ).val()) ;
	var desde =  $.trim($( "#fromPermiso" ).val());
	var hasta =  $.trim($( "#toPermiso" ).val());
	 var formCompleto = true;
	//alert(slctipo);
	if(slctipo == "" ){
			formCompleto = false;
		alert("Favor de seleccionar un motivo.");
		return;
	}else if(slctipo == 4  && inpMotivo.length == 0){
		formCompleto = false;
		alert("Favor de especificar el motivo.");
		$("#inpMotivo").val("");
		return;
	}
	
	if(desde == null || desde ==""){
		formCompleto = false;
		alert("Favor de selecionar la fecha inicio.")
		return;
	}
	if(hasta == null || hasta ==""){
		formCompleto = false;
		alert("Favor de selecionar la fecha fin.")
		return;
	}
	
	if(formCompleto){
		//alert("Se procede con el guardado.");
		
		
		
		
		showPleaseWait();
	$.ajax({
		type: "GET",
		url: "registraAusencia.php?t="+slctipo+"&fi="+desde+"&ff="+hasta+"&c="+inpMotivo,
		cache: false
	})
	.done(function( data, textStatus, jqXHR ) {
		hidePleaseWait();
		data = JSON.parse(data);
		console.log(data);
		if(data.success){
			limpiarFormAusencia();
			$("#modalAusencia").modal("hide");
			swal("Atención", data.message, "success");
		}else{
			swal("Atención", data.message, "warning");
		}
	})
	.fail(function(jqXHR, textStatus ) {
		try {
			hidePleaseWait();
			 //swal("Error", "Ocurrio un error al recuperar la información.", "error");
			 alert("Ocurrio un error al guardar la información.");
		} catch (e) {
			// TODO: handle exception
		}
	});
		
	}
	
 }
 
 function limpiarFormAusencia(){
	$("#slctipo").val("");
	$("#inpMotivo").val("");
	$( "#fromPermiso" ).val("");
	$( "#toPermiso" ).val("");
	$("#otroMotivo").addClass("hidde");
 }
