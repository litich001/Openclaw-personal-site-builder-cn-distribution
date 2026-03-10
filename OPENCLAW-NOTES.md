# OpenClaw 适配说明

## 结论

可以给 OpenClaw 使用，但前提是 OpenClaw 具备足够的执行能力。

更准确地说：

- 你可以把这套技能放到 GitHub，供别人下载或接入
- 如果 OpenClaw 支持读取本地文件、执行命令、编辑文件、打包目录和上传静态站，那么它就可以按这套技能端到端执行
- 如果 OpenClaw 只支持“聊天 + 代码建议”，那它可以参考这套技能，但不能自动完成完整建站与部署

## 当前还缺什么说明或步骤

如果要让 OpenClaw 更完整地参考和使用，建议至少补清楚这些约定：

### 1. 目标资料目录约定

OpenClaw 最好知道用户资料默认放在哪里，例如：

```text
project-root/
├─ materials/
│  ├─ resume.pdf
│  ├─ intro.txt
│  ├─ links.txt
│  ├─ photos/
│  ├─ posters/
│  └─ certs/
└─ output-site/
```

否则它需要先猜目录结构。

### 2. 输出目录约定

应明确生成结果放在哪里，例如：

- `output-site/site/` 用于静态站文件
- `output-site/deploy/` 用于部署说明

### 3. 部署平台约定

要明确默认平台，例如：

- 默认部署到 Cloudflare Pages
- 如果上传失败，再退化为“输出静态目录 + 人工上传”

### 4. 权限模型说明

OpenClaw 是否具备以下能力，需要事先确认：

- 读取本地文件
- 创建目录和文件
- 修改 HTML / CSS / JS
- 运行压缩或打包命令
- 打开浏览器
- 上传静态目录
- 回写真实线上地址

### 5. 失败时的回退路径

需要明确：

- 如果无法自动部署，则输出静态目录
- 如果无法访问 Cloudflare，则生成上传步骤
- 如果资料不足，则先问答补齐再继续

### 6. 调用入口说明

如果 OpenClaw 不是原生 skill 系统，而是 prompt 驱动，就要明确：

- 读取 `SKILL.md` 作为主规则
- 读取 `workflow.md` 作为执行步骤
- 读取 `langgpt-prompt.md` 作为对话起始模板
- 读取 `AGENT-RUNBOOK.md` 作为执行协议

## 最推荐的 OpenClaw 使用方式

如果你以后真要给 OpenClaw 用，我建议这样组织：

1. 用户把资料放进固定目录
2. OpenClaw 读取该目录
3. OpenClaw 按 `SKILL.md + workflow.md + langgpt-prompt.md + AGENT-RUNBOOK.md` 执行
4. 输出静态网站目录
5. 如果具备上传能力，则上传到 Cloudflare
6. 将最终公网地址写回 SEO 字段

## 结论补充

所以你原来的说法：

“把这套 skill 上传到 GitHub 给别人调用或者让别人 OpenClaw 调用来使用”

方向是对的，但更精确的说法应是：

- 上传到 GitHub 后，别人可以下载、安装或接入这套 skill
- OpenClaw 能否真正调用并完整执行，取决于它是否支持本地文件、命令执行、文件编辑和上传能力
- 如果支持，这套 skill 可以很好复用
- 如果不支持，它仍然可以作为高质量参考规则和提示词来使用
