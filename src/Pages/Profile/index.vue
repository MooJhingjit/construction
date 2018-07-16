<template>
  <detail-template :templateObj="local.template">
    <template slot="title"><breadcrumb-bar :dataObj="local.pageObj"></breadcrumb-bar></template>
    <template slot="function"></template>
      <template slot="detail">
        <!-- <form @submit="onSubmit()" id="userForm"> -->
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
            <!-- <div class="name">{{local.inputs.name}}</div> -->
            <div class="container-block">
              <div class="text-title">ชื่อ-นามสกุล</div>
              <div class="value">
                <my-input
                  :value="local.inputs.name"
                  :inputObj="{type: 'text', name: 'store_name', placeholder: 'ชื่อ-นามสกุล', validate: 'required'}"
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
                  :inputObj="{type: 'text', name: 'store_username', placeholder: 'ชื่อผู้ใช้', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.username = value }"
                  ></my-input>
                <!-- <input class="input" type="text" v-model="local.inputs.username" placeholder="ชื่อผู้ใช้" required /> -->
              </div>
            </div>
            <!-- <div class="container-block">
              <div class="text-title">ตำแหน่ง</div>
              <div class="value">
                <my-input
                  :value="local.inputs.position"
                  :inputObj="{type: 'text', name: 'store_position', placeholder: 'ตำแหน่ง', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.position = value }"
                  ></my-input>
               </div>
            </div> -->
            <div class="container-block">
              <div class="text-title">อีเมล์</div>
              <div class="value">
                <my-input
                  :value="local.inputs.email"
                  :inputObj="{type: 'text', name: 'store_email', placeholder: 'อีเมล์', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.email = value }"
                  ></my-input>
                <!-- <input class="input" type="text" v-model="local.inputs.email" placeholder="อีเมล์" required /> -->
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">เบอร์โทรศัพท์</div>
              <div class="value">
                <my-input
                  :value="local.inputs.phone"
                  :inputObj="{type: 'text', name: 'store_phone', placeholder: 'เบอร์โทรศัพท์', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.phone = value }"
                  ></my-input>
                <!-- <input class="input" type="text" v-model="local.inputs.phone" placeholder="เบอร์โทรศัพท์" required /> -->
              </div>
            </div>
            <div class="container-block">
              <div class="text-title">ที่อยู่</div>
              <div class="value">
                <my-input
                  :value="local.inputs.address"
                  :inputObj="{type: 'textarea', name: 'store_address', placeholder: 'ที่อยู่', validate: 'required'}"
                  :validator="$validator"
                  @input="value => { local.inputs.address = value }"
                  ></my-input>
                <!-- <textarea class="textarea" id="" v-model="local.inputs.address" cols="30" rows="4"></textarea> -->
              </div>
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
    detailTemplate,
    myInput,
    myAction
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
        inputs: {}
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
    this.fetchData()
  },
  methods: {
    fetchData () {
      let resourceName = `${config.api.users.index}/profile`
      let queryString = []
      service.getResource({resourceName, queryString})
        .then((res) => {
          if (res.status === 200) {
            this.local.inputs = res.data
          }
        })
        .catch(() => {
        })
    },
    async submitForm (type) {
      let isValid = await this.$validator.validateAll()
      let resourceName = this.resourceName
      let data = {}
      let res = null
      switch (type) {
        case 'update':
          if (!isValid) return
          data = this.local.inputs
          resourceName = `${resourceName}/${this.local.inputs.id}`
          res = await service.putResource({data, resourceName})
          break
      }
      if (res.status === 200) {
        this.fetchData()
        this.NOTIFY('success')
        return
      }
      this.NOTIFY('error')
    }
  }
}
</script>

<style lang="scss">
</style>
