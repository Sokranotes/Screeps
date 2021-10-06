import * as $ from "../modules/超级移动优化"

export const energy_harvester_link_work = function(creep: Creep){
    // creep.say('🔄 Here');
    let link: StructureLink = Game.getObjectById(creep.room.memory.source_link_ids[creep.memory.source_idx])
    if (link == undefined){
        console.log(Game.time, "energy_harvester_link_work source link id:", creep.room.memory.source_link_ids[creep.memory.source_idx], 'index:', creep.memory.source_idx, 'undefined')
        return
    }
    creep.transfer(link, RESOURCE_ENERGY)
    let source_room: Room = Game.rooms[creep.memory.source_roomName]
    if (source_room == undefined){
        console.log(Game.time, "energy_harvester_link_work", creep.memory.source_roomName, 'undefined')
        return
    }
    let source: Source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
    if(creep.memory.is_working == undefined) {
        creep.moveTo(new RoomPosition(creep.memory.link_harvester_pos_x, creep.memory.link_harvester_pos_y, creep.memory.source_roomName), 
            {visualizePathStyle: {stroke: '#00ff0e'}})
        if (creep.pos.x == creep.memory.link_harvester_pos_x && creep.pos.y == creep.memory.link_harvester_pos_y && creep.room.name == creep.memory.source_roomName){
            creep.memory.is_working = true
        }
    }
    else {
        let code:number = creep.harvest(source)
        if (code == ERR_NOT_IN_RANGE){
            code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
        }
        else if (code != ERR_BUSY && code != OK){
            console.log(Game.time, 'energy_harvester_link_work', code)
        }
    }
}