import * as $ from "../modules/超级移动优化"

export const out_passive_transfer_work = function(creep: Creep){
    if (Memory.rooms[creep.memory.source_roomName].war_flag == true){
        creep.memory.is_working = false
        let target = new RoomPosition(3, 36, creep.memory.dest_roomName)
        if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
            // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
            creep.memory.path = creep.pos.findPathTo(target);
        }
        let code = creep.moveByPath(creep.memory.path)
        if (code == ERR_NOT_FOUND){
            if (creep.pos.isNearTo(target)){
                creep.memory.path = null
            }
            else{
                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                creep.memory.path = creep.pos.findPathTo(target);
            }
        }
        // creep.moveTo(new RoomPosition(8, 34, creep.memory.dest_roomName))
    }
    else{
        if(creep.memory.is_working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.is_working = false;
            creep.memory.path = null
            creep.say('🔄 harvest');
        }
        if(!creep.memory.is_working && creep.store.getFreeCapacity() == 0) {
            creep.memory.is_working = true;
            creep.memory.path = null
            creep.say('🚧 transfer');
        }
        if (creep.memory.is_working == true){
            if (creep.memory.source_roomName == 'W47S13' || creep.memory.source_roomName == 'W46S13'){
                let storage: StructureStorage = Game.getObjectById('6159fc1609f790175f45c6be')
                let code = creep.transfer(storage, RESOURCE_ENERGY)
                if(code == ERR_NOT_IN_RANGE) {
                    if (creep.pos.inRangeTo(storage, 7)){
                        let target = storage
                        if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                            // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                        let code = creep.moveByPath(creep.memory.path)
                    }
                    else{
                        if (creep.pos.isNearTo(storage)){
                            if (creep.transfer(storage, RESOURCE_ENERGY) == OK){
                                creep.memory.path = null
                            }
                        }
                        else{
                            creep.moveTo(storage)
                        }
                    }
                }
            }
            else{
                let link1: StructureLink = Game.getObjectById('615d6e761b8f40360c7387dd')
                let link2: StructureLink = Game.getObjectById('61450b41047f4458ae00790f')
                if (creep.pos.isNearTo(link1) || creep.pos.isNearTo(link2)){
                    if (link2.store.getUsedCapacity(RESOURCE_ENERGY) < 800){
                        let code = creep.transfer(link2, RESOURCE_ENERGY)
                        if(code == ERR_NOT_IN_RANGE) {
                            let target = link2
                            if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                                creep.memory.path = creep.pos.findPathTo(target);
                            }
                            let code = creep.moveByPath(creep.memory.path)
                            if (code == ERR_NOT_FOUND){
                                if (creep.pos.isNearTo(target)){
                                    creep.memory.path = null
                                }
                                else{
                                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                                    creep.memory.path = creep.pos.findPathTo(target);
                                }
                            }
                            // creep.moveTo(link2)
                        }
                        else if (code == OK){
                            creep.memory.path = null
                        }
                    }
                    else if (link1.store.getUsedCapacity(RESOURCE_ENERGY) < 800){
                        let code = creep.transfer(link1, RESOURCE_ENERGY)
                        if(code == ERR_NOT_IN_RANGE) {
                            let target = link1
                            if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                                // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                                creep.memory.path = creep.pos.findPathTo(target);
                            }
                            let code = creep.moveByPath(creep.memory.path)
                            if (code == ERR_NOT_FOUND){
                                if (creep.pos.isNearTo(target)){
                                    creep.memory.path = null
                                }
                                else{
                                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                                    creep.memory.path = creep.pos.findPathTo(target);
                                }
                            }
                            // creep.moveTo(link1, {visualizePathStyle: {stroke: '#ffff00'}, reusePath: 30});
                        }
                        else if (code == OK){
                            creep.memory.path = null
                        }
                    }
                }
                else{
                    let target = link2
                    if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                        // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                    let code = creep.moveByPath(creep.memory.path)
                    if (code == ERR_NOT_FOUND){
                        if (creep.pos.isNearTo(target)){
                            creep.memory.path = null
                        }
                        else{
                            // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                            creep.memory.path = creep.pos.findPathTo(target);
                        }
                    }
                    // creep.moveTo(link2)
                }
            }
        }
        else{
            let source_room: Room = Game.rooms[creep.memory.source_roomName]
            if (source_room == undefined){
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
                let target = farm_creeps[0]
                if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    creep.memory.path = creep.pos.findPathTo(target);
                }
                let code = creep.moveByPath(creep.memory.path)
                if (code == ERR_NOT_FOUND){
                    if (creep.pos.isNearTo(target)){
                        creep.memory.path = null
                    }
                    else{
                        // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                }
                // creep.moveTo(farm_creeps[0])
                let res = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
                creep.pickup(res)
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
                let target = place
                if((!creep.memory.path || creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49) && !creep.pos.isNearTo(target)) {
                    // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                    creep.memory.path = creep.pos.findPathTo(target);
                }
                let code = creep.moveByPath(creep.memory.path)
                if (code == ERR_NOT_FOUND){
                    if (creep.pos.isNearTo(target)){
                        creep.memory.path = null
                    }
                    else{
                        // creep.memory.path = creep.pos.findPathTo(target, {ignoreCreeps: true});
                        creep.memory.path = creep.pos.findPathTo(target);
                    }
                }
                // creep.moveTo(place)
            }
        }
    }
}