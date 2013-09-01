!function(){var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function S(a){function d(e){var b=e.charCodeAt(0);if(b!==92)return b;var a=e.charAt(1);return(b=r[a])?b:"0"<=a&&a<="7"?parseInt(e.substring(1),8):a==="u"||a==="x"?parseInt(e.substring(2),16):e.charCodeAt(1)}function g(e){if(e<32)return(e<16?"\\x0":"\\x")+e.toString(16);e=String.fromCharCode(e);return e==="\\"||e==="-"||e==="]"||e==="^"?"\\"+e:e}function b(e){var b=e.substring(1,e.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),e=[],a=
b[0]==="^",c=["["];a&&c.push("^");for(var a=a?1:0,f=b.length;a<f;++a){var h=b[a];if(/\\[bdsw]/i.test(h))c.push(h);else{var h=d(h),l;a+2<f&&"-"===b[a+1]?(l=d(b[a+2]),a+=2):l=h;e.push([h,l]);l<65||h>122||(l<65||h>90||e.push([Math.max(65,h)|32,Math.min(l,90)|32]),l<97||h>122||e.push([Math.max(97,h)&-33,Math.min(l,122)&-33]))}}e.sort(function(e,a){return e[0]-a[0]||a[1]-e[1]});b=[];f=[];for(a=0;a<e.length;++a)h=e[a],h[0]<=f[1]+1?f[1]=Math.max(f[1],h[1]):b.push(f=h);for(a=0;a<b.length;++a)h=b[a],c.push(g(h[0])),
h[1]>h[0]&&(h[1]+1>h[0]&&c.push("-"),c.push(g(h[1])));c.push("]");return c.join("")}function s(e){for(var a=e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),c=a.length,d=[],f=0,h=0;f<c;++f){var l=a[f];l==="("?++h:"\\"===l.charAt(0)&&(l=+l.substring(1))&&(l<=h?d[l]=-1:a[f]=g(l))}for(f=1;f<d.length;++f)-1===d[f]&&(d[f]=++x);for(h=f=0;f<c;++f)l=a[f],l==="("?(++h,d[h]||(a[f]="(?:")):"\\"===l.charAt(0)&&(l=+l.substring(1))&&l<=h&&
(a[f]="\\"+d[l]);for(f=0;f<c;++f)"^"===a[f]&&"^"!==a[f+1]&&(a[f]="");if(e.ignoreCase&&m)for(f=0;f<c;++f)l=a[f],e=l.charAt(0),l.length>=2&&e==="["?a[f]=b(l):e!=="\\"&&(a[f]=l.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var x=0,m=!1,j=!1,k=0,c=a.length;k<c;++k){var i=a[k];if(i.ignoreCase)j=!0;else if(/[a-z]/i.test(i.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){m=!0;j=!1;break}}for(var r={b:8,t:9,n:10,v:11,
f:12,r:13},n=[],k=0,c=a.length;k<c;++k){i=a[k];if(i.global||i.multiline)throw Error(""+i);n.push("(?:"+s(i)+")")}return RegExp(n.join("|"),j?"gi":"g")}function T(a,d){function g(a){var c=a.nodeType;if(c==1){if(!b.test(a.className)){for(c=a.firstChild;c;c=c.nextSibling)g(c);c=a.nodeName.toLowerCase();if("br"===c||"li"===c)s[j]="\n",m[j<<1]=x++,m[j++<<1|1]=a}}else if(c==3||c==4)c=a.nodeValue,c.length&&(c=d?c.replace(/\r\n?/g,"\n"):c.replace(/[\t\n\r ]+/g," "),s[j]=c,m[j<<1]=x,x+=c.length,m[j++<<1|1]=
a)}var b=/(?:^|\s)nocode(?:\s|$)/,s=[],x=0,m=[],j=0;g(a);return{a:s.join("").replace(/\n$/,""),d:m}}function H(a,d,g,b){d&&(a={a:d,e:a},g(a),b.push.apply(b,a.g))}function U(a){for(var d=void 0,g=a.firstChild;g;g=g.nextSibling)var b=g.nodeType,d=b===1?d?a:g:b===3?V.test(g.nodeValue)?a:d:d;return d===a?void 0:d}function C(a,d){function g(a){for(var j=a.e,k=[j,"pln"],c=0,i=a.a.match(s)||[],r={},n=0,e=i.length;n<e;++n){var z=i[n],w=r[z],t=void 0,f;if(typeof w==="string")f=!1;else{var h=b[z.charAt(0)];
if(h)t=z.match(h[1]),w=h[0];else{for(f=0;f<x;++f)if(h=d[f],t=z.match(h[1])){w=h[0];break}t||(w="pln")}if((f=w.length>=5&&"lang-"===w.substring(0,5))&&!(t&&typeof t[1]==="string"))f=!1,w="src";f||(r[z]=w)}h=c;c+=z.length;if(f){f=t[1];var l=z.indexOf(f),B=l+f.length;t[2]&&(B=z.length-t[2].length,l=B-f.length);w=w.substring(5);H(j+h,z.substring(0,l),g,k);H(j+h+l,f,I(w,f),k);H(j+h+B,z.substring(B),g,k)}else k.push(j+h,w)}a.g=k}var b={},s;(function(){for(var g=a.concat(d),j=[],k={},c=0,i=g.length;c<i;++c){var r=
g[c],n=r[3];if(n)for(var e=n.length;--e>=0;)b[n.charAt(e)]=r;r=r[1];n=""+r;k.hasOwnProperty(n)||(j.push(r),k[n]=q)}j.push(/[\S\s]/);s=S(j)})();var x=d.length;return g}function v(a){var d=[],g=[];a.tripleQuotedStrings?d.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?d.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
q,"'\"`"]):d.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&g.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var b=a.hashComments;b&&(a.cStyleComments?(b>1?d.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):d.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),g.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,q])):d.push(["com",
/^#[^\n\r]*/,q,"#"]));a.cStyleComments&&(g.push(["com",/^\/\/[^\n\r]*/,q]),g.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));if(b=a.regexLiterals){var s=(b=b>1?"":"\n\r")?".":"[\\S\\s]";g.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*("+("/(?=[^/*"+b+"])(?:[^/\\x5B\\x5C"+b+"]|\\x5C"+s+"|\\x5B(?:[^\\x5C\\x5D"+b+"]|\\x5C"+
s+")*(?:\\x5D|$))+/")+")")])}(b=a.types)&&g.push(["typ",b]);b=(""+a.keywords).replace(/^ | $/g,"");b.length&&g.push(["kwd",RegExp("^(?:"+b.replace(/[\s,]+/g,"|")+")\\b"),q]);d.push(["pln",/^\s+/,q," \r\n\t\u00a0"]);b="^.[^\\s\\w.$@'\"`/\\\\]*";a.regexLiterals&&(b+="(?!s*/)");g.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,
q],["pun",RegExp(b),q]);return C(d,g)}function J(a,d,g){function b(a){var c=a.nodeType;if(c==1&&!x.test(a.className))if("br"===a.nodeName)s(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)b(a);else if((c==3||c==4)&&g){var d=a.nodeValue,i=d.match(m);if(i)c=d.substring(0,i.index),a.nodeValue=c,(d=d.substring(i.index+i[0].length))&&a.parentNode.insertBefore(j.createTextNode(d),a.nextSibling),s(a),c||a.parentNode.removeChild(a)}}function s(a){function b(a,c){var d=
c?a.cloneNode(!1):a,e=a.parentNode;if(e){var e=b(e,1),g=a.nextSibling;e.appendChild(d);for(var i=g;i;i=g)g=i.nextSibling,e.appendChild(i)}return d}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),d;(d=a.parentNode)&&d.nodeType===1;)a=d;c.push(a)}for(var x=/(?:^|\s)nocode(?:\s|$)/,m=/\r\n?|\n/,j=a.ownerDocument,k=j.createElement("li");a.firstChild;)k.appendChild(a.firstChild);for(var c=[k],i=0;i<c.length;++i)b(c[i]);d===(d|0)&&c[0].setAttribute("value",d);var r=j.createElement("ol");
r.className="linenums";for(var d=Math.max(0,d-1|0)||0,i=0,n=c.length;i<n;++i)k=c[i],k.className="L"+(i+d)%10,k.firstChild||k.appendChild(j.createTextNode("\u00a0")),r.appendChild(k);a.appendChild(r)}function p(a,d){for(var g=d.length;--g>=0;){var b=d[g];F.hasOwnProperty(b)?D.console&&console.warn("cannot override language handler %s",b):F[b]=a}}function I(a,d){if(!a||!F.hasOwnProperty(a))a=/^\s*</.test(d)?"default-markup":"default-code";return F[a]}function K(a){var d=a.h;try{var g=T(a.c,a.i),b=g.a;
a.a=b;a.d=g.d;a.e=0;I(d,b)(a);var s=/\bMSIE\s(\d+)/.exec(navigator.userAgent),s=s&&+s[1]<=8,d=/\n/g,x=a.a,m=x.length,g=0,j=a.d,k=j.length,b=0,c=a.g,i=c.length,r=0;c[i]=m;var n,e;for(e=n=0;e<i;)c[e]!==c[e+2]?(c[n++]=c[e++],c[n++]=c[e++]):e+=2;i=n;for(e=n=0;e<i;){for(var p=c[e],w=c[e+1],t=e+2;t+2<=i&&c[t+1]===w;)t+=2;c[n++]=p;c[n++]=w;e=t}c.length=n;var f=a.c,h;if(f)h=f.style.display,f.style.display="none";try{for(;b<k;){var l=j[b+2]||m,B=c[r+2]||m,t=Math.min(l,B),A=j[b+1],G;if(A.nodeType!==1&&(G=x.substring(g,
t))){s&&(G=G.replace(d,"\r"));A.nodeValue=G;var L=A.ownerDocument,o=L.createElement("span");o.className=c[r+1];var v=A.parentNode;v.replaceChild(o,A);o.appendChild(A);g<l&&(j[b+1]=A=L.createTextNode(x.substring(t,l)),v.insertBefore(A,o.nextSibling))}g=t;g>=l&&(b+=2);g>=B&&(r+=2)}}finally{if(f)f.style.display=h}}catch(u){D.console&&console.log(u&&u.stack||u)}}var D=window,y=["break,continue,do,else,for,if,return,while"],E=[[y,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],M=[E,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],N=[E,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
O=[N,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],E=[E,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],P=[y,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
Q=[y,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],W=[y,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],y=[y,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],R=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
V=/\S/,X=v({keywords:[M,O,E,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",P,Q,y],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),F={};p(X,["default-code"]);p(C([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",
/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);p(C([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],
["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);p(C([],[["atv",/^[\S\s]+/]]),["uq.val"]);p(v({keywords:M,hashComments:!0,cStyleComments:!0,types:R}),["c","cc","cpp","cxx","cyc","m"]);p(v({keywords:"null,true,false"}),["json"]);p(v({keywords:O,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:R}),
["cs"]);p(v({keywords:N,cStyleComments:!0}),["java"]);p(v({keywords:y,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]);p(v({keywords:P,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]);p(v({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]);p(v({keywords:Q,
hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]);p(v({keywords:E,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]);p(v({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);p(v({keywords:W,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]);
p(C([],[["str",/^[\S\s]+/]]),["regex"]);var Y=D.PR={createSimpleLexer:C,registerLangHandler:p,sourceDecorator:v,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:D.prettyPrintOne=function(a,d,g){var b=document.createElement("div");b.innerHTML="<pre>"+a+"</pre>";b=b.firstChild;g&&J(b,g,!0);K({h:d,j:g,c:b,i:1});
return b.innerHTML},prettyPrint:D.prettyPrint=function(a,d){function g(){for(var b=D.PR_SHOULD_USE_CONTINUATION?c.now()+250:Infinity;i<p.length&&c.now()<b;i++){for(var d=p[i],j=h,k=d;k=k.previousSibling;){var m=k.nodeType,o=(m===7||m===8)&&k.nodeValue;if(o?!/^\??prettify\b/.test(o):m!==3||/\S/.test(k.nodeValue))break;if(o){j={};o.replace(/\b(\w+)=([\w%+\-.:]+)/g,function(a,b,c){j[b]=c});break}}k=d.className;if((j!==h||e.test(k))&&!v.test(k)){m=!1;for(o=d.parentNode;o;o=o.parentNode)if(f.test(o.tagName)&&
o.className&&e.test(o.className)){m=!0;break}if(!m){d.className+=" prettyprinted";m=j.lang;if(!m){var m=k.match(n),y;if(!m&&(y=U(d))&&t.test(y.tagName))m=y.className.match(n);m&&(m=m[1])}if(w.test(d.tagName))o=1;else var o=d.currentStyle,u=s.defaultView,o=(o=o?o.whiteSpace:u&&u.getComputedStyle?u.getComputedStyle(d,q).getPropertyValue("white-space"):0)&&"pre"===o.substring(0,3);u=j.linenums;if(!(u=u==="true"||+u))u=(u=k.match(/\blinenums\b(?::(\d+))?/))?u[1]&&u[1].length?+u[1]:!0:!1;u&&J(d,u,o);r=
{h:m,c:d,j:u,i:o};K(r)}}}i<p.length?setTimeout(g,250):"function"===typeof a&&a()}for(var b=d||document.body,s=b.ownerDocument||document,b=[b.getElementsByTagName("pre"),b.getElementsByTagName("code"),b.getElementsByTagName("xmp")],p=[],m=0;m<b.length;++m)for(var j=0,k=b[m].length;j<k;++j)p.push(b[m][j]);var b=q,c=Date;c.now||(c={now:function(){return+new Date}});var i=0,r,n=/\blang(?:uage)?-([\w.]+)(?!\S)/,e=/\bprettyprint\b/,v=/\bprettyprinted\b/,w=/pre|xmp/i,t=/^code$/i,f=/^(?:pre|code|xmp)$/i,
h={};g()}};typeof define==="function"&&define.amd&&define("google-code-prettify",[],function(){return Y})})();}()

!function(){var r=null;
(function(){function X(e){function j(){try{J.doScroll("left")}catch(e){P(j,50);return}w("poll")}function w(j){if(!(j.type=="readystatechange"&&x.readyState!="complete")&&((j.type=="load"?n:x)[z](i+j.type,w,!1),!m&&(m=!0)))e.call(n,j.type||j)}var Y=x.addEventListener,m=!1,C=!0,t=Y?"addEventListener":"attachEvent",z=Y?"removeEventListener":"detachEvent",i=Y?"":"on";if(x.readyState=="complete")e.call(n,"lazy");else{if(x.createEventObject&&J.doScroll){try{C=!n.frameElement}catch(A){}C&&j()}x[t](i+"DOMContentLoaded",
w,!1);x[t](i+"readystatechange",w,!1);n[t](i+"load",w,!1)}}function Q(){S&&X(function(){var e=K.length;$(e?function(){for(var j=0;j<e;++j)(function(e){P(function(){n.exports[K[e]].apply(n,arguments)},0)})(j)}:void 0)})}for(var n=window,P=n.setTimeout,x=document,J=x.documentElement,L=x.head||x.getElementsByTagName("head")[0]||J,z="",A=x.scripts,m=A.length;--m>=0;){var M=A[m],T=M.src.match(/^[^#?]*\/run_prettify\.js(\?[^#]*)?(?:#.*)?$/);if(T){z=T[1]||"";M.parentNode.removeChild(M);break}}var S=!0,D=
[],N=[],K=[];z.replace(/[&?]([^&=]+)=([^&]+)/g,function(e,j,w){w=decodeURIComponent(w);j=decodeURIComponent(j);j=="autorun"?S=!/^[0fn]/i.test(w):j=="lang"?D.push(w):j=="skin"?N.push(w):j=="callback"&&K.push(w)});m=0;for(z=D.length;m<z;++m)(function(){var e=x.createElement("script");e.onload=e.onerror=e.onreadystatechange=function(){if(e&&(!e.readyState||/loaded|complete/.test(e.readyState)))e.onerror=e.onload=e.onreadystatechange=r,--R,R||P(Q,0),e.parentNode&&e.parentNode.removeChild(e),e=r};e.type=
"text/javascript";e.src="https://google-code-prettify.googlecode.com/svn/loader/lang-"+encodeURIComponent(D[m])+".js";L.insertBefore(e,L.firstChild)})(D[m]);for(var R=D.length,A=[],m=0,z=N.length;m<z;++m)A.push("https://google-code-prettify.googlecode.com/svn/loader/skins/"+encodeURIComponent(N[m])+".css");(function(e){function j(m){if(m!==w){var n=x.createElement("link");n.rel="stylesheet";n.type="text/css";if(m+1<w)n.error=
n.onerror=function(){j(m+1)};n.href=e[m];L.appendChild(n)}}var w=e.length;j(0)})(A);var $=function(){window.PR_SHOULD_USE_CONTINUATION=!0;var e;(function(){function j(a){function d(f){var b=f.charCodeAt(0);if(b!==92)return b;var a=f.charAt(1);return(b=i[a])?b:"0"<=a&&a<="7"?parseInt(f.substring(1),8):a==="u"||a==="x"?parseInt(f.substring(2),16):f.charCodeAt(1)}function h(f){if(f<32)return(f<16?"\\x0":"\\x")+f.toString(16);f=String.fromCharCode(f);return f==="\\"||f==="-"||f==="]"||f==="^"?"\\"+f:
f}function b(f){var b=f.substring(1,f.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),f=[],a=b[0]==="^",c=["["];a&&c.push("^");for(var a=a?1:0,g=b.length;a<g;++a){var k=b[a];if(/\\[bdsw]/i.test(k))c.push(k);else{var k=d(k),o;a+2<g&&"-"===b[a+1]?(o=d(b[a+2]),a+=2):o=k;f.push([k,o]);o<65||k>122||(o<65||k>90||f.push([Math.max(65,k)|32,Math.min(o,90)|32]),o<97||k>122||f.push([Math.max(97,k)&-33,Math.min(o,122)&-33]))}}f.sort(function(f,a){return f[0]-
a[0]||a[1]-f[1]});b=[];g=[];for(a=0;a<f.length;++a)k=f[a],k[0]<=g[1]+1?g[1]=Math.max(g[1],k[1]):b.push(g=k);for(a=0;a<b.length;++a)k=b[a],c.push(h(k[0])),k[1]>k[0]&&(k[1]+1>k[0]&&c.push("-"),c.push(h(k[1])));c.push("]");return c.join("")}function e(f){for(var a=f.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),c=a.length,d=[],g=0,k=0;g<c;++g){var o=a[g];o==="("?++k:"\\"===o.charAt(0)&&(o=+o.substring(1))&&(o<=k?d[o]=-1:a[g]=h(o))}for(g=
1;g<d.length;++g)-1===d[g]&&(d[g]=++j);for(k=g=0;g<c;++g)o=a[g],o==="("?(++k,d[k]||(a[g]="(?:")):"\\"===o.charAt(0)&&(o=+o.substring(1))&&o<=k&&(a[g]="\\"+d[o]);for(g=0;g<c;++g)"^"===a[g]&&"^"!==a[g+1]&&(a[g]="");if(f.ignoreCase&&F)for(g=0;g<c;++g)o=a[g],f=o.charAt(0),o.length>=2&&f==="["?a[g]=b(o):f!=="\\"&&(a[g]=o.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var j=0,F=!1,l=!1,I=0,c=a.length;I<c;++I){var p=a[I];if(p.ignoreCase)l=
!0;else if(/[a-z]/i.test(p.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){F=!0;l=!1;break}}for(var i={b:8,t:9,n:10,v:11,f:12,r:13},q=[],I=0,c=a.length;I<c;++I){p=a[I];if(p.global||p.multiline)throw Error(""+p);q.push("(?:"+e(p)+")")}return RegExp(q.join("|"),l?"gi":"g")}function m(a,d){function h(a){var c=a.nodeType;if(c==1){if(!b.test(a.className)){for(c=a.firstChild;c;c=c.nextSibling)h(c);c=a.nodeName.toLowerCase();if("br"===c||"li"===c)e[l]="\n",F[l<<1]=j++,F[l++<<1|1]=a}}else if(c==
3||c==4)c=a.nodeValue,c.length&&(c=d?c.replace(/\r\n?/g,"\n"):c.replace(/[\t\n\r ]+/g," "),e[l]=c,F[l<<1]=j,j+=c.length,F[l++<<1|1]=a)}var b=/(?:^|\s)nocode(?:\s|$)/,e=[],j=0,F=[],l=0;h(a);return{a:e.join("").replace(/\n$/,""),d:F}}function n(a,d,h,b){d&&(a={a:d,e:a},h(a),b.push.apply(b,a.g))}function x(a){for(var d=void 0,h=a.firstChild;h;h=h.nextSibling)var b=h.nodeType,d=b===1?d?a:h:b===3?S.test(h.nodeValue)?a:d:d;return d===a?void 0:d}function C(a,d){function h(a){for(var l=a.e,j=[l,"pln"],c=
0,p=a.a.match(e)||[],m={},q=0,f=p.length;q<f;++q){var B=p[q],y=m[B],u=void 0,g;if(typeof y==="string")g=!1;else{var k=b[B.charAt(0)];if(k)u=B.match(k[1]),y=k[0];else{for(g=0;g<i;++g)if(k=d[g],u=B.match(k[1])){y=k[0];break}u||(y="pln")}if((g=y.length>=5&&"lang-"===y.substring(0,5))&&!(u&&typeof u[1]==="string"))g=!1,y="src";g||(m[B]=y)}k=c;c+=B.length;if(g){g=u[1];var o=B.indexOf(g),H=o+g.length;u[2]&&(H=B.length-u[2].length,o=H-g.length);y=y.substring(5);n(l+k,B.substring(0,o),h,j);n(l+k+o,g,A(y,
g),j);n(l+k+H,B.substring(H),h,j)}else j.push(l+k,y)}a.g=j}var b={},e;(function(){for(var h=a.concat(d),l=[],i={},c=0,p=h.length;c<p;++c){var m=h[c],q=m[3];if(q)for(var f=q.length;--f>=0;)b[q.charAt(f)]=m;m=m[1];q=""+m;i.hasOwnProperty(q)||(l.push(m),i[q]=r)}l.push(/[\S\s]/);e=j(l)})();var i=d.length;return h}function t(a){var d=[],h=[];a.tripleQuotedStrings?d.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,
r,"'\""]):a.multiLineStrings?d.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,r,"'\"`"]):d.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,r,"\"'"]);a.verbatimStrings&&h.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,r]);var b=a.hashComments;b&&(a.cStyleComments?(b>1?d.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,r,"#"]):d.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/,
r,"#"]),h.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,r])):d.push(["com",/^#[^\n\r]*/,r,"#"]));a.cStyleComments&&(h.push(["com",/^\/\/[^\n\r]*/,r]),h.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,r]));if(b=a.regexLiterals){var e=(b=b>1?"":"\n\r")?".":"[\\S\\s]";h.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*("+
("/(?=[^/*"+b+"])(?:[^/\\x5B\\x5C"+b+"]|\\x5C"+e+"|\\x5B(?:[^\\x5C\\x5D"+b+"]|\\x5C"+e+")*(?:\\x5D|$))+/")+")")])}(b=a.types)&&h.push(["typ",b]);b=(""+a.keywords).replace(/^ | $/g,"");b.length&&h.push(["kwd",RegExp("^(?:"+b.replace(/[\s,]+/g,"|")+")\\b"),r]);d.push(["pln",/^\s+/,r," \r\n\t\u00a0"]);b="^.[^\\s\\w.$@'\"`/\\\\]*";a.regexLiterals&&(b+="(?!s*/)");h.push(["lit",/^@[$_a-z][\w$@]*/i,r],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,r],["pln",/^[$_a-z][\w$@]*/i,r],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,
r,"0123456789"],["pln",/^\\[\S\s]?/,r],["pun",RegExp(b),r]);return C(d,h)}function z(a,d,h){function b(a){var c=a.nodeType;if(c==1&&!j.test(a.className))if("br"===a.nodeName)e(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)b(a);else if((c==3||c==4)&&h){var d=a.nodeValue,i=d.match(m);if(i)c=d.substring(0,i.index),a.nodeValue=c,(d=d.substring(i.index+i[0].length))&&a.parentNode.insertBefore(l.createTextNode(d),a.nextSibling),e(a),c||a.parentNode.removeChild(a)}}
function e(a){function b(a,c){var d=c?a.cloneNode(!1):a,f=a.parentNode;if(f){var f=b(f,1),h=a.nextSibling;f.appendChild(d);for(var e=h;e;e=h)h=e.nextSibling,f.appendChild(e)}return d}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),d;(d=a.parentNode)&&d.nodeType===1;)a=d;c.push(a)}for(var j=/(?:^|\s)nocode(?:\s|$)/,m=/\r\n?|\n/,l=a.ownerDocument,i=l.createElement("li");a.firstChild;)i.appendChild(a.firstChild);for(var c=[i],p=0;p<c.length;++p)b(c[p]);d===(d|0)&&c[0].setAttribute("value",
d);var n=l.createElement("ol");n.className="linenums";for(var d=Math.max(0,d-1|0)||0,p=0,q=c.length;p<q;++p)i=c[p],i.className="L"+(p+d)%10,i.firstChild||i.appendChild(l.createTextNode("\u00a0")),n.appendChild(i);a.appendChild(n)}function i(a,d){for(var h=d.length;--h>=0;){var b=d[h];U.hasOwnProperty(b)?V.console&&console.warn("cannot override language handler %s",b):U[b]=a}}function A(a,d){if(!a||!U.hasOwnProperty(a))a=/^\s*</.test(d)?"default-markup":"default-code";return U[a]}function D(a){var d=
a.h;try{var h=m(a.c,a.i),b=h.a;a.a=b;a.d=h.d;a.e=0;A(d,b)(a);var e=/\bMSIE\s(\d+)/.exec(navigator.userAgent),e=e&&+e[1]<=8,d=/\n/g,i=a.a,j=i.length,h=0,l=a.d,n=l.length,b=0,c=a.g,p=c.length,t=0;c[p]=j;var q,f;for(f=q=0;f<p;)c[f]!==c[f+2]?(c[q++]=c[f++],c[q++]=c[f++]):f+=2;p=q;for(f=q=0;f<p;){for(var x=c[f],y=c[f+1],u=f+2;u+2<=p&&c[u+1]===y;)u+=2;c[q++]=x;c[q++]=y;f=u}c.length=q;var g=a.c,k;if(g)k=g.style.display,g.style.display="none";try{for(;b<n;){var o=l[b+2]||j,H=c[t+2]||j,u=Math.min(o,H),E=l[b+
1],W;if(E.nodeType!==1&&(W=i.substring(h,u))){e&&(W=W.replace(d,"\r"));E.nodeValue=W;var Z=E.ownerDocument,s=Z.createElement("span");s.className=c[t+1];var z=E.parentNode;z.replaceChild(s,E);s.appendChild(E);h<o&&(l[b+1]=E=Z.createTextNode(i.substring(u,o)),z.insertBefore(E,s.nextSibling))}h=u;h>=o&&(b+=2);h>=H&&(t+=2)}}finally{if(g)g.style.display=k}}catch(v){V.console&&console.log(v&&v.stack||v)}}var V=window,G=["break,continue,do,else,for,if,return,while"],O=[[G,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],J=[O,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],K=[O,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
L=[K,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],O=[O,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],M=[G,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
N=[G,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],R=[G,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],G=[G,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],Q=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
S=/\S/,T=t({keywords:[J,L,O,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",M,N,G],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),U={};i(T,["default-code"]);i(C([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",
/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);i(C([["pln",/^\s+/,r," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,r,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],
["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);i(C([],[["atv",/^[\S\s]+/]]),["uq.val"]);i(t({keywords:J,hashComments:!0,cStyleComments:!0,types:Q}),["c","cc","cpp","cxx","cyc","m"]);i(t({keywords:"null,true,false"}),["json"]);i(t({keywords:L,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:Q}),
["cs"]);i(t({keywords:K,cStyleComments:!0}),["java"]);i(t({keywords:G,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]);i(t({keywords:M,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]);i(t({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]);i(t({keywords:N,
hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]);i(t({keywords:O,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]);i(t({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);i(t({keywords:R,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]);
i(C([],[["str",/^[\S\s]+/]]),["regex"]);var X=V.PR={createSimpleLexer:C,registerLangHandler:i,sourceDecorator:t,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:function(a,d,e){var b=document.createElement("div");b.innerHTML="<pre>"+a+"</pre>";b=b.firstChild;e&&z(b,e,!0);D({h:d,j:e,c:b,i:1});return b.innerHTML},
prettyPrint:e=e=function(a,d){function e(){for(var b=V.PR_SHOULD_USE_CONTINUATION?c.now()+250:Infinity;p<j.length&&c.now()<b;p++){for(var d=j[p],m=k,l=d;l=l.previousSibling;){var n=l.nodeType,s=(n===7||n===8)&&l.nodeValue;if(s?!/^\??prettify\b/.test(s):n!==3||/\S/.test(l.nodeValue))break;if(s){m={};s.replace(/\b(\w+)=([\w%+\-.:]+)/g,function(a,b,c){m[b]=c});break}}l=d.className;if((m!==k||f.test(l))&&!w.test(l)){n=!1;for(s=d.parentNode;s;s=s.parentNode)if(g.test(s.tagName)&&s.className&&f.test(s.className)){n=
!0;break}if(!n){d.className+=" prettyprinted";n=m.lang;if(!n){var n=l.match(q),A;if(!n&&(A=x(d))&&u.test(A.tagName))n=A.className.match(q);n&&(n=n[1])}if(y.test(d.tagName))s=1;else var s=d.currentStyle,v=i.defaultView,s=(s=s?s.whiteSpace:v&&v.getComputedStyle?v.getComputedStyle(d,r).getPropertyValue("white-space"):0)&&"pre"===s.substring(0,3);v=m.linenums;if(!(v=v==="true"||+v))v=(v=l.match(/\blinenums\b(?::(\d+))?/))?v[1]&&v[1].length?+v[1]:!0:!1;v&&z(d,v,s);t={h:n,c:d,j:v,i:s};D(t)}}}p<j.length?
P(e,250):"function"===typeof a&&a()}for(var b=d||document.body,i=b.ownerDocument||document,b=[b.getElementsByTagName("pre"),b.getElementsByTagName("code"),b.getElementsByTagName("xmp")],j=[],m=0;m<b.length;++m)for(var l=0,n=b[m].length;l<n;++l)j.push(b[m][l]);var b=r,c=Date;c.now||(c={now:function(){return+new Date}});var p=0,t,q=/\blang(?:uage)?-([\w.]+)(?!\S)/,f=/\bprettyprint\b/,w=/\bprettyprinted\b/,y=/pre|xmp/i,u=/^code$/i,g=/^(?:pre|code|xmp)$/i,k={};e()}};typeof define==="function"&&define.amd&&
define("google-code-prettify",[],function(){return X})})();return e}();R||P(Q,0)})();}()

(function (name, root, hilo) {
  var module = module || false
    , define = define || false;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = hilo;
  } else if (typeof define === "function" && define.amd) {
    define(hilo);
  } else {
    root[name] = hilo();
  }
}("Hilo", this, function () {
  /*jshint -W083, -W064, -W030*/

  // JSHint escapes:
  //  W083 - Don't make function within a loop (Evts)
  //  W064 - Missing new prefix when invoking constructor (Sizzle)
  //  W030 - Allow expressions

  "use strict";
  
  var hilo             // Public API
    , start            // Start time
    , elapsed          // Time elapsed
    , win = window     // Reference to window
    , doc = document   // Reference to document
    , sizzle           // Sizzle.js
    , detected
    , callbacks = []   // Array of functions to be executed on DOMReady
    , select           // Private Selector Function
    , feature          // Feature Detection
    , hiloAjax         // AJAX Func.
    , impEvts          // Array containing imp. evts.
    , impCss           // Array containing imp. css props.
    , _i               // Loop helper
    , Dom              // DOM Manipulation Methods
    , Test;            // Test class
  
  start = new Date().getTime();
  detected = (function () {
    var engine
      , browser
      , system
      , ua = win.navigator.userAgent
      , safariVersion
      , p;

    browser = {
      ie: 0,
      firefox: 0,
      safari: 0,
      konq: 0,
      opera: 0,
      chrome: 0,

      // Specific Version
      ver: null
    };

    system = {
      win: false,
      mac: false,
      x11: false,

      // Mobile Devices
      iphone: false,
      ipod: false,
      ipad: false,
      ios: false,
      android: false,
      nokiaN: false,
      winMobile: false,

      // Game Systems
      wii: false,
      ps: false
    };

    engine = {
      ie: 0,
      gecko: 0,
      webkit: 0,
      khtml: 0,
      opera: 0,

      // Complete version
      ver: null
    };

    if(window.opera) {
      engine.ver = browser.ver = window.opera.version();
      engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.webkit = parseFloat(engine.ver);

      // Figures out if chrome or Safari

      if (/Chrome\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.chrome = parseFloat(browser.ver);
      } else if (/Version\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.safari = parseFloat(browser.ver);
      } else {
        // Approximate version

        safariVersion = 1;

        if (engine.webkit < 100) {
          safariVersion = 1;
        } else if (engine.webkit < 312) {
          safariVersion = 1.2;
        } else if (engine.webkit < 412) {
          safariVersion = 1.3;
        } else {
          safariVersion = 2;
        }

        browser.safari = browser.ver = safariVersion;
      }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"];
      engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
      engine.ver = RegExp["$1"];
      engine.gecko = parseFloat(engine.ver);

      // Determine if it's firefox

      if (/Firefox\/(\S+)/.test(ua)) {
        browser.ver = RegExp["$1"];
        browser.firefox = parseFloat(browser.ver);
      }
    } else if (/MSIE ([^;]+)/.test(ua)) {
      engine.ver = browser.ver = RegExp["$1"];
      engine.ie = browser.ie = parseFloat(engine.ver);
    }

    // Detect browsers

    browser.ie = engine.ie;
    browser.opera = engine.opera;

    // Detect platform

    p = navigator.platform;

    system.win = p.indexOf("Win") === 0;
    system.mac = p.indexOf("Mac") === 0;
    system.x11 = (p === "X11") || (p.indexOf("Linux") === 0);

    // Detecting Windows OSs

    if (system.win) {
      if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
        if (RegExp["$1"] === "NT") {
          switch(RegExp["$2"]) {
            case "5.0":
              system.win = "2000";
              break;
            case "5.1":
              system.win = "XP";
              break;
            case "6.0":
              system.win = "Vista";
              break;
            case "6.1":
              system.win = "7";
              break;
            default:
              system.win = "NT";
              break;
          }
        } else if (RegExp["$1"] === "9x") {
          system.win = "ME";
        } else {
          system.win = RegExp["$1"];
        }
      }
    }

    // Mobile Devices

    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    // Windows Mobile

    if (system.win === "CE") {
      system.winMobile = system.win;
    } else if (system.win === "Ph") {
      if (/Windows Phone OS(\d+.\d+)/.test(ua)) {
        system.win = "Phone";
        system.winMobile = parseFloat(RegExp["$1"]);
      }
    }

    // Determine iOS Version

    if (system.mac && ua.indexOf("Mobile") > -1) {
      if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
        system.ios = parseFloat(RegExp["$1"].replace("_", "."));
      } else {
        system.ios = 2; // Can't really detect - so guess
      }
    }

    // Determine Android Version

    if (/Android (\d+\.\d+)/.test(ua)) {
      system.android = parseFloat(RegExp["$1"]);
    }

    // Gaming Systems

    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    // Name and Version

    if (system.win) {
      system.name = "Windows";
      system.version = system.win;
    } else if (system.mac) {
      system.name = "Mac";
    } else if (system.x11) {
      system.name = "Linux";
    } else {
      system.name = "Some other";
    }

    if (browser.ie) {
      browser.name = "IE";
      browser.version = browser.ie;
    } else if (browser.chrome) {
      browser.name = "Chrome";
      browser.version = browser.chrome;
    } else if (browser.safari) {
      browser.name = "Safari";
      browser.version = browser.safari;
    } else if (browser.konq) {
      browser.name = "Konqueror";
      browser.version = browser.konq;
    } else if (browser.opera) {
      browser.name = "Opera";
      browser.version = browser.opera;
    } else if (browser.firefox) {
      browser.name = "Firefox";
      browser.version = browser.firefox;
    }

    // return it

    return {
      engine: engine,
      browser: browser,
      system: system
    };
  }());
  
  // --------------------------------------------------
  // Feature Detection
  // --------------------------------------------------

  feature = (function () {
    var c = function (tagName) {
        return doc.createElement(tagName);
      }
      , i = c("input")
      , d = c("div")
      , cn = c("canvas")
      , fr = c("iframe")
      , is = function (i, attr, val) {
        return !!(i.setAttribute (attr, val));
      }
      , a = c("audio")
      , s = c("span")
      , v = c("video")
      , xr = new XMLHttpRequest();

    return {

      // addEventListener()

      addEventListener: (function () {
        return typeof win.addEventListener === "function";
      }()),

      // Application Cache (or Offline Web Apps)
      
      applicationCache: (function () {
        return !!win.applicationCache;
      }()),

      // Audio (tag)
      
      audio: (function () {
        return !!a.canPlayType;
      }()),

      // Preload audio (hmm.. background music?)
      
      audioPreload: (function () {
        return "preload" in a;
      }()),

      // Audio Types
      
      audioType: {

        // MP3 audio format

        mp3: (function () {
          return !!(a.canPlayType && a.canPlayType("audio/mpeg;").replace(/no/, ""));
        }()),

        // Vorbis audio format
        
        vorbis: (function () {
          return !!(a.canPlayType && a.canPlayType("audio/ogg; codecs='vorbis'").replace(/no/, ""));
        }()),

        // MS WAV audio format
        
        wav: (function () {
          return !!(a.canPlayType && a.canPlayType("audio/wav; codecs='1'").replace(/no/, ""));
        }()),

        // AAC audio format
        
        aac: (function () {
          return !!(a.canPlayType && a.canPlayType("audio/mp4; codecs='mp4a.40.2'").replace(/no/, ""));
        }())
      },

      // Canvas API
      
      canvas: (function () {
        return !!cn.getContext;
      }()),

      // Canvas Text
      
      canvasText: (function () {
        return !!cn.getContext && typeof cn.getContext("2d").fillText === "function";
      }()),

      // classList prop. in HTMLElement
      
      classList: (function () {
        return "classList" in s;
      }()),

      // Command
      
      command: (function () {
        return "type" in c("command");
      }()),

      // Form Constraint Validation
      
      consval: (function () {
        return "noValidate" in c("form");
      }()),

      // contentEditable
      
      contentEditable: (function () {
        return "isContentEditable" in s;
      }()),

      // Datalist (tag)
      
      datalist: (function () {
        return "options" in c("datalist");
      }()),

      // Details (tag)
      
      details: (function () {
        return "open" in c("details");
      }()),

      // Drag & Drop
      
      dragdrop: (function () {
        return "draggable" in s;
      }()),

      // ECMAScript 6
      
      es6: (function () {
        return typeof String.prototype.contains === "function";
      }()),

      // File system API
      
      fileapi: (function () {
        return typeof FileReader !== "undefined";
      }()),

      // gen5
      
      gen5: (function () {
        return parseInt(win.navigator.appVersion, 10) === 5;
      }()),

      // Geolocation
      
      geolocation: (function () {
        return "geolocation" in win.navigator;
      }()),

      // window.getSelection() method

      getSelection: (function () {
        return typeof win.getSelection === "function";
      }()),

      // History API
      
      history: (function () {
        return !!(win.history && history.pushState);
      }()),

      // IFrame
      
      iframe: {
        sandbox: (function () {
          return "sandbox" in fr;
        }()),
        srdoc: (function () {
          return "srcdoc" in fr;
        }())
      },

      // IndexedDB (use this instead of WebSQL)
      
      indexeddb: (function () {
        return !!(win.indexedDB && win.IDBKeyRange && win.IDBTransaction);
      }()),

      // Input
      
      input: {

        // Input Auto Focus
        
        autofocus: (function () {
          return "autofocus" in i;
        }()),

        // Placeholder
        
        placeholder: (function () {
          return "placeholder" in i;
        }()),

        // Input Types (they are pretty self-explanatory)
        
        type: {
          
          color: (function () {
            is(i, "type", "color");
            return i.type !== "text";
          }()),

          date: (function () {
            is(i, "type", "date");
            return i.type !== "text";
          }()),

          datetime: (function () {
            is(i, "type", "datetime");
            return i.type !== "text";
          }()),

          datetimeLocal: (function () {
            is(i, "type", "datetime-local");
            return i.type !== "text";
          }()),

          email: (function () {
            is(i, "type", "email");
            return i.type !== "text";
          }()),

          month: (function () {
            is(i, "type", "month");
            return i.type !== "text";
          }()),

          number: (function () {
            is(i, "type", "number");
            return i.type !== "text";
          }()),

          range: (function () {
            is(i, "type", "range");
            return i.type !== "text";
          }()),

          search: (function () {
            is(i, "type", "search");
            return i.type !== "text";
          }()),

          tel: (function () {
            is(i, "type", "tel");
            return i.type !== "text";
          }()),

          time: (function () {
            is(i, "type", "time");
            return i.type !== "text";
          }()),

          week: (function () {
            is(i, "type", "week");
            return i.type !== "text";
          }())
        }
      },

      // Local Storage
      
      localStorage: (function () {
        try {
          return "localStorage" in win && win["localStorage"] !== null && !!win.localStorage.setItem;
        } catch(e){
          return false;
        }
      }()),

      // Meter (tag)
      
      meter: (function () {
        return "value" in c("meter");
      }()),

      // Microdata
      
      microdata: (function () {
        return "getItems" in doc;
      }()),

      // Offline (App Cache)
      
      offline: (function () {
        return !!win.applicationCache;
      }()),

      // Output (tag)
      
      output: (function () {
        return "value" in c("output");
      }()),

      // Progress (tag)

      progress: (function () {
        return "value" in c("progress");
      }()),

      // querySelector & querySelectorAll

      qsa: (function () {
        return "querySelector" in doc && "querySelectorAll" in doc;
      }()),

      // CSS3 Selectors in querySelectorAll

      qsa3: (function () {
        try {
          return doc.querySelectorAll(":root").length > 0;
        } catch (e) {
          return false;
        }
      }()),

      // requestAnimationFrame

      requestAnimationFrame: (function () {
        if (typeof requestAnimationFrame === "function") {
          return true;
        } else if (typeof msRequestAnimationFrame === "function") {
          return "ms";
        } else if (typeof webkitRequestAnimationFrame === "function") {
          return "webkit";
        } else if (typeof mozRequestAnimationFrame === "function") {
          return "moz";
        } else {
          return false;
        }
      }()),

      // Server-sent Events

      serverEvt: (function () {
        return typeof EventSource !== "undefined";
      }()),

      // Session Storage

      sessionStorage: (function () {
        try {
          return "sessionStorage" in win && win["sessionStorage"] !== null;
        } catch(e) {
          return false;
        }
      }()),

      // Modal Dialog (showModalDialog)

      showModalDialog: (function () {
        return typeof win.showModalDialog === "function";
      }()),

      // SVG (Scalable Vector Graphics)
      svg: (function () {
        return !!(doc.createElementNS && doc.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
      }()),

      // SVG in text/html

      svginhtml:(function () {
        d.innerHTML = "<svg></svg>";
        return !!(win.SVGSVGElement && d.firstChild instanceof win.SVGSVGElement);
      }()),

      // Template (tag)

      template: (function () {
        return "content" in c("template");
      }()),

      // Time (tag)

      time: (function () {
        return "datetime" in c("time");
      }()),

      // Undo (not just Ctrl + Z)

      undo: (function () {
        return typeof UndoManager !== "undefined";
      }()),

      // Video

      video: (function () {
        try {
          return !!v.canPlayType;
        } catch (e) {
          return false;
        }
      }()),

      // Video Captions

      videoCaptions: (function () {
        return "src" in c("track");
      }()),

      // Video Formats

      videoFormats: {

        // H264 Video Format (MP4)

        h264: (function () {
          try {
            return v.canPlayType("video/mp4; codecs='avc1.42E01E, mp4a.40.2'");
          } catch (e) {
            return false;
          }
        }()),

        // WebM Video Format

        webm: (function () {
          try {
            return v.canPlayType("video/webm; codecs='vp8, vorbis'");
          } catch (e) {
            return false;
          }
        }()),

        // OGG Theora Video Format

        ogg: (function () {
          try {
            return v.canPlayType("video/ogg; codecs='theora, vorbis'");
          } catch (e) {
            return false;
          }
        }())
      },

      // Video posters

      videoPoster: (function () {
        return "poster" in c("video");
      }()),

      // Web Audio API (NOT the <audio> tag)

      webAudio: (function () {
        return !!(win.webkitAudioContext || win.AudioContext);
      }()),

      // WebSockets

      webSockets: (function () {
        return !!win.webSocket;
      }()),

      // WebSQL (a deprecated specification; use IndexedDB instead)

      websql: (function () {
        return !!win.openDatabase;
      }()),

      // Web Workers

      webWorkers: (function () {
        return !!win.Worker;
      }()),

      // Widgets

      widgets: (function () {
        return typeof widget !== "undefined";
      }()),

      // Cross-document messaging

      xdocmsg: (function () {
        return !!win.postMessage;
      }()),

      // XML HTTP Request

      xhr: {

        // Cross-domain requests

        xdr: (function () {
          return "withCredentials" in xr;
        }()),

        // Send as form data

        formdata: (function () {
          return !!win.FormData;
        }()),

        // Upload progress events

        upe: (function () {
          return "upload" in xr;
        }())
      }
    };
  }());

  // querySelector pollyfill using Sizzle

  sizzle = (function(){

    if (feature.qsa3 === true) {
      return;
    }

    /*!
     * Sizzle CSS Selector Engine v1.10.6-pre
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     */

    var i,
      support,
      cachedruns = function () {
        var keys = [];

        function cache( key, value ) {
          // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
          if ( keys.push( key += " " ) > Expr.cacheLength ) {
            // Only keep the most recent entries
            delete cache[ keys.shift() ];
          }
          return (cache[ key ] = value);
        }
        return cache;
      },
      Expr,
      getText,
      isXML,
      compile,
      outermostContext,
      sortInput,

      // Local document vars
      setDocument,
      document,
      docElem,
      documentIsHTML,
      rbuggyQSA,
      rbuggyMatches,
      matches,
      contains,

      // Instance-specific data
      expando = "sizzle" + -(new Date()),
      preferredDoc = win.document,
      dirruns = 0,
      done = 0,
      classCache,
      tokenCache,
      compilerCache,
      hasDuplicate = false,
      sortOrder = function( a, b ) {
        if ( a === b ) {
          hasDuplicate = true;
          return 0;
        }
        return 0;
      },

      // General-purpose constants
      strundefined = typeof undefined,
      MAX_NEGATIVE = 1 << 31,

      // Instance methods
      hasOwn = ({}).hasOwnProperty,
      arr = [],
      pop = arr.pop,
      push_native = arr.push,
      push = arr.push,
      slice = arr.slice,
      // Use a stripped-down indexOf if we can't use a native one
      indexOf = arr.indexOf || function( elem ) {
        var i = 0,
          len = this.length;
        for ( ; i < len; i++ ) {
          if ( this[i] === elem ) {
            return i;
          }
        }
        return -1;
      },

      booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

      // Regular expressions

      // Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
      whitespace = "[\\x20\\t\\r\\n\\f]",
      // http://www.w3.org/TR/css3-syntax/#characters
      characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

      // Loosely modeled on CSS identifier characters
      // An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
      // Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
      identifier = characterEncoding.replace( "w", "w#" ),

      // Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
      attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
        "*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

      // Prefer arguments quoted,
      //   then not containing pseudos/brackets,
      //   then attribute selectors/non-parenthetical expressions,
      //   then anything else
      // These preferences are here to reduce the number of selectors
      //   needing tokenize in the PSEUDO preFilter
      pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

      // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
      rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

      rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
      rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

      rsibling = new RegExp( whitespace + "*[+~]" ),
      rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

      rpseudo = new RegExp( pseudos ),
      ridentifier = new RegExp( "^" + identifier + "$" ),

      matchExpr = {
        "ID": new RegExp( "^#(" + characterEncoding + ")" ),
        "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
        "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
        "ATTR": new RegExp( "^" + attributes ),
        "PSEUDO": new RegExp( "^" + pseudos ),
        "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
          "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
          "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
        "bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
          whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
      },

      rnative = /^[^{]+\{\s*\[native \w/,

      // Easily-parseable/retrievable ID or TAG or CLASS selectors
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

      rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,

      rescape = /'|\\/g,

      // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
      runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
      funescape = function( _, escaped, escapedWhitespace ) {
        var high = "0x" + escaped - 0x10000;
        // NaN means non-codepoint
        // Support: Firefox
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ?
          escaped :
          // BMP codepoint
          high < 0 ?
            String.fromCharCode( high + 0x10000 ) :
            // Supplemental Plane codepoint (surrogate pair)
            String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
      };

    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(
        (arr = slice.call( preferredDoc.childNodes )),
        preferredDoc.childNodes
      );
      // Support: Android<4.0
      // Detect silently failing push.apply
      arr[ preferredDoc.childNodes.length ].nodeType;
    } catch ( e ) {
      push = { apply: arr.length ?

        // Leverage slice if possible
        function( target, els ) {
          push_native.apply( target, slice.call(els) );
        } :

        // Support: IE<9
        // Otherwise append directly
        function( target, els ) {
          var j = target.length,
            i = 0;
          // Can't trust NodeList.length
          while ( (target[j++] = els[i++]) ) {}
          target.length = j - 1;
        }
      };
    }

    /**
     * Create key-value caches of limited size
     * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
     *  property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *  deleting the oldest entry
     */

    function select( selector, context, results, seed ) {
      var i, tokens, token, type, find,
        match = tokenize( selector );

      if ( !seed ) {
        // Try to minimize operations if there is only one group
        if ( match.length === 1 ) {

          // Take a shortcut and set the context if the root selector is an ID
          tokens = match[0] = match[0].slice( 0 );
          if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
              support.getById && context.nodeType === 9 && documentIsHTML &&
              Expr.relative[ tokens[1].type ] ) {

            context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
            if ( !context ) {
              return results;
            }
            selector = selector.slice( tokens.shift().value.length );
          }

          // Fetch a seed set for right-to-left matching
          i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
          while ( i-- ) {
            token = tokens[i];

            // Abort if we hit a combinator
            if ( Expr.relative[ (type = token.type) ] ) {
              break;
            }
            if ( (find = Expr.find[ type ]) ) {
              // Search, expanding context for leading sibling combinators
              if ( (seed = find(
                token.matches[0].replace( runescape, funescape ),
                rsibling.test( tokens[0].type ) && context.parentNode || context
              )) ) {

                // If seed is empty or no tokens remain, we can return early
                tokens.splice( i, 1 );
                selector = seed.length && toSelector( tokens );
                if ( !selector ) {
                  push.apply( results, seed );
                  return results;
                }

                break;
              }
            }
          }
        }
      }

      // Compile and execute a filtering function
      // Provide `match` to avoid retokenization if we modified the selector above
      compile( selector, match )(
        seed,
        context,
        !documentIsHTML,
        results,
        rsibling.test( selector )
      );
      return results;
    }

    function Sizzle( selector, context, results, seed ) {
      var match, elem, m, nodeType,
        // QSA vars
        i, groups, old, nid, newContext, newSelector;

      if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
        setDocument( context );
      }

      context = context || document;
      results = results || [];

      if ( !selector || typeof selector !== "string" ) {
        return results;
      }

      if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
        return [];
      }

      if ( documentIsHTML && !seed ) {

        // Shortcuts
        if ( (match = rquickExpr.exec( selector )) ) {
          // Speed-up: Sizzle("#ID")
          if ( (m = match[1]) ) {
            if ( nodeType === 9 ) {
              elem = context.getElementById( m );
              // Check parentNode to catch when Blackberry 4.6 returns
              // nodes that are no longer in the document #6963
              if ( elem && elem.parentNode ) {
                // Handle the case where IE, Opera, and Webkit return items
                // by name instead of ID
                if ( elem.id === m ) {
                  results.push( elem );
                  return results;
                }
              } else {
                return results;
              }
            } else {
              // Context is not a document
              if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                contains( context, elem ) && elem.id === m ) {
                results.push( elem );
                return results;
              }
            }

          // Speed-up: Sizzle("TAG")
          } else if ( match[2] ) {
            push.apply( results, context.getElementsByTagName( selector ) );
            return results;

          // Speed-up: Sizzle(".CLASS")
          } else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
            push.apply( results, context.getElementsByClassName( m ) );
            return results;
          }
        }

        // QSA path
        if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType === 9 && selector;

          // qSA works strangely on Element-rooted queries
          // We can work around this by specifying an extra ID on the root
          // and working up from there (Thanks to Andrew Dupont for the technique)
          // IE 8 doesn't work on object elements
          if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
            groups = tokenize( selector );

            if ( (old = context.getAttribute("id")) ) {
              nid = old.replace( rescape, "\\$&" );
            } else {
              context.setAttribute( "id", nid );
            }
            nid = "[id='" + nid + "'] ";

            i = groups.length;
            while ( i-- ) {
              groups[i] = nid + toSelector( groups[i] );
            }
            newContext = rsibling.test( selector ) && context.parentNode || context;
            newSelector = groups.join(",");
          }

          if ( newSelector ) {
            try {
              push.apply( results,
                newContext.querySelectorAll( newSelector )
              );
              return results;
            } catch(qsaError) {
            } finally {
              if ( !old ) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }

      // All others
      return select( selector.replace( rtrim, "$1" ), context, results, seed );
    }

    function createCache () {
      var keys = [];

      function cache( key, value ) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if ( keys.push( key += " " ) > Expr.cacheLength ) {
          // Only keep the most recent entries
          delete cache[ keys.shift() ];
        }
        return (cache[ key ] = value);
      }
      return cache;
    }


    classCache = createCache();
    tokenCache = createCache();
    compilerCache = createCache();

    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction( fn ) {
      fn[ expando ] = true;
      return fn;
    }

    /**
     * Support testing using an element
     * @param {Function} fn Passed the created div and expects a boolean result
     */
    function assert( fn ) {
      var div = document.createElement("div");

      try {
        return !!fn( div );
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if ( div.parentNode ) {
          div.parentNode.removeChild( div );
        }
        // release memory in IE
        div = null;
      }
    }

    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle( attrs, handler ) {
      var arr = attrs.split("|"),
        i = attrs.length;

      while ( i-- ) {
        Expr.attrHandle[ arr[i] ] = handler;
      }
    }

    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck( a, b ) {
      var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
          ( ~b.sourceIndex || MAX_NEGATIVE ) -
          ( ~a.sourceIndex || MAX_NEGATIVE );

      // Use IE sourceIndex if available on both nodes
      if ( diff ) {
        return diff;
      }

      // Check if b follows a
      if ( cur ) {
        while ( (cur = cur.nextSibling) ) {
          if ( cur === b ) {
            return -1;
          }
        }
      }

      return a ? 1 : -1;
    }

    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo( type ) {
      return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return name === "input" && elem.type === type;
      };
    }

    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo( type ) {
      return function( elem ) {
        var name = elem.nodeName.toLowerCase();
        return (name === "input" || name === "button") && elem.type === type;
      };
    }

    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo( fn ) {
      return markFunction(function( argument ) {
        argument = +argument;
        return markFunction(function( seed, matches ) {
          var j,
            matchIndexes = fn( [], seed.length, argument ),
            i = matchIndexes.length;

          // Match elements found at the specified indexes
          while ( i-- ) {
            if ( seed[ (j = matchIndexes[i]) ] ) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }

    /**
     * Detect xml
     * @param {Element|Object} elem An element or a document
     */
    isXML = Sizzle.isXML = function( elem ) {
      // documentElement is verified for cases where it doesn't yet exist
      // (such as loading iframes in IE - #4833)
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== "HTML" : false;
    };

    // Expose support vars for convenience
    support = Sizzle.support = {};

    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function( node ) {
      var doc = node ? node.ownerDocument || node : preferredDoc,
        parent = doc.defaultView;

      // If no document and documentElement is available, return
      if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
        return document;
      }

      // Set our document
      document = doc;
      docElem = doc.documentElement;

      // Support tests
      documentIsHTML = !isXML( doc );

      // Support: IE>8
      // If iframe document is assigned to "document" variable and if iframe has been reloaded,
      // IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
      // IE6-8 do not support the defaultView property so parent will be undefined
      if ( parent && parent.attachEvent && parent !== parent.top ) {
        parent.attachEvent( "onbeforeunload", function() {
          setDocument();
        });
      }

      /* Attributes
      ---------------------------------------------------------------------- */

      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
      support.attributes = assert(function( div ) {
        div.className = "i";
        return !div.getAttribute("className");
      });

      /* getElement(s)By*
      ---------------------------------------------------------------------- */

      // Check if getElementsByTagName("*") returns only elements
      support.getElementsByTagName = assert(function( div ) {
        div.appendChild( doc.createComment("") );
        return !div.getElementsByTagName("*").length;
      });

      // Check if getElementsByClassName can be trusted
      support.getElementsByClassName = assert(function( div ) {
        div.innerHTML = "<div class='a'></div><div class='a i'></div>";

        // Support: Safari<4
        // Catch class over-caching
        div.firstChild.className = "i";
        // Support: Opera<10
        // Catch gEBCN failure to find non-leading classes
        return div.getElementsByClassName("i").length === 2;
      });

      // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert(function( div ) {
        docElem.appendChild( div ).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
      });

      // ID find and filter
      if ( support.getById ) {
        Expr.find["ID"] = function( id, context ) {
          if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
            var m = context.getElementById( id );
            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            return m && m.parentNode ? [m] : [];
          }
        };
        Expr.filter["ID"] = function( id ) {
          var attrId = id.replace( runescape, funescape );
          return function( elem ) {
            return elem.getAttribute("id") === attrId;
          };
        };
      } else {
        // Support: IE6/7
        // getElementById is not reliable as a find shortcut
        delete Expr.find["ID"];

        Expr.filter["ID"] =  function( id ) {
          var attrId = id.replace( runescape, funescape );
          return function( elem ) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };
      }

      // Tag
      Expr.find["TAG"] = support.getElementsByTagName ?
        function( tag, context ) {
          if ( typeof context.getElementsByTagName !== strundefined ) {
            return context.getElementsByTagName( tag );
          }
        } :
        function( tag, context ) {
          var elem,
            tmp = [],
            i = 0,
            results = context.getElementsByTagName( tag );

          // Filter out possible comments
          if ( tag === "*" ) {
            while ( (elem = results[i++]) ) {
              if ( elem.nodeType === 1 ) {
                tmp.push( elem );
              }
            }

            return tmp;
          }
          return results;
        };

      // Class
      Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
        if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
          return context.getElementsByClassName( className );
        }
      };

      /* QSA/matchesSelector
      ---------------------------------------------------------------------- */

      // QSA and matchesSelector support

      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      rbuggyMatches = [];

      // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See http://bugs.jquery.com/ticket/13378
      rbuggyQSA = [];

      if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function( div ) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // http://bugs.jquery.com/ticket/12359
          div.innerHTML = "<select><option selected=''></option></select>";

          // Support: IE8
          // Boolean attributes and "value" are not treated correctly
          if ( !div.querySelectorAll("[selected]").length ) {
            rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
          }

          // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests
          if ( !div.querySelectorAll(":checked").length ) {
            rbuggyQSA.push(":checked");
          }
        });

        assert(function( div ) {

          // Support: Opera 10-12/IE8
          // ^= $= *= and empty values
          // Should not select anything
          // Support: Windows 8 Native Apps
          // The type attribute is restricted during .innerHTML assignment
          var input = doc.createElement("input");
          input.setAttribute( "type", "hidden" );
          div.appendChild( input ).setAttribute( "t", "" );

          if ( div.querySelectorAll("[t^='']").length ) {
            rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
          }

          // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests
          if ( !div.querySelectorAll(":enabled").length ) {
            rbuggyQSA.push( ":enabled", ":disabled" );
          }

          // Opera 10-11 does not throw on post-comma invalid pseudos
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }

      if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
        docElem.mozMatchesSelector ||
        docElem.oMatchesSelector ||
        docElem.msMatchesSelector) )) ) {

        assert(function( div ) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call( div, "div" );

          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call( div, "[s!='']:x" );
          rbuggyMatches.push( "!=", pseudos );
        });
      }

      rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
      rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

      /* Contains
      ---------------------------------------------------------------------- */

      // Element contains another
      // Purposefully does not implement inclusive descendent
      // As in, an element does not contain itself
      contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
        function( a, b ) {
          var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
          return a === bup || !!( bup && bup.nodeType === 1 && (
            adown.contains ?
              adown.contains( bup ) :
              a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
          ));
        } :
        function( a, b ) {
          if ( b ) {
            while ( (b = b.parentNode) ) {
              if ( b === a ) {
                return true;
              }
            }
          }
          return false;
        };

      /* Sorting
      ---------------------------------------------------------------------- */

      // Document order sorting
      sortOrder = docElem.compareDocumentPosition ?
      function( a, b ) {

        // Flag for duplicate removal
        if ( a === b ) {
          hasDuplicate = true;
          return 0;
        }

        var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

        if ( compare ) {
          // Disconnected nodes
          if ( compare & 1 ||
            (!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

            // Choose the first element that is related to our preferred document
            if ( a === doc || contains(preferredDoc, a) ) {
              return -1;
            }
            if ( b === doc || contains(preferredDoc, b) ) {
              return 1;
            }

            // Maintain original order
            return sortInput ?
              ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
              0;
          }

          return compare & 4 ? -1 : 1;
        }

        // Not directly comparable, sort on existence of method
        return a.compareDocumentPosition ? -1 : 1;
      } :
      function( a, b ) {
        var cur,
          i = 0,
          aup = a.parentNode,
          bup = b.parentNode,
          ap = [ a ],
          bp = [ b ];

        // Exit early if the nodes are identical
        if ( a === b ) {
          hasDuplicate = true;
          return 0;

        // Parentless nodes are either documents or disconnected
        } else if ( !aup || !bup ) {
          return a === doc ? -1 :
            b === doc ? 1 :
            aup ? -1 :
            bup ? 1 :
            sortInput ?
            ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
            0;

        // If the nodes are siblings, we can do a quick check
        } else if ( aup === bup ) {
          return siblingCheck( a, b );
        }

        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while ( (cur = cur.parentNode) ) {
          ap.unshift( cur );
        }
        cur = b;
        while ( (cur = cur.parentNode) ) {
          bp.unshift( cur );
        }

        // Walk down the tree looking for a discrepancy
        while ( ap[i] === bp[i] ) {
          i++;
        }

        return i ?
          // Do a sibling check if the nodes have a common ancestor
          siblingCheck( ap[i], bp[i] ) :

          // Otherwise nodes in our document sort first
          ap[i] === preferredDoc ? -1 :
          bp[i] === preferredDoc ? 1 :
          0;
      };

      return doc;
    };

    // Sizzle.matches = function( expr, elements ) {
    //   return Sizzle( expr, null, null, elements );
    // };

    Sizzle.matchesSelector = function( elem, expr ) {
      // Set document vars if needed
      if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
      }

      // Make sure that attribute selectors are quoted
      expr = expr.replace( rattributeQuotes, "='$1']" );

      if ( support.matchesSelector && documentIsHTML &&
        ( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
        ( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

        try {
          var ret = matches.call( elem, expr );

          // IE 9's matchesSelector returns false on disconnected nodes
          if ( ret || support.disconnectedMatch ||
              // As well, disconnected nodes are said to be in a document
              // fragment in IE 9
              elem.document && elem.document.nodeType !== 11 ) {
            return ret;
          }
        } catch(e) {}
      }

      return Sizzle( expr, document, null, [elem] ).length > 0;
    };

    Sizzle.contains = function( context, elem ) {
      // Set document vars if needed
      if ( ( context.ownerDocument || context ) !== document ) {
        setDocument( context );
      }
      return contains( context, elem );
    };

    Sizzle.attr = function( elem, name ) {
      // Set document vars if needed
      if ( ( elem.ownerDocument || elem ) !== document ) {
        setDocument( elem );
      }

      var fn = Expr.attrHandle[ name.toLowerCase() ],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
          fn( elem, name, !documentIsHTML ) :
          undefined;

      return val === undefined ?
        support.attributes || !documentIsHTML ?
          elem.getAttribute( name ) :
          (val = elem.getAttributeNode(name)) && val.specified ?
            val.value :
            null :
        val;
    };

    Sizzle.error = function( msg ) {
      throw new Error( "Syntax error, unrecognized expression: " + msg );
    };

    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function( results ) {
      var elem,
        duplicates = [],
        j = 0,
        i = 0;

      // Unless we *know* we can detect duplicates, assume their presence
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice( 0 );
      results.sort( sortOrder );

      if ( hasDuplicate ) {
        while ( (elem = results[i++]) ) {
          if ( elem === results[ i ] ) {
            j = duplicates.push( i );
          }
        }
        while ( j-- ) {
          results.splice( duplicates[ j ], 1 );
        }
      }

      return results;
    };

    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function( elem ) {
      var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;

      if ( !nodeType ) {
        // If no nodeType, this is expected to be an array
        for ( ; (node = elem[i]); i++ ) {
          // Do not traverse comment nodes
          ret += getText( node );
        }
      } else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (see #11153)
        if ( typeof elem.textContent === "string" ) {
          return elem.textContent;
        } else {
          // Traverse its children
          for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
            ret += getText( elem );
          }
        }
      } else if ( nodeType === 3 || nodeType === 4 ) {
        return elem.nodeValue;
      }
      // Do not include comment or processing instruction nodes

      return ret;
    };

    Expr = Sizzle.selectors = {

      // Can be adjusted by the user
      cacheLength: 50,

      createPseudo: markFunction,

      match: matchExpr,

      attrHandle: {},

      find: {},

      relative: {
        ">": { dir: "parentNode", first: true },
        " ": { dir: "parentNode" },
        "+": { dir: "previousSibling", first: true },
        "~": { dir: "previousSibling" }
      },

      preFilter: {
        "ATTR": function( match ) {
          match[1] = match[1].replace( runescape, funescape );

          // Move the given value to match[3] whether quoted or unquoted
          match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

          if ( match[2] === "~=" ) {
            match[3] = " " + match[3] + " ";
          }

          return match.slice( 0, 4 );
        },

        "CHILD": function( match ) {
          /* matches from matchExpr["CHILD"]
            1 type (only|nth|...)
            2 what (child|of-type)
            3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
            4 xn-component of xn+y argument ([+-]?\d*n|)
            5 sign of xn-component
            6 x of xn-component
            7 sign of y-component
            8 y of y-component
          */
          match[1] = match[1].toLowerCase();

          if ( match[1].slice( 0, 3 ) === "nth" ) {
            // nth-* requires argument
            if ( !match[3] ) {
              Sizzle.error( match[0] );
            }

            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
            match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

          // other types prohibit arguments
          } else if ( match[3] ) {
            Sizzle.error( match[0] );
          }

          return match;
        },

        "PSEUDO": function( match ) {
          var excess,
            unquoted = !match[5] && match[2];

          if ( matchExpr["CHILD"].test( match[0] ) ) {
            return null;
          }

          // Accept quoted arguments as-is
          if ( match[3] && match[4] !== undefined ) {
            match[2] = match[4];

          // Strip excess characters from unquoted arguments
          } else if ( unquoted && rpseudo.test( unquoted ) &&
            // Get excess from tokenize (recursively)
            (excess = tokenize( unquoted, true )) &&
            // advance to the next closing parenthesis
            (excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

            // excess is a negative index
            match[0] = match[0].slice( 0, excess );
            match[2] = unquoted.slice( 0, excess );
          }

          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice( 0, 3 );
        }
      },

      filter: {

        "TAG": function( nodeNameSelector ) {
          var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
          return nodeNameSelector === "*" ?
            function() { return true; } :
            function( elem ) {
              return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
            };
        },

        "CLASS": function( className ) {
          var pattern = classCache[ className + " " ];

          return pattern ||
            (pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
            classCache( className, function( elem ) {
              return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
            });
        },

        "ATTR": function( name, operator, check ) {
          return function( elem ) {
            var result = Sizzle.attr( elem, name );

            if ( result == null ) {
              return operator === "!=";
            }
            if ( !operator ) {
              return true;
            }

            result += "";

            return operator === "=" ? result === check :
              operator === "!=" ? result !== check :
              operator === "^=" ? check && result.indexOf( check ) === 0 :
              operator === "*=" ? check && result.indexOf( check ) > -1 :
              operator === "$=" ? check && result.slice( -check.length ) === check :
              operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
              operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
              false;
          };
        },

        "CHILD": function( type, what, argument, first, last ) {
          var simple = type.slice( 0, 3 ) !== "nth",
            forward = type.slice( -4 ) !== "last",
            ofType = what === "of-type";

          return first === 1 && last === 0 ?

            // Shortcut for :nth-*(n)
            function( elem ) {
              return !!elem.parentNode;
            } :

            function( elem, context, xml ) {
              var cache, outerCache, node, diff, nodeIndex, start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType;

              if ( parent ) {

                // :(first|last|only)-(child|of-type)
                if ( simple ) {
                  while ( dir ) {
                    node = elem;
                    while ( (node = node[ dir ]) ) {
                      if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
                        return false;
                      }
                    }
                    // Reverse direction for :only-* (if we haven't yet done so)
                    start = dir = type === "only" && !start && "nextSibling";
                  }
                  return true;
                }

                start = [ forward ? parent.firstChild : parent.lastChild ];

                // non-xml :nth-child(...) stores cache data on `parent`
                if ( forward && useCache ) {
                  // Seek `elem` from a previously-cached index
                  outerCache = parent[ expando ] || (parent[ expando ] = {});
                  cache = outerCache[ type ] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = cache[0] === dirruns && cache[2];
                  node = nodeIndex && parent.childNodes[ nodeIndex ];

                  while ( (node = ++nodeIndex && node && node[ dir ] ||

                    // Fallback to seeking `elem` from the start
                    (diff = nodeIndex = 0) || start.pop()) ) {

                    // When found, cache indexes on `parent` and break
                    if ( node.nodeType === 1 && ++diff && node === elem ) {
                      outerCache[ type ] = [ dirruns, nodeIndex, diff ];
                      break;
                    }
                  }

                // Use previously-cached element index if available
                } else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
                  diff = cache[1];

                // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                } else {
                  // Use the same loop as above to seek `elem` from the start
                  while ( (node = ++nodeIndex && node && node[ dir ] ||
                    (diff = nodeIndex = 0) || start.pop()) ) {

                    if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
                      // Cache the index of each encountered element
                      if ( useCache ) {
                        (node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
                      }

                      if ( node === elem ) {
                        break;
                      }
                    }
                  }
                }

                // Incorporate the offset, then check against cycle size
                diff -= last;
                return diff === first || ( diff % first === 0 && diff / first >= 0 );
              }
            };
        },

        "PSEUDO": function( pseudo, argument ) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that SetFilters inherits from pseudos
          var args,
            fn = Expr.pseudos[ pseudo ] || Expr.SetFilters[ pseudo.toLowerCase() ] ||
              Sizzle.error( "unsupported pseudo: " + pseudo );

          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does
          if ( fn[ expando ] ) {
            return fn( argument );
          }

          // But maintain support for old signatures
          if ( fn.length > 1 ) {
            args = [ pseudo, pseudo, "", argument ];
            return Expr.SetFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
              markFunction(function( seed, matches ) {
                var idx,
                  matched = fn( seed, argument ),
                  i = matched.length;
                while ( i-- ) {
                  idx = indexOf.call( seed, matched[i] );
                  seed[ idx ] = !( matches[ idx ] = matched[i] );
                }
              }) :
              function( elem ) {
                return fn( elem, 0, args );
              };
          }

          return fn;
        }
      },

      pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function( selector ) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
            results = [],
            matcher = compile( selector.replace( rtrim, "$1" ) );

          return matcher[ expando ] ?
            markFunction(function( seed, matches, context, xml ) {
              var elem,
                unmatched = matcher( seed, null, xml, [] ),
                i = seed.length;

              // Match elements unmatched by `matcher`
              while ( i-- ) {
                if ( (elem = unmatched[i]) ) {
                  seed[i] = !(matches[i] = elem);
                }
              }
            }) :
            function( elem, context, xml ) {
              input[0] = elem;
              matcher( input, null, xml, results );
              return !results.pop();
            };
        }),

        "has": markFunction(function( selector ) {
          return function( elem ) {
            return Sizzle( selector, elem ).length > 0;
          };
        }),

        "contains": markFunction(function( text ) {
          return function( elem ) {
            return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
          };
        }),

        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction( function( lang ) {
          // lang value must be a valid identifier
          if ( !ridentifier.test(lang || "") ) {
            Sizzle.error( "unsupported lang: " + lang );
          }
          lang = lang.replace( runescape, funescape ).toLowerCase();
          return function( elem ) {
            var elemLang;
            do {
              if ( (elemLang = documentIsHTML ?
                elem.lang :
                elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
              }
            } while ( (elem = elem.parentNode) && elem.nodeType === 1 );
            return false;
          };
        }),

        // Miscellaneous
        "target": function( elem ) {
          var hash = win.location && win.location.hash;
          return hash && hash.slice( 1 ) === elem.id;
        },

        "root": function( elem ) {
          return elem === docElem;
        },

        "focus": function( elem ) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },

        // Boolean properties
        "enabled": function( elem ) {
          return elem.disabled === false;
        },

        "disabled": function( elem ) {
          return elem.disabled === true;
        },

        "checked": function( elem ) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
        },

        "selected": function( elem ) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if ( elem.parentNode ) {
            elem.parentNode.selectedIndex;
          }

          return elem.selected === true;
        },

        // Contents
        "empty": function( elem ) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
          //   not comment, processing instructions, or others
          // Thanks to Diego Perini for the nodeName shortcut
          //   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
          for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
            if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
              return false;
            }
          }
          return true;
        },

        "parent": function( elem ) {
          return !Expr.pseudos["empty"]( elem );
        },

        // Element/input types
        "header": function( elem ) {
          return rheader.test( elem.nodeName );
        },

        "input": function( elem ) {
          return rinputs.test( elem.nodeName );
        },

        "button": function( elem ) {
          var name = elem.nodeName.toLowerCase();
          return name === "input" && elem.type === "button" || name === "button";
        },

        "text": function( elem ) {
          var attr;
          // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
          // use getAttribute instead to test this case
          return elem.nodeName.toLowerCase() === "input" &&
            elem.type === "text" &&
            ( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
        },

        // Position-in-collection
        "first": createPositionalPseudo(function() {
          return [ 0 ];
        }),

        "last": createPositionalPseudo(function( matchIndexes, length ) {
          return [ length - 1 ];
        }),

        "eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
          return [ argument < 0 ? argument + length : argument ];
        }),

        "even": createPositionalPseudo(function( matchIndexes, length ) {
          var i = 0;
          for ( ; i < length; i += 2 ) {
            matchIndexes.push( i );
          }
          return matchIndexes;
        }),

        "odd": createPositionalPseudo(function( matchIndexes, length ) {
          var i = 1;
          for ( ; i < length; i += 2 ) {
            matchIndexes.push( i );
          }
          return matchIndexes;
        }),

        "lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
          var i = argument < 0 ? argument + length : argument;
          for ( ; --i >= 0; ) {
            matchIndexes.push( i );
          }
          return matchIndexes;
        }),

        "gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
          var i = argument < 0 ? argument + length : argument;
          for ( ; ++i < length; ) {
            matchIndexes.push( i );
          }
          return matchIndexes;
        })
      }
    };

    Expr.pseudos["nth"] = Expr.pseudos["eq"];

    // Add button/input type pseudos
    for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
      Expr.pseudos[ i ] = createInputPseudo( i );
    }
    for ( i in { submit: true, reset: true } ) {
      Expr.pseudos[ i ] = createButtonPseudo( i );
    }

    // Easy API for creating new SetFilters
    function SetFilters() {}
    SetFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.SetFilters = new SetFilters();

    function tokenize( selector, parseOnly ) {
      var matched, match, tokens, type,
        soFar, groups, preFilters,
        cached = tokenCache[ selector + " " ];

      if ( cached ) {
        return parseOnly ? 0 : cached.slice( 0 );
      }

      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;

      while ( soFar ) {

        // Comma and first run
        if ( !matched || (match = rcomma.exec( soFar )) ) {
          if ( match ) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice( match[0].length ) || soFar;
          }
          groups.push( tokens = [] );
        }

        matched = false;

        // Combinators
        if ( (match = rcombinators.exec( soFar )) ) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace( rtrim, " " )
          });
          soFar = soFar.slice( matched.length );
        }

        // Filters
        for ( type in Expr.filter ) {
          if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
            (match = preFilters[ type ]( match ))) ) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice( matched.length );
          }
        }

        if ( !matched ) {
          break;
        }
      }

      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      return parseOnly ?
        soFar.length :
        soFar ?
          Sizzle.error( selector ) :
          // Cache the tokens
          tokenCache( selector, groups ).slice( 0 );
    }

    function toSelector( tokens ) {
      var i = 0,
        len = tokens.length,
        selector = "";
      for ( ; i < len; i++ ) {
        selector += tokens[i].value;
      }
      return selector;
    }

    function addCombinator( matcher, combinator, base ) {
      var dir = combinator.dir,
        checkNonElements = base && dir === "parentNode",
        doneName = done++;

      return combinator.first ?
        // Check against closest ancestor/preceding element
        function( elem, context, xml ) {
          while ( (elem = elem[ dir ]) ) {
            if ( elem.nodeType === 1 || checkNonElements ) {
              return matcher( elem, context, xml );
            }
          }
        } :

        // Check against all ancestor/preceding elements
        function( elem, context, xml ) {
          var data, cache, outerCache,
            dirkey = dirruns + " " + doneName;

          // We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
          if ( xml ) {
            while ( (elem = elem[ dir ]) ) {
              if ( elem.nodeType === 1 || checkNonElements ) {
                if ( matcher( elem, context, xml ) ) {
                  return true;
                }
              }
            }
          } else {
            while ( (elem = elem[ dir ]) ) {
              if ( elem.nodeType === 1 || checkNonElements ) {
                outerCache = elem[ expando ] || (elem[ expando ] = {});
                if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
                  if ( (data = cache[1]) === true || data === cachedruns ) {
                    return data === true;
                  }
                } else {
                  cache = outerCache[ dir ] = [ dirkey ];
                  cache[1] = matcher( elem, context, xml ) || cachedruns;
                  if ( cache[1] === true ) {
                    return true;
                  }
                }
              }
            }
          }
        };
    }

    function elementMatcher( matchers ) {
      return matchers.length > 1 ?
        function( elem, context, xml ) {
          var i = matchers.length;
          while ( i-- ) {
            if ( !matchers[i]( elem, context, xml ) ) {
              return false;
            }
          }
          return true;
        } :
        matchers[0];
    }

    function condense( unmatched, map, filter, context, xml ) {
      var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;

      for ( ; i < len; i++ ) {
        if ( (elem = unmatched[i]) ) {
          if ( !filter || filter( elem, context, xml ) ) {
            newUnmatched.push( elem );
            if ( mapped ) {
              map.push( i );
            }
          }
        }
      }

      return newUnmatched;
    }

    function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
      if ( postFilter && !postFilter[ expando ] ) {
        postFilter = setMatcher( postFilter );
      }
      if ( postFinder && !postFinder[ expando ] ) {
        postFinder = setMatcher( postFinder, postSelector );
      }
      return markFunction(function( seed, results, context, xml ) {
        var temp, i, elem,
          preMap = [],
          postMap = [],
          preexisting = results.length,

          // Get initial elements from seed or context
          elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

          // Prefilter to get matcher input, preserving a map for seed-results synchronization
          matcherIn = preFilter && ( seed || !selector ) ?
            condense( elems, preMap, preFilter, context, xml ) :
            elems,

          matcherOut = matcher ?
            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
            postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

              // ...intermediate processing is necessary
              [] :

              // ...otherwise use results directly
              results :
            matcherIn;

        // Find primary matches
        if ( matcher ) {
          matcher( matcherIn, matcherOut, context, xml );
        }

        // Apply postFilter
        if ( postFilter ) {
          temp = condense( matcherOut, postMap );
          postFilter( temp, [], context, xml );

          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while ( i-- ) {
            if ( (elem = temp[i]) ) {
              matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
            }
          }
        }

        if ( seed ) {
          if ( postFinder || preFilter ) {
            if ( postFinder ) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while ( i-- ) {
                if ( (elem = matcherOut[i]) ) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push( (matcherIn[i] = elem) );
                }
              }
              postFinder( null, (matcherOut = []), temp, xml );
            }

            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while ( i-- ) {
              if ( (elem = matcherOut[i]) &&
                (temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

                seed[temp] = !(results[temp] = elem);
              }
            }
          }

        // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(
            matcherOut === results ?
              matcherOut.splice( preexisting, matcherOut.length ) :
              matcherOut
          );
          if ( postFinder ) {
            postFinder( null, results, matcherOut, xml );
          } else {
            push.apply( results, matcherOut );
          }
        }
      });
    }

    function matcherFromTokens( tokens ) {
      var checkContext, matcher, j,
        len = tokens.length,
        leadingRelative = Expr.relative[ tokens[0].type ],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,

        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator( function( elem ) {
          return elem === checkContext;
        }, implicitRelative, true ),
        matchAnyContext = addCombinator( function( elem ) {
          return indexOf.call( checkContext, elem ) > -1;
        }, implicitRelative, true ),
        matchers = [ function( elem, context, xml ) {
          return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
            (checkContext = context).nodeType ?
              matchContext( elem, context, xml ) :
              matchAnyContext( elem, context, xml ) );
        } ];

      for ( ; i < len; i++ ) {
        if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
          matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
        } else {
          matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

          // Return special upon seeing a positional matcher
          if ( matcher[ expando ] ) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for ( ; j < len; j++ ) {
              if ( Expr.relative[ tokens[j].type ] ) {
                break;
              }
            }
            return setMatcher(
              i > 1 && elementMatcher( matchers ),
              i > 1 && toSelector(
                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
              ).replace( rtrim, "$1" ),
              matcher,
              i < j && matcherFromTokens( tokens.slice( i, j ) ),
              j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
              j < len && toSelector( tokens )
            );
          }
          matchers.push( matcher );
        }
      }

      return elementMatcher( matchers );
    }

    function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
      // A counter to specify which element is currently being matched
      var matcherCachedRuns = 0,
        bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function( seed, context, xml, results, expandContext ) {
          var elem, j, matcher,
            setMatched = [],
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            outermost = expandContext != null,
            contextBackup = outermostContext,
            // We must always have either seed elements or context
            elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
            // Use integer dirruns iff this is the outermost matcher
            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
            len = elems.length;

          if ( outermost ) {
            outermostContext = context !== document && context;
            cachedruns = matcherCachedRuns;
          }

          // Add elements passing elementMatchers directly to results
          // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
          // Support: IE<9, Safari
          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
          for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
            if ( byElement && elem ) {
              j = 0;
              while ( (matcher = elementMatchers[j++]) ) {
                if ( matcher( elem, context, xml ) ) {
                  results.push( elem );
                  break;
                }
              }
              if ( outermost ) {
                dirruns = dirrunsUnique;
                cachedruns = ++matcherCachedRuns;
              }
            }

            // Track unmatched elements for set filters
            if ( bySet ) {
              // They will have gone through all possible matchers
              if ( (elem = !matcher && elem) ) {
                matchedCount--;
              }

              // Lengthen the array for every element, matched or not
              if ( seed ) {
                unmatched.push( elem );
              }
            }
          }

          // Apply set filters to unmatched elements
          matchedCount += i;
          if ( bySet && i !== matchedCount ) {
            j = 0;
            while ( (matcher = setMatchers[j++]) ) {
              matcher( unmatched, setMatched, context, xml );
            }

            if ( seed ) {
              // Reintegrate element matches to eliminate the need for sorting
              if ( matchedCount > 0 ) {
                while ( i-- ) {
                  if ( !(unmatched[i] || setMatched[i]) ) {
                    setMatched[i] = pop.call( results );
                  }
                }
              }

              // Discard index placeholder values to get only actual matches
              setMatched = condense( setMatched );
            }

            // Add matches to results
            push.apply( results, setMatched );

            // Seedless set matches succeeding multiple successful matchers stipulate sorting
            if ( outermost && !seed && setMatched.length > 0 &&
              ( matchedCount + setMatchers.length ) > 1 ) {

              Sizzle.uniqueSort( results );
            }
          }

          // Override manipulation of globals by nested matchers
          if ( outermost ) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }

          return unmatched;
        };

      return bySet ?
        markFunction( superMatcher ) :
        superMatcher;
    }

    compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
      var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[ selector + " " ];

      if ( !cached ) {
        // Generate a function of recursive functions that can be used to check each element
        if ( !group ) {
          group = tokenize( selector );
        }
        i = group.length;
        while ( i-- ) {
          cached = matcherFromTokens( group[i] );
          if ( cached[ expando ] ) {
            setMatchers.push( cached );
          } else {
            elementMatchers.push( cached );
          }
        }

        // Cache the compiled function
        cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
      }
      return cached;
    };

    function multipleContexts( selector, contexts, results ) {
      var i = 0,
        len = contexts.length;
      for ( ; i < len; i++ ) {
        Sizzle( selector, contexts[i], results );
      }
      return results;
    }

    // One-time assignments

    // Sort stability
    support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

    // Support: Chrome<14
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = hasDuplicate;

    // Initialize against the default document
    setDocument();

    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function( div1 ) {
      // Should return 1, but returns 4 (following)
      return div1.compareDocumentPosition( document.createElement("div") ) & 1;
    });

    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if ( !assert(function( div ) {
      div.innerHTML = "<a href='#'></a>";
      return div.firstChild.getAttribute("href") === "#" ;
    }) ) {
      addHandle( "type|href|height|width", function( elem, name, isXML ) {
        if ( !isXML ) {
          return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
        }
      });
    }

    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if ( !support.attributes || !assert(function( div ) {
      div.innerHTML = "<input/>";
      div.firstChild.setAttribute( "value", "" );
      return div.firstChild.getAttribute( "value" ) === "";
    }) ) {
      addHandle( "value", function( elem, name, isXML ) {
        if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
          return elem.defaultValue;
        }
      });
    }

    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if ( !assert(function( div ) {
      return div.getAttribute("disabled") == null;
    }) ) {
      addHandle( booleans, function( elem, name, isXML ) {
        var val;
        if ( !isXML ) {
          return (val = elem.getAttributeNode( name )) && val.specified ?
            val.value :
            elem[ name ] === true ? name.toLowerCase() : null;
        }
      });
    }

    // document.querySelectorAll = function querySelectorAll (selector) {
    //   return Sizzle(selector, this);
    // };

    // document.querySelector = function querySelector (selector) {
    //   return (document.querySelectorAll.call(this, selector)[0] || null);
    // };

    return Sizzle;

  }());
  
  // Core Library

  /*
   * Select elements
   * 
   * !selector - Selector {String}
   * root - Root element {String|HTMLElement}
   * 
   * This function can be used throughout the code
   * to select elements
   */

  select = feature.qsa3 ? function (selector, root) {
    root = root || doc;
    return root.querySelectorAll(selector);
  } : function (selector, root) {
    return sizzle(selector, root);
  };

  /*
   * Local copy of the one and only global
   */

  hilo = function (input, root, en) {
    if (typeof input === "undefined") {
      return win.Hilo;
    }

    if (typeof input === "string") {
      return new Dom(select(input, root, en), input);
    } else if (typeof input === "function") { // Function
      if (document.readyState === "complete") {
        input();
      } else {
        callbacks.push(input);
      }
    } else if (input.length) { // DOM Node List | Hilo DOM Object
      return new Dom(input);
    } else { // DOM Node
      input = [input];
      return new Dom(input);
    }
  };

  // Enable Selector Caching
  hilo.temp = {};

  // Version info
  hilo.version = "0.1.0-pre-dev-beta-8";

  hilo.feature = feature;
  hilo.browser = detected.browser;
  hilo.engine = detected.engine;
  hilo.platform = detected.system;
  
  // --------------------------------------------------
  // Testing
  // --------------------------------------------------

  hilo.test = function (con) {
    return new Test(con);
  };

  Test = function (con, neg) {
    this.con = con;
    if (neg) {
      this.neg = true;
    }
  };
  
  // --------------------------------------------------
  // Test Comparisions
  // --------------------------------------------------

  Test.prototype.ifEquals = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };

  Test.prototype.ifContains = function (tw) {
    var ifString = this.con.split(tw).length === 1 ? false : true;
    if (typeof tw === "string" && typeof this.con === "object" && this.con.length) {

    } else if (typeof tw === "string" && typeof this.con === "string") {
      return this.neg ? !ifString : ifString;
    }
  };
  
  Test.prototype.ifIs = function (tw) {
    var val = this.con === tw;
    return this.neg ? !val : val;
  };
  
  // --------------------------------------------------
  // String Shims
  // --------------------------------------------------

  // http://es5.github.com/#x15.5.4.20

  (function () {
    var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
      "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
      "\u2029\uFEFF";

    if(!String.prototype.trim) {
      String.prototype.trim = function trim() {
        ws = "[" + ws + "]";

        var trimBeginRegexp = new RegExp("^" + ws + ws + "*"),
          trimEndRegexp = new RegExp(ws + ws + "*$");

        if (this === void 0 || this === null) {
          throw new TypeError("can't convert "+this+" to object");
        }
        return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
      };
    }
  }());

  // Array Shims

  if (!Array.prototype.every) {
    Array.prototype.every = function(fun /*, thisp */) {
      var t, len, thisp, _i;

      if (this === null) {
        throw new TypeError();
      }

      t = Object(this);
      len = t.length >>> 0;
      if (typeof fun !== "function") {
        throw new TypeError();
      }

      thisp = arguments[1];

      for (_i = 0; _i < len; _i++) {
        if (_i in t && !fun.call(thisp, t[_i], _i, t)) {
          return false;
        }
      }

      return true;
    };
  }
  // --------------------------------------------------
  // Hilo AJAX
  // --------------------------------------------------

  hiloAjax = function (config) {
      
    /*
    
      config:
      - method: HTTP Method "GET" or "POST" (default: "POST")
      - url: The file to send request
      - async: Whether to perform an asynchronous request (default: true)
      - response: Response type "text" or "XML"
      - Event functions
        - callback: fn to be exec. on readystatechange
        - complete
        - error
        - timeout
        - success
        - notfound
        - forbidden
      - username
      - password
      - contentType
    
    */

    
    var xhr;

    if (win.XMLHttpRequest) {
      xhr = new win.XMLHttpRequest();
    } else if (win.ActiveXObject) {
      xhr = new win.ActiveXObject("Microsoft.XMLHTTP");
    }

    if (!config.url) {
      throw new TypeError("url parameter not provided to hilo.ajax");
    }

    config.async = config.async || true;
    config.username = config.username || null;
    config.password = config.password || null;

    config.contentType = config.contentType || "application/x-www-form-urlencoded; charset=UTF-8";

    xhr.onreadystatechange = function () {
      if (config.callback) {
        config.callback(xhr);
      }

      if (xhr.readyState === 4) {
        if (config.complete) {
          config.complete(xhr);
        }
        
        switch (xhr.status) {
          case 200:
            if (config.success) {
              config.success(xhr.responseText, xhr);
            }

            break;
          case 404:
            if (config.notfound) {
              config.notfound(xhr);
            }

            break;
          case 403:
          case 401:
            if (config.forbidden) {
              config.forbidden(xhr);
            }

            break;
          case 500:
          case 400:
            if (config.error) {
              config.error();
            }

            break;
        }
      }
    };

    xhr.timeout = config.timeout;

    if (config.method.trim().toUpperCase() === "POST") {
      xhr.open(
        "POST",
        config.url,
        config.async,
        config.username,
        config.password
      );
      xhr.send(config.data);
    } else if (config.method.trim().toUpperCase() === "GET") {
      xhr.open(
        "GET",
        config.url + (config.data ? "+" + config.data : ""),
        config.async,
        config.username,
        config.password
      );
      xhr.send();
    } else {
      xhr.open(
        config.method.trim().toUpperCase(),
        config.url + (config.data ? "+" + config.data : ''),
        (config.async ? config.async: true),
        (config.username ? config.username : null),
        (config.password ? config.password : null)
      );
      xhr.send();
    }
  };

  hilo.ajax = hiloAjax;
  
  // --------------------------------------------------
  // Hilo DOM
  // --------------------------------------------------

  // -------------------------
  // Dom Class (private)
  // -------------------------
  // 
  // The main DOM Class.
  //
  // Note: This class is accessible inside
  // the source code only and is not mutable
  // from outside the code
  // 
  // new Dom ( els )
  //   els (NodeList) : An array of elements to be selected
  //
  // Examples:
  //
  // new Dom (document.querySelectorAll(p:first-child))
  // new Dom ([document.createElement("div")])
  // new Dom ([document.getElementByid("box")])
  // new Dom (document.getElementsByClassName("hidden"))
  // new Dom (document.getElementsByTagName("mark"))
  //

  Dom = function (els, sel) {
    var _i, _l;

    // Note that `this` is an object and"
    // NOT an Array

    // Loop thorugh the NodeList and set
    // this[index] for els[index]

    for (_i = 0, _l = els.length; _i < _l; _i += 1) {
      this[_i] = els[_i];
    }

    // Useful for looping through as ours
    // is an object and not an array

    this.length = els.length;

    // Know what selector is used to select
    // the elements

    this.sel = sel;
  };

  Dom.prototype = Array.prototype;

  // Create an element and return it

  hilo.create = function (tagName, attrs) {
    var el = new Dom([document.createElement(tagName)]), key;

    if (attrs) {
      if (attrs.className) {
        el.addClass(attrs.className);
        delete attrs.className;
      }

      if (attrs.text) {
        el.text(attrs.text);
        delete attrs.text;
      }

      for (key in attrs) {
        if(attrs.hasOwnProperty(key)) {
          el.attr(key, attrs["key"]);
        }
      }
    }

    return el;
  };
  
  // --------------------------------------------------
  // Helper Functions
  // --------------------------------------------------

  // -------------------------
  // .each()
  // -------------------------
  // 
  // Just like .map() but returns the current Dom instance
  // 
  // .each ( fn ) 
  //   fn (function) : The function to be called
  //
  // Example:
  // 
  // $("p").each (function (el) {
  //   doSomethingWith(e);
  // });
  // 

  Dom.prototype.each = function (fn) {
    this.map(fn);
    return this; // return the current Dom instance
  };

  // -------------------------
  // .map()
  // -------------------------
  // 
  // Return the results of executing a function on all the selected elements
  // 
  // .map( fn )
  //    fn (function) : The function to be called
  //
  // Example:
  // 
  // $("div.need-cf").map(function (e) {
  //   doSomethingWith(e);
  // });
  // 

  Dom.prototype.map = function (fn) {
    var results = [], _i, _l;
    for (_i = 0, _l = this.length; _i < _l; _i += 1) {
      results.push(fn.call(this, this[_i], _i));
    }
    return results;
  };

  // -------------------------
  // .one()
  // -------------------------
  // 
  // .map fn on selected elements and return them based on length
  //

  Dom.prototype.one = function (fn) {
    var m = this.map(fn);
    return m.length > 1 ? m : m[0];
  };

  // -------------------------
  // .first()
  // -------------------------
  // 
  // Return the results of executing a function on all the selected elements
  // 
  // .first( fn )
  //    fn (function) : The function to be called
  //
  // Example:
  // 
  // $("div").first(function (e) {
  //   console.log(e + " is the first div");
  // });
  // 

  Dom.prototype.first = function (fn) {
    return (this.map(fn))[0];
  };

  // -------------------------
  // .next()
  // -------------------------
  // 
  // Return next element siblings of the selected elements
  // 
  // .next( )
  //
  // Examples:
  // 
  // $("div.editor").next().class("next-to-editor")
  //

  Dom.prototype.next = function () {
    return this.rel("nextElementSibling");
  };

  // -------------------------
  // .filter()
  // -------------------------
  // 
  // Filters the selected elements and returns the
  // elements that pass the test (or return true)
  // 
  // .filter( fn )
  //    fn (function) : The function to be called
  // 
  // Example:
  // 
  // Filter to find divs with className hidden
  // 
  // $("div").filter(function (el) {
  //   return el.className.split("hidden").length > 1;
  // });
  // 

  Dom.prototype.filter = function (fun) {
    var len = this.length >>> 0
      , _i
      , t = Object(this)
      , res = []
      , val;

    for (_i = 0; _i < len; _i++)
    {
      if (_i in t)
      {
        val = t[_i];
        if (fun.call(this, val, _i, t)) {
          res.push(val);
        }
      }
    }

    return new Dom(res);
  };

  // --------------------------------------------------
  // Element Selections, etc.
  // --------------------------------------------------

  // -------------------------
  // .first()
  // -------------------------
  // 
  // Return the first element in the selected elements
  // 
  // .first( )
  //
  // Examples:
  // 
  // $("p.hidden").first().show()
  //

  Dom.prototype.first = function () {
    return new Dom([this[0]]);
  };

  // -------------------------
  // .ladt()
  // -------------------------
  // 
  // Return last element in the selected elements
  // 
  // .ladt( attr [, value] )
  //
  // Examples:
  // 
  // $("p.hidden").last().show()
  //
  
  Dom.prototype.last = function () {
    return new Dom([this[this.length - 1]]);
  };

  // -------------------------
  // .el()
  // -------------------------
  // 
  // Return nth element in the selected elements
  // 
  // .el( place )
  //   place (number) : A number representing place of element
  //
  // Examples:
  // 
  // $("p.hidden").el(3).show()
  //

  Dom.prototype.el = function (place) {
    return new Dom([this[place - 1]]);
  };

  // -------------------------
  // .children()
  // -------------------------
  // 
  // Return nth element in the selected elements
  // 
  // .children( )
  //
  // Examples:
  // 
  // $("p.hidden").el().show()
  //

  Dom.prototype.children = function (sel) {
    var children = [], _i, _l;

    this.each(function (el) {
      var childNodes = select(sel ? sel : "*", el);

      for (_i = 0, _l = childNodes.length; _i < _l; _i += 1) {
        children = children.concat(childNodes[_i]);
      }
    });

    return children;
  };

  // -------------------------
  // .parent()
  // -------------------------
  // 
  // Return parent of the first selected element
  // 
  // .parent( )
  //
  // Examples:
  // 
  // $("div#editor").parent().hide()
  //

  Dom.prototype.parent = function () {
    return this.first(function (el) {
      return new Dom([el.parentElement]);
    });
  };

  // -------------------------
  // .parents()
  // -------------------------
  // 
  // Return parents of all selected elements
  // 
  // .parents( )
  //
  // Examples:
  // 
  // $("div.editor").parents().hide()
  //

  Dom.prototype.parents = function () {
    var pars = [];

    this.each(function (el) {
      pars = pars.concat(el.parentElement);
    });

    return new Dom(pars);
  };

  // -------------------------
  // .parent()
  // -------------------------
  // 
  // Return relative of selected elements based
  // on the relation given
  // 
  // .rel( rel )
  //   rel (string) : The relation between curent and 
  //
  // Examples:
  // 
  // $("div#editor").parent().hide()
  //

  Dom.prototype.rel = function (sul) {
    var els = [];

    this.each(function (el) {
      els.push(el[sul]);
    });

    return els;
  };

  // -------------------------
  // .next()
  // -------------------------
  // 
  // Return next element siblings of the selected elements
  // 
  // .next( )
  //
  // Examples:
  // 
  // $("div.editor").next().class("next-to-editor")
  //

  Dom.prototype.next = function () {
    return this.rel("nextElementSibling");
  };

  // -------------------------
  // .prev()
  // -------------------------
  // 
  // Return previous element siblings of the selected elements
  // 
  // .prev( )
  //
  // Examples:
  // 
  // $("div.editor").prev().class("prev-to-editor")
  //

  Dom.prototype.prev = function () {
    return this.rel("previousElementSibling");
  };
  
  // --------------------------------------------------
  // DOM HTML
  // --------------------------------------------------

  // -------------------------
  // .html()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .html( [htmlCode] )
  //    htmlCode (string) : The htmlCode to be set
  //
  // Examples:
  // 
  // $("p:first-child").html("first-p")
  // var html = $("span").html()
  // 

  Dom.prototype.html = function (htmlCode) {
    if (htmlCode) {
      return this.each(function(el) {
        el.innerHTML = htmlCode;
      });
    } else {
      return this.first(function(el) {
        return el.innerHTML;
      });
    }
  };

  // -------------------------
  // .text()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .text( [text] )
  //    text (string) : The text to be set
  //
  // Examples:
  // 
  // $("p:first-child").text("first-p")
  // var text = $("span").text()
  // 

  Dom.prototype.text = function (text) {
    if (text) {
      return this.each(function(el) {
        el.innerText = text;
      });
    } else {
      return this.first(function(el) {
        return el.innerText;
      });
    }
  };

  // -------------------------
  // .append()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .append( [html] )
  //    html (string) : The html to be appended
  //
  // Examples:
  // 
  // $("p:first-child").append(" - From the first p child")
  // 
  
  Dom.prototype.append = function (html) {
    return this.each(function (el) {
      el.innerHTML += html;
    });
  };

  // -------------------------
  // .appendText()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .appendText( [text] )
  //    text (string) : The text to be set
  //
  // Examples:
  // 
  // $("p:first-child").appendText("The same thing here, too.")
  // 
  
  Dom.prototype.appendText = function (text) {
    return this.each(function (el) {
      el.innerText += text;
    });
  };

  // -------------------------
  // .prepend()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .prepend( [html] )
  //    html (string) : The html to be prepended
  //
  // Examples:
  // 
  // $("p:first-child").prepend(" - From the first p child")
  // 

  Dom.prototype.prepend = function (html) {
    return this.each(function (el) {
      el.innerHTML = html + el.innerHTML;
    });
  };

  // -------------------------
  // .append()
  // -------------------------
  // 
  // Set or return innerHTML of selected elements
  // 
  // .append( [html] )
  //    html (string) : The html to be appended
  //
  // Examples:
  // 
  // $("p:first-child").append(" - From the first p child")
  // 
  
  Dom.prototype.value = function (val) {
    if (val) {
      return this.each(function (el) {
        el.value = val;
      });
    } else {
      this.first(function (el) {
        return el.value;
      });
    }
  };
  
  // --------------------------------------------------
  // Classes and IDs
  // --------------------------------------------------

  // -------------------------
  // .id()
  // -------------------------
  // 
  // Set or return id attribute of selected elements
  // 
  // .get()
  //
  // Examples:
  // 
  // $("p.rect").first().id("square")
  // 

  Dom.prototype.id = function (id) {
    if(id) {

      // Setting id of only one element because
      // id is intended to be an unique identifier

      return this.first(function(el) {
        el.id = id;
      });
    } else {
      return this.first(function (el) {
        return el.id;
      });
    }
  };

  // -------------------------
  // .class()
  // -------------------------
  // 
  // Add, remove or check classes of selected elements
  // based on action given
  // 
  // .class( action, className )
  //   action (string) : add, remove or has
  //   className (string|array) : class name or list of class names
  //
  // Examples:
  // 
  // $("div#editor").parent().hide()
  //

  Dom.prototype["class"] = feature.classList === true ? function (action, className) {
    return this.each(function (el) {
      var _i, parts, contains, res = [];

      if (typeof className === "string") { // A String
        parts = className.split(" ");

        if (parts.length === 1) { // String, one class
          contains = el.classList.contains(className);

          switch (action) {
            case "add":
              if (!contains) {
                el.classList.add(className);
              }

              break;
            case "remove":
              if (contains) {
                el.classList.remove(className);
              }

              break;
            case "has":
              res = true;
              break;
            case "toggle":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains) {
                  el.classList.remove(parts[_i]);
                } else {
                  el.classList.add(parts[_i]);
                }
              }
              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        } else { // String, many classes
          contains = function (className) {
            return el.classList.contains(className);
          };

          switch (action) {
            case "add":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.classList.add(parts[_i]);
                }
              }

              break;
            case "remove":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                }
              }

              break;
            case "has":
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

              break;
            case "toggle":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.classList.remove(parts[_i]);
                } else {
                  el.classList.add(parts[_i]);
                }
              }
              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        }
      } else if (className.length) { // Array
        parts = className;

        contains = function (className) {
          return el.classList.contains(className);
        };

        switch (action) {
          case "add":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (!contains(parts[_i])) {
                el.classList.add(parts[_i]);
              }
            }

            break;
          case "remove":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.classList.remove(parts[_i]);
              }
            }

            break;
          case "has":
            for (_i = 0; _i < parts.length; _i += 1) {
              res.push(contains(parts[_i]));
            }

            break;
          case "toggle":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.classList.remove(parts[_i]);
              } else {
                el.classList.add(parts[_i]);
              }
            }
            
            break;
          default:
            throw new TypeError("Unknown value provided as first parameter to .class()");
        }
      } else {
        throw new TypeError ("Please provide the right parameter (string or array) for .class()");
      }

      return typeof res === "boolean" ? res : res.every(function (el) {
        return el === true;
      });
    });
  } : function (action, className) {
    return this.each(function (el) {
      var _i, parts, contains, res = [];

      if (typeof className === "string") {
        parts = className.split(" ");

        if (parts.length === 1) {
          contains = el.className.split(className).length > 1;

          switch (action) {
            case "add":
              if (!contains) {
                el.className += " " +  (className);
              }

              break;
            case "remove":
              if (contains) {
                el.className.replace(className, "");
              }

              break;
            case "has":
              res = contains;
              
              break;
            case "toggle":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains) {
                  el.className.replace(className, "");
                } else {
                  el.className += " " +  className;
                }
              }

              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        } else {
          contains = function (className) {
            return el.className.split(className).length > 1;
          };

          switch (action) {
            case "add":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (!contains(parts[_i])) {
                  el.className += " " +  parts[_i];
                }
              }

              break;
            case "remove":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], "");
                }
              }

              break;
            case "has":
              for (_i = 0; _i < parts.length; _i += 1) {
                res.push(contains(parts[_i]));
              }

              break;
            case "toggle":
              for (_i = 0; _i < parts.length; _i += 1) {
                if (contains(parts[_i])) {
                  el.className.replace(parts[_i], "");
                } else {
                  el.className += " " +  parts[_i];
                }
              }

              break;
            default:
              throw new TypeError("Unknown value provided as first parameter to .class()");
          }
        }
      } else if (className.length) {
        parts = className;
        
        contains = function (className) {
          return el.className.split(className).length > 1;
        };

        switch (action) {
          case "add":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (!contains(parts[_i])) {
                el.className += " " +  parts[_i];
              }
            }

            break;
          case "remove":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.className.replace(parts[_i], "");
              }
            }

            break;
          case "has":
            for (_i = 0; _i < parts.length; _i += 1) {
              res.push(contains(parts[_i]));
            }

            break;
          case "toggle":
            for (_i = 0; _i < parts.length; _i += 1) {
              if (contains(parts[_i])) {
                el.className.replace(parts[_i], "");
              } else {
                el.className += " " +  parts[_i];
              }
            }

            break;
          default:
            throw new TypeError("Unknown value provided as first parameter to .class()");
        }
      } else {
        throw new TypeError ("Please provide the right parameter (string or array) for .class()");
      }

      return typeof res === "boolean" ? res : res.every(function (el) {
        return el === true;
      });
    });
  };

  // -------------------------
  // .addClass()
  // -------------------------
  // 
  // Add class(es) to selected elements
  // 
  // .addClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $("p").addClass("paragraph")
  // 

  Dom.prototype.addClass = function (className) {
    return this["class"]("add", className);
  };

  // -------------------------
  // .removeClass()
  // -------------------------
  // 
  // Remove class(es) from selected elements
  // 
  // .removeClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $("p").removeClass("hidden")
  //

  Dom.prototype.removeClass = function (className) {
    return this["class"]("remove", className);
  };

  // -------------------------
  // .hasClass()
  // -------------------------
  // 
  // Check if all elements has class(es)
  // 
  // .hasClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $("p").hasClass()
  //

  Dom.prototype.hasClass = function (className) {
    return this["class"]("has", className);
  };

  // -------------------------
  // .toggleClass()
  // -------------------------
  // 
  // Add or remove class(es) based on existence
  // 
  // .hasClass( className )
  //   className (string|array) : The class(es to be added)
  //
  // Examples:
  // 
  // $("p").hasClass()
  //

  Dom.prototype.toggleClass = function (className) {
    return this["class"]("toggle", className);
  };

  // -------------------------
  // .attr()
  // -------------------------
  // 
  // Set or return an attribute of selected elements
  // 
  // .attr( attr [, value] )
  //   attr (string) : Name of attribute
  //   value (any) : Value of attrib ute
  //
  // Examples:
  // 
  // $("p.hidden").attr("hidden")
  // $("div.edit").attr("contentEditable", "true")
  // $("body").attr("hilo", "0.1.0")
  //
  
  Dom.prototype.attr = function (name, val) {
    if(val) {
      return this.each(function(el) {
        el.setAttribute(name, val);
      });
    } else {
      return this.first(function (el) {
        return el[name];
      });
    }
  };
  
  // --------------------------------------------------
  // Hilo CSS
  // --------------------------------------------------

  // Set a css prop. to s.el.
  // 
  // Syntax .css( prop [, value] )
  //
  // Examples:
  // 
  // $(selector).css("background-color", "#444")
  // var fontColor = $(selector).css("color")
  //

  Dom.prototype.css = function (prop, value) {
    if (value) { // If value arg. is given
      return this.each(function (el) {
        el.style[prop] = value; // Set CSS prop. to value
      });
    } else { // Otherwise, if value arg. is not given
      return this.one(function (el) {
        return el.style[prop]; // Return the style of that element
      });
    }
  };

  // Important CSS Properties
  //
  // Important CSS methods that are provided as public methods
  //

  impCss = [
    "width",
    "height",
    "fontFamily",
    "fontWeight",
    "fontDecoration",
    "textAlign",
    "textTransform",
    "color",
    "backgroundColor",
    "background",
    "margin",
    "padding",
    "top",
    "left",
    "bottom",
    "right"
  ];
  
  for(_i; _i < impCss; _i += 1) {
    Dom.prototype[impCss[_i]] = function (val) {
      this.css(impCss[_i], val);
    };
  }

  // Get computed style of the first element

  Dom.prototype.computed = function (prop) {
    return this.one(function (el) {
      return win.getComputedStyle(el)[prop];
    });
  };

  Dom.prototype.outerWidth = function () {
    return parseFloat(this.computed("width")) + 
    parseFloat(this.computed("paddingLeft")) + 
    parseFloat(this.computed("paddingRight")) + 
    parseFloat(this.computed("borderLeft")) + 
    parseFloat(this.computed("borderRight")) + "px";
  };

  Dom.prototype.innerWidth = function () {
    return parseFloat(this.computed("width")) + 
    parseFloat(this.computed("paddingLeft")) + 
    parseFloat(this.computed("paddingRight")) + "px";
  };

  Dom.prototype.outerHeight = function () {
    return parseFloat(this.computed("height")) + 
    parseFloat(this.computed("paddingTop")) + 
    parseFloat(this.computed("paddingBottom")) + 
    parseFloat(this.computed("borderTop")) + 
    parseFloat(this.computed("borderBottom")) + "px";
  };

  Dom.prototype.innerHeight = function () {
    return parseFloat(this.computed("height")) + 
    parseFloat(this.computed("paddingTop")) + 
    parseFloat(this.computed("paddingBottom")) + "px";
  };
  
  // --------------------------------------------------
  // DOM Extensions
  // --------------------------------------------------

  // -------------------------
  // .get()
  // -------------------------
  // 
  // Get an array of selected elements
  // 
  // .get()
  //
  // Examples:
  // 
  // $("script").get()
  //

  Dom.prototype.get = function () {
    var els = [];

    this.each(function (el) {
      els.push(el);
    });

    return els;
  };

  // --------------------------------------------------
  // Events
  // --------------------------------------------------

  Dom.prototype.on = (function () {
    if (document.addEventListener) {
      return function (evt, fn) {
        return this.each(function (el) {
          el.addEventListener(evt, fn, false);
        });
      };
    } else if (document.attachEvent)  {
      return function (evt, fn) {
        return this.each(function (el) {
          el.attachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt, fn) {
        return this.each(function (el) {
          el["on" + evt] = fn;
        });
      };
    }
  }());

  Dom.prototype.off = (function () {
    if (document.removeEventListener) {
      return function (evt, fn) {
        return this.each(function (el) {
          el.removeEventListener(evt, fn, false);
        });
      };
    } else if (document.detachEvent)  {
      return function (evt, fn) {
        return this.each(function (el) {
          el.detachEvent("on" + evt, fn);
        });
      };
    } else {
      return function (evt) {
        return this.each(function (el) {
          el["on" + evt] = null;
        });
      };
    }
  }());
  
  // --------------------------------------------------
  // Events (imp.)
  // --------------------------------------------------

  Dom.prototype.ready = function (fn) {
    this.each(function (el) {
      el.onreadystatechange = function () {
        if (el.readyState = "complete") {
          fn();
        }
      };
    });
  };

  impEvts = [
    "blur",
    "click",
    "change",
    "dblclick",
    "drag",
    "dragstart",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "drop",
    "error",
    "focus",
    "keyup",
    "keydown",
    "keypress",
    "load",
    "mousedown",
    "mouseleave",
    "mouseenter",
    "mouseover",
    "mousemove",
    "mouseout",
    "ready",
    "submit"
  ];

  for (_i = 0; _i < impEvts.length; _i += 1) {
    Dom.prototype[impEvts[_i]] = function (fn) {
      this.on(impEvts[_i], fn);
    };
  }

  // --------------------------------------------------
  // Effects (fx)
  // --------------------------------------------------

  Dom.prototype.show = function (display) {
    display = display || "";

    return this.each(function (el) {
      el.style.display = display;
    });
  };

  Dom.prototype.hide = function () {
    return this.each(function (el) {
      el.style.display = "none";
    });
  };

  Dom.prototype.toggle = function (display) {
    return this.each(function (el) {
      if (el.style.display === "none") {
        el.style.display = display ? display : "";
      } else {
        el.style.display = "none";
      }
    });
  };

  Dom.prototype.appear = function () {
    return this.each(function (el) {
      el.style.opacity = "1";
    });
  };

  Dom.prototype.disappear = function () {
    return this.each(function (el) {
      el.style.opacity = "0";
      el.style.cursor = "default";
    });
  };

  Dom.prototype.toggleVisibility = function () {
    return this.each(function (el) {
      if (el.style.opacity === "0") {
        el.style.opacity = "1";
      } else {
        el.style.opacity = "0";
        el.style.cursor = "default";
      }
    });
  };

  Dom.prototype.fade = function (inOut, timing) {
    if (inOut === "in") {
      this.show();
    }

    return this.each(function (el) {
      var time;

      switch(timing) {
        case "slow":
          time = 200;
          break;
        case "normal":
          time = 120;
          break;
        case "fast":
          time = 80;
          break;
        default:
          time = time || 120;
          break;
      }

      function animate () {
        var val = 0.3, end = 1;

        if (parseFloat(el.style.opacity) === (inOut === "in" ? 1 : 0)) {
          clearInterval(win.Hilo.temp.anim);
        } else {
          if (inOut === "out") {
            val = -val;
            end = 0;
          }

          el.style.opacity = parseFloat(el.style.opacity || end) + val; 
        }
      }

      win.Hilo.temp.anim = setInterval(animate, timing);
    });
  };

  Dom.prototype.fadeIn = function (timing) {
    this.fade("in", timing);
  };

  Dom.prototype.fadeOut = function (timing) {
    this.fade("out", timing);
  };

  hilo.classify = function () {
    var body = win.Hilo("body")
      , classes = ["js"]
      , _i;

    body.removeClass("no-js");

    if (hilo.browser.chrome) {
      classes.push("chrome");
    } else if (hilo.browser.firefox) {
      classes.push("firefox");
    } else if (hilo.browser.safari) {
      classes.push("safari");
    } else if (hilo.browser.ie) {

      if (hilo.browser.ie <= 6) {
        classes.push("lte-ie6");

        if (hilo.browser.ie < 6) {
          classes.push("lt-ie6");
        }
      }

      if (hilo.browser.ie <= 7) {
        classes.push("lte-ie7");

        if (hilo.browser.ie < 7) {
          classes.push("lt-ie7");
        }
      }

      if (hilo.browser.ie <= 8) {
        classes.push("lte-ie8");

        if (hilo.browser.ie < 8) {
          classes.push("lt-ie8");
        }
      }

      if (hilo.browser.ie <= 9) {
        classes.push("lte-ie9");

        if (hilo.browser.ie < 9) {
          classes.push("lt-ie9");
        }
      }

      if (hilo.browser.ie <= 10) {
        classes.push("lte-ie10");

        if (hilo.browser.ie < 10) {
          classes.push("lt-ie10");
        };
      }

      if (hilo.browser.ie >= 6) {
        classes.push("gte-ie6");

        if (hilo.browser.version > 6) {
          classes.push("gt-ie6");
        }
      }

      if (hilo.browser.ie >= 7) {
        classes.push("gte-ie7");

        if (hilo.browser.version > 7) {
          classes.push("gt-ie7");
        }
      }

      if (hilo.browser.ie >= 8) {
        classes.push("gte-ie8");

        if (hilo.browser.version > 8) {
          classes.push("gt-ie8");
        }
      }

      if (hilo.browser.ie >= 9) {
        classes.push("gte-ie9");

        if (hilo.browser.version > 9) {
          classes.push("gt-ie9");
        }
      }

      if (hilo.browser.ie >= 10) {
        classes.push("gte-ie10");

        if (hilo.browser.version > 10) {
          classes.push("gt-ie10");
        };
      }

      if (hilo.browser.ie === 6) {
        classes.push("ie6");
      } else if (hilo.browser.ie === 7) {
        classes.push("ie7");
      } else if (hilo.browser.ie === 8) {
        classes.push("ie8");
      } else if (hilo.browser.ie === 9) {
        classes.push("ie9");
      } else if (hilo.browser.ie === 10) {
        classes.push("ie10");
      }

      classes.push("ie");
    } else if (hilo.browser.opera) {
      classes.push("opera");
    } else if (hilo.browser.konq) {
      classes.push("konqueror");
    }

    if (hilo.platform.win) {
      classes.push("windows");
    } else if (hilo.platform.mac) {
      classes.push("mac");
    } else if (hilo.platform.x11) {
      classes.push("linux");
    }

    if (hilo.engine.webkit) {
      classes.push("webkit");
    } else if (hilo.engine.ie) {
      classes.push("trident");
    } else if (hilo.engine.opera) {
      classes.push("presto");
    } else if (hilo.engine.gecko) {
      classes.push("gecko");
    }

    classes.push(hilo.browser.name.toLowerCase() + parseInt(hilo.browser.version), 10);

    function getBrowserVersion () {
      return String(hilo.browser.version).replace(".", "-");
    }

    if (getBrowserVersion() !== parseInt(hilo.browser.version, 10)) {
      classes.push(hilo.browser.name.toLowerCase() + getBrowserVersion());
    }

    for (_i in hilo.feature) {
      if (hilo.feature.hasOwnProperty(_i)) {
        if (hilo.feature[_i] === true) {
          classes.push(_i.toLowerCase());
        } else if (hilo.feature[_i] === false) {
          classes.push("no-" + _i.toLowerCase());
        }
      }
    }

    body.addClass(classes);

    return classes;
  };
  
  // --------------------------------------------------
  // Hilo Extension API
  // --------------------------------------------------
    
  hilo.Dom = Dom.prototype;
  hilo.Test = Test.prototype;
  
  // --------------------------------------------------
  // Set event handler for triggering DOM Events
  // --------------------------------------------------
  
  doc.onreadystatechange = function () {
    if (doc.readyState === "complete") {
      for (_i = 0; _i < callbacks.length; _i += 1) {
        callbacks[_i]();
      }
    }
  };

  win.$ = hilo; // Shorthand

  elapsed = new Date().getTime() - start;

  hilo.perf = elapsed;

  return hilo;
}));

(function ($) {
  $.classify();
}(Hilo));