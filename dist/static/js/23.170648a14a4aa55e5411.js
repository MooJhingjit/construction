webpackJsonp([23],{"4YbA":function(t,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=i("Xxa5"),e=i.n(s),l=i("exGp"),c=i.n(l),n=i("TfLM"),r=i("ujS/"),o=i("ikD4"),d=i("kVPM"),u={props:{},components:{barChart:n.a,breadcrumbBar:r.a},name:"OrderingPage",data:function(){return{local:{pageObj:{items:[{name:"ข้อมูลสูญเสีย",route:"Losing",key:"",active:!0,icon:"fa fa-thumbs-o-down"}]},ordering:null,paying:null,all:null}}},computed:{},created:function(){this.fetchData()},methods:{fetchData:function(){var t=this;return c()(e.a.mark(function a(){var i,s,l;return e.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return i=d.a.api.losing.home,s=[],a.next=4,o.a.getResource({resourceName:i,queryString:s});case 4:l=a.sent,t.local.ordering=l.data.ordering,t.local.paying=l.data.paying,t.local.all=l.data.all;case 8:case"end":return a.stop()}},a,t)}))()}}},v={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("section",{staticClass:"section losing-page"},[i("breadcrumb-bar",{attrs:{dataObj:t.local.pageObj}}),t._v(" "),i("div",{staticClass:"container-block"},[i("div",{staticClass:"tile is-ancestor"},[i("div",{staticClass:"tile is-vertical is-12"},[i("div",{staticClass:"tile"},[i("div",{staticClass:"tile is-parent is-vertical is-10"},[i("article",{staticClass:"tile is-child notification"},[i("div",{staticClass:"tile"},[i("div",{staticClass:"tile is-parent is-vertical is-12"},[null!=t.local.all?i("bar-chart",{attrs:{data:t.local.all,height:150}}):t._e()],1)])])]),t._v(" "),i("div",{staticClass:"tile is-parent is-vertical"},[i("article",{staticClass:"tile is-child notification"},[i("div",{staticClass:"search-box container-block flex-center"},[i("div",{staticClass:"block"},[i("button",{staticClass:"button is-link",on:{click:function(a){t.GOTOPAGE("LosingDetail","")}}},[i("i",{staticClass:"fa fa-eye",attrs:{"aria-hidden":"true"}}),t._v("   รายละเอียด ")])])])])])]),t._v(" "),i("div",{staticClass:"tile"},[i("div",{staticClass:"tile is-parent is-vertical is-6"},[i("article",{staticClass:"tile is-child notification"},[i("div",{staticClass:"tile"},[i("div",{staticClass:"tile is-parent is-vertical is-12"},[null!=t.local.ordering?i("bar-chart",{attrs:{data:t.local.ordering,height:150}}):t._e()],1)])])]),t._v(" "),i("div",{staticClass:"tile is-parent is-vertical is-6"},[i("article",{staticClass:"tile is-child notification"},[i("div",{staticClass:"tile"},[i("div",{staticClass:"tile is-parent is-vertical is-12"},[null!=t.local.paying?i("bar-chart",{attrs:{data:t.local.paying,height:150}}):t._e()],1)])])])])])])])],1)},staticRenderFns:[]};var p=i("VU/8")(u,v,!1,function(t){i("tiNw")},null,null);a.default=p.exports},tiNw:function(t,a){}});
//# sourceMappingURL=23.170648a14a4aa55e5411.js.map