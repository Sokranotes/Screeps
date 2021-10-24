// 引入外部依赖
import { errorMapper } from './modules/errorMapper'

import { room_base_running } from './room_base/room_base_running';
import { room_W48S12_running } from './room_W48S12';
import { room_logic } from './room_logic';

import { out_room_energy_mine } from "@/out_energy_mine/out_room_energy_mine";
import { different_role_work } from './different_role_work';

if (Game.flags.Appassionata){
    console.log(Game.time, 'Appassionata new push')
}
else{
    console.log(Game.time, 'Sokranotes new push')
}

export const mainSokranotes = function(){
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    different_role_work()

    room_W48S12_running('W48S12')

    let spawnName = 'Spawn1'
    let transfer_num = [1, 1]
    let harvester_num = [1, 1]
    out_room_energy_mine('W48S14', 'W47S14', spawnName, harvester_num, transfer_num)

    spawnName = 'Spawn1'
    transfer_num = [1, 2]
    harvester_num = [1, 1]
    out_room_energy_mine('W47S15', 'W47S14', spawnName, harvester_num, transfer_num)

    spawnName = 'Spawn3'
    transfer_num = [1, 2]
    harvester_num = [1, 1]
    out_room_energy_mine('W48S15', 'W47S14', spawnName, harvester_num, transfer_num)

    spawnName = 'Spawn3'
    transfer_num = [2, 2]
    harvester_num = [1, 1]
    out_room_energy_mine('W47S13', 'W47S14', spawnName, harvester_num, transfer_num)

    spawnName = 'Spawn1'
    transfer_num = [2, 2]
    harvester_num = [1, 1]
    out_room_energy_mine('W46S13', 'W47S14', spawnName, harvester_num, transfer_num)

    let rooms = ['W47S14']
    for (let idx in rooms){
        room_base_running(rooms[idx])
    }

    // Game.spawns['Spawn3'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], '简单一体机', {memory: {role: 'simple_one_machine'}})
}

export const mainAppassionata = function(){
    let rooms = ['W16N18']
    for (let idx in rooms){
        room_logic(rooms[idx])
    }
}

export const loop = errorMapper(() => {
    if (Game.flags.Appassionata){
        // console.log('Appassionata run')
        mainAppassionata()
    }
    else{
        mainSokranotes()
    }
})