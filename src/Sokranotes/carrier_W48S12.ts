export const carrier_W48S12_work = function(creep: Creep){
    let centerPos = new RoomPosition(16, 42, 'W48S12')
    let centerLinkId = "61739e3ab6a4e1f3750c4432"
    let upgradeLinkId = '61a918350a3fbfbce67837dc'

    let terminal_energy_bottom_limit: number // terminal中最低能量
    let terminal_energy_top_limit: number // terminal中最高能量
    let terminal_energy_bottom_free_limit: number // free capacity 大于该值往terminal中放能量
    let terminal_energy_top_free_limit: number // free capacity小于该值从terminal中取出能量

    if (terminal_energy_bottom_limit == undefined) terminal_energy_bottom_limit = global.terminal_energy_bottom_limit == undefined? 50000 : global.terminal_energy_bottom_limit;
    if (terminal_energy_top_limit == undefined) terminal_energy_top_limit = global.terminal_energy_top_limit == undefined? 100000 : global.terminal_energy_top_limit;
    if (terminal_energy_bottom_free_limit == undefined) terminal_energy_bottom_free_limit = global.terminal_energy_bottom_free_limit == undefined? 50000 : global.terminal_energy_bottom_free_limit;
    if (terminal_energy_top_free_limit == undefined) terminal_energy_top_free_limit = global.terminal_energy_top_free_limit == undefined? 30000 : global.terminal_energy_top_free_limit;

    let priority: number = 0
    let minTicksToLive = 50
    if (creep.ticksToLive == minTicksToLive){
        let level = global.room_config[creep.room.name]['level'+creep.room.controller.level] == undefined ? 
            global.room_config[creep.room.name]['default'] : global.room_config[creep.room.name]['level'+creep.room.controller.level]
        let bodyParts = level[creep.memory.role]['bodyParts']
        const data = {
            name: creep.memory.role, 
            bodyParts: bodyParts,
            memory: {
                role: creep.memory.role,
            }
        }
        creep.room.addSpawnTask(priority, data)
    }
    if (creep.pos.x != centerPos.x || creep.pos.y != centerPos.y)
    {
        creep.moveTo(centerPos, {visualizePathStyle: {stroke: '#00ff0e'}})
    }
    else{
        if (creep.memory.dontPullMe == undefined){
            creep.memory.dontPullMe = true;
        }
        let link: StructureLink = Game.getObjectById<StructureLink>(centerLinkId as Id<StructureLink>)
        let upgrade_link: StructureLink = Game.getObjectById<StructureLink>(upgradeLinkId as Id<StructureLink>)
        let storage: StructureStorage = creep.room.storage
        let terminal: StructureTerminal = creep.room.terminal

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
                // 往哪里放能量
                if (storage.store.getUsedCapacity(RESOURCE_ENERGY)-2000 > terminal.store.getUsedCapacity(RESOURCE_ENERGY) && terminal.store.getFreeCapacity(RESOURCE_ENERGY) > terminal_energy_bottom_free_limit){
                    if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_top_limit){
                        creep.transfer(terminal, RESOURCE_ENERGY)
                    }
                }
                else{
                    creep.transfer(storage, RESOURCE_ENERGY)
                }
            }
        }
        else{
            // 空闲状态能量如何转移
            // storage转移至terminal
            if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
                if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY) && terminal.store.getFreeCapacity(RESOURCE_ENERGY) > terminal_energy_bottom_free_limit){
                    creep.withdraw(storage, RESOURCE_ENERGY)
                }
                else if(terminal.store.getFreeCapacity(RESOURCE_ENERGY) < terminal_energy_top_free_limit || terminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminal_energy_bottom_limit){
                        creep.withdraw(terminal, RESOURCE_ENERGY)
                }
            }
            else{
                if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY) && terminal.store.getFreeCapacity(RESOURCE_ENERGY) > terminal_energy_bottom_free_limit){
                    if (terminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminal_energy_top_limit){
                        creep.transfer(terminal, RESOURCE_ENERGY)
                    }
                }
                else {
                    if (storage.store.getUsedCapacity(RESOURCE_ENERGY) > terminal.store.getUsedCapacity(RESOURCE_ENERGY) && terminal.store.getFreeCapacity(RESOURCE_ENERGY) > terminal_energy_bottom_free_limit){
                        return
                    }
                    creep.transfer(storage, RESOURCE_ENERGY)
                }
            }
        }
    }
}