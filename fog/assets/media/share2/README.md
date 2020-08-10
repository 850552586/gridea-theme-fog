Share.js
===

自动生成分享组件，包括（微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+、点点）等网站

# 安装


1. 使用 [npm](https://npmjs.com)

    ```shell
    npm install share2
    ```

4. 手动下载或者 git clone 本项目。

# 使用


HTML:

```html
<div class="share"></div>

<!--  引入js -->
<script src="dist/js/Share.js"></script>

// 当你使用类名为 `.custom-share` 时不需要手动初始化
```

## 自定义配置

所有配置**可选**， 通常默认就满足需求：

可用的配置有：

```js

url                 : '', // 网址，默认使用 window.location.href
source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
title               : '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
origin              : '', // 分享 @ 相关 twitter 账号
description         : '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
image               : '', // 图片, 默认取网页中第一个img标签
sites               : ['qzone', 'qq', 'weibo','wechat', 'douban'], // 启用的站点(此顺序代表最终渲染的顺序)
disabled            : ['google', 'facebook', 'twitter'], // 禁用的站点（即使sites参数指定的站点，这里也可以禁用）
initialized         : false // 自定义初始化
wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
wechatQrcodePosition: 'top', // 二维码展示方向 仅支持top bottom
```

示例代码：

```js
var $config = {
    title               : '234',
    description         : '123',
    wechatQrcodeTitle   : "微信扫一扫：分享", // 微信二维码提示文字
    wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
};

share('.social-share-cs', $config);
```

自定义初始化

如果不喜欢默认的样式、图标，可以尝试使用自定义初始化

```html
<div class="share">
    <!-- 保证存在与sites参数列表相同类名的a标签 -->
    <a class="google" href="">google</a>
    <a class="twitter" href="">twitter</a>
</div>
```
```js
var share = new Share('.share', {
    sites: ['google', 'twitter'],
    initialized: true
});
```


