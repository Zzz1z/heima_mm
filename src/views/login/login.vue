<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="login-title">
        <img class="login-logo" src="../image/login_logo.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="user-login">用户登录</span>
      </div>
      <el-form ref="loginForm" :rules="rules" :model="loginForm">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="17">
            <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="loginForm.code"></el-input>
          </el-col>
          <el-col :span="7">
            <img class="codeImg" src="../image/login_banner_ele.png" alt />
          </el-col>
        </el-form-item>
        <el-form-item prop="agree" class="agree">
          <el-checkbox v-model="loginForm.agree">
            我已经阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私协议</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doLogin" class="login-btn">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="register-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login_bg" src="../image/login_banner_ele.png" alt />
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        phone: "",
        password: "",
        code: "",
        agree: false
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "6-12位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入图形验证码", trigger: "blur" }
        ],
        agree: [
          {
            pattern: /true/,
            message: "必须勾选同意用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    doLogin() {
      this.$refs.loginForm.validate(val => {
        if (val) {
          window.console.log(1111);
        }
      });
    }
  }
};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;
  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;
    .login-title {
      display: flex;
      align-items: center;
      margin-bottom: 29px;
      .login-logo {
        margin-right: 16px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
        margin-left: 14px;
      }
      .title {
        font-size: 22px;
        color: #000;
      }
      .user-login {
        font-size: 21px;
        color: #000;
      }
    }
    .codeImg {
      width: 100%;
      height: 42px;
      vertical-align: middle;
    }
  }
  .agree {
    margin-top: 32px;
    margin-bottom: 28px;
  }
  .el-checkbox {
    display: flex;
    &.is-checked {
      .el-checkbox__label {
        color: #606266;
      }
    }
    .el-checkbox__label {
      display: flex;
      align-items: center;
    }
  }
  .login-btn,
  .register-btn {
    width: 100%;
  }
}
</style>