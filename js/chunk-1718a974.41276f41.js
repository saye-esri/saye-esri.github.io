(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1718a974"],{"02f4":function(e,t,r){var i=r("4588"),n=r("be13");e.exports=function(e){return function(t,r){var s,a,o=String(n(t)),u=i(r),l=o.length;return u<0||u>=l?e?"":void 0:(s=o.charCodeAt(u),s<55296||s>56319||u+1===l||(a=o.charCodeAt(u+1))<56320||a>57343?e?o.charAt(u):s:e?o.slice(u,u+2):a-56320+(s-55296<<10)+65536)}}},"0a49":function(e,t,r){var i=r("9b43"),n=r("626a"),s=r("4bf8"),a=r("9def"),o=r("cd1c");e.exports=function(e,t){var r=1==e,u=2==e,l=3==e,c=4==e,d=6==e,f=5==e||d,h=t||o;return function(t,o,p){for(var m,g,v=s(t),y=n(v),b=i(o,p,3),_=a(y.length),w=0,k=r?h(t,_):u?h(t,0):void 0;_>w;w++)if((f||w in y)&&(m=y[w],g=b(m,w,v),e))if(r)k[w]=g;else if(g)switch(e){case 3:return!0;case 5:return m;case 6:return w;case 2:k.push(m)}else if(c)return!1;return d?-1:l||c?c:k}}},1169:function(e,t,r){var i=r("2d95");e.exports=Array.isArray||function(e){return"Array"==i(e)}},"11e9":function(e,t,r){var i=r("52a7"),n=r("4630"),s=r("6821"),a=r("6a99"),o=r("69a8"),u=r("c69a"),l=Object.getOwnPropertyDescriptor;t.f=r("9e1e")?l:function(e,t){if(e=s(e),t=a(t,!0),u)try{return l(e,t)}catch(r){}if(o(e,t))return n(!i.f.call(e,t),e[t])}},"2f21":function(e,t,r){"use strict";var i=r("79e5");e.exports=function(e,t){return!!e&&i(function(){t?e.call(null,function(){},1):e.call(null)})}},"308d":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("transition",{attrs:{name:"fade"}},[r("div",{attrs:{id:"AppMap"}},[r("div",{attrs:{id:"mainview"}},[r("b-modal",{attrs:{centered:"",title:e.assign.route,size:"lg"},model:{value:e.assign.display,callback:function(t){e.$set(e.assign,"display",t)},expression:"assign.display"}},[r("b-form",[r("div",{staticClass:"d-flex flex-wrap justify-content-center"},[r("div",{staticClass:"form-group mr-4"},[r("label",[e._v("Assignment Type")]),r("b-form-select",{staticClass:"form-control",attrs:{options:e.assign.types},model:{value:e.assign.selectedType,callback:function(t){e.$set(e.assign,"selectedType",t)},expression:"assign.selectedType"}})],1),r("div",{staticClass:"form-group mr-4"},[r("label",[e._v("Assign to")]),r("b-form-select",{staticClass:"form-control",attrs:{options:e.assign.workers},model:{value:e.assign.selectedWorker,callback:function(t){e.$set(e.assign,"selectedWorker",t)},expression:"assign.selectedWorker"}})],1),r("div",{staticClass:"form-group mr-4"},[r("label",[e._v("Priority")]),r("b-form-select",{staticClass:"form-control",model:{value:e.assign.selectedPriority,callback:function(t){e.$set(e.assign,"selectedPriority",t)},expression:"assign.selectedPriority"}},[r("option",{attrs:{value:"0"}},[e._v("None")]),r("option",{attrs:{value:"1"}},[e._v("Low")]),r("option",{attrs:{value:"2"}},[e._v("Medium")]),r("option",{attrs:{value:"3"}},[e._v("High")]),r("option",{attrs:{value:"4"}},[e._v("Critical")])])],1),r("div",{staticClass:"form-group"},[r("label",[e._v("Description")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.assign.description,expression:"assign.description"}],staticClass:"form-control",attrs:{rows:"3",cols:"50"},domProps:{value:e.assign.description},on:{input:function(t){t.target.composing||e.$set(e.assign,"description",t.target.value)}}})])])]),r("b-btn",{attrs:{slot:"modal-footer",block:""},on:{click:e.assignRoute},slot:"modal-footer"},[e._v("Assign")])],1),r("UploadWidget",{ref:"uploadWidget",attrs:{portal:e.portal},on:{updateStatus:function(t){e.$emit("updateStatus",t)}}}),r("div",{attrs:{id:"viewDiv2"}})],1)])])},n=[],s=(r("7514"),r("c5f6"),r("55dd"),r("5df3"),r("ac6a"),r("3835")),a=(r("7f7f"),r("cadf"),r("551c"),r("097d"),r("afaa")),o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{directives:[{name:"show",rawName:"v-show",value:e.expand,expression:"expand"}],staticClass:"p-2",staticStyle:{"background-color":"white"}},[r("label",[e._v("Give this file a Name")]),r("span",{staticClass:"esri-icon esri-icon-close close",on:{click:function(t){e.expand=!1}}}),r("b-input",{model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),r("b-form-checkbox",{model:{value:e.uploadForm,callback:function(t){e.uploadForm=t},expression:"uploadForm"}},[e._v("Upload form data")]),r("br"),r("b-form-checkbox",{model:{value:e.uploadResult,callback:function(t){e.uploadResult=t},expression:"uploadResult"}},[e._v("Upload result data")]),r("br"),r("b-button",{on:{click:e.upload}},[e._v("Upload")])],1),r("div",{directives:[{name:"show",rawName:"v-show",value:!e.expand,expression:"!expand"}],staticClass:"esri-widget--button esri-widget esri-interactive resize",attrs:{role:"button",title:"Upload to ArcGIS Online"},on:{click:function(t){e.expand=!0}}},[r("span",{staticClass:"esri-icon esri-icon-applications",attrs:{"aria-hidden":"true",role:"presentation"}})])])},u=[],l=(r("369b"),r("7ffd")),c={props:{portal:Object},computed:{jobId:Object(l["b"])("jobId"),jobState:Object(l["b"])("jobStatus")},data:function(){return{expand:!1,title:"",uploadForm:!1,uploadResult:!0}},created:function(){console.log(this.portal),this.esriRequest=a["loadModules"](["esri/request"])},methods:{publish:function(e){var t=this;this.esriRequest.then(function(r){var i=Object(s["a"])(r,1),n=i[0];n("https://www.arcgis.com/sharing/rest/content/users/".concat(t.portal.user.username,"/publish"),{method:"post",query:{itemID:e.data.id,overwrite:!0,fileType:"fileGeodatabase",publishParameters:JSON.stringify({name:t.title}),f:"json"}}).then(function(e){console.log(e),t.$store.set("jobStatus","success")},function(e){console.log(e),t.$store.set("jobStatus","failed"),t.$store.set("messages",e.details.messages),t.$emit("updateStatus",{status:"failed",messages:e.details.messages})})})},addItem:function(e){var t=this;console.log("test"),this.esriRequest.then(function(r){var i=Object(s["a"])(r,1),n=i[0];n("".concat(t.portal.user.userContentUrl,"/addItem"),{method:"post",query:{dataUrl:e.value.url,title:t.title,overwrite:!0,type:"File Geodatabase",f:"json"}}).then(function(e){console.log("got here");var r=t;setTimeout(function(){r.publish(e)},1e3)})})},upload:function(){var e=this;this.expand=!1,this.esriRequest.then(function(t){var r=Object(s["a"])(t,1);r[0];(e.uploadResult||e.uploadForm)&&e.$store.set("jobStatus","processing"),e.uploadResult&&(console.log("hi"),a["loadModules"](["esri/tasks/Geoprocessor"]).then(function(t){var r=Object(s["a"])(t,1),i=r[0];new i("https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem").getResultData(e.jobId,"out_route_data",{responseType:"json"}).then(function(t){if(console.log(t),t.value){var r=e;setTimeout(function(){r.addItem(t)},1e3)}else e.$emit("updateStatus",{status:"failed",messages:["Geoprocessing service did not save data"]})})}))})}}},d=c,f=(r("ea4d"),r("2877")),h=Object(f["a"])(d,o,u,!1,null,null,null);h.options.__file="UploadWidget.vue";var p=h.exports,m={name:"appMap",components:{UploadWidget:p},computed:{jobId:Object(l["b"])("jobId")},data:function(){return{map:null,portal:null,routes:[],stopGeo:null,stops:null,jobLayerName:["Stops","Depots"],assign:{display:!1,route:"",workers:[],types:[],selectedWorker:"",selectedType:"",selectedPriority:"",description:"",url:""}}},created:function(){this.modules=a["loadModules"](["esri/Map","esri/views/MapView","esri/Graphic","esri/tasks/Geoprocessor","esri/layers/FeatureLayer","esri/layers/support/Field","esri/widgets/LayerList","esri/portal/Portal","esri/layers/MapImageLayer","esri/geometry/projection","esri/geometry/Point"]),this.jobId&&(this.loadStops(),this.loadRoutes())},watch:{jobId:function(){var e=this;if(this.jobId){console.log("update");var t=this.map.layers.items.filter(function(t){return e.jobLayerName.indexOf(t.title)>-1});this.map.removeMany(t),this.jobLayerName=["Stops","Depots"],this.loadRoutes(),this.loadStops()}}},methods:{update:function(){},getRand:function(){return Math.floor(256*Math.random())},addGeometry:function(e,t,r){console.log(e,t,r);for(var i=0;i<r.value.features.length;i++){for(var n=0;n<e.value.features.length;n++)r.value.features[i].attributes.Name==e.value.features[n].attributes.Name&&(r.value.features[i].geometry=e.value.features[n].geometry);for(var s=0;s<t.value.features.length;s++)r.value.features[i].attributes.Name==t.value.features[s].attributes.Name&&(r.value.features[i].geometry=t.value.features[s].geometry)}return r},makeTemplate:function(e){for(var t={title:"{Name}",content:[{type:"fields",fieldInfos:[]}]},r=0,i=e.fields.length;r<i;r++)"GlobalID"!==e.fields[r].alias&&t.content[0].fieldInfos.push({fieldName:e.fields[r].name,label:e.fields[r].alias,visible:!0});if("polyline"===e.geometryType){var n={title:"Assign Route",id:"assignRoute",className:"esri-icon-group"};t.actions=[n]}else if("Stops"===e.title){var s={title:"Change Route",id:"changeRoute",className:"esri-icon-directions"};t.actions=[s]}return e.popupTemplate=t,e},loadItem:function(e){var t=this;this.modules.then(function(r){var i=Object(s["a"])(r,10),n=(i[0],i[1],i[2],i[3],i[4]),a=(i[5],i[6],i[7],i[8],i[9],new n({portalItem:{id:e}}));a.load().then(function(){a.title.length>19&&(a.title=a.title.substring(0,17)+"..."),a=t.makeTemplate(a),t.map.add(a)})})},loadRoutes:function(){var e=this;this.modules.then(function(t){var r=Object(s["a"])(t,10),i=(r[0],r[1],r[2],r[3]),n=r[4],a=(r[5],r[6],r[7],r[8],r[9],new i("https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem"));a.getResultData(e.jobId,"out_routes").then(function(t){t.value.features.forEach(function(r){var i={type:"simple",symbol:{type:"simple-line",color:[e.getRand(),e.getRand(),e.getRand()],width:4}};console.log(i);var s=new n({source:[r],objectIdField:"ObjectID",fields:t.value.fields,geometryType:"polyline",renderer:i,title:r.attributes.Name});e.jobLayerName.push(r.attributes.Name),s=e.makeTemplate(s),e.routes.push(s),e.map.add(s,1)})},function(e){console.log(e)})})},loadStops:function(){var e=this;this.modules.then(function(t){var r=Object(s["a"])(t,10),i=(r[0],r[1],r[2],r[3]),n=r[4],a=(r[5],r[6],r[7],r[8],r[9],new i("https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem")),o=a.getResultData(e.jobId,"out_stops"),u=a.getResultData(e.jobId,"orders",{url:"https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/".concat(e.jobId,"/inputs/orders")}),l=a.getResultData(e.jobId,"depots",{url:"https://logistics.arcgis.com/arcgis/rest/services/World/VehicleRoutingProblem/GPServer/SolveVehicleRoutingProblem/jobs/".concat(e.jobId,"/inputs/depots")});Promise.all([u,l,o]).then(function(t){console.log(t,"hi");var r=e.addGeometry(t[0],t[1],t[2]);e.stopGeo=r,console.log(r);var i={type:"unique-value",field:"StopType",defaultSymbol:{type:"simple-marker",color:[240,240,20],size:"8px"},uniqueValueInfos:[{value:"0",symbol:{type:"simple-marker",color:[240,20,20],size:"8px"}}]},s=new n({source:r.value.features,objectIdField:"ObjectID",fields:r.value.fields,geometryType:"point",renderer:i,title:"Stops"});s=e.makeTemplate(s),e.stops=s,e.map.add(s,2),s.when(function(){s.queryExtent().then(function(t){console.log(t),e.mapView.goTo(t.extent.expand(2)),console.log(e.mapView.extent.width),console.log(e.mapView.extent.width)})})})})},assignRoute:function(){var e=this;this.$emit("updateStatus",{status:"processing"}),this.assign.display=!1,this.modules.then(function(t){var r=Object(s["a"])(t,11),i=(r[0],r[1],r[2],r[3],r[4]),n=(r[5],r[6],r[7],r[8],r[9]),o=r[10],u=e.stopGeo.value.features.filter(function(t){return t.attributes.RouteName===e.assign.route&&0===t.attributes.StopType});u.sort(function(e,t){return e.attributes.Sequence-t.attributes.Sequence}),e.portal.queryItems({query:"title:dispatchers_ AND access:shared AND type:Feature Service"}).then(function(t){var r=new i({portalItem:t.results[0]});r.load().then(function(){var t=r.createQuery();t.outFields=["OBJECTID"],t.where="userId = '".concat(e.portal.user.username,"'"),r.queryFeatures(t).then(function(t){n.load().then(function(){var r=u.map(function(r){console.log("starting point",r.geometry.y,r.geometry.x);var i=new o({latitude:r.geometry.y,longitude:r.geometry.x,spatialReference:{wkid:4326}});console.log("starting project",i);var s=n.project(i,{wkid:102100});return console.log("returning"),{geometry:{x:s.x,y:s.y},attributes:{status:1,assignmentType:Number(e.assign.selectedType),location:r.attributes.Name,assignmentRead:0,dispatcherId:t.features[0].attributes.OBJECTID,description:e.assign.description,priority:Number(e.assign.selectedPriority),workerId:Number(e.assign.selectedWorker),assignedDate:(new Date).getTime()}}});a["loadModules"](["esri/request"]).then(function(t){var i=Object(s["a"])(t,1),n=i[0];n(e.assign.url,{method:"post",query:{f:"json",features:JSON.stringify(r)}}).then(function(t){console.log(t),e.$emit("updateStatus",{status:"success"})},function(t){console.log(t),console.log(t.details.messages),e.$emit("updateStatus",{status:"failed",messages:t.details.messages})})})})})})})})}},mounted:function(){var e=this;this.modules.then(function(t){var r=Object(s["a"])(t,11),i=r[0],n=r[1],a=(r[2],r[3],r[4]),o=(r[5],r[6]),u=r[7],l=r[8];r[9],r[10];e.map=new i({basemap:"streets-navigation-vector"}),e.mapView=new n({map:e.map,container:"viewDiv2",center:[-79.3854,43.64869],zoom:10});var c=new o({view:e.mapView,listItemCreatedFunction:function(t){var r=t.item;e.jobLayerName.indexOf(r.title)>-1||"Live Traffic"==r.title||(r.actionsSections=[[{title:"Remove",className:"esri-icon-trash",id:"remove"}]])}});c.on("trigger-action",function(t){"remove"===t.action.id&&e.map.remove(t.item.layer)}),e.mapView.ui.add(c,{position:"top-right"}),e.mapView.ui.add(e.$refs.uploadWidget.$el,"top-left"),e.mapView.popup.on("trigger-action",function(t){"assignRoute"===t.action.id&&(e.assign.display=!0,e.assign.route=t.target.title)}),e.portal=new u({authMode:"immediate"}),e.portal.load().then(function(){console.log("hi");var t=new l({portalItem:{id:"ff11eb5b930b4fabba15c47feb130de4"},visible:!1,title:"Live Traffic"});e.map.add(t,0),e.portal.queryItems({query:"title:workers_ AND access:shared AND type:Feature Service"}).then(function(t){var r=new a({portalItem:t.results[0]}),i=r.createQuery();i.outFields=["Name","OBJECTID"],r.queryFeatures(i).then(function(t){t.features.forEach(function(t){e.assign.workers.push({value:t.attributes.OBJECTID,text:t.attributes.name})})})}),e.portal.queryItems({query:"title:assignments_ AND access:shared AND type:Feature Service"}).then(function(t){e.assign.url=t.results[0].url+"/0/addFeatures";var r=new a({portalItem:t.results[0]});r.load(),r.when(function(){var t=r.fields.find(function(e){return"assignmentType"===e.name});t.domain.codedValues.forEach(function(t){e.assign.types.push({value:t.code,text:t.name})})})})})})}},g=m,v=(r("eb25"),Object(f["a"])(g,i,n,!1,null,null,null));v.options.__file="AppMap.vue";t["default"]=v.exports},3280:function(e,t,r){},"369b":function(e,t,r){var i,n,s;
/* @license
Papa Parse
v4.6.2
https://github.com/mholt/PapaParse
License: MIT
*/Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),function(r,a){n=[],i=a,s="function"===typeof i?i.apply(t,n):i,void 0===s||(e.exports=s)}(0,function(){"use strict";var e,t,r="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==r?r:{},i=!r.document&&!!r.postMessage,n=i&&/(\?|&)papaworker(=|&|$)/.test(r.location.search),s=!1,a={},o=0,u={parse:function(t,i){var n=(i=i||{}).dynamicTyping||!1;if(S(n)&&(i.dynamicTypingFunction=n,n={}),i.dynamicTyping=n,i.transform=!!S(i.transform)&&i.transform,i.worker&&u.WORKERS_SUPPORTED){var l=function(){if(!u.WORKERS_SUPPORTED)return!1;if(!s&&null===u.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var t=u.SCRIPT_PATH||e;t+=(-1!==t.indexOf("?")?"&":"?")+"papaworker";var i=new r.Worker(t);return i.onmessage=y,i.id=o++,a[i.id]=i}();return l.userStep=i.step,l.userChunk=i.chunk,l.userComplete=i.complete,l.userError=i.error,i.step=S(i.step),i.chunk=S(i.chunk),i.complete=S(i.complete),i.error=S(i.error),delete i.worker,void l.postMessage({input:t,config:i,workerId:l.id})}var c=null;return u.NODE_STREAM_INPUT,"string"==typeof t?c=i.download?new d(i):new h(i):!0===t.readable&&S(t.read)&&S(t.on)?c=new p(i):(r.File&&t instanceof File||t instanceof Object)&&(c=new f(i)),c.stream(t)},unparse:function(e,t){var r=!1,i=!0,n=",",s="\r\n",a='"',o=!1;!function(){"object"==typeof t&&("string"!=typeof t.delimiter||u.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e)}).length||(n=t.delimiter),("boolean"==typeof t.quotes||Array.isArray(t.quotes))&&(r=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(o=t.skipEmptyLines),"string"==typeof t.newline&&(s=t.newline),"string"==typeof t.quoteChar&&(a=t.quoteChar),"boolean"==typeof t.header&&(i=t.header))}();var l=new RegExp(a,"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return d(null,e,o);if("object"==typeof e[0])return d(c(e[0]),e,o)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:c(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),d(e.fields||[],e.data||[],o);throw"exception: Unable to serialize unrecognized input";function c(e){if("object"!=typeof e)return[];var t=[];for(var r in e)t.push(r);return t}function d(e,t,r){var a="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var o=Array.isArray(e)&&0<e.length,u=!Array.isArray(t[0]);if(o&&i){for(var l=0;l<e.length;l++)0<l&&(a+=n),a+=f(e[l],l);0<t.length&&(a+=s)}for(var c=0;c<t.length;c++){var d=o?e.length:t[c].length,h=!1,p=o?0===Object.keys(t[c]).length:0===t[c].length;if(r&&!o&&(h="greedy"===r?""===t[c].join("").trim():1===t[c].length&&0===t[c][0].length),"greedy"===r&&o){for(var m=[],g=0;g<d;g++){var v=u?e[g]:g;m.push(t[c][v])}h=""===m.join("").trim()}if(!h){for(var y=0;y<d;y++){0<y&&!p&&(a+=n);var b=o&&u?e[y]:y;a+=f(t[c][b],y)}c<t.length-1&&(!r||0<d&&!p)&&(a+=s)}}return a}function f(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);e=e.toString().replace(l,a+a);var i="boolean"==typeof r&&r||Array.isArray(r)&&r[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return!0;return!1}(e,u.BAD_DELIMITERS)||-1<e.indexOf(n)||" "===e.charAt(0)||" "===e.charAt(e.length-1);return i?a+e+a:e}}};if(u.RECORD_SEP=String.fromCharCode(30),u.UNIT_SEP=String.fromCharCode(31),u.BYTE_ORDER_MARK="\ufeff",u.BAD_DELIMITERS=["\r","\n",'"',u.BYTE_ORDER_MARK],u.WORKERS_SUPPORTED=!i&&!!r.Worker,u.SCRIPT_PATH=null,u.NODE_STREAM_INPUT=1,u.LocalChunkSize=10485760,u.RemoteChunkSize=5242880,u.DefaultDelimiter=",",u.Parser=v,u.ParserHandle=m,u.NetworkStreamer=d,u.FileStreamer=f,u.StringStreamer=h,u.ReadableStreamStreamer=p,r.jQuery){var l=r.jQuery;l.fn.parse=function(e){var t=e.config||{},i=[];return this.each(function(e){if("INPUT"!==l(this).prop("tagName").toUpperCase()||"file"!==l(this).attr("type").toLowerCase()||!r.FileReader||!this.files||0===this.files.length)return!0;for(var n=0;n<this.files.length;n++)i.push({file:this.files[n],inputElem:this,instanceConfig:l.extend({},t)})}),n(),this;function n(){if(0!==i.length){var t,r,n,a,o=i[0];if(S(e.before)){var c=e.before(o.file,o.inputElem);if("object"==typeof c){if("abort"===c.action)return t="AbortError",r=o.file,n=o.inputElem,a=c.reason,void(S(e.error)&&e.error({name:t},r,n,a));if("skip"===c.action)return void s();"object"==typeof c.config&&(o.instanceConfig=l.extend(o.instanceConfig,c.config))}else if("skip"===c)return void s()}var d=o.instanceConfig.complete;o.instanceConfig.complete=function(e){S(d)&&d(e,o.file,o.inputElem),s()},u.parse(o.file,o.instanceConfig)}else S(e.complete)&&e.complete()}function s(){i.splice(0,1),n()}}}function c(e){this._handle=null,this._finished=!1,this._completed=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new m(t),(this._handle.streamer=this)._config=t}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&S(this._config.beforeFirstChunk)){var i=this._config.beforeFirstChunk(e);void 0!==i&&(e=i)}this.isFirstChunk=!1;var s=this._partialLine+e;this._partialLine="";var a=this._handle.parse(s,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var o=a.meta.cursor;this._finished||(this._partialLine=s.substring(o-this._baseIndex),this._baseIndex=o),a&&a.data&&(this._rowCount+=a.data.length);var l=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(n)r.postMessage({results:a,workerId:u.WORKER_ID,finished:l});else if(S(this._config.chunk)&&!t){if(this._config.chunk(a,this._handle),this._handle.paused()||this._handle.aborted())return;a=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(a.data),this._completeResults.errors=this._completeResults.errors.concat(a.errors),this._completeResults.meta=a.meta),this._completed||!l||!S(this._config.complete)||a&&a.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),l||a&&a.meta.paused||this._nextChunk(),a}},this._sendError=function(e){S(this._config.error)?this._config.error(e):n&&this._config.error&&r.postMessage({workerId:u.WORKER_ID,error:e,finished:!1})}}function d(e){var t;(e=e||{}).chunkSize||(e.chunkSize=u.RemoteChunkSize),c.call(this,e),this._nextChunk=i?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),i||(t.onload=k(this._chunkLoaded,this),t.onerror=k(this._chunkError,this)),t.open("GET",this._input,!i),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var r in e)t.setRequestHeader(r,e[r])}if(this._config.chunkSize){var n=this._start+this._config.chunkSize-1;t.setRequestHeader("Range","bytes="+this._start+"-"+n),t.setRequestHeader("If-None-Match","webkit-no-cache")}try{t.send()}catch(e){this._chunkError(e.message)}i&&0===t.status?this._chunkError():this._start+=this._config.chunkSize}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substr(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var r=t.statusText||e;this._sendError(new Error(r))}}function f(e){var t,r;(e=e||{}).chunkSize||(e.chunkSize=u.LocalChunkSize),c.call(this,e);var i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?((t=new FileReader).onload=k(this._chunkLoaded,this),t.onerror=k(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding);i||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function h(e){var t;c.call(this,e=e||{}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,r=e?t.substr(0,e):t;return t=e?t.substr(e):"",this._finished=!t,this.parseChunk(r)}}}function p(e){c.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){c.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){c.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0},this._streamData=k(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=k(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=k(function(){this._streamCleanUp(),i=!0,this._streamData("")},this),this._streamCleanUp=k(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function m(e){var t,r,i,n=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,s=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,a=this,o=0,l=0,c=!1,d=!1,f=[],h={data:[],errors:[],meta:{}};if(S(e.step)){var p=e.step;e.step=function(t){if(h=t,b())y();else{if(y(),0===h.data.length)return;o+=t.data.length,e.preview&&o>e.preview?r.abort():p(h,a)}}}function m(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function y(){if(h&&i&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+u.DefaultDelimiter+"'"),i=!1),e.skipEmptyLines)for(var t=0;t<h.data.length;t++)m(h.data[t])&&h.data.splice(t--,1);return b()&&function(){if(h){for(var t=0;b()&&t<h.data.length;t++)for(var r=0;r<h.data[t].length;r++){var i=h.data[t][r];e.trimHeaders&&(i=i.trim()),f.push(i)}h.data.splice(0,1)}}(),function(){if(!h||!e.header&&!e.dynamicTyping&&!e.transform)return h;for(var t=0;t<h.data.length;t++){var r,i=e.header?{}:[];for(r=0;r<h.data[t].length;r++){var n=r,s=h.data[t][r];e.header&&(n=r>=f.length?"__parsed_extra":f[r]),e.transform&&(s=e.transform(s,n)),s=_(n,s),"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s}h.data[t]=i,e.header&&(r>f.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+f.length+" fields but parsed "+r,l+t):r<f.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+f.length+" fields but parsed "+r,l+t))}return e.header&&h.meta&&(h.meta.fields=f),l+=h.data.length,h}()}function b(){return e.header&&0===f.length}function _(t,r){return i=t,e.dynamicTypingFunction&&void 0===e.dynamicTyping[i]&&(e.dynamicTyping[i]=e.dynamicTypingFunction(i)),!0===(e.dynamicTyping[i]||e.dynamicTyping)?"true"===r||"TRUE"===r||"false"!==r&&"FALSE"!==r&&(n.test(r)?parseFloat(r):s.test(r)?new Date(r):""===r?null:r):r;var i}function k(e,t,r,i){h.errors.push({type:e,code:t,message:r,row:i})}this.parse=function(n,s,a){var o=e.quoteChar||'"';if(e.newline||(e.newline=function(e,t){e=e.substr(0,1048576);var r=new RegExp(g(t)+"([^]*?)"+g(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return"\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(n,o)),i=!1,e.delimiter)S(e.delimiter)&&(e.delimiter=e.delimiter(n),h.meta.delimiter=e.delimiter);else{var l=function(t,r,i,n){for(var s,a,o,l=[",","\t","|",";",u.RECORD_SEP,u.UNIT_SEP],c=0;c<l.length;c++){var d=l[c],f=0,h=0,p=0;o=void 0;for(var g=new v({comments:n,delimiter:d,newline:r,preview:10}).parse(t),y=0;y<g.data.length;y++)if(i&&m(g.data[y]))p++;else{var b=g.data[y].length;h+=b,void 0!==o?1<b&&(f+=Math.abs(b-o),o=b):o=b}0<g.data.length&&(h/=g.data.length-p),(void 0===a||f<a)&&1.99<h&&(a=f,s=d)}return{successful:!!(e.delimiter=s),bestDelimiter:s}}(n,e.newline,e.skipEmptyLines,e.comments);l.successful?e.delimiter=l.bestDelimiter:(i=!0,e.delimiter=u.DefaultDelimiter),h.meta.delimiter=e.delimiter}var d=w(e);return e.preview&&e.header&&d.preview++,t=n,r=new v(d),h=r.parse(t,s,a),y(),c?{meta:{paused:!0}}:h||{meta:{paused:!1}}},this.paused=function(){return c},this.pause=function(){c=!0,r.abort(),t=t.substr(r.getCharIndex())},this.resume=function(){c=!1,a.streamer.parseChunk(t,!0)},this.aborted=function(){return d},this.abort=function(){d=!0,r.abort(),h.meta.aborted=!0,S(e.complete)&&e.complete(h),t=""}}function g(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function v(e){var t,r=(e=e||{}).delimiter,i=e.newline,n=e.comments,s=e.step,a=e.preview,o=e.fastMode,l=t=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(l=e.escapeChar),("string"!=typeof r||-1<u.BAD_DELIMITERS.indexOf(r))&&(r=","),n===r)throw"Comment character same as delimiter";!0===n?n="#":("string"!=typeof n||-1<u.BAD_DELIMITERS.indexOf(n))&&(n=!1),"\n"!==i&&"\r"!==i&&"\r\n"!==i&&(i="\n");var c=0,d=!1;this.parse=function(e,u,f){if("string"!=typeof e)throw"Input must be a string";var h=e.length,p=r.length,m=i.length,g=n.length,v=S(s),y=[],b=[],_=[],w=c=0;if(!e)return P();if(o||!1!==o&&-1===e.indexOf(t)){for(var k=e.split(i),R=0;R<k.length;R++){if(_=k[R],c+=_.length,R!==k.length-1)c+=i.length;else if(f)return P();if(!n||_.substr(0,g)!==n){if(v){if(y=[],j(_.split(r)),F(),d)return P()}else j(_.split(r));if(a&&a<=R)return y=y.slice(0,a),P(!0)}}return P()}for(var I,E=e.indexOf(r,c),C=e.indexOf(i,c),x=new RegExp(l.replace(/[-[\]\/{}()*+?.\\^$|]/g,"\\$&")+t,"g");;)if(e[c]!==t)if(n&&0===_.length&&e.substr(c,g)===n){if(-1===C)return P();c=C+m,C=e.indexOf(i,c),E=e.indexOf(r,c)}else if(-1!==E&&(E<C||-1===C))_.push(e.substring(c,E)),c=E+p,E=e.indexOf(r,c);else{if(-1===C)break;if(_.push(e.substring(c,C)),D(C+m),v&&(F(),d))return P();if(a&&y.length>=a)return P(!0)}else for(I=c,c++;;){if(-1===(I=e.indexOf(t,I+1)))return f||b.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:y.length,index:c}),N();if(I===h-1)return N(e.substring(c,I).replace(x,t));if(t!==l||e[I+1]!==l){if(t===l||0===I||e[I-1]!==l){var O=A(-1===C?E:Math.min(E,C));if(e[I+1+O]===r){_.push(e.substring(c,I).replace(x,t)),c=I+1+O+p,E=e.indexOf(r,c),C=e.indexOf(i,c);break}var T=A(C);if(e.substr(I+1+T,m)===i){if(_.push(e.substring(c,I).replace(x,t)),D(I+1+T+m),E=e.indexOf(r,c),v&&(F(),d))return P();if(a&&y.length>=a)return P(!0);break}b.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:y.length,index:c}),I++}}else I++}return N();function j(e){y.push(e),w=c}function A(t){var r=0;if(-1!==t){var i=e.substring(I+1,t);i&&""===i.trim()&&(r=i.length)}return r}function N(t){return f||(void 0===t&&(t=e.substr(c)),_.push(t),c=h,j(_),v&&F()),P()}function D(t){c=t,j(_),_=[],C=e.indexOf(i,c)}function P(e){return{data:y,errors:b,meta:{delimiter:r,linebreak:i,aborted:d,truncated:!!e,cursor:w+(u||0)}}}function F(){s(P()),y=[],b=[]}},this.abort=function(){d=!0},this.getCharIndex=function(){return c}}function y(e){var t=e.data,r=a[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,b(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:_,resume:_};if(S(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:[t.results.data[s]],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results}else S(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results)}t.finished&&!i&&b(t.workerId,t.results)}function b(e,t){var r=a[e];S(r.userComplete)&&r.userComplete(t),r.terminate(),delete a[e]}function _(){throw"Not implemented."}function w(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=w(e[r]);return t}function k(e,t){return function(){e.apply(t,arguments)}}function S(e){return"function"==typeof e}return n?r.onmessage=function(e){var t=e.data;if(void 0===u.WORKER_ID&&t&&(u.WORKER_ID=t.workerId),"string"==typeof t.input)r.postMessage({workerId:u.WORKER_ID,results:u.parse(t.input,t.config),finished:!0});else if(r.File&&t.input instanceof File||t.input instanceof Object){var i=u.parse(t.input,t.config);i&&r.postMessage({workerId:u.WORKER_ID,results:i,finished:!0})}}:u.WORKERS_SUPPORTED&&(t=document.getElementsByTagName("script"),e=t.length?t[t.length-1].src:"",document.body?document.addEventListener("DOMContentLoaded",function(){s=!0},!0):s=!0),(d.prototype=Object.create(c.prototype)).constructor=d,(f.prototype=Object.create(c.prototype)).constructor=f,(h.prototype=Object.create(h.prototype)).constructor=h,(p.prototype=Object.create(c.prototype)).constructor=p,u})},"52a7":function(e,t){t.f={}.propertyIsEnumerable},"55dd":function(e,t,r){"use strict";var i=r("5ca1"),n=r("d8e8"),s=r("4bf8"),a=r("79e5"),o=[].sort,u=[1,2,3];i(i.P+i.F*(a(function(){u.sort(void 0)})||!a(function(){u.sort(null)})||!r("2f21")(o)),"Array",{sort:function(e){return void 0===e?o.call(s(this)):o.call(s(this),n(e))}})},"5dbc":function(e,t,r){var i=r("d3f4"),n=r("8b97").set;e.exports=function(e,t,r){var s,a=t.constructor;return a!==r&&"function"==typeof a&&(s=a.prototype)!==r.prototype&&i(s)&&n&&n(e,s),e}},"5df3":function(e,t,r){"use strict";var i=r("02f4")(!0);r("01f9")(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,r=this._i;return r>=t.length?{value:void 0,done:!0}:(e=i(t,r),this._i+=e.length,{value:e,done:!1})})},7514:function(e,t,r){"use strict";var i=r("5ca1"),n=r("0a49")(5),s="find",a=!0;s in[]&&Array(1)[s](function(){a=!1}),i(i.P+i.F*a,"Array",{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),r("9c6c")(s)},"8b97":function(e,t,r){var i=r("d3f4"),n=r("cb7c"),s=function(e,t){if(n(e),!i(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,i){try{i=r("9b43")(Function.call,r("11e9").f(Object.prototype,"__proto__").set,2),i(e,[]),t=!(e instanceof Array)}catch(n){t=!0}return function(e,r){return s(e,r),t?e.__proto__=r:i(e,r),e}}({},!1):void 0),check:s}},9093:function(e,t,r){var i=r("ce10"),n=r("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return i(e,n)}},aa77:function(e,t,r){var i=r("5ca1"),n=r("be13"),s=r("79e5"),a=r("fdef"),o="["+a+"]",u="​",l=RegExp("^"+o+o+"*"),c=RegExp(o+o+"*$"),d=function(e,t,r){var n={},o=s(function(){return!!a[e]()||u[e]()!=u}),l=n[e]=o?t(f):a[e];r&&(n[r]=l),i(i.P+i.F*o,"String",n)},f=d.trim=function(e,t){return e=String(n(e)),1&t&&(e=e.replace(l,"")),2&t&&(e=e.replace(c,"")),e};e.exports=d},c5f6:function(e,t,r){"use strict";var i=r("7726"),n=r("69a8"),s=r("2d95"),a=r("5dbc"),o=r("6a99"),u=r("79e5"),l=r("9093").f,c=r("11e9").f,d=r("86cc").f,f=r("aa77").trim,h="Number",p=i[h],m=p,g=p.prototype,v=s(r("2aeb")(g))==h,y="trim"in String.prototype,b=function(e){var t=o(e,!1);if("string"==typeof t&&t.length>2){t=y?t.trim():f(t,3);var r,i,n,s=t.charCodeAt(0);if(43===s||45===s){if(r=t.charCodeAt(2),88===r||120===r)return NaN}else if(48===s){switch(t.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+t}for(var a,u=t.slice(2),l=0,c=u.length;l<c;l++)if(a=u.charCodeAt(l),a<48||a>n)return NaN;return parseInt(u,i)}}return+t};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(e){var t=arguments.length<1?0:e,r=this;return r instanceof p&&(v?u(function(){g.valueOf.call(r)}):s(r)!=h)?a(new m(b(t)),r,p):b(t)};for(var _,w=r("9e1e")?l(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;w.length>k;k++)n(m,_=w[k])&&!n(p,_)&&d(p,_,c(m,_));p.prototype=g,g.constructor=p,r("2aba")(i,h,p)}},cd1c:function(e,t,r){var i=r("e853");e.exports=function(e,t){return new(i(e))(t)}},deb9:function(e,t,r){},e853:function(e,t,r){var i=r("d3f4"),n=r("1169"),s=r("2b4c")("species");e.exports=function(e){var t;return n(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!n(t.prototype)||(t=void 0),i(t)&&(t=t[s],null===t&&(t=void 0))),void 0===t?Array:t}},ea4d:function(e,t,r){"use strict";var i=r("3280"),n=r.n(i);n.a},eb25:function(e,t,r){"use strict";var i=r("deb9"),n=r.n(i);n.a},fdef:function(e,t){e.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-1718a974.41276f41.js.map