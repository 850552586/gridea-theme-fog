/*
 * @Author: your name
 * @Date: 2019-12-20 14:54:13
 * @LastEditTime : 2019-12-20 17:14:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /share/src/data/options.ts
 */
import { getMetaContentByName, getFirstImage } from '../utils';

const url = location.href;
const origin = location.origin;
const site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
const title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
const description = getMetaContentByName('description') || getMetaContentByName('Description');
const image = getFirstImage();

export default {
    url,
    origin,
    source: site,
    summary: '',
    title,
    description,
    image,
    imageSelector: '',
    weiboKey: '',
    wechatQrcodeTitle: '微信扫一扫：分享',
    wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
    wechatQrcodePosition: 'top',
    wechatQrcodeSize: 100,
    sites: ['weibo', 'qq', 'wechat', 'douban', 'qzone', 'linkedin', 'facebook', 'twitter', 'google'],
    mobileSites: [],
    disabled: [],
    initialized: false,
    mode: ''
}