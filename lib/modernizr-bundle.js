!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var f in l)if(l.hasOwnProperty(f)){if(e=[],n=l[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?d[r[0]]=s:(!d[r[0]]||d[r[0]]instanceof Boolean||(d[r[0]]=new Boolean(d[r[0]])),d[r[0]][r[1]]=s),u.push((s?"":"no-")+r.join("-"))}}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):h?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function i(){var e=n.body;return e||(e=a(h?"svg":"body"),e.fake=!0),e}function r(e,t,o,s){var r,l,f,d,u="modernizr",c=a("div"),h=i();if(parseInt(o,10))for(;o--;)f=a("div"),f.id=s?s[o]:u+(o+1),c.appendChild(f);return r=a("style"),r.type="text/css",r.id="s"+u,(h.fake?h:c).appendChild(r),h.appendChild(c),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(n.createTextNode(e)),c.id=u,h.fake&&(h.style.background="",h.style.overflow="hidden",d=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),l=t(c,e),h.fake?(h.parentNode.removeChild(h),p.style.overflow=d,p.offsetHeight):c.parentNode.removeChild(c),!!l}var l=[],f={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){l.push({name:e,fn:n,options:t})},addAsyncTest:function(e){l.push({name:null,fn:e})}},d=function(){};d.prototype=f,d=new d;var u=[],c=f._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];f._prefixes=c;var p=n.documentElement,h="svg"===p.nodeName.toLowerCase(),m=f.testStyles=r;d.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",c.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),delete f.addTest,delete f.addAsyncTest;for(var v=0;v<d._q.length;v++)d._q[v]();e.Modernizr=d}(window,document);