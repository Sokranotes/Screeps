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
import { room_base_running } from './role/base/room_base_running';

// import { cleaner_work } from './role/cleaner';
// import { miner_work } from './role/miner';

var roomName: string = 'W47S14'

export const loop = errorMapper(() => {

    // 清楚死亡的creep的内存，对于一些未完成的操作也可以在此时检查
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }

    // for (var room_name in Game.rooms){
    //     if (Game.rooms[room_name].controller.my){
    //         room_base_running(roomName)
    //     }
    // }

    var closestHostile1 = Game.rooms["W48S14"].find(FIND_HOSTILE_CREEPS);
    if(closestHostile1.length > 0) {
        for (var i: number = 0; i < closestHostile1.length; i++){
            console.log(Game.time + ' 发现敌军 ' + closestHostile1[0].pos.x + " " + closestHostile1[0].pos.y + closestHostile1[0].owner)
        }
    }

    // Tower防御及safe mode的激活
    var tower: StructureTower = Game.getObjectById('613e1e2c2acf7910898bae98');
    var tower1: StructureTower = Game.getObjectById('6144e55dfd720ff16b30cffa');
    if (tower.hits <= 0.5*tower.hitsMax || Game.spawns['Spawn1'].hits <= 0.5*Game.spawns['Spawn1'].hitsMax)
    {
        Game.rooms[roomName].controller.activateSafeMode()
    }
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            console.log(Game.time + ' 发现敌军 ' + closestHostile.pos.x + " " + closestHostile.pos.y + closestHostile.owner)
            tower.attack(closestHostile);
            if(tower1) {
                if(closestHostile) {
                    tower1.attack(closestHostile);
                }
            }
        }
        else if (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower.store.getCapacity(RESOURCE_ENERGY)){
            var ramparts = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < 1000  && structure.structureType == STRUCTURE_RAMPART
            });
            if(ramparts) {
                console.log('tower repair ramparts 1')
                tower.repair(ramparts);
                if(tower1) {
                    if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY))
                    {
                        tower1.repair(ramparts);
                    }
                }
            }
        }
        else if (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower.store.getCapacity(RESOURCE_ENERGY) && tower.room.energyAvailable == tower.room.energyCapacityAvailable){
            var ramparts = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax  && structure.structureType == STRUCTURE_RAMPART
            });
            if(ramparts) {
                console.log('tower repair ramparts 2')
                tower.repair(ramparts);
                if(tower1) {
                    if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY)  && tower.room.energyAvailable == tower.room.energyCapacityAvailable)
                    {
                        tower1.repair(ramparts);
                    }
                }
            }
            else{
                var structures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax  && structure.structureType != STRUCTURE_WALL
                });
                if(structures) {
                    console.log('tower repair structures')
                    tower.repair(structures);
                    if(tower1) {
                        if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY)  && tower.room.energyAvailable == tower.room.energyCapacityAvailable)
                        {
                            tower1.repair(structures);
                        }
                    }
                }
                else{
                    var walls = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax  && structure.structureType == STRUCTURE_WALL
                    });
                    if(walls) {
                        tower.repair(walls);
                        if(tower1) {
                            if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY)  && tower.room.energyAvailable == tower.room.energyCapacityAvailable)
                            {
                                tower1.repair(walls);
                            }
                        }
                    }
                }
            }
        }
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