# 网络面板

测试您的网速，多出口查询您的ip地址

支持定量完成，支持多线程，适配iOS后台运行。

如果你不了解如何打包vite项目，请[点此下载](https://github.com/ljxi/NetworkPanel/archive/refs/heads/gh-pages.zip)解压文件部署到服务器根目录即可

或者使用`Docker`部署
```bash
docker run -d --rm -p 8080:80 netart/network-panel:latest
```

或者使用腾讯云提供的一键部署

[![Use EdgeOne Pages to deploy](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https%3A%2F%2Fgithub.com%2Fljxi%2FNetworkPanel&repository-name=NetworkPanel&project-name=network-panel&build-command=pnpm%20run%20build&install-command=pnpm%20i&output-directory=dist&root-directory=.%2F)

[Demo](https://ljxi.github.io/NetworkPanel/)

这是vue3重写版本，旧版本在old分支，这次重写，主要增加了以下特性：

1.支持添加自定义节点

2.启动之后更改节点与线程数立即生效（旧版本需要重新启动）

3.线程数和后台开关状态保存

4.更友好的界面

5.榜单功能(需要后端支持)
