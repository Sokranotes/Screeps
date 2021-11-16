import { room_energy_mine } from "./room_base/room_energy_mine";
import { tower_work } from "./room_base/tower";

export const room_W48S12_running = function(roomName: string){

    tower_work('W48S12')

    let spawn_name = 'Spawn2'

    // let home: Room = Game.rooms[roomName]
    let upgradersNum: number = 2
    let harvester0sNum: number = 0
    let harvester1sNum: number = 0
    let buildersNum: number = 2
    let base_transferNum: number = 1
    // let carrier1sNum: number = 1
    let carriersNum: number = 1
    // if (Game.rooms['W48S12'].find(FIND_CONSTRUCTION_SITES).length == 0){
    //     buildersNum = 0
    // }
    let repairersNum: number = 0;

    // let carrier1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier1_W48S12' && creep.ticksToLive > 80);
    let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier_W48S12' && creep.ticksToLive > 80);
 
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'hu' && creep.room.name == 'W48S12');
    let builders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'builder' || creep.memory.role == 'repairer') && creep.room.name == 'W48S12');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    let base_transfers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'base_transfer' || creep.memory.role == 'cleaner') && creep.room.name == 'W48S12');
    let harvester0s = _.filter(Game.creeps, (creep) => creep.memory.role == 'hf' && creep.memory.source_idx == 0);
    let harvester1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'hf' && creep.memory.source_idx == 1);
    if (Game.spawns[spawn_name].spawning){
        let spawningCreep = Game.creeps[Game.spawns[spawn_name].spawning.name];
        Game.spawns[spawn_name].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawn_name].pos.x + 1, 
            Game.spawns[spawn_name].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else if (upgraders.length < upgradersNum){
        let newName = 'Upgrader' + Game.time;
        Game.spawns[spawn_name].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY], newName, {memory: {role: 'hu', source_idx: 0}});
    }
    else if (harvester0s.length < harvester0sNum){
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'hf', source_idx: 0}});
    }
    else if (harvester1s.length < harvester1sNum){
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'hf', source_idx: 1}});
    }
    else if (builders.length < buildersNum){
        let newName = 'Builder' + Game.time;
        // Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder', source_idx: 1}});
        // Game.spawns[spawn_name].spawnCreep([WORK, CARRY, WORK, CARRY, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder', source_idx: 1}});
        Game.spawns[spawn_name].spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder', source_idx: 1}});
    }
    else if (repairers.length < repairersNum){
        let newName = 'Repairer' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'repairer', source_idx: 1}});
    }
    else if(carriers.length < carriersNum) {
        let newName = 'Carrier' + Game.time;
        Game.spawns[spawn_name].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, {memory: {role: 'carrier_W48S12'}});
    }
    // else if(carrier1s.length < carrier1sNum) {
    //     let newName = 'Carrier1' + Game.time;
    //     Game.spawns[spawn_name].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, {memory: {role: 'carrier1_W48S12'}});
    // }
    else if(base_transfers.length < base_transferNum) {
        let newName = 'Base_transfer' + Game.time;
        Game.spawns[spawn_name].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName, {memory: {role: 'base_transfer'}});
    }

    let source_link: StructureLink = Game.getObjectById('61696ef057b6d60ae7c5968c')
    let dest_link: StructureLink = Game.getObjectById('61739e3ab6a4e1f3750c4432')
    source_link.transferEnergy(dest_link)

    let transfer_num: number[] = [0, 0]
    let harvester_num: number[] = [0, 1]
    let link_harvester_pos_xs: number[] = [,31]
    let link_harvester_pos_ys: number[] = [,38]
    room_energy_mine(roomName, roomName, spawn_name, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys)
}