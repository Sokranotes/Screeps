export const carrier_W9N11_work = function(creep: Creep){
    // creep.say('🔄 Here');

    if (creep.memory.dontPullMe == undefined){
        creep.memory.dontPullMe = true;
    }
    if (creep.pos.x != 37 || creep.pos.y != 43)
    {
        creep.moveTo(new RoomPosition(37, 43, 'W9N11'), {visualizePathStyle: {stroke: '#00ff0e'}})
    }
    else{
        let link: StructureLink = Game.getObjectById("619bdff527ccd47b68938bab")
        let storage: StructureStorage = creep.room.storage
        let terminal: StructureTerminal = creep.room.terminal
        let upgrade_link: StructureLink = Game.getObjectById("61b0fb9d91f12d45ad64a2bc")
        if (upgrade_link.store.getUsedCapacity(RESOURCE_ENERGY) <= 30 && link.cooldown < 3){
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                creep.withdraw(storage, RESOURCE_ENERGY)
            }
            else{
                creep.transfer(link, RESOURCE_ENERGY)
            }
            return
        }
        if (link.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                creep.withdraw(link, RESOURCE_ENERGY)
            }
            else{
                if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY) && terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                    creep.transfer(terminal, RESOURCE_ENERGY)
                }
                else{
                    creep.transfer(storage, RESOURCE_ENERGY)
                }
            }
        }
        else{
            if ((terminal.store.getUsedCapacity(RESOURCE_ENERGY) <= 150000 && storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY)) ||
            (storage.store.getFreeCapacity(RESOURCE_ENERGY) < 10000)){
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    creep.withdraw(storage, RESOURCE_ENERGY)
                }
                else{
                    creep.transfer(terminal, RESOURCE_ENERGY)
                }
            }
            else if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 155000 && storage.store.getFreeCapacity(RESOURCE_ENERGY) > 5000){
                if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                    creep.withdraw(terminal, RESOURCE_ENERGY)
                }
                else{
                    creep.transfer(storage, RESOURCE_ENERGY)
                }
            }
        }
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) != 0){
            if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY) && terminal.store.getFreeCapacity(RESOURCE_ENERGY) > 0){
                creep.transfer(terminal, RESOURCE_ENERGY)
            }
            else{
                creep.transfer(storage, RESOURCE_ENERGY)
            }
        }
    }
}