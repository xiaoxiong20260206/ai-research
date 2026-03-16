/* ───────────────────────────────
   PAGE: 管理者视图 (原"团队视图"改造)
   
   核心变更：
   1. 改名为"管理者视图"——只有 Leader 权限才能查看
   2. 增加隐私边界提示
   3. 增加 AI 使用率、提效数据、效率排行榜
   4. 普通成员看到的是权限不足页面
─────────────────────────────── */
function ManagerPage({isLeader}){
  const [dept,setDept]=useState('all');
  const [dim,setDim]=useState('tasks');
  const depts=['all','研效线','职能线','业务线'];
  const filtered=dept==='all'?TEAM:TEAM.filter(m=>m.dept===dept);
  const lvLabel=l=>['','🥚 幼苗','🌿 学徒','⚡ 助手','🤝 伙伴','🌟 数字员工'][l];

  // Non-leader gate
  if(!isLeader){
    return(
      <div className="page-in">
        <div className="manager-gate">
          <div style={{fontSize:48,marginBottom:16,opacity:.4}}>🔒</div>
          <div style={{fontFamily:'var(--f-display)',fontSize:18,fontWeight:700,color:'var(--ink)',marginBottom:8}}>需要管理者权限</div>
          <div style={{fontSize:13.5,color:'var(--text-2)',lineHeight:1.7,maxWidth:400,margin:'0 auto'}}>
            管理者视图仅对拥有 <strong>Leader 权限</strong> 的用户开放。<br/>
            该页面包含团队成员的 AI 使用数据和效率排行，出于隐私保护仅限管理者查看。
          </div>
          <div style={{marginTop:20}}>
            <button className="btn btn-outline">了解权限说明</button>
          </div>
        </div>
      </div>
    );
  }

  // Sort by dim
  const sortKey={tasks:'weekTasks',usage:'aiUsageRate',time:'timeSaved'}[dim]||'weekTasks';
  const sorted=[...filtered].sort((a,b)=>b[sortKey]-a[sortKey]);

  const teamStats={
    members:TEAM.length,
    totalTasks:TEAM.reduce((s,m)=>s+m.weekTasks,0),
    avgUsage:Math.round(TEAM.reduce((s,m)=>s+m.aiUsageRate,0)/TEAM.length),
    totalSaved:TEAM.reduce((s,m)=>s+m.timeSaved,0).toFixed(1),
  };

  return(
    <div className="page-in">
      {/* Privacy notice */}
      <div className="privacy-note">
        <strong>🔐 数据隐私说明</strong> · 本页面数据仅对拥有 Leader 权限的管理者可见。
        展示的是团队成员的 AI 使用情况和提效数据，旨在帮助管理者了解 AI 辅助工具的团队采用度。
        <strong>个人对话内容、记忆详情不会展示</strong>，仅显示汇总统计。
      </div>

      {/* Team stats */}
      <div className="stat-grid" style={{marginBottom:20}}>
        <div className="stat-card"><div className="stat-icon">👥</div><div className="stat-val" style={{color:'var(--ink)'}}>{teamStats.members}</div><div className="stat-label">活跃成员</div></div>
        <div className="stat-card"><div className="stat-icon">📊</div><div className="stat-val" style={{color:'var(--blue)'}}>{teamStats.totalTasks}</div><div className="stat-label">本周团队任务</div><div className="stat-delta" style={{color:'var(--green)',fontSize:11}}>↑ 12 较上周</div></div>
        <div className="stat-card"><div className="stat-icon">🤖</div><div className="stat-val" style={{color:'var(--purple)'}}>{teamStats.avgUsage}%</div><div className="stat-label">AI 平均使用率</div><div className="stat-delta" style={{color:'var(--green)',fontSize:11}}>↑ 5% 较上月</div></div>
        <div className="stat-card"><div className="stat-icon">⏱</div><div className="stat-val" style={{color:'var(--green)'}}>{teamStats.totalSaved}h</div><div className="stat-label">本周团队节省工时</div><div className="stat-delta" style={{color:'var(--green)',fontSize:11}}>↑ 4.8h 较上周</div></div>
      </div>

      {/* Filters */}
      <div style={{display:'flex',gap:8,marginBottom:18,alignItems:'center'}}>
        <div style={{display:'flex',gap:6}}>
          {depts.map(d=>(
            <button key={d} className={`btn btn-sm ${dept===d?'btn-blue':'btn-outline'}`} onClick={()=>setDept(d)}>
              {d==='all'?'全部':d}
            </button>
          ))}
        </div>
        <div style={{marginLeft:'auto',display:'flex',gap:6}}>
          {[{id:'tasks',label:'按任务数'},{id:'usage',label:'按使用率'},{id:'time',label:'按节省工时'}].map(d=>(
            <button key={d.id} className={`btn btn-sm ${dim===d.id?'btn-primary':'btn-ghost'}`} onClick={()=>setDim(d.id)}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Member cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
        {filtered.map(m=>(
          <div key={m.name} className="member-card">
            <div style={{width:44,height:44,borderRadius:'50%',background:'var(--surface-3)',border:'2px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,margin:'0 auto 8px'}}>{m.avatar}</div>
            <div style={{fontWeight:600,fontSize:13.5,marginBottom:1}}>{m.name}</div>
            <div style={{fontSize:11.5,color:'var(--text-3)',marginBottom:8}}>{m.role} · {m.dept}</div>
            <div style={{display:'flex',justifyContent:'center',marginBottom:10}}><Badge t="amber">{lvLabel(m.level)}</Badge></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:4,fontSize:10}}>
              <div style={{textAlign:'center',background:'var(--surface-2)',borderRadius:6,padding:'6px 2px'}}>
                <div style={{fontFamily:'var(--f-display)',fontWeight:800,fontSize:15,color:'var(--ink)'}}>{m.weekTasks}</div>
                <div style={{color:'var(--text-3)'}}>本周任务</div>
              </div>
              <div style={{textAlign:'center',background:'var(--surface-2)',borderRadius:6,padding:'6px 2px'}}>
                <div style={{fontFamily:'var(--f-display)',fontWeight:800,fontSize:15,color:'var(--blue)'}}>{m.aiUsageRate}%</div>
                <div style={{color:'var(--text-3)'}}>AI使用率</div>
              </div>
              <div style={{textAlign:'center',background:'var(--surface-2)',borderRadius:6,padding:'6px 2px'}}>
                <div style={{fontFamily:'var(--f-display)',fontWeight:800,fontSize:15,color:'var(--green)'}}>{m.timeSaved}h</div>
                <div style={{color:'var(--text-3)'}}>节省工时</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Efficiency Leaderboard */}
      <div className="section-label">本周效率排行榜</div>
      <div className="card" style={{padding:'0 20px'}}>
        {sorted.map((m,i)=>{
          const val=m[sortKey];
          const maxVal=Math.max(...sorted.map(x=>x[sortKey]));
          return(
            <div key={m.name} style={{display:'flex',alignItems:'center',gap:14,padding:'11px 0',borderBottom:i<sorted.length-1?'1px solid var(--border)':'none'}}>
              <div style={{width:24,textAlign:'center',fontFamily:'var(--f-display)',fontWeight:800,fontSize:14,color:i<3?'var(--amber)':'var(--text-3)'}}>
                {i<3?['🥇','🥈','🥉'][i]:i+1}
              </div>
              <div style={{fontSize:18}}>{m.avatar}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:500,fontSize:14}}>{m.name}{m.isLeader&&<Badge t="blue" style={{marginLeft:6,fontSize:9}}>Leader</Badge>}</div>
                <div style={{fontSize:11.5,color:'var(--text-3)'}}>{m.role} · {m.dept}</div>
              </div>
              <div style={{textAlign:'right',width:70}}>
                <div style={{fontFamily:'var(--f-display)',fontWeight:700,fontSize:16,color:'var(--ink)'}}>
                  {dim==='usage'?`${val}%`:dim==='time'?`${val}h`:val}
                </div>
                <div style={{fontSize:10,color:'var(--text-3)'}}>
                  {dim==='tasks'?'本周任务':dim==='usage'?'AI使用率':'节省工时'}
                </div>
              </div>
              <div style={{width:90}}><ProgressBar pct={Math.round(val/maxVal*100)}/></div>
            </div>
          );
        })}
      </div>

      {/* AI Usage Trend */}
      <div style={{marginTop:24}}>
        <div className="section-label">团队 AI 使用分布</div>
        <div className="card">
          {TEAM.map((m,i)=>(
            <div key={m.name} className="usage-bar-wrap">
              <div className="usage-bar-label">{m.name}</div>
              <div className="usage-bar">
                <div className="progress" style={{height:8}}>
                  <div className="progress-fill progress-blue" style={{width:`${m.aiUsageRate}%`,borderRadius:4,transition:'width .6s ease'}}/>
                </div>
              </div>
              <div className="usage-bar-val">{m.aiUsageRate}%</div>
            </div>
          ))}
          <div style={{marginTop:12,paddingTop:12,borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--text-3)'}}>
            <span>低使用 (≤50%): {TEAM.filter(m=>m.aiUsageRate<=50).length} 人</span>
            <span>中使用 (51-80%): {TEAM.filter(m=>m.aiUsageRate>50&&m.aiUsageRate<=80).length} 人</span>
            <span>高使用 (>80%): {TEAM.filter(m=>m.aiUsageRate>80).length} 人</span>
          </div>
        </div>
      </div>
    </div>
  );
}
