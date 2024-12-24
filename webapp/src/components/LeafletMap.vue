<template>
  <div id="map">
    <div class="topleft">
      <slot name="topleft"></slot>
    </div>

    <div class="bottomright">
      <slot name="bottomright"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, h, createApp, watch, type PropType } from 'vue';
import L, { type LatLngExpression } from 'leaflet';
import type { ALPR } from '@/types';

import DFMapPopup from './DFMapPopup.vue';

import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import { createVuetify } from 'vuetify'

// Color of Marker Circle
const MARKER_COLOR = 'rgb(63,84,243)';

const props = defineProps({
  center: {
    required: true,
  },
  zoom: {
    type: Number,
    required: true,
  },
  alprs: {
    type: Array as PropType<ALPR[]>,
    default: () => [],
  },
  currentLocation: {
    type: Object as PropType<[number, number] | null>,
    default: null,
  },
});

let map: L.Map;
let circlesLayer: L.FeatureGroup;
let clusterLayer: L.MarkerClusterGroup;
let currentLocationLayer: L.FeatureGroup;

onMounted(() => {
  initializeMap();
});

function initializeMap() {
  map = L.map('map', { zoomControl: false }).setView(props.center, props.zoom);

  registerEvents();
  registerWatchers();

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  populateMap();
}

function renderCurrentLocation() {
  if (!props.currentLocation)
    return;
  else
    console.log('Current location:', props.currentLocation);

  if (currentLocationLayer) {
    map.removeLayer(currentLocationLayer);
  }

  currentLocationLayer = L.featureGroup();
  const clMarker = L.circleMarker([props.currentLocation[0], props.currentLocation[1]], {
    radius: 10,
    color: '#ffffff',
    fillColor: '#007bff',
    fillOpacity: 1,
    weight: 4
  });

  clMarker.bindPopup('Current Location');

  currentLocationLayer.addLayer(clMarker);
  map.addLayer(currentLocationLayer);
}

function populateMap() {
  const showFov = props.zoom >= 16;

  renderCurrentLocation();

  if (clusterLayer) {
    map.removeLayer(clusterLayer);
  }

  clusterLayer = L.markerClusterGroup();
  circlesLayer = L.featureGroup();

  for (const alpr of props.alprs) {
    const { lat, lon: lng } = alpr;
    const orientationDegrees = alpr.tags?.direction || 0; // TODO: make sure this works with nodes w/o orientation

    let marker: L.CircleMarker | L.Marker;

    // content of @/public/map-icon.svg; TODO: import it here if possible
    const svgMarker = `
      <svg style="transform:rotate(${orientationDegrees}deg)" class="svgMarker" width="100%" height="100%" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <path class="someSVGpath" d="M215.248,221.461L99.696,43.732C144.935,16.031 198.536,0 256,0C313.464,0 367.065,16.031 412.304,43.732L296.752,221.461C287.138,209.593 272.448,202.001 256,202.001C239.552,202.001 224.862,209.593 215.248,221.461Z" style="fill:rgb(87,87,87);fill-opacity:0.46;"/>
        <path class="someSVGpath" d="M215.248,221.461L99.696,43.732C144.935,16.031 198.536,0 256,0C313.464,0 367.065,16.031 412.304,43.732L296.752,221.461C287.138,209.593 272.448,202.001 256,202.001C239.552,202.001 224.862,209.593 215.248,221.461ZM217.92,200.242C228.694,192.652 241.831,188.195 256,188.195C270.169,188.195 283.306,192.652 294.08,200.242C294.08,200.242 392.803,48.4 392.803,48.4C352.363,26.364 305.694,13.806 256,13.806C206.306,13.806 159.637,26.364 119.197,48.4L217.92,200.242Z" style="fill:rgb(137,135,135);"/>
        <g transform="matrix(0.906623,0,0,0.906623,23.9045,22.3271)">
          <circle class="someSVGpath" cx="256" cy="256" r="57.821" style="fill:${MARKER_COLOR};fill-opacity:0.41;"/>
          <path class="someSVGpath" d="M256,174.25C301.119,174.25 337.75,210.881 337.75,256C337.75,301.119 301.119,337.75 256,337.75C210.881,337.75 174.25,301.119 174.25,256C174.25,210.881 210.881,174.25 256,174.25ZM256,198.179C224.088,198.179 198.179,224.088 198.179,256C198.179,287.912 224.088,313.821 256,313.821C287.912,313.821 313.821,287.912 313.821,256C313.821,224.088 287.912,198.179 256,198.179Z" style="fill:${MARKER_COLOR};"/>
        </g>
      </svg>
      `;

    const el = document.createElement('div');
    el.innerHTML = svgMarker;
    el.style.width = '50px';
    el.style.height = '50px';

    if (showFov) {
      const icon = L.divIcon({
        className: 'leaflet-data-marker',
        html: svgMarker,
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [0, -8],
      });

      marker = L.marker([lat, lng], { icon: icon });
    } else {
      marker = L.circleMarker([lat, lng], {
        fill: true,
        fillColor: MARKER_COLOR,
        fillOpacity: 0.6,
        stroke: true,
        color: MARKER_COLOR,
        opacity: 1,
        radius: 8,
        weight: 3,
      });
    }
    
    // Bind an empty popup to the circle
    marker.bindPopup('');

    // Add an event listener to create the popup content on demand
    marker.on('popupopen', (e: any) => {
      const popupContent = document.createElement('div');
      createApp({
        render() {
          return h(DFMapPopup, { alpr: {
            id: alpr.id,
            lat: lat,
            lon: lng,
            tags: alpr.tags,
            type: alpr.type,
          } });
        }
      }).use(createVuetify()).mount(popupContent);

      // Set the popup content
      e.popup.setContent(popupContent);
    });

    circlesLayer.addLayer(marker);
  }

  clusterLayer.addLayer(circlesLayer);
  map.addLayer(clusterLayer);
}

