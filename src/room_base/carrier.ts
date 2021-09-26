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
        creep.withdraw(link, RESOURCE_ENERGY)
        var storage: StructureStorage = Game.getObjectById("613f6f4b1dd6ef15e8dfa724")
        creep.transfer(storage, RESOURCE_ENERGY)
    }
}