var urlPortalAPI = ObtenerUrlPortalAPI();
var urlRecoWeb = ObtenerUrlRecomendacionesWeb();
var urlLogOut = ObtenerUrlHCW();


  $(document).ready(function(){
    $('.modal').on('show.bs.modal', function () {
      if ($(document).height() > $(window).height()) {
        // no-scroll
        $('body').addClass("modal-open-noscroll");
      }
      else { 
        $('body').removeClass("modal-open-noscroll");
      }
    })
    $('.modal').on('hide.bs.modal', function () {
        $('body').removeClass("modal-open-noscroll");
    })
  })



function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}

var tokenGenerico = getURLParameter('jkGkhgKJh'),
    idTarjeta = getURLParameter('cfbyfj37'),
    eMailUsuario = getURLParameter('dkjsghv567');

//alert(tokenGenerico);
/*
if (tokenGenerico != null) {
    if (idTarjeta > 0) {
        localStorage.setItem("AccessTokenGenerico", tokenGenerico);
        localStorage.setItem("EmailUsuario", eMailUsuario);
        GenerarParCoordenadas();
        ObtenerReferenciaTarjeta();
    } else {
        $('.overlayInicio').fadeOut('fast');
        bootbox.alert('Su usuario no posee una Historia Clinica asociada. Por favor, visite nuestras oficinas de empadronamiento en el Hospital Privado C.M.C. S.A. (Naciones Unidas 346)', function () {
            var url = urlLogOut;
            $(location).attr('href', url);
        });
        localStorage.clear();
    }
} else if (localStorage.getItem('AccessTokenGenerico') != null) {
    $('#loginEmail').val(localStorage.getItem('EmailUsuario'));
    GenerarParCoordenadas();
    ObtenerReferenciaTarjeta();
}*/

$(document).ready(function (e) {
    $('input, textarea').placeholder({ customClass: 'my-placeholder' });
    $('.overlayInicio').delay(280).fadeOut('slow');
    $("#iniciarSesionRec").validate();
    $("#registrarNuevaCuenta").validate();
    $("#frmSolicitudContrasenia").validate();

    bootbox.setDefaults({
        //Seteamos el español como idioma por defecto del bootbox.
        locale: "es"
    });
});

/*********************************************************
LOGIN RECOMENDACIONES
------------------------
INICIO DE SESIÓN
*********************************************************/
$('.enviarLoginHCW').click(function () {
    if (!$("#iniciarSesionRec").valid()) {
        return false;
    }
    $("#loadingIconIngreso").show(1);

    var urlLogin = urlPortalAPI + 'Sesion/Login';
    
    var params = {
        usuario: $('#loginEmail').val(),
        Password: $('#loginPassword').val()
    };

    $.ajax({
        url: urlLogin,
        data: params,
        type: "POST",
        crossDomain: true,
        //xhrFields: {withCredentials: true},
        success: function (result) {
            localStorage.setItem("AccessTokenGenerico", result.AccessToken);
            localStorage.setItem("Thumbnail123", result.Thumbnail);
            localStorage.setItem("EmailUsuario", result.Nombre);
                        
            if (result.IdTarjeta > 0) {
                GenerarParCoordenadas();
                ObtenerReferenciaTarjeta();
            }
            else {
                 bootbox.alert('Su usuario no posee una Historia Clinica asociada. Por favor, visite nuestras oficinas de empadronamiento en el Hospital Privado C.M.C. S.A. (Naciones Unidas 346)');
                 localStorage.clear();
            }
        }, //success
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadingIconIngreso").hide(1);
            MostrarMensajeTipoErrorGenerico(xhr);
        }
    }); //end ajax
    return false;
}); //end click


/*********************************************************
LOGIN RECOMENDACIONES
------------------------
Funciones para mostrar mensaje según el tipo de error
*********************************************************/
function ArmarMensajeSegunTipoError(xhr) {
    switch (xhr.status) {
        case 401:
            bootbox.alert('No autorizado. Por favor inicie sesión nuevamente.', function () {
                BorrarCookiesYDesloguearse();
            });
            break;
        default:
            MostrarMensajeTipoErrorGenerico(xhr);
            break;
    }
}

function MostrarMensajeTipoErrorGenerico(xhr) {
    if (xhr.status == 401) {
        bootbox.alert('No autorizado.');
        return;
    }
    if (xhr.responseText != '') {
        var response = $.parseJSON(xhr.responseText);
        if (response.Message) {
            bootbox.alert(response.Message);
        }
        else {
            bootbox.alert('Ocurrió un error inesperado.<br> Inténtelo nuevamente más tarde.');
        }
    } else {
        bootbox.alert('Ocurrió un error inesperado.<br> Inténtelo nuevamente más tarde.');
    }
}


/*********************************************************
LOGIN RECOMENDACIONES
------------------------
LOGOUT
*********************************************************/

