const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/BrowserApp-uZy_x_qF.js","assets/index-Crl7_fXp.js","assets/index-D64VDMd1.css","assets/MP3Player-DP_hstfJ.js","assets/styled-components.browser.esm-DDDPyreY.js","assets/Terminal-DCq9E9_r.js","assets/FileSystemContext-DSt1coq9.js","assets/Terminal-B5FTExBo.css","assets/YahooChat-4XewRaz4.js","assets/YahooChat-D1VBp_hU.css","assets/PDFViewer-BpLDv47O.js","assets/vscodeEditor-XS9smucZ.js","assets/DitherImageViewer-hO3RT3JR.js","assets/OpenAppStore-BEeq5dlO.js","assets/GameBoyAdvance-D0Id2c6L.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,o as n,r,s as i,t as a,u as o}from"./index-Crl7_fXp.js";import{i as s,n as c,t as l}from"./styled-components.browser.esm-DDDPyreY.js";import{t as u}from"./FileSystemContext-DSt1coq9.js";var d=o(n(),1),f=a(),p=l`
  0% { transform: translate(var(--x-start), var(--y-start)); }
  100% { transform: translate(var(--x-end), var(--y-end)); }
`,m=s.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`,h=s.div`
  position: absolute;
  background-color: #00aaff;
  border-radius: 50%;
  animation: ${p} linear infinite;
  opacity: 0;
  animation-duration: var(--duration);
  animation-delay: var(--delay);
  width: var(--size);
  height: var(--size);
  top: 0; /* Changed from var(--top) to be relative to the container */
  left: 0; /* Changed from var(--left) to be relative to the container */

  @keyframes move {
    0% {
      transform: translate(var(--x-start), var(--y-start)) scale(1);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--x-end), var(--y-end)) scale(0);
      opacity: 0;
    }
  }
`,g=e=>{let t=[];for(let n=0;n<e;n++){let e=Math.random()*20+10,r=Math.random()*-e,i=Math.random()*3+2,a=`${Math.random()*100}vw`,o=`${Math.random()*100}vh`,s=`${Math.random()*100}vw`,c=`${Math.random()*100}vh`,l={"--duration":`${e}s`,"--delay":`${r}s`,"--size":`${i}px`,"--x-start":a,"--y-start":o,"--x-end":s,"--y-end":c};t.push((0,f.jsx)(h,{style:l},n))}return t},_=()=>(0,f.jsx)(m,{children:g(20)}),v=c`
  @font-face {
    font-family: 'Cubic_11';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-display: swap;
  }
  body {
    font-family: 'Cubic_11', 'Tahoma', 'Arial', sans-serif;
    background: #222;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  .title-bar.xp {
    background: #111 !important;
    color: #fff;
    border-bottom: 1px solid #222;
  }
`,y=s.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`,b=s.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 4;
  background: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 70%, rgba(0,0,0,0.18) 100%);
`,x=s.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow:
    0 0 60px 10px #000,
    0 0 0 5px #333 inset,
    0 0 80px 0 #222 inset;
  overflow: hidden;
  position: relative;
  background: #000;
`,S=s.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 2;
  /* 斜斜的高光條紋 */
  background:
    linear-gradient(120deg, rgba(255,255,255,0.18) 10%, rgba(255,255,255,0.04) 60%, transparent 80%),
    radial-gradient(ellipse 120% 60% at 50% 0%, rgba(255,255,255,0.13) 0%, transparent 80%);
`,C=s.div`
  position: absolute;
  left: 0; top: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 3;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,0,0,0.08) 0px,
    rgba(0,0,0,0.08) 1px,
    transparent 2px,
    transparent 4px
  );
`,w=c`
  body {
    background: linear-gradient(180deg, #181c22 0%, #23272e 100%);
    min-height: 100vh;
    min-width: 100vw;
    position: relative;
    overflow-x: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    /* Scanline */
    background: repeating-linear-gradient(
      to bottom,
      rgba(255,255,255,0.04) 0px,
      rgba(255,255,255,0.04) 1px,
      transparent 1.5px,
      transparent 4px
    );
    opacity: 0.5;
  }
  body::after {
    content: '';
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 0;
    /* CRT noise */
    background: url('data:image/svg+xml;utf8,<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg"><filter id="n" x="0" y="0"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"/></filter><rect width="120" height="120" filter="url(%23n)" opacity="0.18"/></svg>');
    opacity: 0.25;
    mix-blend-mode: screen;
  }
`,T=s.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 8px 0 0 16px;
  z-index: 2;
  pointer-events: none;

  & > * {
    pointer-events: auto;
    margin: 0 24px 8px 0;
    width: 80px;
  }
`,E=(0,d.createContext)(()=>{}),D=`/assets/sound-effects/click/base-click.mov`;function O({children:e}){let t=(0,d.useRef)(null),n=(0,d.useRef)(!1),r=()=>{if(!n.current&&t.current){t.current.muted=!0;let e=t.current.play();e!==void 0&&e.then(()=>{t.current.pause(),t.current.currentTime=0,t.current.muted=!1,n.current=!0}).catch(()=>{})}};return(0,f.jsxs)(E.Provider,{value:()=>{try{if(t.current){n.current||r(),t.current.currentTime=0;let e=t.current.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}}catch(e){console.warn(`Sound Play Sync Error (handled):`,e.message)}},children:[(0,f.jsx)(`audio`,{ref:t,src:D,preload:`auto`,onError:e=>console.warn(`Audio load error (handled):`,e)}),e]})}function k(){return(0,d.useContext)(E)}var A=(0,d.createContext)(()=>{}),ee={cancel:`/assets/sound-effects/cancel.1.mp3`};function j({children:e}){let t=(0,d.useRef)({}),n=(0,d.useRef)({}),r=e=>{t.current[e]||(t.current[e]=new Audio(ee[e]),t.current[e].preload=`auto`,n.current[e]=!1)},i=e=>{try{r(e);let i=t.current[e];if(i)if(n.current[e]){i.currentTime=0;let e=i.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}else{i.muted=!0;let t=i.play();t!==void 0&&t.then(()=>{i.pause(),i.currentTime=0,i.muted=!1,n.current[e]=!0,i.currentTime=0;let t=i.play();t!==void 0&&t.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})}).catch(()=>{i.muted=!1,i.currentTime=0;let e=i.play();e!==void 0&&e.catch(e=>{console.warn(`Sound Play Error (handled):`,e.message)})})}}catch(e){console.warn(`Sound Play Sync Error (handled):`,e.message)}};return(0,f.jsx)(A.Provider,{value:{playCancel:()=>i(`cancel`)},children:e})}function te(){return(0,d.useContext)(A)}var M=s.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 5px;
  width: 80px;
  cursor: pointer;
  user-select: none;
  border: none;
  background: transparent;
  filter: ${e=>e.disabled?`grayscale(100%)`:`none`};
  opacity: ${e=>e.disabled?.6:1};
  pointer-events: ${e=>e.disabled?`none`:`auto`};
  border-radius: 4px;
  background-color: ${e=>e.selected?`rgba(255, 255, 255, 0.1)`:`transparent`};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`,ne=s.img`
  width: 48px;
  height: 48px;
`,re=s.span`
  color: white;
  text-shadow: 1px 1px 2px black;
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
  word-break: break-word;
  min-width: 0;
