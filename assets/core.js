(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,n){e.exports=n(65)},64:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var a=n(20),r=n(7),o=function(){function e(){this.id=Math.random(),this.state={},this.listeners=[],Object(r.d)(this,{state:r.e,setState:r.a,getState:r.c})}var t=e.prototype;return t.setState=function(e,t){void 0===t&&(t=!0),this.state=t?Object.assign({},this.state,e):e},t.addListener=function(e){return this.listeners=this.listeners.concat(Object(r.b)(e)),this.listeners.length-1},t.removeListener=function(e){e<this.listeners.length&&this.listeners[e]&&(this.listeners[e](),this.listeners[e]=null)},t.resetListeners=function(){this.listeners=[]},Object(a.a)(e,[{key:"getState",get:function(){return this.state}}]),e}();window.DIState=new o;var i=n(0),l=n.n(i),s=n(21),c=n.n(s),u=n(11),p=n(22);var d,f=function(e){return new Promise((function(t){Object(p.parse)(e,{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){var n=e.data;return t(n)}})}))},b=function(e){var t,n=document.createElement("div");return(t=n.classList).add.apply(t,["spotlight-banner","data-selector--wrapper"]),e.parentElement.insertBefore(n,e),n},m=n(1),h=n(2),g=n.n(h),v=n(23),y=n(28).a.div(d||(d=Object(v.a)(["\n  color: red;\n  font-size: 11px;\n  position: relative;\n  padding: 5px 5px 5px 0px;\n  display: block;\n"]))),w=function(e){var t=Object(i.useState)(""),n=t[0],a=t[1],r=function(t){t?"maxSelectedOptions"===t.type&&a(e.selectErrorMessage):a("")};return l.a.createElement("div",null,l.a.Children.map(e.children,(function(e){return l.a.isValidElement(e)?l.a.cloneElement(e,{onError:r}):e})),n?l.a.createElement(y,{className:"data-selector--wrapper"},n):null)};w.propTypes={selectErrorMessage:g.a.string,children:g.a.node};var S=w,x=n(24),O=n(25),C=n(27),E={control:function(e){return Object.assign({},e,{borderColor:"#ddd",borderRadius:"none",boxShadow:"none",":hover":{borderColor:"#8f1b13"},":active":{borderColor:"#8f1b13"}})},option:function(e){return Object.assign({},e,{fontSize:"14px"})},singleValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValueLabel:function(e,t){return t.data.isCloseable?e:Object.assign({},e,{paddingRight:6})},multiValueRemove:function(e,t){return t.data.isCloseable?e:Object.assign({},e,{display:"none"})},input:function(e){return Object.assign({},e,{fontSize:"14px"})},indicatorsContainer:function(e){return Object.assign({},e,{pointerEvents:"none"})}},L=function(e){var t=e.label,n=e.onError,a=e.maxSelectedOptions,r=e.defaultValue,o=e.singleSelectOptions,l=Object(O.a)(e,["label","onError","maxSelectedOptions","defaultValue","singleSelectOptions"]),s=Object(i.useState)(r),c=s[0],u=s[1];Object(i.useEffect)((function(){l.onChange&&l.onChange(c),n&&n()}),[c]);return Object(m.b)("div",{className:"labelled-data-selector--wrapper"},Object(m.b)("label",null,Object(m.b)("b",null,t)),Object(m.b)(C.a,Object(x.a)({},l,{value:c,onChange:function(e){if(l.isMulti)if(e.length){var t=e.findIndex((function(e){return o.find((function(t){return t.value===e.value}))}));l.isMulti&&e.length>1&&-1!==t?u(0===t?e.slice(1):[e[t]]):a&&e.length>a?n&&n({type:"maxSelectedOptions",message:"Only up to "+a+" selections allowed"}):u(e)}else u(r);else u(e)},css:{marginRight:"10px"},styles:E,isClearable:"undefined"!==l.isClearable?l.isClearable:c.length>1})))};L.propTypes={label:g.a.string,options:g.a.array,maxSelectedOptions:g.a.number,onChange:g.a.func,onError:g.a.func,defaultValue:g.a.array,singleSelectOptions:g.a.array,isMulti:g.a.bool,isClearable:g.a.bool},L.defaultProps={maxSelectedOptions:2,singleSelectOptions:[]};var A=L,j=function(e){return Object(m.b)(S,{selectErrorMessage:""},e.selectors.map((function(e){var t=e.label,n=e.options,a=e.defaultValue,r=e.stateProperty,o=e.classPrefix;return Object(m.b)(A,{key:t,label:t,options:n,classNamePrefix:o,isClearable:!1,defaultValue:[Object.assign({},a,{isCloseable:!0})],onChange:function(e){var t;window.DIState.setState(((t={})[r]=e.value,t))},css:{minWidth:"200px"}})})))};j.propTypes={selectors:g.a.arrayOf(g.a.shape({label:g.a.string.isRequired,defaultValue:g.a.shape({value:g.a.string,label:g.a.string}),stateProperty:g.a.string.isRequired,classPrefix:g.a.string.isRequired}))};var M=j,P=["#0c457b","#0071b1","#0089cc","#5da3d9","#77adde","#88bae5","#bcd4f0","#d3e0f4"],R=[{name:"ECA",label:"Europe & Central Asia"},{name:"MNA",label:"Middle East & North Africa"},{name:"SSA",label:"Sub-Saharan Africa"},{name:"OHI",label:"Other High Income Countries"},{name:"SAS",label:"South Asia"},{name:"LAC",label:"Latin America & Caribbean"},{name:"EAP",label:"East Asia & Pacific"}],V=[{variable:"progresspoorpop",label:"Change in number of people in poverty",unit:"million"},{variable:"progressHC",label:"Percentage of people living in poverty",unit:"%"}],N=["France","Kosovo","Norway"],I=function(e,t,n,a,r){for(var o=[],i=t;i<=n;i+=a)o.push(i);return r.scale(P).domain(o)(e)},D=function(e,t,n,a,r){var o=(r.maxValue-r.minValue)/P.length;return e.properties[t]?n("progresspoorpop"===t?Number(e.properties[t])/1e6:100*Number(e.properties[t]),r.minValue,r.maxValue,o,a):"#E6E1E5"},z=function(e){return l.a.createElement("button",{className:"reset-button",onClick:e.onReset},"Reset")};z.propTypes={onReset:g.a.func};var F=z,T=function(e,t,n,a,r,o){var i,l,s,u=(l=r,s=a.map((function(e){return Number(e[l])})),"progresspoorpop"===l?{maxValue:Math.ceil(Math.max.apply(Math,s)/1e6),minValue:-1===Math.sign(Math.ceil(Math.min.apply(Math,s)/1e6))?Math.ceil(Math.min.apply(Math,s)/1e6)-1:Math.ceil(Math.min.apply(Math,s)/1e6)}:{maxValue:Math.ceil(100*Math.max.apply(Math,s)),minValue:-1===Math.sign(Math.ceil(100*Math.min.apply(Math,s)))?Math.ceil(100*Math.min.apply(Math,s))-1:Math.ceil(100*Math.min.apply(Math,s))}),p=o;p.onAdd=function(){var e=window.L.DomUtil.create("div","legend"),t=["#0c457b","#0071b1","#0089cc","#5da3d9","#77adde","#88bae5","#bcd4f0","#d3e0f4"].map((function(e){return'<span>\n          <i style="background:'+e+';border-radius:1px;margin-right:0;width:40px;"></i>\n        </span>'})).join("")+' <p style="margin-left:1px;margin-top: 4px;">'+u.minValue+" - "+u.maxValue+("progressHC"===r?", % of population":", millions of people")+"</p>";return e.innerHTML=t,e},p.addTo(e);var d=function(e){return{fillColor:D(e,r,I,c.a,u),weight:1,opacity:1,color:"white",fillOpacity:1}},f=function(e){i.resetStyle(e.target),e.target.closePopup()},b=function(t,n){t.properties[r]||""===t.properties[r]?n.on({mouseover:function(e){return function(e,t,n){var a=e.target;a.setStyle({fillColor:"#f7a838",color:"#484848",weight:2}),window.L.Browser.ie||window.L.Browser.opera||window.L.Browser.edge||a.bringToFront(),a.bindTooltip("<div>"+a.feature.properties.country_name+"<br>"+n.find((function(e){return e.variable===t})).label+": "+("progresspoorpop"===t?(Number(a.feature.properties[t])/1e6).toFixed(2):(100*Number(a.feature.properties[t])).toFixed(2))+'<span style="padding-left: 2px;">'+n.find((function(e){return e.variable===t})).unit+"</span></div>",{direction:"bottom",opacity:1,sticky:!0}).openTooltip()}(e,r,V)},mouseout:f}):n.on({mouseover:function(){e.getContainer().querySelectorAll(".leaflet-interactive").forEach((function(e){e.classList+=" grab-cursor-enabled"}))},mouseout:function(){e.getContainer().querySelectorAll(".leaflet-interactive.grab-cursor-enabled").forEach((function(e){e.classList.remove("grab-cursor-enabled")}))}})};n.clearLayers(),i=window.L.geoJSON(t,{style:d,onEachFeature:b}),n.addLayer(i)};var k=function(){window.DICharts.handler.addChart({className:"dicharts--economic-poverty-leaflet",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){window.dataLayer=window.dataLayer||[];var t=new window.DICharts.Chart(e.parentElement),n=window.L.map(e,{maxZoom:3,minZoom:1,crs:window.L.CRS.EPSG4326,center:[6.6,20.9],zoom:1,attributionControl:!1}),a=window.L.control({position:"topright"}),r=window.L.control({position:"bottomleft"});window.fetch("https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/dev/src/data/world_map.geo.json").then((function(e){return e.json()})).then((function(o){var i=window.L.featureGroup().addTo(n),s=o.features;f("https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/dev/src/data/map_data.csv").then((function(o){var c=function(e){return Array.from(new Set(e.map((function(e){return e.PIP_Region}))))}(o),p=[{label:"Select poverty data type",options:[{value:"progresspoorpop",label:"Change in number of people in poverty"},{value:"progressHC",label:"Percentage of people living in poverty"}],classPrefix:"poverty-data-select",stateProperty:"povertyData",defaultValue:{value:"progresspoorpop",label:"Change in number of people in poverty"}},{label:"Select region",options:[{value:"all",label:"All"}].concat(c.map((function(e){return{value:e,label:R.find((function(t){return t.name===e})).label}}))),classPrefix:"region-select",stateProperty:"povertyRegion",defaultValue:{value:"all",label:"All"}},{label:"Select poverty line",options:[{value:"2.15",label:"US$2.15 per day"},{value:"3.65",label:"US$3.65 per day"},{value:"6.85",label:"US$6.85 per day"}],classPrefix:"poverty-line-select",stateProperty:"mapPovertyLine",defaultValue:{value:"2.15",label:"US$2.15 per day"}}],d=b(e);Object(u.createRoot)(d).render(l.a.createElement(M,{selectors:p}));var f=function(){n.setView([6.6,20.9],1)};if(r.onAdd=function(){var e=window.L.DomUtil.create("div");return Object(u.createRoot)(e).render(l.a.createElement(F,{onReset:f})),e},r.addTo(n),window.DIState){t.showLoading();var m="all",h="progresspoorpop",g="2.15";window.DIState.addListener((function(){var e=window.DIState.getState,t=e.povertyRegion,r=e.povertyData,l=e.mapPovertyLine;if(m!==t||h!==r||g!==l){h=r||"progresspoorpop";var c=function(e,t,n){return"all"===n?e.filter((function(e){return e.poverty_line===t})):e.filter((function(e){return e.poverty_line===t&&e.PIP_Region===n}))}(o,g=l||"2.15",m=t||"all");T(n,function(e,t){return e.map((function(e){var n=Object.assign({},e),a=t.find((function(t){return N.includes(t.country_name)?t.ISO_A3===e.properties.WB_A3:t.ISO_A3===e.properties.ISO_A3}));return a&&(n.properties=Object.assign({},e.properties,a)),n}))}(s,c),i,c,h,a)}}))}t.hideLoading()}))})).catch((function(e){return console.log(e)}))}))}}})},_=n(26),U=n.n(_),G={rainbow:["#e84439","#eb642b","#f49b21","#109e68","#0089cc","#893f90","#c2135b","#f8c1b2","#f6bb9d","#fccc8e","#92cba9","#88bae5","#c189bb","#e4819b"],default:["#6c120a","#a21e25","#cd2b2a","#dc372d","#ec6250","#f6b0a0","#fbd7cb","#fce3dc"],sunflower:["#7d4712","#ba6b15","#df8000","#f7a838","#fac47e","#fedcab","#fee7c1","#feedd4"],marigold:["#7a2e05","#ac4622","#cb5730","#ee7644","#f4a57c","#facbad","#fcdbbf","#fde5d4"],rose:["#65093d","#8d0e56","#9f1459","#d12568","#e05c86","#f3a5b6","#f6b8c1","#f9cdd0"],lavendar:["#42184c","#632572","#732c85","#994d98","#af73ae","#cb98c4","#deb5d6","#ebcfe5"],bluebell:["#0c457b","#0071b1","#0089cc","#5da3d9","#77adde","#88bae5","#bcd4f0","#d3e0f4"],leaf:["#08492f","#005b3e","#00694a","#3b8c62","#74bf93","#a2d1b0","#b1d8bb","#c5e1cb"],orange:["#973915","#d85b31","#eb642b","#f18e5e","#f4a57c","#f6bb9d"]},H={color:G.default.concat(G.rainbow),legend:{left:"10%",top:10,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},tooltip:{show:!0,trigger:"item",showContent:!0,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},toolbox:{show:!0,showTitle:!1,feature:{saveAsImage:{title:"Save as PNG",pixelRatio:2}},right:20,tooltip:{show:!0,formatter:function(e){return"<div>"+e.title+"</div>"},textStyle:{fontFamily:"Geomanist Regular,sans-serif"}}},xAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1}},yAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1},nameLocation:"end",nameTextStyle:{padding:[0,50,0,0]}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0}},$=H,q=function(e,t,n){var a;return(a=e,Array.from(new Set(a.map((function(e){return e["Region name"]}))))).map((function(a){return{name:a,type:"bar",stack:"Region",tooltip:{trigger:"item",formatter:function(e){return e.seriesName+" <br> <strong>"+e.name+": "+e.value+"</strong> billion"}},data:t.map((function(t){var r=[];return"all"===n?e.forEach((function(e){e["Region name"]===a&&e.year===t&&r.push(Number(Number(e["Population in poverty (billions)"]).toFixed(2)))})):e.filter((function(e){return e["poverty line (2017 PPP)"]===n})).forEach((function(e){e["Region name"]===a&&e.year===t&&r.push(Number(Number(e["Population in poverty (billions)"]).toFixed(2)))})),{value:r.reduce((function(e,t){return e+t}),0).toFixed(2),emphasis:{focus:"self"}}}))}}))},B=function(){window.DICharts.handler.addChart({className:"dicharts--economic-poverty-barchart",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var t=new window.DICharts.Chart(e.parentElement),n=window.echarts.init(e),a=b(e);Object(u.createRoot)(a).render(l.a.createElement(S,{selectErrorMessage:""},l.a.createElement(A,{label:"Select poverty line",options:[{value:"all",label:"All"}].concat([{value:"2.15",label:"US$2.15 per day"},{value:"3.65",label:"US$3.65 per day"},{value:"6.85",label:"US$6.85 per day"}]),classNamePrefix:"poverty-line-select",isClearable:!1,defaultValue:[{value:"all",label:"All",isCloseable:!0}],onChange:function(e){window.DIState.setState({povertyLine:e.value})},css:{minWidth:"100px"}}))),f("https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/dev/src/data/barChartData.csv").then((function(e){var a=function(e){return Array.from(new Set(e.map((function(e){return e.year}))))}(e);window.DIState&&window.DIState.addListener((function(){var r=window.DIState.getState.povertyLine,o={responsive:!1,grid:{top:"60",bottom:"20",left:"5%"},xAxis:{data:a},yAxis:{type:"value",name:"Number of people living in poverty (billions)",nameLocation:"middle",nameGap:35},series:q(e,a,r||"all")};$.color=G.bluebell,n.setOption(U()($,o)),n.on("legendselectchanged",(function(e){!function(e,t){var n=t.selected,a=Object.values(n).filter((function(e){return e})).length;e.setOption({animation:!0}),0===a?Object.keys(n).forEach((function(t){e.dispatchAction({type:"legendSelect",name:t})})):n[t.name]||(e.dispatchAction({type:"legendSelect",name:t.name}),Object.keys(n).forEach((function(a){Object.prototype.hasOwnProperty.call(n,a)&&a!==t.name&&e.dispatchAction({type:"legendUnSelect",name:a})})))}(n,e)})),t.hideLoading()}))})),function(e,t){window.addEventListener("onresize",(function(){e.resize({width:t.clientWidth+"px",height:t.clientHeight+"px"})}),!0)}(n,e)}))}}})};n(64);window.addEventListener("load",(function(){k(),B()}))}},[[29,1,2]]]);