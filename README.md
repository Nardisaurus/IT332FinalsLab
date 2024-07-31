# Map Routing Application

## Overview
This application provides a simple interface for users to find and display routes from their current location to a specified destination using Leaflet and Mapbox APIs. The application features a responsive design, a collapsible geocoder panel, and dynamically updates routes based on user input.

## Technology Used
1. <b>Map API:</b> Leaflet with Mapbox.
2. <b>Frontend:</b> HTML, CSS, JavaScript.
3. <b>Backend:</b> Pure client-side application.

## User Story
As a user, I want to search for a destination and get a route from my current location to navigate easily to the desired place.

## Steps to Set Up and Run the Application
1. <b>Prerequisites</b><br>
<b>Mapbox Access Token:</b> Obtain an access token by signing up at Mapbox. Then, change the mapboxToken in the app.js file.<br>
<b>Web Browser:</b> Any modern web browser (e.g., Chrome, Firefox, Safari).<br>

2. <b>Clone/Download the repository</b><br>
<b>Clone the repository to your local machine using Git:</b><br>git clone https://github.com/yourusername/leaflet-routing-app.git<br>
cd leaflet-routing-app<br>
<b>Download the File:</b>Go to the code tab, click the green code button, click download ZIP, Unzipped the file.<br>

3. <b>Set Up Environment Variables</b><br>
Replace YOUR_MAPBOX_ACCESS_TOKEN in the app.js file with your Mapbox access token.<br>
const mapboxToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your Mapbox access token<br>
<b>Web Browser:</b> Any modern web browser (e.g., Chrome, Firefox, Safari).<br>

4. <b>Run the Application</b><br>
Open the index.html file in your browser. You can double-click the file or use the "Open File" option in your browser.

## Features
<b>Current Location Detection:</b> Automatically centers the map on the user's current location using browser geolocation. <br>
<b>Destination Search:</b> Users can input a destination to find the nearest matching location.<br>
<b>Route Display:</b> Shows the route from the user's current location to the specified destination.<br>
<b>Collapsible Geocoder Panel:</b> Users can collapse the input panel for a better view of the map.<br>
<b>Responsive Design:</b> The application is styled to be responsive across various devices and screen sizes.<br>

## Additional Functionalities
<b>Loading Indicators:</b> Visual cues while data is being fetched.<br>
<b>Error Handling:</b> Alerts for issues like geolocation errors or missing destination input.<br>

## Styling
The application is styled using CSS for responsiveness and a clean user interface.<br>

## Troubleshooting
<b>Map Not Loading:</b> Ensure your Mapbox token is correctly set and that the API has not reached its usage limits.<br>
<b>Location Not Detected:</b> Check if geolocation services are enabled and allowed in your browser.<br>
<b>No Route Displayed:</b> Ensure the destination is spelled correctly and try searching again.<br>



