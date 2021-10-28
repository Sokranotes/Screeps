/*
function
harvester, transfer, builder

spawnCreep reqiure:
creep.memory.source_idx

run require:
Memory.rooms[creep.room.name].sources_id

other:
repairer_work
*/

import { go_to_harvest } from "../universal_logic/go_to_harvest"

export const builder_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false
        creep.say('🔄 harvest')
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true
        creep.memory.dontPullMe = false
        creep.say('🚧 build')
    }
    if(creep.memory.is_working) {
        let construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD)
            }
        })
        if (construction){
            if(creep.build(construction) == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction, {visualizePathStyle: {stroke: '#008cff'}})
            }
        }
        else{
            let constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            if(constructions.length > 0) {
                if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructions[0], {visualizePathStyle: {stroke: '#008cff'}});
                }
            }
            else{
                creep.memory.role = 'repairer'
            }
        }
    }
    else {
        let source: Source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        go_to_harvest(creep, source)
    }
}