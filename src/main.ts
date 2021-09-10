// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import {builder_work} from './role/builder'
import { harvester_work } from './role/harvester';
import { repairer_work } from './role/repairer';
import { upgrader_work } from './role/upgrader';

var roomName: string = 'W47S14'

var harvestersNum: number = 12;
var upgradersNum: number = 8;
var repairersNum: number = 3;
var buildersNum: number = 6;


export const loop = errorMapper(() => {
    // console.log('hello')
    // console.log(Game.spawns['Spawn1'].room.energyAvailable)
    // console.log(Game.rooms['sim'].name)
    // console.log(Game.rooms['sim'].energyAvailable)
    
    // console.log(Math.random())

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var ec: number = Game.rooms[roomName].energyCapacityAvailable;
    // console.log(ec);
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log(harvesters.length);
    // console.log(harvesters.length < harvestersNum);
    if (harvesters.length == 0){
        var newName = 'Harvester' + Game.time;
        console.log(Game.rooms[roomName].energyAvailable);
        // console.log(Math.floor(ec/100)*100);
        // console.log(Game.rooms['sim'].energyAvailable <= Math.floor(ec/100)*100);
        if (Game.rooms[roomName].energyAvailable >= 600){
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
        }
        else if (Game.rooms[roomName].energyAvailable >= 500){
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
        }
        
        else if (Game.rooms[roomName].energyAvailable >= 400){
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester WORK, WORK, WORK, CARRY, MOVE: ' + newName);
        }
        else{
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester WORK, WORK, CARRY, MOVE: ' + newName);
        }
    }
    // console.log('energyAvailable:' + Game.rooms['sim'].energyAvailable + " energyCapacityAvailable:" + Math.floor(ec/100)*100);
    // console.log(Game.rooms['sim'].energyAvailable + " " + Math.floor(ec/100)*100);
    if (Game.rooms[roomName].energyAvailable >= Math.floor(ec/100)*100){
        // console.log('energy full');
        
        console.log('Harvesters: ' + harvesters.length);
        // console.log(harvesters.length);
        // console.log(harvestersNum);
        // console.log(harvesters.length < harvestersNum);
        
        var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        console.log('Upgraders: ' + upgrader.length);
        
        var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        console.log('Repairer: ' + repairer.length);
        
        var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        console.log('Builders: ' + builder.length);
        
        if (Game.spawns['Spawn1'].spawning){
            console.log('spawning');
        }
        else if(harvesters.length < harvestersNum) {
            var newName = 'Harvester' + Game.time;
            // console.log(Game.time);
            // console.log(newName);
            // console.log(Math.floor(ec/100)*100);
            // console.log(Math.floor(ec/100)*100 == 300);
            // console.log(Math.floor(ec/100)*100 == 400);
            // console.log(Math.floor(ec/100)*100 == 500);
            if (Math.floor(ec/100)*100 == 300){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 400){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 500){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 600){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 650){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 700){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 750){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable >= 800){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
        }
        else if(upgrader.length < upgradersNum) {
            var newName = 'Upgrader' + Game.time;
            var sou = 0;
            if (Math.random() < 0.75){
                sou = 0;
            }
            else{
                sou = 3;
            }
            if (Math.floor(ec/100)*100 == 300){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new upgrader WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 400){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new upgrader WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 500){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new upgrader WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 >= 600){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new upgrader WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 650){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 700){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 750){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms['sim'].energyAvailable >= 800){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
        }
        else if(repairer.length < repairersNum) {
            var newName = 'Repairer' + Game.time;
            if (Math.floor(ec/100)*100 == 300){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new builder WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 400){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new builder WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 500){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new builder WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 600){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new builder WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 650){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 700){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 750){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable >= 800){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
        }else if(builder.length < buildersNum) {
            var newName = 'Builder' + Game.time;
            if (Math.floor(ec/100)*100 == 300){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new builder WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 400){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new builder WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 500){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new builder WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Math.floor(ec/100)*100 == 600){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new builder WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 650){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 700){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable == 750){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomName].energyAvailable >= 800){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
        }
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            harvester_work(creep);
        }
        if(creep.memory.role == 'upgrader') {
            upgrader_work(creep);
        }
        if(creep.memory.role == 'repairer') {
            repairer_work(creep);
        }
        if(creep.memory.role == 'builder') {
            builder_work(creep);
        }
    }
})