import React from 'react';
import chroma from 'chroma-js';
import { createRoot } from 'react-dom/client';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import Selectors from './components/Selectors';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/map_data.csv`;
const defaultPovertyData = 'progresspoorpop';
const defaultRegion = 'all';

const dataInjectedGeoJson = (jsonData, csvData) =>
  jsonData.map((feature) => {
    const featureCopy = { ...feature };
    const matchingCountryData = csvData.find((countryData) => countryData.country_name === feature.properties.WB_NAME);
    if (matchingCountryData) {
      featureCopy.properties = {
        ...feature.properties,
        ...matchingCountryData,
      };
    }

    return featureCopy;
  });

const variableData = [
  { variable: 'progresspoorpop', minValue: -50, maxValue: 900, scale: 10 },
  { variable: 'progressHC', minValue: -10, maxValue: 100, scale: 5 },
];

const getColor = (value, minValue, maxValue, increment) => {
  // Generate a range of values between the minimum and maximum value
  const values = [];
  for (let i = minValue; i <= maxValue; i += increment) {
    values.push(i);
  }

  const colors = ['#0c457b', '#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'];
  const colorGen = chroma.scale(colors).domain(values);

  return colorGen(value);
};

const getRegions = (data) => Array.from(new Set(data.map((item) => item.PIP_Region)));

const renderMap = (mapInstance, geoJsonData, groupInstance, csvData, dimensionVariable, legendInstance) => {
  let geojsonLayer;
  window.console.log(dimensionVariable);

  const legendInstanceCopy = legendInstance;
  legendInstanceCopy.onAdd = function () {
    const div = window.L.DomUtil.create('div', 'legend');
    const legendColors = ['#0c457b', '#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'];
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
    fillColor:
      dimensionVariable === 'progresspoorpop'
        ? getColor(
            Number(feature.properties[dimensionVariable]) / 1000000,
            dimensionData.minValue,
            dimensionData.maxValue,
            dimensionData.scale
          )
        : getColor(
            Number(feature.properties[dimensionVariable]) * 100,
            dimensionData.minValue,
            dimensionData.maxValue,
            dimensionData.scale
          ),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 1,
  });

  // const resetHighlight = (e) => {
  //   geojsonLayer.resetStyle(e.target);
  //   e.target.closePopup();
  // };

  // const onEachFeature = (feature, layer) => {
  //   if (feature.properties[dimensionVariable] || feature.properties[dimensionVariable] === '') {
  //     layer.on({
  //       mouseover: (e) => highlightFeature(e, dimensionVariable, filterOptions, csvData),
  //       mouseout: resetHighlight,
  //     });
  //   } else {
  //     layer.on({
  //       mouseover: () => {
  //         const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive');
  //         els.forEach((el) => {
  //           const elementCopy = el;
  //           elementCopy.classList += ' grab-cursor-enabled';
  //         });
  //       },
  //       mouseout: () => {
  //         const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive.grab-cursor-enabled');
  //         els.forEach((el) => {
  //           el.classList.remove('grab-cursor-enabled');
  //         });
  //       },
  //     });
  //   }
  // };

  function loadLayer() {
    groupInstance.clearLayers();
    geojsonLayer = window.L.geoJSON(geoJsonData, {
      style,
      // onEachFeature,
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

          window
            .fetch(MAP_FILE_PATH)
            .then((response) => response.json())
            .then((jsonData) => {
              const fg = window.L.featureGroup().addTo(map);
              const geojsonData = jsonData.features;
              fetchCSVData(CSV_PATH).then((data) => {
                // const countries = Array.from(new Set(data.map((stream) => stream.country_name)));
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
                    options: regions.map((value) => ({ value, label: value })),
                    classPrefix: 'region-select',
                    stateProperty: 'povertyRegion',
                    defaultValue: { value: 'all', label: 'All' },
                  },
                ];
                const filterWrapper = addFilterWrapper(chartNode);

                // create dropdown
                const root = createRoot(filterWrapper);
                root.render(<Selectors selectors={dropDownData} />);

                if (window.DIState) {
                  dichart.showLoading();
                  let povertyRegion = defaultRegion;
                  let povertyData = defaultPovertyData;
                  window.DIState.addListener(() => {
                    const { povertyRegion: selectedPovertyRegion, povertyData: selectedPovertyData } =
                      window.DIState.getState;

                    // only update if povertyData or povertyRegion have changed
                    if (povertyRegion === selectedPovertyRegion && povertyData === selectedPovertyData) return;

                    povertyRegion = selectedPovertyRegion || defaultRegion;
                    povertyData = selectedPovertyData || defaultPovertyData;
                    renderMap(map, dataInjectedGeoJson(geojsonData, data), fg, data, povertyData, legend);
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