`;function ie({icon:e,label:t,onDoubleClick:n,disabled:r=!1}){let[i,a]=(0,d.useState)(!1),o=k(),s=()=>{!r&&n&&n()},c=()=>{if(!r){a(!0);try{o()}catch(e){console.warn(`Click sound error (handled):`,e.message)}typeof window<`u`&&window.innerWidth<=768&&n&&n()}};return(0,f.jsxs)(M,{onDoubleClick:s,onClick:c,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&!r&&(e.preventDefault(),c(),s())},onBlur:()=>{a(!1)},disabled:r,selected:i,"aria-label":t,children:[(0,f.jsx)(ne,{src:e,alt:``,width:`48`,height:`48`,"aria-hidden":`true`}),(0,f.jsx)(re,{children:t})]})}var ae=i(((e,t)=>{t.exports=`SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED`})),oe=i(((e,t)=>{var n=ae();function r(){}function i(){}i.resetWarningCache=r,t.exports=function(){function e(e,t,r,i,a,o){if(o!==n){var s=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name=`Invariant Violation`,s}}e.isRequired=e;function t(){return e}var a={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:r};return a.PropTypes=a,a}})),se=i(((e,t)=>{t.exports=oe()()})),N=o(e(),1),P=o(se(),1);function ce(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`)if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=ce(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n);return r}function le(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=ce(e))&&(r&&(r+=` `),r+=t);return r}function F(e,t){for(let n=0,r=e.length;n<r;n++)if(t.apply(t,[e[n],n,e]))return e[n]}function ue(e){return typeof e==`function`||Object.prototype.toString.call(e)===`[object Function]`}function I(e){return typeof e==`number`&&!isNaN(e)}function L(e){return parseInt(e,10)}function R(e,t,n){if(e[t])return Error(`Invalid prop ${t} passed to ${n} - do not set this, set it on the child.`)}var de=[`Moz`,`Webkit`,`O`,`ms`];function fe(e=`transform`){if(typeof window>`u`)return``;let t=window.document?.documentElement?.style;if(!t||e in t)return``;for(let n=0;n<de.length;n++)if(pe(e,de[n])in t)return de[n];return``}function pe(e,t){return t?`${t}${me(e)}`:e}function me(e){let t=``,n=!0;for(let r=0;r<e.length;r++)n?(t+=e[r].toUpperCase(),n=!1):e[r]===`-`?n=!0:t+=e[r];return t}var he=fe(),ge=``;function _e(e,t){ge||=F([`matches`,`webkitMatchesSelector`,`mozMatchesSelector`,`msMatchesSelector`,`oMatchesSelector`],function(t){return ue(e[t])})??``;let n=e[ge];return ue(n)?!!n.call(e,t):!1}function ve(e,t,n){let r=e;do{if(_e(r,t))return!0;if(r===n)return!1;r=r.parentNode}while(r);return!1}function ye(e,t,n,r){if(!e)return;let i={capture:!0,...r},a=n;e.addEventListener?e.addEventListener(t,a,i):e.attachEvent?e.attachEvent(`on`+t,a):e[`on`+t]=a}function z(e,t,n,r){if(!e)return;let i={capture:!0,...r},a=n;e.removeEventListener?e.removeEventListener(t,a,i):e.detachEvent?e.detachEvent(`on`+t,a):e[`on`+t]=null}function be(e){let t=e.clientHeight,n=e.ownerDocument.defaultView.getComputedStyle(e);return t+=L(n.borderTopWidth),t+=L(n.borderBottomWidth),t}function xe(e){let t=e.clientWidth,n=e.ownerDocument.defaultView.getComputedStyle(e);return t+=L(n.borderLeftWidth),t+=L(n.borderRightWidth),t}function Se(e){let t=e.clientHeight,n=e.ownerDocument.defaultView.getComputedStyle(e);return t-=L(n.paddingTop),t-=L(n.paddingBottom),t}function Ce(e){let t=e.clientWidth,n=e.ownerDocument.defaultView.getComputedStyle(e);return t-=L(n.paddingLeft),t-=L(n.paddingRight),t}function we(e,t,n){let r=t===t.ownerDocument.body?{left:0,top:0}:t.getBoundingClientRect();return{x:(e.clientX+t.scrollLeft-r.left)/n,y:(e.clientY+t.scrollTop-r.top)/n}}function Te(e,t){let n=De(e,t,`px`);return{[pe(`transform`,he)]:n}}function Ee(e,t){return De(e,t,``)}function De({x:e,y:t},n,r){let i=`translate(${e}${r},${t}${r})`;return n&&(i=`translate(${`${typeof n.x==`string`?n.x:n.x+r}`}, ${`${typeof n.y==`string`?n.y:n.y+r}`})`+i),i}function Oe(e,t){return e.targetTouches&&F(e.targetTouches,e=>t===e.identifier)||e.changedTouches&&F(e.changedTouches,e=>t===e.identifier)}function ke(e){if(e.targetTouches&&e.targetTouches[0])return e.targetTouches[0].identifier;if(e.changedTouches&&e.changedTouches[0])return e.changedTouches[0].identifier}function Ae(){return typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}function je(e,t){if(!e)return;let n=e.getElementById(`react-draggable-style-el`);if(!n){n=e.createElement(`style`),n.type=`text/css`,n.id=`react-draggable-style-el`;let r=t??Ae();r&&n.setAttribute(`nonce`,r),n.innerHTML=`.react-draggable-transparent-selection *::-moz-selection {all: inherit;}
`,n.innerHTML+=`.react-draggable-transparent-selection *::selection {all: inherit;}
`,e.getElementsByTagName(`head`)[0].appendChild(n)}e.body&&Pe(e.body,`react-draggable-transparent-selection`)}function Me(e){window.requestAnimationFrame?window.requestAnimationFrame(()=>{Ne(e)}):Ne(e)}function Ne(e){if(e)try{e.body&&Fe(e.body,`react-draggable-transparent-selection`);let t=e.selection;if(t)t.empty();else{let t=(e.defaultView||window).getSelection();t&&t.type!==`Caret`&&t.removeAllRanges()}}catch{}}function Pe(e,t){e.classList?e.classList.add(t):e.className.match(RegExp(`(?:^|\\s)${t}(?!\\S)`))||(e.className+=` ${t}`)}function Fe(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(RegExp(`(?:^|\\s)${t}(?!\\S)`,`g`),``)}function Ie(e,t,n){if(!e.props.bounds)return[t,n];let{bounds:r}=e.props;r=typeof r==`string`?r:Ue(r);let i=B(e);if(typeof r==`string`){let{ownerDocument:e}=i,t=e.defaultView;if(!t)throw Error(`Cannot resolve the owner window of the draggable node.`);let n;if(n=r===`parent`?i.parentNode:i.getRootNode().querySelector(r),!(n instanceof t.HTMLElement))throw Error(`Bounds selector "`+r+`" could not find an element.`);let a=n,o=t.getComputedStyle(i),s=t.getComputedStyle(a);r={left:-i.offsetLeft+L(s.paddingLeft)+L(o.marginLeft),top:-i.offsetTop+L(s.paddingTop)+L(o.marginTop),right:Ce(a)-xe(i)-i.offsetLeft+L(s.paddingRight)-L(o.marginRight),bottom:Se(a)-be(i)-i.offsetTop+L(s.paddingBottom)-L(o.marginBottom)}}return I(r.right)&&(t=Math.min(t,r.right)),I(r.bottom)&&(n=Math.min(n,r.bottom)),I(r.left)&&(t=Math.max(t,r.left)),I(r.top)&&(n=Math.max(n,r.top)),[t,n]}function Le(e,t,n){return[Math.round(t/e[0])*e[0],Math.round(n/e[1])*e[1]]}function Re(e){return e.props.axis===`both`||e.props.axis===`x`}function ze(e){return e.props.axis===`both`||e.props.axis===`y`}function Be(e,t,n){let r=typeof t==`number`?Oe(e,t):null;if(typeof t==`number`&&!r)return null;let i=B(n),a=n.props.offsetParent||i.offsetParent||i.ownerDocument.body;return we(r||e,a,n.props.scale)}function Ve(e,t,n){let r=!I(e.lastX),i=B(e);return r?{node:i,deltaX:0,deltaY:0,lastX:t,lastY:n,x:t,y:n}:{node:i,deltaX:t-e.lastX,deltaY:n-e.lastY,lastX:e.lastX,lastY:e.lastY,x:t,y:n}}function He(e,t){let n=e.props.scale;return{node:t.node,x:e.state.x+t.deltaX/n,y:e.state.y+t.deltaY/n,deltaX:t.deltaX/n,deltaY:t.deltaY/n,lastX:e.state.x,lastY:e.state.y}}function Ue(e){return{left:e.left,top:e.top,right:e.right,bottom:e.bottom}}function B(e){let t=e.findDOMNode();if(!t)throw Error(`<DraggableCore>: Unmounted during event!`);return t}function V(...e){({}).DRAGGABLE_DEBUG&&console.log(...e)}var H={touch:{start:`touchstart`,move:`touchmove`,stop:`touchend`},mouse:{start:`mousedown`,move:`mousemove`,stop:`mouseup`}},U=H.mouse,W=class extends d.Component{constructor(){super(...arguments),this.dragging=!1,this.lastX=NaN,this.lastY=NaN,this.touchIdentifier=null,this.mounted=!1,this.handleDragStart=e=>{if(this.props.onMouseDown(e),!this.props.allowAnyClick&&(typeof e.button==`number`&&e.button!==0||e.ctrlKey))return!1;let t=this.findDOMNode();if(!t||!t.ownerDocument||!t.ownerDocument.body)throw Error(`<DraggableCore> not mounted on DragStart!`);let{ownerDocument:n}=t;if(this.props.disabled||!(e.target instanceof n.defaultView.Node)||this.props.handle&&!ve(e.target,this.props.handle,t)||this.props.cancel&&ve(e.target,this.props.cancel,t))return;e.type===`touchstart`&&!this.props.allowMobileScroll&&e.preventDefault();let r=ke(e);this.touchIdentifier=r;let i=Be(e,r,this);if(i==null)return;let{x:a,y:o}=i,s=Ve(this,a,o);V(`DraggableCore: handleDragStart: %j`,s),V(`calling`,this.props.onStart),!(this.props.onStart(e,s)===!1||this.mounted===!1)&&(this.props.enableUserSelectHack&&je(n,this.props.nonce),this.dragging=!0,this.lastX=a,this.lastY=o,ye(n,U.move,this.handleDrag),ye(n,U.stop,this.handleDragStop))},this.handleDrag=e=>{let t=Be(e,this.touchIdentifier,this);if(t==null)return;let{x:n,y:r}=t;if(Array.isArray(this.props.grid)){let e=n-this.lastX,t=r-this.lastY;if([e,t]=Le(this.props.grid,e,t),!e&&!t)return;n=this.lastX+e,r=this.lastY+t}let i=Ve(this,n,r);if(V(`DraggableCore: handleDrag: %j`,i),this.props.onDrag(e,i)===!1||this.mounted===!1){try{this.handleDragStop(new MouseEvent(`mouseup`))}catch{let e=document.createEvent(`MouseEvents`);e.initMouseEvent(`mouseup`,!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),this.handleDragStop(e)}return}this.lastX=n,this.lastY=r},this.handleDragStop=e=>{if(!this.dragging)return;let t=Be(e,this.touchIdentifier,this);if(t==null)return;let{x:n,y:r}=t;if(Array.isArray(this.props.grid)){let e=n-this.lastX||0,t=r-this.lastY||0;[e,t]=Le(this.props.grid,e,t),n=this.lastX+e,r=this.lastY+t}let i=Ve(this,n,r);if(this.props.onStop(e,i)===!1||this.mounted===!1)return!1;let a=this.findDOMNode();a&&this.props.enableUserSelectHack&&Me(a.ownerDocument),V(`DraggableCore: handleDragStop: %j`,i),this.dragging=!1,this.lastX=NaN,this.lastY=NaN,a&&(V(`DraggableCore: Removing handlers`),z(a.ownerDocument,U.move,this.handleDrag),z(a.ownerDocument,U.stop,this.handleDragStop))},this.onMouseDown=e=>(U=H.mouse,this.handleDragStart(e)),this.onMouseUp=e=>(U=H.mouse,this.handleDragStop(e)),this.onTouchStart=e=>(U=H.touch,this.handleDragStart(e)),this.onTouchEnd=e=>(U=H.touch,this.handleDragStop(e))}componentDidMount(){this.mounted=!0;let e=this.findDOMNode();e&&ye(e,H.touch.start,this.onTouchStart,{passive:!1})}componentWillUnmount(){this.mounted=!1;let e=this.findDOMNode();if(e){let{ownerDocument:t}=e;z(t,H.mouse.move,this.handleDrag),z(t,H.touch.move,this.handleDrag),z(t,H.mouse.stop,this.handleDragStop),z(t,H.touch.stop,this.handleDragStop),z(e,H.touch.start,this.onTouchStart,{passive:!1}),this.props.enableUserSelectHack&&Me(t)}}findDOMNode(){if(this.props?.nodeRef)return this.props.nodeRef.current;let e=N.default;return typeof e.findDOMNode==`function`?e.findDOMNode(this):(V(`react-draggable: ReactDOM.findDOMNode is not available in React 19+. You must provide a nodeRef prop. See: https://github.com/react-grid-layout/react-draggable#noderef`),null)}render(){return d.cloneElement(d.Children.only(this.props.children),{onMouseDown:this.onMouseDown,onMouseUp:this.onMouseUp,onTouchEnd:this.onTouchEnd})}};W.displayName=`DraggableCore`,W.propTypes={allowAnyClick:P.default.bool,allowMobileScroll:P.default.bool,children:P.default.node.isRequired,disabled:P.default.bool,enableUserSelectHack:P.default.bool,offsetParent:function(e,t){if(e[t]&&e[t].nodeType!==1)throw Error(`Draggable's offsetParent must be a DOM Node.`)},grid:P.default.arrayOf(P.default.number),handle:P.default.string,cancel:P.default.string,nodeRef:P.default.object,nonce:P.default.string,onStart:P.default.func,onDrag:P.default.func,onStop:P.default.func,onMouseDown:P.default.func,scale:P.default.number,className:R,style:R,transform:R},W.defaultProps={allowAnyClick:!1,allowMobileScroll:!1,disabled:!1,enableUserSelectHack:!0,onStart:function(){},onDrag:function(){},onStop:function(){},onMouseDown:function(){},scale:1};var G=class extends d.Component{constructor(e){super(e),this.onDragStart=(e,t)=>{if(V(`Draggable: onDragStart: %j`,t),this.props.onStart(e,He(this,t))===!1)return!1;this.setState({dragging:!0,dragged:!0})},this.onDrag=(e,t)=>{if(!this.state.dragging)return!1;V(`Draggable: onDrag: %j`,t);let n=He(this,t),r={x:n.x,y:n.y,slackX:0,slackY:0};if(this.props.bounds){let{x:e,y:t}=r;r.x+=this.state.slackX,r.y+=this.state.slackY;let[i,a]=Ie(this,r.x,r.y);r.x=i,r.y=a,r.slackX=this.state.slackX+(e-r.x),r.slackY=this.state.slackY+(t-r.y),n.x=r.x,n.y=r.y,n.deltaX=r.x-this.state.x,n.deltaY=r.y-this.state.y}if(this.props.onDrag(e,n)===!1)return!1;this.setState(r)},this.onDragStop=(e,t)=>{if(!this.state.dragging||this.props.onStop(e,He(this,t))===!1)return!1;V(`Draggable: onDragStop: %j`,t);let n={dragging:!1,slackX:0,slackY:0};if(this.props.position){let{x:e,y:t}=this.props.position;n.x=e,n.y=t}this.setState(n)},this.state={dragging:!1,dragged:!1,x:e.position?e.position.x:e.defaultPosition.x,y:e.position?e.position.y:e.defaultPosition.y,prevPropsPosition:{...e.position},slackX:0,slackY:0,isElementSVG:!1},e.position&&!(e.onDrag||e.onStop)&&console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.")}static getDerivedStateFromProps({position:e},{prevPropsPosition:t}){return e&&(!t||e.x!==t.x||e.y!==t.y)?(V(`Draggable: getDerivedStateFromProps %j`,{position:e,prevPropsPosition:t}),{x:e.x,y:e.y,prevPropsPosition:{...e}}):null}componentDidMount(){window.SVGElement!==void 0&&this.findDOMNode()instanceof window.SVGElement&&this.setState({isElementSVG:!0})}componentWillUnmount(){this.state.dragging&&this.setState({dragging:!1})}findDOMNode(){if(this.props?.nodeRef)return this.props.nodeRef.current;let e=N.default;return typeof e.findDOMNode==`function`?e.findDOMNode(this):null}render(){let{axis:e,bounds:t,children:n,defaultPosition:r,defaultClassName:i,defaultClassNameDragging:a,defaultClassNameDragged:o,position:s,positionOffset:c,scale:l,...u}=this.props,f={},p=null,m=!s||this.state.dragging,h=s||r,g={x:Re(this)&&m?this.state.x:h.x,y:ze(this)&&m?this.state.y:h.y};this.state.isElementSVG?p=Ee(g,c):f=Te(g,c);let _=d.Children.only(n),v=le(_.props.className||``,i,{[a]:this.state.dragging,[o]:this.state.dragged});return d.createElement(W,{...u,onStart:this.onDragStart,onDrag:this.onDrag,onStop:this.onDragStop},d.cloneElement(_,{className:v,style:{..._.props.style,...f},transform:p}))}};G.displayName=`Draggable`,G.propTypes={...W.propTypes,axis:P.default.oneOf([`both`,`x`,`y`,`none`]),bounds:P.default.oneOfType([P.default.shape({left:P.default.number,right:P.default.number,top:P.default.number,bottom:P.default.number}),P.default.string,P.default.oneOf([!1])]),defaultClassName:P.default.string,defaultClassNameDragging:P.default.string,defaultClassNameDragged:P.default.string,defaultPosition:P.default.shape({x:P.default.number,y:P.default.number}),positionOffset:P.default.shape({x:P.default.oneOfType([P.default.number,P.default.string]),y:P.default.oneOfType([P.default.number,P.default.string])}),position:P.default.shape({x:P.default.number,y:P.default.number}),className:R,style:R,transform:R},G.defaultProps={...W.defaultProps,axis:`both`,bounds:!1,defaultClassName:`react-draggable`,defaultClassNameDragging:`react-draggable-dragging`,defaultClassNameDragged:`react-draggable-dragged`,defaultPosition:{x:0,y:0},scale:1};var We=G,K=function(){return K=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},K.apply(this,arguments)},Ge={width:`100%`,height:`10px`,top:`0px`,left:`0px`,cursor:`row-resize`},Ke={width:`10px`,height:`100%`,top:`0px`,left:`0px`,cursor:`col-resize`},q={width:`20px`,height:`20px`,position:`absolute`,zIndex:1},qe={top:K(K({},Ge),{top:`-5px`}),right:K(K({},Ke),{left:void 0,right:`-5px`}),bottom:K(K({},Ge),{top:void 0,bottom:`-5px`}),left:K(K({},Ke),{left:`-5px`}),topRight:K(K({},q),{right:`-10px`,top:`-10px`,cursor:`ne-resize`}),bottomRight:K(K({},q),{right:`-10px`,bottom:`-10px`,cursor:`se-resize`}),bottomLeft:K(K({},q),{left:`-10px`,bottom:`-10px`,cursor:`sw-resize`}),topLeft:K(K({},q),{left:`-10px`,top:`-10px`,cursor:`nw-resize`})},Je=(0,d.memo)(function(e){var t=e.onResizeStart,n=e.direction,r=e.children,i=e.replaceStyles,a=e.className,o=(0,d.useCallback)(function(e){t(e,n)},[t,n]),s=(0,d.useCallback)(function(e){t(e,n)},[t,n]),c=(0,d.useMemo)(function(){return K(K({position:`absolute`,userSelect:`none`},qe[n]),i??{})},[i,n]);return(0,f.jsx)(`div`,{className:a||void 0,style:c,onMouseDown:o,onTouchStart:s,children:r})}),Ye=(function(){var e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)};return function(t,n){if(typeof n!=`function`&&n!==null)throw TypeError(`Class extends value `+String(n)+` is not a constructor or null`);e(t,n);function r(){this.constructor=t}t.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}})(),J=function(){return J=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},J.apply(this,arguments)},Xe={width:`auto`,height:`auto`},Y=function(e,t,n){return Math.max(Math.min(e,n),t)},Ze=function(e,t,n){var r=Math.round(e/t);return r*t+n*(r-1)},X=function(e,t){return new RegExp(e,`i`).test(t)},Z=function(e){return!!(e.touches&&e.touches.length)},Qe=function(e){return!!((e.clientX||e.clientX===0)&&(e.clientY||e.clientY===0))},$e=function(e,t,n){n===void 0&&(n=0);var r=t.reduce(function(n,r,i){return Math.abs(r-e)<Math.abs(t[n]-e)?i:n},0),i=Math.abs(t[r]-e);return n===0||i<n?t[r]:e},et=function(e){return e=e.toString(),e===`auto`||e.endsWith(`px`)||e.endsWith(`%`)||e.endsWith(`vh`)||e.endsWith(`vw`)||e.endsWith(`vmax`)||e.endsWith(`vmin`)?e:`${e}px`},Q=function(e,t,n,r){if(e&&typeof e==`string`){if(e.endsWith(`px`))return Number(e.replace(`px`,``));if(e.endsWith(`%`)){var i=Number(e.replace(`%`,``))/100;return t*i}if(e.endsWith(`vw`)){var i=Number(e.replace(`vw`,``))/100;return n*i}if(e.endsWith(`vh`)){var i=Number(e.replace(`vh`,``))/100;return r*i}}return e},tt=function(e,t,n,r,i,a,o){return r=Q(r,e.width,t,n),i=Q(i,e.height,t,n),a=Q(a,e.width,t,n),o=Q(o,e.height,t,n),{maxWidth:r===void 0?void 0:Number(r),maxHeight:i===void 0?void 0:Number(i),minWidth:a===void 0?void 0:Number(a),minHeight:o===void 0?void 0:Number(o)}},nt=function(e){return Array.isArray(e)?e:[e,e]},rt=`as.ref.style.className.grid.gridGap.snap.bounds.boundsByDirection.size.defaultSize.minWidth.minHeight.maxWidth.maxHeight.lockAspectRatio.lockAspectRatioExtraWidth.lockAspectRatioExtraHeight.enable.handleStyles.handleClasses.handleWrapperStyle.handleWrapperClass.children.onResizeStart.onResize.onResizeStop.handleComponent.scale.resizeRatio.snapGap`.split(`.`),it=`__resizable_base__`,at=function(e){Ye(t,e);function t(t){var n=e.call(this,t)||this;return n.ratio=1,n.resizable=null,n.parentLeft=0,n.parentTop=0,n.resizableLeft=0,n.resizableRight=0,n.resizableTop=0,n.resizableBottom=0,n.targetLeft=0,n.targetTop=0,n.delta={width:0,height:0},n.appendBase=function(){if(!n.resizable||!n.window)return null;var e=n.parentNode;if(!e)return null;var t=n.window.document.createElement(`div`);return t.style.width=`100%`,t.style.height=`100%`,t.style.position=`absolute`,t.style.transform=`scale(0, 0)`,t.style.left=`0`,t.style.flex=`0 0 100%`,t.classList?t.classList.add(it):t.className+=it,e.appendChild(t),t},n.removeBase=function(e){var t=n.parentNode;t&&t.removeChild(e)},n.state={isResizing:!1,width:n.propsSize?.width??`auto`,height:n.propsSize?.height??`auto`,direction:`right`,original:{x:0,y:0,width:0,height:0},backgroundStyle:{height:`100%`,width:`100%`,backgroundColor:`rgba(0,0,0,0)`,cursor:`auto`,opacity:0,position:`fixed`,zIndex:9999,top:`0`,left:`0`,bottom:`0`,right:`0`},flexBasis:void 0},n.onResizeStart=n.onResizeStart.bind(n),n.onMouseMove=n.onMouseMove.bind(n),n.onMouseUp=n.onMouseUp.bind(n),n}return Object.defineProperty(t.prototype,"parentNode",{get:function(){return this.resizable?this.resizable.parentNode:null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"window",{get:function(){return!this.resizable||!this.resizable.ownerDocument?null:this.resizable.ownerDocument.defaultView},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"propsSize",{get:function(){return this.props.size||this.props.defaultSize||Xe},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){var e=0,t=0;if(this.resizable&&this.window){var n=this.resizable.offsetWidth,r=this.resizable.offsetHeight,i=this.resizable.style.position;i!==`relative`&&(this.resizable.style.position=`relative`),e=this.resizable.style.width===`auto`?n:this.resizable.offsetWidth,t=this.resizable.style.height===`auto`?r:this.resizable.offsetHeight,this.resizable.style.position=i}return{width:e,height:t}},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"sizeStyle",{get:function(){var e=this,t=this.props.size,n=function(t){if(e.state[t]===void 0||e.state[t]===`auto`)return`auto`;if(e.propsSize&&e.propsSize[t]&&e.propsSize[t]?.toString().endsWith(`%`)){if(e.state[t].toString().endsWith(`%`))return e.state[t].toString();var n=e.getParentSize();return`${Number(e.state[t].toString().replace(`px`,``))/n[t]*100}%`}return et(e.state[t])};return{width:t&&t.width!==void 0&&!this.state.isResizing?et(t.width):n(`width`),height:t&&t.height!==void 0&&!this.state.isResizing?et(t.height):n(`height`)}},enumerable:!1,configurable:!0}),t.prototype.getParentSize=function(){if(!this.parentNode)return this.window?{width:this.window.innerWidth,height:this.window.innerHeight}:{width:0,height:0};var e=this.appendBase();if(!e)return{width:0,height:0};var t=!1,n=this.parentNode.style.flexWrap;n!==`wrap`&&(t=!0,this.parentNode.style.flexWrap=`wrap`),e.style.position=`relative`,e.style.minWidth=`100%`,e.style.minHeight=`100%`;var r={width:e.offsetWidth,height:e.offsetHeight};return t&&(this.parentNode.style.flexWrap=n),this.removeBase(e),r},t.prototype.bindEvents=function(){this.window&&(this.window.addEventListener(`mouseup`,this.onMouseUp),this.window.addEventListener(`mousemove`,this.onMouseMove),this.window.addEventListener(`mouseleave`,this.onMouseUp),this.window.addEventListener(`touchmove`,this.onMouseMove,{capture:!0,passive:!1}),this.window.addEventListener(`touchend`,this.onMouseUp))},t.prototype.unbindEvents=function(){this.window&&(this.window.removeEventListener(`mouseup`,this.onMouseUp),this.window.removeEventListener(`mousemove`,this.onMouseMove),this.window.removeEventListener(`mouseleave`,this.onMouseUp),this.window.removeEventListener(`touchmove`,this.onMouseMove,!0),this.window.removeEventListener(`touchend`,this.onMouseUp))},t.prototype.componentDidMount=function(){if(!(!this.resizable||!this.window)){var e=this.window.getComputedStyle(this.resizable);this.setState({width:this.state.width||this.size.width,height:this.state.height||this.size.height,flexBasis:e.flexBasis===`auto`?void 0:e.flexBasis})}},t.prototype.componentWillUnmount=function(){this.window&&this.unbindEvents()},t.prototype.createSizeForCssProperty=function(e,t){var n=this.propsSize&&this.propsSize[t];return this.state[t]===`auto`&&this.state.original[t]===e&&(n===void 0||n===`auto`)?`auto`:e},t.prototype.calculateNewMaxFromBoundary=function(e,t){var n=this.props.boundsByDirection,r=this.state.direction,i=n&&X(`left`,r),a=n&&X(`top`,r),o,s;if(this.props.bounds===`parent`){var c=this.parentNode;c&&(o=i?this.resizableRight-this.parentLeft:c.offsetWidth+(this.parentLeft-this.resizableLeft),s=a?this.resizableBottom-this.parentTop:c.offsetHeight+(this.parentTop-this.resizableTop))}else this.props.bounds===`window`?this.window&&(o=i?this.resizableRight:this.window.innerWidth-this.resizableLeft,s=a?this.resizableBottom:this.window.innerHeight-this.resizableTop):this.props.bounds&&(o=i?this.resizableRight-this.targetLeft:this.props.bounds.offsetWidth+(this.targetLeft-this.resizableLeft),s=a?this.resizableBottom-this.targetTop:this.props.bounds.offsetHeight+(this.targetTop-this.resizableTop));return o&&Number.isFinite(o)&&(e=e&&e<o?e:o),s&&Number.isFinite(s)&&(t=t&&t<s?t:s),{maxWidth:e,maxHeight:t}},t.prototype.calculateNewSizeFromDirection=function(e,t){var n=this.props.scale||1,r=nt(this.props.resizeRatio||1),i=r[0],a=r[1],o=this.state,s=o.direction,c=o.original,l=this.props,u=l.lockAspectRatio,d=l.lockAspectRatioExtraHeight,f=l.lockAspectRatioExtraWidth,p=c.width,m=c.height,h=d||0,g=f||0;return X(`right`,s)&&(p=c.width+(e-c.x)*i/n,u&&(m=(p-g)/this.ratio+h)),X(`left`,s)&&(p=c.width-(e-c.x)*i/n,u&&(m=(p-g)/this.ratio+h)),X(`bottom`,s)&&(m=c.height+(t-c.y)*a/n,u&&(p=(m-h)*this.ratio+g)),X(`top`,s)&&(m=c.height-(t-c.y)*a/n,u&&(p=(m-h)*this.ratio+g)),{newWidth:p,newHeight:m}},t.prototype.calculateNewSizeFromAspectRatio=function(e,t,n,r){var i=this.props,a=i.lockAspectRatio,o=i.lockAspectRatioExtraHeight,s=i.lockAspectRatioExtraWidth,c=r.width===void 0?10:r.width,l=n.width===void 0||n.width<0?e:n.width,u=r.height===void 0?10:r.height,d=n.height===void 0||n.height<0?t:n.height,f=o||0,p=s||0;if(a){var m=(u-f)*this.ratio+p,h=(d-f)*this.ratio+p,g=(c-p)/this.ratio+f,_=(l-p)/this.ratio+f,v=Math.max(c,m),y=Math.min(l,h),b=Math.max(u,g),x=Math.min(d,_);e=Y(e,v,y),t=Y(t,b,x)}else e=Y(e,c,l),t=Y(t,u,d);return{newWidth:e,newHeight:t}},t.prototype.setBoundingClientRect=function(){var e=1/(this.props.scale||1);if(this.props.bounds===`parent`){var t=this.parentNode;if(t){var n=t.getBoundingClientRect();this.parentLeft=n.left*e,this.parentTop=n.top*e}}if(this.props.bounds&&typeof this.props.bounds!=`string`){var r=this.props.bounds.getBoundingClientRect();this.targetLeft=r.left*e,this.targetTop=r.top*e}if(this.resizable){var i=this.resizable.getBoundingClientRect(),a=i.left,o=i.top,s=i.right,c=i.bottom;this.resizableLeft=a*e,this.resizableRight=s*e,this.resizableTop=o*e,this.resizableBottom=c*e}},t.prototype.onResizeStart=function(e,t){if(!(!this.resizable||!this.window)){var n=0,r=0;if(e.nativeEvent&&Qe(e.nativeEvent)?(n=e.nativeEvent.clientX,r=e.nativeEvent.clientY):e.nativeEvent&&Z(e.nativeEvent)&&(n=e.nativeEvent.touches[0].clientX,r=e.nativeEvent.touches[0].clientY),!(this.props.onResizeStart&&this.resizable&&this.props.onResizeStart(e,t,this.resizable)===!1)){this.props.size&&(this.props.size.height!==void 0&&this.props.size.height!==this.state.height&&this.setState({height:this.props.size.height}),this.props.size.width!==void 0&&this.props.size.width!==this.state.width&&this.setState({width:this.props.size.width})),this.ratio=typeof this.props.lockAspectRatio==`number`?this.props.lockAspectRatio:this.size.width/this.size.height;var i,a=this.window.getComputedStyle(this.resizable);if(a.flexBasis!==`auto`){var o=this.parentNode;if(o){var s=this.window.getComputedStyle(o).flexDirection;this.flexDir=s.startsWith(`row`)?`row`:`column`,i=a.flexBasis}}this.setBoundingClientRect(),this.bindEvents();var c={original:{x:n,y:r,width:this.size.width,height:this.size.height},isResizing:!0,backgroundStyle:J(J({},this.state.backgroundStyle),{cursor:this.window.getComputedStyle(e.target).cursor||`auto`}),direction:t,flexBasis:i};this.setState(c)}}},t.prototype.onMouseMove=function(e){var t=this;if(!(!this.state.isResizing||!this.resizable||!this.window)){if(this.window.TouchEvent&&Z(e))try{e.preventDefault(),e.stopPropagation()}catch{}var n=this.props,r=n.maxWidth,i=n.maxHeight,a=n.minWidth,o=n.minHeight,s=Z(e)?e.touches[0].clientX:e.clientX,c=Z(e)?e.touches[0].clientY:e.clientY,l=this.state,u=l.direction,d=l.original,f=l.width,p=l.height,m=this.getParentSize(),h=tt(m,this.window.innerWidth,this.window.innerHeight,r,i,a,o);r=h.maxWidth,i=h.maxHeight,a=h.minWidth,o=h.minHeight;var g=this.calculateNewSizeFromDirection(s,c),_=g.newHeight,v=g.newWidth,y=this.calculateNewMaxFromBoundary(r,i);this.props.snap&&this.props.snap.x&&(v=$e(v,this.props.snap.x,this.props.snapGap)),this.props.snap&&this.props.snap.y&&(_=$e(_,this.props.snap.y,this.props.snapGap));var b=this.calculateNewSizeFromAspectRatio(v,_,{width:y.maxWidth,height:y.maxHeight},{width:a,height:o});if(v=b.newWidth,_=b.newHeight,this.props.grid){var x=Ze(v,this.props.grid[0],this.props.gridGap?this.props.gridGap[0]:0),S=Ze(_,this.props.grid[1],this.props.gridGap?this.props.gridGap[1]:0),C=this.props.snapGap||0,w=C===0||Math.abs(x-v)<=C?x:v,T=C===0||Math.abs(S-_)<=C?S:_;v=w,_=T}var E={width:v-d.width,height:_-d.height};if(this.delta=E,f&&typeof f==`string`){if(f.endsWith(`%`)){var D=v/m.width*100;v=`${D}%`}else if(f.endsWith(`vw`)){var O=v/this.window.innerWidth*100;v=`${O}vw`}else if(f.endsWith(`vh`)){var k=v/this.window.innerHeight*100;v=`${k}vh`}}if(p&&typeof p==`string`){if(p.endsWith(`%`)){var D=_/m.height*100;_=`${D}%`}else if(p.endsWith(`vw`)){var O=_/this.window.innerWidth*100;_=`${O}vw`}else if(p.endsWith(`vh`)){var k=_/this.window.innerHeight*100;_=`${k}vh`}}var A={width:this.createSizeForCssProperty(v,`width`),height:this.createSizeForCssProperty(_,`height`)};this.flexDir===`row`?A.flexBasis=A.width:this.flexDir===`column`&&(A.flexBasis=A.height);var ee=this.state.width!==A.width,j=this.state.height!==A.height,te=this.state.flexBasis!==A.flexBasis,M=ee||j||te;M&&(0,N.flushSync)(function(){t.setState(A)}),this.props.onResize&&M&&this.props.onResize(e,u,this.resizable,E)}},t.prototype.onMouseUp=function(e){var t=this.state,n=t.isResizing,r=t.direction;t.original,!(!n||!this.resizable)&&(this.props.onResizeStop&&this.props.onResizeStop(e,r,this.resizable,this.delta),this.props.size&&this.setState({width:this.props.size.width??`auto`,height:this.props.size.height??`auto`}),this.unbindEvents(),this.setState({isResizing:!1,backgroundStyle:J(J({},this.state.backgroundStyle),{cursor:`auto`})}))},t.prototype.updateSize=function(e){this.setState({width:e.width??`auto`,height:e.height??`auto`})},t.prototype.renderResizer=function(){var e=this,t=this.props,n=t.enable,r=t.handleStyles,i=t.handleClasses,a=t.handleWrapperStyle,o=t.handleWrapperClass,s=t.handleComponent;return n?(0,f.jsx)(`div`,{className:o,style:a,children:Object.keys(n).map(function(t){return n[t]===!1?null:(0,f.jsx)(Je,{direction:t,onResizeStart:e.onResizeStart,replaceStyles:r&&r[t],className:i&&i[t],children:s&&s[t]?s[t]:null},t)})}):null},t.prototype.render=function(){var e=this,t=Object.keys(this.props).reduce(function(t,n){return rt.indexOf(n)===-1&&(t[n]=e.props[n]),t},{}),n=J(J(J({position:`relative`,userSelect:this.state.isResizing?`none`:`auto`},this.props.style),this.sizeStyle),{maxWidth:this.props.maxWidth,maxHeight:this.props.maxHeight,minWidth:this.props.minWidth,minHeight:this.props.minHeight,boxSizing:`border-box`,flexShrink:0});return this.state.flexBasis&&(n.flexBasis=this.state.flexBasis),(0,f.jsxs)(this.props.as||`div`,J({style:n,className:this.props.className},t,{ref:function(t){t&&(e.resizable=t)},children:[this.state.isResizing&&(0,f.jsx)(`div`,{style:this.state.backgroundStyle}),this.props.children,this.renderResizer()]}))},t.defaultProps={as:`div`,onResizeStart:function(){},onResize:function(){},onResizeStop:function(){},enable:{top:!0,right:!0,bottom:!0,left:!0,topRight:!0,bottomRight:!0,bottomLeft:!0,topLeft:!0},style:{},grid:[1,1],gridGap:[0,0],lockAspectRatio:!1,lockAspectRatioExtraWidth:0,lockAspectRatioExtraHeight:0,scale:1,resizeRatio:1,snapGap:0},t}(d.PureComponent),ot=function(e,t){return ot=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},ot(e,t)};function st(e,t){ot(e,t);function n(){this.constructor=e}e.prototype=t===null?Object.create(t):(n.prototype=t.prototype,new n)}var $=function(){return $=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},$.apply(this,arguments)};function ct(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}var lt={width:`auto`,height:`auto`,display:`inline-block`,position:`absolute`,top:0,left:0},ut=function(e){return{bottom:e,bottomLeft:e,bottomRight:e,left:e,right:e,top:e,topLeft:e,topRight:e}},dt=function(e){st(t,e);function t(t){var n=e.call(this,t)||this;return n.resizingPosition={x:0,y:0},n.offsetFromParent={left:0,top:0},n.resizableElement={current:null},n.originalPosition={x:0,y:0},n.state={resizing:!1,bounds:{top:0,right:0,bottom:0,left:0},maxWidth:t.maxWidth,maxHeight:t.maxHeight},n.onResizeStart=n.onResizeStart.bind(n),n.onResize=n.onResize.bind(n),n.onResizeStop=n.onResizeStop.bind(n),n.onDragStart=n.onDragStart.bind(n),n.onDrag=n.onDrag.bind(n),n.onDragStop=n.onDragStop.bind(n),n.getMaxSizesFromProps=n.getMaxSizesFromProps.bind(n),n}return t.prototype.componentDidMount=function(){this.updateOffsetFromParent();var e=this.offsetFromParent,t=e.left,n=e.top,r=this.getDraggablePosition(),i=r.x,a=r.y;this.draggable.setState({x:i-t,y:a-n}),this.forceUpdate()},t.prototype.getDraggablePosition=function(){var e=this.draggable.state;return{x:e.x,y:e.y}},t.prototype.getParent=function(){return this.resizable&&this.resizable.parentNode},t.prototype.getParentSize=function(){return this.resizable.getParentSize()},t.prototype.getMaxSizesFromProps=function(){return{maxWidth:this.props.maxWidth===void 0?2**53-1:this.props.maxWidth,maxHeight:this.props.maxHeight===void 0?2**53-1:this.props.maxHeight}},t.prototype.getSelfElement=function(){return this.resizable&&this.resizable.resizable},t.prototype.getOffsetHeight=function(e){var t=this.props.scale;switch(this.props.bounds){case`window`:return window.innerHeight/t;case`body`:return document.body.offsetHeight/t;default:return e.offsetHeight}},t.prototype.getOffsetWidth=function(e){var t=this.props.scale;switch(this.props.bounds){case`window`:return window.innerWidth/t;case`body`:return document.body.offsetWidth/t;default:return e.offsetWidth}},t.prototype.onDragStart=function(e,t){if(this.props.onDragStart&&this.props.onDragStart(e,t)===!1)return!1;var n=this.getDraggablePosition();if(this.originalPosition=n,this.props.bounds){var r=this.getParent(),i=this.props.scale,a;if(this.props.bounds===`parent`)a=r;else if(this.props.bounds===`body`){var o=r.getBoundingClientRect(),s=o.left,c=o.top,l=document.body.getBoundingClientRect(),u=-(s-r.offsetLeft*i-l.left)/i,d=-(c-r.offsetTop*i-l.top)/i,f=(document.body.offsetWidth-this.resizable.size.width*i)/i+u,p=(document.body.offsetHeight-this.resizable.size.height*i)/i+d;return this.setState({bounds:{top:d,right:f,bottom:p,left:u}})}else if(this.props.bounds===`window`){if(!this.resizable)return;var m=r.getBoundingClientRect(),h=m.left,g=m.top,_=-(h-r.offsetLeft*i)/i,v=-(g-r.offsetTop*i)/i,f=(window.innerWidth-this.resizable.size.width*i)/i+_,p=(window.innerHeight-this.resizable.size.height*i)/i+v;return this.setState({bounds:{top:v,right:f,bottom:p,left:_}})}else typeof this.props.bounds==`string`?a=document.querySelector(this.props.bounds):this.props.bounds instanceof HTMLElement&&(a=this.props.bounds);if(!(!(a instanceof HTMLElement)||!(r instanceof HTMLElement))){var y=a.getBoundingClientRect(),b=y.left,x=y.top,S=r.getBoundingClientRect(),C=S.left,w=S.top,T=(b-C)/i,E=x-w;if(this.resizable){this.updateOffsetFromParent();var D=this.offsetFromParent;this.setState({bounds:{top:E-D.top,right:T+(a.offsetWidth-this.resizable.size.width)-D.left/i,bottom:E+(a.offsetHeight-this.resizable.size.height)-D.top,left:T-D.left/i}})}}}},t.prototype.onDrag=function(e,t){if(this.props.onDrag){var n=this.offsetFromParent,r=n.left,i=n.top;if(!this.props.dragAxis||this.props.dragAxis===`both`)return this.props.onDrag(e,$($({},t),{x:t.x+r,y:t.y+i}));if(this.props.dragAxis===`x`)return this.props.onDrag(e,$($({},t),{x:t.x+r,y:this.originalPosition.y+i,deltaY:0}));if(this.props.dragAxis===`y`)return this.props.onDrag(e,$($({},t),{x:this.originalPosition.x+r,y:t.y+i,deltaX:0}))}},t.prototype.onDragStop=function(e,t){if(this.props.onDragStop){var n=this.offsetFromParent,r=n.left,i=n.top;if(!this.props.dragAxis||this.props.dragAxis===`both`)return this.props.onDragStop(e,$($({},t),{x:t.x+r,y:t.y+i}));if(this.props.dragAxis===`x`)return this.props.onDragStop(e,$($({},t),{x:t.x+r,y:this.originalPosition.y+i,deltaY:0}));if(this.props.dragAxis===`y`)return this.props.onDragStop(e,$($({},t),{x:this.originalPosition.x+r,y:t.y+i,deltaX:0}))}},t.prototype.onResizeStart=function(e,t,n){if(this.props.onResizeStart&&this.props.onResizeStart(e,t,n)===!1)return!1;e.stopPropagation(),this.setState({resizing:!0});var r=this.props.scale,i=this.offsetFromParent,a=this.getDraggablePosition();if(this.resizingPosition={x:a.x+i.left,y:a.y+i.top},this.originalPosition=a,this.props.bounds){var o=this.getParent(),s=void 0;this.props.bounds===`parent`?s=o:this.props.bounds===`body`?s=document.body:this.props.bounds===`window`?s=window:typeof this.props.bounds==`string`?s=document.querySelector(this.props.bounds):this.props.bounds instanceof HTMLElement&&(s=this.props.bounds);var c=this.getSelfElement();if(c instanceof Element&&(s instanceof HTMLElement||s===window)&&o instanceof HTMLElement){var l=this.getMaxSizesFromProps(),u=l.maxWidth,d=l.maxHeight,f=this.getParentSize();if(u&&typeof u==`string`)if(u.endsWith(`%`)){var p=Number(u.replace(`%`,``))/100;u=f.width*p}else u.endsWith(`px`)&&(u=Number(u.replace(`px`,``)));if(d&&typeof d==`string`)if(d.endsWith(`%`)){var p=Number(d.replace(`%`,``))/100;d=f.height*p}else d.endsWith(`px`)&&(d=Number(d.replace(`px`,``)));var m=c.getBoundingClientRect(),h=m.left,g=m.top,_=this.props.bounds===`window`?{left:0,top:0}:s.getBoundingClientRect(),v=_.left,y=_.top,b=this.getOffsetWidth(s),x=this.getOffsetHeight(s),S=t.toLowerCase().endsWith(`left`),C=t.toLowerCase().endsWith(`right`),w=t.startsWith(`top`),T=t.startsWith(`bottom`);if((S||w)&&this.resizable){var E=(h-v)/r+this.resizable.size.width;this.setState({maxWidth:E>Number(u)?u:E})}if(C||this.props.lockAspectRatio&&!S&&!w){var E=b+(v-h)/r;this.setState({maxWidth:E>Number(u)?u:E})}if((w||S)&&this.resizable){var E=(g-y)/r+this.resizable.size.height;this.setState({maxHeight:E>Number(d)?d:E})}if(T||this.props.lockAspectRatio&&!w&&!S){var E=x+(y-g)/r;this.setState({maxHeight:E>Number(d)?d:E})}}}else this.setState({maxWidth:this.props.maxWidth,maxHeight:this.props.maxHeight})},t.prototype.onResize=function(e,t,n,r){var i=this,a={x:this.originalPosition.x,y:this.originalPosition.y},o=-r.width,s=-r.height;[`top`,`left`,`topLeft`,`bottomLeft`,`topRight`].includes(t)&&(t===`bottomLeft`?a.x+=o:(t===`topRight`||(a.x+=o),a.y+=s));var c=this.draggable.state;(a.x!==c.x||a.y!==c.y)&&(0,N.flushSync)(function(){i.draggable.setState(a)}),this.updateOffsetFromParent();var l=this.offsetFromParent,u=this.getDraggablePosition().x+l.left,d=this.getDraggablePosition().y+l.top;this.resizingPosition={x:u,y:d},this.props.onResize&&this.props.onResize(e,t,n,r,{x:u,y:d})},t.prototype.onResizeStop=function(e,t,n,r){this.setState({resizing:!1});var i=this.getMaxSizesFromProps(),a=i.maxWidth,o=i.maxHeight;this.setState({maxWidth:a,maxHeight:o}),this.props.onResizeStop&&this.props.onResizeStop(e,t,n,r,this.resizingPosition)},t.prototype.updateSize=function(e){this.resizable&&this.resizable.updateSize({width:e.width,height:e.height})},t.prototype.updatePosition=function(e){this.draggable.setState(e)},t.prototype.updateOffsetFromParent=function(){var e=this.props.scale,t=this.getParent(),n=this.getSelfElement();if(!t||n===null)return{top:0,left:0};var r=t.getBoundingClientRect(),i=r.left,a=r.top,o=n.getBoundingClientRect(),s=this.getDraggablePosition(),c=t.scrollLeft,l=t.scrollTop;this.offsetFromParent={left:o.left-i+c-s.x*e,top:o.top-a+l-s.y*e}},t.prototype.render=function(){var e=this,t=this.props,n=t.disableDragging,r=t.style,i=t.dragHandleClassName,a=t.position,o=t.onMouseDown,s=t.onMouseUp,c=t.dragAxis,l=t.dragGrid,u=t.bounds,f=t.enableUserSelectHack,p=t.cancel,m=t.children;t.onResizeStart,t.onResize,t.onResizeStop,t.onDragStart,t.onDrag,t.onDragStop;var h=t.resizeHandleStyles,g=t.resizeHandleClasses,_=t.resizeHandleComponent,v=t.enableResizing,y=t.resizeGrid,b=t.resizeHandleWrapperClass,x=t.resizeHandleWrapperStyle,S=t.scale,C=t.allowAnyClick,w=t.dragPositionOffset,T=ct(t,`disableDragging.style.dragHandleClassName.position.onMouseDown.onMouseUp.dragAxis.dragGrid.bounds.enableUserSelectHack.cancel.children.onResizeStart.onResize.onResizeStop.onDragStart.onDrag.onDragStop.resizeHandleStyles.resizeHandleClasses.resizeHandleComponent.enableResizing.resizeGrid.resizeHandleWrapperClass.resizeHandleWrapperStyle.scale.allowAnyClick.dragPositionOffset`.split(`.`)),E=this.props.default?$({},this.props.default):void 0;delete T.default;var D=n||i?{cursor:`auto`}:{cursor:`move`},O=$($($({},lt),D),r),k=this.offsetFromParent,A=k.left,ee=k.top,j;a&&(j={x:a.x-A,y:a.y-ee});var te=this.state.resizing?void 0:j,M=this.state.resizing?`both`:c;return(0,d.createElement)(We,{ref:function(t){t&&(e.draggable=t)},handle:i?`.${i}`:void 0,defaultPosition:E,onMouseDown:o,onMouseUp:s,onStart:this.onDragStart,onDrag:this.onDrag,onStop:this.onDragStop,axis:M,disabled:n,grid:l,bounds:u?this.state.bounds:void 0,position:te,enableUserSelectHack:f,cancel:p,scale:S,allowAnyClick:C,nodeRef:this.resizableElement,positionOffset:w},(0,d.createElement)(at,$({},T,{ref:function(t){t&&(e.resizable=t,e.resizableElement.current=t.resizable)},defaultSize:E,size:this.props.size,enable:typeof v==`boolean`?ut(v):v,onResizeStart:this.onResizeStart,onResize:this.onResize,onResizeStop:this.onResizeStop,style:O,minWidth:this.props.minWidth,minHeight:this.props.minHeight,maxWidth:this.state.resizing?this.state.maxWidth:this.props.maxWidth,maxHeight:this.state.resizing?this.state.maxHeight:this.props.maxHeight,grid:y,handleWrapperClass:b,handleWrapperStyle:x,lockAspectRatio:this.props.lockAspectRatio,lockAspectRatioExtraWidth:this.props.lockAspectRatioExtraWidth,lockAspectRatioExtraHeight:this.props.lockAspectRatioExtraHeight,handleStyles:h,handleClasses:g,handleComponent:_,scale:this.props.scale}),m))},t.defaultProps={maxWidth:2**53-1,maxHeight:2**53-1,scale:1,onResizeStart:function(){},onResize:function(){},onResizeStop:function(){},onDragStart:function(){},onDrag:function(){},onDragStop:function(){}},t}(d.PureComponent),ft=s.div`
  background: #fff;
  border: 2px solid #bbb;
  border-radius: 10px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.12);
  padding: 0;
  overflow: hidden;
  position: relative;
  /* 你可以用 className 或 styled-components 擴充這裡的樣式 */
`,pt=s.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #222;
  color: #fff;
  padding: 0 12px;
  height:24px;
  font-size: 1.1rem;
  border-bottom: 1px solid #ddd;
`,mt=s.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`,ht=s.div`
  display: flex;
  align-items: center;
  button {
    background: #ff5f56;
    border: none;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    margin-left: 8px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #ff2d1a;
    }
    &:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  }
