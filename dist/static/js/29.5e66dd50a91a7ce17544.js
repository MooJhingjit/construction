webpackJsonp([29],{"RPL/":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("ujS/"),s=a("Tdo9"),c=a("7x59"),i=a("7Dwl"),o={props:{},components:{breadcrumbBar:l.a,myAutoComplete:s.a,myAction:c.a,myInput:i.a},name:"ApprovePage",data:function(){return{local:{pageObj:{items:[{name:"จ่ายค่างวด",route:"PayingPeriod",key:"",active:!0,icon:"fa fa-exchange"},{name:"งานพิเศษ",route:"ExtraJob",key:"",active:!0,icon:""}],template:{class:"extra-job-page"}}}}},computed:{},created:function(){},methods:{projectSelectedHandle:function(){}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{class:["section",t.local.pageObj.template.class]},[a("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}}),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"detail-panel"},[a("div",{staticClass:"container-block  detail-block"},[a("div",{staticClass:"container-block block c-header"},[a("div",{staticClass:"block"},[a("my-auto-complete",{attrs:{arrInputs:[],config:{getNullVal:!1},placeholder:"ค้นหาช่าง",label:""},on:{select:t.projectSelectedHandle}})],1),t._v(" "),a("div",{staticClass:"block"},[a("my-auto-complete",{attrs:{arrInputs:[],config:{getNullVal:!1},placeholder:"ค้นหาโครงการ",label:""},on:{select:t.projectSelectedHandle}})],1),t._v(" "),a("div",{staticClass:"block"},[a("my-auto-complete",{attrs:{arrInputs:[],config:{getNullVal:!1},placeholder:"ค้นหาแปลง",label:""},on:{select:t.projectSelectedHandle}})],1)]),t._v(" "),a("div",{staticClass:"block c-body"},[t._m(0),t._v(" "),a("table",{staticClass:"table rows-table is-hoverable"},[t._m(1),t._v(" "),a("tbody",[a("tr",[a("td",[a("my-input",{attrs:{value:"",inputObj:{type:"text",name:"store_address",placeholder:"",validate:""}}})],1),t._v(" "),a("td",[a("my-input",{attrs:{value:"",inputObj:{type:"text",name:"store_address",placeholder:"",validate:""}}})],1),t._v(" "),a("td",[a("my-input",{attrs:{value:"",inputObj:{type:"text",name:"store_address",placeholder:"",validate:""}}})],1),t._v(" "),a("td",[a("my-input",{attrs:{value:"",inputObj:{type:"text",name:"store_address",placeholder:"",validate:""}}})],1),t._v(" "),a("td",[a("my-input",{attrs:{value:"",inputObj:{type:"text",name:"store_address",placeholder:"",validate:""}}})],1),t._v(" "),a("td")])])])]),t._v(" "),a("div",{staticClass:"container-block block right"},[a("button",{staticClass:"button",on:{click:function(e){t.editRow("add")}}},[a("i",{staticClass:"fa fa-plus",attrs:{"aria-hidden":"true"}})])])]),t._v(" "),a("div",{staticClass:"container-block footer-panel"},[a("my-action",{attrs:{type:"update",obj:{title:"บันทึกข้อมูล",color:"is-info",isConfirm:!0}},on:{clickEvent:function(e){t.submitForm("")}}})],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container-block result"},[e("div",{staticClass:"block"},[this._v("แบบบ้าน 198PWY32T")]),this._v(" "),e("div",{staticClass:"block"}),this._v(" "),e("div",{staticClass:"block"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("หมวด")]),t._v(" "),a("th",[t._v("งวด/รายการ")]),t._v(" "),a("th",{attrs:{width:"80"}},[t._v("หน่วย")]),t._v(" "),a("th",{attrs:{width:"80"}},[t._v("ราคา")]),t._v(" "),a("th",{attrs:{width:""}},[t._v("หมายเหตุ")]),t._v(" "),a("th",{attrs:{width:"80"}},[t._v("สถานะ")])])])}]};var r=a("VU/8")(o,n,!1,function(t){a("slOI")},"data-v-085a44f0",null);e.default=r.exports},slOI:function(t,e){}});
//# sourceMappingURL=29.5e66dd50a91a7ce17544.js.map