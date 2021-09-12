export const soldier_work = function(creep: Creep, roomName: string){
    // let exit = creep.pos.findClosestByPath(creep.room.find(FIND_EXIT_LEFT));
    // creep.moveTo(new RoomPosition(6, 31, roomName), {visualizePathStyle: {stroke: '#ffffff'}})
    // creep.moveTo(exit)
    // creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffff00'}});
    // var flag = 0
    // if (flag == 1){
    //     const targets = creep.room.find(FIND_HOSTILE_SPAWNS);
    //     if(targets.length) {
    //         if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE)
    //         {
    //             creep.moveTo(targets[0]);
    //         }
    //     }
    // }
    // else if (flag == 0){
    //     let backhome = creep.pos.findClosestByPath(creep.room.find(FIND_EXIT_RIGHT));
    //     creep.moveTo(backhome)
    // }
    // console.log(creep.name + ' yes, sir!')
    // console.log(creep.room.name)
    if (creep.room.name == 'W47S14'){
        // console.log('yes, sir')
        console.log(creep.memory.soldier_room_flag)
        if (creep.memory.soldier_room_flag == undefined){
            // console.log('yes, undefined')
            creep.memory.soldier_room_flag = 1
        }
        if (creep.memory.soldier_room_flag == 1){
            // console.log('you still at home')
            creep.moveTo(new RoomPosition(0, 33, roomName), {visualizePathStyle: {stroke: '#ff0000'}})
        }
        else{
            console.log('you are in the other place')
        }
    }
    else{
        // console.log('sir, not in this room.')
        // creep.moveTo(new RoomPosition(33, 23, 'W48S14'), {visualizePathStyle: {stroke: '#ff0000'}})
        // var targets = creep.room.find(FIND_HOSTILE_SPAWNS)
        // console.log('others spawn number' + targets.length)
        // console.log(targets[0].pos)
        // if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE){
        //     console.log('on my way')
        //     creep.moveTo(targets[0])
        // }
        // var targets = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_TOWER)
        //     }
        // })
        // console.log('others tower number' + targets.length)
        // console.log(targets[0].pos)
        // console.log('on my way')
        // creep.moveTo(new RoomPosition(18, 24, 'W48S14'), {visualizePathStyle: {stroke: '#ff0000'}})
        // if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE){
        //     console.log('attacking')
        //     creep.moveTo(targets[0])
        // }


        // creep.moveTo(new RoomPosition(15, 13, 'W48S14'), {visualizePathStyle: {stroke: '#ff0000'}})
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTROLLER)
            }
        })
        // console.log('others controller number' + targets.length)
        if (creep.attack(targets[0]) == ERR_NOT_IN_RANGE){
            // console.log('attacking')
            creep.moveTo(targets[0])
        }
    }
}