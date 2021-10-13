import * as $ from "../../modules/超级移动优化"

export const harvester_work = function(creep: Creep){
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.memory.path = null
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.memory.path = null
        creep.say('🚧 transfer');
    }
    if(creep.memory.is_working) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                let target = targets[0]
                if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    creep.memory.path = creep.pos.findPathTo(target);
                }
                let code = creep.moveByPath(creep.memory.path)
                if (code == ERR_NOT_FOUND){
                    if (creep.pos.isNearTo(target)){
                        creep.memory.path = null
                    }
                    else{
                        // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                }
                // creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
            }
        }
        else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    let target = targets[0]
                    if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                        // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                    let code = creep.moveByPath(creep.memory.path)
                    if (code == ERR_NOT_FOUND){
                        if (creep.pos.isNearTo(target)){
                            creep.memory.path = null
                        }
                        else{
                            // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                    }
                    // creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
        }
    }
    else {
        let source: Source
        if (creep.room.memory.sources_id == undefined){
            let sources = creep.room.find(FIND_SOURCES)
            Memory.rooms[creep.room.name].sources_id = new Array(sources.length)
            for (let i: number = 0; i < sources.length; i++){
                Memory.rooms[creep.room.name].sources_id[i] = sources[i].id;
            }
        }
        source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        let code:number = creep.harvest(source)
        if (code == ERR_NOT_IN_RANGE){
            let target = source.pos
            if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                creep.memory.path = creep.pos.findPathTo(target);
            }
            let code = creep.moveByPath(creep.memory.path)
            if (code == ERR_NOT_FOUND){
                if (creep.pos.isNearTo(target)){
                    creep.memory.path = null
                }
                else{
                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    creep.memory.path = creep.pos.findPathTo(target);
                }
            }
            // code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
        }
        else if (code != ERR_BUSY && code != OK){
            console.log(Game.time, 'harvester_work', code)
        }
    }
}