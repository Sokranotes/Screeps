import * as $ from "./../../超级移动优化"

export const repairer_work = function(creep: Creep, roomName: string){
    // creep.say('🔄 Here');
    // creep.memory.source_idx = 1 //近的这个，坐标13 29
    var dropEngry = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES)
    if(creep.pickup(dropEngry) == ERR_NOT_IN_RANGE) {
        creep.moveTo(dropEngry, {visualizePathStyle: {stroke: '#ffffff'}})
    }
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 repair');
    }
    if(creep.memory.is_working) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.hits < 0.5*s.hitsMax && s.structureType == STRUCTURE_CONTAINER
            // filter: (s) => s.hits < s.hitsMax
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else{
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < 0.5*s.hitsMax && s.structureType != STRUCTURE_WALL
                // filter: (s) => s.hits < s.hitsMax
            });
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                    // filter: (s) => s.hits < s.hitsMax
                });
                if(target) {
                    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    creep.moveTo(new RoomPosition(21, 33, roomName));
                }
            }
        }
    }
    else {
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