$('.cerrarSesion').click(function () {
    bootbox.confirm("¿Está seguro que desea cerrar sesión?", function (result) {

        if (result === true) {
            BorrarCookiesYDesloguearse();
        }
    });
});

function BorrarCookiesYDesloguearse() {
    BorrarCookies();

    if (localStorage.getItem("AccessToken") != null) {
        //Si tiene un AccessToken de HC lo borramos
        Logout(localStorage.getItem("AccessToken"));
    }
    
    if (localStorage.getItem("AccessTokenRec") != null) {
        //Si tiene un AccessToken de Rec lo borramos
        Logout(localStorage.getItem("AccessTokenRec"));
    }

    Logout(localStorage.getItem("AccessTokenGenerico"));

    localStorage.clear();
    var url = urlLogOut;
    $(location).attr('href', url);

    $("#loadingIconCancelarIngreso").hide(1);
}

function BorrarCookies() {
    var cookie = document.cookie.split(';');
    for (var i = 0; i < cookie.length; i++) {
        var chip = cookie[i],
            entry = chip.split("="),
            name = entry[0];
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

function Logout(accessToken) {
    //Nos deslogueamos de la API de autenticación
    var urlLogout = urlPortalAPI + 'Sesion/Logout';
    var params = { AccessToken: accessToken };

    $.ajax({
        url: urlLogout,
        data: params,
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function (result) {
            console.log(result);
        }
    });
}


/*********************************************************
LOGIN HCW
------------------------
GENERAR PAR COORDENADAS
*********************************************************/
function GenerarParCoordenadas() {
    if (!window.localStorage) {
        bootbox.alert('Su explorador no soporta localStorage.\n\nEsto puede deberse a:\n- Su explorador se encuentra obsoleto. Por favor actualícelo.\n- Usted está intentando ingresar en Modo Incognito.\n- El soporte para JavaScript se encuentra deshabilitado.\n- Algun programa o extención de su ordenador esta generando conflicto.', function () {
            window.location.reload(true);
        });
    }

    if (localStorage.getItem("AccessTokenGenerico") != null) {     
        var urlGenerarPar = urlPortalAPI + 'TarjetaCoordenadas/GenerarParCoordenadas';

        var params = {
            AccessToken: localStorage.getItem("AccessTokenGenerico")
        };



        $.ajax({
            url: urlGenerarPar,
            data: params,
            type: "GET",
            success: function (result) {
                coorA = result[0];
                coorB = result[1];
                $("#lblCoord1").val(coorA);
                $("#lblCoord2").val(coorB);

                $("#loginEmail").attr("disabled", "disabled").val(localStorage.getItem("EmailUsuario"));
                $("#loginPassword").attr("disabled", "disabled").val("****************");
                
                $(".enviarLoginHCW").attr("disabled", "disabled");
                $(".registroHCW").attr("disabled", "disabled");

                $("#olvidoPass").hide(1);
                $("#loadingIconIngreso").hide(1);

                $(".LoginHCW").hide(1);
                $('#coordenadas').show(1);
                $('.btnCoordenadas').show(1);

                $('#lblCoord1Resp').focus();
            }, //success
            error: function (xhr, ajaxOptions, thrownError) {
                ArmarMensajeSegunTipoError(xhr);
                $("#loadingIconIngreso").hide(1);
            }
        });  //end ajax
    } //end if atkn != null

    else {
        $('body').html('Usted no posee acceso a ésta área del sistema. Por favor verifique su autenticación. <br>¡Muchas gracias!');
    }
}


$('.cancelarCoordenadas').click(function () {
    BorrarCookiesYDesloguearse();
    $("#loadingIconCancelarIngreso").show(1);
    $('#coordenadas').hide(1);
    var url = urlLogOut;
    $(location).attr('href', url);
});

$('.enviarCoordenadas').click(function () {
    $("#loadingIconEnviarCoord").show(1);
    var urlObtencionVinculoHC = urlPortalAPI + 'Usuario/ObtenerVinculoHistoriaClinica';
    var params = {
        CoorA: {
            ClaveCoordenada: coorA,
            ValorCoordenada: $('#lblCoord1Resp').val()
        },
        CoorB: {
            ClaveCoordenada: coorB,
            ValorCoordenada: $('#lblCoord2Resp').val()
        },
        AccessToken: localStorage.getItem("AccessTokenGenerico")
    };

    $.ajax({
        url: urlObtencionVinculoHC,
        data: params,
        type: "POST",
        dataType: 'json',
        success: function (result) {
            localStorage.setItem("AccessToken", result.AccessToken);
            accessTokenNG = localStorage.getItem("AccessToken");
            document.cookie = 'accessToken=' + accessTokenNG;

            $('#parCoordenadas').html('<b>Autenticación satisfactoria.</b><br> Ya puedes ingresar y visualizar tus datos Clínicos.<br>Recuerda cerrar sesión al finalizar y no comparta su información de acceso con otros.');
            $('.enviarCoordenadas').attr("disabled", "disabled");
            
            var url = 'HCW/index.php';
            $(location).attr('href', url);
            
            $("#loadingIconEnviarCoord").hide(1);

        }, //success 2
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadingIconEnviarCoord").hide(1);
            ArmarMensajeSegunTipoError(xhr);
            $('#lblCoord1Resp').val('');
            $('#lblCoord2Resp').val('');
            $('#lblCoord1Resp').focus();
        }
    }); //end ajax 2

    return false;
});   //fin click

function ObtenerReferenciaTarjeta() {  
    var urlObtenerReferencia = urlPortalAPI + 'TarjetaCoordenadas/ObtenerReferencia';

    var params = {
        AccessToken: localStorage.getItem("AccessTokenGenerico")
    };

    $.ajax({
        url: urlObtenerReferencia,
        data: params,
        type: "GET",
        ContentType: 'application/json',
        success: function (result) {
            if (result.Message != '') {
                $("#lblNumeroTarjeta").html('Tarjeta Nro.: ' + result.Message);
            } else {
                $("#lblNumeroTarjeta").html('');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (xhr.status != 401) {
                //Como el método "ObtenerReferenciaTarjeta" se ejecuta siempre después del "GenerarParCoordenadas", no volvemos a mostrar el "No autorizado" en caso de ser así.
                MostrarMensajeTipoErrorGenerico(xhr);
            }
        }
    });  //end ajax ObtenerReferenciaTarjeta
}

/*****************************************************************
LOGIN - Reestablecer contraseña
*****************************************************************/
$(function() {
    $('#frmSolicitudContraseniaBtn').click(function () {
        if (!$("#frmSolicitudContrasenia").valid()) {
            return false;
        }

        $("#loadingIconClave").show(1);
    
        var urlRestablecimiento = urlPortalAPI + 'Password/SolicitarRestablecimiento';
    
        var gResponse = grecaptcha.getResponse(recaptchaRestab);
        
        var params = {
            Email: $('#recuperar-email').val(),
            NombreUsuario: $('#recuperar-email').val(),
            RespuestaCaptcha: gResponse
        };
    
        $.ajax({
            url: urlRestablecimiento,
            data: params,
            type: "POST",
            ContentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (result) {
                $('#recuperarClave').modal('hide');
                grecaptcha.reset(recaptchaRestab);
                $("#loadingIconClave").hide(1);
                bootbox.alert('Hemos enviado un mensaje a tu casilla de correo para restablecer la contraseña.<p>Por favor verifica tu correo!</p>');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                grecaptcha.reset(recaptchaRestab);
                $("#loadingIconClave").hide(1);
                ArmarMensajeSegunTipoError(xhr);
            }

        }); //end ajax
        return false;
    }); //end submit


/*****************************************************************
LOGIN - REGISTRAR NUEVA CUENTA
*****************************************************************/
    $('#registrarNuevaCuentaBtn').click(function () {
        if (!$("#registrarNuevaCuenta").valid()) {
            return false;
        }
        $("#loadingIconRegistro").show(1);
    
        if (!$('#terminos').is(':checked')) {
            bootbox.alert('Debe leer y aceptar los "Términos y Condiciones" para continuar.');
            return false;
        }
        
        var gResponse = grecaptcha.getResponse(recaptchaRegis);
        
        //$('.overlayInicio').fadeIn('slow');

        var miurlRegisterPersona = urlPortalAPI + 'Usuario/Registrar';

        var params = {
            EmailUsuario: $('#registroEmail').val(),
            RespuestaCaptcha: gResponse
        };

        $.ajax({
            url: miurlRegisterPersona,
            data: params,
            type: "POST",
            ContentType: 'application/json',
            success: function (result) {
                bootbox.alert('<b>¡Muchas gracias!</b><br>Por favor verifique su casilla de correo para continuar con el registro.');
                $('#registroEmail').val('');
                confirmarRegistro = true;
                grecaptcha.reset(recaptchaRegis);
                $('#terminos').prop('checked',false);
                $("#loadingIconRegistro").hide(1);
                $('#registerModal').modal('hide');
            }, //success
            error: function (xhr, ajaxOptions, thrownError) {
                confirmarRegistro = false;
                MostrarMensajeTipoErrorGenerico(xhr);
                grecaptcha.reset(recaptchaRegis);
                $("#loadingIconRegistro").hide(1);
                $('#registerModal').modal('hide');
            }
        }); //end ajax

        return false;
    }); //end submit
});

function recuperarPassClick(){
    $('#ingresar').modal('hide');
    $('#recuperarClave').modal('show');
}