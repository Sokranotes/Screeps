// 需要用到的
// creep.memory.source_idx
// creep.memory.container_pos

import * as $ from "./../../超级移动优化"

export const energy_harvester_with_carry_work = function(creep: Creep, roomName: string){
    // creep.say('👋 Here');
    var source: Source = Game.getObjectById(creep.room.memory.sources_id[creep.memory.source_idx])
    var code:number = creep.harvest(source)
    // var farm_creeps = creep.room.find(FIND_MY_CREEPS, {
    //     filter: (crp) => {
    //         return (crp.memory.role == 'energy_harvester_with_carry' 
    //         && crp.memory.source_idx == creep.memory.source_idx 
    //         && crp.store.getUsedCapacity(RESOURCE_ENERGY) > 0.5*crp.store.getCapacity());
    //     }
    // });

        if (creep.pos.x != creep.memory.container_pos.x || creep.pos.y != creep.memory.container_pos.y){
            creep.moveTo(new RoomPosition(creep.memory.container_pos.x, creep.memory.container_pos.y, roomName), {visualizePathStyle: {stroke: '#808080'}});
        }
        if (code == OK){
            if (creep.room.memory.source_costs[creep.memory.source_idx] == undefined){
                creep.room.memory.source_costs[creep.memory.source_idx] = creep.ticksToLive + 10
            }
        }
        else if (code == ERR_NOT_IN_RANGE){
            code = creep.moveTo(new RoomPosition(creep.memory.container_pos.x, creep.memory.container_pos.y, roomName), {visualizePathStyle: {stroke: '#808080'}});
        }
        else if (code == ERR_NOT_OWNER){
            console.log(creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER")
            creep.say('⚠️ ' + creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " ERR_NOT_OWNER");
        }
        else if (code == ERR_INVALID_TARGET){
            console.log(creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET")
            creep.say('⚠️ ' + creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " ERR_INVALID_TARGET");
        }
        else if (code == ERR_NOT_FOUND || code == ERR_NOT_ENOUGH_RESOURCES || code == ERR_TIRED || code == ERR_NO_BODYPART){
            // code == ERR_BUSY: 忽略
            console.log(creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code)
            creep.say('⚠️ ' + creep.room.name + " " + creep.pos.x + " " + creep.pos.y + " error code: "+ code);
        }
        if (creep.ticksToLive < 50 && creep.room.memory.source_harvester_states[creep.memory.source_container_idx] == 1){
            // creep快死亡，提前返回控制信息，使得控制程序读取该creep的memory，从而生成新的creep
            creep.room.memory.source_harvester_states[creep.memory.source_container_idx] = 0
        }
}