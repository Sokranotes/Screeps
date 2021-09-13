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

var harvesters0Num: number = 8;
var harvesters1Num: number = 3;
var upgradersNum: number = 4;
var left_fetcherNum: number = 0;
var repairersNum: number = 2;
var buildersNum: number = 3;
var minerNum: number = 0;
var soliderNum: number = 10;
var transferNum: number = 10;
var outharvesterNum: number = 3;
var minerNum: number = 0;
var harderNum: number = 0;
var doctorNum: number = 0;
var cleanerNum: number = 1;

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
    spawnName?: string)
{
    var home: Room = Game.rooms[roomName]
    var energyCapacityAvailable: number = home.energyCapacityAvailable;
    var energyAvailable: number = home.energyAvailable;
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var harvesters0 = _.filter(harvesters, ((creep) => creep.memory.source_idx == 0));
    var harvesters1 = _.filter(harvesters, ((creep) => creep.memory.source_idx == 1));

    var war_flag: boolean = false

    var closestHostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    if (closestHostiles){
        if (closestHostiles.length > 0){
            war_flag = true
            soliderNum = Math.floor(closestHostiles.length * 1.5) + 1
        }
    }

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

        var doctors = _.filter(Game.creeps, (creep) => creep.memory.role == 'doctor');
        var cleaners = _.filter(Game.creeps, (creep) => creep.memory.role == 'cleaner');
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
        else if (energyAvailable >= 600 && doctors.length < doctorNum)
        {
            var newName = 'Doctor' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([HEAL, HEAL, MOVE, MOVE], newName, {memory: {role: 'doctor'}});
            // Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'harvester', source_idx: 1}});
            console.log('Spawning new Doctor: ' + newName  + " body: 2 HEAL  2 MOVE");
        }
        else if (cleaners.length <= cleanerNum && cleaners.length < cleanerNum)
        {
            var newName = 'Cleaner' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE], newName, {memory: {role: 'cleaner'}})
            console.log('Spawning new cleaner  : ' + newName  + " body: CARRY, MOVE");
        }
        else if (energyAvailable == energyCapacityAvailable){

            var worker0 = _.filter(Game.creeps, ((creep) => creep.memory.source_idx == 0));
            var worker1 = _.filter(Game.creeps, ((creep) => creep.memory.source_idx == 1));
            console.log('0 far:' + worker0.length)
            console.log('1 clo:' + worker1.length)
            var idx = Math.floor((energyAvailable-300) / 50);

            var constructions = Game.rooms[roomName].find(FIND_CONSTRUCTION_SITES);
            
            console.log("constructions.length:", constructions.length)
            if (constructions.length == 0)
            {
                buildersNum = 0
            }

            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            var left_fetchers = _.filter(Game.creeps, (creep) => creep.memory.role == 'left_fetcher');

            var harders = _.filter(Game.creeps, (creep) => creep.memory.role == 'harder');

            var outharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'outharvester');
            var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');

            console.log('***************reuqired number with different role****************')
            console.log('harvester0: ' + harvesters0.length + "\t" + harvesters0Num);
            console.log('harvester1: ' + harvesters1.length + "\t" + harvesters1Num);
            console.log('Upgraders : ' + upgraders.length + "\t" + upgradersNum);
            console.log('Lfetcher  : ' + left_fetchers.length + "\t" + left_fetcherNum);
            console.log('Repairer  : ' + repairers.length + "\t", repairersNum);
            console.log('Builders  : ' + builders.length + "\t", buildersNum);
            console.log('Miner     : ' + miners.length + "\t", minerNum);

            console.log('Harder    : ' + harders.length + "\t", harderNum);
            console.log('Doctor    : ' + doctors.length + "\t", doctorNum);

            console.log('Transfer  : ' + transfers.length + "\t", transferNum);
            console.log('Out harves: ' + outharvesters.length + "\t", outharvesterNum);
            console.log('Cleaner   : ' + cleaners.length + "\t", cleanerNum);
            
            if (harders.length < harderNum){
                var newName = 'Harder' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, 
                                                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'harder'}});
                console.log('Spawning new Harder: ' + newName  + " body: 13 TOUGH  13MOVE");
            }
            else if (outharvesters.length < outharvesterNum){
                var newName = 'Out Havester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName, {memory: {role: 'outharvester'}});
                console.log('Spawning new outharvester: ' + newName  + " body: WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE");
            }
            else if(harvesters1.length < harvesters1Num) {
                var newName = 'Harvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'harvester', source_idx: 1}});
                console.log('Spawning new harvester: ' + newName  + " body: " + body_list[idx]);
            }
            else if(harvesters0.length < harvesters0Num) {
                var newName = 'Harvester' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'harvester', source_idx: 0}});
                console.log('Spawning new harvester: ' + newName  + " body: " + body_list[idx]);
            }
            else if (transfers.length < transferNum){
                var newName = 'Transfer' + Game.time;
                Game.spawns['Spawn1'].spawnCreep([CARRY, MOVE], newName, {memory: {role: 'transfer'}});
                console.log('Spawning new transfer: ' + newName  + " body: CARRY, MOVE");
            }
            else if(upgraders.length < upgradersNum) {
                var newName = 'Upgrader' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'upgrader', source_idx: Math.random() > 0.5 ? 1 : 0}});
                console.log('Spawning new upgrader : ' + newName  + " body: " + body_list[idx]);
                
            }
            else if(repairers.length < repairersNum) {
                var newName = 'Repairer' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'repairer', source_idx: Math.random() > 0.5 ? 1 : 0}});
                console.log('Spawning new repairer : ' + newName  + " body:" + body_list[idx]);
            }
            else if (builders.length <= buildersNum)
            {
                var newName = 'Builder' + Game.time;
                Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'builder', source_idx: Math.random() > 0.5 ? 1 : 0}});
                console.log('Spawning new builder  : ' + newName  + " body: " + body_list[idx]);
            }
            else if (war_flag){
                // // war
                // var war_flag: boolean = false
                if (war_flag){
                    // status check
                    if (Game.spawns['Spawn1'].spawning){
                        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
                        Game.spawns['Spawn1'].room.visual.text(
                            '🛠️' + spawningCreep.memory.role,
                            Game.spawns['Spawn1'].pos.x + 1, 
                            Game.spawns['Spawn1'].pos.y, 
                            {align: 'left', opacity: 0.8});
                    }
                    else {
                            
                            if (energyAvailable >= 670){
                            var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
                            var idx = Math.floor((energyAvailable-300) / 50);
                            if(soldiers.length < soliderNum){
                                console.log('Soldiers  : ' + soldiers.length + "\t" + soliderNum);
                                var newName = 'Soldier' + Game.time;
                                Game.spawns['Spawn1'].spawnCreep([TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'soldier', source_idx: 1}});
                                console.log('Spawning new soldier: ' + newName  + " body: " + '[TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE]');
                            }
                        }
                    }
                }
            }
           
                // else if (left_fetchers.length < left_fetcherNum){
                //     var newName = 'Left_fetchers' + Game.time;
                //     Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'left_fetcher', source_idx: source_idx}});
                //     console.log('Spawning new left_fetcher: ' + newName  + " body: " + body_list[idx]);
                // }
                // else if(miners.length < mimerNum) {
                //     var newName = 'Miner' + Game.time;
                //     Game.spawns['Spawn1'].spawnCreep(body_list[idx], newName, {memory: {role: 'miner'}});
                //     console.log('Spawning new miner    : ' + newName  + " body:  " + body_list[idx]);
                // }
        }
    }
}