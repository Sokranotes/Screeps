/* 
room controller is my
need spawn, extension, road, tower site

place flag: Game.flags.check_towers_id_flag, in this room to update the towers_id of this room

level3 todo:
harvester place is not enough
tower attack priority and judge
*/

import { harvest_upgrade_work } from "../level1/harvest_upgrade_worker";
import { harvest_build_work } from "../level2/harvest_build_worker";
import { harvest_repair_work } from "../level2/harvest_repair_worker";
import { harvest_fill_work } from "../level2/harvest_fill_worker";
import { tower_work } from "./tower";
import { level3_check_spawn_queue } from "./level3_check_spawn_queue";

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

    for(let name in Memory.creeps) {
        let creep = Game.creeps[name]
        if(!creep) {
            delete Memory.creeps[name];
        }
        else{
            if(creep.memory.role == 'hu') {
                harvest_upgrade_work(creep);
            }
            else if (creep.memory.role == 'hb'){
                harvest_build_work(creep)
            }
            else if (creep.memory.role == 'hf'){
                harvest_fill_work(creep)
            }
            else if (creep.memory.role == 'hr'){
                harvest_repair_work(creep)
            }
        }
    }
    
    if (room.memory.check_spawn_queue_flag || Game.time%100){
        level3_check_spawn_queue(roomName)
        delete room.memory.check_spawn_queue_flag
    }
}