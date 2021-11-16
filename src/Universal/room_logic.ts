import { level1_logic } from "./room_base/level1/level1_logic"
import { level2_logic } from "./room_base/level2/level2_logic"
import { level3_logic } from "./room_base/level3/level3_logic"
import { level4_logic } from "./room_base/level4/level4_logic"
import { room_init } from "./room_init"
import { doing } from "./room_base/universal_logic/spawn";
import { attack_invader_core_work } from "./room_base/W16N18tmp/attack_invader_core"
import { base_transfer_work } from "@/Sokranotes/room_base/base_transfer"

export const room_logic = function(roomName: string){
    if (Game.rooms[roomName]){
        if (Game.rooms[roomName].controller){
            if (Game.rooms[roomName].controller.my){
                room_init(roomName)
                switch(Game.rooms[roomName].controller.level){
                    case 1:
                        level1_logic(roomName)
                        break
                    case 2:
                        level2_logic(roomName)
                        break
                    case 3:
                        level3_logic(roomName)
                        break
                    case 4:
                        level4_logic(roomName)
                        break
                    default:
                        level4_logic(roomName)
                }
                doing(Game.spawns)
            }
            else{
                console.log(Game.time, 'room_logic', roomName, 'controller is not my')
            }
        }
        else{
            console.log(Game.time, 'room_logic', roomName, 'without controller')
        }
    }
    else{
        console.log(Game.time, 'room_logic', roomName, 'undefined')
    }

    if (roomName == 'W16N18'){
        for(let name in Memory.creeps) {
            let creep = Game.creeps[name]
            if(!creep) {
                delete Memory.creeps[name];
            }
            else{
                // Game.spawns[spawnName].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], 'attack_invader_core'+Game.time, {memory: {role: 'attack_invader_core'}});
                if (creep.memory.role == 'attack_invader_core'){
                    attack_invader_core_work(creep)
                }
                else if (creep.memory.role == 'base_transfer'){
                    base_transfer_work(creep)
                }
            }
        }
    }
}