// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import * as $ from "./超级移动优化"
import { spawn_work } from './spawn';

// role for base
import { harvester_work } from './role/base/harvester';
import { outharvester_work } from './role/base/outharvester';
import { repairer_work } from './role/base/repairer';
import { transfer_work } from './role/base/transfer';
import { upgrader_work } from './role/base/upgrader';
import { builder_work } from './role/base/builder';

// role for war
import { doctor_work } from './role/war/doctor';
import { harder_work } from './role/war/harder';
import { soldier_work } from './role/war/soldier';
import { cleaner_work } from './role/base/cleaner';
import { active_transfer_work } from './role/base/atcive_transfer';
import { energy_harvester_no_carry_work } from './role/base/energy_harvester_no_carry';
import { room_energy_mine } from './room_energy_mine';
import { base_transfer_work } from './role/base/base_transfer';
import { outharvester1_work } from './role/base/outharvester1';
import { transfer1_work } from './role/base/transfer1';
import { carrier_work } from './role/base/carrier';
import { reserver_work } from './role/base/reserver';

// import { cleaner_work } from './role/cleaner';
// import { miner_work } from './role/miner';

var roomName: string = 'W47S14'

export const loop = errorMapper(() => {

    // console.log('test 2021 09 11 19 54')

    // 清楚死亡的creep的内存，对于一些未完成的操作也可以在此时检查
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // Tower防御及safe mode的激活
    var tower: StructureTower = Game.getObjectById('613e1e2c2acf7910898bae98');
    if (tower.hits <= 0.5*tower.hitsMax || Game.spawns['Spawn1'].hits <= 0.5*Game.spawns['Spawn1'].hitsMax)
    {
        Game.rooms[roomName].controller.activateSafeMode()
    }
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            console.log(Game.time + ' 发现敌军 ' + closestHostile.pos.x + " " + closestHostile.pos.y + closestHostile.owner)
            tower.attack(closestHostile);
        }
        // else{
        //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //         filter: (structure) => structure.hits < structure.hitsMax
        //     });
        //     if(closestDamagedStructure) {
        //         tower.repair(closestDamagedStructure);
        //     }
        // }
    }

    // // 某房间挖矿
    var spawnName: string = 'Spawn1'
    room_energy_mine(roomName, spawnName)
    // room_energy_mine("W47S15", spawnName)

    // 控制creep的生成
    spawn_work(roomName)

    // 不同role的creep工作
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'soldier'){
            soldier_work(creep, roomName);
        }
        if (creep.memory.role == 'carrier'){
            carrier_work(creep, roomName)
        }
        if (creep.memory.role == 'reserver'){
            reserver_work(creep, roomName)
        }
        if(creep.memory.role == 'harvester') {
            harvester_work(creep, roomName);
        }
        if (creep.memory.role == 'outharvester'){
            outharvester_work(creep, roomName);
        }
        if (creep.memory.role == 'transfer'){
            transfer_work(creep, roomName);
        }
        if (creep.memory.role == 'outharvester1'){
            outharvester1_work(creep, roomName);
        }
        if (creep.memory.role == 'transfer1'){
            transfer1_work(creep, roomName);
        }
        if(creep.memory.role == 'upgrader') {
            upgrader_work(creep, roomName);
        }
        if(creep.memory.role == 'builder') {
            builder_work(creep, roomName);
        }
        if(creep.memory.role == 'repairer') {
            repairer_work(creep, roomName);
        }
        if (creep.memory.role == 'cleaner'){
            cleaner_work(creep, roomName)
        }
        if (creep.memory.role == 'active_transfer'){
            active_transfer_work(creep, roomName)
        }
        if (creep.memory.role == 'energy_harvester_no_carry'){
            energy_harvester_no_carry_work(creep, roomName)
        }
        if (creep.memory.role == 'base_transfer'){
            base_transfer_work(creep, roomName)
        }
        // if (creep.memory.role == 'harder'){
        //     harder_work(creep, roomName)
        // }
        // if (creep.memory.role == 'doctor'){
        //     doctor_work(creep, roomName)
        // }
        // if (creep.memory.role == 'miner'){
        //     miner_work(creep, roomName)
        // }
    }
})