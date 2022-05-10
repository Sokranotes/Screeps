export const go_to_upgrade = function(creep: Creep){
    let target = creep.room.controller
    // 升级位置
    if(target) {
        if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return
    }

    if(target? target.my: false){
        if(creep.upgradeController(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return
    }
}