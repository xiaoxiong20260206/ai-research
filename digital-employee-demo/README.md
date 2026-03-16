# 企业数字员工平台 Demo

> AI 驱动的企业级数字员工平台交互原型 — 展示"千人千面"的个性化工作台体验

## 在线体验

- **Web 工作台 Demo**：[点击体验](https://my-ai-research-lab.github.io/digital-employee-demo/digital_employee_web_v2.html)
- **飞书机器人 Demo**：[点击体验](https://my-ai-research-lab.github.io/digital-employee-demo/feishu_bot_demo.html)

## 功能亮点

### 🎭 千人千面 — 角色个性化工作台

通过底部「Demo 控制台」切换 5 种角色，整个平台内容随之变化：

| 角色 | 工作台内容 | 专属工具 |
|------|-----------|---------|
| 💻 研发工程师 | PR Review、技术周报、CI 监控 | 即时 Code Review |
| 👩 HR 经理 | 面试评估、入职流程、简历筛选 | 简历快速评估 |
| 📊 财务主管 | 月末对账、信披报告、差异分析 | 数据快速查询 |
| ⚖️ 法务专员 | 合同审查、条款检索、修改建议 | 条款快速检索 |
| 📈 产品运营 | NAV 监控、运营报表、指标趋势 | 指标快速查询 |

### 🤖 核心特性

- **HIL (Human-in-the-Loop)** — 关键操作需人工确认，AI 不越权
- **Skills 市场** — 可组合、可复用的 AI 技能生态
- **Workflow 编排** — 多步骤流程自动化，每步生成独立任务
- **项目空间** — 研发全流程可视化 + 共享上下文
- **成长体系** — 经验值、成就系统、进化时间线
- **管理者视图** — 团队 AI 使用效率分析（隐私保护）

### 💬 飞书机器人 Demo

模拟飞书 Bot 交互界面，展示：
- 卡片消息（任务进度、HIL 审批）
- 主动触发通知
- 角色切换后的个性化对话

## 技术实现

- **纯前端**：单文件 HTML + React (Babel standalone)
- **零依赖部署**：无需构建工具，直接浏览器打开即可
- **CSS 变量系统**：Linear 风格设计系统
- **Mock 数据驱动**：完整的业务场景数据

## 本地运行

```bash
# 方法一：直接打开
open digital_employee_web_v2.html

# 方法二：本地服务器
python3 -m http.server 8080
# 访问 http://localhost:8080/digital_employee_web_v2.html
```

## 项目结构

```
├── digital_employee_web_v2.html   # Web 工作台主页面 (All-in-One)
├── feishu_bot_demo.html           # 飞书机器人 Demo
├── index.html                     # 入口导航页
└── parts/                         # 开发用拆分文件（可选参考）
```

## License

MIT
