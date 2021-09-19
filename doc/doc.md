

# 重构

## 需求

1 需要保持房间的运营

2 程序健壮性

3 提高资源开采效率（挖运分离）

4 提升实力，壮大自身

## 需求分析

### 基本的房间运营

基本的能源开采

房间防御

不能因为其他部分影响到这部分

优先级最高

### 健壮性

检测当前状态

自动根据状态调整策略

房间出问题可以迅速恢复

### 挖运分离 提高Creep利用效率

#### 能量流图与抽象角色设计

##### 组件相关信息

不需要WORK的，transfer能量都只需要一下

Builder/Repairer/Upgrader/Harvester需要Worker

##### 能量流图

![energy flow diagram](energy%20flow%20diagram.png)

根据能量流图，如果采用挖运分离策略，基本运维功能需要5种Creep

1. Harvester with carry：采集能源放在身上等passive transfer来运走（教程中由自己运走）

2. Harvester without carry：采集能源直接掉落在地上OR Container

3. active transfer：主动取能源再运输

4. passive transfer：被动接受能源再运输

5. Builder/Repair/Upgrader：依赖于WORK

##### 抽象角色分析设计

其中Harvester具有不同的工作地点，transfer可能具有不同的start和end，而Builder也是。

在spawnCreep的时候就决定好，每一个具体的creep需要做的工作，而工作地点及源头相关的信息存储在Memory中

##### 组件设计

1. Harvester设计
   1. 含有5个WORK，5个MOVE，保证移动
   2. 带有CARRY组件则需要transfer快速运走，不然就需要等待（瓶颈可能是transfer运不过来）

2. transfer：WORK CARRY 1:1的比例，只有两个组件可能会因为creep太多导致堵车，不过组件越多，花在等待上的时间越长

3. Builder/Repairer/Upgrader平衡比较好，MOVE是其他组件的两倍

##### role任务设计

每一个具体的role完成一件非常具体的事情，如

1. Harvester without carry 到达指定地点，挖矿
2. Harvester with carry 到达指定地点挖矿，当容量中超过transfer单个的容量时，传输给transfer
3. active transfer 从某处取能量到某处
4. passive transfer 到某处，被给予能量再运输到某处
5. Builder/Repairer/Upgrader 从某处（近处？）取能量，到目的地点进行工作

#### 采集能源

##### 能量源头

自己房间，外矿

##### 传输目的地

自己房间内的能源建筑

##### 两种采集方式

1 Harvester without carry和container配合，由active transfer运输

2 Harvester with carry和passive transfer配合完成

