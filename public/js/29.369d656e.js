(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[29],{"4ad2":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-page",{staticClass:"padding bg-grey-1"},[a("breadcrumbs",{attrs:{links:e.links}}),e.loaded?a("q-table",{attrs:{grid:"","card-container-class":e.cardContainerClass,data:e.list,columns:e.columns,title:"System",filter:e.filter,"row-key":"name","hide-header":"","hide-bottom":"","rows-per-page-options":[0]},scopedSlots:e._u([{key:"top-right",fn:function(){return[a("q-space"),a("q-input",{attrs:{dense:"",debounce:"300",placeholder:"Search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}},[a("q-icon",{attrs:{slot:"append",name:"search"},slot:"append"})],1)]},proxy:!0},{key:"item",fn:function(t){return[a("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4"},[a("q-card",{staticClass:"bg-white"},[a("q-card-section",{staticClass:"text-left text-h6"},[a("strong",[e._v(e._s(t.row.name))])]),a("q-card-section",{staticClass:"flex flex-center"},[a("q-card",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"bg-primary cursor-pointer q-hoverable",staticStyle:{width:"80vw"},on:{click:function(a){return e.selectApplication(t.row.link)}}},[a("q-card-section",{staticClass:"text-center"},[a("q-icon",{staticStyle:{"font-size":"6em"},attrs:{name:t.row.icon,color:"white"}})],1),a("q-card-section",{staticClass:"flex flex-center text-white"},[a("div",[e._v(e._s(t.row.description))])])],1)],1)],1)],1)]}}],null,!1,1906080370)}):e._e()],1)},i=[],n=(a("ddb0"),a("cf57"),a("310f")),r=a("2cbd");const c=a("c2a1").default,o=a("1712").to,l=a("0924").default,d=a("20e6");var p={name:"systemPage",components:{loginForm:n["a"],breadcrumbs:r["a"]},data(){return{loaded:!1,links:[{label:"Settings",icon:"settings",to:"system"}],checkedLoggedIn:!1,userData:{},loggedIn:!1,list:[],filter:"",columns:[{name:"name",label:"Name",field:"name"},{name:"description",label:"Description",field:"description"},{name:"icon",label:"Icon",field:"icon"}]}},async created(){c.setSettings({TBURL:d["TB_URL"]}),c.setSettings(d),c.setVue(this),c.showLoading();let[e,t]=await o(c.readUserData());this.userData=t,this.list=l.home.filter((e=>{if("System Tools"===e.name)return!0})).map((e=>e.children))[0];let a=[];try{this.userData.organizations.map((e=>{a.includes(e.authority)||a.push(e.authority)}))}catch(s){}a.push(this.userData.authority),this.list=this.list.filter((e=>{let t=e.authorities;return t.some((e=>a.includes(e)))})),c.hideLoading(),this.loaded=!0},methods:{selectApplication(e){window.location.assign(e)}},computed:{cardContainerClass(){if(this.$q.screen.gt.xs)return"grid-masonry grid-masonry--"+(this.$q.screen.gt.sm?"6":"4")}}},u=p,m=a("2877"),h=a("9989"),f=a("eaac"),g=a("2c91"),b=a("27f9"),w=a("0016"),y=a("f09f"),q=a("a370"),x=a("714f"),C=a("eebe"),v=a.n(C),k=Object(m["a"])(u,s,i,!1,null,null,null);t["default"]=k.exports;v()(k,"components",{QPage:h["a"],QTable:f["a"],QSpace:g["a"],QInput:b["a"],QIcon:w["a"],QCard:y["a"],QCardSection:q["a"]}),v()(k,"directives",{Ripple:x["a"]})}}]);