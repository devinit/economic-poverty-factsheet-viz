import './state';
import renderEconomicPovertyMap from './core/EconomicPovertyMap';
import renderEconomicPovertyBarchart from './core/EconomicPovertyBarChart';
import './styles/styles.css';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderEconomicPovertyMap();
  renderEconomicPovertyBarchart();
});
