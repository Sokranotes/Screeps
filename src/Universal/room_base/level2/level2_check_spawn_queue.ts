import FlatQueue from './../universal_logic/FlatQueue'

export const level2_check_spawn_queue = function(roomName: string){
    let hfNum: number = 2
    let hf_source_idx = 0

    let huNum: number = 5
    let hu_source_idx = 1

    let hbNum: number = 2
    let hb_source_idx = 0
    let hrNum: number = 1
    let hr_source_idx = 0
    
    // clear the queue
    Memory.rooms[roomName].spawnQueue = {}
    new FlatQueue(Game.rooms[roomName].memory.spawnQueue)

    let room = Game.rooms[roomName]

    let harvest_fill_workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hf' && creep.room.name == roomName && creep.ticksToLive >= 200);
    let harvest_upgrade_workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hu' && creep.room.name == roomName && creep.ticksToLive >= 150);

    let constructions = room.find(FIND_MY_CONSTRUCTION_SITES)
    let harvest_build_workers: Creep[] = []
    let harvest_repair_workers: Creep[]
    if (constructions.length == 0){
        hbNum = 0
        harvest_repair_workers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'hb' || creep.memory.role == 'hr') && creep.room.name == roomName && creep.ticksToLive <= 150);
    }
    else{
        harvest_build_workers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'hb') && creep.room.name == roomName && creep.ticksToLive <= 150);
        harvest_repair_workers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'hr') && creep.room.name == roomName && creep.ticksToLive <= 150);
    }

    for (let i = hfNum - harvest_fill_workers.length; i > 0; i--){
        let priority: number = 0
        let data: spawnData = {
            name: (i == 1 ? '' : '_' + i),
            memory: {
                role: 'hf',
                source_idx: hf_source_idx,
            }
        }
        room.addSpawnTask(priority, data)
    }

    for (let i = huNum - harvest_upgrade_workers.length; i > 0; i--){
        let priority: number = 10
        let data: spawnData = {
            name: (i == 1 ? '' : '_' + i),
            memory: {
                role: 'hu',
                source_idx: hu_source_idx,
            }
        }
        room.addSpawnTask(priority, data)
    }

    for (let i = hbNum - harvest_build_workers.length; i > 0; i--){
        let priority: number = 20
        let data: spawnData = {
            name: (i == 1 ? '' : '_' + i),
            memory: {
                role: 'hb',
                source_idx: hb_source_idx,
            }
        }
        room.addSpawnTask(priority, data)
    }

    for (let i = hrNum - harvest_repair_workers.length; i > 0; i--){
        let priority: number = 15
        let data: spawnData = {
            name: (i == 1 ? '' : '_' + i),
            memory: {
                role: 'hr',
                source_idx: hr_source_idx,
            }
        }
        room.addSpawnTask(priority, data)
    }
}