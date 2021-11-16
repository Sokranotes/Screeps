/* 
function:
harvest, transfer, upgrade

spawnCreep reqiure:bodys, name
creep.memory.role:'hu'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id
creep.room.controller
 */

import { go_to_harvest } from "@/Universal/room_base/universal_logic/go_to_harvest";

export const harvest_upgrade_work = function(creep: Creep){
    
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false
        creep.say('🔄 采');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true
        creep.memory.dontPullMe = false
        creep.say('🚧 升');
    }
    if(creep.memory.is_working) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
        }
    }
    else {
        let source: Source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        if (go_to_harvest(creep, source) == ERR_NOT_ENOUGH_ENERGY){
            if (creep.memory.source_idx == 1)
                creep.memory.source_idx = 0
            else
                creep.memory.source_idx = 1
        }
    }
}