import{_ as s,u as e,i as a,o as t,w as o,P as c,m as i,j as n,d as r,k as l,a as d,c as g,f as m,q as u,t as b,s as v,F as y,x as f,y as p,A as h,l as B,z as k,B as w,p as A,h as x}from"./index-CUNzSXYX.js";import"./phaser-Di_ahE-K.js";const I={setup(){e();const s=a();t((()=>{l()})),o((()=>{(e=>{if(!h.user.id)return;const a=h.user;B.log("USER",a,"ROLE",a.role),0!=a.role.length&&a.role.includes("admin")||s.push({name:"Home"})})()}));const l=()=>{const s=document.querySelector("main");if(s){let e="/assets/bg_1.png";s.style.backgroundImage=`linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.90) 100%), url(${e})`}};return t((()=>{!async function(){try{await i.getMessages()}catch(s){c.error(s.message)}}(),async function(){try{await n.getAssistances()}catch(s){c.error(s.message)}}(),async function(){try{await p.getBosses()}catch(s){c.error(s.message)}}(),async function(){try{null!=h.activeBoss.id&&(B.log("[ActiveBossId]",h.activeBoss.id),await k.getBossDamageByBossId(h.activeBoss.id))}catch(s){c.error(s.message,"[]")}}()})),{async deleteMessage(s){try{if(!(await c.confirm("Delete?")))return;await i.deleteMessage(s)}catch(e){c.error(e.message,"[]")}},async deleteAssistance(s){try{if(!(await c.confirm("Delete?")))return;await n.deleteAssistance(s)}catch(e){c.error(e.message,"[]")}},messages:r((()=>h.messages)),assistances:r((()=>h.assistances)),activeBoss:r((()=>h.activeBoss)),bosses:r((()=>h.bosses)),setBossActivity:async function(s){try{await p.setBossActivity(s)}catch(e){c.error(e.message,"[]")}}}}},C=s=>(A("data-v-e8619003"),s=s(),x(),s),M={class:"row g-3 px-5 pt-5 mx-5"},N={class:"col-12 bg-dark p-2"},j=C((()=>m("p",null,"A list of all bosses",-1))),D=["onClick"],R={class:"col-12 bg-dark p-2"},_=C((()=>m("p",{class:"fs-1"},"For testing creating boons",-1))),F={class:"col-12"},q={class:"bg-light text-dark rounded"},E=["onClick"],P={class:"col-12 bg-dark p-2"},S=C((()=>m("p",{class:"fs-1"},"For testing creating assistance",-1))),$={class:"col-12"},z={class:"bg-light text-dark rounded"},H=["onClick"],L=s(I,[["render",function(s,e,a,t,o,c){const i=l("DamageActiveboss"),n=l("NewBoss"),r=l("NewMessage"),p=l("NewAssistance");return d(),g("section",M,[m("div",N,[m("div",{class:"boss-dragon-img border border-2 border-light rounded d-flex flex-column justify-content-end text-light",style:u({backgroundImage:`url(${t.activeBoss.image})`})},[m("div",null,[m("h1",null,b(t.activeBoss.name),1),m("h2",null,b(t.activeBoss.hp-t.activeBoss.damages),1)])],4),v(i),v(n),j,(d(!0),g(y,null,f(t.bosses,(s=>(d(),g("div",{key:s.id},[w(" boss: "+b(s.name)+" | "+b(s.hp)+" ",1),m("button",{onClick:e=>t.setBossActivity(s.id),class:"btn btn-secondary"},"activate: "+b(s.active),9,D)])))),128))]),m("div",R,[_,v(r,{messageProp:{cost:0}})]),m("div",F,[m("div",q,[(d(!0),g(y,null,f(t.messages,(s=>(d(),g("div",{key:s.id},[w(" Message: "+b(s.body)+" Room: "+b(s.roomId)+" Name: "+b(s.creator.name)+" ",1),m("button",{class:"btn btn-danger",onClick:e=>t.deleteMessage(s.id)},"delete",8,E)])))),128))])]),m("div",P,[S,v(p)]),m("div",$,[m("div",z,[(d(!0),g(y,null,f(t.assistances,(s=>(d(),g("div",{key:s.id},[w(" Assistance: "+b(s.body)+" Room: "+b(s.roomId)+" Name: "+b(s.creator.name),1),m("button",{class:"btn btn-danger",onClick:e=>t.deleteAssistance(s.id)},"delete",8,H)])))),128))])])])}],["__scopeId","data-v-e8619003"]]);export{L as default};