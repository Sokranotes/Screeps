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
import { attack_invader_core_work } from './out_energy_mine/attack_invader_core';
import { claim_controller_work } from './war3 W48S12/claim_controller';
import { new_room_help_work } from './war3 W48S12/new_room_help';

import {HelperVisual} from "./modules/超级抠位置自动布局1.0/helper_visual"
import {ManagerPlanner} from "./modules/超级抠位置自动布局1.0/manager_planner"
import { attack_work } from './war3 W48S12/attack';
import { carrier_help_work } from './room_base/carrier_help';
import { tower_work } from './room_base/tower';
import { room_energy_mine } from './room_base/room_energy_mine';


export const main = function(){
    // 清除死亡的creep的内存，对于一些未完成的操作也可以在此时检查
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    let spawnName = 'Spawn3'
    let transfer_num = [3, 2]
    let harvester_num = [1, 1]
    out_room_energy_mine('W48S14', 'W47S14', spawnName, harvester_num, transfer_num)

    spawnName = spawnName
    transfer_num = [4, 5]
    harvester_num = [1, 1]
    out_room_energy_mine('W47S15', 'W47S14', spawnName, harvester_num, transfer_num)

    let dismates = _.filter(Game.creeps, (creep) => creep.memory.role == 'dismate');
    let ranges = _.filter(Game.creeps, (creep) => creep.memory.role == 'range');
    let attacks = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack');
    let attack_controllers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack_controller');


    let doctors = _.filter(Game.creeps, (creep) => creep.memory.role == 'doctor');

    if (Game.spawns[spawnName].spawning){

    }
    // else{
    //     if (_.filter(Game.creeps, (creep) => creep.memory.role == 'new_room_help').length < 8)
    //         Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'helper' + Game.time, {memory: {role: 'new_room_help'}});
    // }
    else{
        if (_.filter(Game.creeps, (creep) => creep.memory.role == 'new_room_help').length < 0)
            Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'helper' + Game.time, {memory: {role: 'new_room_help'}});
    }


    let attack_invader_cores = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack_invader_core' && creep.memory.source_roomName == 'W47S15' && creep.ticksToLive > 80)
    if (Game.spawns[spawnName].spawning){
        let spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1, 
            Game.spawns[spawnName].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else if(dismates.length < 0) {
        let newName = 'dismate' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE], newName, {memory: {role: 'dismate'}});
    }
    else if(attacks.length < 0) {
        let newName = 'attack' + Game.time;
        Game.spawns[spawnName].spawnCreep([ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE], newName, {memory: {role: 'attack'}});
    }
    else if(ranges.length < 0) {
        let newName = 'range' + Game.time;
        Game.spawns[spawnName].spawnCreep([RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE], newName, {memory: {role: 'range'}});
    }
    else if(doctors.length < 0) {
        let newName = 'Doctor' + Game.time;
        Game.spawns[spawnName].spawnCreep([HEAL, HEAL, HEAL, HEAL, MOVE, MOVE], newName, {memory: {role: 'doctor'}});
    }
    else if(attack_controllers.length < 0) {
        let newName = 'attack_controller' + Game.time;
        Game.spawns[spawnName].spawnCreep([HEAL, HEAL, HEAL, HEAL, MOVE, MOVE], newName, {memory: {role: 'attack_controllers'}});
    }
    else if (attack_invader_cores.length < 0){
        let newName = 'attack_invader_core' + Game.time;
        Game.spawns[spawnName].spawnCreep([TOUGH,TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'attack_invader_core', dest_roomName: 'W47S14', source_roomName: 'W47S15'}});
    }

    let rooms = ['W47S14']

    tower_work('W48S12')
    // 房间能量采集工作
    transfer_num = [, 4]
    harvester_num = [1, 1]
    var link_harvester_pos_xs = [,]
    var link_harvester_pos_ys = [,]
    room_energy_mine('W48S12', 'W48S12', 'Spawn2', harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys)

    if (Game.spawns['Spawn2'].spawning){
        var spawningCreep = Game.creeps[Game.spawns['Spawn2'].spawning.name];
        Game.spawns['Spawn2'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn2'].pos.x + 1, 
            Game.spawns['Spawn2'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else if(_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == 'W48S12' && creep.ticksToLive > 80).length < 3) {
        var newName = 'upgrader' + Game.time;
        Game.spawns['Spawn2'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader'}});
    }

    // 房间基本运营
    for (let idx in rooms){
        room_base_running(rooms[idx])
    }


    // 不同role的creep工作
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
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
        else if (creep.memory.role == 'carrier_help'){
            carrier_help_work(creep)
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

        else if (creep.memory.role == 'attack_invader_core'){
            attack_invader_core_work(creep)
        }
    }
}

export const loop = errorMapper(() => {
    main()

    // let roomStructsData = undefined //放全局变量

    // let p = Game.flags.p; // 触发器
    // let pa = Game.flags.pa;
    // let pb = Game.flags.pb;
    // let pc = Game.flags.pc;
    // let pm = Game.flags.pm;
    // if(p) {
    //     roomStructsData = ManagerPlanner.computeManor(p.pos.roomName,[pc,pm,pa,pb])
    //     Game.flags.p.remove()
    // }
    // if(roomStructsData){
    //     //这个有点消耗cpu 不看的时候记得关
    //     HelperVisual.showRoomStructures(roomStructsData.roomName,roomStructsData.structMap)
    // }
})

// var ManagerPlanner = require('manager_planner.js');
// var HelperVisual = require('helper_visual.js')

// module.exports.loop = function () {
//     let roomStructsData = undefined //放全局变量

//     let p = Game.flags.p; // 触发器
//     let pa = Game.flags.pa;
//     let pb = Game.flags.pb;
//     let pc = Game.flags.pc;
//     let pm = Game.flags.pm;
//     if(p) {
//         roomStructsData = ManagerPlanner.computeManor(p.pos.roomName,[pc,pm,pa,pb])
//         Game.flags.p.remove()
//     }
//     if(roomStructsData){
//         //这个有点消耗cpu 不看的时候记得关
//         HelperVisual.showRoomStructures(roomStructsData.roomName,roomStructsData.structMap)
//     }
// }