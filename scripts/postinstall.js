const { copyToVersionDir, loadModule } = require('./vueModule');


const Vue = loadModule('vue');
console.info(
  `[cagc-console] 当前Vue版本v${Vue.version}.`
)

if (!Vue || typeof Vue.version !== 'string') {
  console.error(
    '[cagc-console] 未找到Vue. 请执行命令"npm install vue"安装Vue.'
  )
} else if (Vue.version.startsWith('2.')) {
  copyToVersionDir('vue2');
} else if (Vue.version.startsWith('3.')) {
  copyToVersionDir('vue3');
} else {
  console.error(
    `[cagc-console] 不支持v${Vue.version}版本的Vue.`
  )
}