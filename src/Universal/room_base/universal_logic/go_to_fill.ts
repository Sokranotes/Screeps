export const go_to_fill = function(creep: Creep, tower_first: boolean = false){
    let target
    // if (creep.room.memory.towers_id ? creep.room.memory.towers_id.length == 1 : false && Game.time%100 == 1){
    //     target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => {
    //             return (structure.structureType == STRUCTURE_TOWER) &&
    //                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.4*structure.store.getCapacity(RESOURCE_ENERGY);
    //         }
    //     });
    //     if(target) {
    //         if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(target)
    //         }
    //         return
    //     }
    // }
    if (tower_first && creep.room.memory.towers_id){
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.2*structure.store.getCapacity(RESOURCE_ENERGY) && structure.isActive();
            }
        });
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            return
        }
    }
    if (creep.room.energyAvailable < creep.room.energyCapacityAvailable){
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || 
                    structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && structure.isActive();
            }
        });
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            return
        }
    }
    if (!tower_first && creep.room.memory.towers_id){
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.2*structure.store.getCapacity(RESOURCE_ENERGY) && structure.isActive();
            }
        });
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            return
        }
    }

    if (creep.room.controller.my? creep.room.controller.level >= 6 : false){
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LAB) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && structure.isActive();
            }
        });
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            return
        }
    }
    if (creep.room.controller.my? creep.room.controller.level == 8 : false){
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_POWER_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && structure.isActive();
            }
        });
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            return
        }
        target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_NUKER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && structure.isActive();
            }
        });
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
            return
        }
    }
    // if (creep.room.terminal && creep.room.terminal.store.getFreeCapacity() >= creep.store.getUsedCapacity()){
    //     if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //         creep.moveTo(creep.room.terminal)
    //     }
    //     return
    // }
    // if (creep.room.storage && creep.room.storage.store.getFreeCapacity() >= creep.store.getUsedCapacity()){
    //     if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //         creep.moveTo(creep.room.storage)
    //     }
    //     return
    // }
    else{
        return false
    }
}