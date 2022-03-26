import { mainUniversal } from './Universal/mainUniversal';
import { errorMapper } from './modules/errorMapper'
import "./modules/超级移动优化"
import { source_energy_mine } from '@/Universal/room_base/universal_logic/source_energy_mine';
import { harvest_upgrade_work } from '@/Sokranotes/low_level/harvest_upgrade_worker';
import { harvest_build_work } from '@/Universal/room_base/level2/harvest_build_worker';
import { harvest_fill_work } from '@/Sokranotes/low_level/harvest_fill_worker';
import { harvest_repair_work } from '@/Sokranotes/low_level/harvest_repair_worker';
import { base_transfer_work } from '@/Sokranotes/room_base/base_transfer';
import { builder_work } from '@/Sokranotes/room_base/builder';
import { repairer_work } from '@/Sokranotes/room_base/repairer';
import { harvest_upgrade_same_work } from '@/Universal/room_base/level1/harvest_upgrade_same_worker';
import { cleaner_work } from '@/Sokranotes/room_base/cleaner';
import { tmp_attack_work } from '@/Sokranotes/room_base/tmp_attack';
import { occupy_work } from '@/Sokranotes/occupy/occupy';
import { help_work } from '@/Sokranotes/room_base/help_worker';
import { energy_harvester_link_work } from '@/Sokranotes/room_base/energy_harvester_link';
import { upgrader_link_work } from '@/Sokranotes/room_base/upgrader_link';
// import "./modules/strategy_marketPrice"

if (Game.flags.GlennGould){
    console.log(Game.time, 'GlennGould new push')
    let rooms: string[] = ['W9N11']
    for (let idx in rooms){
        Memory.rooms[rooms[idx]].check_spawn_queue_flag = true
    }
}

export const loop = errorMapper(() => {
    if (Game.flags.GlennGould){
        if(Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
        let rooms: string[] = ['W9N11']
        mainUniversal(rooms)
        let source_link0: StructureLink = Game.getObjectById(Memory.rooms[rooms[0]].links_id[0])
        let source_link1: StructureLink = Game.getObjectById(Memory.rooms[rooms[0]].links_id[1])
        let center_link: StructureLink = Game.getObjectById("619bdff527ccd47b68938bab")
        let upgrade_link: StructureLink = Game.getObjectById("61b0fb9d91f12d45ad64a2bc")
        if (source_link0.store.getUsedCapacity(RESOURCE_ENERGY) == 800){
            source_link0.transferEnergy(center_link)
        }
        if (source_link1.store.getUsedCapacity(RESOURCE_ENERGY) == 800){
            source_link1.transferEnergy(center_link)
        }
        if (source_link1.store.getUsedCapacity(RESOURCE_ENERGY) > 600 && upgrade_link.store.getUsedCapacity(RESOURCE_ENERGY) < 100){
            source_link1.transferEnergy(upgrade_link)
        }
        if (Game.time % 100 == 2) source_energy_mine('W9N11')
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
            else if(creep.memory.role == 'upgrader_link') {
                upgrader_link_work(creep);
            }
            else if (creep.memory.role == 'hb'){
                harvest_build_work(creep)
            }
            else if (creep.memory.role == 'hf'){
                harvest_fill_work(creep)
            }
            else if (creep.memory.role == 'hl'){
                energy_harvester_link_work(creep)
            }
            else if (creep.memory.role == 'hr'){
                harvest_repair_work(creep)
            }
            else if (creep.memory.role == 'base_transfer'){
                base_transfer_work(creep)
            }
            else if(creep.memory.role == 'builder') {
                builder_work(creep);
            }
            else if(creep.memory.role == 'repairer') {
                repairer_work(creep);
            }
            else if (creep.memory.role == 'cleaner'){
                cleaner_work(creep)
            }
            else if(creep.memory.role == 'hus') {
                harvest_upgrade_same_work(creep);
            }
            else if (creep.memory.role == 'tmp_attack') {
                tmp_attack_work(creep)
            }
            else if (creep.memory.role == 'occupy'){
                occupy_work(creep)
            }
            // Game.spawns['Spawn3'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM], 'c', {memory: {role: 'occupy'}})
            else if (creep.memory.role == 'help'){
                help_work(creep)
            }
        }
    }
    // if (Game.flags.test){
    //     // todo
    //     Game.flags.test.remove()
    // }
})