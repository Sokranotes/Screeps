class Upgrader{
    creep: Creep
    Upgrader(creep: Creep){
        this.creep = creep
    }
    run(){
        // if(this.creep.store[RESOURCE_ENERGY] != creep.store.getCapacity()) {
	    if(this.creep.store[RESOURCE_ENERGY] == 0) {
            //if (this.creep.store.getFreeCapacity() > 0){
                var sources = this.creep.room.find(FIND_SOURCES);
                 // if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                 //     this.creep.moveTo(sources[0]);
                 // }
                 if(this.creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(sources[1]);
                     }
                 // if (this.creep.memory.source == 1){
                 //     if(this.creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                 //         this.creep.moveTo(sources[1]);
                 //     }
                 // }
                
                // var targets = this.creep.room.find(FIND_STRUCTURES, {
             //         filter: (structure) => {
             //             // return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;//过滤器找到非空的建筑
             //             return (structure.structureType == STRUCTURE_CONTAINER);//过滤器找到非空的建筑
             //         }
             //     });
             //     if(targets.length > 0) {
             //         if(this.creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
             //             this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
             //         }
             //     }
             //     else{
             //         // this.creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
             //         // this.creep.moveTo(new RoomPosition(23, 26, 'sim'), {visualizePathStyle: {stroke: '#ffffff'}});
             //         var sources = creep.room.find(FIND_SOURCES);
             //         // if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
             //         //     this.creep.moveTo(sources[0]);
             //         // }
             //         if (this.creep.memory.source == 0){
             //             if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
             //                 this.creep.moveTo(sources[0]);
             //             }
             //         }
             //         else{
             //             if(this.creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
             //                 this.creep.moveTo(sources[1]);
             //             }
             //         }
             //     }
             }
             else {
                 if(this.creep.upgradeController(this.creep.room.controller) == ERR_NOT_IN_RANGE) {//距离够则升级控制器
                    this.creep.moveTo(this.creep.room.controller);
                 }
             }
    }
}
