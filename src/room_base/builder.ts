import * as $ from "../modules/超级移动优化"

export const builder_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest'); 
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 build');
    }
    // console.log(creep.memory.is_working)
    if(creep.memory.is_working) {
        var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (constructions)
            if(constructions.length > 0) {
                if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructions[0], {visualizePathStyle: {stroke: '#008cff'}});
                }
            }
            else{
                creep.memory.role = 'upgrader'
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