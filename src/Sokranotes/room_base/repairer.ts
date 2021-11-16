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
            filter: (s) => (s.hits < 0.9*s.hitsMax) && (s.structureType != STRUCTURE_LAB && s.structureType != STRUCTURE_EXTRACTOR)
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return
        }
        let ramparts = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.hits < structure.hitsMax && structure.hits < 1000000)  && (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL)
        });
        if(ramparts.length > 0) {
            let code = creep.repair(ramparts[0])
            if(code == ERR_NOT_IN_RANGE) {
                creep.moveTo(ramparts[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return
        }
        else{
            if (creep.room.name == 'W48S12'){
                creep.memory.role = 'builder'
            }
        }
    }
    else if (creep.room.name == 'W48S12'){
        creep.memory.role = 'builder'
    }
}
