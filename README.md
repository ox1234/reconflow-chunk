# ChunkParser

webpack之后生成的chunk js在AST结构上有特定的规律，该工具解析AST并动态获取所有的chunk js的路径

## install

安装：`npm install && tsc --build`

## 使用

扫描js文件的chunk js：`cd dist && node main.js chunk <js文件路径>`

