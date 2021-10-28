/* 
function
harvester, transfer, repairer

spawnCreep reqiure:
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id

other:
builder_work
*/

import { go_to_harvest } from "../universal_logic/go_to_harvest";

export const repairer_work = function(creep: Creep){
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
            filter: (s) => (s.hits < s.hitsMax) && (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else{
            creep.memory.role = 'builder'
        }
    }
    else{
        let source: Source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        go_to_harvest(creep, source)
    }
}
