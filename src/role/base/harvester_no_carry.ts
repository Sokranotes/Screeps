export const energy_harvester_no_carry_work = function(creep: Creep, roomName: string){
    // creep.say('👋 Here');
    var source: Source = Game.getObjectById(creep.room.memory.source_ids[creep.memory.source_idx])
    var code:number = creep.harvest(source)
    if (code == OK){
        ;
    }
    else if (code == ERR_NOT_IN_RANGE) creep.moveTo(creep.memory.container_pos, {visualizePathStyle: {stroke: '#808080'}});
    else if (code == ERR_NOT_OWNER){
        console.log(creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER")
        creep.say('⚠️ ' + creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER");
    }
    else if (code == ERR_INVALID_TARGET){
        console.log(creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET")
        creep.say('⚠️ ' + creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET");
    }
    else if (code == ERR_NOT_FOUND || code == ERR_NOT_ENOUGH_RESOURCES || code == ERR_TIRED || code == ERR_NO_BODYPART){
        // code == ERR_BUSY: 忽略
        console.log(creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code)
        creep.say('⚠️ ' + creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code);
    }
    // if (creep.ticksToLive < ){
    //     // creep快死亡，提前返回控制信息，使得控制程序读取该creep的memory，从而生成新的creep
    // }
}