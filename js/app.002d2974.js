(function(e){function t(t){for(var i,r,o=t[0],s=t[1],u=t[2],c=0,p=[];c<o.length;c++)r=o[c],n[r]&&p.push(n[r][0]),n[r]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(e[i]=s[i]);d&&d(t);while(p.length)p.shift()();return l.push.apply(l,u||[]),a()}function a(){for(var e,t=0;t<l.length;t++){for(var a=l[t],i=!0,r=1;r<a.length;r++){var o=a[r];0!==n[o]&&(i=!1)}i&&(l.splice(t--,1),e=s(s.s=a[0]))}return e}var i={},r={app:0},n={app:0},l=[];function o(e){return s.p+"js/"+({about:"about"}[e]||e)+"."+{about:"f5e9a6d3","chunk-1718a974":"41276f41","chunk-2d0cc5e5":"1100c97f"}[e]+".js"}function s(t){if(i[t])return i[t].exports;var a=i[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.e=function(e){var t=[],a={about:1,"chunk-1718a974":1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise(function(t,a){for(var i="css/"+({about:"about"}[e]||e)+"."+{about:"c85dc728","chunk-1718a974":"1d28923c","chunk-2d0cc5e5":"31d6cfe0"}[e]+".css",r=s.p+i,n=document.getElementsByTagName("link"),l=0;l<n.length;l++){var o=n[l],u=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(u===i||u===r))return t()}var c=document.getElementsByTagName("style");for(l=0;l<c.length;l++){o=c[l],u=o.getAttribute("data-href");if(u===i||u===r)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var i=t&&t.target&&t.target.src||r,n=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");n.request=i,a(n)},p.href=r;var d=document.getElementsByTagName("head")[0];d.appendChild(p)}).then(function(){r[e]=0}));var i=n[e];if(0!==i)if(i)t.push(i[2]);else{var l=new Promise(function(t,a){i=n[e]=[t,a]});t.push(i[2]=l);var u,c=document.getElementsByTagName("head")[0],p=document.createElement("script");p.charset="utf-8",p.timeout=120,s.nc&&p.setAttribute("nonce",s.nc),p.src=o(e),u=function(t){p.onerror=p.onload=null,clearTimeout(d);var a=n[e];if(0!==a){if(a){var i=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,l=new Error("Loading chunk "+e+" failed.\n("+i+": "+r+")");l.type=i,l.request=r,a[1](l)}n[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:p})},12e4);p.onerror=p.onload=u,c.appendChild(p)}return Promise.all(t)},s.m=e,s.c=i,s.d=function(e,t,a){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(a,i,function(t){return e[t]}.bind(null,i));return a},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var p=0;p<u.length;p++)t(u[p]);var d=c;l.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var i=a("64a9"),r=a.n(i);r.a},4805:function(e,t,a){"use strict";var i=a("897e"),r=a.n(i);r.a},"56d7":function(e,t,a){"use strict";a.r(t);a("7f7f"),a("cadf"),a("551c"),a("097d");var i=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",[a("b-navbar",{staticClass:"navbar-expand",attrs:{type:"dark",variant:"dark"}},[a("b-navbar-nav",[a("b-nav-item",{attrs:{to:"/form"}},[e._v("Form")]),a("b-nav-item",{attrs:{to:"/map"}},[e._v("Map")]),a("b-nav-item",{attrs:{href:"https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=cDEbMgKnRUKN85YW&response_type=token&redirect_uri=http://localhost:8080/redirect.html?",hidden:""}},[e._v("get")])],1),a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-item",{attrs:{active:e.showArc},on:{click:function(t){e.showArc=!e.showArc}}},[e._v("ArcGIS Online")]),a("b-nav-item-dropdown",{attrs:{text:"Job History",right:""}},e._l(e.jobHistory,function(t,i){return a("b-dropdown-item",{on:{click:function(a){e.changeJob(t,i)}}},[e._v(e._s(t.date))])}),1)],1)],1),a("ArcGISOnline",{directives:[{name:"show",rawName:"v-show",value:e.showArc,expression:"showArc"}],attrs:{display:e.showArc,id:"arcgisonline",searchType:"Feature Service"},on:{addItem:e.handleAGOL}})],1),a("AlertOverlay"),a("router-view",{ref:"appBody",staticClass:"view"})],1)},n=[],l=a("3835"),o=(a("28a5"),a("ac6a"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"slide-fade"}},[a("div",[a("b-form-input",{ref:"input",attrs:{type:"text"},model:{value:e.queryStr,callback:function(t){e.queryStr=t},expression:"queryStr"}}),a("b-form-select",{attrs:{options:e.privacy},model:{value:e.selectedPrivacy,callback:function(t){e.selectedPrivacy=t},expression:"selectedPrivacy"}}),a("b-list-group",e._l(e.results,function(t,i){return a("b-list-group-item",{key:i,on:{click:function(a){e.$emit("addItem",t.id)}}},[a("img",{attrs:{src:t.thumbnailUrl}}),a("h5",{staticClass:"noselect"},[e._v(e._s(t.title))]),a("p",{staticClass:"noselect"},[e._v(e._s(t.description))])])}),1)],1)])}),s=[],u=(a("386d"),a("afaa")),c=a("f7fe"),p={name:"ArcGISOnline",props:{display:Boolean},data:function(){return{queryStr:"",results:null,privacy:[{text:"Public",value:"public"},{text:"Organization",value:"org"},{text:"Private",value:"private"},{text:"Shared",value:"shared"}],selectedPrivacy:"public"}},watch:{queryStr:function(e,t){this.queryStr&&this.debounceSearch()},selectedPrivacy:function(e,t){this.queryStr&&this.debounceSearch()},display:function(){this.display&&this.$refs.input.focus()}},created:function(){var e=this;this.debounceSearch=c(this.search,500),u["loadModules"](["esri/portal/Portal"]).then(function(t){var a=Object(l["a"])(t,1),i=a[0],r=new i({authMode:"immediate"});r.load().then(function(){e.portal=r,console.log(r)})})},computed:{queryParams:function(){return{query:"title:".concat(this.queryStr,"* AND type:'Feature Service AND access:").concat(this.selectedPrivacy),sortField:"type",sortOrder:"desc",num:10}}},methods:{search:function(){var e=this;console.log("starting search"),this.portal.queryItems(this.queryParams).then(function(t){e.results=t.results,console.log(t)})}}},d=p,m=(a("caef"),a("2877")),v=Object(m["a"])(d,o,s,!1,null,null,null);v.options.__file="ArcGISOnline.vue";var f=v.exports,b=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"alertholder"},[a("b-alert",{attrs:{show:"processing"===e.jobStatus}},[e._v("\n\t\tJob is Processing"),a("Spinner",{attrs:{size:"medium"}})],1),a("b-alert",{attrs:{show:"success"===e.jobStatus,variant:"success",dismissible:""}},[e._v("Job Complete")]),a("b-alert",{attrs:{show:"failed"===e.jobStatus,variant:"danger",dismissible:""}},[e._v("Job Failure")]),e._l(e.messages,function(t,i){return a("b-alert",{key:t,attrs:{show:"",variant:"warning",dismissible:""},on:{dismissed:function(t){e.messages.pop(i)}}},[e._v(e._s(t))])})],2)},h=[],y=a("5b7e"),T=a.n(y),g=a("7ffd"),x={components:{Spinner:T.a},computed:{jobStatus:Object(g["d"])("jobStatus"),messages:Object(g["d"])("messages")}},_=x,S=(a("d6a5"),Object(m["a"])(_,b,h,!1,null,null,null));S.options.__file="AlertOverlay.vue";var w=S.exports,O={name:"app",components:{ArcGISOnline:f,AlertOverlay:w},data:function(){return{showArc:!1}},computed:{searchType:function(){return"Form"==this.$route.name?"Table":"Map"==this.$route.name?"Feature Service":void 0},jobHistory:Object(g["b"])("jobHistory")},created:function(){this.$store.set("jobHistory",null);var e=localStorage.getItem("formDefault");if(e){var t=JSON.parse(e);this.$store.set("requiredParam",t.defReq),this.$store.set("optionalParam",t.defOpt)}},methods:{handleAGOL:function(e){this.$refs.appBody.loadItem(e),this.showArc=!1},changeJob:function(e,t){this.$store.set("newJob",{job:t,info:e})},registerToken:function(e){var t={};e.split("&").forEach(function(e){var a=e.split("=");t[a[0]]=a[1]}),u["loadModules"](["esri/identity/IdentityManager"]).then(function(e){var a=Object(l["a"])(e,1),i=a[0];i.registerToken({server:"https://arcgis.com/sharing/rest",token:t.access_token})})}}},E=O,A=(a("034f"),Object(m["a"])(E,r,n,!1,null,null,null));A.options.__file="App.vue";var j=A.exports,P=a("8c4f"),k=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"home"},[i("img",{attrs:{alt:"Vue logo",src:a("cf05")}}),i("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},N=[],D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"hello"},[a("h1",[e._v(e._s(e.msg))]),e._m(0),a("h3",[e._v("Installed CLI Plugins")]),e._m(1),a("h3",[e._v("Essential Links")]),e._m(2),a("h3",[e._v("Ecosystem")]),e._m(3)])},M=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("\n    For a guide and recipes on how to configure / customize this project,"),a("br"),e._v("\n    check out the\n    "),a("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(".\n  ")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])]),a("li",[a("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[e._v("eslint")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[a("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),a("li",[a("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),a("li",[a("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),a("li",[a("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),a("li",[a("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[a("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),a("li",[a("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),a("li",[a("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),a("li",[a("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),a("li",[a("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],R={name:"HelloWorld",props:{msg:String}},C=R,L=(a("4805"),Object(m["a"])(C,D,M,!1,null,"b9167eee",null));L.options.__file="HelloWorld.vue";var q=L.exports,I={name:"home",components:{HelloWorld:q}},U=I,W=Object(m["a"])(U,k,N,!1,null,null,null);W.options.__file="Home.vue";var J=W.exports;i["a"].use(P["a"]);var H=new P["a"]({routes:[{path:"/",name:"Home",component:J},{path:"/form",name:"Form",component:function(){return a.e("about").then(a.bind(null,"c109"))},props:!0},{path:"/map",name:"Map",component:function(){return a.e("chunk-1718a974").then(a.bind(null,"308d"))},props:!0},{path:"/redirect/:params",name:"redirect",component:function(){return a.e("chunk-2d0cc5e5").then(a.bind(null,"4e42"))},props:!0}]}),B=a("9f7b"),F=(a("f9e3"),a("2dd8"),a("ade3")),$=(a("6762"),a("2fdb"),a("456d"),a("2f62")),G={Order:{1:{attributes:{Name:{display:!0,inputType:"text",labelText:"Name",value:"",tooltip:"Give this order a name",isRequired:!0},ServiceTime:{display:!0,inputType:"number",labelText:"Service Time",value:"",tooltip:"How long the order takes to service"},TimeWindowStart1:{display:!0,inputType:"datetime",labelText:"Time Window Start 1",value:"",tooltip:"Beginning time of the first time window"},TimeWindowEnd1:{display:!0,inputType:"datetime",labelText:"Time Window End 1",value:"",tooltip:"Ending time of the first time window"},TimeWindowStart2:{display:!0,inputType:"datetime",labelText:"Time Window Start 2",value:"",tooltip:"Beginning time of the second time window"},TimeWindowEnd2:{display:!0,inputType:"datetime",labelText:"Time Window End 2",value:"",tooltip:"Ending time of the second time window"},MaxVioloationTime1:{display:!0,inputType:"number",labelText:"Max Violation Time 1",value:""},MaxViolationTime2:{display:!0,inputType:"number",labelText:"Max Violation Time 2",value:""},DeliveryQuantities:{display:!0,inputType:"text",labelText:"Delivery Quantities",value:""},PickupQuantites:{display:!0,inputType:"text",labelText:"PickupQuantities",value:""},Revenue:{display:!0,inputType:"number",labelText:"Revenue",value:""},SpecialtyNames:{display:!0,inputType:"text",labelText:"Specialty Names",value:""},AssignmentRule:{display:!0,inputType:"select",labelText:"Assignment Rule",value:3,domain:[{text:"Exclude",value:0},{text:"Preserve route and sequence",value:1},{text:"Preserve route",value:2},{text:"Override",value:3},{text:"Anchor first",value:4},{text:"Anchor last",value:5}]},CurbApproach:{display:!0,inputType:"select",labelText:"Curb Approach",value:0,domain:[{text:"Either side of vehicle",value:0},{text:"Right side of vehicle",value:1},{text:"Left side of vehicle",value:2},{text:"No U-turn",value:"3"}]},RouteName:{display:!0,inputType:"text",labelText:"Route Name",value:""},Sequence:{display:!0,inputType:"number",labelText:"Sequence",value:""}},geometry:{location:"",x:"",y:""}}},Depot:{1:{attributes:{Name:{display:!0,inputType:"text",labelText:"Name",value:"",isRequired:!0},TimeWindowStart1:{display:!0,inputType:"datetime",labelText:"Time Window Start 1",value:""},TimeWindowEnd1:{display:!0,inputType:"datetime",labelText:"Time Window End 1",value:""},TimeWindowStart2:{display:!0,inputType:"datetime",labelText:"Time Window Start 2",value:""},TimeWindowEnd2:{display:!0,inputType:"datetime",labelText:"Time Window End 2",value:""},CurbApproach:{display:!0,inputType:"select",labelText:"Curb Approach",value:0,domain:[{text:"Either side of vehicle",value:0},{text:"Right side of vehicle",value:1},{text:"Left side of vehicle",value:2},{text:"No U-turn",value:"3"}]},Bearing:{display:!0,inputType:"text",labelText:"Bearing",value:""},BearingTol:{display:!0,inputType:"text",labelText:"Bearing Tolerance",value:""},NavLatency:{display:!0,inputType:"number",labelText:"Navigation Latency",value:""}},geometry:{location:"",x:"",y:""}}},Route:{1:{attributes:{Name:{display:!0,inputType:"text",labelText:"Name",value:"",isRequired:!0},StartDepotName:{display:!0,inputType:"selectFromDepotName",labelText:"Start Depot Name",value:"",isRequired:!0},EndDepotName:{display:!0,inputType:"selectFromDepotName",labelText:"End Depot Name",value:""},StartDepotServiceTime:{display:!0,inputType:"number",labelText:"Start Depot Service Time",value:""},EndDepotServiceTime:{display:!0,inputType:"number",labelText:"End Depot Service Time",value:""},EarliestStartTime:{display:!0,inputType:"datetime",labelText:"Earliest Start Time",value:""},LatestStartTime:{display:!0,inputType:"datetime",labelText:"Latest Start Time",value:""},ArriveDepartDelay:{display:!0,inputType:"number",labelText:" Arrive and Depoart Delay",value:""},Capacities:{display:!0,inputType:"text",labelText:"Capacities",value:""},FixedCost:{display:!0,inputType:"number",labelText:"Fixed Cost",value:""},CostPerUnitTime:{display:!0,inputType:"number",labelText:"Cost Per Unit Time",value:""},CostPerUnitDistance:{display:!0,inputType:"number",labelText:"Cost Per Unit Distance",value:""},OverTimeStartTime:{display:!0,inputType:"number",labelText:"Overtime Start Time",value:""},CostPerUnitOvertime:{display:!0,inputType:"number",labelText:"Cost Per Unit Overtime",value:""},MaxOrderCount:{display:!0,inputType:"number",labelText:"Max Orders Per Route",value:"30"},MaxTotalTime:{display:!0,inputType:"number",labelText:"Max Total Time",value:""},MaxTotalTravelTime:{display:!0,inputType:"number",labelText:"Max Total Travel Time",value:""},MaxTotalDistance:{display:!0,inputType:"number",labelText:"Max Total Distance",value:""},SpecialtyNames:{display:!0,inputType:"text",labelText:"Specialty Names",value:""},AssignmentRule:{display:!0,inputType:"select",labelText:"Assignment Rule",value:0,domain:[{text:"Include route in solution",value:0},{text:"Exclude route from solution",value:1}]}}}}},z={default_date:{display:!0,inputType:"datetime",labelText:"Default Date",value:"",tooltip:"The date on which all routes will start"},travel_mode:{display:!0,inputType:"select",labelText:"Travel Mode",value:"fnGetDefaultMode",domain:"fnGetAllModes",tooltip:"Choose the mode of transportation from your ArcGIS Online Org"},time_zone_usage_for_time_fields:{display:!0,inputType:"select",labelText:"Time Zone Usage for Time Fields",value:"GEO_LOCAL",domain:[{text:"Local Time",value:"GEO_LOCAL"},{text:"UTC (GMT + 0:00)",value:"UTC"}],tooltip:"Specify the time zone for the input date-time fields"},impedance:{display:!1,inputType:"select",labelText:"Impedance",value:"Truck Time",domain:[{text:"Truck Time",value:"Truck Time"},{text:"Drive Time",value:"Drive Time"},{text:"Walk Time",value:"Walk Time"}],tooltip:"Impedance for the route. If travel mode is set, this value is overridden. See REST API docs"},time_units:{display:!0,inputType:"select",labelText:"Time Units",value:"Minutes",domain:[{text:"Seconds",value:"Seconds"},{text:"Minutes",value:"Minutes"},{text:"Hours",value:"Hours"},{text:"Days",value:"Days"}],tooltip:"Specify the time units for all time based attribute values"},distance_units:{display:!0,inputType:"select",labelText:"Distance Units",value:"Kilometers",domain:[{text:"Miles",value:"Miles"},{text:"Kilometers",value:"Kilometers"},{text:"Feet",value:"Feet"},{text:"Yards",value:"Yards"},{text:"Meters",value:"Meters"},{text:"Nautical Miles",value:"Nautical Miles"}],tooltip:"Specify the distance units for all distance based attribute values"},uturn_policy:{display:!1,inputType:"select",labelText:"U-Turn Policy",value:"ALLOW_UTURNS",domain:[{text:"Allow U-turns",value:"ALLOW_UTURNS"},{text:"Allow at dead ends and intersections only",value:"ALLOW_DEAD_ENDS_AND_INTERSECTIONS_ONLY"},{text:"Allow at dead ends only",value:"ALLOW_DEAD_ENDS_ONLY"},{text:"Do not allow U-turns",value:"NO_UTURNS"}],tooltip:"Restrict the use of U-turns. If travel modes are set, this value is overridden. See REST API docs."},time_window_factor:{display:!0,inputType:"select",labelText:"Time Window Factor",value:"Medium",domain:[{text:"Low",value:"Low"},{text:"Medium",value:"Medium"},{text:"High",value:"High"}],tooltip:"Rate the importance of honoring time windows without causing violations"},spatially_cluster_routes:{display:!0,inputType:"select",labelText:"Spatially Cluster Routes",value:"true",domain:[{text:"True",value:"true"},{text:"False",value:"false"}],tooltip:"Specify is orders assigned to an individual route are spatially clustered"},route_zones:{display:!0,inputType:"text",labelText:"Route Zones",value:"",tooltip:"Enter URL to REST query to specify areas that delineate work territories for given routes"},route_renewals:{display:!0,inputType:"text",labelText:"Route Renewals",value:"",tooltip:"Enter URL to REST query to specify intermidate depots that routes can visit to reload cargo"}};i["a"].use($["a"]);var V={requiredParam:G,optionalParam:z,jobId:null,jobHistory:null,jobStatus:null,messages:[],geocodeReq:null,geocodeModal:!1};console.log(V);var Y=g["c"].mutations(V),Q=new $["a"].Store({plugins:[g["a"].plugin],state:V,mutations:Y,getters:{orderLen:function(e){return console.log(e),Object.keys(e.requiredParam.Order).length},depotLen:function(e){return Object.keys(e.requiredParam.Depot).length},routeLen:function(e){return Object.keys(e.requiredParam.Route).length}},actions:{setProcessJob:function(e,t){var a=e.commit,i=e.dispatch,r=e.state;a("SET_JOB_STATUS","processing"),t.then(function(e){console.log(e);var t=e.messages.filter(function(e){var t=r.messages;return t.push(e.description),a("SET_MESSAGES",t),e.description.includes("030088")||e.description.includes("030092")});"job-succeeded"==e.jobStatus&&0==t.length?(a("SET_JOB_STATUS","success"),a("SET_JOB_ID",e.jobId),i("setJobHistory",e.jobId)):("job-failed"==e.jobStatus||t.length>0)&&a("SET_JOB_STATUS","failed")})},setJobHistory:function(e,t){var a=e.commit,i=e.state,r=localStorage.getItem("jobhistory");if(r){var n=JSON.parse(r);for(var l in t&&n&&(n[t]={date:Date(),requiredParam:i.requiredParam,optionalParam:i.optionalParam}),n)(new Date).getTime()-new Date(n[l]["date"]).getTime()>=864e5&&delete n[l];r=n}else r=t?Object(F["a"])({},t,{date:Date(),requiredParam:i.requiredParam,optionalParam:i.optionalParam}):null;localStorage.setItem("jobhistory",JSON.stringify(r)),a("SET_JOB_HISTORY",r)},setNewJob:function(e,t){var a=e.commit,i=t.job,r=t.info;a("SET_JOB_ID",i),a("SET_REQUIRED_PARAM",r.requiredParam),a("SET_OPTIONAL_PARAM",r.optionalParam)},setClear:function(e){var t=e.commit;t("SET_REQUIRED_PARAM",JSON.parse(JSON.stringify(G))),t("SET_OPTIONAL_PARAM",JSON.parse(JSON.stringify(z)))}}});i["a"].use(B["a"]),i["a"].config.productionTip=!0,H.beforeEach(function(e,t,a){document.title="VRP - ".concat(e.name),a()}),new i["a"]({router:H,store:Q,render:function(e){return e(j)}}).$mount("#app")},"64a9":function(e,t,a){},"897e":function(e,t,a){},a0d6:function(e,t,a){},a624:function(e,t,a){},caef:function(e,t,a){"use strict";var i=a("a624"),r=a.n(i);r.a},cf05:function(e,t,a){e.exports=a.p+"img/logo.82b9c7a5.png"},d6a5:function(e,t,a){"use strict";var i=a("a0d6"),r=a.n(i);r.a}});
//# sourceMappingURL=app.002d2974.js.map