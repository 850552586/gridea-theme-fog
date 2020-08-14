/**
 * @description: 通过meta标签的name获取meta标签的内容
 * @param {string} name meta标签的名字
 * @return {string}: meta标签的内容
 */
export declare function getMetaContentByName(name: string): string;
/**
 * @description: 获取html文档里面的第一张图片
 * @return: html文档里面的第一张图片的地址
 */
export declare function getFirstImage(): string;
/**
 * @description: 通过class获取元素的自定义属性对象
 * @param {string}} cls 元素的class（.class）
 * @return {object}: 元素的data-属性
 */
export declare function getDataSet(cls: string): object;
