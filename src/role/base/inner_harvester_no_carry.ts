// import * as $ from "./../../超级移动优化"

export const outharvester_work = function(creep: Creep, roomName: string){
    // creep.say('🔄 Here');
    var source: Source
    
    if (creep.room.memory.source_ids == undefined){
        var sources = creep.room.find(FIND_SOURCES)
        Memory.rooms[creep.room.name].source_ids = new Array(sources.length)
        for (var i: number = 0; i < sources.length; i++){
            Memory.rooms[creep.room.name].source_ids[0] = single_source.id;
        }
    }
    creep.memory.source_idx = 0
    // console.log(creep.memory.source_idx)
    source = Game.getObjectById(Memory.rooms[creep.room.name].source_ids[creep.memory.source_idx])
    var code:number
    code = creep.harvest(source)
    // console.log(creep.name, ' ', code)
    var flag: number = 1
    if (code == OK){
        flag = 0
    }
    else if (code == ERR_NOT_IN_RANGE) creep.moveTo(source, {visualizePathStyle: {stroke: '#808080'}});
    else if (code == ERR_NOT_ENOUGH_RESOURCES) {
        if (flag == 0){
            console.log('挖光了,剩余时间：' + source.ticksToRegeneration)
        }
    }
    else if (code == ERR_INVALID_TARGET){
        var single_source = creep.pos.findClosestByRange(FIND_SOURCES)
        Memory.rooms[creep.room.name].source_ids = new Array(1)
        Memory.rooms[creep.room.name].source_ids[0] = single_source.id;
    }
    else if (code == ERR_NOT_OWNER  || code == ERR_NOT_FOUND || code == ERR_TIRED || code == ERR_NO_BODYPART){
        // code == ERR_BUSY: 忽略
        console.log("code: " + code + " havester line 45")
    }
}