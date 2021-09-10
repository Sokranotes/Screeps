class Builder{
    creep: Creep
    Builder(creep: Creep){
        this.creep = creep
    }
    run(){
        if(this.creep.memory.is_building && this.creep.store[RESOURCE_ENERGY] == 0) {
            this.creep.memory.is_building = false;
            this.creep.say('🔄 harvest');
	    }
	    if(!this.creep.memory.is_building && this.creep.store.getFreeCapacity() == 0) {
	        this.creep.memory.is_building = true;
	        this.creep.say('🚧 build');
	    }

        var containers = this.creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                // return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;//过滤器找到非空的建筑
                return (structure.structureType == STRUCTURE_CONTAINER);//过滤器找到非空的建筑
            }
        });
        if(containers.length > 0) {
            if(this.creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else if(this.creep.memory.is_building) {
	        var constructions = this.creep.room.find(FIND_CONSTRUCTION_SITES);
            if(constructions.length) {
                if(this.creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(constructions[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
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
        //         this.creep.moveTo(new RoomPosition(23, 26, roomName), {visualizePathStyle: {stroke: '#ffffff'}});
        //     }
            
            var sources = this.creep.room.find(FIND_SOURCES);
            if(this.creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else{
                this.creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
    }
}


// var roleBuilder = {

//     /** @param {Creep} creep **/
//     run: function(creep) {
// 	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
//             creep.memory.building = false;
//             creep.say('🔄 harvest');
// 	    }
// 	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
// 	        creep.memory.building = true;
// 	        creep.say('🚧 build');
// 	    }

//         var targets = creep.room.find(FIND_STRUCTURES, {
//             filter: (structure) => {
//                 // return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;//过滤器找到非空的建筑
//                 return (structure.structureType == STRUCTURE_CONTAINER);//过滤器找到非空的建筑
//             }
//         });
//         if(targets.length > 0) {
//             if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//             }
//         }
//         else if(creep.memory.building) {
// 	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
//             if(targets.length) {
//                 if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
//                     creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//                 }
//             }
// 	    }
// 	    else {
// 	       // var targets = creep.room.find(FIND_STRUCTURES, {
//         //         filter: (structure) => {
//         //             // return (structure.structureType == STRUCTURE_CONTAINER) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;//过滤器找到非空的建筑
//         //             return (structure.structureType == STRUCTURE_CONTAINER);//过滤器找到非空的建筑
//         //         }
//         //     });
//         //     if(targets.length > 0) {
//         //         if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//         //             creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
//         //         }
//         //     }
//         //     else{
//         //         // creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
//         //         creep.moveTo(new RoomPosition(23, 26, 'sim'), {visualizePathStyle: {stroke: '#ffffff'}});
//         //     }
            
//             var sources = creep.room.find(FIND_SOURCES);
//             if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
//                 creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
//             }
//             else{
//                 creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
//             }
// 	    }
// 	}
// };

// module.exports = roleBuilder;