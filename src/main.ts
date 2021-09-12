// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import {builder_work} from './role/builder'
import { harvester_work } from './role/harvester';
import { miner_work } from './role/miner';
import { repairer_work } from './role/repairer';
import { soldier_work } from './role/soldier';
import { upgrader_work } from './role/upgrader';
import { spawn_work } from './spawn';
import { transfer_work } from './role/transfer';

var roomName: string = 'W47S14'

var harvestersNum: number = 13;
var upgradersNum: number = 10;
var repairersNum: number = 1;
var buildersNum: number = 2;
var minerNum: number = 0;
var soliderNum: number = 0;
var transferNum: number = 0;


export const loop = errorMapper(() => {

    // console.log('test 2021 09 11 19 54')

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawn_work(roomName, harvestersNum, upgradersNum, repairersNum, buildersNum, minerNum, soliderNum, transferNum)

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // if (creep.memory.role == 'soldier'){
        //     soldier_work(creep, roomName);
        // }
        // if (creep.memory.role == 'transfer'){
        //     transfer_work(creep, roomName)
        // }
        if(creep.memory.role == 'harvester') {
            harvester_work(creep, roomName);
        }
        if(creep.memory.role == 'upgrader') {
            upgrader_work(creep, roomName);
        }
        if(creep.memory.role == 'repairer') {
            repairer_work(creep, roomName);
        }
        if(creep.memory.role == 'builder') {
            builder_work(creep, roomName);
        }
        // if (creep.memory.role == 'miner'){
        //     miner_work(creep, roomName)
        // }
    }
})