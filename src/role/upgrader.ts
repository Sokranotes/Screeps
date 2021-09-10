export const upgrader_work = function(creep: Creep){
    // if(creep.store[RESOURCE_ENERGY] != creep.store.getCapacity()) {
    if(creep.store[RESOURCE_ENERGY] == 0) {
        //if (creep.store.getFreeCapacity() > 0){
        var sources = creep.room.find(FIND_SOURCES);
        // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //     creep.moveTo(sources[0]);
        // }
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
        //  if (creep.memory.source == 1){
        //      if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        //          creep.moveTo(sources[1]);
        //      }
        //  }
        
        // var targets = creep.room.find(FIND_STRUCTURES, {
        //      filter: (structure) => {
        //          // return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;//过滤器找到非空的建筑
        //          return (structure.structureType == STRUCTURE_CONTAINER);//过滤器找到非空的建筑
        //      }
        //  });
        //  if(targets.length > 0) {
        //      if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        //      }
        //  }
        //  else{
        //      // creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
        //      // creep.moveTo(new RoomPosition(23, 26, 'sim'), {visualizePathStyle: {stroke: '#ffffff'}});
        //      var sources = creep.room.find(FIND_SOURCES);
        //      // if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //      //     creep.moveTo(sources[0]);
        //      // }
        //      if (creep.memory.source == 0){
        //          if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //              creep.moveTo(sources[0]);
        //          }
        //      }
        //      else{
        //          if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        //              creep.moveTo(sources[1]);
        //          }
        //      }
        //  }
    }
    else {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {//距离够则升级控制器
        creep.moveTo(creep.room.controller);
        }
    }
}
