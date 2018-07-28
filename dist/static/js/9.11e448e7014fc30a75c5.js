webpackJsonp([9],{"4YbA":function(t,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=a("Xxa5"),e=a.n(s),l=a("exGp"),c=a.n(l),r=a("TfLM"),n=a("ujS/"),o=a("ikD4"),d=a("kVPM"),v={props:{},components:{barChart:r.a,breadcrumbBar:n.a},name:"OrderingPage",data:function(){return{local:{pageObj:{items:[{name:"ข้อมูลสูญเสีย",route:"Losing",key:"",active:!0,icon:"fa fa-thumbs-o-down"}]},extraOrdering:null},config:{type:"bar",height:"60",barWidth:6,barSpacing:5,tooltipFormat:'<span style="color: {{color}}">&#9679;</span>{{offset:offset}} <br/>{{value:value}} รายการ'},item4:{labels:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],datasets:[{label:"การสั่งซื้อ",data:[40,20,12,39,10,40,39,80,40,20,12,11],backgroundColor:"rgba(255,146,146,.7)"}]},item5:{labels:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],datasets:[{label:"การจ่ายค่างวด",data:[20,50,12,26,13,20,54,24,42,45,23,31],backgroundColor:"rgba(250,157,50,.7)"}]},item6:{labels:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],datasets:[{label:"ความสูญเสียรวม",data:[20,50,12,26,13,20,54,24,42,45,23,31],backgroundColor:"rgba(169,169,169,.7)"}]}}},computed:{},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;return c()(e.a.mark(function i(){var a,s,l;return e.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return a=d.a.api.losing.home,s=[],i.next=4,o.a.getResource({resourceName:a,queryString:s});case 4:l=i.sent,t.local.extraOrdering=l.data.extraOrdering;case 6:case"end":return i.stop()}},i,t)}))()}}},h={render:function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("section",{staticClass:"section losing-page"},[a("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}}),t._v(" "),a("div",{staticClass:"container-block"},[a("div",{staticClass:"tile is-ancestor"},[a("div",{staticClass:"tile is-vertical is-12"},[a("div",{staticClass:"tile"},[a("div",{staticClass:"tile is-parent is-vertical is-9"},[a("article",{staticClass:"tile is-child notification"},[a("div",{staticClass:"tile"},[a("div",{staticClass:"tile is-parent is-vertical is-12"},[a("bar-chart",{attrs:{data:t.item6,height:150}})],1)])])]),t._v(" "),a("div",{staticClass:"tile is-parent is-vertical"},[a("article",{staticClass:"tile is-child notification"},[a("div",{staticClass:"search-box container-block"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("div",{staticClass:"block"},[a("button",{staticClass:"button is-link",on:{click:function(i){t.GOTOPAGE("LosingDetail","")}}},[t._v("รายละเอียด")])])])])])]),t._v(" "),a("div",{staticClass:"tile"},[a("div",{staticClass:"tile is-parent is-vertical is-6"},[a("article",{staticClass:"tile is-child notification"},[a("div",{staticClass:"tile"},[a("div",{staticClass:"tile is-parent is-vertical is-12"},[null!=t.local.extraOrdering?a("bar-chart",{attrs:{data:t.local.extraOrdering,height:150}}):t._e()],1)])])]),t._v(" "),a("div",{staticClass:"tile is-parent is-vertical is-6"},[a("article",{staticClass:"tile is-child notification"},[a("div",{staticClass:"tile"},[a("div",{staticClass:"tile is-parent is-vertical is-12"},[a("bar-chart",{attrs:{data:t.item5,height:150}})],1)])])])]),t._v(" "),t._m(2)])])])],1)},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"block"},[i("input",{staticClass:"input",attrs:{type:"text",placeholder:"ปี"}}),this._v(" "),i("br"),this._v(" "),i("input",{staticClass:"input",attrs:{type:"text",placeholder:"เดือน"}})])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"block"},[i("div",{staticClass:"field is-grouped is-grouped-multiline"},[i("div",{staticClass:"control"},[i("div",{staticClass:"tags has-addons"},[i("span",{staticClass:"tag is-light"},[this._v("โครงการ")]),this._v(" "),i("span",{staticClass:"tag is-info"},[this._v("5")])])]),this._v(" "),i("div",{staticClass:"control"},[i("div",{staticClass:"tags has-addons"},[i("span",{staticClass:"tag is-light"},[this._v("สัญญา")]),this._v(" "),i("span",{staticClass:"tag is-info"},[this._v("25")])])])])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"tile function"},[i("div",{staticClass:"tile is-parent is-vertical is-4"},[i("article",{staticClass:"tile is-child notification container-block"},[i("span",{staticClass:"block title"},[i("i",{staticClass:"fa fa-print",attrs:{"aria-hidden":"true"}}),this._v(" ออกรายงาน")])])]),this._v(" "),i("div",{staticClass:"tile is-parent is-vertical is-4"},[i("article",{staticClass:"tile is-child notification container-block"},[i("span",{staticClass:"block title"},[i("i",{staticClass:"fa fa-print",attrs:{"aria-hidden":"true"}}),this._v(" ออกรายงาน")])])]),this._v(" "),i("div",{staticClass:"tile is-parent is-vertical is-4"},[i("article",{staticClass:"tile is-child notification container-block"},[i("span",{staticClass:"block title"},[i("i",{staticClass:"fa fa-print",attrs:{"aria-hidden":"true"}}),this._v(" ออกรายงาน")])])])])}]};var u=a("VU/8")(v,h,!1,function(t){a("E9jj")},null,null);i.default=u.exports},E9jj:function(t,i){}});
//# sourceMappingURL=9.11e448e7014fc30a75c5.js.map