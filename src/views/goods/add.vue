<template>
<div class="goods-add-wrap">
  <!-- 步骤条 -->
  <el-steps :active="activeStep" simple>
    <el-step title="步骤 1" ></el-step>
    <el-step title="步骤 2" ></el-step>
    <el-step title="步骤 3" ></el-step>
    <el-step title="步骤 4" ></el-step>
    <el-step title="步骤 5" ></el-step>
  </el-steps>

  <!-- 标签导航 -->
   <el-tabs tab-position="left"
    @tab-click="handleTabClick"
    v-model="activeTab">
    <el-tab-pane label="基本信息" name="基本信息">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="formData.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <!-- .number 修饰符将用户的输入转换为数字同步到数据中 -->
          <el-input v-model.number="formData.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model.number="formData.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="formData.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <!-- 级联选择器
               options 数据
               v-model="结果数据" 它会把用户选中的所有节点的 value都同步到这个数据中
               change 选中的改变时间 -->
          <el-cascader
            expand-trigger="hover"
            :options="goodsCategories"
            v-model="formData.goods_cat"
            @change="handleChange"
            :props="{ value: 'cat_id', label: 'cat_name', children: 'children' }">
          </el-cascader>
          <!-- 级联选择器 -->
        </el-form-item>
        <el-form-item label="是否促销">
          <el-radio-group v-model="formData.is_promote">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button type="primary"
         @click="handleNextStep('商品参数',1)">下一步</el-button>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品参数" name="商品参数">
      <el-row
       class="param-row"
       v-for="param in goodsCategoryParams"
       :key="param.attr_id">
        <el-col :span="4">
          {{ param.attr_name }}
        </el-col>
        <el-col :span="20">
          <el-checkbox-group v-model="param.attr_selected_vals" size="small">
            <el-checkbox
             :label="val"
             border
             v-for="val in param.attr_vals.split(',')"
             :key="val + Math.random()"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <el-button type="primary"
        @click="handleNextStep('商品属性',2)">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="商品属性" name="商品属性">
      <el-form label-position="right" label-width="140px">
        <el-form-item
         :label="attr.attr_name"
         v-for="attr in goodsCategoryAttrs"
         :key="attr.attr_id">
          <el-input v-model="attr.attr_vals"></el-input>
        </el-form-item>
        <el-button type="primary"
         @click="handleNextStep('商品图片',3)">下一步</el-button>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品图片" name="商品图片">
      <!-- :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        upload 会自己去请求
        action 请求地址
        headers 自定义请求头 -->
      <el-upload
        action="http://localhost:8888/api/private/v1/upload"
        :headers="uploadHeaders"
        :on-success="handleUploadSuccess"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-button type="primary"
         @click="handleNextStep('商品内容',4)">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="商品内容" name="商品内容">
      <!-- 富文本编辑器 quill -->
      <quill-editor v-model="formData.goods_introduce" ref="myQuillEditor">
      </quill-editor>
      <!-- /富文本编辑器 quill -->
      <el-button type="primary" @click="handleSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import { getGoodsCategoryList } from '@/api/goods-category'
import { addGoods } from '@/api/goods'
import { getGoodsCategoryAttrList } from '@/api/goods-category-attr'
import { getToken } from '@/utils/auth'

// 引入编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'GoodsAdd',
  components: {
    QuillEditor: quillEditor
  },
  data () {
    return {
      activeStep: 0,
      activeTab: '商品图片',
      uploadHeaders: { // 配置上传的请求头
        Authorization: getToken()
      },
      formData: {
        goods_name: '', // 商品名称
        goods_price: '', // 商品价格
        goods_weight: '', // 商品重量
        goods_number: '', // 商品数量
        goods_cat: [], // 商品分类
        is_promote: false, // 是否促销
        pics: [], // 商品图片
        goods_introduce: '' // 商品介绍
      },
      // 所有商品分类数据
      goodsCategories: [],
      // 商品属性
      goodsCategoryAttrs: [],
      // 商品参数
      goodsCategoryParams: []
    }
  },

  created () {
    this.loadGoodsCategories()
  },

  methods: {
    // 加载商品数据列表
    async loadGoodsCategories () {
      const { data, meta } = await getGoodsCategoryList()
      console.log(data)
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },

    handleChange (value) {
      // console.log(value)
      // 获取最后一层分类的 id
      const catId = value[value.length - 1]
      // 根据用户所选分类加载商品参数
      this.loadGoodsCategoryAttrs(catId)
      // 根据用户所选分类加载商品属性
      this.loadGoodsCategoryParams(catId)
    },

    async loadGoodsCategoryParams (catId) {
      // 默认获取商品参数数据
      const { data, meta } = await getGoodsCategoryAttrList(catId)
      if (meta.status === 200) {
        data.forEach(param => {
          param.attr_selected_vals = param.attr_vals.split(',')
        })
        this.goodsCategoryParams = data
      }
    },

    async loadGoodsCategoryAttrs (catId) {
      // 获取商品属性数据
      const { data, meta } = await getGoodsCategoryAttrList(catId, 'only')
      if (meta.status === 200) {
        this.goodsCategoryAttrs = data
      }
    },

    async handleSubmit () {
      const {
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat,
        is_promote,
        pics,
        goods_introduce
      } = this.formData

      // 商品属性
      const categoryAttrs = this.goodsCategoryAttrs.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })

      // 商品参数
      const categoryParams = this.goodsCategoryParams.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_selected_vals.join(',')
        }
      }).filter(item => item.attr_value.length > 0)

      /**
       * attrs
       *  商品参数
       *  商品属性
       *  和并为一个数组提交给服务器接口
       */
      const attrs = [...categoryParams, ...categoryAttrs]

      const { data, meta } = await addGoods({
        goods_name,
        goods_price,
        goods_weight,
        goods_number,
        goods_cat: goods_cat.join(','),
        is_promote,
        attrs,
        pics,
        goods_introduce
      })
      console.log(data)

      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.replace('/goods/goods')
      }
    },

    /**
     * 上传图片成功处理函数
     * response 请求成功的响应数据
     * file 上传的文件信息对象
     */
    handleUploadSuccess (response, file) {
      this.formData.pics.push({
        pic: response.data.tmp_path
      })
    },

    // tab 选中处理 步骤条
    handleTabClick (tab) {
      this.activeStep = Number.parseInt(tab.index)
    },

    // 处理下一步操作
    handleNextStep (tabName, stepIndex) {
      this.activeTab = tabName
      this.activeStep = stepIndex
    }
  }
}
</script>

<style scoped>
.el-tabs {
  margin-top:15px;
}
.param-row{
  margin-top:10px;
}
</style>
