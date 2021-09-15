// 控制自己房间的挖矿逻辑
// 找到挖矿点，并存储在Room中，如果有Container配合，存储对应的pos
// 生成Creep

export const room_energy_mine = function(roomName: string, spawnName?: string)
{
    var room: Room = Game.rooms[roomName]
    // 找到该房间所有能量source
    if (room.memory.source_ids == undefined){
        var sources = room.find(FIND_SOURCES)
        Memory.rooms[room.name].source_ids = new Array(sources.length)
        for (var i: number = 0; i < sources.length; i++){
            Memory.rooms[room.name].source_ids[i] = sources[i].id;
        }
    }
    // 为各个能量source生成creep
    if (room.memory.source_creep_ids == undefined){
        room.memory.source_creep_ids = new Array(sources.length)
    }
    var i_limit: number = room.memory.source_creep_ids.length
    for (var i: number = 0; i < i_limit; i++){
        if (room.memory.source_creep_ids == undefined){
            if (!Game.spawns[spawnName].spawning){
                var newName = 'Harvester_nocarry' + Game.time;
                var source: Source = Game.getObjectById(room.memory.source_ids[i])
                var j_limit: number = room.memory.container_ids.length
                for (var j: number = 0; j < j_limit; j++){
                    var container = Game.getObjectById(room.memory.container_ids[j])
                    if (container){
                        // 两个container source距离太近可能会导致bug
                        if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 && 
                        (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1){

                        }
                    }
                    // else{
                    // }
                }
                Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], newName, 
                    {memory: {role: 'energy_harvester_no_carry', source_idx: i, container_pos: pos}});
            }
        }
    }
}