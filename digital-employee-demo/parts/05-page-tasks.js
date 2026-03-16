/* ───────────────────────────────
   PAGE: 任务列表
─────────────────────────────── */
function TasksPage({apiKey}){
  const [filter,setFilter]=useState('all');
  const [selected,setSelected]=useState(null);
  const [code,setCode]=useState('');
  const [reviewing,setReviewing]=useState(false);
  const [reviewResult,setReviewResult]=useState('');

  const filtered=filter==='all'?TASKS:TASKS.filter(t=>t.status===filter);

  async function runReview(){
    if(!code.trim())return;
    setReviewing(true);setReviewResult('');
    const sys=`你是代码审查专家。对提交的代码进行专业审查，重点关注：安全漏洞/性能问题/代码规范/逻辑错误。以结构化 Markdown 格式输出，分🔴必须修复、🟡建议修复、🟢亮点。`;
    if(!apiKey){
      await new Promise(r=>setTimeout(r,1000));
      setReviewResult(mockReply('review'));setReviewing(false);return;
    }
    try{
      let r='';
      await callClaude([{role:'user',content:`请审查：\n\`\`\`\n${code}\n\`\`\``}],sys,apiKey,p=>{r=p;setReviewResult(p);});
    }catch(e){setReviewResult(`❌ ${e.message}`);}
    setReviewing(false);
  }

  return(
    <div className="page-in" style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:18}}>
      <div>
        <div style={{display:'flex',gap:6,marginBottom:14}}>
          {['all','running','hil','done'].map(f=>(
            <button key={f} className={`btn btn-sm ${filter===f?'btn-blue':'btn-outline'}`} onClick={()=>setFilter(f)}>
              {f==='all'?'全部':f==='running'?'⚡ 运行中':f==='hil'?'⏸ 待审批':'✅ 已完成'}
            </button>
          ))}
          <div style={{marginLeft:'auto',fontSize:12,color:'var(--text-3)',alignSelf:'center'}}>{filtered.length} 个任务</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {filtered.map(t=>(
            <div key={t.id} className={`task-item ${t.status}`} onClick={()=>setSelected(t)}>
              <Dot s={t.status}/>
              <div style={{flex:1,minWidth:0}}>
                <div className="task-name">{t.name}</div>
                <div className="task-meta">
                  <span>{t.time}</span><span>·</span>
                  <span>{t.trigger}</span><span>·</span>
                  <span>{t.clones} 个分身</span>
                  {t.jira&&<><span>·</span><span style={{color:'var(--blue)'}}>{t.jira}</span></>}
                </div>
                {t.status!=='done'&&<div style={{marginTop:7}}><ProgressBar pct={t.progress} cls={t.status==='hil'?'progress-amber':'progress-blue'}/></div>}
              </div>
              <div style={{flexShrink:0,textAlign:'right'}}>
                {t.status==='done'
                  ?<span style={{fontSize:12,color:'var(--green)',fontWeight:600}}>省 {t.saved}min</span>
                  :<span style={{fontSize:12,color:'var(--text-3)'}}>{t.progress}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="card">
          <div className="card-title">🧪 即时 Code Review</div>
          <textarea className="field" rows={9} style={{marginBottom:10}} value={code}
            placeholder="粘贴代码，立即 AI Review..." onChange={e=>setCode(e.target.value)}/>
          <button className="btn btn-primary" style={{width:'100%'}} disabled={reviewing||!code.trim()} onClick={runReview}>
            {reviewing?<><Spinner/>分析中...</>:'▶ 开始 Code Review'}
          </button>
          {reviewResult&&(
            <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid var(--border)',fontSize:13,lineHeight:1.7}}
              dangerouslySetInnerHTML={{__html:reviewResult
                .replace(/🔴/g,'<span style="color:var(--red)">🔴</span>')
                .replace(/🟡/g,'<span style="color:var(--amber)">🟡</span>')
                .replace(/🟢/g,'<span style="color:var(--green)">🟢</span>')
                .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
                .replace(/`([^`]+)`/g,'<code style="background:var(--surface-3);padding:1px 4px;border-radius:3px;font-size:11.5px;color:var(--blue)">$1</code>')
                .replace(/\n/g,'<br/>')}}/>
          )}
        </div>
      </div>

      {selected&&<TaskDrawer task={selected} onClose={()=>setSelected(null)}/>}
    </div>
  );
}
