import Link from './krouter-link';
import View from './krouter-view';
let  Vue;//引用构造函数，VueRouter中要使用

//保存选项
class VueRouter{
    constructor(options){
        this.$options=options;
        this.routeMap={};
        //定义响应式属性current
        const initial=window.location.hash.slice(1) || '/';
        Vue.util.defineReactive(this,'current',initial);
        //监听hashchange事件
        window.addEventListener('hashchange',this.onHashChange.bind(this))
        window.addEventListener('load',this.onHashChange.bind(this));

        this.$options.routes.forEach(route => {
            this.routeMap[route.path]=route;
        });
    }
    onHashChange(){
        this.current=window.location.hash.slice(1)
    }
}
//插件：实现install方法，注册$router
VueRouter.install=function(_Vue){
     //引用构造函数，VueRouter 中要使用
    Vue =_Vue;
    //任务1:挂载$router,为什么要用混入方式(mixin)写?
    //主要原因是use代码在前，Router实例创建在后，而install逻辑又需要用 到该实例
    Vue.mixin({
        beforeCreate() {
            //只有根组件拥有router选项
            if(this.$options.router){
                Vue.prototype.$router=this.$options.router
            }
        },
    })
    //任务2:实现两个全局组件router-link和router-view
    Vue.component('router-link',Link);
    Vue.component('router-view',View);
};

export default VueRouter;

