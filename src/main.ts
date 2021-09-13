// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import {builder_work} from './role/builder'
import { harvester_work } from './role/harvester';
import { miner_work } from './role/miner';
import { repairer_work } from './role/repairer';
import { soldier_work } from './role/soldier';
import { upgrader_work } from './role/upgrader';
import { spawn_work } from './spawn';
import { left_fetch_work } from './role/left_fetch';
// import * as $ from './超级移动优化bypass (临时)'

var roomName: string = 'W47S14'

export const loop = errorMapper(() => {

    // console.log('test 2021 09 11 19 54')

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawn_work(roomName)

    var tower: MY_STRUCTURE_TOWER = Game.getObjectById('613e1e2c2acf7910898bae98');
    if (tower.hits <= 0.5*tower.hitsMax || Game.spawns['Spawn1'].hits <= 0.5*Game.spawns['Spawn1'].hitsMax)
    {
        Game.rooms[roomName].controller.activateSafeMode()
    }
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            console.log(Game.time + ' 发现敌军 ' + closestHostile.pos.x + " " + closestHostile.pos.y + closestHostile.owner)
            tower.attack(closestHostile);
        }
        // else{
        //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        //         filter: (structure) => structure.hits < structure.hitsMax
        //     });
        //     if(closestDamagedStructure) {
        //         tower.repair(closestDamagedStructure);
        //     }
        // }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'soldier'){
            soldier_work(creep, roomName);
        }
        if(creep.memory.role == 'harvester') {
            harvester_work(creep, roomName);
        }
        if(creep.memory.role == 'upgrader') {
            upgrader_work(creep, roomName);
        }
        if(creep.memory.role == 'builder') {
            builder_work(creep, roomName);
        }
        if (creep.memory.role == 'left_fetcher'){
            var dest: string = "W48S14"
            left_fetch_work(creep, roomName, dest);
        }
        if(creep.memory.role == 'repairer') {
            repairer_work(creep, roomName);
        }
        // if (creep.memory.role == 'miner'){
        //     miner_work(creep, roomName)
        // }
    }
})