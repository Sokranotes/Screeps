import * as $ from "../modules/超级移动优化"

export const cleaner_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if(creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        // 如果在捡东西状态，装满了，那么退出工作状态
        creep.memory.is_working = false;
        creep.say('🔄 transfer');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == creep.store.getCapacity()) {
    // if(!creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        //如果在运东西状态，且没有能量了，退出运输状态
        creep.memory.is_working = true;
        creep.say('🚧 pickup');
    }
    if (creep.memory.is_working){
        var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (res != null){
            if (creep.pickup(res) == ERR_NOT_IN_RANGE){
                creep.moveTo(res, {visualizePathStyle: {stroke: '#ffff00'}})
            }
        }
        else{
            var tomb = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                filter: (structure) => {
                    return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (tomb != null){
                if (creep.withdraw(tomb, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tomb, {visualizePathStyle: {stroke: '#ffff00'}})
                }
            }
            else{
                var ruin = creep.pos.findClosestByRange(FIND_RUINS, {
                    filter: (structure) => {
                        return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
                if (ruin != null){
                    if (creep.withdraw(ruin, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(ruin, {visualizePathStyle: {stroke: '#ffff00'}})
                    }
                }
                else{
                    if (creep.store.getUsedCapacity() > 0){
                        creep.memory.is_working = false
                    }
                    else if (creep.pos.x != 24 && creep.pos.y != 26){
                        creep.moveTo(new RoomPosition(24, 26, creep.room.name))
                    }
                    else{
                        creep.memory.role = 'base_transfer'
                    }
                }
            }
        }
    }
    else{
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && creep.store.getUsedCapacity() != 0){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
                if(creep.transfer(targets[0], RESOURCE_ZYNTHIUM_HYDRIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
                if(creep.transfer(targets[0], RESOURCE_KEANIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
                if(creep.transfer(targets[0], RESOURCE_UTRIUM_HYDRIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TERMINAL);
                    }
                });
                if(creep.transfer(targets[0], RESOURCE_GHODIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
                if(creep.transfer(targets[0], RESOURCE_ZYNTHIUM_HYDRIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
                if(creep.transfer(targets[0], RESOURCE_KEANIUM_OXIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
                if(creep.transfer(targets[0], RESOURCE_UTRIUM_HYDRIDE) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
        }
        else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
                else{
                    var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER &&
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                        }
                    });
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                        }
                    }
                }
            }
        }
    }
}