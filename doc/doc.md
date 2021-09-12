### 问题

1. 自动生成Creep
    - 自动根据总能量与可用能量调整组件
    - Harvester全部死亡的极端情况处理

2. Upgrader，Builder，Repairer控制逻辑
   - Upgrader transfer能量到controller，需要好多下，所以控制逻辑更复杂，不然容易能量采集一点点就跑到控制器那里传输，或者是采集满了，传输了一点点，又往回跑采集能量



### 能量
```
roomName = ''
Game.rooms[roomName].energyAvailable
Math.floor(50/100)//上取整

```
### Creep

Harvester transfer能量到extension，只需要一下




### ts
运行测试ts文件

tsc filename.ts
node filename.js