webpackJsonp([11],{JPSK:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Xxa5"),n=a.n(l),c=a("exGp"),s=a.n(c),i=a("ujS/"),r=a("O/8C"),o=a("KxLu"),u=a("ikD4"),d=a("kVPM"),p=a("Y3eR"),v=a("7Dwl"),m=a("7x59"),b={props:{},components:{breadcrumbBar:i.a,optionDetailTemplate:r.a,noResultTemplate:o.a,dataTable:p.a,myInput:v.a,myAction:m.a},name:"UserPage",data:function(){return{local:{pageObj:{items:[{name:"โครงการ",route:"Project",key:"xxx",active:!0,icon:"fa fa-folder-open-o"}],template:{class:"project-page"}},statusSearch:[{title:"ทั้งหมด",key:""},{title:"ดำเนินงาน",key:"ip"},{title:"เสร็จสิ้น",key:"done"}],idSelected:"",inputs:{}}}},computed:{resourceName:function(){return d.a.api.project.index}},created:function(){},mounted:function(){void 0!==this.$route.params.key&&"all"!==this.$route.params.key&&this.$refs.dataTable.searchByText({value:this.$route.params.key})},methods:{selectedDataHandle:function(t){this.errors.clear(),this.local.idSelected=t.id,this.local.inputs.code=t.code,this.local.inputs.name=t.name,this.local.inputs.address=t.address,this.local.inputs.type=t.type,this.local.submitMode="update"},submitForm:function(t){var e=this;return s()(n.a.mark(function a(){var l,c,s,i,r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$validator.validateAll();case 2:l=a.sent,c=e.resourceName,"update"===t&&"new"===e.local.idSelected&&(t="save"),s={},i=null,a.t0=t,a.next="add"===a.t0?10:"cancel"===a.t0?13:"update"===a.t0?15:"delete"===a.t0?23:"save"===a.t0?29:36;break;case 10:return e.local.idSelected="new",e.cleanInput(),a.abrupt("return");case 13:return e.local.idSelected=null,a.abrupt("return");case 15:if(l){a.next=17;break}return a.abrupt("return");case 17:return s=e.local.inputs,c=c+"/"+e.local.idSelected,a.next=21,u.a.putResource({data:s,resourceName:c});case 21:return i=a.sent,a.abrupt("break",36);case 23:return c=c+"/"+e.local.idSelected,r=[],a.next=27,u.a.deleteResource({resourceName:c,queryString:r});case 27:return i=a.sent,a.abrupt("break",36);case 29:if(l){a.next=31;break}return a.abrupt("return");case 31:return s=e.local.inputs,a.next=34,u.a.postResource({data:s,resourceName:c});case 34:return i=a.sent,a.abrupt("break",36);case 36:if(200!==i.status){a.next=42;break}return e.reloadTable(),e.cleanInput(),e.local.idSelected="",e.NOTIFY("success"),a.abrupt("return");case 42:e.NOTIFY("error");case 43:case"end":return a.stop()}},a,e)}))()},reloadTable:function(){this.$refs.dataTable.fetchData()},cleanInput:function(){this.local.inputs.code="",this.local.inputs.name="",this.local.inputs.address="",this.local.inputs.type=""}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("option-detail-template",{ref:"template",attrs:{templateObj:t.local.pageObj.template,isSelected:t.local.idSelected},on:{cancleForm:function(e){t.submitForm("cancel")}}},[a("template",{slot:"title"},[a("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}})],1),t._v(" "),a("template",{slot:"data-table"},[a("data-table",{ref:"dataTable",attrs:{tableType:"normal",resourceName:t.resourceName,statusSearch:t.local.statusSearch},on:{selectedData:t.selectedDataHandle}})],1),t._v(" "),a("template",{slot:"function"},[a("button",{staticClass:"button is-link",on:{click:function(e){t.submitForm("add")}}},[t._v("เพิ่มข้อมูลใหม่")])]),t._v(" "),""!=t.local.idSelected?[a("template",{slot:"detail"},[a("div",{staticClass:"container-block detail-block"},[a("div",{staticClass:"c-body"},[a("div",{staticClass:"form-detail"},[a("div",{staticClass:"name"},[t._v(t._s(t.local.inputs.code)+"  "+t._s(t.local.inputs.name))]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("รหัสโครงการ")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.code,inputObj:{type:"text",name:"project_code",placeholder:"รหัสโครงการ",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.code=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ชื่อโครงการ")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.name,inputObj:{type:"text",name:"project_name",placeholder:"ชื่อโครงการ",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.name=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ที่ตั้ง")]),t._v(" "),a("div",{staticClass:"value"},[a("b-field",[a("b-input",{attrs:{type:"text",placeholder:"ที่ตั้ง"},model:{value:t.local.inputs.address,callback:function(e){t.$set(t.local.inputs,"address",e)},expression:"local.inputs.address"}})],1)],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ประเภท")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.type,inputObj:{type:"select",icon:"home",inputValue:t.PROJECT_TYPE,name:"project_type",placeholder:"",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.type=e}}})],1)])])])]),t._v(" "),a("div",{staticClass:"container-block footer-panel"},[a("my-action",{attrs:{type:"update",obj:{title:"บันทึกข้อมูล"}},on:{clickEvent:function(e){t.submitForm("update")}}}),t._v(" "),"new"!=t.local.idSelected?a("my-action",{attrs:{type:"link",obj:{title:"สร้างสัญญาใหม่"}},on:{clickEvent:function(e){t.GOTOPAGE("CreateContract",t.local.idSelected)}}}):t._e(),t._v(" "),"new"!=t.local.idSelected?a("my-action",{attrs:{type:"link",obj:{title:"สัญญาในโครงการนี้ทั้งหมด"}},on:{clickEvent:function(e){t.GOTOPAGE("Contract","project-id")}}}):t._e(),t._v(" "),"new"!=t.local.idSelected?a("my-action",{attrs:{type:"delete",obj:{title:"ลบข้อมูล"}},on:{clickEvent:function(e){t.submitForm("delete")}}}):t._e()],1)])]:a("template",{slot:"detail"},[a("no-result-template")],1)],2)},staticRenderFns:[]};var y=a("VU/8")(b,f,!1,function(t){a("X/HH")},null,null);e.default=y.exports},"X/HH":function(t,e){}});
//# sourceMappingURL=11.eeb2715ae06a75c2553d.js.map