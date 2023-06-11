import { out_room_energy_mine } from "@/Sokranotes/out_energy_mine/out_room_energy_mine";
import { different_role_work } from '@/Sokranotes/different_role_work';
import { room_W47S14_running } from '@/Sokranotes/room_W47S14';
import { room_W48S12_running } from '@/Sokranotes/room_W48S12';
import { room_logic } from "@/Universal/room_logic";
import { room_W41S6_running } from "./room_W41S6";
import { doing } from "@/Universal/room_base/universal_logic/spawn";
import { sell_energy } from "./sell_energy";
import { random } from "lodash"
import { room_W44S12_running } from "./room_W44S12";

// room init
// if (Memory.rooms['W47S14'] == undefined)
//     Memory.rooms['W47S14'] = {}
// if (Memory.rooms['W48S12'] == undefined)
//     Memory.rooms['W48S12'] = {}

// push init
if (Game.flags.Sokranotes){
    console.log(Game.time, 'Sokranotes new push')
}

global.terminal_energy_bottom_limit = 0 // terminal中最低能量
global.terminal_energy_top_limit = 100000 // terminal中最高能量
global.terminal_energy_bottom_free_limit = 0 // free capacity 大于该值往terminal中放能量
global.terminal_energy_top_free_limit = 30000 // free capacity小于该值从terminal中取出能量

export const Sokranotes = function(){
    
    let rooms: string[] = ['W47S14', 'W41S6', 'W48S12', 'W44S12']
    if (Game.time % 100 == 77){
        for (let roomName of rooms){
            Memory.rooms[roomName].check_spawn_queue_flag = true
        }
    }
    // room_logic('W41S6')

    room_W47S14_running('W47S14')

    room_W48S12_running('W48S12')

    room_W41S6_running('W41S6')

    room_W44S12_running('W44S12')
    // room_logic('W44S12')

    if (Game.time % 10 == 4){
        let spawnName = 'Spawn4'
        let transfer_num = [1, 1]
        let harvester_num = [1, 1]
        out_room_energy_mine('W48S14', 'W47S14', spawnName, harvester_num, transfer_num)

        spawnName = 'Spawn3'
        transfer_num = [2, 2]
        harvester_num = [1, 1]
        out_room_energy_mine('W47S13', 'W47S14', spawnName, harvester_num, transfer_num)

        spawnName = 'Spawn1'
        transfer_num = [1, 2]
        harvester_num = [1, 1]
        out_room_energy_mine('W47S15', 'W47S14', spawnName, harvester_num, transfer_num)

        // spawnName = 'Spawn4'
        // transfer_num = [1, 2]
        // harvester_num = [1, 1]
        // out_room_energy_mine('W48S15', 'W47S14', spawnName, harvester_num, transfer_num)

        // spawnName = 'Spawn3'
        // transfer_num = [2, 2]
        // harvester_num = [1, 1]
        // out_room_energy_mine('W46S13', 'W47S14', spawnName, harvester_num, transfer_num)
    }

    for (let idx in rooms){
        delete Game.rooms[rooms[idx]].memory.spawning
    }
    doing(Game.spawns)

    different_role_work()

    for (let idx in rooms){
        let interval: number = 37 + random(0, 5, false)
        if (Game.time % interval == 0 && rooms[idx] != "W41S6"){
            if (Game.rooms[rooms[idx]].terminal.store.energy > 0.8*global.terminal_limit){
                let tmp_capacity: number = Game.rooms["W41S6"].terminal.store.getFreeCapacity()
                if (tmp_capacity > Game.rooms[rooms[idx]].terminal.store.getUsedCapacity(RESOURCE_ENERGY)) tmp_capacity = 2/3*Game.rooms[rooms[idx]].terminal.store.getUsedCapacity(RESOURCE_ENERGY)
                if (tmp_capacity > 11000){
                    console.log(rooms[idx], ' -> W41S6 energy', tmp_capacity-1000, " code:", Game.rooms[rooms[idx]].terminal.send(RESOURCE_ENERGY, tmp_capacity-1000, 'W41S6', 'resource allocation'))
                }
            }
        }
    }

    for (let idx in rooms){
        sell_energy(rooms[idx])
    }

    // if (Game.time % 10 == 7)
    //     if (Game.rooms['W48S12'] != undefined){
    //         if (Game.rooms['W48S12'].terminal ? Game.rooms['W48S12'].storage.store.getFreeCapacity() < 100000 : false){
    //             if (Game.rooms['W47S14'].terminal ? Game.rooms['W47S14'].terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 30000 : false){
    //                 Game.rooms['W48S12'].terminal.send(RESOURCE_ENERGY, 30000, 'W47S14', 'resource allocation')
    //                 console.log('W48S12 -> W47S14 energy', 30000)
    //             }
    //         }
    //     }

    // Game.spawns['Spawn3'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], '简单一体机', {memory: {role: 'simple_one_machine'}})
}