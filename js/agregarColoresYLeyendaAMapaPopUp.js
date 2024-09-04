    
    


      function agregarColoresYLeyendaAMapa(csvConvertidoAObjeto, map, elementoHtmlParaDepositarLeyenda) {

        var listaLeyendas = new Array();
      
          // Create an object to map entities to their organism types
          var entityTypeMap = {};
          csvConvertidoAObjeto.forEach(row => {
              entityTypeMap[row['PODER_EJECUTIVO_ENTIDAD']] = row['NATURALEZA_JURIDICA_DEL_ORGANISMO'];
          });
      
          // Load and display the GeoJSON on the map
          fetch('mexico-with-regions_.geojson')
              .then(response => response.json())
              .then(geojson => {
                  L.geoJson(geojson, {
                      style: function (feature) {
                          var tipoOrganismo = entityTypeMap[feature.properties.name];
      
                          // Add legend item a partir de lo que se haya creado en el mapa
                          if (tipoOrganismo) {
                              // Check if the legend item already exists                            

                              var legendAlreadyExists = listaLeyendas.some(item => item === tipoOrganismo);
      
                              if (!legendAlreadyExists) {                                 
                                  console.debug("pushing " + tipoOrganismo);                           
                                  listaLeyendas.push(tipoOrganismo);
                              }
                          }
      
                          // Style for the state on the map
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
                        const naturalezaJuridica = csvConvertidoAObjeto.find(row => row['PODER_EJECUTIVO_ENTIDAD'] === entidad)['NATURALEZA_JURIDICA_DEL_ORGANISMO'] || 'No disponible';
                        const adscripcion = csvConvertidoAObjeto.find(row => row['PODER_EJECUTIVO_ENTIDAD'] === entidad)['DEPENDENCIA_DE_ADSCRIPCION'] || 'No disponible';
                        const organismosCienciaTecnologia = csvConvertidoAObjeto.find(row => row['PODER_EJECUTIVO_ENTIDAD'] === entidad)['PODER_EJECUTIVO_ORGANISMOS_ESTATALES_DE_CIENCIA_Y__TECNOLOGÍA'] || 'No disponible';
                        const entidadIconUrl = `imagenes/estados/${entidad.toLowerCase().replace(/\s+/g, '')}.png`;

                    
                        layer.bindPopup(`
                            <b>${entidad}</b><br>
                            ${organismosCienciaTecnologia}<br>
                            Naturaleza Jurídica: ${naturalezaJuridica}<br>
                            Adscripción: ${adscripcion}<br>
                            <img src="${entidadIconUrl}" alt="Entidad Icon" style="width: 30px; height: 30px;">
    
                        `);
                    }
                    
      
                  }).addTo(map);
      
                  // Call agregarLeyendasOrdenadamente after legends have been pushed
                  agregarLeyendasOrdenadamente(listaLeyendas, elementoHtmlParaDepositarLeyenda);
                  
              })
              .catch(error => {
                  console.error('Error fetching GeoJSON data:', error)
              });
      }
      
    

    // Function to get color based on organism type
    function getColorParaOrganismo(tipoOrganismo) {
        var colorMapping = {
            'Secretaría': '#808000',    // Olive
            'Organismo Público Descentralizado': '#8B0000',   // Red
            'Órgano desconcentrado': '#BA55D3',      // Light blue            
            'No existe': '#E0FFFF'         // Golden
        };
        return colorMapping[tipoOrganismo] || '#FFFFFF'; // Default color if type not found
    }

    function agregarLeyendasOrdenadamente(listaLeyendas, elementoHtmlParaDepositarLeyenda){

    //Por ultimo agregar las leyendas al mapa, que quedaron almacenadas en listaLeyendas

    console.debug("ordenando lista " + listaLeyendas);

    //Pero las quieres en cierto orden     

    var customOrder = ["Secretaría", "Organismo Público Descentralizado", "Órgano desconcentrado", "No existe"];

    var listaLeyendasOrdenada = listaLeyendas.sort(function(a, b) {
    return customOrder.indexOf(a) - customOrder.indexOf(b);
    });

    console.debug("lista ya ordenada " +  listaLeyendasOrdenada);      
    
    
    listaLeyendasOrdenada.forEach((itemOrdenado) => {          
        
    var legendItem = document.createElement('div');
    legendItem.innerHTML = `<span style="background-color: ${getColorParaOrganismo(itemOrdenado)}; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></span>${itemOrdenado}`;

    elementoHtmlParaDepositarLeyenda.appendChild(legendItem);  
        
    });
                    

    }
