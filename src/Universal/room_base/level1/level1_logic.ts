// room controller is my
// need spawn

import { upgrader_work } from "./upgrader";


export const level1_logic = function(roomName: string){
    let spawnName = 'Spawn1'
    let upgradersNum: number = 3
    let source_idx = 1

    for(let name in Memory.creeps) {
        let creep = Game.creeps[name]
        if(!creep) {
            delete Memory.creeps[name];
        }
        else{
            if(creep.memory.role == 'upgrader') {
                upgrader_work(creep);
            }
        }
    }

    let room: Room = Game.rooms[roomName]

    // safe mode
    if (Game.spawns[spawnName].notifyWhenAttacked(true) == OK && Game.spawns[spawnName].hits < 0.6*Game.spawns[spawnName].hitsMax){
        room.controller.activateSafeMode()
    }
    
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == roomName);
    if (room.memory.sources_id == undefined){
        let sources = room.find(FIND_SOURCES)
        Memory.rooms[room.name].sources_id = new Array(sources.length)
        for (let i: number = 0; i < sources.length; i++){
            Memory.rooms[room.name].sources_id[i] = sources[i].id;
        }
    }
    if(Game.spawns[spawnName].spawning) { 
        let spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
        Game.spawns[spawnName].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawnName].pos.x + 1, 
            Game.spawns[spawnName].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else if (upgraders.length < upgradersNum){
        let newName = 'Upgrader' + Game.time;
        if (room.energyAvailable >= 250){
            Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'upgrader', source_idx: source_idx}});
        }
    }
}