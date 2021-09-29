export const miner_work = function(creep: Creep){
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
        if (Game.rooms[creep.memory.source_roomName].memory.mines_id == undefined){
            var mines = creep.room.find(FIND_MINERALS)
            Game.rooms[creep.memory.source_roomName].memory.mines_id = new Array(mines.length)
            for (var i: number = 0; i < mines.length; i++){
                Game.rooms[creep.memory.source_roomName].memory.mines_id[i] = mines[i].id
            }            
        }
        mine = Game.getObjectById(Game.rooms[creep.memory.source_roomName].memory.mines_id[creep.memory.mine_idx])
        if (!mine){
            console.log('can not find the mine in ', creep.memory.source_roomName)
        }
        if(creep.harvest(mine) == ERR_NOT_IN_RANGE) {
            creep.moveTo(mine, {visualizePathStyle: {stroke: '#808080'}});
        }
    }
    else {
         var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && 
                structure.store.getCapacity(RESOURCE_HYDROGEN) > 0;
            }
        });
        if(containers.length > 0) {
            if(creep.transfer(containers[0], RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#808080'}});
            }
        }
    }
}