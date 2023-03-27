<!--

/**\_________________________________________________________________________________________________
|*												说明											                                               ___≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*    此代码由VM模板自动生成		  															                                    |
|*		版本:v0.0.0.1                                                                              |___
|*		日期:2022-07-04 16:16:51                                                                      ≣|
|*																	                              create by    LCTR                ≣|
|*																	                              generate by  admin               ≣|
|* ________________________________________________________________________________________________≣|
\*/


常量/枚举详情页

author admin
date 2022-07-04

-->
<template>
  <simple-skeleton :loading="renderData.loading" />

  <el-form v-if="!renderData.loading">
    <el-form-item label="创建者：" :prop="CE_Fields.createBy">
      {{ renderData.data.createBy }}
    </el-form-item>

    <el-form-item label="创建时间：" :prop="CE_Fields.createTime">
      {{ renderData.data.createTime }}
    </el-form-item>

    <el-form-item label="类型（enum,const）：" :prop="CE_Fields.type">
      {{ renderData.data.type }}
    </el-form-item>

    <el-form-item label="所属模块名称：" :prop="CE_Fields.moduleName">
      {{ renderData.data.moduleName }}
    </el-form-item>

    <el-form-item label="名称：" :prop="CE_Fields.name">
      {{ renderData.data.name }}
    </el-form-item>

    <el-form-item label="描述：" :prop="CE_Fields.description">
      {{ renderData.data.description }}
    </el-form-item>

    <el-form-item label="备注：" :prop="CE_Fields.remark">
      {{ renderData.data.remark }}
    </el-form-item>

    <el-form-item label="更新者：" :prop="CE_Fields.updateBy">
      {{ renderData.data.updateBy }}
    </el-form-item>

    <el-form-item label="更新时间：" :prop="CE_Fields.updateTime">
      {{ renderData.data.updateTime }}
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { Detail } from '@/api/dto/cagc/constEnum/Detail';
  import { CE_Fields } from '@/api/dto/cagc/constEnum/CE_Fields';
  import ConstEnumService from '@/api/service/cagc/ConstEnumService';
  import { reactive } from 'vue';
  import { ElMessage } from 'element-plus';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 加载状态
     */
    loading: true,
    /**
     * 数据
     */
    data: {} as Detail,
  });

  /**
   * 组件属性
   */
  const props = withDefaults(
    defineProps<{
      /**
       * 数据Id
       */
      id: string;
    }>(),
    {
      id: '',
    }
  );

  /**
   * 初始化方法
   */
  (async () => {
    if (!props.id) {
      ElMessage({
        type: 'warning',
        message: '操作有误',
      });
      return;
    }

    //写入数据
    try {
      renderData.data = await ConstEnumService.detail(props.id);
      renderData.loading = false;
    } catch (ex: any) {
      console.error(ex);
      ElMessage({
        type: 'error',
        message: ex.message,
      });
    }
  })();
</script>

<style scoped></style>
