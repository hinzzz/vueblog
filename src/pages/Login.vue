<!-- 登录注册 -->
<template>
  <div>
    <div class="container">
      <h1 class="loginTitle">
        <a href="#/">{{this.$store.state.themeObj.user_start!=0?"Aimee 的博客":"Qinlh 的博客"}}</a>
      </h1>
      <!-- 登录注册 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">注册登录</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-body-content">
    <div id="loginDiv" class="px-sm-5 mb-3">
        <h3 class="text-center my-3">用户登录</h3>

        <form class="no-password-form d-none" action="/api/user/phonelogin" method="POST" role="form">
            <div class="form-group">
                <input type="input" class="form-control form-control-lg" name="phone" placeholder="手机号" required="">
            </div>
            <div class="form-group">
                <div class="input-group">
                    <input type="text" class="form-control form-control-lg" name="authCode" placeholder="验证码" required="">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary btn-lg" type="button" id="getAuthCode" data-url="/api/user/phone/phoneloginsend">获取验证码</button>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">登录</button>
        </form>
        <form class="password-form d-none" action="/api/user/login" method="POST" role="form">
            <div class="form-group">
                <input type="input" class="form-control form-control-lg" name="username" placeholder="手机号或邮箱" required="">
            </div>
            <div class="form-group">
                <input type="password" class="form-control form-control-lg" name="password" placeholder="密码" required="">
            </div>
            <div class="form-group text-right">
                <a href="/user/forgot" target="_blank">忘记密码？</a>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg sf_do">登录</button>
        </form>
        <form class="weixin-form card-body p-0">
            <div class="text-center">
                <div class="qrCode"><img src="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQHv7zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyMXh6YmdpaEZjODMxYktUbWh2Y28AAgSWtRZfAwRYAgAA" style="width: 160px; height: 160px;"></div>
                <div class="mt-2"><svg class="svg-inline--fa fa-weixin fa-w-18" style="color: #00B500;" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="weixin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"></path></svg><!-- <i class="fab fa-weixin" style="color: #00B500"></i> -->
                微信扫码<br>关注公众号后登录</div>
            </div>
        </form>
        <div class="login-3rd text-center mt-4">
            <div class="login-nav text-center mb-3">
                <a href="javascript:;" class="mx-3 login-mode text-body" data-mode="weixin">微信登录</a><span class="border-left"></span><!--
                    --><a href="javascript:;" class="mx-3 login-mode" data-mode="password">密码登录</a><span class="border-left"></span><!--
                    --><a href="javascript:;" class="mx-3 login-mode" data-mode="no-password">免密码登录</a>
            </div>
            <div class="3rd-btn-group mt-3 font-size-20">
                <a href="/user/oauth/google" class="px-1" style="color: #3182F6"><svg class="svg-inline--fa fa-google fa-w-16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" data-fa-i2svg=""><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg><!-- <i class="fab fa-google"></i> --></a>
                <a href="/user/oauth/github" class="px-1" style="color: #333333"><svg class="svg-inline--fa fa-github fa-w-16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg=""><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg><!-- <i class="fab fa-github"></i> --></a>
                <a href="/user/oauth/weibo" class="px-1" style="color: #EC0117"><svg class="svg-inline--fa fa-weibo fa-w-16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="weibo" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M407 177.6c7.6-24-13.4-46.8-37.4-41.7-22 4.8-28.8-28.1-7.1-32.8 50.1-10.9 92.3 37.1 76.5 84.8-6.8 21.2-38.8 10.8-32-10.3zM214.8 446.7C108.5 446.7 0 395.3 0 310.4c0-44.3 28-95.4 76.3-143.7C176 67 279.5 65.8 249.9 161c-4 13.1 12.3 5.7 12.3 6 79.5-33.6 140.5-16.8 114 51.4-3.7 9.4 1.1 10.9 8.3 13.1 135.7 42.3 34.8 215.2-169.7 215.2zm143.7-146.3c-5.4-55.7-78.5-94-163.4-85.7-84.8 8.6-148.8 60.3-143.4 116s78.5 94 163.4 85.7c84.8-8.6 148.8-60.3 143.4-116zM347.9 35.1c-25.9 5.6-16.8 43.7 8.3 38.3 72.3-15.2 134.8 52.8 111.7 124-7.4 24.2 29.1 37 37.4 12 31.9-99.8-55.1-195.9-157.4-174.3zm-78.5 311c-17.1 38.8-66.8 60-109.1 46.3-40.8-13.1-58-53.4-40.3-89.7 17.7-35.4 63.1-55.4 103.4-45.1 42 10.8 63.1 50.2 46 88.5zm-86.3-30c-12.9-5.4-30 .3-38 12.9-8.3 12.9-4.3 28 8.6 34 13.1 6 30.8.3 39.1-12.9 8-13.1 3.7-28.3-9.7-34zm32.6-13.4c-5.1-1.7-11.4.6-14.3 5.4-2.9 5.1-1.4 10.6 3.7 12.9 5.1 2 11.7-.3 14.6-5.4 2.8-5.2 1.1-10.9-4-12.9z"></path></svg><!-- <i class="fab fa-weibo"></i> --></a>
                <span id="loginShowMore" class="px-1" style="color: #6C757D; cursor: pointer"><svg class="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" focusable="false" data-prefix="far" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z"></path></svg><!-- <i class="far fa-ellipsis-h"></i> --></span>
                <a href="/user/oauth/qq" class="d-none px-1" style="color: #0098E6"><svg class="svg-inline--fa fa-qq fa-w-14" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="qq" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M433.754 420.445c-11.526 1.393-44.86-52.741-44.86-52.741 0 31.345-16.136 72.247-51.051 101.786 16.842 5.192 54.843 19.167 45.803 34.421-7.316 12.343-125.51 7.881-159.632 4.037-34.122 3.844-152.316 8.306-159.632-4.037-9.045-15.25 28.918-29.214 45.783-34.415-34.92-29.539-51.059-70.445-51.059-101.792 0 0-33.334 54.134-44.859 52.741-5.37-.65-12.424-29.644 9.347-99.704 10.261-33.024 21.995-60.478 40.144-105.779C60.683 98.063 108.982.006 224 0c113.737.006 163.156 96.133 160.264 214.963 18.118 45.223 29.912 72.85 40.144 105.778 21.768 70.06 14.716 99.053 9.346 99.704z"></path></svg><!-- <i class="fab fa-qq"></i> --></a>
                <a href="/user/oauth/weixin" class="d-none px-1" style="color: #00B500"><svg class="svg-inline--fa fa-weixin fa-w-18" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="weixin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"></path></svg><!-- <i class="fab fa-weixin"></i> --></a>
                <a href="/user/oauth/twitter" class="d-none px-1" style="color: #4BAAF4"><svg class="svg-inline--fa fa-twitter fa-w-16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg><!-- <i class="fab fa-twitter"></i> --></a>
                <a href="/user/oauth/facebook" class="d-none px-1" style="color: #4862A3"><svg class="svg-inline--fa fa-facebook-square fa-w-14" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path></svg><!-- <i class="fab fa-facebook-square"></i> --></a>
                <a href="/user/oauth/linkedin" class="d-none px-1" style="color: #0077B9"><svg class="svg-inline--fa fa-linkedin fa-w-14" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg><!-- <i class="fab fa-linkedin"></i> --></a>
            </div>
        </div>
        <div class="text-muted text-center font-size-14 mt-3">继续即代表同意<a href="/tos" target="_blank">《服务条款》</a>和<a href="/privacy" target="_blank">《隐私政策》</a>
		</div>
    </div>
    </div>
      </div>
      
    </div>
    </el-dialog>
      <!-- <div v-show="!err2005" class>
        <div v-if="login==1" class="loginBox">
          <div class="lr-title">
            <h1>登录</h1>
            <p>
              新用户
              <a href="#/Login?login=0" class="tcolors">注册</a>
            </p>
          </div>
          <el-alert v-show="loginErr" :title="loginTitle" type="error" show-icon :closable="false"></el-alert>
          <el-input type="username" placeholder="用户名" v-model="username"></el-input>
          <el-alert v-show="usernameErr" title="请输入用户名" type="error" show-icon :closable="false"></el-alert>
          <el-input
            type="password"
            placeholder="密码"
            @keyup.enter.native="loginEnterFun"
            v-model="password"
          ></el-input>
          <el-alert v-show="passwordErr" title="请输入密码" type="error" show-icon :closable="false"></el-alert>
          <h3>
            <a href>忘记密码？</a>
          </h3>
          <div class="lr-btn tcolors-bg" @click="gotoHome">登录</div>
          <el-image style="width: 100px; height: 100px" @click="handleOAuth"  src="@/assets/github.jpg" ></el-image>
          <div class="otherLogin">
            <a href="javascript:void(0)">
              <i class="fa fa-fw fa-wechat"></i>
            </a>
            <a href="javascript:void(0)">
              <i class="fa fa-fw fa-qq"></i>
            </a>
            <a href="javascript:void(0)">
              <i class="fa fa-fw fa-weibo"></i>
            </a>
          </div>
        </div>
        <div v-else class="registerBox">
          <div class="lr-title">
            <h1>注册</h1>
            <p>
              已有账号
              <a href="#/Login?login=1" class="tcolors">登录</a>
            </p>
            <el-button type="success" @click="handleOAuth">github 授权登录</el-button>
          </div>
          <el-alert
            v-show="registerErr"
            :title="registerTitle"
            type="error"
            show-icon
            :closable="false"
          ></el-alert>
          <el-input type="text" placeholder="用户名" v-model="nusername"></el-input>
          <el-alert v-show="nusernameErr" title="用户名错误" type="error" show-icon :closable="false"></el-alert>
          <el-input type="email" placeholder="邮箱" v-model="nemail"></el-input>
          <el-alert v-show="nemailErr" title="邮箱错误" type="error" show-icon :closable="false"></el-alert>
          <el-input type="password" placeholder="密码:6-12位英文、数字、下划线" v-model="npassword"></el-input>
          <el-alert v-show="npasswordErr" title="密码错误" type="error" show-icon :closable="false"></el-alert>
          <el-input
            type="password"
            placeholder="确认密码"
            @keyup.enter.native="registerEnterFun"
            v-model="npassword2"
          ></el-input>
          <el-alert v-show="npassword2Err" title="重复密码有误" type="error" show-icon :closable="false"></el-alert>
          <div
            class="lr-btn tcolors-bg"
            @click="newRegister"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="提交中"
          >注册</div>
        </div>
      </div> -->
      <!-- 注册进度状态 -->
      <div v-show="err2005" class="registerSuc">
        <div class="sucIcon">
          <el-steps :space="100" :active="step" finish-status="success">
            <el-step title="注册"></el-step>
            <el-step title="验证"></el-step>
            <el-step title="登录"></el-step>
          </el-steps>
        </div>
        <div v-show="urlstate==0" class="sucContent">
          账号激活链接已发送至您的邮箱：{{nemail}}
          <p>请您在24小时内登录邮箱，按邮件中的提示完成账号激活操作</p>
        </div>
        <div v-show="urlstate=='urlInvalid'" class="sucContent">
          账号已激活，现在去登录 &nbsp;&nbsp;
          <span class="tcolors-bg lastbtn" @click="goLogin">登录</span>
        </div>
        <el-button type="success" @click="handleOAuth">github 授权登录</el-button>
        <img class="login-img-third" @click="handleOAuth" title="Github" src="@/assets/github.jpg"/>
        <div v-show="urlstate=='urlErr'" class="sucContent">
          OwO邮箱激活地址已超时，验证失败，请重新注册 &nbsp;&nbsp;
          <span
            class="tcolors-bg lastbtn"
            @click="goRegister"
          >注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRegister, UserLogin } from "../utils/server.js";
