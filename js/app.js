// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarritos = [];




cargarEventListener()
function cargarEventListener(){
    listaCursos.addEventListener('click',agregarCursos);

    carrito.addEventListener('click',eliminarCurso);

    vaciarCarritoBtn.addEventListener('click',() =>{
        articulosCarritos = [];
        limpiarHTML();
    });
}


// funciones

function agregarCursos(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursosSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursosSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarritos = articulosCarritos.filter(curso => {
            if (curso.id === cursoId) {
                // Si hay más de una unidad, reduce la cantidad en uno
                if (curso.cantidad > 1) {
                    curso.cantidad--;
                    return true; // Mantén el curso en el carrito
                } else {
                    return false; // Elimina el curso del carrito
                }
            }
            return true; // Mantén los cursos que no coinciden con el ID
        }); 
        carritoHTML();
        }
    }

// lee el contenido del HTML al que le dimos click y extrae la informacion del curso

function leerDatosCursos(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    // revisa si un elmento ya existe en el carrito
    const existe = articulosCarritos.some(curso => curso.id === infoCurso.id);
        if (existe){
            const cursos = articulosCarritos.map(curso => {
                if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso;
                }else{
                    return curso;
                }
            })
            articulosCarritos =[...cursos];
        }else{
            articulosCarritos = [...articulosCarritos, infoCurso];
        }


    // agrega elementos al arreglo de carrito
    
    carritoHTML();
};

// muestra el carrito de compras en html

function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();
    
    
    
    // Recorre el carrito y genera el HTML
    articulosCarritos.forEach(curso =>{
        const {imagen, titulo, precio, cantidad, id}= curso;
        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td>
                <img src= "${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        // agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// elimina los cursos del tbody

function limpiarHTML() {
    // contenedorCarrito.innerHTML='';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}