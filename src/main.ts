// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import { room_base_running } from './room_base/room_base_running';

import { active_transfer_work } from "./room_base/atcive_transfer";
import { base_transfer_work } from "./room_base/base_transfer";
import { builder_work } from "./room_base/builder";
import { carrier_work } from "./room_base/carrier";
import { cleaner_work } from "./room_base/cleaner";
import { energy_harvester_link_work } from "./room_base/energy_harvester_link";
import { energy_harvester_no_carry_work } from "./room_base/energy_harvester_no_carry";
import { energy_harvester_with_carry_work } from "./room_base/energy_harvester_with_carry";
import { passive_transfer_work } from "./room_base/passive_transfer";
import { repairer_work } from "./room_base/repairer";
import { upgrader_work } from "./room_base/upgrader";

import { out_room_energy_mine } from "@/out_energy_mine/out_room_energy_mine";
import { out_soldier_work } from "@/out_energy_mine/out_soldier";
import { out_scout_work } from './out_energy_mine/out_scout';
import { out_energy_harvester_with_carry_work } from './out_energy_mine/out_energy_harvester_with_carry';
import { out_passive_transfer_work } from './out_energy_mine/out_passive_transfer';
import { reserver_work } from './out_energy_mine/reserver';

export const loop = errorMapper(() => {

    // 清楚死亡的creep的内存，对于一些未完成的操作也可以在此时检查
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }

    room_base_running('W47S14')

    var spawnName = 'Spawn1'
    var transfer_num = [4, 3]
    var harvester_num = [1, 1]
    out_room_energy_mine('W48S14', 'W47S14', spawnName, harvester_num, transfer_num)

    var spawnName = 'Spawn1'
    var transfer_num = [4, 7]
    var harvester_num = [1, 2]
    out_room_energy_mine('W47S15', 'W47S14', spawnName, harvester_num, transfer_num)



    // 不同role的creep工作
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'energy_harvester_with_carry'){
            energy_harvester_with_carry_work(creep)
        }
        else if (creep.memory.role == 'passive_transfer'){
            passive_transfer_work(creep)
        }
        else if (creep.memory.role == 'energy_harvester_no_carry'){
            energy_harvester_no_carry_work(creep)
        }
        else if (creep.memory.role == 'active_transfer'){
            active_transfer_work(creep)
        }
        else if (creep.memory.role == 'energy_harvester_link'){
            energy_harvester_link_work(creep)
        }
        else if (creep.memory.role == 'carrier'){
            carrier_work(creep)
        }
        else if (creep.memory.role == 'base_transfer'){
            base_transfer_work(creep)
        }
        else if(creep.memory.role == 'upgrader') {
            upgrader_work(creep);
        }
        else if(creep.memory.role == 'repairer') {
            repairer_work(creep);
        }
        else if(creep.memory.role == 'builder') {
            builder_work(creep);
        }
        else if (creep.memory.role == 'cleaner'){
            cleaner_work(creep)
        }

        else if (creep.memory.role == 'out_scout'){
            out_scout_work(creep)
        }
        else if (creep.memory.role == 'reserver'){
            reserver_work(creep)
        }
        else if (creep.memory.role == 'out_energy_harvester_with_carry')
        {
            out_energy_harvester_with_carry_work(creep)
        }
        else if (creep.memory.role == 'out_passive_transfer'){
            out_passive_transfer_work(creep)
        }
        else if (creep.memory.role == 'out_soldier'){
            out_soldier_work(creep)
        }
    }
})