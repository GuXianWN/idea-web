<template>
  <div style="display: flex;width: 100%;height:100%;align-items: center;justify-content: center">
    <div class="avatar-uploader" @click="dialogVisible=true">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <avatar-cropper :dialogVisible.sync="dialogVisible" @closeAvatarDialog="upload"></avatar-cropper>
  </div>
</template>
<script>

import AvatarCropper from "@/components/avatarCropper";

export default {
  components: {AvatarCropper},
  data() {
    return {
      dialogVisible: false,
      imageUrl: '',
      action: "http://localhost:9000/" + "user/upload"
    };
  },
  methods: {
    upload(file) {
      console.log(file)

      // const isJPG = file.type === "image/png" || "image/jpg" || "image/jpeg";
      // const isLt2M = file.file.size / 1024 / 1024 < 1;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG/PNG/JPEG 格式!");
      //   return;
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 1MB!");
      //   return;
      // }
      let formData = new FormData();
      formData.append('file', file);
      this.postRequest('/image/uploadhead', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        if (res.code === 200) {
          this.imageUrl = res.data.url;
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      });
    },
  }
}
</script>
<style>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 20vh;
  height: 20vh;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 20vh;
  height: 20vh;
  line-height: 20vh;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>