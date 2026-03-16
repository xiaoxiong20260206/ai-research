/* ───────────────────────────────
   MOCK DATA
─────────────────────────────── */
const TASKS = [
  {id:'t1',name:'Code Review: PR#2847 风控引擎重构',status:'done',trigger:'飞书Bot',clones:2,progress:100,saved:38,skills:['code-review','security-scan'],time:'10:23',jira:'RISK-2847',steps:[{t:'分析 PR Diff（+847/-203行）',done:true},{t:'代码规范检查',done:true},{t:'安全漏洞扫描（SQL注入/XSS）',done:true},{t:'性能隐患识别',done:true},{t:'生成 Review 报告',done:true}],result:'发现 2 项必须修复（含 SQL 注入风险），5 项建议修复，代码整体结构清晰'},
  {id:'t2',name:'面试评估报告: 张晓雯（高级研发）',status:'hil',trigger:'飞书Bot',clones:1,progress:72,saved:null,skills:['audio-to-insight','resume-screen'],time:'09:41',jira:'HR-1234',steps:[{t:'面试录音转写（47分钟）',done:true},{t:'简历解析',done:true},{t:'胜任力模型映射评分',done:true},{t:'与历史录用候选人比对',done:true},{t:'评估结果写入招聘系统（等待HIL）',done:false,hil:true}],result:null,hil:{op:'评估结果写入招聘系统',reason:'候选人敏感信息写入'}},
  {id:'t3',name:'月末对账差异分析报告',status:'running',trigger:'Web端',clones:3,progress:45,saved:null,skills:['data-narrative','financial-report'],time:'09:15',jira:null,steps:[{t:'拉取银行流水（工行/招行）',done:true},{t:'对比账务系统数据',done:true},{t:'差异项自动分类（进行中）',done:false,active:true},{t:'生成差异清单',done:false},{t:'历史差异模式分析',done:false},{t:'生成关账报告',done:false}],result:null},
  {id:'t4',name:'合同审查: XX资产管理合作协议',status:'done',trigger:'飞书文档',clones:1,progress:100,saved:65,skills:['contract-review'],time:'昨天 16:30',jira:null,steps:[{t:'解析合同结构（共38页）',done:true},{t:'关键条款提取',done:true},{t:'风险条款识别',done:true},{t:'与标准模板比对',done:true}],result:'发现 3 项高风险条款，8 项需关注条款，附详细批注'},
  {id:'t5',name:'NAV 异常监控告警 — 偏差0.3%',status:'done',trigger:'自动触发',clones:1,progress:100,saved:22,skills:['monitor-and-alert'],time:'昨天 09:02',jira:null,steps:[{t:'NAV 偏差检测（阈值0.1%）',done:true},{t:'历史30日对比',done:true},{t:'可能原因推断',done:true},{t:'推送飞书告警',done:true}],result:'偏差来源：市价波动（非计算异常），已推送告警'},
];

const SKILLS = [
  {id:'s1',icon:'📋',name:'code-review',cat:'研效',desc:'分析 PR Diff，检查规范/安全/性能，关联历史 Bug 库',rating:4.8,uses:342,hil:false,mine:true,evals:91},
  {id:'s2',icon:'🐛',name:'debug-assist',cat:'研效',desc:'读取报错上下文，推断根因，生成修复方案',rating:4.7,uses:289,hil:false,mine:true,evals:88},
  {id:'s3',icon:'🎙️',name:'audio-to-insight',cat:'HR',desc:'面试/会议录音 → 转写 → 按胜任力模型结构化输出',rating:4.6,uses:156,hil:true,mine:false,evals:85},
  {id:'s4',icon:'📄',name:'contract-review',cat:'法务',desc:'合同结构分析 + 风险条款标注（🔴🟡⚪）+ 与模板差异',rating:4.9,uses:203,hil:false,mine:false,evals:94},
  {id:'s5',icon:'📊',name:'financial-report',cat:'财务',desc:'结构化财务数据 → 按模板生成报告初稿 + 异常标注',rating:4.5,uses:87,hil:true,mine:false,evals:82},
  {id:'s6',icon:'🔍',name:'resume-screen',cat:'HR',desc:'简历 + JD → 逐维度评分 + 红旗标记 + 录用建议',rating:4.7,uses:178,hil:true,mine:true,evals:89},
  {id:'s7',icon:'🔔',name:'monitor-and-alert',cat:'业务',desc:'持续监控指定指标，超阈值时结构化推送飞书告警',rating:4.8,uses:267,hil:false,mine:false,evals:92},
  {id:'s8',icon:'📝',name:'doc-writer',cat:'研效',desc:'代码/PRD/会议 → 规范格式技术文档，支持多模板',rating:4.5,uses:201,hil:false,mine:true,evals:86},
  {id:'s9',icon:'🧪',name:'test-case-gen',cat:'研效',desc:'基于代码变更范围 + 历史 Bug 库，自动生成测试用例',rating:4.6,uses:189,hil:false,mine:true,evals:88},
  {id:'s10',icon:'📈',name:'data-query',cat:'分析',desc:'自然语言 → SQL → 结构化分析叙述（权限感知）',rating:4.6,uses:134,hil:false,mine:false,evals:87},
  {id:'s11',icon:'⚙️',name:'onboarding-flow',cat:'HR',desc:'新员工入职全流程自动化：系统申请/欢迎邮件/Checklist',rating:4.4,uses:31,hil:true,mine:false,evals:83},
  {id:'s12',icon:'🖥️',name:'system-operation',cat:'业务',desc:'历史系统 Web 操作辅助（强制HIL），支持监管系统/报销',rating:4.3,uses:44,hil:true,mine:false,evals:79},
];

