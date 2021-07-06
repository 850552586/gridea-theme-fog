const generateOverride = (params = {}) => {
  let result = ''

    // 无图标题 - titleWithoutImgColor
  if (params.titleWithoutImgColor && params.titleWithoutImgColor !== 'white') {
    result += `
      .posttitlewithoutimg {
        color: ${params.titleWithoutImgColor};
      }
    `
  }

  //网站标题颜色
  if (params.sitenameColor && params.sitenameColor !== 'antiquewhite') {
    result += `
      .sitename {
        color: ${params.sitenameColor};
      }
    `
  }

  
    //网站描述颜色
    if (params.sitedescribtionColor && params.sitedescribtionColor !== 'white') {
      result += `
        .describtion {
          color: ${params.sitedescribtionColor};
        }
      `
    }

    
    //网站菜单按钮颜色
    if (params.sitemenuColor && params.sitemenuColor !== 'antiquewhite') {
      result += `
        .menubutton {
          color: ${params.sitemenuColor};
        }

        .menucontainer span::before,
        .menucontainer span::after {
          color:${params.sitemenuColor};
          content: attr(data-text);
          position: absolute;
          top: -0.5em;
          left: 0;
          width: 100%;
          transition: 0.3s ease-out;
        }

        .menubutton:visited{
          color: ${params.sitemenuColor};
        }
      `
    }

    // 有图标题 - titleWithImgColor
    if (params.titleWithImgColor && params.titleWithImgColor !== 'white') {
      result += `
        .posttitle {
          color: ${params.titleWithImgColor};
        }
      `
    }
    //底部信息颜色
    if (params.footinfoColor && params.footinfoColor !== 'white') {
      result += `
        #sitegotimeDate,#sitegotimes,#footinfo,#footinfo a{
          color: ${params.footinfoColor};
        }
      `
    }
  
    //移动端网站描述颜色
    if (params.appinfoColor && params.appinfoColor !== 'white') {
      result += `
        .mobiledescribtion{
          color: ${params.footinfoColor};
        }
      `
    }

    //顶部菜单栏颜色
    if (params.topmenuColor && params.topmenuColor !== 'black') {
      result += `
        .navbar-inverse{
          background-color: ${params.topmenuColor};
        }
      `
    }

    //站点名称字体
    if (params.sitenameFont && params.sitenameFont !== 'Arial') {
      result += `
        .sitename{
          font-family: ${params.sitenameFont};
        }
      `
    }

    //站点介绍字体
    if (params.sitedescFont && params.sitedescFont !== 'Arial') {
      result += `
        .description{
          font-family: ${params.sitedescFont};
        }
      `
    }

   //站点文章信息字体
    if (params.siteinfoFont && params.siteinfoFont !== 'Arial') {
      result += `
        .siteinfo{
          font-family: ${params.sitedescFont};
        }
      `
    }

    //菜单栏字体
    if (params.sitemenuFont && params.sitemenuFont !== 'kaiti') {
      result += `
        .menubutton{
          font-family: ${params.sitemenuFont};
        }
      `
    }

  if (params.customCss) {
    result += `
      ${params.customCss}
    `
  }

  return result
}

module.exports = generateOverride
