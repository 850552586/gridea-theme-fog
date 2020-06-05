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

  if (params.customCss) {
    result += `
      ${params.customCss}
    `
  }

  return result
}

module.exports = generateOverride