const MEMORIES = [
  {type:'偏好',icon:'📌',text:'Code Review 时，优先关注 SQL 注入和敏感信息泄露风险',time:'2天前',color:'var(--blue)'},
  {type:'偏好',icon:'📌',text:'PR 报告格式：先列🔴必须修复，再列🟡建议修复，最后🟢亮点',time:'3天前',color:'var(--blue)'},
  {type:'教训',icon:'🔴',text:'debug-assist 曾建议删除 retry 逻辑，但该逻辑是针对历史遗留系统超时的特殊处理，不可删',time:'1周前',color:'var(--red)'},
  {type:'经验',icon:'⚠️',text:'RISK 模块的数据库查询不能走读写分离，必须走主库（历史坑点）',time:'2周前',color:'var(--orange)'},
  {type:'偏好',icon:'📌',text:'技术周报顺序：本周完成 → 风险/阻塞 → 下周计划',time:'3周前',color:'var(--blue)'},
  {type:'知识',icon:'🧠',text:'已学习：风控引擎架构文档 v3.2、部署规范 v2.1（Confluence）',time:'1个月前',color:'var(--teal)'},
];

const TEAM = [
  {name:'李明',role:'产品经理',avatar:'👤',level:4,tasks:87,skills:12,dept:'研效线',isLeader:false,weekTasks:14,aiUsageRate:78,timeSaved:4.2},
  {name:'张伟',role:'高级研发',avatar:'💻',level:5,tasks:234,skills:18,dept:'研效线',isLeader:true,weekTasks:32,aiUsageRate:95,timeSaved:8.6},
  {name:'王芳',role:'测试工程师',avatar:'🧪',level:3,tasks:56,skills:8,dept:'研效线',isLeader:false,weekTasks:8,aiUsageRate:62,timeSaved:2.1},
  {name:'刘洋',role:'运维工程师',avatar:'🔧',level:4,tasks:123,skills:11,dept:'研效线',isLeader:false,weekTasks:18,aiUsageRate:85,timeSaved:5.3},
  {name:'陈静',role:'HR经理',avatar:'👩',level:4,tasks:67,skills:9,dept:'职能线',isLeader:true,weekTasks:11,aiUsageRate:72,timeSaved:3.8},
  {name:'赵磊',role:'财务主管',avatar:'📊',level:3,tasks:45,skills:7,dept:'职能线',isLeader:false,weekTasks:7,aiUsageRate:55,timeSaved:1.9},
  {name:'孙丽',role:'法务专员',avatar:'⚖️',level:3,tasks:38,skills:6,dept:'职能线',isLeader:false,weekTasks:6,aiUsageRate:48,timeSaved:1.5},
  {name:'周浩',role:'产品运营',avatar:'📈',level:4,tasks:91,skills:13,dept:'业务线',isLeader:false,weekTasks:15,aiUsageRate:81,timeSaved:4.7},
];

