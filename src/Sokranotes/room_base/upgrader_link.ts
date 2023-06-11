export const upgrader_link_work = function(creep: Creep){
    let link: StructureLink
    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
        creep.moveTo(creep.room.controller)
    }
    if (creep.room.name == "W47S14")
    link = Game.getObjectById<StructureLink>('615a13005237858c5056f75f' as Id<StructureLink>)
    if (creep.room.name == "W48S12")
    link = Game.getObjectById<StructureLink>('61a918350a3fbfbce67837dc' as Id<StructureLink>)
    if (creep.room.name == 'W41S6')
    link = Game.getObjectById<StructureLink>('61b06bfa6d593b099f24763d' as Id<StructureLink>)
    if (creep.room.name == "W9N11")
    link = Game.getObjectById<StructureLink>('61b0fb9d91f12d45ad64a2bc' as Id<StructureLink>)
    if (creep.room.name == "W44S12")
    link = Game.getObjectById<StructureLink>('62638a9a2b85988ea16f1a22' as Id<StructureLink>)
    
    if (link){
        if(creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(link)
        }
    }
}