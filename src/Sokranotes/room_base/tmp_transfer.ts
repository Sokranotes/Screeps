export const tmp_transfer_work = function(creep: Creep){
    // let container: StructureContainer = Game.getObjectById("61c0dd7d28ba3c10a221bae0")
    // if (container.store.getUsedCapacity() != 0){
    //     if (creep.room.name != 'W46S15') creep.moveTo(new RoomPosition(25, 25, 'W46S15'))
    //     else {
    //         if (creep.pos.x < 1) creep.moveTo(new RoomPosition(25, 25, 'W46S15'))
    //         let code = creep.withdraw(Game.getObjectById('61c0dd7d28ba3c10a221bae0'), RESOURCE_PURIFIER)
    //         if (code == ERR_NOT_IN_RANGE){
    //             creep.moveTo(new RoomPosition(21, 30, 'W46S15'))
    //         }
    //         else {
    //             if (creep.withdraw(Game.getObjectById('61c0dd7d28ba3c10a221bae0'), RESOURCE_UTRIUM_BAR) != OK){
    //                 creep.withdraw(Game.getObjectById('61c0dd7d28ba3c10a221bae0'), RESOURCE_LIQUID)
    //             }
    //         }
    //     }
    // }
    // else{
    //     let code = creep.transfer(Game.rooms['W47S14'].storage, RESOURCE_PURIFIER)
    //     if (code == ERR_NOT_IN_RANGE){
    //         creep.moveTo(new RoomPosition(21, 30, 'W46S15'))
    //     }
    //     else {
    //         if (creep.transfer(Game.rooms['W47S14'].storage, RESOURCE_PURIFIER) != OK){
    //             creep.transfer(Game.rooms['W47S14'].storage, RESOURCE_PURIFIER)
    //         }
    //     }
    // }

    // [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
    // Game.rooms['W44S12'].addSpawnTask(5, {name: "tmp_transfer" + Game.time, bodyParts: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],memory: {role: 'tmp_transfer',}})

    // Game.rooms['W44S12'].addSpawnTask(5, {name: "tmp_transfer" + Game.time, bodyParts: [MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY],memory: {role: 'tmp_transfer',}})

    // Game.rooms['W44S12'].addSpawnTask(5, {name: "tmp_transfer" + Game.time, bodyParts: [MOVE,MOVE,CARRY,CARRY],memory: {role: 'tmp_transfer',}})

    // let room_name = 'W44S12'
    // let dest_name = 'W47S14'
    // // 3*7=24 5*7=35
    // if (creep.store.getUsedCapacity() > 0){
    //     if (creep.room.name != dest_name){
    //         creep.moveTo(new RoomPosition(25, 25, dest_name))
    //     }
    //     else{
    //         if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //             creep.moveTo(new RoomPosition(25, 25, dest_name))
    //         else{
    //             let terminal = Game.rooms[dest_name].terminal
    //             if (creep.pos.isNearTo(terminal)){
    //                 if (terminal.store.getFreeCapacity() > creep.store.getUsedCapacity()){
    //                     creep.transfer(terminal, RESOURCE_CATALYZED_GHODIUM_ACID)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                     creep.transfer(terminal, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                     creep.transfer(terminal, RESOURCE_GHODIUM)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                     creep.transfer(terminal, RESOURCE_HYDROGEN)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                     creep.transfer(terminal, RESOURCE_CATALYZED_LEMERGIUM_ACID)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                     creep.transfer(terminal, RESOURCE_CATALYZED_UTRIUM_ALKALIDE)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                     creep.transfer(terminal, RESOURCE_CATALYZED_ZYNTHIUM_ACID)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                     creep.transfer(terminal, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                     creep.transfer(terminal, RESOURCE_CATALYZED_KEANIUM_ALKALIDE)
    //                     if (creep.store.getUsedCapacity() == 0) return
    //                 }
    //             }
    //             else{
    //                 creep.moveTo(Game.rooms[dest_name].terminal)
    //             }
    //         }
    //     }
    // }
    // else{
    //     // if (creep.ticksToLive < 440) {
    //     //     creep.suicide();
    //     // }
        
    //     if (creep.room.name != room_name){
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     }
    //     else{
    //         if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //             creep.moveTo(new RoomPosition(25, 25, room_name))
    //         let storage: StructureStorage = Game.getObjectById('5d26e34861e1f34abe0d4299')
    //         if (creep.pos.isNearTo(storage)){
    //             creep.say(''+creep.store.getCapacity())
    //             if (creep.store.getCapacity() >= 400)
    //                 if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_CATALYZED_GHODIUM_ACID) == 0){}
    //                 else if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) == 0){}
    //                 else if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_GHODIUM) == 0){}
    //                 else if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_HYDROGEN)){}
    //             if (creep.store.getCapacity() == 250)
    //                 if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_CATALYZED_LEMERGIUM_ACID) == 0){}
    //                 else if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_CATALYZED_UTRIUM_ALKALIDE) == 0){}
    //             if (creep.store.getCapacity() == 100)
    //                 if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_CATALYZED_ZYNTHIUM_ACID) == 0) {}
    //                 else if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) == 0){} 
    //                 else if (creep.withdraw(Game.getObjectById('5d26e34861e1f34abe0d4299'), RESOURCE_CATALYZED_KEANIUM_ALKALIDE) == 0) {}
    //         }
    //         else{
    //             creep.moveTo(Game.rooms[room_name].storage)
    //         }
    //     }
    // }

    // let room_name = 'W44S12'
    // let dest_name = 'W44S12'
    // // 3*7=24 5*7=35
    // if (creep.store.getUsedCapacity() > 0){
    //     let storage = Game.rooms[dest_name].storage
    //     if (creep.pos.isNearTo(storage)){
    //         creep.transfer(storage, RESOURCE_CATALYZED_GHODIUM_ACID)
    //         if (creep.store.getUsedCapacity() == 0) return
    //         creep.transfer(storage, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE)
    //         if (creep.store.getUsedCapacity() == 0) return
    //         creep.transfer(storage, RESOURCE_GHODIUM)
    //         if (creep.store.getUsedCapacity() == 0) return
    //         creep.transfer(storage, RESOURCE_HYDROGEN)
    //         if (creep.store.getUsedCapacity() == 0) return
    //         creep.transfer(storage, RESOURCE_CATALYZED_LEMERGIUM_ACID)
    //         if (creep.store.getUsedCapacity() == 0) return
    //         creep.transfer(storage, RESOURCE_CATALYZED_UTRIUM_ALKALIDE)
    //         if (creep.store.getUsedCapacity() == 0) return
    //         creep.transfer(storage, RESOURCE_CATALYZED_ZYNTHIUM_ACID)
    //         if (creep.store.getUsedCapacity() == 0) return
    //         creep.transfer(storage, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE)
    //         if (creep.store.getUsedCapacity() == 0) return
    //         creep.transfer(storage, RESOURCE_CATALYZED_KEANIUM_ALKALIDE)
    //         if (creep.store.getUsedCapacity() == 0) return
    //     }
    //     else{
    //         creep.moveTo(Game.rooms[dest_name].storage)
    //     }
    // }
    // else{
    //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     let terminal: StructureTerminal = Game.rooms[room_name].terminal
    //     if (creep.pos.isNearTo(terminal)){
    //         creep.say(''+creep.store.getCapacity())
    //         if (creep.store.getCapacity() >= 400)
    //             if (creep.withdraw(terminal, RESOURCE_CATALYZED_GHODIUM_ACID) == 0){}
    //             else if (creep.withdraw(terminal, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) == 0){}
    //             else if (creep.withdraw(terminal, RESOURCE_GHODIUM) == 0){}
    //             else if (creep.withdraw(terminal, RESOURCE_HYDROGEN)){}
    //         if (creep.store.getCapacity() == 250)
    //             if (creep.withdraw(terminal, RESOURCE_CATALYZED_LEMERGIUM_ACID) == 0){}
    //             else if (creep.withdraw(terminal, RESOURCE_CATALYZED_UTRIUM_ALKALIDE) == 0){}
    //         if (creep.store.getCapacity() == 100)
    //             if (creep.withdraw(terminal, RESOURCE_CATALYZED_ZYNTHIUM_ACID) == 0) {}
    //             else if (creep.withdraw(terminal, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) == 0){} 
    //             else if (creep.withdraw(terminal, RESOURCE_CATALYZED_KEANIUM_ALKALIDE) == 0) {}
    //     }
    //     else{
    //         creep.moveTo(Game.rooms[room_name].terminal)
    //     }
    // }

    // 从storage搬运至terminal
    // let room_name = 'W44S12'
    // if (creep.store.getUsedCapacity() > 0){
    //     let storage = Game.rooms[room_name].storage
        // if (creep.pos.isNearTo(storage)){
        //     creep.transfer(storage, RESOURCE_ENERGY)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_HYDROGEN)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_OXYGEN)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_UTRIUM)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_LEMERGIUM)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_KEANIUM)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_ZYNTHIUM)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYST)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_GHODIUM)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_SILICON)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_METAL)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_BIOMASS)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_MIST)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_HYDROXIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_ZYNTHIUM_KEANITE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_UTRIUM_LEMERGITE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_UTRIUM_HYDRIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_UTRIUM_OXIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_KEANIUM_HYDRIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_KEANIUM_OXIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_LEMERGIUM_HYDRIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_LEMERGIUM_OXIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_ZYNTHIUM_HYDRIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_ZYNTHIUM_OXIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_GHODIUM_HYDRIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_GHODIUM_OXIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_UTRIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_UTRIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_KEANIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_KEANIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_LEMERGIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_LEMERGIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_ZYNTHIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_ZYNTHIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_GHODIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_GHODIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_UTRIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_UTRIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_KEANIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_KEANIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_LEMERGIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_ZYNTHIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_GHODIUM_ACID)
        //     if (creep.store.getUsedCapacity() == 0) return
        //     creep.transfer(storage, RESOURCE_CATALYZED_GHODIUM_ALKALIDE)
        //     if (creep.store.getUsedCapacity() == 0) return
        // }

    // 忽略类型搬运
    // Game.rooms['W44S12'].addSpawnTask(5, {name: "tmp_transfer" + Game.time, bodyParts: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],memory: {role: 'tmp_transfer',}})
    // if (creep.store.getUsedCapacity() == 0){
    //     if (creep.ticksToLive < 35) creep.suicide()
    //     let terminal = creep.room.terminal
    //     creep.moveTo(terminal)
    //     if (creep.pos.isNearTo(terminal)){
    //         let resources = terminal.store
    //         let resource_types = Object.keys(resources)
    //         for (let i = 0; i < resource_types.length; i++){
    //             let resource_type = resource_types[i]
    //             let resource_amount = resources[resource_type]
    //             if (resource_amount > 0){
    //                 creep.withdraw(terminal, resource_type as ResourceConstant);
    //                 if (creep.store.getFreeCapacity() == 0){
    //                     return
    //                 }
    //             }
    //         }
    //     }
    // }
    // else{
    //     let storage = creep.room.storage
    //     creep.moveTo(storage)
    //     if (creep.pos.isNearTo(storage)){
    //         let resources = creep.store
    //         let resource_types = Object.keys(resources)
    //         for (let i = 0; i < resource_types.length; i++){
    //             let resource_type = resource_types[i]
    //             let resource_amount = resources[resource_type]
    //             if (resource_amount > 0){
    //                 creep.transfer(storage, resource_type as ResourceConstant);
    //                 if (creep.store.getUsedCapacity() == 0){
    //                     return
    //                 }
    //             }
    //         }
    //     }
    // }

    // 打扫战场
    // Game.rooms['W12N13'].addSpawnTask(5, {name: "tmp_transfer" + Game.time, bodyParts: [MOVE,CARRY],memory: {role: 'tmp_transfer',}})
    // Game.rooms['W12N13'].addSpawnTask(25, {name: "tmp_transfer" + Game.time, bodyParts: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],memory: {role: 'tmp_transfer',}})
    if (creep.getActiveBodyparts(CLAIM) > 0){
        if (creep.room.name != 'W12N12'){
            creep.moveTo(new RoomPosition(37,2,'W12N12'))
        }
        else{
            let room = Game.rooms['W12N12']
            let controller = room.controller
            if (!controller.my){
                if (creep.pos.isNearTo(controller)){
                    if (controller.upgradeBlocked > 600) creep.suicide()
                    else creep.attackController(controller)
                }
                else{
                    creep.moveTo(controller)
                }
            }
        }
    }
    else{
        if (creep.store.getUsedCapacity() == 0){
            if (creep.pos.isNearTo(creep.room.storage)){
                if (creep.ticksToLive < 260) creep.suicide()
            }
            // if (creep.ticksToLive < 260) creep.suicide()
            if (creep.room.name != "W12N12") {
                if (creep.fatigue == 0)
                    creep.moveTo(new RoomPosition(37, 2, "W12N12"))
                return
            }
            if (creep.pos.x == 13 && creep.pos.y == 38 && creep.room.name == "W12N12"){
                let target
                let storage
                let pos: RoomPosition = new RoomPosition(13, 38, "W12N12")
                let tmp = pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType === STRUCTURE_STORAGE})
                if (tmp.length > 0){
                    storage = tmp[0]
                }
                if (!storage){
                    console.log('no storage')
                }
                else{
                    target = storage
                }
                creep.withdraw(target, RESOURCE_ENERGY);
            }
            else{
                if (creep.fatigue == 0)
                    creep.moveTo(new RoomPosition(13, 38, "W12N12"))
            }
        }
        else{
            let storage = Game.rooms["W12N13"].storage
            if (creep.pos.isNearTo(storage))
            {
                // console.log(creep.name, Game.time)
                creep.transfer(storage, RESOURCE_ENERGY);
            }
            else
            {
                if (creep.fatigue == 0)
                    creep.moveTo(storage);
            }
        }
    }
}