`,gt=s.div`
  padding: 10px 8px;
  height: calc(100% - 24px);
  max-height: calc(100% - 24px);
  overflow-y: hidden;
  overflow-x: hidden;
  background: #f8f8f8;
  &::-webkit-scrollbar {
    width: 8px;
    background: #eee;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 1px;
  }
  font-size: 12px;
`,_t=({icon:e,title:t,children:n,onClose:r,defaultSize:i={x:100,y:100,width:320,height:200}})=>{let a=k(),{playCancel:o}=te(),s=typeof window<`u`&&window.innerWidth<=768;return(0,f.jsx)(dt,{default:s?{x:10,y:38,width:Math.min(window.innerWidth-20,380),height:Math.min(window.innerHeight-80,520)}:i,position:s?{x:10,y:38}:void 0,size:s?{width:Math.min(window.innerWidth-20,380),height:Math.min(window.innerHeight-80,520)}:void 0,minWidth:200,minHeight:100,disableDragging:s,enableResizing:!s,children:(0,f.jsxs)(ft,{style:{width:`100%`,height:`100%`},children:[(0,f.jsxs)(pt,{onMouseDown:()=>{try{a()}catch(e){console.warn(`Title bar click sound error (handled):`,e.message)}},children:[(0,f.jsxs)(mt,{children:[e&&(0,f.jsx)(`img`,{src:e,alt:``,width:`18`,height:`18`,"aria-hidden":`true`,style:{marginRight:8,verticalAlign:`middle`}}),t]}),(0,f.jsx)(ht,{children:(0,f.jsx)(`button`,{"aria-label":`Close ${t} window`,onClick:()=>{try{o()}catch(e){console.warn(`Close button sound error (handled):`,e.message)}r&&r()}})})]}),(0,f.jsx)(gt,{children:n})]})})},vt=s.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
`,yt=s.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) contrast(1.1) saturate(1.2);
`,bt=s.div`
  width: 100%;
  height: 100%;
  background-image: url(${e=>e.src});
  background-size: cover;
  background-position: center;
  filter: brightness(0.9) contrast(1.1);
