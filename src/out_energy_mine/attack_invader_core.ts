import * as $ from "../modules/超级移动优化"

export const attack_invader_core_work = function(creep: Creep){
    // creep.say('🔄 attack');
    if (creep.room.name != creep.memory.source_roomName){
        creep.moveTo(new RoomPosition(24, 47, creep.memory.source_roomName), {visualizePathStyle: {stroke: '#ff0000'}})
    }
    else{
        // var invader: StructureInvaderCore = Game.getObjectById(Memory.rooms[creep.memory.source_roomName].invader_core_id)
        // if (invader != undefined){
        //     if (creep.attack(invader) != OK){
        //         creep.moveTo(invader)
        //     }
        // }

        var invade_targets: Creep[] = creep.room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (creep.getActiveBodyparts(HEAL) > 1);
            }
        });
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
            }
        }
    }
}