const ABILITIES = [
  {icon:'🍑',name:'记忆沉淀',sub:'蟠桃金丹',score:78,tip:'156条记忆 · 工作偏好/失败教训/任务经验',color:'var(--amber)'},
  {icon:'👁️',name:'推理判断',sub:'火眼金睛',score:85,tip:'近30天 Evals 平均分 85 · 高于团队平均',color:'var(--blue)'},
  {icon:'☁️',name:'规划调度',sub:'筋斗云',score:72,tip:'最大3个分身并行 · 任务成功率 94%',color:'var(--teal)'},
  {icon:'✨',name:'技能编排',sub:'七十二变',score:91,tip:'12个 Skills · 平均 Evals 88分',color:'var(--purple)'},
  {icon:'🪄',name:'系统集成',sub:'金箍棒',score:65,tip:'已连接 5/8 个系统',color:'var(--green)'},
  {icon:'🛡️',name:'反思进化',sub:'铜头铁臂',score:80,tip:'8条失败教训 · 教训转化率 73%',color:'var(--orange)'},
];

const NOTIFS = [
  {id:'n1',type:'hil',title:'HIL 审批：面试评估结果写入招聘系统',body:'候选人张晓雯的评估结果即将写入，请确认',time:'09:43',icon:'⏸',badge:'hil',unread:true},
  {id:'n2',type:'done',title:'Code Review 完成：PR#2847',body:'发现 2 项必须修复，5 项建议修复，报告已生成',time:'10:31',icon:'✅',badge:'green',unread:true},
  {id:'n3',type:'alert',title:'NAV 异常告警：偏差超过阈值（0.3%）',body:'量化2号昨日净值偏差 0.3%，已分析为市价波动',time:'09:03',icon:'🔔',badge:'amber',unread:false},
  {id:'n4',type:'suggest',title:'建议：PR#2851 已超过24小时未 Review',body:'基于你的工作节奏，此 PR 有延误风险',time:'昨天 17:00',icon:'💡',badge:'blue',unread:false},
  {id:'n5',type:'done',title:'合同审查完成：XX资产管理合作协议',body:'发现 3 项高风险条款，报告已插入飞书文档',time:'昨天 16:48',icon:'✅',badge:'green',unread:false},
];

const PROJ_STAGES = [
  {id:'req',name:'需求分析',color:'var(--purple)',cards:[
    {name:'用户增长功能 Q3 需求',owner:'李明',status:'done',tag:'PRD'},
    {name:'风控引擎 v3 需求澄清',owner:'李明',status:'running',tag:'进行中'},
  ]},
  {id:'design',name:'技术设计',color:'var(--blue)',cards:[
    {name:'风控引擎 v3 技术方案',owner:'张伟',status:'done',tag:'已评审'},
  ]},
  {id:'code',name:'编码实现',color:'var(--teal)',cards:[
    {name:'PR#2847 风控重构',owner:'张伟',status:'done',tag:'已合并'},
    {name:'PR#2851 日志优化',owner:'张伟',status:'hil',tag:'Review中'},
    {name:'PR#2853 单元测试补全',owner:'王芳',status:'running',tag:'进行中'},
  ]},
  {id:'test',name:'测试验证',color:'var(--amber)',cards:[
    {name:'风控引擎 v3 集成测试',owner:'王芳',status:'running',tag:'进行中'},
  ]},
  {id:'deploy',name:'部署上线',color:'var(--orange)',cards:[
    {name:'预发布 Checklist',owner:'刘洋',status:'idle',tag:'待启动'},
  ]},
  {id:'monitor',name:'监控运维',color:'var(--green)',cards:[
    {name:'NAV 监控告警规则',owner:'刘洋',status:'done',tag:'运行中'},
  ]},
];

