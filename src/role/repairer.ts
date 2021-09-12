export const repairer_work = function(creep: Creep, roomName: string){
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
            // filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            filter: (s) => s.hits < 100
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else{
            creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            // creep.memory.role = 'builder';
        }
    }
    else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}
