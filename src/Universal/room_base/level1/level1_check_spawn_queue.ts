import FlatQueue from './../universal_logic/FlatQueue'

export const level1_check_spawn_queue = function(roomName: string){
    let huNum: number = 3
    let hu_source_idx = 1

    // clear the queue
    Memory.rooms[roomName].spawnQueue = {}
    new FlatQueue(Game.rooms[roomName].memory.spawnQueue)

    let harvest_upgrade_workers = _.filter(
        Game.creeps, (creep) => creep.memory.role == 'hu' && creep.room.name == roomName && creep.ticksToLive >= 150);
    for (let i = huNum - harvest_upgrade_workers.length; i > 0; i--){
        let priority: number = 10
        let data: spawnData = {
            name: (i == 1 ? '' : '_' + i),
            memory: {
                role: 'hu',
                source_idx: hu_source_idx,
            }
        }
        Game.rooms[roomName].addSpawnTask(priority, data)
    }
}