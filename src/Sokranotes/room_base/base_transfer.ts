import { go_to_fill } from "@/Universal/room_base/universal_logic/go_to_fill";

export const base_transfer_work = function(creep: Creep){
    // creep.say('👋 base transfer');
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        creep.say('🚧 withdraw');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在withdraw状态，且取不了了，装满了，退出withdraw状态
        creep.memory.is_working = true;
        creep.say('🔄 transfer');
    }
    if (creep.memory.is_working){
        if (go_to_fill(creep) == false){
            creep.memory.role = 'cleaner'
        }
    }
    else{
        if (creep.room.name == 'W48S12'){
            let storage: StructureLink = Game.getObjectById('6185354e103ba6667086b991')
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity(RESOURCE_ENERGY)){
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#808080'}});
                }
                return
            }
            let terminal: StructureTerminal = Game.getObjectById('6173c887dc242927f66874d1')
            if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#808080'}});
            }
            return
        }
        let flag = true
        if (creep.room.memory.storage_id == undefined){
            let targets: StructureStorage[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE)
                }
            });
            if (targets.length > 0){
                creep.room.memory.storage_id = targets[0].id
            }
            else{
                flag = false
            }
        }
        if (flag){
            let storage = Game.getObjectById(creep.room.memory.storage_id)
            if (storage == null){
                let targets: StructureStorage[] = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE)
                    }
                });
                if (targets.length > 0){
                    creep.room.memory.storage_id = targets[0].id
                }
                else{
                    console.log(Game.time, 'base_transfer_work', creep.room.name, 'storage is null')
                    creep.room.memory.storage_id = undefined
                }
            }
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                    return
                }
            }
        }
        if (creep.room.memory.terminal_id == undefined){
            let targets: StructureTerminal[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL)
                }
            });
            if (targets.length > 0){
                creep.room.memory.terminal_id = targets[0].id
            }
        }
        let terminal = Game.getObjectById(creep.room.memory.terminal_id)
        if (terminal == null){
            let targets: StructureTerminal[] = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL)
                }
            });
            if (targets.length > 0){
                creep.room.memory.terminal_id = targets[0].id
            }
            else{
                if (creep.room.memory.terminal_id != undefined){
                    console.log(Game.time, 'base_transfer_work', creep.room.name, 'terminal is null')
                }
                creep.room.memory.terminal_id = undefined
            }
        }
        if (terminal != null){
            if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
}