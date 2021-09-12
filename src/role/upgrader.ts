export const upgrader_work = function(creep: Creep, roomName: string){
    // if (creep.room.name != roomName){
    //     if (creep.room.name == 'W47S15'){
    //         creep.moveTo(new RoomPosition(4, 0, 'W47S15'), {visualizePathStyle: {stroke: '#ff0000'}})
    //     }
    // }
    // if (creep.room.name != roomName){
    //     creep.moveTo(new RoomPosition(49, 31, 'w48S14'), {visualizePathStyle: {stroke: '#ff0000'}})
    // }
    console.log(creep.memory.is_working)
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
        if (!source){
            source = Game.getObjectById(Memory.rooms[roomName].source_ids[1-creep.memory.source_idx])
        }
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#808080'}});
        }
        if (creep.harvest(source) == ERR_NOT_ENOUGH_RESOURCES)
        {
            console.log(creep.name + ' change source to :' + (1 - creep.memory.source_idx))
            creep.memory.source_idx = 1 - creep.memory.source_idx
        }
        if (creep.harvest(source) == ERR_INVALID_TARGET)
        {
            var sources = creep.room.find(FIND_SOURCES)
            Memory.rooms[roomName].source_ids = new Array(sources.length)
            for (var i: number = 0; i < sources.length; i++){
                Memory.rooms[roomName].source_ids[i] = sources[i].id;
            }
        }
    }
}
