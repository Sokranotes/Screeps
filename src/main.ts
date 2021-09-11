// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import {builder_work} from './role/builder'
import { harvester_work } from './role/harvester';
import { repairer_work } from './role/repairer';
import { upgrader_work } from './role/upgrader';
import { spawn_work } from './spawn';

var roomName: string = 'W47S14'

var harvestersNum: number = 6;
var upgradersNum: number = 8;
var repairersNum: number = 2;
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
    
    spawn_work(roomName)

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