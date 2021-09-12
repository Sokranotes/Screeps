// 刚开始的时候，300档可以改成300， 3， 1， 1，不追求source挤占问题
// let number_list: number[][] = [
//     //MOVE WORK CARRY
//     [300, 1, 2, 1],
//     [350, 2, 2, 1],
//     [400, 3, 2, 1],
//     [450, 2, 3, 1],
//     [500, 3, 3, 1],
//     [550, 4, 3, 1],
//     [600, 5, 3, 1],
//     [650, 6, 3, 1],
//     [700, 5, 4, 1],
//     [750, 6, 4, 1],
//     [800, 7, 4, 1],
// ];

import { floor, random } from "lodash";

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

export const spawn_work = function(
    roomName: string, 
    harvestersNum: number, 
    upgradersNum: number, 
    repairersNum: number, 
    buildersNum: number, 
    mimerNum: number,
    soliderNum: number,
    transferNum: number,
    spawnName?: string)
{
    var home: Room = Game.rooms[roomName]
    var energyCapacityAvailable: number = home.energyCapacityAvailable;
    var energyAvailable: number = home.energyAvailable;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    // // war
    // var war_flag: boolean = false
    // // var war_flag: boolean = true
    // if (war_flag){
    //     // status check
    //     if (Game.spawns['Spawn1'].spawning){
    //         var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    //         Game.spawns['Spawn1'].room.visual.text(
    //             '🛠️' + spawningCreep.memory.role,
    //             Game.spawns['Spawn1'].pos.x + 1, 
    //             Game.spawns['Spawn1'].pos.y, 
    //             {align: 'left', opacity: 0.8});
    //     }
    //     else {
    //         var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
    //         var idx = Math.floor((energyAvailable-300) / 50);
    //         if(soldiers.length < soliderNum){
    //             console.log('Soldiers  : ' + harvesters.length + "\t" + harvestersNum);
    //             var newName = 'Soldier' + Game.time;
    //             Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'soldier', source_idx: source_idx}});
    //             console.log('Spawning new soldier: ' + newName  + " body: " + '[TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE]');
    //         }
    //     }
    // }
    // else 
    if (Game.spawns['Spawn1'].spawning){
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else{
        //Emergency situation
        //else if (harvesters.length == 0){
        if (harvesters.length == 0){
            var newName = 'Harvester' + Game.time;
            var idx = Math.floor((energyAvailable-300) / 50);
            if (idx >= 0){
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'harvester', source_idx: 1}});
                console.log('Spawning new harvester: ' + newName  + " body: " + body_list[idx]);
            }
            else{
                console.log('lack of energy, energyAvailable: ' + energyAvailable);
            }
        }

        // routine
        else if (energyAvailable == energyCapacityAvailable){
            var idx = Math.floor((energyAvailable-300) / 50);

            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');

            console.log('***************reuqired number with different role****************')
            console.log('Harvesters: ' + harvesters.length + "\t" + harvestersNum);
            console.log('Upgraders : ' + upgraders.length + "\t" + upgradersNum);
            console.log('Transfer  : ' + transfers.length + "\t" + transferNum);
            console.log('Repairer  : ' + repairers.length + "\t", repairersNum);
            console.log('Builders  : ' + builders.length + "\t", buildersNum);
            console.log('Miner     : ' + miners.length + "\t", buildersNum);
            
            
            if(harvesters.length < harvestersNum) {
                var source_idx: number
                if (Math.random() > 0.67) {
                    source_idx = 1
                }
                else {
                    source_idx = 0
                }
                var newName = 'Harvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'harvester', source_idx: Math.random() > 0.5 ? 1 : 0}});
                // Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'harvester', source_idx: 1}});
                console.log('Spawning new harvester: ' + newName  + " body: " + body_list[idx]);
            }
            else if(upgraders.length < upgradersNum) {
                var newName = 'Upgrader' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'upgrader', source_idx: Math.random() > 0.5 ? 1 : 0}});
                console.log('Spawning new upgrader : ' + newName  + " body: " + body_list[idx]);
                
            }
            else if (builders.length <= upgraders.length)
            {
                // else if(builder.length < buildersNum) {
                var newName = 'Builder' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'builder', source_idx: Math.random() > 0.5 ? 1 : 0}});
                console.log('Spawning new builder  : ' + newName  + " body: " + body_list[idx]);
                // }
            }
            else if(repairers.length < repairersNum) {
                var newName = 'Repairer' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'repairer', source_idx: Math.random() > 0.5 ? 1 : 0}});
                console.log('Spawning new repairer : ' + newName  + " body:" + body_list[idx]);
            }
            // else if (transfers.length < transferNum){
                
            //     var newName = 'Transfer' + Game.time;
            //     Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'transfer', source_idx: source_idx}});
            //     console.log('Spawning new transfer: ' + newName  + " body: " + body_list[idx]);
            // }
            // else if(miners.length < mimerNum) {
            //     var newName = 'Miner' + Game.time;
            //     Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'miner'}});
            //     console.log('Spawning new miner    : ' + newName  + " body:  " + body_list[idx]);
            // }
        }
    }
}