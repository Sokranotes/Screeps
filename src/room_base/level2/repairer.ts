import * as $ from "../../modules/超级移动优化"

export const repairer_work = function(creep: Creep){
    if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.is_working = false;
        creep.say('🔄 harvest');
    }
    if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
        creep.memory.is_working = true;
        creep.say('🚧 repair');
    }
    let source: Source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
    if(creep.memory.is_working) {
        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits < s.hitsMax) && (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART)
        });
        if(target) {
            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
    else{
        let code:number = creep.harvest(source)
        if (code == ERR_NOT_IN_RANGE){
            code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
        }
        else if (code != ERR_BUSY && code != OK){
            console.log(Game.time, 'level2 builder_work', code)
        }
    }
}
