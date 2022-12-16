import React from 'react';
import chroma from 'chroma-js';
import { createRoot } from 'react-dom/client';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import Selectors from './components/Selectors';
import {
  dataInjectedGeoJson,
  highlightFeature,
  getRegions,
  getFilteredData,
  getFillColor,
  getColor,
  variableData,
} from '../utils/mapUtils';
import MapResetButton from './components/MapResetButton';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/map_data.csv`;
const defaultPovertyData = 'progresspoorpop';
const defaultRegion = 'all';
const defaultPovertyLine = '2.15';

const renderMap = (mapInstance, geoJsonData, groupInstance, csvData, dimensionVariable, legendInstance) => {
  let geojsonLayer;

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = function () {
    const div = window.L.DomUtil.create('div', 'legend');
    const legendColors = ['#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'];
    const legendContent = `${legendColors
      .map(
        (color) =>
          `<span>
          <i style="background:${color};border-radius:1px;margin-right:0;width:40px;"></i>
        </span>`
      )
      .join('')} <p style="margin-left:1px;margin-top: 4px;">${
      variableData.find((item) => item.variable === dimensionVariable).minValue
    } - ${variableData.find((item) => item.variable === dimensionVariable).maxValue}${
      dimensionVariable === 'progressHC' ? ', % of population' : ', millions of people'
    }</p>`;
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);

  const dimensionData = variableData.find((item) => item.variable === dimensionVariable);

  const style = (feature) => ({
    fillColor: getFillColor(feature, dimensionData, dimensionVariable, getColor, chroma),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 1,
  });

  const resetHighlight = (e) => {
    geojsonLayer.resetStyle(e.target);
    e.target.closePopup();
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties[dimensionVariable] || feature.properties[dimensionVariable] === '') {
      layer.on({
        mouseover: (e) => highlightFeature(e, dimensionVariable, variableData),
        mouseout: resetHighlight,
      });
    } else {
      layer.on({
        mouseover: () => {
          const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive');
          els.forEach((el) => {
            const elementCopy = el;
            elementCopy.classList += ' grab-cursor-enabled';
          });
        },
        mouseout: () => {
          const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive.grab-cursor-enabled');
          els.forEach((el) => {
            el.classList.remove('grab-cursor-enabled');
          });
        },
      });
    }
  };

  function loadLayer() {
    groupInstance.clearLayers();
    geojsonLayer = window.L.geoJSON(geoJsonData, {
      style,
      onEachFeature,
    });
    groupInstance.addLayer(geojsonLayer);
  }
  loadLayer();
};

function renderEconomicPovertyMap() {
  window.DICharts.handler.addChart({
    className: 'dicharts--economic-poverty-leaflet',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          window.dataLayer = window.dataLayer || [];
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const map = window.L.map(chartNode, {
            maxZoom: 3,
            minZoom: 1,
            crs: window.L.CRS.EPSG4326,
            center: [6.6, 20.9],
            zoom: 1,
            attributionControl: false,
          });

          // Legend
          const legend = window.L.control({ position: 'topright' });

          // Reset button
          const resetButton = window.L.control({ position: 'bottomleft' });

          window
            .fetch(MAP_FILE_PATH)
            .then((response) => response.json())
            .then((jsonData) => {
              const fg = window.L.featureGroup().addTo(map);
              const geojsonData = jsonData.features;
              fetchCSVData(CSV_PATH).then((data) => {
                const regions = getRegions(data);
                const dropDownData = [
                  {
                    label: 'Select poverty data',
                    options: [
                      { value: 'progresspoorpop', label: 'Change in number of people in poverty' },
                      { value: 'progressHC', label: 'Percentage of people leaving poverty' },
                    ],
                    classPrefix: 'poverty-data-select',
                    stateProperty: 'povertyData',
                    defaultValue: { value: 'progresspoorpop', label: 'Change in number of people in poverty' },
                  },
                  {
                    label: 'Select region',
                    options: [{ value: 'all', label: 'All' }].concat(regions.map((value) => ({ value, label: value }))),
                    classPrefix: 'region-select',
                    stateProperty: 'povertyRegion',
                    defaultValue: { value: 'all', label: 'All' },
                  },
                  {
                    label: 'Select poverty line',
                    options: [
                      { value: '2.15', label: 'US$2.15 per day' },
                      { value: '3.65', label: 'US$3.65 per day' },
                      { value: '6.85', label: 'US$6.85 per day' },
                    ],
                    classPrefix: 'poverty-line-select',
                    stateProperty: 'mapPovertyLine',
                    defaultValue: { value: '2.15', label: 'US$2.15 per day' },
                  },
                ];
                const filterWrapper = addFilterWrapper(chartNode);

                // create dropdown
                const root = createRoot(filterWrapper);
                root.render(<Selectors selectors={dropDownData} />);

                // Render reset Button

                const onReset = () => {
                  map.setView([6.6, 20.9], 1);
                };

                resetButton.onAdd = function () {
                  const div = window.L.DomUtil.create('div');
                  const buttonRoot = createRoot(div);
                  buttonRoot.render(<MapResetButton onReset={onReset} />);

                  return div;
                };

                resetButton.addTo(map);

                if (window.DIState) {
                  dichart.showLoading();
                  let povertyRegion = defaultRegion;
                  let povertyData = defaultPovertyData;
                  let povertyLine = defaultPovertyLine;
                  window.DIState.addListener(() => {
                    const {
                      povertyRegion: selectedPovertyRegion,
                      povertyData: selectedPovertyData,
                      mapPovertyLine: selectedPovertyLine,
                    } = window.DIState.getState;

                    // only update if povertyData or povertyRegion have changed
                    if (
                      povertyRegion === selectedPovertyRegion &&
                      povertyData === selectedPovertyData &&
                      povertyLine === selectedPovertyLine
                    )
                      return;

                    povertyRegion = selectedPovertyRegion || defaultRegion;
                    povertyData = selectedPovertyData || defaultPovertyData;
                    povertyLine = selectedPovertyLine || defaultPovertyLine;
                    const filteredData = getFilteredData(data, povertyLine, povertyRegion);
                    renderMap(
                      map,
                      dataInjectedGeoJson(geojsonData, filteredData),
                      fg,
                      filteredData,
                      povertyData,
                      legend
                    );
                  });
                }
                dichart.hideLoading();
              });
            })
            .catch((error) => console.log(error));
        });
      },
    },
  });
}

export default renderEconomicPovertyMap;
