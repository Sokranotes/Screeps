import * as $ from "../modules/超级移动优化"

var code:number
export const passive_transfer_work = function(creep: Creep){
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
    if (creep.memory.is_working){
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
            else if(code == OK){
                source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY)
            }
        }
        else{
            var targets = dest_room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TERMINAL) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                code = creep.transfer(targets[0], RESOURCE_ENERGY)
                if(code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
                else if(code == OK){
                    source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY)
                }
            }
            else{
                var targets = dest_room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    code = creep.transfer(targets[0], RESOURCE_ENERGY)
                    if(code == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                    else if(code == OK){
                        source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY)
                    }
                }
            }
        }
        // var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        // creep.pickup(res)

        // var targets = dest_room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_EXTENSION ||
        //                 structure.structureType == STRUCTURE_SPAWN) &&
        //                 structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        //     }
        // });
        // if(targets.length > 0) {
        //     code = creep.transfer(targets[0], RESOURCE_ENERGY)
        //     if(code == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
        //     }
        //     else if(code == OK){
        //         source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY)
        //     }
        // }
        // else{
        //     var targets = dest_room.find(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return (structure.structureType == STRUCTURE_TOWER &&
        //                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.2*structure.store.getCapacity(RESOURCE_ENERGY));
        //         }
        //     });
        //     if(targets.length > 0) {
        //         code = creep.transfer(targets[0], RESOURCE_ENERGY)
        //         if(code == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
        //         }
        //         else if(code == OK){
        //             source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY)
        //         }
        //     }
        //     else{
        //         targets = dest_room.find(FIND_STRUCTURES, {
        //             filter: (structure) => {
        //                 return (structure.structureType == STRUCTURE_STORAGE) &&
        //                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        //             }
        //         });
        //         if(targets.length > 0) {
        //             code = creep.transfer(targets[0], RESOURCE_ENERGY)
        //             if(code == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
        //             }
        //             else if(code == OK){
        //                 source_room.memory.source_gets[creep.memory.source_idx] += creep.store.getCapacity(RESOURCE_ENERGY)
        //             }
        //         }
        //     }
        // }
    }
    else{
        var source_room: Room = Game.rooms[creep.memory.source_roomName]
        if (source_room == undefined){
            console.log('source_room ', creep.memory.source_roomName, " undefined")
            return
        }
        var farm_creeps = source_room.find(FIND_MY_CREEPS, {
            filter: (cre) => {
                return (cre.memory.role == 'energy_harvester_with_carry' &&
                        cre.memory.source_idx == creep.memory.source_idx &&
                    cre.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if (farm_creeps.length > 0){
            creep.moveTo(farm_creeps[0], {visualizePathStyle: {stroke: '#008cff'}})
        }
        else{
            farm_creeps = source_room.find(FIND_MY_CREEPS, {
                filter: (cre) => {
                    return (cre.memory.role == 'energy_harvester_no_carry' &&
                            cre.memory.source_container_idx == creep.memory.source_idx &&
                        cre.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (farm_creeps.length > 0){
                creep.memory.role = 'cleaner'
            }
        }
        var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        creep.pickup(res)
    }
}