import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;
const CSV_PATH = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/map_data.csv`;

// const renderMap = (
//   dimensionVariable,
//   mapInstance,
//   colorFunction,
//   data,
//   processed,
//   filterOptions,
//   legendInstance,
//   groupInstance,
//   csvData
// ) => {
//   let geojsonLayer;

//   const legendInstanceCopy = legendInstance;
//   legendInstanceCopy.onAdd = function () {
//     const div = window.L.DomUtil.create('div', 'legend');
//     const piecewiselegendData = [
//       { score: 'Not assessed', label: 'No data' },
//       { score: 'Very low', label: 'Very low' },
//       { score: 'Low', label: 'Low' },
//       { score: 'Medium', label: 'Medium' },
//       { score: 'High', label: 'High' },
//       { score: 'Very high', label: 'Very high' },
//     ];
//     const legendData = [
//       { variable: 'Severity_score', data: piecewiselegendData },
//       { variable: 'Climate_vulnerability', data: piecewiselegendData },
//       { variable: 'COVID_vaccination_rate', max: '0', min: '100' },
//       { variable: 'Food_insecure_(millions)', max: '26', min: '0' },
//       { variable: 'People_in_need_(millions)', max: '25', min: '0' },
//     ];
//     const legendColors = ['#77adde', '#5da3d9', '#0089cc', '#0071b1', '#0c457b'];
//     const legendContent =
//       dimensionVariable !== 'Severity_score' && dimensionVariable !== 'Climate_vulnerability'
//         ? `${legendColors
//             .map(
//               (color) =>
//                 `<span>
//           <i style="background:${color};border-radius:1px;margin-right:0;width:40px;"></i>
//         </span>`
//             )
//             .join('')} <p style="margin-left:1px;margin-top: 4px;">${
//             legendData.find((items) => items.variable === dimensionVariable).min
//           } - ${legendData.find((items) => items.variable === dimensionVariable).max}${
//             dimensionVariable === 'COVID_vaccination_rate' ? ', % of population' : ', millions of people'
//           }</p>`
//         : legendData
//             .find((items) => items.variable === dimensionVariable)
//             .data.map(
//               (dataItems) =>
//                 `<span><i style="background:${getColor(dataItems.score)}"></i><label>${dataItems.label}</label></span>`
//             )
//             .join('');
//     div.innerHTML = legendContent;

//     return div;
//   };
//   legendInstanceCopy.addTo(mapInstance);
//   const style = (feature) => ({
//     fillColor:
//       filterOptions.find((opts) => opts.name === dimensionVariable).scaleType === 'piecewise'
//         ? colorFunction(feature.properties[dimensionVariable])
//         : colorFunction(
//             feature.properties[dimensionVariable],
//             filterOptions.find((opts) => opts.name === dimensionVariable).values,
//             dimensionVariable
//           ),
//     weight: 1,
//     opacity: 1,
//     color: 'white',
//     fillOpacity: 1,
//   });

//   const resetHighlight = (e) => {
//     geojsonLayer.resetStyle(e.target);
//     e.target.closePopup();
//   };

//   const onEachFeature = (feature, layer) => {
//     if (feature.properties[dimensionVariable] || feature.properties[dimensionVariable] === '') {
//       layer.on({
//         mouseover: (e) => highlightFeature(e, dimensionVariable, filterOptions, csvData),
//         mouseout: resetHighlight,
//       });
//     } else {
//       layer.on({
//         mouseover: () => {
//           const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive');
//           els.forEach((el) => {
//             const elementCopy = el;
//             elementCopy.classList += ' grab-cursor-enabled';
//           });
//         },
//         mouseout: () => {
//           const els = mapInstance.getContainer().querySelectorAll('.leaflet-interactive.grab-cursor-enabled');
//           els.forEach((el) => {
//             el.classList.remove('grab-cursor-enabled');
//           });
//         },
//       });
//     }
//   };

//   function loadLayer() {
//     groupInstance.clearLayers();
//     geojsonLayer = window.L.geoJSON(dataInjectedGeoJson(data, processed), {
//       style,
//       onEachFeature,
//     });
//     groupInstance.addLayer(geojsonLayer);
//   }
//   loadLayer();
// };

function renderEconomicPovertyMap() {
  window.DICharts.handler.addChart({
    className: 'dicharts--economic-poverty-leaflet',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          window.dataLayer = window.dataLayer || [];
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          // const map = window.L.map(chartNode, {
          //   maxZoom: 3,
          //   minZoom: 1,
          //   crs: window.L.CRS.EPSG4326,
          //   center: [6.6, 20.9],
          //   zoom: 1,
          //   attributionControl: false,
          // });

          // // Legend
          // const legend = window.L.control({ position: 'topright' });

          dichart.showLoading();
          window
            .fetch(MAP_FILE_PATH)
            .then((response) => response.json())
            .then((jsonData) => {
              const geojsonData = jsonData.features;
              window.console.log(geojsonData);
              fetchCSVData(CSV_PATH).then((data) => {
                window.console.log(data);
                //   const processedCountryNameData = matchCountryNames(data, geojsonData);
                //   const countries = Array.from(new Set(processedCountryNameData.map((stream) => stream.Country_name)));

                // renderMap(
                //   variable,
                //   map,
                //   filterOptions.find((option) => option.name === variable).scaleType === 'continous'
                //     ? getColorContinous
                //     : getColor,
                //   geojsonData,
                //   groupedData,
                //   filterOptions,
                //   legend,
                //   fg,
                //   data
                // );
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
