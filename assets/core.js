(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,n){e.exports=n(66)},65:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var a,i=n(21),r=n.n(i),o=n(0),l=n.n(o),s=n(11),c={rainbow:["#e84439","#eb642b","#f49b21","#109e68","#0089cc","#893f90","#c2135b","#f8c1b2","#f6bb9d","#fccc8e","#92cba9","#88bae5","#c189bb","#e4819b"],default:["#6c120a","#a21e25","#cd2b2a","#dc372d","#ec6250","#f6b0a0","#fbd7cb","#fce3dc"],sunflower:["#7d4712","#ba6b15","#df8000","#f7a838","#fac47e","#fedcab","#fee7c1","#feedd4"],marigold:["#7a2e05","#ac4622","#cb5730","#ee7644","#f4a57c","#facbad","#fcdbbf","#fde5d4"],rose:["#65093d","#8d0e56","#9f1459","#d12568","#e05c86","#f3a5b6","#f6b8c1","#f9cdd0"],lavendar:["#42184c","#632572","#732c85","#994d98","#af73ae","#cb98c4","#deb5d6","#ebcfe5"],bluebell:["#0c457b","#0071b1","#0089cc","#5da3d9","#77adde","#88bae5","#bcd4f0","#d3e0f4"],leaf:["#08492f","#005b3e","#00694a","#3b8c62","#74bf93","#a2d1b0","#b1d8bb","#c5e1cb"],orange:["#973915","#d85b31","#eb642b","#f18e5e","#f4a57c","#f6bb9d"]},u={color:c.default.concat(c.rainbow),legend:{left:"10%",top:10,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},tooltip:{show:!0,trigger:"item",showContent:!0,textStyle:{fontFamily:"Geomanist Regular,sans-serif"}},toolbox:{show:!0,showTitle:!1,feature:{saveAsImage:{title:"Save as PNG",pixelRatio:2}},right:20,tooltip:{show:!0,formatter:function(e){return"<div>"+e.title+"</div>"},textStyle:{fontFamily:"Geomanist Regular,sans-serif"}}},xAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1}},yAxis:{axisLabel:{fontFamily:"Geomanist Regular,sans-serif",fontSize:13},splitLine:{show:!1},nameLocation:"end",nameTextStyle:{padding:[0,50,0,0]}},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0}},p=u,d=n(22),f=n(28),b=n(2),m=n.n(b),h=f.a.div(a||(a=Object(d.a)(["\n  color: red;\n  font-size: 11px;\n  position: relative;\n  padding: 5px 5px 5px 0px;\n  display: block;\n"]))),g=function(e){var t=Object(o.useState)(""),n=t[0],a=t[1],i=function(t){t?"maxSelectedOptions"===t.type&&a(e.selectErrorMessage):a("")};return l.a.createElement("div",null,l.a.Children.map(e.children,(function(e){return l.a.isValidElement(e)?l.a.cloneElement(e,{onError:i}):e})),n?l.a.createElement(h,{className:"data-selector--wrapper"},n):null)};g.propTypes={selectErrorMessage:m.a.string,children:m.a.node};var v=g,y=n(23),w=n(24),x=n(1),S=n(27),O={control:function(e){return Object.assign({},e,{borderColor:"#ddd",borderRadius:"none",boxShadow:"none",":hover":{borderColor:"#8f1b13"},":active":{borderColor:"#8f1b13"}})},option:function(e){return Object.assign({},e,{fontSize:"14px"})},singleValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValue:function(e){return Object.assign({},e,{fontSize:"14px"})},multiValueLabel:function(e,t){return t.data.isCloseable?e:Object.assign({},e,{paddingRight:6})},multiValueRemove:function(e,t){return t.data.isCloseable?e:Object.assign({},e,{display:"none"})},input:function(e){return Object.assign({},e,{fontSize:"14px"})},indicatorsContainer:function(e){return Object.assign({},e,{pointerEvents:"none"})}},C=function(e){var t=e.label,n=e.onError,a=e.maxSelectedOptions,i=e.defaultValue,r=e.singleSelectOptions,l=Object(w.a)(e,["label","onError","maxSelectedOptions","defaultValue","singleSelectOptions"]),s=Object(o.useState)(i),c=s[0],u=s[1];Object(o.useEffect)((function(){l.onChange&&l.onChange(c),n&&n()}),[c]);return Object(x.b)("div",{className:"labelled-data-selector--wrapper"},Object(x.b)("label",null,Object(x.b)("b",null,t)),Object(x.b)(S.a,Object(y.a)({},l,{value:c,onChange:function(e){if(l.isMulti)if(e.length){var t=e.findIndex((function(e){return r.find((function(t){return t.value===e.value}))}));l.isMulti&&e.length>1&&-1!==t?u(0===t?e.slice(1):[e[t]]):a&&e.length>a?n&&n({type:"maxSelectedOptions",message:"Only up to "+a+" selections allowed"}):u(e)}else u(i);else u(e)},css:{marginRight:"10px"},styles:O,isClearable:"undefined"!==l.isClearable?l.isClearable:c.length>1})))};C.propTypes={label:m.a.string,options:m.a.array,maxSelectedOptions:m.a.number,onChange:m.a.func,onError:m.a.func,defaultValue:m.a.array,singleSelectOptions:m.a.array,isMulti:m.a.bool,isClearable:m.a.bool},C.defaultProps={maxSelectedOptions:2,singleSelectOptions:[]};var L=C,E=n(25);var j=function(e){return new Promise((function(t){Object(E.parse)(e,{download:!0,header:!0,skipEmptyLines:!0,complete:function(e){var n=e.data;return t(n)}})}))},A=function(e){var t,n=document.createElement("div");return(t=n.classList).add.apply(t,["spotlight-banner","data-selector--wrapper"]),e.parentElement.insertBefore(n,e),n},M=function(e,t,n){var a;return(a=e,Array.from(new Set(a.map((function(e){return e["Region name"]}))))).map((function(a){return{name:"Other High Income Countries"===a?"Other High-Income Countries":a,type:"bar",stack:"Region",tooltip:{trigger:"item",formatter:function(e){return e.seriesName+" <br> <strong>"+e.name+": "+e.value+"</strong> billion"}},data:t.map((function(t){var i=[];return e.filter((function(e){return e["poverty line (2017 PPP)"]===n})).forEach((function(e){e["Region name"]===a&&e.year===t&&i.push(Number(Number(e["Population in poverty (billions)"]).toFixed(2)))})),{value:i.reduce((function(e,t){return e+t}),0).toFixed(2),emphasis:{focus:"self"}}}))}}))},V=function(){window.DICharts.handler.addChart({className:"dicharts--economic-poverty-barchart",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){var t=new window.DICharts.Chart(e.parentElement),n=window.echarts.init(e),a=A(e);Object(s.createRoot)(a).render(l.a.createElement(v,{selectErrorMessage:""},l.a.createElement(L,{label:"Select poverty line",options:[{value:"2.15",label:"US$2.15 per day"},{value:"3.65",label:"US$3.65 per day"},{value:"6.85",label:"US$6.85 per day"}],classNamePrefix:"poverty-line-select",isClearable:!1,defaultValue:[{value:"2.15",label:"US$2.15 per day",isCloseable:!0}],onChange:function(e){window.DIState.setState({povertyLine:e.value})},css:{minWidth:"100px"}}))),j("https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/dev/src/data/barChartData.csv").then((function(e){var a=function(e){return Array.from(new Set(e.map((function(e){return e.year}))))}(e);window.DIState&&window.DIState.addListener((function(){var i=window.DIState.getState.povertyLine,o={responsive:!1,grid:{top:"60",bottom:"20",left:"5%"},xAxis:{data:a},yAxis:{type:"value",name:"Number of people living in poverty (billions)",nameLocation:"middle",nameGap:48},series:M(e,a,i||"2.15")};p.color=c.bluebell,n.setOption(r()(p,o)),n.on("legendselectchanged",(function(e){!function(e,t){var n=t.selected,a=Object.values(n).filter((function(e){return e})).length;e.setOption({animation:!0}),0===a?Object.keys(n).forEach((function(t){e.dispatchAction({type:"legendSelect",name:t})})):n[t.name]||(e.dispatchAction({type:"legendSelect",name:t.name}),Object.keys(n).forEach((function(a){Object.prototype.hasOwnProperty.call(n,a)&&a!==t.name&&e.dispatchAction({type:"legendUnSelect",name:a})})))}(n,e)})),t.hideLoading()}))})),function(e,t){window.addEventListener("onresize",(function(){e.resize({width:t.clientWidth+"px",height:t.clientHeight+"px"})}),!0)}(n,e)}))}}})},P=n(16),R=n.n(P),I=(n(64),["#bcd4f0","#77adde","#0089cc","#0c457b"]),N=[{name:"ECA",label:"Europe & Central Asia"},{name:"MNA",label:"Middle East & North Africa"},{name:"SSA",label:"Sub-Saharan Africa"},{name:"OHI",label:"Other High-Income Countries"},{name:"SAS",label:"South Asia"},{name:"LAC",label:"Latin America & Caribbean"},{name:"EAP",label:"East Asia & Pacific"}],D=[{variable:"changepoorpop",label:"Change in number of people living in poverty",unit:"million"},{variable:"changeHC",label:"Change in the percentage of people living in poverty",unit:"%"}],z=["France","Kosovo","Norway"],T=function(e,t,n,a,i,r){var o=[];if(0===a)o=[0,.25,.5,.75,1];else for(var l=t;l<=n;l+=a)o.push(l);return i.scale(r).domain(o)(Math.abs(e))},k=function(e,t,n,a,i){var r=(i.positive.maxValue-i.positive.minValue)/I.length,o=(i.negative.maxValue-i.negative.minValue)/I.length,l=Number(e.properties[t])/1e6;return e.properties[t]?"changepoorpop"===t?l>=0?n(l,i.positive.minValue,i.positive.maxValue,r,a,I):n(l,i.negative.minValue,i.negative.maxValue,o,a,I):l>=0?n(100*Number(e.properties[t]),i.positive.minValue,i.positive.maxValue,r,a,I):n(100*Number(e.properties[t]),i.negative.minValue,i.negative.maxValue,o,a,I):"#E6E1E5"},F=function(e){return l.a.createElement("button",{className:"reset-button",onClick:e.onReset},"Reset")};F.propTypes={onReset:m.a.func};var _=F,G=function(e){return Object(x.b)(v,{selectErrorMessage:""},e.selectors.map((function(e){var t=e.label,n=e.options,a=e.defaultValue,i=e.stateProperty,r=e.classPrefix;return Object(x.b)(L,{key:t,label:t,options:n,classNamePrefix:r,isClearable:!1,defaultValue:[Object.assign({},a,{isCloseable:!0})],onChange:function(e){var t;window.DIState.setState(((t={})[i]=e.value,t))},css:{minWidth:"200px"}})})))};G.propTypes={selectors:m.a.arrayOf(m.a.shape({label:m.a.string.isRequired,defaultValue:m.a.shape({value:m.a.string,label:m.a.string}),stateProperty:m.a.string.isRequired,classPrefix:m.a.string.isRequired}))};var U=G,H=function(e,t,n,a,i,r){var o,l,s,c,u,p=["#0c457b","#0089cc","#77adde","#bcd4f0"],d=["#bcd4f0","#77adde","#0089cc","#0c457b"],f=(l=i,s=a.map((function(e){return Number(e[l])})),c=s.filter((function(e){return e>=0})),u=s.filter((function(e){return e<0})).map((function(e){return Math.abs(e)})),"changepoorpop"===l?{positive:{maxValue:Math.ceil(Math.max.apply(Math,c)/1e6),minValue:Math.ceil(Math.min.apply(Math,c)/1e6)},negative:{maxValue:Math.ceil(Math.max.apply(Math,u)/1e6),minValue:Math.ceil(Math.min.apply(Math,u)/1e6)}}:{positive:{maxValue:Math.ceil(100*Math.max.apply(Math,c)),minValue:Math.ceil(100*Math.min.apply(Math,c))},negative:{maxValue:Math.ceil(100*Math.max.apply(Math,u)),minValue:Math.ceil(100*Math.min.apply(Math,u))}}),b=r;b.onAdd=function(){var e=window.L.DomUtil.create("div","legend"),t='<div class="legendContentContainer"><p style="justify-content: center;">Change in poverty levels (see map for exact change)</p> <div style="display: flex;flex-direction: row;"><p style="margin-right:8px;">Greatest increase</p>'+p.map((function(e){return'<span>\n          <i style="background:'+e+';border-radius:1px;margin-right:8px;width:40px;"></i>\n          </span>'})).join("")+'<p style="margin-right:8px;">No change</p>'+d.map((function(e){return'<span>\n            <i style="background:repeating-linear-gradient(\n              45deg,\n              white 0px,\n              white 2px,\n              '+e+" 2px,\n              "+e+' 4px\n            );border-radius:1px;margin-right:8px;width:40px;"></i>\n            </span>'})).join("")+"\n          <p>Greatest decrease</p></div></div>";return e.innerHTML=t,e},b.addTo(e);var m=function(t){var n;return(n={})[Number(t.properties[i])<0?"fillPattern":"fillColor"]=Number(t.properties[i])<0?new window.L.StripePattern({weight:2,spaceWeight:1,angle:45,color:k(t,i,T,R.a,f)}).addTo(e):k(t,i,T,R.a,f),n.weight=1,n.opacity=1,n.color="white",n.fillOpacity=1,n},h=function(e){o.resetStyle(e.target),e.target.closePopup()},g=function(t,n){t.properties[i]||""===t.properties[i]?n.on({mouseover:function(e){return function(e,t,n){var a=e.target;a.setStyle({fillColor:"#f7a838",color:"#484848",weight:2,fillPattern:null}),window.L.Browser.ie||window.L.Browser.opera||window.L.Browser.edge||a.bringToFront(),a.bindTooltip("<div>"+a.feature.properties.country_name+"<br>"+function(e,t){return"changepoorpop"===e?t.feature.properties[e]<0?"Reduction in people living in poverty":"Additional people living in poverty":t.feature.properties[e]<0?"Reduction in proportion of population living in poverty":"Additional proportion of population living in poverty"}(t,a)+": "+("changepoorpop"===t?Math.abs((Number(a.feature.properties[t])/1e6).toFixed(2)):Math.abs((100*Number(a.feature.properties[t])).toFixed(2)))+'<span style="padding-left: 2px;">'+n.find((function(e){return e.variable===t})).unit+"</span></div>",{direction:"bottom",opacity:1,sticky:!0}).openTooltip()}(e,i,D)},mouseout:h}):n.on({mouseover:function(){e.getContainer().querySelectorAll(".leaflet-interactive").forEach((function(e){e.classList+=" grab-cursor-enabled"}))},mouseout:function(){e.getContainer().querySelectorAll(".leaflet-interactive.grab-cursor-enabled").forEach((function(e){e.classList.remove("grab-cursor-enabled")}))}})};n.clearLayers(),o=window.L.geoJSON(t,{style:m,onEachFeature:g}),n.addLayer(o)};var $=function(){window.DICharts.handler.addChart({className:"dicharts--economic-poverty-leaflet",echarts:{onAdd:function(e){Array.prototype.forEach.call(e,(function(e){window.dataLayer=window.dataLayer||[];var t=new window.DICharts.Chart(e.parentElement),n=window.L.map(e,{maxZoom:3,minZoom:1,crs:window.L.CRS.EPSG4326,center:[6.6,20.9],zoom:1,attributionControl:!1,zIndex:0}),a=window.L.control({position:"bottomright"}),i=window.L.control({position:"bottomleft"});window.fetch("https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/dev/src/data/world_map.geo.json").then((function(e){return e.json()})).then((function(r){var o=window.L.featureGroup().addTo(n),c=r.features;j("https://raw.githubusercontent.com/devinit/economic-poverty-factsheet-viz/dev/src/data/map_data.csv").then((function(r){var u=function(e){return Array.from(new Set(e.map((function(e){return e.PIP_Region}))))}(r),p=[{label:"Select poverty data type",options:[{value:"changepoorpop",label:"Change in number of people in poverty"},{value:"changeHC",label:"Percentage of people living in poverty"}],classPrefix:"poverty-data-select",stateProperty:"povertyData",defaultValue:{value:"changepoorpop",label:"Change in number of people in poverty"}},{label:"Select region",options:[{value:"all",label:"All"}].concat(u.map((function(e){return{value:e,label:N.find((function(t){return t.name===e})).label}}))),classPrefix:"region-select",stateProperty:"povertyRegion",defaultValue:{value:"all",label:"All"}},{label:"Select poverty line",options:[{value:"2.15",label:"US$2.15 per day"},{value:"3.65",label:"US$3.65 per day"},{value:"6.85",label:"US$6.85 per day"}],classPrefix:"poverty-line-select",stateProperty:"mapPovertyLine",defaultValue:{value:"2.15",label:"US$2.15 per day"}}],d=A(e);Object(s.createRoot)(d).render(l.a.createElement(U,{selectors:p}));var f=function(){n.setView([6.6,20.9],1)};if(i.onAdd=function(){var e=window.L.DomUtil.create("div");return Object(s.createRoot)(e).render(l.a.createElement(_,{onReset:f})),e},i.addTo(n),window.DIState){t.showLoading();var b="all",m="changepoorpop",h="2.15";window.DIState.addListener((function(){var e=window.DIState.getState,t=e.povertyRegion,i=e.povertyData,l=e.mapPovertyLine;if(b!==t||m!==i||h!==l){m=i||"changepoorpop";var s=function(e,t,n){return"all"===n?e.filter((function(e){return e.poverty_line===t})):e.filter((function(e){return e.poverty_line===t&&e.PIP_Region===n}))}(r,h=l||"2.15",b=t||"all");H(n,function(e,t){return e.map((function(e){var n=Object.assign({},e),a=t.find((function(t){return z.includes(t.country_name)?t.ISO_A3===e.properties.WB_A3:t.ISO_A3===e.properties.ISO_A3}));return a&&(n.properties=Object.assign({},e.properties,a)),n}))}(c,s),o,s,m,a)}}))}t.hideLoading()}))})).catch((function(e){return console.log(e)}))}))}}})},q=n(26),B=n(7),W=function(){function e(){this.id=Math.random(),this.state={},this.listeners=[],Object(B.d)(this,{state:B.e,setState:B.a,getState:B.c})}var t=e.prototype;return t.setState=function(e,t){void 0===t&&(t=!0),this.state=t?Object.assign({},this.state,e):e},t.addListener=function(e){return this.listeners=this.listeners.concat(Object(B.b)(e)),this.listeners.length-1},t.removeListener=function(e){e<this.listeners.length&&this.listeners[e]&&(this.listeners[e](),this.listeners[e]=null)},t.resetListeners=function(){this.listeners=[]},Object(q.a)(e,[{key:"getState",get:function(){return this.state}}]),e}();window.DIState=new W;n(65);window.addEventListener("load",(function(){$(),V()}))}},[[29,1,2]]]);