/* ───────────────────────────────
   NEW: Workflow Skill Templates
   每个 Workflow 本身就是一个 Skill，流程中的每个步骤会生成/关联一个任务
─────────────────────────────── */
const WORKFLOW_TEMPLATES = [
  // ─── 研效线 ───
  {id:'wf-01',name:'Code Review 全流程',role:'研效',icon:'📋',desc:'PR 提交到合并的完整代码审查流程，覆盖安全/性能/规范',skill:'code-review-workflow',steps:[
    {name:'PR Diff 分析',type:'ai',desc:'自动解析代码变更，标注关键修改点',linked:'code-review'},
    {name:'安全漏洞扫描',type:'ai',desc:'SQL注入/XSS/敏感信息泄露检测',linked:'security-scan'},
    {name:'性能影响评估',type:'ai',desc:'识别 N+1 查询、内存泄漏等性能隐患'},
    {name:'Review 报告生成',type:'ai',desc:'按🔴🟡🟢分级输出结构化报告'},
    {name:'人工确认合并',type:'hil',desc:'开发者确认修复项后合并 PR'},
  ]},
  {id:'wf-02',name:'发布上线流程',role:'研效',icon:'🚀',desc:'从代码合并到生产部署的完整发布流程',skill:'release-workflow',steps:[
    {name:'测试用例生成',type:'ai',desc:'基于代码变更范围自动生成测试用例',linked:'test-case-gen'},
    {name:'QA 测试执行',type:'manual',desc:'QA 工程师在测试环境运行回归测试'},
    {name:'预发布 Checklist',type:'collab',desc:'数字员工辅助核对部署依赖和配置'},
    {name:'部署审批',type:'hil',desc:'负责人确认后触发部署脚本'},
    {name:'部署执行',type:'ai',desc:'自动执行部署脚本并监控健康检查'},
    {name:'上线后监控',type:'ai',desc:'30分钟内持续监控核心指标异常',linked:'monitor-and-alert'},
  ]},
  {id:'wf-03',name:'Sprint 回顾报告',role:'研效',icon:'📊',desc:'Sprint 结束时自动生成回顾报告',skill:'sprint-retro',steps:[
    {name:'Jira 数据采集',type:'ai',desc:'拉取 Sprint 内所有 Story/Bug 的完成情况'},
    {name:'代码提交统计',type:'ai',desc:'统计 PR 数量、代码行数、Review 轮次'},
    {name:'效率指标计算',type:'ai',desc:'计算完成率、延期率、缺陷密度等'},
    {name:'报告生成与推送',type:'ai',desc:'生成可视化报告并推送至飞书群'},
    {name:'团队确认',type:'manual',desc:'团队成员确认报告内容，补充遗漏'},
  ]},
  // ─── HR线 ───
  {id:'wf-04',name:'招聘评估流程',role:'HR',icon:'🎙️',desc:'从简历筛选到录用决策的完整招聘辅助流程',skill:'recruitment-workflow',steps:[
    {name:'简历筛选',type:'ai',desc:'简历+JD→逐维度评分+红旗标记',linked:'resume-screen'},
    {name:'面试排期',type:'collab',desc:'数字员工协调面试官日程，发送邀请'},
    {name:'面试录音转评估',type:'ai',desc:'录音转写→胜任力模型映射→评分报告',linked:'audio-to-insight'},
    {name:'评估写入系统',type:'hil',desc:'HR 确认后写入招聘系统'},
    {name:'Offer 审批',type:'manual',desc:'HR 主管审批 Offer 方案'},
  ]},
  {id:'wf-05',name:'新员工入职流程',role:'HR',icon:'⚙️',desc:'入职全流程自动化：系统开通/培训安排/导师分配',skill:'onboarding-workflow',steps:[
    {name:'系统账号批量申请',type:'ai',desc:'自动申请邮箱/OA/代码仓/VPN等',linked:'onboarding-flow'},
    {name:'设备领取通知',type:'ai',desc:'推送IT设备领取时间地点'},
    {name:'入职培训安排',type:'collab',desc:'数字员工协调培训日程'},
    {name:'导师分配确认',type:'hil',desc:'主管确认导师人选'},
    {name:'试用期 Checklist',type:'manual',desc:'导师和新员工按清单完成各项任务'},
  ]},
  // ─── 财务线 ───
  {id:'wf-06',name:'月末对账流程',role:'财务',icon:'💰',desc:'银行/账务系统多源数据自动对账',skill:'reconciliation-workflow',steps:[
    {name:'银行流水拉取',type:'ai',desc:'自动对接银行API拉取当月流水'},
    {name:'ERP数据提取',type:'ai',desc:'从ERP系统导出当月账务数据'},
    {name:'自动对账匹配',type:'ai',desc:'逐笔匹配，标注差异项并分类',linked:'financial-report'},
    {name:'差异审核',type:'hil',desc:'财务人员审核差异项，补充说明'},
    {name:'生成关账报告',type:'ai',desc:'汇总对账结果，输出可审计报告'},
    {name:'财务主管签批',type:'manual',desc:'主管在OA系统中完成签批'},
  ]},
  {id:'wf-07',name:'信披报告生成',role:'财务',icon:'📄',desc:'定期信息披露报告的自动化生成',skill:'disclosure-workflow',steps:[
    {name:'基金数据采集',type:'ai',desc:'从PMS/托管系统提取净值/持仓数据'},
    {name:'报告模板填充',type:'ai',desc:'按监管要求模板自动填充数据'},
    {name:'数据交叉验证',type:'ai',desc:'多源数据交叉校验，标注异常'},
    {name:'合规审查',type:'hil',desc:'合规人员审核报告内容'},
    {name:'提交监管系统',type:'manual',desc:'在监管报送系统中提交'},
  ]},
  // ─── 法务线 ───
  {id:'wf-08',name:'合同审查流程',role:'法务',icon:'📜',desc:'合同从接收到归档的完整审查流程',skill:'contract-review-workflow',steps:[
    {name:'合同解析与提取',type:'ai',desc:'OCR/文档解析→关键条款提取',linked:'contract-review'},
    {name:'风险条款标注',type:'ai',desc:'与标准模板对比，标注🔴🟡🟢风险等级'},
    {name:'法务人工复核',type:'manual',desc:'法务专员逐条审核标注结果'},
    {name:'修改建议生成',type:'collab',desc:'数字员工辅助生成修改对照表'},
    {name:'定稿确认',type:'hil',desc:'双方确认最终合同版本'},
    {name:'合同归档',type:'ai',desc:'自动归档到文档管理系统并建索引'},
  ]},
  // ─── 业务线 ───
  {id:'wf-09',name:'指标监控告警',role:'业务',icon:'🔔',desc:'持续监控关键业务指标，异常时自动预警',skill:'monitor-alert-workflow',steps:[
    {name:'数据源对接',type:'ai',desc:'配置监控指标数据源和采集频率'},
    {name:'持续监控采集',type:'ai',desc:'按频率持续拉取数据，计算指标值',linked:'monitor-and-alert'},
    {name:'异常检测分析',type:'ai',desc:'多规则判断+历史对比，识别异常'},
    {name:'告警推送',type:'ai',desc:'结构化推送飞书/邮件告警'},
    {name:'业务确认处置',type:'manual',desc:'业务人员确认告警并执行处置'},
  ]},
  {id:'wf-10',name:'数据报表自动化',role:'业务',icon:'📈',desc:'日报/周报/月报的自动化生成与分发',skill:'report-automation-workflow',steps:[
    {name:'多源数据采集',type:'ai',desc:'从各业务系统拉取数据'},
    {name:'指标计算与聚合',type:'ai',desc:'按业务口径计算各维度指标',linked:'data-query'},
    {name:'报表可视化',type:'ai',desc:'生成图表并填充报表模板'},
    {name:'报表审核',type:'hil',desc:'业务负责人审核报表内容'},
    {name:'分发推送',type:'ai',desc:'按配置的渠道和名单自动分发'},
  ]},
];

