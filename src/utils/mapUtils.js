const colors = ['#bcd4f0', '#77adde', '#0089cc', '#0c457b'];

const regionMapping = [
  { name: 'ECA', label: 'Europe & Central Asia' },
  { name: 'MNA', label: 'Middle East & North Africa' },
  { name: 'SSA', label: 'Sub-Saharan Africa' },
  { name: 'OHI', label: 'Other high-income countries' },
  { name: 'SAS', label: 'South Asia' },
  { name: 'LAC', label: 'Latin America & Caribbean' },
  { name: 'EAP', label: 'East Asia & Pacific' },
];
const variableData = [
  {
    variable: 'changepoorpop',
    label: 'Change in number of people living in poverty',
    unit: 'million',
  },
  {
    variable: 'changeHC',
    label: 'Change in the percentage of people living in poverty',
    unit: '%',
  },
];

const getTooltipText = (variable, layerInstance) => {
  let text;
  if (variable === 'changepoorpop') {
    text =
      layerInstance.feature.properties[variable] < 0
        ? 'Reduction in people living in poverty'
        : 'Additional people living in poverty';
  } else {
    text =
      layerInstance.feature.properties[variable] < 0
        ? 'Reduction in proportion of population living in poverty'
        : 'Additional proportion of population living in poverty';
  }

  return text;
};

const highlightFeature = (e, variable, filterOptions) => {
  const layer = e.target;

  layer.setStyle({
    fillColor: '#f7a838',
    color: '#484848',
    weight: 2,
    fillPattern: null,
  });

  if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
    layer.bringToFront();
  }
  // Bind popup to layer
  layer
    .bindTooltip(
      `<div>${layer.feature.properties.country_name}<br>${getTooltipText(variable, layer)}: ${
        variable === 'changepoorpop'
          ? (Number(layer.feature.properties[variable]) / 1000000).toFixed(2)
          : (Number(layer.feature.properties[variable]) * 100).toFixed(2)
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

const getColor = (value, minValue, maxValue, increment, chromaInstance, colorArray) => {
  // Generate a range of values between the minimum and maximum value
  const values = [];
  for (let i = minValue; i <= maxValue; i += increment) {
    values.push(i);
  }
  const colorGen = chromaInstance.scale(colorArray).domain(values);

  return colorGen(Math.abs(value));
};

const getFillColor = (feature, variable, colorFunction, colorGenInstance, scaleData) => {
  const positiveInterval = (scaleData.positive.maxValue - scaleData.positive.minValue) / colors.length;
  const negativeInterval = (scaleData.negative.maxValue - scaleData.negative.minValue) / colors.length;
  if (!feature.properties[variable]) {
    return '#E6E1E5';
  }
  if (variable === 'changepoorpop') {
    if (Number(feature.properties[variable]) / 1000000 >= 0) {
      return colorFunction(
        Number(feature.properties[variable]) / 1000000,
        scaleData.positive.minValue,
        scaleData.positive.maxValue,
        positiveInterval,
        colorGenInstance,
        colors
      );
    }

    return colorFunction(
      Number(feature.properties[variable]) / 1000000,
      scaleData.negative.minValue,
      scaleData.negative.maxValue,
      negativeInterval,
      colorGenInstance,
      colors
    );
  }

  return Number(feature.properties[variable]) / 1000000 >= 0
    ? colorFunction(
        Number(feature.properties[variable]) * 100,
        scaleData.positive.minValue,
        scaleData.positive.maxValue,
        positiveInterval,
        colorGenInstance,
        colors
      )
    : colorFunction(
        Number(feature.properties[variable]) * 100,
        scaleData.negative.minValue,
        scaleData.negative.maxValue,
        negativeInterval,
        colorGenInstance,
        colors
      );
};
const getMaxMinValues = (data, dataType) => {
  const dataList = data.map((item) => Number(item[dataType]));
  const positiveDataList = dataList.filter((item) => item >= 0);
  const negativeDataList = dataList.filter((item) => item < 0).map((item) => Math.abs(item));
  if (dataType === 'changepoorpop') {
    return {
      positive: {
        maxValue: Math.ceil(Math.max(...positiveDataList) / 1000000),
        minValue: Math.ceil(Math.min(...positiveDataList) / 1000000),
      },
      negative: {
        maxValue: Math.ceil(Math.max(...negativeDataList) / 1000000),
        minValue: Math.ceil(Math.min(...negativeDataList) / 1000000),
      },
    };
  }

  return {
    positive: {
      maxValue: Math.ceil(Math.max(...positiveDataList) * 100),
      minValue: Math.ceil(Math.min(...positiveDataList) * 100),
    },
    negative: {
      maxValue: Math.ceil(Math.max(...negativeDataList) * 100),
      minValue: Math.ceil(Math.min(...negativeDataList) * 100) - 1,
    },
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
  colors,
};
