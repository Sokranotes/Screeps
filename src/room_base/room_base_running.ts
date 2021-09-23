import { room_energy_mine } from "@/room_base/room_energy_mine"
import { active_transfer_work } from "./atcive_transfer";
import { builder_work } from "./builder";
import { cleaner_work } from "./cleaner";
import { energy_harvester_no_carry_work } from "./energy_harvester_no_carry";
import { energy_harvester_with_carry_work } from "./energy_harvester_with_carry";
import { passive_transfer_work } from "./passive_transfer";
import { repairer_work } from "./repairer";
import { tower_work } from "./tower";
import { upgrader_work } from "./upgrader";

const body_list: BodyPartConstant[][]= [
    [WORK, WORK, CARRY, MOVE], // 300
    [WORK, WORK, CARRY, MOVE, MOVE], // 350
    [WORK, WORK, CARRY, MOVE, MOVE, MOVE], //400
    [WORK, WORK, WORK, CARRY, MOVE, MOVE], //450
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], //500
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], //550
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], //600
    [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], //650
    [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], // 700
    [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], //750 
    [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], // 800
];

export const room_base_running = function(roomName: string){
    // 房间能量采集工作
    var spawnName: string = 'Spawn1'
    var transfer_num: number[] = [2, 1]
    var harvester_num: number[] = [1, 1]
    room_energy_mine(roomName, roomName, spawnName, harvester_num, transfer_num)

    tower_work(roomName)

    var room: Room = Game.rooms[roomName]
    var energyAvailable: number = room.energyAvailable;

    var upgradersNum: number = 1;
    var repairersNum: number = 1;
    var buildersNum: number = 1;
    var cleanerNum: number = 1;

    var cleaners = _.filter(Game.creeps, (creep) => creep.memory.role == 'cleaner');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    var constructions = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
    if (constructions.length == 0)
    {
        buildersNum = 0
    }

    // spawn状态显示
    if (Game.spawns[spawnName].spawning){
        var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1, 
            Game.spawns[spawnName].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else if(upgraders.length < upgradersNum) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                                            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                                            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader'}});
        
    }
    else if(repairers.length < repairersNum) {
        var newName = 'Repairer' + Game.time;
        var idx = Math.floor((energyAvailable-300) / 50);
        if (idx > 10){
            idx = 10
        }
        Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'repairer'}});
    }
    else if (builders.length < buildersNum)
    {
        var newName = 'Builder' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
    }
    else if (cleaners.length < cleanerNum){
        var newName = 'Cleaner' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE], newName, {memory: {role: 'cleaner'}})
    }

    // 不同role的creep工作
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'energy_harvester_with_carry'){
            energy_harvester_with_carry_work(creep)
        }
        if (creep.memory.role == 'passive_transfer'){
            passive_transfer_work(creep)
        }
        if (creep.memory.role == 'energy_harvester_no_carry'){
            energy_harvester_no_carry_work(creep)
        }
        if (creep.memory.role == 'active_transfer'){
            active_transfer_work(creep)
        }
        if(creep.memory.role == 'upgrader') {
            upgrader_work(creep, roomName);
        }
        if(creep.memory.role == 'repairer') {
            repairer_work(creep, roomName);
        }
        if(creep.memory.role == 'builder') {
            builder_work(creep, roomName);
        }
        if (creep.memory.role == 'cleaner'){
            cleaner_work(creep, roomName)
        }
    }
    // switch (room.controller.level){
    //     // case 0:
    //     //     // claimController即可升级, road 5个container
    //     //     // 预留，已经是自己的房间不会进入到这个逻辑
    //     //     break
    //     case 1:
    //         // 200能量到2级, energy capacity max 300
    //         // 升级
    //         break
    //     case 2:
    //         // 45,000能量到3级 5个extension Rampart, Wall, energy capacity max 550
    //         // 建造extension, 给Spawn套上Rampart, 升级
    //         break
    //     case 3:
    //         // 135,000到4级 10个extension, energy capacity max 800
    //         // 建造extension, Tower, 升级
    //         break
    //     case 4:
    //         // 405,000到5级 20个extension Storage, energy capacity max 1300
    //         // 建造extension, 建造Storage, 升级
    //         break
    //     case 5:
    //         // 1,215,000到6级  30个extension, energy capacity max 1800
    //         // 建造extension, 建造Tower, 建造link, 升级
    //         break
    //     case 6:
    //         break
    // }
}