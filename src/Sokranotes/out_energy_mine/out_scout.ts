import * as $ from "../../modules/超级移动优化"

export const out_scout_work = function(creep: Creep){
    if (Memory.rooms[creep.memory.source_roomName] == undefined){
        if (creep.room.name != creep.memory.source_roomName){
            // creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            let target = new RoomPosition(25, 25, creep.memory.source_roomName)
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
        }
        else{
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if(hostiles.length > 0) {
                creep.room.memory.war_flag = true
                creep.room.memory.enemy_num = hostiles.length
                creep.moveTo(new RoomPosition(25, 25, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            }
            else{
                creep.room.memory.war_flag = false
                creep.room.memory.enemy_num = 0
                if (creep.pos.x < 2|| creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
                }
            }
        }
    }
    else if (Memory.rooms[creep.memory.source_roomName].invader_died_tick == undefined || Memory.rooms[creep.memory.source_roomName].invader_died_tick <= Game.time){
        if (creep.room.name != creep.memory.source_roomName){
            creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        else{
            var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
            if(hostiles.length > 0) {
                creep.room.memory.war_flag = true
                creep.room.memory.enemy_num = hostiles.length
                creep.moveTo(new RoomPosition(25, 25, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            }
            else{
                creep.room.memory.war_flag = false
                creep.room.memory.enemy_num = 0
                if (creep.pos.x < 2|| creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
                    creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
                }
            }
        }
    }
}