class Harvester{
    creep: Creep
    Harvester(creep: Creep){
        this.creep = creep
    }
    run(){
        if(this.creep.store.getFreeCapacity() > 0) {
            // if(creep.memory.source == 0) {
                var sources = this.creep.room.find(FIND_SOURCES);
                if(this.creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});//显示路径
                }
            }
            else {
                var targets = this.creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER ||
                                structure.structureType == STRUCTURE_CONTAINER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;//过滤器找到extension或spawn类型且空间未满的建筑
                        }
                });
                if(targets.length > 0) {
                    if(this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    this.creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
    }
}