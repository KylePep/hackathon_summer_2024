import{_ as s,o as t,d as e,E as a,k as o,a as c,c as n,f as i,q as l,t as r,s as d,G as u,H as f,F as g,y as b,P as v,A as y,l as m,z as p,B as h,p as w,h as B}from"./index-IIcxUakL.js";import"./phaser-Di_ahE-K.js";const x={setup(){t((()=>{s()}));const s=()=>{const s=document.querySelector("main");if(s){let t="/assets/towerbg4.jpeg";s.style.backgroundImage=`linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${t})`}};return t((()=>{!async function(){try{await b.getBosses()}catch(s){v.error(s.message)}}(),async function(){try{null!=y.activeBoss.id&&(m.log("[ActiveBossId]",y.activeBoss.id),await p.getBossDamageByBossId(y.activeBoss.id))}catch(s){v.error(s.message,"[]")}}()})),{account:e((()=>y.account)),activeBoss:e((()=>y.activeBoss)),bosses:e((()=>y.bosses)),user:e((()=>y.user)),account:e((()=>y.account)),async login(){a.loginWithPopup()},async logout(){a.logout({returnTo:window.location.origin})}}}},j=(s=>(w("data-v-4188165c"),s=s(),B(),s))((()=>i("section",{class:"row"},[i("div",{class:"col-12 text-center d-flex justify-content-center"},[i("h1",{class:"hero-title p-3"},[h("WORLD WAR "),i("br"),h(" DRAGON")])])],-1))),k={class:"row g-3"},A={class:"col-12 text-center d-flex justify-content-center"},I={class:"pt-5"},_={class:""},L={class:"col-2 offset-2 d-flex justify-content-center"},O={key:0,class:"col-4 d-flex justify-content-center"},G={key:1,class:"col-4 d-flex justify-content-center"},H={class:"col-2 d-flex justify-content-center"},R=s(x,[["render",function(s,t,e,a,b,v){const y=o("router-link");return c(),n(g,null,[j,i("section",k,[i("div",A,[i("div",{class:"boss-dragon-img border border-2 border-light rounded d-flex flex-column justify-content-end",style:l({backgroundImage:`url(${a.activeBoss.image})`})},[i("div",I,[i("h1",null,r(a.activeBoss.name),1),i("h2",_,r(Math.round(a.activeBoss.hp-a.activeBoss.damages)),1)])],4)]),i("div",L,[d(y,{to:{name:"Map"},class:"btn fight-btn w-100 p-3 fs-2 fw-bold"},{default:u((()=>[h("Map")])),_:1})]),a.account.id?(c(),n("div",O,[d(y,{to:{name:"Game"},class:"btn fight-btn p-3 fs-1 w-100 fw-bold"},{default:u((()=>[h("JOIN THE FIGHT!")])),_:1})])):(c(),n("div",G,[a.user.isAuthenticated?f("",!0):(c(),n("div",{key:0,class:"btn fight-btn p-3 fs-1 w-100 fw-bold",onClick:t[0]||(t[0]=(...s)=>a.login&&a.login(...s))}," Login "))])),i("div",H,[d(y,{to:{name:"Score"},class:"btn fight-btn p-3 fs-2 w-100 fw-bold"},{default:u((()=>[h("HALL OF VALOR")])),_:1})])])],64)}],["__scopeId","data-v-4188165c"]]);export{R as default};
