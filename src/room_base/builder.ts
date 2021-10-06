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
    if(creep.memory.is_working) {
        let constructions = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK)
            }
        });
        if (constructions){
            if(constructions.length > 0) {
                if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructions[0], {visualizePathStyle: {stroke: '#008cff'}});
                }
            }
            else{
                let constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                if(constructions.length > 0) {
                    if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructions[0], {visualizePathStyle: {stroke: '#008cff'}});
                    }
                }
                else{
                    creep.memory.role = 'repairer'
                }
            }
        }
    }
    else {
        let storage: StructureStorage = Game.getObjectById('6159fc1609f790175f45c6be')
        if (storage){
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage, {visualizePathStyle: {stroke: '#808080'}});
            }
        }
        else{
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL);
                }
            });
            if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }
}