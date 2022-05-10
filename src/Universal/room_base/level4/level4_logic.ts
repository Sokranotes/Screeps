/* 
room controller is my
need spawn, extension site or road site

place flag: Game.flags.check_towers_id_flag, in this room to update the towers_id of this room

level4 todo:
judge room road state-->determine the bodys
restart harvester bodys auto adjustment
harvester and transfer separate
 */

import { tower_work } from "./../level3/tower";
import { level3_check_spawn_queue } from "./../level3/level3_check_spawn_queue";

const check_towers_id = function(room: Room){
    let towers: StructureTower[] = room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
            return structure.structureType == STRUCTURE_TOWER
        }
    })
    Memory.rooms[room.name].towers_id = new Array(towers.length)
    for (let i: number = 0; i < towers.length; i++){
        Memory.rooms[room.name].towers_id[i] = towers[i].id;
    }
}

export const level4_logic = function(roomName){
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