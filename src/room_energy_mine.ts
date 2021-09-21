import * as $ from "./超级移动优化"

// 控制自己房间的挖矿逻辑
// 找到挖矿点，并存储在Room中，如果有Container配合，存储对应的pos
// 生成Creep

// 暂缺不同level(不同energy available)的代码

import { contains, initial } from "lodash"
import { transfer_work } from "./role/base/transfer";
import { active_transfer_work } from "./role/base/atcive_transfer";
import { energy_harvester_no_carry_work } from "./role/base/energy_harvester_no_carry";
import { harvester_work } from "./role/base/harvester";

var transfer_num: number[] = [2, 1]
var harvester_num: number[] = [1, 1]

const room_energy_mine_init = function(room: Room){
    /* 如果没开启自动挖矿, 则进行初始化操作
    初始化的值有:
    是否初始化, 初始化之后只能手动变化
    room.memory.auto_energy_mine
    初始化之后永不变化
    room.memory.sources_id
    room.memory.sources_num

    需要从配置中读取
    room.memory.source_harvester_num
    room.memory.source_transfer_num
    常规流程中每一次都需要更新
    room.memory.source_harvester_states
    room.memory.source_transfer_states
    container相关状态量, 需要检查是否有变更并及时修改
    room.memory.container_ids
    room.memory.source_container_ids

    其他状态量
    room.memory.source_distance
    room.memory.source_gets
    room.memory.source_costs*/
    var sources_num: number
    var containers_num: number
    if (room.memory.auto_energy_mine == undefined){
        var sources: Source[]
        var containers: StructureContainer[]

        // 如果没有存source_ids, 找到该房间所有能量source并存id
        if (room.memory.sources_id == undefined){
            sources = room.find(FIND_SOURCES)
            room.memory.sources_num = sources.length
            sources_num = room.memory.sources_num
            room.memory.sources_id = new Array(sources_num)
            for (var i: number = 0; i < sources_num; i++){
                room.memory.sources_id[i] = sources[i].id
            }
        }
        else{
            sources_num = room.memory.sources_num
        }

        // 数量设置状态量
        room.memory.source_harvester_num = new Array(sources_num)
        room.memory.source_transfer_num = new Array(sources_num)
        // harvester和transfer的数量记录
        room.memory.source_harvester_states = new Array(sources_num)
        room.memory.source_transfer_states = new Array(sources_num)
        // 初始化harvester和transfer的数量记录
        for (var i: number = 0; i < sources_num; i++){
            room.memory.source_harvester_states[i] = 0
            room.memory.source_transfer_states[i] = 0
        }
        // 其他状态量
        room.memory.source_distance = new Array(sources_num)
        room.memory.source_gets = new Array(sources_num)
        room.memory.source_costs = new Array(sources_num)
        // source对应的container id
        room.memory.source_container_ids = new Array(sources_num)

        // 初始化, 找到该房间所有container并存id
        containers = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        containers_num = containers.length
        room.memory.containers_num = containers_num
        room.memory.containers_id = new Array(containers_num)
        for (var i: number = 0; i < containers_num; i++){
            room.memory.containers_id[i] = containers[i].id;
        }

        // 为各个能量source生成harvester creep
        var source: Source
        var container: StructureContainer
        // 遍历所有source 找到source旁边的container, 初始化source_container_ids
        for (var i: number = 0; i < sources_num; i++){
            room.memory.source_gets[i] = 0
            source = Game.getObjectById(room.memory.sources_id[i])
            // 遍历所有container
            for (var j: number = 0; j < containers_num; j++){
                container = Game.getObjectById(room.memory.containers_id[j])
                if (container){
                    // 两个container source距离太近可能会导致bug
                    // judge source是否有container, 只考虑source周围8个格子中最先扫描到的那一个
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 && 
                    (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1){
                        room.memory.source_container_ids[i] = container.id
                        break
                    }
                }
            }
        }
        room.memory.auto_energy_mine = true
    }  
} // 初始化结束

