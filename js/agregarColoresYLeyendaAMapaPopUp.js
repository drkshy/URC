function agregarColoresYLeyendaAMapa(csvConvertidoAObjeto, map, elementoHtmlParaDepositarLeyenda) {

    var listaLeyendas = new Array();

    // Crear un objeto para mapear entidades a sus tipos de organismos
    var entityTypeMap = {};
    csvConvertidoAObjeto.forEach(row => {
        entityTypeMap[row['PODER_EJECUTIVO_ENTIDAD']] = row['NATURALEZA_JURIDICA_DEL_ORGANISMO'];
    });

    // Función para mostrar la información del estado seleccionado
    function mostrarInformacionEstado(row) {
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

    // Cargar y mostrar el GeoJSON en el mapa
    fetch('mexico-with-regions_.geojson')
        .then(response => response.json())
        .then(geojson => {
            L.geoJson(geojson, {
                style: function (feature) {
                    var tipoOrganismo = entityTypeMap[feature.properties.name];

                    // Agregar elemento a la leyenda
                    if (tipoOrganismo) {
                        var legendAlreadyExists = listaLeyendas.some(item => item === tipoOrganismo);

                        if (!legendAlreadyExists) {
                            listaLeyendas.push(tipoOrganismo);
                        }
                    }

                    // Estilo para el estado en el mapa
                    return {
                        fillColor: getColorParaOrganismo(tipoOrganismo),
                        weight: 1,
                        opacity: 1,
                        color: '#000',
                        dashArray: '',
                        fillOpacity: 0.7
                    };
                },
                onEachFeature: function (feature, layer) {
                    const entidad = feature.properties.name;                        
                    const row = csvConvertidoAObjeto.find(row => row['PODER_EJECUTIVO_ENTIDAD'] === entidad);
                    const Gobernador = row ? row['PODER_EJECUTIVO_GOBERNADOR'] : 'No disponible';
                    const naturalezaJuridica = row ? row['NATURALEZA_JURIDICA_DEL_ORGANISMO'] : 'No disponible';
                    const partido = row ? row['PODER_EJECUTIVO_PARTIDO'] : 'No disponible';
                    const Periodo = row ? row['PODER_EJECUTIVO_PERIODO'] : 'No disponible';
                    const adscripcion = row ? row['DEPENDENCIA_DE_ADSCRIPCION'] : 'No disponible';
                    const organismosCienciaTecnologia = row ? row['PODER_EJECUTIVO_ORGANISMOS_ESTATALES_DE_CIENCIA_Y__TECNOLOGÍA'] : 'No disponible';
                    const entidadIconUrl = `imagenes/estados/${entidad.toLowerCase().replace(/\s+/g, '')}.png`;
                    const partidoIconUrl = `imagenes/partidos/${partido.toLowerCase().replace(/\s+/g, '')}.jpg`;

                    layer.bindPopup(`
                        <img src="${entidadIconUrl}" alt="Entidad Icon" style="width: 50px; height: 50px;">
                        <b>${entidad}</b><br>
                        Gobernador: ${Gobernador}<br>
                        <div style="display: flex; align-items: center;">
                            Partido: <span style="margin-left: 5px;">${partido}</span>
                            <img src="${partidoIconUrl}" alt="Partido Icon" style="width: 20px; height: 20px; margin-left: 5px;">
                        </div>
                        Periodo: ${Periodo}<br>
                        ${organismosCienciaTecnologia}<br>
                        Naturaleza Jurídica: ${naturalezaJuridica}<br>
                        Adscripción: ${adscripcion}<br>
                    `);
                    

                    // Añadir evento de clic para mostrar la información en el panel derecho
                    layer.on('click', function() {
                        mostrarInformacionEstado(row);
                        
                        // Borrar la selección de la lista desplegable
                        document.getElementById('stateSelector').value = "";
                    });
                }

            }).addTo(map);

            // Llamar a agregarLeyendasOrdenadamente después de que las leyendas hayan sido agregadas
            agregarLeyendasOrdenadamente(listaLeyendas, elementoHtmlParaDepositarLeyenda);

        })
        .catch(error => {
            console.error('Error fetching GeoJSON data:', error)
        });
}

// Función para obtener el color basado en el tipo de organismo
function getColorParaOrganismo(tipoOrganismo) {
    var colorMapping = {
        'Secretaría': '#808000',    // Olive
        'Organismo Público Descentralizado': '#8B0000',   // Red
        'Órgano desconcentrado': '#BA55D3',      // Light blue            
        'No existe': '#E0FFFF'         // Golden
    };
    return colorMapping[tipoOrganismo] || '#FFFFFF'; // Color predeterminado si el tipo no se encuentra
}

function agregarLeyendasOrdenadamente(listaLeyendas, elementoHtmlParaDepositarLeyenda){

    // Agregar las leyendas al mapa, que quedaron almacenadas en listaLeyendas

    console.debug("ordenando lista " + listaLeyendas);

    // Ordenar las leyendas según el orden personalizado
    var customOrder = ["Secretaría", "Organismo Público Descentralizado", "Órgano desconcentrado", "No existe"];

    var listaLeyendasOrdenada = listaLeyendas.sort(function(a, b) {
        return customOrder.indexOf(a) - customOrder.indexOf(b);
    });

    console.debug("lista ya ordenada " +  listaLeyendasOrdenada);      
    
    // Agregar las leyendas ordenadas al elemento HTML
    listaLeyendasOrdenada.forEach((itemOrdenado) => {          
        
        var legendItem = document.createElement('div');
        legendItem.innerHTML = `<span style="background-color: ${getColorParaOrganismo(itemOrdenado)}; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></span>${itemOrdenado}`;

        elementoHtmlParaDepositarLeyenda.appendChild(legendItem);  
        
    });
}
