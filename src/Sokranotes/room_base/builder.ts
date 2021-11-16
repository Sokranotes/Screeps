import { go_to_harvest } from "@/Universal/room_base/universal_logic/go_to_harvest"

export const builder_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false
        creep.memory.path = null
        creep.say('🔄 harvest')
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true
        creep.memory.path = null
        creep.say('🚧 build')
    }
    if(creep.memory.is_working) {
        let construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN)
            }
        })
        if (construction){
            if(creep.build(construction) == ERR_NOT_IN_RANGE) {
                creep.moveTo(construction, {visualizePathStyle: {stroke: '#008cff'}})
            }
        }
        else{
            let construction = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);
            if(construction) {
                if(creep.build(construction) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(construction, {visualizePathStyle: {stroke: '#008cff'}});
                }
            }
            else{
                creep.memory.role = 'repairer'
            }
        }
    }
    else {
        if (creep.room.name == 'W48S12'){
            // let source: Source
            // if (creep.room.memory.sources_id == undefined){
            //     let sources = creep.room.find(FIND_SOURCES)
            //     Memory.rooms[creep.room.name].sources_id = new Array(sources.length)
            //     for (let i: number = 0; i < sources.length; i++){
            //         Memory.rooms[creep.room.name].sources_id[i] = sources[i].id;
            //     }
            // }
            // source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
            // go_to_harvest(creep, source)
            let storage: StructureLink = Game.getObjectById('61739e3ab6a4e1f3750c4432')
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity(RESOURCE_ENERGY)){
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#808080'}});
                }
                return
            }
            let terminal: StructureTerminal = Game.getObjectById('6173c887dc242927f66874d1')
            if(creep.withdraw(terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(terminal, {visualizePathStyle: {stroke: '#808080'}});
            }
        }
        else if(creep.room.name == "W47S14"){
            let storage: StructureStorage = Game.getObjectById('6159fc1609f790175f45c6be');
            if (storage){
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#808080'}});
                }
            }
            else{
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TERMINAL);
                    }
                });
                if(targets.length > 0) {
                    if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    let targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if(targets.length > 0) {
                        if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
        else{
            let source: Source = Game.getObjectById(creep.room.memory.sources_id[creep.memory.source_idx])
            go_to_harvest(creep, source)
        }
    }
}