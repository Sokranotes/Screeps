// import * as $ from '../超级移动优化bypass (临时)'

export const cleaner_work = function(creep: Creep, roomName: string){
    creep.say('🔄 Here');
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        // 如果在工作状态，装满了，那么退出工作状态
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        //如果在运输状态，且没有能量了，退出运输状态
        creep.memory.is_working = true;
        creep.say('🚧 transfer');
    }
    // console.log(creep.name, ' ', creep.pos.x, ' ', creep.pos.y)
    if (!creep.memory.is_working){
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
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
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
    else{
        var tomb = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
            filter: (structure) => {
                return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if (tomb != null){
            console.log(creep.name, ' tomb:', tomb.pos.x, ' ', tomb.pos.y)
            if (creep.withdraw(tomb, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(tomb)
            }
        }
        else{
            creep.moveTo(new RoomPosition(13, 24, roomName));
        }
    }
}