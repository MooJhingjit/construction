webpackJsonp([14],{Q5W6:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Xxa5"),n=a.n(l),i=a("exGp"),s=a.n(i),o=a("ujS/"),c=a("O/8C"),r=a("KxLu"),u=a("ikD4"),d=a("kVPM"),p=a("Y3eR"),v=a("7Dwl"),m=a("7x59"),b={props:{},components:{breadcrumbBar:o.a,optionDetailTemplate:c.a,noResultTemplate:r.a,dataTable:p.a,myInput:v.a,myAction:m.a},name:"UserPage",data:function(){return{local:{pageObj:{items:[{name:"แบบบ้าน",route:"Project",key:"",active:!0,icon:"fa fa-home"}],template:{class:"house-template-page"}},idSelected:"",items:{},inputs:{},newColorMenu:{value:null,isNew:!1},colorMenu:[]}}},computed:{resourceName:function(){return d.a.api.house.index},statusSearch:function(){return d.a.variable.projectType.map(function(t){return{title:t.name,key:t.key}})}},created:function(){this.getColorMenu()},methods:{getColorMenu:function(){var t=this;return s()(n.a.mark(function e(){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.GET_COLORMENU();case 2:t.local.colorMenu=e.sent;case 3:case"end":return e.stop()}},e,t)}))()},selectedDataHandle:function(t){this.errors.clear(),this.local.idSelected=t.id,this.local.inputs.plan=t.plan,this.local.inputs.name=t.name,this.local.inputs.type=t.type,this.local.inputs.tile=t.tile,this.local.inputs.garage=t.garage,this.local.inputs.stair=t.stair,this.local.inputs.color=t.color,this.local.submitMode="update"},addColor:function(t){this.local.newColorMenu.isNew=t},submitNewColor:function(){var t=this;return s()(n.a.mark(function e(){var a,l;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$validator.validateAll();case 2:if(e.sent){e.next=5;break}return e.abrupt("return",!1);case 5:return a=d.a.api.house.color,l={colorCode:t.local.newColorMenu.value},e.next=9,u.a.postResource({data:l,resourceName:a});case 9:e.sent.data&&(t.local.colorMenu.push({key:l.colorCode,name:l.colorCode}),t.local.newColorMenu.value=null,t.local.newColorMenu.isNew=!1);case 11:case"end":return e.stop()}},e,t)}))()},submitForm:function(t){var e=this;return s()(n.a.mark(function a(){var l,i,s,o,c;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$validator.validateAll();case 2:l=a.sent,i=e.resourceName,"update"===t&&"new"===e.local.idSelected&&(t="save"),s={},o=null,a.t0=t,a.next="add"===a.t0?10:"cancel"===a.t0?13:"update"===a.t0?15:"delete"===a.t0?23:"save"===a.t0?29:36;break;case 10:return e.local.idSelected="new",e.cleanInput(),a.abrupt("return");case 13:return e.local.idSelected=null,a.abrupt("return");case 15:if(l){a.next=17;break}return a.abrupt("return");case 17:return s=e.local.inputs,i=i+"/"+e.local.idSelected,a.next=21,u.a.putResource({data:s,resourceName:i});case 21:return o=a.sent,a.abrupt("break",36);case 23:return i=i+"/"+e.local.idSelected,c=[],a.next=27,u.a.deleteResource({resourceName:i,queryString:c});case 27:return o=a.sent,a.abrupt("break",36);case 29:if(l){a.next=31;break}return a.abrupt("return");case 31:return s=e.local.inputs,a.next=34,u.a.postResource({data:s,resourceName:i});case 34:return o=a.sent,a.abrupt("break",36);case 36:if(200!==o.status){a.next=42;break}return e.reloadTable(),e.cleanInput(),e.local.idSelected="",e.NOTIFY("success"),a.abrupt("return");case 42:e.NOTIFY("error");case 43:case"end":return a.stop()}},a,e)}))()},reloadTable:function(){this.$refs.dataTable.fetchData()},cleanInput:function(){this.local.inputs.plan="",this.local.inputs.name="",this.local.inputs.type="",this.local.inputs.tile="",this.local.inputs.garage="",this.local.inputs.stair="",this.local.inputs.color=""}}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("option-detail-template",{ref:"template",attrs:{templateObj:t.local.pageObj.template,isSelected:t.local.idSelected},on:{cancleForm:function(e){t.submitForm("cancel")}}},[a("template",{slot:"title"},[a("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}})],1),t._v(" "),a("template",{slot:"data-table"},[a("data-table",{ref:"dataTable",attrs:{tableType:"normal",resourceName:t.resourceName,statusSearch:t.statusSearch},on:{selectedData:t.selectedDataHandle}})],1),t._v(" "),a("template",{slot:"function"},[a("button",{staticClass:"button is-link",on:{click:function(e){t.submitForm("add")}}},[t._v("เพิ่มข้อมูลใหม่")])]),t._v(" "),""!=t.local.idSelected?[a("template",{slot:"detail"},[a("div",{staticClass:"container-block detail-block"},[a("div",{staticClass:"c-body"},[a("div",{staticClass:"form-detail"},[a("div",{staticClass:"name"},[t._v(t._s(t.local.inputs.plan)+"  "+t._s(t.local.inputs.name))]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("แปลง")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.plan,inputObj:{type:"text",name:"house_plan",placeholder:"แปลง",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.plan=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("แบบบ้าน")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.name,inputObj:{type:"text",name:"house_name",placeholder:"แบบบ้าน",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.name=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ประเภท")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.type,inputObj:{type:"select",icon:"home",inputValue:t.PROJECT_TYPE,name:"project_type",placeholder:"",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.type=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("เมนูกระเบื้อง")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.tile,inputObj:{type:"text",name:"house_tile",placeholder:"เมนูกระเบื้อง",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.tile=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("โรงจอดรถ")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.garage,inputObj:{type:"select",icon:"home",inputValue:t.LEFTRIGHT,name:"house_garage",placeholder:"โรงจอดรถ",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.garage=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("บันไดวน")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.stair,inputObj:{type:"select",icon:"home",inputValue:t.LEFTRIGHT,name:"house_stair",placeholder:"บันไดวน",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.stair=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("เมนูสี")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.color,inputObj:{type:"select",icon:"home",inputValue:t.local.colorMenu,name:"house_stair",placeholder:"เมนูสี",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.color=e}}})],1),t._v(" "),a("div",{staticClass:"extra-block container-block"},[a("div",{staticClass:"block add"},[t.local.newColorMenu.isNew?a("button",{staticClass:"button",on:{click:function(e){t.addColor(!1)}}},[a("i",{staticClass:"fa fa-minus",attrs:{"aria-hidden":"true"}})]):t._e(),t._v(" "),a("button",{staticClass:"button",on:{click:function(e){t.addColor(!0)}}},[a("i",{staticClass:"fa fa-plus",attrs:{"aria-hidden":"true"}})])]),t._v(" "),t.local.newColorMenu.isNew?a("div",{staticClass:"block new-input"},[a("my-input",{attrs:{value:t.local.newColorMenu.value,inputObj:{type:"text",name:"colorMenu",placeholder:"เมนูสี",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.newColorMenu.value=e}}})],1):t._e(),t._v(" "),t.local.newColorMenu.isNew?a("div",{staticClass:"block new-submit"},[a("button",{staticClass:"button",on:{click:function(e){t.submitNewColor()}}},[a("i",{staticClass:"fa fa-check",attrs:{"aria-hidden":"true"}})])]):t._e()])])])])]),t._v(" "),a("div",{staticClass:"container-block footer-panel"},[a("my-action",{attrs:{type:"update",obj:{title:"บันทึกข้อมูล"}},on:{clickEvent:function(e){t.submitForm("update")}}}),t._v(" "),"new"!=this.local.idSelected?a("my-action",{attrs:{type:"delete",obj:{title:"ลบข้อมูล"}},on:{clickEvent:function(e){t.submitForm("delete")}}}):t._e()],1)])]:a("template",{slot:"detail"},[a("no-result-template")],1)],2)},staticRenderFns:[]};var h=a("VU/8")(b,f,!1,function(t){a("dLPS")},"data-v-ac81c042",null);e.default=h.exports},dLPS:function(t,e){}});
//# sourceMappingURL=14.cda70084a8c27b873855.js.map