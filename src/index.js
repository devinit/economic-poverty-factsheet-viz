import './state';
// import renderD3Chart from './charts/d3/exampleChart';
// import renderEChart from './core/ExampleChart';
// import renderTable from './core/ExampleTable';
import renderEconomicPovertyMap from './core/EconomicPovertyMap';
import renderEconomicPovertyBarchart from './core/EconomicPovertyBarChart';
import './styles/styles.css';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderEconomicPovertyMap();
  // renderD3Chart();
  // renderEChart();
  // renderTable('dicharts--table-example');
  renderEconomicPovertyBarchart();
});
