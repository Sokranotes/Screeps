import * as $ from "../modules/超级移动优化"

export const out_soldier_work = function(creep: Creep, homeName: string, destName: string){
    if (creep.room.name == homeName){
        creep.moveTo(new RoomPosition(25, 25, destName), {visualizePathStyle: {stroke: '#ff0000'}})
    }
    else{
        if (creep.pos.x > 47 || creep.pos.x < 2 || creep.pos.y < 2 || creep.pos.y > 47){
            creep.moveTo(new RoomPosition(25, 25, destName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        var invade_targets: Creep[] = creep.room.find(FIND_HOSTILE_CREEPS);
        if (invade_targets.length)
        {
            creep.room.memory.war_flag = true
            if (creep.rangedAttack(invade_targets[0]) != OK)
            {
                creep.moveTo(invade_targets[0])
            }
        }
        else{
            creep.room.memory.war_flag = false
            creep.moveTo(new RoomPosition(25, 25, destName), {visualizePathStyle: {stroke: '#ff0000'}})
            Game.rooms[destName].memory.war_flag = false
        }
    }
}