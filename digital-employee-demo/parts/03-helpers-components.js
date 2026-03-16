/* ───────────────────────────────
   HELPERS
─────────────────────────────── */
const fmtMarkdown = t => t
  .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
  .replace(/`([^`]+)`/g,'<code>$1</code>')
  .replace(/\n/g,'<br/>');

async function callClaude(msgs, sys, key, onChunk) {
  const r = await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},
    body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1500,system:sys,messages:msgs,stream:true})
  });
  if(!r.ok){const e=await r.json().catch(()=>({}));throw new Error(e.error?.message||`HTTP ${r.status}`);}
  const reader=r.body.getReader(),dec=new TextDecoder();
  let full='';
  while(true){
    const{done,value}=await reader.read();if(done)break;
    for(const line of dec.decode(value).split('\n')){
      if(line.startsWith('data: ')){try{const d=JSON.parse(line.slice(6));if(d.delta?.text){full+=d.delta.text;onChunk(full);}}catch{}}
    }
  }
  return full;
}

function mockReply(t){
  const l=t.toLowerCase();
  if(l.includes('review')||l.includes('pr')||l.includes('代码'))
    return `**Code Review 结果**\n\n🔴 **必须修复（2项）**\n- \`L234\` SQL 字符串拼接漏洞，使用 PreparedStatement 替代\n- \`L89\` 空指针未保护（position == null 时抛 NPE）\n\n🟡 **建议修复（3项）**\n- 方法 calcVaR() 圈复杂度 = 15，建议拆分\n- 测试覆盖率 62%（建议 > 80%）\n- 缺少 @Deprecated 注解\n\n🟢 **亮点**\n- retry 逻辑设计合理，历史超时问题的正确处理方式`;
  if(l.includes('周报')||l.includes('weekly'))
    return `**技术周报 Week 22 草稿**\n\n✅ **本周完成**\n- 风控引擎 PR#2847 Review 完成（2项安全漏洞修复）\n- 面试评估系统接入 AI 辅助，节省 HR 约 60% 评估时间\n- 月末对账自动化脚本完成（差异检测准确率 98.3%）\n\n⚠️ **风险/阻塞**\n- RISK 模块依赖老版本 SDK，升级影响评估中\n\n📅 **下周计划**\n- 推进 data-query Skill 内测\n- 完成 PR#2851 合并`;
  if(l.includes('ci')||l.includes('失败')||l.includes('build'))
    return `**今日 CI 失败分析**\n\n| 时间 | 任务 | 失败阶段 | 初步判断 |\n|------|------|---------|----------|\n| 09:23 | risk-engine | 单元测试 | RiskCalcTest.L45 断言失败，可能是 PR#2847 引入 |\n| 10:15 | data-pipeline | 构建 | Maven 依赖超时（网络偶发）|\n\n**建议**：risk-engine 失败需联系张伟确认，data-pipeline 重跑一次即可`;
  return `好的，我来帮你处理这个任务。\n\n基于当前上下文分析：\n- 任务类型：信息处理/分析\n- 预计涉及系统：待权限确认\n- 是否需要 HIL：视写操作而定\n\n能补充一些具体细节吗？这样我可以给出更精准的方案。`;
}

/* ───────────────────────────────
   MINI COMPONENTS
─────────────────────────────── */
function Dot({s}){return <span className={`dot dot-${s}`}/>}
function Spinner(){return <div className="spin"/>}
function ProgressBar({pct,cls='progress-blue'}){
  return <div className="progress"><div className={`progress-fill ${cls}`} style={{width:`${pct}%`}}/></div>;
}
function Badge({t,children}){return <span className={`badge badge-${t}`}>{children}</span>}

function HilCard({onDone}){
  const [dismissed,setDismissed]=useState(false);
  if(dismissed)return(
    <div className="card card-sm" style={{marginBottom:12}}>
      <div style={{textAlign:'center',color:'var(--text-3)',fontSize:13}}>✅ 无待审批操作</div>
    </div>
  );
  return(
    <div className="hil-card" style={{marginBottom:12}}>
      <div className="hil-title"><span>⏸</span>HIL 待审批 · 候选人信息写入</div>
      <div className="hil-body">
        <strong>面试评估结果</strong>即将写入招聘系统<br/>
        候选人：张晓雯 · 岗位：高级研发工程师
      </div>
      <div className="diff-block">
        <div className="diff-add">+ 综合评分: 4.2/5.0</div>
        <div className="diff-add">+ 推荐进入下一轮: true</div>
        <div className="diff-add">+ 重点考察: 系统设计能力</div>
        <div style={{color:'var(--text-3)'}}>  目标: 招聘系统/候选人库</div>
      </div>
      <div className="hil-actions">
        <button className="btn btn-blue btn-sm" onClick={()=>{setDismissed(true);onDone?.();}}>✓ 确认写入</button>
        <button className="btn btn-outline btn-sm">修改后提交</button>
        <button className="btn btn-danger btn-sm" onClick={()=>setDismissed(true)}>取消</button>
      </div>
    </div>
  );
}

