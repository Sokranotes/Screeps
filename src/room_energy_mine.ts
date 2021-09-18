import * as $ from "./超级移动优化"

// 控制自己房间的挖矿逻辑
// 找到挖矿点，并存储在Room中，如果有Container配合，存储对应的pos
// 生成Creep

import { contains } from "lodash"
import { transfer_work } from "./role/base/transfer";

var transfer_num: number[] = [4, 3]

export const room_energy_mine = function(roomName: string, spawnName?: string)
{
    // 目标房间
    var room: Room = Game.rooms[roomName]
    var myroom: Room = Game.rooms['W47S14']
    var energyAvailable: number = myroom.energyAvailable;
    if (room.memory.auto_energy_mine == undefined){
        var sources: Source[]
        var sources_num: number
        var containers_num: number
        var containers: StructureContainer[]
        if (room.memory.source_ids == undefined){
            // 找到该房间所有能量source并存id
            sources = room.find(FIND_SOURCES)
            sources_num = sources.length
            room.memory.source_ids = new Array(sources_num)
            for (var i: number = 0; i < sources_num; i++){
                room.memory.source_ids[i] = sources[i].id;
            }
        }
        else{
            sources_num = room.memory.source_ids.length
        }
        // 其他状态量
        // creep数量记录，第一维表示source，第二维表示 harvester transfer
        room.memory.source_harvester_states = new Array(sources_num)
        room.memory.source_transfer_states = new Array(sources_num)
        room.memory.source_transfer_num = new Array(sources_num);
        room.memory.source_container_ids = new Array(sources_num)
        room.memory.source_types = new Array<string>(sources_num)
        var arr: number[]
        for (var i: number = 0; i < sources_num; i++){
            room.memory.source_harvester_states[i] = 0
            room.memory.source_transfer_states[i] = 0
        }
        // 找到所有containers
        containers = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        containers_num = containers.length
        // 找到该房间所有container并存id
        room.memory.container_ids = new Array(containers_num)
        for (var i: number = 0; i < containers_num; i++){
            room.memory.container_ids[i] = containers[i].id;
        }
        containers_num = room.memory.container_ids.length
        // judge cost and profit

        // 为各个能量source生成creep
        room.memory.source_distance = new Array(sources_num)
        room.memory.source_gets = new Array(sources_num)
        room.memory.source_costs = new Array(sources_num)
        var newName: string
        var source: Source
        var container: StructureContainer
        var pos: RoomPosition
        // console.log("测试1")
        // 遍历所有source
        for (var i: number = 0; i < sources_num; i++){
            room.memory.source_gets[i] = 0
            source = Game.getObjectById(room.memory.source_ids[i])
            // 遍历所有container
            for (var j: number = 0; j < containers_num; j++){
                container = Game.getObjectById(room.memory.container_ids[j])
                if (container){
                    // 两个container source距离太近可能会导致bug
                    // judge source是否有container
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 && 
                    (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1){
                        room.memory.source_types[i] = 'no_carry'
                        pos = container.pos
                        room.memory.source_container_ids[i] = container.id
                        break
                    }
                }
            }
            if (room.memory.source_types[i] == undefined){
                room.memory.source_types[i] = 'carry'
            }
            else{
                if (!Game.spawns[spawnName].spawning){
                    newName = 'Harvester_no_carry' + Game.time;
                    if (source.energyCapacity == 3000 && energyAvailable >= 750){
                        if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], newName, 
                            {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}}) == OK){
                                room.memory.source_harvester_states[i] = 1
                                room.memory.source_costs[i] = 750
                                room.memory.auto_energy_mine = true
                                console.log('Spawning new Harvester_no_carry  : ' + newName  + " body: WORK 5, MOVE 5");
                                break
                            }
                    }
                    else if (source.energyCapacity == 1500  && energyAvailable >= 450){
                        if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], newName, 
                            {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}}) == OK){
                                room.memory.source_harvester_states[i] = 1
                                room.memory.source_costs[i] = 450
                                room.memory.auto_energy_mine = true
                                console.log('Spawning new Harvester_no_carry  : ' + newName  + " body: WORK 3, MOVE 3");
                                break
                            }
                    }
                }
            }
            break
        }
    }
    containers_num = room.memory.container_ids.length
    sources_num = room.memory.source_ids.length
    room.memory.source_transfer_states = new Array(sources_num)
    for (var i: number = 0; i < sources_num; i++){
        room.memory.source_harvester_states[i] = 0
        room.memory.source_transfer_states[i] = 0
    }
    for (var i: number = 0; i < sources_num; i++){
        room.memory.source_transfer_num[i] = transfer_num[i]
        var energy_harvester_no_carrys = _.filter(Game.creeps, (creep) => creep.memory.role == 'energy_harvester_no_carry' && creep.memory.source_idx == i && creep.ticksToLive > 100);
        room.memory.source_harvester_states[i] = energy_harvester_no_carrys.length
        var active_transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'active_transfer' && creep.memory.source_container_idx == i && creep.ticksToLive > 100);
        room.memory.source_transfer_states[i] = active_transfers.length
        // console.log(active_transfers.length)
    }
    // console.log(room.memory.source_ids.length)
    for (var i: number = 0; i < room.memory.source_ids.length; i++){
        source = Game.getObjectById(room.memory.source_ids[i])
        // console.log(source)
        if (room.memory.source_harvester_states[i] == 0){
            containers_num = room.memory.container_ids.length
            for (var j: number = 0; j < containers_num; j++){
                container = Game.getObjectById(room.memory.container_ids[j])
                if (container){
                    // 两个container source距离太近可能会导致bug
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 && 
                    (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1){
                        room.memory.source_types[i] = 'no_carry'
                        pos = container.pos
                        room.memory.source_container_ids[i] = container.id
                        break
                    }
                }
            }
            if (room.memory.source_types[i] == undefined){
                room.memory.source_types[i] = 'carry'
            }
            else if (!Game.spawns[spawnName].spawning){
                newName = 'energy_harvester_no_carry' + Game.time;
                if (source.energyCapacity == 3000 && energyAvailable >= 750){
                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], newName, 
                        {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}}) == OK){
                            room.memory.source_harvester_states[i] = 1
                            room.memory.source_costs[i] = room.memory.source_costs[i] + 750
                            console.log('Spawning new energy_harvester_no_carry  : ' + newName  + " body: WORK 5, MOVE 5");
                            break
                        }
                }
                else if (source.energyCapacity == 1500  && energyAvailable >= 450){
                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], newName, 
                        {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}}) == OK){
                            room.memory.source_harvester_states[i] = 1
                            room.memory.source_costs[i] = room.memory.source_costs[i] + 450
                            console.log('Spawning new energy_harvester_no_carry  : ' + newName  + " body: WORK 3, MOVE 3");
                            break
                        }
                }
            }
        }
        // console.log(room.memory.source_transfer_states[i] < room.memory.source_transfer_num[i])
        if (room.memory.source_transfer_states[i] < room.memory.source_transfer_num[i]){
            if (!Game.spawns[spawnName].spawning){
                if (energyAvailable >= 500){
                    if (room.memory.source_types[i]){
                        newName = 'active_transfer' + Game.time;
                        if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, 
                            {memory: {role: 'active_transfer', source_container_idx: i}}) == OK){
                                room.memory.source_transfer_states[i] = room.memory.source_transfer_states[i] + 1
                                room.memory.source_costs[i] = room.memory.source_costs[i] + 500
                                console.log('Spawning new active_transfer  : ' + newName  + " body: CARRY 5, MOVE 5");
                                break
                            }
                    }
                }
            }
        }
    }
}