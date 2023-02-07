import renderEconomicPovertyBarchart from './core/EconomicPovertyBarChart';
import renderEconomicPovertyMap from './core/EconomicPovertyMap';
import './state';
import './styles/styles.css';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderEconomicPovertyMap();
  renderEconomicPovertyBarchart();
});
