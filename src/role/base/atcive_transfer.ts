import * as $ from "./../../超级移动优化"

var code:number
export const active_transfer_work = function(creep: Creep, roomName: string){
    // creep.say('👋 active transfer');
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        // 如果在transfer状态，且没有能量了，那么退出transfer状态
        creep.memory.is_working = false;
        creep.say('🚧 withdraw');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        //如果在withdraw状态，且取不了了，装满了，退出withdraw状态
        creep.memory.is_working = true;
        creep.say('🔄 transfer');
    }
    // console.log(creep.memory.is_working)
    if (creep.memory.is_working){
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
        });
        if(targets.length > 0) {
            code = creep.transfer(targets[0], RESOURCE_ENERGY)
            if(code == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
            }
            else if(code == OK){
                creep.room.memory.source_gets[creep.memory.source_container_idx] = creep.room.memory.source_gets[creep.memory.source_container_idx] + creep.store.getCapacity(RESOURCE_ENERGY)
            }
        }
        else{
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                code = creep.transfer(targets[0], RESOURCE_ENERGY)
                if(code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
                else if(code == OK){
                    creep.room.memory.source_gets[creep.memory.source_container_idx] = creep.room.memory.source_gets[creep.memory.source_container_idx] + creep.store.getCapacity(RESOURCE_ENERGY)
                }
            }
            else{
                targets = creep.room.find(FIND_STRUCTURES, {
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
                        creep.room.memory.source_gets[creep.memory.source_container_idx] = creep.room.memory.source_gets[creep.memory.source_container_idx] + creep.store.getCapacity(RESOURCE_ENERGY)
                    }
                }
            }
        }
    }
    else{
        var container: StructureContainer = Game.getObjectById(creep.room.memory.source_container_ids[creep.memory.source_container_idx])
        var code: number =  creep.withdraw(container, RESOURCE_ENERGY)
        if(code == ERR_NOT_IN_RANGE) {
            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        else if (code !=  OK){
            var res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (res != null){
                if (creep.pickup(res) == ERR_NOT_IN_RANGE){
                    creep.moveTo(res, {visualizePathStyle: {stroke: '#ffff00'}})
                }
            }
        }
    }
}