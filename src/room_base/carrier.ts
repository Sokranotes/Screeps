import * as $ from "../modules/超级移动优化"

export const carrier_work = function(creep: Creep){
    // creep.say('🔄 Here');
    // console.log(creep.store.getCapacity())
    if (creep.pos.x != 8 || creep.pos.y != 19)
    {
        creep.moveTo(new RoomPosition(8, 19, 'W47S14'), {visualizePathStyle: {stroke: '#00ff0e'}})
    }
    else{
        // var terminal: StructureTerminal = Game.getObjectById("")
        var link: StructureLink = Game.getObjectById("6159d59ae59fcf2038ecf56c")
        var upgrade_link: StructureLink = Game.getObjectById('615a13005237858c5056f75f')
        var storage: StructureStorage = Game.getObjectById("6159fc1609f790175f45c6be")
        // console.log(link.store.getUsedCapacity(RESOURCE_ENERGY))
        // console.log(terminal.store.getUsedCapacity(RESOURCE_ENERGY))
        if (link.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            var code = creep.withdraw(link, RESOURCE_ENERGY)
            creep.transfer(storage, RESOURCE_ENERGY)
        }
        if (upgrade_link.store.getUsedCapacity(RESOURCE_ENERGY) == 0 && link.cooldown == 0){
            var code = creep.withdraw(storage, RESOURCE_ENERGY)
            creep.transfer(link, RESOURCE_ENERGY)
            link.transferEnergy(upgrade_link)
        }
                // if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) <= 290000){
                //     var tmp = creep.store.getUsedCapacity(RESOURCE_ENERGY)
                //     code = creep.transfer(terminal, RESOURCE_ENERGY)
                // }
                // else{
                //     creep.transfer(storage, RESOURCE_ENERGY)
                // }

        // else{
        //     if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) <= 290000){
        //         var code = creep.withdraw(storage, RESOURCE_ENERGY)
        //         creep.transfer(terminal, RESOURCE_ENERGY)
        //     }
        //     // if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) >= 200000){
        //     //     var code = creep.withdraw(terminal, RESOURCE_ENERGY)
        //     //     var storage: StructureStorage = Game.getObjectById("613f6f4b1dd6ef15e8dfa724")
        //     //     creep.transfer(storage, RESOURCE_ENERGY)
        //     // }
        // }
        // console.log(terminal.store.getUsedCapacity(RESOURCE_ENERGY))
    }
}