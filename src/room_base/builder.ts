import * as $ from "../modules/超级移动优化"

export const builder_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest'); 
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 build');
    }
    // console.log(creep.memory.is_working)
    if(creep.memory.is_working) {
        var constructions = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD)
            }
        });
        if (constructions){
            if(constructions.length > 0) {
                if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructions[0], {visualizePathStyle: {stroke: '#008cff'}});
                }
            }
            else{
                var constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
                if(constructions.length > 0) {
                    if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructions[0], {visualizePathStyle: {stroke: '#008cff'}});
                    }
                }
                else{
                    creep.memory.role = 'upgrader'
                }
            }
        }
        else{
            
        }

        // var construction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        // if (construction){
        //     let code = creep.build(construction)
        //     if(creep.build(construction) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(construction, {visualizePathStyle: {stroke: '#008cff'}});
        //     }
        //     else if (code != OK){
        //         // console.log(code)
        //     }
        // }
        // else{
        //     creep.memory.role = 'upgrader'
        // }
    }
    else {
        if (creep.room.name == 'W48S12'){
            var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            creep.pickup(res)
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && 
                    structure.store.getCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(containers.length > 0) {
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#808080'}});
                }
            }
            else{
                let sources: Source[] = creep.room.find(FIND_SOURCES)
                if (sources.length > 0){
                    let code = creep.harvest(sources[0])
                    if (code == ERR_NOT_IN_RANGE){
                        let code1 = creep.moveTo(sources[0])
                    }
                }
            }
        }
        else{
            let storage: StructureStorage = Game.getObjectById('6159fc1609f790175f45c6be')
            if (storage){
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#808080'}});
                }
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
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
                    var targets = creep.room.find(FIND_STRUCTURES, {
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
    }
}