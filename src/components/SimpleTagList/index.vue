<!--
简单标签集组件

通过标签的展示形式来维护数组数据
使用示例：
  <template>
    <simple-tag-list v-model="optionList"
              name="选项"
              :type="DataType.字符串">
    </simple-tag-list>
  </template>

  <script lang="ts" setup>
  import {reactive} from "vue";
  import SimpleTagList from '@/components/SimpleTagList/index.vue';

  const loading = reactive(['值一', '值二', '值三']);
  </script>

@author LCTR
@date 2022-07-25
-->

<template>
  <el-tag
    v-for="(item, index) in renderData.list"
    :key="index"
    type="info"
    size="small"
    :closable="!props.readonly"
    :disable-transitions="false"
    :title="item"
    @close="remove(index)"
    effect="plain"
  >
    {{ getText(item) }}
  </el-tag>

  <div v-show="renderData.input.visible">
    <!-- 文本输入框 -->
    <div
      v-if="props.type === DataType.字符串"
      :title="'按下回车键确认添加此' + props.name"
    >
      <el-input
        v-model="renderData.input.value"
        :placeholder="'请输入' + props.name"
        @keyup.enter="confirm"
        :title="'按下回车键确认添加此' + props.name"
        :ref="setInputRef"
        clearable
      />
    </div>

    <!-- 数值输入框 -->
    <div
      v-if="props.type === DataType.数值"
      :title="'按下回车键确认添加此' + props.name"
    >
      <el-input-number
        v-model="renderData.input.value"
        :precision="props.precision"
        controls-position="right"
        :ref="setInputRef"
      >
      </el-input-number>
    </div>

    <!-- 时间选择器 -->
    <div
      v-if="props.type === DataType.时间 || props.type === DataType.时间范围"
    >
      <el-time-picker
        :v-model="renderData.input.value"
        :is-range="props.type === DataType.时间范围"
        range-separator="至"
        :start-placeholder="'开始' + props.name"
        :end-placeholder="'结束' + props.name"
        :placeholder="'选择' + props.name"
        :format="props.format"
        size="small"
        :shortcuts="renderData.shortcuts"
        @change="confirm"
        :ref="setInputRef"
      >
      </el-time-picker>
    </div>

    <!-- 日期选择器 -->
    <div
      v-if="props.type === DataType.日期 || props.type === DataType.日期范围"
    >
      <el-date-picker
        v-model="renderData.input.value"
        :type="props.type === DataType.日期 ? 'date' : 'daterange'"
        unlink-panels
        range-separator="至"
        :start-placeholder="'开始' + props.name"
        :end-placeholder="'结束' + props.name"
        :placeholder="'选择' + props.name"
        :format="props.format"
        size="small"
        :shortcuts="renderData.shortcuts"
        @change="confirm"
        :ref="setInputRef"
      >
      </el-date-picker>
    </div>

    <!-- 日期时间选择器 -->
    <div
      v-if="
        props.type === DataType.日期时间 || props.type === DataType.日期时间范围
      "
    >
      <el-date-picker
        v-model="renderData.input.value"
        :type="props.type === DataType.日期时间 ? 'datetime' : 'datetimerange'"
        unlink-panels
        range-separator="至"
        :start-placeholder="'开始' + props.name"
        :end-placeholder="'结束' + props.name"
        :placeholder="'选择' + props.name"
        :format="props.format"
        size="small"
        :shortcuts="renderData.shortcuts"
        @change="confirm"
        :ref="setInputRef"
      >
      </el-date-picker>
    </div>
  </div>

  <el-button
    v-show="!renderData.input.visible && !props.readonly"
    @click="show"
    type="primary"
    link
    size="small"
  >
    + 添加新{{ props.name }}
  </el-button>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import Shortcuts from '@/api/utils/shortcuts/Shortcuts';
  import { dayjs } from 'element-plus';
  import { DataType } from '@/components/SimpleTagList/Model/DataType';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 数据集合
     */
    list: [] as unknown[],
    /**
     * 输入框信息
     */
    input: {
      /**
       * 显示状态
       */
      visible: false,
      /**
       * 值
       */
      value: null as any,
    },
    /**
     * 快速选择数据
     */
    shortcuts: null as any,
  });

  // 组件属性
  const props = withDefaults(
    defineProps<{
      /**
       * 数据集合
       */
      modelValue: unknown[];
      /**
       * 加载数据集合的方法
       *
       * <p>当不需要双向绑定数据时使用此属性</p>
       */
      loadList?: () => string[];
      /**
       * 加载数据集合的异步方法
       *
       * <p>当不需要双向绑定数据且需要异步加载时使用此属性</p>
       */
      loadListAsync?: () => Promise<string[]>;
      /**
       * 名称
       *
       * @默认值 内容
       */
      name?: string;
      /**
       * 数据类型
       *
       * @默认值 DataType.字符串
       */
      type?: DataType;
      /**
       * 格式化
       *
       * @默认值 YYYY-MM-DD
       */
      format?: string;
      /**
       * 精度
       *
       * @默认值 0
       */
      precision?: number;
      /**
       * 只读
       * <p>没有操作按钮，只能查看不能修改</p>
       */
      readonly?: boolean;
    }>(),
    {
      title: '内容',
      modelValue: () => [],
      loadList: undefined,
      loadListAsync: undefined,
      type: DataType.字符串,
      format: 'YYYY-MM-DD',
      precision: 0,
      readonly: false,
    }
  );

  /**
   * 获取显示文本
   *
   * @param value 值
   */
  const getText = (value: unknown): string => {
    switch (props.type) {
      case DataType.字符串:
        return value as string;
      case DataType.数值:
        return (value as number).toString();
      case DataType.时间:
      case DataType.日期:
      case DataType.日期时间:
        return dayjs(value as Date).format(props.format);
      case DataType.时间范围:
      case DataType.日期范围:
      case DataType.日期时间范围: {
        const dataRange = value as Date[];
        return `${dayjs(dataRange[0]).format(props.format)} 至 ${dayjs(
          dataRange[1]
        ).format(props.format)}`;
      }
    }
  };

  // 数据输入组件引用对象
  let inputRef: HTMLElement;

  /**
   * 设置数据输入组件引用对象
   *
   * @param el 引用对象
   */
  const setInputRef = (el?: Element | ComponentPublicInstance | null) => {
    if (el) inputRef = el as HTMLElement;
  };

  /**
   * 显示新增输入框
   */
  const show = () => {
    renderData.input.visible = true;
    switch (props.type) {
      default:
      case DataType.字符串:
      case DataType.数值:
        // 输入框获取焦点
        inputRef.focus();
        break;
      case DataType.时间:
      case DataType.时间范围:
        // 时间选择输入框获取焦点
        inputRef.focus();
        break;
      case DataType.日期:
      case DataType.日期范围:
        // 日期选择输入框获取焦点
        inputRef.focus();
        break;
      case DataType.日期时间:
      case DataType.日期时间范围:
        // 日期时间选择输入框获取焦点
        inputRef.focus();
        break;
    }
  };

  /**
   * 确认新增
   */
  const confirm = () => {
    if (renderData.input.value) {
      renderData.list.push(renderData.input.value);

      // 通知数据已变更
      emit('update:modelValue', renderData.list);
    }

    renderData.input.visible = false;
    renderData.input.value = null;
  };

  /**
   * 移除
   *
   * @param index 索引
   */
  const remove = (index: number) => {
    renderData.list.splice(index, 1);

    // 通知数据已变更
    emit('update:modelValue', renderData.list);
  };

  // 组件自定义事件
  const emit = defineEmits<{
    /**
     * 数据变更结果
     *
     * @param e
     * @param list 数据集合
     */
    (e: 'update:modelValue', list: unknown[]): void;
  }>();

  (async () => {
    //写入数据
    if (props.loadListAsync) renderData.list = await props.loadListAsync();
    else if (props.loadList) renderData.list = props.loadList();
    else renderData.list = props.modelValue;

    switch (props.type) {
      case DataType.时间:
        break;
      case DataType.时间范围:
        break;
      case DataType.日期:
        renderData.shortcuts = Shortcuts.data;
        break;
      case DataType.日期范围:
        renderData.shortcuts = Shortcuts.dateRang;
        break;
      case DataType.日期时间:
        break;
      case DataType.日期时间范围:
        break;
    }
  })();
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 7px;
  }
</style>
