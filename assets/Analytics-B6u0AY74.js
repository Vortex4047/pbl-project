import{j as e}from"./motion-DCyAb17d.js";import{u as S,a as v}from"./index-D1Dz3qBh.js";import{T as j,n as k,G as L,C,I,a as E,X as W,g as Y,H as G}from"./icons-B9OPXoXI.js";import{R as D,B as K,C as z,X as R,Y as A,T as M,L as B,b as N,c as _,d as w}from"./charts-C7PUUaah.js";import{r as O}from"./react-sqPdxmqV.js";const U=()=>{const{budgets:n}=S(),{formatCurrency:p}=v(),c=n.map(a=>({category:a.category,Budget:a.limit,Spent:a.spent,Remaining:Math.max(0,a.limit-a.spent)})),i=({active:a,payload:d})=>a&&d&&d.length?e.jsxs("div",{className:"glass-panel-blue border border-white/30 p-3 rounded-lg",children:[e.jsx("p",{className:"text-white font-bold mb-2",children:d[0].payload.category}),d.map((h,u)=>e.jsxs("p",{className:"text-sm",style:{color:h.color},children:[h.name,": ",p(Number(h.value),2)]},u))]}):null;return e.jsxs("div",{className:"glass-panel p-6 rounded-2xl hover-lift",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{children:[e.jsxs("h3",{className:"text-xl font-bold text-white flex items-center gap-2",children:[e.jsx(j,{size:24,className:"text-cyan-400"}),"Budget vs Actual"]}),e.jsx("p",{className:"text-sm text-gray-300 mt-1",children:"Compare your spending against budgets"})]}),e.jsxs("div",{className:"flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30",children:[e.jsx(k,{size:14,className:"text-cyan-400"}),e.jsxs("span",{className:"text-xs text-cyan-300 font-medium",children:[n.filter(a=>a.spent>a.limit*.8).length," alerts"]})]})]}),e.jsx("div",{className:"h-80",children:e.jsx(D,{width:"100%",height:"100%",children:e.jsxs(K,{data:c,children:[e.jsx(z,{strokeDasharray:"3 3",stroke:"rgba(255,255,255,0.1)"}),e.jsx(R,{dataKey:"category",stroke:"rgba(255,255,255,0.5)",style:{fontSize:"12px"}}),e.jsx(A,{stroke:"rgba(255,255,255,0.5)",style:{fontSize:"12px"},tickFormatter:a=>p(Number(a))}),e.jsx(M,{content:e.jsx(i,{})}),e.jsx(B,{wrapperStyle:{color:"#fff"},iconType:"circle"}),e.jsx(N,{dataKey:"Budget",fill:"#3b82f6",radius:[8,8,0,0]}),e.jsx(N,{dataKey:"Spent",fill:"#22d3ee",radius:[8,8,0,0]}),e.jsx(N,{dataKey:"Remaining",fill:"#10b981",radius:[8,8,0,0]})]})})}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-300 mb-1",children:"Total Budget"}),e.jsx("p",{className:"text-xl font-bold text-white",children:p(n.reduce((a,d)=>a+d.limit,0),2)})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-300 mb-1",children:"Total Spent"}),e.jsx("p",{className:"text-xl font-bold text-cyan-400",children:p(n.reduce((a,d)=>a+d.spent,0),2)})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-300 mb-1",children:"Remaining"}),e.jsx("p",{className:"text-xl font-bold text-green-400",children:p(n.reduce((a,d)=>a+Math.max(0,d.limit-d.spent),0),2)})]})]})]})},P=()=>{const[n,p]=O.useState("30d"),{formatCurrency:c}=v(),i={"7d":[{date:"Mon",Dining:45,Transport:20,Shopping:30},{date:"Tue",Dining:52,Transport:15,Shopping:25},{date:"Wed",Dining:38,Transport:25,Shopping:40},{date:"Thu",Dining:60,Transport:18,Shopping:35},{date:"Fri",Dining:70,Transport:22,Shopping:50},{date:"Sat",Dining:85,Transport:30,Shopping:80},{date:"Sun",Dining:65,Transport:10,Shopping:45}],"30d":[{date:"Week 1",Dining:280,Transport:120,Shopping:200},{date:"Week 2",Dining:320,Transport:90,Shopping:250},{date:"Week 3",Dining:290,Transport:110,Shopping:180},{date:"Week 4",Dining:350,Transport:130,Shopping:220}],"90d":[{date:"Month 1",Dining:1200,Transport:450,Shopping:850},{date:"Month 2",Dining:1100,Transport:420,Shopping:900},{date:"Month 3",Dining:1300,Transport:480,Shopping:950}]},a=({active:o,payload:g})=>o&&g&&g.length?e.jsxs("div",{className:"glass-panel-blue border border-white/30 p-3 rounded-lg",children:[e.jsx("p",{className:"text-white font-bold mb-2",children:g[0].payload.date}),g.map((r,x)=>e.jsxs("p",{className:"text-sm",style:{color:r.color},children:[r.name,": ",c(Number(r.value))]},x))]}):null,u=i[n].reduce((o,g)=>o+g.Dining+g.Transport+g.Shopping,0)/(n==="7d"?7:n==="30d"?30:90);return e.jsxs("div",{className:"glass-panel p-6 rounded-2xl hover-lift",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{children:[e.jsxs("h3",{className:"text-xl font-bold text-white flex items-center gap-2",children:[e.jsx(j,{size:24,className:"text-cyan-400"}),"Spending Trends"]}),e.jsx("p",{className:"text-sm text-gray-300 mt-1",children:"Track your spending patterns over time"})]}),e.jsx("div",{className:"flex gap-2",children:["7d","30d","90d"].map(o=>e.jsx("button",{onClick:()=>p(o),className:`px-4 py-2 rounded-lg text-sm font-medium transition-all ${n===o?"bg-cyan-500/30 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]":"bg-white/10 text-gray-300 hover:bg-white/20"}`,children:o==="7d"?"7 Days":o==="30d"?"30 Days":"90 Days"},o))})]}),e.jsx("div",{className:"h-80",children:e.jsx(D,{width:"100%",height:"100%",children:e.jsxs(_,{data:i[n],children:[e.jsx(z,{strokeDasharray:"3 3",stroke:"rgba(255,255,255,0.1)"}),e.jsx(R,{dataKey:"date",stroke:"rgba(255,255,255,0.5)",style:{fontSize:"12px"}}),e.jsx(A,{stroke:"rgba(255,255,255,0.5)",style:{fontSize:"12px"},tickFormatter:o=>c(Number(o))}),e.jsx(M,{content:e.jsx(a,{})}),e.jsx(B,{wrapperStyle:{color:"#fff"},iconType:"circle"}),e.jsx(w,{type:"monotone",dataKey:"Dining",stroke:"#22d3ee",strokeWidth:3,dot:{fill:"#22d3ee",r:4},activeDot:{r:6}}),e.jsx(w,{type:"monotone",dataKey:"Transport",stroke:"#a855f7",strokeWidth:3,dot:{fill:"#a855f7",r:4},activeDot:{r:6}}),e.jsx(w,{type:"monotone",dataKey:"Shopping",stroke:"#10b981",strokeWidth:3,dot:{fill:"#10b981",r:4},activeDot:{r:6}})]})})}),e.jsxs("div",{className:"mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-4",children:[e.jsxs("div",{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-1 mb-1",children:[e.jsx(L,{size:14,className:"text-cyan-400"}),e.jsx("p",{className:"text-sm text-gray-300",children:"Peak Day"})]}),e.jsx("p",{className:"text-lg font-bold text-white",children:"Saturday"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-300 mb-1",children:"Avg Daily"}),e.jsx("p",{className:"text-lg font-bold text-cyan-400",children:c(u,2)})]}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm text-gray-300 mb-1",children:"Trend"}),e.jsx("p",{className:"text-lg font-bold text-green-400",children:"↓ 8%"})]})]})]})},X=()=>{const{budgets:n,transactions:p}=S(),{formatCurrency:c}=v(),[i,a]=O.useState(new Set),h=(()=>{const r=[];for(const s of n){const t=s.spent/s.limit*100;t>=100?r.push({id:`budget-critical-${s.id}`,severity:"critical",title:`Budget Exceeded: ${s.category}`,description:`You've exceeded your ${s.category} budget by ${c(s.spent-s.limit)}. Limit: ${c(s.limit)}, Spent: ${c(s.spent)}.`,category:s.category,value:t}):t>=80&&r.push({id:`budget-warning-${s.id}`,severity:"warning",title:`Budget Warning: ${s.category}`,description:`You've used ${Math.round(t)}% of your ${s.category} budget. Only ${c(s.limit-s.spent)} remaining.`,category:s.category,value:t})}const x={};for(const s of p)x[s.category]||(x[s.category]=[]),x[s.category].push(Math.abs(s.amount));for(const[s,t]of Object.entries(x)){if(t.length<2)continue;const l=t.slice(0,-1).reduce(($,F)=>$+F,0)/(t.length-1),b=t[0];b>l*2&&r.push({id:`unusual-${s}`,severity:"warning",title:`Unusual Spending: ${s}`,description:`Your latest ${s} transaction (${c(b)}) is ${(b/l).toFixed(1)}× your average of ${c(l)}.`,category:s,value:b})}const m=n.filter(s=>s.spent/s.limit*100<50&&s.spent>0);m.length>0&&r.push({id:"healthy-budgets",severity:"success",title:`${m.length} Budget${m.length>1?"s":""} On Track`,description:`${m.map(s=>s.category).join(", ")} ${m.length>1?"are":"is"} well within budget. Great discipline!`});const y=p.filter(s=>s.amount<0).reduce((s,t)=>s+Math.abs(t.amount),0),f=85e3;return y/f>.7&&r.push({id:"savings-rate-warning",severity:"info",title:"Low Savings Rate Detected",description:`You're spending approximately ${Math.round(y/f*100)}% of estimated income. Aim for a 30%+ savings rate.`}),r})().filter(r=>!i.has(r.id)),u={critical:{icon:k,colorClass:"text-red-400",bgClass:"bg-red-500/10",borderClass:"border-red-500/40",badgeClass:"bg-red-500/20 text-red-300"},warning:{icon:E,colorClass:"text-yellow-400",bgClass:"bg-yellow-500/10",borderClass:"border-yellow-500/40",badgeClass:"bg-yellow-500/20 text-yellow-300"},info:{icon:I,colorClass:"text-blue-400",bgClass:"bg-blue-500/10",borderClass:"border-blue-500/40",badgeClass:"bg-blue-500/20 text-blue-300"},success:{icon:C,colorClass:"text-green-400",bgClass:"bg-green-500/10",borderClass:"border-green-500/40",badgeClass:"bg-green-500/20 text-green-300"}},o=["critical","warning","info","success"],g=[...h].sort((r,x)=>o.indexOf(r.severity)-o.indexOf(x.severity));return g.length===0?e.jsxs("div",{className:"glass-panel rounded-2xl p-6",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-4",children:[e.jsx(j,{size:22,className:"text-cyan-400"}),e.jsx("h3",{className:"text-xl font-bold text-white",children:"Smart Alerts"})]}),e.jsxs("div",{className:"flex flex-col items-center justify-center py-10 gap-3 text-gray-400",children:[e.jsx(C,{size:40,className:"text-green-400"}),e.jsx("p",{className:"text-white font-medium",children:"All clear! No alerts right now."}),e.jsx("p",{className:"text-sm text-center",children:"Your budgets and spending patterns look healthy."})]})]}):e.jsxs("div",{className:"glass-panel rounded-2xl p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-5",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(j,{size:22,className:"text-cyan-400"}),e.jsx("h3",{className:"text-xl font-bold text-white",children:"Smart Alerts"})]}),e.jsxs("span",{className:"text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/20",children:[g.length," alert",g.length!==1?"s":""]})]}),e.jsx("div",{className:"space-y-3",children:g.map(r=>{const x=u[r.severity],m=x.icon;return e.jsxs("div",{className:`flex items-start gap-4 p-4 rounded-xl border ${x.bgClass} ${x.borderClass} animate-fade-in hover:scale-[1.01] transition-transform`,children:[e.jsx("div",{className:`mt-0.5 shrink-0 ${x.colorClass}`,children:e.jsx(m,{size:20})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-2 flex-wrap mb-1",children:[e.jsx("p",{className:"text-sm font-bold text-white",children:r.title}),e.jsx("span",{className:`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${x.badgeClass}`,children:r.severity})]}),e.jsx("p",{className:"text-xs text-gray-300 leading-relaxed",children:r.description})]}),e.jsx("button",{onClick:()=>a(y=>new Set([...y,r.id])),className:"shrink-0 p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors",children:e.jsx(W,{size:14})})]},r.id)})})]})},T={Dining:"#eab308",Transport:"#22c55e",Groceries:"#ef4444",Shopping:"#3b82f6",Entertainment:"#a855f7",Others:"#6b7280"};function H(n,p,c,i){const a=new Date().toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"}),d=n.filter(t=>t.amount<0).reduce((t,l)=>t+Math.abs(l.amount),0),h=85e3,u=h-d,o={};for(const t of n.filter(l=>l.amount<0))o[t.category]=(o[t.category]??0)+Math.abs(t.amount);const g=Object.entries(o).sort(([,t],[,l])=>l-t).map(([t,l])=>{const b=(l/d*100).toFixed(1);return`<tr>
        <td style="padding:8px 12px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${T[t]??T.Others};margin-right:8px;"></span>${t}</td>
        <td style="padding:8px 12px;text-align:right;font-weight:600;">${i(l)}</td>
        <td style="padding:8px 12px;text-align:right;color:#9ca3af;">${b}%</td>
      </tr>`}).join(""),r=n.slice(0,10).map(t=>`<tr>
      <td style="padding:8px 12px;">${t.merchant}</td>
      <td style="padding:8px 12px;color:#9ca3af;">${t.date}</td>
      <td style="padding:8px 12px;color:#9ca3af;">${t.category}</td>
      <td style="padding:8px 12px;text-align:right;font-weight:600;color:${t.amount<0?"#ef4444":"#22c55e"};">
        ${t.amount<0?"-":"+"}${i(Math.abs(t.amount))}
      </td>
    </tr>`).join(""),x=p.map(t=>{const l=Math.min(t.spent/t.limit*100,100).toFixed(0),b=Number(l)>=100?"#ef4444":Number(l)>=80?"#eab308":"#22c55e";return`<tr>
      <td style="padding:8px 12px;">${t.category}</td>
      <td style="padding:8px 12px;text-align:right;">${i(t.spent)}</td>
      <td style="padding:8px 12px;text-align:right;">${i(t.limit)}</td>
      <td style="padding:8px 12px;text-align:right;font-weight:700;color:${b};">${l}%</td>
    </tr>`}).join(""),m=c.map(t=>{const l=Math.min(t.current/t.target*100,100).toFixed(0);return`<tr>
      <td style="padding:8px 12px;">${t.name}</td>
      <td style="padding:8px 12px;text-align:right;">${i(t.current)}</td>
      <td style="padding:8px 12px;text-align:right;">${i(t.target)}</td>
      <td style="padding:8px 12px;text-align:right;font-weight:700;color:#22d3ee;">${l}%</td>
    </tr>`}).join(""),y=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Finance Report — ${a}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f172a; color: #e2e8f0; padding: 40px 60px; line-height: 1.6; }
    h1 { font-size: 2rem; font-weight: 800; color: #22d3ee; margin-bottom: 4px; }
    h2 { font-size: 1.1rem; font-weight: 700; color: #fff; margin: 32px 0 16px; border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 8px; }
    .subtitle { color: #6b7280; font-size: 0.9rem; margin-bottom: 32px; }
    .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
    .summary-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 20px; }
    .summary-card .label { font-size: 0.75rem; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
    .summary-card .value { font-size: 1.6rem; font-weight: 800; }
    .income { color: #22c55e; }
    .expense { color: #ef4444; }
    .savings { color: #22d3ee; }
    table { width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.04); border-radius: 12px; overflow: hidden; margin-bottom: 8px; }
    thead { background: rgba(255,255,255,0.08); }
    th { padding: 10px 12px; text-align: left; font-size: 0.75rem; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.06em; font-weight: 600; }
    tr:not(:last-child) td { border-bottom: 1px solid rgba(255,255,255,0.06); }
    td { font-size: 0.9rem; }
    .footer { margin-top: 48px; text-align: center; color: #4b5563; font-size: 0.8rem; }
    @media print {
      body { background: #fff; color: #111; padding: 20px; }
      .summary-card { background: #f9fafb; border-color: #e5e7eb; }
      h1, h2 { color: #111; }
      table { background: #f9fafb; }
      thead { background: #e5e7eb; }
    }
  </style>
</head>
<body>
  <h1>Finance Mentor AI</h1>
  <p class="subtitle">Report generated on ${a}</p>

  <h2>Summary</h2>
  <div class="summary-grid">
    <div class="summary-card"><div class="label">Estimated Income</div><div class="value income">${i(h)}</div></div>
    <div class="summary-card"><div class="label">Total Spent</div><div class="value expense">${i(d)}</div></div>
    <div class="summary-card"><div class="label">Net Savings</div><div class="value savings">${i(u)}</div></div>
  </div>

  <h2>Spending by Category</h2>
  <table>
    <thead><tr><th>Category</th><th style="text-align:right;">Amount</th><th style="text-align:right;">% of Total</th></tr></thead>
    <tbody>${g}</tbody>
  </table>

  <h2>Budget Status</h2>
  <table>
    <thead><tr><th>Category</th><th style="text-align:right;">Spent</th><th style="text-align:right;">Limit</th><th style="text-align:right;">Used</th></tr></thead>
    <tbody>${x}</tbody>
  </table>

  <h2>Recent Transactions</h2>
  <table>
    <thead><tr><th>Merchant</th><th>Date</th><th>Category</th><th style="text-align:right;">Amount</th></tr></thead>
    <tbody>${r}</tbody>
  </table>

  <h2>Savings Goals</h2>
  <table>
    <thead><tr><th>Goal</th><th style="text-align:right;">Saved</th><th style="text-align:right;">Target</th><th style="text-align:right;">Progress</th></tr></thead>
    <tbody>${m}</tbody>
  </table>

  <div class="footer">
    <p>Finance Mentor AI · Personal Finance Report · ${a}</p>
    <p style="margin-top:4px;">This report is for personal reference only.</p>
  </div>

  <script>window.onload = () => window.print();<\/script>
</body>
</html>`,f=new Blob([y],{type:"text/html"}),s=URL.createObjectURL(f);window.open(s,"_blank")}const ee=()=>{const{transactions:n,budgets:p,savingsGoals:c}=S(),{formatCurrency:i}=v(),a=()=>{H(n,p,c,i)};return e.jsxs("div",{className:"space-y-6 animate-slide-in-left",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"text-2xl font-bold text-white flex items-center gap-2",children:[e.jsx(Y,{size:28,className:"text-cyan-400"}),"Analytics & Reports"]}),e.jsx("p",{className:"text-gray-300 text-sm mt-1",children:"Detailed insights into your financial patterns"})]}),e.jsxs("button",{onClick:a,className:"flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border border-cyan-400/40 text-cyan-300 rounded-xl text-sm font-medium transition-all hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.15)]",children:[e.jsx(G,{size:16}),"Export Report"]})]}),e.jsx(X,{}),e.jsx(P,{}),e.jsx(U,{})]})};export{ee as Analytics};
//# sourceMappingURL=Analytics-B6u0AY74.js.map
