import * as $ from "../modules/超级移动优化"

export const attack_invader_core_work = function(creep: Creep){
    // creep.say('🔄 attack');
    if (creep.room.name != 'W47S15'){
        creep.moveTo(new RoomPosition(16, 45, 'W47S15'), {visualizePathStyle: {stroke: '#ff0000'}})
    }
    else{
        var invader: StructureInvaderCore = Game.getObjectById(Memory.rooms[creep.memory.source_roomName].invader_core_id)
        if (invader != undefined){
            if (creep.attack(invader) != OK){
                creep.moveTo(invader)
            }
        }
    }
}