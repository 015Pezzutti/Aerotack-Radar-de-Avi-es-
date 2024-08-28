// Chave de API do Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoicGV6enV0dGktMjUiLCJhIjoiY20wYTF2dmh6MDI1OTJrcTN2ZDUwbnZ2MSJ9.yUiG7OFkkYOmNdmLv_glGA';

// Inicializar o mapa
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-0.1276, 51.5074], // Coordenadas iniciais (Londres)
    zoom: 4
});

// Função para adicionar ícones de avião no mapa
function addFlightMarker(flight) {
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(images/airplane-icon.png)';
    el.style.width = '30px';
    el.style.height = '30px';

    new mapboxgl.Marker(el)
        .setLngLat([flight.longitude, flight.latitude])
        .addTo(map)
        .getElement()
        .addEventListener('click', function() {
            showFlightDetails(flight);
        });
}

// Função para mostrar os detalhes do voo
function showFlightDetails(flight) {
    var details = `
        <strong>Companhia Aérea:</strong> ${flight.airline_name}<br>
        <strong>Origem:</strong> ${flight.departure_airport}<br>
        <strong>Destino:</strong> ${flight.arrival_airport}<br>
        <strong>Horário de Partida:</strong> ${flight.departure_time}<br>
        <strong>Horário de Chegada:</strong> ${flight.arrival_time}<br>
        <strong>Status:</strong> ${flight.status}
    `;
    document.getElementById('flight-details').innerHTML = details;
}

// Obter dados de voos em tempo real
async function fetchFlights() {
    try {
        let response = await fetch('https://aviationstack.com/v1/flights?access_key=9a6780397aa7bf82c425fced1a82592d');
        let data = await response.json();
        data.data.forEach(flight => {
            if (flight.latitude && flight.longitude) {
                addFlightMarker(flight);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar dados de voos:', error);
    }
}

// Chamar a função para buscar e exibir voos
fetchFlights();
