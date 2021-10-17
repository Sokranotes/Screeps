import * as $ from "../modules/超级移动优化"

export const carrier_W48S12_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if (creep.memory.dontPullMe == undefined){
        creep.memory.dontPullMe = true;
    }
    if (creep.pos.x != 14 || creep.pos.y != 6)
    {
        creep.moveTo(new RoomPosition(14, 6, 'W48S12'), {visualizePathStyle: {stroke: '#00ff0e'}})
    }
    else{
        let link: StructureLink = Game.getObjectById("61695f491a993a36b0f39715")
        let storage: StructureStorage = Game.getObjectById("616443f5fd720f7fa73ac3eb")

        if (link.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                creep.withdraw(link, RESOURCE_ENERGY)
            }
            else{
                creep.transfer(storage, RESOURCE_ENERGY)
            }
        }
    }
}