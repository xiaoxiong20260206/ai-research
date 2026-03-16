/* ───────────────────────────────
   PAGE: 工作台
─────────────────────────────── */
function HomePage({apiKey,agentName}){
  const [msgs,setMsgs]=useState([
    {role:'assistant',content:`你好！我是你的数字员工 ${agentName} 🦞\n\n**今日简报**\n• 3 个任务运行中（其中 1 个待 HIL 审批）\n• PR#2847 Code Review 已完成，发现 2 项必须修复\n• 本周已节省 **3.2 小时**\n\n有什么需要我帮你处理的？`}
  ]);
  const [input,setInput]=useState('');
  const [loading,setLoading]=useState(false);
  const [stream,setStream]=useState('');
  const endRef=useRef(null);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,stream]);

  const send=useCallback(async(text)=>{
    if(!text.trim()||loading)return;
    const um={role:'user',content:text};
    setMsgs(p=>[...p,um]);setInput('');setLoading(true);setStream('');
    const sys=`你是一个企业数字员工助手，名字叫「${agentName}」，帮助员工处理日常工作。你了解：企业内部研效/HR/财务/法务等场景。回答要专业、简洁，用中文，适当使用 Markdown。写入操作前总是提醒需要人工确认（HIL）。`;
    if(!apiKey){
      await new Promise(r=>setTimeout(r,700));
      setMsgs(p=>[...p,{role:'assistant',content:mockReply(text)}]);
      setLoading(false);return;
    }
    try{
      const history=[...msgs,um].map(m=>({role:m.role,content:m.content}));
      let final='';
      await callClaude(history,sys,apiKey,p=>{final=p;setStream(p);});
      setMsgs(p=>[...p,{role:'assistant',content:final||'...'}]);
    }catch(e){
      setMsgs(p=>[...p,{role:'assistant',content:`❌ ${e.message}\n\n（切换模拟模式）\n\n${mockReply(text)}`}]);
    }
    setStream('');setLoading(false);
  },[msgs,loading,apiKey,agentName]);

  const QUICK=[{t:'分析最近 PR 的安全风险'},{t:'起草技术周报'},{t:'分析今天的 CI 失败'},{t:'生成 Sprint 回顾报告'}];

  return(
    <div className="page-in">
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-icon">⚡</div><div className="stat-val" style={{color:'var(--blue)'}}>3</div><div className="stat-label">运行中任务</div></div>
        <div className="stat-card"><div className="stat-icon">⏸</div><div className="stat-val" style={{color:'var(--orange)'}}>1</div><div className="stat-label">待 HIL 审批</div><div className="stat-delta" style={{color:'var(--orange)',fontSize:11}}>需要你确认</div></div>
        <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-val" style={{color:'var(--green)'}}>12</div><div className="stat-label">本周完成任务</div><div className="stat-delta" style={{color:'var(--green)',fontSize:11}}>↑ 4 较上周</div></div>
        <div className="stat-card"><div className="stat-icon">⏱</div><div className="stat-val" style={{color:'var(--purple)'}}>3.2h</div><div className="stat-label">本周节省工时</div><div className="stat-delta" style={{color:'var(--green)',fontSize:11}}>↑ 0.8h 较上周</div></div>
      </div>

      <div className="col-chat">
        {/* Chat */}
        <div className="card" style={{padding:0,overflow:'hidden',display:'flex',flexDirection:'column',height:'100%'}}>
          <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',gap:9,background:'var(--surface-2)'}}>
            <div style={{width:32,height:32,borderRadius:'50%',background:'var(--amber-bg)',border:'1px solid var(--amber-border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17}}>🦞</div>
            <div>
              <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{agentName}</div>
              <div style={{fontSize:11,color:'var(--green)',display:'flex',alignItems:'center',gap:4}}>
                <Dot s="running"/> 在线 · Lv.4 伙伴
              </div>
            </div>
            <div style={{marginLeft:'auto',fontSize:11,padding:'3px 8px',background:apiKey?'var(--green-bg)':'var(--amber-bg)',color:apiKey?'var(--green)':'var(--amber)',borderRadius:20,border:`1px solid ${apiKey?'#A7F3D0':'var(--amber-border)'}`}}>
              {apiKey?'🟢 真实 AI':'🟡 模拟模式'}
            </div>
          </div>
          <div className="chat-messages">
            {msgs.map((m,i)=>(
              <div key={i} className={`msg ${m.role}`}>
                <div className={`msg-avatar ${m.role==='assistant'?'ai':''}`}>{m.role==='assistant'?'🦞':'👤'}</div>
                <div className={`msg-bubble ${m.role==='assistant'?'ai':'user'}`}
                  dangerouslySetInnerHTML={{__html:fmtMarkdown(m.content)}}/>
              </div>
            ))}
            {loading&&(
              <div className="msg">
                <div className="msg-avatar ai">🦞</div>
                <div className="msg-bubble ai">
                  {stream?<span dangerouslySetInnerHTML={{__html:fmtMarkdown(stream)}}/>:<div className="typing"><span/><span/><span/></div>}
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>
          <div className="chat-foot">
            <div className="quick-pills">
              {QUICK.map(q=><button key={q.t} className="quick-pill" onClick={()=>send(q.t)}>{q.t}</button>)}
            </div>
            <div className="chat-input-row">
              <textarea className="field" rows={2} placeholder="发消息给数字员工，或直接粘贴代码..." value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(input);}}}/>
              <button className="chat-send" disabled={loading||!input.trim()} onClick={()=>send(input)}>➤</button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{display:'flex',flexDirection:'column',gap:12,overflowY:'auto'}}>
          <HilCard/>
          <div className="card">
            <div className="card-title">近期任务</div>
            {TASKS.slice(0,3).map(t=>(
              <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 0',borderBottom:'1px solid var(--border)'}}>
                <Dot s={t.status}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:500,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</div>
                  <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{t.time}</div>
                </div>
                <div style={{fontSize:11,color:t.status==='done'?'var(--green)':'var(--text-3)',flexShrink:0}}>
                  {t.status==='done'?`省${t.saved}m`:`${t.progress}%`}
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">主动触发</div>
            {[
              {icon:'💡',txt:'PR#2851 超 24h 未 Review，有延误风险',time:'10分钟前'},
              {icon:'📅',txt:'本周 Sprint 明日结束，周报草稿已准备好',time:'1小时前'},
            ].map((n,i)=>(
              <div key={i} style={{display:'flex',gap:8,padding:'9px 0',borderBottom:i===0?'1px solid var(--border)':'none',alignItems:'flex-start'}}>
                <span style={{fontSize:14,flexShrink:0}}>{n.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:12.5,lineHeight:1.5}}>{n.txt}</div>
                  <div style={{fontSize:11,color:'var(--text-3)',marginTop:2}}>{n.time}</div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={()=>send(n.txt)}>处理</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
