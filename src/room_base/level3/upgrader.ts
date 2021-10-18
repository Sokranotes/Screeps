import * as $ from "../../modules/超级移动优化"

// spawnCreep reqiure:
// creep.memory.source_roomName
// creep.memory.dest_roomName
// creep.memory.source_idx

// run require:
// Memory.rooms[creep.room.name].sources_id
// creep.room.controller
export const upgrader_work = function(creep: Creep){
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false
        creep.memory.path = null
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.memory.path = null
        creep.say('🚧 upgrade');
    }
    if(creep.memory.is_working) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            let target = creep.room.controller
            if (creep.pos.inRangeTo(target, 4)){
                creep.moveTo(target, {visualizePathStyle: {stroke: '#808080'}});
            }
            else{
                if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                    creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    // creep.memory.path = creep.pos.findPathTo(target);
                }
                let code = creep.moveByPath(creep.memory.path)
                if (code == ERR_NOT_FOUND){
                    creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    // creep.memory.path = creep.pos.findPathTo(target);
                }
            }
            // creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
        }
    }
    else {
        let source: Source
        source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
        let code:number = creep.harvest(source)
        if (code == ERR_NOT_IN_RANGE){
            let target = source
            if (creep.pos.inRangeTo(target, 4)){
                creep.moveTo(target, {visualizePathStyle: {stroke: '#808080'}});
            }
            else{
                if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                    creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    // creep.memory.path = creep.pos.findPathTo(target);
                }
                let code = creep.moveByPath(creep.memory.path)
                if (code == ERR_NOT_FOUND){
                    creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    // creep.memory.path = creep.pos.findPathTo(target);
                }
            }
        }
        else if (code != ERR_BUSY && code != OK && code != ERR_NOT_ENOUGH_ENERGY){
            console.log(Game.time, 'level1 harvester_work', code)
        }
    }
}