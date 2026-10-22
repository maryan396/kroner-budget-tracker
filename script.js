const EXP=["Food","Rent","Transport","Fun","Study","Health","Other"],INC=["Salary","Loan/Stipend","Gift","Other"];
const $=id=>document.getElementById(id);
let tx=[],budget=0;
try{tx=JSON.parse(localStorage.getItem("kr_tx")||"[]");budget=+localStorage.getItem("kr_budget")||0}catch(e){}
function save(){try{localStorage.setItem("kr_tx",JSON.stringify(tx));localStorage.setItem("kr_budget",budget)}catch(e){}}
const kr=n=>Math.round(n).toLocaleString("nb-NO")+" kr";
const today=()=>new Date().toISOString().slice(0,10);
const thisMonth=d=>d.slice(0,7)===today().slice(0,7);
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function fillCats(){$("cat").innerHTML=($("type").value==="expense"?EXP:INC).map(c=>`<option>${c}</option>`).join("")}
function render(){
  const inc=tx.filter(t=>t.type==="income").reduce((s,t)=>s+t.amt,0);
  const exp=tx.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amt,0);
  $("bal").textContent=kr(inc-exp);$("bal").className="big "+(inc-exp<0?"bad":"");
  $("inc").textContent=kr(inc);$("exp").textContent=kr(exp);
  const mExp=tx.filter(t=>t.type==="expense"&&thisMonth(t.date));
  const spent=mExp.reduce((s,t)=>s+t.amt,0);
  if(budget>0){const p=Math.min(100,spent/budget*100);$("bfill").style.width=p+"%";
    $("bfill").style.background=spent>budget?"var(--bad)":p>80?"#f59e0b":"var(--accent)";
    $("btext").textContent=spent>budget?`Over budget by ${kr(spent-budget)} (${kr(spent)} of ${kr(budget)})`:`${kr(spent)} of ${kr(budget)} used – ${kr(budget-spent)} left`}
  else{$("bfill").style.width="0%";$("btext").textContent="No budget set."}
  const by={};mExp.forEach(t=>by[t.cat]=(by[t.cat]||0)+t.amt);
  const ents=Object.entries(by).sort((a,b)=>b[1]-a[1]);
  $("cats").innerHTML=ents.length?ents.map(([c,v])=>`<div class="cat"><div class="t"><span>${c}</span><span>${kr(v)}</span></div><div class="bar"><i style="width:${v/spent*100}%"></i></div></div>`).join(""):'<div class="empty">No expenses this month yet.</div>';
  let list=[...tx].sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
  if($("filter").value==="month")list=list.filter(t=>thisMonth(t.date));
  $("list").innerHTML=list.length?list.map(t=>`<div class="row"><div>${t.cat}${t.note?" – "+esc(t.note):""}<small>${t.date}</small></div><div><b class="${t.type==="income"?"good":"bad"}">${t.type==="income"?"+":"−"}${kr(t.amt)}</b> <button class="ghost" data-id="${t.id}" aria-label="Delete">✕</button></div></div>`).join(""):'<div class="empty">Nothing here yet. Add your first transaction!</div>';
}
$("type").onchange=fillCats;$("filter").onchange=render;
$("f").onsubmit=e=>{e.preventDefault();const a=parseFloat($("amt").value);
  if(!(a>0))return;
  tx.push({id:Date.now(),type:$("type").value,amt:a,cat:$("cat").value,date:$("date").value,note:$("note").value.trim()});
  save();$("amt").value="";$("note").value="";render()};
$("list").onclick=e=>{const id=e.target.dataset&&e.target.dataset.id;if(id){tx=tx.filter(t=>t.id!=id);save();render()}};
$("bset").onclick=()=>{budget=Math.max(0,+$("bin").value||0);$("bin").value="";save();render()};
$("reset").onclick=()=>{if(confirm("Delete all data?")){tx=[];budget=0;save();render()}};
$("date").value=today();fillCats();render();