`,xt=({background:e})=>e?(0,f.jsxs)(vt,{children:[e.type===`video`&&(0,f.jsx)(yt,{src:e.src,autoPlay:!0,loop:!0,muted:!0,playsInline:!0}),e.type===`image`&&(0,f.jsx)(bt,{src:e.src})]}):null;s.div`
  position: fixed;
  left: 0; bottom: 0;
  width: 100vw;
  height: 100px;
  background: repeating-linear-gradient(
    to right,
    #222 0 8px, #333 8px 16px
  ), linear-gradient(180deg, #444 60%, #222 100%);
  border-top: 2px solid #fff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 0 32px 0 #000a;
`;var St=l`
  0% { transform: translateX(0); }
  20% { transform: translateX(40px); }
  50% { transform: translateX(0); }
  70% { transform: translateX(-40px); }
  100% { transform: translateX(0); }
`;s.div`
  position: relative;
  width: 64px;
  height: 64px;
  margin: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${St} 8s linear infinite;
  cursor: pointer;
`,s.div`
  position: absolute;
  left: 50%; top: -24px;
  transform: translateX(-50%);
  font-size: 24px;
  opacity: ${e=>+!!e.show};
  transition: opacity 0.3s;
  pointer-events: none;
`,s.div`
  font-family: 'VT323', 'Consolas', 'monospace';
  color: #fff;
  font-size: 1.2rem;
  margin-top: 2px;
  text-shadow: 0 0 2px #000, 0 0 8px #fff;
`,s.div`
  position: absolute;
  right: 32px;
  bottom: 18px;
  font-family: 'VT323', 'Consolas', 'monospace';
  font-size: 2rem;
  color: #fff;
  text-shadow: 0 0 8px #fff, 0 0 2px #000;
  letter-spacing: 2px;
  z-index: 10;
`;var Ct=(0,d.createContext)(),wt=()=>(0,d.useContext)(Ct),Tt=({children:e})=>{let[t,n]=(0,d.useState)([]);return(0,f.jsx)(Ct.Provider,{value:{openApps:t,openApp:e=>{n(t=>t.find(t=>t.id===e.id)?t:[...t,e])},closeApp:e=>{n(t=>t.filter(t=>t.id!==e))}},children:e})},Et=s.div.attrs({className:`dropdown-menu-container`})`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #000;
  padding: 5px ;
  min-width: 200px;
  z-index: 1000;
  font-family: 'Cubic_11', sans-serif;
  font-size: 15px;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.8);
