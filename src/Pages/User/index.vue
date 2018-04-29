<template>
  <option-detail-template :optionMinimize="local.isOptionMinimize" :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="search-status"></template>
    <template slot="search-input">
      <div class="search-input control has-icons-left">
        <input class="input" type="text" placeholder="ค้นหา">
        <span class="icon is-small is-left">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
    </template>
    <template slot="search-results">
      <table class="table is-bordered rows-table">
        <thead>
          <tr>
            <th>ชื่อ</th>
            <th>ตำแหน่ง</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="{'selected': user.id == local.idSelected}" :key="index" v-for="(user, index) in local.users" @dblclick="setUserDetail(user)">
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
          </tr>
        </tbody>
      </table>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <button class="pagination-previous" title="This is the first page" disabled>ก่อนหน้า</button>
        <button class="pagination-next">หน้าถัดไป</button>
      </nav>
    </template>
    <template slot="function">
      <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button>
    </template>
    <template v-if="local.idSelected != ''">
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
          <button class="button is-warning" @click="submitForm('cancel')">ยกเลิก</button>
          <button v-if="this.local.idSelected != 'new'" class="button is-danger" @click="submitForm('delete')">ลบข้อมูล</button>
        </div>
        <!-- </form> -->
      </template>
    </template>
    <template v-else>
      <template slot="detail">
        <div class="container-block empty-panel">
          <!-- <div class="block container-block">
            <div class="block no-data">
                ไม่พบข้อมูลที่ต้องการ
            </div>
            <div class="block select-data">
              <i class="fa fa-hand-o-left" aria-hidden="true"></i>
              <span>เลือกข้อมูลทางซ้ายมือเพื่อแสดง</span>
            </div>
            <div class="block or">
              หรือ
            </div>
            <div class="block add-data">
              <button class="button" @click="addNew()">เพิ่มข้อมูลใหม่</button>
            </div>
          </div> -->
        </div>
      </template>
    </template>
  </option-detail-template>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
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
    optionDetailTemplate
  },
  name: 'UserPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลผู้ใช้', route: 'User', key: '', active: true, icon: 'fa fa-address-book-o'}
          ]
        },
        template: {
          class: 'user-page'
        },
        isOptionMinimize: false,
        idSelected: '',
        users: {},
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
      let resourceName = config.api.users.index
      let queryString = []
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.users = res.data
          }
        })
        .catch(() => {
        })
    },
    setUserDetail (user) {
      this.local.idSelected = user.id
      this.local.userInput.name = user.name
      this.local.userInput.username = user.username
      this.local.userInput.position = user.position
      this.local.userInput.email = user.email
      this.local.userInput.phone = user.phone
      this.local.userInput.address = user.address
      this.local.submitMode = 'edit'
    },
    // onSubmit () {
    //   console.log(this.local.userInput.username)
    //   // do somethings
    // },
    submitForm (type) {
      let data = {}
      let resourceName = config.api.users.index
      if (type === 'edit' && this.local.idSelected === 'new') {
        type = 'save'
      }
      switch (type) {
        case 'add':
          this.local.idSelected = 'new'
          this.cleanUserInput()
          break
        case 'save':
          data = this.local.userInput
          console.log(data)
          // resourceName = config.api.users.index
          service.postResource({data, resourceName})
            .then((res) => {
              if (res.status === 200) {
                this.fetchData()
                this.local.idSelected = ''
                this.cleanUserInput()
              }
            })
            .catch((err) => {
              console.log(err)
            })
          break
        case 'delete':
          resourceName = `${resourceName}/${this.local.idSelected}`
          let queryString = []
          service.deleteResource({resourceName, queryString})
            .then((res) => {
              if (res.status === 200) {
                this.fetchData()
                this.local.idSelected = ''
              }
            })
            .catch((err) => {
              console.log(err)
            })
          break
        case 'edit':
          data = this.local.userInput
          resourceName = `${resourceName}/${this.local.idSelected}`
          service.putResource({data, resourceName})
            .then((res) => {
              if (res.status === 200) {
                this.fetchData()
                this.local.idSelected = ''
                this.cleanUserInput()
              }
            })
            .catch((err) => {
              console.log(err)
            })
          break
        case 'cancel':
          this.local.idSelected = ''
          this.local.isOptionMinimize = false
          break
      }
    },
    cleanUserInput () {
      this.local.userInput.name = ''
      this.local.userInput.username = ''
      this.local.userInput.position = ''
      this.local.userInput.email = ''
      this.local.userInput.phone = ''
      this.local.userInput.address = ''
    }
  }
}
</script>

<style lang="scss">
</style>
