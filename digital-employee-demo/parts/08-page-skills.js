/* ───────────────────────────────
   PAGE: Skills 市场
─────────────────────────────── */
function SkillsPage(){
  const [tab,setTab]=useState('market');
  const [cat,setCat]=useState('all');
  const [search,setSearch]=useState('');
  const [sel,setSel]=useState(null);

  const cats=['all','研效','HR','法务','财务','业务','分析'];
  const data=SKILLS.filter(s=>{
    if(tab==='mine'&&!s.mine)return false;
    if(cat!=='all'&&s.cat!==cat)return false;
    if(search&&!s.name.includes(search)&&!s.desc.includes(search))return false;
    return true;
  });

  return(
    <div className="page-in">
      <div style={{display:'flex',gap:10,marginBottom:16,alignItems:'center'}}>
        <div className="tabs">
          <div className={`tab ${tab==='market'?'active':''}`} onClick={()=>setTab('market')}>🏪 技能市场</div>
          <div className={`tab ${tab==='mine'?'active':''}`} onClick={()=>setTab('mine')}>⭐ 我的 Skills ({SKILLS.filter(s=>s.mine).length})</div>
        </div>
        <input className="field" style={{width:200}} placeholder="搜索 Skills..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <button className="btn btn-primary btn-sm" style={{marginLeft:'auto'}}>+ 创建 Skill</button>
      </div>

      <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
        {cats.map(c=>(
          <button key={c} className={`btn btn-sm ${cat===c?'btn-blue':'btn-outline'}`} onClick={()=>setCat(c)}>
            {c==='all'?'全部':c}
          </button>
        ))}
        <div style={{marginLeft:'auto',fontSize:12,color:'var(--text-3)',alignSelf:'center'}}>{data.length} 个 Skills</div>
      </div>

      <div className="skills-grid">
        {data.map(sk=>(
          <div key={sk.id} className={`skill-card ${sk.mine?'owned':''}`} onClick={()=>setSel(sk)}>
            <div style={{display:'flex',gap:9,alignItems:'flex-start',marginBottom:10}}>
              <div style={{fontSize:26,width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:10,flexShrink:0}}>{sk.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13.5,marginBottom:3}}>{sk.name}</div>
                <div style={{display:'flex',gap:5}}>
                  <Badge t="gray">{sk.cat}</Badge>
                  {sk.hil&&<Badge t="orange">需HIL</Badge>}
                  {sk.mine&&<Badge t="blue">已拥有</Badge>}
                </div>
              </div>
            </div>
            <div style={{fontSize:12.5,color:'var(--text-2)',lineHeight:1.6,marginBottom:10}}>{sk.desc}</div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:7}}>
              <div style={{fontSize:12,color:'var(--amber)'}}>{'★'.repeat(Math.round(sk.rating))}{'☆'.repeat(5-Math.round(sk.rating))} <span style={{color:'var(--text-3)'}}>{sk.rating}</span></div>
              <div style={{fontSize:11,color:'var(--text-3)'}}>{sk.uses} 次</div>
            </div>
            <div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11.5,marginBottom:4}}>
                <span style={{color:'var(--text-3)'}}>Evals</span>
                <span style={{fontWeight:600,color:sk.evals>=90?'var(--green)':'var(--text-2)'}}>{sk.evals}</span>
              </div>
              <ProgressBar pct={sk.evals} cls={sk.evals>=90?'progress-green':'progress-blue'}/>
            </div>
          </div>
        ))}
      </div>

      {sel&&(
        <>
          <div className="drawer-overlay" onClick={()=>setSel(null)}/>
          <div className="drawer">
            <div className="drawer-head">
              <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                <div style={{fontSize:30,width:48,height:48,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:12,flexShrink:0}}>{sel.icon}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:16,marginBottom:5}}>{sel.name}</div>
                  <div style={{display:'flex',gap:6}}>
                    <Badge t="gray">{sel.cat}</Badge>
                    {sel.hil&&<Badge t="orange">需 HIL 审批</Badge>}
                    {sel.mine&&<Badge t="blue">已拥有</Badge>}
                  </div>
                </div>
              </div>
              <button className="drawer-close" onClick={()=>setSel(null)}>×</button>
            </div>
            <div className="drawer-body">
              <div className="card" style={{marginBottom:14}}>
                <div style={{fontSize:13.5,color:'var(--text-2)',lineHeight:1.7}}>{sel.desc}</div>
              </div>
              <div className="col-3" style={{marginBottom:16}}>
                {[[sel.evals,'Evals 评分','var(--blue)'],[sel.rating,'用户评分','var(--amber)'],[sel.uses,'使用次数','var(--green)']].map(([v,l,c])=>(
                  <div key={l} style={{textAlign:'center',background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:10,padding:'12px 8px'}}>
                    <div style={{fontFamily:'var(--f-display)',fontWeight:800,fontSize:22,color:c}}>{v}</div>
                    <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex',gap:9}}>
                {sel.mine
                  ?<button className="btn btn-primary" style={{flex:1}}>▶ 立即使用</button>
                  :<button className="btn btn-blue" style={{flex:1}}>+ 添加到我的 Skills</button>}
                <button className="btn btn-outline">查看执行步骤</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
