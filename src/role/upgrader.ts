// import * as $ from '../超级移动优化bypass (临时)'

export const upgrader_work = function(creep: Creep, roomName: string){
    // if (creep.room.name != roomName){
    //     if (creep.room.name == 'W47S15'){
    //         creep.moveTo(new RoomPosition(4, 0, 'W47S15'), {visualizePathStyle: {stroke: '#ff0000'}})
    //     }
    // }
    // if (creep.room.name != roomName){
    //     creep.moveTo(new RoomPosition(49, 31, 'w48S14'), {visualizePathStyle: {stroke: '#ff0000'}})
    // }
    // console.log(creep.memory.is_working)
    // creep.memory.source_idx = 0
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 upgrade');
    }
    if(creep.memory.is_working) {
        // creep.say('🚧 upgrade');
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {//距离够则升级控制器
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
        }
    }
    else {
        // creep.say('🔄 harvest');
        // creep.memory.source_idx = 1  //近的这个，坐标13 29
        var source: Source
        // console.log(creep.room.memory.source_ids == undefined)
        if (creep.room.memory.source_ids == undefined){
            var sources = creep.room.find(FIND_SOURCES)
            Memory.rooms[roomName].source_ids = new Array(sources.length)
            for (var i: number = 0; i < sources.length; i++){
                Memory.rooms[roomName].source_ids[i] = sources[i].id;
            }            
        }
        source = Game.getObjectById(Memory.rooms[roomName].source_ids[creep.memory.source_idx])
        // if (!source){
        //     source = Game.getObjectById(Memory.rooms[roomName].source_ids[1-creep.memory.source_idx])
        // }
        var code:number
        var flag: number = 1
        code = creep.harvest(source)
        if (code == OK){
            flag = 0
        }
        else if (code == ERR_NOT_IN_RANGE) creep.moveTo(source, {visualizePathStyle: {stroke: '#808080'}});
        else if (code == ERR_NOT_ENOUGH_RESOURCES) {
            // console.log(creep.name + ' change source to :' + (1 - creep.memory.source_idx))
            // creep.memory.source_idx = 1 - creep.memory.source_idx
            if (flag == 0){
                console.log('挖光了,剩余时间：' + source.ticksToRegeneration)
            }
            var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE || 
                        structure.structureType == STRUCTURE_CONTAINER) && 
                structure.store.getCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(containers.length > 0) {
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#808080'}});
                }
            }
        }
        else if (code == ERR_INVALID_TARGET){
            var sources = creep.room.find(FIND_SOURCES)
            Memory.rooms[roomName].source_ids = new Array(sources.length)
            for (var i: number = 0; i < sources.length; i++){
                Memory.rooms[roomName].source_ids[i] = sources[i].id;
            }
        }
        else if (code == ERR_NOT_OWNER  || code == ERR_NOT_FOUND || code == ERR_TIRED || code == ERR_NO_BODYPART){
            // || code == ERR_BUSY: 忽略
            console.log("code: " + code + " upgrader line 58")
        }
    }
}
