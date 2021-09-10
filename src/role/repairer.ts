class Repairer{
    creep: Creep
    Repairer(creep: Creep){
        this.creep = creep;
    }
    run(){
        if(this.creep.memory.is_building && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.creep.memory.is_building = false;
            this.creep.say('🔄 harvest');
        }
        if(!this.creep.memory.is_building && this.creep.store.getFreeCapacity() == 0) {
            this.creep.memory.is_building = true;
            this.creep.say('🚧 repair');
        }

        if(this.creep.memory.is_building) {
            var target = this.creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
                filter: (s) => s.hits < s.hitsMax
            });
            if(target) {
                if(this.creep.repair(target) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                this.creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
                // creep.memory.role = 'builder';
            }
        }
        else {
            var source = this.creep.pos.findClosestByPath(FIND_SOURCES);
            if(source && this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}