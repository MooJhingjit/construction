webpackJsonp([28],{"03jN":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),i=a("exGp"),c=a.n(i),o=a("NHnr"),s=a("ujS/"),l=a("ikD4"),u=a("kVPM"),d=a("3htv"),p=a("7Dwl"),v=a("7x59"),m=a("Tdo9"),_=a("PJh5"),f=a.n(_),h={props:{},components:{breadcrumbBar:s.a,myInput:p.a,myAction:v.a,myAutoComplete:m.a},name:"CreateContractPage",data:function(){return{local:{pageObj:{items:[{name:"โครงการ",route:"Project",key:"",active:!0,icon:"fa fa-file-text"},{name:"สร้างสัญญาใหม่",route:"CreateContract",key:this.$route.params.key,active:!0,icon:""}],template:{class:"create-contract-page"}},isTimeStart:!1,inputs:{code:"",projectId:this.$route.params.key,contractType:"10 งวด",plan:"",houseId:"",price:"",dateStart:"",paid:"",status:"",times:[{time:"1",priceRate:15,price:0,dateStart:"",dateEnd:""},{time:"2",priceRate:5,price:0,dateStart:"",dateEnd:""},{time:"3",priceRate:10,price:0,dateStart:"",dateEnd:""},{time:"4",priceRate:10,price:0,dateStart:"",dateEnd:""},{time:"5",priceRate:10,price:0,dateStart:"",dateEnd:""},{time:"6",priceRate:15,price:0,dateStart:"",dateEnd:""},{time:"7",priceRate:9,price:0,dateStart:"",dateEnd:""},{time:"8",priceRate:20,price:0,dateStart:"",dateEnd:""},{time:"9",priceRate:3,price:0,dateStart:"",dateEnd:""},{time:"10",priceRate:3,price:0,dateStart:"",dateEnd:""}]},project:{},houseTemplate:{inputs:[],selected:null},planTemplate:{inputs:[],selected:null},contractPreiod:[],percentPrice:null,isDuplicate:!1}}},computed:{contractTimes:function(){return this.local.isTimeStart?this.local.inputs.times:[]},getCurrentData:function(){return d.a.GET_DATETHAI("now")},resourceName:function(){return u.a.api.contract.index},dateStart:function(){return this.local.inputs.times.filter(function(t){return"1"===t.time})[0].dateStart},dateEnd:function(){return this.local.inputs.times.filter(function(t){return"10"===t.time})[0].dateEnd}},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;return c()(n.a.mark(function e(){var a,r,i,c;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=u.a.api.project.index+"/"+t.$route.params.key,r=t.BUILDPARAM(),e.next=4,l.a.getResource({resourceName:a,queryString:r});case 4:return i=e.sent,t.local.project=i.data,r=t.BUILDPARAM({projectTypeId:t.local.project.type}),e.next=9,l.a.getResource({resourceName:u.a.api.house.dropdown,queryString:r});case 9:c=e.sent,t.local.houseTemplate.inputs=c.data;case 11:case"end":return e.stop()}},e,t)}))()},submitForm:function(t,e){var a=this;return c()(n.a.mark(function r(){var i,c,s,u,d;return n.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,a.$validator.validateAll();case 2:i=r.sent,c=a.resourceName,s={},u=null,r.t0=t,r.next="save"===r.t0?9:18;break;case 9:if(i&&!a.local.isDuplicate){r.next=11;break}return r.abrupt("return");case 11:return a.local.inputs.status=e,(s=a.local.inputs).projectType=a.local.project.type,r.next=16,l.a.postResource({data:s,resourceName:c});case 16:return u=r.sent,r.abrupt("break",18);case 18:if(200!==u.status){r.next=24;break}return d={key:"UPDATE_ORDERING",data:{}},o.bus.$emit("emitSocket",d),a.NOTIFY("success"),a.GOTOPAGE("Contract",a.local.inputs.code),r.abrupt("return");case 24:a.NOTIFY("error");case 25:case"end":return r.stop()}},r,a)}))()},houseSelectedHandle:function(t){this.$refs.planAutoComplete.setValue({key:"",value:""}),null===t?(this.local.planTemplate.inputs=[],this.local.inputs.houseId=""):(this.local.inputs.houseId=t.key,this.getPlan(),this.getContractPreiod())},planSelectedHandle:function(t){this.local.inputs.plan=null===t?"":t.key},getContractPreiod:function(){var t=this;return c()(n.a.mark(function e(){var a,r,i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],r=u.a.api.contract.period+"/"+t.local.inputs.houseId,e.next=4,l.a.getResource({resourceName:r,queryString:a});case 4:i=e.sent,t.local.contractPreiod=i.data.preiodDate||null,t.local.percentPrice=i.data.percentPrice||null,t.runContractLists(),t.setContractPreiod();case 9:case"end":return e.stop()}},e,t)}))()},getPlan:function(){var t=this;return c()(n.a.mark(function e(){var a,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.BUILDPARAM({house:t.local.inputs.houseId}),e.next=3,l.a.getResource({resourceName:u.a.api.house.dropdown,queryString:a});case 3:r=e.sent,t.local.planTemplate.inputs=r.data;case 5:case"end":return e.stop()}},e,t)}))()},runContractLists:function(){var t=this;null!==this.local.percentPrice&&(this.local.inputs.times=this.local.inputs.times.map(function(e){return e.percentage=t.local.percentPrice[e.time],e.price=t.calculatePrice(t.local.percentPrice[e.time]),e}),this.local.isTimeStart=!0)},selectedContractDate:function(t){this.local.inputs.dateStart=t,this.setContractPreiod()},setContractPreiod:function(){var t=this;if(this.local.inputs.dateStart){var e="";this.local.inputs.times.map(function(a){t.local.contractPreiod?"1"===a.time?(a.dateStart=f()(t.local.inputs.dateStart).format("YYYY/MM/DD"),a.dateEnd=t.calculateContractPreiod(t.local.inputs.dateStart,t.local.contractPreiod[a.time]),e=a.dateEnd):(a.dateStart=t.calculateContractPreiod(e,1),a.dateEnd=t.calculateContractPreiod(a.dateStart,t.local.contractPreiod[a.time]),e=a.dateEnd):(a.dateStart="",a.dateEnd="")})}},calculateContractPreiod:function(t,e){return f()(t).add(e,"days").format("YYYY/MM/DD")},calculatePrice:function(t){return this.local.inputs.paid=10*this.local.inputs.price/100,t*(this.local.inputs.price-this.local.inputs.paid)/100},setDateVal:function(t){this.local.inputs.dateStart=t},checkDuplicate:function(t){var e=this;return c()(n.a.mark(function a(){var r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t){a.next=2;break}return a.abrupt("return");case 2:return r=e.BUILDPARAM({value:t}),a.next=5,l.a.getResource({resourceName:u.a.api.contract.checkDuplicate,queryString:r});case 5:if(!a.sent.data.length){a.next=10;break}return e.$refs.contract_code.setDuplicate(),e.local.isDuplicate=!0,a.abrupt("return");case 10:e.local.isDuplicate=!1;case 11:case"end":return a.stop()}},a,e)}))()}}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{class:["section",t.local.pageObj.template.class]},[a("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}}),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"detail-panel"},[[a("div",{staticClass:"container-block  detail-block"},[a("div",{staticClass:"c-header container-block block"},[a("div",{staticClass:"block name"},[t._v("\n            สัญญาว่าจ้างปลูกสร้างอาคาร\n            "),a("div",{staticClass:"date"},[t._v("วันที่ "+t._s(t.getCurrentData)+" ")])]),t._v(" "),a("div",{staticClass:"block info"},[a("table",{staticClass:"transparent-table"},[a("tr",[a("td",[t._v("เลขที่สัญญา:")]),t._v(" "),a("td",[a("my-input",{ref:"contract_code",attrs:{value:t.local.inputs.code,inputObj:{type:"text",isBlur:!0,name:"contract_code",placeholder:"เลขที่สัญญา",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.code=e},onBlur:function(e){t.checkDuplicate(t.local.inputs.code)}}})],1),t._v(" "),a("td",[t._v("ที่ตั้ง:")]),t._v(" "),a("td",[a("my-input",{attrs:{value:t.local.project.address,inputObj:{type:"text",name:"project_address",placeholder:"ที่ตั้ง",validate:""},validator:t.$validator},on:{input:function(e){t.local.project.address=e}}})],1)]),a("tr",[a("td",[t._v("โครงการ:")]),t._v(" "),a("td",[a("my-input",{attrs:{value:t.local.project.name,inputObj:{type:"text",name:"project_name",placeholder:"โครงการ",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.project.name=e}}})],1),t._v(" "),a("td",[t._v("ประเภทสัญญา:")]),t._v(" "),a("td",[a("my-input",{attrs:{value:t.local.inputs.contractType,inputObj:{type:"text",name:"contract_type",placeholder:"ประเภทสัญญา",validate:"required"},validator:t.$validator},on:{input:function(e){t.local.inputs.contractType=e}}})],1)]),t._v(" "),a("tr",[a("td",[t._v("แบบบ้าน:")]),t._v(" "),a("td",[a("my-auto-complete",{attrs:{arrInputs:t.local.houseTemplate.inputs,config:{getNullVal:!1},placeholder:"แบบบ้าน",label:""},on:{select:t.houseSelectedHandle}})],1),t._v(" "),a("td",[t._v("แปลง:")]),t._v(" "),a("td",[a("my-auto-complete",{ref:"planAutoComplete",attrs:{arrInputs:t.local.planTemplate.inputs,config:{getNullVal:!1},placeholder:"แปลง",label:""},on:{select:t.planSelectedHandle}})],1)]),t._v(" "),a("tr",[a("td",[t._v("ราคา:")]),t._v(" "),a("td",[a("my-input",{attrs:{value:t.local.inputs.price,inputObj:{type:"number",isBlur:!0,name:"contract_price",placeholder:"ราคา",validate:"required"},validator:t.$validator},on:{onBlur:function(e){t.runContractLists()},input:function(e){t.local.inputs.price=e}}})],1),t._v(" "),a("td"),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("วันที่ออกสัญญา:")]),t._v(" "),a("td",[a("my-input",{attrs:{value:t.local.inputs.dateStart||null,inputObj:{type:"datepicker",name:"contract_datestart",placeholder:"วันที่ออกสัญญา",validate:"required"},validator:t.$validator},on:{input:t.selectedContractDate}})],1),t._v(" "),a("td",[t._v("เงินเบิกล่วงหน้า 10%:")]),t._v(" "),a("td",[a("my-input",{attrs:{value:t.local.inputs.paid,inputObj:{type:"text",name:"contract_paid",placeholder:"เงินเบิกล่วงหน้า",validate:""},validator:t.$validator},on:{input:function(e){t.local.inputs.paid=e}}})],1)])])])]),t._v(" "),this.local.isTimeStart?a("div",{staticClass:"c-body"},[a("table",{staticClass:"table is-hoverable"},[t._m(0),t._v(" "),a("tbody",t._l(t.contractTimes,function(e,r){return a("tr",{key:r},[a("td",{attrs:{width:"70"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.time,expression:"item.time"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.time},on:{input:function(a){a.target.composing||t.$set(e,"time",a.target.value)}}})]),t._v(" "),a("td",[t._v(t._s(e.percentage)+"%")]),t._v(" "),a("td",{attrs:{width:""}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.price,expression:"item.price"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.price},on:{input:function(a){a.target.composing||t.$set(e,"price",a.target.value)}}})]),t._v(" "),a("td",{attrs:{width:""}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.dateStart,expression:"item.dateStart"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.dateStart},on:{input:function(a){a.target.composing||t.$set(e,"dateStart",a.target.value)}}})]),t._v(" "),a("td",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.dateEnd,expression:"item.dateEnd"}],staticClass:"input",attrs:{type:"text"},domProps:{value:e.dateEnd},on:{input:function(a){a.target.composing||t.$set(e,"dateEnd",a.target.value)}}})])])}))])]):t._e(),t._v(" "),this.local.isTimeStart?a("div",{staticClass:"c-footer container-block block"},[a("table",{staticClass:"transparent-table"},[a("tr",[a("td",[t._v("ผู้ว่าจ้าง: บริษัท แลนด์แอนด์เฮ้าส์ จำกัด (มหาชน)")]),t._v(" "),a("td",[t._v("วันที่ "+t._s(t.dateStart)+" ถึงวันที่ "+t._s(t.dateEnd))])]),t._v(" "),a("tr",[a("td",[t._v("จำนวนเงิน "+t._s(t.NUMBERWITHCOMMAS(t.local.inputs.price))+" บาท")]),t._v(" "),a("td",[t._v("เบิกเงินล่วงหน้า 10% จำนวน "+t._s(t.NUMBERWITHCOMMAS(t.local.inputs.paid))+" บาท")])])])]):t._e()]),t._v(" "),this.local.isTimeStart?a("div",{staticClass:"container-block footer-panel"},[t.local.inputs.plan&&t.local.inputs.houseId?[a("my-action",{attrs:{type:"update",obj:{title:"เริ่มดำเนินงาน",color:"is-success"}},on:{clickEvent:function(e){t.submitForm("save","ip")}}})]:[t._m(1)]],2):t._e()]],2)])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("งวดที่")]),t._v(" "),a("th"),t._v(" "),a("th",[t._v("จำนวนเงิน")]),t._v(" "),a("th",[t._v("วันที่เริ่ม")]),t._v(" "),a("th",[t._v("วันกำหนดเสร็จ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"alert"},[e("p",[this._v("แบบบ้านหรือแปลง ไม่สามารถป็นค่าว่างได้")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-block empty-panel"},[a("div",{staticClass:"block container-block"},[a("div",{staticClass:"block no-data"},[t._v("\n                ไม่พบข้อมูลที่ต้องการ\n            ")]),t._v(" "),a("div",{staticClass:"block select-data"},[a("i",{staticClass:"fa fa-hand-o-left",attrs:{"aria-hidden":"true"}}),t._v(" "),a("span",[t._v("เลือกข้อมูลทางซ้ายมือเพื่อแสดง")])]),t._v(" "),a("div",{staticClass:"block or"},[t._v("\n              หรือ\n            ")]),t._v(" "),a("div",{staticClass:"block add-data"},[a("button",{staticClass:"button"},[t._v("เพิ่มข้อมูลใหม่")])])])])}]};var y=a("VU/8")(h,b,!1,function(t){a("z3gF")},"data-v-1476549f",null);e.default=y.exports},z3gF:function(t,e){}});
//# sourceMappingURL=28.1f116363057076baee21.js.map