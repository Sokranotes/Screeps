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

// 房间基础保障,
// 能量保障 extensions、spawn、Tower能量供给, 能量采集, 能量传输
// 控制器保障
// 安全保障(主动防御)

// 房间基本功能
// 建筑维护
// 建造建筑, 废品回收
// 支援, 市场交易
// 对外扩张
export const room_base_running = function(roomName: string){
    let spawnName: string
    if (roomName == 'W47S14'){
        tower_work(roomName)
        spawnName = 'Spawn3'
        var cleaners_base_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'base_transfer' || creep.memory.role == 'cleaner');
        var base_transferNum: number = 2;

        // 房间能量采集工作
        var transfer_num: number[] = [1, 1]
        var harvester_num: number[] = [1, 1]
        var link_harvester_pos_xs: number[] = [,]
        var link_harvester_pos_ys: number[] = [,]
        room_energy_mine(roomName, roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys)

        var room: Room = Game.rooms[roomName]
        var energyAvailable: number = room.energyAvailable;

        var carriersNum: number = 1;

        var upgradersNum: number = 1;
        var repairersNum: number = 0;
        var buildersNum: number = 1;
        var cleanerNum: number = 0;

        var minersNum: number = 0;
        var miner_transfersNum: number = 0;

        var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && creep.ticksToLive > 80);

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        var miner_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mine_transfer');

        var constructions = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
        if (constructions.length == 0)
        {
            buildersNum = 0
        }

        var tmp: number = (room.storage.store.getUsedCapacity() - 200000) / 100000
        if (room.storage.store.getUsedCapacity() < 50000){
            tmp = 0
            upgradersNum = 0
        }
        // var tmp = 0
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
        else
        {
            if(miner_transfers.length < miner_transfersNum) {
                var newName = 'Miner_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'mine_transfer', source_roomName: 'W47S14', dest_roomName: 'W47S14', mine_type: RESOURCE_HYDROGEN}});
            }
            else if(miners.length < minersNum) {
                var newName = 'Miner' + Game.time;
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'miner', source_roomName: 'W47S14', dest_roomName: 'W47S14', mine_idx: 0}});
            }
            if(upgraders.length < upgradersNum) {
                var newName = 'Upgrader' + Game.time;
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                                                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader'}});
            }
            else if(upgraders.length < upgradersNum) {
                var newName = 'Upgrader' + Game.time;
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, 
                                                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, 
                                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader'}});
            }
            else if(repairers.length < repairersNum) {
                var newName = 'Repairer' + Game.time;
                var idx = Math.floor((energyAvailable-300) / 50);
                if (idx > 10){
                    idx = 10
                }
                Game.spawns[spawnName].spawnCreep(body_list[idx], newName, {memory: {role: 'repairer'}});
            }
            else if (builders.length < buildersNum)
            {
                var newName = 'Builder' + Game.time;
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
            }
            else if (cleaners_base_transfers.length < cleanerNum){
                var newName = 'Cleaner' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE], newName, {memory: {role: 'cleaner'}})
            }
            if(carriers.length < carriersNum) {
            var newName = 'Carrier' + Game.time;
            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, {memory: {role: 'carrier'}});
            }
            if(cleaners_base_transfers.length < base_transferNum) {
                var newName = 'Base_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, {memory: {role: 'base_transfer'}});
            }   
        }
        if(cleaners_base_transfers.length < base_transferNum) {
            var newName = 'Base_transfer' + Game.time;
            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, {memory: {role: 'base_transfer'}});
        }

        var dest_link: StructureLink = Game.getObjectById('6159d59ae59fcf2038ecf56c')
        // for (var i: number = 0; i < room.memory.sources_num; i++){
        //     var source_link: StructureLink = Game.getObjectById(room.memory.source_link_ids[i])
        //     if (source_link != undefined){
        //         source_link.transferEnergy(dest_link);
        //     }
        // }
        var source_link: StructureLink = Game.getObjectById('61450b41047f4458ae00790f')
        var upgrade_link: StructureLink = Game.getObjectById('615a13005237858c5056f75f')
        source_link.transferEnergy(dest_link);
        if (upgrade_link.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
            dest_link.transferEnergy(upgrade_link);
        }
    }
    if (roomName == 'W48S12'){
        spawnName = 'Spawn2'
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