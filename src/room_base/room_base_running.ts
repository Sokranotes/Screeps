import { room_energy_mine } from "@/room_base/room_energy_mine"
import { tower_work } from "./tower";

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
    var transfer_num: number[] = [0, 1]
    var harvester_num: number[] = [1, 1]
    var link_harvester_pos_xs: number[] = [5,]
    var link_harvester_pos_ys: number[] = [12,]
    room_energy_mine(roomName, roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys)

    tower_work(roomName)

    var room: Room = Game.rooms[roomName]
    var energyAvailable: number = room.energyAvailable;

    var carriersNum: number = 1;
    
    var base_transferNum: number = 3;

    var upgradersNum: number = 2;
    var repairersNum: number = 0;
    var buildersNum: number = 2;
    var cleanerNum: number = 1;

    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && creep.ticksToLive > 30);
    var cleaners_base_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'base_transfer' || creep.memory.role == 'cleaner');

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    var constructions = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
    if (constructions.length == 0)
    {
        buildersNum = 0
    }

    var tmp: number = (room.storage.store.getUsedCapacity() - 200000) / 100000
    // tmp带小数点
    if (tmp > upgradersNum){
        upgradersNum = tmp
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
    else if(carriers.length < carriersNum) {
        var newName = 'Carrier' + Game.time;
        Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE], newName, {memory: {role: 'carrier'}});
    }
    else if(cleaners_base_transfers.length < base_transferNum) {
        var newName = 'Base_transfer' + Game.time;
        Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, {memory: {role: 'base_transfer'}});
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
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
    }
    else if (cleaners_base_transfers.length < cleanerNum){
        var newName = 'Cleaner' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE], newName, {memory: {role: 'cleaner'}})
    }

    var dest_link: StructureLink = Game.getObjectById('6144f930e4eb6b750a8ca8c5')
    for (var i: number = 0; i < room.memory.sources_num; i++){
        var source_link: StructureLink = Game.getObjectById(room.memory.source_link_ids[i])
        if (source_link != undefined){
            source_link.transferEnergy(dest_link);
        }
    }
    var source_link: StructureLink = Game.getObjectById('61450b41047f4458ae00790f')
    source_link.transferEnergy(dest_link);

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