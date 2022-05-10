/* 
room controller is my
need spawn, extension, road, tower site

place flag: Game.flags.check_towers_id_flag, in this room to update the towers_id of this room

level3 todo:
harvester place is not enough
tower attack priority and judge
*/

import { check_towers_id, tower_work } from "./tower";
import { level3_check_spawn_queue } from "./level3_check_spawn_queue";

export const level3_logic = function(roomName){
    let room = Game.rooms[roomName]
    if (room.memory.towers_id == undefined){
        if (Game.time % 100 == 0){
            check_towers_id(room)
        }
    }
    else{
        if (Game.flags.check_towers_id_flag && Game.flags.check_towers_id_flag.room.name == roomName){
            check_towers_id(room)
            Game.flags.check_towers_id_flag.remove()
        }
        tower_work(roomName)
    }
    
    if (room.memory.spawning == undefined && (room.memory.check_spawn_queue_flag || 
        (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName))){
        level3_check_spawn_queue(roomName)
        if (room.memory.check_spawn_queue_flag)
            delete room.memory.check_spawn_queue_flag
        if (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName){
            Game.flags.check_spawn_queue_flag.remove()
        }
    }
}