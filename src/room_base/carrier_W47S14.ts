import * as $ from "../modules/超级移动优化"

export const carrier_W47S14_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if (creep.memory.dontPullMe == undefined){
        creep.memory.dontPullMe = true;
    }
    if (creep.pos.x != 8 || creep.pos.y != 19)
    {
        creep.moveTo(new RoomPosition(8, 19, 'W47S14'), {visualizePathStyle: {stroke: '#00ff0e'}})
    }
    else{
        let link: StructureLink = Game.getObjectById("6159d59ae59fcf2038ecf56c")
        let upgrade_link: StructureLink = Game.getObjectById('615a13005237858c5056f75f')
        let storage: StructureStorage = Game.getObjectById("6159fc1609f790175f45c6be")
        let terminal: StructureTerminal = Game.getObjectById('615ab4e746872376a3726f6f')

        if (upgrade_link.store.getUsedCapacity(RESOURCE_ENERGY) < 300 && link.cooldown < 3){
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                creep.withdraw(storage, RESOURCE_ENERGY)
            }
            else{
                creep.transfer(link, RESOURCE_ENERGY)
            }
        }
        else if (link.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                creep.withdraw(link, RESOURCE_ENERGY)
            }
            else{
                creep.transfer(storage, RESOURCE_ENERGY)
            }
        }
        else if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) <= 100000 && storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY)){
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                creep.withdraw(storage, RESOURCE_ENERGY)
            }
            else{
                creep.transfer(terminal, RESOURCE_ENERGY)
            }
        }
        else if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 200000){
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                creep.withdraw(terminal, RESOURCE_ENERGY)
            }
            else{
                creep.transfer(storage, RESOURCE_ENERGY)
            }
        }
    }
}