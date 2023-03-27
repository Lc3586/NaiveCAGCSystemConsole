const { copyToVersionDir } = require('./vueModule');


const version = process.argv[2];

if (version == '2') {
  copyToVersionDir('vue2');
  console.log(`[cagc-console] 已切换至Vue 2.`);
} else if (version == '3') {
  copyToVersionDir('vue3');
  console.log(`[cagc-console] 已切换至Vue 3.`);
} else {
  console.error(
    `[cagc-console] 当前Vue版本"${version}", 应该是"2"或"3".`
  )
  process.exit(1);
}