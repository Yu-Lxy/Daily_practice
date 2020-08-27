const mongodb = require("./db");

mongodb.once("connect", async () => {
  const col = mongodb.col("fruits");
  try {
    // 删除已存在
    await col.deleteMany();

    // 插入
    await col.insertMany([
      { name: "苹果", price: 5 },
      { name: "香蕉", price: 3.5 },
      { name: "芒果", price: 15 },
      { name: "砂糖橘", price: 8 },
      { name: "土豆", price: 2 },
      { name: "西红柿", price: 3 },
      { name: "茄子", price: 4 },
      { name: "韭菜", price: 5 },
      { name: "牛肉", price: 30 },
      { name: "鱼", price: 12 },
      { name: "大闸蟹", price: 99 },
      { name: "鲜虾", price: 20 }
      
    ]);
    console.log("插入测试数据成功");
    const ret = await col.find({price:{$gt:10}}).toArray()
  // console.log('ret',ret)

  } catch (error) {
    console.log("插入测试数据失败");
    console.log(error);
  }
})