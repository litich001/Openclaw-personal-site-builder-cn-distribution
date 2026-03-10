# 使用说明

## 一、最简单的使用方式

把下面这个目录复制到目标工具支持的本地 skill 目录：

- `skill/personal-site-builder-cn`

如果对方的工具不支持 skill 目录，但支持自定义 prompt / workflow，则可直接复用：

- `skill/personal-site-builder-cn/SKILL.md`
- `skill/personal-site-builder-cn/references/workflow.md`
- `skill/personal-site-builder-cn/references/langgpt-prompt.md`

## 二、适合谁使用

1. 有完整简历和照片的人
2. 只有部分简历材料、但愿意通过问答补齐的人
3. 想让代理直接在本地读取资料目录并生成网站的人

## 三、建议的资料目录

建议让使用者先把自己的资料放进一个独立目录，例如：

```text
my-site-project/
├─ resume.pdf
├─ intro.txt
├─ photos/
├─ posters/
├─ certs/
└─ links.txt
```

## 四、推荐给代理的标准任务指令

### 用于 Codex / Claude Code / 同类代理

```text
使用 $personal-site-builder-cn 。
请读取我当前项目目录里的简历、照片、证书、项目资料和联系方式，帮我做一个中文优先、适合求职展示的高质量个人网站。
要求：
1. 兼顾设计感、移动端、SEO、性能和中国大陆访问下的务实部署；
2. 如果资料不全，先通过问答补齐，再开始实现；
3. 默认输出可直接上传的静态目录；
4. 如果可以部署，则优先部署到 Cloudflare，并在部署后回填真实线上地址到 SEO 字段。
```

### 如果用户没有完整资料

```text
使用 $personal-site-builder-cn 。
我现在没有整理好的完整简历，你先通过问答引导我补齐岗位方向、经历、项目、技能、联系方式和风格偏好，然后帮我生成一个个人网站的第一版。
要求网站中文优先、适合求职展示、移动端正常，并最终输出可部署的静态目录。
```

## 五、GitHub 分享怎么做

你可以把整个 `personal-site-builder-cn-distribution` 目录上传到 GitHub。
别人使用时有两种方式：

1. 直接下载仓库，把 `skill/personal-site-builder-cn` 放到本地 skill 目录
2. 读取仓库内的 skill 文件、workflow 和 prompt，手动接入自己的代理系统

## 六、哪些情况不能直接工作

如果目标工具不支持以下能力，就不能端到端自动完成：

- 读取本地文件
- 编辑项目文件
- 执行命令
- 打包静态目录
- 上传到 Cloudflare 或其他平台

此时可以退化为：

- 由代理生成代码和站点结构
- 由代理输出部署说明
- 用户手动完成上传

## 七、如果是给自动化代理使用

如果目标不是普通用户，而是 OpenClaw、Codex、Claude Code 这类更强代理，建议它同时读取下面这些文件：

- `skill/personal-site-builder-cn/SKILL.md`
- `skill/personal-site-builder-cn/references/workflow.md`
- `skill/personal-site-builder-cn/references/langgpt-prompt.md`
- `OPENCLAW-NOTES.md`
- `AGENT-RUNBOOK.md`

其中：

- `SKILL.md` 负责定义总体规则
- `workflow.md` 负责定义执行顺序
- `langgpt-prompt.md` 负责定义对话起始风格
- `OPENCLAW-NOTES.md` 负责说明能力前提
- `AGENT-RUNBOOK.md` 负责固定目录约定、输出结构、部署回填和失败回退
