export const tower_work = function(roomName: string){
    // Tower防御及safe mode的激活
    if (roomName == 'W47S14'){
        var tower_list = ['613e1e2c2acf7910898bae98', '6144e55dfd720ff16b30cffa']
        var spawn_list = ['Spawn1', 'Spawn3']
    }
    else if (roomName == 'W48S12'){
        var tower_list = ['6159ce743a785c3da4b22def']
        var spawn_list = ['Spawn2']
    }
    for (let spawn_id in spawn_list){
        if (Game.spawns[spawn_list[spawn_id]]){
            if (Game.spawns['Spawn3'].hits <= 0.5*Game.spawns['Spawn3'].hitsMax)
            {
                Game.rooms[roomName].controller.activateSafeMode()
            }
        }
    }
    var closestHostiles
    if (Game.rooms[roomName]){
        closestHostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
    }
    else{
        console.log('tower work 23 room seems undefined')
        return
    }
    if (closestHostiles.length > 0){
        console.log(Game.time, roomName, ' 发现敌军' + closestHostiles.length + closestHostiles[0].owner)
    }
    for (let tower_id in tower_list){
        // console.log(tower_id)
        let tower: StructureTower = Game.getObjectById(tower_list[tower_id])
        if (tower){
            if (tower.hits <= 0.5*tower.hitsMax)
            {
                Game.rooms[roomName].controller.activateSafeMode()
            }
            if(tower) {
                if(closestHostiles.length > 0) {
                    tower.room.memory.war_flag = true
                    tower.attack(closestHostiles[0]);
                }
                else if (!(tower.store.getUsedCapacity(RESOURCE_ENERGY) < 0.7*tower.store.getCapacity(RESOURCE_ENERGY))){
                    tower.room.memory.war_flag = false
                    var ramparts = tower.room.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < 100000  && structure.structureType == STRUCTURE_RAMPART
                    });
                    // if(ramparts.length > 0) {
                    if(false) {
                        tower.repair(ramparts[0]);
                    }
                    else{
                        var structures = tower.room.find(FIND_STRUCTURES, {
                            filter: (structure) => structure.hits < structure.hitsMax  
                            && structure.structureType == STRUCTURE_CONTAINER
                        });
                        if(structures.length > 0) {
                            tower.repair(structures[0]);
                        }
                        else{
                            var structures = tower.room.find(FIND_STRUCTURES, {
                                filter: (structure) => structure.hits < structure.hitsMax  
                                && structure.structureType != STRUCTURE_WALL
                                && structure.structureType != STRUCTURE_RAMPART
                            });
                            if(structures != null) {
                                tower.repair(structures[0]);
                            }
                        }
                    }
                }
            }
        }
    }
}