import * as $ from "../modules/超级移动优化"

export const out_soldier_work = function(creep: Creep){
    if (creep.room.name != creep.memory.source_roomName){
        creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
    }
    else{
        if (creep.pos.x > 47 || creep.pos.x < 2 || creep.pos.y < 2 || creep.pos.y > 47){
            creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        var invade_targets: Creep[] = creep.room.find(FIND_HOSTILE_CREEPS);
        if (invade_targets.length > 0)
        {
            creep.room.memory.war_flag = true
            creep.room.memory.enemy_num = invade_targets.length
            if (creep.rangedAttack(invade_targets[0]) != OK)
            {
                creep.moveTo(invade_targets[0])
            }
        }
        else{
            creep.room.memory.war_flag = false
            creep.room.memory.enemy_num = 0
            if (creep.memory.dest_roomName == 'W47S15'){
                creep.moveTo(new RoomPosition(26, 21, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            }
            else{
                creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            }
        }
    }
}