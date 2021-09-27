import * as $ from "../modules/超级移动优化"

export const carrier_work = function(creep: Creep){
    // creep.say('🔄 Here');
    // console.log(creep.store.getCapacity())
    if (creep.pos.x != 22 || creep.pos.y != 27)
    {
        creep.moveTo(new RoomPosition(22, 27, 'W47S14'), {visualizePathStyle: {stroke: '#00ff0e'}})
    }
    else{
        var link: StructureLink = Game.getObjectById("6144f930e4eb6b750a8ca8c5")
        var code = creep.withdraw(link, RESOURCE_ENERGY)
        if (creep.room.memory.transfer_to_terminal <= 30000){
            var terminal: StructureTerminal = Game.getObjectById("614e5a7ab781a1b8bfc07334")
            var tmp = creep.store.getUsedCapacity(RESOURCE_ENERGY)
            code = creep.transfer(terminal, RESOURCE_ENERGY)
            if (code == OK){
                creep.room.memory.transfer_to_terminal += tmp
            }
        }
        else{
            var storage: StructureStorage = Game.getObjectById("613f6f4b1dd6ef15e8dfa724")
            creep.transfer(storage, RESOURCE_ENERGY)
        }
    }
}