/* ───────────────────────────────
   NEW: Skill Tree (三层架构)
─────────────────────────────── */
const SKILL_TREE = {
  meta: {
    label:'🏛️ 元能力层',desc:'决定"我是谁"的底层能力',
    skills:[
      {name:'记忆管理',lv:4,icon:'🧠',desc:'工作偏好/失败教训/任务经验的持久化'},
      {name:'推理判断',lv:4,icon:'👁️',desc:'复杂场景的逻辑推理与决策'},
      {name:'规划调度',lv:3,icon:'☁️',desc:'多分身并行任务的规划与协调'},
      {name:'反思进化',lv:4,icon:'🛡️',desc:'从失败中学习，持续优化执行质量'},
      {name:'风险感知',lv:3,icon:'⚠️',desc:'主动识别潜在问题和风险'},
      {name:'上下文理解',lv:5,icon:'🔗',desc:'深度理解业务上下文和历史背景'},
    ]
  },
  domain: {
    label:'🎯 领域能力层',desc:'特定领域的综合解决方案',
    groups:[
      {name:'研效领域',icon:'💻',skills:[
        {name:'代码理解',lv:5},{name:'架构分析',lv:4},{name:'安全审计',lv:4},{name:'测试策略',lv:3},
      ]},
      {name:'HR领域',icon:'👩',skills:[
        {name:'人才评估',lv:4},{name:'录音分析',lv:4},{name:'流程编排',lv:3},
      ]},
      {name:'财务领域',icon:'💰',skills:[
        {name:'数据对账',lv:3},{name:'报表生成',lv:3},{name:'异常检测',lv:4},
      ]},
      {name:'法务领域',icon:'⚖️',skills:[
        {name:'合同解析',lv:4},{name:'风险识别',lv:4},{name:'条款比对',lv:3},
      ]},
    ]
  },
  exec: {
    label:'🛠️ 执行技能层',desc:'直接完成具体任务的工具',
    groups:[
      {name:'代码分析',skills:['code-review','debug-assist','test-case-gen']},
      {name:'文档处理',skills:['doc-writer','contract-review','financial-report']},
      {name:'数据分析',skills:['data-query','monitor-and-alert']},
      {name:'录音解析',skills:['audio-to-insight','resume-screen']},
      {name:'系统操作',skills:['system-operation','onboarding-flow']},
    ]
  }
};

