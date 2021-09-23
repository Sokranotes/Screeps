export const tower_work = function(roomName: string){
    // Tower防御及safe mode的激活
    var tower: StructureTower = Game.getObjectById('613e1e2c2acf7910898bae98');
    var tower1: StructureTower = Game.getObjectById('6144e55dfd720ff16b30cffa');
    if (tower.hits <= 0.5*tower.hitsMax || Game.spawns['Spawn1'].hits <= 0.5*Game.spawns['Spawn1'].hitsMax)
    {
        Game.rooms[roomName].controller.activateSafeMode()
    }
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.room.memory.war_flag = true
            console.log(Game.time + ' 发现敌军 ' + closestHostile.pos.x + " " + closestHostile.pos.y + closestHostile.owner)
            tower.attack(closestHostile);
            if(tower1) {
                if(closestHostile) {
                    tower1.attack(closestHostile);
                }
            }
        }
        else if (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower.store.getCapacity(RESOURCE_ENERGY)){
            var ramparts = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < 100000  && structure.structureType == STRUCTURE_RAMPART
            });
            if(ramparts) {
                // console.log('tower repair ramparts 2')
                tower.repair(ramparts[0]);
                if(tower1) {
                    if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY))
                    {
                        tower1.repair(ramparts[0]);
                    }
                }
            }
            else{
                var structures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax  
                    && structure.structureType == STRUCTURE_CONTAINER
                });
                if(structures) {
                    tower.repair(structures);
                    if(tower1) {
                        if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY))
                        {
                            tower1.repair(structures);
                        }
                    }
                }
                else{
                    var structures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax  
                        && structure.structureType != STRUCTURE_WALL
                        && structure.structureType != STRUCTURE_RAMPART
                    });
                    if(structures) {
                        tower.repair(structures);
                        if(tower1) {
                            if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY))
                            {
                                tower1.repair(structures);
                            }
                        }
                    }
                }
                // else{
                //     var structures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                //         filter: (structure) => structure.hits < structure.hitsMax  && structure.structureType != STRUCTURE_WALL
                //     });
                //     if(structures) {
                //         // console.log('tower repair structures')
                //         tower.repair(structures);
                //         if(tower1) {
                //             if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY))
                //             {
                //                 tower1.repair(structures);
                //             }
                //         }
                //     }
                    // var walls = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    //     filter: (structure) => structure.hits < structure.hitsMax  && structure.structureType == STRUCTURE_WALL
                    // });
                    // if(walls) {
                    //     tower.repair(walls);
                    //     if(tower1) {
                    //         if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0.75*tower1.store.getCapacity(RESOURCE_ENERGY)  && tower.room.energyAvailable == tower.room.energyCapacityAvailable)
                    //         {
                    //             tower1.repair(walls);
                    //         }
                    //     }
                    // }
                // }
            }
        }
    }
}