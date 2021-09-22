import * as $ from "../../modules/超级移动优化"


var code:number
export const base_transfer_work = function(creep: Creep, roomName: string){
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
        // if (creep.room.memory.war_flag ||  creep.room.energyAvailable > 0.75*creep.room.energyCapacityAvailable){
        //     var targets = creep.room.find(FIND_STRUCTURES, {
        //         filter: (structure) => {
        //             return (structure.structureType == STRUCTURE_TOWER &&
        //                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
        //         }
        //     });
        //     if(targets.length > 0) {
        //         code = creep.transfer(targets[0], RESOURCE_ENERGY)
        //         if(code == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
        //         }
        //     }
        // }
        if (creep.store.getUsedCapacity() > 0){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                code = creep.transfer(targets[0], RESOURCE_ENERGY)
                if(code == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0.2*structure.store.getCapacity(RESOURCE_ENERGY));
                    }
                });
                if(targets.length > 0) {
                    code = creep.transfer(targets[0], RESOURCE_ENERGY)
                    if(code == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
            }
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
            if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else{
            creep.moveTo(new RoomPosition(27, 24, roomName));
        }
    }
}