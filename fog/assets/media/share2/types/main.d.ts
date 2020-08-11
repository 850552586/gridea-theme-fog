import './style/index.less';
import './utils/qrcode';
import './utils/iconfont';
interface Config {
    url: string;
    origin: string;
    source: string;
    summary: string;
    title: string;
    description: string;
    image: string;
    imageSelector: string;
    weiboKey: string;
    wechatQrcodeTitle: string;
    wechatQrcodeHelper: string;
    wechatQrcodeSize: number;
    wechatQrcodePosition: string;
    mobileSites: Array<string>;
    sites: Array<string>;
    disabled: Array<string>;
    initialized: boolean;
    mode: string;
}
declare class Share {
    el: HTMLElement;
    config: Config;
    isWx: boolean;
    isMobile: boolean;
    constructor(el?: string, config?: object);
    getRoot(el: string): HTMLElement;
    createIcons(): void;
    createWechat(): false | undefined;
    createLink(name: string, url: string): HTMLAnchorElement;
    handleLink(name: string, url: string): void;
    handleSites(): void;
    makeUrl(name: string): string;
}
export default Share;