const room_energy_mine_routine = function(room: Room, spawnName: string){
    var sources_num: number
    var containers_num: number
    var source: Source
    var container: StructureContainer
    var newName: string
    var energyAvailable: number = room.energyAvailable
    var pos: RoomPosition

    containers_num = room.memory.containers_num
    sources_num = room.memory.sources_num
    // 读取creep个数配置并更新creep个数状态
    for (var i: number = 0; i < sources_num; i++){
        room.memory.source_transfer_num[i] = transfer_num[i]
        room.memory.source_harvester_num[i] = harvester_num[i]
        var energy_harvesters_no_carry = _.filter(Game.creeps, (creep) => creep.memory.role == 'energy_harvester_no_carry' 
                                                                            && creep.memory.source_idx == i 
                                                                            && creep.ticksToLive > 100);
        room.memory.source_harvester_states[i] = energy_harvesters_no_carry.length
        var active_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'active_transfer' 
                                                                && creep.memory.source_container_idx == i 
                                                                && creep.ticksToLive > 100);
        room.memory.source_transfer_states[i] = active_transfers.length
    }

    // 判断container是否有变化(老化, 被摧毁, 重建) 待完善
    for (var i: number = 0; i < sources_num; i++){
        if (Game.getObjectById(room.memory.source_container_ids[i]) == undefined){
            
        }
    }

    for (var i: number = 0; i < sources_num; i++){
        source = Game.getObjectById(room.memory.sources_id[i])
        if (room.memory.source_harvester_states[i] < room.memory.source_harvester_num[i]){
            if (!Game.spawns[spawnName].spawning){
                // 判断是否有container
                if (room.memory.source_container_ids[i] != undefined && room.energyCapacityAvailable >= 750){
                        newName = 'Harvester_no_carry' + Game.time;
                        if (source.energyCapacity == 3000 && energyAvailable >= 750){
                            if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], newName, 
                                {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}}) == OK){
                                    room.memory.source_harvester_states[i] = 1
                                    room.memory.source_costs[i] = 750
                                    room.memory.auto_energy_mine = true
                                    // console.log('Spawning new Harvester_no_carry  : ' + newName  + " body: WORK 5, MOVE 5");
                                    break
                                }
                        }
                        else if (source.energyCapacity == 1500  && energyAvailable >= 450){
                            if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], newName, 
                                {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}}) == OK){
                                    room.memory.source_harvester_states[i] = 1
                                    room.memory.source_costs[i] = 450
                                    // console.log('Spawning new Harvester_no_carry  : ' + newName  + " body: WORK 3, MOVE 3");
                                    break
                                }
                        }
                }
                else{
                //     newName = 'Harvester_with_carry' + Game.time;
                //     if (source.energyCapacity == 3000 && energyAvailable >= 950){
                //         if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName, 
                //             {memory: {role: 'energy_harvester_with_carry', source_idx: i}}) == OK){
                //                 room.memory.source_harvester_states[i] = 1
                //                 room.memory.source_costs[i] = 950
                //                 room.memory.auto_energy_mine = true
                //                 break
                //             }
                //     }
                //     else if (source.energyCapacity == 1500  && energyAvailable >= 600){
                //         if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, 
                //             {memory: {role: 'energy_harvester_with_carry', source_idx: i, container_pos: pos}}) == OK){
                //                 room.memory.source_harvester_states[i] = 1
                //                 room.memory.source_costs[i] = 600
                //                 room.memory.auto_energy_mine = true
                //                 break
                //             }
                //     }
                }
            }

            if (room.memory.source_container_ids[i] != undefined){
                if (!Game.spawns[spawnName].spawning){
                    newName = 'energy_harvester_no_carry' + Game.time;
                    if (source.energyCapacity == 3000 && energyAvailable >= 750){
                        if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], newName, 
                            {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}}) == OK){
                                room.memory.source_harvester_states[i] = 1
                                room.memory.source_costs[i] = room.memory.source_costs[i] + 750
                                // console.log('Spawning new energy_harvester_no_carry  : ' + newName  + " body: WORK 5, MOVE 5");
                                break
                            }
                    }
                    else if (source.energyCapacity == 1500  && energyAvailable >= 450){
                        if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], newName, 
                            {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}}) == OK){
                                room.memory.source_harvester_states[i] = 1
                                room.memory.source_costs[i] = room.memory.source_costs[i] + 450
                                // console.log('Spawning new energy_harvester_no_carry  : ' + newName  + " body: WORK 3, MOVE 3");
                                break
                            }
                    }
                }
            }
            else{
            }
        }
        if (room.memory.source_harvester_states[i] != 0 && (room.memory.source_transfer_states[i] < room.memory.source_transfer_num[i])){
            if (room.memory.source_container_ids[i] == undefined){
                continue
            }
            else{
                if (!Game.spawns[spawnName].spawning){
                    if (energyAvailable >= 500){
                        newName = 'active_transfer' + Game.time;
                        if (Game.spawns[spawnName].spawnCreep([CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE], newName, 
                            {memory: {role: 'active_transfer', source_container_idx: i}}) == OK){
                                room.memory.source_transfer_states[i] = room.memory.source_transfer_states[i] + 1
                                room.memory.source_costs[i] = room.memory.source_costs[i] + 500
                                // console.log('Spawning new active_transfer  : ' + newName  + " body: CARRY 5, MOVE 5");
                                break
                            }
                    }
                }
            }
        }
    }
} // 常规流程结束

export const room_energy_mine = function(roomName: string, spawnName?: string){
    // 目标房间
    var room: Room = Game.rooms[roomName]
    // room空值检查
    if (room == undefined){
        console.log(Game.time, " ", roomName, ' undefined')
        return
    }
    room_energy_mine_init(room)
    room_energy_mine_routine(room, spawnName)
    // 不同role的creep工作
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'active_transfer'){
            active_transfer_work(creep, roomName)
        }
        if (creep.memory.role == 'energy_harvester_no_carry'){
            energy_harvester_no_carry_work(creep, roomName)
        }
    }
}