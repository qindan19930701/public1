<template>
<el-dialog title="修改地址" :visible.sync="formVisible" width="30%">
  <el-form size="small" ref="addFormEl">
    <el-form-item label="用户名" label-width="70px" >
      <el-cascader :options="option" v-model="city"></el-cascader>
    </el-form-item>
    <el-form-item label="详细地址" label-width="70px">
      <el-input autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="formVisible = false">关 闭</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { regionDataPlus } from 'element-china-area-data'

export default {
  data () {
    return {
      name: 'OrderEdit',
      formVisible: false,
      // option: provinceAndCityDataPlus,
      option: regionDataPlus,
      city: []
    }
  },
  methods: {
    handleSubmit () {}
  }
}
</script>

<style>

</style>
