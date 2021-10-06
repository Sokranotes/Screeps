import * as $ from "../modules/超级移动优化"

export const reserver_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if (Memory.rooms[creep.memory.source_roomName].war_flag == true){
        creep.memory.is_working = false
        if(!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
            creep.memory.path = creep.pos.findPathTo(new RoomPosition(8, 34, creep.memory.dest_roomName));
        }
        creep.moveByPath(creep.memory.path);
        if (creep.pos.inRangeTo(new RoomPosition(8, 34, creep.memory.dest_roomName), 2)){
            creep.memory.path = null
        }
    }
    else{
        var controller: StructureController = Game.getObjectById(Memory.rooms[creep.memory.source_roomName].controller_id)
        var code = creep.reserveController(controller)
        if (code == ERR_NOT_IN_RANGE){
            if(!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
                creep.memory.path = creep.pos.findPathTo(controller);
            }
            creep.moveByPath(creep.memory.path);
            if (creep.pos.inRangeTo(controller, 2)){
                creep.memory.path = null
            }
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