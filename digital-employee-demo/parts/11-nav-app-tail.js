/* ───────────────────────────────
   NAV CONFIG (更新)
─────────────────────────────── */
const NAV_GROUPS = [
  {label:'工作区',items:[
    {id:'home',icon:'🏠',label:'工作台',badge:1},
    {id:'tasks',icon:'📋',label:'任务列表',count:'5'},
    {id:'project',icon:'🗂️',label:'项目空间'},
    {id:'notifs',icon:'🔔',label:'通知中心',badge:2},
  ]},
  {label:'能力中心',items:[
    {id:'skills',icon:'✨',label:'Skills 市场',count:'47'},
    {id:'agent',icon:'🦞',label:'我的数字员工'},
  ]},
  {label:'管理',items:[
    {id:'manager',icon:'📊',label:'管理者视图'},
  ]},
];

const PAGE_META={
  home:   {title:'工作台',sub:'与数字员工对话，管理今日任务'},
  tasks:  {title:'任务列表',sub:'查看执行过程与分身详情'},
  project:{title:'项目空间',sub:'流程管理 · Workflow 模板 · 协作'},
  notifs: {title:'通知中心',sub:'HIL 审批 · 主动触发 · 推送设置'},
  skills: {title:'Skills 市场',sub:'浏览、使用、创建和分享 Skills'},
  agent:  {title:'我的数字员工',sub:'能力体系 · 成就系统 · 进化时间线'},
  manager:{title:'管理者视图',sub:'团队 AI 使用效率 · 隐私边界保护'},
};

/* ───────────────────────────────
   APP ROOT
─────────────────────────────── */
function App(){
  const [page,setPage]=useState('home');
  const [apiKey,setApiKey]=useState('');
  const [showKey,setShowKey]=useState(false);
  const [agentName,setAgentName]=useState('小助手');
  const [isLeader,setIsLeader]=useState(true); // Demo: default Leader mode
  const meta=PAGE_META[page];

  return(
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-head">
          <div className="brand-row">
            <div className="brand-logo">🤖</div>
            <span className="brand-name">数字员工平台</span>
          </div>
          <div className="brand-org">Digital Employee · Web</div>
          <div className="agent-strip" onClick={()=>setPage('agent')}>
            <span className="agent-strip-icon">🦞</span>
            <div className="agent-strip-info">
              <div className="agent-strip-name">{agentName}</div>
              <div className="agent-strip-status">
                <div className="status-pulse"/>在线 · 3 任务运行中
              </div>
            </div>
            <span style={{fontSize:10,color:'var(--amber-dim)'}}>Lv.4</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_GROUPS.map(g=>(
            <div key={g.label} className="nav-group">
              <div className="nav-group-label">{g.label}</div>
              {g.items.map(n=>(
                <div key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={()=>setPage(n.id)}>
                  <span className="nav-icon">{n.icon}</span>
                  <span className="nav-label">{n.label}</span>
                  {n.badge&&<span className="nav-badge">{n.badge}</span>}
                  {n.count&&<span className="nav-count">{n.count}</span>}
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="xp-card" onClick={()=>setPage('agent')}>
            <div className="xp-row">
              <span className="xp-level">🤝 Lv.4 伙伴</span>
              <span className="xp-val">3420 / 5000 XP</span>
            </div>
            <div className="xp-bar"><div className="xp-fill" style={{width:'68%'}}/></div>
          </div>
          {/* Leader toggle for demo */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8,paddingTop:8,borderTop:'1px solid var(--border)'}}>
            <span style={{fontSize:11,color:'var(--text-3)'}}>Leader 权限</span>
            <div className="toggle-sw" style={{background:isLeader?'var(--blue)':'var(--border-2)'}}
              onClick={()=>setIsLeader(!isLeader)}>
              <div className="toggle-knob" style={{left:isLeader?18:2}}/>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="topbar">
          <div>
            <span className="topbar-title">{meta.title}</span>
            <span className="topbar-sub"> · {meta.sub}</span>
          </div>
          <div className="topbar-right">
            {showKey?(
              <div className="api-banner">
                <span style={{fontSize:13}}>🔑</span>
                <input className="api-key-field" type="password" placeholder="sk-ant-..." value={apiKey}
                  onChange={e=>setApiKey(e.target.value)} autoFocus/>
                <button className="btn btn-ghost btn-sm" onClick={()=>setShowKey(false)}>完成</button>
              </div>
            ):(
              <button className={`btn btn-sm ${apiKey?'btn-outline':''}`} onClick={()=>setShowKey(true)}
                style={{fontSize:12,gap:5}}>
                {apiKey
                  ?<><span style={{color:'var(--green)'}}>●</span>真实 AI 已启用</>
                  :<><span style={{color:'var(--amber)'}}>●</span>启用真实 AI</>}
              </button>
            )}
          </div>
        </div>

        <div className="page-body">
          {page==='home'&&<HomePage apiKey={apiKey} agentName={agentName}/>}
          {page==='tasks'&&<TasksPage apiKey={apiKey}/>}
          {page==='project'&&<ProjectPage/>}
          {page==='notifs'&&<NotifPage/>}
          {page==='skills'&&<SkillsPage/>}
          {page==='agent'&&<AgentPage agentName={agentName} setAgentName={setAgentName}/>}
          {page==='manager'&&<ManagerPage isLeader={isLeader}/>}
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
</script>
</body>
</html>
