const variableData = [
  {
    variable: 'progresspoorpop',
    minValue: -50,
    maxValue: 900,
    scale: 10,
    label: 'Change in number of people in poverty',
    unit: 'million',
  },
  {
    variable: 'progressHC',
    minValue: -70,
    maxValue: 100,
    scale: 5,
    label: 'Percentage of people leaving poverty',
    unit: '%',
  },
];

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
const dataInjectedGeoJson = (jsonData, csvData) =>
  jsonData.map((feature) => {
    const featureCopy = { ...feature };
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

    return featureCopy;
  });

const getRegions = (data) => Array.from(new Set(data.map((item) => item.PIP_Region)));

const getFilteredData = (data, line, region) => {
  window.console.log(region);
  if (region === 'all') {
    window.console.log(data.filter((item) => item.poverty_line === line));

    return data.filter((item) => item.poverty_line === line);
  }

  return data.filter((item) => item.poverty_line === line && item.PIP_Region === region);
};

const getColor = (value, minValue, maxValue, increment, chromaInstance) => {
  // Generate a range of values between the minimum and maximum value
  const values = [];
  for (let i = minValue; i <= maxValue; i += increment) {
    values.push(i);
  }

  const colors = ['#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'];
  const colorGen = chromaInstance.scale(colors).domain(values);

  return colorGen(value);
};

const getFillColor = (feature, data, variable, colorFunction, colorGenInstance) => {
  if (!feature.properties[variable]) {
    return '#E6E1E5';
  }
  if (variable === 'progresspoorpop') {
    return colorFunction(
      Number(feature.properties[variable]) / 1000000,
      data.minValue,
      data.maxValue,
      data.scale,
      colorGenInstance
    );
  }

  return colorFunction(
    Number(feature.properties[variable]) * 100,
    data.minValue,
    data.maxValue,
    data.scale,
    colorGenInstance
  );
};

export { highlightFeature, dataInjectedGeoJson, getRegions, getFilteredData, getFillColor, getColor, variableData };
