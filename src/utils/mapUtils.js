const highlightFeature = (e, variable, filterOptions) => {
  const layer = e.target;

  layer.setStyle({
    fillColor: '#f7a838',
    color: '#484848',
    weight: 2,
  });

  if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
    layer.bringToFront();
  }
  // Bind popup to layer
  layer
    .bindTooltip(
      `<div>${layer.feature.properties.country_name}<br>${
        filterOptions.find((option) => option.variable === variable).label
      }: ${
        variable === 'progresspoorpop'
          ? (Number(layer.feature.properties[variable]) / 1000000).toFixed(4)
          : (Number(layer.feature.properties[variable]) * 100).toFixed(3)
      }<span style="padding-left: 2px;">${
        filterOptions.find((option) => option.variable === variable).unit
      }</span></div>`,
      { direction: 'top', opacity: 1 }
    )
    .openTooltip();
};

const outliers = ['France', 'Kosovo', 'Norway'];
const dataInjectedGeoJson = (jsonData, csvData, region) =>
  jsonData.map((feature) => {
    const featureCopy = { ...feature };
    if (region === 'all') {
      const matchingCountryData = csvData.find((countryData) =>
        outliers.includes(countryData.country_name)
          ? countryData.ISO_A3 === feature.properties.WB_A3
          : countryData.ISO_A3 === feature.properties.ISO_A3
      );
      if (matchingCountryData) {
        featureCopy.properties = {
          ...feature.properties,
          ...matchingCountryData,
        };
      }
    } else {
      const matchingCountryData = csvData.find((countryData) =>
        outliers.includes(countryData.country_name)
          ? countryData.ISO_A3 === feature.properties.WB_A3
          : countryData.ISO_A3 === feature.properties.ISO_A3 && countryData.PIP_Region === region
      );
      if (matchingCountryData) {
        featureCopy.properties = {
          ...feature.properties,
          ...matchingCountryData,
        };
      }
    }

    return featureCopy;
  });

const getRegions = (data) => Array.from(new Set(data.map((item) => item.PIP_Region)));

const getLineFilteredData = (data, line) => data.filter((item) => item.poverty_line === line);

const getFillColor = (feature, data, variable, colorFunction) => {
  if (!feature.properties[variable]) {
    return '#E6E1E5';
  }
  if (variable === 'progresspoorpop') {
    return colorFunction(Number(feature.properties[variable]) / 1000000, data.minValue, data.maxValue, data.scale);
  }

  return colorFunction(Number(feature.properties[variable]) * 100, data.minValue, data.maxValue, data.scale);
};

export { highlightFeature, dataInjectedGeoJson, getRegions, getLineFilteredData, getFillColor };
