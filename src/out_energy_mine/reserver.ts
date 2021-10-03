import * as $ from "../modules/超级移动优化"

export const reserver_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if (Memory.rooms[creep.memory.source_roomName].war_flag == true){
        creep.memory.is_working = false
        creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#808080'}})
    }
    else{
        var controller: StructureController = Game.getObjectById(Memory.rooms[creep.memory.source_roomName].controller_id)
        var code = creep.reserveController(controller)
        if (code == ERR_NOT_IN_RANGE){
            creep.moveTo(controller, {visualizePathStyle: {stroke: '#00ff0e'}})
        }
        else if (code == ERR_INVALID_TARGET){
            creep.attackController(controller)
        }
        // creep.signController(controller, '喵呜')
        if (controller != null && controller != undefined){
            if (controller.reservation != null && controller.reservation != undefined){
                creep.memory.reservation_tick = controller.reservation.ticksToEnd
            }
        }
    }
}