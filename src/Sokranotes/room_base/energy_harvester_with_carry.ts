import "../../modules/超级移动优化"

export const energy_harvester_with_carry_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if (creep.store.getCapacity() >= 50)
    {
        let transfer_creep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (cre) => {
                return (cre.memory.role == 'passive_transfer' &&
                        cre.memory.source_idx == creep.memory.source_idx && 
                        cre.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        creep.transfer(transfer_creep, RESOURCE_ENERGY)
    }
    let source_room: Room = Game.rooms[creep.memory.source_roomName]
    if (source_room == undefined){
        console.log(Game.time, "energy_harvester_with_carry_work", creep.memory.source_roomName, ' undefined')
        return
    }
    let source: Source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
    if(creep.memory.is_working == undefined) {
        creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#00ff0e'}})
        if (creep.pos.isNearTo(source)){
            creep.memory.is_working = true
        }
    }
    else {
        let code:number = creep.harvest(source)
        if (code == ERR_NOT_IN_RANGE){
            code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
        }
        else if (code != ERR_BUSY && code != OK && code != ERR_NOT_ENOUGH_RESOURCES){
            console.log(Game.time, 'energy_harvester_with_carry_work', code)
        }
    }
}