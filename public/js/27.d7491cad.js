(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{"1c0a":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"q-ma-none q-pa-none"},[a("q-card",{staticClass:"bg-transparent",attrs:{flat:"",square:""}},[a("q-card-section",{attrs:{clas:"bg-green"}},[a("q-tabs",{staticClass:"q-ma-none q-pa-none",attrs:{align:"left"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab",{attrs:{name:"html",label:"HTML"}}),a("q-tab",{attrs:{name:"htmlSaved",label:"HTML (Saved)"}})],1)],1),a("q-card-section",[a("q-tab-panels",{staticClass:"bg-transparent q-ma-none q-pa-none full-width q-pa-none",model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab-panel",{staticClass:"bg-transparent q-ma-none q-pa-none",attrs:{name:"html"}},[a("div",[a("q-radio",{attrs:{val:"HfPF",label:"Hymns for the Poor of the Flock"},on:{input:e.loadOriginalHTMLFile},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),a("q-radio",{attrs:{val:"HT1876",label:"HT1876"},on:{input:e.loadOriginalHTMLFile},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),a("q-radio",{attrs:{val:"HT1869",label:"HT1869"},on:{input:e.loadOriginalHTMLFile},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}})],1),a("div",[a("q-checkbox",{attrs:{label:"Image"},model:{value:e.enabledItem.img,callback:function(t){e.$set(e.enabledItem,"img",t)},expression:"enabledItem.img"}}),a("q-checkbox",{attrs:{label:"Extracted"},model:{value:e.enabledItem.extracted,callback:function(t){e.$set(e.enabledItem,"extracted",t)},expression:"enabledItem.extracted"}}),a("q-checkbox",{attrs:{label:"Editor"},model:{value:e.enabledItem.editor,callback:function(t){e.$set(e.enabledItem,"editor",t)},expression:"enabledItem.editor"}}),a("q-checkbox",{attrs:{label:"Hymnal Or Image"},model:{value:e.enabledItem.hymnal,callback:function(t){e.$set(e.enabledItem,"hymnal",t)},expression:"enabledItem.hymnal"}}),a("q-input",{attrs:{label:"page number"},on:{focus:e.removeListeners,blur:e.createListeners,keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.gotoPage()}},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}}),a("q-input",{attrs:{label:"sectionNumber"},on:{focus:e.removeListeners,blur:e.createListeners},model:{value:e.sectionNumber,callback:function(t){e.sectionNumber=t},expression:"sectionNumber"}}),a("q-btn",{attrs:{label:"AllSongsTogether"},on:{click:e.AllSongsTogether}}),a("q-btn",{attrs:{label:"Process Song"},on:{click:e.ProcessSong}}),a("q-btn",{attrs:{label:"Delete header"},on:{click:e.deleteHeader}}),a("q-checkbox",{attrs:{label:"Remove spaces"},model:{value:e.removeSpaces,callback:function(t){e.removeSpaces=t},expression:"removeSpaces"}}),a("q-btn",{attrs:{label:"\\n[a-z]"},on:{click:e.removeNs1}}),a("q-checkbox",{attrs:{label:"Listeners"},model:{value:e.listenersExist,callback:function(t){e.listenersExist=t},expression:"listenersExist"}}),a("q-btn",{attrs:{label:"Save Prefave"},on:{click:e.savePreface}}),a("q-btn",{attrs:{label:"Save Titles"},on:{click:e.saveTitles}},[a("q-tooltip",[e._v("Save current page (after editting) as index of\n                titles")])],1),a("q-btn",{attrs:{label:"Download"},on:{click:e.createDirStructure}})],1),a("q-splitter",{staticStyle:{height:"100%"},attrs:{limits:[0,1/0]},scopedSlots:e._u([{key:"before",fn:function(){return[e.enabledItem.hymnal?a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.hymnal,expression:"hymnal"}],ref:"textArea",staticStyle:{width:"100%",height:"1000px"},domProps:{value:e.hymnal},on:{focus:e.removeListeners,blur:e.createListeners,input:function(t){t.target.composing||(e.hymnal=t.target.value)}}}):a("img",{staticStyle:{width:"100%"},attrs:{src:e.imageUlr}})]},proxy:!0},{key:"after",fn:function(){return[a("q-splitter",{staticStyle:{height:"100%"},attrs:{limits:[0,1/0]},scopedSlots:e._u([{key:"before",fn:function(){return[a("div",{domProps:{innerHTML:e._s(e.originalHTML)}})]},proxy:!0},{key:"after",fn:function(){return[a("q-page",[a("div",[""!==e.currentSection?a("div",[e._v("\n                        You are working on a\n                        "),a("strong",[e._v(e._s(e.currentSection))])]):e._e()]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.rawHtmlText,expression:"rawHtmlText"}],ref:"textArea",staticStyle:{width:"100%",height:"1000px"},domProps:{value:e.rawHtmlText},on:{mouseup:e.getSel,input:function(t){t.target.composing||(e.rawHtmlText=t.target.value)}}})])]},proxy:!0}]),model:{value:e.splitterModel1,callback:function(t){e.splitterModel1=t},expression:"splitterModel1"}})]},proxy:!0}]),model:{value:e.splitterModel,callback:function(t){e.splitterModel=t},expression:"splitterModel"}})],1),a("q-tab-panel",{staticClass:"bg-transparent q-ma-none q-pa-none",attrs:{name:"htmlSaved"}},[a("div",[a("q-radio",{attrs:{val:"HfPF",label:"Hymns for the Poor of the Flock"},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),a("q-radio",{attrs:{val:"HT1876",label:"HT1876"},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}}),a("q-radio",{attrs:{val:"HT1869",label:"HT1869"},model:{value:e.fileName,callback:function(t){e.fileName=t},expression:"fileName"}})],1),e._v("\n          "+e._s(e.fileName)+"\n        ")])],1)],1)],1),a("q-page-sticky",{staticClass:"q-gutter-xs q-ma-sm",staticStyle:{"z-index":"3"},attrs:{position:"bottom-left",offset:[18,18]}},[a("q-fab",{attrs:{icon:"settings",fab:"",color:"secondary",direction:"up"}},[a("q-fab-action",{attrs:{color:"secondary",icon:"crop_free",fab:""},on:{click:function(t){return e.fontSizeF()}}}),a("q-fab-action",{attrs:{color:"secondary",icon:"zoom_out",fab:""},on:{click:function(t){return e.fontSizeF(-.25)}}}),a("q-fab-action",{attrs:{color:"secondary",icon:"open_in_browser",fab:""},on:{click:function(t){return e.fontSizeF(.25)}}},[a("q-tooltip",[e._v("Open Saved File")])],1),a("q-fab-action",{attrs:{color:"secondary",icon:"folder_open",fab:""},on:{click:function(t){return e.fontSizeF(.25)}}},[a("q-tooltip",[e._v("Open Original File")])],1)],1)],1)],1)},n=[],s=(a("5319"),a("13d5"),a("ddb0"),a("eee7"),a("1e25"),a("21a6"));a("c4e3");const{to:i}=a("1712"),r=a("bc3a");var o={name:"editor",watch:{listenersExist(e){e?this.createListeners():this.removeListeners()},enabledItem:{handler(e){let{editor:t,extracted:a,img:l}=e;this.splitterModel1=t&&a?50:t?0:a?100:0,this.splitterModel=l?l&&a&&t?30:l&&a||l&&t?50:100:0},deep:!0}},data(){return{sectionNumber:1,listenersExist:!0,removeSpaces:!1,currentSection:"",enabledItem:{img:!0,extracted:!0,editor:!0,hymnal:!0},tab:"html",fileName:"HfPF",originalHTML:"",splitterModel:10,splitterModel1:50,htmlData:"",rawHtmlText:"",imageUlr:"",hymnal:"",page:1,links:{HfPF:"hymns-for-the-poor-of-the-flock",HT1876:"HT1876",HT1869:"HT1869"},fullNames:{HfPF:"Hymns for the Poor of the Flock",HT1876:"Hymns and Tunes 1876",HT1869:"Hymns and Tunes 1876"},prefaceTemplate:"\n---\ntitle: hymnalName - Advent Hymnals\nmetadata:\n    description: Advent Hymnals is a master collection of all the hymns sung by adventists as contained in such hymnals as Christ in Song, Church hymnal and Seventh Day adventist hymnal, millenial harp. These are a rich source of church history as well as of music.\n    keywords: hymnalName, advent hymnals, sda hymnals, christ in song, church hymnal, millenial harp, sdah, seventh-day adventist hymnal\n    author: Brian Onang'o\n---\n\n#### Advent Hymnals\n#### hymnalName\n\n## PREFACE.\n",indexTemplate:"\n---\ntitle: Index of Titles - hymnalName\nmetadata:\n    description: |\n        hymnalName - Index of Titles\n    keywords: |\n        hymnalName, adventhymnals, advent hymnals, index\n    author: Brian Onang'o\n---\n\n#### Advent Hymnals\n\n## hymnalName\n\n# Index of Titles\n# | Title                        \n-- |-------------\n"}},created(){this.createListeners(),this.loadOriginalHTMLFile(),this.enabledItem.img=!1,this.$nextTick((()=>this.enabledItem.img=!0))},beforeDestroy(){this.removeListeners()},methods:{AllSongsTogether(){let e=this.rawHtmlText,t=parseInt(this.page);while(t<this.numPages)this.gotoPage(this.page+1),console.log(this.page+1),t++,e+=this.rawHtmlText;this.rawHtmlText=e},saveTitles(){let e=this.rawHtmlText;window.localStorage.setItem(this.fileName+"-Titles",e)},savePreface(){let e=this.rawHtmlText;window.localStorage.setItem(this.fileName+"-Preface",e)},createDirStructure(){let e=window.localStorage.getItem(this.fileName+"-IndexofTitles");e=JSON.parse(e);let t=1;for(let a in e)parseInt(a)!==t++&&console.log(a);let l=window.localStorage.getItem(this.fileName+"-numMap");l=JSON.parse(l);let n=Object.keys(e).length,i=this.prefaceTemplate.replace(/hymnalName/g,this.fullNames[this.fileName]),r="";i+=`\n${r}`;let o={"chapter.md":i.replace(/^\s+|\s+$/g,""),"01.Indices":{"chapter.md":""}},c=1;while(c<=n){let e=c+99;e>n&&(e=n);let t=c.toString(),a=e.toString();while(t.length<n.toString().length)t=`0${t}`;while(a.length<n.toString().length)a=`0${a}`;let l=parseInt(c/100)+2;l=l.toString();while(l.length<2)l=`0${l}`;let s=`${l}.${t}-${a}`;o[s]={"chapter.md":""},c+=100}let m={};for(let a in o){let t=a;if(t.match(/chapter\.md/)||t.match(/01\.Indices/))continue;let s=parseInt(t.replace(/[^\.]*\./,"").replace(/\-.+/,"")),i=s+99;i>n&&(i=n);while(s<i){let t=s+9;t>i&&(t=i);let r=s.toString(),c=t.toString();while(r.length<n.toString().length)r=`0${r}`;while(c.length<n.toString().length)c=`0${c}`;let h=parseInt(s%100/10)+1;h=h.toString();while(h.length<2)h=`0${h}`;let d=`${h}.${r}-${c}`;o[a].children||(o[a].children={}),o[a].children[d]={"chapter.md":""},s--;while(s++<t){h=parseInt(s%10),0===h&&(h=10),h=h.toString();while(h.length<2)h=`0${h}`;console.log("===============",s);let t=e[s].TITLES[0],i=t;t=t.replace(/  /g," ").replace(/ /g,"-").replace(/\?/g,"").replace(/\./g,"");let r=`${h}.${t}`;o[a].children[d].children||(o[a].children[d].children={});let c="/"+a.replace(/[^\.]*\./,"")+"/"+d.replace(/[^\.]*\./,"")+"/"+r,g=l[s],p=g.split(".")[0],f=g.split(".")[1];while(f.length<n.toString().length)f=`0${f}`;m[`${p} - ${f}`]=`[${i}](${c})`;let u=window.localStorage.getItem(this.fileName+`-song-${s}`)||"";o[a].children[d].children[r]={"docs.md":u}}}}let h=this.indexTemplate.replace(/hymnalName/g,this.fullNames[this.fileName]),d="";for(let a in m)d+=`${a}|${m[a]}\n`;function g(e=[],t=1){const a=Number.isSafeInteger(t)&&t>0;if(!a)throw new RangeError("n must be a positive integer");const l=[];for(let n=0;n<e.length;n+=t){const a=e.slice(n,n+t);l.push(a)}return l}h+=`${d}`,o["01.Indices"]["chapter.md"]=h.replace(/^\s+|\s+$/g,"");let p=d.replace(/^\s+|\s+$/g,"").split(/\n/),f=g(p,10),u=g(p,100);h=this.indexTemplate.replace(/hymnalName/g,this.fullNames[this.fileName]),console.log(u),console.log(f),console.log("========="),console.log("========="),console.log("=========");const b=a("c4e3");var I=new b;for(let a in o){let e="";if(["chapter.md","docs.md"].includes(a)){let t=a,l=o[a];I.file(`${e}/${t}`,l.replace(/^\s+|\s+$/g,""))}else{let e=a;for(let t in o[a])if(["chapter.md","docs.md"].includes(t)){let l=t,n="";if("chapter.md"!==t||e.includes("01.Indices"))n=o[a][t];else{let e=u.shift();n=h;for(let t in e)n+=`${t}|${e[t]}\n`}I.file(`${e}/${l}`,n.replace(/^\s+|\s+$/g,""))}else{let l=e;"children"!==t&&(l=`${l}/${t}`);for(let n in o[a][t])if(["chapter.md","docs.md"].includes(n)){let e=n,s="";s=o[a][t][n],I.file(`${l}/${e}`,s)}else{let s=l;"children"!==n&&(s=`${s}/${n}`);for(let l in o[a][t][n])if(["chapter.md","docs.md"].includes(l)){let i=l,r="";if("chapter.md"!==l||e.includes("01.Indices"))r=o[a][t][n][l];else{let e=f.shift();r=h;for(let t in e)r+=`${t}|${e[t]}\n`}I.file(`${s}/${i}`,r.replace(/^\s+|\s+$/g,""))}else{let e=s;"children"!==l&&(e=`${e}/${l}`);for(let s in o[a][t][n][l])if(["chapter.md","docs.md"].includes(s)){let i=s,r=o[a][t][n][l][s];I.file(`${e}/${i}`,r.replace(/^\s+|\s+$/g,""))}else{let i=e;"children"!==s&&(i=`${i}/${s}`);for(let e in o[a][t][n][l][s])if(["chapter.md","docs.md"].includes(e)){let r=e,c=o[a][t][n][l][s][e];I.file(`${i}/${r}`,c.replace(/^\s+|\s+$/g,""))}}}}}}}I.generateAsync({type:"blob"}).then((e=>{console.log("IIIIIIIIIIIIIIIIIIIIIIIII{{{{{{{{{{{{{{{"),console.log("IIIIIIIIIIIIIIIIIIIIIIIII{{{{{{{{{{{{{{{"),console.log("IIIIIIIIIIIIIIIIIIIIIIIII{{{{{{{{{{{{{{{"),Object(s["saveAs"])(e,`${this.links[this.fileName]}.zip`)}))},ProcessSong(){let e="\n---\ntitle: |\n    songNumber songTitle - hymnalName\nmetadata:\n    description: |\n        hymnalName songNumber. songTitle. firstStanza \n    keywords:  |\n        hymnalName, adventhymnals, advent hymnals, songTitle, firstLine, refrainFirstLine\n    author: Brian Onang'o\n---\n\n#### Advent Hymnals\n## songNumber. songTitle\n####  hymnalName\n\n```txt\nsongText\n```\n";e=e.replace(/hymnalName/g,this.fullNames[this.fileName]);let t=this.rawHtmlText;t=t.replace(/^[ ]*[\d]+[ ]*\n/g,""),t=t.replace(/\n[ ]*[\d]+[ ]*\n/g,"\n"),t=t.replace(/(\n[1-9])([^\.])/g,((e,t,a)=>`\n${t}.${a}`)),this.rawHtmlText=t,t=this.rawHtmlText,t=t.split(/##EOEDIT:/)[0];let a=t.split("###"),l={};a.map((t=>{let a=e,n=t.match(/([\d]+)/);if(n){n=n[0];let e,i=n,r=t.split(/\n/)[0].replace(/( [^\.a-zA-Z0-9&].*)/,((e,t)=>"")).replace(/^ *\d\d* /,"");console.log(n);try{let s=t.replace(/^\s+|\s+$/g,"").replace(/[^\n]*\n/,"").replace(/^\s+|\s+$/g,"").match(/[^\n]*\n/)[0].replace(/^\d\d*\. /,"").replace(/\n/,"");e=s,console.log(e),l[n]={TITLES:[e]},t=t.replace(/^\s+|\s+$/g,"").replace(/[^\n]*\n/,"").replace(/^\s+|\s+$/g,""),i=i.toString();while(i.length<3)i=`0${i}`;let o=t.replace(/^\s+|\s+$/g,"").replace(/[^\n]*\n/,"").replace(/^\s+|\s+$/g,"").split(/\n\n/)[0].replace(/\n/g," ").replace(/[0-9]+\. /,""),c=t.replace(/^\s+|\s+$/g,"").replace(/[^\n]*\n/,"").replace(/^\s+|\s+$/g,"").split(/\n/)[0].replace(/[0-9]+\. /,""),m="";a=a.replace(/songNumber/g,i).replace(/songTitle/g,e).replace(/firstStanza/g,o).replace(/refrainFirstLine/g,m).replace(/firstLine/g,c).replace(/songText/g,`^Meter:^ ^${r.replace(/  /g," ").replace(/ /g,"^")}^\n`+t),window.localStorage.setItem(this.fileName+`-song-${n}`,a)}catch(s){console.log(s)}}})),window.localStorage.setItem(this.fileName+"-IndexofTitles",JSON.stringify(l));let n={};for(let s in l)n[s]=`1.${s}`;window.localStorage.setItem(this.fileName+"-numMap",JSON.stringify(n))},processTitles(){let e=this.rawHtmlText.split(/\n/),t={};for(let n in e){let a=e[n],l=a.match(/[\d]+$/);if(l){l=l[0];let e=a.replace(/[^a-z]*[\d]+$/,"");t[l]=e}}let a={},l=this.getHymnal();l.indices||(l.indices={}),l.indices.titles||(l.indices.titles={}),a=l.indices.titles;for(let n in t){let e=n,l=t[n];a[e]||(a[e]=[]),a[e].includes(l)||a[e].push(l)}this.setHymnalText(l),this.saveHymnal()},createTitles(){let e={},t={},a=this.rawHtmlText.split(/\n/),l=0,n=1;a.map(((a,s)=>{let i=a.split(/ /)[0].replace(/^0/g,"");""===i?n++:(e[++l]=`${n}.${i.replace(/^0/g,"").replace(/^0/g,"").replace(/^0/g,"")}`,t[l]={TITLES:[a.replace(/^[^ ]* /,"")]})})),window.localStorage.setItem(this.fileName+"-numMap",JSON.stringify(e)),window.localStorage.setItem(this.fileName+"-IndexofTitles",JSON.stringify(t))},checkRepeatedNumber(){let e=this.rawHtmlText.split(/\n/),t={};e.map((e=>{let a=e.split(/ /)[0];t[parseInt(a)]=e}));let a=0;while(a++<e.length)t[a]||console.log(a)},removeNs(){this.rawHtmlText=this.rawHtmlText.replace(/\n\.\.\./g,"...").replace(/\.\.\n/g,"..").replace(/\n__/g,"__").replace(/__\n/g,"__")},removeNs1(){this.rawHtmlText=this.rawHtmlText.replace(/\n([a-z])/g,((e,t,a)=>` ${t}`)).replace(/  /g," ")},deleteHeader(){let e=this.rawHtmlText.split(/\n/);e.shift(),e=e.join("\n"),this.rawHtmlText=e},createListeners(){window.addEventListener("keydown",this.keydown),window.addEventListener("keyup",this.keyPressed)},removeListeners(){window.removeEventListener("keydown",this.keydown),window.removeEventListener("keyup",this.keyPressed)},async loadOriginalHTMLFile(){let e="HfPF"===this.fileName?"HymnsforthePooroftheFlock.html":"HT1876-small.html";switch(this.fileName){case"HfPF":e="HymnsforthePooroftheFlock.html";break;case"HT1876":e="HT1876-small.html";break;case"HT1869":e="HT1869.html";break}this.originalHTML="";let[t,a]=await i(r.get(`${window.location.origin}/htmlHymnals/${e}`));if(t)return!1;a=a.data,this.htmlData=a.split(/data\-page\-no=/g),this.htmlData.shift(),this.numPages=a.match(/data\-page\-no=/g).length;let l=window.localStorage.getItem(`${this.fileName}-LastPage`)||1;this.gotoPage(l),this.createHymnal()},getHymnal(){let e=window.localStorage.getItem(this.fileName)||"{}";return e=JSON.parse(e.replace(/\n/g,"")),e},addLyricstoSong(e,t,a){let l=this.getHymnal();if(l[e]){let n=l[e].text||"";n="append"===t?`${n}\n${a}`:`${a}\n${n}`,l[e].text=`\`${n}\``}else l[e]={text:`\`${a}\``};l=JSON.stringify(l),this.setHymnalText(l),this.saveHymnal()},saveHymnal(){window.localStorage.setItem(this.fileName,this.hymnal);this.$q.notify({type:"positive",message:"Saved Hymnal"})},createHymnal(){let e=window.localStorage.getItem(this.fileName)||"{}";e=JSON.parse(e),this.setHymnalText(e),this.saveHymnal()},setHymnalText(e){console.log(e),"object"===typeof e&&(e=JSON.stringify(e)),this.hymnal=e.replace(/\\n/g,"\n").replace(/\{/g,"\n{\n").replace(/\}/g,"\n}\n").replace(/\{\n\n/g,"{\n").replace(/\}\n\n/g,"}\n").replace(/\n\n\{/g,"\n{").replace(/\n\n\}/g,"\n}").replace(/\[/g,"\n[\n").replace(/\]/g,"\n]\n").replace(/\[\n\n/g,"[\n").replace(/\]\n\n/g,"]\n").replace(/\n\n\[/g,"\n[").replace(/\n\n\]/g,"\n]").replace(/"text":/g,'"text":\n').replace(/^\s+|\s+$/g,"").replace(/"text":\n\n/g,'"text":\n')},gotoPage(e){e||(e=parseInt(this.page)),e>this.numPages&&(e=this.numPages),e<1&&(e=1),this.page=parseInt(e),e--;this.originalHTML=this.htmlData[e];this.rawHtmlText=this.originalHTML.trimEnd().trimStart().replace(/<\/div>/g,"\n").replace(/<div[^>]+>/g,"").replace(/<[\/]*span[^>]*>/g,"").replace(/^[^>]*>/,"").replace(/<[^><]*$/,"").replace(/  /g," ").replace(/^\s+|\s+$/g,"");let t=document.createElement("textarea");t.innerHTML=this.rawHtmlText,this.rawHtmlText=t.value,e++,null!==window.localStorage.getItem(this.fileName+this.page)&&(this.rawHtmlText=window.localStorage.getItem(this.fileName+this.page)),e=e.toString();while(e.length<3)e=`0${e}`;let a="HfPF"===this.fileName?"HymnsforthePooroftheFlock.html":"HT1876-small.html";switch(this.fileName){case"HfPF":a="HymnsforthePooroftheFlock.html";break;case"HT1876":a="HT1876-small.html";break;case"HT1869":a="HT1869.html";break}a=a.replace(/\.html$/,""),this.imageUlr=`htmlHymnals/${a}/${a}-${e}.png`,window.localStorage.setItem(`${this.fileName}-LastPage`,this.page)},savePage(){window.localStorage.setItem(this.fileName+this.page,this.rawHtmlText),this.$q.notify({type:"positive",message:"Saved Page"})},deletePage(){window.localStorage.removeItem(this.fileName+this.page),this.gotoPage(this.page)},keydown(e){let t=this.getCursorPos();-1!==t&&"Delete"!==e.key||e.preventDefault()},keyPressed(e){let t=this.getCursorPos(),a=e.key;try{a=a.toUpperCase()}catch(l){}switch(e.altKey&&(a=`ALT+${a}`),e.shiftKey&&(a=`SHIFT+${a}`),e.ctrlKey&&(a=`CTRL+${a}`),a){case"SHIFT+P":if(-1!==t)break;this.gotoPage(this.page-1);break;case"SHIFT+N":if(-1!==t)break;this.gotoPage(this.page+1);break;case"CTRL+S":this.saveHymnal();break;case"CTRL+SHIFT+S":this.savePage();break;case"SHIFT+DELETE":this.deletePage();break;case"CTRL+H":this.currentSection="song";break;case"CTRL+P":this.currentSection="preface";break;case"ENTER":this.newLine();break;case"DELETE":this.deleteLine();break;case"A":this.add("append");break;case"P":this.add("prepend");break}},add(e){"preface"===this.currentSection?this.addLyricstoSong("preface",e,this.rawHtmlText):console.log("can;t wotk with songs yet")},newLine(){},deleteLine(){let e,t=this.getCursorPos();var a=/\n/g;let l=[];while(null!=(e=a.exec(this.rawHtmlText))){let t=parseInt(e.index);l.push(t)}let n=-1,s=0;for(let r in l){let e=l[r];if(e>t.start){n=parseInt(r),s=l[r-1]+1||0;break}}-1===n&&(n=l.length,s=l[n-1]+1||0);let i=this.rawHtmlText.split(/\n/);i.splice(n,1),i=i.join("\n"),this.rawHtmlText=i,s>this.rawHtmlText.length&&(s=l[n-2]+1||0),this.setCursorPos(s)},getSel(){let e=this.$refs.textArea,t=e.selectionStart,a=e.selectionEnd,l=e.value.substring(t,a);if(console.log({start:t,finish:a,sel:l}),this.removeSpaces){this.rawHtmlText;let e=Object.assign([],this.rawHtmlText);e.splice(t,a-t,l.replace(/ /g,"")),this.rawHtmlText=e.join("")}},getCursorPos(){let e=this.$refs.textArea;if("selectionStart"in e&&document.activeElement==e)return{start:e.selectionStart,end:e.selectionEnd};if(e.createTextRange){var t=document.selection.createRange();if(t.parentElement()===e){var a=e.createTextRange();a.moveToBookmark(t.getBookmark());for(var l=0;a.compareEndPoints("EndToStart",a)>0;a.moveEnd("character",-1))l++;a.setEndPoint("StartToStart",e.createTextRange());for(var n={start:0,end:l};a.compareEndPoints("EndToStart",a)>0;a.moveEnd("character",-1))n.start++,n.end++;return n}}return-1},setCursorPos(e,t){let a=this.$refs.textArea;if(arguments.length<2&&(t=e),"selectionStart"in a)setTimeout((function(){a.selectionStart=e,a.selectionEnd=t}),1);else if(a.createTextRange){var l=a.createTextRange();l.moveStart("character",e),l.collapse(),l.moveEnd("character",t-e),l.select()}}}},c=o,m=a("2877"),h=a("f09f"),d=a("a370"),g=a("429b"),p=a("7460"),f=a("adad"),u=a("823b"),b=a("3786"),I=a("8f8e"),T=a("27f9"),y=a("9c40"),w=a("05c0"),v=a("8562"),x=a("9989"),H=a("de5e"),S=a("c294"),$=a("72db"),k=a("eebe"),N=a.n(k),P=Object(m["a"])(c,l,n,!1,null,null,null);t["default"]=P.exports;N()(P,"components",{QCard:h["a"],QCardSection:d["a"],QTabs:g["a"],QTab:p["a"],QTabPanels:f["a"],QTabPanel:u["a"],QRadio:b["a"],QCheckbox:I["a"],QInput:T["a"],QBtn:y["a"],QTooltip:w["a"],QSplitter:v["a"],QPage:x["a"],QPageSticky:H["a"],QFab:S["a"],QFabAction:$["a"]})}}]);