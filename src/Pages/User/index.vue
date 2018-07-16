<template>
  <option-detail-template
  :templateObj="local.pageObj.template"
  :isSelected="local.idSelected"
  @cancleForm="submitForm('cancel')"
  >
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="data-table">
      <data-table ref="dataTable"
      :resourceName="resourceName"
      :statusSearch="local.statusSearch"
      @selectedData="selectedDataHandle"
      ></data-table>
    </template>
    <template slot="function">
      <button class="button is-link" @click="submitForm('add')">เพิ่มข้อมูลใหม่</button>
    </template>
    <template v-if="local.idSelected != ''">
      <template slot="detail">
        <div class="container-block  detail-block">
          <!-- <div class="profile-img container-block">
            <div class="block">
              <div class="img">
                <img src="../../../static/img/avatar2.png">
                <span class="upload"><i class="fa fa-camera" aria-hidden="true"></i> เปลี่ยนรูปภาพ</span>
              </div>
              <div class="options"></div>
            </div>
          </div> -->
          <div class="form-detail">
            <div class="name">{{local.inputs.name}}</div>
            <div class="container-block">
              <div class="text-title">ชื่อ-นามสกุล</div>
              <div class="value">
                 <my-input
                  :value="local.inputs.name"
                  :inputObj="{type: 'text', name: 'user_name', placeholder: 'ชื่อ-นามสกุล', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.name = value }"
                  ></my-input>
                <!-- <input class="input" type="text" v-model="local.inputs.name" value="Pokkrong Jhingjit" placeholder="ชื่อ-นามสกุล" required /> -->
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ชื่อผู้ใช้</div>
              <div class="value">
                <my-input
                  :value="local.inputs.username"
                  :inputObj="{type: 'text', name: 'user_username', placeholder: 'ชื่อผู้ใช้', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.username = value }"
                  ></my-input>
                <!-- <input class="input" type="text" v-model="local.inputs.username" placeholder="ชื่อผู้ใช้" required /> -->
              </div>
            </div>
            <div class="container-block" v-if="local.idSelected == 'new'">
              <div class="text-title">รหัสผ่าน</div>
              <div class="value">
                <my-input
                  :value="local.inputs.password"
                  :inputObj="{type: 'text', name: 'user_password', placeholder: 'รหัสผ่าน', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.password = value }"
                  ></my-input>
                <!-- <input class="input" type="text" v-model="local.inputs.username" placeholder="ชื่อผู้ใช้" required /> -->
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ตำแหน่ง</div>
              <div class="value">
                  <my-input
                  :value="local.inputs.position.toLowerCase()"
                  :inputObj="{type: 'select', icon: 'home', inputValue: USERPOSITION, name: 'user_position', placeholder: 'ตำแหน่ง', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.position = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">อีเมล์</div>
              <div class="value">
                <!-- <input class="input" type="text" v-model="local.inputs.email" placeholder="อีเมล์" required /> -->
                <my-input
                  :value="local.inputs.email"
                  :inputObj="{type: 'text', name: 'user_email', placeholder: 'อีเมล์', validate: 'email'}"
                  :validator="$validator"
                  @input="value => { local.inputs.email = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">เบอร์โทรศัพท์</div>
              <div class="value">
                <!-- <input class="input" type="text" v-model="local.inputs.phone" placeholder="เบอร์โทรศัพท์" required /> -->
                <my-input
                  :value="local.inputs.phone"
                  :inputObj="{type: 'text', name: 'user_phone', placeholder: 'เบอร์โทรศัพท์', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.phone = value }"
                  ></my-input>
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ที่อยู่</div>
              <div class="value"><textarea class="textarea" id="" v-model="local.inputs.address" cols="30" rows="4"></textarea></div>
            </div>
          </div>
        </div>
        <div class="container-block footer-panel">
          <my-action
            type="update"
            :obj="{title: 'บันทึกข้อมูล'}"
             @clickEvent="submitForm('update')"
          >
          </my-action>
          <my-action
            type="delete"
            :obj="{title: 'ลบข้อมูล'}"
            @clickEvent="submitForm('delete')"
            v-if="local.idSelected != 'new'"
          >
          </my-action>
          <!-- <button class="button" @click="submitForm('edit')">บันทึกข้อมูล</button> -->
          <!-- <button v-if="this.local.idSelected != 'new'" class="button is-danger" @click="submitForm('delete')">ลบข้อมูล</button> -->
        </div>
      </template>
    </template>
    <template v-else slot="detail">
    </template>
  </option-detail-template>
</template>

