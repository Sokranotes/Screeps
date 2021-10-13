import * as $ from "../../modules/超级移动优化"

export const upgrader_work = function(creep: Creep){
    // creep.say('🔄 Here');
    // 如果在升级且没能量了，那退出升级状态
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.memory.path = null
        creep.say('🔄 harvest');
    }
    // 如果在采集能量且满了，那退出采集状态
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.memory.path = null
        creep.say('🚧 upgrade');
    }
    if(creep.memory.is_working) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {//距离够则升级控制器
            let target = creep.room.controller
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
            // creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
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
            console.log(Game.time, 'upgrader_work', code)
        }
    }
}