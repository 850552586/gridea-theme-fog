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
        .description {
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

        .menutopbutton{
          color: ${params.sitemenuColor};
        }

        .menutopbutton:visited{
          color: ${params.sitemenuColor};
        }
      `
    }


    if (params.titleColor && params.titleColor !== 'white') {
      result += `
        .posttitle {
          color: ${params.titleColor};
        }
        .eleg-title{
          color: ${params.titleColor};
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


      result += `
        .navbar-inverse{
          background-color: rgba(143,168,171,0.8);
        }
      `
    

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

  if (params.menuposition == 'top'){
    result += `
    .navbar-inverse .navbar-nav>li>a{
      color: ${params.sitemenuColor};
    }
    ` 
  }

  if(params.socialchoice=='close'){
    result += `
    #socialMenu{
      display:none;
    }

    .topshare-button{
      display:none;
    }
    ` 
  }

  return result
}



module.exports = generateOverride
