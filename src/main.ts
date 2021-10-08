// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import { room_base_running } from './room_base/room_base_running';

// import { tower_work } from './room_base/tower';
// import { room_energy_mine } from './room_base/room_energy_mine';
import { out_room_energy_mine } from "@/out_energy_mine/out_room_energy_mine";
import { different_role_work } from './different_role_work';
import { room_W48S12_running } from './room_W48S12';

console.log('new push')


export const main = function(){
    // 清除死亡的creep的内存，对于一些未完成的操作也可以在此时检查
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    different_role_work()

    room_W48S12_running('W48S12')

    let spawnName = 'Spawn1'
    let transfer_num = [3, 2]
    let harvester_num = [1, 1]
    out_room_energy_mine('W48S14', 'W47S14', spawnName, harvester_num, transfer_num)

    spawnName = spawnName
    transfer_num = [4, 5]
    harvester_num = [1, 1]
    out_room_energy_mine('W47S15', 'W47S14', spawnName, harvester_num, transfer_num)

    spawnName = spawnName
    transfer_num = [3, 4]
    harvester_num = [1, 1]
    out_room_energy_mine('W48S15', 'W47S14', 'Spawn3', harvester_num, transfer_num)

    let rooms = ['W47S14']
    // 房间基本运营
    for (let idx in rooms){
        room_base_running(rooms[idx])
    }
}

export const loop = errorMapper(() => {
    main()
})