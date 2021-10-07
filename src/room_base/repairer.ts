import * as $ from "../modules/超级移动优化"

export const repairer_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 repair');
    }
    if(creep.memory.is_working) {
        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits < 1000 && s.hits < s.hitsMax) && (s.structureType != STRUCTURE_LAB && s.structureType != STRUCTURE_EXTRACTOR)
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else{
            let ramparts = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < 0.2*structure.hitsMax  && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)
            });
            if(ramparts.length > 0) {
                let code = creep.repair(ramparts[0])
                if(code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ramparts[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
    else {
        let containers = creep.room.find(FIND_STRUCTURES, {
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
