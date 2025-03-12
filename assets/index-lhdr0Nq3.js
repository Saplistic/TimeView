(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();const Et=!1;var ut=Array.isArray,dr=Array.prototype.indexOf,ot=Array.from,pr=Object.defineProperty,_e=Object.getOwnPropertyDescriptor,Mt=Object.getOwnPropertyDescriptors,hr=Object.prototype,gr=Array.prototype,ft=Object.getPrototypeOf;function mr(e){return e()}function Xe(e){for(var t=0;t<e.length;t++)e[t]()}const V=2,Rt=4,Oe=8,st=16,z=32,ge=64,Fe=128,K=256,qe=512,P=1024,J=2048,me=4096,Y=8192,be=16384,br=32768,ct=65536,wr=1<<17,yr=1<<19,Ft=1<<20,de=Symbol("$state"),Er=Symbol("legacy props");function qt(e){return e===this.v}function xr(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function vt(e){return!xr(e,this.v)}function Tr(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function kr(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Sr(e){throw new Error("https://svelte.dev/e/effect_orphan")}function Dr(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Ir(e){throw new Error("https://svelte.dev/e/props_invalid_value")}function Or(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Nr(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Ar(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function Pr(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let we=!1,Lr=!1;function Cr(){we=!0}const Mr=1,Rr=2,Fr=16,qr=1,Ur=2,Br=4,Vr=8,$r=16,jr=1,Yr=2,L=Symbol();function Ut(e){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}let T=null;function xt(e){T=e}function _t(e,t=!1,r){T={p:T,c:null,e:null,m:!1,s:e,x:null,l:null},we&&!t&&(T.l={s:null,u:null,r1:[],r2:F(!1)})}function dt(e){const t=T;if(t!==null){const a=t.e;if(a!==null){var r=y,l=x;t.e=null;try{for(var n=0;n<a.length;n++){var i=a[n];W(i.effect),te(i.reaction),Zt(i.fn)}}finally{W(r),te(l)}}T=t.p,t.m=!0}return{}}function F(e,t){var r={f:0,v:e,reactions:null,equals:qt,rv:0,wv:0};return r}function se(e){return Bt(F(e))}function pt(e,t=!1){var l;const r=F(e);return t||(r.equals=vt),we&&T!==null&&T.l!==null&&((l=T.l).s??(l.s=[])).push(r),r}function Tt(e,t=!1){return Bt(pt(e,t))}function Bt(e){return x!==null&&!Z&&(x.f&V)!==0&&(H===null?nn([e]):H.push(e)),e}function xe(e,t){return w(e,re(()=>d(e))),t}function w(e,t){return x!==null&&!Z&&Ne()&&(x.f&(V|st))!==0&&(H===null||!H.includes(e))&&Pr(),Vt(e,t)}function Vt(e,t){return e.equals(t)||(e.v,e.v=t,e.wv=nr(),$t(e,J),Ne()&&y!==null&&(y.f&P)!==0&&(y.f&(z|ge))===0&&(G===null?ln([e]):G.push(e))),t}function $t(e,t){var r=e.reactions;if(r!==null)for(var l=Ne(),n=r.length,i=0;i<n;i++){var a=r[i],v=a.f;(v&J)===0&&(!l&&a===y||($(a,t),(v&(P|K))!==0&&((v&V)!==0?$t(a,me):ze(a))))}}let Hr=!1;function C(e,t=null,r){if(typeof e!="object"||e===null||de in e)return e;const l=ft(e);if(l!==hr&&l!==gr)return e;var n=new Map,i=ut(e),a=F(0);i&&n.set("length",F(e.length));var v;return new Proxy(e,{defineProperty(s,o,c){(!("value"in c)||c.configurable===!1||c.enumerable===!1||c.writable===!1)&&Or();var u=n.get(o);return u===void 0?(u=F(c.value),n.set(o,u)):w(u,C(c.value,v)),!0},deleteProperty(s,o){var c=n.get(o);if(c===void 0)o in s&&n.set(o,F(L));else{if(i&&typeof o=="string"){var u=n.get("length"),f=Number(o);Number.isInteger(f)&&f<u.v&&w(u,f)}w(c,L),kt(a)}return!0},get(s,o,c){var p;if(o===de)return e;var u=n.get(o),f=o in s;if(u===void 0&&(!f||(p=_e(s,o))!=null&&p.writable)&&(u=F(C(f?s[o]:L,v)),n.set(o,u)),u!==void 0){var _=d(u);return _===L?void 0:_}return Reflect.get(s,o,c)},getOwnPropertyDescriptor(s,o){var c=Reflect.getOwnPropertyDescriptor(s,o);if(c&&"value"in c){var u=n.get(o);u&&(c.value=d(u))}else if(c===void 0){var f=n.get(o),_=f==null?void 0:f.v;if(f!==void 0&&_!==L)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return c},has(s,o){var _;if(o===de)return!0;var c=n.get(o),u=c!==void 0&&c.v!==L||Reflect.has(s,o);if(c!==void 0||y!==null&&(!u||(_=_e(s,o))!=null&&_.writable)){c===void 0&&(c=F(u?C(s[o],v):L),n.set(o,c));var f=d(c);if(f===L)return!1}return u},set(s,o,c,u){var S;var f=n.get(o),_=o in s;if(i&&o==="length")for(var p=c;p<f.v;p+=1){var g=n.get(p+"");g!==void 0?w(g,L):p in s&&(g=F(L),n.set(p+"",g))}f===void 0?(!_||(S=_e(s,o))!=null&&S.writable)&&(f=F(void 0),w(f,C(c,v)),n.set(o,f)):(_=f.v!==L,w(f,C(c,v)));var k=Reflect.getOwnPropertyDescriptor(s,o);if(k!=null&&k.set&&k.set.call(u,c),!_){if(i&&typeof o=="string"){var D=n.get("length"),h=Number(o);Number.isInteger(h)&&h>=D.v&&w(D,h+1)}kt(a)}return!0},ownKeys(s){d(a);var o=Reflect.ownKeys(s).filter(f=>{var _=n.get(f);return _===void 0||_.v!==L});for(var[c,u]of n)u.v!==L&&!(c in s)&&o.push(c);return o},setPrototypeOf(){Nr()}})}function kt(e,t=1){w(e,e.v+t)}var St,jt,Yt;function Kr(){if(St===void 0){St=window;var e=Element.prototype,t=Node.prototype;jt=_e(t,"firstChild").get,Yt=_e(t,"nextSibling").get,e.__click=void 0,e.__className="",e.__attributes=null,e.__styles=null,e.__e=void 0,Text.prototype.__t=void 0}}function Ht(e=""){return document.createTextNode(e)}function Ue(e){return jt.call(e)}function Ke(e){return Yt.call(e)}function N(e,t){return Ue(e)}function ve(e,t){{var r=Ue(e);return r instanceof Comment&&r.data===""?Ke(r):r}}function A(e,t=1,r=!1){let l=e;for(;t--;)l=Ke(l);return l}function Wr(e){e.textContent=""}function he(e){var t=V|J,r=x!==null&&(x.f&V)!==0?x:null;return y===null||r!==null&&(r.f&K)!==0?t|=K:y.f|=Ft,{ctx:T,deps:null,effects:null,equals:qt,f:t,fn:e,reactions:null,rv:0,v:null,wv:0,parent:r??y}}function Kt(e){const t=he(e);return t.equals=vt,t}function ht(e){var t=e.effects;if(t!==null){e.effects=null;for(var r=0;r<t.length;r+=1)ee(t[r])}}function zr(e){for(var t=e.parent;t!==null;){if((t.f&V)===0)return t;t=t.parent}return null}function Wt(e){var t,r=y;W(zr(e));try{ht(e),t=ir(e)}finally{W(r)}return t}function zt(e){var t=Wt(e),r=(ae||(e.f&K)!==0)&&e.deps!==null?me:P;$(e,r),e.equals(t)||(e.v=t,e.wv=nr())}function Gr(e){ht(e),Ie(e,0),$(e,be),e.v=e.deps=e.ctx=e.reactions=null}function Gt(e){y===null&&x===null&&Sr(),x!==null&&(x.f&K)!==0&&y===null&&kr(),wt&&Tr()}function Zr(e,t){var r=t.last;r===null?t.last=t.first=e:(r.next=e,e.prev=r,t.last=e)}function ye(e,t,r,l=!0){var n=(e&ge)!==0,i=y,a={ctx:T,deps:null,nodes_start:null,nodes_end:null,f:e|J,first:null,fn:t,last:null,next:null,parent:n?null:i,prev:null,teardown:null,transitions:null,wv:0};if(r){var v=pe;try{Dt(!0),yt(a),a.f|=br}catch(c){throw ee(a),c}finally{Dt(v)}}else t!==null&&ze(a);var s=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&(Ft|Fe))===0;if(!s&&!n&&l&&(i!==null&&Zr(a,i),x!==null&&(x.f&V)!==0)){var o=x;(o.effects??(o.effects=[])).push(a)}return a}function Jr(e){const t=ye(Oe,null,!1);return $(t,P),t.teardown=e,t}function Be(e){Gt();var t=y!==null&&(y.f&z)!==0&&T!==null&&!T.m;if(t){var r=T;(r.e??(r.e=[])).push({fn:e,effect:y,reaction:x})}else{var l=Zt(e);return l}}function Xr(e){return Gt(),gt(e)}function Qr(e){const t=ye(ge,e,!0);return(r={})=>new Promise(l=>{r.outro?Ve(t,()=>{ee(t),l(void 0)}):(ee(t),l(void 0))})}function Zt(e){return ye(Rt,e,!1)}function gt(e){return ye(Oe,e,!0)}function Ce(e,t=[],r=he){const l=t.map(r);return mt(()=>e(...l.map(d)))}function mt(e,t=0){return ye(Oe|st|t,e,!0)}function De(e,t=!0){return ye(Oe|z,e,!0,t)}function Jt(e){var t=e.teardown;if(t!==null){const r=wt,l=x;It(!0),te(null);try{t.call(null)}finally{It(r),te(l)}}}function Xt(e,t=!1){var r=e.first;for(e.first=e.last=null;r!==null;){var l=r.next;ee(r,t),r=l}}function en(e){for(var t=e.first;t!==null;){var r=t.next;(t.f&z)===0&&ee(t),t=r}}function ee(e,t=!0){var r=!1;if((t||(e.f&yr)!==0)&&e.nodes_start!==null){for(var l=e.nodes_start,n=e.nodes_end;l!==null;){var i=l===n?null:Ke(l);l.remove(),l=i}r=!0}Xt(e,t&&!r),Ie(e,0),$(e,be);var a=e.transitions;if(a!==null)for(const s of a)s.stop();Jt(e);var v=e.parent;v!==null&&v.first!==null&&Qt(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes_start=e.nodes_end=null}function Qt(e){var t=e.parent,r=e.prev,l=e.next;r!==null&&(r.next=l),l!==null&&(l.prev=r),t!==null&&(t.first===e&&(t.first=l),t.last===e&&(t.last=r))}function Ve(e,t){var r=[];bt(e,r,!0),er(r,()=>{ee(e),t&&t()})}function er(e,t){var r=e.length;if(r>0){var l=()=>--r||t();for(var n of e)n.out(l)}else t()}function bt(e,t,r){if((e.f&Y)===0){if(e.f^=Y,e.transitions!==null)for(const a of e.transitions)(a.is_global||r)&&t.push(a);for(var l=e.first;l!==null;){var n=l.next,i=(l.f&ct)!==0||(l.f&z)!==0;bt(l,t,i?r:!1),l=n}}}function $e(e){tr(e,!0)}function tr(e,t){if((e.f&Y)!==0){e.f^=Y,(e.f&P)===0&&(e.f^=P),Ae(e)&&($(e,J),ze(e));for(var r=e.first;r!==null;){var l=r.next,n=(r.f&ct)!==0||(r.f&z)!==0;tr(r,n?t:!1),r=l}if(e.transitions!==null)for(const i of e.transitions)(i.is_global||t)&&i.in()}}let Qe=!1,et=[];function tn(){Qe=!1;const e=et.slice();et=[],Xe(e)}function rn(e){Qe||(Qe=!0,queueMicrotask(tn)),et.push(e)}let Me=!1,je=!1,Ye=null,pe=!1,wt=!1;function Dt(e){pe=e}function It(e){wt=e}let tt=[],Se=0;let x=null,Z=!1;function te(e){x=e}let y=null;function W(e){y=e}let H=null;function nn(e){H=e}let M=null,R=0,G=null;function ln(e){G=e}let rr=1,He=0,ae=!1;function nr(){return++rr}function Ne(){return!we||T!==null&&T.l===null}function Ae(e){var o;var t=e.f;if((t&J)!==0)return!0;if((t&me)!==0){var r=e.deps,l=(t&K)!==0;if(r!==null){var n,i,a=(t&qe)!==0,v=l&&y!==null&&!ae,s=r.length;if(a||v){for(n=0;n<s;n++)i=r[n],(a||!((o=i==null?void 0:i.reactions)!=null&&o.includes(e)))&&(i.reactions??(i.reactions=[])).push(e);a&&(e.f^=qe)}for(n=0;n<s;n++)if(i=r[n],Ae(i)&&zt(i),i.wv>e.wv)return!0}(!l||y!==null&&!ae)&&$(e,P)}return!1}function an(e,t){for(var r=t;r!==null;){if((r.f&Fe)!==0)try{r.fn(e);return}catch{r.f^=Fe}r=r.parent}throw Me=!1,e}function un(e){return(e.f&be)===0&&(e.parent===null||(e.parent.f&Fe)===0)}function We(e,t,r,l){if(Me){if(r===null&&(Me=!1),un(t))throw e;return}r!==null&&(Me=!0);{an(e,t);return}}function lr(e,t,r=0){var l=e.reactions;if(l!==null)for(var n=0;n<l.length;n++){var i=l[n];(i.f&V)!==0?lr(i,t,r+1):t===i&&(r===0?$(i,J):(i.f&P)!==0&&$(i,me),ze(i))}}function ir(e){var _;var t=M,r=R,l=G,n=x,i=ae,a=H,v=T,s=Z,o=e.f;M=null,R=0,G=null,x=(o&(z|ge))===0?e:null,ae=(o&K)!==0&&(!pe||(n===null||s)&&e.parent!==null),H=null,xt(e.ctx),Z=!1,He++;try{var c=(0,e.fn)(),u=e.deps;if(M!==null){var f;if(Ie(e,R),u!==null&&R>0)for(u.length=R+M.length,f=0;f<M.length;f++)u[R+f]=M[f];else e.deps=u=M;if(!ae)for(f=R;f<u.length;f++)((_=u[f]).reactions??(_.reactions=[])).push(e)}else u!==null&&R<u.length&&(Ie(e,R),u.length=R);if(Ne()&&G!==null&&(e.f&(V|me|J))===0)for(f=0;f<G.length;f++)lr(G[f],e);return n!==null&&He++,c}finally{M=t,R=r,G=l,x=n,ae=i,H=a,xt(v),Z=s}}function on(e,t){let r=t.reactions;if(r!==null){var l=dr.call(r,e);if(l!==-1){var n=r.length-1;n===0?r=t.reactions=null:(r[l]=r[n],r.pop())}}r===null&&(t.f&V)!==0&&(M===null||!M.includes(t))&&($(t,me),(t.f&(K|qe))===0&&(t.f^=qe),ht(t),Ie(t,0))}function Ie(e,t){var r=e.deps;if(r!==null)for(var l=t;l<r.length;l++)on(e,r[l])}function yt(e){var t=e.f;if((t&be)===0){$(e,P);var r=y,l=T;y=e;try{(t&st)!==0?en(e):Xt(e),Jt(e);var n=ir(e);e.teardown=typeof n=="function"?n:null,e.wv=rr;var i=e.deps,a;Et&&Lr&&e.f&J}catch(v){We(v,e,r,l||e.ctx)}finally{y=r}}}function fn(){if(Se>1e3){Se=0;try{Dr()}catch(e){if(Ye!==null)We(e,Ye,null);else throw e}}Se++}function sn(e){var t=e.length;if(t!==0){fn();var r=pe;pe=!0;try{for(var l=0;l<t;l++){var n=e[l];(n.f&P)===0&&(n.f^=P);var i=[];ar(n,i),cn(i)}}finally{pe=r}}}function cn(e){var t=e.length;if(t!==0)for(var r=0;r<t;r++){var l=e[r];if((l.f&(be|Y))===0)try{Ae(l)&&(yt(l),l.deps===null&&l.first===null&&l.nodes_start===null&&(l.teardown===null?Qt(l):l.fn=null))}catch(n){We(n,l,null,l.ctx)}}}function vn(){if(je=!1,Se>1001)return;const e=tt;tt=[],sn(e),je||(Se=0,Ye=null)}function ze(e){je||(je=!0,queueMicrotask(vn)),Ye=e;for(var t=e;t.parent!==null;){t=t.parent;var r=t.f;if((r&(ge|z))!==0){if((r&P)===0)return;t.f^=P}}tt.push(t)}function ar(e,t){var r=e.first,l=[];e:for(;r!==null;){var n=r.f,i=(n&z)!==0,a=i&&(n&P)!==0,v=r.next;if(!a&&(n&Y)===0)if((n&Oe)!==0){if(i)r.f^=P;else try{Ae(r)&&yt(r)}catch(u){We(u,r,null,r.ctx)}var s=r.first;if(s!==null){r=s;continue}}else(n&Rt)!==0&&l.push(r);if(v===null){let u=r.parent;for(;u!==null;){if(e===u)break e;var o=u.next;if(o!==null){r=o;continue e}u=u.parent}}r=v}for(var c=0;c<l.length;c++)s=l[c],t.push(s),ar(s,t)}function d(e){var t=e.f,r=(t&V)!==0;if(r&&(t&be)!==0){var l=Wt(e);return Gr(e),l}if(x!==null&&!Z){H!==null&&H.includes(e)&&Ar();var n=x.deps;e.rv<He&&(e.rv=He,M===null&&n!==null&&n[R]===e?R++:M===null?M=[e]:M.push(e))}else if(r&&e.deps===null&&e.effects===null){var i=e,a=i.parent;a!==null&&(a.f&K)===0&&(i.f^=K)}return r&&(i=e,Ae(i)&&zt(i)),e.v}function _n(e){return e&&d(e)}function re(e){var t=Z;try{return Z=!0,e()}finally{Z=t}}const dn=-7169;function $(e,t){e.f=e.f&dn|t}function pn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(de in e)rt(e);else if(!Array.isArray(e))for(let t in e){const r=e[t];typeof r=="object"&&r&&de in r&&rt(r)}}}function rt(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let l in e)try{rt(e[l],t)}catch{}const r=ft(e);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const l=Mt(r);for(let n in l){const i=l[n].get;if(i)try{i.call(e)}catch{}}}}}const hn=["touchstart","touchmove"];function gn(e){return hn.includes(e)}let Ot=!1;function mn(){Ot||(Ot=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const r of e.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function ur(e){var t=x,r=y;te(null),W(null);try{return e()}finally{te(t),W(r)}}function or(e,t,r,l=r){e.addEventListener(t,()=>ur(r));const n=e.__on_r;n?e.__on_r=()=>{n(),l(!0)}:e.__on_r=()=>l(!0),mn()}const fr=new Set,nt=new Set;function bn(e,t,r,l={}){function n(i){if(l.capture||Te.call(t,i),!i.cancelBubble)return ur(()=>r==null?void 0:r.call(this,i))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?rn(()=>{t.addEventListener(e,n,l)}):t.addEventListener(e,n,l),n}function sr(e,t,r,l,n){var i={capture:l,passive:n},a=bn(e,t,r,i);(t===document.body||t===window||t===document)&&Jr(()=>{t.removeEventListener(e,a,i)})}function wn(e){for(var t=0;t<e.length;t++)fr.add(e[t]);for(var r of nt)r(e)}function Te(e){var h;var t=this,r=t.ownerDocument,l=e.type,n=((h=e.composedPath)==null?void 0:h.call(e))||[],i=n[0]||e.target,a=0,v=e.__root;if(v){var s=n.indexOf(v);if(s!==-1&&(t===document||t===window)){e.__root=t;return}var o=n.indexOf(t);if(o===-1)return;s<=o&&(a=s)}if(i=n[a]||e.target,i!==t){pr(e,"currentTarget",{configurable:!0,get(){return i||r}});var c=x,u=y;te(null),W(null);try{for(var f,_=[];i!==null;){var p=i.assignedSlot||i.parentNode||i.host||null;try{var g=i["__"+l];if(g!==void 0&&!i.disabled)if(ut(g)){var[k,...D]=g;k.apply(i,[e,...D])}else g.call(i,e)}catch(S){f?_.push(S):f=S}if(e.cancelBubble||p===t||p===null)break;i=p}if(f){for(let S of _)queueMicrotask(()=>{throw S});throw f}}finally{e.__root=t,delete e.currentTarget,te(c),W(u)}}}function yn(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function lt(e,t){var r=y;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function ne(e,t){var r=(t&jr)!==0,l=(t&Yr)!==0,n,i=!e.startsWith("<!>");return()=>{n===void 0&&(n=yn(i?e:"<!>"+e),r||(n=Ue(n)));var a=l?document.importNode(n,!0):n.cloneNode(!0);if(r){var v=Ue(a),s=a.lastChild;lt(v,s)}else lt(a,a);return a}}function it(){var e=document.createDocumentFragment(),t=document.createComment(""),r=Ht();return e.append(t,r),lt(t,r),e}function B(e,t){e!==null&&e.before(t)}function Re(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=r==null?"":r+"")}function En(e,t){return xn(e,t)}const ce=new Map;function xn(e,{target:t,anchor:r,props:l={},events:n,context:i,intro:a=!0}){Kr();var v=new Set,s=u=>{for(var f=0;f<u.length;f++){var _=u[f];if(!v.has(_)){v.add(_);var p=gn(_);t.addEventListener(_,Te,{passive:p});var g=ce.get(_);g===void 0?(document.addEventListener(_,Te,{passive:p}),ce.set(_,1)):ce.set(_,g+1)}}};s(ot(fr)),nt.add(s);var o=void 0,c=Qr(()=>{var u=r??t.appendChild(Ht());return De(()=>{if(i){_t({});var f=T;f.c=i}n&&(l.$$events=n),o=e(u,l)||{},i&&dt()}),()=>{var p;for(var f of v){t.removeEventListener(f,Te);var _=ce.get(f);--_===0?(document.removeEventListener(f,Te),ce.delete(f)):ce.set(f,_)}nt.delete(s),u!==r&&((p=u.parentNode)==null||p.removeChild(u))}});return Tn.set(o,c),o}let Tn=new WeakMap;function ke(e,t,r=!1){var l=e,n=null,i=null,a=L,v=r?ct:0,s=!1;const o=(u,f=!0)=>{s=!0,c(f,u)},c=(u,f)=>{a!==(a=u)&&(a?(n?$e(n):f&&(n=De(()=>f(l))),i&&Ve(i,()=>{i=null})):(i?$e(i):f&&(i=De(()=>f(l))),n&&Ve(n,()=>{n=null})))};mt(()=>{s=!1,t(o),s||c(null,null)},v)}function kn(e,t){return t}function Sn(e,t,r,l){for(var n=[],i=t.length,a=0;a<i;a++)bt(t[a].e,n,!0);var v=i>0&&n.length===0&&r!==null;if(v){var s=r.parentNode;Wr(s),s.append(r),l.clear(),Q(e,t[0].prev,t[i-1].next)}er(n,()=>{for(var o=0;o<i;o++){var c=t[o];v||(l.delete(c.k),Q(e,c.prev,c.next)),ee(c.e,!v)}})}function Dn(e,t,r,l,n,i=null){var a=e,v={flags:t,items:new Map,first:null},s=null,o=!1,c=Kt(()=>{var u=r();return ut(u)?u:u==null?[]:ot(u)});mt(()=>{var u=d(c),f=u.length;if(!(o&&f===0)){o=f===0;{var _=x;In(u,v,a,n,t,(_.f&Y)!==0,l,r)}i!==null&&(f===0?s?$e(s):s=De(()=>i(a)):s!==null&&Ve(s,()=>{s=null})),d(c)}})}function In(e,t,r,l,n,i,a,v){var s=e.length,o=t.items,c=t.first,u=c,f,_=null,p=[],g=[],k,D,h,S;for(S=0;S<s;S+=1){if(k=e[S],D=a(k,S),h=o.get(D),h===void 0){var ue=u?u.e.nodes_start:r;_=Nn(ue,t,_,_===null?t.first:_.next,k,D,S,l,n,v),o.set(D,_),p=[],g=[],u=_.next;continue}if(On(h,k,S),(h.e.f&Y)!==0&&$e(h.e),h!==u){if(f!==void 0&&f.has(h)){if(p.length<g.length){var E=g[0],m;_=E.prev;var O=p[0],b=p[p.length-1];for(m=0;m<p.length;m+=1)Nt(p[m],E,r);for(m=0;m<g.length;m+=1)f.delete(g[m]);Q(t,O.prev,b.next),Q(t,_,O),Q(t,b,E),u=E,_=b,S-=1,p=[],g=[]}else f.delete(h),Nt(h,u,r),Q(t,h.prev,h.next),Q(t,h,_===null?t.first:_.next),Q(t,_,h),_=h;continue}for(p=[],g=[];u!==null&&u.k!==D;)(i||(u.e.f&Y)===0)&&(f??(f=new Set)).add(u),g.push(u),u=u.next;if(u===null)continue;h=u}p.push(h),_=h,u=h.next}if(u!==null||f!==void 0){for(var I=f===void 0?[]:ot(f);u!==null;)(i||(u.e.f&Y)===0)&&I.push(u),u=u.next;var q=I.length;if(q>0){var U=null;Sn(t,I,U,o)}}y.first=t.first&&t.first.e,y.last=_&&_.e}function On(e,t,r,l){Vt(e.v,t),e.i=r}function Nn(e,t,r,l,n,i,a,v,s,o){var c=(s&Mr)!==0,u=(s&Fr)===0,f=c?u?pt(n):F(n):n,_=(s&Rr)===0?a:F(a),p={i:_,v:f,k:i,a:null,e:null,prev:r,next:l};try{return p.e=De(()=>v(e,f,_,o),Hr),p.e.prev=r&&r.e,p.e.next=l&&l.e,r===null?t.first=p:(r.next=p,r.e.next=p.e),l!==null&&(l.prev=p,l.e.prev=p.e),p}finally{}}function Nt(e,t,r){for(var l=e.next?e.next.e.nodes_start:r,n=t?t.e.nodes_start:r,i=e.e.nodes_start;i!==l;){var a=Ke(i);n.before(i),i=a}}function Q(e,t,r){t===null?e.first=r:(t.next=r,t.e.next=r&&r.e),r!==null&&(r.prev=t,r.e.prev=t&&t.e)}function An(e,t,r,l,n){var v;var i=(v=t.$$slots)==null?void 0:v[r],a=!1;i===!0&&(i=t.children,a=!0),i===void 0||i(e,a?()=>l:l)}function Pn(e,t,r,l){var n=e.__attributes??(e.__attributes={});n[t]!==(n[t]=r)&&("__styles"in e&&(e.__styles={}),r==null?e.removeAttribute(t):typeof r!="string"&&Ln(e).includes(t)?e[t]=r:e.setAttribute(t,r))}var At=new Map;function Ln(e){var t=At.get(e.nodeName);if(t)return t;At.set(e.nodeName,t=[]);for(var r,l=e,n=Element.prototype;n!==l;){r=Mt(l);for(var i in r)r[i].set&&t.push(i);l=ft(l)}return t}function Pe(e,t,r=t){var l=Ne();or(e,"input",n=>{var i=n?e.defaultValue:e.value;if(i=Ze(e)?Je(i):i,r(i),l&&i!==(i=t())){var a=e.selectionStart,v=e.selectionEnd;e.value=i??"",v!==null&&(e.selectionStart=a,e.selectionEnd=Math.min(v,e.value.length))}}),re(t)==null&&e.value&&r(Ze(e)?Je(e.value):e.value),gt(()=>{var n=t();Ze(e)&&n===Je(e.value)||e.type==="date"&&!n&&!e.value||n!==e.value&&(e.value=n??"")})}function Cn(e,t,r=t){or(e,"change",l=>{var n=l?e.defaultChecked:e.checked;r(n)}),re(t)==null&&r(e.checked),gt(()=>{var l=t();e.checked=!!l})}function Ze(e){var t=e.type;return t==="number"||t==="range"}function Je(e){return e===""?null:+e}function Mn(e){return function(...t){var r=t[0];r.target===this&&(e==null||e.apply(this,t))}}function Rn(e){return function(...t){var r=t[0];return r.preventDefault(),e==null?void 0:e.apply(this,t)}}function Fn(e=!1){const t=T,r=t.l.u;if(!r)return;let l=()=>pn(t.s);if(e){let n=0,i={};const a=he(()=>{let v=!1;const s=t.s;for(const o in s)s[o]!==i[o]&&(i[o]=s[o],v=!0);return v&&n++,n});l=()=>d(a)}r.b.length&&Xr(()=>{Pt(t,l),Xe(r.b)}),Be(()=>{const n=re(()=>r.m.map(mr));return()=>{for(const i of n)typeof i=="function"&&i()}}),r.a.length&&Be(()=>{Pt(t,l),Xe(r.a)})}function Pt(e,t){if(e.l.s)for(const r of e.l.s)d(r);t()}let Le=!1;function qn(e){var t=Le;try{return Le=!1,[e(),Le]}finally{Le=t}}function Lt(e){for(var t=y,r=y;t!==null&&(t.f&(z|ge))===0;)t=t.parent;try{return W(t),e()}finally{W(r)}}function at(e,t,r,l){var O;var n=(r&qr)!==0,i=!we||(r&Ur)!==0,a=(r&Vr)!==0,v=(r&$r)!==0,s=!1,o;a?[o,s]=qn(()=>e[t]):o=e[t];var c=de in e||Er in e,u=a&&(((O=_e(e,t))==null?void 0:O.set)??(c&&t in e&&(b=>e[t]=b)))||void 0,f=l,_=!0,p=!1,g=()=>(p=!0,_&&(_=!1,v?f=re(l):f=l),f);o===void 0&&l!==void 0&&(u&&i&&Ir(),o=g(),u&&u(o));var k;if(i)k=()=>{var b=e[t];return b===void 0?g():(_=!0,p=!1,b)};else{var D=Lt(()=>(n?he:Kt)(()=>e[t]));D.f|=wr,k=()=>{var b=d(D);return b!==void 0&&(f=void 0),b===void 0?f:b}}if((r&Br)===0)return k;if(u){var h=e.$$legacy;return function(b,I){return arguments.length>0?((!i||!I||h||s)&&u(I?k():b),b):k()}}var S=!1,ue=!1,E=pt(o),m=Lt(()=>he(()=>{var b=k(),I=d(E);return S?(S=!1,ue=!0,I):(ue=!1,E.v=b)}));return n||(m.equals=vt),function(b,I){if(arguments.length>0){const q=I?d(m):i&&a?C(b):b;return m.equals(q)||(S=!0,w(E,q),p&&f!==void 0&&(f=q),re(()=>d(m))),b}return d(m)}}function cr(e){T===null&&Ut(),we&&T.l!==null?Bn(T).m.push(e):Be(()=>{const t=re(e);if(typeof t=="function")return t})}function Un(e){T===null&&Ut(),cr(()=>()=>re(e))}function Bn(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const Vn="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Vn);Cr();var $n=ne('<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div class="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6"><!></div></div>');function jn(e,t){let r=at(t,"show",12,!1);const l=()=>{r(!1)};var n=it(),i=ve(n);{var a=v=>{var s=$n(),o=N(s),c=N(o);An(c,t,"default",{}),sr("click",s,Mn(l)),B(v,s)};ke(i,v=>{r()&&v(a)})}B(e,n)}var Yn=ne('<h2 class="text-2xl font-semibold text-white mb-4"> </h2> <form id="event_create"><div class="space-y-4 container"><input type="text" placeholder="Event Name" class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg"> <textarea placeholder="Description" class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg max-h-48"></textarea> <input type="datetime-local" class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg"> <label class="flex items-center space-x-2 text-white cursor-pointer"><input type="checkbox" class="w-5 h-5 appearance-none bg-gray-800 border border-gray-600 rounded-full checked:bg-blue-500 checked:border-blue-500 focus:ring focus:ring-blue-500 transition"> <span class="text-gray-300">Use local time (e.g., New Year)</span></label> <input type="text" placeholder="Cover Image URL" class="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-lg"></div></form>',1);function Hn(e,t){_t(t,!1);let r=at(t,"saveEvent",8),l=at(t,"eventToEdit",8,null),n=Tt(l()?l():{id:-1,name:"",description:"",dateTime:new Date,isLocal:!1,coverImgUrl:""}),i=Tt(l()?l().isLocal?l().dateTime.toISOString().slice(0,16):new Date(l().dateTime.valueOf()-l().dateTime.getTimezoneOffset()*6e4).toISOString().slice(0,16):"");function a(){if(!d(n).name)return alert("Please enter a name");var h;if(d(n).isLocal?h=new Date(d(i)+"Z"):h=new Date(d(i)),isNaN(h.getTime()))return alert("Please enter a valid date");xe(n,d(n).dateTime=h),r()(d(n))}Fn();var v=Yn(),s=ve(v),o=N(s),c=A(s,2),u=N(c),f=N(u),_=A(f,2),p=A(_,2),g=A(p,2),k=N(g),D=A(g,2);Ce(()=>Re(o,l()?"Edit Event":"Create Event")),Pe(f,()=>d(n).name,h=>xe(n,d(n).name=h)),Pe(_,()=>d(n).description,h=>xe(n,d(n).description=h)),Pe(p,()=>d(i),h=>w(i,h)),Cn(k,()=>d(n).isLocal,h=>xe(n,d(n).isLocal=h)),Pe(D,()=>d(n).coverImgUrl,h=>xe(n,d(n).coverImgUrl=h)),sr("submit",c,Rn(a)),B(e,v),dt()}function Ct(e,t){w(t,!1)}function Kn(e,t,r,l){w(t,0),w(r,!0),w(l,null)}function Wn(e,t,r){w(t,!d(t)),d(t)||w(r,null)}function zn(e,t,r,l){d(t).splice(d(r),1),e.preventDefault(),w(l,!1)}var Gn=ne('<div class="absolute inset-0 bg-cover bg-center opacity-30"></div>'),Zn=ne('<div class="absolute top-2 right-2 flex space-x-2"><button class="bg-transparent border border-yellow-500 text-yellow-500 px-3 py-1 rounded-lg text-sm hover:bg-yellow-500 hover:text-black transition-all duration-200">✏ Edit</button> <button class="bg-transparent border border-red-500 text-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-500 hover:text-white transition-all duration-200">🗑 Delete</button></div>'),Jn=ne('<div class="relative w-full h-32 md:h-40 lg:h-52 flex items-center justify-center rounded-lg overflow-hidden shadow-lg transition-all duration-300 mb-2 last:mb-0 cursor-pointer" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));"><!> <div class="relative text-center text-white px-4"><h2 class="text-lg md:text-xl lg:text-2xl font-semibold tracking-wider"> </h2> <p class="text-2xl md:text-3xl lg:text-4xl font-bold mt-1"> </p></div> <!></div>'),Xn=ne('<!> <div class="flex justify-end mt-6"><button class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-2">Cancel</button> <button form="event_create" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save</button></div>',1),Qn=ne('<p>Are you sure you permanently want to delete this event?</p> <div class="flex justify-end mt-6"><button class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 mr-2">Cancel</button> <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Confirm</button></div>',1),el=ne('<main class="bg-gray-900"><div class="flex flex-col w-full min-h-screen main p-4"><div class="m-4 flex gap-4"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Event</button> <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"> </button></div> <!></div> <!></main>');function tl(e,t){_t(t,!0);let r=se(!1),l=se(!1),n=se(0),i=se(null),a=se(C([]));var v=se(C([]));function s(E){w(n,0),d(l)&&(w(i,C(E)),w(r,!0))}function o(E){d(a).includes(E)||(E.id=d(a).length+1,d(a).push(E)),w(i,null),w(r,!1)}function c(E){var m=E.getTime();let O=m-new Date().getTime();if(O<0)return"00:00:00:00";let b,I,q;return`${Math.floor(b=O/(1e3*60*60*24))}:${String(Math.floor(I=b%1*24)).padStart(2,"0")}:${String(Math.floor(q=I%1*60)).padStart(2,"0")}:${String(Math.floor(q%1*60)).padStart(2,"0")}`}let u;cr(()=>{const E=localStorage.getItem("events");E&&w(a,C(JSON.parse(E).map(m=>({...m,dateTime:new Date(m.dateTime)})))),w(v,C(d(a).map(m=>c(m.dateTime)))),u=setInterval(()=>{w(v,C(d(a).map(m=>{if(m.isLocal){let O=new Date(m.dateTime.getTime()+new Date().getTimezoneOffset()*60*1e3);return c(O)}return c(m.dateTime)})))},1e3)}),Un(()=>{clearInterval(u)}),Be(()=>{localStorage.setItem("events",JSON.stringify(d(a)))});function f(E){w(n,1),w(i,C(E)),w(r,!0)}var _=el(),p=N(_),g=N(p),k=N(g);k.__click=[Kn,n,r,i];var D=A(k,2);D.__click=[Wn,l,i];var h=N(D),S=A(g,2);Dn(S,17,()=>d(a),kn,(E,m,O)=>{var b=Jn();b.__click=()=>{s(O)};var I=N(b);{var q=j=>{var ie=Gn();Ce(()=>Pn(ie,"style",`background-image: url(${d(m).coverImgUrl??""})`)),B(j,ie)};ke(I,j=>{d(m).coverImgUrl&&j(q)})}var U=A(I,2),X=N(U),oe=N(X),Ee=A(X,2),le=N(Ee),fe=A(U,2);{var Ge=j=>{var ie=Zn(),vr=A(N(ie),2);vr.__click=_r=>{f(O),_r.stopPropagation()},B(j,ie)};ke(fe,j=>{d(l)&&j(Ge)})}Ce(()=>{Re(oe,d(m).name),Re(le,_n(v)[O])}),B(E,b)});var ue=A(p,2);jn(ue,{get show(){return d(r)},set show(E){w(r,C(E))},children:(E,m)=>{var O=it(),b=ve(O);{var I=U=>{var X=Xn(),oe=ve(X);const Ee=he(()=>d(i)!==null?d(a)[d(i)]:null);Hn(oe,{saveEvent:o,get eventToEdit(){return d(Ee)}});var le=A(oe,2),fe=N(le);fe.__click=[Ct,r],B(U,X)},q=U=>{var X=it(),oe=ve(X);{var Ee=le=>{var fe=Qn(),Ge=A(ve(fe),2),j=N(Ge);j.__click=[Ct,r];var ie=A(j,2);ie.__click=[zn,a,i,r],B(le,fe)};ke(oe,le=>{d(n)===1&&le(Ee)},!0)}B(U,X)};ke(b,U=>{d(n)===0?U(I):U(q,!1)})}B(E,O)},$$slots:{default:!0}}),Ce(()=>Re(h,d(l)?"Exit Edit Mode":"Edit Events")),B(e,_),dt()}wn(["click"]);En(tl,{target:document.getElementById("app")});
