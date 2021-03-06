rules = [
	//  自带示例 [[[1
	// {
	// 	name: "about:haoutil",                  // 规则名称
	// 	from: "about:haoutil",                  // 需要重定向的地址
	// 	to: "https://haoutil.googlecode.com",   // 目标地址
	// 	wildcard: false,                        // 可选，true 表示 from 是通配符
	// 	regex: false,                           // 可选，true 表示 from 是正则表达式
	// 	resp: false,                            // 可选，true 表示替换 response body
	// 	state: true,                            // 可选，true 表示该规则默认开启；false 表示该规则默认关闭，需要时能点击使用，重启 Firefox 后恢复关闭状态。
	//  decode: false                           // 可选，true 表示尝试对 from 解码
	// },
	// {
	// 	name: "google链接加密",
	// 	from: /^http:\/\/(([^\.]+\.)?google\..+)/i,
	// 	exclude: /google\.cn/i,				    // 可选，排除例外规则
	// 	to: "https://$1",
	// 	regex: true
	// },
	// {
	// 	name: "google搜索结果禁止跳转",
	// 	from: /^https?:\/\/www\.google\.com\/url\?.*url=([^&]*).*/i,
	// 	to: "$1",
	// 	regex: true
	// },
	// ]]]
	//  原创 [[[1
	// userscripts.org 和 userscripts.org:8080 都跳转到 userscripts-mirror.org
	{
		name: "Userscripts 重定向",
		from: /^https?:\/\/userscripts\.org(?:\:8080|)\/(.*)/i,
		to: "http:\/\/userscripts-mirror.org/$1",
		regex: true
	},
	{
		name: "防御路由 DNS 劫持",
		from: /^http:\/\/192\.168\.3\.1\/.*/i,
		to: "http://localhost/",
		regex: true
	},
	{
		name: "Google 图片搜索跳转到 glgoo.com",
		from: /^https?:\/\/(www\.)?google\.[^\/]+\/(s\?|search\?|webhp\?)tbs=(isch\&|sbi)(.*)$/i,
		exclude: /google\.cn/i,
		to: "https://image.glgoo.com/$2tbs=$3$4",
		regex: true
		// state: false
	},
	{
		name: "Google 搜索跳转到 glgoo.com",
		from: /^https?:\/\/(www\.)?google\.[^\/]+\/(s\?|search\?|webhp\?)(.*)$/i,
		exclude: /google\.cn/i,
		to: "https://www.glgoo.com/$2$3",
		regex: true
		// state: false
	},
	{
		name: "Google 学术搜索跳转到 glgoo.com",
		from: /^https?:\/\/scholar\.google\.[^\/]+\/(.*)$/i,
		to: "https://scholar.glgoo.com/$1",
		regex: true
		// state: false
	},
	// {
	// 	// 部分参考自 https://github.com/goagent/goagent/blob/3.0/local/proxy.ini
	// 	name: "解决 wen.lu 无法重定向图片地址",
	// 	from: /^https?:\/\/wen\.lu\/(?:imgres|url)\?.*url=([^&]+).*/i,
	// 	to: "$1",
	// 	regex: true,
	// 	state: false
	// },
	// {
	// 	name: "解决 awk.so 无法重定向图片地址",
	// 	from: /^https?:\/\/awk\.so\/(?:imgres|url)\?.*url=([^&]+).*/i,
	// 	to: "$1",
	// 	regex: true,
	// 	state: false
	// },
	// Google 搜索时，中键点击图片，跳转到原始链接。
	// 详细说明：http://bbs.kafan.cn/thread-1799098-1-1.html
	{
		name: "解决 glgoo.com 无法重定向图片地址",
		from: /^https?:\/\/.*\.glgoo\.com\/(.*)imgurl=(.*)&imgrefurl=(.*)\&h=(.*)/i,
		to: "$3",
		regex: true
		// state: false
	},
	// ]]]
	//  取自 https://github.com/523860169/list/blob/master/_redirector.js [[[1
	// {
	// 	name: "wiki繁 >> 简",
	// 	from: /\:\/\/zh\.wikipedia\.org\/(?!zh\-cn\/)[^\/]+/i,
	// 	exclude: /favicon\.ico/i,
	// 	to: '://zh.wikipedia.org/zh-cn',
	// 	regex: true
	// },
	// 以下三条见 https://servers.ustclug.org/index.php/2014/06/blog-googlefonts-speedup/
	{
		name: "重定向 Google Ajax/Fonts 公共库到 360 镜像",
		from: /^https?:\/\/(ajax|fonts)\.googleapis\.com\/(.*)$/i,
		to: "http://$1.useso.com/$2",
		regex: true
	},
	{
		name: "科大博客提供的 Google Themes 加速",
		from: /^https?:\/\/themes\.googleusercontent\.com\/(.*)$/i,
		to: "http://google-themes.lug.ustc.edu.cn/$1",
		regex: true
	},
	{
		name: "科大博客提供的 Google Fonts-Gstatic 加速",
		from: /\:\/\/fonts\.gstatic\.com\/(.*)$/,
		to: "://fonts-gstatic.lug.ustc.edu.cn/$1",
		regex: true
	},
	// 在这样的页面点击，就直接弹下载窗口
	// 测试：http://sourceforge.net/projects/pcxfirefox/files/Release/Firefox/36.x/36.0.1/x86/sse2/
	{
		name: "重定向 SourceForge 到镜像站点",
		// from: /^https?:\/\/sourceforge\.net\/projects\/(\w)([a-z0-9A-Z_\-\.])([a-z0-9A-Z_\-\.]*)(\/files(\/.*))?/i,
		// to: "http://ftp.jaist.ac.jp/pub/sourceforge/$1/$1$2/$1$2$3$5",
		from: /^https?:\/\/sourceforge\.net\/projects\/(((\w)\w).*)\/files\/(.*)\/download/i,
		to: "http://liquidtelecom.dl.sourceforge.net/project/$1/$4",
		regex: true
	},
	{
		name: "Greasyfork 页面转为简体中文",
		from: /^https:\/\/greasyfork\.org\/scripts\/(.*)/,
		to: "https://greasyfork.org/zh-CN/scripts/$1",
		regex: true
	},
	{
		name: "优美图显示大图",
		from: /^https?:\/\/(.*)\.topit\.me\/(s|m)\/(.*)$/,
		to: "http://$1.topit.me/l/$3",
		regex: true
	},
	{
		name: "百度搜索无劫持",
		from: /^(https?):\/\/(www\.baidu\.com\/.*)([\?&]tn=[\w]+(.*))+/i,
		to: "$1://$2$4",
		regex: true
	},
	{
		name: "百度贴吧|百科显示原始大图",
		from: /http:\/\/(imgsrc|[\w]?\.hiphotos)\.baidu\.com\/(forum|baike)\/[\w].+\/sign=[^\/]+(\/.*).jpg/i,
		to: "http://$1.baidu.com/$2/pic/item$3.jpg",
		regex: true
	},
	{
		name: "优酷收费视频 >> id97免费看",
		from: /^http:\/\/v\.youku\.com\/v_show\/([\w]{16})(_ev_[\d]+)?\.html(\?.*)?$/i,
		to: "http://www.id97.com/videos/play/$1.html",
		regex: true,
		state: false
	},
	{
		name: "AcFun 网页全屏",
		from: /^http:\/\/www\.acfun\.tv\/(a|v)\/a(b|c)([\w]+)(.*)?/i,
		exclude: /acfun\.tv\/(a|v)\/a(b|c).*#fullscreen=1$/i,
		to: "http://www.acfun.tv/$1/a$2$3#fullscreen=1",
		regex: true
	},
	{
		name: "BiliBili 跳转至完整显示播放器",
		from: /^http:\/\/www\.bilibili\.com\/video\/av([\d]+)\/([\w]+\.html)?(.*)?/i,
		exclude: /bilibili\.com\/video\/av([\d]+)\/([\w]+\.html)?#alist$/i,
		to: "http://www.bilibili.com/video/av$1/$2#alist",
		regex: true
	},
	{
		name: "Tumblr 看视频",
		from: /^https?:\/\/.*\.tumblr\.com\/video_file\/(.*)/i,
		exclude:/^https?:\/\/www\.tumblr\.com\/video_file\/(.*)/i,
		to: "https://www.tumblr.com/video_file/$1",
		regex: true
	},
	// ]]]
	//  取自 https://github.com/dupontjoy/userChromeJS/blob/master/Local/_redirector.js [[[1
	{
		// 有时 Google 会要求填验证码，此规则用以跳过
		name: "反 Google 搜索验证码",
		from: /^https?:\/\/ipv4\.google\.com\/sorry\/IndexRedirect\?continue=https?:\/\/(www\.)?google\.[^\/]+\/search\?(.*q=.*)&q=.*/i,
		to: "https://www.google.com/ncr#$1",
		regex: true
	},
	{
		// 方法来源：http://tieba.baidu.com/p/3699558655
		name: "凤凰网 只显示首图修正",
		from: /^https?:\/\/(.*)\.ifeng\.com\/a\/(ydzx|)\/(.*)/i,
		to: "http://$1.ifeng.com/a/$3",
		regex: true
	},
	{
		// 方法来源：http://tieba.baidu.com/p/3708648047
		name: "凤凰网 图片修正",
		from: /^https?:\/\/(.*)\.ifeng\.com\/(.+)?shtml.+?(#p=.)/,
		to: "http://$1.ifeng.com/$2shtml",
		regex: true
	},
	//    百度系 [[[2
	// 参照“反Google搜索验证码”改的，很少遇到
	{
		name: "反百度搜索验证码",
		from: /^https?:\/\/verify\.baidu\.com\/vcode\?http:\/\/www\.baidu\.com\/s\?wd=(.*)&(.*=.*)/i,
		to: "http://www.baidu.com/s?wd=$1",
		regex: true
	},
	// 百度云盘分享页，手机版 重定向至 电脑版
	// 详细说明：http://bbs.kafan.cn/thread-1814510-1-1.html
	{
		name: "百度盘 wap/link >> share/link",
		from: /^https?:\/\/(pan|yun)\.baidu\.com\/(wap\/link)(.*)/i,
		to: 'http://pan.baidu.com/share/link$3',
		regex: true
	},
	{
		name: "百度盘 wap/album/file >> pcloud/album/file",
		from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/album\/file(.*)/i,
		to: 'http://pan.baidu.com/pcloud/album/file$2',
		regex: true
	},
	{
		name: "百度盘 wap/share/home >> share/home",
		from: /^https?:\/\/(pan|yun)\.baidu\.com\/wap\/share\/(home\?|)(.*)/i,
		to: 'http://pan.baidu.com/share/home?$3',
		regex: true
	},
	{
		// http://bbs.kafan.cn/thread-1801036-1-1.html
		name: "flickr 显示原始大图",
		from: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_[^\._]+)(_[a-z])?(\.jpg)$/,
		exclude: /^(https?:\/\/c\d\.staticflickr\.com\/\d\/\d+\/\d+_\w+)_o(\.jpg)$/,
		to: "$1_o$3",
		regex: true
	},
	// 在 Google 搜索时会出现某一种页面，这个重定向用来直接跳到目标链接
	{
		name: "noMoreArchiver",
		from: /(.*)\/archiver\/(.*)tid-(.*)\.html/,
		to: "$1/viewthread.php?tid=$3",
		regex: true
	},
	// ]]]
	//  取自其它 [[[1
	{
		// 取自 http://tieba.baidu.com/p/3279099939
		name: "重定向 Gravatar 头像到多说镜像",
		from: /^https?:\/\/([0-9]?)\.gravatar\.com\/avatar\/(.*)$/i,
		to: "http://gravatar.duoshuo.com/avatar/$2",
		regex: true
	},
	{
		// 取自 https://github.com/ywzhaiqi/userChromeJS/blob/master/.修改版/_redirector.js
		// 包含手机版界面，现在失效了
		name: "百度随心听（音质改320）",
		from: /^http:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
		to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
		regex: true
	},
	{
		// 取自 http://bbs.kafan.cn/thread-1778201-1-1.html
		// 斗鱼TV卡的话，网址(ID为数字的)后面加上?cdn=lx
		name: "斗鱼TV(ID为数字的) >> ?cdn=lx",
		from: /^http:\/\/www\.douyutv\.com\/(\d+)/i,
		exclude: /^http:\/\/www\.douyutv\.com\/.*\?cdn=lx/i,
		to: "http://www.douyutv.com/$1?cdn=lx",
		regex: true
	},
	// ]]]
];
//  Vim Modeline: [[[1
// vim:sts=4:sw=4:ts=4:noet:fdm=marker:fmr=[[[,]]]
// ]]]
