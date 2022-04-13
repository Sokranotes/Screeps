import { mainUniversal } from './Universal/mainUniversal';
import { errorMapper } from './modules/errorMapper'
import "./modules/超级移动优化"
// import "./modules/strategy_marketPrice"

import { base_transfer_work } from "@/Sokranotes/room_base/base_transfer";
import { builder_work } from "@/Sokranotes/room_base/builder";
import { repairer_work } from "@/Sokranotes/room_base/repairer";
import { cleaner_work } from "@/Sokranotes/room_base/cleaner";
import { tmp_attack_work } from "@/Sokranotes/room_base/tmp_attack";
import { occupy_work } from "@/Sokranotes/occupy/occupy";
import { help_work } from "@/Sokranotes/room_base/help_worker";
import { harvest_upgrade_work } from './Sokranotes/low_level/harvest_upgrade_worker';
import { harvest_build_work } from './Universal/room_base/level2/harvest_build_worker';
import { harvest_fill_work } from './Sokranotes/low_level/harvest_fill_worker';
import { harvest_repair_work } from './Sokranotes/low_level/harvest_repair_worker';
import { harvest_upgrade_same_work } from './Universal/room_base/level1/harvest_upgrade_same_worker';
import { source_energy_mine } from '@/Universal/room_base/universal_logic/source_energy_mine';
import { energy_harvester_link_work } from '@/Sokranotes/room_base/energy_harvester_link';
import { upgrader_link_work } from '@/Sokranotes/room_base/upgrader_link';

global.white_list = new Set(['Mofeng']);

if (Game.flags.Appassionata){
    console.log(Game.time, 'Appassionata new push')
    let rooms: string[] = ['W14N12']
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
        }
        // if (Game.time % 100 == 2) source_energy_mine('W14N12')
        if (Game.flags.showControllerInfo) Game.flags.showControllerInfo.remove();
    }

    for(let name in Memory.creeps) {
        let creep = Game.creeps[name]
        if(!creep) {
            delete Memory.creeps[name];
        }
        else{
            if(creep.memory.role == 'hu') {
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
            else if (creep.memory.role == 'hr'){
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
            else if (creep.memory.role == 'tmp_attack') {
                tmp_attack_work(creep)
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
    // if (Game.flags.test){
    //     // todo
    //     Game.flags.test.remove()
    // }
})