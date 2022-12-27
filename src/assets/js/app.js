//----------------------------------------------------------------------------------------------------------------------------//
// Funcion copiar
//----------------------------------------------------------------------------------------------------------------------------//

function copiarEnClipboard(element) {

	if( Object.prototype.toString.call(element) == '[object String]' ) {
		var original = element;
	   	var $temp = $("<input id='dummyEliminar'>");
		$("body").append($temp);
		$temp.val(original);
		$temp.select();
		document.execCommand("copy");
		$temp.remove();

		$('body').append('<div class="alert alert-success copiaExitosa" role="alert" style="position: fixed; top: 6px !important; left: calc(50vw - 30vw); width: 60vw; z-index: 50;">Codigo <strong>' + element + '</strong> se copio en el portapapeles.</div>');
		$('.copiaExitosa').fadeIn();

		setTimeout(function(){

			$('.copiaExitosa').fadeOut();

			setTimeout(function(){

				$('.copiaExitosa').remove();

			},500);

		},2000);

	}else{
		var original = $(element).clone();
		original.removeAttr('onclick');
		original.removeAttr('data-original-title');
		original.removeAttr('title');
		var $temp = $("<input id='dummyEliminar'>");
		$("body").append($temp);
		$temp.val(original.prop('outerHTML')).select();
		document.execCommand("copy");
		$temp.remove();

		$(element).tooltip({
			trigger:"manual",
			placement: "top",
			title: "¡Codigo copiado!"
		});

		$(element).tooltip('show');

		setTimeout(function(){

			$(element).tooltip('hide');

		},1000);
	}


}

const menuCollapseButton = document.getElementById('menuCollapseButton');
const menuCollapseButton2 = document.getElementById('menuCollapseButton2');
const sidebarContent = document.getElementsByClassName('mainHCEContent__sidebar')[0];

const colapsarSiderbar = () => {
   sidebarContent.classList.toggle('colapsado');
}

const validarSiderbar = (validar) => {
   if(validar == null){
      localStorage.clear();
      window.localStorage.setItem('configSidebarColapsado', 'false');
   }else{
      if(sidebarContent.classList.contains('colapsado')){
         localStorage.clear();
         window.localStorage.setItem('configSidebarColapsado', 'true');
         console.log(window.localStorage.getItem('configSidebarColapsado'));
      }else{
         localStorage.clear();
         window.localStorage.setItem('configSidebarColapsado', 'false');
         console.log(window.localStorage.getItem('configSidebarColapsado'));
      }
   }

}

window.onload = function() {

   if(window.localStorage.getItem('configSidebarColapsado') == 'true'){
      colapsarSiderbar();
   }else{
      sidebarContent.classList.add('colapsado');
   }

};

menuCollapseButton.onclick = () => {
   colapsarSiderbar();
   validarSiderbar(window.localStorage.getItem('configSidebarColapsado'));
}

menuCollapseButton2.onclick = () => {
   colapsarSiderbar();
   validarSiderbar(window.localStorage.getItem('configSidebarColapsado'));
}

//btnSidebar.onclick = () => {
 //  colapsarSiderbar();
 //  validarSiderbar(window.localStorage.getItem('configSidebarColapsado'));
//}

$(function () {
   var current = location.pathname;
   $('.mainHCEContent__sidebar li a').each(function () {
      var $this = $(this);
      // if the current path is like this link, make it active
      if ($this.attr('href').indexOf(current) !== -1) {
         $this.addClass('active');
      }
   })
})
