import * as $ from "../modules/超级移动优化"

export const energy_harvester_with_carry_work = function(creep: Creep){
    // creep.say('🔄 Here');
    if (creep.room.name == 'W48S12' && creep.memory.source_idx == 0){
        if (creep.pos.x != 7 || creep.pos.y != 23){
            creep.moveTo(new RoomPosition(7, 23, 'W48S12'))
            return
        }
    }
    if (creep.store.getCapacity() >= 50)
    {
        var transfer_creep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (cre) => {
                return (cre.memory.role == 'passive_transfer' &&
                        cre.memory.source_idx == creep.memory.source_idx && 
                        cre.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        creep.transfer(transfer_creep, RESOURCE_ENERGY)
    }
    if (creep.memory.source_roomName == 'W48S12' && creep.memory.source_idx == 0){
        // 为了通过类型检查
        var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        creep.pickup(res)
        let container: StructureStorage = Game.getObjectById('615a2a4846d6c263b42bfee6')
        creep.transfer(container, RESOURCE_ENERGY)
    }
    var source_room: Room = Game.rooms[creep.memory.source_roomName]
    if (source_room == undefined){
        console.log(Game.time, " ", creep.memory.source_roomName, ' undefined')
        return
    }
    var source: Source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
    if(creep.memory.is_working == undefined) {
        creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#00ff0e'}})
        if (creep.pos.isNearTo(source)){
            creep.memory.is_working = true
        }
    }
    else {
        var code:number = creep.harvest(source)
        if (code == OK){
            //
        }
        else if (code == ERR_NOT_IN_RANGE){
            code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
        }
        else if (code == ERR_NOT_OWNER){
            console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER")
            creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER");
        }
        else if (code == ERR_INVALID_TARGET){
            console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET")
            creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET");
        }
        else if (code == ERR_NOT_FOUND || code == ERR_TIRED || code == ERR_NO_BODYPART){
            // code == ERR_BUSY: 忽略
            console.log(creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code)
            creep.say('⚠️ ' + creep.memory.source_roomName + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code);
        }
        if (creep.ticksToLive < 50){
            // creep快死亡，提前返回控制信息，使得控制程序读取该creep的memory，从而生成新的creep
            source_room.memory.source_harvester_states[creep.memory.source_container_idx] -= 1
        }
    }
}