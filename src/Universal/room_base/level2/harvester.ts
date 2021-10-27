// function
// harvester, transfer, fill extension and spawn

// spawnCreep reqiure:
// creep.memory.source_idx

// run require:
// Memory.rooms[creep.room.name].sources_id

import "../../../modules/超级移动优化"

export const harvester_work = function(creep: Creep){
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true
        creep.say('🚧 transfer');
    }
    if(creep.memory.is_working) {
        let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || 
                    structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target)
            }
        }
    }
    else {
        let source: Source
        source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        let code:number = creep.harvest(source)
        if (code == ERR_NOT_IN_RANGE){
            creep.moveTo(source)
        }
        else if (code != ERR_BUSY && code != OK && code != ERR_NOT_ENOUGH_ENERGY){
            console.log(Game.time, 'level2 harvester_work', code)
        }
    }
}