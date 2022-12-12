(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    28: function (e, t, n) {
      e.exports = n(64);
    },
    63: function (e, t, n) {},
    64: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(19),
        i = n(7),
        r = (function () {
          function e() {
            (this.id = Math.random()),
              (this.state = {}),
              (this.listeners = []),
              Object(i.d)(this, { state: i.e, setState: i.a, getState: i.c });
          }
          var t = e.prototype;
          return (
            (t.setState = function (e, t) {
              void 0 === t && (t = !0), (this.state = t ? Object.assign({}, this.state, e) : e);
            }),
            (t.addListener = function (e) {
              return (this.listeners = this.listeners.concat(Object(i.b)(e))), this.listeners.length - 1;
            }),
            (t.removeListener = function (e) {
              e < this.listeners.length && this.listeners[e] && (this.listeners[e](), (this.listeners[e] = null));
            }),
            (t.resetListeners = function () {
              this.listeners = [];
            }),
            Object(a.a)(e, [
              {
                key: 'getState',
                get: function () {
                  return this.state;
                },
              },
            ]),
            e
          );
        })();
      window.DIState = new r();
      var o = n(0),
        l = n.n(o),
        s = n(20),
        c = n(21),
        d = n.n(c),
        u = {
          rainbow: [
            '#e84439',
            '#eb642b',
            '#f49b21',
            '#109e68',
            '#0089cc',
            '#893f90',
            '#c2135b',
            '#f8c1b2',
            '#f6bb9d',
            '#fccc8e',
            '#92cba9',
            '#88bae5',
            '#c189bb',
            '#e4819b',
          ],
          default: ['#6c120a', '#a21e25', '#cd2b2a', '#dc372d', '#ec6250', '#f6b0a0', '#fbd7cb', '#fce3dc'],
          sunflower: ['#7d4712', '#ba6b15', '#df8000', '#f7a838', '#fac47e', '#fedcab', '#fee7c1', '#feedd4'],
          marigold: ['#7a2e05', '#ac4622', '#cb5730', '#ee7644', '#f4a57c', '#facbad', '#fcdbbf', '#fde5d4'],
          rose: ['#65093d', '#8d0e56', '#9f1459', '#d12568', '#e05c86', '#f3a5b6', '#f6b8c1', '#f9cdd0'],
          lavendar: ['#42184c', '#632572', '#732c85', '#994d98', '#af73ae', '#cb98c4', '#deb5d6', '#ebcfe5'],
          bluebell: ['#0c457b', '#0071b1', '#0089cc', '#5da3d9', '#77adde', '#88bae5', '#bcd4f0', '#d3e0f4'],
          leaf: ['#08492f', '#005b3e', '#00694a', '#3b8c62', '#74bf93', '#a2d1b0', '#b1d8bb', '#c5e1cb'],
          orange: ['#973915', '#d85b31', '#eb642b', '#f18e5e', '#f4a57c', '#f6bb9d'],
        },
        f = {
          color: u.default.concat(u.rainbow),
          legend: { left: '10%', top: 10, textStyle: { fontFamily: 'Geomanist Regular,sans-serif' } },
          tooltip: {
            show: !0,
            trigger: 'item',
            showContent: !0,
            textStyle: { fontFamily: 'Geomanist Regular,sans-serif' },
          },
          toolbox: {
            show: !0,
            showTitle: !1,
            feature: { saveAsImage: { title: 'Save as PNG', pixelRatio: 2 } },
            right: 20,
            tooltip: {
              show: !0,
              formatter: function (e) {
                return '<div>' + e.title + '</div>';
              },
              textStyle: { fontFamily: 'Geomanist Regular,sans-serif' },
            },
          },
          xAxis: { axisLabel: { fontFamily: 'Geomanist Regular,sans-serif', fontSize: 13 }, splitLine: { show: !1 } },
          yAxis: {
            axisLabel: { fontFamily: 'Geomanist Regular,sans-serif', fontSize: 13 },
            splitLine: { show: !1 },
            nameLocation: 'end',
            nameTextStyle: { padding: [0, 50, 0, 0] },
          },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: !0 },
        },
        b = f,
        p = n(22);
      var h = function (e) {
          return new Promise(function (t) {
            Object(p.parse)(e, {
              download: !0,
              header: !0,
              skipEmptyLines: !0,
              complete: function (e) {
                var n = e.data;
                return t(n);
              },
            });
          });
        },
        m = n(23),
        g = n(24),
        v = n(1),
        w = n(4),
        y = n.n(w),
        x = n(26),
        S = {
          control: function (e) {
            return Object.assign({}, e, {
              borderColor: '#ddd',
              borderRadius: 'none',
              boxShadow: 'none',
              ':hover': { borderColor: '#8f1b13' },
              ':active': { borderColor: '#8f1b13' },
            });
          },
          option: function (e) {
            return Object.assign({}, e, { fontSize: '14px' });
          },
          singleValue: function (e) {
            return Object.assign({}, e, { fontSize: '14px' });
          },
          multiValue: function (e) {
            return Object.assign({}, e, { fontSize: '14px' });
          },
          multiValueLabel: function (e, t) {
            return t.data.isCloseable ? e : Object.assign({}, e, { paddingRight: 6 });
          },
          multiValueRemove: function (e, t) {
            return t.data.isCloseable ? e : Object.assign({}, e, { display: 'none' });
          },
          input: function (e) {
            return Object.assign({}, e, { fontSize: '14px' });
          },
          indicatorsContainer: function (e) {
            return Object.assign({}, e, { pointerEvents: 'none' });
          },
        },
        O = function (e) {
          var t = e.label,
            n = e.onError,
            a = e.maxSelectedOptions,
            i = e.defaultValue,
            r = e.singleSelectOptions,
            l = Object(g.a)(e, ['label', 'onError', 'maxSelectedOptions', 'defaultValue', 'singleSelectOptions']),
            s = Object(o.useState)(i),
            c = s[0],
            d = s[1];
          Object(o.useEffect)(
            function () {
              l.onChange && l.onChange(c), n && n();
            },
            [c]
          );
          return Object(v.b)(
            'div',
            { className: 'labelled-data-selector--wrapper' },
            Object(v.b)('label', null, Object(v.b)('b', null, t)),
            Object(v.b)(
              x.a,
              Object(m.a)({}, l, {
                value: c,
                onChange: function (e) {
                  if (l.isMulti)
                    if (e.length) {
                      var t = e.findIndex(function (e) {
                        return r.find(function (t) {
                          return t.value === e.value;
                        });
                      });
                      l.isMulti && e.length > 1 && -1 !== t
                        ? d(0 === t ? e.slice(1) : [e[t]])
                        : a && e.length > a
                        ? n && n({ type: 'maxSelectedOptions', message: 'Only up to ' + a + ' selections allowed' })
                        : d(e);
                    } else d(i);
                  else d(e);
                },
                css: { marginRight: '10px' },
                styles: S,
                isClearable: 'undefined' !== l.isClearable ? l.isClearable : c.length > 1,
              })
            )
          );
        };
      (O.propTypes = {
        label: y.a.string,
        options: y.a.array,
        maxSelectedOptions: y.a.number,
        onChange: y.a.func,
        onError: y.a.func,
        defaultValue: y.a.array,
        singleSelectOptions: y.a.array,
        isMulti: y.a.bool,
        isClearable: y.a.bool,
      }),
        (O.defaultProps = { maxSelectedOptions: 2, singleSelectOptions: [] });
      var j,
        C = O,
        E = n(25),
        L = n(27).a.div(
          j ||
            (j = Object(E.a)([
              '\n  color: red;\n  font-size: 11px;\n  position: relative;\n  padding: 5px 5px 5px 0px;\n  display: block;\n',
            ]))
        ),
        R = function (e) {
          var t = Object(o.useState)(''),
            n = t[0],
            a = t[1],
            i = function (t) {
              t ? 'maxSelectedOptions' === t.type && a(e.selectErrorMessage) : a('');
            };
          return l.a.createElement(
            'div',
            null,
            l.a.Children.map(e.children, function (e) {
              return l.a.isValidElement(e) ? l.a.cloneElement(e, { onError: i }) : e;
            }),
            n ? l.a.createElement(L, { className: 'data-selector--wrapper' }, n) : null
          );
        };
      R.propTypes = { selectErrorMessage: y.a.string, children: y.a.node };
      var I = R,
        A = function (e, t, n) {
          var a;
          return ((a = e),
          Array.from(
            new Set(
              a.map(function (e) {
                return e.PIP_Region;
              })
            )
          )).map(function (a) {
            return {
              name: a,
              type: 'bar',
              stack: 'Region',
              emphasis: { focus: 'series' },
              data: t.map(function (t) {
                var i = [];
                return (
                  'all' !== n
                    ? e
                        .filter(function (e) {
                          return e.poverty_line === n;
                        })
                        .forEach(function (e) {
                          e.PIP_Region === a && e.year === t && i.push(Number(Number(e.poorpop).toFixed(4)));
                        })
                    : e.forEach(function (e) {
                        e.PIP_Region === a && e.year === t && i.push(Number(e.poorpop));
                      }),
                  i
                    .reduce(function (e, t) {
                      return e + t;
                    }, 0)
                    .toFixed(4)
                );
              }),
            };
          });
        },
        P = function () {
          window.DICharts.handler.addChart({
            className: 'dicharts--economic-poverty-barchart',
            echarts: {
              onAdd: function (e) {
                Array.prototype.forEach.call(e, function (e) {
                  var t = new window.DICharts.Chart(e.parentElement),
                    n = window.echarts.init(e),
                    a = (function (e) {
                      var t,
                        n = document.createElement('div');
                      return (
                        (t = n.classList).add.apply(t, ['spotlight-banner', 'data-selector--wrapper']),
                        e.parentElement.insertBefore(n, e),
                        n
                      );
                    })(e);
                  Object(s.createRoot)(a).render(
                    l.a.createElement(
                      I,
                      { selectErrorMessage: '' },
                      l.a.createElement(C, {
                        label: 'Select poverty line',
                        options: [
                          { value: 'all', label: 'All' },
                          { value: '2.15', label: '2.15' },
                          { value: '3.65', label: '3.65' },
                          { value: '6.85', label: '6.85' },
                        ],
                        classNamePrefix: 'poverty-line-select',
                        isClearable: !1,
                        defaultValue: [{ value: 'all', label: 'All', isCloseable: !0 }],
                        onChange: function (e) {
                          window.DIState.setState({ povertyLine: e.value });
                        },
                        css: { minWidth: '100px' },
                      })
                    )
                  ),
                    h(
                      'https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/feature/bar-chart/src/data/barChartData.csv'
                    ).then(function (e) {
                      var a = (function (e) {
                        return Array.from(
                          new Set(
                            e.map(function (e) {
                              return e.year;
                            })
                          )
                        );
                      })(e);
                      window.DIState &&
                        window.DIState.addListener(function () {
                          var i = window.DIState.getState.povertyLine,
                            r = {
                              responsive: !1,
                              legend: { selectedMode: !1 },
                              tooltip: { trigger: 'axis', axisPointer: { type: 'none' } },
                              grid: { top: '60', bottom: '20', left: '5%' },
                              xAxis: { data: a },
                              yAxis: {
                                type: 'value',
                                name: 'Number of people living in poverty',
                                nameLocation: 'middle',
                                nameGap: 35,
                              },
                              series: A(e, a, i || 'all'),
                            };
                          (b.color = u.bluebell), n.setOption(d()(b, r)), t.hideLoading();
                        });
                    }),
                    (function (e, t) {
                      window.addEventListener(
                        'onresize',
                        function () {
                          e.resize({ width: t.clientWidth + 'px', height: t.clientHeight + 'px' });
                        },
                        !0
                      );
                    })(n, e);
                });
              },
            },
          });
        };
      n(63);
      window.addEventListener('load', function () {
        P();
      });
    },
  },
  [[28, 1, 2]],
]);
