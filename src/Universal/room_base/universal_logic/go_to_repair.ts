export const go_to_repair = function(creep: Creep, wall_rampart_hits?: number, filter?: Object){
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_RAMPART)
    });
    if(target) {
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return
    }
    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_WALL)
    });
    if(target) {
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return
    }

    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => (s.hits < 0.9*s.hitsMax) && (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)
    });
    if(target) {
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return
    }

    if (wall_rampart_hits != undefined){
        if (filter == undefined){
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.hits < wall_rampart_hits && s.hits < 0.9*s.hitsMax) && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)
            });
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return
            }
        }
        else{
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, filter);
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return
            }
        }
    }
    creep.memory.role = 'hb'
}
