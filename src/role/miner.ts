export const miner_work = function(creep: Creep, roomName: string){
    // console.log(creep.memory.is_working)
    if(creep.memory.is_working && creep.store[RESOURCE_HYDROGEN] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() > 0) {
        creep.memory.is_working = true;
        creep.say('🚧 transfer');
    }
    if(creep.memory.is_working) {
        // console.log(1)
        creep.memory.mine_idx = 0
        var mine: Mineral
        // console.log(creep.room.memory.source_ids == undefined)
        if (creep.room.memory.mine_ids == undefined){
            var mines = creep.room.find(FIND_MINERALS)
            Memory.rooms[roomName].mine_ids = new Array(mines.length)
            for (var i: number = 0; i < mines.length; i++){
                Memory.rooms[roomName].mine_ids[i] = mines[i].id
            }            
        }
        mine = Game.getObjectById(Memory.rooms[roomName].mine_ids[creep.memory.mine_idx])
        if (!mine){
            console.log('can not find the object...')
        }
        // console.log(creep.harvest(mine))
        if(creep.harvest(mine) == ERR_NOT_IN_RANGE) {
            creep.moveTo(mine, {visualizePathStyle: {stroke: '#808080'}});
        }
    }
    else {
        // console.log(2)
         var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && 
                structure.store.getCapacity(RESOURCE_HYDROGEN) > 0;
            }
        });
        // console.log(containers.length)
        if(containers.length > 0) {
            if(creep.transfer(containers[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#808080'}});
            }
        }
        // else{
            // 千万不要写这个else，不然会在资源采集点进进出出，一下子就采集完成的事情，拖好久
        // }
    }
}