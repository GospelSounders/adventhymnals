(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[21],{"8b24":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("q-page",{staticClass:"flex flex-center",staticStyle:{position:"fixed",top:"0px",width:"100%","z-index":"100"}},[n("img",{attrs:{alt:e.sysValues.PROJECT.toLowerCase(),src:a("6e23")("./"+e.sysValues.PROJECT.toLowerCase()+"/csysteminfo.png")}})]),n("div",{staticClass:"q-ma-none absolute-top-right",staticStyle:{"z-index":"1001"}},[n("q-select",{staticClass:"q-ma-none q-pa-none bg-reen",attrs:{filled:"",options:e.langs,label:"Language","lazy-rules":"",rules:[function(e){return e&&e.length>0||"Please select a language"}]},on:{input:e.changeLang},model:{value:e.lang,callback:function(t){e.lang=t},expression:"lang"}})],1),n("q-page",{staticClass:"flex flex-center",staticStyle:{position:"absolute",top:"0px",width:"100%","z-index":"1000"}},[e.checkedLoggedIn&&!e.loggedIn?n("authForms"):e._e()],1)],1)},s=[],l=(a("cf57"),a("07de"));const o=a("c2a1").default,i=a("ea76").default,c=(a("1712").to,a("20e6"));var g={name:"PageIndex",components:{authForms:l["a"]},data(){return{translate:i.translate,checkedLoggedIn:!1,loggedIn:!1,sysValues:c,lang:"",langs:[]}},async created(){this.lang=i.getLang(),this.langs=i.listLangs(),o.setSettings({TBURL:c["TB_URL"]}),o.setVue(this),this.checkedLoggedIn=!0},methods:{changeLang(){let e=this.lang;i.setLang(e),window.location.reload()}}},d=g,r=a("2877"),u=a("9989"),p=a("ddd8"),h=a("eebe"),f=a.n(h),x=Object(r["a"])(d,n,s,!1,null,null,null);t["default"]=x.exports;f()(x,"components",{QPage:u["a"],QSelect:p["a"]})}}]);