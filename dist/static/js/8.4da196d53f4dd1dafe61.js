webpackJsonp([8],{fuKq:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Xxa5"),s=a.n(l),i=a("exGp"),n=a.n(i),o=a("ujS/"),r=a("O/8C"),c=a("ikD4"),u=a("kVPM"),d=a("Y3eR"),p=a("7Dwl"),v=a("7x59"),m={props:{},components:{breadcrumbBar:o.a,optionDetailTemplate:r.a,dataTable:d.a,myInput:p.a,myAction:v.a},name:"UserPage",data:function(){return{local:{pageObj:{items:[{name:"ข้อมูลผู้ใช้",route:"User",key:"",active:!0,icon:"fa fa-address-book-o"}],template:{class:"user-page"}},isOptionMinimize:!1,idSelected:"",inputs:{}},server:{}}},computed:{resourceName:function(){return u.a.api.users.index}},created:function(){},methods:{selectedDataHandle:function(t){this.local.idSelected=t.id,this.local.inputs.name=t.name,this.local.inputs.username=t.username,this.local.inputs.position=t.position,this.local.inputs.email=t.email,this.local.inputs.phone=t.phone,this.local.inputs.address=t.address,this.local.submitMode="update"},submitForm:function(t){var e=this;return n()(s.a.mark(function a(){var l,i,n,o,r;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$validator.validateAll();case 2:l=a.sent,i=e.resourceName,"update"===t&&"new"===e.local.idSelected&&(t="save"),n={},o=null,a.t0=t,a.next="add"===a.t0?10:"cancel"===a.t0?13:"update"===a.t0?15:"delete"===a.t0?23:"save"===a.t0?29:36;break;case 10:return e.local.idSelected="new",e.cleanInput(),a.abrupt("return");case 13:return e.local.idSelected=null,a.abrupt("return");case 15:if(l){a.next=17;break}return a.abrupt("return");case 17:return n=e.local.inputs,i=i+"/"+e.local.idSelected,a.next=21,c.a.putResource({data:n,resourceName:i});case 21:return o=a.sent,a.abrupt("break",36);case 23:return i=i+"/"+e.local.idSelected,r=[],a.next=27,c.a.deleteResource({resourceName:i,queryString:r});case 27:return o=a.sent,a.abrupt("break",36);case 29:if(l){a.next=31;break}return a.abrupt("return");case 31:return n=e.local.inputs,a.next=34,c.a.postResource({data:n,resourceName:i});case 34:return o=a.sent,a.abrupt("break",36);case 36:if(200!==o.status){a.next=42;break}return e.reloadTable(),e.cleanInput(),e.local.idSelected="",e.NOTIFY("success"),a.abrupt("return");case 42:e.NOTIFY("error");case 43:case"end":return a.stop()}},a,e)}))()},reloadTable:function(){this.$refs.dataTable.fetchData()},cleanInput:function(){this.local.inputs.name="",this.local.inputs.username="",this.local.inputs.position="",this.local.inputs.email="",this.local.inputs.phone="",this.local.inputs.address=""}}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("option-detail-template",{attrs:{templateObj:t.local.pageObj.template,isSelected:t.local.idSelected},on:{cancleForm:function(e){t.submitForm("cancel")}}},[a("template",{slot:"title"},[a("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}})],1),t._v(" "),a("template",{slot:"data-table"},[a("data-table",{ref:"dataTable",attrs:{tableType:"normal",resourceName:t.resourceName,statusSearch:t.local.statusSearch},on:{selectedData:t.selectedDataHandle}})],1),t._v(" "),a("template",{slot:"function"},[a("button",{staticClass:"button is-link",on:{click:function(e){t.submitForm("add")}}},[t._v("เพิ่มข้อมูลใหม่")])]),t._v(" "),""!=t.local.idSelected?[a("template",{slot:"detail"},[a("div",{staticClass:"container-block  detail-block"},[a("div",{staticClass:"form-detail"},[a("div",{staticClass:"name"},[t._v(t._s(t.local.inputs.name))]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ชื่อ-นามสกุล")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.name,inputObj:{type:"text",name:"user_name",placeholder:"ชื่อ-นามสกุล",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.name=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ชื่อผู้ใช้")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.username,inputObj:{type:"text",name:"user_username",placeholder:"ชื่อผู้ใช้",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.username=e}}})],1)]),t._v(" "),"new"==t.local.idSelected?a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("รหัสผ่าน")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.password,inputObj:{type:"text",name:"user_password",placeholder:"รหัสผ่าน",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.password=e}}})],1)]):t._e(),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ตำแหน่ง")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.position.toLowerCase(),inputObj:{type:"select",icon:"home",inputValue:t.USERPOSITION,name:"user_position",placeholder:"ตำแหน่ง",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.position=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("อีเมล์")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.email,inputObj:{type:"text",name:"user_email",placeholder:"อีเมล์",validate:"email"},validator:t.$validator},on:{input:function(e){t.local.inputs.email=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("เบอร์โทรศัพท์")]),t._v(" "),a("div",{staticClass:"value"},[a("my-input",{attrs:{value:t.local.inputs.phone,inputObj:{type:"text",name:"user_phone",placeholder:"เบอร์โทรศัพท์",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.phone=e}}})],1)]),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"text-title"},[t._v("ที่อยู่")]),t._v(" "),a("div",{staticClass:"value"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.local.inputs.address,expression:"local.inputs.address"}],staticClass:"textarea",attrs:{id:"",cols:"30",rows:"4"},domProps:{value:t.local.inputs.address},on:{input:function(e){e.target.composing||t.$set(t.local.inputs,"address",e.target.value)}}})])])])]),t._v(" "),a("div",{staticClass:"container-block footer-panel"},[a("my-action",{attrs:{type:"update",obj:{title:"บันทึกข้อมูล"}},on:{clickEvent:function(e){t.submitForm("update")}}}),t._v(" "),"new"!=t.local.idSelected?a("my-action",{attrs:{type:"delete",obj:{title:"ลบข้อมูล"}},on:{clickEvent:function(e){t.submitForm("delete")}}}):t._e()],1)])]:a("template",{slot:"detail"})],2)},staticRenderFns:[]};var _=a("VU/8")(m,b,!1,function(t){a("iBS5")},null,null);e.default=_.exports},iBS5:function(t,e){}});
//# sourceMappingURL=8.4da196d53f4dd1dafe61.js.map