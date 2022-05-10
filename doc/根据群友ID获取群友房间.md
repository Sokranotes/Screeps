# 根据群友ID获取群友房间

### 代码

```js
// 感谢圆珠笔xuyd
let names = ['xuyd', '6g3y', 'HoPGoldy', 'mikumikumiku', 'scp002', 'MiHack', 'RayAidas','Nemophilist', 'Appassionata'];
const data = {};
let roomArr = [];
for (let name of names) {
    const idRequest = new Request('https://screeps.com/api/user/find?username=' + name);
    const userid = fetch(idRequest).then(response => response.json()).then(res => {
        data[name] = { id: res['user']['_id'] };
        const userRequest = new Request('https://screeps.com/api/user/rooms?id=' + res['user']['_id']);
        return fetch(userRequest).then(response => response.json())
    }).then(res => {
        data[name].rooms = res['shards']'shard3'];
        roomArr.push(...res['shards']['shard3']);
    });
}

console.log(roomArr);
```

### 用法

浏览器打开游戏之后，F12打开控制台，输入上述代码，names改成自己想要的名单，输出即为ID所对应的房间，自己再敲”roomArr“可直接复制出来