// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import { room_base_running } from './room_base/room_base_running';

import { tower_work } from './room_base/tower';
import { room_energy_mine } from './room_base/room_energy_mine';
import { out_room_energy_mine } from "@/out_energy_mine/out_room_energy_mine";
import { different_role_work } from './different_role_work';
import { room_W48S12_running } from './room_W48S12';


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
    // else{
    //     if (_.filter(Game.creeps, (creep) => creep.memory.role == 'new_room_help').length < 0)
    //         Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'helper' + Game.time, {memory: {role: 'new_room_help'}});
    // }


    // let attack_invader_cores = _.filter(Game.creeps, (creep) => creep.memory.role == 'attack_invader_core' && creep.memory.source_roomName == 'W47S15' && creep.ticksToLive > 80)
    // if (Game.spawns[spawnName].spawning){
    //     let spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
    //     Game.spawns[spawnName].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns[spawnName].pos.x + 1, 
    //         Game.spawns[spawnName].pos.y, 
    //         {align: 'left', opacity: 0.8});
    // }
    // else if(dismates.length < 0) {
    //     let newName = 'dismate' + Game.time;
    //     Game.spawns[spawnName].spawnCreep([WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE], newName, {memory: {role: 'dismate'}});
    // }
    // else if(attacks.length < 0) {
    //     let newName = 'attack' + Game.time;
    //     Game.spawns[spawnName].spawnCreep([ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE], newName, {memory: {role: 'attack'}});
    // }
    // else if(ranges.length < 0) {
    //     let newName = 'range' + Game.time;
    //     Game.spawns[spawnName].spawnCreep([RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE], newName, {memory: {role: 'range'}});
    // }
    // else if(doctors.length < 0) {
    //     let newName = 'Doctor' + Game.time;
    //     Game.spawns[spawnName].spawnCreep([HEAL, HEAL, HEAL, HEAL, MOVE, MOVE], newName, {memory: {role: 'doctor'}});
    // }
    // else if(attack_controllers.length < 0) {
    //     let newName = 'attack_controller' + Game.time;
    //     Game.spawns[spawnName].spawnCreep([HEAL, HEAL, HEAL, HEAL, MOVE, MOVE], newName, {memory: {role: 'attack_controllers'}});
    // }
    // else if (attack_invader_cores.length < 0){
    //     let newName = 'attack_invader_core' + Game.time;
    //     Game.spawns[spawnName].spawnCreep([TOUGH,TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'attack_invader_core', dest_roomName: 'W47S14', source_roomName: 'W47S15'}});
    // }

    tower_work('W48S12')

    if (Game.spawns['Spawn2'].spawning){
        var spawningCreep = Game.creeps[Game.spawns['Spawn2'].spawning.name];
        Game.spawns['Spawn2'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn2'].pos.x + 1, 
            Game.spawns['Spawn2'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else if(_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == 'W48S12' && creep.ticksToLive > 80).length < 5) {
        var newName = 'upgrader' + Game.time;
        Game.spawns['Spawn2'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader'}});
    }
    // 房间能量采集工作
    transfer_num = [0, 6]
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
    else if(_.filter(Game.creeps, (creep) => creep.memory.role == 'passive_transfer' && creep.room.name == 'W48S12' && creep.ticksToLive > 80).length < 0) {
        var newName = 'cleaner' + Game.time;
        Game.spawns['Spawn2'].spawnCreep([CARRY, MOVE, CARRY, MOVE], newName, {memory: {role: 'cleaner', source_roomName: 'W48S12', dest_roomName: 'W48S12', source_idx: 1}});
    }
    else if(_.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == 'W48S12' && creep.ticksToLive > 80).length < 2) {
        var newName = 'builder' + Game.time;
        Game.spawns['Spawn2'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder', source_roomName: 'W48S12', dest_roomName: 'W48S12', source_idx: 0}});
    }

    let rooms = ['W47S14']
    // 房间基本运营
    for (let idx in rooms){
        room_base_running(rooms[idx])
    }
}

export const loop = errorMapper(() => {
    main()
})