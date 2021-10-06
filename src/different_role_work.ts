import { active_transfer_work } from "./room_base/atcive_transfer";
import { base_transfer_work } from "./room_base/base_transfer";
import { builder_work } from "./room_base/builder";
import { carrier_W47S14_work} from "./room_base/carrier_W47S14";
import { cleaner_work } from "./room_base/cleaner";
import { energy_harvester_link_work } from "./room_base/energy_harvester_link";
import { energy_harvester_no_carry_work } from "./room_base/energy_harvester_no_carry";
import { energy_harvester_with_carry_work } from "./room_base/energy_harvester_with_carry";
import { passive_transfer_work } from "./room_base/passive_transfer";
import { repairer_work } from "./room_base/repairer";
import { upgrader_link_work } from "./room_base/upgrader_link";


import { out_soldier_work } from "@/out_energy_mine/out_soldier";
import { out_scout_work } from './out_energy_mine/out_scout';
import { out_energy_harvester_with_carry_work } from './out_energy_mine/out_energy_harvester_with_carry';
import { out_passive_transfer_work } from './out_energy_mine/out_passive_transfer';
import { reserver_work } from './out_energy_mine/reserver';
import { attack_invader_core_work } from './out_energy_mine/attack_invader_core';
import { claim_controller_work } from './war3 W48S12/claim_controller';
import { new_room_help_work } from './war3 W48S12/new_room_help';

import { attack_work } from './war3 W48S12/attack';
import { carrier_help_work } from './room_base/carrier_help';
import { miner_work } from "./mineral/miner";
import { mine_transfer_work } from "./mineral/mine_transfer";
import { tower_transfer_work } from "./room_base/tower_transfer";
import { upgrader_work } from "./room_base/low_level/upgrader";

export const different_role_work = function(){
    // 不同role的creep工作
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];

        // 基础运营
        if (creep.memory.role == 'base_transfer'){
            base_transfer_work(creep)
        }
        if (creep.memory.role == 'tower_transfer'){
            tower_transfer_work(creep)
        }
        // 挖运分离三种能量采集方式
        else if (creep.memory.role == 'energy_harvester_with_carry'){
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
        else if (creep.memory.role == 'carrier_W47S14'){
            carrier_W47S14_work(creep)
        }
        // 房间基本功能
        else if(creep.memory.role == 'upgrader_link') {
            upgrader_link_work(creep);
        }
        else if(creep.memory.role == 'repairer') {
            repairer_work(creep); // 后期由Tower接替
        }
        else if(creep.memory.role == 'builder') {
            builder_work(creep);
        }
        else if (creep.memory.role == 'cleaner'){
            cleaner_work(creep) // 视情况调整
        }


        // 外矿
        else if (creep.memory.role == 'out_scout'){
            out_scout_work(creep) // 侦查
        }
        else if (creep.memory.role == 'reserver'){
            reserver_work(creep) // 预定
        }
        else if (creep.memory.role == 'out_energy_harvester_with_carry')
        {
            out_energy_harvester_with_carry_work(creep)
        }
        else if (creep.memory.role == 'out_passive_transfer'){
            out_passive_transfer_work(creep)
        }
        // 外矿防守单位
        else if (creep.memory.role == 'attack_invader_core'){
            attack_invader_core_work(creep)
        }
        else if (creep.memory.role == 'out_soldier'){
            out_soldier_work(creep)
        }
        
        // war 2 W48S16
        // else if (creep.memory.role == 'dismate'){
        //     dismate_work(creep)
        // }
        else if (creep.memory.role == 'attack'){
            attack_work(creep)
        }
        // else if (creep.memory.role == 'range'){
        //     range_work(creep)
        // }
        else if (creep.memory.role == 'claim_controller'){
            claim_controller_work(creep)
        }
        else if (creep.memory.role == 'new_room_help'){
            new_room_help_work(creep)
        }

        else if (creep.memory.role == 'miner'){
            miner_work(creep)
        }
        else if (creep.memory.role == 'mine_transfer'){
            mine_transfer_work(creep)
        }

        // move home
        // else if (creep.memory.role == 'carrier_help'){
        //     carrier_help_work(creep)
        // }

        else if (creep.memory.role == 'upgrader'){
            upgrader_work(creep)
        }
    }
}