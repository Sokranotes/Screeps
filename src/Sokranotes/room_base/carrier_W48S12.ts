export const carrier_W48S12_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if (creep.memory.dontPullMe == undefined){
        creep.memory.dontPullMe = true;
    }
    if (creep.pos.x != 16 || creep.pos.y != 42)
    {
        creep.moveTo(new RoomPosition(16, 42, 'W48S12'), {visualizePathStyle: {stroke: '#00ff0e'}})
    }
    else{
        let link: StructureLink = Game.getObjectById("61739e3ab6a4e1f3750c4432")
        // let storage: StructureStorage = Game.getObjectById("")
        let terminal: StructureTerminal = Game.getObjectById('6173c887dc242927f66874d1')
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            creep.withdraw(link, RESOURCE_ENERGY)
        }
        else{
            creep.transfer(terminal, RESOURCE_ENERGY)
        }
    }
}