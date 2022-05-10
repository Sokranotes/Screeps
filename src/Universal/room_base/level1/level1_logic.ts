import { level1_check_spawn_queue } from './level1_check_spawn_queue';
import { harvest_upgrade_work } from "./harvest_upgrade_worker";

export const level1_logic = function(roomName: string){
    let room = Game.rooms[roomName]
    if (room.memory.spawning == undefined && (room.memory.check_spawn_queue_flag || 
        (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName))){
        level1_check_spawn_queue(roomName)
        if (room.memory.check_spawn_queue_flag)
            delete room.memory.check_spawn_queue_flag
        if (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName){
            Game.flags.check_spawn_queue_flag.remove()
        }
    }
}