import { mainUniversal } from '../Universal/mainUniversal';
import { errorMapper } from '../modules/errorMapper'
import "../modules/超级移动优化"
// import "./modules/strategy_marketPrice"

import { base_transfer_work } from "@/Sokranotes/room_base/base_transfer";
import { builder_work } from "@/Sokranotes/room_base/builder";
import { repairer_work } from "@/Sokranotes/room_base/repairer";
import { cleaner_work } from "@/Sokranotes/room_base/cleaner";
import { tmp_attack_work } from "@/Sokranotes/room_base/tmp_attack";
import { occupy_work } from "@/Sokranotes/occupy/occupy";
import { help_work } from "@/Sokranotes/room_base/help_worker";
import { harvest_build_work } from '../Universal/room_base/level2/harvest_build_worker';
import { harvest_upgrade_same_work } from '../Universal/room_base/level1/harvest_upgrade_same_worker';
import { source_energy_mine } from '@/Universal/room_base/universal_logic/source_energy_mine';
import { energy_harvester_link_work } from '@/Sokranotes/room_base/energy_harvester_link';
import { upgrader_link_work } from '@/Sokranotes/room_base/upgrader_link';
import { doing } from '../Universal/room_base/universal_logic/spawn';
import { harvest_upgrade_work } from '../Universal/room_base/level1/harvest_upgrade_worker';
import { harvest_fill_work } from '../Universal/room_base/level2/harvest_fill_worker';
import { harvest_repair_work } from '../Universal/room_base/level2/harvest_repair_worker';
import { tmp_transfer_work } from '../Sokranotes/room_base/tmp_transfer';
import { sell_energy } from '../Sokranotes/sell_energy';

global.group_friends_rooms = new Set(['W49S15', 'W49S17', 'W49S19', 'W48S18', 'W47S19', 'W41S41', 'W39S23', 'W39S35', 'W38S28', 'W31S39', 'W42S43', 'W46S11', 'W44S2', 'W42S2', 'W39S8', 'W14N12', 'W12N15', 'W12N13', 'W11N19', 'E29N3', 'W41S11', 'W19N21', 'W9N51', 'W9S49', 'E19N19', 'E19N11', 'E29S21', 'E29S29'])

global.terminal_energy_bottom_limit = 50000 // terminal中最低能量，少于该值且storage中更多时，能量往里放
global.terminal_energy_top_limit = 150000 // terminal中最高能量
global.terminal_energy_bottom_free_limit = 50000 // free capacity 大于该值往terminal中放能量
global.terminal_energy_top_free_limit = 30000 // free capacity小于该值从terminal中取出能量
global.storage_energy_bottom_limit = 50000 // storage中最低能量限制

// storage及terminal的能量超过下列限制时，开始卖能量
global.storage_limit = global.terminal_energy_top_limit + global.storage_energy_bottom_limit // 保证能量卖光了之后，storage中能量数量不少于最低能量限制
global.terminal_limit = 80000 // terminal中能量达到这个数开始卖，最多卖卖光，即global.terminal_energy_top_limit

global.white_list = new Set(['Mofeng', 'ExtraDim', '6g3y']);
global.sell_energy = sell_energy;

if (Game.flags.Appassionata){
    console.log(Game.time, 'Appassionata new push')
    let rooms: string[] = ['W14N12', 'E29N3', 'W12N15', 'W12N13', 'W11N19']
    for (let idx in rooms){
        Memory.rooms[rooms[idx]].check_spawn_queue_flag = true
    }
}

