(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[26],{6758:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-ma-none q-pa-none"},[a("q-card",{staticClass:"bg-transparent",attrs:{flat:"",square:""}},[a("q-card-section",{attrs:{clas:"bg-green"}},[a("q-tabs",{staticClass:"q-ma-none q-pa-none",attrs:{align:"left"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab",{attrs:{name:"html",label:"HTML"}}),a("q-tab",{attrs:{name:"htmlSaved",label:"HTML (Saved)"}})],1)],1),a("q-card-section",[a("q-tab-panels",{staticClass:"bg-transparent q-ma-none q-pa-none full-width q-pa-none",model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab-panel",{staticClass:"bg-transparent q-ma-none q-pa-none",attrs:{name:"html"}},[a("div",[a("q-radio",{attrs:{val:"HfPF",label:"Hymns for the Poor of the Flock"},on:{input:e.loadOriginalHTMLFile},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),a("q-radio",{attrs:{val:"HT1876",label:"HT1876"},on:{input:e.loadOriginalHTMLFile},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),a("q-radio",{attrs:{val:"HT1869",label:"HT1869"},on:{input:e.loadOriginalHTMLFile},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}})],1),a("div",[a("q-checkbox",{attrs:{label:"Image"},model:{value:e.enabledItem.img,callback:function(t){e.$set(e.enabledItem,"img",t)},expression:"enabledItem.img"}}),a("q-checkbox",{attrs:{label:"Extracted"},model:{value:e.enabledItem.extracted,callback:function(t){e.$set(e.enabledItem,"extracted",t)},expression:"enabledItem.extracted"}}),a("q-checkbox",{attrs:{label:"Editor"},model:{value:e.enabledItem.editor,callback:function(t){e.$set(e.enabledItem,"editor",t)},expression:"enabledItem.editor"}}),a("q-checkbox",{attrs:{label:"Hymnal Or Image"},model:{value:e.enabledItem.hymnal,callback:function(t){e.$set(e.enabledItem,"hymnal",t)},expression:"enabledItem.hymnal"}}),a("q-input",{attrs:{label:"page number"},on:{focus:e.removeListeners,blur:e.createListeners,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.gotoPage()}},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}}),a("q-input",{attrs:{label:"sectionNumber"},on:{focus:e.removeListeners,blur:e.createListeners},model:{value:e.sectionNumber,callback:function(t){e.sectionNumber=t},expression:"sectionNumber"}}),a("q-btn",{attrs:{label:"AllSongsTogether"},on:{click:e.AllSongsTogether}}),a("q-btn",{attrs:{label:"Process Song"},on:{click:e.ProcessSong}}),a("q-btn",{attrs:{label:"Delete header"},on:{click:e.deleteHeader}}),a("q-checkbox",{attrs:{label:"Remove spaces"},model:{value:e.removeSpaces,callback:function(t){e.removeSpaces=t},expression:"removeSpaces"}}),a("q-btn",{attrs:{label:"\\n[a-z]"},on:{click:e.removeNs1}}),a("q-checkbox",{attrs:{label:"Listeners"},model:{value:e.listenersExist,callback:function(t){e.listenersExist=t},expression:"listenersExist"}}),a("q-btn",{attrs:{label:"Save Prefave"},on:{click:e.savePreface}}),a("q-btn",{attrs:{label:"Save Titles"},on:{click:e.saveTitles}},[a("q-tooltip",[e._v("Save current page (after editting) as index of\n                titles")])],1),a("q-btn",{attrs:{label:"Download"},on:{click:e.createDirStructure}})],1),a("q-splitter",{staticStyle:{height:"100%"},attrs:{limits:[0,1/0]},scopedSlots:e._u([{key:"before",fn:function(){return[e.enabledItem.hymnal?a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.hymnal,expression:"hymnal"}],ref:"textArea",staticStyle:{width:"100%",height:"1000px"},domProps:{value:e.hymnal},on:{focus:e.removeListeners,blur:e.createListeners,input:function(t){t.target.composing||(e.hymnal=t.target.value)}}}):a("img",{staticStyle:{width:"100%"},attrs:{src:e.imageUlr}})]},proxy:!0},{key:"after",fn:function(){return[a("q-splitter",{staticStyle:{height:"100%"},attrs:{limits:[0,1/0]},scopedSlots:e._u([{key:"before",fn:function(){return[a("div",{domProps:{innerHTML:e._s(e.originalHTML)}})]},proxy:!0},{key:"after",fn:function(){return[a("q-page",[a("div",[""!==e.currentSection?a("div",[e._v("\n                        You are working on a\n                        "),a("strong",[e._v(e._s(e.currentSection))])]):e._e()]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.rawHtmlText,expression:"rawHtmlText"}],ref:"textArea",staticStyle:{width:"100%",height:"1000px"},domProps:{value:e.rawHtmlText},on:{mouseup:e.getSel,input:function(t){t.target.composing||(e.rawHtmlText=t.target.value)}}})])]},proxy:!0}]),model:{value:e.splitterModel1,callback:function(t){e.splitterModel1=t},expression:"splitterModel1"}})]},proxy:!0}]),model:{value:e.splitterModel,callback:function(t){e.splitterModel=t},expression:"splitterModel"}})],1),a("q-tab-panel",{staticClass:"bg-transparent q-ma-none q-pa-none",attrs:{name:"htmlSaved"}},[a("div",[a("q-radio",{attrs:{val:"HfPF",label:"Hymns for the Poor of the Flock"},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),a("q-radio",{attrs:{val:"HT1876",label:"HT1876"},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),a("q-radio",{attrs:{val:"HT1869",label:"HT1869"},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}})],1),e._v("\n          "+e._s(e.fileName)+"\n        ")])],1)],1)],1),a("q-page-sticky",{staticClass:"q-gutter-xs q-ma-sm",staticStyle:{"z-index":"3"},attrs:{position:"bottom-left",offset:[18,18]}},[a("q-fab",{attrs:{icon:"settings",fab:"",color:"secondary",direction:"up"}},[a("q-fab-action",{attrs:{color:"secondary",icon:"crop_free",fab:""},on:{click:function(t){return e.fontSizeF()}}}),a("q-fab-action",{attrs:{color:"secondary",icon:"zoom_out",fab:""},on:{click:function(t){return e.fontSizeF(-.25)}}}),a("q-fab-action",{attrs:{color:"secondary",icon:"open_in_browser",fab:""},on:{click:function(t){return e.fontSizeF(.25)}}},[a("q-tooltip",[e._v("Open Saved File")])],1),a("q-fab-action",{attrs:{color:"secondary",icon:"folder_open",fab:""},on:{click:function(t){return e.fontSizeF(.25)}}},[a("q-tooltip",[e._v("Open Original File")])],1)],1)],1)],1)},n=[],i=(a("5319"),a("13d5"),a("ddb0"),a("eee7"),a("1e25"),a("21a6"));a("c4e3");const{to:s}=a("1712"),r=a("bc3a");var o={name:"editor",watch:{listenersExist(e){e?this.createListeners():this.removeListeners()},enabledItem:{handler(e){let{editor:t,extracted:a,img:l}=e;this.splitterModel1=t&&a?50:t?0:a?100:0,this.splitterModel=l?l&&a&&t?30:l&&a||l&&t?50:100:0},deep:!0}},data(){return{sectionNumber:1,listenersExist:!0,removeSpaces:!1,currentSection:"",enabledItem:{img:!0,extracted:!0,editor:!0,hymnal:!0},tab:"html",fileName:"HfPF",originalHTML:"",splitterModel:10,splitterModel1:50,htmlData:"",rawHtmlText:"",imageUlr:"",hymnal:"",page:1,links:{HfPF:"hymns-for-the-poor-of-the-flock",HT1876:"",HT1869:""},fullNames:{HfPF:"Hymns for the Poor of the Flock",HT1876:"",HT1869:""},prefaceTemplate:"\n---\ntitle: hymnalName - Advent Hymnals\nmetadata:\n    description: Advent Hymnals is a master collection of all the hymns sung by adventists as contained in such hymnals as Christ in Song, Church hymnal and Seventh Day adventist hymnal, millenial harp. These are a rich source of church history as well as of music.\n    keywords: hymnalName, advent hymnals, sda hymnals, christ in song, church hymnal, millenial harp, sdah, seventh-day adventist hymnal\n    author: Brian Onang'o\n---\n\n#### Advent Hymnals\n#### hymnalName\n\n## PREFACE.\n",indexTemplate:"\n---\ntitle: Index of Titles - hymnalName\nmetadata:\n    description: |\n        hymnalName - Index of Titles\n    keywords: |\n        hymnalName, adventhymnals, advent hymnals, index\n    author: Brian Onang'o\n---\n\n#### Advent Hymnals\n\n## hymnalName\n\n# Index of Titles\n# | Title                        \n-- |-------------\n"}},created(){this.createListeners(),this.loadOriginalHTMLFile(),this.enabledItem.img=!1,this.$nextTick((()=>this.enabledItem.img=!0))},beforeDestroy(){this.removeListeners()},methods:{AllSongsTogether(){let e=this.rawHtmlText,t=parseInt(this.page);while(t<this.numPages)this.gotoPage(this.page+1),console.log(this.page+1),t++,e+=this.rawHtmlText;this.rawHtmlText=e},saveTitles(){let e=this.rawHtmlText;window.localStorage.setItem(this.fileName+"-Titles",e)},savePreface(){let e=this.rawHtmlText;window.localStorage.setItem(this.fileName+"-Preface",e)},createDirStructure(){let e=window.localStorage.getItem(this.fileName+"-IndexofTitles");e=JSON.parse(e);let t=window.localStorage.getItem(this.fileName+"-numMap");t=JSON.parse(t);let l=Object.keys(e).length,n=this.prefaceTemplate.replace(/hymnalName/g,this.fullNames[this.fileName]),s=window.localStorage.getItem(this.fileName+"-Preface");n+=`\n${s}`;let r={"chapter.md":n.replace(/^\s+|\s+$/g,""),"01.Indices":{"chapter.md":""}},o=1;while(o<=l){let e=o+99;e>l&&(e=l);let t=o.toString(),a=e.toString();while(t.length<l.toString().length)t=`0${t}`;while(a.length<l.toString().length)a=`0${a}`;let n=parseInt(o/100)+2;n=n.toString();while(n.length<2)n=`0${n}`;let i=`${n}.${t}-${a}`;r[i]={"chapter.md":""},o+=100}let c={};for(let a in r){let n=a;if(n.match(/chapter\.md/)||n.match(/01\.Indices/))continue;let i=parseInt(n.replace(/[^\.]*\./,"").replace(/\-.+/,"")),s=i+99;s>l&&(s=l);while(i<s){let n=i+9;n>s&&(n=s);let o=i.toString(),m=n.toString();while(o.length<l.toString().length)o=`0${o}`;while(m.length<l.toString().length)m=`0${m}`;let h=parseInt(i%100/10)+1;h=h.toString();while(h.length<2)h=`0${h}`;let d=`${h}.${o}-${m}`;r[a].children||(r[a].children={}),r[a].children[d]={"chapter.md":""},i--;while(i++<n){h=parseInt(i%10),0===h&&(h=10),h=h.toString();while(h.length<2)h=`0${h}`;let n=e[i].TITLES[0],s=n;n=n.replace(/  /g," ").replace(/ /g,"-").replace(/\?/g,"").replace(/\./g,"");let o=`${h}.${n}`;r[a].children[d].children||(r[a].children[d].children={});let m="/"+a.replace(/[^\.]*\./,"")+"/"+d.replace(/[^\.]*\./,"")+"/"+o,g=t[i],p=g.split(".")[0],f=g.split(".")[1];while(f.length<l.toString().length)f=`0${f}`;c[`${p} - ${f}`]=`[${s}](${m})`;let u=window.localStorage.getItem(this.fileName+`-song-${i}`)||"";r[a].children[d].children[o]={"docs.md":u}}}}let m=this.indexTemplate.replace(/hymnalName/g,this.fullNames[this.fileName]),h="";for(let a in c)h+=`${a}|${c[a]}\n`;function d(e=[],t=1){const a=Number.isSafeInteger(t)&&t>0;if(!a)throw new RangeError("n must be a positive integer");const l=[];for(let n=0;n<e.length;n+=t){const a=e.slice(n,n+t);l.push(a)}return l}m+=`${h}`,r["01.Indices"]["chapter.md"]=m.replace(/^\s+|\s+$/g,"");let g=h.replace(/^\s+|\s+$/g,"").split(/\n/),p=d(g,10),f=d(g,100);m=this.indexTemplate.replace(/hymnalName/g,this.fullNames[this.fileName]),console.log(f),console.log(p),console.log("========="),console.log("========="),console.log("=========");const u=a("c4e3");var b=new u;for(let a in r){let e="";if(["chapter.md","docs.md"].includes(a)){let t=a,l=r[a];b.file(`${e}/${t}`,l.replace(/^\s+|\s+$/g,""))}else{let e=a;for(let t in r[a])if(["chapter.md","docs.md"].includes(t)){let l=t,n="";if("chapter.md"!==t||e.includes("01.Indices"))n=r[a][t];else{let e=f.shift();n=m;for(let t in e)n+=`${t}|${e[t]}\n`}b.file(`${e}/${l}`,n.replace(/^\s+|\s+$/g,""))}else{let l=e;"children"!==t&&(l=`${l}/${t}`);for(let n in r[a][t])if(["chapter.md","docs.md"].includes(n)){let e=n,i="";i=r[a][t][n],b.file(`${l}/${e}`,i)}else{let i=l;"children"!==n&&(i=`${i}/${n}`);for(let l in r[a][t][n])if(["chapter.md","docs.md"].includes(l)){let s=l,o="";if("chapter.md"!==l||e.includes("01.Indices"))o=r[a][t][n][l];else{let e=p.shift();o=m;for(let t in e)o+=`${t}|${e[t]}\n`}b.file(`${i}/${s}`,o.replace(/^\s+|\s+$/g,""))}else{let e=i;"children"!==l&&(e=`${e}/${l}`);for(let i in r[a][t][n][l])if(["chapter.md","docs.md"].includes(i)){let s=i,o=r[a][t][n][l][i];b.file(`${e}/${s}`,o.replace(/^\s+|\s+$/g,""))}else{let s=e;"children"!==i&&(s=`${s}/${i}`);for(let e in r[a][t][n][l][i])if(["chapter.md","docs.md"].includes(e)){let o=e,c=r[a][t][n][l][i][e];b.file(`${s}/${o}`,c.replace(/^\s+|\s+$/g,""))}}}}}}}b.generateAsync({type:"blob"}).then((e=>{Object(i["saveAs"])(e,`${this.links[this.fileName]}.zip`)}))},ProcessSong(){let e="\n---\ntitle: |\n    songNumber songTitle - hymnalName\nmetadata:\n    description: |\n        hymnalName songNumber. songTitle. firstStanza \n    keywords:  |\n        hymnalName, adventhymnals, advent hymnals, songTitle, firstLine, refrainFirstLine\n    author: Brian Onang'o\n---\n\n#### Advent Hymnals\n## songNumber. songTitle\n####  hymnalName\n\n```txt\nsongText\n```\n";e=e.replace(/hymnalName/g,this.fullNames[this.fileName]);let t=this.rawHtmlText;const a=e=>{const t={I:1,V:5,X:10,L:50,C:100,D:500,M:1e3};return[...e].reduce(((e,a,l,n)=>t[n[l+1]]>t[a]?e-t[a]:e+t[a]),0)};t=t.replace(/^[ ]*[\d]+[ ]*\n/g,""),t=t.replace(/\n[ ]*[\d]+[ ]*\n/g,"\n"),t=t.replace(/(\n[1-9])([^\.])/g,((e,t,a)=>`\n${t}.${a}`)),t=t.replace(/^(?!$)M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\./g,((e,t,l)=>(e=e.replace(/\./,""),`### ${a(e)}`))),t=t.replace(/\n(?!$)M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})\./g,((e,t,l)=>(e=e.replace(/\./,"").replace(/\n/,""),`\n### ${a(e)}`))),this.rawHtmlText=t,t=this.rawHtmlText;let l=t.split("###"),n=window.localStorage.getItem(this.fileName+"-numMap"),i=window.localStorage.getItem(this.fileName+"-IndexofTitles");n=JSON.parse(n),i=JSON.parse(i),l.map((t=>{let a=e,l=t.match(/([\d]+)/);if(l){l=l[0];let e,s=l;l=`${this.sectionNumber}.${l}`;for(let t in n)if(n[t]===l){e=t;break}let r=i[e].TITLES[0];s=s.toString();while(s.length<3)s=`0${s}`;let o=t.replace(/^\s+|\s+$/g,"").replace(/[^\n]*\n/,"").replace(/^\s+|\s+$/g,"").split(/\n\n/)[0].replace(/\n/g," ").replace(/[0-9]+\. /,""),c=t.replace(/^\s+|\s+$/g,"").replace(/[^\n]*\n/,"").replace(/^\s+|\s+$/g,"").split(/\n/)[0].replace(/[0-9]+\. /,""),m="";t=t.replace(/^\s+|\s+$/g,"").replace(/[^\n]*\n/,"").replace(/^\s+|\s+$/g,""),a=a.replace(/songNumber/g,s).replace(/songTitle/g,r).replace(/firstStanza/g,o).replace(/refrainFirstLine/g,m).replace(/firstLine/g,c).replace(/songText/g,t),window.localStorage.setItem(this.fileName+`-song-${e}`,a)}}))},processTitles(){let e=this.rawHtmlText.split(/\n/),t={};for(let n in e){let a=e[n],l=a.match(/[\d]+$/);if(l){l=l[0];let e=a.replace(/[^a-z]*[\d]+$/,"");t[l]=e}}let a={},l=this.getHymnal();l.indices||(l.indices={}),l.indices.titles||(l.indices.titles={}),a=l.indices.titles;for(let n in t){let e=n,l=t[n];a[e]||(a[e]=[]),a[e].includes(l)||a[e].push(l)}this.setHymnalText(l),this.saveHymnal()},createTitles(){let e={},t={},a=this.rawHtmlText.split(/\n/),l=0,n=1;a.map(((a,i)=>{let s=a.split(/ /)[0].replace(/^0/g,"");""===s?n++:(e[++l]=`${n}.${s.replace(/^0/g,"").replace(/^0/g,"").replace(/^0/g,"")}`,t[l]={TITLES:[a.replace(/^[^ ]* /,"")]})})),window.localStorage.setItem(this.fileName+"-numMap",JSON.stringify(e)),window.localStorage.setItem(this.fileName+"-IndexofTitles",JSON.stringify(t))},checkRepeatedNumber(){let e=this.rawHtmlText.split(/\n/),t={};e.map((e=>{let a=e.split(/ /)[0];t[parseInt(a)]=e}));let a=0;while(a++<e.length)t[a]||console.log(a)},removeNs(){this.rawHtmlText=this.rawHtmlText.replace(/\n\.\.\./g,"...").replace(/\.\.\n/g,"..").replace(/\n__/g,"__").replace(/__\n/g,"__")},removeNs1(){this.rawHtmlText=this.rawHtmlText.replace(/\n([a-z])/g,((e,t,a)=>` ${t}`)).replace(/  /g," ")},deleteHeader(){let e=this.rawHtmlText.split(/\n/);e.shift(),e=e.join("\n"),this.rawHtmlText=e},createListeners(){window.addEventListener("keydown",this.keydown),window.addEventListener("keyup",this.keyPressed)},removeListeners(){window.removeEventListener("keydown",this.keydown),window.removeEventListener("keyup",this.keyPressed)},async loadOriginalHTMLFile(){let e="HfPF"===this.fileName?"HymnsforthePooroftheFlock.html":"HT1876-small.html";switch(this.fileName){case"HfPF":e="HymnsforthePooroftheFlock.html";break;case"HT1876":e="HT1876-small.html";break;case"HT1869":e="HT1869.html";break}this.originalHTML="";let[t,a]=await s(r.get(`${window.location.origin}/htmlHymnals/${e}`));if(t)return!1;a=a.data,this.htmlData=a.split(/data\-page\-no=/g),this.htmlData.shift(),this.numPages=a.match(/data\-page\-no=/g).length;let l=window.localStorage.getItem(`${this.fileName}-LastPage`)||1;this.gotoPage(l),this.createHymnal()},getHymnal(){let e=window.localStorage.getItem(this.fileName)||"{}";return e=JSON.parse(e.replace(/\n/g,"")),e},addLyricstoSong(e,t,a){let l=this.getHymnal();if(l[e]){let n=l[e].text||"";n="append"===t?`${n}\n${a}`:`${a}\n${n}`,l[e].text=`\`${n}\``}else l[e]={text:`\`${a}\``};l=JSON.stringify(l),this.setHymnalText(l),this.saveHymnal()},saveHymnal(){window.localStorage.setItem(this.fileName,this.hymnal);this.$q.notify({type:"positive",message:"Saved Hymnal"})},createHymnal(){let e=window.localStorage.getItem(this.fileName)||"{}";e=JSON.parse(e),this.setHymnalText(e),this.saveHymnal()},setHymnalText(e){console.log(e),"object"===typeof e&&(e=JSON.stringify(e)),this.hymnal=e.replace(/\\n/g,"\n").replace(/\{/g,"\n{\n").replace(/\}/g,"\n}\n").replace(/\{\n\n/g,"{\n").replace(/\}\n\n/g,"}\n").replace(/\n\n\{/g,"\n{").replace(/\n\n\}/g,"\n}").replace(/\[/g,"\n[\n").replace(/\]/g,"\n]\n").replace(/\[\n\n/g,"[\n").replace(/\]\n\n/g,"]\n").replace(/\n\n\[/g,"\n[").replace(/\n\n\]/g,"\n]").replace(/"text":/g,'"text":\n').replace(/^\s+|\s+$/g,"").replace(/"text":\n\n/g,'"text":\n')},gotoPage(e){e||(e=parseInt(this.page)),e>this.numPages&&(e=this.numPages),e<1&&(e=1),this.page=parseInt(e),e--;this.originalHTML=this.htmlData[e];this.rawHtmlText=this.originalHTML.trimEnd().trimStart().replace(/<\/div>/g,"\n").replace(/<div[^>]+>/g,"").replace(/<[\/]*span[^>]*>/g,"").replace(/^[^>]*>/,"").replace(/<[^><]*$/,"").replace(/  /g," ").replace(/^\s+|\s+$/g,"");let t=document.createElement("textarea");t.innerHTML=this.rawHtmlText,this.rawHtmlText=t.value,e++,null!==window.localStorage.getItem(this.fileName+this.page)&&(this.rawHtmlText=window.localStorage.getItem(this.fileName+this.page)),e=e.toString();while(e.length<3)e=`0${e}`;let a="HfPF"===this.fileName?"HymnsforthePooroftheFlock.html":"HT1876-small.html";switch(this.fileName){case"HfPF":a="HymnsforthePooroftheFlock.html";break;case"HT1876":a="HT1876-small.html";break;case"HT1869":a="HT1869.html";break}a=a.replace(/\.html$/,""),this.imageUlr=`htmlHymnals/${a}/${a}-${e}.png`,window.localStorage.setItem(`${this.fileName}-LastPage`,this.page)},savePage(){window.localStorage.setItem(this.fileName+this.page,this.rawHtmlText),this.$q.notify({type:"positive",message:"Saved Page"})},deletePage(){window.localStorage.removeItem(this.fileName+this.page),this.gotoPage(this.page)},keydown(e){let t=this.getCursorPos();-1!==t&&"Delete"!==e.key||e.preventDefault()},keyPressed(e){let t=this.getCursorPos(),a=e.key;try{a=a.toUpperCase()}catch(l){}switch(e.altKey&&(a=`ALT+${a}`),e.shiftKey&&(a=`SHIFT+${a}`),e.ctrlKey&&(a=`CTRL+${a}`),a){case"SHIFT+P":if(-1!==t)break;this.gotoPage(this.page-1);break;case"SHIFT+N":if(-1!==t)break;this.gotoPage(this.page+1);break;case"CTRL+S":this.saveHymnal();break;case"CTRL+SHIFT+S":this.savePage();break;case"SHIFT+DELETE":this.deletePage();break;case"CTRL+H":this.currentSection="song";break;case"CTRL+P":this.currentSection="preface";break;case"ENTER":this.newLine();break;case"DELETE":this.deleteLine();break;case"A":this.add("append");break;case"P":this.add("prepend");break}},add(e){"preface"===this.currentSection?this.addLyricstoSong("preface",e,this.rawHtmlText):console.log("can;t wotk with songs yet")},newLine(){},deleteLine(){let e,t=this.getCursorPos();var a=/\n/g;let l=[];while(null!=(e=a.exec(this.rawHtmlText))){let t=parseInt(e.index);l.push(t)}let n=-1,i=0;for(let r in l){let e=l[r];if(e>t.start){n=parseInt(r),i=l[r-1]+1||0;break}}-1===n&&(n=l.length,i=l[n-1]+1||0);let s=this.rawHtmlText.split(/\n/);s.splice(n,1),s=s.join("\n"),this.rawHtmlText=s,i>this.rawHtmlText.length&&(i=l[n-2]+1||0),this.setCursorPos(i)},getSel(){let e=this.$refs.textArea,t=e.selectionStart,a=e.selectionEnd,l=e.value.substring(t,a);if(console.log({start:t,finish:a,sel:l}),this.removeSpaces){this.rawHtmlText;let e=Object.assign([],this.rawHtmlText);e.splice(t,a-t,l.replace(/ /g,"")),this.rawHtmlText=e.join("")}},getCursorPos(){let e=this.$refs.textArea;if("selectionStart"in e&&document.activeElement==e)return{start:e.selectionStart,end:e.selectionEnd};if(e.createTextRange){var t=document.selection.createRange();if(t.parentElement()===e){var a=e.createTextRange();a.moveToBookmark(t.getBookmark());for(var l=0;a.compareEndPoints("EndToStart",a)>0;a.moveEnd("character",-1))l++;a.setEndPoint("StartToStart",e.createTextRange());for(var n={start:0,end:l};a.compareEndPoints("EndToStart",a)>0;a.moveEnd("character",-1))n.start++,n.end++;return n}}return-1},setCursorPos(e,t){let a=this.$refs.textArea;if(arguments.length<2&&(t=e),"selectionStart"in a)setTimeout((function(){a.selectionStart=e,a.selectionEnd=t}),1);else if(a.createTextRange){var l=a.createTextRange();l.moveStart("character",e),l.collapse(),l.moveEnd("character",t-e),l.select()}}}},c=o,m=a("2877"),h=a("f09f"),d=a("a370"),g=a("429b"),p=a("7460"),f=a("adad"),u=a("823b"),b=a("3786"),T=a("8f8e"),w=a("27f9"),y=a("9c40"),v=a("05c0"),x=a("8562"),H=a("9989"),S=a("de5e"),$=a("c294"),k=a("72db"),N=a("eebe"),I=a.n(N),P=Object(m["a"])(c,l,n,!1,null,null,null);t["default"]=P.exports;I()(P,"components",{QCard:h["a"],QCardSection:d["a"],QTabs:g["a"],QTab:p["a"],QTabPanels:f["a"],QTabPanel:u["a"],QRadio:b["a"],QCheckbox:T["a"],QInput:w["a"],QBtn:y["a"],QTooltip:v["a"],QSplitter:x["a"],QPage:H["a"],QPageSticky:S["a"],QFab:$["a"],QFabAction:k["a"]})}}]);