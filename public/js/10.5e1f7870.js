(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"55f9":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-layout",{attrs:{view:"hHh lpR lff"}},[n("q-header",{attrs:{elevated:""}},[n("q-toolbar",[n("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu"},on:{click:function(t){e.leftDrawerOpen=!e.leftDrawerOpen}}}),n("q-toolbar-title",[e._v(" "+e._s(e.projectName)+" ")]),e.enableFullScreen?n("q-btn",{attrs:{flat:"",dense:"",round:"",icon:e.fullscreenIcon,"aria-label":"Menu"},on:{click:e.fullscreen}}):e._e(),n("span",[e._v(" "+e._s(e.userName)),n("br"),e._v(e._s(e.authority)+" ")]),n("q-btn",{attrs:{flat:"",dense:"",round:"",icon:"more_vert","aria-label":"Profile"},on:{click:function(t){e.displaySettingsMenu=!e.displaySettingsMenu}}},[n("q-menu",{attrs:{"content-style":{backgroundColor:"#fff",color:"#737373"}}},[n("q-list",{staticStyle:{"min-width":"100px"}},[n("q-item",{attrs:{clickable:""},on:{click:e.profile}},[n("q-item-section",{attrs:{side:""}},[n("q-icon",{attrs:{color:"primary",name:"person"}})],1),n("q-item-section",[e._v("Profile")])],1),n("q-item",{attrs:{clickable:""},on:{click:e.auditLogs}},[n("q-item-section",{attrs:{side:""}},[n("q-icon",{attrs:{color:"primary",name:"track_changes"}})],1),n("q-item-section",[e._v("Audit Logs")])],1),n("q-item",{attrs:{clickable:""},on:{click:e.logout}},[n("q-item-section",{attrs:{side:""}},[n("q-icon",{attrs:{color:"primary",name:"logout"}})],1),n("q-item-section",[e._v("Logout")])],1)],1)],1)],1)],1),e.loading?n("q-linear-progress",{attrs:{indeterminate:"",color:"negative"}}):e._e()],1),n("q-drawer",{staticClass:"bg-primary",attrs:{bordered:"",breakpoint:1024,"content-class":"bg-primary"},model:{value:e.leftDrawerOpen,callback:function(t){e.leftDrawerOpen=t},expression:"leftDrawerOpen"}},[n("q-list",[e._l(e.adventHymnals.essentialLinks,(function(t){return n("EssentialLink",e._b({key:t.title,staticClass:"text-white"},"EssentialLink",t,!1))})),n("q-separator",{attrs:{color:"white"}}),n("q-item",{staticClass:"text-center text-accent"},[n("q-item-section",["web"===e.adventHymnals.platform?n("p",{staticClass:"q-pa-none q-ma-none pSmall"},[e._v("\n            Built with\n            "),n("a",{staticClass:"no-underline",attrs:{href:"https://csycms.csymapp.com",target:"_blank"}},[n("strong",{staticClass:"text-white"},[e._v("csyms")])]),e._v("\n            - A Flat File CMS for node\n          ")]):e._e(),n("p",{staticClass:"pSmall"},[e._v("\n            Copyright © 2018 - "+e._s((new Date).getFullYear())+"\n            "),n("a",{staticClass:"no-underline",attrs:{href:"https://www.gospelsounders.org",target:"_blank"}},[n("strong",{staticClass:"text-white"},[e._v("Gospel Sounders Ministry")])])])])],1)],2)],1),n("q-page-container",[n("router-view",{attrs:{sideBarOpener:e.sideBarOpener,adventHymnals:e.adventHymnals}})],1)],1)},a=[],l=n("37c0");const r=n("20e6"),i=n("2f1f").default;n("c2a1");var o={name:"adventHymnalsHome",components:{EssentialLink:l["a"]},data(){return{loading:!1,sideBarOpener:this,adventHymnals:i,enableFullScreen:!1,leftDrawerOpen:!1,userName:"",authority:"",projectName:r.LOGO_NAME,routerView:{template:'<p @click="toggleMsg()">Welcome {{ msg }}!</p>',data(){return{msg:"home"}}}}},async created(){i.setVue(this),i.processPathNext=!0},methods:{logout(){window.location.assign("/#/logout")},profile(){window.location.assign("/#/profile")},auditLogs(){window.location.assign("/#/system/audit_logs/"+this.userData.userId+"/logins")},fullscreen(){this.$q.fullscreen.isActive?this.$q.fullscreen.exit().then((()=>{})):this.$q.fullscreen.request().then((()=>{}))},setFullScreenIcon(){this.enableFullScreen&&(this.enableFullScreen=!1,setTimeout((()=>{this.isFullScreen=this.$q.fullscreen.isActive,this.isFullScreen?this.fullscreenIcon="fullscreen_exit":this.fullscreenIcon="fullscreen",this.enableFullScreen=!0}),100))}},watch:{"$q.fullscreen.isActive"(e){this.isFullScreen=this.$q.fullscreen.isActive,this.isFullScreen?this.fullscreenIcon="fullscreen_exit":this.fullscreenIcon="fullscreen"},$route(e,t){}}},c=o,u=(n("e376"),n("2877")),m=n("4d5a"),f=n("e359"),p=n("65c6"),d=n("9c40"),h=n("6ac5"),g=n("4e73"),q=n("1c1c"),b=n("66e5"),w=n("4074"),v=n("0016"),_=n("6b1d"),y=n("9404"),k=n("eb85"),S=n("09e3"),Q=n("eebe"),C=n.n(Q),F=Object(u["a"])(c,s,a,!1,null,null,null);t["default"]=F.exports;C()(F,"components",{QLayout:m["a"],QHeader:f["a"],QToolbar:p["a"],QBtn:d["a"],QToolbarTitle:h["a"],QMenu:g["a"],QList:q["a"],QItem:b["a"],QItemSection:w["a"],QIcon:v["a"],QLinearProgress:_["a"],QDrawer:y["a"],QSeparator:k["a"],QPageContainer:S["a"]})},c59f:function(e,t,n){},e376:function(e,t,n){"use strict";n("c59f")}}]);