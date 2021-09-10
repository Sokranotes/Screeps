// 引入外部依赖
import { errorMapper } from './modules/errorMapper'

export const loop = errorMapper(() => {
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
    
    var ec = Game.rooms[roomname].energyCapacityAvailable;
    // console.log(ec);
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log(harvesters.length);
    // console.log(harvesters.length < harvestersNum);
    if (harvesters.length == 0){
        var newName = 'Harvester' + Game.time;
        console.log(Game.rooms[roomname].energyAvailable);
        // console.log(parseInt(ec/100)*100);
        // console.log(Game.rooms['sim'].energyAvailable <= parseInt(ec/100)*100);
        if (Game.rooms[roomname].energyAvailable >= 600){
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
        }
        else if (Game.rooms[roomname].energyAvailable >= 500){
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
        }
        
        else if (Game.rooms[roomname].energyAvailable >= 400){
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester WORK, WORK, WORK, CARRY, MOVE: ' + newName);
        }
        else{
            Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
            console.log('Spawning new harvester WORK, WORK, CARRY, MOVE: ' + newName);
        }
    }
    // console.log('energyAvailable:' + Game.rooms['sim'].energyAvailable + " energyCapacityAvailable:" + parseInt(ec/100)*100);
    // console.log(Game.rooms['sim'].energyAvailable + " " + parseInt(ec/100)*100);
    if (Game.rooms[roomname].energyAvailable >= parseInt(ec/100)*100){
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
            // console.log(parseInt(ec/100)*100);
            // console.log(parseInt(ec/100)*100 == 300);
            // console.log(parseInt(ec/100)*100 == 400);
            // console.log(parseInt(ec/100)*100 == 500);
            if (parseInt(ec/100)*100 == 300){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 400){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 500){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 600){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 650){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 700){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 750){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'harvester'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable >= 800){
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
            if (parseInt(ec/100)*100 == 300){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new upgrader WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 400){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new upgrader WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 500){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new upgrader WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 >= 600){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new upgrader WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 650){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 700){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'upgrader', source: sou}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 750){
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
            if (parseInt(ec/100)*100 == 300){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new builder WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 400){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new builder WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 500){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new builder WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 600){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new builder WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 650){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 700){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 750){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable >= 800){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'repairer'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
        }else if(builder.length < buildersNum) {
            var newName = 'Builder' + Game.time;
            if (parseInt(ec/100)*100 == 300){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new builder WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 400){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new builder WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 500){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new builder WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (parseInt(ec/100)*100 == 600){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new builder WORK, WORK, WORK, WORK, WORK, CARRY, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 650){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 700){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable == 750){
                Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], newName, {memory: {role: 'builder'}});
                console.log('Spawning new harvester WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE: ' + newName);
            }
            else if (Game.rooms[roomname].energyAvailable >= 800){
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
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
})