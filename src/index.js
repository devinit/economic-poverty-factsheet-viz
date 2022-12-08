import './state';
import renderD3Chart from './charts/d3/exampleChart';
import renderEChart from './core/ExampleChart';
import renderTable from './core/ExampleTable';
import renderEconomicPovertyBarchart from './core/EconomicPovertyBarChart';
import './styles/styles.css';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderEconomicPovertyBarchart();
  renderD3Chart();
  renderEChart();
  renderTable('dicharts--table-example');
});
