/*
 * @Author: oliver
 * @Date: 2019-12-03 09:54:02
 * @LastEditTime : 2019-12-20 15:49:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share/src/utils/index.ts
 */
/**
 * @description: 通过meta标签的name获取meta标签的内容
 * @param {string} name meta标签的名字 
 * @return {string}: meta标签的内容
 */
export function getMetaContentByName(name: string):string {
    const ele = <HTMLMetaElement>document.getElementsByName(name)[0];
    return ele ? ele.content : '';
}

/**
 * @description: 获取html文档里面的第一张图片
 * @return: html文档里面的第一张图片的地址
 */
export function getFirstImage():string {
    const ele = <HTMLImageElement>document.images[0];
    return ele ? ele.src : '';
}

/**
 * @description: 通过class获取元素的自定义属性对象
 * @param {string}} cls 元素的class（.class）
 * @return {object}: 元素的data-属性
 */
export function getDataSet(cls:string):object {
    const ele = <HTMLElement>document.querySelector(cls);
    
	if(ele.dataset){
		return JSON.parse(JSON.stringify(ele.dataset));
	}else{
		const attrs:NamedNodeMap = ele.attributes;
        const len:number = attrs.length;
        let obj:any = {};
        
		for (let i = 0; i < len; i++) {
            const item = attrs[i];
			let key = item.name;
			if(key.indexOf("data-") > -1){
                key = key.replace(/^data-/i, '').replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
                obj[key] = item.value;
			}
		}
		return obj;
	}
}