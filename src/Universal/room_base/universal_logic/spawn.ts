import FlatQueue from './FlatQueue'

// creep 生成主要实现
Spawn.prototype.mainSpawn = function(data: spawnData) {
    let bodys: BodyPartConstant[] = [WORK, CARRY, MOVE, MOVE]
    if (data.memory.role == 'hf' || data.memory.role == 'hu' || data.memory.role == 'hr' || data.memory.role == 'hb'){
        switch (this.room.energyCapacityAvailable){
            case 300:
            case 350:
                bodys = [WORK, CARRY, MOVE, MOVE]
                break
            case 400:
            case 450:
                bodys = [WORK, WORK, CARRY, MOVE, MOVE, MOVE]
                break
            case 500:
            case 550:
            case 600:
                bodys = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
                break
            case 650:
            case 700:
                bodys = [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
                break
            case 750:
            case 800:
                bodys = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
                break
            default:
                bodys = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }
    }
    data.name = '' + data.memory.role + Game.time + data.name
    const code = this.spawnCreep(bodys, data.name, {memory: data.memory});
    return code
}

// 检查任务队列
Spawn.prototype.work = function() {
    // spawn safe mode
    if (this.notifyWhenAttacked(true) == OK && this.hits < 0.6*this.hitsMax){
        this.room.controller.activateSafeMode()
    }
    let spawnQueue: FlatQueue = new FlatQueue(Memory.rooms[this.room.name].spawnQueue);
    // 自己已经在生成了 / 生产队列为空 就啥都不干
    if (this.spawning || spawnQueue.length == 0) return 
    // 进行生成
    let code: ScreepsReturnCode = this.mainSpawn(spawnQueue.peek())
    // 生成成功后移除任务
    if (code) spawnQueue.pop()
}

// 所有spawns执行工作
// doing(Game.spawns)

/**
 * 执行 Hash Map 中子元素对象的 work 方法
 * 
 * @param hashMap 游戏对象的 hash map。如 Game.creeps、Game.spawns 等
 */
 export function doing(...hashMaps: object[]): void {
    hashMaps.forEach((obj, index) => {
        let startCost = Game.cpu.getUsed()

        // 遍历执行 work
        Object.values(obj).forEach(item => {
            if (item.work) item.work()
        })

        // 如果有需求的话就显示 cpu 消耗
        if (Game.flags.showCost) console.log(`消耗 ${Game.cpu.getUsed() - startCost}`, [ `[${index}]` ])
    })
}

// const data = {
//     bodyParts: staticHarvesterParts,
//     name: newStaticHarvesterName, // Maybe move this to the actual spawning function?
//     memory: {
//         role: constants.ROLE_STATIC_HARVESTER,
//         source: i,
//         room: room.name
//     }
// }

// const code = targetSpawn.spawnCreep(spawnData.bodyParts,
//     spawnData.name,
//     {memory: spawnData.memory});

// 将生成任务推入队列
Room.prototype.addSpawnTask = function(priority: number, data: spawnData) { 
    // 任务加入队列
    let spawnQueue: FlatQueue = new FlatQueue(Memory.rooms[this.name].spawnQueue);
    spawnQueue.push(priority, data)
    return spawnQueue.length
}