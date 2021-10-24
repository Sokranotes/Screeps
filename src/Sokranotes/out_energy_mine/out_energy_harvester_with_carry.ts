import * as $ from "../../modules/超级移动优化"

export const out_energy_harvester_with_carry_work = function(creep: Creep){
    // creep.say('🔄 Here');
    let source_room: Room = Game.rooms[creep.memory.source_roomName]
    if (source_room == undefined){
        return
    }
    if (Game.rooms[creep.memory.source_roomName].memory.war_flag == true){
        creep.memory.is_working = false
        // creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#808080'}})
        let target = new RoomPosition(8, 34, creep.memory.dest_roomName)
        if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
            // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
            creep.memory.path = creep.pos.findPathTo(target);
        }
        let code = creep.moveByPath(creep.memory.path)
        if (code == ERR_NOT_FOUND){
            if (creep.pos.isNearTo(target)){
                creep.memory.path = null
            }
            else{
                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                creep.memory.path = creep.pos.findPathTo(target);
            }
        }
    }
    else{
        if (creep.store.getCapacity() >= 50)
        {
            let transfer_creep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (cre) => {
                    return (cre.memory.role == 'out_passive_transfer' &&
                            cre.memory.source_idx == creep.memory.source_idx && 
                            cre.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            source_room.memory.room_harvester_energy_total += creep.store.getUsedCapacity()
            creep.transfer(transfer_creep, RESOURCE_ENERGY)
        }
        let source: Source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
        if(creep.memory.is_working == undefined) {
            // creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#00ff0e'}})
            let target = source.pos
            if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                creep.memory.path = creep.pos.findPathTo(target);
            }
            let code = creep.moveByPath(creep.memory.path)
            if (code == ERR_NOT_FOUND){
                if (creep.pos.isNearTo(target)){
                    creep.memory.path = null
                }
                else{
                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    creep.memory.path = creep.pos.findPathTo(target);
                }
            }
            if (creep.pos.isNearTo(source)){
                creep.memory.is_working = true
            }
        }
        else {
            let code:number = creep.harvest(source)
            if (code == OK){

            }
            else if (code == ERR_NOT_IN_RANGE){
                code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
            }
            else if (code != ERR_BUSY && code != ERR_NOT_ENOUGH_RESOURCES && code != ERR_NOT_OWNER){
                console.log(Game.time, 'out_energy_harvester_with_carry_work', code)
            }
        }
    }
}