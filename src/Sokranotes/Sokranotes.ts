import { out_room_energy_mine } from "@/Sokranotes/out_energy_mine/out_room_energy_mine";
import { different_role_work } from '@/Sokranotes/different_role_work';
import { room_base_running } from '@/Sokranotes/room_base/room_base_running';
import { room_W48S12_running } from '@/Sokranotes/room_W48S12';
import { room_logic } from "@/Universal/room_logic";

if (Game.flags.Sokranotes){
    console.log(Game.time, 'Sokranotes new push')
}

export const Sokranotes = function(){
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    different_role_work()

    if (Memory.rooms['W47S14'] == undefined)
        Memory.rooms['W47S14'] = {}
    if (Memory.rooms['W48S12'] == undefined)
        Memory.rooms['W48S12'] = {}

    let rooms: string[] = ['W41S6']
    for (let idx in rooms){
        Memory.rooms[rooms[idx]].check_spawn_queue_flag = true
    }
    room_logic('W41S6')

    rooms = ['W47S14']
    for (let idx in rooms){
        room_base_running(rooms[idx])
    }

    room_W48S12_running('W48S12')

    let spawnName = 'Spawn4'
    let transfer_num = [1, 1]
    let harvester_num = [1, 1]
    out_room_energy_mine('W48S14', 'W47S14', spawnName, harvester_num, transfer_num)

    spawnName = 'Spawn1'
    transfer_num = [2, 2]
    harvester_num = [1, 1]
    out_room_energy_mine('W47S13', 'W47S14', spawnName, harvester_num, transfer_num)

    // spawnName = 'Spawn1'
    // transfer_num = [1, 2]
    // harvester_num = [1, 1]
    // out_room_energy_mine('W47S15', 'W47S14', spawnName, harvester_num, transfer_num)

    // spawnName = 'Spawn4'
    // transfer_num = [1, 2]
    // harvester_num = [1, 1]
    // out_room_energy_mine('W48S15', 'W47S14', spawnName, harvester_num, transfer_num)

    // spawnName = 'Spawn3'
    // transfer_num = [2, 2]
    // harvester_num = [1, 1]
    // out_room_energy_mine('W46S13', 'W47S14', spawnName, harvester_num, transfer_num)

    // Game.spawns['Spawn3'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], '简单一体机', {memory: {role: 'simple_one_machine'}})
}