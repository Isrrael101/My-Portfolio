$(document).ready(function () {
  // Inicio del script de la barra de navegación pegajosa al hacer scroll hacia abajo
  $(window).scroll(function () {
    if (this.scrollY > 20) {
      $(".navbar").addClass("sticky");
    } else {
      $(".navbar").removeClass("sticky");
    }
    // Inicio del script del botón de desplazamiento hacia arriba
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
    // Inicio del script de desvanecimiento de elementos al hacer scroll
    $(".fadein").each(function (i) {
      var bottom_of_element = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

      if (bottom_of_window > bottom_of_element) {
        $(this).addClass("showme");
      }
      if (bottom_of_window < bottom_of_element) {
        $(this).removeClass("showme");
      }
    });
  });
  // Inicio del script del botón de desplazamiento hacia arriba
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
  });
  // Inicio del script de animación de escritura
  var typed = new Typed(".typing", {
    strings: ["Alumno", "de Java Script", "de la", "Universidad Pública del Alto UPEA"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
  var typed = new Typed(".typing2", {
    strings: ["Alumno", "de Java Script", "de la", "Universidad Pública del Alto UPEA"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
  });
  // Inicio del script de alternancia del menú/barra de navegación
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });
  // Inicio del script
  $(".carousel").owlCarousel({
    margin: 20,
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
      },
    },
  });
  const carrito = document.querySelector("#carrito");

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {
  limpiarHTML(); // limpiamos el html

  articulosCarrito.forEach((curso) => {
    const row = document.createElement("tr");
    const { imagen, titulo, precio, cantidad, id } = curso;
    row.innerHTML = `
               <td>  
                    <img src="${imagen}" width=100>
               </td>
               <td>${titulo}</td>
               <td>${precio}</td>
               <td>${cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${id}">Eliminar</a>
               </td>
          `;
    contenedorCarrito.appendChild(row);
  });

  sincronizarStorage();
}

});