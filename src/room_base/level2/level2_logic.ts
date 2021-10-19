// room controller is my
// need spawn, extension site or road site

import { upgrader_work } from "../level1/upgrader";
import { builder_work } from "./builder";
import { harvester_work } from "./harvester";
import { repairer_work } from "./repairer";

export const level2_logic = function(roomName){
    let spawnName = 'Spawn1'
    let harvestersNum: number = 3
    let upgradersNum: number = 5
    let buildersNum: number = 3
    let builder_source_idx = 0
    let harvester_source_idx = 0
    let upgrader_source_idx = 1
    // 指定spawnCreep的source_idx

    for(let name in Memory.creeps) {
        let creep = Game.creeps[name]
        if(!creep) {
            delete Memory.creeps[name];
        }
        else{
            if(creep.memory.role == 'upgrader') {
                upgrader_work(creep);
            }
            else if (creep.memory.role == 'builder'){
                builder_work(creep)
            }
            else if (creep.memory.role == 'harvester'){
                harvester_work(creep)
            }
            else if (creep.memory.role == 'repairer'){
                repairer_work(creep)
            }
        }
    }

    let room = Game.rooms[roomName]
    if (room.memory.sources_id == undefined){
        let sources = room.find(FIND_SOURCES)
        Memory.rooms[room.name].sources_id = new Array(sources.length)
        for (let i: number = 0; i < sources.length; i++){
            Memory.rooms[room.name].sources_id[i] = sources[i].id;
        }
    }

    // safe mode
    if (Game.spawns[spawnName].notifyWhenAttacked(true) == OK && Game.spawns[spawnName].hits < 0.6*Game.spawns[spawnName].hitsMax){
        Game.rooms[roomName].controller.activateSafeMode()
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == roomName);
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == roomName);
    let builders = _.filter(Game.creeps, (creep) => (creep.memory.role == 'builder' || creep.memory.role == 'repairer') && creep.room.name == roomName);
    let constructions = room.find(FIND_CONSTRUCTION_SITES)
    if (constructions.length == 0){
        buildersNum = 1
        harvestersNum = harvestersNum + 1
        upgradersNum = upgradersNum + 1
    }
    if(Game.spawns[spawnName].spawning) { 
        let spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1, 
            Game.spawns[spawnName].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else{
        let newName
        let bodys = [WORK, CARRY, MOVE, MOVE]
        let opts = {}
        let flag = false
        if (harvesters.length < 1){
            flag = true
            newName = 'Harvester' + Game.time
            opts = {memory: {role: 'harvester', source_idx: harvester_source_idx}}
        }
        else if (builders.length < 1){
            flag = true
            newName = 'Builder' + Game.time;
            opts = {memory: {role: 'builder', source_idx: builder_source_idx}}
        }
        else if (upgraders.length < 1){
            flag = true
            newName = 'Upgrader' + Game.time
            opts = {memory: {role: 'upgrader', source_idx: upgrader_source_idx}}
        }
        else{
            if (harvesters.length < harvestersNum){
                flag = true
                newName = 'Harvester' + Game.time
                opts = {memory: {role: 'harvester', source_idx: harvester_source_idx}}
            }
            else if (builders.length < buildersNum){
                flag = true
                newName = 'Builder' + Game.time;
                opts = {memory: {role: 'builder', source_idx: builder_source_idx}}
            }
            else if (upgraders.length < upgradersNum){
                flag = true
                newName = 'Upgrader' + Game.time
                opts = {memory: {role: 'upgrader', source_idx: upgrader_source_idx}}
            }
            if (flag){
                switch (room.energyCapacityAvailable){
                    case 300:
                    case 350:
                        bodys = [WORK, CARRY, MOVE, MOVE]
                        break
                    case 400:
                    case 450:
                        bodys = [WORK, WORK, CARRY, MOVE, MOVE, MOVE]
                        break
                    case 500:
                    case 550:
                        bodys = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
                        break
                    default:
                        bodys = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
                }
            }
        }
        if (flag){
            Game.spawns[spawnName].spawnCreep(bodys, newName, opts)
        }
    }
}