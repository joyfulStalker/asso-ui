import lazyLoading from './lazyLoading.js'
export default ele =>{
        ele.component = lazyLoading(ele.component);
        ele.children.forEach(element => {
          this.initNode(element);
        });
     }
