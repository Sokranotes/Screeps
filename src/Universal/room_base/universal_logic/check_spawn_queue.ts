import FlatQueue from './../universal_logic/FlatQueue'

export const clear_spawn_queue = function(roomName: string){
    Memory.rooms[roomName].spawnQueue = {}
    new FlatQueue(Game.rooms[roomName].memory.spawnQueue)
}

export const get_role_workers = function(role: string, roomName: string, min_ticksToLive?: number, role_1?: string){
    if (role_1 == undefined){
        if (min_ticksToLive == undefined)
            return _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.room.name == roomName);
        else
            return _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.room.name == roomName && creep.ticksToLive >= min_ticksToLive);
    }
    else{
        if (min_ticksToLive == undefined)
            return _.filter(Game.creeps, (creep) => (creep.memory.role == role || creep.memory.role == role_1) && creep.room.name == roomName);
        else
        return _.filter(Game.creeps, (creep) => (creep.memory.role == role || creep.memory.role == role_1) && creep.room.name == roomName && creep.ticksToLive >= min_ticksToLive);
    }
}

export const check_one_role = function(room: Room, role: string, priority: number, source_idx: number, roleNum: number, role_workers_length: number){
    for (let i = roleNum - role_workers_length; i > 0; i--){
        let data: spawnData = {
            name: (i == 1 ? role : role + i),
            memory: {
                role: role,
                source_idx: source_idx,
            }
        }
        room.addSpawnTask(priority, data)
    }
}