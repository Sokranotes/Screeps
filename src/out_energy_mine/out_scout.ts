import * as $ from "../modules/超级移动优化"

export const out_scout_work = function(creep: Creep){
    if (creep.room.name != creep.memory.dest_roomName){
        creep.moveTo(new RoomPosition(25, 25, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
    }
    else{
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            creep.room.memory.war_flag = true
            creep.room.memory.enemy_num = hostiles.length
            // console.log(Game.time + creep.memory.dest_roomName + ' 发现敌军 ', hostiles.length, ' owner:', hostiles[0].owner.username)
            creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        else{
            creep.room.memory.war_flag = false
            creep.room.memory.enemy_num = 0
            if (creep.pos.x < 2|| creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
                creep.moveTo(new RoomPosition(25, 25, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            }
        }
    }
}