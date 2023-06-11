import { room_config } from "@/Universal/room_base/config";
import { go_to_harvest } from "@/Universal/room_base/universal_logic/go_to_harvest"
import { go_to_repair } from "@/Universal/room_base/universal_logic/go_to_repair";

export const repairer_work = function(creep: Creep){
    // creep.say('🔄 Here');
    let priority: number = 15
    let minTicksToLive = 100
    if (creep.ticksToLive == minTicksToLive){
        if (creep.room.storage? creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 20000 : false){
            return
        }
        let level = global.room_config[creep.room.name]['level'+creep.room.controller.level] == undefined ? 
            'default' : 'level'+creep.room.controller.level
        let bodyParts = global.room_config[creep.room.name][level][creep.memory.role]['bodyParts']
        const data = {
            name: creep.memory.role, 
            bodyParts: bodyParts,
            memory: {
                role: creep.memory.role,
                source_idx: creep.memory.source_idx,
                source_roomName: creep.memory.source_roomName
            }
        }
        creep.room.addSpawnTask(priority, data)
    }
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 repair');
    }
    if(creep.memory.is_working) {
        go_to_repair(creep)
        if (creep.memory.role == 'hb'){
            creep.memory.role = 'builder'
        }
    }
    else {
        if (creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#808080'}});
            }
            return
        }
        if (creep.room.terminal && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 200){
            if(creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#808080'}});
            }
            return
        }
        if (creep.memory.source_idx == undefined)
        creep.memory.source_idx  = 0
        if (creep.memory.source_idx && Game.rooms[creep.memory.source_roomName].memory.sources_id){
            go_to_harvest(creep, Game.getObjectById(Game.rooms[creep.memory.source_roomName].memory.sources_id[creep.memory.source_idx]))
        }
    }
}
