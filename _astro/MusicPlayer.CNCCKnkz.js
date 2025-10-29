import{o as La,b as $a,i as Sa,s as K,e as yt,a as rt}from"./props.BIqOeSmI.js";import{a7 as Ta,a9 as Ma,aG as za,aH as Fa,aI as je,u as Ie,aJ as Ca,aK as Pe,aL as Ra,a0 as Ae,aM as Lt,y as ja,aN as Ia,j as $t,k as ft,a as g,p as Pa,b as Aa,h as d,m as h,ag as Y,i as t,f as j,s as f,c as n,r as o,as as Da,t as V,n as E}from"./utils.Dz2-P1bk.js";import{a as Ba,s as vt}from"./render.oMja4WSi.js";import{i as x}from"./if.Cz6evc8H.js";import{e as Wa,i as Na}from"./each.BqdvynzR.js";import{I as _}from"./Icon.3f_6lMYM.js";import{I as Oa}from"./zh_TW.B9ptEsWo.js";import{i as Ya}from"./translation.CKr36XrM.js";import"./navBarConfig.CSIOJtca.js";const Ha=()=>performance.now(),lt={tick:l=>requestAnimationFrame(l),now:()=>Ha(),tasks:new Set};function De(){const l=lt.now();lt.tasks.forEach(i=>{i.c(l)||(lt.tasks.delete(i),i.f())}),lt.tasks.size!==0&&lt.tick(De)}function Ua(l){let i;return lt.tasks.size===0&&lt.tick(De),{promise:new Promise(u=>{lt.tasks.add(i={c:l,f:u})}),abort(){lt.tasks.delete(i)}}}function Wt(l,i){Pe(()=>{l.dispatchEvent(new CustomEvent(i))})}function qa(l){if(l==="float")return"cssFloat";if(l==="offset")return"cssOffset";if(l.startsWith("--"))return l;const i=l.split("-");return i.length===1?i[0]:i[0]+i.slice(1).map(u=>u[0].toUpperCase()+u.slice(1)).join("")}function Fe(l){const i={},u=l.split(";");for(const L of u){const[y,v]=L.split(":");if(!y||v===void 0)break;const P=qa(y.trim());i[P]=v.trim()}return i}const Ka=l=>l;function Va(l,i,u,L){var y=(l&Ca)!==0,v="both",P,X=i.inert,dt=i.style.overflow,w,$;function G(){return Pe(()=>P??=u()(i,L?.()??{},{direction:v}))}var J={is_global:y,in(){i.inert=X,Wt(i,"introstart"),w=ee(i,G(),$,1,()=>{Wt(i,"introend"),w?.abort(),w=P=void 0,i.style.overflow=dt})},out(U){i.inert=!0,Wt(i,"outrostart"),$=ee(i,G(),w,0,()=>{Wt(i,"outroend"),U?.()})},stop:()=>{w?.abort(),$?.abort()}},Q=Ta;if((Q.transitions??=[]).push(J),Ba){var H=y;if(!H){for(var b=Q.parent;b&&(b.f&Ma)!==0;)for(;(b=b.parent)&&(b.f&za)===0;);H=!b||(b.f&Fa)!==0}H&&je(()=>{Ie(()=>J.in())})}}function ee(l,i,u,L,y){var v=L===1;if(Ra(i)){var P,X=!1;return Ae(()=>{if(!X){var U=i({direction:v?"in":"out"});P=ee(l,U,u,L,y)}}),{abort:()=>{X=!0,P?.abort()},deactivate:()=>P.deactivate(),reset:()=>P.reset(),t:()=>P.t()}}if(u?.deactivate(),!i?.duration)return y(),{abort:Lt,deactivate:Lt,reset:Lt,t:()=>L};const{delay:dt=0,css:w,tick:$,easing:G=Ka}=i;var J=[];if(v&&u===void 0&&($&&$(0,1),w)){var Q=Fe(w(0,1));J.push(Q,Q)}var H=()=>1-L,b=l.animate(J,{duration:dt,fill:"forwards"});return b.onfinish=()=>{b.cancel();var U=u?.t()??1-L;u?.abort();var S=L-U,pt=i.duration*Math.abs(S),I=[];if(pt>0){var it=!1;if(w)for(var tt=Math.ceil(pt/16.666666666666668),et=0;et<=tt;et+=1){var at=U+S*G(et/tt),A=Fe(w(at,1-at));I.push(A),it||=A.overflow==="hidden"}it&&(l.style.overflow="hidden"),H=()=>{var B=b.currentTime;return U+S*G(B/pt)},$&&Ua(()=>{if(b.playState!=="running")return!1;var B=H();return $(B,1-B),!0})}b=l.animate(I,{duration:pt,fill:"forwards"}),b.onfinish=()=>{H=()=>L,$?.(L,1-L),y()}},{abort:()=>{b&&(b.cancel(),b.effect=null,b.onfinish=Lt)},deactivate:()=>{y=Lt},reset:()=>{L===0&&$?.(1,0)},t:()=>H()}}function Ce(l,i){return l===i||l?.[Ia]===i}function Re(l={},i,u,L){return je(()=>{var y,v;return ja(()=>{y=v,v=[],Ie(()=>{l!==u(...v)&&(i(l,...v),y&&Ce(u(...y),l)&&i(null,...y))})}),()=>{Ae(()=>{v&&Ce(u(...v),l)&&i(null,...v)})}}),l}function Xa(l){const i=l-1;return i*i*i+1}function Ga(l,{delay:i=0,duration:u=400,easing:L=Xa,axis:y="y"}={}){const v=getComputedStyle(l),P=+v.opacity,X=y==="y"?"height":"width",dt=parseFloat(v[X]),w=y==="y"?["top","bottom"]:["left","right"],$=w.map(S=>`${S[0].toUpperCase()}${S.slice(1)}`),G=parseFloat(v[`padding${$[0]}`]),J=parseFloat(v[`padding${$[1]}`]),Q=parseFloat(v[`margin${$[0]}`]),H=parseFloat(v[`margin${$[1]}`]),b=parseFloat(v[`border${$[0]}Width`]),U=parseFloat(v[`border${$[1]}Width`]);return{delay:i,duration:u,easing:L,css:S=>`overflow: hidden;opacity: ${Math.min(S*20,1)*P};${X}: ${S*dt}px;padding-${w[0]}: ${S*G}px;padding-${w[1]}: ${S*J}px;margin-${w[0]}: ${S*Q}px;margin-${w[1]}: ${S*H}px;border-${w[0]}-width: ${S*b}px;border-${w[1]}-width: ${S*U}px;min-${X}: 0`}}const Ja={local:{playlist:[{id:1,title:"使一颗心免于哀伤",artist:"知更鸟 / HOYO-MiX / Chevy",cover:"/assets/music/cover/109951169585655912.jpg",url:"/assets/music/使一颗心免于哀伤-哼唱.wav",duration:240}]},behavior:{defaultVolume:.7,defaultShuffle:!0,defaultRepeat:2,position:{bottom:16,right:16}},ui:{animation:{coverRotation:{enable:!0,speed:3}},playlist:{maxHeight:384,width:320}},responsive:{mobile:{position:{bottom:24,right:8}}},errorHandling:{errorDisplayDuration:3e3}};var Qa=j('<div class="fixed bottom-20 right-4 z-[60] max-w-sm"><div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up"><!> <span class="text-sm flex-1"> </span> <button class="text-white/80 hover:text-white transition-colors"><!></button></div></div>'),Za=j("<img/>"),tr=j('<div class="w-full h-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/70 flex items-center justify-center"><!></div>'),er=j('<div class="absolute inset-0 bg-black/20 flex items-center justify-center"><div class="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center"><div class="w-2 h-2 bg-[var(--primary)] rounded-full"></div></div></div>'),ar=j("<button><!></button>"),rr=j('<button class="btn-plain w-10 h-10 rounded-lg"><!></button>'),ir=j('<button class="btn-plain w-10 h-10 rounded-lg"><!></button>'),or=j("<button><!></button>"),nr=j('<button class="btn-plain w-8 h-8 rounded-lg"><!></button> <div class="flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="音量控制" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div>',1),sr=j("<button><!></button>"),lr=j('<span class="text-sm text-[var(--content-meta)]"></span>'),dr=j('<div class="w-6 h-6 flex items-center justify-center"><!></div>'),cr=j('<span class="ml-2"> </span>'),ur=j('<div role="button" tabindex="0"><!> <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0"><img class="w-full h-full object-cover"/></div> <div class="flex-1 min-w-0"><div> </div> <div> <!></div></div></div>'),vr=j('<div class="playlist-panel float-panel fixed bottom-20 right-4 overflow-hidden z-50"><div class="playlist-header flex items-center justify-between p-4 border-b border-[var(--line-divider)]"><h3 class="text-lg font-semibold text-90"> </h3> <button class="btn-plain w-8 h-8 rounded-lg"><!></button></div> <div class="playlist-content overflow-y-auto max-h-80 scrollbar-custom"></div></div>'),fr=j(`<!> <div><div style="width: 90px; height: 80px; background-color: var(--card-bg); "><div class="flex items-center gap-2 h-full"><div class="cover-container relative w-12 h-12 rounded-full overflow-hidden cursor-pointer flex-shrink-0" tabindex="0" role="button"><!> <!></div> <button class="expand-btn w-8 h-8 rounded-full btn-regular border border-[var(--line-divider)] hover:border-[var(--primary)] active:scale-95 transition-all duration-200 flex items-center justify-center flex-shrink-0" tabindex="0" aria-label="展开音乐播放器"><!></button></div></div> <div style="width: 320px; background-color: var(--card-bg);"><div class="flex items-center gap-4 mb-4"><div class="cover-container relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><img alt="封面"/></div> <div class="flex-1 min-w-0"><div class="song-title text-lg font-bold text-90 truncate mb-1"> </div> <div class="song-artist text-sm text-50 truncate"> </div> <div class="text-xs text-30 mt-1"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div> <div class="progress-section mb-4"><div class="progress-bar flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="播放进度" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div></div> <div class="controls flex items-center justify-center gap-2 mb-4"><!> <!> <button><!></button> <!> <!></div> <div class="bottom-controls flex items-center gap-2"><!> <!></div></div> <!></div> <style>@keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes musicWave {
        0%, 100% { transform: scaleY(0.5); }
        50% { transform: scaleY(1); }
    }
    .music-player.collapsed-mode {
        width: 96px;
        height: 80px;
    }
    .music-player {
        max-width: 320px;
        -webkit-user-select: none;
           -moz-user-select: none;
                user-select: none;
    }
    .expanded-player {
        width: 320px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .collapsed-player {
        position: absolute;
        bottom: 0;
        right: 0;
        backdrop-filter: blur(12px);
        border: 1px solid var(--line-divider) !important;
    }
    .expanded-player {
        border: 1px solid var(--line-divider) !important;
    }
    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
    .progress-section div:hover,
    .bottom-controls > div:hover {
        transform: scaleY(1.2);
        transition: transform 0.2s ease;
    }
    @media (max-width: 768px) {
        .music-player {
            max-width: 280px;
            /*left: 8px !important;*/
            bottom: 8px !important;
            right: 8px !important;
        }
        .music-player.expanded {
            width: calc(100vw - 16px);
            max-width: none;
            /*left: 8px !important;*/
            right: 8px !important;
        }
        .playlist-panel {
            width: calc(100vw - 16px) !important;
            /*left: 8px !important;*/
            right: 8px !important;
            max-width: none;
        }
        .controls {
            gap: 8px;
        }
        .controls button {
            width: 36px;
            height: 36px;
        }
        .controls button:nth-child(3) {
            width: 44px;
            height: 44px;
        }
    }
    @media (max-width: 480px) {
        .music-player {
            max-width: 260px;
        }
        .song-title {
            font-size: 14px;
        }
        .song-artist {
            font-size: 12px;
        }
        .controls {
            gap: 6px;
            margin-bottom: 12px;
        }
        .controls button {
            width: 32px;
            height: 32px;
        }
        .controls button:nth-child(3) {
            width: 40px;
            height: 40px;
        }
        .playlist-item {
            padding: 8px 12px;
        }
        .playlist-item .w-10 {
            width: 32px;
            height: 32px;
        }
    }
    @keyframes slide-up {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    .animate-slide-up {
        animation: slide-up 0.3s ease-out;
    }
    @media (hover: none) and (pointer: coarse) {
        .music-player button,
        .playlist-item {
            min-height: 44px;
        }
        .progress-section > div,
        .bottom-controls > div:nth-child(2) {
            height: 12px;
        }
    }
    /* 自定义旋转动画，停止时保持当前位置 */
    @keyframes spin-continuous {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .cover-container img {
        animation: spin-continuous 3s linear infinite;
        animation-play-state: paused;
    }
    .cover-container img.spinning {
        animation-play-state: running;
    }
    .cover-container img:hover {
        animation-play-state: var(--rotation-pause-hover, running);
    }
    /* 让主题色按钮更有视觉反馈 */
    button.bg-\\[var\\(--primary\\)\\] {
        box-shadow: 0 0 0 2px var(--primary);
        border: none;
    }
    /* 播放列表自定义滚动条样式 */
    .scrollbar-custom {
        scrollbar-width: thin;
        scrollbar-color: rgba(156, 163, 175, 0.3) transparent;
    }
    .scrollbar-custom::-webkit-scrollbar {
        width: 6px;
    }
    .scrollbar-custom::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 3px;
    }
    .scrollbar-custom::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.3);
        border-radius: 3px;
        -webkit-transition: background-color 0.2s ease;
        transition: background-color 0.2s ease;
    }
    .scrollbar-custom::-webkit-scrollbar-thumb:hover {
        background-color: rgba(156, 163, 175, 0.5);
    }
    .scrollbar-custom::-webkit-scrollbar-thumb:active {
        background-color: rgba(156, 163, 175, 0.7);
    }
    /* 暗色模式下的滚动条样式 */
    :global(.dark) .scrollbar-custom {
        scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }
    :global(.dark) .scrollbar-custom::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
    }
    :global(.dark) .scrollbar-custom::-webkit-scrollbar-thumb:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }
    :global(.dark) .scrollbar-custom::-webkit-scrollbar-thumb:active {
        background-color: rgba(255, 255, 255, 0.4);
    }</style>`,1);function kr(l,i){Aa(i,!1);const u=Ja;let L=u.local?.playlist??[],y=u.behavior?.defaultVolume,v=u.behavior?.defaultShuffle,P=u.behavior?.defaultRepeat,X=u.behavior?.position?.bottom,dt=u.behavior?.position?.right,w=u.responsive?.mobile?.position?.bottom,$=u.responsive?.mobile?.position?.right,G=h(X),J=h(dt);function Q(){typeof window>"u"||(window.innerWidth<=768?(d(G,w),d(J,$)):(d(G,X),d(J,dt)))}let H=u.ui?.playlist?.maxHeight,b=u.ui?.playlist?.width,U=u.ui?.animation?.coverRotation?.enable,S=u.ui?.animation?.coverRotation?.speed,pt=u.errorHandling?.errorDisplayDuration,I=h(!1),it=h(!1),tt=h(!0),et=h(!1),at=h(0),A=h(0),B=h(y),mt=h(!1),q=h(!1),ct=h(v),ot=h(P),ae=h(""),St=h(!1),C=h({title:"Loading ...",artist:"Loading ...",cover:"",url:"",duration:0}),p=h([]),T=h(0),r=h(),wt=h(),Tt=h();function Nt(){!t(r)||!t(C).url||(t(I)?t(r).pause():t(r).play())}function Ot(){d(tt,!t(tt)),t(tt)?(d(it,!1),d(et,!1)):(d(it,!0),d(et,!1))}function re(){d(et,!t(et))}function Be(){d(ct,!t(ct))}function We(){d(ot,(t(ot)+1)%3)}function Ne(){if(t(p).length===0)return;const s=t(T)>0?t(T)-1:t(p).length-1;zt(s)}function Mt(){if(t(p).length===0)return;let s;if(t(ct))do s=Math.floor(Math.random()*t(p).length);while(s===t(T)&&t(p).length>1);else s=t(T)<t(p).length-1?t(T)+1:0;console.log("nextSong 调用",{currentIndex:t(T),newIndex:s,playlistLength:t(p).length,isShuffled:t(ct)}),zt(s)}function zt(s){if(s<0||s>=t(p).length)return;const W=t(I);d(T,s),t(r)&&t(r).pause(),ie(t(p)[t(T)]),(W||!t(I))&&setTimeout(()=>{t(r)&&(t(r).readyState>=2?t(r).play().catch(()=>{}):t(r).addEventListener("canplay",()=>{t(r).play().catch(()=>{})},{once:!0}))},100)}function Ft(s){return s.startsWith("http://")||s.startsWith("https://")?s:s.startsWith("/")?"/"+s.substring(1):"/"+s}function ie(s){!s||!t(r)||(d(C,{...s}),t(C).cover||Y(C,t(C).cover="/favicon/favicon-light-192.png"),s.url?(d(q,!0),t(r).pause(),Y(r,t(r).currentTime=0),d(at,0),d(A,s.duration??0),t(r).removeEventListener("loadeddata",oe),t(r).removeEventListener("error",ne),t(r).removeEventListener("loadstart",se),t(r).addEventListener("loadeddata",oe,{once:!0}),t(r).addEventListener("error",ne,{once:!0}),t(r).addEventListener("loadstart",se,{once:!0}),Y(r,t(r).src=Ft(s.url)),t(r).load()):d(q,!1))}function oe(){d(q,!1),t(r)?.duration&&t(r).duration>1&&(d(A,Math.floor(t(r).duration)),t(p)[t(T)]&&Y(p,t(p)[t(T)].duration=t(A)),Y(C,t(C).duration=t(A)))}function ne(s){d(q,!1),Yt(`无法播放 "${t(C).title}"，正在尝试下一首...`),t(p).length>1?setTimeout(()=>Mt(),1e3):t(p).length<=1&&Yt("播放列表中没有可用的歌曲")}function se(){}function Yt(s){d(ae,s),d(St,!0),setTimeout(()=>{d(St,!1)},pt)}function Oe(){d(St,!1)}function Ye(s){if(!t(r)||!t(wt))return;const W=t(wt).getBoundingClientRect(),Ct=(s.clientX-W.left)/W.width*t(A);Y(r,t(r).currentTime=Ct),d(at,Ct)}function He(s){if(!t(r)||!t(Tt))return;const W=t(Tt).getBoundingClientRect(),ut=Math.max(0,Math.min(1,(s.clientX-W.left)/W.width));d(B,ut),Y(r,t(r).volume=t(B)),d(mt,t(B)===0)}function le(){t(r)&&(d(mt,!t(mt)),Y(r,t(r).muted=t(mt)))}function Ht(s){if(!Number.isFinite(s)||s<0)return"0:00";const W=Math.floor(s/60),ut=Math.floor(s%60);return`${W}:${ut.toString().padStart(2,"0")}`}function Ue(){t(r)&&(t(r).addEventListener("play",()=>{d(I,!0)}),t(r).addEventListener("pause",()=>{d(I,!1)}),t(r).addEventListener("timeupdate",()=>{d(at,t(r).currentTime)}),t(r).addEventListener("ended",()=>{console.log("歌曲播放结束",{isRepeating:t(ot),currentIndex:t(T),playlistLength:t(p).length,isShuffled:t(ct)}),t(ot)===1?(console.log("单曲循环：重新播放当前歌曲"),Y(r,t(r).currentTime=0),t(r).play().catch(()=>{})):t(ot)===2?(console.log("列表循环：播放下一首"),Mt()):t(T)<t(p).length-1||t(ct)?(console.log("非循环模式：播放下一首"),Mt()):(console.log("非循环模式：播放列表结束，停止播放"),d(I,!1))}),t(r).addEventListener("error",s=>{d(q,!1)}),t(r).addEventListener("stalled",()=>{}),t(r).addEventListener("waiting",()=>{}))}La(()=>{d(r,new Audio),Y(r,t(r).volume=t(B)),Y(r,t(r).muted=t(mt)),Ue(),Q(),typeof window<"u"&&window.addEventListener("resize",Q),d(p,[...L]),t(p).length>0?ie(t(p)[0]):Yt("本地播放列表为空")}),$a(()=>{t(r)&&(t(r).pause(),Y(r,t(r).src="")),typeof window<"u"&&window.removeEventListener("resize",Q)}),Sa();var de=$t(),qe=ft(de);{var Ke=s=>{var W=fr(),ut=ft(W);{var Ct=e=>{var a=Qa(),c=n(a),k=n(c);_(k,{icon:"material-symbols:error",class:"text-xl flex-shrink-0"});var M=f(k,2),F=n(M,!0);o(M);var m=f(M,2),Z=n(m);_(Z,{icon:"material-symbols:close",class:"text-lg"}),o(m),o(c),o(a),V(()=>vt(F,t(ae))),E("click",m,Oe),g(e,a)};x(ut,e=>{t(St)&&e(Ct)})}var Rt=f(ut,2);let ce;var jt=n(Rt);let ue;var ve=n(jt),bt=n(ve),fe=n(bt);{var Ve=e=>{var a=Za();let c;V((k,M)=>{rt(a,"src",k),rt(a,"alt",`${t(C).title??""} - ${t(C).artist??""}`),c=K(a,1,"w-full h-full object-cover transition-transform duration-300",null,c,M),yt(a,`animation-duration: ${S}s;`)},[()=>Ft(t(C).cover),()=>({spinning:t(I)&&!t(q)&&U,"animate-pulse":t(q)})]),g(e,a)},Xe=e=>{var a=tr(),c=n(a);_(c,{icon:"fa6-solid:music",class:"text-white text-lg"}),o(a),g(e,a)};x(fe,e=>{t(C).cover?e(Ve):e(Xe,!1)})}var Ge=f(fe,2);{var Je=e=>{var a=er();g(e,a)};x(Ge,e=>{t(I)&&e(Je)})}o(bt);var It=f(bt,2),Qe=n(It);_(Qe,{icon:"fa6-solid:chevron-left",class:"text-[var(--primary)] text-sm"}),o(It),o(ve),o(jt);var Pt=f(jt,2);let pe;var Ut=n(Pt),At=n(Ut),qt=n(At);let me;o(At);var Kt=f(At,2),Vt=n(Kt),Ze=n(Vt,!0);o(Vt);var Xt=f(Vt,2),ta=n(Xt,!0);o(Xt);var be=f(Xt,2),ea=n(be);o(be),o(Kt);var ge=f(Kt,2),Gt=n(ge),aa=n(Gt);_(aa,{icon:"material-symbols:expand-more",class:"text-lg"}),o(Gt),o(ge),o(Ut);var Jt=f(Ut,2),gt=n(Jt),ra=n(gt);o(gt),Re(gt,e=>d(wt,e),()=>t(wt)),o(Jt);var Qt=f(Jt,2),he=n(Qt);{var ia=e=>{var a=ar();let c;var k=n(a);_(k,{icon:"material-symbols:shuffle",class:"text-lg"}),o(a),V(M=>{c=K(a,1,"w-10 h-10 rounded-lg",null,c,M),a.disabled=t(p).length<=1},[()=>({"btn-regular":t(ct),"btn-plain":!t(ct)})]),E("click",a,Be),g(e,a)};x(he,e=>{e(ia)})}var xe=f(he,2);{var oa=e=>{var a=rr(),c=n(a);_(c,{icon:"material-symbols:skip-previous",class:"text-xl"}),o(a),V(()=>a.disabled=t(p).length<=1),E("click",a,Ne),g(e,a)};x(xe,e=>{e(oa)})}var ht=f(xe,2);let _e;var na=n(ht);{var sa=e=>{_(e,{icon:"eos-icons:loading",class:"text-xl"})},la=e=>{var a=$t(),c=ft(a);{var k=F=>{_(F,{icon:"material-symbols:pause",class:"text-xl"})},M=F=>{_(F,{icon:"material-symbols:play-arrow",class:"text-xl"})};x(c,F=>{t(I)?F(k):F(M,!1)},!0)}g(e,a)};x(na,e=>{t(q)?e(sa):e(la,!1)})}o(ht);var ye=f(ht,2);{var da=e=>{var a=ir(),c=n(a);_(c,{icon:"material-symbols:skip-next",class:"text-xl"}),o(a),V(()=>a.disabled=t(p).length<=1),E("click",a,Mt),g(e,a)};x(ye,e=>{e(da)})}var ca=f(ye,2);{var ua=e=>{var a=or();let c;var k=n(a);{var M=m=>{_(m,{icon:"material-symbols:repeat-one",class:"text-lg"})},F=m=>{var Z=$t(),z=ft(Z);{var N=R=>{_(R,{icon:"material-symbols:repeat",class:"text-lg"})},D=R=>{_(R,{icon:"material-symbols:repeat",class:"text-lg opacity-50"})};x(z,R=>{t(ot)===2?R(N):R(D,!1)},!0)}g(m,Z)};x(k,m=>{t(ot)===1?m(M):m(F,!1)})}o(a),V(m=>c=K(a,1,"w-10 h-10 rounded-lg",null,c,m),[()=>({"btn-regular":t(ot)>0,"btn-plain":t(ot)===0})]),E("click",a,We),g(e,a)};x(ca,e=>{e(ua)})}o(Qt);var we=f(Qt,2),ke=n(we);{var va=e=>{var a=nr(),c=ft(a),k=n(c);{var M=z=>{_(z,{icon:"material-symbols:volume-off",class:"text-lg"})},F=z=>{var N=$t(),D=ft(N);{var R=nt=>{_(nt,{icon:"material-symbols:volume-down",class:"text-lg"})},Dt=nt=>{_(nt,{icon:"material-symbols:volume-up",class:"text-lg"})};x(D,nt=>{t(B)<.5?nt(R):nt(Dt,!1)},!0)}g(z,N)};x(k,z=>{t(mt)||t(B)===0?z(M):z(F,!1)})}o(c);var m=f(c,2),Z=n(m);o(m),Re(m,z=>d(Tt,z),()=>t(Tt)),V(()=>{rt(m,"aria-valuenow",t(B)*100),yt(Z,`width: ${t(B)*100}%`)}),E("click",c,le),E("click",m,He),E("keydown",m,z=>{(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),z.key==="Enter"&&le())}),g(e,a)};x(ke,e=>{e(va)})}var fa=f(ke,2);{var pa=e=>{var a=sr();let c;var k=n(a);_(k,{icon:"material-symbols:queue-music",class:"text-lg"}),o(a),V(M=>c=K(a,1,"btn-plain w-8 h-8 rounded-lg",null,c,M),[()=>({"text-[var(--primary)]":t(et)})]),E("click",a,re),g(e,a)};x(fa,e=>{e(pa)})}o(we),o(Pt);var ma=f(Pt,2);{var ba=e=>{var a=vr(),c=n(a),k=n(c),M=n(k,!0);o(k);var F=f(k,2),m=n(F);_(m,{icon:"material-symbols:close",class:"text-lg"}),o(F),o(c);var Z=f(c,2);Wa(Z,5,()=>t(p),Na,(z,N,D)=>{var R=ur();let Dt;var nt=n(R);{var ga=O=>{var st=dr(),kt=n(st);{var Et=xt=>{_(xt,{icon:"material-symbols:graphic-eq",class:"text-[var(--primary)] animate-pulse"})},ya=xt=>{var Me=$t(),wa=ft(Me);{var ka=_t=>{_(_t,{icon:"material-symbols:pause",class:"text-[var(--primary)]"})},Ea=_t=>{var ze=lr();ze.textContent=D+1,g(_t,ze)};x(wa,_t=>{D===t(T)?_t(ka):_t(Ea,!1)},!0)}g(xt,Me)};x(kt,xt=>{D===t(T)&&t(I)?xt(Et):xt(ya,!1)})}o(st),g(O,st)};x(nt,O=>{O(ga)})}var Zt=f(nt,2),Ee=n(Zt);o(Zt);var Le=f(Zt,2),Bt=n(Le);let $e;var ha=n(Bt,!0);o(Bt);var te=f(Bt,2);let Se;var Te=n(te),xa=f(Te);{var _a=O=>{var st=cr(),kt=n(st);o(st),V(Et=>vt(kt,`(${Et??""})`),[()=>Ht(t(N).duration)]),g(O,st)};x(xa,O=>{t(N).duration>0&&O(_a)})}o(te),o(Le),o(R),V((O,st,kt,Et)=>{Dt=K(R,1,"playlist-item flex items-center gap-3 p-3 hover:bg-[var(--btn-plain-bg-hover)] cursor-pointer transition-colors",null,Dt,O),rt(R,"aria-label",`播放 ${t(N).title??""} - ${t(N).artist??""}`),rt(Ee,"src",st),rt(Ee,"alt",t(N).title),$e=K(Bt,1,"font-medium truncate",null,$e,kt),vt(ha,t(N).title),Se=K(te,1,"text-sm text-[var(--content-meta)] truncate",null,Se,Et),vt(Te,`${t(N).artist??""} `)},[()=>({"bg-[var(--btn-plain-bg)]":D===t(T),"text-[var(--primary)]":D===t(T)}),()=>Ft(t(N).cover),()=>({"text-[var(--primary)]":D===t(T),"text-90":D!==t(T)}),()=>({"text-[var(--primary)]":D===t(T)})]),E("click",R,()=>zt(D)),E("keydown",R,O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),zt(D))}),g(z,R)}),o(Z),o(a),V(z=>{yt(a,`width: ${b}px; max-height: ${H}px;`),vt(M,z)},[()=>Ya(Oa.playlist)]),E("click",F,re),Va(3,a,()=>Ga,()=>({duration:300,axis:"y"})),g(e,a)};x(ma,e=>{t(et)&&e(ba)})}o(Rt),Da(2),V((e,a,c,k,M,F,m,Z)=>{ce=K(Rt,1,"music-player fixed z-[1001] transition-all duration-300 ease-in-out",null,ce,e),yt(Rt,`bottom: ${t(G)??""}px; right: ${t(J)??""}px; --rotation-speed: ${S}s; --rotation-pause-hover: paused;`),ue=K(jt,1,"collapsed-player card-base bg-[var(--float-panel-bg)] dark:bg-zinc-800/90 dark:backdrop-blur-md dark:border dark:border-zinc-700/50 rounded-2xl p-3 transition-all duration-500 ease-in-out",null,ue,a),rt(bt,"aria-label",t(I)?"暂停音乐":"播放音乐"),pe=K(Pt,1,"expanded-player card-base bg-[var(--float-panel-bg)] dark:bg-zinc-800/90 dark:backdrop-blur-md dark:border dark:border-zinc-700/50 rounded-2xl p-4 transition-all duration-500 ease-in-out",null,pe,c),rt(At,"title",`${t(C).title??""} - ${t(C).artist??""}`),rt(qt,"src",k),me=K(qt,1,"w-full h-full object-cover transition-transform duration-300",null,me,M),yt(qt,`animation-duration: ${S}s;`),vt(Ze,t(C).title),vt(ta,t(C).artist),vt(ea,`${F??""} / ${m??""}`),rt(gt,"aria-valuenow",t(A)>0?t(at)/t(A)*100:0),yt(ra,`width: ${t(A)>0?t(at)/t(A)*100:0}%`),_e=K(ht,1,"btn-regular w-12 h-12 rounded-full",null,_e,Z),ht.disabled=t(q)},[()=>({expanded:t(it),"collapsed-mode":t(tt)}),()=>({"opacity-0":!t(tt),"scale-95":!t(tt),"pointer-events-none":!t(tt)}),()=>({"opacity-0":!t(it),"scale-95":!t(it),"pointer-events-none":!t(it)}),()=>Ft(t(C).cover),()=>({spinning:t(I)&&!t(q)&&U,"animate-pulse":t(q)}),()=>Ht(t(at)),()=>Ht(t(A)),()=>({"opacity-50":t(q)})]),E("click",bt,Nt),E("keydown",bt,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Nt())}),E("click",It,Ot),E("keydown",It,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Ot())}),E("click",Gt,Ot),E("click",gt,Ye),E("keydown",gt,e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault(),t(wt).getBoundingClientRect();const c=.5*t(A);t(r)&&(Y(r,t(r).currentTime=c),d(at,c))}}),E("click",ht,Nt),g(s,W)};x(qe,s=>{s(Ke)})}g(l,de),Pa()}export{kr as default};
