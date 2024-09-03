// Array para almacenar los marcadores
var markers = [];

// Función para agregar marcadores al mapa con íconos personalizados y poblar el dropdown
function agregarMarcadoresEntidadesAMapa(csvConvertidoAObjeto, map) {
    const selector = document.getElementById('stateSelector');

    // Limpiar el dropdown antes de agregar opciones
    selector.innerHTML = '';

    // Agregar la opción inicial "Selecciona un estado"
    const defaultOption = document.createElement('option');
    defaultOption.value = ""; // Valor vacío para representar "ningún estado seleccionado"
    defaultOption.text = "Selecciona un estado";
    selector.appendChild(defaultOption);

    csvConvertidoAObjeto.forEach(row => {
        var entidad = row['PODER_EJECUTIVO_ENTIDAD'];

        if (!entidad) {
            return;
        }

        // Añadir la opción al dropdown
        const option = document.createElement('option');
        option.value = entidad;
        option.text = entidad;
        selector.appendChild(option);

        var partido = row['PODER_EJECUTIVO_PARTIDO'];
        var partidoIconUrl = `imagenes/partidos/${partido.toLowerCase().replace(/\s+/g, '')}.jpg`;
        var entidadIconUrl = `imagenes/estados/${entidad.toLowerCase().replace(/\s+/g, '')}.png`;
        var normalIconSize = [50, 55]; // Hacer los iconos un poco más grandes

        var markerIcon = L.icon({
            iconUrl: entidadIconUrl,
            iconSize: normalIconSize,
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });

        var marker = L.marker([parseFloat(row['LATITUD_DEL_ESTADO']), parseFloat(row['LONGITUD_DEL_ESTADO'])], { icon: markerIcon });

        // Asocia la información con el marcador
        marker.estado = entidad;
        marker.info = row;

        // Asocia la ventana emergente (popup) con el marcador
        marker.bindPopup(`
            <h4>${row['PODER_EJECUTIVO_ENTIDAD']}</h4>
            <p>Gobernador: ${row['PODER_EJECUTIVO_GOBERNADOR']}</p>
            <p>Partido: ${row['PODER_EJECUTIVO_PARTIDO']}</p>
            <p>Período: ${row['PODER_EJECUTIVO_PERIODO']}</p>
            <p>Naturaleza Jurídica: ${row['NATURALEZA_JURIDICA_DEL_ORGANISMO']}</p>
            <p>Adscripción: ${row['DEPENDENCIA_DE_ADSCRIPCION']}</p>
            <p>${row['PODER_EJECUTIVO_ORGANISMOS_ESTATALES_DE_CIENCIA_Y__TECNOLOGÍA']}</p>
            <img src="${partidoIconUrl}" alt="Partido Icon" style="width: 30px; height: 30px;">
            <a href="${row['URL_ESTADO']}" target="_blank">Página oficial del estado</a>
        `);

        // Añadir el marcador al array de marcadores
        markers.push(marker);
    });

    // Manejar el evento de cambio en el selector de estados
    document.getElementById('stateSelector').addEventListener('change', function() {
        const selectedState = this.value;

        // Si se selecciona "Selecciona un estado"
        if (selectedState === "") {
            // Limpiar el mapa de marcadores
            markers.forEach(marker => map.removeLayer(marker));

            map.setView([23.6345, -102.5528], 5); // Coordenadas y zoom para mostrar todo el país
            map.closePopup(); // Cerrar cualquier popup abierto
            clearStateInfo(); // Limpiar la información del estado seleccionado
            return; // Salir de la función para evitar mostrar un marcador
        }

        const marker = markers.find(marker => marker.estado === selectedState);
        if (marker) {
            // Limpiar el mapa de cualquier marcador anterior antes de agregar el nuevo
            markers.forEach(marker => map.removeLayer(marker));

            mostrarInformacionEstado(marker);
            marker.addTo(map); // Asegurarse de que el marcador esté en el mapa
            marker.openPopup(); // Abrir el popup manualmente al seleccionar el estado
            map.setView(marker.getLatLng(), 7); // Centrar el mapa en el marcador seleccionado con un zoom más cercano
        }
    });
}

// Función para limpiar la información del estado seleccionado
function clearStateInfo() {
    document.getElementById('Titular').innerText = 'Titular Ejecutivo del Organismo: ';
    document.getElementById('Presidente').innerText = 'Presidente del Organismo: ';
    document.getElementById('leyEgresos').innerText = 'Presupuesto de Egresos: ';
    document.getElementById('Ley_CTI').innerText = 'Ley CTI: ';
    document.getElementById('Presupuesto_A').innerText = 'Presupuesto Asignado: ';
    document.getElementById('Presupuesto').innerText = 'Porcentaje en Presupuesto en Tecnología: ';
    document.getElementById('Innovacion').innerText = 'Innovacion: ';
    document.getElementById('Acceso_Abierto').innerText = 'Acceso abierto: ';
    document.getElementById('Vinculacion').innerText = 'Vinculacion: ';
    document.getElementById('CTI_Genero').innerText = 'Genero: ';
}

// Función para mostrar la información del estado seleccionado
function mostrarInformacionEstado(marker) {
    const row = marker.info;

    // Actualizar la información del estado seleccionado
    document.getElementById('Titular').innerText = 'Titular Ejecutivo del Organismo: ' + row['PODER_EJECUTIVO_TITULAR_DEL_ORGANISMO'];
    document.getElementById('Presidente').innerText = 'Presidente del Organismo: ' + row['PODER_LEGISLATIVO_PRESIDENTE_COMISION'];
    document.getElementById('leyEgresos').innerHTML = 'Presupuesto de Egresos: '; // Limpiar contenido previo
    var hyperlink = document.createElement('a');
    if (row['Ley_Egresos']) {
        hyperlink.innerText = 'Ver más';
        hyperlink.href = row['Ley_Egresos'];
        hyperlink.target = '_blank';
    } else {
        hyperlink.innerText = 'No hay referencia';
        hyperlink.href = '#';
    }
    document.getElementById('leyEgresos').appendChild(hyperlink);
    document.getElementById('Ley_CTI').innerText = 'Ley CTI: ' + row['Ley_de_CTI'];
    document.getElementById('Presupuesto_A').innerText = 'Presupuesto Asignado: ' + row['Presupuesto'];
    document.getElementById('Presupuesto').innerText = 'Porcentaje en Presupuesto en Tecnología: ' + row['PODER_EJECUTIVO_GASTO_EN_CIENCIA,TECNOLOGÍA_E_INNOVACIÓN'];
    document.getElementById('Innovacion').innerText = 'Innovacion: ' + row['Innovacion'];
    document.getElementById('Acceso_Abierto').innerText = 'Acceso abierto: ' + row['Acceso_Abierto'];
    document.getElementById('Vinculacion').innerText = 'Vinculacion: ' + row['Vinculacion'];
    document.getElementById('CTI_Genero').innerText = 'Genero: ' + row['genero_CTI'];
}
