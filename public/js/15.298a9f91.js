(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{"36ef":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",{staticClass:"padding q-pa-none"},[!1!==e.adventHymnals.openHymnalSection?n("div",[n("q-tabs",{staticClass:"bg-accent",attrs:{align:"left","no-caps":""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[n("q-tab",{attrs:{name:"indices"}},[n("q-btn",{attrs:{flat:"",dense:"",icon:"more_vert","aria-label":"Indices",label:e.adventHymnals.selectedHymnalObj.abbvr,"no-caps":""}},[n("q-menu",{attrs:{"auto-close":"","content-style":{backgroundColor:"#fff",color:"#737373"}}},[n("q-list",{staticStyle:{"min-width":"100px"}},[n("q-item",{attrs:{clickable:""},on:{click:function(t){return e.adventHymnals.selectAnotherHymnal("All")}}},[n("q-item-section",{attrs:{side:""}},[n("q-icon",{attrs:{color:"primary",name:"library_books"}})],1),n("q-item-section",[e._v("All Hymnals")])],1),e._l(e.adventHymnals.hymnals.filter((function(t){return t.abbvr!==e.adventHymnals.selectedHymnalObj.abbvr&&void 0!==t.link})),(function(t){return n("q-item",{key:t.name,attrs:{clickable:""},on:{click:function(n){return e.adventHymnals.selectAnotherHymnal(t.abbvr)}}},[n("q-item-section",{attrs:{side:""}},[n("q-icon",{attrs:{color:"primary",name:"music_note"}})],1),n("q-item-section",[e._v(e._s(t.abbvr))])],1)}))],2)],1)],1)],1),n("q-tab",{attrs:{name:"info",label:"Info"}}),n("q-tab",{attrs:{name:"about",label:"About"}}),n("q-tab",{attrs:{name:"download",label:"Print"}})],1),n("q-tab-panels",{staticClass:"bg-transparent q-ma-none full-width q-pa-none",attrs:{animated:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[n("q-tab-panel",{staticClass:"q-ma-none q-pa-none",attrs:{name:"indices"}},[n("q-tabs",{staticClass:"bg-secondary",attrs:{align:"left","no-caps":""},model:{value:e.adventHymnals.tab,callback:function(t){e.$set(e.adventHymnals,"tab",t)},expression:"adventHymnals.tab"}},[n("q-tab",{attrs:{name:"titles",label:"Titles"}}),n("q-tab",{attrs:{name:"tunes",label:"Tunes"}}),n("q-tab",{attrs:{name:"poets",label:"Poets"}})],1),n("q-tab-panels",{staticClass:"bg-transparent q-ma-none full-width q-pa-none",attrs:{animated:""},model:{value:e.adventHymnals.tab,callback:function(t){e.$set(e.adventHymnals,"tab",t)},expression:"adventHymnals.tab"}},[n("q-tab-panel",{staticClass:"q-ma-none q-pa-none q-markdown--table",attrs:{name:"titles"}},[n("q-table",{staticClass:"bg-transparent col hymnalSection q-pa-md",attrs:{data:e.adventHymnals.allHymnalsObj[e.adventHymnals.selectedHymnalObj.abbvr].indices,columns:"All"===e.adventHymnals.selectedHymnalObj.abbvr?e.hColumn.concat(e.titlesColumns):e.titlesColumns,"visible-columns":[],"filter-method":e.adventHymnals.filterSongFunc,filter:e.filterSong},scopedSlots:e._u([{key:"top",fn:function(){return[n("q-input",{staticClass:"col-12",attrs:{dense:"",debounce:"300",placeholder:"Search Title/First Line"},on:{keyup:function(t){e.adventHymnals.filterBy=!1}},scopedSlots:e._u([{key:"append",fn:function(){return[n("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!1,4009527860),model:{value:e.filterSong,callback:function(t){e.filterSong=t},expression:"filterSong"}})]},proxy:!0},{key:"body-cell-number",fn:function(t){return[n("q-td",{staticClass:"cursor-pointer",attrs:{props:t},on:{click:function(n){return e.adventHymnals.selectSong(t.row,t.row)}}},[e._v("\n                    "+e._s(t.row.number)+"\n                  ")])]}},{key:"body-cell-title",fn:function(t){return[n("q-td",{staticClass:"cursor-pointer",attrs:{props:t},on:{click:function(n){return e.adventHymnals.selectSong(t.row,t.row)}}},[e._v("\n                    "+e._s(t.row.title)+"\n                  ")])]}},{key:"body-cell-key",fn:function(t){return[n("q-td",{staticClass:"cursor-pointer",attrs:{props:t},on:{click:function(n){return e.setFilter(t.row.key,"key")}}},[e._v("\n                    "+e._s(t.row.key)+"\n                  ")])]}}],null,!1,1759789071)})],1),n("q-tab-panel",{staticClass:"q-ma-none q-pa-none q-markdown--table",attrs:{name:"tunes"}},[n("q-table",{staticClass:"bg-transparent col hymnalSection q-pa-md",attrs:{data:e.adventHymnals.allHymnalsObj[e.adventHymnals.selectedHymnalObj.abbvr].indices,columns:"All"===e.adventHymnals.selectedHymnalObj.abbvr?e.hColumn.concat(e.tunesColumns):e.tunesColumns,"filter-method":e.adventHymnals.filterSongFunc,filter:e.filterSong},scopedSlots:e._u([{key:"top",fn:function(){return[n("q-input",{staticClass:"col-12",attrs:{dense:"",debounce:"300",placeholder:"Search Tune"},on:{keyup:function(t){e.adventHymnals.filterBy=!1}},scopedSlots:e._u([{key:"append",fn:function(){return[n("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!1,4009527860),model:{value:e.filterSong,callback:function(t){e.filterSong=t},expression:"filterSong"}})]},proxy:!0},{key:"body-cell-tune",fn:function(t){return[n("q-td",{staticClass:"cursor-pointer",attrs:{props:t},on:{click:function(n){return e.setFilter(t.row.tune,"tune")}}},[e._v("\n                    "+e._s(t.row.tune)+"\n                  ")])]}},{key:"body-cell-metrical",fn:function(t){return[n("q-td",{staticClass:"cursor-pointer",attrs:{props:t},on:{click:function(n){return e.setFilter(t.row.metrical,"metrical")}}},[e._v("\n                    "+e._s(t.row.metrical)+"\n                  ")])]}}],null,!1,380875189)})],1),n("q-tab-panel",{staticClass:"q-ma-none q-pa-none",attrs:{name:"poets"}},[n("q-table",{staticClass:"bg-transparent col hymnalSection q-pa-md",attrs:{data:e.adventHymnals.allHymnalsObj[e.adventHymnals.selectedHymnalObj.abbvr].indices,columns:"All"===e.adventHymnals.selectedHymnalObj.abbvr?e.hColumn.concat(e.poetColumns):e.poetColumns,"filter-method":e.adventHymnals.filterSongFunc,filter:e.filterSong},scopedSlots:e._u([{key:"top",fn:function(){return[n("q-input",{staticClass:"col-12",attrs:{dense:"",debounce:"300",placeholder:"Search Poet"},on:{keyup:function(t){e.adventHymnals.filterBy=!1}},scopedSlots:e._u([{key:"append",fn:function(){return[n("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!1,4009527860),model:{value:e.filterSong,callback:function(t){e.filterSong=t},expression:"filterSong"}})]},proxy:!0},{key:"body-cell-poet",fn:function(t){return[n("q-td",{staticClass:"cursor-pointer",attrs:{props:t},on:{click:function(n){return e.setFilter(t.row.poet,"poet")}}},[e._v("\n                    "+e._s(t.row.poet)+"\n                  ")])]}},{key:"body-cell-year",fn:function(t){return[n("q-td",{staticClass:"cursor-pointer",attrs:{props:t},on:{click:function(n){return e.setFilter(t.row.year,"year")}}},[e._v("\n                    "+e._s(t.row.year)+"\n                  ")])]}}],null,!1,817558289)})],1)],1)],1),n("q-tab-panel",{staticClass:"q-ma-none q-pt-none q-pl-sm q-pr-sm",attrs:{name:"info"}},[n("q-markdown",{staticClass:"absolute-top"},[e._v("\n            | | | |------| -----------| | Name|\n            "+e._s(e.adventHymnals.selectedHymnalObj.name)+" | |Abbreviation|\n            "+e._s(e.adventHymnals.selectedHymnalObj.abbvr)+" | | Year |\n            "+e._s(e.adventHymnals.selectedHymnalObj.year)+" | | Language |\n            "+e._s(e.adventHymnals.selectedHymnalObj.longLangName)+" | | Compiler |\n            "+e._s(e.adventHymnals.selectedHymnalObj.compiler)+" | | No. Songs |\n            "+e._s(e.adventHymnals.selectedHymnalObj.numSongs)+" | | Available |\n            "+e._s(void 0!==e.adventHymnals.selectedHymnalObjlink?"Yes":"No")+"\n            |\n          ")])],1),n("q-tab-panel",{staticClass:"q-ma-none q-pa-sm",attrs:{name:"about"}},[!1!==e.adventHymnals.preface?n("q-markdown",{staticClass:"absolute-top"},[e._v("\n            "+e._s(e.adventHymnals.preface)+"\n          ")]):e._e(),!1===e.adventHymnals.preface?n("q-page",[n("div",{staticClass:"absolute-center text-center"},[n("p",{staticClass:"text-center"},[e._v("\n                Maybe its our fault that there is still nothing here. But we are\n                very hard at work, on it.\n              ")])])]):e._e()],1),n("q-tab-panel",{staticClass:"q-ma-none q-pa-sm",attrs:{name:"download"}},[n("q-markdown",[e._v("\n          "+e._s(e.adventHymnals.printData)+"\n          ")])],1)],1)],1):e._e(),e.adventHymnals.openHymnalSection?e._e():n("q-table",{attrs:{grid:"","card-container-class":e.cardContainerClass,data:e.adventHymnals.hymnals,columns:e.adventHymnals.hymnalColumns,title:Object.values(e.adventHymnals.hymnals).map((function(e){return parseInt(e.numSongs)})).reduce((function(e,t){return e+t||0}),0)+" songs in "+Object.keys(e.adventHymnals.languages).length+" languages ",filter:e.adventHymnals.hymnalFilter,"row-key":"name","hide-header":"","hide-bottom":"","rows-per-page-options":[0]},on:{"row-click":e.adventHymnals.selectHymnal},scopedSlots:e._u([{key:"top-left",fn:function(){return[n("div",{staticClass:"flex"},[n("q-select",{attrs:{"use-input":"",filled:"",options:Object.values(e.adventHymnals.languagesToSelect).map((function(e){return e.name})),label:"language"},on:{input:e.adventHymnals.selectLanguage},scopedSlots:e._u([{key:"prepend",fn:function(){return[n("div",[e._v("\n                "+e._s(Object.values(e.adventHymnals.hymnals).map((function(e){return parseInt(e.numSongs)})).reduce((function(e,t){return e+t||0}),0))+"\n                songs in\n              ")])]},proxy:!0}],null,!1,3411954905),model:{value:e.adventHymnals.language,callback:function(t){e.$set(e.adventHymnals,"language",t)},expression:"adventHymnals.language"}}),n("q-select",{attrs:{"use-input":"",filled:"",options:Object.values(e.adventHymnals.hymnals).map((function(e){return e.name})).sort((function(e,t){return e>t?-1:0})).concat(e.adventHymnals.hymnalToSelect).reverse(),label:"Hymnal"},on:{input:e.adventHymnals.selectHymnal},model:{value:e.adventHymnals.hymnalToSelect,callback:function(t){e.$set(e.adventHymnals,"hymnalToSelect",t)},expression:"adventHymnals.hymnalToSelect"}})],1)]},proxy:!0},{key:"top-right",fn:function(){return[n("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},model:{value:e.adventHymnals.hymnalFilter,callback:function(t){e.$set(e.adventHymnals,"hymnalFilter",t)},expression:"adventHymnals.hymnalFilter"}},[n("q-icon",{attrs:{slot:"append",name:"search"},slot:"append"})],1),n("q-btn",{attrs:{flat:""}},[n("q-icon",{attrs:{color:"primary",name:"refresh",side:""},on:{click:function(t){return e.adventHymnals.fetchHymnals()}}})],1)]},proxy:!0},{key:"item",fn:function(t){return[n("div",{staticClass:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition cursor-pointer",style:t.selected?"z-index:2;height:400px;":"transform: scale(0.99);height:400px;",on:{click:function(n){return e.adventHymnals.selectHymnal(t.row.siteName||t.row.name)}}},[n("q-card",{class:"bg-secondary text-white full-width"},[n("q-btn",{ref:"expand-"+t.row.name,staticClass:"absolute-top-right q-ma-sm",class:t.selected?"bg-red":"bg-secondary",staticStyle:{"z-index":"5"},attrs:{dense:"",icon:t.selected?"close":"fullscreen","aria-label":"Menu"}}),n("q-card-section",{staticClass:"text-center"},[n("div",{staticClass:"absolute-top-left q-ma-sm text-black text-bold text-italic",staticStyle:{opacity:"0.5"}},[e._v("\n                "+e._s(t.row.lang)+"\n              ")]),e._v("\n              "+e._s(t.row.siteName||t.row.name)),n("br"),e._v("\n              "+e._s(t.row.year)+"\n            ")]),n("q-separator"),n("q-card-section",{staticClass:"q-ma-none q-pa-none bg-accent text-black full-width",staticStyle:{position:"relative"}},[n("q-markdown",{staticClass:"absolute-top"},[e._v("\n                | | | | ------| -----------| | Name| "+e._s(t.row.name)+" | |\n                Abbreviation| "+e._s(t.row.abbvr)+" | | Year |\n                "+e._s(t.row.year)+" | | Language |\n                "+e._s(t.row.longLangName)+" | | Compiler |\n                "+e._s(t.row.compiler)+" | | No. Songs |\n                "+e._s(t.row.numSongs)+" | | Available |\n                "+e._s(void 0!==t.row.link?"Yes":"No")+" |\n              ")])],1)],1)],1)]}}],null,!1,3679690516)}),n("q-page-scroller",{attrs:{position:"bottom-right","scroll-offset":150,offset:[18,18]}},[n("q-btn",{attrs:{fab:"",icon:"keyboard_arrow_up",color:"secondary"}})],1),e.adventHymnals.hymnSidebar?n("hymnalRightSideBar",{attrs:{adventHymnals:e.adventHymnals}}):e._e()],1)},s=[],l=(n("5319"),n("63bb")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-drawer",{staticClass:"bg-primary",attrs:{bordered:"",side:"right",width:e.rightSideBarSize,overlay:"",breakpoint:2,behavior:"desktop"},model:{value:e.adventHymnals.rightSidebarOpen,callback:function(t){e.$set(e.adventHymnals,"rightSidebarOpen",t)},expression:"adventHymnals.rightSidebarOpen"}},[e.adventHymnals.loading?n("q-linear-progress",{attrs:{indeterminate:"",color:"negative"}}):e._e(),n("div",[n("q-toolbar",{staticClass:"bg-primary text-white"},[n("q-toolbar-title",{staticClass:"q-mt-md q-ml-md text-center",style:e.hymnFontSize},[n("span",{staticClass:"text-caption",staticStyle:{"font-size":"0.4em"}},[e._v(e._s(e.adventHymnals.selectedSong.hymnal.shortname)+"\n          ")]),n("span",{staticClass:"text-weight-bold q-pt-lg",staticStyle:{"font-size":"0.8em"}},[e._v(e._s(e.adventHymnals.selectedSong.showTitle))]),n("br"),n("span",{staticClass:"text-caption",staticStyle:{"font-size":"0.8em"}},[e._v(e._s(e.adventHymnals.selectedSong.hymnal.name))])]),n("q-btn",{staticClass:"bg-red",attrs:{flat:"",round:"",dense:"",icon:"close"},on:{click:e.closeSelf}})],1),n("q-tabs",{attrs:{align:"left","no-caps":""},model:{value:e.adventHymnals.songTab,callback:function(t){e.$set(e.adventHymnals,"songTab",t)},expression:"adventHymnals.songTab"}},[n("q-tab",{attrs:{name:"text",label:"Text"}}),n("q-tab",{attrs:{name:"sheet",label:"Sheet Music"}}),n("q-tab",{attrs:{name:"syllables",label:"Syllables"}})],1),n("q-tab-panels",{staticClass:"bg-accent q-ma-none full-width q-pa-none",attrs:{animated:""},model:{value:e.adventHymnals.songTab,callback:function(t){e.$set(e.adventHymnals,"songTab",t)},expression:"adventHymnals.songTab"}},[n("q-tab-panel",{staticClass:"q-ma-none q-pa-none",attrs:{name:"text"}},[n("q-card",{staticClass:"text-center",attrs:{flat:""}},[n("q-card-section",{style:e.fontSizeStr},[n("q-markdown",{attrs:{"show-copy":""}},[e._v("\n|  |\n|:------:|\n|"+e._s(e.adventHymnals.selectedLyrics)+"|\n              ")])],1)],1),n("q-page-sticky",{staticClass:"q-gutter-xs q-ma-sm",staticStyle:{"z-index":"3"},attrs:{position:"bottom-left",offset:[18,18]}},[n("q-fab",{attrs:{icon:"settings",fab:"",color:"secondary",direction:"up"}},[n("q-fab-action",{attrs:{color:"secondary",icon:"zoom_in",fab:""},on:{click:function(t){return e.fontSizeF(.25)}}}),n("q-fab-action",{attrs:{color:"secondary",icon:"crop_free",fab:""},on:{click:function(t){return e.fontSizeF()}}}),n("q-fab-action",{attrs:{color:"secondary",icon:"zoom_out",fab:""},on:{click:function(t){return e.fontSizeF(-.25)}}})],1)],1)],1),n("q-tab-panel",{staticClass:"q-ma-none q-pa-none",attrs:{name:"sheet"}},[e._v("Under Construction")]),n("q-tab-panel",{staticClass:"q-ma-none q-pa-none",attrs:{name:"syllables"}},[e._v("Under Construction")])],1)],1)],1)},r=[],i={name:"hymnalRightSideBar",props:["adventHymnals"],created(){let e=window.localStorage.getItem("AH-fontSize");e?this.fontSize=parseFloat(e):this.$q.screen.lt.xs?this.fontSize=.5:this.$q.screen.lt.sm?this.fontSize=1.5:(this.$q.screen.lt.md,this.fontSize=3),this.initFontSize()},components:{},data(){return{fontSizeStr:"font-size:1em;",fontSize:1}},methods:{closeSelf(){this.adventHymnals.rightSidebarOpen=!1},initFontSize(){this.fontSizeStr=`font-size:${this.fontSize}em;`},fontSizeF(e){e?this.fontSize+=e:this.fontSize=1,window.localStorage.setItem("AH-fontSize",this.fontSize),this.fontSizeStr=`font-size:${this.fontSize}em;`}},computed:{hymnFontSize(){return this.$q.screen.lt.xs?"font-size:0.5em; font-weight: bold;":this.$q.screen.lt.sm?"font-size:1.5em; font-weight: bold;":(this.$q.screen.lt.md,"font-size:3em; font-weight: bold;")},rightSideBarSize(){return this.$q.screen.lt.xs||this.$q.screen.lt.sm||this.$q.screen.lt.md?document.getElementsByTagName("body")[0].clientWidth:.75*document.getElementsByTagName("body")[0].clientWidth}}},c=i,m=n("2877"),d=n("9404"),u=n("6b1d"),b=n("65c6"),y=n("6ac5"),p=n("9c40"),f=n("429bb"),v=n("7460"),h=n("adad"),q=n("823b"),g=n("f09f"),H=n("a370"),S=n("de5e"),_=n("c294"),k=n("72db"),w=n("eebe"),C=n.n(w),x=Object(m["a"])(c,o,r,!1,null,null,null),z=x.exports;C()(x,"components",{QDrawer:d["a"],QLinearProgress:u["a"],QToolbar:b["a"],QToolbarTitle:y["a"],QBtn:p["a"],QTabs:f["a"],QTab:v["a"],QTabPanels:h["a"],QTabPanel:q["a"],QCard:g["a"],QCardSection:H["a"],QPageSticky:S["a"],QFab:_["a"],QFabAction:k["a"]});var T={name:"hymnal",components:{hymnalRightSideBar:z},props:["adventHymnals","sideBarOpener"],data(){return{tab:"indices",filterSong:"",tabs:this.adventHymnals.hymnalActions,indexTab:"titles",hColumn:[{required:!0,name:"h",label:"Hymnal",sortable:!0,field:"h"}],titlesColumns:[{name:"number",required:!0,label:"#",sortable:!0,field:"number",sort:(e,t)=>t-e},{name:"title",required:!0,label:"Title",sortable:!0,field:"title",align:"left"},{name:"key",required:!0,label:"Key",sortable:!0,field:"key",align:"left"}],tunesColumns:[{name:"number",required:!0,label:"#",sortable:!0,field:"number",sort:(e,t)=>t-e},{name:"tune",required:!0,label:"Tune",sortable:!0,field:"tune",align:"left"},{name:"metrical",required:!0,label:"Metrical Pattern",sortable:!0,field:"metrical"}],poetColumns:[{name:"number",required:!0,label:"#",sortable:!0,field:"number",sort:(e,t)=>t-e},{name:"poet",required:!0,label:"Poet",sortable:!0,field:"poet",align:"left"},{name:"year",required:!0,label:"Year",sortable:!0,field:"year"}]}},async created(){this.adventHymnals.processPathNext=!0,await this.adventHymnals.fetchHymnals();let e=window.location.pathname.replace(/\/[^\/]*\//,"");if(e="download"){this.tab="indices";let t=setInterval((()=>{this.adventHymnals.loading=!0,this.adventHymnals.selectedHymnalObj.abbvr&&(this.adventHymnals.loading=!1,clearInterval(t),this.tab=e)}),1e3)}else this.tabs.includes(e)&&(this.tab=e)},watch:{filterSong(e){this.adventHymnals.filterSong(e,this)},tab(e){"download"===e&&this.adventHymnals.downloadHymnal()}},methods:{onExtend(e){e.use(l["a"])},setFilter(e,t){this.filterSong=e,console.log(t),console.log(t),console.log(t,e),this.adventHymnals.filterBy=t}},computed:{rightSideBarSize(){return this.$q.screen.lt.xs||this.$q.screen.lt.sm||this.$q.screen.lt.md?document.getElementsByTagName("body")[0].clientWidth:.75*document.getElementsByTagName("body")[0].clientWidth},cardContainerClass(){if(this.$q.screen.gt.xs)return"grid-masonry grid-masonry--"+(this.$q.screen.gt.sm?"6":"4")}}},Q=T,O=(n("a1f4"),n("9989")),j=n("4e73"),$=n("1c1c"),F=n("66e5"),B=n("4074"),A=n("0016"),N=n("eaac"),P=n("27f9"),I=n("db86"),L=n("ddd8"),E=n("eb85"),M=n("5096"),Y=Object(m["a"])(Q,a,s,!1,null,null,null);t["default"]=Y.exports;C()(Y,"components",{QPage:O["a"],QTabs:f["a"],QTab:v["a"],QBtn:p["a"],QMenu:j["a"],QList:$["a"],QItem:F["a"],QItemSection:B["a"],QIcon:A["a"],QTabPanels:h["a"],QTabPanel:q["a"],QTable:N["a"],QInput:P["a"],QTd:I["a"],QSelect:L["a"],QCard:g["a"],QCardSection:H["a"],QSeparator:E["a"],QPageScroller:M["a"]})},a1f4:function(e,t,n){"use strict";n("c8d3")},c8d3:function(e,t,n){}}]);