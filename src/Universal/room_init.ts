export const room_init = function(roomName: string){
    let room = Game.rooms[roomName]
    if (room.memory.sources_id == undefined){
        let sources = room.find(FIND_SOURCES)
        room.memory.sources_id = new Array(sources.length)
        for (let i: number = 0; i < sources.length; i++){
            room.memory.sources_id[i] = sources[i].id;
        }
    }
    room.memory.check_spawn_queue_flag = true
}