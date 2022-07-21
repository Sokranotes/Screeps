// Game.spawns['Spawn3'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM], 'c', {memory: {role: 'occupy'}})

export const occupy_work = function(creep: Creep){
    // creep.say('🔄 Here');
    // let controller: StructureController = Game.getObjectById('5bbcac499099fc012e6353b2')
    // let room_name: string = "W11N19"
    // if (creep.room.name != room_name){
    //     if (creep.room.name == "W14N12") creep.moveTo(new RoomPosition(25, 25, "W14N13"))
    //     if (creep.room.name == "W14N13") creep.moveTo(new RoomPosition(25, 25, "W13N13"))
    //     if (creep.room.name == "W13N13") creep.moveTo(new RoomPosition(25, 25, "W12N13"))
    //     if (creep.room.name == "W12N13") creep.moveTo(new RoomPosition(25, 25, "W12N14"))
    //     if (creep.room.name == "W12N14") creep.moveTo(new RoomPosition(25, 25, "W12N15"))
    //     if (creep.room.name == "W12N15") creep.moveTo(new RoomPosition(25, 25, "W11N15"))
    //     if (creep.room.name == "W11N15") creep.moveTo(new RoomPosition(25, 25, "W11N16"))
    //     if (creep.room.name == "W11N16") creep.moveTo(new RoomPosition(25, 25, "W11N17"))
    //     if (creep.room.name == "W11N17") creep.moveTo(new RoomPosition(25, 25, "W11N18"))
    //     if (creep.room.name == "W11N18") creep.moveTo(new RoomPosition(25, 25, "W10N18"))
    //     if (creep.room.name == "W10N18") creep.moveTo(new RoomPosition(25, 25, "W10N19"))
    //     if (creep.room.name == "W10N19") creep.moveTo(new RoomPosition(25, 25, "W11N19"))
    //     // creep.moveTo(new RoomPosition(25, 25, room_name))
    // }
    // else{
    //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     }
    //     else{
    //         let code = creep.claimController(controller)
    //         if (code == ERR_NOT_IN_RANGE){
    //             creep.moveTo(controller)
    //         }
    //         else{
    //             creep.signController(controller, "6g3y yyds.")
    //         }
    //     }
    // }

    creep.say("I am here.")
    let room_name: string = "E29N3"
    if (creep.room.name != room_name){
        if (creep.room.name == "W14N12") creep.moveTo(new RoomPosition(25, 25, "W14N13"))
        else if (creep.room.name == "W14N13") creep.moveTo(new RoomPosition(25, 25, "W15N13"))
        else if (creep.room.name == "W15N13") {
            creep.moveTo(new RoomPosition(35, 0, "W15N13"))
        }
        else if (creep.room.name == "W15N14"){
            creep.say("I am here. " + creep.pos.y)
            if (creep.pos.y > 22) creep.moveTo(new RoomPosition(22, 22, "W15N14"))
            else creep.moveTo(new RoomPosition(28, 0, "W15N14"))
        }
        else if (creep.room.name == "W15N15"){
            creep.moveTo(new RoomPosition(38, 34, "W15N15"))
        }
        else if (creep.room.name == "E25N5"){
            creep.moveTo(new RoomPosition(24, 49, "E25N5"))
        }
        else if (creep.room.name == "E25N4"){
            creep.moveTo(new RoomPosition(49, 18, "E25N4"))
        }
        else if (creep.room.name == "E26N4"){
            if (creep.pos.x < 16) creep.moveTo(new RoomPosition(16, 19, "E26N4"))
            else if (creep.pos.x < 35) creep.moveTo(new RoomPosition(35, 3, "E26N4"))
            else creep.moveTo(new RoomPosition(49, 13, "E26N4"))
        }
        else if (creep.room.name == "E27N4"){
            // creep.moveTo(new RoomPosition(27, 6, "E27N4"))
            // creep.signController(Game.getObjectById('5bbcae7f9099fc012e6392d5'), "do not spawn here.")
            creep.moveTo(new RoomPosition(46, 49, "E27N4"))
        }
        else if (creep.room.name == "E27N3") creep.moveTo(new RoomPosition(49, 3, "E27N3"))
        else if (creep.room.name == "E28N3")  creep.moveTo(new RoomPosition(49, 27, "E28N3"))
        // creep.moveTo(new RoomPosition(25, 25, room_name))
    }
    else{
        if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
            creep.moveTo(new RoomPosition(30, 11, room_name))
        }
        else{
            if (creep.pos.x != 30 || creep.pos.y != 11){
                creep.moveTo(new RoomPosition(30, 11, room_name))
            }
            else{
                let controller: StructureController = Game.getObjectById<StructureController>('5bbcaea59099fc012e6395ef' as Id<StructureController>)
                creep.claimController(controller)
                creep.signController(controller, "Thanks to ExtraDim for the gift.")
            }
        }
    }
}