// ChoroplethMap class definition
class ChoroplethMap {
   constructor() {
    // Map and layer variables
	this.map = null; // Declare a variable for the Leaflet map instance and initialize it as null.
	this.osmLayer = null; // Declare a variable for the OpenStreetMap tile layer and initialize it as null.
	this.singleMarker = null; // Declare a variable for a single marker on the map and initialize it as null.
	this.popup = null; // Declare a variable for a popup associated with the marker and initialize it as null.
	this.CartoDB_DarkMatter = null; // Declare a variable for the CartoDB Dark Matter tile layer and initialize it as null.
	this.googleStreets = null; // Declare a variable for the Google Streets tile layer and initialize it as null.
	this.googleSat = null; // Declare a variable for the Google Satellite tile layer and initialize it as null.
	this.Stamen_Watercolor = null; // Declare a variable for the Stamen Watercolor tile layer and initialize it as null.
	this.linedata = null; // Declare a variable for a GeoJSON layer for line data and initialize it as null.
	this.pointdata = null; // Declare a variable for a GeoJSON layer for point data and initialize it as null.
	this.nepaldata = null; // Declare a variable for a GeoJSON layer specific to Nepal data and initialize it as null.
	this.geojson = null; // Declare a variable for a GeoJSON layer for U.S. states data and initialize it as null.
	this.polygondata = null; // Declare a variable for a GeoJSON layer for polygon data and initialize it as null.

	//////////////////////////////////////////////
	// YOU CAN ADD MORE DATA VARIABLES HERE BELOW:
	//////////////////////////////////////////////
	this.statesTest = null;



	//////////////////////////////////////////////
	
	this.info = null; // Declare a variable for an info control component used to display information on the map and initialize it as null.
   }
   // This is a JavaScript class definition for the ChoroplethMap.
   // It defines variables and methods for managing the map and its data.
   // Method to initialize the map
   initMap() {
      // Creating a Leaflet map centered at specific coordinates
      this.map = L.map('map').setView([28.183303761640847, 0.35412466140639], 2.25);
      // This creates a Leaflet map and sets its initial view centered at specific latitude and longitude coordinates.
      // Setting minimum and maximum zoom levels for the map
      this.map.options.minZoom = 2.25;
      this.map.options.maxZoom = 19;
      // These lines set the minimum and maximum zoom levels for the map.
      // OpenStreetMap tile layer
      this.osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      // This creates a tile layer using OpenStreetMap tiles and specifies the attribution for the map data.
      // Adding OpenStreetMap layer to the map
      this.osmLayer.addTo(this.map);
      // This adds the OpenStreetMap layer to the map.
      //*******************************
      //BEGIN: EXAMPLE MARKER AND POPUP
      //*******************************
      // Creating a single marker and adding it to the map
      this.singleMarker = L.marker([28.25255, 83.97669]);
      this.singleMarker.addTo(this.map);
      // This creates a single marker at specific coordinates and adds it to the map.
      // Creating a popup for the marker
      this.popup = this.singleMarker.bindPopup('This is a popup');
      this.popup.addTo(this.map);
      // This creates a popup associated with the marker and adds it to the map.
      //*****************************
      //END: EXAMPLE MARKER AND POPUP
      //*****************************
      // CartoDB Dark Matter tile layer
      this.CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
         subdomains: 'abcd',
         maxZoom: 19
      });
      // This creates a tile layer using CartoDB Dark Matter tiles and specifies the attribution and other properties.
      // Google Streets and Satellite tile layers
      this.googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
         maxZoom: 20,
         subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
      this.googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
         maxZoom: 20,
         subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      });
      // These create tile layers using Google Maps (Streets and Satellite) and specify properties like maximum zoom levels and subdomains.
      // Stamen Watercolor tile layer
      this.Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
         attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
         subdomains: 'abcd',
         minZoom: 1,
         maxZoom: 16,
         ext: 'jpg'
      });
      // This creates a tile layer using Stamen Watercolor tiles and specifies attribution and other properties.
      // Adding layers to the map
      this.CartoDB_DarkMatter.addTo(this.map);
      this.googleStreets.addTo(this.map);
      this.googleSat.addTo(this.map);
      this.Stamen_Watercolor.addTo(this.map);
      // These lines add the tile layers to the map.
      // GeoJSON layers for different data
      this.linedata = L.geoJSON(lineJSON).addTo(this.map);
      this.pointdata = L.geoJSON(pointJSON).addTo(this.map);
      this.nepaldata = L.geoJSON(nepaldata).addTo(this.map);
      // These lines create GeoJSON layers for various types of data (lines, points, Nepal data) and add them to the map.
      // GeoJSON layer for US states data
      this.geojson = L.geoJson(statesData, {
         style: this.style.bind(this), // Bind the style function
         onEachFeature: this.onEachFeature.bind(this) // Bind the event handlers
      }).addTo(this.map);
      // This creates a GeoJSON layer for US states data, specifying style and event handler functions, and adds it to the map.
      // GeoJSON layer for polygon data
      this.polygondata = L.geoJSON(polygonJSON, {
         onEachFeature: function (feature, layer) {
            layer.bindPopup('<b>This is a </b>' + feature.properties.name);
         },
         style: {
            fillColor: 'red',
            fillOpacity: 1,
            color: 'green'
         }
      }).addTo(this.map);
      // This creates a GeoJSON layer for polygon data and specifies popup content and style.
      // Layers control for switching between base layers
      const baseLayers = {
         "Satellite": this.googleSat,
         "Google Map": this.googleStreets,
         "Water Color": this.Stamen_Watercolor,
         "OpenStreetMap": this.osmLayer,
      };
      // This defines a list of base layers and their associated tile layers for the layers control.
      // Overlays control for showing additional data layers
      const overlays = {
         "Marker": this.singleMarker,
         "PointData": this.pointdata,
         "LineData": this.linedata,
         "polygondata": this.polygondata,
         "statesData": this.geojson
      };
      // This defines a list of overlay layers and their associated map data for the layers control.
      L.control.layers(baseLayers, overlays).addTo(this.map);
      // This adds the layers control to the map.
      // Adding geocoder control to the map
      L.Control.geocoder().addTo(this.map);
      // This adds a geocoder control to the map.
      // Info control for displaying information
      this.info = L.control();
      this.info.onAdd = function (map) {
         this._div = L.DomUtil.create('div', 'info');
         this._div.innerHTML = '<h4>US Population Density</h4>Hover over a state';
         return this._div;
      };
      this.info.addTo(this.map);
      // This defines and adds an info control to display information about the map.
      // Legend control for displaying legend information
      const legend = L.control({
         position: 'bottomright'
      });
      legend.onAdd = function (map) {
         const div = L.DomUtil.create('div', 'info legend');
         const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
         const labels = [];
         let from, to;
         for (let i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            labels.push(`<i style="background:${this.getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
         }
         div.innerHTML = labels.join('<br>');
         return div;
      }.bind(this);
      legend.addTo(this.map);
      // This defines and adds a legend control to display legend information on the map.
   }
   // Method to define color based on population density
   getColor(d) {
      return d > 1000 ? '#800026' :
         d > 500 ? '#BD0026' :
         d > 200 ? '#E31A1C' :
         d > 100 ? '#FC4E2A' :
         d > 50 ? '#FD8D3C' :
         d > 20 ? '#FEB24C' :
         d > 10 ? '#FED976' : '#FFEDA0';
   }
   // Method to define style for GeoJSON features
   style(feature) {
      return {
         weight: 2, // Set the line weight to 2
         opacity: 1, // Set the opacity to 1 (fully opaque)
         color: 'white', // Set the line color to white
         dashArray: '3', // Set a dashed line style with a dash pattern
         fillOpacity: 0.7, // Set the fill opacity to 0.7 (partially transparent)
         fillColor: this.getColor(feature.properties.density) // Set the fill color based on density value
      };
   }
   // Method to handle mouseover, mouseout, and click events on GeoJSON features
   onEachFeature(feature, layer) {
      layer.on({
         mouseover: this.highlightFeature.bind(this), // Bind the event handlers
         mouseout: this.resetHighlight.bind(this), // Bind the event handlers
         click: this.zoomToFeature.bind(this) // Bind the event handlers
      });
   }
   // Method to highlight a feature on mouseover
   highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({
         weight: 5, // Increase line weight on mouseover
         color: '#666', // Change line color on mouseover
         dashArray: '', // Remove dashArray on mouseover
         fillOpacity: 0.7 // Set fill opacity on mouseover
      });
      layer.bringToFront(); // Bring the highlighted layer to the front
      this.update(layer.feature.properties); // Update the info control with feature information
   }
   // Method to reset the highlight on mouseout
   resetHighlight(e) {
      this.geojson.resetStyle(e.target); // Reset the style to its original state on mouseout
      this.update(); // Update the info control to its default state
   }
   // Method to zoom to a feature on click
   zoomToFeature(e) {
      this.map.fitBounds(e.target.getBounds()); // Fit the map view to the bounds of the clicked feature
   }
   // Method to update the info control with feature information
   update(props) {
      this.info._div.innerHTML = `<h4>US Population Density</h4>${props ? `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>` : 'Hover over a state'}`;
   }
}
// Create an instance of ChoroplethMap and initialize the map
const choroplethMap = new ChoroplethMap();
choroplethMap.initMap(); // Initialize the choropleth map