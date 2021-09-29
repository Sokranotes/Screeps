import * as $ from "../modules/超级移动优化"

export const reserver_work = function(creep: Creep){
    // creep.say('🔄 Here');
    var source_room: Room = Game.rooms[creep.memory.source_roomName]
    // source_room, source所在room
    if (source_room.memory.war_flag == true){
        creep.memory.is_working = false
        creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#808080'}})
    }
    else{
        var controller: StructureController = Game.getObjectById(source_room.memory.controller_id)
        // console.log(creep.memory.source_roomName, source_room.memory.controller_id)
        var code = creep.reserveController(controller)
        if (code == ERR_NOT_IN_RANGE){
            creep.moveTo(controller, {visualizePathStyle: {stroke: '#00ff0e'}})
        }
        creep.signController(controller, '喵呜')
        if (controller != null && controller != undefined){
            if (controller.reservation != null && controller.reservation != undefined){
                creep.memory.reservation_tick = controller.reservation.ticksToEnd
            }
        }
    }
}