export const loop = errorMapper(() => {
    if (Game.shard.name == 'shard2'){
        if(Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
        return
    }
    if (Game.flags.Appassionata){

        if(Game.cpu.bucket == 10000) {
            Game.cpu.generatePixel();
        }
        if (Game.time % 100 == 77){
            let rooms: string[] = ['W14N12', 'E29N3', 'W12N15', 'W12N13', 'W11N19']
            for (let idx in rooms){
                Memory.rooms[rooms[idx]].check_spawn_queue_flag = true
            }
        }
        let rooms: string[]
        let roomName = 'E29N3'
        if (Game.rooms[roomName]){
            rooms = [roomName]
            if (Game.flags.showControllerInfo){
                if (Game.rooms[roomName]? Game.rooms[roomName].controller ? Game.rooms[roomName].controller.my ? true: false : false : false)
                    console.log(roomName, ' level:', Game.rooms[roomName].controller.level, ' ticksToDowngrade:', Game.rooms[roomName].controller.ticksToDowngrade, ' rate:', Game.rooms[roomName].controller.progress/Game.rooms[roomName].controller.progressTotal, ' need:', Game.rooms[roomName].controller.progressTotal - Game.rooms[roomName].controller.progress)
                else
                    console.log(roomName, ' is not mine.')
            }
            mainUniversal(rooms)
        }
        roomName = 'W12N15'
        if (Game.rooms[roomName]){
            rooms = [roomName]
            if (Game.flags.showControllerInfo){
                if (Game.rooms[roomName]? Game.rooms[roomName].controller ? Game.rooms[roomName].controller.my ? true: false : false : false)
                    console.log(roomName, ' level:', Game.rooms[roomName].controller.level, ' ticksToDowngrade:', Game.rooms[roomName].controller.ticksToDowngrade, ' rate:', Game.rooms[roomName].controller.progress/Game.rooms[roomName].controller.progressTotal, ' need:', Game.rooms[roomName].controller.progressTotal - Game.rooms[roomName].controller.progress)
                else
                    console.log(roomName, ' is not mine.')
            }
            mainUniversal(rooms)
        }
        roomName = 'W12N13'
        if (Game.rooms[roomName]){
            rooms = [roomName]
            if (Game.flags.showControllerInfo){
                if (Game.rooms[roomName]? Game.rooms[roomName].controller ? Game.rooms[roomName].controller.my ? true: false : false : false)
                    console.log(roomName, ' level:', Game.rooms[roomName].controller.level, ' ticksToDowngrade:', Game.rooms[roomName].controller.ticksToDowngrade, ' rate:', Game.rooms[roomName].controller.progress/Game.rooms[roomName].controller.progressTotal, ' need:', Game.rooms[roomName].controller.progressTotal - Game.rooms[roomName].controller.progress)
                else
                    console.log(roomName, ' is not mine.')
            }
            mainUniversal(rooms)
        }
        roomName = 'W11N19'
        if (Game.rooms[roomName]){
            rooms = [roomName]
            if (Game.flags.showControllerInfo){
                if (Game.rooms[roomName]? Game.rooms[roomName].controller ? Game.rooms[roomName].controller.my ? true: false : false : false)
                    console.log(roomName, ' level:', Game.rooms[roomName].controller.level, ' ticksToDowngrade:', Game.rooms[roomName].controller.ticksToDowngrade, ' rate:', Game.rooms[roomName].controller.progress/Game.rooms[roomName].controller.progressTotal, ' need:', Game.rooms[roomName].controller.progressTotal - Game.rooms[roomName].controller.progress)
                else
                    console.log(roomName, ' is not mine.')
            }
            mainUniversal(rooms)
        }
        roomName = 'W14N12'
        if (Game.rooms[roomName]){
            rooms = [roomName]
            if (Game.flags.showControllerInfo){
                if (Game.rooms[roomName]? Game.rooms[roomName].controller ? Game.rooms[roomName].controller.my ? true: false : false : false)
                    console.log(roomName, ' level:', Game.rooms[roomName].controller.level, ' ticksToDowngrade:', Game.rooms[roomName].controller.ticksToDowngrade, ' rate:', Game.rooms[roomName].controller.progress/Game.rooms[roomName].controller.progressTotal, ' need:', Game.rooms[roomName].controller.progressTotal - Game.rooms[roomName].controller.progress)
                else
                    console.log(roomName, ' is not mine.')
            }
            mainUniversal(rooms)
            // if (Game.rooms['W12N12']){
            //     if (Game.time % 1000 == 350){
            //         if (Game.rooms['W12N12'].controller.owner.username == 'MrJakob64'){
            //             Game.rooms['W12N13'].addSpawnTask(23, {name: "tmp_transfer" + Game.time, bodyParts: [MOVE,MOVE,MOVE,CLAIM,CLAIM,CLAIM],memory: {role: 'tmp_transfer',}})
            //         }
            //     }
            // }
            // if (Game.time % 1500 == 750){
            //     let storage: StructureStorage = Game.getObjectById<StructureStorage>('623527ec6bc5f46100654f52' as Id<StructureStorage>)
            //     if (storage){
            //         if (storage.store.energy > 5000){
            //             Game.rooms['W12N13'].addSpawnTask(25, {name: "tmp_transfer" + Game.time, bodyParts: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],memory: {role: 'tmp_transfer',}})
            //         }
            //     }
            // }
        }
        // if (Game.time % 100 == 2) source_energy_mine('W14N12')
        if (Game.flags.showControllerInfo) Game.flags.showControllerInfo.remove();
    }
    let rooms: string[] = ['W14N12', 'E29N3', 'W12N15', 'W12N13', 'W11N19']
    for (let idx in rooms){
        delete Game.rooms[rooms[idx]].memory.spawning
    }
    /*
    for(let name in Memory.creeps) {
        let creep = Game.creeps[name]
        if(!creep) {
            delete Memory.creeps[name];
        }
        else{
            if(creep.memory.role == 'hu' || creep.memory.role == '_1hu') {}
        }
    }
    source_room = source_room == undefined? room.name: source_room
    */
    doing(Game.spawns)
    for(let name in Memory.creeps) {
        let creep = Game.creeps[name]
        if(!creep) {
            delete Memory.creeps[name];
        }
        else{
            if(creep.memory.role == 'hu' || creep.memory.role == '_1hu') {
                harvest_upgrade_work(creep);
            }
            else if(creep.memory.role == 'upgrader_link') {
                upgrader_link_work(creep);
            }
            else if (creep.memory.role == 'hb'){
                harvest_build_work(creep)
            }
            else if (creep.memory.role == 'hf' || creep.memory.role == '_2hf'){
                harvest_fill_work(creep)
            }
            else if (creep.memory.role == 'hl'){
                energy_harvester_link_work(creep)
            }
            else if (creep.memory.role == 'hr' || creep.memory.role == '_1hr'){
                harvest_repair_work(creep)
            }
            else if (creep.memory.role == 'base_transfer' || creep.memory.role == '_1bs'){
                base_transfer_work(creep)
            }
            else if(creep.memory.role == 'builder') {
                builder_work(creep);
            }
            else if(creep.memory.role == 'repairer') {
                repairer_work(creep);
            }
            else if (creep.memory.role == 'cleaner'){
                cleaner_work(creep)
            }
            else if(creep.memory.role == 'hus') {
                harvest_upgrade_same_work(creep);
            }
            else if (creep.memory.role == 'tmp_attack') {
                tmp_attack_work(creep)
            }
            else if (creep.memory.role == 'tmp_transfer') {
                tmp_transfer_work(creep)
            }
            else if (creep.memory.role == 'occupy'){
                occupy_work(creep)
            }
            // Game.spawns['Spawn3'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM], 'c', {memory: {role: 'occupy'}})
            else if (creep.memory.role == 'help'){
                help_work(creep)
            }
        }
    }
    for (let idx in rooms){
        sell_energy(rooms[idx])
    }
    // if (Game.flags.test){
    //     // todo
    //     Game.flags.test.remove()
    // }
})