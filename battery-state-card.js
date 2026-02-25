/**
 * battery-state-card v3.2.1 + Visual Editor
 * Upstream: https://github.com/maxwroc/battery-state-card
 * Editor:   https://github.com/sjfehlen/battery-state-card
 * Built:    2026-02-25T18:56:30Z
 */
!function(){"use strict";function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}function e(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{l(s.next(t))}catch(t){r(t)}}function a(t){try{l(s.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}l((s=s.apply(t,e||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const i=window,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap;class o{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}}const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(i,t,n)},l=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var c;const d=window,h=d.trustedTypes,u=h?h.emptyScript:"",p=d.reactiveElementPolyfillSupport,v={toAttribute(t,e){switch(e){case Boolean:t=t?u:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),f={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:g},y="finalized";class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||f}static finalize(){if(this.hasOwnProperty(y))return!1;this[y]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{s?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const s=document.createElement("style"),n=i.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,t.appendChild(s)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=f){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:v).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:v;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var b;m[y]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:m}),(null!==(c=d.reactiveElementVersions)&&void 0!==c?c:d.reactiveElementVersions=[]).push("1.6.3");const _=window,$=_.trustedTypes,A=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,x="?"+w,S=`<${x}>`,N=document,C=()=>N.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,O="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,R=/>/g,T=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,j=/"/g,D=/^(?:script|style|textarea|title)$/i,M=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),z=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),B=new WeakMap,V=N.createTreeWalker(N,129,null,!1);function W(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const q=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=P;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===P?"!--"===l[1]?o=I:void 0!==l[1]?o=R:void 0!==l[2]?(D.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=T):void 0!==l[3]&&(o=T):o===T?">"===l[0]?(o=null!=n?n:P,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?T:'"'===l[3]?j:H):o===j||o===H?o=T:o===I||o===R?o=P:(o=T,n=void 0);const h=o===T&&t[e+1].startsWith("/>")?" ":"";r+=o===P?i+S:c>=0?(s.push(a),i.slice(0,c)+E+i.slice(c)+w+h):i+w+(-2===c?(s.push(void 0),e):h)}return[W(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,c]=q(t,e);if(this.el=J.createElement(l,i),V.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=V.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(E)||e.startsWith(w)){const i=c[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+E).split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Q:"?"===e[1]?Y:"@"===e[1]?tt:G})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(D.test(s.tagName)){const t=s.textContent.split(w),e=t.length-1;if(e>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],C()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],C())}}}else if(8===s.nodeType)if(s.data===x)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(w,t+1));)a.push({type:7,index:n}),t+=w.length-1}n++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function K(t,e,i=t,s){var n,r,o,a;if(e===z)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=K(t,l._$AS(t,e.values),l,s)),e}class F{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:N).importNode(i,!0);V.currentNode=n;let r=V.nextNode(),o=0,a=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new X(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new et(r,this,t)),this._$AV.push(e),l=s[++a]}o!==(null==l?void 0:l.index)&&(r=V.nextNode(),o++)}return V.currentNode=N,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{constructor(t,e,i,s){var n;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=K(this,t,e),k(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>U(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==L&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(N.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(W(s.h,s.h[0]),this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new F(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new J(t)),e}T(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.k(C()),this.k(C()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,i,s,n){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=K(this,t,e,0),r=!k(t)||t!==this._$AH&&t!==z,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=K(this,s[i+o],e,o),a===z&&(a=this._$AH[o]),r||(r=!k(a)||a!==this._$AH[o]),a===L?t=L:t!==L&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Q extends G{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===L?void 0:t}}const Z=$?$.emptyScript:"";class Y extends G{constructor(){super(...arguments),this.type=4}j(t){t&&t!==L?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class tt extends G{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=K(this,t,e,0))&&void 0!==i?i:L)===z)return;const s=this._$AH,n=t===L&&s!==L||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==L&&(s===L||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class et{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){K(this,t)}}const it=_.litHtmlPolyfillSupport;null==it||it(J,X),(null!==(b=_.litHtmlVersions)&&void 0!==b?b:_.litHtmlVersions=[]).push("2.8.0");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var st,nt;class rt extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new X(e.insertBefore(C(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return z}}rt.finalized=!0,rt._$litElement$=!0,null===(st=globalThis.litElementHydrateSupport)||void 0===st||st.call(globalThis,{LitElement:rt});const ot=globalThis.litElementPolyfillSupport;null==ot||ot({LitElement:rt}),(null!==(nt=globalThis.litElementVersions)&&void 0!==nt?nt:globalThis.litElementVersions=[]).push("3.3.3");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const at=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function lt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):at(t,e)
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}var ct;null===(ct=window.HTMLSlotElement)||void 0===ct||ct.prototype.assignedElements;const dt=(t,e="warn")=>{console[e]("[battery-state-card] "+t)},ht=t=>null!=t&&"boolean"!=typeof t&&("string"==typeof t&&(t=t.replace(",",".")),""!==t&&!isNaN(Number(t))),ut=t=>("string"==typeof t&&(t=t.replace(",",".")),Number(t)),pt=t=>Array.isArray(t)?t:void 0!==t?[t]:[],vt=(t,e)=>pt(t).map((t=>gt(t,e))),gt=(t,e)=>{switch(typeof t){case"string":const i={};return i[e]=t,i;case"object":return Object.assign({},t)}return t},ft=/\/(.*?)\/([igm]{1,3})/,yt=t=>{if("/"==t[0]&&"/"==t[t.length-1])return new RegExp(t.substr(1,t.length-2));{let e=t.match(ft);if(e&&3==e.length)return new RegExp(e[1],e[2])}return null},mt=new RegExp("<rt>([^<]+)</rt>","g"),bt=(t,e)=>t&&M`<div class="secondary">${((t,e)=>{const i=[];let s=[],n=0;for(;s=mt.exec(t);){const r=t.indexOf(s[0],n);0!=r&&i.push(M`${t.substring(n,r)}`),i.push(M`<ha-relative-time .hass="${e}" .datetime="${new Date(s[1])}"></ha-relative-time>`),n+=r+s[0].length}return n<t.length&&i.push(M`${t.substring(n,t.length)}`),i})(t,e)}</div>`,_t=(t,e)=>t&&M`<div class="icon"><ha-icon style="color:${e}" icon="${t}"></ha-icon></div>`,$t=t=>t&&M` ${t}`,At=t=>{const e=[{text:"Show / hide",action:t=>{var e,i,s;const n=null===(s=null===(i=null===(e=t.currentTarget)||void 0===e?void 0:e.parentElement)||void 0===i?void 0:i.parentElement)||void 0===s?void 0:s.querySelector(".debug_expand");n&&(n.style.display="none"===n.style.display?"block":"none")}}];return navigator.clipboard&&e.push({text:"Copy to clipboard",action:()=>navigator.clipboard.writeText(t)}),M`<div>${e.length&&M`${e.map((t=>M`[<a href="javascript:void(0);" @click="${e=>t.action(e)}">${t.text}</a>]`))}`}</div><div class="debug_expand" style="display:none"><p>Version: 3.2.1</p><pre style="user-select:all">${t}</pre></div>`};class Et extends rt{constructor(){super(...arguments),this.updateNotifyQueue=[],this.configUpdated=!1,this.hassUpdated=!1,this.triggerUpdate=function(t,e){let i;return(...e)=>{i&&(clearTimeout(i),i=null),i=setTimeout((()=>t.apply(null,e)),100)}}((()=>e(this,void 0,void 0,(function*(){this.alert=void 0;try{yield this.internalUpdate(this.configUpdated,this.hassUpdated),this.error=void 0}catch(t){"string"==typeof t?this.error={message:t,name:""}:t instanceof Error&&(this.error=t)}this.configUpdated&&this.requestUpdate(),this.configUpdated=!1,this.hassUpdated=!1,this.updateNotifyQueue.forEach((t=>t())),this.updateNotifyQueue=[]}))))}set hass(t){this._hass=t,this.hassUpdated=!0,this.triggerUpdate()}get hass(){return this._hass}get cardUpdated(){return new Promise((t=>this.updateNotifyQueue.push(t)))}setConfig(t){this.config=JSON.parse(JSON.stringify(t)),this.configUpdated=!0,this.triggerUpdate()}render(){return this.error?(this.onError(),wt(this.tagName,"Exception: "+this.error.message,this.error.stack)):this.alert?M`<ha-alert alert-type="${this.alert.type||"warning"}" title="${this.alert.title||this.tagName}">${this.alert.content}</ha-alert>`:this.internalRender()}}t([lt({attribute:!1})],Et.prototype,"error",void 0),t([lt({attribute:!1})],Et.prototype,"alert",void 0);const wt=(t,e,i)=>M`<ha-alert alert-type="error" title="${t}"><p><strong>${e}</strong></p><p></p><ol><li>Please check if the problem was reported already<br>Click <a target="_blank" href="https://github.com/maxwroc/battery-state-card/issues?q=is%3Aissue+${encodeURIComponent(e)}">here</a> to search</li><li>If it wasn't please consider creating one<br>Click <a target="_blank" href="https://github.com/maxwroc/battery-state-card/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title=${encodeURIComponent(e)}">here</a> to create<br>Please copy-paste the below stack trace.</li></ol><pre>${i}</pre></ha-alert>`;var xt="\n:host(.clickable), \n.clickable {\n    cursor: pointer;\n}\n\n\n\n.truncate {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    overflow: hidden;\n}\n\n.name {\n    flex: 1;\n    margin: 0 6px;\n}\n\n.secondary {\n    color: var(--secondary-text-color);\n}\n\n.icon {\n    flex: 0 0 40px;\n    border-radius: 50%;\n    text-align: center;\n    line-height: 40px;\n    margin-right: 10px;\n    color: var(--paper-item-icon-color)\n}";const St={"more-info":t=>{const e=new Event("hass-more-info",{composed:!0});e.detail={entityId:t.entityId},t.card.dispatchEvent(e)},navigate:t=>{if(!t.config.navigation_path)return void dt("Missing 'navigation_path' for 'navigate' tap action");window.history.pushState(null,"",t.config.navigation_path);const e=new Event("location-changed",{composed:!0});e.detail={replace:!1},window.dispatchEvent(e)},"call-service":(t,e)=>{if(!t.config.service)return void dt("Missing 'service' for 'call-service' tap action");const[i,s]=t.config.service.split(".",2),n=Object.assign({},t.config.service_data);e.callService(i,s,n)},url:t=>{t.config.url_path?window.location.href=t.config.url_path:dt("Missing 'url_path' for 'url' tap action")}},Nt=(t,e)=>{let i=t.map((t=>t.color));if(!It(i))return dt("For gradient colors you need to use hex HTML colors. E.g. '#FF00FF'","error"),Ct;if(i.length<2)return dt("For gradient colors you need to specify at least two steps/colors","error"),Ct;if(t.every((t=>null!=t.value))){const s=t[0];if(e<=s.value)return s.color;const n=t[t.length-1];if(e>=n.value)return n.color;const r=t.findIndex((t=>e<=t.value));-1!=r&&(i=[t[r-1].color,t[r].color],e=100*(e-t[r-1].value)/(t[r].value-t[r-1].value))}return Pt(i,e)},Ct="inherit",kt=[{value:20,color:"var(--label-badge-red)"},{value:55,color:"var(--label-badge-yellow)"},{value:100,color:"var(--label-badge-green)"}],Ut=/^#[A-Fa-f0-9]{6}$/,Ot=t=>(t=t.replace("#",""),{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16)}),Pt=function(t,e){e/=100;const i=t.map(((e,i)=>({pct:1/(t.length-1)*i,color:Ot(e)})));let s=1;for(s=1;s<i.length-1&&!(e<i[s].pct);s++);const n=i[s-1],r=i[s],o=r.pct-n.pct,a=(e-n.pct)/o,l=1-a,c=a,d={r:Math.floor(n.color.r*l+r.color.r*c),g:Math.floor(n.color.g*l+r.color.g*c),b:Math.floor(n.color.b*l+r.color.b*c)};return"#"+[d.r,d.g,d.b].map((t=>t.toString(16).padStart(2,"0"))).join("")},It=t=>{if(!(t.length<2)){for(const e of t)if(!Ut.test(e))return dt("Color '${color}' is not valid. Please provide valid HTML hex color in #XXXXXX format."),!1;return!0}dt("Value for 'color_gradient' should be an array with at least 2 colors.")},Rt=["automation","binary_sensor","button","calendar","camera","climate","device_tracker","group","input_boolean","input_datetime","input_number","input_select","input_text","light","media_player","number","person","remote","scene","script","select","sensor","switch","update","weather","zone"];class Tt{constructor(t,e){this.hass=t,this.entityData=e}process(t){return t?t.replace(/\{([^\}]+)\}/g,((t,e)=>this.replaceKeyword(e,""))):""}replaceKeyword(t,e){const i=t.split("|"),s=i.shift(),n=this.getValue(s);if(void 0===n)return e;const r=i.map((t=>{const e=Ht.exec(t);if(e&&e.groups&&jt[e.groups.func])return jt[e.groups.func](e.groups.params)})).filter((t=>void 0!==t)).reduce(((t,e)=>e(t)),n);return void 0===r?e:r}getValue(t){var e;if(void 0===t)return t;const i=t.split(".");let s=Object.assign({},this.entityData);Rt.includes(i[0])&&(s=Object.assign({},null===(e=this.hass)||void 0===e?void 0:e.states[i.splice(0,2).join(".")]));for(let t=0;t<i.length&&(s=s[i[t]],void 0!==s);t++);return"object"==typeof s&&(s=JSON.stringify(s)),void 0===s?void 0:s.toString()}}const Ht=/(?<func>[a-z]+)\((?<params>[^\)]*)\)/,jt={replace:t=>{const e=t.split(",");if(2==e.length)return t=>t.replace(e[0],e[1]);dt("'replace' function requires two params")},round:t=>{let e=parseInt(t);return isNaN(e)&&(e=0),t=>parseFloat(t).toFixed(e)},multiply:t=>{if(""===t)return dt("[KString]multiply function is missing parameter"),t=>t;const e=Number(t);return t=>isNaN(e)?t:(Number(t)*e).toString()},greaterthan:t=>{const e=t.split(",");if(2!=e.length)return dt("[KString]greaterthan function requires two parameters"),t=>t;const i=Number(e[0]);return t=>Number(t)>i?e[1]:t},lessthan:t=>{const e=t.split(",");if(2!=e.length)return dt("[KString]lessthan function requires two parameters"),t=>t;const i=Number(e[0]);return t=>Number(t)<i?e[1]:t},between:t=>{const e=t.split(",");if(3!=e.length)return dt("[KString]between function requires three parameters"),t=>t;const i=Number(e[0]),s=Number(e[1]);return t=>{const n=Number(t);return i<n&&s>n?e[2]:t}},thresholds:t=>{const e=t.split(",").map((t=>Number(t)));return t=>{const i=Number(t),s=e.findIndex((t=>i<t));return-1==s?"100":Math.round(100/e.length*s).toString()}},abs:()=>t=>Math.abs(Number(t)).toString(),equals:t=>{const e=t.split(",");return 2!=e.length?(dt("[KString]equals function requires two parameters"),t=>t):t=>t==e[0]?e[1]:t},add:t=>{if(""===t)return dt("[KString]add function is missing parameter"),t=>t;const e=Number(t);return t=>isNaN(e)?t:(Number(t)+e).toString()},reltime:()=>t=>{const e=Date.parse(t);return isNaN(e)?(dt("[KString]value isn't a valid date: "+t),t):`<rt>${t}</rt>`}},Dt="_battery_level",Mt=(t,e)=>{if(!t.entity.endsWith(Dt))return!1;const i=null==e?void 0:e.states[t.entity.replace(Dt,"_battery_state")];return!!i&&["charging","full"].includes(i.state)},zt=(t,e)=>(void 0===t||e.split(".").forEach((e=>{t=t?t[e]:void 0})),t),Lt=/\b([0-9]{1,3})\s?%/,Bt=/(-?[0-9,.]+)\s?(.*)/,Vt=(t,e,i,s,n)=>{var r;return i=s.unit?s.unit:i||(null===(r=null==n?void 0:n.states[s.entity])||void 0===r?void 0:r.attributes.unit_of_measurement)||"%",(!ht(t)||e&&!ht(e))&&(i=void 0),i},Wt=(t,e)=>pt(e).reduce(((t,e)=>{const i=yt(e.from);return t=i?t.replace(i,e.to||""):t.replace(e.from,e.to||"")}),t);class qt extends Et{constructor(){super(...arguments),this.entityData={}}static get styles(){return a([xt+":host {\n    display: flex;\n    align-items: center;\n}\n:host > ha-alert {\n    flex: 1 0 auto;\n}\n"])}internalUpdate(){var t,i;return e(this,void 0,void 0,(function*(){this.entityData=Object.assign({},null===(t=this.hass)||void 0===t?void 0:t.states[this.config.entity]),!1!==this.config.extend_entity_data&&this.extendEntityData(),!0!==this.config.debug&&this.config.debug!==this.config.entity||(this.alert={title:`Debug: ${this.config.entity}`,content:At(JSON.stringify(this.entityData,null,2))});var{state:e,level:s,unit:n}=((t,e,i)=>{var s,n,r,o,a;const l=(null==e?void 0:e.localize("state.default.unknown"))||"Unknown";let c,d;const h=new Tt(e,i);if(void 0!==t.value_override){const i=h.process(t.value_override.toString());return{state:i,level:ht(i)?ut(i):void 0,unit:Vt(i,void 0,void 0,t,e)}}if(!i)return{state:l};if(t.attribute)c=null===(s=i.attributes[t.attribute])||void 0===s?void 0:s.toString(),null==c&&(dt(`Attribute "${t.attribute}" doesn't exist on "${t.entity}" entity`),c=l);else{const e=[t.non_battery_entity?null:null===(n=i.attributes)||void 0===n?void 0:n.battery_level,t.non_battery_entity?null:null===(r=i.attributes)||void 0===r?void 0:r.battery,i.state];c=(null===(o=e.find((t=>ht(t))))||void 0===o?void 0:o.toString())||(null===(a=e.find((t=>null!=t)))||void 0===a?void 0:a.toString())||l}let u;if(t.state_map){const e=t.state_map.find((t=>t.from===c));void 0===e?ht(c)||dt(`Missing option for '${c}' in 'state_map.'`):(c=e.to.toString(),void 0!==e.display&&(u=h.process(e.display)))}if(!ht(c)){const t=Lt.exec(c);null!=t&&(c=t[1])}if(ht(c)?(t.multiplier&&(c=(t.multiplier*ut(c)).toString()),"number"==typeof t.round&&(c=parseFloat(c).toFixed(t.round).toString())):c=c.charAt(0).toUpperCase()+c.slice(1),!1!==t.default_state_formatting&&!u&&c===i.state&&e){const t=e.formatEntityState(i).match(Bt);null!=t&&(c=t[1],d=t[2]||d)}return{state:u||c,level:ht(c)?ut(c):void 0,unit:Vt(c,u,d,t,e)}})(this.config,this.hass,this.entityData);this.state=e,this.unit=n,this.stateNumeric=s;const r=((t,e,i)=>{if(!i)return!1;const s=t.charging_state;if(!s)return Mt(t,i);let n=i.states[t.entity];if(s.entity_id){if(n=i.states[s.entity_id],!n)return dt(`'charging_state' entity id (${s.entity_id}) not found.`),!1;e=n.state}const r=pt(s.attribute);if(0!=r.length){const t=r.find((t=>void 0!==zt(n.attributes,t.name)));return!!t&&(void 0===t.value||zt(n.attributes,t.name)==t.value)}const o=pt(s.state);return 0==o.length?!!e:o.some((t=>t==e))})(this.config,this.state,this.hass);this.entityData.charging=r?(null===(i=this.config.charging_state)||void 0===i?void 0:i.secondary_info_text)||"Charging":"",this.name=((t,e,i)=>{var s,n;if(t.name)return new Tt(e,i).process(t.name);let r=null===(s=null==i?void 0:i.attributes)||void 0===s?void 0:s.friendly_name;if(!r)return t.entity;let o=t.bulk_rename,a=!0;if(t.bulk_rename&&!Array.isArray(t.bulk_rename)&&void 0===(null===(n=t.bulk_rename)||void 0===n?void 0:n.from)){const e=t.bulk_rename;o=e.rules,a=!1!==e.capitalize_first}return r=Wt(r,o),a&&""!==r&&(r=r[0].toLocaleUpperCase()+r.substring(1)),r})(this.config,this.hass,this.entityData),this.secondaryInfo=((t,e,i)=>{if(t.secondary_info){let s=new Tt(e,i).process(t.secondary_info);if(ht(s))return s;const n=Date.parse(s);return isNaN(n)?s:`<rt>${s}</rt>`}return null})(this.config,this.hass,this.entityData),this.icon=((t,e,i,s)=>{var n;if(i&&(null===(n=t.charging_state)||void 0===n?void 0:n.icon))return t.charging_state.icon;if(t.icon){const e="attribute.";if(s&&t.icon.startsWith(e)){const i=t.icon.substr(e.length);return s.states[t.entity].attributes[i]||(dt(`Icon attribute missing in '${t.entity}' entity`,"error"),t.icon)}return new Tt(s,Object.assign({},null==s?void 0:s.states[t.entity])).process(t.icon)}if(void 0===e||isNaN(e)||e>100||e<0)return"mdi:battery-unknown";const r=10*Math.round(e/10);switch(r){case 100:return i?"mdi:battery-charging-100":"mdi:battery";case 0:return i?"mdi:battery-charging-outline":"mdi:battery-outline";default:return(i?"mdi:battery-charging-":"mdi:battery-")+r}})(this.config,s,r,this.hass),this.iconColor=((t,e,i)=>{var s,n,r,o,a;if(i&&(null===(s=t.charging_state)||void 0===s?void 0:s.color))return t.charging_state.color;if(void 0===e||isNaN(e)||e>100||e<0)return Ct;const l=vt(null===(n=t.colors)||void 0===n?void 0:n.steps,"color");if(null===(r=t.colors)||void 0===r?void 0:r.gradient)return Nt(l,e);let c=kt;return(null===(o=t.colors)||void 0===o?void 0:o.steps)&&(c=l.map((t=>(t.value=void 0===t.value||t.value>100?100:t.value,t)))),(null===(a=c.find((t=>e<=t.value)))||void 0===a?void 0:a.color)||Ct})(this.config,s,r)}))}connectedCallback(){super.connectedCallback(),this.setupAction(!0)}disconnectedCallback(){super.disconnectedCallback(),this.setupAction(!1)}internalRender(){return M`${_t((t=this).icon,t.iconColor)}<div class="name truncate">${t.name} ${bt(t.secondaryInfo,t.hass)}</div><div class="state">${t.state}${$t(t.unit)}</div>`;var t}onError(){}setupAction(t=!0){if(!t||this.error||this.alert)this.action&&(this.classList.remove("clickable"),this.removeEventListener("click",this.action),this.action=void 0);else{let t=this.config.tap_action||"more-info";"none"==t||this.action||(this.action=e=>{var i,s;e.stopPropagation(),i={card:this,config:gt(t,"action"),entityId:this.config.entity},s=this.hass,i.config&&"none"!=i.config.action&&(i.config.action in St?St[i.config.action](i,s):dt("Unknown tap action type: "+i.config.action))},this.addEventListener("click",this.action),this.classList.add("clickable"))}}extendEntityData(){var t;if(!this.hass)return;const e=this.hass.entities&&this.hass.entities[this.config.entity];if(e){this.entityData.display=e,this.entityData.device=e.device_id?this.hass.devices&&this.hass.devices[e.device_id]:void 0;const i=e.area_id||(null===(t=this.entityData.device)||void 0===t?void 0:t.area_id);i&&(this.entityData.area=this.hass.areas&&this.hass.areas[i])}}}t([lt({attribute:!1})],qt.prototype,"name",void 0),t([lt({attribute:!1})],qt.prototype,"secondaryInfo",void 0),t([lt({attribute:!1})],qt.prototype,"state",void 0),t([lt({attribute:!1})],qt.prototype,"unit",void 0),t([lt({attribute:!1})],qt.prototype,"icon",void 0),t([lt({attribute:!1})],qt.prototype,"iconColor",void 0),t([lt({attribute:!1})],qt.prototype,"action",void 0);const Jt=t=>{return M`<ha-card>${e=t.header,e&&M`<div class="card-header"><div class="truncate">${e}</div></div>`}<div class="card-content">${t.list.map((e=>Kt(t.batteries[e])))} ${t.groups.map((e=>((t,e)=>(Math.random().toString().substr(2),M`<div class="expandWrapper entity-spacing"><div class="toggler" @click="${t=>t.currentTarget.classList.toggle("expanded")}">${_t(t.icon,t.iconColor)}<div class="name truncate">${t.title} ${t.secondaryInfo?M`<div class="secondary">${t.secondaryInfo}</div>`:null}</div><div class="chevron">‹</div></div><div style="max-height:${50*Object.keys(e).length}" class="groupItems">${t.batteryIds.map((t=>Kt(e[t])))}</div></div>`))(e,t.batteries)))}</div></ha-card>`;var e},Kt=t=>M`<div class="entity-spacing">${t}</div>`,Ft={exists:t=>void 0!==t,not_exists:t=>void 0===t,contains:(t,e)=>null!=t&&-1!=t.toString().indexOf(e.toString()),"=":(t,e)=>ht(t)||ht(e)?ut(t)==ut(e):t==e,">":(t,e)=>ut(t)>ut(e),"<":(t,e)=>ut(t)<ut(e),">=":(t,e)=>ut(t)>=ut(e),"<=":(t,e)=>ut(t)<=ut(e),matches:(t,e)=>{if(null==t)return!1;e=e.toString();let i=yt(e);return!i&&e.includes("*")&&(i=new RegExp("^"+e.replace(/\*/g,".*")+"$")),i?i.test(t.toString()):t===e}};class Xt{get is_permanent(){return"state"!=this.config.name}constructor(t){this.config=t}isValid(t,e){const i=this.getValue(t,e);return this.meetsExpectations(i)}getValue(t,e){if(this.config.name)return"state"==this.config.name&&void 0!==e?e:((t,e)=>{const i=e.split(".");for(let e=0;e<i.length&&void 0!==(t=t[i[e]]);e++);return null!==t&&"object"==typeof t&&(t=JSON.stringify(t)),t})(t,this.config.name);dt("Missing filter 'name' property")}meetsExpectations(t){let e=this.config.operator;if(!e)if(void 0===this.config.value)e="exists";else if(null===this.config.value)e="=";else{const t=this.config.value.toString(),i=yt(t);e=-1!=t.indexOf("*")||i?"matches":"="}const i=Ft[e];return i?i(t,this.config.value):(dt(`Operator '${this.config.operator}' not supported. Supported operators: ${Object.keys(Ft).join(", ")}`),!1)}}const Gt=["bulk_rename","charging_state","colors","debug","default_state_formatting","extend_entity_data","icon","non_battery_entity","round","secondary_info","state_map","tap_action","value_override","unit"];class Qt{constructor(t){var e,i,s,n;this.config=t,this.batteries={},this.groupsToResolve=[],this.groupsData={},this.initialized=!1,this.include=null===(i=null===(e=t.filter)||void 0===e?void 0:e.include)||void 0===i?void 0:i.map((t=>new Xt(t))),this.exclude=null===(n=null===(s=t.filter)||void 0===s?void 0:s.exclude)||void 0===n?void 0:n.map((t=>new Xt(t))),this.include||(this.initialized=!1),this.processExplicitEntities()}update(t){return e(this,void 0,void 0,(function*(){this.initialized||(this.initialized=!0,this.processGroupEntities(t),this.processIncludes(t));const e=Object.keys(this.batteries).map((e=>{const i=this.batteries[e];return i.hass=t,i.cardUpdated}));yield Promise.all(e),this.processExcludes()}))}getBatteries(){return this.batteries}createBattery(t){Gt.filter((e=>null==t[e])).forEach((e=>t[e]=this.config[e]));const e=new qt;return e.entityId=t.entity,e.setConfig(t),e}processExplicitEntities(){let t=vt(this.config.entities,"entity");t=t.filter((t=>{if(!t.entity)throw new Error("Invalid configuration - missing property 'entity' on:\n"+JSON.stringify(t));return!t.entity.startsWith("group.")||(this.groupsToResolve.push(t.entity),!1)})),this.config.collapse&&Array.isArray(this.config.collapse)&&this.config.collapse.forEach((e=>{e.group_id?-1==this.groupsToResolve.indexOf(e.group_id)&&this.groupsToResolve.push(e.group_id):e.entities&&e.entities.forEach((e=>{t.some((t=>t.entity==e))||t.push({entity:e})}))})),t.forEach((t=>{this.batteries[t.entity]=this.createBattery(t)}))}processIncludes(t){this.include&&Object.keys(t.states).forEach((e=>{var i;(null===(i=this.include)||void 0===i?void 0:i.some((i=>i.isValid(t.states[e]))))&&!this.batteries[e]&&(this.batteries[e]=this.createBattery({entity:e}))}))}processGroupEntities(t){this.groupsToResolve.forEach((e=>{const i=t.states[e];if(!i)return void dt(`Group "${e}" not found`);const s=i.attributes;Array.isArray(s.entity_id)?(s.entity_id.forEach((t=>{this.batteries[t]||(this.batteries[t]=this.createBattery({entity:t}))})),this.groupsData[e]=s):dt(`Entities not found in "${e}"`)})),this.groupsToResolve=[]}processExcludes(){if(null==this.exclude)return void Object.keys(this.batteries).forEach((t=>{var e,i;const s=this.batteries[t];s.isHidden=null===(i=null===(e=s.entityData)||void 0===e?void 0:e.display)||void 0===i?void 0:i.hidden}));const t=this.exclude,e=[];Object.keys(this.batteries).forEach((i=>{var s,n;const r=this.batteries[i];let o=!1;for(let s of t)if(s.isValid(r.entityData,r.state)){if(s.is_permanent){e.push(i);break}o=!0}r.isHidden=o||(null===(n=null===(s=r.entityData)||void 0===s?void 0:s.display)||void 0===n?void 0:n.hidden)})),e.forEach((t=>delete this.batteries[t]))}}const Zt=(t,e,i)=>t.findIndex((t=>{var s,n;if(t.group_id&&!(null===(n=null===(s=i[t.group_id])||void 0===s?void 0:s.entity_id)||void 0===n?void 0:n.some((t=>e.entityId==t))))return!1;if(t.entities&&!t.entities.some((t=>e.entityId==t)))return!1;const r=isNaN(ut(e.state))?0:ut(e.state);return r>=t.min&&r<=t.max}));var Yt=t=>t.forEach((t=>{null==t.min&&(t.min=0),null!=t.max&&t.max<t.min?dt("Collapse group min value should be lower than max.\n"+JSON.stringify(t,null,2)):null==t.max&&(t.max=100)}));const te=(t,e,i)=>{if((null==i?void 0:i.group_id)&&!t[i.group_id])throw new Error("Group not found: "+i.group_id);let s=null==i?void 0:i.name;!s&&(null==i?void 0:i.group_id)&&(s=t[i.group_id].friendly_name);let n=null==i?void 0:i.icon;return void 0===n&&(null==i?void 0:i.group_id)&&(n=t[i.group_id].icon),{title:s,icon:n,iconColor:null==i?void 0:i.icon_color,batteryIds:e,secondaryInfo:null==i?void 0:i.secondary_info}},ee=(t,e,i)=>t=t.replace(/\{[a-z]+\}/g,(t=>{switch(t){case"{min}":return e.batteryIds.reduce(((t,e)=>t>ut(i[e].state)?ut(i[e].state):t),100).toString();case"{max}":return e.batteryIds.reduce(((t,e)=>t<ut(i[e].state)?ut(i[e].state):t),0).toString();case"{count}":return e.batteryIds.length.toString();case"{range}":const s=e.batteryIds.reduce(((t,e)=>t>ut(i[e].state)?ut(i[e].state):t),100).toString(),n=e.batteryIds.reduce(((t,e)=>t<ut(i[e].state)?ut(i[e].state):t),0).toString();return s==n?s:s+"-"+n;default:return t}})),ie=(t,e,i)=>{switch(t){case"first":t=e.length>0?i[e[0]].icon:void 0;break;case"last":if(e.length>0){t=i[e[e.length-1]].icon}else t=void 0}return t},se=(t,e,i)=>{switch(t){case"first":t=e.length>0?i[e[0]].iconColor:void 0;break;case"last":if(e.length>0){t=i[e[e.length-1]].iconColor}else t=void 0}return t};const ne=(t,e)=>{let i=ut(t),s=ut(e);return i=isNaN(i)?-1:i,s=isNaN(s)?-1:s,i-s},re=(t,e)=>t.localeCompare(e);var oe={sort:{by:"state"},collapse:8,filter:{include:[{name:"attributes.device_class",value:"battery"}],exclude:[{name:"entity_id",value:"binary_sensor.*"}]},secondary_info:"{last_changed}",bulk_rename:[{from:" Battery"},{from:" level"}],colors:{steps:["#ff0000","#ffff00","#00ff00"],gradient:!0}};class ae extends Et{constructor(){super(...arguments),this.list=[],this.groups=[],this.batteries={}}static get styles(){return a([xt+".entity-spacing {\n    margin: 8px 0;\n}\n\n.entity-spacing:first-child {\n    margin-top: 0;\n}\n\n.entity-spacing:last-child {\n    margin-bottom: 0;\n}\n\n.expandWrapper > .toggler {\n    display: flex;\n    align-items: center;\n    cursor: pointer;\n}\n.expandWrapper > .toggler > .name {\n    flex: 1;\n}\n.expandWrapper > .toggler div.chevron {\n    transform: rotate(-90deg);\n    font-size: 26px;\n    height: 40px;\n    width: 40px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n.expandWrapper > .toggler .chevron,\n.expandWrapper > .toggler + div {\n    transition: all 0.5s ease;\n}\n.expandWrapper > .toggler.expanded .chevron {\n    transform: rotate(-90deg) scaleX(-1);\n}\n.expandWrapper > .toggler + div {\n    overflow: hidden;\n}\n.expandWrapper > .toggler:not(.expanded) + div {\n    max-height: 0 !important;\n}"])}internalUpdate(t,i){return e(this,void 0,void 0,(function*(){(null==this.batteryProvider||t)&&(1==Object.keys(this.config).length&&(this.config=Object.assign({},oe)),this.batteryProvider=new Qt(this.config)),i&&(yield this.batteryProvider.update(this.hass)),this.header=this.config.title,this.batteries=this.batteryProvider.getBatteries();const e=((t,e)=>{let i=Object.keys(e);const s=vt(t.sort,"by");return i.sort(((t,i)=>{let n=0;return s.find((s=>{let r,o;switch(s.by){case"name":r=e[t].name,o=e[i].name;break;case"state":r=null==e[t].stateNumeric?e[t].state:e[t].stateNumeric,o=null==e[i].stateNumeric?e[i].state:e[i].stateNumeric;break;default:if(s.by.startsWith("entity.")){const n=s.by.split(".");n.shift(),r=n.reduce(((t,e,i)=>void 0===t?void 0:t[e]),e[t].entityData),o=n.reduce(((t,e,i)=>void 0===t?void 0:t[e]),e[i].entityData)}else dt("Unknown sort field: "+s.by,"warn")}return n=ht(r)||ht(o)?ne(r,o):void 0===r?void 0===o?0:-1:re(r,o),s.desc&&(n*=-1),0!=n})),n}))})(this.config,this.batteries).filter((t=>!this.batteries[t].isHidden)),s=((t,e,i,s)=>{const n={list:[],groups:[]};if(!i)return n.list=e,n;if("number"==typeof i){n.list=e.slice(0,i);const t=e.slice(i);t.length>0&&n.groups.push(te(s,t))}else Yt(i),e.forEach((e=>{const r=Zt(i,t[e],s);-1==r?n.list.push(e):(n.groups[r]=n.groups[r]||te(s,[],i[r]),n.groups[r].batteryIds.push(e))}));return n.groups.forEach((e=>{e.title&&(e.title=ee(e.title,e,t)),e.secondaryInfo&&(e.secondaryInfo=ee(e.secondaryInfo,e,t)),e.icon=ie(e.icon,e.batteryIds,t),e.iconColor=se(e.iconColor,e.batteryIds,t)})),n})(this.batteries,e,this.config.collapse,this.batteryProvider.groupsData);JSON.stringify(s.list)!=JSON.stringify(this.list)&&(this.list=s.list),JSON.stringify(s.groups)!=JSON.stringify(this.groups)&&(this.groups=s.groups)}))}internalRender(){return 0==this.list.length&&0==this.groups.length?(this.style.display="none",M``):(this.style.removeProperty("display"),Jt(this))}onError(){this.style.removeProperty("display")}getCardSize(){let t=vt(this.config.entities,"entity").length||1;return this.config.collapse?"number"==typeof this.config.collapse?this.config.collapse+1:this.config.collapse.length+1:t+1}}t([lt({attribute:!1})],ae.prototype,"header",void 0),t([lt({attribute:!1})],ae.prototype,"list",void 0),t([lt({attribute:!1})],ae.prototype,"groups",void 0),void 0===customElements.get("battery-state-entity")?(console.info("%c BATTERY-STATE-CARD %c 3.2.1","color: white; background: forestgreen; font-weight: 700;","color: forestgreen; background: white; font-weight: 700;"),customElements.define("battery-state-entity",qt),customElements.define("battery-state-card",ae)):dt("Element seems to be defined already","warn"),window.customCards=window.customCards||[],window.customCards.push({type:"battery-state-card",name:"Battery state card",preview:!0,description:"Customizable card for listing battery states/levels"})}();
//# sourceMappingURL=battery-state-card.js.map


/* ─────────────────────────────────────────────────────────────────────────
 * Visual Editor Patch — sjfehlen/battery-state-card fork
 * ───────────────────────────────────────────────────────────────────────── */

/**
 * battery-state-card-editor.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Full visual (UI) editor for battery-state-card.
 * Appended to the official battery-state-card.js at build time.
 *
 * Implements a Shadow DOM Web Component that Home Assistant uses as the
 * Lovelace card editor when `getConfigElement()` is defined on the card class.
 *
 * Features:
 *   • General tab  — title, secondary_info, collapse, unit, round, sort, tap_action
 *   • Colors tab   — color steps (picker + hex), thresholds, gradient mode
 *   • Entities tab — add/edit/remove entities with all per-entity options
 *   • Filters tab  — include/exclude filters, bulk rename rules
 *   • Advanced tab — charging state, state map, value override, debug
 *
 * No external dependencies. Vanilla JS + Shadow DOM only.
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════════════
   *  CONSTANTS & HELPERS
   * ═══════════════════════════════════════════════════════════════════════════ */

  const VERSION = "3.2.1";

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function fireConfigChanged(element, config) {
    element.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   *  STYLES
   * ═══════════════════════════════════════════════════════════════════════════ */

  const STYLES = `
    :host {
      display: block;
      font-family: var(--primary-font-family, Roboto, sans-serif);
      font-size: 14px;
      color: var(--primary-text-color);
      --editor-radius: 8px;
      --editor-border: 1px solid var(--divider-color, #e0e0e0);
      --editor-bg-section: var(--card-background-color, #fff);
      --editor-bg-input: var(--secondary-background-color, #f5f5f5);
      --editor-primary: var(--primary-color, #03a9f4);
      --editor-secondary: var(--secondary-text-color, #727272);
      --editor-error: var(--error-color, #f44336);
    }

    /* ── Tabs ── */
    .tabs {
      display: flex;
      border-bottom: 2px solid var(--divider-color, #e0e0e0);
      margin-bottom: 16px;
      gap: 2px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tabs::-webkit-scrollbar { display: none; }
    .tab {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 14px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: var(--editor-secondary);
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      border-radius: 4px 4px 0 0;
      transition: color .15s, background .15s;
    }
    .tab:hover {
      color: var(--primary-text-color);
      background: var(--editor-bg-input);
    }
    .tab.active {
      color: var(--editor-primary);
      border-bottom-color: var(--editor-primary);
      background: transparent;
    }
    .tab .badge {
      background: var(--editor-primary);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 10px;
      min-width: 16px;
      text-align: center;
    }

    /* ── Sections ── */
    .section {
      background: var(--editor-bg-section);
      border: var(--editor-border);
      border-radius: var(--editor-radius);
      padding: 14px 16px;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .1em;
      color: var(--editor-secondary);
      margin-bottom: 14px;
    }
    .sub-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .06em;
      color: var(--editor-secondary);
      margin: 16px 0 8px;
      padding-top: 12px;
      border-top: var(--editor-border);
    }

    /* ── Field ── */
    .field { margin-bottom: 12px; }
    .field:last-child { margin-bottom: 0; }
    .field > label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      color: var(--editor-secondary);
      margin-bottom: 5px;
    }
    .field input[type="text"],
    .field input[type="number"],
    .field select,
    .field textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      border: var(--editor-border);
      border-radius: 6px;
      background: var(--editor-bg-input);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
      transition: border-color .15s, box-shadow .15s;
    }
    .field input:focus,
    .field select:focus,
    .field textarea:focus {
      outline: none;
      border-color: var(--editor-primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--editor-primary) 15%, transparent);
    }
    .field textarea {
      resize: vertical;
      min-height: 64px;
      font-family: "Courier New", Courier, monospace;
      font-size: 12px;
    }
    .hint {
      display: block;
      font-size: 11px;
      color: var(--editor-secondary);
      margin-top: 4px;
      line-height: 1.4;
    }
    .hint code {
      background: var(--editor-bg-input);
      border: var(--editor-border);
      padding: 1px 4px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 11px;
    }

    /* ── Info block ── */
    .info-block {
      font-size: 12px;
      color: var(--editor-secondary);
      background: var(--editor-bg-input);
      border: var(--editor-border);
      border-radius: 6px;
      padding: 8px 12px;
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .info-block strong { color: var(--primary-text-color); }

    /* ── Toggle row ── */
    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .toggle-row .toggle-label {
      font-size: 13px;
      line-height: 1.4;
      flex: 1;
    }
    .toggle-row .toggle-hint {
      font-size: 11px;
      color: var(--editor-secondary);
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 42px;
      height: 24px;
      flex-shrink: 0;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: var(--disabled-text-color, #bbb);
      border-radius: 24px;
      transition: background .25s;
    }
    .slider::before {
      content: "";
      position: absolute;
      width: 18px;
      height: 18px;
      left: 3px;
      bottom: 3px;
      background: #fff;
      border-radius: 50%;
      transition: transform .25s;
      box-shadow: 0 1px 3px rgba(0,0,0,.3);
    }
    input:checked + .slider { background: var(--editor-primary); }
    input:checked + .slider::before { transform: translateX(18px); }

    /* ── Buttons ── */
    .btn-add {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 14px;
      border: 1px dashed var(--editor-primary);
      border-radius: 6px;
      background: transparent;
      color: var(--editor-primary);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      margin-top: 8px;
      transition: background .15s, color .15s;
    }
    .btn-add:hover { background: var(--editor-primary); color: #fff; }
    .btn-add.secondary {
      border-color: var(--editor-secondary);
      color: var(--editor-secondary);
    }
    .btn-add.secondary:hover { background: var(--editor-secondary); color: #fff; }
    .btn-add + .btn-add { margin-left: 8px; }

    .btn-icon {
      border: none;
      background: none;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 4px;
      color: var(--editor-secondary);
      display: inline-flex;
      align-items: center;
      font-size: 15px;
      line-height: 1;
      transition: color .15s, background .15s;
    }
    .btn-icon:hover { color: var(--editor-error); background: color-mix(in srgb, var(--editor-error) 10%, transparent); }

    /* ── Empty state ── */
    .empty {
      text-align: center;
      font-size: 13px;
      color: var(--editor-secondary);
      padding: 16px;
      border: 1px dashed var(--divider-color, #ccc);
      border-radius: 6px;
      margin-bottom: 8px;
    }

    /* ── Entity rows ── */
    .entity-card {
      border: var(--editor-border);
      border-radius: 6px;
      margin-bottom: 8px;
      overflow: hidden;
    }
    .entity-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      cursor: pointer;
      background: var(--editor-bg-input);
      user-select: none;
      transition: background .15s;
    }
    .entity-header:hover { background: var(--divider-color, #e8e8e8); }
    .entity-icon { font-size: 18px; flex-shrink: 0; }
    .entity-name { flex: 1; font-size: 13px; font-weight: 500; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .entity-id-small { font-size: 11px; color: var(--editor-secondary); margin-top: 1px; }
    .entity-chevron { font-size: 14px; color: var(--editor-secondary); flex-shrink: 0; }
    .entity-body {
      padding: 14px;
      border-top: var(--editor-border);
    }

    /* ── Color rows ── */
    .color-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .color-swatch {
      width: 32px;
      height: 32px;
      border-radius: 5px;
      border: var(--editor-border);
      flex-shrink: 0;
    }
    .color-picker {
      width: 38px;
      height: 32px;
      padding: 2px;
      border: var(--editor-border);
      border-radius: 5px;
      cursor: pointer;
      background: none;
      flex-shrink: 0;
    }
    .color-text {
      flex: 2;
      padding: 6px 10px !important;
      border: var(--editor-border) !important;
      border-radius: 5px !important;
      background: var(--editor-bg-input) !important;
      color: var(--primary-text-color) !important;
      font-size: 13px !important;
      font-family: monospace !important;
    }
    .color-threshold {
      width: 90px;
      flex-shrink: 0;
      padding: 6px 8px;
      border: var(--editor-border);
      border-radius: 5px;
      background: var(--editor-bg-input);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
    }

    /* ── Inline row (filter/rename/state-map) ── */
    .inline-row {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .inline-col {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 80px;
    }
    .inline-col label {
      font-size: 11px;
      color: var(--editor-secondary);
      margin-bottom: 3px;
      font-weight: 500;
    }
    .inline-col input,
    .inline-col select {
      padding: 7px 9px;
      border: var(--editor-border);
      border-radius: 5px;
      background: var(--editor-bg-input);
      color: var(--primary-text-color);
      font-size: 13px;
      font-family: inherit;
      width: 100%;
      box-sizing: border-box;
    }

    /* ── Two-col grid ── */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    @media (max-width: 480px) {
      .grid-2 { grid-template-columns: 1fr; }
    }

    /* ── Tap action sub-section ── */
    .tap-section {
      border: var(--editor-border);
      border-radius: 6px;
      padding: 12px;
      margin-top: 6px;
      background: var(--editor-bg-input);
    }

    /* ── Charging sub-section ── */
    .charge-section {
      border: var(--editor-border);
      border-radius: 6px;
      padding: 12px;
      margin-top: 6px;
      background: var(--editor-bg-input);
    }
  `;

  /* ═══════════════════════════════════════════════════════════════════════════
   *  EDITOR CLASS
   * ═══════════════════════════════════════════════════════════════════════════ */

  class BatteryStateCardEditor extends HTMLElement {
    constructor() {
      super();
      this._cfg = {};
      this._tab = "general";
      this._expandedEntity = null;
      this._root = this.attachShadow({ mode: "open" });
    }

    /* ── HA lifecycle ── */

    set hass(hass) {
      this._hass = hass;
    }

    setConfig(config) {
      this._cfg = deepClone(config);
      this._render();
    }

    connectedCallback() {
      this._render();
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  STATE MANAGEMENT
     * ═══════════════════════════════════════════════════════════════════════ */

    _set(key, value) {
      const cfg = deepClone(this._cfg);
      if (value === undefined || value === null || value === "") {
        delete cfg[key];
      } else {
        cfg[key] = value;
      }
      this._cfg = cfg;
      this._render();
      fireConfigChanged(this, cfg);
    }

    _setDeep(cfg) {
      this._cfg = deepClone(cfg);
      this._render();
      fireConfigChanged(this, this._cfg);
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  DERIVED ACCESSORS
     * ═══════════════════════════════════════════════════════════════════════ */

    _entities() {
      return (this._cfg.entities || []).map((e) =>
        typeof e === "string" ? { entity: e } : deepClone(e)
      );
    }

    _sortArr() {
      const s = this._cfg.sort;
      if (!s) return [];
      const arr = Array.isArray(s) ? s : [s];
      return arr.map((i) => (typeof i === "string" ? { by: i } : i));
    }

    _colorSteps() {
      const c = this._cfg.colors;
      if (!c || !c.steps) return [];
      return c.steps.map((s) =>
        typeof s === "string" ? { color: s } : deepClone(s)
      );
    }

    _isGradient() {
      return this._cfg.colors?.gradient === true;
    }

    _bulkRename() {
      const br = this._cfg.bulk_rename;
      if (!br) return { rules: [], capitalize_first: true };
      if (Array.isArray(br)) return { rules: deepClone(br), capitalize_first: true };
      return { rules: [], capitalize_first: true, ...deepClone(br) };
    }

    _filter() {
      return deepClone(this._cfg.filter || {});
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  MAIN RENDER
     * ═══════════════════════════════════════════════════════════════════════ */

    _render() {
      const style = document.createElement("style");
      style.textContent = STYLES;

      const root = document.createElement("div");
      root.append(this._buildTabs(), this._buildTabContent());

      this._root.replaceChildren(style, root);
    }

    /* ── Tab bar ── */

    _buildTabs() {
      const defs = [
        { id: "general",  label: "General",  icon: "⚙️" },
        { id: "colors",   label: "Colors",   icon: "🎨", badge: this._colorSteps().length || null },
        { id: "entities", label: "Entities", icon: "📋", badge: this._entities().length || null },
        { id: "filters",  label: "Filters",  icon: "🔍" },
        { id: "advanced", label: "Advanced", icon: "🔧" },
      ];

      const bar = document.createElement("div");
      bar.className = "tabs";

      defs.forEach(({ id, label, icon, badge }) => {
        const btn = document.createElement("button");
        btn.className = "tab" + (this._tab === id ? " active" : "");
        btn.innerHTML = `<span>${icon}</span><span>${label}</span>` +
          (badge ? `<span class="badge">${badge}</span>` : "");
        btn.onclick = () => { this._tab = id; this._render(); };
        bar.append(btn);
      });

      return bar;
    }

    _buildTabContent() {
      const wrap = document.createElement("div");
      switch (this._tab) {
        case "general":  wrap.append(this._tabGeneral());  break;
        case "colors":   wrap.append(this._tabColors());   break;
        case "entities": wrap.append(this._tabEntities()); break;
        case "filters":  wrap.append(this._tabFilters());  break;
        case "advanced": wrap.append(this._tabAdvanced()); break;
      }
      return wrap;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: GENERAL
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabGeneral() {
      const frag = document.createDocumentFragment();
      const cfg = this._cfg;
      const sorts = this._sortArr();
      const pri = sorts[0] || {};
      const sec = sorts[1] || {};

      /* Card settings */
      const s1 = this._section("Card Settings");
      s1.append(
        this._text("Card Title", cfg.title || "", (v) => this._set("title", v), "e.g. Battery Levels"),
        this._text(
          "Secondary Info",
          cfg.secondary_info || "",
          (v) => this._set("secondary_info", v),
          "{last_changed}",
          "Keywords: {last_changed} · {last_updated} · {charging} · {attributes.x}"
        ),
        this._grid2(
          this._num("Collapse (show N)", cfg.collapse || "", (v) => this._set("collapse", v ? parseInt(v) : undefined), "e.g. 8", "Remaining in expand section"),
          this._num("Round (decimal places)", cfg.round !== undefined ? cfg.round : "", (v) => this._set("round", v !== "" ? parseInt(v) : undefined), "e.g. 0")
        ),
        this._text("Unit Override", cfg.unit || "", (v) => this._set("unit", v), "% (default)", "Shown after the battery value")
      );
      frag.append(s1);

      /* Sorting */
      const s2 = this._section("Sorting");
      s2.append(
        this._select("Sort By", pri.by || "", [
          { value: "",                    label: "— None —" },
          { value: "state",               label: "Battery Level" },
          { value: "name",                label: "Name" },
          { value: "entity.last_changed", label: "Last Changed" },
          { value: "entity.last_updated", label: "Last Updated" },
        ], (v) => {
          if (!v) return this._set("sort", undefined);
          const arr = sorts.length ? [...sorts] : [{}];
          arr[0] = { ...arr[0], by: v };
          this._set("sort", arr.length === 1 ? arr[0] : arr);
        })
      );

      if (sorts.length) {
        s2.append(
          this._toggle("Descending order (primary)", pri.desc || false, (v) => {
            const arr = [...sorts];
            arr[0] = { ...arr[0], desc: v };
            this._set("sort", arr.length === 1 ? arr[0] : arr);
          }),
          this._select("Secondary Sort By", sec.by || "", [
            { value: "",                    label: "— None —" },
            { value: "state",               label: "Battery Level" },
            { value: "name",                label: "Name" },
            { value: "entity.last_changed", label: "Last Changed" },
            { value: "entity.last_updated", label: "Last Updated" },
          ], (v) => {
            const arr = [...sorts];
            if (!v) {
              this._set("sort", arr.length === 1 ? arr[0] : arr[0]);
            } else {
              arr[1] = { by: v, desc: sec.desc || false };
              this._set("sort", arr);
            }
          })
        );

        if (sorts.length > 1) {
          s2.append(
            this._toggle("Descending order (secondary)", sec.desc || false, (v) => {
              const arr = [...sorts];
              arr[1] = { ...arr[1], desc: v };
              this._set("sort", arr);
            })
          );
        }
      }
      frag.append(s2);

      /* Tap action */
      const s3 = this._section("Tap Action (Card Default)");
      s3.append(
        this._info("Applied to all entities unless overridden per-entity."),
        this._tapActionEditor(cfg.tap_action, (v) => this._set("tap_action", v))
      );
      frag.append(s3);

      return frag;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: COLORS
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabColors() {
      const frag = document.createDocumentFragment();
      const colors = this._cfg.colors || { steps: [] };
      const isGrad = this._isGradient();
      const steps  = this._colorSteps();

      /* Mode */
      const s1 = this._section("Color Mode");
      s1.append(
        this._toggle(
          "Gradient — smooth color transition between steps",
          isGrad,
          (v) => this._set("colors", { ...colors, gradient: v })
        )
      );
      if (isGrad) {
        s1.append(this._info(
          "<strong>Gradient mode:</strong> Use hex colors only (#rrggbb). " +
          "Add 2+ colors ordered from lowest % to highest %. They blend smoothly."
        ));
      } else {
        s1.append(this._info(
          "<strong>Step mode:</strong> Each color applies to battery levels ≤ the threshold. " +
          "Default: red ≤ 20, yellow ≤ 55, green ≤ 100."
        ));
      }
      frag.append(s1);

      /* Color steps */
      const s2 = this._section("Color Steps");

      if (steps.length === 0) {
        s2.append(this._empty("No color steps — default theme colors are used"));
      }

      steps.forEach((step, i) => {
        const row = document.createElement("div");
        row.className = "color-row";

        const swatch = document.createElement("div");
        swatch.className = "color-swatch";
        swatch.style.background = step.color || "#888";

        const picker = document.createElement("input");
        picker.type = "color";
        picker.className = "color-picker";
        picker.title = "Pick color";
        try { if (/^#[0-9a-f]{6}$/i.test(step.color)) picker.value = step.color; } catch (_) {}
        picker.oninput = (e) => this._updateColorStep(i, "color", e.target.value);

        const hex = document.createElement("input");
        hex.type = "text";
        hex.className = "color-text";
        hex.value = step.color || "";
        hex.placeholder = "#rrggbb or red";
        hex.onchange = (e) => this._updateColorStep(i, "color", e.target.value);

        row.append(swatch, picker, hex);

        if (!isGrad) {
          const thresh = document.createElement("input");
          thresh.type = "number";
          thresh.className = "color-threshold";
          thresh.min = "0"; thresh.max = "100";
          thresh.value = step.value !== undefined ? step.value : "";
          thresh.placeholder = "Threshold %";
          thresh.onchange = (e) => this._updateColorStep(i, "value", e.target.value !== "" ? parseInt(e.target.value) : undefined);
          row.append(thresh);
        }

        const del = this._delBtn(() => {
          const st = this._colorSteps();
          st.splice(i, 1);
          const newSteps = isGrad ? st.map((s) => s.color) : st;
          this._set("colors", { ...colors, steps: newSteps });
        });
        row.append(del);
        s2.append(row);
      });

      const addBtn = this._addBtn("+ Add Color Step", () => {
        const st = this._colorSteps();
        if (isGrad) {
          const newSteps = [...st.map((s) => s.color), "#00ff00"];
          this._set("colors", { ...colors, steps: newSteps });
        } else {
          st.push({ value: 100, color: "#00ff00" });
          this._set("colors", { ...colors, steps: st });
        }
      });
      s2.append(addBtn);

      if (steps.length > 0) {
        const resetBtn = this._addBtn("↩ Reset to Defaults", () => this._set("colors", undefined), true);
        s2.append(resetBtn);
      }

      frag.append(s2);
      return frag;
    }

    _updateColorStep(i, field, value) {
      const colors  = this._cfg.colors || { steps: [] };
      const isGrad  = this._isGradient();
      const steps   = this._colorSteps();
      steps[i]      = { ...steps[i], [field]: value };
      const newSteps = isGrad ? steps.map((s) => s.color) : steps;
      this._set("colors", { ...colors, steps: newSteps });
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: ENTITIES
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabEntities() {
      const frag = document.createDocumentFragment();
      const entities = this._entities();

      const s = this._section(`Entity List (${entities.length})`);
      s.append(this._info(
        "Add entities here for full per-entity control. " +
        "Use the <strong>Filters</strong> tab to auto-include by device class — " +
        "no need to list them all manually."
      ));

      if (entities.length === 0) {
        s.append(this._empty("No entities added. Tap + to add one, or use Filters to auto-populate."));
      }

      entities.forEach((entity, i) => {
        s.append(this._entityCard(entity, i, entities));
      });

      s.append(this._addBtn("+ Add Entity", () => {
        const ents = this._entities();
        ents.push({ entity: "" });
        this._set("entities", ents);
        this._expandedEntity = ents.length - 1;
      }));

      frag.append(s);
      return frag;
    }

    _entityCard(entity, i, allEntities) {
      const isOpen = this._expandedEntity === i;

      const card = document.createElement("div");
      card.className = "entity-card";

      /* Header */
      const header = document.createElement("div");
      header.className = "entity-header";

      const icon = document.createElement("div");
      icon.className = "entity-icon";
      icon.textContent = "🔋";

      const nameWrap = document.createElement("div");
      nameWrap.style.flex = "1";
      nameWrap.style.minWidth = "0";

      const nameEl = document.createElement("div");
      nameEl.className = "entity-name";
      nameEl.textContent = entity.name || entity.entity || "New Entity";

      nameWrap.append(nameEl);

      if (entity.entity && entity.name) {
        const idEl = document.createElement("div");
        idEl.className = "entity-id-small";
        idEl.textContent = entity.entity;
        nameWrap.append(idEl);
      }

      const chevron = document.createElement("div");
      chevron.className = "entity-chevron";
      chevron.textContent = isOpen ? "▲" : "▼";

      const del = this._delBtn((e) => {
        e.stopPropagation();
        const ents = this._entities();
        ents.splice(i, 1);
        if (this._expandedEntity === i) this._expandedEntity = null;
        else if (this._expandedEntity > i) this._expandedEntity--;
        this._set("entities", ents);
      });

      header.append(icon, nameWrap, chevron, del);
      header.onclick = () => {
        this._expandedEntity = isOpen ? null : i;
        this._render();
      };

      card.append(header);

      if (!isOpen) return card;

      /* Body */
      const body = document.createElement("div");
      body.className = "entity-body";

      const upd = (field, val) => {
        const ents = this._entities();
        if (val === "" || val === undefined) delete ents[i][field];
        else ents[i][field] = val;
        this._set("entities", ents);
      };

      body.append(
        this._text("Entity ID *", entity.entity || "", (v) => upd("entity", v), "sensor.my_device_battery"),
        this._grid2(
          this._text("Display Name", entity.name || "", (v) => upd("name", v), "Override entity name"),
          this._text("Icon Override", entity.icon || "", (v) => upd("icon", v), "mdi:battery")
        ),
        this._grid2(
          this._text("Attribute (value source)", entity.attribute || "", (v) => upd("attribute", v), "battery_level", "Override which attribute holds the battery %"),
          this._num("Multiplier", entity.multiplier || "", (v) => upd("multiplier", v ? parseFloat(v) : undefined), "1", "Use 10 if sensor reports 0–10 range")
        ),
        this._grid2(
          this._text("Secondary Info", entity.secondary_info || "", (v) => upd("secondary_info", v), "{last_changed}"),
          this._text("Value Override", entity.value_override || "", (v) => upd("value_override", v), "{state|abs()}")
        ),
        this._grid2(
          this._text("Unit", entity.unit || "", (v) => upd("unit", v), "% (inherits card default)"),
          this._num("Round", entity.round !== undefined ? entity.round : "", (v) => upd("round", v !== "" ? parseInt(v) : undefined), "decimal places")
        ),
        this._toggle(
          "Non-battery entity (disables auto attribute detection)",
          entity.non_battery_entity || false,
          (v) => upd("non_battery_entity", v || undefined)
        ),
        this._toggle(
          "Disable HA default state formatting",
          entity.default_state_formatting === false,
          (v) => upd("default_state_formatting", v ? false : undefined)
        )
      );

      /* Tap action */
      const tapTitle = document.createElement("div");
      tapTitle.className = "sub-title";
      tapTitle.textContent = "Tap Action";
      body.append(tapTitle, this._tapActionEditor(entity.tap_action, (v) => upd("tap_action", v)));

      /* Charging state */
      const chTitle = document.createElement("div");
      chTitle.className = "sub-title";
      chTitle.textContent = "Charging State";
      body.append(chTitle, this._chargingEditor(entity.charging_state, (v) => upd("charging_state", v)));

      /* State map */
      const smTitle = document.createElement("div");
      smTitle.className = "sub-title";
      smTitle.textContent = "State Map (non-numeric values)";
      body.append(smTitle, this._stateMapEditor(entity.state_map || [], (v) => upd("state_map", v)));

      card.append(body);
      return card;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: FILTERS
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabFilters() {
      const frag = document.createDocumentFragment();
      const filter = this._filter();
      const include = filter.include || [];
      const exclude = filter.exclude || [];
      const br = this._bulkRename();

      /* Include */
      const s1 = this._section(`Auto-Include Filters (${include.length})`);
      s1.append(this._info(
        "Entities matching <strong>any</strong> include filter are added to the card automatically. " +
        "Most common: <code>attributes.device_class = battery</code>"
      ));
      if (include.length === 0) {
        s1.append(this._empty("No include filters — add entities manually in the Entities tab."));
      }
      include.forEach((f, i) => {
        s1.append(this._filterRow(f, i, "include", filter));
      });
      s1.append(this._addBtn("+ Add Include Filter", () => {
        const arr = [...include, { name: "attributes.device_class", value: "battery" }];
        this._set("filter", { ...filter, include: arr });
      }));
      frag.append(s1);

      /* Exclude */
      const s2 = this._section(`Exclude Filters (${exclude.length})`);
      s2.append(this._info(
        "Entities matching <strong>any</strong> exclude filter are removed from the list. " +
        "Common use: exclude <code>entity_id matches binary_sensor.*</code>"
      ));
      if (exclude.length === 0) {
        s2.append(this._empty("No exclude filters."));
      }
      exclude.forEach((f, i) => {
        s2.append(this._filterRow(f, i, "exclude", filter));
      });
      s2.append(this._addBtn("+ Add Exclude Filter", () => {
        const arr = [...exclude, { name: "entity_id", value: "binary_sensor.*", operator: "matches" }];
        this._set("filter", { ...filter, exclude: arr });
      }));
      frag.append(s2);

      /* Bulk rename */
      const s3 = this._section(`Bulk Rename Rules (${(br.rules || []).length})`);
      s3.append(this._info(
        "Strip or replace common suffixes from all entity names. " +
        "E.g. a rule <code>from: \" Battery Level\"</code> removes that suffix from every name."
      ));
      s3.append(
        this._toggle(
          "Capitalize first letter of entity names",
          br.capitalize_first !== false,
          (v) => { this._set("bulk_rename", { ...br, capitalize_first: v }); }
        )
      );

      if ((br.rules || []).length === 0) {
        s3.append(this._empty("No rename rules."));
      }

      (br.rules || []).forEach((rule, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";

        const fromCol = this._inlineCol("From (string or /regex/)", rule.from || "", (v) => {
          const rules = [...(br.rules || [])];
          rules[i] = { ...rules[i], from: v };
          this._set("bulk_rename", { ...br, rules });
        }, '" Battery Level"');

        const toCol = this._inlineCol("To (blank = delete)", rule.to || "", (v) => {
          const rules = [...(br.rules || [])];
          rules[i] = { ...rules[i], to: v };
          this._set("bulk_rename", { ...br, rules });
        }, "(empty)");

        row.append(fromCol, toCol, this._delBtn(() => {
          const rules = [...(br.rules || [])];
          rules.splice(i, 1);
          this._set("bulk_rename", { ...br, rules });
        }));
        s3.append(row);
      });

      s3.append(this._addBtn("+ Add Rename Rule", () => {
        const rules = [...(br.rules || []), { from: "" }];
        this._set("bulk_rename", { ...br, rules });
      }));
      frag.append(s3);

      return frag;
    }

    _filterRow(filter, i, type, currentFilter) {
      const arr = currentFilter[type] || [];
      const hasValue = filter.operator !== "exists" && filter.operator !== "not_exists";

      const row = document.createElement("div");
      row.className = "inline-row";

      const propCol = this._inlineCol("Property", filter.name || "", (v) => {
        const a = [...arr]; a[i] = { ...a[i], name: v };
        this._set("filter", { ...currentFilter, [type]: a });
      }, "e.g. attributes.device_class");

      const opCol = document.createElement("div");
      opCol.className = "inline-col";
      const opLabel = document.createElement("label");
      opLabel.textContent = "Operator";
      const opSel = document.createElement("select");
      [
        ["",          "= (equals, default)"],
        ["=",         "="],
        [">",         ">"],
        [">=",        ">="],
        ["<",         "<"],
        ["<=",        "<="],
        ["exists",    "exists"],
        ["not_exists","not_exists"],
        ["contains",  "contains"],
        ["matches",   "matches (wildcard/regex)"],
      ].forEach(([val, label]) => {
        const opt = document.createElement("option");
        opt.value = val; opt.textContent = label;
        opt.selected = (filter.operator || "") === val;
        opSel.append(opt);
      });
      opSel.onchange = (e) => {
        const a = [...arr];
        a[i] = { ...a[i], operator: e.target.value || undefined };
        this._set("filter", { ...currentFilter, [type]: a });
        // re-render to show/hide value column
      };
      opCol.append(opLabel, opSel);

      row.append(propCol, opCol);

      if (hasValue) {
        const valCol = this._inlineCol("Value", filter.value !== undefined ? filter.value : "", (v) => {
          const a = [...arr]; a[i] = { ...a[i], value: v };
          this._set("filter", { ...currentFilter, [type]: a });
        }, "e.g. battery or *_level");
        row.append(valCol);
      }

      row.append(this._delBtn(() => {
        const a = [...arr]; a.splice(i, 1);
        this._set("filter", { ...currentFilter, [type]: a });
      }));

      return row;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  TAB: ADVANCED
     * ═══════════════════════════════════════════════════════════════════════ */

    _tabAdvanced() {
      const frag = document.createDocumentFragment();
      const cfg = this._cfg;

      /* Charging state */
      const s1 = this._section("Charging State (Card Default)");
      s1.append(
        this._info("Applies to all entities unless overridden per-entity."),
        this._chargingEditor(cfg.charging_state, (v) => this._set("charging_state", v))
      );
      frag.append(s1);

      /* State map */
      const s2 = this._section("State Map (Card Default)");
      s2.append(
        this._info("Map non-numeric entity states to numeric battery levels for all entities."),
        this._stateMapEditor(cfg.state_map || [], (v) => this._set("state_map", v))
      );
      frag.append(s2);

      /* Value override */
      const s3 = this._section("Value Override (Card Default)");
      s3.append(
        this._text(
          "Value Override (KString)",
          cfg.value_override || "",
          (v) => this._set("value_override", v),
          "{state|abs()}",
          "Applied to all entities. Useful for signal sensors: {state|abs()}"
        )
      );
      frag.append(s3);

      /* Debug */
      const s4 = this._section("Debug");
      s4.append(
        this._toggle(
          "Enable debug output for all entities",
          cfg.debug === true,
          (v) => this._set("debug", v ? true : undefined)
        ),
        this._text(
          "Debug single entity ID",
          typeof cfg.debug === "string" ? cfg.debug : "",
          (v) => this._set("debug", v || undefined),
          "sensor.my_device_battery",
          "Overrides the toggle above"
        ),
        this._toggle(
          "Disable HA default state formatting (card-wide)",
          cfg.default_state_formatting === false,
          (v) => this._set("default_state_formatting", v ? false : undefined)
        )
      );
      frag.append(s4);

      return frag;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  SHARED SUB-EDITORS
     * ═══════════════════════════════════════════════════════════════════════ */

    _tapActionEditor(tapAction, onChange) {
      const ta = !tapAction
        ? { action: "more-info" }
        : typeof tapAction === "string"
          ? { action: tapAction }
          : deepClone(tapAction);

      const action = ta.action || "more-info";

      const wrap = document.createElement("div");
      wrap.className = "tap-section";

      wrap.append(
        this._select("Action", action, [
          { value: "more-info",    label: "More Info (default)" },
          { value: "navigate",    label: "Navigate to path" },
          { value: "url",         label: "Open URL" },
          { value: "call-service",label: "Call Service" },
          { value: "none",        label: "No action" },
        ], (v) => { onChange({ ...ta, action: v }); })
      );

      if (action === "navigate") {
        wrap.append(this._text("Navigation Path", ta.navigation_path || "", (v) => onChange({ ...ta, navigation_path: v }), "/lovelace/0"));
      }
      if (action === "url") {
        wrap.append(this._text("URL", ta.url_path || "", (v) => onChange({ ...ta, url_path: v }), "https://example.com"));
      }
      if (action === "call-service") {
        wrap.append(
          this._text("Service", ta.service || "", (v) => onChange({ ...ta, service: v }), "notify.pushover"),
          this._textarea("Service Data (JSON)", ta.service_data ? JSON.stringify(ta.service_data, null, 2) : "", (v) => {
            try { onChange({ ...ta, service_data: JSON.parse(v) }); } catch (_) {}
          }, '{"message": "Low battery!"}')
        );
      }

      return wrap;
    }

    _chargingEditor(cs, onChange) {
      const cur = cs ? deepClone(cs) : {};

      const wrap = document.createElement("div");
      wrap.className = "charge-section";

      wrap.append(
        this._text(
          "Charging Entity ID",
          cur.entity_id || "",
          (v) => onChange({ ...cur, entity_id: v || undefined }),
          "binary_sensor.device_charging",
          "Alternate entity whose state indicates charging"
        ),
        this._text(
          "Charging States (comma-separated)",
          (cur.state || []).join(", "),
          (v) => onChange({ ...cur, state: v ? v.split(",").map((s) => s.trim()) : undefined }),
          "charging, Charging, on"
        ),
        this._grid2(
          this._text("Charging Icon", cur.icon || "", (v) => onChange({ ...cur, icon: v || undefined }), "mdi:flash"),
          this._text("Icon Color", cur.color || "", (v) => onChange({ ...cur, color: v || undefined }), "yellow or #ffff00")
        ),
        this._text(
          "Secondary Info Text (when charging)",
          cur.secondary_info_text || "",
          (v) => onChange({ ...cur, secondary_info_text: v || undefined }),
          "Charging in progress",
          'Shown when secondary_info: "{charging}" is set'
        )
      );

      /* Attribute checks */
      const attrHead = document.createElement("div");
      attrHead.style.cssText = "font-size:11px;font-weight:600;color:var(--editor-secondary);margin:12px 0 6px;text-transform:uppercase;letter-spacing:.06em;";
      attrHead.textContent = "Charging Attribute Checks";
      wrap.append(attrHead);

      (cur.attribute || []).forEach((attr, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";
        row.append(
          this._inlineCol("Attribute Name", attr.name || "", (v) => {
            const attrs = [...(cur.attribute || [])];
            attrs[i] = { ...attrs[i], name: v };
            onChange({ ...cur, attribute: attrs });
          }, "is_charging"),
          this._inlineCol("Attribute Value", attr.value || "", (v) => {
            const attrs = [...(cur.attribute || [])];
            attrs[i] = { ...attrs[i], value: v };
            onChange({ ...cur, attribute: attrs });
          }, "true or yes"),
          this._delBtn(() => {
            const attrs = [...(cur.attribute || [])];
            attrs.splice(i, 1);
            onChange({ ...cur, attribute: attrs.length ? attrs : undefined });
          })
        );
        wrap.append(row);
      });

      wrap.append(
        this._addBtn("+ Add Attribute Check", () => {
          const attrs = [...(cur.attribute || []), { name: "", value: "" }];
          onChange({ ...cur, attribute: attrs });
        })
      );

      if (cs) {
        wrap.append(
          this._addBtn("↩ Clear Charging Config", () => onChange(undefined), true)
        );
      }

      return wrap;
    }

    _stateMapEditor(stateMap, onChange) {
      const wrap = document.createElement("div");

      if (stateMap.length === 0) {
        wrap.append(this._empty("No state mappings. Add one to map non-numeric states."));
      }

      stateMap.forEach((rule, i) => {
        const row = document.createElement("div");
        row.className = "inline-row";
        row.append(
          this._inlineCol("Entity State (from)", rule.from !== undefined ? rule.from : "", (v) => {
            const sm = [...stateMap]; sm[i] = { ...sm[i], from: v }; onChange(sm);
          }, "on"),
          this._inlineCol("Battery % (to)", rule.to !== undefined ? rule.to : "", (v) => {
            const sm = [...stateMap]; sm[i] = { ...sm[i], to: v ? parseFloat(v) : undefined }; onChange(sm);
          }, "100"),
          this._inlineCol("Display Text", rule.display || "", (v) => {
            const sm = [...stateMap]; sm[i] = { ...sm[i], display: v || undefined }; onChange(sm);
          }, "Full"),
          this._delBtn(() => {
            const sm = [...stateMap]; sm.splice(i, 1); onChange(sm.length ? sm : undefined);
          })
        );
        wrap.append(row);
      });

      wrap.append(
        this._addBtn("+ Add State Mapping", () => onChange([...stateMap, { from: "on", to: 100 }]))
      );

      return wrap;
    }

    /* ═══════════════════════════════════════════════════════════════════════
     *  DOM HELPERS
     * ═══════════════════════════════════════════════════════════════════════ */

    _section(title) {
      const el = document.createElement("div");
      el.className = "section";
      const t = document.createElement("div");
      t.className = "section-title";
      t.textContent = title;
      el.append(t);
      return el;
    }

    _info(html) {
      const el = document.createElement("div");
      el.className = "info-block";
      el.innerHTML = html;
      return el;
    }

    _empty(msg) {
      const el = document.createElement("div");
      el.className = "empty";
      el.textContent = msg;
      return el;
    }

    _field(label, input, hint) {
      const wrap = document.createElement("div");
      wrap.className = "field";
      if (label) {
        const lbl = document.createElement("label");
        lbl.textContent = label;
        wrap.append(lbl);
      }
      wrap.append(input);
      if (hint) {
        const h = document.createElement("span");
        h.className = "hint";
        h.textContent = hint;
        wrap.append(h);
      }
      return wrap;
    }

    _text(label, value, onChange, placeholder, hint) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.onchange = (e) => onChange(e.target.value);
      return this._field(label, input, hint);
    }

    _num(label, value, onChange, placeholder, hint) {
      const input = document.createElement("input");
      input.type = "number";
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.step = "any";
      input.onchange = (e) => onChange(e.target.value);
      return this._field(label, input, hint);
    }

    _textarea(label, value, onChange, placeholder) {
      const ta = document.createElement("textarea");
      ta.value = value;
      if (placeholder) ta.placeholder = placeholder;
      ta.onchange = (e) => onChange(e.target.value);
      return this._field(label, ta);
    }

    _select(label, value, options, onChange) {
      const sel = document.createElement("select");
      options.forEach(({ value: v, label: l }) => {
        const opt = document.createElement("option");
        opt.value = v; opt.textContent = l;
        opt.selected = value === v;
        sel.append(opt);
      });
      sel.onchange = (e) => onChange(e.target.value);
      return this._field(label, sel);
    }

    _toggle(label, checked, onChange, hint) {
      const wrap = document.createElement("div");
      wrap.className = "field toggle-row";

      const labelWrap = document.createElement("div");
      const labelEl = document.createElement("div");
      labelEl.className = "toggle-label";
      labelEl.textContent = label;
      labelWrap.append(labelEl);
      if (hint) {
        const h = document.createElement("div");
        h.className = "toggle-hint";
        h.textContent = hint;
        labelWrap.append(h);
      }

      const sw = document.createElement("label");
      sw.className = "switch";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = checked;
      input.onchange = (e) => onChange(e.target.checked);
      const slider = document.createElement("span");
      slider.className = "slider";
      sw.append(input, slider);

      wrap.append(labelWrap, sw);
      return wrap;
    }

    _grid2(...children) {
      const grid = document.createElement("div");
      grid.className = "grid-2";
      children.forEach((c) => grid.append(c));
      return grid;
    }

    _inlineCol(label, value, onChange, placeholder) {
      const col = document.createElement("div");
      col.className = "inline-col";
      const lbl = document.createElement("label");
      lbl.textContent = label;
      const input = document.createElement("input");
      input.type = "text";
      input.value = value;
      if (placeholder) input.placeholder = placeholder;
      input.onchange = (e) => onChange(e.target.value);
      col.append(lbl, input);
      return col;
    }

    _addBtn(text, onClick, secondary = false) {
      const btn = document.createElement("button");
      btn.className = "btn-add" + (secondary ? " secondary" : "");
      btn.textContent = text;
      btn.onclick = onClick;
      return btn;
    }

    _delBtn(onClick) {
      const btn = document.createElement("button");
      btn.className = "btn-icon";
      btn.title = "Remove";
      btn.textContent = "✕";
      btn.onclick = onClick;
      return btn;
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   *  REGISTER EDITOR ELEMENT
   * ═══════════════════════════════════════════════════════════════════════════ */

  if (!customElements.get("battery-state-card-editor")) {
    customElements.define("battery-state-card-editor", BatteryStateCardEditor);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   *  PATCH CARD CLASSES
   *  We wait for the card elements to be defined (in case this script runs
   *  before battery-state-card.js finishes executing), then attach
   *  getConfigElement() and getStubConfig() to enable the HA visual editor.
   * ═══════════════════════════════════════════════════════════════════════════ */

  const STUB_CONFIG = {
    type: "custom:battery-state-card",
    secondary_info: "{last_changed}",
    filter: {
      include: [{ name: "attributes.device_class", value: "battery" }],
      exclude: [{ name: "entity_id", value: "binary_sensor.*", operator: "matches" }],
    },
    sort: { by: "state" },
    collapse: 8,
    bulk_rename: {
      rules: [{ from: " Battery" }, { from: " level" }],
      capitalize_first: true,
    },
    colors: {
      steps: ["#ff0000", "#ffff00", "#00ff00"],
      gradient: true,
    },
  };

  function patchCard(tagName) {
    const CardClass = customElements.get(tagName);
    if (!CardClass) {
      customElements.whenDefined(tagName).then(() => patchCard(tagName));
      return;
    }
    if (CardClass.getConfigElement) return; // already patched

    CardClass.getConfigElement = () =>
      document.createElement("battery-state-card-editor");

    CardClass.getStubConfig = () => ({ ...STUB_CONFIG, type: `custom:${tagName}` });

    console.info(
      `%c battery-state-card-editor %c patched ${tagName} ✓ `,
      "background:#1d4ed8;color:#fff;font-weight:bold;padding:2px 8px;border-radius:4px 0 0 4px",
      "background:#3b82f6;color:#fff;padding:2px 8px;border-radius:0 4px 4px 0"
    );
  }

  ["battery-state-card", "battery-state-entity"].forEach(patchCard);

  /* ── Register in window.customCards for HA card picker ─────────────────── */
  window.customCards = window.customCards || [];
  const alreadyRegistered = window.customCards.some(
    (c) => c.type === "battery-state-card"
  );
  if (!alreadyRegistered) {
    window.customCards.push({
      type: "battery-state-card",
      name: "Battery State Card",
      description:
        "Displays battery levels of all connected devices — with full Visual Editor support.",
      preview: true,
    });
  }

  console.info(
    `%c battery-state-card-editor %c v${VERSION} loaded `,
    "background:#1d4ed8;color:#fff;font-weight:bold;padding:2px 8px;border-radius:4px 0 0 4px",
    "background:#22c55e;color:#fff;padding:2px 8px;border-radius:0 4px 4px 0"
  );
})();
