/* ───────────────────────────────
   PAGE: 我的数字员工 (全新重做)
   
   借鉴参考页面的三层技能树 + 雷达图 + 成就系统 + 进化时间线
   Tab 结构：总览 | 能力体系 | 成长记录
─────────────────────────────── */
function AgentPage({agentName,setAgentName}){
  const [tab,setTab]=useState('overview');
  const [activeAbility,setActiveAbility]=useState(null);
  const [teachInput,setTeachInput]=useState('');
  const [taught,setTaught]=useState(false);
  const [editName,setEditName]=useState(false);
  const [tempName,setTempName]=useState(agentName);
  const [mems,setMems]=useState(MEMORIES);

  return(
    <div className="page-in">
      {/* ─── Top Hero Card ─── */}
      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:18,marginBottom:20}}>
        {/* Pet card */}
        <div className="card" style={{textAlign:'center',padding:'24px 20px',background:'linear-gradient(135deg,#FFFBEB,#FEF3C7 50%,#FFFBEB)',border:'1px solid var(--amber-border)',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,var(--amber),#F59E0B,var(--amber))'}}/>
          <div style={{fontSize:56,marginBottom:6,filter:'drop-shadow(0 2px 8px rgba(217,119,6,.25))',animation:'bob 3s ease-in-out infinite'}}>🦞</div>

          {editName?(
            <div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:4}}>
              <input className="field" style={{width:120,textAlign:'center',fontSize:15,fontWeight:700}} value={tempName}
                onChange={e=>setTempName(e.target.value)} autoFocus/>
              <button className="btn btn-amber btn-sm" onClick={()=>{setAgentName(tempName);setEditName(false);}}>保存</button>
            </div>
          ):(
            <div style={{fontFamily:'var(--f-display)',fontSize:18,fontWeight:800,color:'var(--amber-dim)',marginBottom:2,display:'flex',alignItems:'center',justifyContent:'center',gap:5}}>
              {agentName}
              <button className="btn btn-ghost btn-icon btn-sm" style={{padding:'2px 5px',fontSize:11}} onClick={()=>{setTempName(agentName);setEditName(true);}}>✏️</button>
            </div>
          )}
          <div style={{fontSize:11.5,color:'var(--text-3)',marginBottom:12}}>数字员工 · 在职 287 天</div>

          <div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:14,flexWrap:'wrap'}}>
            <Badge t="amber">🤝 Lv.4 伙伴</Badge>
            <Badge t="blue">✨ 12 Skills</Badge>
            <Badge t="green">✅ 高可用</Badge>
          </div>

          <div style={{background:'var(--surface)',borderRadius:8,padding:'9px 12px',border:'1px solid var(--amber-border)'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,marginBottom:4}}>
              <span style={{color:'var(--text-2)'}}>经验值</span>
              <span style={{color:'var(--amber)',fontWeight:600}}>3,420 / 5,000 XP</span>
            </div>
            <ProgressBar pct={68} cls="progress-amber"/>
            <div style={{fontSize:10.5,color:'var(--text-3)',marginTop:3}}>再 1,580 XP 升至 Lv.5</div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6,marginTop:12}}>
            {[['287','完成任务'],['156','记忆条目'],['38.4h','节省工时']].map(([v,l])=>(
              <div key={l} style={{background:'var(--surface)',borderRadius:6,padding:'7px 4px',border:'1px solid var(--amber-border)'}}>
                <div style={{fontFamily:'var(--f-display)',fontWeight:800,fontSize:16,color:'var(--amber)'}}>{v}</div>
                <div style={{fontSize:9.5,color:'var(--text-3)',marginTop:1}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Radar + Quick Stats */}
        <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:30}}>
          <div>
            <RadarChart data={ABILITIES} size={240}/>
          </div>
          <div style={{flex:1,maxWidth:250}}>
            <div style={{fontFamily:'var(--f-display)',fontWeight:700,fontSize:14,color:'var(--ink)',marginBottom:12}}>AgentCore 能力概览</div>
            {ABILITIES.map(a=>(
              <div key={a.name} style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,cursor:'pointer'}}
                onClick={()=>setActiveAbility(activeAbility?.name===a.name?null:a)}>
                <span style={{fontSize:16,width:22,textAlign:'center'}}>{a.icon}</span>
                <div style={{flex:1}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:500}}>{a.name}</span>
                    <span style={{fontSize:12,fontWeight:700,color:a.color}}>{a.score}</span>
                  </div>
                  <ProgressBar pct={a.score} cls={`progress-${a.color==='var(--blue)'?'blue':a.color==='var(--green)'?'green':'amber'}`}/>
                </div>
              </div>
            ))}
            {activeAbility&&(
              <div style={{marginTop:10,padding:'10px 12px',background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:12,color:'var(--text-2)',lineHeight:1.55,animation:'pagein .15s ease'}}>
                <strong style={{color:activeAbility.color}}>{activeAbility.name}</strong>（{activeAbility.sub}）<br/>{activeAbility.tip}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Tab Bar ─── */}
      <div style={{display:'flex',gap:10,marginBottom:18,alignItems:'center'}}>
        <div className="tabs">
          {[{id:'overview',label:'📊 总览'},{id:'skill-tree',label:'🌳 能力体系'},{id:'growth',label:'📈 成长记录'}].map(t=>(
            <div key={t.id} className={`tab ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>{t.label}</div>
          ))}
        </div>
      </div>

      {/* ═══ Tab: 总览 ═══ */}
      {tab==='overview'&&(
        <div className="col-2">
          {/* Left: Teach + Memories */}
          <div>
            <div className="card" style={{marginBottom:14}}>
              <div className="card-title">💬 教 TA 新知识</div>
              {taught?(
                <div style={{textAlign:'center',padding:'14px 0',color:'var(--green)',fontSize:13}}>
                  ✅ 已学习！+8 XP 经验值已获得
                </div>
              ):(
                <>
                  <textarea className="field" rows={3} value={teachInput}
                    placeholder={`告诉数字员工需要记住的业务规则或工作习惯...`}
                    onChange={e=>setTeachInput(e.target.value)} style={{marginBottom:8}}/>
                  <div style={{display:'flex',gap:6,marginBottom:8}}>
                    {['偏好','教训','知识','经验'].map(t=>(
                      <span key={t} className="tag" style={{cursor:'pointer',fontSize:11}} onClick={()=>setTeachInput(`[${t}] `+teachInput)}>{t}</span>
                    ))}
                  </div>
                  <button className="btn btn-amber" style={{width:'100%'}} disabled={!teachInput.trim()}
                    onClick={()=>{
                      const type=teachInput.startsWith('[')?(teachInput.match(/\[(.+?)\]/)?.[1]||'知识'):'知识';
                      const text=teachInput.replace(/^\[.+?\]\s*/,'');
                      setMems(p=>[{type,icon:type==='偏好'?'📌':type==='教训'?'🔴':type==='知识'?'🧠':'💡',text,time:'刚刚',color:'var(--blue)'},...p]);
                      setTaught(true);setTeachInput('');
                      setTimeout(()=>setTaught(false),2500);
                    }}>
                    ➕ 教数字员工记住这个
                  </button>
                </>
              )}
            </div>

            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
              <div className="section-label" style={{marginBottom:0}}>记忆日志</div>
              <span style={{fontSize:12,color:'var(--text-3)'}}>共 {mems.length} 条</span>
            </div>
            <div className="card" style={{padding:'0 14px',maxHeight:300,overflowY:'auto'}}>
              {mems.map((m,i)=>(
                <div key={i} className="mem-item">
                  <div style={{fontSize:14,width:18,textAlign:'center',flexShrink:0,marginTop:1}}>{m.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,lineHeight:1.5}}>{m.text}</div>
                    <div style={{fontSize:11,color:'var(--text-3)',marginTop:2,display:'flex',gap:6,alignItems:'center'}}>
                      <Badge t="gray">{m.type}</Badge>{m.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Achievements */}
          <div>
            <div className="section-label">成就系统</div>
            <div className="achv-grid">
              {ACHIEVEMENTS.map(a=>{
                const rCls=a.rarity==='common'?'':a.rarity==='rare'?'rare':a.rarity==='epic'?'epic':'legend';
                const rColor={common:'var(--text-3)',rare:'var(--blue)',epic:'var(--purple)',legend:'var(--amber)'}[a.rarity];
                return(
                  <div key={a.id} className={`achv-card ${rCls} ${!a.unlocked?'locked':''}`} title={a.desc}>
                    <div className="achv-icon">{a.unlocked?a.icon:'🔒'}</div>
                    <div className="achv-name">{a.name}</div>
                    <div className="achv-rarity" style={{color:rColor}}>{a.rarity==='common'?'普通':a.rarity==='rare'?'稀有':a.rarity==='epic'?'史诗':'传说'}</div>
                    {a.unlocked&&<div style={{fontSize:10,color:'var(--text-3)',marginTop:2}}>{a.unlocked}</div>}
                  </div>
                );
              })}
            </div>

            <div className="section-label" style={{marginTop:18}}>成长历程</div>
            <div style={{display:'flex',gap:0,paddingLeft:8}}>
              {[['🥚 幼苗','已解锁'],['🌿 学徒','已解锁'],['⚡ 助手','已解锁'],['🤝 伙伴','当前'],['🌟 数字员工','待解锁']].map(([l,s],i)=>(
                <div key={i} style={{flex:1,textAlign:'center',position:'relative'}}>
                  {i<4&&<div style={{position:'absolute',top:11,left:'50%',right:'-50%',height:2,background:i<3?'var(--green)':i===3?'linear-gradient(90deg,var(--green),var(--border))':'var(--border)',zIndex:0}}/>}
                  <div style={{width:22,height:22,borderRadius:'50%',background:s==='当前'?'var(--amber)':s==='已解锁'?'var(--green)':'var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,margin:'0 auto 4px',position:'relative',zIndex:1,border:'2px solid var(--surface)',color:'#fff'}}>
                    {s==='已解锁'||s==='当前'?'✓':''}
                  </div>
                  <div style={{fontSize:10,color:s==='当前'?'var(--amber)':s==='已解锁'?'var(--green)':'var(--text-3)',fontWeight:s==='当前'?700:400,lineHeight:1.3}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ Tab: 能力体系（三层技能树） ═══ */}
      {tab==='skill-tree'&&(
        <div>
          {/* Meta layer */}
          <div className="skill-tree-layer layer-meta">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontSize:18}}>{SKILL_TREE.meta.label.split(' ')[0]}</span>
              <div>
                <div style={{fontFamily:'var(--f-display)',fontWeight:700,fontSize:14,color:'var(--purple)'}}>{SKILL_TREE.meta.label.split(' ').slice(1).join(' ')}</div>
                <div style={{fontSize:12,color:'var(--text-2)'}}>{SKILL_TREE.meta.desc}</div>
              </div>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {SKILL_TREE.meta.skills.map(sk=>(
                <div key={sk.name} className="skill-node" title={sk.desc}>
                  <span style={{fontSize:13}}>{sk.icon}</span>
                  <span>{sk.name}</span>
                  <span className={`skill-lv lv-${sk.lv}`}>L{sk.lv}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="layer-connector">↓ 赋能 ↓</div>

          {/* Domain layer */}
          <div className="skill-tree-layer layer-domain">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontSize:18}}>{SKILL_TREE.domain.label.split(' ')[0]}</span>
              <div>
                <div style={{fontFamily:'var(--f-display)',fontWeight:700,fontSize:14,color:'var(--blue)'}}>{SKILL_TREE.domain.label.split(' ').slice(1).join(' ')}</div>
                <div style={{fontSize:12,color:'var(--text-2)'}}>{SKILL_TREE.domain.desc}</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
              {SKILL_TREE.domain.groups.map(g=>(
                <div key={g.name} style={{background:'rgba(255,255,255,.6)',border:'1px solid var(--blue-border)',borderRadius:'var(--radius)',padding:'10px 12px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:8}}>
                    <span style={{fontSize:14}}>{g.icon}</span>
                    <span style={{fontWeight:600,fontSize:13}}>{g.name}</span>
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                    {g.skills.map(sk=>(
                      <div key={sk.name} className="skill-node" style={{fontSize:11.5}}>
                        <span>{sk.name}</span>
                        <span className={`skill-lv lv-${sk.lv}`}>L{sk.lv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="layer-connector">↓ 调用 ↓</div>

          {/* Execution layer */}
          <div className="skill-tree-layer layer-exec">
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
              <span style={{fontSize:18}}>{SKILL_TREE.exec.label.split(' ')[0]}</span>
              <div>
                <div style={{fontFamily:'var(--f-display)',fontWeight:700,fontSize:14,color:'var(--teal)'}}>{SKILL_TREE.exec.label.split(' ').slice(1).join(' ')}</div>
                <div style={{fontSize:12,color:'var(--text-2)'}}>{SKILL_TREE.exec.desc}</div>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
              {SKILL_TREE.exec.groups.map(g=>(
                <div key={g.name} style={{background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'10px 12px'}}>
                  <div style={{fontWeight:600,fontSize:12,color:'var(--text-2)',marginBottom:7}}>{g.name}</div>
                  <div style={{display:'flex',flexDirection:'column',gap:4}}>
                    {g.skills.map(sName=>{
                      const sk=SKILLS.find(s=>s.name===sName);
                      return sk?(
                        <div key={sName} style={{display:'flex',alignItems:'center',gap:6,fontSize:12}}>
                          <span style={{fontSize:14}}>{sk.icon}</span>
                          <span style={{flex:1}}>{sk.name}</span>
                          {sk.mine&&<Badge t="blue" style={{fontSize:9}}>✓</Badge>}
                          <span style={{fontSize:10.5,color:'var(--text-3)'}}>{sk.evals}分</span>
                        </div>
                      ):<div key={sName} style={{fontSize:12,color:'var(--text-3)'}}>{sName}</div>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats summary */}
          <div style={{marginTop:18,display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
            {[
              {label:'元能力',val:'6',sub:'平均 L3.8',color:'var(--purple)'},
              {label:'领域能力',val:'4',sub:'覆盖 4 领域',color:'var(--blue)'},
              {label:'执行技能',val:'12',sub:'平均 Evals 87',color:'var(--teal)'},
              {label:'Workflow',val:'10',sub:'5 个角色模板',color:'var(--green)'},
              {label:'综合评分',val:'82',sub:'高于团队平均',color:'var(--amber)'},
            ].map(s=>(
              <div key={s.label} className="card" style={{textAlign:'center',padding:'14px 10px'}}>
                <div style={{fontFamily:'var(--f-display)',fontWeight:800,fontSize:24,color:s.color}}>{s.val}</div>
                <div style={{fontSize:12,fontWeight:600,color:'var(--text-2)',marginBottom:2}}>{s.label}</div>
                <div style={{fontSize:10.5,color:'var(--text-3)'}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Tab: 成长记录（进化时间线） ═══ */}
      {tab==='growth'&&(
        <div className="col-2">
          <div>
            <div className="section-label">进化时间线</div>
            <div className="card">
              <div className="evo-timeline">
                {EVOLUTION.map((ev,i)=>{
                  const isCurrent=ev.time==='当前';
                  const isFuture=ev.time==='未来'||ev.time==='愿景';
                  return(
                    <div key={ev.ver} className="evo-item">
                      <div className={`evo-dot ${isCurrent?'current':isFuture?'future':'past'}`}/>
                      <div style={{display:'flex',alignItems:'flex-start',gap:10}}>
                        <div style={{fontSize:22,width:32,textAlign:'center',flexShrink:0}}>{ev.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:3}}>
                            <span style={{fontWeight:700,fontSize:14,color:isCurrent?'var(--amber)':isFuture?'var(--text-3)':'var(--ink)'}}>{ev.ver}</span>
                            <Badge t={isCurrent?'amber':isFuture?'gray':'green'}>{ev.phase}</Badge>
                            <span style={{fontSize:11,color:'var(--text-3)'}}>{ev.time}</span>
                          </div>
                          <div style={{fontSize:13,color:isFuture?'var(--text-3)':'var(--text-2)',lineHeight:1.6,marginBottom:5}}>{ev.desc}</div>
                          <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                            {ev.tags.map(t=><span key={t} className="tag" style={{fontSize:10}}>{t}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="section-label">成就墙</div>
            <div className="achv-grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
              {ACHIEVEMENTS.filter(a=>a.unlocked).map(a=>{
                const rColor={common:'var(--text-3)',rare:'var(--blue)',epic:'var(--purple)',legend:'var(--amber)'}[a.rarity];
                return(
                  <div key={a.id} className={`achv-card ${a.rarity!=='common'?a.rarity:''}`}>
                    <div className="achv-icon">{a.icon}</div>
                    <div className="achv-name">{a.name}</div>
                    <div className="achv-rarity" style={{color:rColor}}>{a.rarity==='common'?'普通':a.rarity==='rare'?'稀有':a.rarity==='epic'?'史诗':'传说'}</div>
                    <div style={{fontSize:10.5,color:'var(--text-2)',marginTop:3,lineHeight:1.4}}>{a.desc}</div>
                    <div style={{fontSize:10,color:'var(--text-3)',marginTop:2}}>解锁于 {a.unlocked}</div>
                  </div>
                );
              })}
            </div>

            <div className="section-label" style={{marginTop:18}}>周增长趋势</div>
            <div className="card">
              {[
                {label:'任务完成',val:'+12',pct:67,color:'var(--blue)'},
                {label:'新增记忆',val:'+6',pct:40,color:'var(--teal)'},
                {label:'Evals 平均',val:'85.2',pct:85,color:'var(--green)'},
                {label:'节省工时',val:'+3.2h',pct:56,color:'var(--amber)'},
              ].map(w=>(
                <div key={w.label} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}>
                    <span style={{color:'var(--text-2)'}}>{w.label}</span>
                    <span style={{fontWeight:700,color:w.color}}>{w.val}</span>
                  </div>
                  <ProgressBar pct={w.pct} cls={`progress-${w.color==='var(--blue)'?'blue':w.color==='var(--green)'?'green':'amber'}`}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
