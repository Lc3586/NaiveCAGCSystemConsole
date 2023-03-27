<!--

/**\_________________________________________________________________________________________________
|*												说明											                                               ___≣|
|* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|*    此代码由VM模板自动生成		  															                                    |
|*		版本:v0.0.0.1                                                                              |___
|*		日期:2022-07-04 12:56:56                                                                      ≣|
|*																	                              create by    LCTR                ≣|
|*																	                              generate by  admin               ≣|
|* ________________________________________________________________________________________________≣|
\*/


数据库列详情页

author admin
date 2022-07-04

-->
<template>
  <simple-skeleton :loading="renderData.loading" />

  <el-form v-if="!renderData.loading">
    <span class="group-title">基础信息</span>

    <el-form-item label="所属表：" :prop="C_Fields.tableName">
      {{ renderData.data.tableName }}
    </el-form-item>

    <el-form-item label="关联常量/枚举：" :prop="C_Fields.cEId">
      {{ renderData.data.cEId }}
    </el-form-item>

    <el-form-item label="标题/名称：" :prop="C_Fields.title">
      {{ renderData.data.title }}
    </el-form-item>

    <el-form-item label="描述：" :prop="C_Fields.description">
      {{ renderData.data.description }}
    </el-form-item>

    <el-divider />

    <span class="group-title">数据库属性</span>

    <el-form-item label="列名：" :prop="C_Fields.name">
      {{ renderData.data.name }}
    </el-form-item>

    <el-form-item label="主键：" :prop="C_Fields.pk">
      {{ renderData.data.pk ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="外键：" :prop="C_Fields.fk">
      {{ renderData.data.fk ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="外键名称：" :prop="C_Fields.fkName">
      {{ renderData.data.fkName }}
    </el-form-item>

    <el-form-item label="外键关联表：" :prop="C_Fields.fkTableId">
      {{ renderData.data.fkTableId }}
    </el-form-item>

    <el-form-item label="外键关联列：" :prop="C_Fields.fkColumnId">
      {{ renderData.data.fkColumnId }}
    </el-form-item>

    <el-form-item label="索引：" :prop="C_Fields.index">
      {{ renderData.data.index ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="索引名称：" :prop="C_Fields.indexName">
      {{ renderData.data.indexName }}
    </el-form-item>

    <el-form-item label="索引降序：" :prop="C_Fields.indexDesc">
      {{ renderData.data.indexDesc ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="唯一键：" :prop="C_Fields.unique">
      {{ renderData.data.unique ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="唯一键名称：" :prop="C_Fields.uniqueName">
      {{ renderData.data.uniqueName }}
    </el-form-item>

    <el-form-item label="唯一键降序：" :prop="C_Fields.uniqueDesc">
      {{ renderData.data.uniqueDesc ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="列排序值：" :prop="C_Fields.columnSort">
      {{ renderData.data.columnSort }}
    </el-form-item>

    <el-form-item label="数据库数据类型：" :prop="C_Fields.dbType">
      {{ renderData.data.dbType }}
    </el-form-item>

    <el-form-item label="最大长度：" :prop="C_Fields.maxLength">
      {{ renderData.data.maxLength }}
    </el-form-item>

    <el-form-item label="精度：" :prop="C_Fields.precision">
      {{ renderData.data.precision }}
    </el-form-item>

    <el-form-item label="标度：" :prop="C_Fields.scale">
      {{ renderData.data.scale }}
    </el-form-item>

    <el-divider />

    <span class="group-title">java拓展信息</span>

    <el-form-item label="java字段名：" :prop="C_Fields.javaField">
      {{ renderData.data.javaField }}
    </el-form-item>

    <el-form-item label="java基本类型：" :prop="C_Fields.javaType">
      {{ renderData.data.javaType }}
    </el-form-item>

    <el-form-item label="java包装类型：" :prop="C_Fields.javaPackageType">
      {{ renderData.data.javaPackageType }}
    </el-form-item>

    <el-form-item
      label="java基本类型强制转换语句："
      :prop="C_Fields.javaTypeConvert"
    >
      {{ renderData.data.javaTypeConvert }}
    </el-form-item>

    <el-form-item
      label="java包装类型强制转换语句："
      :prop="C_Fields.javaPackageTypeConvert"
    >
      {{ renderData.data.javaPackageTypeConvert }}
    </el-form-item>

    <el-form-item label="java反序列化语句：" :prop="C_Fields.javaParse">
      {{ renderData.data.javaParse }}
    </el-form-item>

    <el-form-item label="java序列化语句：" :prop="C_Fields.javaStringify">
      {{ renderData.data.javaStringify }}
    </el-form-item>

    <el-divider />

    <span class="group-title">TS拓展信息</span>

    <el-form-item label="typescript类型：" :prop="C_Fields.tsType">
      {{ renderData.data.tsType }}
    </el-form-item>

    <el-divider />

    <span class="group-title">业务拓展信息</span>

    <el-form-item label="必填字段：" :prop="C_Fields.required">
      {{ renderData.data.required ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="搜索字段：" :prop="C_Fields.query">
      {{ renderData.data.query ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="搜索字段比较类型：" :prop="C_Fields.queryCompare">
      {{ renderData.data.queryCompare }}
    </el-form-item>

    <el-form-item label="数据分隔：" :prop="C_Fields.split">
      {{ renderData.data.split ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="数据分隔符号：" :prop="C_Fields.splitChar">
      {{ renderData.data.splitChar }}
    </el-form-item>

    <el-form-item label="列表功能：" :prop="C_Fields.list">
      {{ renderData.data.list ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="详情功能：" :prop="C_Fields.detail">
      {{ renderData.data.detail ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="新增功能：" :prop="C_Fields.create">
      {{ renderData.data.create ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="编辑功能：" :prop="C_Fields.edit">
      {{ renderData.data.edit ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="启用/禁用功能：" :prop="C_Fields.enable">
      {{ renderData.data.enable ? '启用' : '禁用' }}
    </el-form-item>

    <el-form-item label="锁定/解锁功能：" :prop="C_Fields.lock">
      {{ renderData.data.lock ? '锁定' : '解锁' }}
    </el-form-item>

    <el-form-item label="排序功能：" :prop="C_Fields.sort">
      {{ renderData.data.sort ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="树状结构级别列：" :prop="C_Fields.treeLevel">
      {{ renderData.data.treeLevel ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="树状结构父id列：" :prop="C_Fields.treeParentId">
      {{ renderData.data.treeParentId ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="树状结构根id列：" :prop="C_Fields.treeRootId">
      {{ renderData.data.treeRootId ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="导入功能：" :prop="C_Fields.import_">
      {{ renderData.data.import ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="导出功能：" :prop="C_Fields.export">
      {{ renderData.data.export ? '是' : '否' }}
    </el-form-item>

    <el-form-item label="其它标签：" :prop="C_Fields.tags">
      <tag-list
        name="标签"
        :list="renderData.data.tagList"
        :type="DataType.字符串"
        :readonly="true"
      >
      </tag-list>
    </el-form-item>

    <el-divider />

    <span class="group-title">其他信息</span>

    <el-form-item label="其它选项：" :prop="C_Fields.options">
      <tag-list
        name="选项"
        :list="renderData.data.optionList"
        :type="DataType.字符串"
        :readonly="true"
      >
      </tag-list>
    </el-form-item>

    <el-form-item label="备注：" :prop="C_Fields.remark">
      {{ renderData.data.remark }}
    </el-form-item>

    <el-form-item label="创建者：" :prop="C_Fields.createBy">
      {{ renderData.data.createBy }}
    </el-form-item>

    <el-form-item label="创建时间：" :prop="C_Fields.createTime">
      {{ renderData.data.createTime }}
    </el-form-item>

    <el-form-item label="更新者：" :prop="C_Fields.updateBy">
      {{ renderData.data.updateBy }}
    </el-form-item>

    <el-form-item label="更新时间：" :prop="C_Fields.updateTime">
      {{ renderData.data.updateTime }}
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { Detail } from '@/api/dto/cagc/column/Detail';
  import { C_Fields } from '@/api/dto/cagc/column/C_Fields';
  import ColumnService from '@/api/service/cagc/ColumnService';
  import { reactive } from 'vue';
  import { ElMessage } from 'element-plus';
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
      renderData.data = await ColumnService.detail(props.id);
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
  .group-title {
    margin-bottom: 20px;
    display: inline-flex;
    color: #909399;
    font-size: var(--el-dialog-content-font-size);
    word-break: break-all;
  }
</style>
