import * as $ from "../modules/超级移动优化"

var code:number
export const out_passive_transfer_work = function(creep: Creep){
    var source_room: Room = Game.rooms[creep.memory.source_roomName]
    if (source_room == undefined){
        return
    }
    else if (Game.rooms[creep.memory.source_roomName].memory.war_flag == true){
        creep.memory.is_working = false
        creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName), {visualizePathStyle: {stroke: '#808080'}})
    }
    else{
        if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
            // 如果在transfer状态，且没有能量了，那么退出transfer状态
            creep.memory.is_working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
            //如果在采集状态，且采集不了了，装满了，退出采集状态
            creep.memory.is_working = true;
            creep.say('🚧 transfer');
        }
        if (creep.memory.is_working == true){
            var source_room: Room = Game.rooms[creep.memory.source_roomName]
            var dest_room: Room = Game.rooms[creep.memory.dest_roomName]
            // room空值检查
            if (source_room == undefined){
                console.log(Game.time, " ", creep.memory.source_roomName, ' undefined')
                return
            }
            if (dest_room == undefined){
                console.log('dest_room ', creep.memory.dest_roomName, " undefined")
                return
            }

            if (creep.memory.source_roomName == 'W47S15'){
                var targets = dest_room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    code = creep.transfer(targets[0], RESOURCE_ENERGY)
                    if(code == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
            }
            else{
                var link: StructureLink = Game.getObjectById('61450b41047f4458ae00790f')
                code = creep.transfer(link, RESOURCE_ENERGY)
                if(code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(link, {visualizePathStyle: {stroke: '#ffff00'}});
                }
                else if(code == OK){
                    source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY)
                }
            }
        }
        else{
            var source_room: Room = Game.rooms[creep.memory.source_roomName]
            if (source_room == undefined){
                console.log('source_room ', creep.memory.source_roomName, " undefined")
                return
            }
            var farm_creeps = source_room.find(FIND_MY_CREEPS, {
                filter: (cre) => {
                    return (cre.memory.role == 'out_energy_harvester_with_carry' &&
                            cre.memory.source_idx == creep.memory.source_idx &&
                        cre.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (farm_creeps.length > 0){
                creep.moveTo(farm_creeps[0], {visualizePathStyle: {stroke: '#008cff'}})
            }
            else{
                var source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
                var place: RoomPosition
                if (source.pos.x >= 25){
                    if (source.pos.y >= 25){
                        place = new RoomPosition(source.pos.x - 8, source.pos.y - 8, creep.memory.source_roomName)
                    }
                    else{
                        place = new RoomPosition(source.pos.x - 8, source.pos.y + 8, creep.memory.source_roomName)
                    }
                }
                else{
                    if (source.pos.y >= 25){
                        place = new RoomPosition(source.pos.x + 8, source.pos.y - 8, creep.memory.source_roomName)
                    }
                    else{
                        place = new RoomPosition(source.pos.x + 8, source.pos.y + 8, creep.memory.source_roomName)
                    }
                }
                creep.moveTo(place, {visualizePathStyle: {stroke: '#008cff'}})
            }
            var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            creep.pickup(res)
        }
    }
}