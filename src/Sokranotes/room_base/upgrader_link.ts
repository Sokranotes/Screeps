export const upgrader_link_work = function(creep: Creep){
    let link: StructureLink
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller)
    }
    if (creep.room.name == "W47S14")
    link = Game.getObjectById('615a13005237858c5056f75f')
    if (creep.room.name == "W48S12")
    link = Game.getObjectById('61a918350a3fbfbce67837dc')
    if (creep.room.name == 'W41S6')
    link = Game.getObjectById('61b06bfa6d593b099f24763d')
    if (creep.room.name == "W9N11")
    link = Game.getObjectById('61b0fb9d91f12d45ad64a2bc')
    
    if (link){
        if(creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(link)
        }
    }
}