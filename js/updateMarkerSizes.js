function updateMarkerSizes(map) {
    var zoom = map.getZoom();
    var scaleFactor = zoom / 5;
    var newIconSize = [35 * scaleFactor, 38 * scaleFactor];
    markers.forEach(marker => {
        var newIcon = L.icon({
            iconUrl: marker.options.icon.options.iconUrl,
            iconSize: newIconSize,
            iconAnchor: [12 * scaleFactor, 41 * scaleFactor],
            popupAnchor: [1 * scaleFactor, -34 * scaleFactor]
        });
        marker.setIcon(newIcon);
    });
}