<template>
  <section class="section login-page">
    <div class="container-block">
      <div class="block container-block">
        <div class="block header">
          <h1 class="title is-1">บริษัท โชคชนายุทธ จำกัด</h1>
        </div>
        <div class="block container-block login-form">
          <div class="input-form block">
            <div class="control has-icons-left">
              <input class="input" type="text" placeholder="ชื่อผู้ใช้">
              <span class="icon is-small is-left">
                <i class="fa fa-user" aria-hidden="true"></i>
              </span>
            </div>
            <div class="control has-icons-left">
              <input class="input" type="password" placeholder="รหัสผ่าน">
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
      property: 'Blank'
    }
  },
  methods: {
    submit () {
      this.login()
      // this.$router.push({
      //   name: 'Home',
      //   params: {id: 'id'}
      // })
    },
    login () {
      let resourceName = config.api.login
      let data = {
        username: 'pokkrong',
        password: '1234'
      }
      service.postData({resourceName, data})
        .then((res) => {
          if (res.status === 200) {
            Helper.SET_STORAGEITEM('app_token', res.data.token)
            this.GOTOPAGE('Home', '')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
