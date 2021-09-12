export const transfer_work = function(creep: Creep, roomName: string){
    // console.log(creep.name + ' yes, sir!')
    // console.log(creep.room.name)
    if (creep.room.name == 'W47S14'){
        creep.moveTo(new RoomPosition(4, 30, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        console.log('yes, sir')
        console.log(creep.memory.soldier_room_flag)
        if (creep.memory.soldier_room_flag == undefined){
            // console.log('yes, undefined')
            creep.memory.soldier_room_flag = 1
        }
        if (creep.memory.soldier_room_flag == 1){
            // console.log('you still at home')
            creep.moveTo(new RoomPosition(0, 31, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        if (creep.memory.soldier_room_flag == 2)
        {
            creep.moveTo(new RoomPosition(4, 30, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            creep.moveTo(new RoomPosition(0, 31, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        else if(creep.memory.soldier_room_flag == 3){
            console.log('welcome back')
            creep.moveTo(new RoomPosition(4, 30, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
            creep.memory.soldier_room_flag = 4
        }
        else if (creep.memory.soldier_room_flag == 4)
        {
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
        else{
            console.log('you are in the other place')
        }
    }
    else{
        creep.moveTo(new RoomPosition(45, 30, 'W48S14'), {visualizePathStyle: {stroke: '#ff0000'}})
        if (creep.memory.soldier_room_flag == 1)
        {
            creep.memory.soldier_room_flag = 2
            creep.moveTo(new RoomPosition(45, 30, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        else if (creep.memory.soldier_room_flag == 2)
        {
            // console.log('you are still in the other place')
            console.log(creep.pos, creep.pos.x, creep.pos.y)
            if (creep.pos.x <= 47){
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
                if (creep.store.getFreeCapacity() == 0)
                {
                    creep.memory.soldier_room_flag = 3;
                }
             }
        }
        // console.log('sir, not in this room.')
        creep.moveTo(new RoomPosition(49, 31, 'W48S14'), {visualizePathStyle: {stroke: '#ff0000'}})

        // creep.moveTo(new RoomPosition(33, 23, 'W48S14'), {visualizePathStyle: {stroke: '#ff0000'}})
        // var targets = creep.room.find(FIND_HOSTILE_SPAWNS)
        // console.log('others spawn number' + targets.length)
        // console.log(targets[0].pos)
        // if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE){
        //     console.log('on my way')
        //     creep.moveTo(targets[0])
        // }
    }
}