function TaskDrawer({task,onClose}){
  return(
    <>
      <div className="drawer-overlay" onClick={onClose}/>
      <div className="drawer">
        <div className="drawer-head">
          <div>
            <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>{task.name}</div>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
              <Dot s={task.status}/>
              <span style={{fontSize:12,color:'var(--text-3)'}}>{task.trigger} · {task.time}</span>
              {task.saved&&<Badge t="green">省 {task.saved}min</Badge>}
              {task.jira&&<Badge t="blue">{task.jira}</Badge>}
            </div>
          </div>
          <button className="drawer-close" onClick={onClose}>×</button>
        </div>
        <div className="drawer-body">
          <div className="section-label">分身执行过程</div>
          <div style={{background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:'var(--radius-lg)',padding:'14px 16px',marginBottom:18}}>
            <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:12,paddingBottom:12,borderBottom:'1px solid var(--border)'}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:'var(--amber-bg)',border:'1px solid var(--amber-border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14}}>🦞</div>
              <div>
                <div style={{fontSize:12.5,fontWeight:600,color:'var(--amber-dim)'}}>AgentCore 协调者</div>
                <div style={{fontSize:11.5,color:'var(--text-3)'}}>任务规划 · 分身调度 · 结果汇聚</div>
              </div>
            </div>
            {task.steps.map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'flex-start',gap:9,marginBottom:7}}>
                <div style={{fontSize:14,width:18,textAlign:'center',flexShrink:0,color:s.done?'var(--green)':s.hil?'var(--orange)':s.active?'var(--blue)':'var(--text-4)'}}>
                  {s.done?'✓':s.hil?'⏸':s.active?'▶':'○'}
                </div>
                <div style={{fontSize:13,color:s.done?'var(--text)':s.hil?'var(--orange)':s.active?'var(--blue)':'var(--text-3)'}}>
                  {s.t}
                </div>
              </div>
            ))}
          </div>

          {task.hil&&task.status==='hil'&&(
            <>
              <div className="section-label">HIL 审批节点</div>
              <div className="hil-card" style={{marginBottom:18}}>
                <div className="hil-title"><span>⏸</span>{task.hil.op}</div>
                <div className="hil-body">原因：{task.hil.reason}</div>
                <div className="hil-actions">
                  <button className="btn btn-blue btn-sm">✓ 确认</button>
                  <button className="btn btn-outline btn-sm">取消</button>
                </div>
              </div>
            </>
          )}

          <div className="section-label">使用的 Skills</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:18}}>
            {task.skills.map(s=><span key={s} className="tag">{s}</span>)}
          </div>

          {task.result&&(
            <>
              <div className="section-label">执行结果</div>
              <div className="card card-sm">
                <div style={{fontSize:13.5,lineHeight:1.65}}>{task.result}</div>
              </div>
            </>
          )}

          {!task.result&&task.status!=='hil'&&(
            <div style={{textAlign:'center',padding:'20px 0',color:'var(--text-3)',fontSize:13}}>
              任务执行中...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ───────────────────────────────
   NEW: SVG Radar Chart Component
─────────────────────────────── */
function RadarChart({data,size=220}){
  const cx=size/2, cy=size/2, r=size/2-30;
  const n=data.length;
  const angle=i=>(Math.PI*2*i/n)-Math.PI/2;
  const px=(i,pct)=>cx+r*(pct/100)*Math.cos(angle(i));
  const py=(i,pct)=>cy+r*(pct/100)*Math.sin(angle(i));

  const gridLevels=[20,40,60,80,100];
  const pts=data.map((_,i)=>`${px(i,data[i].score)},${py(i,data[i].score)}`).join(' ');

  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridLevels.map(lv=>(
        <polygon key={lv} points={data.map((_,i)=>`${px(i,lv)},${py(i,lv)}`).join(' ')}
          fill="none" stroke="var(--border)" strokeWidth={lv===100?1.2:.6} strokeDasharray={lv<100?'3,3':'none'}/>
      ))}
      {/* Axes */}
      {data.map((_,i)=>(
        <line key={i} x1={cx} y1={cy} x2={px(i,100)} y2={py(i,100)} stroke="var(--border)" strokeWidth=".6"/>
      ))}
      {/* Data area */}
      <polygon points={pts} fill="rgba(37,99,235,.12)" stroke="var(--blue)" strokeWidth="2"/>
      {/* Data points */}
      {data.map((d,i)=>(
        <circle key={i} cx={px(i,d.score)} cy={py(i,d.score)} r="4" fill="var(--blue)" stroke="#fff" strokeWidth="2"/>
      ))}
      {/* Labels */}
      {data.map((d,i)=>{
        const lx=px(i,118), ly=py(i,118);
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
          style={{fontSize:10,fill:'var(--text-2)',fontFamily:'var(--f-body)'}}>{d.icon} {d.name}</text>;
      })}
    </svg>
  );
}
