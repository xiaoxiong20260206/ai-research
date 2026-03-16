/* ───────────────────────────────
   PAGE: 项目空间 (增强版 — 含 Workflow 模板)
   
   设计要点：
   1. Workflow 本身就是一种 Skill（Workflow Skill），可在 Skills 市场复用
   2. 流程中的每个步骤会生成/关联一个独立任务（linked 字段关联）
   3. 步骤类型：ai(自动执行) / manual(操作传统软件) / hil(人工审批) / collab(人机协作)
   4. 不同用户角色看到不同的 Workflow 模板
─────────────────────────────── */
function ProjectPage(){
  const [tab,setTab]=useState('pipeline');
  const [selectedCard,setSelectedCard]=useState(null);
  const [wfRole,setWfRole]=useState('all');
  const [selectedWf,setSelectedWf]=useState(null);

  const statusColor={done:'var(--green)',running:'var(--blue)',hil:'var(--orange)',idle:'var(--text-3)'};
  const statusLabel={done:'已完成',running:'进行中',hil:'待审批',idle:'待启动'};
  const typeConfig={
    ai:    {label:'🤖 AI自动',color:'var(--blue)',bg:'var(--blue-bg)',border:'var(--blue-border)'},
    manual:{label:'👤 人工操作',color:'var(--text-2)',bg:'var(--surface-3)',border:'var(--border-2)'},
    hil:   {label:'⏸ 审批确认',color:'var(--orange)',bg:'var(--orange-bg)',border:'#FED7AA'},
    collab:{label:'🤝 人机协作',color:'var(--purple)',bg:'var(--purple-bg)',border:'#DDD6FE'},
  };

  const wfRoles=['all','研效','HR','财务','法务','业务'];
  const filteredWf=wfRole==='all'?WORKFLOW_TEMPLATES:WORKFLOW_TEMPLATES.filter(w=>w.role===wfRole);

  return(
    <div className="page-in">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <div>
          <div style={{fontFamily:'var(--f-display)',fontSize:17,fontWeight:700,color:'var(--ink)'}}>风控引擎 v3 重构</div>
          <div style={{fontSize:12,color:'var(--text-3)',marginTop:2}}>研效线 · 5 名成员 · Sprint 结束于 3月15日</div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <div className="tabs">
            {['pipeline','workflows','context','members','assets'].map(t=>(
              <div key={t} className={`tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>
                {t==='pipeline'?'📋 流程视图':t==='workflows'?'🔄 Workflow 模板':t==='context'?'📚 共享上下文':t==='members'?'👥 成员':'📁 历史资产'}
              </div>
            ))}
          </div>
          <button className="btn btn-primary btn-sm">+ 新建任务</button>
        </div>
      </div>

      {/* ─── Tab: Pipeline（原有） ─── */}
      {tab==='pipeline'&&(
        <>
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',overflow:'hidden',boxShadow:'var(--shadow-sm)'}}>
            <div style={{padding:'12px 16px',borderBottom:'1px solid var(--border)',background:'var(--surface-2)',display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:12,fontWeight:600,color:'var(--text-2)'}}>研发全流程进度</span>
              <Badge t="blue">8 个活跃任务</Badge>
              <Badge t="green">Sprint 完成度 67%</Badge>
              <div style={{marginLeft:'auto',fontSize:12,color:'var(--text-3)'}}>点击任务卡片查看详情</div>
            </div>
            <div className="pipeline" style={{padding:'0 8px 16px'}}>
              {PROJ_STAGES.map(stage=>(
                <div key={stage.id} className="pipeline-stage">
                  <div className="stage-header">
                    <div style={{display:'flex',alignItems:'center',gap:6}}>
                      <div style={{width:3,height:14,background:stage.color,borderRadius:2}}/>
                      <span className="stage-name">{stage.name}</span>
                    </div>
                    <span className="stage-count">{stage.cards.length}</span>
                  </div>
                  {stage.cards.map((c,i)=>(
                    <div key={i} className="stage-card" onClick={()=>setSelectedCard({...c,stage:stage.name})}>
                      <div className="stage-card-name">{c.name}</div>
                      <div className="stage-card-meta">
                        <span>{c.owner}</span>
                        <span>·</span>
                        <span style={{color:statusColor[c.status]}}>{statusLabel[c.status]}</span>
                      </div>
                      <div style={{marginTop:6}}>
                        <span className="tag" style={{fontSize:10}}>{c.tag}</span>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-ghost btn-sm" style={{width:'100%',fontSize:12,color:'var(--text-3)',border:'1px dashed var(--border)',borderRadius:'var(--radius)',padding:'6px'}}>
                    + 新增
                  </button>
                </div>
              ))}
            </div>
          </div>

          {selectedCard&&(
            <>
              <div className="drawer-overlay" onClick={()=>setSelectedCard(null)}/>
              <div className="drawer">
                <div className="drawer-head">
                  <div>
                    <div style={{fontWeight:700,fontSize:15,marginBottom:5}}>{selectedCard.name}</div>
                    <div style={{display:'flex',gap:7,alignItems:'center'}}>
                      <Badge t="blue">{selectedCard.stage}</Badge>
                      <span style={{fontSize:12,color:statusColor[selectedCard.status]}}>{statusLabel[selectedCard.status]}</span>
                    </div>
                  </div>
                  <button className="drawer-close" onClick={()=>setSelectedCard(null)}>×</button>
                </div>
                <div className="drawer-body">
                  <div className="section-label">负责人</div>
                  <div style={{fontSize:13.5,marginBottom:16}}>{selectedCard.owner}</div>
                  <div className="section-label">数字员工辅助</div>
                  <div style={{background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'12px 14px',fontSize:13,lineHeight:1.65}}>
                    {selectedCard.status==='done'&&'✅ 已完成。数字员工已将执行摘要写入共享上下文，下游阶段可直接检索。'}
                    {selectedCard.status==='running'&&'⚡ 数字员工正在辅助处理中，结果将自动推送飞书。'}
                    {selectedCard.status==='hil'&&'⏸ 等待 HIL 确认后继续执行，请在飞书 Bot 或通知中心审批。'}
                    {selectedCard.status==='idle'&&'○ 任务尚未启动，可触发数字员工开始处理。'}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* ─── Tab: Workflow 模板（新增） ─── */}
      {tab==='workflows'&&(
        <>
          <div style={{background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:'var(--radius)',padding:'12px 16px',marginBottom:16,fontSize:12.5,color:'var(--text-2)',lineHeight:1.6}}>
            <strong style={{color:'var(--ink)'}}>💡 Workflow = Skill</strong> · 每个 Workflow 本身就是一个 Skill，可以在 Skills 市场复用和分享。
            流程中的每个步骤会生成一个独立任务，可在「任务列表」中追踪。
            步骤类型：<span className="wf-type-chip" style={{background:'var(--blue-bg)',color:'var(--blue)'}}>🤖 AI自动</span>{' '}
            <span className="wf-type-chip" style={{background:'var(--surface-3)',color:'var(--text-2)'}}>👤 人工操作</span>{' '}
            <span className="wf-type-chip" style={{background:'var(--orange-bg)',color:'var(--orange)'}}>⏸ 审批确认</span>{' '}
            <span className="wf-type-chip" style={{background:'var(--purple-bg)',color:'var(--purple)'}}>🤝 人机协作</span>
          </div>

          <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
            {wfRoles.map(r=>(
              <button key={r} className={`btn btn-sm ${wfRole===r?'btn-blue':'btn-outline'}`} onClick={()=>{setWfRole(r);setSelectedWf(null);}}>
                {r==='all'?'全部角色':r}
              </button>
            ))}
            <div style={{marginLeft:'auto',fontSize:12,color:'var(--text-3)',alignSelf:'center'}}>{filteredWf.length} 个模板</div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:selectedWf?'1fr 1fr':'1fr 1fr',gap:16}}>
            <div>
              <div className="wf-grid">
                {filteredWf.map(wf=>(
                  <div key={wf.id} className={`wf-card ${selectedWf?.id===wf.id?'selected':''}`}
                    style={{'--card-color':typeConfig.ai.color}} onClick={()=>setSelectedWf(wf)}>
                    <div style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:8}}>
                      <div style={{fontSize:24,width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:10,flexShrink:0}}>{wf.icon}</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:600,fontSize:13.5,marginBottom:3}}>{wf.name}</div>
                        <div style={{display:'flex',gap:5}}>
                          <Badge t="gray">{wf.role}</Badge>
                          <Badge t="blue">{wf.steps.length} 步</Badge>
                        </div>
                      </div>
                    </div>
                    <div style={{fontSize:12,color:'var(--text-2)',lineHeight:1.55,marginBottom:8}}>{wf.desc}</div>
                    <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                      {wf.steps.map((s,i)=>{
                        const tc=typeConfig[s.type];
                        return <div key={i} style={{width:18,height:18,borderRadius:'50%',background:tc.bg,border:`1px solid ${tc.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:8}} title={`${i+1}. ${s.name} (${tc.label})`}>
                          {i+1}
                        </div>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedWf&&(
              <div>
                <div className="card" style={{position:'sticky',top:0}}>
                  <div style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:14}}>
                    <div style={{fontSize:28,width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:12}}>{selectedWf.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{selectedWf.name}</div>
                      <div style={{display:'flex',gap:6}}>
                        <Badge t="gray">{selectedWf.role}</Badge>
                        <Badge t="blue">Workflow Skill</Badge>
                        <Badge t="teal">{selectedWf.steps.length} 步骤</Badge>
                      </div>
                    </div>
                  </div>
                  <div style={{fontSize:13,color:'var(--text-2)',lineHeight:1.6,marginBottom:16}}>{selectedWf.desc}</div>

                  <div className="section-label">执行步骤</div>
                  {selectedWf.steps.map((step,i)=>{
                    const tc=typeConfig[step.type];
                    return(
                      <div key={i} className="wf-step">
                        <div className={`wf-step-num wf-step-${step.type}`}>{i+1}</div>
                        <div style={{flex:1}}>
                          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:3}}>
                            <span style={{fontWeight:600,fontSize:13}}>{step.name}</span>
                            <span className="wf-type-chip" style={{background:tc.bg,color:tc.color,border:`1px solid ${tc.border}`}}>{tc.label}</span>
                          </div>
                          <div style={{fontSize:12,color:'var(--text-2)',lineHeight:1.5}}>{step.desc}</div>
                          {step.linked&&(
                            <div style={{fontSize:11,color:'var(--blue)',marginTop:3}}>
                              → 关联 Skill: {step.linked}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div style={{display:'flex',gap:8,marginTop:16}}>
                    <button className="btn btn-primary" style={{flex:1}}>▶ 启动此 Workflow</button>
                    <button className="btn btn-outline">查看 Skill 详情</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ─── Tab: Context（原有） ─── */}
      {tab==='context'&&(
        <div className="col-2">
          <div>
            <div className="section-label">共享上下文面板</div>
            <div className="ctx-panel">
              {[
                {icon:'📋',title:'需求文档',body:'PRD v2.1 已确认，核心需求：重构风控引擎提升吞吐量 3x，支持新的 VaR 计算模型',role:'PM · 李明',time:'3天前'},
                {icon:'🏗️',title:'技术方案',body:'采用 CQRS 架构，独立读写模型；主库分片键：fund_id；不走读写分离（历史坑点）',role:'架构师 · 张伟',time:'2天前'},
                {icon:'⚠️',title:'已知风险',body:'遗留系统 SDK v2.3 有内存泄漏问题，升级前需评估影响；RISK 模块主库依赖需保留',role:'研发 · 张伟',time:'1天前'},
                {icon:'🧪',title:'测试范围',body:'基于 PR#2847 变更范围，需覆盖：VaR 计算/仓位聚合/风险报告 3 个模块',role:'QA · 王芳',time:'今天'},
                {icon:'📦',title:'部署依赖',body:'依赖服务：data-pipeline v3.1+；数据库迁移脚本 migration_v3.sql 已准备',role:'运维 · 刘洋',time:'今天'},
              ].map((c,i)=>(
                <div key={i} className="ctx-item">
                  <div className="ctx-icon">{c.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:600,fontSize:13.5,marginBottom:3}}>{c.title}</div>
                    <div style={{fontSize:12.5,color:'var(--text-2)',lineHeight:1.6,marginBottom:5}}>{c.body}</div>
                    <div style={{fontSize:11,color:'var(--text-3)'}}>{c.role} · {c.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-label">上下文引用统计</div>
            <div className="card">
              {[
                {label:'需求文档被引用',val:14,color:'var(--purple)'},
                {label:'技术方案被引用',val:11,color:'var(--blue)'},
                {label:'已知风险被引用',val:8,color:'var(--red)'},
                {label:'测试范围被引用',val:3,color:'var(--teal)'},
              ].map(r=>(
                <div key={r.label} style={{marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:12.5,marginBottom:5}}>
                    <span style={{color:'var(--text-2)'}}>{r.label}</span>
                    <span style={{fontWeight:700,color:r.color}}>{r.val} 次</span>
                  </div>
                  <ProgressBar pct={r.val/14*100} cls={`progress-${r.color==='var(--blue)'?'blue':r.color==='var(--green)'?'green':r.color==='var(--red)'?'':'amber'}`}/>
                </div>
              ))}
              <div style={{marginTop:14,paddingTop:12,borderTop:'1px solid var(--border)',fontSize:12,color:'var(--text-3)',lineHeight:1.6}}>
                共享上下文被下游分身引用 <strong style={{color:'var(--text)'}}>36 次</strong>，节省信息同步时间约 <strong style={{color:'var(--green)'}}>4.2h</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Tab: Members ─── */}
      {tab==='members'&&(
        <div className="card">
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13.5}}>
            <thead>
              <tr style={{borderBottom:'2px solid var(--border)'}}>
                {['成员','角色','权限级别','可访问数据','任务数','数字员工等级'].map(h=>(
                  <th key={h} style={{textAlign:'left',padding:'8px 12px',fontSize:12,fontWeight:600,color:'var(--text-3)',textTransform:'uppercase',letterSpacing:'.05em'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {name:'李明',role:'PM',perm:'需求管理员',data:'需求+设计（全量）',tasks:12,level:'Lv.4 伙伴'},
                {name:'张伟',role:'技术负责人',perm:'研发管理员',data:'代码+技术方案（全量）',tasks:87,level:'Lv.5 数字员工'},
                {name:'王芳',role:'QA工程师',perm:'测试成员',data:'需求+代码变更（只读）',tasks:23,level:'Lv.3 助手'},
                {name:'刘洋',role:'运维工程师',perm:'部署成员',data:'测试结果+部署配置',tasks:31,level:'Lv.4 伙伴'},
              ].map((m,i)=>(
                <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>
                  <td style={{padding:'11px 12px',fontWeight:500}}>{m.name}</td>
                  <td style={{padding:'11px 12px',color:'var(--text-2)'}}>{m.role}</td>
                  <td style={{padding:'11px 12px'}}><Badge t="blue">{m.perm}</Badge></td>
                  <td style={{padding:'11px 12px',color:'var(--text-2)',fontSize:12.5}}>{m.data}</td>
                  <td style={{padding:'11px 12px',fontWeight:600,color:'var(--ink)'}}>{m.tasks}</td>
                  <td style={{padding:'11px 12px'}}><Badge t="amber">{m.level}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Tab: Assets ─── */}
      {tab==='assets'&&(
        <div className="col-2">
          {[
            {icon:'💻',type:'代码仓',name:'risk-engine (GitLab)',status:'已索引',detail:'1,247 个文件 · 摘要 RAG · 上次同步 2小时前',badge:'green'},
            {icon:'📋',type:'Jira Issues',name:'RISK 项目空间',status:'已索引',detail:'342 个 Issue · Epic-Story 层级 · 含历史 Sprint',badge:'green'},
            {icon:'📚',type:'Confluence',name:'风控引擎架构文档',status:'已索引',detail:'28 个页面 · 段落级 RAG · 含 v3.2 最新版',badge:'green'},
            {icon:'🧪',type:'测试用例库',name:'风控模块测试集',status:'已索引',detail:'156 个用例 · 按模块分类 · 含历史失败用例',badge:'green'},
            {icon:'📦',type:'部署脚本',name:'Runbook / deployment',status:'待录入',detail:'尚未上传，建议上传 deploy.sh 和回滚脚本',badge:'amber'},
          ].map((a,i)=>(
            <div key={i} className="card">
              <div style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                <div style={{fontSize:24,width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center',background:'var(--surface-2)',border:'1px solid var(--border)',borderRadius:10}}>{a.icon}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:3}}>
                    <span style={{fontSize:11,color:'var(--text-3)'}}>{a.type}</span>
                    <Badge t={a.badge}>{a.status}</Badge>
                  </div>
                  <div style={{fontWeight:600,fontSize:13.5,marginBottom:3}}>{a.name}</div>
                  <div style={{fontSize:12.5,color:'var(--text-2)',lineHeight:1.5}}>{a.detail}</div>
                </div>
              </div>
              {a.badge==='amber'&&(
                <button className="btn btn-outline btn-sm" style={{marginTop:10,width:'100%'}}>+ 上传资产</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
