export const attack_invader_core_work = function(creep: Creep){
    // creep.say('🔄 attack');
    if ((creep.room.name == 'W47S14' || (creep.room.name == 'W47S13' && creep.pos.x < 45)) && creep.memory.source_roomName == 'W46S13'){
        creep.moveTo(new RoomPosition(45, 29, 'W47S13'))
        return
    }
    if (creep.room.name != creep.memory.source_roomName){
        creep.moveTo(new RoomPosition(25, 25, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
    }
    else{
        var invade_targets: Creep[] = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (creep.getActiveBodyparts(HEAL) > 1);
            }
        });
        creep.room.find(FIND_HOSTILE_CREEPS, {filter: (creep) => {return (creep.getActiveBodyparts(HEAL) > 1);}})
        if (invade_targets.length > 0)
        {
            creep.room.memory.war_flag = true
            creep.room.memory.enemy_num = invade_targets.length
            if (creep.attack(invade_targets[0]) != OK)
            {
                creep.moveTo(invade_targets[0])
            }
        }
        else{
            var invade_targets: Creep[] = creep.room.find(FIND_HOSTILE_CREEPS);
            if (invade_targets.length > 0)
            {
                creep.room.memory.war_flag = true
                creep.room.memory.enemy_num = invade_targets.length
                if (creep.attack(invade_targets[0]) != OK)
                {
                    creep.moveTo(invade_targets[0])
                }
            }
            else{
                var invader: StructureInvaderCore = Game.getObjectById(Memory.rooms[creep.memory.source_roomName].invader_core_id)
                if (invader != undefined){
                    if (creep.attack(invader) != OK){
                        creep.moveTo(invader)
                    }
                }
                else{
                    if (creep.room.name == 'W47S15'){
                        creep.moveTo(new RoomPosition(46, 24, 'W47S15'))
                    }
                    else if (creep.room.name == 'W48S14'){
                        creep.moveTo(new RoomPosition(8, 34, 'W48S14'))
                    }
                    else if (creep.room.name == 'W46S13'){
                        creep.moveTo(new RoomPosition(25, 34, 'W46S13'))
                    }
                    else if (creep.room.name == 'W47S13'){
                        creep.moveTo(new RoomPosition(3, 36, 'W47S13'))
                    }
                }
            }
        }
    }
}