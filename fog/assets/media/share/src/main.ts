/// <reference path="../types/node_modules/qrcodejs/qrcodejs.d.ts" />
import defaults from './data/options';
import urls from './data/urls';
import { getDataSet } from './utils';
import './style/index.less';
// import QRCode from 'qrcodejs2';
import './utils/qrcode';
import './utils/iconfont';

interface Config {
    url: string,
    origin: string,
    source: string,
    summary: string,
    title: string,
    description: string,
    image: string,
    imageSelector: string,
    weiboKey: string,
    wechatQrcodeTitle: string,
    wechatQrcodeHelper: string,
    wechatQrcodeSize: number,
    wechatQrcodePosition: string,
    mobileSites: Array<string>,
    sites: Array<string>,
    disabled: Array<string>,
    initialized: boolean,
    mode: string
}

class Share {

    el: HTMLElement;
    config: Config;
    isWx: boolean = /MicroMessenger/i.test(navigator.userAgent);
    isMobile: boolean = document.documentElement.clientWidth <= 768;

    constructor(el:string = '.custom-share', config:object = {}) {
        // 由于不想config的属性有多种类型，所以先不支持元素属性
        // const dataConfig = getDataSet(el);
        this.el = this.getRoot(el);
        this.config = {...defaults, ...config};
        this.createIcons();
        this.createWechat();
    };
    getRoot(el: string): HTMLElement {
        if(!document.querySelector(el)) {
            throw '第一个参数应该是元素的类名，例如".custom-share"'
        }
        const ele: HTMLElement = document.querySelector(el) || document.createElement('div');
        return ele;
    }
    createIcons(): void {
        this.handleSites();
        const isPrepend: boolean = this.config.mode == 'prepend';
        isPrepend && this.config.sites.reverse();
        this.config.sites.forEach((name: string, index: number) => {
            const url: string = this.makeUrl(name);
            if (!this.config.initialized) {
                const link: HTMLAnchorElement = this.createLink(name, url);
                isPrepend ? this.el.insertBefore(link, this.el.firstChild) : this.el.appendChild(link);
            } else {
                this.handleLink(name, url);
            }
        })
    };
    createWechat() {
        const wechat = document.querySelector<HTMLAnchorElement>('.wechat');
        if(wechat) {
            const div: HTMLDivElement = document.createElement('div');
            div.className = "wechat-qrcode " + this.config.wechatQrcodePosition;
            div.innerHTML = `<h4>${this.config.wechatQrcodeTitle}</h4>
                            <div class="qrcode"></div>
                            <div class="help">${this.config.wechatQrcodeHelper}</div>`;
            const qrcode = div.querySelector('.qrcode');
            new QRCode(qrcode, {text: this.config.url, width: this.config.wechatQrcodeSize, height: this.config.wechatQrcodeSize});
            wechat.appendChild(div);
        } else {
            return false;
        }
    };
    createLink(name: string, url: string): HTMLAnchorElement {
        const a: HTMLAnchorElement = document.createElement('a');
        a.className = `share-item ${name}`;
        a.href = url;
        if(name == 'wechat') {
            a.tabIndex = -1;
        } else {
            a.target = "_blank";
        }
        a.innerHTML = `<svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon${name}"></use>
                        </svg>`;
        return a;
    };
    handleLink(name: string, url: string) {
        const item = document.querySelector<HTMLAnchorElement>(`.${name}`);
        if(item) {
            item.href = url;
        } else {
            throw  `没有找到类名为.${name}的元素`;
        }

    };
    handleSites(): void {
        let config: Config = this.config;

        if(config.mobileSites.length == 0) {
            config.mobileSites = config.sites;
        }

        // 如果当前环境是微信浏览器，则禁用微信分享
        if (this.isWx) {
            config.disabled.push('wechat');
        };

        // 删除sites中被disabled包含的部分
        if(config.disabled.length > 0) {
            config.disabled.forEach((e, i) => {
                const pcSiteshasIndex: number = config.sites.indexOf(e);
                const mbSiteshasIndex: number = config.mobileSites.indexOf(e);
                pcSiteshasIndex > -1 && config.sites.splice(pcSiteshasIndex, 1);
                mbSiteshasIndex > -1 && config.mobileSites.splice(mbSiteshasIndex, 1);
            })
        };
    }
    makeUrl(name: string): string {
        if (!this.config.summary){
            this.config.summary = this.config.description;
        }
        return urls[name].replace(/\{\{(\w)(\w*)\}\}/g, (m: string, fix: string, key: string) => {
            var nameKey = name + fix + key.toLowerCase();
            key = (fix + key).toLowerCase();

            return encodeURIComponent((this.config[nameKey] === undefined ? this.config[key] : this.config[nameKey]) || '');
        });
    }
};

export default Share;
