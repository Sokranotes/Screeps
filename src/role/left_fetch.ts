export const left_fetch_work = function(creep: Creep, roomName: string, destRoom: string){
    if (creep.room.name == roomName){
        if ((creep.memory.soldier_room_flag == undefined) || (creep.memory.soldier_room_flag == 1)){
            creep.moveTo(new RoomPosition(4, 30, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        if (creep.memory.room_flag == 4){
            creep.moveTo(new RoomPosition(13, 29, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            if (((creep.pos.x - 13)*(creep.pos.x - 13) + (creep.pos.y - 29)*(creep.pos.y - 29)) <= 2)
            {
                creep.memory.room_flag = 5
            }
        }
        if (creep.memory.room_flag == 5){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            if (creep.store.getCapacity() == 0)
            {
                creep.memory.soldier_room_flag = 1;
            }
        }
    }
    else{
        if (creep.room.name == destRoom && (creep.memory.soldier_room_flag == undefined || creep.memory.soldier_room_flag == 1)){
            creep.memory.room_flag = 1
            creep.moveTo(new RoomPosition(45, 30, destRoom), {visualizePathStyle: {stroke: '#ff0000'}})
            if (((creep.pos.x -45)*(creep.pos.x - 45) + (creep.pos.y - 30)*(creep.pos.y - 30)) <= 2)
            {
                creep.memory.room_flag = 2
            }
        }
        if (creep.memory.room_flag == 2){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            if (creep.store.getFreeCapacity() == 0 || targets.length == 0)
            {
                creep.memory.room_flag = 3;
            }
        }
        if (creep.memory.room_flag == 3){
            creep.moveTo(new RoomPosition(45, 30, destRoom), {visualizePathStyle: {stroke: '#ff0000'}})
            if (((creep.pos.x - 45)*(creep.pos.x - 45) + (creep.pos.y - 30)*(creep.pos.y - 30)) <= 2)
            {
                creep.memory.room_flag = 4
            }
        }
        if (creep.memory.room_flag == 4){
            creep.moveTo(new RoomPosition(49, 31, destRoom), {visualizePathStyle: {stroke: '#ff0000'}})
        }
    }
}