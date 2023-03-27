<!--

/**\_________________________________________________________________________________________________
|*												说明											                                               ___≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*    此代码由VM模板自动生成								  									                                    |
|*		版本:v0.0.0.1                                                                              |___
|*		日期:2022-07-04 12:56:56                                                                      ≣|
|*																	                              create by    LCTR                ≣|
|*																	                              generate by  admin               ≣|
|* ________________________________________________________________________________________________≣|
\*/


数据库列新增页

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
      <span class="group-title">基础信息</span>

      <el-form-item label="所属表" :prop="C_Fields.tableId">
        <simple-select
          :method="TableService.synchronizedTableSelectOptionList"
          v-model="renderData.data.tableId"
          placeholder="请选择所属表"
        />
      </el-form-item>

      <el-form-item label="关联常量/枚举" :prop="C_Fields.cEId">
        <simple-select
          :method="ConstEnumService.selectOptionList"
          v-model="renderData.data.cEId"
          placeholder="请选择关联常量/枚举"
        />
      </el-form-item>

      <el-form-item label="标题/名称" :prop="C_Fields.title">
        <el-input
          v-model="renderData.data.title"
          placeholder="请输入标题/名称"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="描述" :prop="C_Fields.description">
        <el-input
          v-model="renderData.data.description"
          placeholder="请输入描述"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
        />
      </el-form-item>

      <el-divider />

      <span class="group-title">数据库属性</span>

      <el-form-item label="列名" :prop="C_Fields.name">
        <el-input
          v-model="renderData.data.name"
          placeholder="请输入列名"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="主键" :prop="C_Fields.pk">
        <el-switch
          v-model="renderData.data.pk"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="外键" :prop="C_Fields.fk">
        <el-switch
          v-model="renderData.data.fk"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="外键名称" :prop="C_Fields.fkName">
        <el-input
          v-model="renderData.data.fkName"
          placeholder="请输入外键名称"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="外键关联表" :prop="C_Fields.fkTableId">
        <simple-select
          :method="TableService.synchronizedTableSelectOptionList"
          v-model="renderData.data.fkTableId"
          placeholder="请选择外键关联表"
        />
      </el-form-item>

      <el-form-item label="外键关联列" :prop="C_Fields.fkColumnId">
        <el-input
          v-model="renderData.data.fkColumnId"
          placeholder="请输入外键关联列"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="索引" :prop="C_Fields.index">
        <el-switch
          v-model="renderData.data.index"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="索引名称" :prop="C_Fields.indexName">
        <el-input
          v-model="renderData.data.indexName"
          placeholder="请输入索引名称"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="索引降序" :prop="C_Fields.indexDesc">
        <el-switch
          v-model="renderData.data.indexDesc"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="唯一键" :prop="C_Fields.unique">
        <el-switch
          v-model="renderData.data.unique"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="唯一键名称" :prop="C_Fields.uniqueName">
        <el-input
          v-model="renderData.data.uniqueName"
          placeholder="请输入唯一键名称"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="唯一键降序" :prop="C_Fields.uniqueDesc">
        <el-switch
          v-model="renderData.data.uniqueDesc"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="列排序值" :prop="C_Fields.columnSort">
        <el-input
          v-model="renderData.data.columnSort"
          placeholder="请输入列排序值"
          clearable
        />
      </el-form-item>

      <el-form-item label="数据库数据类型" :prop="C_Fields.dbType">
        <el-input
          v-model="renderData.data.dbType"
          placeholder="请输入数据库数据类型"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="最大长度" :prop="C_Fields.maxLength">
        <el-input
          v-model="renderData.data.maxLength"
          placeholder="请输入最大长度"
          clearable
        />
      </el-form-item>

      <el-form-item label="精度" :prop="C_Fields.precision">
        <el-input
          v-model="renderData.data.precision"
          placeholder="请输入精度"
          clearable
        />
      </el-form-item>

      <el-form-item label="标度" :prop="C_Fields.scale">
        <el-input
          v-model="renderData.data.scale"
          placeholder="请输入标度"
          clearable
        />
      </el-form-item>

      <el-divider />

      <span class="group-title">java拓展信息</span>

      <el-form-item label="java字段名" :prop="C_Fields.javaField">
        <el-input
          v-model="renderData.data.javaField"
          placeholder="请输入java字段名"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="java基本类型" :prop="C_Fields.javaType">
        <el-input
          v-model="renderData.data.javaType"
          placeholder="请输入java基本类型"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item label="java包装类型" :prop="C_Fields.javaPackageType">
        <el-input
          v-model="renderData.data.javaPackageType"
          placeholder="请输入java包装类型"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-form-item
        label="java基本类型强制转换语句"
        :prop="C_Fields.javaTypeConvert"
      >
        <el-input
          v-model="renderData.data.javaTypeConvert"
          placeholder="请输入java基本类型强制转换语句"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
        />
      </el-form-item>

      <el-form-item
        label="java包装类型强制转换语句"
        :prop="C_Fields.javaPackageTypeConvert"
      >
        <el-input
          v-model="renderData.data.javaPackageTypeConvert"
          placeholder="请输入java包装类型强制转换语句"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
        />
      </el-form-item>

      <el-form-item label="java反序列化语句" :prop="C_Fields.javaParse">
        <el-input
          v-model="renderData.data.javaParse"
          placeholder="请输入java反序列化语句"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
        />
      </el-form-item>

      <el-form-item label="java序列化语句" :prop="C_Fields.javaStringify">
        <el-input
          v-model="renderData.data.javaStringify"
          placeholder="请输入java序列化语句"
          type="textarea"
          :autosize="{ minRows: 2 }"
          clearable
        />
      </el-form-item>

      <el-divider />

      <span class="group-title">TS拓展信息</span>

      <el-form-item label="typescript类型" :prop="C_Fields.tsType">
        <el-input
          v-model="renderData.data.tsType"
          placeholder="请输入typescript类型"
          type="textarea"
          clearable
        />
      </el-form-item>

      <el-divider />

      <span class="group-title">业务拓展信息</span>

      <el-form-item label="必填字段" :prop="C_Fields.required">
        <el-switch
          v-model="renderData.data.required"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="搜索字段" :prop="C_Fields.query">
        <el-switch
          v-model="renderData.data.query"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="搜索字段比较类型" :prop="C_Fields.queryCompare">
        <el-input
          v-model="renderData.data.queryCompare"
          placeholder="请输入搜索字段比较类型"
          clearable
        />
      </el-form-item>

      <el-form-item label="数据分隔" :prop="C_Fields.split">
        <el-switch
          v-model="renderData.data.split"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="数据分隔符号" :prop="C_Fields.splitChar">
        <el-input
          v-model="renderData.data.splitChar"
          placeholder="请输入数据分隔符号"
          clearable
        />
      </el-form-item>

      <el-form-item label="列表功能" :prop="C_Fields.list">
        <el-switch
          v-model="renderData.data.list"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="详情功能" :prop="C_Fields.detail">
        <el-switch
          v-model="renderData.data.detail"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="新增功能" :prop="C_Fields.create">
        <el-switch
          v-model="renderData.data.create"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="编辑功能" :prop="C_Fields.edit">
        <el-switch
          v-model="renderData.data.edit"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="启用/禁用功能" :prop="C_Fields.enable">
        <el-switch
          v-model="renderData.data.enable"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="锁定/解锁功能" :prop="C_Fields.lock">
        <el-switch
          v-model="renderData.data.lock"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="树状结构级别列" :prop="C_Fields.treeLevel">
        <el-switch
          v-model="renderData.data.treeLevel"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="树状结构父id列" :prop="C_Fields.treeParentId">
        <el-switch
          v-model="renderData.data.treeParentId"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="树状结构根id列" :prop="C_Fields.treeRootId">
        <el-switch
          v-model="renderData.data.treeRootId"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="导入功能" :prop="C_Fields.import_">
        <el-switch
          v-model="renderData.data.import"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="导出功能" :prop="C_Fields.export">
        <el-switch
          v-model="renderData.data.export"
          active-text="是"
          inactive-text="否"
          inline-prompt
        />
      </el-form-item>

      <el-form-item label="其它标签" :prop="C_Fields.tags">
        <simple-tag-list
          v-model="renderData.data.tagList"
          name="标签"
          :type="DataType.字符串"
        >
        </simple-tag-list>
      </el-form-item>

      <el-divider />

      <span class="group-title">其他信息</span>

      <el-form-item label="其它选项" :prop="C_Fields.options">
        <simple-tag-list
          v-model="renderData.data.optionList"
          name="选项"
          :type="DataType.字符串"
        >
        </simple-tag-list>
      </el-form-item>

      <el-form-item label="备注" :prop="C_Fields.remark">
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
  import { Create } from '@/api/dto/cagc/column/Create';
  import { C_Fields } from '@/api/dto/cagc/column/C_Fields';
  import TableService from '@/api/service/cagc/TableService';
  import ColumnService from '@/api/service/cagc/ColumnService';
  import ConstEnumService from '@/api/service/cagc/ConstEnumService';
  import type { FormInstance } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { ElMessage } from 'element-plus';
  import SimpleSkeleton from '@/components/SimpleSkeleton/index.vue';
  import SimpleTagList from '@/components/SimpleTagList/index.vue';
  import SimpleSelect from '@/components/SimpleSelect/index.vue';
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
    data: new Create(),
    /**
     * 表单验证规则
     */
    rules: {
      tableId: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      cEId: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      name: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      title: [
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
      pk: [
        {
          required: true,
          message: '请输入主键',
          trigger: 'blur',
        },
      ],
      fk: [
        {
          required: true,
          message: '请输入外键',
          trigger: 'blur',
        },
      ],
      fkName: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      fkTableId: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      fkColumnId: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      index: [
        {
          required: true,
          message: '请输入索引',
          trigger: 'blur',
        },
      ],
      indexName: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      indexDesc: [
        {
          required: true,
          message: '请输入索引降序',
          trigger: 'blur',
        },
      ],
      unique: [
        {
          required: true,
          message: '请输入唯一键',
          trigger: 'blur',
        },
      ],
      uniqueName: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      uniqueDesc: [
        {
          required: true,
          message: '请输入唯一键降序',
          trigger: 'blur',
        },
      ],
      columnSort: [
        {
          required: true,
          message: '请输入列排序值',
          trigger: 'blur',
        },
      ],
      dbType: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      maxLength: [
        {
          required: true,
          message: '请输入最大长度',
          trigger: 'blur',
        },
      ],
      precision: [
        {
          required: true,
          message: '请输入精度',
          trigger: 'blur',
        },
      ],
      scale: [
        {
          required: true,
          message: '请输入标度',
          trigger: 'blur',
        },
      ],
      javaField: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      javaType: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      javaPackageType: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      javaTypeConvert: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      javaPackageTypeConvert: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      javaParse: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      javaStringify: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      required: [
        {
          required: true,
          message: '请输入必填字段',
          trigger: 'blur',
        },
      ],
      query: [
        {
          required: true,
          message: '请输入搜索字段',
          trigger: 'blur',
        },
      ],
      queryCompare: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      split: [
        {
          required: true,
          message: '请输入数据分隔',
          trigger: 'blur',
        },
      ],
      splitChar: [
        {
          max: 32767,
          message: '长度不可超过32767',
          trigger: 'blur',
        },
      ],
      list: [
        {
          required: true,
          message: '请输入列表功能',
          trigger: 'blur',
        },
      ],
      detail: [
        {
          required: true,
          message: '请输入详情功能',
          trigger: 'blur',
        },
      ],
      create: [
        {
          required: true,
          message: '请输入新增功能',
          trigger: 'blur',
        },
      ],
      edit: [
        {
          required: true,
          message: '请输入编辑功能',
          trigger: 'blur',
        },
      ],
      enable: [
        {
          required: true,
          message: '请输入启用/禁用功能',
          trigger: 'blur',
        },
      ],
      lock: [
        {
          required: true,
          message: '请输入锁定/解锁功能',
          trigger: 'blur',
        },
      ],
      treeLevel: [
        {
          required: true,
          message: '请输入树状结构级别列',
          trigger: 'blur',
        },
      ],
      treeParentId: [
        {
          required: true,
          message: '请输入树状结构父id列',
          trigger: 'blur',
        },
      ],
      treeRootId: [
        {
          required: true,
          message: '请输入树状结构根id列',
          trigger: 'blur',
        },
      ],
      import: [
        {
          required: true,
          message: '请输入导入功能',
          trigger: 'blur',
        },
      ],
      export: [
        {
          required: true,
          message: '请输入导出功能',
          trigger: 'blur',
        },
      ],
      tsType: [
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
       * 初始化数据
       */
      data?: Create;
    }>(),
    {
      data: () => new Create(),
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
    (e: 'submitted', data: Create): void;

    /**
     * 关闭窗口
     *
     * @param e
     * @param data 数据
     */
    (e: 'close', data: Create): void;
  }>();

  /**
   * 更新其他标签集合
   *
   * @param list 数据集合
   */
  const updateTagList = (list: unknown[]) => {
    renderData.data.tagList = list as string[];
  };

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
    try {
      await formRef.value?.validate();
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
      const msg: string = await ColumnService.create(renderData.data);
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
    //复写数据
    if (props.data) Object.assign(renderData.data, props.data);
    renderData.loading = false;
  })();
</script>

<style scoped>
  .form-container {
    max-height: 500px;
    padding: 10px;
    overflow: auto;
  }

  .group-title {
    margin-bottom: 20px;
    display: inline-flex;
    color: #909399;
    font-size: var(--el-dialog-content-font-size);
    word-break: break-all;
  }
</style>
