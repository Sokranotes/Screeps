// import * as $ from '../超级移动优化bypass (临时)'

export const upgrader_work = function(creep: Creep, roomName: string){
    creep.say('🔄 Here');
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 upgrade');
    }
    if(creep.memory.is_working) {
        // creep.say('🚧 upgrade');
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {//距离够则升级控制器
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
        }
    }
    else {
        var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER) && 
            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            // return (structure.structureType == STRUCTURE_STORAGE || 
            //     structure.structureType == STRUCTURE_CONTAINER) && 
            // structure.store.getCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(containers.length > 0) {
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#808080'}});
            }
        }
        else{
            var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) && 
                structure.store.getCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(containers.length > 0) {
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#808080'}});
                }
            }
        }
    }
}