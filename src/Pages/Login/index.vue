<template>
  <section class="section login-page">
    <div class="container-block">
      <div class="block container-block">
        <div class="block header">
          <h1 class="title is-1">บริษัท โชคชนายุทธ จำกัด</h1>
        </div>
        <div class="block container-block login-form">
          <div class="input-form block">
            <span class="alert">{{ errors.has('username') || local.inValid ? 'โปรดตรวจสอบข้อมมูลข้างต้น' : '' }}</span>
            <div class="control has-icons-left">
              <input class="input" name="username" v-validate="'required'"  v-model="local.username" type="text" placeholder="ชื่อผู้ใช้">
              <span class="icon is-small is-left">
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
            <span class="alert">{{ errors.has('password') || local.inValid ? 'โปรดตรวจสอบข้อมมูลข้างต้น' : '' }}</span>
            <div class="control has-icons-left">
              <input class="input" name="password" v-validate="'required'" v-model="local.password" type="password" placeholder="รหัสผ่าน">
              <span class="icon is-small is-left">
                <i class="fa fa-key" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div class="block submit">
            <button class="button" @click="submit()">เข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import service from '@Services/app-service'
import config from '@Config/app.config'
import Helper from '@Libraries/common.helpers'
import { mapActions } from 'vuex'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
  },
  name: 'LoginPage',
  data () {
    return {
      local: {
        username: null,
        password: null,
        inValid: false
      }
    }
  },
  methods: {
    ...mapActions([
      'setAuth'
    ]),
    submit () {
      this.login()
    },
    async login () {
      let isValid = await this.$validator.validateAll()
      if (!isValid) return
      let resourceName = config.api.login
      let data = {
        username: this.local.username,
        password: this.local.password
      }
      service.postResource({resourceName, data})
        .then((res) => {
          if (res.status === 200) {
            Helper.SET_STORAGEITEM('isAuth', 1)
            Helper.SET_STORAGEITEM('app_token', res.data.token)
            this.setAuth(true)
            this.REDIRECTTOHOME()
            // this.GOTOPAGE('Home', '')
          } else {
            this.local.inValid = true
          }
        })
        .catch((err) => {
          this.local.inValid = true
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.control{
  margin-bottom: 20px !important;
}
.alert{
  color: #d48383;
  font-size: 0.8em;
}
</style>
