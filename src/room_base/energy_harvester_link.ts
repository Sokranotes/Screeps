import * as $ from "../modules/超级移动优化"

export const energy_harvester_link_work = function(creep: Creep){
    // creep.say('🔄 Here');
    var link: StructureLink = Game.getObjectById(creep.room.memory.source_link_ids[creep.memory.source_idx])
    if (link == undefined){
        console.log(Game.time, " source link id:", creep.room.memory.source_link_ids[creep.memory.source_idx], ' index:', creep.memory.source_idx, ' undefined')
        return
    }
    creep.transfer(link, RESOURCE_ENERGY)
    var source_room: Room = Game.rooms[creep.memory.source_roomName]
    if (source_room == undefined){
        console.log(Game.time, " ", creep.memory.source_roomName, ' undefined')
        return
    }
    var source: Source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
    if(creep.memory.is_working == undefined) {
        creep.moveTo(new RoomPosition(creep.memory.link_harvester_pos_x, creep.memory.link_harvester_pos_y, creep.memory.source_roomName), 
            {visualizePathStyle: {stroke: '#00ff0e'}})
        if (creep.pos.x == creep.memory.link_harvester_pos_x && creep.pos.y == creep.memory.link_harvester_pos_y && creep.room.name == creep.memory.source_roomName){
            creep.memory.is_working = true
        }
    }
    else {
        var code:number = creep.harvest(source)
        if (code == OK){
            //
        }
        else if (code == ERR_NOT_IN_RANGE){
            code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
        }
        else if (code == ERR_NOT_OWNER){
            console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER")
            creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER");
        }
        else if (code == ERR_INVALID_TARGET){
            console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET")
            creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET");
        }
        else if (code == ERR_NOT_FOUND || code == ERR_TIRED || code == ERR_NO_BODYPART){
            // code == ERR_BUSY: 忽略
            console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code)
            creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code);
        }
        if (creep.ticksToLive < 50){
            // creep快死亡，提前返回控制信息，使得控制程序读取该creep的memory，从而生成新的creep
            source_room.memory.source_harvester_states[creep.memory.source_container_idx] -= 1
        }
    }
}