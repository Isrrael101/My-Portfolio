// Variables
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#ventas"); // Cambié el selector para que coincida con la lista de cursos
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

// Listeners
cargarEventListeners();

// Registro de event listeners
function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Cuando se elimina un curso del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar todo el carrito
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Mostrar los cursos del storage
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });
}

// Funciones
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector(".agregar-carrito").getAttribute("data-id"), // Cambié el selector para obtener el ID del curso
    cantidad: 1,
  };

  const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

  if (existe) {
    // Si el curso ya existe en el carrito, incrementamos su cantidad en uno
    articulosCarrito.forEach(curso => {
      if (curso.id === infoCurso.id) curso.cantidad++;
    });
  } else {
    // Si el curso no existe en el carrito, lo añadimos al arreglo
    articulosCarrito.push(infoCurso);
  }

  carritoHTML();
}

function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    // Buscamos el curso en el carrito
    const cursoEnCarrito = articulosCarrito.find(curso => curso.id === cursoId);
    // Si la cantidad es mayor a 1, reducimos la cantidad en uno
    if (cursoEnCarrito.cantidad > 1) {
      cursoEnCarrito.cantidad--;
    } else {
      // Si la cantidad es 1, eliminamos todo el curso del carrito
      articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    }
    carritoHTML();
  }
}

function vaciarCarrito() {
  // Vaciamos todo el carrito
  articulosCarrito = [];
  carritoHTML();
}

function carritoHTML() {
  limpiarHTML();
  articulosCarrito.forEach(curso => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${imagen}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-curso" data-id="${id}">Eliminar</a></td>
    `;
    contenedorCarrito.appendChild(row);
  });
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
