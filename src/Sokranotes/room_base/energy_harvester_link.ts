import { go_to_harvest } from "./go_to_harvest"

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
    let pos: RoomPosition = new RoomPosition(creep.memory.link_harvester_pos_x, creep.memory.link_harvester_pos_y, creep.memory.source_roomName)
    go_to_harvest(creep, source, pos)
}