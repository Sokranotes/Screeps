/*
function:
harvest, transfer, build

spawnCreep reqiure:bodys, name
creep.memory.role:'hb'
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id

other:
harvest_repair_worker
*/

import { go_to_build } from "../universal_logic/go_to_build"
import { go_to_harvest } from "../universal_logic/go_to_harvest"

export const harvest_build_work = function(creep: Creep){
    let priority: number = 20
    let minTicksToLive = 150

    if (creep.ticksToLive <= minTicksToLive){
        const data = {
            role: creep.memory.role, 
            memory: {
                role: creep.memory.role,
                source_idx: creep.memory.source_idx
            }
        }
        creep.room.addSpawnTask(priority, data)
    }
    
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false
        creep.say('🔄 采')
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true
        creep.memory.dontPullMe = false
        creep.say('🚧 建')
    }
    if(creep.memory.is_working) {
        go_to_build(creep)
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