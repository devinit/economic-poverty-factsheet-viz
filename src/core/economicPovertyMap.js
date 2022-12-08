import { ACTIVE_BRANCH } from '../utils/data';

const MAP_FILE_PATH = `https://raw.githubusercontent.com/devinit/gha-data-visualisations/${ACTIVE_BRANCH}/src/data/world_map.geo.json`;

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
              // fetchCSVData(CSV_PATH).then((data) => {
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
              //   dichart.hideLoading();
              // });
            })
            .catch((error) => console.log(error));
        });
      },
    },
  });
}

export default renderEconomicPovertyMap;
