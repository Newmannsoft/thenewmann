const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});
/*trancition*/
window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    /*Selector */
    /* listenier  */
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'))
            evento.target.classList.add('activo');
            /*Selector y conversor a minusculas */
            const categoria = evento.target.innerHTML.toLowerCase();
            /*Filtrado */
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    /* Filtrado de imagenes Barra de busqueda */

    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value.toLowerCase();
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda));
    });

    /*items for the images */

    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        const ruta = elemento.getAttribute('src');
        const description = elemento.parentNode.parentNode.dataset.description;

        elemento.addEventListener('click', () => {
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src =ruta;
        });
    });

    /*Event boton cerrar */

    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    /*Event overlay cerrar */

    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    })
});