import { config,randomString } from "../utils/config.js";
import "@/assets/css/login.css"
export default {
  name: "Login",
  data() {
    //选项 / 数据
    return {
      dialogVisible: true,
      username: "", //用户名
      email: "", //邮箱
      password: "", //密码
      nusername: "", //新用户注册名
      nemail: "", //新用户注册邮箱
      npassword: "", //新用户注册密码
      npassword2: "", //新用户注册重复密码
      login: 0, //是否已经登录
      emailErr: false, //登录邮箱错误
      passwordErr: false, //的轮毂密码错误
      loginErr: false, //登录错误
      loginTitle: "用户名或密码错误",

      usernameErr: false, ///用户名不对
      nusernameErr: false, //新用户注册用户名错误
      nemailErr: false, //新用户注册邮箱错误
      npasswordErr: false, //新用户注册密码错误
      npassword2Err: false, //新用户注册重复密码错误
      registerErr: false, //已注册错误
      registerTitle: "该邮箱已注册",
      err2005: false, //是否展示注册进度条状态
      step: 1, //注册进度
      fullscreenLoading: false, //全屏loading
      urlstate: 0 //重新注册,
    };
  },
  methods: {
    handleOAuth: function() {
      // 保存授权前的页面链接内容
      let preventHistory = {
        name: this.$route.name,
        query: this.$route.query
      };
      window.sessionStorage.preventHistory = JSON.stringify(preventHistory);
    
      window.location.href = `${config.oauth_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&state=${randomString(16)}`;
    },
    routeChange: function() {
      var that = this;
      that.login =
        that.$route.query.login == undefined
          ? 1
          : parseInt(that.$route.query.login); //获取传参的login
      that.urlstate =
        that.$route.query.urlstate == undefined
          ? 0
          : that.$route.query.urlstate; //获取传参的usrlstate状态码
      // console.log(that.login,that.urlstate);
      if (that.urlstate == 0) {
        that.err2005 = false;
        that.step = 1;
      } else if (that.urlstate == "urlInvalid") {
        that.err2005 = true;
        that.step = 2;
      } else if (that.urlstate == "urlErr") {
        that.err2005 = true;
        that.step = 1;
      }
    },
    loginEnterFun: function(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      // console.log('回车登录',keyCode,e);
      if (keyCode == 13) {
        this.gotoHome();
      }
    },
    gotoHome: function() {
      //用户登录
      var that = this;
      // var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
      // var preg = /^(\w){6,12}$/;
      // if(reg.test(that.username)){
      //     that.usernameErr = false;
      // }else{
      //     that.usernameErr = true;
      // }
      // if(that.password&&preg.test(that.password)){
      //     that.passwordErr = false;
      // }else{
      //     that.passwordErr = true;
      // }
      ///  alert("11111:" +that.username + "," +that.password);
      if (!that.usernameErr && !that.passwordErr) {
        UserLogin(that.username, that.password, function(msg) {
          console.log(msg);
          if (msg.code == 1) {
            //登录成功
            //  localStorage.setItem('userInfo',JSON.stringify(msg.data));
            //  localStorage.setItem('accessToken',msg.token);
            //  if(localStorage.getItem('logUrl')){
            //      that.$router.push({path:localStorage.getItem('logUrl')});
            //  }else{
            //      that.$router.push({path:'/'});
            //  }
            that.$router.push({ path: "/" });
          } else if (msg.code == 2008 || msg.code == 2007) {
            //邮箱或密码错误
            that.loginErr = true;
            that.loginTitle = "邮箱或密码错误";
          } else if (msg.code == 2009) {
            //邮箱注册码未激活
            that.loginErr = true;
            that.loginTitle = "该邮箱注册码未激活，请前往邮箱激活";
          } else if (msg.code == 2005) {
            //邮箱注册码未激活已超时
            // that.loginErr = true;
            that.err2005 = true;
            // that.loginTitle = '该邮箱激活地址已超时，已发送新链接，请前往邮箱激活';
          } else {
            that.loginErr = true;
            that.loginTitle = "登录失败";
          }
        });
      }
    },
    registerEnterFun: function(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      // console.log('回车注册',keyCode,e);
      if (keyCode == 13) {
        this.newRegister();
      }
    },
    newRegister: function() {
      //注册提交
      var that = this;
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      var preg = /^(\w){6,12}$/;
      if (that.nusername) {
        that.nusernameErr = false;
      } else {
        that.nusernameErr = true;
      }
      if (reg.test(that.nemail)) {
        that.nemailErr = false;
      } else {
        that.nemailErr = true;
      }
      if (that.npassword && preg.test(that.npassword)) {
        that.npasswordErr = false;
        if (that.npassword == that.npassword2) {
          that.npassword2Err = false;
        } else {
          that.npassword2Err = true;
        }
      } else {
        that.npasswordErr = true;
      }
      if (!that.nusernameErr && !that.nemailErr && !that.npasswordErr) {
        that.fullscreenLoading = true;
        getRegister(that.nusername, that.npassword, that.nemail, function(msg) {
          if (msg.code == 1010) {
            //注册成功
            var timer = setTimeout(function() {
              //注册中
              that.fullscreenLoading = false;
              that.err2005 = true;
              that.step = 1;
              clearTimeout(timer);
            }, 3000);
          } else if (msg.code == 2002) {
            //该邮箱已注册
            that.fullscreenLoading = false;
            that.registerErr = true;
            that.registerTitle = "该邮箱已注册,可直接登录";
          } else {
            that.fullscreenLoading = false;
            that.registerErr = true;
            that.registerTitle = "注册失败";
          }
        });
      }
    },
    goLogin: function() {
      //邮箱验证成功,去登陆
      this.err2005 = false;
      this.$router.push({ path: "/Login?login=1" });
    },
    goRegister: function() {
      //去注册
      this.err2005 = false;
      this.$router.push({ path: "/Login?login=0" });
    }
  },
  components: {
    //定义组件
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "routeChange"
  },
  created() {
    //生命周期函数
    var that = this;
    that.routeChange();
  }
};
</script>

