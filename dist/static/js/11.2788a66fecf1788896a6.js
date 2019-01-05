webpackJsonp([11],{hCPa:function(e,t){},kL4x:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=a("Xxa5"),l=a.n(c),n=a("exGp"),s=a.n(n),r=a("ujS/"),i=a("ikD4"),o=a("kVPM"),u=a("Tdo9"),d={props:{},components:{breadcrumbBar:r.a,myAutoComplete:u.a},name:"PayingSummaryPage",data:function(){return{local:{pageObj:{items:[{name:"จ่ายค่างวด",route:"PayingPeriod",key:"",active:!1,icon:"fa fa-exchange"},{name:"สรุปรายการจ่าย",route:"PayingSummary",key:"",active:!0,icon:""}]},type:["normal","extra"],project:{selected:null,value:null},technicians:{inputs:[],selected:null},isLoading:!1},server:{result:[]}}},computed:{},created:function(){this.getTechnician()},methods:{getTechnician:function(){var e=this;return s()(l.a.mark(function t(){var a,c;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={},t.next=3,i.a.getResource({resourceName:o.a.api.technician.dropdown,queryString:a});case 3:c=t.sent,e.local.technicians.inputs=c.data;case 5:case"end":return t.stop()}},t,e)}))()},projectSelectedHandle:function(e){this.local.project.selected=null!==e?e.key:null},technicianSelectedHandle:function(e){this.local.technicians.selected=null!==e?e.key:null},searchData:function(){var e=this;return s()(l.a.mark(function t(){var a,c;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.BUILDPARAM({project:e.local.project.selected,technician:e.local.technicians.selected,type:e.local.type}),t.next=3,i.a.getResource({resourceName:o.a.api.payingPeriod.summary,queryString:a});case 3:c=t.sent,e.local.isLoading=!1,e.server.result=c.data;case 6:case"end":return t.stop()}},t,e)}))()},getTypeText:function(e){return e.is_extra?"พิเศษ":"ปกติ"}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"section"},[a("breadcrumb-bar",{attrs:{dataObj:e.local.pageObj}}),e._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"detail-panel"},[a("div",{staticClass:"container-block detail-block"},[a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("my-auto-complete",{attrs:{arrInputs:"project",config:{getNullVal:!0},placeholder:"ค้นหาโครงการ",label:""},on:{select:e.projectSelectedHandle}})],1),e._v(" "),a("div",{staticClass:"column"},[a("my-auto-complete",{attrs:{arrInputs:e.local.technicians.inputs,config:{getNullVal:!0},placeholder:"ค้นหาช่าง",label:""},on:{select:e.technicianSelectedHandle}})],1),e._v(" "),a("div",{staticClass:"column flex-center"},[a("label",{staticClass:"checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.local.type,expression:"local.type"}],attrs:{type:"checkbox",value:"normal"},domProps:{checked:Array.isArray(e.local.type)?e._i(e.local.type,"normal")>-1:e.local.type},on:{change:function(t){var a=e.local.type,c=t.target,l=!!c.checked;if(Array.isArray(a)){var n=e._i(a,"normal");c.checked?n<0&&e.$set(e.local,"type",a.concat(["normal"])):n>-1&&e.$set(e.local,"type",a.slice(0,n).concat(a.slice(n+1)))}else e.$set(e.local,"type",l)}}}),e._v("\n                ปกติ\n              ")]),e._v("\n                 \n              "),a("label",{staticClass:"checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.local.type,expression:"local.type"}],attrs:{type:"checkbox",value:"extra"},domProps:{checked:Array.isArray(e.local.type)?e._i(e.local.type,"extra")>-1:e.local.type},on:{change:function(t){var a=e.local.type,c=t.target,l=!!c.checked;if(Array.isArray(a)){var n=e._i(a,"extra");c.checked?n<0&&e.$set(e.local,"type",a.concat(["extra"])):n>-1&&e.$set(e.local,"type",a.slice(0,n).concat(a.slice(n+1)))}else e.$set(e.local,"type",l)}}}),e._v("\n                พิเศษ\n              ")])]),e._v(" "),a("div",{staticClass:"column is-2"},[a("button",{class:["button is-fullwidth",{"is-loading":e.local.isLoading}],on:{click:function(t){e.searchData()}}},[e._v("ค้นหา")])])]),e._v(" "),a("div",{staticClass:"columns"},[a("div",{staticClass:"column"},[a("table",{staticClass:"table is-narrow"},[e._m(0),e._v(" "),a("tbody",e._l(e.server.result,function(t,c){return a("tr",{key:c},[a("td",[e._v(e._s(e.SET_DATEFORMAT(t[0].date,"YYYY/MM")))]),e._v(" "),a("td",[e._v(e._s(t[0].projectName))]),e._v(" "),a("td",[e._v(e._s(t[0].technicianName))]),e._v(" "),a("td",[e._v(e._s(e.NUMBERWITHCOMMAS(t[0].total)))]),e._v(" "),a("td",[a("span",{class:["tag",{"is-warning":t[0].is_extra,"is-light":!t[0].is_extra}]},[e._v(e._s(e.getTypeText(t[0])))])])])}))])])])])])])],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",[e._v("วันที่")]),e._v(" "),a("th",[e._v("โครงการ")]),e._v(" "),a("th",[e._v("ช่าง")]),e._v(" "),a("th",[e._v("เงินรวม")]),e._v(" "),a("th",[e._v("ประเภท")])])])}]};var v=a("VU/8")(d,p,!1,function(e){a("hCPa")},null,null);t.default=v.exports}});
//# sourceMappingURL=11.2788a66fecf1788896a6.js.map