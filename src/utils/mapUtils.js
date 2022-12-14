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
          ? (Number(layer.feature.properties[variable]) / 1000000).toFixed(5)
          : (Number(layer.feature.properties[variable]) * 100).toFixed(3)
      }<span style="padding-left: 2px;">${
        filterOptions.find((option) => option.variable === variable).unit
      }</span></div>`,
      { direction: 'top', opacity: 1 }
    )
    .openTooltip();
};

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

const getRegions = (data) => Array.from(new Set(data.map((item) => item.PIP_Region)));

export { highlightFeature, dataInjectedGeoJson, getRegions };
