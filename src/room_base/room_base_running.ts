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
    let spawnName: string
    if (roomName == 'W47S14'){
        tower_work(roomName)

        // let storage = Game.getObjectById(Memory.rooms[roomName].storage_id)
        // if (storage){
        //     if (storage.store.getFreeCapacity() < 50000 && Game.time%100 == 0){
        //         Game.market.getAllOrders({type: ORDER_BUY, resourceType: RESOURCE_ENERGY})
        //     }
        // }

        spawnName = 'Spawn3'
        let cleaners_base_transfers = _.filter(Game.creeps, (creep) => (((creep.memory.role == 'base_transfer' && creep.room.name == 'W47S14') || creep.memory.role == 'cleaner'))  && creep.ticksToLive > 200);
        let base_transferNum: number = 2;

        let room: Room = Game.rooms[roomName]
        let energyAvailable: number = room.energyAvailable;

        let carriersNum: number = 1;
        let tower_transfersNum: number = 1;

        let upgradersNum: number = 2;
        let repairersNum: number = 0;
        let buildersNum: number = 1;
        // let cleanerNum: number = 0;
        // let minersNum: number = 0;
        // let miner_transfersNum: number = 0;

        let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier_W47S14' && creep.ticksToLive > 80);

        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader_link');
        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        // let miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        // let miner_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'mine_transfer');
        let tower_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tower_transfer');

        let constructions = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
        if (constructions.length == 0)
        {
            buildersNum = 0
        }

        let tmp: number = (room.storage.store.getUsedCapacity() - 200000) / 100000
        if (room.storage.store.getUsedCapacity() < 50000){
            tmp = 0
            upgradersNum = 0
        }

        if (Game.spawns[spawnName].spawning){
            let spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[spawnName].pos.x + 1, 
                Game.spawns[spawnName].pos.y, 
                {align: 'left', opacity: 0.8});
        }
        else
        {
            // if(miner_transfers.length < miner_transfersNum) {
            //     let newName = 'Miner_transfer' + Game.time;
            //     Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'mine_transfer', source_roomName: 'W47S14', dest_roomName: 'W47S14', mine_type: RESOURCE_HYDROGEN}});
            // }
            // else if(miners.length < minersNum) {
            //     let newName = 'Miner' + Game.time;
            //     Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'miner', source_roomName: 'W47S14', dest_roomName: 'W47S14', mine_idx: 0}});
            // }
            if(upgraders.length < upgradersNum) {
                let newName = 'Upgrader_link' + Game.time;
                if (room.controller.level == 8){
                    Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader_link'}});
                }
                else{
                    Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, 
                        MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader_link'}});
                }
            }
            else if(repairers.length < repairersNum) {
                let newName = 'Repairer' + Game.time;
                let idx = Math.floor((energyAvailable-300) / 50);
                if (idx > 10){
                    idx = 10
                }
                Game.spawns[spawnName].spawnCreep(body_list[idx], newName, {memory: {role: 'repairer'}});
            }
            else if (builders.length < buildersNum)
            {
                let newName = 'Builder' + Game.time;
                // Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
                Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
            }
            // else if (cleaners_base_transfers.length < cleanerNum){
            //     let newName = 'Cleaner' + Game.time;
            //     Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE], newName, {memory: {role: 'cleaner'}})
            // }
            if(cleaners_base_transfers.length < base_transferNum) {
                let newName = 'Base_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, {memory: {role: 'base_transfer'}});
            }
            if(carriers.length < carriersNum) {
            let newName = 'Carrier' + Game.time;
            Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, {memory: {role: 'carrier_W47S14'}});
            }
            if(tower_transfers.length < tower_transfersNum) {
                let newName = 'Tower_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, {memory: {role: 'tower_transfer'}});
            }
            if(cleaners_base_transfers.length < base_transferNum) {
                let newName = 'Base_transfer' + Game.time;
                Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, {memory: {role: 'base_transfer'}});
            }
        }

        let source1_link: StructureLink = Game.getObjectById('615d6e761b8f40360c7387dd')
        let source2_link: StructureLink = Game.getObjectById('61450b41047f4458ae00790f')
        let dest_link: StructureLink = Game.getObjectById('6159d59ae59fcf2038ecf56c')
        let upgrade_link: StructureLink = Game.getObjectById('615a13005237858c5056f75f')
        source1_link.transferEnergy(dest_link)
        if (source2_link.store.getUsedCapacity(RESOURCE_ENERGY) > 600){
            source2_link.transferEnergy(upgrade_link)
        }
        if (dest_link.store.getUsedCapacity(RESOURCE_ENERGY) > 600){
            dest_link.transferEnergy(upgrade_link)
        }

        let transfer_num: number[] = [1, 1]
        let harvester_num: number[] = [1, 1]
        let link_harvester_pos_xs: number[] = [,]
        let link_harvester_pos_ys: number[] = [,]
        room_energy_mine(roomName, roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys)
    }

    // switch (room.controller.level){
    //     // case 0:
    //     //     // claimController即可升级, road 5个container
    //     //     // 预留，已经是自己的房间不会进入到这个逻辑
    //     //     break
    //     case 1:
    //         // 升级
    //         // 1能量升1 controller
    //         // 1能量升Downgrade 100, 多余不返还

    //         // 200能量到2级, energy capacity max 300
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