import deepMerge from 'deepmerge';
import defaultOptions, { handleResize } from '../charts/echarts/index';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';

const dataFile = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/barChartData.csv`;

const getYears = (data) => Array.from(new Set(data.map((item) => item.year)));

const getSeriesNames = (data) => Array.from(new Set(data.map((item) => item.PIP_Region)));

const getSeries = (dataArray, years) => {
  const seriesNames = getSeriesNames(dataArray);
  window.console.log(seriesNames);
  const series = seriesNames.map((seriesName) => ({
    name: seriesName,
    type: 'bar',
    stack: 'Region',
    emphasis: {
      focus: 'series',
    },
    data: years.map((year) => {
      const yearList = [];
      dataArray.forEach((item) => {
        if (item.PIP_Region === seriesName && item.year === year) {
          yearList.push(Number(item.poorpop));
        }
      });

      return yearList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }),
  }));

  window.console.log(series);

  return series;
};

const renderEconomicPovertyBarchart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--economic-poverty-barchart',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          // Render echarts coding here
          const chart = window.echarts.init(chartNode);
          fetchCSVData(dataFile).then((data) => {
            const years = getYears(data);
            window.console.log(years);
            const option = {
              responsive: false,
              legend: {
                selectedMode: false,
              },
              grid: {
                top: 60,
                bottom: 20,
              },
              xAxis: {
                data: years,
              },
              yAxis: {
                type: 'value',
              },
              axisLabel: {
                interval: 'auto',
                rotate: 30,
              },
              series: getSeries(data, years),
            };
            chart.setOption(deepMerge(option, defaultOptions));

            dichart.hideLoading();
          });

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderEconomicPovertyBarchart;
