 
 // Array to store markers
var markers = [];
 
 // Function to add markers to the map with custom icons
    function agregarMarcadoresEntidadesAMapa(csvConvertidoAObjeto, map) {

    csvConvertidoAObjeto.forEach(row => {
        var entidad = row['PODER_EJECUTIVO_ENTIDAD'];

        if (!entidad) {
            //console.info("Esta entidad viene nula en el csv asi que no creare nada");
            return;
        }    

        var partido = row['PODER_EJECUTIVO_PARTIDO'];
        var entidadIconUrl = `imagenes/estados/${entidad.toLowerCase().replace(/\s+/g, '')}.png`;
        var partidoIconUrl = `imagenes/partidos/${partido.toLowerCase().replace(/\s+/g, '')}.jpg`;

        var normalIconSize = [35, 38];

        var markerIcon = L.icon({
            iconUrl: entidadIconUrl,
            iconSize: normalIconSize,
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });

        var marker = L.marker([parseFloat(row['LATITUD_DEL_ESTADO']), parseFloat(row['LONGITUD_DEL_ESTADO'])], { icon: markerIcon }).addTo(map);
        
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

        marker.on('click', () => {
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
        });

        //Se guarda el marker recien creado en un array para poder modificarlo despues
        markers.push(marker);

    });
}
