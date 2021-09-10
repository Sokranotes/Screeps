var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep){
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.building) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                filter: (s) => s.hits < s.hitsMax
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
};

module.exports = roleRepairer;