<style>
/*登录注册标题*/
.loginTitle {
  text-align: center;
  font-size: 26px;
  padding-top: 50px;
  margin-bottom: 20px;
}
.loginBox,
.registerBox {
  background: #fff;
  padding: 40px;
  max-width: 320px;
  margin: 0 auto;
}
.loginBox {
  padding-bottom: 0;
}
.lr-title {
  position: relative;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
}
.lr-title h1 {
  font-size: 24px;
  color: #666;
  font-weight: bold;
  /*width:50%;*/
}
.lr-title p {
  font-size: 12px;
  color: #999;
  position: absolute;
  right: 0;
  top: 0;
}
.lr-btn {
  color: #fff;
  text-align: center;
  letter-spacing: 5px;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
}
.loginBox .el-input,
.registerBox .el-input {
  margin-bottom: 20px;
}
.loginBox .el-alert,
.registerBox .el-alert {
  top: -18px;
  background-color: #888;
}
.loginBox .el-input input,
.registerBox .el-input input {
  border-radius: 4px;
}
.loginBox h3,
.registerBox h3 {
  text-align: right;
  margin-bottom: 20px;
}
.loginBox h3 a,
.registerBox h3 a {
  font-size: 13px;
  color: #999;
}
.loginBox .otherLogin {
  max-width: 320px;
  padding: 30px 40px;
  background: #ddd;
  text-align: center;
  margin-left: -40px;
  margin-right: -40px;
  visibility: hidden;
}
.loginBox .otherLogin p {
  margin-bottom: 20px;
  font-size: 16px;
}
.loginBox .otherLogin a i {
  display: inline-block;
  width: 42px;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  border-radius: 50%;
  color: #fff;
  margin: 0 10px;
}
.loginBox .otherLogin a i.fa-wechat {
  background: #7bc549;
}
.loginBox .otherLogin a i.fa-qq {
  background: #56b6e7;
}
.loginBox .otherLogin a i.fa-weibo {
  background: #ff763b;
}

/*登录成功*/
.registerSuc {
  padding: 40px;
  margin: 0 auto;
}
.registerSuc .sucIcon {
  text-align: center;
  margin-bottom: 30px;
  padding-left: 60px;
}
.registerSuc .sucContent {
  line-height: 1.5;
  font-size: 15px;
  text-align: center;
}
.registerSuc .sucContent p {
  margin-top: 10px;
  font-size: 13px;
  color: #999;
}
.registerSuc .sucContent .lastbtn {
  display: inline-block;
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
.registerSuc .sucContent .el-icon-close {
  fong-size: 13px;
}
</style>
