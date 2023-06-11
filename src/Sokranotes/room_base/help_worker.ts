// Game.spawns['Spawn2'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'help' + Game.time, {memory: {role: 'help', source_idx: 0, dest_roomName: 'W12N13'}})

import { get_role_workers } from "@/Universal/room_base/universal_logic/check_spawn_queue"

export const help_work = function(creep: Creep){
    if (creep.memory.dest_roomName == 'W11N19'){
        let dest_roomName: string = 'W11N19'
        if (creep.room.name != dest_roomName){
            if (creep.room.name == "W14N12") creep.moveTo(new RoomPosition(25, 25, "W14N13"))
            if (creep.room.name == "W14N13") creep.moveTo(new RoomPosition(25, 25, "W13N13"))
            if (creep.room.name == "W13N13") creep.moveTo(new RoomPosition(25, 25, "W12N13"))
            if (creep.room.name == "W12N13") creep.moveTo(new RoomPosition(25, 25, "W12N14"))
            if (creep.room.name == "W12N14") creep.moveTo(new RoomPosition(25, 25, "W12N15"))
            if (creep.room.name == "W12N15") creep.moveTo(new RoomPosition(25, 25, "W11N15"))
            if (creep.room.name == "W11N15") creep.moveTo(new RoomPosition(25, 25, "W11N16"))
            if (creep.room.name == "W11N16") creep.moveTo(new RoomPosition(25, 25, "W11N17"))
            if (creep.room.name == "W11N17") creep.moveTo(new RoomPosition(25, 25, "W11N18"))
            if (creep.room.name == "W11N18") creep.moveTo(new RoomPosition(25, 25, "W11N19"))
            // creep.moveTo(new RoomPosition(25, 25, dest_roomName))
        }
        else{
            if ((creep.pos.x < 2 || creep.pos.y < 2 || creep.pos.x > 47 || creep.pos.y > 47) && creep.room.name == dest_roomName)
                creep.moveTo(new RoomPosition(25, 25, dest_roomName))
            else{
                // creep.memory.role = 'builder'
                creep.memory.help = true
                if (get_role_workers('hu', dest_roomName, 0).length > 0)
                    creep.memory.role = 'hb'
                else{
                    creep.memory.role = 'hu'
                }
            }
        }
    }
    else if (creep.memory.dest_roomName == 'W12N13'){
        let dest_roomName: string = 'W12N13'
        if (creep.room.name != dest_roomName){
            creep.moveTo(new RoomPosition(25, 25, dest_roomName))
        }
        else{
            if ((creep.pos.x < 2 || creep.pos.y < 2 || creep.pos.x > 47 || creep.pos.y > 47) && creep.room.name == dest_roomName)
                creep.moveTo(new RoomPosition(25, 25, dest_roomName))
            else{
                // creep.memory.role = 'builder'
                creep.memory.help = true
                if (get_role_workers('hu', dest_roomName, 0).length > 0)
                    creep.memory.role = 'hb'
                else{
                    creep.memory.role = 'hu'
                }
            }
        }
    }
    else if (creep.memory.dest_roomName == 'W12N15'){
        let dest_roomName: string = 'W12N15'
        if (creep.room.name != dest_roomName){
            if (creep.room.name == "W14N12") creep.moveTo(new RoomPosition(25, 25, "W14N13"))
            if (creep.room.name == "W14N13") creep.moveTo(new RoomPosition(25, 25, "W13N13"))
            if (creep.room.name == "W13N13") creep.moveTo(new RoomPosition(25, 25, "W12N13"))
            if (creep.room.name == "W12N13") creep.moveTo(new RoomPosition(25, 25, "W12N14"))
            if (creep.room.name == "W12N14") creep.moveTo(new RoomPosition(25, 25, "W12N15"))
            // creep.moveTo(new RoomPosition(25, 25, dest_roomName))
        }
        else{
            if ((creep.pos.x < 2 || creep.pos.y < 2 || creep.pos.x > 47 || creep.pos.y > 47) && creep.room.name == dest_roomName)
                creep.moveTo(new RoomPosition(25, 25, dest_roomName))
            else{
                // creep.memory.role = 'builder'
                creep.memory.help = true
                if (get_role_workers('hu', dest_roomName, 0).length > 0){
                    creep.memory.role = 'hb'
                    creep.memory.source_idx = 1
                    delete creep.memory.help
                }
                else{
                    creep.memory.role = 'hus'
                    creep.memory.source_idx = 0
                    delete creep.memory.help
                }
            }
        }
    }
    else if (creep.memory.dest_roomName == 'E29N3'){
        // Game.spawns['Spawn2'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE, MOVE
        //                                   MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //                                   WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //                                   CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'help' + Game.time, {memory: {role: 'help', source_idx: 0, dest_roomName: 'E29N3'}})
        // Game.spawns['Spawn2'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], 'help' + Game.time, {memory: {role: 'help', source_idx: 0, dest_roomName: 'E29N3'}})
        let dest_roomName: string = 'E29N3'
        if (creep.room.name != "E29N3"){
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
                creep.moveTo(new RoomPosition(46, 49, "E27N4"))
            }
            else if (creep.room.name == "E27N3"){
                creep.moveTo(new RoomPosition(49, 3, "E27N3"))
            }
            else if (creep.room.name == "E28N3"){
                let con: StructureContainer = Game.getObjectById<StructureContainer>("62496d61d02368325f9a3fe4" as Id<StructureContainer>)
                if (creep.store.getFreeCapacity() == 0 && con){
                    if (creep.pos.isNearTo(con)) creep.withdraw(con, RESOURCE_ENERGY)
                    else creep.moveTo(con)
                }
                else{
                    creep.moveTo(new RoomPosition(49, 27, "E28N3"))
                }
            }
            else creep.moveTo(new RoomPosition(25, 25, "W14N13"))
        }
        else{
            if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
                creep.moveTo(new RoomPosition(30, 11, "E29N3"))
            }
            else{
                // creep.memory.role = 'builder'
                creep.memory.help = true
                if (get_role_workers('hu', dest_roomName, 0).length > 0){
                    creep.memory.role = 'hb'
                    creep.memory.source_idx = 1
                    delete creep.memory.help
                }
                else{
                    creep.memory.role = 'hu'
                    creep.memory.source_idx = 0
                    delete creep.memory.help
                }
            }
        }
    }
    else if (creep.memory.dest_roomName == 'W41S6'){
        // Game.spawns['Spawn2'].spawnCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CLAIM], 'help' + Game.time, {memory: {role: 'help', source_idx: 0, dest_roomName: 'W41S6'}})
        if (creep.room.name != "W41S6"){
            creep.moveTo(new RoomPosition(35, 25, "W41S6"))
        }
        else{
            if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
                creep.moveTo(new RoomPosition(30, 11, "W41S6"))
            }
            else{
                creep.moveTo(new RoomPosition(29, 28, "W41S6"))
                if (creep.pos.x == 29 && creep.pos.y == 28){
                    creep.claimController(Game.getObjectById("5bbcaac79099fc012e6322e0" as Id<StructureController>))
                }
            }
        }
    }
}