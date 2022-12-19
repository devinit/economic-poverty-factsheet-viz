const colors = ['#0c457b', '#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'];

const regionMapping = [
  { name: 'ECA', label: 'Europe & Central Asia' },
  { name: 'MNA', label: 'Middle East & North Africa' },
  { name: 'SSA', label: 'Sub-Saharan Africa' },
  { name: 'OHI', label: 'Other High Income Countries' },
  { name: 'SAS', label: 'South Asia' },
  { name: 'LAC', label: 'Latin America & Caribbean' },
  { name: 'EAP', label: 'East Asia & Pacific' },
];
const variableData = [
  {
    variable: 'progresspoorpop',
    label: 'Change in number of people in poverty',
    unit: 'million',
  },
  {
    variable: 'progressHC',
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
      { direction: 'bottom', opacity: 1, sticky: true }
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
  if (region === 'all') {
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
  const colorGen = chromaInstance.scale(colors).domain(values);

  return colorGen(value);
};

const getFillColor = (feature, variable, colorFunction, colorGenInstance, scaleData) => {
  const interval = (scaleData.maxValue - scaleData.minValue) / colors.length;
  if (!feature.properties[variable]) {
    return '#E6E1E5';
  }
  if (variable === 'progresspoorpop') {
    return colorFunction(
      Number(feature.properties[variable]) / 1000000,
      scaleData.minValue,
      scaleData.maxValue,
      interval,
      colorGenInstance
    );
  }

  return colorFunction(
    Number(feature.properties[variable]) * 100,
    scaleData.minValue,
    scaleData.maxValue,
    interval,
    colorGenInstance
  );
};
const getMaxMinValues = (data, dataType) => {
  const dataList = data.map((item) => Number(item[dataType]));
  if (dataType === 'progresspoorpop') {
    return {
      maxValue: Math.ceil(Math.max(...dataList) / 1000000),
      minValue:
        Math.sign(Math.ceil(Math.min(...dataList) / 1000000)) === -1
          ? Math.ceil(Math.min(...dataList) / 1000000) - 1
          : Math.ceil(Math.min(...dataList) / 1000000),
    };
  }

  return {
    maxValue: Math.ceil(Math.max(...dataList) * 100),
    minValue:
      Math.sign(Math.ceil(Math.min(...dataList) * 100)) === -1
        ? Math.ceil(Math.min(...dataList) * 100) - 1
        : Math.ceil(Math.min(...dataList) * 100),
  };
};
export {
  highlightFeature,
  dataInjectedGeoJson,
  getRegions,
  getFilteredData,
  getFillColor,
  getColor,
  variableData,
  getMaxMinValues,
  regionMapping,
};
