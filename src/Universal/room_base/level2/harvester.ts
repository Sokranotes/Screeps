/* 
function
harvester, transfer, fill extension and spawn

spawnCreep reqiure:
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id
 */

import { go_to_harvest } from "../universal_logic/go_to_harvest";

export const harvester_work = function(creep: Creep){
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true
        creep.memory.dontPullMe = false
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
        let source: Source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        go_to_harvest(creep, source)
    }
}