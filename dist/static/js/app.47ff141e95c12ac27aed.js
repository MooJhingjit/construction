webpackJsonp([32],{"3htv":function(e,t,n){"use strict";var a=n("mvHQ"),i=n.n(a),r=n("kVPM");t.a={SET_STORAGEITEM:function(e,t){return localStorage.setItem(e,i()(t)),!0},GET_STORAGEITEM:function(e){var t=null;return localStorage.getItem(e)&&(t=localStorage.getItem(e)),t},REMOVE_STORAGEITEM:function(e){return localStorage.removeItem(e)},GET_FULLAPI:function(e,t){var n="",a=r.a.api.apiEndPoint;return void 0!==t&&null!==t&&(n="?"+t),a.concat(e)+n},GET_DATETHAI:function(e){var t=new Date;return"now"!==e&&(t=new Date(e)),t.getDate()+" "+["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"][t.getMonth()]+" "+(t.getFullYear()+543)}}},"4MLP":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),i=n("Dd8w"),r=n.n(i),o={props:{isActive:{type:Boolean,required:!0},isDisableMenu:{type:Boolean,required:!0}},components:{},name:"OptionsSubmenu",data:function(){return{property:"Blank"}},computed:{},created:function(){},mounted:function(){},updated:function(){},destroyed:function(){},methods:{goToPage:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};this.GOTOPAGE(e,t)}}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"sub-menu-panel box-shadow-panel options-block":!0,active:e.isActive&&!e.isDisableMenu}},[n("div",{staticClass:"container-block"},[n("div",{staticClass:"block container-block is-mobile-only",on:{click:function(t){e.goToPage("Home")}}},[e._m(0),e._v(" "),n("div",{staticClass:"desc"},[e._v("หน้าหลัก")])]),e._v(" "),n("div",{staticClass:"block container-block is-mobile-only",on:{click:function(t){e.goToPage("Ordering")}}},[e._m(1),e._v(" "),n("div",{staticClass:"desc"},[e._v("สั่งซื้อ")]),e._v(" "),n("span",{staticClass:"tag is-danger is-rounded"},[e._v("1")])]),e._v(" "),n("div",{staticClass:"block container-block is-mobile-only",on:{click:function(t){e.goToPage("xxxxxx")}}},[e._m(2),e._v(" "),n("div",{staticClass:"desc"},[e._v("จ่ายค่างวด")])]),e._v(" "),n("div",{staticClass:"block container-block is-mobile-only",on:{click:function(t){e.goToPage("Authority","all")}}},[e._m(3),e._v(" "),n("div",{staticClass:"desc"},[e._v("ข้อมูลสูญเสีย")])]),e._v(" "),n("div",{staticClass:"block container-block",on:{click:function(t){e.GOTOPAGE("House")}}},[e._m(4),e._v(" "),n("div",{staticClass:"desc"},[e._v("แบบบ้าน")])]),e._v(" "),n("div",{staticClass:"block container-block",on:{click:function(t){e.goToPage("Workorder","")}}},[e._m(5),e._v(" "),n("div",{staticClass:"desc"},[e._v("ลำดับการทำงาน")])]),e._v(" "),n("div",{staticClass:"block container-block",on:{click:function(t){e.GOTOPAGE("Store")}}},[e._m(6),e._v(" "),n("div",{staticClass:"desc"},[e._v("ร้านค้า")])]),e._v(" "),n("div",{staticClass:"block container-block",on:{click:function(t){e.GOTOPAGE("OrderingGroup")}}},[e._m(7),e._v(" "),n("div",{staticClass:"desc"},[e._v("กลุ่มวัสดุ")])]),e._v(" "),n("div",{staticClass:"block container-block",on:{click:function(t){e.goToPage("Users","")}}},[e._m(8),e._v(" "),n("div",{staticClass:"desc"},[e._v("ผู้ใช้งาน")])])])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-home",attrs:{"aria-hidden":"true"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-object-group",attrs:{"aria-hidden":"true"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-th-large",attrs:{"aria-hidden":"true"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-check-square-o",attrs:{"aria-hidden":"true"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-home",attrs:{"aria-hidden":"true"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-tasks",attrs:{"aria-hidden":"true"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-th-large",attrs:{"aria-hidden":"true"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-th-large",attrs:{"aria-hidden":"true"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon"},[t("i",{staticClass:"fa fa-address-book-o",attrs:{"aria-hidden":"true"}})])}]};var c=n("VU/8")(o,s,!1,function(e){n("XmWB")},null,null).exports,u={props:{isActive:{type:Boolean,required:!0},isDisableMenu:{type:Boolean,required:!0}},components:{},name:"ProfileSubmenu",data:function(){return{}},created:function(){},methods:{doLogout:function(){this.LOGOUT()}}},l={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"sub-menu-panel profile-block  box-shadow-panel":!0,active:e.isActive&&!e.isDisableMenu}},[n("div",{staticClass:"container-block"},[n("div",{staticClass:"profile-body container-block block"},[n("div",{staticClass:"name"},[e._v(e._s(e.USER.name))]),e._v(" "),n("div",{staticClass:"options container-block"},[n("div",{staticClass:"block",on:{click:function(t){e.GOTOPAGE("Profile","my-profile")}}},[n("i",{staticClass:"fa fa-user-circle-o",attrs:{"aria-hidden":"true"}}),e._v(" ข้อมูลผู้ใช้")]),e._v(" "),n("div",{staticClass:"block",on:{click:function(t){e.doLogout()}}},[n("i",{staticClass:"fa fa-power-off",attrs:{"aria-hidden":"true"}}),e._v(" ออกจากระบบ")])])])])])},staticRenderFns:[]};var d=n("VU/8")(u,l,!1,function(e){n("UN4h")},null,null).exports,m=n("NYxO"),p={components:{OptionsMenu:c,ProfileMenu:d},name:"MenuBar",props:{isDisableMenu:{type:Boolean,required:!0}},computed:r()({normalOrdering:function(){if(null!==this.orderingData)return this.orderingData.normal},extraOrdering:function(){if(null!==this.orderingData)return this.orderingData.extra}},Object(m.c)(["orderingData"])),data:function(){return{local:{options:{isActive:!1},profile:{isActive:!1}}}},methods:{openSubMenu:function(e,t){this.local[e].isActive=!0,this.local[t].isActive=!1,this.$emit("setMenuStatus",!1)}},watch:{}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{staticClass:"level is-mobile nav-menu"},[n("div",{staticClass:"level-item has-text-centered"},[n("router-link",{attrs:{to:{name:"Home"}}},[e._v("หน้าหลัก")])],1),e._v(" "),e.IS_ADMIN()||e.IS_PURCHASING()?n("div",{staticClass:"level-item has-text-centered"},[n("router-link",{attrs:{to:{name:"Ordering"}}},[e._v("การสั่งซื้อ\n      "),e.normalOrdering?n("span",{staticClass:"tag is-warning is-rounded"},[e._v(e._s(e.normalOrdering))]):e._e(),e._v(" "),e.extraOrdering?n("span",{staticClass:"tag is-danger is-rounded"},[e._v(e._s(e.extraOrdering))]):e._e()])],1):e._e(),e._v(" "),e.IS_ADMIN()||e.IS_PURCHASING()?n("div",{staticClass:"level-item has-text-centered"},[n("router-link",{attrs:{to:{name:"PayingPeriod"}}},[e._v("จ่ายค่างวด")])],1):e._e(),e._v(" "),e.IS_ADMIN()||e.IS_PURCHASING()?n("div",{staticClass:"level-item has-text-centered"},[n("router-link",{attrs:{to:{name:"Losing"}}},[e._v("ข้อมูลสูญเสีย")])],1):e._e(),e._v(" "),n("div",{staticClass:"level-item has-text-centered project-name on-mobile"},[n("router-link",{attrs:{to:{name:"Home"}}},[e._v("โชคชนายุทธ")])],1),e._v(" "),n("div",{staticClass:"level-item has-text-centered options-panel on-mobile"},[e.IS_ADMIN()||e.IS_PURCHASING()?n("div",{staticClass:"block alert"},[e.normalOrdering||e.extraOrdering?n("i",{staticClass:"fa fa-exclamation-circle",attrs:{"aria-hidden":"true"}}):e._e(),e._v(" "),n("div",{staticClass:"icon-menu",on:{click:function(t){e.openSubMenu("options","profile")}}},[n("i",{staticClass:"fa fa-th",attrs:{"aria-hidden":"true"}})])]):e._e(),e._v(" "),n("div",{staticClass:"block"},[n("figure",{staticClass:"image icon-menu",on:{click:function(t){e.openSubMenu("profile","options")}}},[n("i",{staticClass:"fa fa-user",attrs:{"aria-hidden":"true"}})])]),e._v(" "),[n("options-menu",{attrs:{isDisableMenu:e.isDisableMenu,isActive:e.local.options.isActive}}),e._v(" "),n("profile-menu",{attrs:{isDisableMenu:e.isDisableMenu,isActive:e.local.profile.isActive}})]],2)])},staticRenderFns:[]};var h=n("VU/8")(p,f,!1,function(e){n("qt/k")},"data-v-d978cc74",null).exports,v=n("ikD4"),g=n("kVPM"),k={components:{MenuBar:h},name:"app",data:function(){return{local:{isDisableMenu:!1},server:{}}},computed:r()({},Object(m.c)(["appData","userData","auth"])),created:function(){this.ROUTE_PERMISSIONS(),N.$on("setNotification",this.setNotification),N.$on("logout",this.logout),this.fetchData()},updated:function(){},methods:r()({},Object(m.b)(["setAppResource","setUserData","setAuth","setOrderingNotification"]),{fetchData:function(){var e=this,t=g.a.api.app.resource,n=this.BUILDPARAM([]);v.a.getResource({resourceName:t,queryString:n}).then(function(t){200===t.status&&(e.server=t.data,e.setUserData(e.server.userData),e.setAppResource(e.server.appResource),e.setNotification({type:"ordering",value:e.server.orderingData}))}).catch(function(){e.GOTOPAGE("Login","")})},pageClick:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.local.isDisableMenu=e},setNotification:function(e){switch(e.type){case"ordering":this.setOrderingNotification(e.value)}}}),beforeDestroy:function(){N.$off("setNotification",this.setNotification),N.$off("logout",this.logout)},watch:{$route:function(e,t){"Login"===this.$route.name?this.HASAUTH()&&this.REDIRECTTOHOME():this.ROUTE_PERMISSIONS(),this.pageClick()}}},E={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper"},[n("div",{staticClass:"background darken-pseudo",style:"background-image: url('"+e.appData.bg+"');"}),e._v(" "),n("div",{staticClass:"content"},[e.auth?n("div",{staticClass:"menu-bar"},[n("menu-bar",{attrs:{isDisableMenu:e.local.isDisableMenu},on:{setMenuStatus:e.pageClick}})],1):e._e(),e._v(" "),n("div",{staticClass:"page-content",on:{click:function(t){e.pageClick()}}},[n("transition",{attrs:{name:"fade"}},[n("router-view")],1)],1)])])},staticRenderFns:[]};var T=n("VU/8")(k,E,!1,function(e){n("4MLP")},null,null).exports,b={state:{app:{auth:!1,resource:{},user:{},notification:{ordering:null}}},getters:{userData:function(e){return e.app.user},appData:function(e){return e.app.resource},auth:function(e){return e.app.auth},orderingData:function(e){return e.app.notification.ordering}},mutations:{SET_AUTH:function(e,t){e.app.auth=t},SET_APPDATA:function(e,t){e.app.resource=t},SET_USERDATA:function(e,t){e.app.user=t},SET_ORDERINGNOTIFICATION:function(e,t){e.app.notification.ordering=t}},actions:{setAuth:function(e,t){(0,e.commit)("SET_AUTH",t)},setAppResource:function(e,t){(0,e.commit)("SET_APPDATA",t)},setUserData:function(e,t){(0,e.commit)("SET_USERDATA",t)},setOrderingNotification:function(e,t){(0,e.commit)("SET_ORDERINGNOTIFICATION",t)}}};a.a.use(m.a);var j=new m.a.Store({modules:{App:b},strict:!1}),_=n("/ocq");a.a.use(_.a);var P=new _.a({mode:"history",routes:[{path:"/",name:"Home",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"kE9J"))}},{path:"/login",name:"Login",component:function(){return n.e(21).then(n.bind(null,"BsAW"))}},{path:"/ordering",name:"Ordering",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"aKlC"))}},{path:"/ordering/group",name:"OrderingGroup",component:function(){return Promise.all([n.e(0),n.e(26)]).then(n.bind(null,"rXke"))}},{path:"/ordering/:key",name:"OrderingDetail",component:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"I/SV"))}},{path:"/users",name:"Users",component:function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,"fuKq"))}},{path:"/authority/:key",name:"Authority",component:function(){return Promise.all([n.e(0),n.e(17)]).then(n.bind(null,"Mn2x"))}},{path:"/project/:key",name:"Project",component:function(){return Promise.all([n.e(0),n.e(15)]).then(n.bind(null,"JPSK"))}},{path:"/contract/:key",name:"Contract",component:function(){return Promise.all([n.e(0),n.e(22)]).then(n.bind(null,"VOtH"))}},{path:"/create-contract/:key",name:"CreateContract",component:function(){return Promise.all([n.e(0),n.e(19)]).then(n.bind(null,"03jN"))}},{path:"/front-site",name:"FrontSite",component:function(){return Promise.all([n.e(0),n.e(18)]).then(n.bind(null,"w0sy"))}},{path:"/front-site/update/:key",name:"FrontSiteUpdate",component:function(){return Promise.all([n.e(0),n.e(12)]).then(n.bind(null,"62YR"))}},{path:"/front-site/verify/:key",name:"FrontSiteVerify",component:function(){return Promise.all([n.e(0),n.e(13)]).then(n.bind(null,"dLXr"))}},{path:"/losing",name:"Losing",component:function(){return Promise.all([n.e(0),n.e(23)]).then(n.bind(null,"4YbA"))}},{path:"/losing/detail",name:"LosingDetail",component:function(){return Promise.all([n.e(0),n.e(20)]).then(n.bind(null,"MUxo"))}},{path:"/store/:key",name:"AddMaterial",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"yPOr"))}},{path:"/material/:key",name:"Material",component:function(){return Promise.all([n.e(0),n.e(28)]).then(n.bind(null,"x65H"))}},{path:"/store",name:"Store",component:function(){return Promise.all([n.e(0),n.e(25)]).then(n.bind(null,"palh"))}},{path:"/house-template",name:"House",component:function(){return Promise.all([n.e(0),n.e(14)]).then(n.bind(null,"Q5W6"))}},{path:"/work-order",name:"Workorder",component:function(){return Promise.all([n.e(0),n.e(29)]).then(n.bind(null,"zbB/"))}},{path:"/work-order/edit/:key",name:"EditWorkorder",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"mH6X"))}},{path:"/profile",name:"Profile",component:function(){return Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"XzTQ"))}},{path:"/paying-period",name:"PayingPeriod",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"O6JG"))}},{path:"/paying-period/worksheet",name:"Worksheet",component:function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"ftOe"))}},{path:"/paying-period/summary",name:"PayingSummary",component:function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,"kL4x"))}},{path:"/paying-period/approve",name:"Approve",component:function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"CvIC"))}},{path:"/technician",name:"Technician",component:function(){return Promise.all([n.e(0),n.e(27)]).then(n.bind(null,"QXqO"))}},{path:"/work-group",name:"WorkGroup",component:function(){return Promise.all([n.e(0),n.e(24)]).then(n.bind(null,"rmur"))}},{path:"/work-group/:key",name:"WorkGroupDetails",component:function(){return Promise.all([n.e(0),n.e(16)]).then(n.bind(null,"HWSm"))}},{path:"/paying-period/extra-job",name:"ExtraJob",component:function(){return Promise.all([n.e(0),n.e(30)]).then(n.bind(null,"RPL/"))}}]}),S=n("fZjL"),y=n.n(S),O=n("Xxa5"),A=n.n(O),C=n("exGp"),D=n.n(C),R=n("3htv"),w=n("PJh5"),M=n.n(w),I={computed:r()({},Object(m.c)(["userData"]),{PROJECT_TYPE:function(){return g.a.variable.projectType},LEFTRIGHT:function(){return g.a.variable.leftRight},USERPOSITION:function(){var e=g.a.variable.userPermission;return e=e.map(function(e){return{key:e.key,name:e.name}})},TECHNICIANJOBTYPE:function(){var e=g.a.variable.technicianJobType;return e=e.map(function(e){return{key:e.key,name:e.name}})},USER:function(){if(this.userData)return this.userData},USERTYPE:function(){return void 0!==this.userData&&void 0!==this.userData.position?this.userData.position.toLowerCase():null}}),filters:{},methods:r()({},Object(m.b)(["setAuth"]),{GET_COLORMENU:function(){var e=this;return D()(A.a.mark(function t(){var n,a;return A.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n={},e.next=3,v.a.getResource({resourceName:g.a.api.house.colorSelection,queryString:n});case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}},t,e)}))()},GET_DATE:function(e){return void 0===e||null===e?null:new Date(e)},GET_DATEDIFF:function(e,t){var n=M()(e,"YYYY/MM/DD");return M()(t,"YYYY/MM/DD").diff(n,"days")},NUMBERWITHCOMMAS:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return parseFloat(e).toFixed(t).replace(/\B(?=(\d{3})+(?!\d))/g,",")},GET_WORKSTATUS:function(e){return g.a.variable.status[e]},GET_PROJECT_TYPE:function(e){return g.a.variable.projectType.filter(function(t){return t.key===e})},GET_STATUSNAME:function(e){return g.a.variable.status[e]},GET_CURRENTDATE:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"YYYY-MM-DD";return M()().format(e)},SET_DATEFORMAT:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YYYY-MM-DD";if(!e)return null;var n=new Date(e);return M.a.utc(n).format(t)},EXTRACT_DATE:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"all";return"now"===e&&(e=new Date),e=M()(e,"YYYY/MM/DD"),"all"===t?e.format("YYYY")+"/"+e.format("M")+"/"+e.format("D"):"Y"===t?e.format("YYYY"):"M"===t?e.format("M"):"D"===t?e.format("D"):null},GOTOPAGE:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";arguments.length>2&&void 0!==arguments[2]&&arguments[2];this.$router.push({name:e,params:{key:t}})},BUILDPARAM:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t="";if(y()(e).length)return y()(e).forEach(function(n){t+=n+"="+e[n]+"&"}),t.slice(0,-1)},NOTIFY:function(e){switch(e){case"success":this.$snackbar.open({duration:5e3,message:"ทำรายการเสร็จสิ้น",type:"is-primary",position:"is-bottom-left",actionText:"",queue:!1,onAction:function(){}});break;case"error":this.$snackbar.open({duration:5e3,message:"เกิดข้อผิดพลาด โปรดทำรายการอีกครั้ง",type:"is-danger",position:"is-bottom-right",actionText:"",queue:!1,onAction:function(){}})}},REDIRECTTOHOME:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;switch(null===e&&(e=this.USERTYPE),e){case"admin":case"purchasing":this.GOTOPAGE("Home","");break;case"technician":this.GOTOPAGE("FrontSite","");break;default:console.log("No userType when redirect"),this.GOTOPAGE("Login","")}},IS_ADMIN:function(){return null!==this.USERTYPE&&"admin"===this.USERTYPE},IS_PURCHASING:function(){return null!==this.USERTYPE&&"purchasing"===this.USERTYPE},IS_TECHNICIAN:function(){return null!==this.USERTYPE&&"technician"===this.USERTYPE},ROUTE_PERMISSIONS:function(){if(!this.HASAUTH())return this.GOTOPAGE("Login",""),!1;var e=this.$route.name,t="Login"===e,n=JSON.parse(R.a.GET_STORAGEITEM("userData")),a=null!==this.USERTYPE?this.USERTYPE:n.position.toLowerCase();if(void 0!==a&&null!==a){var i=g.a.variable.userPermission.filter(function(e){return e.key===a})[0].allow;return"*"===i||(!!(i.indexOf(e)>=0||t)||(this.REDIRECTTOHOME(a),!1))}this.REDIRECTTOHOME()},LOGOUT:function(){R.a.REMOVE_STORAGEITEM("isAuth"),R.a.REMOVE_STORAGEITEM("app_token"),R.a.REMOVE_STORAGEITEM("userData"),this.GOTOPAGE("Login")},SETAUTH:function(e){R.a.SET_STORAGEITEM("isAuth",1),R.a.SET_STORAGEITEM("app_token",e),this.setAuth(!0)},SERUSERDATA:function(e){R.a.SET_STORAGEITEM("userData",e)},HASAUTH:function(){var e=R.a.GET_STORAGEITEM("isAuth"),t=R.a.GET_STORAGEITEM("app_token");return e&&t?(this.setAuth(!0),!0):(this.setAuth(!1),!1)},REMOVEDUPLICATES:function(e,t){var n=[],a={};for(var i in e)a[e[i][t]]=e[i];for(var r in a)n.push(a[r]);return n},GETWORKSHEETSTATUS:function(e){return g.a.variable.workSheetStatus.filter(function(t){return t.key===e.toString()})}})},G=n("MMSg"),x=n.n(G),U=n("sUu7");n.d(t,"bus",function(){return N}),a.a.use(M.a),a.a.use(x.a,{defaultIconPack:"fa",defaultDateFormatter:function(e){return M()(e).format("YYYY/MM/DD")}}),a.a.use(U.a),a.a.mixin(I),a.a.config.productionTip=!1;var N=new a.a;new a.a({el:"#app",router:P,store:j,components:{App:T},template:"<App/>"})},UN4h:function(e,t){},XmWB:function(e,t){},ikD4:function(e,t,n){"use strict";var a=n("//Fk"),i=n.n(a),r=n("mtWM"),o=n.n(r),s=n("3htv"),c=function(){var e=s.a.GET_STORAGEITEM("app_token"),t={"Content-Type":"application/json"};return e&&(t.Authorization="bearer "+e.substring(1,e.length-1)),o.a.create({headers:t})};t.a={getResource:function(e,t){return new i.a(function(t,n){c().get(s.a.GET_FULLAPI(e.resourceName,e.queryString)).then(function(e){t(e)}).catch(function(e){n(e)})})},postResource:function(e,t){return new i.a(function(t,n){c().post(s.a.GET_FULLAPI(e.resourceName),{data:e.data}).then(function(e){t(e)}).catch(function(e){n(e)})})},putResource:function(e,t){return new i.a(function(t,n){c().put(s.a.GET_FULLAPI(e.resourceName),{data:e.data}).then(function(e){t(e)}).catch(function(e){n(e)})})},deleteResource:function(e,t){return new i.a(function(t,n){c().delete(s.a.GET_FULLAPI(e.resourceName,e.queryString)).then(function(e){t(e)}).catch(function(e){n(e)})})}}},kVPM:function(e,t,n){"use strict";var a={apiEndPoint:window.location.protocol+"//"+window.location.hostname+":3000/api",app:{resource:"/app/resource"},login:"/login",home:{index:"/home"},project:{index:"/project",dropdown:"/project-selection",checkDuplicate:"/project-duplicate"},contract:{index:"/contract",time:"/contract-time",status:"/contract-status",period:"/contract-period",progress:"/contract-progress",dropdown:"/contract-selection",reset:"/contract-reset",checkDuplicate:"/contract-duplicate"},workOrder:{index:"/work-order"},materialGroup:{index:"/material-group",dropdown:"/material-group-selection"},users:{index:"/users",dropdown:"/users-dropdown"},house:{index:"/house",dropdown:"/house-selection",color:"/house/color",colorSelection:"/house/color-selection"},plan:{dropdown:"/plan-selection"},store:{index:"/store",dropdown:"/store-selection"},material:{index:"/material",dropdown:"/material-selection"},ordering:{home:"/ordering-home",index:"/ordering",fullOrder:"/full-ordering",extra:"/ordering-extra",forward:"/ordering-forward"},frontSite:{index:"/front-site"},losing:{home:"/losing-home",index:"/losing",fullObj:"/losing-full"},technician:{index:"/technician",dropdown:"/technician-selection"},workGroup:{index:"/work-group",detail:"/work-group-detail",dropdown:"/work-group-selection"},workSheet:{index:"/work-sheet"},workSheetDetail:{index:"/work-sheet-detail"},workSheetApproval:{index:"/work-sheet/approval"},payingPeriod:{home:"/paying-period",summary:"/paying-period/summary"}};t.a={api:a,variable:{projectType:[{key:1,name:"มัณฑนา"},{key:2,name:"นันทวัน"}],status:{wait:"รออนุมัติ",ip:"กำลังดำเนินงาน",done:"เสร็จสิ้น",confirmed:"รอสินค้า",received:"รับของแล้ว",normal:"ปกติ",extra:"พิเศษ",delete:"ลบข้อมูล"},workingStatus:{wait:"รอ",ip:"ดำเนินงาน",done:"เสร็จสิ้น"},times:10,leftRight:[{key:"none",name:"ไม่ระบุ"},{key:"left",name:"ซ้าย"},{key:"right",name:"ขวา"}],housecolor:[{key:"B3PW1",name:"B3PW-1"},{key:"B3PW2",name:"B3PW-2"},{key:"B3PW3",name:"B3PW-3"},{key:"B3PW4",name:"B3PW-4"},{key:"B4PW1",name:"B4PW-1"},{key:"B4PW2",name:"B4PW-2"},{key:"B4PW3",name:"B4PW-3"},{key:"B4PW4",name:"B4PW-4"},{key:"B21",name:"B2-1"},{key:"B22",name:"B2-2"},{key:"B23",name:"B2-2"}],userPermission:[{key:"admin",name:"ผู้ดูแลระบบ",allow:"*"},{key:"purchasing",name:"จัดซื้อ",allow:"*"},{key:"technician",name:"หัวหน้างาน",allow:["FrontSite","FrontSiteUpdate","Profile","FrontSiteVerify"]}],technicianJobType:[{key:1,name:"งานระบบไฟฟ้า"},{key:2,name:"งานระบบประปาและสุขาภิบาล"},{key:3,name:"งานก่ออิฐฉาบปูน"}],workSheetStatus:[{key:"0",name:"รอการบันทึก",class:"is-white"},{key:"1",name:"รอการตรวจสอบ",class:"is-light"},{key:"2",name:"ไม่ผ่านการตรวจสอบ",class:"is-warning"},{key:"3",name:"รออนุมัติจ่าย",class:"is-link"},{key:"4",name:"ไม่ผ่านการอนุมัติ",class:"is-danger"},{key:"5",name:"จ่ายเงินแล้ว",class:"is-success"}]}}},"qt/k":function(e,t){},uslO:function(e,t,n){var a={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(e){return n(r(e))}function r(e){var t=a[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}i.keys=function(){return Object.keys(a)},i.resolve=r,e.exports=i,i.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.47ff141e95c12ac27aed.js.map