import{r as b,k as E,j as R,a as S,o as y,p as w,R as t,c as T,l as M,d as $,T as U}from"./iframe-CH7SUUrI.js";import{B as f}from"./Box-D7S9tkoX.js";import{S as o}from"./Stack-CLIYe40w.js";import{T as l}from"./Typography-BJTHpBAH.js";import{g as A,a as I,c as O,s as j,m as B}from"./memoTheme-DwPu0iN6.js";import"./createSimplePaletteValueFilter-bm0fmN_7.js";function X(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function K(e){return parseFloat(e)}function N(e){return A("MuiSkeleton",e)}I("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const P=e=>{const{classes:a,variant:n,animation:r,hasChildren:i,width:d,height:s}=e;return O({root:["root",n,r,i&&"withChildren",i&&!d&&"fitContent",i&&!s&&"heightAuto"]},N,a)},p=w`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,h=w`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,W=typeof p!="string"?y`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,_=typeof h!="string"?y`
        &::after {
          animation: ${h} 2s linear 0.5s infinite;
        }
      `:null,D=j("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,a)=>{const{ownerState:n}=e;return[a.root,a[n.variant],n.animation!==!1&&a[n.animation],n.hasChildren&&a.withChildren,n.hasChildren&&!n.width&&a.fitContent,n.hasChildren&&!n.height&&a.heightAuto]}})(B(({theme:e})=>{const a=X(e.shape.borderRadius)||"px",n=K(e.shape.borderRadius);return{display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:e.alpha(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${a}/${Math.round(n/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:({ownerState:r})=>r.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:r})=>r.hasChildren&&!r.width,style:{maxWidth:"fit-content"}},{props:({ownerState:r})=>r.hasChildren&&!r.height,style:{height:"auto"}},{props:{animation:"pulse"},style:W||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(e.vars||e).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:_||{"&::after":{animation:`${h} 2s linear 0.5s infinite`}}}]}})),c=b.forwardRef(function(a,n){const r=E({props:a,name:"MuiSkeleton"}),{animation:i="pulse",className:d,component:s="span",height:m,style:v,variant:k="text",width:x,...u}=r,g={...r,animation:i,component:s,variant:k,hasChildren:!!u.children},C=P(g);return R.jsx(D,{as:s,ref:n,className:S(C.root,d),ownerState:g,...u,style:{width:x,height:m,...v}})}),L={title:"Overall/Skeleton",args:{themeMode:"dark"},argTypes:{themeMode:{control:"radio",options:["light","dark"]}}},F=({themeMode:e})=>{const a=T(e==="light"?M:$);return t.createElement(U,{theme:a},t.createElement(f,{sx:{width:"100%",display:"flex",justifyContent:"center",mt:4}},t.createElement(f,{sx:{width:520,p:4,bgcolor:"background.default",borderRadius:2}},t.createElement(o,{spacing:4},t.createElement(o,{direction:"row",spacing:3,alignItems:"center"},t.createElement(l,{color:"grey.300",sx:{width:80}},"Text"),t.createElement(c,{variant:"text",animation:"pulse",width:320})),t.createElement(o,{direction:"row",spacing:3,alignItems:"center"},t.createElement(l,{color:"grey.300",sx:{width:80}},"Circle"),t.createElement(c,{variant:"circular",animation:"pulse",width:56,height:56})),t.createElement(o,{direction:"row",spacing:3,alignItems:"center"},t.createElement(l,{color:"grey.300",sx:{width:80}},"Rectangle"),t.createElement(c,{variant:"rectangular",animation:"pulse",width:320,height:80})),t.createElement(o,{direction:"row",spacing:3,alignItems:"center"},t.createElement(l,{color:"grey.300",sx:{width:80}},"Rounded"),t.createElement(c,{variant:"rounded",animation:"pulse",width:96,height:40}))))))},Q={render:e=>t.createElement(F,{themeMode:e.themeMode})},Y=["Skeletons"];export{Q as Skeletons,Y as __namedExportsOrder,L as default};
