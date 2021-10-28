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
        if (creep.store.getUsedCapacity() > 0){
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(target) {
                let code = creep.transfer(target, RESOURCE_ENERGY)
                if(code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            else{
                if (creep.room.name == 'W48S12'){
                    let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.3*structure.hitsMax;
                        }
                    });
                    if(target) {
                        let code = creep.transfer(target, RESOURCE_ENERGY)
                        if(code == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});
                        }
                    }
                }
                if (creep.pos.x == 15 && creep.pos.y == 18){
                    creep.memory.role = 'cleaner'
                }
                else{
                    creep.moveTo(new RoomPosition(15, 18, creep.room.name))
                }
            }
        }
    }
    else{
        if (creep.room.name == 'W48S12'){
            let storage: StructureLink = Game.getObjectById('61739e3ab6a4e1f3750c4432')
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return
            }
            let terminal: StructureTerminal = Game.getObjectById('6173c887dc242927f66874d1')
            if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#ffffff'}});
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