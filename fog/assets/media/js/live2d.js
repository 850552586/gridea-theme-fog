L2Dwidget
.on('*', (name) => {
console.log('%c EVENT ' + '%c -> ' + name, 'background: #222; color: yellow', 'background: #fff; color: #000')
})
.init({
dialog: {
enable: true,
script: {
'every idle 5s': '$hitokoto$',
'hover .star': '星星在天上而你在我心里 (*/ω＼*)',
'tap body': '哎呀！别碰我！',
'tap face': '人家已经不是小孩子了！'
}
},
"model": {
jsonPath: "https://unpkg.com/live2d-widget-model-z16@1.0.5/assets/z16.model.json",
"scale": 1
},
"display": {
"position": "right", //看板娘的表现位置
"width": 170, //小萝莉的宽度
"height": 300, //小萝莉的高度
"hOffset": 0,
"vOffset": -20
},
"mobile": {
"show": true,
"scale": 0.5
},
"react": {
"opacityDefault": 0.7,
"opacityOnHover": 0.2
}
});