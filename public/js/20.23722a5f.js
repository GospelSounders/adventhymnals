(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{4329:function(e,a,t){"use strict";t("4fdb")},4613:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("q-page",{staticClass:"padding q-pa-none"},[e.adventHymnals.wasInstalled?e._e():t("div",[e._v("\n          Downloading Hymnals data\n      ")]),e._v("\n      Updates.vue"),t("br"),e._v("\n      Updates.vue"),t("br"),e._v("\n      Updates.vue"),t("br"),e._v("\n      Updates.vue"),t("br"),e._v("\n      Updates.vue"),t("br"),e._v("\n      Updates.vue"),t("br"),e._v("\n      Updates.vue"),t("br"),e._v("\n      Updates.vue"),t("br")])},s=[],d=t("63bb"),r=t("2a07"),i={name:"updates",components:{hymnalRightSideBar:r["a"]},props:["adventHymnals","sideBarOpener"],data(){return{}},async created(){this.adventHymnals.initUpdates(),this.tabs.includes(hash)&&(this.tab=hash)},watch:{filterSong(e){this.adventHymnals.filterSong(e,this)},tab(e){}},methods:{onExtend(e){e.use(d["a"])},setFilter(e,a){this.filterSong=e,console.log(a),console.log(a),console.log(a,e),this.adventHymnals.filterBy=a}},computed:{rightSideBarSize(){return this.$q.screen.lt.xs||this.$q.screen.lt.sm||this.$q.screen.lt.md?document.getElementsByTagName("body")[0].clientWidth:.75*document.getElementsByTagName("body")[0].clientWidth},cardContainerClass(){if(this.$q.screen.gt.xs)return"grid-masonry grid-masonry--"+(this.$q.screen.gt.sm?"6":"4")}}},l=i,o=(t("4329"),t("2877")),c=t("9989"),u=t("429b"),b=t("7460"),p=t("9c40"),m=t("4e73"),h=t("1c1c"),v=t("66e5"),g=t("4074"),Q=t("0016"),f=t("adad"),y=t("823b"),_=t("eaac"),S=t("27f9"),w=t("db86"),U=t("ddd8"),T=t("f09f"),q=t("a370"),B=t("eb85"),H=t("5096"),$=t("eebe"),C=t.n($),I=Object(o["a"])(l,n,s,!1,null,null,null);a["default"]=I.exports;C()(I,"components",{QPage:c["a"],QTabs:u["a"],QTab:b["a"],QBtn:p["a"],QMenu:m["a"],QList:h["a"],QItem:v["a"],QItemSection:g["a"],QIcon:Q["a"],QTabPanels:f["a"],QTabPanel:y["a"],QTable:_["a"],QInput:S["a"],QTd:w["a"],QSelect:U["a"],QCard:T["a"],QCardSection:q["a"],QSeparator:B["a"],QPageScroller:H["a"]})},"4fdb":function(e,a,t){}}]);