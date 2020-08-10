process.env.NODE_ENV = 'development';

const path = require('path');
const configList = require('./rollup.config');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

configList.map((config, index) => {

  config.output.sourcemap = true;

  if( index === 0 ) {
    config.plugins = [
      ...config.plugins,
      ...[
        
      ]
    ]
  }
  
  return config;
})


module.exports = configList;