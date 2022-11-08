const babelOptions = {
  presets: ['next/babel']
}

module.exports = require('babel-jest').default.createTransformer(babelOptions)
