import deepMerge from 'deepmerge';
import defaultOptions, { handleResize } from '../charts/echarts/index';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';

const dataFile = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/barChartData.csv`;

const getYears = (data) => {
  const yearList = Array.from(new Set(data.map((item) => Number(item.year))));

  return yearList;
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
            const option = {
              responsive: false,
              xAxis: {
                data: getYears(data),
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  name: 'Sale',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20, 4],
                },
              ],
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
