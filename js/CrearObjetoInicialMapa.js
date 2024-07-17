    function crearObjetoInicialMapa() {
        var map = L.map('map').setView([23.6345, -102.5528], 5); // Central coordinates of Mexico

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        //Esta funcion esta amarrada al objeto del mapa y se dispara cada vez que se detecte un nuevo zoom
        map.on('zoomend', function() {
            console.debug("Cambio en zoom detectado, el nuevo zoom es: " + map.getZoom())
            updateMarkerSizes(map);
        });

        return map;
    }