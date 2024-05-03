const agregar_texto = document.querySelector('.agregar-texto');
const contenedor_texto = document.querySelector('.contenedor-texto');

agregar_texto.addEventListener("click", crearTexto)

function crearTexto() {
    const textoHTML = `<p>Esta semana dos hermanos fueron atacados fuertemente por el dengue. La pasaron mal por una semana y volvieron el mismo día a sus respectivos trabajos.</p>
    <p>Lo gracioso? Ninguno de los dos hermanos sabía que estaban viviendo exactamente lo mismo como si de una telenovela escrita por alguien se tratara.</p>
    <p> TREMENDO este Dengue!!!</p>
    `;

    contenedor_texto.innerHTML = textoHTML;
}

