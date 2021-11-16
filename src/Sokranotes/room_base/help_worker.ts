// Game.spawns['Spawn4'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'help' + Game.time, {memory: {role: 'help', source_idx: 1}})

export const help_work = function(creep: Creep){
    if (creep.room.name != 'W41S6'){
        if (creep.room.name == 'W47S14')
            creep.moveTo(new RoomPosition(25, 25, 'W47S13'))
        else if (creep.room.name == 'W47S13')
            creep.moveTo(new RoomPosition(25, 25, 'W47S12'))
        else if (creep.room.name == 'W47S12')
            creep.moveTo(new RoomPosition(25, 25, 'W47S11'))
        else if (creep.room.name == 'W47S11')
            creep.moveTo(new RoomPosition(25, 25, 'W47S10'))
        else if (creep.room.name == 'W47S10')
            creep.moveTo(new RoomPosition(25, 25, 'W46S10'))
        else if (creep.room.name == 'W46S10')
            creep.moveTo(new RoomPosition(25, 25, 'W45S10'))
        else if (creep.room.name == 'W45S10')
            creep.moveTo(new RoomPosition(25, 25, 'W44S10'))
        else if (creep.room.name == 'W44S10')
            creep.moveTo(new RoomPosition(25, 25, 'W43S10'))
        else if (creep.room.name == 'W43S10')
            creep.moveTo(new RoomPosition(25, 25, 'W43S9'))
        else
            creep.moveTo(new RoomPosition(25, 25, 'W41S6'))
    }
    else{
        if ((creep.pos.x < 2 || creep.pos.y < 2 || creep.pos.x > 47 || creep.pos.y > 47) && creep.room.name == 'W41S6')
            creep.moveTo(new RoomPosition(25, 25, 'W41S6'))
        else{
            // creep.memory.role = 'builder'
            creep.memory.role = 'hu'
        }
    }
}