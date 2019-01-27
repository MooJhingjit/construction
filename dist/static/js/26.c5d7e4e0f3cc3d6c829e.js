webpackJsonp([26],{HJF1:function(e,t){},rXke:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Xxa5"),n=a.n(l),s=a("exGp"),r=a.n(s),i=a("ujS/"),o=a("O/8C"),u=a("KxLu"),c=a("ikD4"),d=a("kVPM"),p=a("Y3eR"),m=a("7Dwl"),b=a("7x59"),v=a("Tdo9"),h={props:{},components:{breadcrumbBar:i.a,optionDetailTemplate:o.a,noResultTemplate:u.a,dataTable:p.a,myInput:m.a,myAction:b.a,myAutoComplete:v.a},name:"OrderingGroup",data:function(){return{local:{pageObj:{items:[{name:"กลุ่มวัสดุ",route:"OrderingGroup",key:"xxx",active:!0,icon:"fa fa-folder-open-o"}],template:{class:"ordering-group-page"}},statusSearch:[],idSelected:"",inputs:{id:null,name:null,houseId:null,lists:[]},lists:[],materials:{},materialMainSearch:"",materialStatusSelected:"",houseTemplate:{inputs:[],selected:null}}}},computed:{resourceName:function(){return d.a.api.materialGroup.index}},updated:function(){},created:function(){this.fetchData()},methods:{fetchData:function(){var e=this;return r()(n.a.mark(function t(){var a,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.BUILDPARAM(),t.next=3,c.a.getResource({resourceName:d.a.api.house.dropdown,queryString:a});case 3:l=t.sent,e.local.houseTemplate.inputs=l.data;case 5:case"end":return t.stop()}},t,e)}))()},houseSelectedHandle:function(e){null!==e?(this.local.houseTemplate.selected=e,this.local.inputs.houseId=e.key,this.local.inputs.lists=this.local.lists.filter(function(t){return t.houseId===e.key})):this.local.inputs.lists=this.local.lists},selectedDataHandle:function(e){this.local.idSelected=e.id,this.local.inputs.id=e.id,this.local.inputs.name=e.name,this.local.inputs.lists=e.detail.map(function(e){return{materialId:e.material_id,amount:e.amount,houseId:e.house_id,materialName:e.name,storeName:e.store_name}}),this.local.lists=this.local.inputs.lists},deleteListsItem:function(e){this.local.inputs.lists.splice(e,1)},cleanInput:function(){this.local.idSelected=null,this.local.inputs.id=null,this.local.inputs.name=null,this.local.inputs.lists=[]},submitForm:function(e){var t=this;return r()(n.a.mark(function a(){var l,s,r,i,o;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$validator.validateAll();case 2:l=a.sent,s=t.resourceName,"update"===e&&"new"===t.local.idSelected&&(e="save"),r={},i=null,a.t0=e,a.next="add"===a.t0?10:"cancel"===a.t0?13:"update"===a.t0?15:"delete"===a.t0?23:"save"===a.t0?29:36;break;case 10:return t.cleanInput(),t.local.idSelected="new",a.abrupt("return");case 13:return t.cleanInput(),a.abrupt("return");case 15:if(l){a.next=17;break}return a.abrupt("return");case 17:return r=t.local.inputs,s=s+"/"+t.local.idSelected,a.next=21,c.a.putResource({data:r,resourceName:s});case 21:return i=a.sent,a.abrupt("break",36);case 23:return s=s+"/"+t.local.idSelected,o=[],a.next=27,c.a.deleteResource({resourceName:s,queryString:o});case 27:return i=a.sent,a.abrupt("break",36);case 29:if(l){a.next=31;break}return a.abrupt("return");case 31:return r=t.local.inputs,a.next=34,c.a.postResource({data:r,resourceName:s});case 34:return i=a.sent,a.abrupt("break",36);case 36:if(200!==i.status){a.next=42;break}return t.reloadTable(),t.cleanInput(),t.local.idSelected="",t.NOTIFY("success"),a.abrupt("return");case 42:t.NOTIFY("error");case 43:case"end":return a.stop()}},a,t)}))()},reloadTable:function(){this.$refs.dataTable.fetchData()},itemSelectedHandle:function(){}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("option-detail-template",{ref:"template",attrs:{isSelected:e.local.idSelected,templateObj:e.local.pageObj.template},on:{cancleForm:function(t){e.submitForm("cancel")}}},[a("template",{slot:"title"},[a("breadcrumb-bar",{attrs:{dataObj:e.local.pageObj}})],1),e._v(" "),a("template",{slot:"data-table"},[a("data-table",{ref:"dataTable",attrs:{tableType:"normal",resourceName:e.resourceName,statusSearch:e.local.statusSearch},on:{selectedData:e.selectedDataHandle}})],1),e._v(" "),a("template",{slot:"function"},[a("button",{staticClass:"button is-link",on:{click:function(t){e.submitForm("add")}}},[e._v("เพิ่มข้อมูลใหม่")])]),e._v(" "),e.local.idSelected?[a("template",{slot:"detail"},[a("div",{staticClass:"container-block detail-block"},[a("div",{staticClass:"block result"},[a("div",{staticClass:"title-name"},[a("div",{staticClass:"label"},[e._v("กลุ่มวัสดุ")]),e._v(" "),a("my-input",{attrs:{value:e.local.inputs.name,inputObj:{type:"text",name:"order_group",placeholder:"ชื่อกลุ่มวัสดุ",validate:"required"},validator:e.$validator},on:{input:function(t){e.local.inputs.name=t}}})],1),e._v(" "),a("div",{staticClass:"items"},[a("table",{staticClass:"transparent-table"},[a("thead",[a("tr",[a("td",{attrs:{width:"200"}},[a("my-auto-complete",{attrs:{arrInputs:e.local.houseTemplate.inputs,config:{getNullVal:!1},placeholder:"ค้นหาแบบบ้าน",label:""},on:{select:e.houseSelectedHandle}})],1),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("ร้านค้า")]),e._v(" "),a("td",{staticStyle:{"text-align":"center"}},[e._v("รายการ")]),e._v(" "),a("td",{attrs:{width:"80"}},[e._v("จำนวน")]),e._v(" "),a("td")])]),e._v(" "),e.local.inputs.lists.length?a("tbody",e._l(e.local.inputs.lists,function(t,l){return a("tr",{key:l},[a("td",[e._v(e._s(t.houseId))]),e._v(" "),a("td",[e._v(e._s(t.storeName))]),e._v(" "),a("td",[e._v(e._s(t.materialName))]),e._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"item.amount"}],staticClass:"input",attrs:{type:"number",size:"2"},domProps:{value:t.amount},on:{input:function(a){a.target.composing||e.$set(t,"amount",a.target.value)}}})])])})):e._e()])])])]),e._v(" "),a("div",{staticClass:"container-block footer-panel"},[a("my-action",{attrs:{type:"update",obj:{title:"บันทึกข้อมูล"}},on:{clickEvent:function(t){e.submitForm("update")}}}),e._v(" "),a("my-action",{attrs:{type:"delete",obj:{title:"ลบข้อมูล"}},on:{clickEvent:function(t){e.submitForm("delete")}}})],1)])]:a("template",{slot:"detail"},[a("no-result-template")],1)],2)},staticRenderFns:[]};var _=a("VU/8")(h,f,!1,function(e){a("HJF1")},null,null);t.default=_.exports}});
//# sourceMappingURL=26.c5d7e4e0f3cc3d6c829e.js.map