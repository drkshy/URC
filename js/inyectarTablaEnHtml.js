function inyectarTablaEnHtml(elementoHtml, tituloTabla, datosAMostrar, className) {
    const container = document.getElementById(elementoHtml);
    container.innerHTML = ""; // Clear previous content

    const titulo = document.createElement('h4');
    titulo.innerHTML = tituloTabla;
    titulo.className = 'card-title'; // Agregar clase de Bootstrap y personalizada
    container.appendChild(titulo);

    // Create table element
    const table = document.createElement('table');
    table.className = "table table-striped table-hover"; // Agregar clases de Bootstrap para tabla

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Append data rows to tbody
    datosAMostrar.forEach((element) => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.innerHTML = element[className];
        row.appendChild(cell);
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    container.appendChild(table);
}