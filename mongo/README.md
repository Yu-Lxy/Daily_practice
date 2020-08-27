## 运行
首先安装以下
```
npm i express path events mongodb nodemon
```

conf.js里设置自己的mongodb配置

数据库没数据的话先执行以下添加数据：
```
cd models
nodemon testData.js
```

添加好之后ctrl+c, 再执行以下
```
cd ..
nodemon index.js
```
打开localhost:3000能看到如下样式

![image.png](https://i.loli.net/2020/08/27/ALNjeIKPOY9QTHF.png)