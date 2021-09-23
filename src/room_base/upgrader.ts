export const upgrader_work = function(creep: Creep, roomName: string){
    // creep.say('🔄 Here');
    // 如果在升级且没能量了，那退出升级状态
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    // 如果在采集能量且满了，那退出采集状态
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 upgrade');
    }
    if(creep.memory.is_working) {
        // creep.say('🚧 upgrade');
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {//距离够则升级控制器
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#4fcf30'}});
        }
    }
    else {
        var storages = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE) && 
                structure.store.getCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(storages.length > 0) {
            if(creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storages[0], {visualizePathStyle: {stroke: '#808080'}});
            }
        }
    }
}
