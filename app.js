const mapboxToken = 'pk.eyJ1IjoibmFyZGlzYXVydXMiLCJhIjoiY2x6OTc0MzkwMDBrNDJycHc5YzFuNjlpbSJ9.2OxSvfykN19dbLNdlFw4iw'; // Mapbox access token
const map = L.map('map').setView([14.066804271715498, 120.62620559741354], 13); // Default center, BatstateU ARASOF Nasugbu

L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`, {
    attribution: '© Mapbox © OpenStreetMap contributors',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);


let currentLocationMarker;
let routingControl;
let markers = []; 



function getLocationAndSetupRouting() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function onSuccess(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;


    map.setView([userLat, userLng], 13);

  
    if (currentLocationMarker) {
        currentLocationMarker.setLatLng([userLat, userLng]);
    } else {
        currentLocationMarker = L.marker([userLat, userLng]).addTo(map)
            .bindPopup('You are here')
            .openPopup();
    }
}

function findRoute() {
    const destination = document.getElementById('destination').value;

    if (!destination) {
        alert("Please enter a destination.");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const encodedDestination = encodeURIComponent(destination);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedDestination}.json?proximity=${userLng},${userLat}&access_token=${mapboxToken}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.features && data.features.length > 0) {
                    const sortedFeatures = data.features.sort((a, b) => {
                        const distA = getDistance(userLat, userLng, a.geometry.coordinates[1], a.geometry.coordinates[0]);
                        const distB = getDistance(userLat, userLng, b.geometry.coordinates[1], b.geometry.coordinates[0]);
                        return distA - distB;
                    });

                    const nearestFeature = sortedFeatures[0];
                    const destinationLatLng = nearestFeature.geometry.coordinates;

                    if (routingControl) {
                        map.removeControl(routingControl);
                    }
                    markers.forEach(marker => map.removeLayer(marker));
                    markers = [];

                    routingControl = L.Routing.control({
                        waypoints: [
                            L.latLng(userLat, userLng),
                            L.latLng(destinationLatLng[1], destinationLatLng[0])
                        ],
                        routeWhileDragging: true,
                        router: L.Routing.mapbox(mapboxToken),
                        geocoder: L.Control.Geocoder.nominatim()
                    }).addTo(map);

                    const destinationMarker = L.marker([destinationLatLng[1], destinationLatLng[0]]).addTo(map)
                        .bindPopup('Destination')
                        .openPopup();
                    markers.push(destinationMarker);
                } else {
                    alert("No similar destination found.");
                }
            })
            .catch(err => {
                console.error("Error fetching destination:", err);
                alert(`Error fetching destination: ${err.message}`);
            });
    });
}

function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

function onError(error) {
    alert("Error getting location: " + error.message);
}


function toggleCollapse() {
    const controls = document.getElementById('controls');
    controls.classList.toggle('collapsed');
}

document.getElementById('findRoute').addEventListener('click', findRoute);

getLocationAndSetupRouting();
