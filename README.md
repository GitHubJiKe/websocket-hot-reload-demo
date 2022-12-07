# WebSocket 热更新

<button id="btn">修改标题颜色</button>

> 热更新的原理很简单，其实就是借助 websocket，在客户端和服务端之间建立一个全双工的长连接；
> 然后，通过监听源文件的变更，当有变化的时候，就推送给客户端刷新页面的消息，客户端执行刷新操作，页面 reload,加载最新的静态资源

![](./public/assets/WechatIMG87.png)
