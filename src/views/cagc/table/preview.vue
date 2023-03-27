<template>
  <simple-skeleton
    :loading="renderData.loading"
    :lattice="renderData.lattice"
  />

  <div v-if="!renderData.loading" class="form-container pretty-scrollbar">
    <el-tabs
      v-model="renderData.currentName"
      tab-position="left"
      @tab-change="handleNameTabChange"
    >
      <el-tab-pane
        v-for="(entrys, name) in renderData.codes"
        :key="name"
        :label="name"
        :name="name"
      >
        <el-tabs type="border-card" v-model="renderData.currentEntry">
          <el-tab-pane
            v-for="entry in Object.keys(entrys)"
            :key="entry"
            :label="entry"
            :name="entry"
          >
            <div v-if="entry" class="tab-container">
              <div class="monaco-container">
                <div
                  v-if="
                    renderData.currentName === name &&
                    renderData.currentEntry === entry
                  "
                  :ref="setRef"
                  class="monaco-editor"
                >
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>

  <div class="dialog-footer">
    <el-button @click="emit('close')">关闭</el-button>
    <el-button
      v-if="!renderData.loading"
      type="primary"
      @click="emit('download')"
      >生成
    </el-button>
  </div>
</template>

<script lang="ts" setup>
  import CagcService from '@/api/service/cagc/CagcService';
  import { reactive } from 'vue';
  import { ElMessage, TabPaneName } from 'element-plus';
  import SimpleSkeleton from '@/components/SimpleSkeleton/index.vue';
  import CellConfig from '@/components/SimpleSkeleton/Model/CellConfig';
  import * as monaco from 'monaco-editor';
  import _ from 'lodash';
  import { GenerateType } from '@/api/dto/cagc/GenerateType';

  /**
   * 渲染数据
   */
  const renderData = reactive({
    /**
     * 加载状态
     */
    loading: true,
    /**
     * 当前左侧Tab值
     */
    currentName: '' as string,
    /**
     * 当前顶部Tab值
     */
    currentEntry: '' as string,
    /**
     * 骨架框点阵
     */
    lattice: [
      [new CellConfig(6)],
      [new CellConfig(6)],
      [new CellConfig(6)],
      [new CellConfig(6)],
      [new CellConfig(6)],
      [new CellConfig(6)],
    ],
    /**
     * 代码集合
     */
    codes: {} as Record<string, Record<string, string>>,
  });

  /**
   * 编辑器
   */
  let editor: monaco.editor.IStandaloneCodeEditor;

  /**
   * 编辑器容器对象
   */
  let editorRef: HTMLElement;

  /**
   * 组件属性
   */
  const props = withDefaults(
    defineProps<{
      /**
       * 数据表Id
       */
      tableId: string;
      /**
       * 包名
       */
      packageName: string;
      /**
       * 生成类型集合
       */
      generateTypes: GenerateType[];
    }>(),
    {
      tableId: '',
      packageName: '',
      generateTypes: () => [] as GenerateType[],
    }
  );

  /**
   * 组件自定义事件
   */
  const emit = defineEmits<{
    /**
     * 关闭窗口
     *
     * @param e
     */
    (e: 'close'): void;
    /**
     * 生成代码
     *
     * @param e
     */
    (e: 'download'): void;
  }>();

  /**
   * 一级标签页变更
   *
   * @param value 值
   */
  const handleNameTabChange = (value: TabPaneName) => {
    if (renderData.currentName)
      renderData.currentEntry = Object.keys(
        renderData.codes[renderData.currentName]
      )[0];
  };

  /**
   * 获取代码的语言
   *
   * @return 编程语言
   */
  const getLanguage = () => {
    if (!renderData.currentEntry) return undefined;

    //获取文件拓展名
    const extension = renderData.currentEntry.substring(
      renderData.currentEntry.lastIndexOf('.') + 1
    );

    switch (extension) {
      case 'java':
        return 'java';
      case 'sql':
        return 'sql';
      case 'vue':
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      case 'js':
        return 'javascript';
      case 'json':
        return 'json';
      case 'ts':
        return 'typescript';
      default:
        return undefined;
    }
  };

  /**
   * 获取代码
   *
   * @return 代码
   */
  const getCode = (): string => {
    if (!renderData.currentEntry) return '';

    return renderData.codes[renderData.currentName][renderData.currentEntry];
  };

  /**
   * 更新编辑器（科学防抖）
   */
  const debouncedUpdateEditor = _.debounce(() => {
    updateEditor(true);
  }, 100);

  /**
   *
   * 设置数据输入组件引用对象
   *
   * @param el 引用对象
   */
  const setRef = (el?: Element | ComponentPublicInstance | null) => {
    if (!el) return;
    editorRef = el as HTMLElement;
    debouncedUpdateEditor();
  };

  /**
   * 更新编辑器
   *
   * @param newer 重新创建
   */
  const updateEditor = (newer: boolean) => {
    if (newer) {
      if (editor) editor.dispose();
      if (editorRef)
        editor = monaco.editor.create(editorRef, {
          language: getLanguage(),
          value: getCode(),
          theme: 'vs-dark',
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: true, // 只读
          cursorStyle: 'line', // 光标样式
          automaticLayout: false, // 自动布局
          glyphMargin: true, // 字形边缘
          fontSize: 10, // 字体大小
        });
    } else {
      editor.setValue(getCode());
    }
  };

  /**
   * 初始化方法
   */
  (async () => {
    if (!props.tableId) {
      ElMessage({
        type: 'warning',
        message: '操作有误',
      });
      return;
    }

    //获取代码
    try {
      renderData.codes = await CagcService.previewCode(
        props.tableId,
        props.packageName,
        props.generateTypes
      );
      renderData.loading = false;
      renderData.currentName = Object.keys(renderData.codes)[0];
      if (renderData.currentName)
        renderData.currentEntry = Object.keys(
          renderData.codes[renderData.currentName]
        )[0];
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

  .monaco-container .monaco-editor {
    min-height: 550px;
    max-height: 600px;
    width: 100%;
  }
</style>
