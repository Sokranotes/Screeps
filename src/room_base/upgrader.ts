export const upgrader_work = function(creep: Creep){
    if (creep.room.name == 'W48S12'){
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
            let sources: Source[] = creep.room.find(FIND_SOURCES)
            if (sources.length > 0){
                let code = creep.harvest(sources[0])
                if (code == ERR_NOT_IN_RANGE){
                    let code1 = creep.moveTo(sources[0])
                }
            }
        }
    }
    else if (creep.room.name == 'W47S14'){
        creep.upgradeController(creep.room.controller)
        let link: StructureLink = Game.getObjectById('615a13005237858c5056f75f')
        if (link){
            if(creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(link, {visualizePathStyle: {stroke: '#808080'}});
            }
        }
    }
}
