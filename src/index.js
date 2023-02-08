import renderEconomicPovertyBarchart from './core/EconomicPovertyBarChart';
import renderEconomicPovertyMap from './core/economicPovertyMap';
import './state';
import './styles/styles.css';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderEconomicPovertyMap();
  renderEconomicPovertyBarchart();
});
