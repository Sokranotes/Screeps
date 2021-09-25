import * as $ from "../modules/超级移动优化"

export const out_energy_harvester_no_carry_work = function(creep: Creep){
    // creep.say('👋 Here');
    var source_room: Room = Game.rooms[creep.memory.source_roomName]
    if (source_room.memory.war_flag == true){
        creep.memory.is_working = false
        creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#808080'}})
    }
    else{
        if (creep.memory.is_working == true){
            var source: Source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
            var code:number = creep.harvest(source)
            if (code == OK){
            }
            else if (code == ERR_NOT_IN_RANGE){
                
            }
            else if (code == ERR_NOT_OWNER){
                console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER")
                creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER");
            }
            else if (code == ERR_INVALID_TARGET){
                console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET")
                creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET");
            }
            else if (code == ERR_NOT_FOUND || code == ERR_TIRED || code == ERR_NO_BODYPART){
                // code == ERR_BUSY: 忽略
                console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code)
                creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code);
            }
            if (creep.ticksToLive < 50){
                // creep快死亡，提前返回控制信息，使得控制程序读取该creep的memory，从而生成新的creep
                source_room.memory.source_harvester_states[creep.memory.source_container_idx] -= 1
            }
        }
        else{
            if (creep.pos.x == creep.memory.container_pos_x && creep.pos.y == creep.memory.container_pos_y){
                creep.memory.is_working = true
            }
            creep.moveTo(new RoomPosition(creep.memory.container_pos_x, creep.memory.container_pos_y, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#808080'}})
        }
    }
}