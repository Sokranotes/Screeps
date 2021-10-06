import * as $ from "../../modules/超级移动优化"

export const harvester_work = function(creep: Creep, roomName: string){
    if (creep.room.name == roomName){
        if(creep.store.getFreeCapacity() > 0) {
            let source: Source
            if (creep.room.memory.sources_id == undefined){
                let sources = creep.room.find(FIND_SOURCES)
                Memory.rooms[creep.room.name].sources_id = new Array(sources.length)
                for (let i: number = 0; i < sources.length; i++){
                    Memory.rooms[creep.room.name].sources_id[i] = sources[i].id;
                }
            }
            source = Game.getObjectById(Memory.rooms[creep.room.name].sources_id[creep.memory.source_idx])
            let code:number = creep.harvest(source)
            if (code == ERR_NOT_IN_RANGE){
                code = creep.moveTo(source.pos, {visualizePathStyle: {stroke: '#808080'}});
            }
            else if (code != ERR_BUSY && code != OK){
                console.log(Game.time, 'harvester_work', code)
            }
        }
        else {
            // creep.say('🚧transfer');
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
            else{
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
                else{
                    targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_TOWER) &&
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    });
                    if(targets.length > 0) {
                        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffff00'}});
                        }
                    }
                }
            }
        }
    }
}