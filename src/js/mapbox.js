'use strict';

var map = new mapboxgl.Map({
    container: 'map-canvas',
    style: 'mapbox://styles/mapbox/satellite-streets-v9'
});

map.on('load', function() {
   map.addLayer({
        id: 'photos',
        type: 'symbol',
        source: {
            type: 'geojson',
            data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_ports.geojson'
        }
   });
})