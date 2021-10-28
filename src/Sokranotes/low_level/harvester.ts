import { go_to_harvest } from "../room_base/go_to_harvest";

export const harvester_work = function(creep: Creep){
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 transfer');
    }
    if(creep.memory.is_working) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.2*structure.store.getCapacity(RESOURCE_ENERGY));
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0])
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
                    creep.moveTo(targets[0])
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
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0])
                    }
                }
            }
        }
    }
    else {
        let source: Source
        if (creep.room.memory.sources_id == undefined){
            let sources = creep.room.find(FIND_SOURCES)
            Memory.rooms[creep.room.name].sources_id = new Array(sources.length)
            for (let i: number = 0; i < sources.length; i++){
                Memory.rooms[creep.room.name].sources_id[i] = sources[i].id;
            }
        }
        source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        go_to_harvest(creep, source)
    }
}