(function(e){function t(t){for(var i,r,n=t[0],s=t[1],u=t[2],p=0,d=[];p<n.length;p++)r=n[p],l[r]&&d.push(l[r][0]),l[r]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);c&&c(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],i=!0,r=1;r<a.length;r++){var n=a[r];0!==l[n]&&(i=!1)}i&&(o.splice(t--,1),e=s(s.s=a[0]))}return e}var i={},r={main:0},l={main:0},o=[];function n(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"3fd78784","chunk-1718a974":"58b7a504"}[e]+".js"}function s(t){if(i[t])return i[t].exports;var a=i[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(e){var t=[],a={about:1,"chunk-1718a974":1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise(function(t,a){for(var i="css/"+({about:"about"}[e]||e)+"."+{about:"50b5747c","chunk-1718a974":"ec42507a"}[e]+".css",l=s.p+i,o=document.getElementsByTagName("link"),n=0;n<o.length;n++){var u=o[n],p=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(p===i||p===l))return t()}var d=document.getElementsByTagName("style");for(n=0;n<d.length;n++){u=d[n],p=u.getAttribute("data-href");if(p===i||p===l)return t()}var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.onload=t,c.onerror=function(t){var i=t&&t.target&&t.target.src||l,o=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");o.request=i,delete r[e],c.parentNode.removeChild(c),a(o)},c.href=l;var v=document.getElementsByTagName("head")[0];v.appendChild(c)}).then(function(){r[e]=0}));var i=l[e];if(0!==i)if(i)t.push(i[2]);else{var o=new Promise(function(t,a){i=l[e]=[t,a]});t.push(i[2]=o);var u,p=document.createElement("script");p.charset="utf-8",p.timeout=120,s.nc&&p.setAttribute("nonce",s.nc),p.src=n(e),u=function(t){p.onerror=p.onload=null,clearTimeout(d);var a=l[e];if(0!==a){if(a){var i=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+i+": "+r+")");o.type=i,o.request=r,a[1](o)}l[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:p})},12e4);p.onerror=p.onload=u,document.head.appendChild(p)}return Promise.all(t)},s.m=e,s.c=i,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(a,i,function(t){return e[t]}.bind(null,i));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],p=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var c=p;o.push(["56d7","chunk-vendors"]),a()})({"034f":function(e,t,a){"use strict";var i=a("64a9"),r=a.n(i);r.a},"56d7":function(e,t,a){"use strict";a.r(t);a("7f7f"),a("cadf"),a("551c"),a("097d");var i=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",[a("b-navbar",{staticClass:"navbar-expand",attrs:{type:"dark",variant:"dark"}},[a("b-navbar-nav",[a("b-nav-item",{attrs:{to:"/form"}},[e._v("Form")]),a("b-nav-item",{attrs:{to:"/map"}},[e._v("Map")])],1),a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-item",{attrs:{active:e.showArc},on:{click:function(t){e.showArc=!e.showArc}}},[e._v("ArcGIS Online")]),a("b-nav-item-dropdown",{attrs:{text:"Job History",right:""}},e._l(e.jobHistory,function(t,i){return a("b-dropdown-item",{key:i,on:{click:function(a){e.changeJob(t,i)}}},[e._v(e._s(t.date))])}),1)],1)],1),a("ArcGISOnline",{directives:[{name:"show",rawName:"v-show",value:e.showArc,expression:"showArc"}],attrs:{display:e.showArc,id:"arcgisonline",searchType:"Feature Service"},on:{addItem:e.handleAGOL}})],1),a("AlertOverlay"),a("keep-alive",[a("router-view",{ref:"appBody",staticClass:"view"})],1)],1)},l=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"slide-fade"}},[a("div",[a("b-form-input",{ref:"input",attrs:{type:"text"},model:{value:e.queryStr,callback:function(t){e.queryStr=t},expression:"queryStr"}}),a("b-form-select",{attrs:{options:e.privacy},model:{value:e.selectedPrivacy,callback:function(t){e.selectedPrivacy=t},expression:"selectedPrivacy"}}),e.results?a("b-list-group",e._l(e.results,function(t,i){return a("b-list-group-item",{key:i,on:{click:function(a){e.$emit("addItem",t)}}},[a("img",{attrs:{src:t.thumbnailUrl}}),a("h5",{staticClass:"noselect"},[e._v(e._s(t.title))]),a("p",{staticClass:"noselect"},[e._v(e._s(t.description))])])}),1):e._e()],1)])},n=[],s=(a("386d"),a("f7fe")),u={name:"ArcGISOnline",props:{display:Boolean},data:function(){return{queryStr:"",results:null,privacy:[{text:"Public",value:"public"},{text:"Organization",value:"org"},{text:"Private",value:"private"},{text:"Shared",value:"shared"}],selectedPrivacy:"public"}},watch:{queryStr:function(){this.queryStr&&this.debounceSearch()},selectedPrivacy:function(){this.queryStr&&this.debounceSearch()},display:function(){this.display&&this.$refs.input.focus()}},created:function(){this.debounceSearch=s(this.search,500)},computed:{queryParams:function(){return{query:"title:".concat(this.queryStr,"* AND type:'Feature Service AND access:").concat(this.selectedPrivacy),sortField:"type",sortOrder:"desc",num:10}},portal:function(){return this.$store.state.portal}},methods:{search:function(){var e=this;this.portal.queryItems(this.queryParams).then(function(t){e.results=t.results})}}},p=u,d=(a("caef"),a("2877")),c=Object(d["a"])(p,o,n,!1,null,null,null);c.options.__file="ArcGISOnline.vue";var v=c.exports,m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"alertholder"},[a("b-alert",{attrs:{show:"processing"===e.jobStatus}},[e._v("\n    Job is Processing"),a("Spinner",{attrs:{size:"medium"}})],1),a("b-alert",{attrs:{show:"success"===e.jobStatus,variant:"success",dismissible:""}},[e._v("Job Complete")]),a("b-alert",{attrs:{show:"failed"===e.jobStatus,variant:"danger",dismissible:""}},[e._v("Job Failure")]),e._l(e.messages,function(t,i){return a("b-alert",{key:t,attrs:{show:"",variant:"warning",dismissible:""},on:{dismissed:function(t){e.messages.pop(i)}}},[e._v(e._s(t))])})],2)},y=[],T=a("5b7e"),f=a.n(T),b=a("7ffd"),h={components:{Spinner:f.a},computed:{jobStatus:Object(b["d"])("jobStatus"),messages:Object(b["d"])("messages")}},x=h,g=(a("d6a5"),Object(d["a"])(x,m,y,!1,null,null,null));g.options.__file="AlertOverlay.vue";var S=g.exports,_={name:"app",components:{ArcGISOnline:v,AlertOverlay:S},data:function(){return{showArc:!1}},computed:{searchType:function(){return"Form"==this.$route.name?"Table":"Map"==this.$route.name?"Feature Service":""},jobHistory:Object(b["b"])("jobHistory")},created:function(){this.$store.dispatch("ParseHistory",null),this.$store.dispatch("createPortal");var e=localStorage.getItem("formDefault");if(e){var t=JSON.parse(e);this.$store.set("requiredParam",t.defReq),this.$store.set("optionalParam",t.defOpt)}},methods:{handleAGOL:function(e){this.$refs.appBody.loadItem(e),this.showArc=!1},changeJob:function(e,t){this.$store.dispatch("newJob",{job:t,info:e})}}},w=_,O=(a("034f"),Object(d["a"])(w,r,l,!1,null,null,null));O.options.__file="App.vue";var P=O.exports,A=a("8c4f");i["a"].use(A["a"]);var E=new A["a"]({routes:[{path:"/form",name:"Form",alias:"/",component:function(){return a.e("about").then(a.bind(null,"c109"))},props:!0},{path:"/map",name:"Map",component:function(){return a.e("chunk-1718a974").then(a.bind(null,"308d"))},props:!0}]}),M=a("9f7b"),N=(a("f9e3"),a("2dd8"),a("3835")),R=a("ade3"),L=(a("6762"),a("2fdb"),a("ac6a"),a("456d"),a("2f62")),D=a("afaa"),j=a.n(D);i["a"].use(L["a"]);var I={requiredParam:a("9023"),optionalParam:a("5cd1"),jobId:"",jobHistory:{},jobStatus:"",messages:[],geocodeReq:"",geocodeModal:!1,showOrderPair:!1,showRouteRenewal:!1,portal:null,config:a("9c40").default},k=b["c"].mutations(I);I.esriModules={esriId:j.a.loadModules(["esri/identity/IdentityManager"]),esriRequest:j.a.loadModules(["esri/request"]),Map:j.a.loadModules(["esri/Map"]),MapView:j.a.loadModules(["esri/views/MapView"]),Graphic:j.a.loadModules(["esri/Graphic"]),Geoprocessor:j.a.loadModules(["esri/tasks/Geoprocessor"]),FeatureLayer:j.a.loadModules(["esri/layers/FeatureLayer"]),Field:j.a.loadModules(["esri/layers/support/Field"]),LayerList:j.a.loadModules(["esri/widgets/LayerList"]),Portal:j.a.loadModules(["esri/portal/Portal"]),MapImageLayer:j.a.loadModules(["esri/layers/MapImageLayer"]),Projection:j.a.loadModules(["esri/geometry/projection"]),Point:j.a.loadModules(["esri/geometry/Point"]),Search:j.a.loadModules(["esri/widgets/Search"]),esriConfig:j.a.loadModules(["esri/config"])};var U=new L["a"].Store({plugins:[b["a"].plugin],state:I,mutations:k,getters:{orderLen:function(e){return Object.keys(e.requiredParam.Order).length},depotLen:function(e){return Object.keys(e.requiredParam.Depot).length},routeLen:function(e){return Object.keys(e.requiredParam.Route).length}},actions:{ProcessJob:function(e,t){var a=e.commit,i=e.dispatch,r=e.state;a("SET_JOB_STATUS","processing"),a("SET_JOB_ID",""),t.then(function(e){var t=e.messages.filter(function(e){var t=r.messages;return t.push(e.description),a("SET_MESSAGES",t),e.description.includes("030088")||e.description.includes("030092")});"job-succeeded"==e.jobStatus&&0==t.length?(a("SET_JOB_STATUS","success"),a("SET_JOB_ID",e.jobId),i("ParseHistory",e.jobId)):("job-failed"==e.jobStatus||t.length>0)&&a("SET_JOB_STATUS","failed")}).catch(function(e){a("SET_JOB_STATUS","failed");var t=r.messages;t.push(e.message),a("SET_MESSAGES",t)})},ParseHistory:function(e,t){var a=e.commit,i=e.state,r=localStorage.getItem("jobhistory");if(r){var l=JSON.parse(r);for(var o in t&&l&&(l[t]={date:Date(),requiredParam:i.requiredParam,optionalParam:i.optionalParam}),l)(new Date).getTime()-new Date(l[o]["date"]).getTime()>=864e5&&delete l[o];r=l}else r=t?Object(R["a"])({},t,{date:Date(),requiredParam:i.requiredParam,optionalParam:i.optionalParam}):{};localStorage.setItem("jobhistory",JSON.stringify(r)),a("SET_JOB_HISTORY",r)},newJob:function(e,t){var a=e.commit,i=t.job,r=t.info;a("SET_JOB_ID",i),a("SET_REQUIRED_PARAM",JSON.parse(JSON.stringify(r.requiredParam))),a("SET_OPTIONAL_PARAM",JSON.parse(JSON.stringify(r.optionalParam)))},setClear:function(e){var t=e.commit;t("SET_REQUIRED_PARAM",JSON.parse(JSON.stringify(a("9023")))),t("SET_OPTIONAL_PARAM",JSON.parse(JSON.stringify(a("5cd1"))))},createPortal:function(e){var t=e.commit,a=e.state;a.esriModules.esriConfig.then(function(e){var i=Object(N["a"])(e,1),r=i[0];r.portalUrl=a.config.portalURL;var l=localStorage.getItem("esriId");a.esriModules.esriId.then(function(e){var i=Object(N["a"])(e,1),r=i[0];l&&(r.initialize(JSON.parse(l)),console.log("hydrated esriId")),a.esriModules.Portal.then(function(e){var i=Object(N["a"])(e,1),l=i[0];t("SET_PORTAL",new l({authMode:"immediate"})),a.portal.load().then(function(){return localStorage.setItem("esriId",JSON.stringify(r.toJSON())),!0},function(e){console.log(e)})})})})}}});i["a"].use(M["a"]),i["a"].config.devtools=!0,E.beforeEach(function(e,t,a){document.title="VRP - ".concat(e.name),a()}),new i["a"]({router:E,store:U,render:function(e){return e(P)}}).$mount("#app")},"5cd1":function(e){e.exports={default_date:{display:!0,inputType:"datetime",labelText:"Default Date",value:"",tooltip:"The date on which all routes will start"},travel_mode:{display:!0,inputType:"travelModes",labelText:"Travel Mode",value:"",tooltip:"Choose the mode of transportation from your ArcGIS Online Org"},time_zone_usage_for_time_fields:{display:!0,inputType:"select",labelText:"Time Zone Usage for Time Fields",value:"GEO_LOCAL",domain:[{text:"Local Time",value:"GEO_LOCAL"},{text:"UTC (GMT + 0:00)",value:"UTC"}],tooltip:"Specify the time zone for the input date-time fields"},impedance:{display:!1,inputType:"select",labelText:"Impedance",value:"Truck Time",domain:[{text:"Truck Time",value:"Truck Time"},{text:"Drive Time",value:"Drive Time"},{text:"Walk Time",value:"Walk Time"}],tooltip:"Impedance for the route. If travel mode is set, this value is overridden. See REST API docs"},time_units:{display:!0,inputType:"select",labelText:"Time Units",value:"Minutes",domain:[{text:"Seconds",value:"Seconds"},{text:"Minutes",value:"Minutes"},{text:"Hours",value:"Hours"},{text:"Days",value:"Days"}],tooltip:"Specify the time units for all time based attribute values"},distance_units:{display:!0,inputType:"select",labelText:"Distance Units",value:"Kilometers",domain:[{text:"Miles",value:"Miles"},{text:"Kilometers",value:"Kilometers"},{text:"Feet",value:"Feet"},{text:"Yards",value:"Yards"},{text:"Meters",value:"Meters"},{text:"Nautical Miles",value:"Nautical Miles"}],tooltip:"Specify the distance units for all distance based attribute values"},uturn_policy:{display:!1,inputType:"select",labelText:"U-Turn Policy",value:"ALLOW_UTURNS",domain:[{text:"Allow U-turns",value:"ALLOW_UTURNS"},{text:"Allow at dead ends and intersections only",value:"ALLOW_DEAD_ENDS_AND_INTERSECTIONS_ONLY"},{text:"Allow at dead ends only",value:"ALLOW_DEAD_ENDS_ONLY"},{text:"Do not allow U-turns",value:"NO_UTURNS"}],tooltip:"Restrict the use of U-turns. If travel modes are set, this value is overridden. See REST API docs."},time_window_factor:{display:!0,inputType:"select",labelText:"Time Window Factor",value:"Medium",domain:[{text:"Low",value:"Low"},{text:"Medium",value:"Medium"},{text:"High",value:"High"}],tooltip:"Rate the importance of honoring time windows without causing violations"},spatially_cluster_routes:{display:!0,inputType:"select",labelText:"Spatially Cluster Routes",value:"true",domain:[{text:"True",value:"true"},{text:"False",value:"false"}],tooltip:"Specify is orders assigned to an individual route are spatially clustered"},route_zones:{display:!0,inputType:"url",labelText:"Route Zones",value:"",tooltip:"Enter URL to specify areas that delineate work territories for given routes"},route_renewals:{display:!0,inputType:"routeRenewal",labelText:"Route Renewals",value:{features:[]},tooltip:"Popup to specify intermidate depots that routes can visit to reload cargo"},order_pairs:{display:!0,inputType:"orderPair",labelText:"Order Pairs",value:{features:[]},tooltip:"Popup to specify pairs to pickup and delivery orders"},excess_transit_factor:{display:!0,inputType:"select",labelText:"Excess Transit Factors",value:"Medium",domain:[{text:"Low",value:"Low"},{text:"Medium",value:"Medium"},{text:"High",value:"High"}],tooltip:"Rate the importantce of reducing excess transit time of order pairs"},point_barriers:{display:!0,inputType:"url",labelText:"Point Barriers",value:"",tooltip:"Enter URL to specify one or more points that act as restrictions"},line_barriers:{display:!0,inputType:"url",labelText:"Line Barriers",value:"",tooltip:"Enter URL to specify one or more lines that prohibit travel"},polygon_barriers:{display:!0,inputType:"url",labelText:"Polygon Barriers",value:"",tooltip:"Enter URL to specify polygons that restrict travel"},use_hierarchy_in_analysis:{display:!0,inputType:"select",labelText:"Use Hierarchy",value:"true",domain:[{text:"True",value:"true"},{text:"False",value:"false"}],tooltip:"Specify if hierarchy should be used in calcuation"},route_line_simplification_tolerance:{display:!0,inputType:"number",labelText:"Route Line Simplification Tolerance",value:10,tooltip:"Specify by how much you want to simplify the route geometry"},directions_language:{display:!0,inputType:"select",labelText:"Directions Langauge",value:"en",domain:[{text:"Arabic",value:"ar"},{text:"Czech",value:"cz"},{text:"German",value:"de"},{text:"Greek",value:"el"},{text:"English",value:"en"},{text:"Spanish",value:"es"},{text:"Estonian",value:"et"},{text:"French",value:"fr"},{text:"Hebrew",value:"he"},{text:"Italian",value:"it"},{text:"Japanese",value:"ja"},{text:"Korean",value:"ko"},{text:"Lithuanian",value:"lt"},{text:"Latvian",value:"lv"},{text:"Dutch",value:"nl"},{text:"Polish",value:"pl"},{text:"Brazilian Portugese",value:"pt-BR"},{text:"Portugese",value:"pt-PT"},{text:"Russian",value:"ru"},{text:"Swedish",value:"sv"},{text:"Turkish",value:"tr"},{text:"Chinese (simplified)",value:"zh-CN"}],tooltip:"Specify the language to be used when generating directions"},directions_style_name:{display:!0,inputType:"select",labelText:"Directions Style Name",value:"NA Desktop",domain:[{text:"NA Desktop",value:"NA Desktop"},{text:"NA Navigation",value:"NA Navigation"}],tooltip:"Specify the formatting style for directions"},save_output_network_analysis_layer:{display:!0,inputType:"select",labelText:"Save Output Network Analysis Layer",value:"false",domain:[{text:"True",value:"true"},{text:"False",value:"false"}],tooltip:"Save analysis settings. Please see REST API docs"},overrides:{display:!0,inputType:"textArea",labelText:"Overrides",value:"",tooltip:"Specify JSON for overriding parameters. Contact Esri Support for details"}}},"64a9":function(e,t,a){},9023:function(e){e.exports={Order:{1:{attributes:{Name:{display:!0,inputType:"text",labelText:"Name",value:"",tooltip:"Give this order a name",isRequired:!0},ServiceTime:{display:!0,inputType:"number",labelText:"Service Time",value:"",tooltip:"How long the order takes to service"},TimeWindowStart1:{display:!0,inputType:"datetime",labelText:"Time Window Start 1",value:"",tooltip:"Beginning time of the first time window"},TimeWindowEnd1:{display:!0,inputType:"datetime",labelText:"Time Window End 1",value:"",tooltip:"Ending time of the first time window"},TimeWindowStart2:{display:!0,inputType:"datetime",labelText:"Time Window Start 2",value:"",tooltip:"Beginning time of the second time window"},TimeWindowEnd2:{display:!0,inputType:"datetime",labelText:"Time Window End 2",value:"",tooltip:"Ending time of the second time window"},MaxVioloationTime1:{display:!0,inputType:"number",labelText:"Max Violation Time 1",value:""},MaxViolationTime2:{display:!0,inputType:"number",labelText:"Max Violation Time 2",value:""},DeliveryQuantities:{display:!0,inputType:"text",labelText:"Delivery Quantities",value:""},PickupQuantites:{display:!0,inputType:"text",labelText:"PickupQuantities",value:""},Revenue:{display:!0,inputType:"number",labelText:"Revenue",value:""},SpecialtyNames:{display:!0,inputType:"text",labelText:"Specialty Names",value:""},AssignmentRule:{display:!0,inputType:"select",labelText:"Assignment Rule",value:3,domain:[{text:"Exclude",value:0},{text:"Preserve route and sequence",value:1},{text:"Preserve route",value:2},{text:"Override",value:3},{text:"Anchor first",value:4},{text:"Anchor last",value:5}]},CurbApproach:{display:!0,inputType:"select",labelText:"Curb Approach",value:0,domain:[{text:"Either side of vehicle",value:0},{text:"Right side of vehicle",value:1},{text:"Left side of vehicle",value:2},{text:"No U-turn",value:"3"}]},RouteName:{display:!0,inputType:"text",labelText:"Route Name",value:""},Sequence:{display:!0,inputType:"number",labelText:"Sequence",value:""}},geometry:{location:"",x:"",y:""}}},Depot:{1:{attributes:{Name:{display:!0,inputType:"text",labelText:"Name",value:"",isRequired:!0},TimeWindowStart1:{display:!0,inputType:"datetime",labelText:"Time Window Start 1",value:""},TimeWindowEnd1:{display:!0,inputType:"datetime",labelText:"Time Window End 1",value:""},TimeWindowStart2:{display:!0,inputType:"datetime",labelText:"Time Window Start 2",value:""},TimeWindowEnd2:{display:!0,inputType:"datetime",labelText:"Time Window End 2",value:""},CurbApproach:{display:!0,inputType:"select",labelText:"Curb Approach",value:0,domain:[{text:"Either side of vehicle",value:0},{text:"Right side of vehicle",value:1},{text:"Left side of vehicle",value:2},{text:"No U-turn",value:"3"}]},Bearing:{display:!0,inputType:"text",labelText:"Bearing",value:""},BearingTol:{display:!0,inputType:"text",labelText:"Bearing Tolerance",value:""},NavLatency:{display:!0,inputType:"number",labelText:"Navigation Latency",value:""}},geometry:{location:"",x:"",y:""}}},Route:{1:{attributes:{Name:{display:!0,inputType:"text",labelText:"Name",value:"",isRequired:!0},StartDepotName:{display:!0,inputType:"selectFromDepotName",labelText:"Start Depot Name",value:"",isRequired:!0},EndDepotName:{display:!0,inputType:"selectFromDepotName",labelText:"End Depot Name",value:""},StartDepotServiceTime:{display:!0,inputType:"number",labelText:"Start Depot Service Time",value:""},EndDepotServiceTime:{display:!0,inputType:"number",labelText:"End Depot Service Time",value:""},EarliestStartTime:{display:!0,inputType:"datetime",labelText:"Earliest Start Time",value:""},LatestStartTime:{display:!0,inputType:"datetime",labelText:"Latest Start Time",value:""},ArriveDepartDelay:{display:!0,inputType:"number",labelText:" Arrive and Depart Delay",value:""},Capacities:{display:!0,inputType:"text",labelText:"Capacities",value:""},FixedCost:{display:!0,inputType:"number",labelText:"Fixed Cost",value:""},CostPerUnitTime:{display:!0,inputType:"number",labelText:"Cost Per Unit Time",value:""},CostPerUnitDistance:{display:!0,inputType:"number",labelText:"Cost Per Unit Distance",value:""},OverTimeStartTime:{display:!0,inputType:"number",labelText:"Overtime Start Time",value:""},CostPerUnitOvertime:{display:!0,inputType:"number",labelText:"Cost Per Unit Overtime",value:""},MaxOrderCount:{display:!0,inputType:"number",labelText:"Max Orders Per Route",value:"30"},MaxTotalTime:{display:!0,inputType:"number",labelText:"Max Total Time",value:""},MaxTotalTravelTime:{display:!0,inputType:"number",labelText:"Max Total Travel Time",value:""},MaxTotalDistance:{display:!0,inputType:"number",labelText:"Max Total Distance",value:""},SpecialtyNames:{display:!0,inputType:"text",labelText:"Specialty Names",value:""},AssignmentRule:{display:!0,inputType:"select",labelText:"Assignment Rule",value:0,domain:[{text:"Include route in solution",value:0},{text:"Exclude route from solution",value:1}]}}}}}},"9c40":function(e,t,a){"use strict";a.r(t),t["default"]={RESTURL:"https://www.arcgis.com/sharing/rest",portalURL:"https://www.arcgis.com",VRPURL:"https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem",travelModeURL:"https://logistics.arcgis.com/arcgis/rest/services/World/Utilities/GPServer/GetTravelModes/execute"}},a0d6:function(e,t,a){},a624:function(e,t,a){},caef:function(e,t,a){"use strict";var i=a("a624"),r=a.n(i);r.a},d6a5:function(e,t,a){"use strict";var i=a("a0d6"),r=a.n(i);r.a}});