const emit = defineEmits(['update:center', 'update:zoom', 'update:bounds']);

function registerEvents() {
  map.on('moveend', () => {
    emit('update:center', map.getCenter());
    emit('update:zoom', map.getZoom());
    emit('update:bounds', map.getBounds());
  });

  map.on('load', () => {
    emit('update:bounds', map.getBounds());
  });
}

/**
 * Returns true if the zoom level has crossed the threshold for switching map markers.
 * Standard circles are shown until a zoom level of 16 is reached, at which point
 * the map switches to showing the field of view for each camera.
 * @param oldZoom old zoom level
 * @param newZoom new zoom level
 * @param threshold the zoom level threshold
 */
function hasCrossedZoomThreshold(oldZoom: number, newZoom: number, threshold: number) {
  return (oldZoom < threshold && newZoom >= threshold) || (oldZoom >= threshold && newZoom < threshold);
}

function registerWatchers() {
  watch(() => props.center, (newCenter: any, oldCenter: any) => {
    if (newCenter.lat !== oldCenter.lat || newCenter.lng !== oldCenter.lng) {
      map.setView(newCenter as LatLngExpression);
    }
  });

  watch(() => props.zoom, (newZoom, oldZoom) => {
    if (newZoom !== oldZoom) {
      map.setZoom(newZoom);
      if (hasCrossedZoomThreshold(oldZoom, newZoom, 16)) {
        populateMap();
      }
    }
  });

  watch(() => props.currentLocation, (newLocation, oldLocation) => {
    console.log("current location watcher triggered!");
    renderCurrentLocation();
  });

  watch(() => props.alprs, (newAlprs, oldAlprs) => {
    populateMap();
  }); 
}


</script>

<style scoped>
@import 'leaflet/dist/leaflet.css';
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
@import 'leaflet.markercluster/dist/MarkerCluster.css';

#map {
  height: calc(100dvh - 64px);
  margin-top: 64px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.topleft {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
}

.bottomright {
  position: absolute;
  bottom: 50px; /* hack */
  right: 60px; /* hack */
  z-index: 1000;
}
</style>

<style> /* (Global) */
/* Disables clicks on the main wrappers */
.leaflet-marker-icon.leaflet-interactive:not(.marker-cluster), .svgMarker {
  pointer-events: none;
  cursor: default;
}
.svgMarker {
  pointer-events: none;
  cursor: default;
}

/* Enables clicks only on actual SVG path */
.someSVGpath {
  pointer-events: all;
  cursor: pointer;
}
</style>
