import { go_to_fill } from "@/Universal/room_base/universal_logic/go_to_fill";

export const base_transfer_work = function(creep: Creep){
    // creep.say('👋 base transfer');
    let priority: number = 0
    let minTicksToLive = 200
    if (creep.ticksToLive == minTicksToLive && creep.memory.role == 'base_transfer'){
        let level = global.room_config[creep.room.name]['level'+creep.room.controller.level] == undefined ? 
            'default' : 'level'+creep.room.controller.level
        let bodyParts = global.room_config[creep.room.name][level][creep.memory.role]['bodyParts']
        const data = {
            name: creep.memory.role, 
            bodyParts: bodyParts,
            memory: {
                role: creep.memory.role,
            }
        }
        creep.room.addSpawnTask(priority, data)
    }
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        // creep.say('🚧 withdraw');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在withdraw状态，且取不了了，装满了，退出withdraw状态
        creep.memory.is_working = true;
        // creep.say('🔄 transfer');
    }
    // console.log(creep.name, creep.pos, creep.memory.is_working)
    if (creep.memory.is_working){
        go_to_fill(creep)
        // if (go_to_fill(creep) == false && Game.time % 20 == 11){
        //     creep.memory.role = 'cleaner'
        // }
    }
    else{
        if (creep.room.storage && creep.room.terminal && (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) - creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) >= 20000 || 
        creep.room.terminal.store.getFreeCapacity(RESOURCE_ENERGY) < 20000))
        {
            if (creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
                if(creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#808080'}});
                }
                return
            }
        }
        if (creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#808080'}});
            }
            return
        }
        if (creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
            if(creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#808080'}});
            }
            return
        }
    }
}