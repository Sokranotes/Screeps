export const builder_work = function(creep: Creep, roomName: string){
    if (creep.room.name == roomName){
        if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.is_working = false;
            creep.say('🔄 harvest'); 
        }
        if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
            creep.memory.is_working = true;
            creep.say('🚧 build');
        }
        if(creep.memory.is_working) {
            var constructions = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (constructions)
                if(constructions.length > 0) {
                    if(creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(constructions[0], {visualizePathStyle: {stroke: '#008cff'}});
                    }
                }
                else{
                    if (Math.random() > 0.33){
                        if (Math.random() > 0.5){
                            creep.memory.role = 'harvester'
                        }
                        else{
                            creep.memory.role = 'upgrader'
                        }
                    }
                    else {
                        creep.memory.role = 'repairer'
                    }
                }
        }
        else {
            // creep.memory.source_idx = 1 //近的这个，坐标13 29
            // creep.memory.source_idx = 0 //远的， 坐标5， 11
            var source: Source
            if (creep.room.memory.source_ids == undefined){
                var sources = creep.room.find(FIND_SOURCES)
                Memory.rooms[roomName].source_ids = new Array(sources.length)
                for (var i: number = 0; i < sources.length; i++){
                    Memory.rooms[roomName].source_ids[i] = sources[i].id;
                }
            }
            source = Game.getObjectById(Memory.rooms[roomName].source_ids[creep.memory.source_idx])
            // if (!source){
            //     source = Game.getObjectById(Memory.rooms[roomName].source_ids[1-creep.memory.source_idx])
            // }
            var code: number
            var flag: number = 1
            code = creep.harvest(source)
            if (code == OK){
                flag = 0
            }
            else if (code == ERR_NOT_IN_RANGE) creep.moveTo(source, {visualizePathStyle: {stroke: '#808080'}});
            else if (code == ERR_NOT_ENOUGH_RESOURCES) {
                if (flag == 0){
                    console.log('挖光了, 剩余时间：' + source.ticksToRegeneration)
                }
                var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE || 
                            structure.structureType == STRUCTURE_CONTAINER) && 
                    structure.store.getCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if(containers.length > 0) {
                    if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#808080'}});
                    }
                }
            }
            else if (code == ERR_INVALID_TARGET){
                ;
            }
            else if (code == ERR_NOT_OWNER  || code == ERR_NOT_FOUND || code == ERR_TIRED || code == ERR_NO_BODYPART){
                // || code == ERR_BUSY: 忽略
                console.log("code: " + code + " builder line 63")
            }
        }
    }
    else{
        creep.moveTo(new RoomPosition(25, 25, roomName), {visualizePathStyle: {stroke: '#ffff00'}})
    }
}