/* ───────────────────────────────
   NEW: 成就系统
─────────────────────────────── */
const ACHIEVEMENTS = [
  {id:'a1',icon:'🌱',name:'初次觉醒',desc:'完成第一个任务',rarity:'common',unlocked:'2024-12-01'},
  {id:'a2',icon:'📋',name:'代码守卫',desc:'完成 100 次 Code Review',rarity:'rare',unlocked:'2025-01-15'},
  {id:'a3',icon:'🧠',name:'记忆大师',desc:'积累 100 条有效记忆',rarity:'rare',unlocked:'2025-02-08'},
  {id:'a4',icon:'✨',name:'技能收藏家',desc:'拥有 10 个 Skills',rarity:'rare',unlocked:'2025-02-20'},
  {id:'a5',icon:'⏱',name:'效率之星',desc:'单周节省工时超过 8 小时',rarity:'epic',unlocked:'2025-03-01'},
  {id:'a6',icon:'🔔',name:'主动先知',desc:'主动触发被采纳 50 次',rarity:'epic',unlocked:null},
  {id:'a7',icon:'🤝',name:'跨域协作',desc:'在 3 个以上领域完成任务',rarity:'epic',unlocked:'2025-02-28'},
  {id:'a8',icon:'🛡️',name:'零失误周',desc:'连续一周所有任务 Evals ≥ 90',rarity:'epic',unlocked:null},
  {id:'a9',icon:'🌟',name:'数字员工',desc:'升至 Lv.5 满级',rarity:'legend',unlocked:null},
  {id:'a10',icon:'🏆',name:'团队支柱',desc:'被团队成员引用/复用 Skills 超过 100 次',rarity:'legend',unlocked:null},
];

/* ───────────────────────────────
   NEW: 进化时间线
─────────────────────────────── */
const EVOLUTION = [
  {ver:'v1.0',time:'2024-12',icon:'🌱',phase:'初次觉醒',desc:'诞生，学会第一个 Skill（code-review）',tags:['基础对话','单任务']},
  {ver:'v2.0',time:'2025-01',icon:'📋',phase:'技能积累',desc:'掌握 5 个 Skills，开始辅助日常研发工作',tags:['多Skill','自动触发']},
  {ver:'v3.0',time:'2025-01',icon:'⚡',phase:'效率提升',desc:'支持多分身并行，单周节省工时 3h+',tags:['多分身','效率可视化']},
  {ver:'v4.0',time:'2025-02',icon:'🤝',phase:'跨域扩展',desc:'从研效扩展到 HR/法务/财务等领域',tags:['跨域','领域Skill']},
  {ver:'v5.0',time:'当前',icon:'🌟',phase:'智能协作',desc:'Workflow 编排 + 项目上下文共享 + 主动感知',tags:['Workflow','主动触发','协作']},
  {ver:'v6.0',time:'未来',icon:'🧠',phase:'深度理解',desc:'业务语义深度理解，预测性分析和建议',tags:['预测','深度理解']},
  {ver:'v∞',time:'愿景',icon:'🌐',phase:'数字员工',desc:'真正的 AI 同事——主动分忧、持续成长、不可替代',tags:['自主决策','全领域']},
];
