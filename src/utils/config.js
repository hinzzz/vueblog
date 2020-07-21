const config = {
    oauth_uri: "https://github.com/login/oauth/authorize",
    redirect_uri: "https://biaochenxuying.cn/login", // 请修改成你的信息
    client_id: "XXXXXXXXX", // 请修改成你的信息
    client_secret: "XXXXXXXXX" // 请修改成你的信息
  };
  // 本地开发环境下 （如下的信息在本地开发可以当测试用）
  if (process.env.NODE_ENV === "development") {
    config.redirect_uri = "http://localhost:8081/authorize/redirect";
    config.client_id = "4c8e5c108b41ce024f46";
    config.client_secret = "054f0ab71f8622081bfca2b583b35cb977fc90b6";
  }

  const randomString = function randomString(e) {    
    e = e || 32;
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
    a = t.length,
    n = "";
    for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}
  export {config,randomString};