import * as $ from "../modules/超级移动优化"

export const upgrader_link_work = function(creep: Creep){
    creep.upgradeController(creep.room.controller)
    let link: StructureLink = Game.getObjectById('615a13005237858c5056f75f')
    if (link){
        if(creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            let target = link
            if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
            }
            let code = creep.moveByPath(creep.memory.path)
            if (code == ERR_NOT_FOUND){
                if (creep.pos.isNearTo(target)){
                    creep.memory.path = null
                }
                else{
                    creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                }
            }
        }
    }
}
