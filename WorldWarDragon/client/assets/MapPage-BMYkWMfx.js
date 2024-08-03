import{_ as e,o as t,A as s,D as a,l as o,d as i,P as c,m as l,j as n,k as r,a as d,c as m,f as u,t as v,s as f,F as x,x as p,n as g,B as b,H as y,p as h,h as w}from"./index-D__TAhnb.js";import{M as k}from"./index-BhTZ9iIM.js";import"./phaser-Di_ahE-K.js";const A={setup(){t((()=>{!async function(){try{await l.getMessages()}catch(e){c.error(e.message)}}(),async function(){try{await n.getAssistances()}catch(e){c.error(e.message)}}(),r(),s.activeRoom={}})),a((()=>{d(0)}));let e="https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";const r=()=>{const t=document.querySelector("main");t&&(t.style.backgroundImage=`linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${e})`)};function d(t){0!=t?s.activeRoom=k.find((e=>e.id==t)):(s.activeRoom={id:0},o.log("clicked",s.activeRoom)),function(t){e=0!=t?s.activeRoom.bgImage:"https://images.unsplash.com/photo-1569470451072-68314f596aec?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}(t),r()}return{messages:i((()=>s.messages.filter((e=>e.roomId==s.activeRoom.id)).reverse())),assistancesUnclaimed:i((()=>s.assistances.filter((e=>0==e.claim)))),assistancesClaimed:i((()=>s.assistances.filter((e=>1==e.claim)))),activeRoom:i((()=>s.activeRoom)),account:i((()=>s.account)),AppState:i((()=>s)),setActiveRoom:d,async deleteMessage(e){try{if(!(await c.confirm("Delete?")))return;await l.deleteMessage(e)}catch(t){c.error(t.message,"[]")}},async deleteAssistance(e){try{if(!(await c.confirm("Delete?")))return;await n.deleteAssistance(e)}catch(t){c.error(t.message,"[]")}},async claimAssistance(e){try{if(!(await c.confirm("Claim?")))return;await n.claimAssistance(e)}catch(t){c.error(t.message,"[]")}}}}},R=e=>(h("data-v-65101fd5"),e=e(),w(),e),C={class:"row"},M={class:"col-12 fs-1 fw-bold text-center text-light mt-3 mb-5 text-2p text-outline"},D={key:0,class:"fs-1 fw-bold text-center text-light"},j={key:1,class:"fs-1 fw-bold text-center text-light"},H={key:0,class:"row position-relative map text-2p text-outline mx-auto mx-3"},S={key:1,class:"row d-flex justify-content-center text-2p text-outline text-center"},B={class:"col-12"},I={key:0,class:"col-12 d-flex flex-column justify-content-center align-items-center"},G={class:"row"},P={class:"col-10 mx-auto boons text-outline text-light"},q=R((()=>u("h2",{class:""},"BOONS",-1))),N={class:""},O={class:"col-11 mx-auto"},_={class:"d-none d-md-inline ps-3"},L={class:"ps-2"},T={class:"ps-2"},U={key:1,class:"col-12 d-flex flex-column justify-content-center align-items-center"},V=R((()=>u("h2",{class:"text-light"},"Assistance",-1))),W={class:"d-flex"},Y=["onClick"],F=["onClick"],$=e(A,[["render",function(e,t,s,a,o,i){const c=r("NewMessage"),l=r("NewAssistance");return d(),m(x,null,[u("section",C,[u("div",M,[a.activeRoom.name&&0!=a.activeRoom.id?(d(),m("h1",j,v(a.activeRoom.name),1)):(d(),m("h1",D," Select an area "))])]),a.activeRoom.name&&0!=a.activeRoom.id?(d(),m("section",S,[u("div",B,[u("button",{onClick:t[5]||(t[5]=e=>a.setActiveRoom(0)),class:"btn room-container text-2p text-outline-bg"},"TO MAP")]),5!=a.activeRoom.id?(d(),m("div",I,[u("section",G,[u("div",P,[q,u("div",N,[u("h4",null," Gold: "+v(a.AppState.goldMod[a.activeRoom.id])+" | Health: "+v(a.AppState.healthMod[a.activeRoom.id])+" | Luck: "+v(a.AppState.luckMod[a.activeRoom.id])+" | Power: "+v(a.AppState.powerMod[a.activeRoom.id]),1)])]),u("div",O,[f(c,{messageProp:{cost:100*a.activeRoom.difficulty}},null,8,["messageProp"]),(d(!0),m(x,null,p(a.messages,(e=>{var t;return d(),m("div",{key:e.id,class:"room-container text-outline-bg px-3 d-flex justify-content-between align-items-center"},[u("div",null,[u("i",{class:g("power"==e.boon?"mdi mdi-weight-lifter":"d-none")},null,2),u("i",{class:g("luck"==e.boon?"mdi mdi-clover":"d-none")},null,2),u("i",{class:g("health"==e.boon?"mdi mdi-heart":"d-none")},null,2),u("i",{class:g("gold"==e.boon?"mdi mdi-circle-multiple":"d-none")},null,2),u("div",_,v(e.boon),1)]),u("div",L,v(e.body),1),u("div",T,v(null==(t=null==e?void 0:e.creator)?void 0:t.name),1)])})),128))])])])):(d(),m("div",U,[V,f(l),u("div",W,[u("div",null,[(d(!0),m(x,null,p(a.assistancesUnclaimed,(e=>{var t;return d(),m("div",{key:e.id,class:g(["room-container px-3 rounded border border-light",[0==e.claim?"text-success":"text-danger"]])},[b(v(e.body)+" "+v(null==(t=null==e?void 0:e.creator)?void 0:t.name)+" ",1),e.creatorId!=a.account.id&&0==e.claim?(d(),m("button",{key:0,class:"selectable mdi mdi-sword btn text-success",onClick:t=>a.claimAssistance(e.id)}," Claim",8,Y)):y("",!0)],2)})),128))]),u("div",null,[(d(!0),m(x,null,p(a.assistancesClaimed.slice(0,5),(e=>{var t;return d(),m("div",{key:e.id,class:g(["room-container px-3 rounded border border-light",[0==e.claim?"text-success":"text-danger"]])},[b(v(e.body)+" "+v(null==(t=null==e?void 0:e.creator)?void 0:t.name)+" ",1),e.creatorId==a.account.id&&0==e.claim?(d(),m("button",{key:0,class:"selectable mdi mdi-download btn text-success",onClick:t=>a.claimAssistance(e.id)}," Claim",8,F)):y("",!0)],2)})),128))])])]))])):(d(),m("section",H,[u("div",{onClick:t[0]||(t[0]=e=>a.setActiveRoom(5)),class:"position-absolute top-50 start-50 translate-middle map-section map-center"}," Centeria"),u("div",{onClick:t[1]||(t[1]=e=>a.setActiveRoom(1)),class:"col-6 map-section"},"Toleftios"),u("div",{onClick:t[2]||(t[2]=e=>a.setActiveRoom(2)),class:"col-6 map-section"},"Rysto"),u("div",{onClick:t[3]||(t[3]=e=>a.setActiveRoom(3)),class:"col-6 map-section"},"Lendbom"),u("div",{onClick:t[4]||(t[4]=e=>a.setActiveRoom(4)),class:"col-6 map-section"},"Boghir")]))],64)}],["__scopeId","data-v-65101fd5"]]);export{$ as default};