<script>
import breadcrumbBar from '@Components/Breadcrumb'
import optionDetailTemplate from '@Components/Template/option-detail'
import service from '@Services/app-service'
import config from '@Config/app.config'
import dataTable from '@Components/DataTable'
import myInput from '@Components/Form/my-input'
import myAction from '@Components/Form/my-action'
export default {
  props: {
    // templateName: {
    //   type: String,
    //   required: true
    // }
  },
  components: {
    breadcrumbBar,
    optionDetailTemplate,
    dataTable,
    myInput,
    myAction
  },
  name: 'UserPage',
  data () {
    return {
      local: {
        pageObj: {
          items: [
            {name: 'ข้อมูลผู้ใช้', route: 'User', key: '', active: true, icon: 'fa fa-address-book-o'}
          ],
          template: {
            class: 'user-page'
          }
        },
        isOptionMinimize: false,
        idSelected: '',
        // users: {},
        // userInput: {},
        inputs: {}
        // submitMode: 'add'
      },
      server: {
      }
    }
  },
  computed: {
    resourceName () {
      return config.api.users.index
    }
  },
  created () {
  },
  methods: {
    selectedDataHandle (user) {
      this.local.idSelected = user.id
      this.local.inputs.name = user.name
      this.local.inputs.username = user.username
      this.local.inputs.position = user.position
      this.local.inputs.email = user.email
      this.local.inputs.phone = user.phone
      this.local.inputs.address = user.address
      this.local.submitMode = 'update'
    },
    // onSubmit () {
    //   console.log(this.local.inputs.username)
    //   // do somethings
    // },
    // submitForm (type) {
    //   this.$validator.validateAll().then((tf) => {
    //     if (type === 'cancel') {
    //       this.local.idSelected = null
    //       return
    //     }
    //     if (tf) {
    //       let data = {}
    //       let resourceName = config.api.users.index
    //       if (type === 'edit' && this.local.idSelected === 'new') {
    //         type = 'save'
    //       }
    //       switch (type) {
    //         case 'add':
    //           this.local.idSelected = 'new'
    //           this.cleanUserInput()
    //           break
    //         case 'save':
    //           data = this.local.inputs
    //           console.log(data)
    //           // resourceName = config.api.users.index
    //           service.postResource({data, resourceName})
    //             .then((res) => {
    //               if (res.status === 200) {
    //                 this.$refs.dataTable.fetchData()
    //                 this.local.idSelected = ''
    //                 this.cleanUserInput()
    //                 this.NOTIFY('success')
    //               } else {
    //                 this.NOTIFY('error')
    //               }
    //             })
    //             .catch((err) => {
    //               console.log(err)
    //             })
    //           break
    //         case 'delete':
    //           resourceName = `${resourceName}/${this.local.idSelected}`
    //           let queryString = []
    //           service.deleteResource({resourceName, queryString})
    //             .then((res) => {
    //               if (res.status === 200) {
    //                 this.$refs.dataTable.fetchData()
    //                 this.local.idSelected = ''
    //                 this.NOTIFY('success')
    //               } else {
    //                 this.NOTIFY('error')
    //               }
    //             })
    //             .catch((err) => {
    //               console.log(err)
    //             })
    //           break
    //         case 'edit':
    //           data = this.local.inputs
    //           resourceName = `${resourceName}/${this.local.idSelected}`
    //           service.putResource({data, resourceName})
    //             .then((res) => {
    //               if (res.status === 200) {
    //                 this.$refs.dataTable.fetchData()
    //                 this.local.idSelected = ''
    //                 this.cleanUserInput()
    //                 this.NOTIFY('success')
    //               } else {
    //                 this.NOTIFY('error')
    //               }
    //             })
    //             .catch((err) => {
    //               console.log(err)
    //             })
    //           break
    //       }
    //     }
    //   })
    // },
    async submitForm (type) {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      if (type === 'update' && this.local.idSelected === 'new') type = 'save'
      let data = {}
      let res = null
      switch (type) {
        case 'add':
          this.local.idSelected = 'new'
          this.cleanInput()
          return
        case 'cancel':
          this.local.idSelected = null
          return
        case 'update':
          if (!isValid) return
          data = this.local.inputs
          resourceName = `${resourceName}/${this.local.idSelected}`
          res = await service.putResource({data, resourceName})
          break
        case 'delete':
          resourceName = `${resourceName}/${this.local.idSelected}`
          let queryString = []
          res = await service.deleteResource({resourceName, queryString})
          break
        case 'save':
          if (!isValid) return
          data = this.local.inputs
          res = await service.postResource({data, resourceName})
          break
      }
      if (res.status === 200) {
        this.reloadTable()
        this.cleanInput()
        this.local.idSelected = ''
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    },
    reloadTable () {
      this.$refs.dataTable.fetchData()
    },
    cleanInput () {
      this.local.inputs.name = ''
      this.local.inputs.username = ''
      this.local.inputs.position = ''
      this.local.inputs.email = ''
      this.local.inputs.phone = ''
      this.local.inputs.address = ''
    }
  }
}
</script>

<style lang="scss">
</style>
