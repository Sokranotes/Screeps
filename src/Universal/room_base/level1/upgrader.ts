/* 
function:
harvester, transfer, upgrader

spawnCreep reqiure:
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id
creep.room.controller
 */

import { go_to_harvest } from "../universal_logic/go_to_harvest";

export const upgrader_work = function(creep: Creep){
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true
        creep.memory.dontPullMe = false
        creep.say('🚧 upgrade');
    }
    if(creep.memory.is_working) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
        }
    }
    else {
        let source: Source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        go_to_harvest(creep, source)
    }
}