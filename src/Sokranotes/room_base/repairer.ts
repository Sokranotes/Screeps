import { go_to_harvest } from "@/Universal/room_base/universal_logic/go_to_harvest"

export const repairer_work = function(creep: Creep){
    // creep.say('🔄 Here');
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
            filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_RAMPART)
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return
        }
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits < 10000) && (s.structureType == STRUCTURE_WALL)
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return
        }
    
        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits < 0.9*s.hitsMax) && (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return
        }
    
        let wall_rampart_hits_ladder = [100000, 1000000, 50000000, 100000000]
        for (let i = 0; i < wall_rampart_hits_ladder.length; i++){
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => (s.hits < 0.9*s.hitsMax && s.hits < wall_rampart_hits_ladder[i]) && (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)
            });
            if(target) {
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                return
            }
        }
        if (creep.room.name == 'W48S12'){
            creep.memory.role = 'builder'
        }
    }
    else {
        let source: Source = Game.getObjectById(creep.room.memory.sources_id[creep.memory.source_idx])
        go_to_harvest(creep, source)
    }
}
