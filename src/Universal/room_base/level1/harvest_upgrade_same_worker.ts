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

import { go_to_harvest } from "../universal_logic/go_to_harvest";

export const harvest_upgrade_same_work = function(creep: Creep){
    let priority: number = 10
    let minTicksToLive = 100
    if (creep.ticksToLive == minTicksToLive && creep.memory.role == 'hus'){
        let level = global.room_config[creep.room.name]['level'+creep.room.controller.level] == undefined ? 
            'default' : 'level'+creep.room.controller.level
        let bodyParts = global.room_config[creep.room.name][level][creep.memory.role]['bodyParts']
        const data = {
            name: creep.memory.role, 
            bodyParts: bodyParts,
            memory: {
                role: creep.memory.role,
                source_idx: creep.memory.source_idx
            }
        }
        creep.room.addSpawnTask(priority, data)
    }
    if (creep.memory.is_working){
        if(creep.store[RESOURCE_ENERGY] <= creep.getActiveBodyparts(WORK)) {
            if (creep.memory.source_idx == undefined)
            creep.memory.source_idx  = 0
            let source: Source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
            go_to_harvest(creep, source)
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
            }
        }
        else{
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
            }
        }
    }
    else{
        if(creep.store[RESOURCE_ENERGY] == 0) {
            if (creep.memory.source_idx == undefined)
            creep.memory.source_idx  = 0
            let source: Source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
            go_to_harvest(creep, source)
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
            }
        }
        if(creep.store.getFreeCapacity() != 0) {
            creep.memory.is_working = true
        }
    }
}