import * as $ from "../modules/超级移动优化"

export const out_energy_harvester_no_carry_work = function(creep: Creep){
    // creep.say('👋 Here');
    let source_room: Room = Game.rooms[creep.memory.source_roomName]
    if (source_room.memory.war_flag == true){
        creep.memory.is_working = false
        creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#808080'}})
    }
    else{
        if (creep.memory.is_working == true){
            let source: Source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
            let code:number = creep.harvest(source)
            if (code == ERR_NOT_IN_RANGE){
                code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
            }
            else if (code != ERR_BUSY && code != OK && code != ERR_NOT_ENOUGH_RESOURCES){
                console.log(Game.time, 'out_energy_harvester_with_carry_work', code)
            }
        }
        else{
            if (creep.pos.x == creep.memory.container_pos_x && creep.pos.y == creep.memory.container_pos_y){
                creep.memory.is_working = true
            }
            creep.moveTo(new RoomPosition(creep.memory.container_pos_x, creep.memory.container_pos_y, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#808080'}})
        }
    }
}