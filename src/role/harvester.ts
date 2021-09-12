export const harvester_work = function(creep: Creep, roomName: string){
    // if (creep.room.name != roomName){
    //     if (creep.room.name == 'W47S15'){
    //         creep.moveTo(new RoomPosition(4, 0, 'W47S15'), {visualizePathStyle: {stroke: '#ff0000'}})
    //     }
    //     if (creep.room.name != roomName){
    //         creep.moveTo(new RoomPosition(49, 31, 'w48S14'), {visualizePathStyle: {stroke: '#ff0000'}})
    //     }
    // }
    // console.log('I am a harvester')
    if(creep.store.getFreeCapacity() > 0) {
        // creep.say('🔄 harvest');
        // creep.memory.source_idx = 1 //近的这个，坐标13 29
        // creep.memory.source_idx = 0 //远的， 坐标5， 11
        var source: Source
        // console.log(creep.room.memory.source_ids == undefined)
        if (creep.room.memory.source_ids == undefined){
            var sources = creep.room.find(FIND_SOURCES)
            Memory.rooms[roomName].source_ids = new Array(sources.length)
            for (var i: number = 0; i < sources.length; i++){
                Memory.rooms[roomName].source_ids[i] = sources[i].id;
            }
        }
        source = Game.getObjectById(Memory.rooms[roomName].source_ids[creep.memory.source_idx])
        if (!source){
            source = Game.getObjectById(Memory.rooms[roomName].source_ids[1-creep.memory.source_idx])
        }
        // console.log(creep.harvest(source))
        var code:number
        code = creep.harvest(source)
        if (code == OK){}
        else if (code == ERR_NOT_IN_RANGE) creep.moveTo(source, {visualizePathStyle: {stroke: '#808080'}});
        else if (code == ERR_NOT_ENOUGH_RESOURCES) {
            console.log(creep.name + ' chang source to :' + (1 - creep.memory.source_idx))
            creep.memory.source_idx = 1 - creep.memory.source_idx
        }
        else if (code == ERR_INVALID_TARGET){
            var sources = creep.room.find(FIND_SOURCES)
            Memory.rooms[roomName].source_ids = new Array(sources.length)
            for (var i: number = 0; i < sources.length; i++){
                Memory.rooms[roomName].source_ids[i] = sources[i].id;
            }
        }
        else if (code == ERR_NOT_OWNER  || code == ERR_NOT_FOUND || code == ERR_TIRED || code == ERR_NO_BODYPART){
            // code == ERR_BUSY: 忽略
            console.log("code: " + code + " havester line 45")
        }
    }
    else {
        // creep.say('🚧transfer');
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
                    return (structure.structureType == STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_CONTAINER) &&
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