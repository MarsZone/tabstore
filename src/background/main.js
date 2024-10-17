// background作为Chrome插件的后台，随着浏览器的启动而启动，可将全局性的、一直运行的功能放在此处
// 考虑到仅仅做一个demo，此处此处打印一串字作为测试，将以下内容复制到main.js中
console.log('this is background')
import hotReload from '@/utils/hotReload'
hotReload()
console.log('this is background')