<!--

/**\_________________________________________________________________________________________________
|*												说明											                                               ___≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*    此代码由VM模板自动生成		  															                                    |
|*		版本:v0.0.0.1                                                                              |___
|*		日期:2022-07-04 16:21:50                                                                      ≣|
|*																	                              create by    LCTR                ≣|
|*																	                              generate by  admin               ≣|
|* ________________________________________________________________________________________________≣|
\*/


常量/枚举数据编辑页

author admin
date 2022-07-04

-->
<template>
  <simple-skeleton :loading="renderData.loading" />

  <div v-if="!renderData.loading" class="form-container pretty-scrollbar">
    <el-form
      v-if="!renderData.loading"
      ref="formRef"
      :model="renderData.data"
      :rules="renderData.rules"
      label-width="80px"
    >
      <el-form-item label="所属常量/枚举" :prop="CED_Fields.cEId">
        <simple-select
          :method="ConstEnumService.selectOptionList"
          v-model="renderData.data.cEId"
          placeholder="请选择所属常量/枚举"
        />
      </el-form-item>

      <el-form-item label="键" :prop="CED_Fields.key">
        <el-input
          v-model="renderData.data.key"
          placeholder="请输入键"
          clearable
        />
      </el-form-item>

      <el-form-item label="值" :prop="CED_Fields.value">
        <el-input
          v-model="renderData.data.value"
          placeholder="请输入值"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
        />
      </el-form-item>

      <el-form-item label="描述" :prop="CED_Fields.description">
        <el-input
          v-model="renderData.data.description"
          placeholder="请输入描述"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
        />
      </el-form-item>

      <el-form-item label="备注" :prop="CED_Fields.remark">
        <el-input
          v-model="renderData.data.remark"
          placeholder="请输入备注"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
        />
      </el-form-item>
    </el-form>
  </div>

  <div class="dialog-footer">
    <el-button @click="emit('close', renderData.data)"> 关闭 </el-button>
    <el-button
      v-if="!renderData.loading"
      type="primary"
      @click="submitAsync"
      :loading="renderData.processing"
    >
      提交
    </el-button>
  </div>
</template>

<script lang="ts" setup>
  import { Edit } from '@/api/dto/cagc/constEnumData/Edit';
  import { CED_Fields } from '@/api/dto/cagc/constEnumData/CED_Fields';
  import ConstEnumService from '@/api/service/cagc/ConstEnumService';
  import ConstEnumDataService from '@/api/service/cagc/ConstEnumDataService';
  import type { FormInstance } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import SimpleSkeleton from '@/components/SimpleSkeleton/index.vue';
  import SimpleSelect from '@/components/SimpleSelect/index.vue';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 加载状态
     */
    loading: true,
    /**
     * 处理中
     */
    processing: false,
    /**
     * 数据
     */
    data: {} as Edit,
    /**
     * 表单验证规则
     */
    rules: {
      cEId: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      key: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      description: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      remark: [],
      value: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
    },
  });

  /**
   * 获取表单实例
   */
  const formRef = ref<FormInstance>();

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
   * 组件自定义事件
   */
  const emit = defineEmits<{
    /**
     * 数据已提交
     *
     * @param e
     * @param data 数据
     */
    (e: 'submitted', data: Edit): void;

    /**
     * 关闭窗口
     *
     * @param e
     * @param data 数据
     */
    (e: 'close', data: Edit): void;
  }>();

  /**
   * 表单验证
   */
  const validate = async (): Promise<void> => {
    if (!formRef.value) return;

    try {
      await formRef.value.validate();
    } catch (ex) {
      console.error(ex);
      throw new Error('请检查数据');
    }
  };

  /**
   * 表单提交
   *
   * @return 是否成功
   */
  const submitAsync = async (): Promise<void> => {
    try {
      renderData.processing = true;
      // 表单验证
      await validate();

      // 提交数据
      const msg: string = await ConstEnumDataService.edit(renderData.data);
      emit('submitted', renderData.data);
      ElMessage({
        type: 'success',
        message: msg,
      });
      renderData.processing = false;
    } catch (ex: any) {
      renderData.processing = false;
      console.error(ex);
      ElMessage({
        type: 'error',
        message: ex.message,
      });
    }
  };

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
      renderData.data = await ConstEnumDataService.getEditData(props.id);
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

<style scoped>
  .form-container {
    max-height: 500px;
    padding: 10px;
    overflow: auto;
  }
</style>
