// Game.spawns['Spawn3'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM], 'c', {memory: {role: 'occupy'}})

export const occupy_work = function(creep: Creep){
    // creep.say('🔄 Here');
    let controller: StructureController = Game.getObjectById('5bbcac499099fc012e6353b2')
    let room_name: string = "W11N19"
    if (creep.room.name != room_name){
        if (creep.room.name == "W14N12") creep.moveTo(new RoomPosition(25, 25, "W14N13"))
        if (creep.room.name == "W14N13") creep.moveTo(new RoomPosition(25, 25, "W13N13"))
        if (creep.room.name == "W13N13") creep.moveTo(new RoomPosition(25, 25, "W12N13"))
        if (creep.room.name == "W12N13") creep.moveTo(new RoomPosition(25, 25, "W12N14"))
        if (creep.room.name == "W12N14") creep.moveTo(new RoomPosition(25, 25, "W12N15"))
        if (creep.room.name == "W12N15") creep.moveTo(new RoomPosition(25, 25, "W11N15"))
        if (creep.room.name == "W11N15") creep.moveTo(new RoomPosition(25, 25, "W11N16"))
        if (creep.room.name == "W11N16") creep.moveTo(new RoomPosition(25, 25, "W11N17"))
        if (creep.room.name == "W11N17") creep.moveTo(new RoomPosition(25, 25, "W11N18"))
        if (creep.room.name == "W11N18") creep.moveTo(new RoomPosition(25, 25, "W10N18"))
        if (creep.room.name == "W10N18") creep.moveTo(new RoomPosition(25, 25, "W10N19"))
        if (creep.room.name == "W10N19") creep.moveTo(new RoomPosition(25, 25, "W11N19"))
        // creep.moveTo(new RoomPosition(25, 25, room_name))
    }
    else{
        if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
            creep.moveTo(new RoomPosition(25, 25, room_name))
        }
        else{
            let code = creep.claimController(controller)
            if (code == ERR_NOT_IN_RANGE){
                creep.moveTo(controller)
            }
            else{
                creep.signController(controller, "6g3y yyds.")
            }
        }
    }
}