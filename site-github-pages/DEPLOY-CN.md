# GitHub Pages 部署说明

当前目录：`site-github-pages/`

这个版本是给 GitHub Pages 单独准备的，原始 `site/` 没有被改动。

## 最省事的上传方式

推荐直接创建一个公开仓库，仓库名使用：

`lizhe19930611-arch.github.io`

如果你保持当前截图里的仓库名：

`lizhe.github.io`

这样站点地址会是：

`https://lizhe.github.io/`

这种方式最适合当前这份静态站，不需要构建，不需要服务器。

## 上传步骤

1. 在 GitHub 新建公开仓库：`你的用户名.github.io`
2. 把当前目录下的全部文件上传到仓库根目录
3. 进入仓库 `Settings` -> `Pages`
4. 在 `Build and deployment` 中选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
5. 保存后等待 1 到 3 分钟

## 上传哪些文件

把当前目录里的这些内容都上传：

- `index.html`
- `resume.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `assets/`
- `.nojekyll`

## 当前已做的 GitHub 适配

- 页面资源路径保持相对路径，可直接在 GitHub Pages 使用
- `site.webmanifest` 的 `start_url` 已改成 `./`
- 已新增 `.nojekyll`
- 原网站文件未改动

## 你上传后唯一建议再改的一项

如果你最终不是用 `你的用户名.github.io` 这种根域仓库，而是普通仓库，例如：

`https://你的用户名.github.io/lizhe-personal-site/`

那么再把下面两个文件里的占位地址替换成你的真实地址：

- `robots.txt`
- `sitemap.xml`

如果你直接用 `你的用户名.github.io` 作为仓库名，建议把：

`https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/`

替换成：

`https://你的用户名.github.io/`