`,Dt=s.div`
  padding: 5px 20px;
  cursor: pointer;
  white-space: nowrap;
  background-color: ${e=>e.isHovered?`#000080`:`transparent`};
  color: ${e=>e.isHovered?`white`:e.disabled?`#888`:`#000`};
  
  // Create a scanline effect for disabled items
  ${e=>e.disabled&&`
    position: relative;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        to bottom,
        transparent 0,
        transparent 1px,
        rgba(0, 0, 0, 0.2) 2px,
        rgba(0, 0, 0, 0.2) 3px
      );
      pointer-events: none;
    }
  `}

  pointer-events: ${e=>e.disabled?`none`:`auto`};
`,Ot=s.div`
  height: 1px;
  border-top: 1px dotted #888;
  margin: 5px 4px;
`,kt=({items:e,position:t,onClose:n})=>{let[r,i]=d.useState(-1),a=e=>{e.action&&e.action(),n()};return N.createPortal((0,f.jsx)(Et,{style:{top:t.y,left:t.x},children:e.map((e,t)=>e.type===`separator`?(0,f.jsx)(Ot,{},t):(0,f.jsx)(Dt,{disabled:e.disabled,onClick:()=>a(e),onMouseEnter:()=>i(t),onMouseLeave:()=>i(-1),isHovered:!e.disabled&&r===t,children:e.label},t))}),document.body)};function At({onOpenApp:e}){let[t,n]=(0,d.useState)(new Date),[r,i]=(0,d.useState)(null),[a,o]=(0,d.useState)({x:0,y:0}),s=(0,d.useRef)(null),c=(0,d.useRef)(null),l=(0,d.useRef)(null),u=e=>{e.current&&(e.current.currentTime=0,e.current.play().catch(e=>console.error(`Audio play failed:`,e)))},p=()=>{r&&(u(l),i(null))},m={icon:[{label:`關於這個 App`,action:()=>e(`about`)},{type:`separator`},{label:`設定...`,disabled:!0},{label:`登出`,disabled:!0,action:()=>alert(`登出功能待開發！`)}],檔案:[{label:`New Finder Window`,action:()=>e(`browser`)},{label:`New Terminal`,action:()=>e(`terminal`)},{type:`separator`},{label:`Move to Trash`,disabled:!0},{label:`Empty Trash...`,action:()=>alert(`垃圾桶已清空！`)},{type:`separator`},{label:`Close`,action:()=>alert(`關閉視窗功能待開發！`)}],編輯:[{label:`Undo`,disabled:!0},{label:`Redo`,disabled:!0}],檢視:[{label:`Zoom In`,disabled:!0},{label:`Zoom Out`,disabled:!0}],前往:[{label:`Open Terminal`,action:()=>e(`terminal`)}],幫助:[{label:`顯示幫助訊息`,action:()=>{alert(`這是一個自訂的幫助訊息！`)}}]};(0,d.useEffect)(()=>{let e=setInterval(()=>n(new Date),1e3),t=e=>{s.current&&s.current.contains(e.target)||e.target.closest(`.dropdown-menu-container`)||p()};return document.addEventListener(`mousedown`,t),()=>{clearInterval(e),document.removeEventListener(`mousedown`,t)}},[r]);let h=(e,t)=>{if(r===e)p();else{u(c);let n=t.currentTarget.getBoundingClientRect();o({x:n.left,y:n.bottom}),i(e)}},g=[`日`,`一`,`二`,`三`,`四`,`五`,`六`][t.getDay()],_=`${t.getHours().toString().padStart(2,`0`)}:${t.getMinutes().toString().padStart(2,`0`)}`,v={position:`relative`,width:`100%`,height:28,background:`#fff`,borderBottom:`1.5px solid #222`,display:`flex`,alignItems:`center`,justifyContent:`space-between`,fontFamily:`'Cubic_11', 'Press Start 2P', 'Pixel', 'monospace'`,fontSize:15,color:`#222`,boxShadow:`0 1px 4px rgba(0,0,0,0.04)`,zIndex:999},y={display:`flex`,alignItems:`center`,gap:18,marginLeft:16},b={fontSize:20,fontWeight:`bold`,marginRight:5,width:20,height:20},x=e=>({cursor:`pointer`,padding:`2px 6px`,borderRadius:4,transition:`background 0.2s`,userSelect:`none`,backgroundColor:r===e?`#e5e5e5`:`transparent`}),S={display:`flex`,alignItems:`center`,gap:12,marginRight:18},C={fontSize:14};return(0,f.jsxs)(`div`,{style:v,ref:s,children:[(0,f.jsx)(`audio`,{ref:c,src:`/assets/sound-effects/select.wav`,preload:`auto`}),(0,f.jsx)(`audio`,{ref:l,src:`/assets/sound-effects/select.wav`,preload:`auto`}),(0,f.jsx)(`div`,{style:y,children:Object.keys(m).map(e=>e===`icon`?(0,f.jsx)(`img`,{src:`/assets/gpt_banana_icon.webp`,alt:`banana`,style:{...b,cursor:`pointer`,padding:`2px`,borderRadius:4,backgroundColor:r===e?`#e5e5e5`:`transparent`},onClick:t=>h(e,t)},e):(0,f.jsx)(`span`,{className:`mac-menu-item`,style:{...x(e),display:typeof window<`u`&&window.innerWidth<=768&&e!==`檔案`?`none`:`inline-block`},onClick:t=>h(e,t),children:e},e))}),r&&(0,f.jsx)(kt,{items:m[r],position:a,onClose:p}),(0,f.jsxs)(`div`,{style:S,children:[(0,f.jsx)(`span`,{role:`img`,"aria-label":`volume`,children:`🔊`}),(0,f.jsx)(`span`,{style:C,children:`週${g} ${t.getMonth()+1}月${t.getDate()}日`}),(0,f.jsx)(`span`,{style:C,children:_})]})]})}var jt=class extends d.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}static getDerivedStateFromError(e){return{hasError:!0,error:e}}componentDidCatch(e,t){console.error(`ErrorBoundary caught an error:`,e,t),e.message&&e.message.includes(`play`)&&setTimeout(()=>{this.setState({hasError:!1,error:null})},100)}render(){return this.state.hasError?this.state.error&&this.state.error.message&&this.state.error.message.includes(`play`)?this.props.children:(0,f.jsxs)(`div`,{style:{padding:`20px`,textAlign:`center`,background:`#f8f9fa`,border:`1px solid #dee2e6`,borderRadius:`8px`,margin:`20px`},children:[(0,f.jsx)(`h2`,{style:{color:`#6c757d`},children:`出現了一些問題`}),(0,f.jsx)(`p`,{style:{color:`#868e96`},children:`請重新整理頁面或聯繫管理員`}),(0,f.jsx)(`button`,{onClick:()=>window.location.reload(),style:{padding:`8px 16px`,background:`#007bff`,color:`white`,border:`none`,borderRadius:`4px`,cursor:`pointer`},children:`重新整理`})]}):this.props.children}},Mt=(0,d.lazy)(()=>r(()=>import(`./BrowserApp-uZy_x_qF.js`),__vite__mapDeps([0,1,2]))),Nt=(0,d.lazy)(()=>r(()=>import(`./MP3Player-DP_hstfJ.js`),__vite__mapDeps([3,1,2,4]))),Pt=(0,d.lazy)(()=>r(()=>import(`./Terminal-DCq9E9_r.js`),__vite__mapDeps([5,1,2,6,7]))),Ft=(0,d.lazy)(()=>r(()=>import(`./YahooChat-4XewRaz4.js`),__vite__mapDeps([8,1,2,9]))),It=(0,d.lazy)(()=>r(()=>import(`./PDFViewer-BpLDv47O.js`),__vite__mapDeps([10,1,2]))),Lt=(0,d.lazy)(()=>r(()=>import(`./vscodeEditor-XS9smucZ.js`),__vite__mapDeps([11,1,2,4]))),Rt=(0,d.lazy)(()=>r(()=>import(`./DitherImageViewer-hO3RT3JR.js`),__vite__mapDeps([12,1,2,4]))),zt=(0,d.lazy)(()=>r(()=>import(`./OpenAppStore-BEeq5dlO.js`),__vite__mapDeps([13,1,2]))),Bt=(0,d.lazy)(()=>r(()=>import(`./GameBoyAdvance-D0Id2c6L.js`),__vite__mapDeps([14,1,2,4]))),Vt=()=>(0,f.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,justify:`center`,height:`100%`,width:`100%`,background:`#f0f0f0`,color:`#333`,fontFamily:`monospace`,fontSize:`14px`,padding:`20px`},children:`Loading application...`}),Ht=[{id:`wiki`,name:`wiki`,icon:`/assets/app/B/Wikipedia.png`,windowProps:{title:`wiki`,defaultSize:{x:200,y:120,width:400,height:500}},content:(0,f.jsxs)(`div`,{style:{padding:`16px`,lineHeight:1.8,fontSize:`1.1em`,maxHeight:`100%`,overflowY:`auto`,boxSizing:`border-box`,background:`#fff`,borderRadius:`8px`,boxShadow:`0 2px 8px rgba(0,0,0,0.08)`},children:[(0,f.jsx)(`h2`,{style:{marginBottom:`8px`,color:`#2d72d9`},children:`Welcome to adi.tw. v1`}),(0,f.jsx)(`div`,{style:{marginBottom:`12px`,color:`#d9534f`,fontWeight:`bold`},children:`公告：即時通功能可以留言！我會看到！`}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{style:{fontWeight:`bold`},children:`feature:`}),(0,f.jsxs)(`ol`,{style:{margin:`8px 0 0 24px`},children:[(0,f.jsx)(`li`,{children:`即時通可以留言!!`}),(0,f.jsx)(`li`,{children:`instagram 盡量還原我喜歡的ccd風格, 原本想說要做無名小站`}),(0,f.jsx)(`li`,{children:`cv.pdf, 是我的履歷有興趣可以聯絡我 kokp520@gmail.com`}),(0,f.jsx)(`li`,{children:`App store 目前還沒做其他功能只放連結！`})]})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`span`,{style:{fontWeight:`bold`},children:`todo：`}),(0,f.jsxs)(`ol`,{style:{margin:`8px 0 0 24px`},children:[(0,f.jsx)(`li`,{children:`[feature]yahoo即時通 storage狀態功能`}),(0,f.jsx)(`li`,{children:`[feature]finder feature`}),(0,f.jsx)(`li`,{children:`[feature]GBA game 做實際小遊戲，頁面調整`}),(0,f.jsx)(`li`,{children:`[feature]chrome 多做網頁的功能`})]})]})]})},{id:`browser`,name:`Chrome`,icon:`/assets/app/B/Google_Chrome.png`,windowProps:{title:`Chrome`,defaultSize:{x:220,y:120,width:650,height:540}},Component:Mt},{id:`terminal`,name:`Terminal`,icon:`/assets/app/terminal-removebg-preview.png`,windowProps:{title:`Terminal`,defaultSize:{x:100,y:100,width:700,height:350}},Component:Pt},{id:`cv`,name:`CV.pdf`,icon:`/assets/app/B/Microsoft_PowerPoint.png`,windowProps:{title:`CV.pdf`,defaultSize:{x:150,y:150,width:800,height:600}},Component:()=>(0,f.jsx)(It,{filePath:`/assets/cv.pdf`})},{id:`mp3player`,name:`千千靜聽`,icon:`/assets/app/mp3player-removebg-preview.png`,windowProps:{title:`千千靜聽`,defaultSize:{x:180,y:180,width:380,height:330},resizable:!1},Component:Nt},{id:`dither-image-viewer`,name:`Instagram CCD`,icon:`/assets/app/B/instagram-old.png`,windowProps:{title:`Instagram CCD`,defaultSize:{x:180,y:180,width:500,height:490},resizable:!1},Component:Rt},{id:`vscode-text-editor`,name:`VSCode Editor`,icon:`/assets/app/vscode-removebg-preview.png`,windowProps:{title:`VSCode Editor`,defaultSize:{x:400,y:100,width:820,height:600},resizable:!0},Component:Lt},{id:`instant-chat`,name:`即時通`,icon:`/assets/app/yahoo-message-removebg-preview.png`,windowProps:{title:`即時通`,defaultSize:{x:900,y:200,width:350,height:600}},Component:Ft},{id:`open-appstore`,name:`App Store 下載`,icon:`/assets/app/app-store-removebg-preview.png`,windowProps:{title:`App Store 下載`,defaultSize:{x:200,y:120,width:400,height:300},resizable:!0},Component:zt},{id:`gameboy-advance`,name:`Game Boy Advance`,icon:`/assets/gba/gba-interface.png`,windowProps:{title:`Game Boy Advance`,defaultSize:{x:300,y:150,width:500,height:340},resizable:!1},Component:Bt}];function Ut(){let[e,n]=(0,d.useState)({}),[r,i]=(0,d.useState)(null),{openApp:a,closeApp:o}=wt(),[s,c]=(0,d.useState)({type:`video`,src:`/assets/wallpaper-compressed.mp4`}),l=e=>{n(t=>({...t,[e]:!0})),i(e);let t=Ht.find(t=>t.id===e);t&&a({id:t.id,name:t.name,icon:t.icon})},u=e=>{n(t=>({...t,[e]:!1})),o(e),r===e&&i(null)},p=Ht.filter(t=>e[t.id]).sort(e=>e.id===r?1:-1);return(0,f.jsxs)(y,{children:[(0,f.jsxs)(t,{children:[(0,f.jsx)(`title`,{children:`adi | Retro OS`}),(0,f.jsx)(`meta`,{name:`description`,content:`A personal website reimagined as a retro desktop OS with windows, apps, and mini-games by adi.`})]}),(0,f.jsxs)(x,{children:[(0,f.jsx)(xt,{background:s}),(0,f.jsx)(S,{}),(0,f.jsx)(C,{}),(0,f.jsx)(b,{}),(0,f.jsx)(_,{}),(0,f.jsx)(v,{}),(0,f.jsxs)(`div`,{style:{position:`relative`,zIndex:1,width:`100%`,height:`100%`},children:[(0,f.jsx)(At,{onOpenApp:l}),(0,f.jsx)(T,{style:{zIndex:1},children:Ht.map(e=>(0,f.jsx)(ie,{icon:e.icon,label:e.name,onDoubleClick:()=>l(e.id),disabled:e.disabled},e.id))}),(0,f.jsx)(`div`,{style:{position:`relative`,zIndex:2},children:p.map(e=>{let t=e.Component;return(0,f.jsx)(_t,{icon:e.icon,...e.windowProps,onClose:()=>u(e.id),children:(0,f.jsx)(d.Suspense,{fallback:(0,f.jsx)(Vt,{}),children:t?(0,f.jsx)(t,{}):e.content})},e.id)})})]})]})]})}function Wt(){return(0,f.jsxs)(jt,{children:[(0,f.jsx)(w,{}),(0,f.jsx)(u,{children:(0,f.jsx)(O,{children:(0,f.jsx)(j,{children:(0,f.jsx)(Tt,{children:(0,f.jsx)(Ut,{})})})})})]})}export{Wt as default};