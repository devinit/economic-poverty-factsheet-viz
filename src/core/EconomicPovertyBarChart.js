import React from 'react';
import { createRoot } from 'react-dom/client';
import deepMerge from 'deepmerge';
import defaultOptions, { colorways, handleResize } from '../charts/echarts/index';
import fetchCSVData, { ACTIVE_BRANCH } from '../utils/data';
import { addFilterWrapper } from '../widgets/filters';
import Select from '../components/Select';
import ChartFilters from '../components/ChartFilters';

const dataFile = `https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/${ACTIVE_BRANCH}/src/data/barChartData.csv`;
const defaultPovertyLine = 'all';

const getYears = (data) => Array.from(new Set(data.map((item) => item.year)));

const getSeriesNames = (data) => Array.from(new Set(data.map((item) => item.PIP_Region)));

const getSeries = (dataArray, years, filterValue) => {
  const seriesNames = getSeriesNames(dataArray);
  const series = seriesNames.map((seriesName) => ({
    name: seriesName,
    type: 'bar',
    stack: 'Region',
    emphasis: {
      focus: 'series',
    },
    data: years.map((year) => {
      const yearList = [];
      if (filterValue !== defaultPovertyLine) {
        dataArray
          .filter((item) => item.poverty_line === filterValue)
          .forEach((item) => {
            if (item.PIP_Region === seriesName && item.year === year) {
              yearList.push(Number(Number(item.poorpop).toFixed(4)));
            }
          });
      } else {
        dataArray.forEach((item) => {
          if (item.PIP_Region === seriesName && item.year === year) {
            yearList.push(Number(item.poorpop));
          }
        });
      }
      const accumulatedYearValue = yearList.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      return accumulatedYearValue.toFixed(4);
    }),
  }));

  return series;
};

const renderEconomicPovertyBarchart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--economic-poverty-barchart',
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          const selectErrorMessage = '';
          let povertyLine = defaultPovertyLine;

          // Render echarts coding here
          const chart = window.echarts.init(chartNode);

          const filterWrapper = addFilterWrapper(chartNode);

          // create dropdowns
          const root = createRoot(filterWrapper);
          root.render(
            <ChartFilters selectErrorMessage={selectErrorMessage}>
              <Select
                label="Select poverty line"
                options={[
                  { value: 'all', label: 'All' },
                  { value: '2.15', label: '2.15' },
                  { value: '3.65', label: '3.65' },
                  { value: '6.85', label: '6.85' },
                ]}
                classNamePrefix="poverty-line-select"
                isClearable={false}
                defaultValue={[{ value: 'all', label: 'All', isCloseable: true }]}
                onChange={(item) => {
                  window.DIState.setState({ povertyLine: item.value });
                }}
                css={{ minWidth: '100px' }}
              />
            </ChartFilters>
          );

          fetchCSVData(dataFile).then((data) => {
            const years = getYears(data);
            if (window.DIState) {
              window.DIState.addListener(() => {
                const { povertyLine: selectedPovertyLine } = window.DIState.getState;
                povertyLine = selectedPovertyLine || defaultPovertyLine;

                const options = {
                  responsive: false,
                  legend: {
                    selectedMode: false,
                  },
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'none',
                    },
                  },
                  grid: {
                    top: '60',
                    bottom: '20',
                    left: '5%',
                  },
                  xAxis: {
                    data: years,
                  },
                  yAxis: {
                    type: 'value',
                    name: 'Number of people living in poverty',
                    nameLocation: 'middle',
                    nameGap: 35,
                  },
                  series: getSeries(data, years, povertyLine),
                };
                defaultOptions.color = colorways.bluebell;
                chart.setOption(deepMerge(defaultOptions, options));

                dichart.hideLoading();
              });
            }
          });

          // add responsiveness
          handleResize(chart, chartNode);
        });
      },
    },
  });
};

export default renderEconomicPovertyBarchart;
