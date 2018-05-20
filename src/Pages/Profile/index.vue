<template>
  <detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="function"></template>
      <template slot="detail">
        <!-- <form @submit="onSubmit()" id="userForm"> -->
        <div class="container-block  detail-block">
          <div class="profile-img container-block">
            <div class="block">
              <div class="img">
                <img src="../../../static/img/avatar2.png">
                <span class="upload"><i class="fa fa-camera" aria-hidden="true"></i> เปลี่ยนรูปภาพ</span>
              </div>
              <div class="options"></div>
            </div>
          </div>
          <div class="form-detail">
            <div class="name">{{local.userInput.name}}</div>
            <div class="container-block">
              <div class="text-title">ชื่อ-นามสกุล</div>
              <div class="value"><input class="input" type="text" v-model="local.userInput.name" value="Pokkrong Jhingjit" placeholder="ชื่อ-นามสกุล" required /></div>
            </div>
            <div class="container-block">
              <div class="text-title">ชื่อผู้ใช้</div>
              <div class="value"><input class="input" type="text" v-model="local.userInput.username" placeholder="ชื่อผู้ใช้" required /></div>
            </div>
            <div class="container-block">
              <div class="text-title">ตำแหน่ง</div>
              <div class="value"><input class="input" type="text" v-model="local.userInput.position" placeholder="ตำแหน่ง" required /></div>
            </div>
            <div class="container-block">
              <div class="text-title">อีเมล์</div>
              <div class="value"><input class="input" type="text" v-model="local.userInput.email" placeholder="อีเมล์" required /></div>
            </div>
            <div class="container-block">
              <div class="text-title">เบอร์โทรศัพท์</div>
              <div class="value"><input class="input" type="text" v-model="local.userInput.phone" placeholder="เบอร์โทรศัพท์" required /></div>
            </div>
            <div class="container-block">
              <div class="text-title">ที่อยู่</div>
              <div class="value"><textarea class="textarea" id="" v-model="local.userInput.address" cols="30" rows="4"></textarea></div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <button class="button" @click="submitForm('edit')">บันทึกข้อมูล</button>
        </div>
        <!-- </form> -->
      </template>
  </detail-template>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import detailTemplate from '@Components/Template/detail'
import service from '@Services/app-service'
import config from '@Config/app.config'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    detailTemplate
  },
  name: 'ProfilePage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลผู้ใช้', route: 'Profile', key: '', active: true, icon: 'fa fa-address-book-o'}
          ]
        },
        template: {
          class: 'user-page'
        },
        userInput: {}
        // submitMode: 'add'
      },
      server: {
      }
    }
  },
  computed: {
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      let resourceName = `${config.api.users.index}/profile`
      let queryString = []
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.userInput = res.data
          }
        })
        .catch(() => {
        })
    },
    submitForm (type) {
      let data = {}
      let resourceName = config.api.users.index
      switch (type) {
        case 'edit':
          data = this.local.userInput
          resourceName = `${resourceName}/${this.local.userInput.id}`
          service.putResource({data, resourceName})
            .then((res) => {
              if (res.status === 200) {
                this.fetchData()
                this.NOTIFY('success')
              } else {
                this.NOTIFY('error')
              }
            })
            .catch((err) => {
              console.log(err)
            })
          break
      }
    }
  }
}
</script>

<style lang="scss">
</style>
