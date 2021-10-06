import * as $ from "../modules/超级移动优化"

export const out_passive_transfer_work = function(creep: Creep){
    let source_room: Room = Game.rooms[creep.memory.source_roomName]
    let dest_room: Room = Game.rooms[creep.memory.dest_roomName]
    // room空值检查
    if (source_room == undefined){
        return
    }
     if (dest_room == undefined){
        console.log('dest_room ', creep.memory.dest_roomName, " undefined")
        return
    }
    else if (Game.rooms[creep.memory.source_roomName].memory.war_flag == true){
        creep.memory.is_working = false
        if(!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
            creep.memory.path = creep.pos.findPathTo(new RoomPosition(8, 34, creep.memory.dest_roomName));
        }
        creep.moveByPath(creep.memory.path);
        if (creep.pos.inRangeTo(new RoomPosition(8, 34, creep.memory.dest_roomName), 2)){
            creep.memory.path = null
        }
    }
    else{
        if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
            // 如果在transfer状态，且没有能量了，那么退出transfer状态
            creep.memory.is_working = false;
            creep.memory.path = null
            creep.say('🔄 harvest');
        }
        if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
            //如果在采集状态，且采集不了了，装满了，退出采集状态
            creep.memory.is_working = true;
            creep.memory.path = null
            creep.say('🚧 transfer');
        }
        if (creep.memory.is_working == true){
            let link1: StructureLink = Game.getObjectById('615d6e761b8f40360c7387dd')
            let link2: StructureLink = Game.getObjectById('61450b41047f4458ae00790f')
            if (creep.pos.isNearTo(link1) || creep.pos.isNearTo(link2)){
                if (link2.store.getUsedCapacity(RESOURCE_ENERGY) < 800){
                    let code = creep.transfer(link2, RESOURCE_ENERGY)
                    if(code == ERR_NOT_IN_RANGE) {
                        if(!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
                            creep.memory.path = creep.pos.findPathTo(link2);
                        }
                        creep.moveByPath(creep.memory.path);
                    }
                    else if (code == OK){
                        creep.memory.path = null
                    }
                }
                else if (link1.store.getUsedCapacity(RESOURCE_ENERGY) < 800){
                    let code = creep.transfer(link1, RESOURCE_ENERGY)
                    if(code == ERR_NOT_IN_RANGE) {
                        if(!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
                            creep.memory.path = creep.pos.findPathTo(link2);
                        }
                        creep.moveByPath(creep.memory.path);
                        creep.moveTo(link1, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 30});
                    }
                    else if (code == OK){
                        creep.memory.path = null
                    }
                }
            }
            else{
                if(!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
                    creep.memory.path = creep.pos.findPathTo(link2);
                }
                creep.moveByPath(creep.memory.path);
                if (creep.pos.inRangeTo(link2, 2)){
                    creep.memory.path = null
                }
            }
        }
        else{
            let source_room: Room = Game.rooms[creep.memory.source_roomName]
            if (source_room == undefined){
                console.log('source_room ', creep.memory.source_roomName, " undefined")
                return
            }
            let farm_creeps = source_room.find(FIND_MY_CREEPS, {
                filter: (cre) => {
                    return (cre.memory.role == 'out_energy_harvester_with_carry' &&
                            cre.memory.source_idx == creep.memory.source_idx &&
                        cre.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                }
            });
            if (farm_creeps.length > 0){
                if(!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
                    creep.memory.path = creep.pos.findPathTo(farm_creeps[0]);
                }
                creep.moveByPath(creep.memory.path);
                if (creep.pos.inRangeTo(farm_creeps[0], 2)){
                    creep.memory.path = null
                }
            }
            else{
                let source = Game.getObjectById(source_room.memory.sources_id[creep.memory.source_idx])
                let place: RoomPosition
                if (source.pos.x >= 25){
                    if (source.pos.y >= 25){
                        place = new RoomPosition(source.pos.x - 8, source.pos.y - 8, creep.memory.source_roomName)
                    }
                    else{
                        place = new RoomPosition(source.pos.x - 8, source.pos.y + 8, creep.memory.source_roomName)
                    }
                }
                else{
                    if (source.pos.y >= 25){
                        place = new RoomPosition(source.pos.x + 8, source.pos.y - 8, creep.memory.source_roomName)
                    }
                    else{
                        place = new RoomPosition(source.pos.x + 8, source.pos.y + 8, creep.memory.source_roomName)
                    }
                }
                if(!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) {
                    creep.memory.path = creep.pos.findPathTo(place);
                }
                creep.moveByPath(creep.memory.path);
                if (creep.pos.inRangeTo(place, 2)){
                    creep.memory.path = null
                }
            }
            let res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            creep.pickup(res)
        }
    }
}