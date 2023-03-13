import chroma from 'chroma-js';
import React from 'react';
import 'leaflet.pattern';
import { createRoot } from 'react-dom/client';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import {
  dataInjectedGeoJson,
  getColor,
  getFillColor,
  getFilteredData,
  getMaxMinValues,
  getRegions,
  highlightFeature,
  regionMapping,
  variableData,
} from '../utils/mapUtils';
import { addFilterWrapper } from '../widgets/filters';
import MapResetButton from './components/MapResetButton';
import Selectors from './components/Selectors';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/map_data.csv`;
const defaultPovertyData = 'changepoorpop';
const defaultRegion = 'all';
const defaultPovertyLine = '2.15';

const renderMap = (mapInstance, geoJsonData, groupInstance, csvData, dimensionVariable, legendInstance) => {
  const positiveLegendColors = ['#0c457b', '#0089cc', '#77adde', '#bcd4f0'];
  const negativeLegendColors = ['#bcd4f0', '#77adde', '#0089cc', '#0c457b'];
  let geojsonLayer;
  const scaleData = getMaxMinValues(csvData, dimensionVariable);

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = () => {
    const div = window.L.DomUtil.create('div', 'legend');

    const legendContent = `<div class="legendContentContainer"><p style="justify-content: center;">Change in poverty levels (see map for exact change)</p> <div style="display: flex;flex-direction: row;"><p style="margin-right:8px;">Greatest increase</p>${positiveLegendColors
      .map(
        (color) =>
          `<span>
          <i style="background:${color};border-radius:1px;margin-right:8px;width:40px;"></i>
          </span>`
      )
      .join(
        ''
      )}<span><i style="margin-right:8px;border: 1px solid #0c457b;background: white; width: 40px;border-radius:1px"></i></span>${negativeLegendColors
      .map(
        (color) =>
          `<span>
            <i style="background:${`repeating-linear-gradient(
              45deg,
              white 0px,
              white 2px,
              ${color} 2px,
              ${color} 4px
            )`};border-radius:1px;margin-right:8px;width:40px;"></i>
            </span>`
      )
      .join('')}
          <p>Greatest decrease</p></div></div>`;
    div.innerHTML = legendContent;

    return div;
  };
  legendInstanceCopy.addTo(mapInstance);

  const style = (feature) => ({
    [Number(feature.properties[dimensionVariable]) < 0 ? 'fillPattern' : 'fillColor']:
      Number(feature.properties[dimensionVariable]) < 0
        ? new window.L.StripePattern({
            weight: 2,
            spaceWeight: 1,
            angle: 45,
            color: getFillColor(feature, dimensionVariable, getColor, chroma, scaleData),
          }).addTo(mapInstance)
        : getFillColor(feature, dimensionVariable, getColor, chroma, scaleData),
    weight: 1,
    opacity: 1,
    color:
      Number(feature.properties[dimensionVariable]) < 0
        ? getFillColor(feature, dimensionVariable, getColor, chroma, scaleData)
        : 'white',
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
            zIndex: 0,
          });

          // Legend
          const legend = window.L.control({ position: 'bottomright' });

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
                    label: 'Select poverty data type',
                    options: [
                      { value: 'changepoorpop', label: 'Change in number of people in poverty' },
                      { value: 'changeHC', label: 'Percentage of people living in poverty' },
                    ],
                    classPrefix: 'poverty-data-select',
                    stateProperty: 'povertyData',
                    defaultValue: { value: 'changepoorpop', label: 'Change in number of people in poverty' },
                  },
                  {
                    label: 'Select region',
                    options: [{ value: 'all', label: 'All' }].concat(
                      regions.map((value) => ({
                        value,
                        label: regionMapping.find((item) => item.name === value).label,
                      }))
                    ),
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

                resetButton.onAdd = () => {
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
            // eslint-disable-next-line no-console
            .catch((error) => console.log(error));
        });
      },
    },
  });
}

export default renderEconomicPovertyMap;
