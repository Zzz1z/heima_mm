<template>
  <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="regForm">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="img_code" @click="getNewCode" :src="picCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.phoneCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button
              :disabled="sec != 0"
              @click="getPhoneCode"
            >{{ sec == 0 ? '获取用户验证码' : '还有' + sec + '秒' }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { sendSMS, register } from "@/api/register.js";
export default {
  name:'reg',
  data() {
    return {
      uploadUrl: process.env.VUE_APP_URL + "/uploads",
      imageUrl: "",
      form: {
        name: "", //用户昵称
        email: "", //注册邮箱
        phone: "", //注册手机号
        password: "", //密码
        imgCode: "", //图形验证码
        phoneCode: "", //手机验证码
        avatar: "" //头像
      },

      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now(), //图形验证码的url

      sec: 0, //获取倒计时

      dialogFormVisible: false,
      // 设置文字宽度

      formLabelWidth: "65px",

      // 规则对象
      rules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },

          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 14, message: "长度在5-14之间", trigger: "change" }
        ],
        phoneCode: [
          { required: true, message: "手机验证码不能为空", trigger: "blur" },
          { len: 4, message: "手机验证码是4位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    doRegister() {
      register({
        username:this.form.name,
        phone:this.form.phone,
        email:this.form.email,
        avatar:this.form.avatar,
        password:this.form.password,
        rcode:this.form.phoneCode,
      }).then(res=>{
        if(res.data.code ===200){
          this.$message.success('注册成功')
          this.dialogFormVisible = false;
          this.$refs.regForm.resetFields();
          this.imageUrl = "";
        }else{
            this.$message.error(res.data.message);
        }
      })
    },
     handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avatar = res.data.file_path;
      // 单独对这一个属性做一次校验
      this.$refs.regForm.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    getNewCode() {
      this.picCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    getPhoneCode() {
      if (!(/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone))) {
        return this.$message.error("手机号码格式不正确");
      }

      if (this.form.imgCode.length != 4) {
        //用户手机号不合法
        this.$message.error("验证码长度不对");
        return;
      }

      this.sec = 60;
      let timeID = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timeID);
        }
      }, 1000);
      sendSMS({
        code: this.form.imgCode,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);
      });
    },
  }
};
</script>
<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
}

.el-dialog__title {
  color: white;
  font-size: 17px;
}

.img_code {
  width: 100%;
  height: 41px;
  vertical-align: top;
  cursor: pointer;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader {
  text-align: center;
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>