webpackJsonp([23],{Mt5H:function(t,e){},palh:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Xxa5"),n=a.n(l),s=a("exGp"),i=a.n(s),c=a("ujS/"),o=a("O/8C"),r=a("KxLu"),u=a("ikD4"),d=a("kVPM"),p=a("Y3eR"),v=a("7Dwl"),m=a("7x59"),b={props:{},components:{breadcrumbBar:c.a,optionDetailTemplate:o.a,noResultTemplate:r.a,dataTable:p.a,myInput:v.a,myAction:m.a},name:"UserPage",data:function(){return{local:{pageObj:{items:[{name:"ร้านค้า",route:"Store",key:"",active:!0,icon:"fa fa-th-large"}],template:{class:"store-page"}},statusSearch:[],idSelected:"",inputs:{}}}},computed:{resourceName:function(){return d.a.api.store.index}},created:function(){},methods:{selectedDataHandle:function(t){this.errors.clear(),this.local.idSelected=t.id,this.local.inputs.name=t.name,this.local.inputs.type=t.type,this.local.inputs.contact=t.contact,this.local.inputs.fax=t.fax,this.local.inputs.tel=t.tel,this.local.inputs.address=t.address,this.local.submitMode="update"},submitForm:function(t){var e=this;return i()(n.a.mark(function a(){var l,s,i,c,o;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$validator.validateAll();case 2:l=a.sent,s=e.resourceName,"update"===t&&"new"===e.local.idSelected&&(t="save"),i={},c=null,a.t0=t,a.next="add"===a.t0?10:"cancel"===a.t0?13:"update"===a.t0?15:"delete"===a.t0?23:"save"===a.t0?29:36;break;case 10:return e.local.idSelected="new",e.cleanInput(),a.abrupt("return");case 13:return e.local.idSelected=null,a.abrupt("return");case 15:if(l){a.next=17;break}return a.abrupt("return");case 17:return i=e.local.inputs,s=s+"/"+e.local.idSelected,a.next=21,u.a.putResource({data:i,resourceName:s});case 21:return c=a.sent,a.abrupt("break",36);case 23:return s=s+"/"+e.local.idSelected,o=[],a.next=27,u.a.deleteResource({resourceName:s,queryString:o});case 27:return c=a.sent,a.abrupt("break",36);case 29:if(l){a.next=31;break}return a.abrupt("return");case 31:return i=e.local.inputs,a.next=34,u.a.postResource({data:i,resourceName:s});case 34:return c=a.sent,a.abrupt("break",36);case 36:if(200!==c.status){a.next=42;break}return e.reloadTable(),e.cleanInput(),e.local.idSelected="",e.NOTIFY("success"),a.abrupt("return");case 42:e.NOTIFY("error");case 43:case"end":return a.stop()}},a,e)}))()},reloadTable:function(){this.$refs.dataTable.fetchData()},cleanInput:function(){this.local.inputs.name="",this.local.inputs.type="",this.local.inputs.contact="",this.local.inputs.fax="",this.local.inputs.tel="",this.local.inputs.address=""}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("option-detail-template",{ref:"template",attrs:{templateObj:t.local.pageObj.template,isSelected:t.local.idSelected},on:{cancleForm:function(e){t.submitForm("cancel")}}},[a("template",{slot:"title"},[a("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}})],1),t._v(" "),a("template",{slot:"data-table"},[a("data-table",{ref:"dataTable",attrs:{tableType:"normal",resourceName:t.resourceName,statusSearch:t.local.statusSearch},on:{selectedData:t.selectedDataHandle}})],1),t._v(" "),a("template",{slot:"function"},[a("button",{staticClass:"button is-link",on:{click:function(e){t.submitForm("add")}}},[t._v("เพิ่มข้อมูลใหม่")])]),t._v(" "),""!=t.local.idSelected?[a("template",{slot:"detail"},[a("div",{staticClass:"container-block  detail-block"},[a("div",{staticClass:"form-detail"},[a("div",{staticClass:"name"},[t._v(t._s(t.local.inputs.name)+" "+t._s(t.local.inputs.type))]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ชื่อร้านค้า")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.name,inputObj:{type:"text",name:"store_name",placeholder:"ชื่อร้านค้า",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.name=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ประเภทวัสดุ")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.type,inputObj:{type:"text",name:"store_type",placeholder:"ประเภทวัสดุ",validate:""},validator:t.$validator},on:{input:function(e){t.local.inputs.type=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ติดต่อ")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.contact,inputObj:{type:"text",name:"store_contact",placeholder:"ติดต่อ",validate:""},validator:t.$validator},on:{input:function(e){t.local.inputs.contact=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("แฟกซ์")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.fax,inputObj:{type:"text",name:"store_fax",placeholder:"แฟกซ์",validate:""},validator:t.$validator},on:{input:function(e){t.local.inputs.fax=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("เบอร์โทรศัพท์")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.tel,inputObj:{type:"text",name:"store_tel",placeholder:"เบอร์โทรศัพท์",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.tel=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ที่อยู่")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.address,inputObj:{type:"text",name:"store_address",placeholder:"ที่อยู่",validate:""},validator:t.$validator},on:{input:function(e){t.local.inputs.address=e}}})],1)])])]),t._v(" "),a("div",{staticClass:"container-block footer-panel"},["new"!=t.local.idSelected?a("my-action",{attrs:{type:"link",obj:{title:"รายการสินค้า"}},on:{clickEvent:function(e){t.GOTOPAGE("AddMaterial",t.local.idSelected)}}}):t._e(),t._v(" "),a("my-action",{attrs:{type:"update",obj:{title:"บันทึกข้อมูล"}},on:{clickEvent:function(e){t.submitForm("update")}}}),t._v(" "),"new"!=t.local.idSelected?a("my-action",{attrs:{type:"delete",obj:{title:"ลบข้อมูล"}},on:{clickEvent:function(e){t.submitForm("delete")}}}):t._e()],1)])]:a("template",{slot:"detail"},[a("no-result-template")],1)],2)},staticRenderFns:[]};var _=a("VU/8")(b,f,!1,function(t){a("Mt5H")},null,null);e.default=_.exports}});
//# sourceMappingURL=23.81d88590fe357fad43b7.js.map