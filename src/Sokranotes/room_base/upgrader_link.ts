import "../../modules/超级移动优化"

export const upgrader_link_work = function(creep: Creep){
    creep.upgradeController(creep.room.controller)
    let link: StructureLink = Game.getObjectById('615a13005237858c5056f75f')
    if (link){
        if(creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(link)
        }
    }
}