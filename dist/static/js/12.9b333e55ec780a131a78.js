webpackJsonp([12],{Y8d4:function(t,a){},dLXr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("Xxa5"),o=e.n(l),s=e("exGp"),n=e.n(s),c=e("ujS/"),i=e("O/8C"),r=e("ikD4"),d=e("kVPM"),u=e("uvJ5"),m=e("7x59"),p=e("7Dwl"),v={props:{},components:{myAction:m.a,ModelPanel:u.a,breadcrumbBar:c.a,optionDetailTemplate:i.a,myInput:p.a},name:"FrontSiteUpdatePage",data:function(){return{local:{pageObj:{items:[{name:"ไชต์งานหลัก",route:"FrontSite",key:"",active:!1,icon:"fa fa-home"},{name:"ตรวจสอบงวดงาน",route:"FrontSiteVerify",key:this.$route.params.key,active:!0,icon:""}]},project:null,contract:null,progress:null,modelData:null,workSheet:[],workSheetSelected:{index:null,listIndex:null},workSheetStatus:null}}},computed:{},created:function(){this.fetchData(),console.log("created verify")},methods:{fetchData:function(){var t=this;return n()(o.a.mark(function a(){var e,l,s;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=d.a.api.frontSite.index+"/"+t.$route.params.key,l=[],a.next=4,r.a.getResource({resourceName:e,queryString:l});case 4:return s=a.sent,t.local.project=s.data.project,t.local.contract=s.data.contract,t.local.time=s.data.time,a.next=10,t.getWorkSheet(t.local.contract.project_id,t.local.contract.plan);case 10:case"end":return a.stop()}},a,t)}))()},getWorkSheet:function(t,a){var e=this;return n()(o.a.mark(function l(){var s,n;return o.a.wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return s=e.BUILDPARAM({project:t,plan:a}),l.next=3,r.a.getResource({resourceName:d.a.api.workSheet.index+"/all",queryString:s});case 3:n=l.sent,e.local.workSheet=n.data;case 5:case"end":return l.stop()}},l,e)}))()},showDetail:function(t,a,e){this.reset(),this.$refs.modelPanel.isActive=!0,this.local.modelData=t,this.local.modelData.index=a,this.local.modelData.listIndex=e,this.local.workSheetSelected.index=a,this.local.workSheetSelected.listIndex=e},submit:function(t){var a=this;return n()(o.a.mark(function e(){var l,s,n,c;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.status=a.local.workSheetStatus?"3":"2",l={item:t,updateType:"update-status"},s=d.a.api.workSheet.index+"/"+a.local.modelData.id,e.next=5,r.a.putResource({data:l,resourceName:s});case 5:n=a.local.workSheetSelected.index,c=a.local.workSheetSelected.listIndex,a.setItemAfterUpdated(n,c,t.status),a.reset(),a.NOTIFY("success");case 10:case"end":return e.stop()}},e,a)}))()},setItemAfterUpdated:function(t,a,e){this.local.workSheet[t].lists[a].status=e,this.local.modelData.status=e},reset:function(){this.local.workSheetSelected.index=null,this.local.workSheetSelected.listIndex=null,this.$refs.modelPanel.isActive=!1,this.local.workSheetStatus=null},getListStatus:function(t,a){return this.GETWORKSHEETSTATUS(t)[0][a]},updateData:function(t,a,e,l){var o=0,s=this.local.workSheet[e].lists[l];switch(a){case"amount":o=s.price*t,this.local.workSheet[e].lists[l].total_price=o;break;case"price":o=t*s.amount,this.local.workSheet[e].lists[l].total_price=o}this.local.workSheet[e].lists[l][a]=t}}},_={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"section front-site-update-page"},[e("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}}),t._v(" "),null!=t.local.project?e("div",{staticClass:"container-block"},[e("article",{staticClass:"tile is-child notification"},[e("div",{staticClass:"project-name"},[t._v(t._s(t.local.project.name)+" ("+t._s(t.local.contract.code)+")")]),t._v(" "),e("div",{staticClass:"todo-lists"},[e("table",{staticClass:"table is-bordered"},[t._m(0),t._v(" "),e("tbody",t._l(t.local.workSheet,function(a,l){return e("tr",{key:l},[e("td",[e("p",{class:[{"extra-item":a.is_extra}]},[t._v(t._s(a.work_group_name))])]),t._v(" "),e("td",t._l(a.lists,function(a,o){return e("div",{key:o,class:[{list:!0,"extra-item":a.is_extra}],on:{click:function(e){t.showDetail(a,l,o)}}},[t._v("\n                  "+t._s(a.time)+" "+t._s(a.name)+" "),e("span",{class:"tag "+t.getListStatus(a.status,"class")},[t._v("\n                    "+t._s(t.getListStatus(a.status,"name"))+"\n                  ")])])}))])}))])])])]):t._e(),t._v(" "),e("model-panel",{ref:"modelPanel"},[null!=t.local.modelData?e("div",{staticClass:"model"},[e("div",{class:[{"extra-item":t.local.modelData.is_extra}]},[t._v("งวด/รายการ:\n        "),e("span",[t._v(t._s(t.local.modelData.time)+" / "+t._s(t.local.modelData.name))]),t._v(" "),t.local.modelData.is_extra?e("span",[t._v("(พิเศษ)")]):t._e()]),t._v(" "),e("div",[t._v("หน่วย: "),e("span",[t._v(t._s(t.local.modelData.unit))])]),t._v(" "),e("div",[t._v("จำนวน:\n        "),1===t.local.modelData.status&&t.local.modelData.is_extra?e("my-input",{attrs:{value:t.local.modelData.amount,validator:t.$validator,inputObj:{type:"text",name:"amount"+t.local.modelData.listIndex,placeholder:"",validate:"required"}},on:{input:function(a){return t.updateData(a,"amount",t.local.modelData.index,t.local.modelData.listIndex)}}}):e("span",[t._v(t._s(t.local.modelData.amount))])],1),t._v(" "),e("div",[t._v("ราคาต่อหน่วย:\n        "),1===t.local.modelData.status&&t.local.modelData.is_extra?e("my-input",{attrs:{value:t.local.modelData.price,validator:t.$validator,inputObj:{type:"text",name:"price"+t.local.modelData.listIndex,placeholder:"",validate:"required"}},on:{input:function(a){return t.updateData(a,"price",t.local.modelData.index,t.local.modelData.listIndex)}}}):e("span",[t._v(t._s(t.NUMBERWITHCOMMAS(t.local.modelData.price,2)))])],1),t._v(" "),e("div",[t._v("จำนวนเงิน:\n        "),1===t.local.modelData.status&&t.local.modelData.is_extra?e("my-input",{attrs:{value:t.local.modelData.total_price,validator:t.$validator,inputObj:{type:"text",name:"total_price"+t.local.modelData.listIndex,placeholder:"",validate:"required"}},on:{input:function(a){return t.updateData(a,"total_price",t.local.modelData.index,t.local.modelData.listIndex)}}}):e("span",[t._v(t._s(t.NUMBERWITHCOMMAS(t.local.modelData.total_price,2)))])],1),t._v(" "),e("div",[t._v("หมายเหตุ: "),e("span",[t._v(t._s(t.local.modelData.note))])]),t._v(" "),e("div",[t._v("สถานะ:\n        "),e("span",{class:"tag "+t.getListStatus(t.local.modelData.status,"class")},[t._v("\n          "+t._s(t.getListStatus(t.local.modelData.status,"name"))+"\n          "),t.local.modelData.updated_at?[t._v("( "+t._s(t.SET_DATEFORMAT(t.local.modelData.updated_at))+" )")]:t._e()],2)]),t._v(" "),t.local.modelData.technicianName?e("div",[t._v("\n        ช่าง: "),e("span",[t._v(t._s(t.local.modelData.technicianName))])]):t._e(),t._v(" "),e("br"),t._v(" "),1===t.local.modelData.status?e("div",{staticClass:"update-status"},[e("label",{staticClass:"radio"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.local.workSheetStatus,expression:"local.workSheetStatus"}],attrs:{type:"radio"},domProps:{value:!0,checked:t._q(t.local.workSheetStatus,!0)},on:{change:function(a){t.$set(t.local,"workSheetStatus",!0)}}}),t._v("\n          ผ่านการตรวจสอบ\n        ")]),t._v(" "),e("label",{staticClass:"radio"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.local.workSheetStatus,expression:"local.workSheetStatus"}],attrs:{type:"radio"},domProps:{value:!1,checked:t._q(t.local.workSheetStatus,!1)},on:{change:function(a){t.$set(t.local,"workSheetStatus",!1)}}}),t._v("\n          ไม่ผ่านการตรวจสอบ\n        ")])]):t._e(),t._v(" "),1===t.local.modelData.status?e("div",{staticClass:"update-status"},[null!==t.local.workSheetStatus?e("my-action",{attrs:{type:"update",obj:{title:"บันทึก",color:"is-success",isConfirm:!0}},on:{clickEvent:function(a){t.submit(t.local.modelData)}}}):t._e()],1):t._e()]):t._e()])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("thead",[a("th",{attrs:{width:"100"}},[this._v("หมวด")]),this._v(" "),a("th",[this._v("งวด/รายการ")])])}]};var h=e("VU/8")(v,_,!1,function(t){e("Y8d4")},"data-v-b069a9ba",null);a.default=h.exports}});
//# sourceMappingURL=12.9b333e55ec780a131a78.js.map