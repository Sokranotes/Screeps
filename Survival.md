# Survival

### 常用

```javascript
Game.spawns['Spawn1'].spawnCreep( [WORK, WORK, CARRY, MOVE], 'E', { memory: { role: 'harvester' } } );
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Builder1',     { memory: { role: 'builder' } } );
Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader2',     { memory: { role: 'upgrader' } } );
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';
Game.creeps['Harvester1'].memory.role = 'builder';
```

### 已经完成的工作：

- harvester自动采集并传输给spawn和extension
- builder自动采集并建造建筑
- upgrader自动采集并升级控制器

### 需要完善的工作：

##### 近期

- 自动生成creep，避免手动生成


- 自动生成creep过程中组件调整的问题，避免手动调整
- 防御的建立
- 道路自动维护

##### 长远

- 闲置角色改变角色
- 工作完成之后占资源采集点位置的问题：如harvester， builder
  - 前期harvester的需求好像不是特别高，容易占位置。
  - 工作效率太低，采集位置被挤占，creep只能多走路绕路。貌似提高组件中WORK数量能够缓解这一点。
- 能源点能源耗尽的问题
- 根据工作量进行控制creep的生成
- 采集资源
- 防御的自动维护
- 攻击部队生成

#### 信息：

##### 建造对应部件所需能量

[WORK] 100

[CARRY] 50

[MOVE] 50

[WORK, CARRY, MOVE] 200

[WORK, WORK, CARRY, MOVE] 300

extension 3000

路 300

### 移动：

除了 `MOVE` 外， Creep 的每一个构造部件都有重量：带的部件越多，移动速度越慢。每个部件（除了 `MOVE`）都都会产生疲劳值：在道路上为 1 点，平原上为 2 点，沼泽里为 10 点。每一个 MOVE 部件每个游戏 tick 会减少 2 点疲劳值，当 Creep 的疲劳值大于 0 时无法移动。

> 如果要保证 Creep 每个游戏 tick 能移动一格，需要计算除 `MOVE` 外的所有部件的疲劳值总和并使 `MOVE` 减少的疲劳值不低于这个总和。

换句话说，一个 `MOVE` 部件在每个 tick 可以移动其他部件一个方格。如果一个 Creep 的 `MOVE` 部件不足，他的移动力会按比例减速，这可以通过疲劳度来看出。

值得注意的是，没有搬运资源的 `CARRY` 部件是不会产生疲劳的。

几个小例子：

- Creep `[CARRY, WORK, MOVE]` 在没有搬运能量的时候一个 tick 可以跑 1 格，搬了能量以后 2 个 tick 才能跑 1 格。
- Creep `[TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE]` 将以满速（1 个 tick 一格）行动。
- Creep `[TOUGH, ATTACK, ATTACK, MOVE, MOVE]` 根据向上取整原则 2 个 tick 移动 1 格。

### 手动survival代码

##### main

```javascript
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder')

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // //console.log('Harvesters: ' + harvesters.length);

    // if(harvesters.length < 1) {
    //     var newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK, WORK ,CARRY ,MOVE, MOVE], newName, 
    //         {memory: {role: 'harvester'}});
    // }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
```

##### role.builder

```javascript
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;
```

##### role.harvester

```javascript
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});//显示路径
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;//过滤器找到extension或spawn类型且空间未满的建筑
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;
```

##### role.upgrader

```javascript
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {//距离够则升级控制器
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;
```

### reference

[Screeps Survival](https://screeps.com/a/#!/sim/survival)

[Screeps Tutorial](https://screeps.com/a/#!/sim/tutorial)

[Screeps中文文档 Creeps](https://screeps-cn.github.io/creeps.html)