/* 
reqiure:
room
room.memory.towers.id

set:
room.memory.war_flag

action:
notifyWhenAttacked tower
activateSafeMode
*/

export const tower_work = function(roomName: string){
    let room = Game.rooms[roomName]
    if (!room){
        console.log(Game.time, "tower_work", ' roomName:', roomName, ' undefined')
        return
    }
    let tower_list = room.memory.towers_id
    let closestHostiles = room.find(FIND_HOSTILE_CREEPS);
    let structures: Structure[]
    if(closestHostiles.length == 0){
        structures = room.find(FIND_STRUCTURES, {
                        filter: (structure) => structure.hits < structure.hitsMax  
                        && structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART
                    });
    }
    // Tower防御及safe mode的激活
    for (let tower_id in tower_list){
        let tower: StructureTower = Game.getObjectById(tower_list[tower_id])
        if (tower){
            if (tower.notifyWhenAttacked(true) == OK && tower.hits <= 0.6*tower.hitsMax)
            {
                room.controller.activateSafeMode()
            }
            if(tower) {
                if(closestHostiles.length > 0) {
                    if (tower.room.memory.war_flag == false){
                        console.log(Game.time, roomName, '发现敌军' + closestHostiles.length + closestHostiles[0].owner.username)
                    }
                    tower.room.memory.war_flag = true
                    tower.attack(closestHostiles[0]);
                }
                else if (!(tower.store.getUsedCapacity(RESOURCE_ENERGY) < 0.7*tower.store.getCapacity(RESOURCE_ENERGY))){
                    tower.room.memory.war_flag = false
                    if(structures.length > 0) {
                        tower.repair(structures[0]);
                    }
                }
            }
        }
    }
}