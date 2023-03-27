<template>
  <simple-skeleton :loading="renderData.loading" />
  <el-form
    v-if="!renderData.loading"
    ref="formRef"
    :model="data"
    :rules="rules"
    label-width="80px"
  >
    <el-form-item label="表名" prop="name">
      <el-input v-model="data.name" placeholder="请输入表名" clearable />
    </el-form-item>
    <el-form-item label="标题/名称" prop="title">
      <el-input v-model="data.title" placeholder="请输入标题/名称" clearable />
    </el-form-item>
    <el-form-item label="所属分组" prop="group">
      <el-input v-model="data.group" placeholder="请输入所属分组" clearable />
    </el-form-item>
    <el-form-item label="署名" prop="signature">
      <el-input v-model="data.signature" placeholder="请输入署名" clearable />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input
        v-model="data.description"
        placeholder="请输入描述"
        type="textarea"
        :autosize="{ minRows: 2 }"
        clearable
      />
    </el-form-item>

    <el-form-item label="业务名称" prop="businessName">
      <el-input
        v-model="data.businessName"
        placeholder="请输入业务名称"
        clearable
      />
    </el-form-item>
    <el-form-item label="所属模块" prop="moduleName">
      <el-input
        v-model="data.moduleName"
        placeholder="请输入所属模块"
        clearable
      />
    </el-form-item>
    <el-form-item label="其它选项" prop="optionList">
      <simple-tag-list
        name="选项"
        :list="data.optionList"
        :type="DataType.字符串"
        @change="updateOptionList"
      >
      </simple-tag-list>
    </el-form-item>

    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="data.remark"
        placeholder="请输入备注"
        type="textarea"
        :autosize="{ minRows: 2 }"
        clearable
      />
    </el-form-item>
  </el-form>

  <div class="dialog-footer">
    <el-button @click="emit('close', data)">关闭</el-button>
    <el-button
      v-if="!renderData.loading"
      type="primary"
      @click="submitAsync"
      :loading="renderData.processing"
      >提交
    </el-button>
  </div>
</template>

<script lang="ts" setup>
  import { Edit } from '@/api/dto/cagc/table/Edit';
  import TableService from '@/api/service/cagc/TableService';
  import type { FormInstance, FormRules } from 'element-plus';
  import { reactive, ref, toRefs } from 'vue';
  import { ElMessage } from 'element-plus';
  import SimpleSkeleton from '@/components/SimpleSkeleton/index.vue';
  import SimpleTagList from '@/components/SimpleTagList/index.vue';
  import { DataType } from '@/components/SimpleTagList/Model/DataType';

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
      name: [
        {
          required: true,
          message: '请输入表名',
          trigger: 'blur',
        },
        {
          max: 30,
          message: '长度不可超过30',
          trigger: 'blur',
        },
      ],
      title: [
        {
          required: true,
          message: '请输入标题/名称',
          trigger: 'blur',
        },
        {
          max: 30,
          message: '长度不可超过30',
          trigger: 'blur',
        },
      ],
      group: [
        {
          required: true,
          message: '请输入所属分组',
          trigger: 'blur',
        },
        {
          max: 30,
          message: '长度不可超过30',
          trigger: 'blur',
        },
      ],
      signature: [
        {
          max: 50,
          message: '长度不可超过50',
          trigger: 'blur',
        },
      ],
      description: [
        {
          max: 800,
          message: '长度不可超过800',
          trigger: 'blur',
        },
      ],
      businessName: [
        {
          required: true,
          message: '请输入业务名称',
          trigger: 'blur',
        },
        {
          max: 30,
          message: '长度不可超过30',
          trigger: 'blur',
        },
      ],
      moduleName: [
        {
          required: true,
          message: '请输入所属模块',
          trigger: 'blur',
        },
        {
          max: 30,
          message: '长度不可超过30',
          trigger: 'blur',
        },
      ],
    } as FormRules,
  });

  /**
   * 单独解构的属性
   */
  const { data, rules } = toRefs(renderData);

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
   * 更新其他选项集合
   *
   * @param list 数据集合
   */
  const updateOptionList = (list: unknown[]) => {
    renderData.data.optionList = list as string[];
  };

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
      const msg: string = await TableService.edit(renderData.data);
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
      renderData.data = await TableService.getEditData(props.id);
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
