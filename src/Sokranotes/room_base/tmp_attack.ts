// Game.spawns['Spawn4'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], 'tmp_attack1', {memory: {role: 'tmp_attack'}});
// Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], 'tmp_attack2', {memory: {role: 'tmp_attack'}});

import { random } from "lodash"

// Game.spawns['Spawn1'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], 'tmp_attack3', {memory: {role: 'tmp_attack'}});
export const tmp_attack_work = function(creep: Creep){
    // Game.rooms['W41S6'].addSpawnTask(5, {name: "tmp_attack" + Game.time, bodyParts: [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],memory: {role: 'tmp_attack',}})
    // Game.rooms['W41S6'].addSpawnTask(5, {name: "tmp_attack" + Game.time, bodyParts: [TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],memory: {role: 'tmp_attack',}})
    let attack_room = 'W41S7'
    let source_room = "W41S6"

    let target_x = Game.flags.attack_target.pos.x, target_y = Game.flags.attack_target.pos.y
    let tmp_x = Game.flags.tmp_target_position.pos.x, tmp_y = Game.flags.tmp_target_position.pos.y
    let target_id = "638ed166d657ab65a9153b18"
    if (creep.getActiveBodyparts(HEAL) != 0){
        if (creep.room.name == "W41S6" && creep.hits < creep.hitsMax || creep.room.name == "W41S7"){
            creep.heal(creep)
        }
    }
    if (creep.room.name != attack_room){
        if (creep.hits == creep.hitsMax){
            creep.moveTo(new RoomPosition(25, 25, attack_room))
        }
        else if(creep.pos.x == 0 || creep.pos.x == 49 || creep.pos.y == 0 || creep.pos.y == 49){
            creep.moveTo(new RoomPosition(25, 25, source_room))
        }
    }
    else{
        if (creep.getActiveBodyparts(HEAL) != 0){
            creep.rangedMassAttack();
        }
        if (Game.flags.attack_this_room && Game.flags.attack_this_room.room.name == attack_room){
            let target: any = Game.getObjectById(target_id as Id<any>)
            if (target){
                attack_object(creep, target)
            }
            else{
                let invade_targets = creep.room.find(FIND_HOSTILE_CREEPS, {
                    filter: (creep) => (!global.white_list.has(creep.owner.username))
                });
                if (invade_targets.length > 0)
                {
                    if (creep.attack(invade_targets[0]) != OK)
                    {
                        creep.moveTo(invade_targets[0])
                    }
                }
                else{
                    target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType != STRUCTURE_CONTAINER && structure.structureType != STRUCTURE_CONTROLLER&& structure.structureType != STRUCTURE_WALL);
                        }
                    });
                    if(target) {
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target)
                        }
                        return
                    }
                    else{
                        creep.suicide();
                    }
                }
            }
        }
        else{
            if (creep.hits < creep.hitsMax ){
                creep.moveTo(new RoomPosition(25, 25, source_room))
            }
            else{
            // if (Math.abs(creep.pos.x - target_x) > 20 || Math.abs(creep.pos.y - target_y) > 20){
                creep.moveTo(new RoomPosition(tmp_x, tmp_y, attack_room))
            }
        }
    }
}

const attack_object = function(creep: Creep, target: any){
    if (!creep.pos.isNearTo(target)){
        creep.moveTo(target)
    }
    else if (creep.getActiveBodyparts(ATTACK) != 0){
        creep.attack(target)
    }
}



    // // boost直接攻击
    // if (creep.body[6].boost == undefined){
    //     if (creep.memory.dontPullMe == undefined){
    //         creep.memory.dontPullMe = true;
    //     }
    //     if (creep.pos.x != 11 || creep.pos.y != 16){
    //         creep.moveTo(new RoomPosition(11, 16, 'W47S14'))
    //     }
    //     else{
    //         // let lab_lho2: StructureLab = Game.getObjectById('615b67b909f7903134462c0d')
    //         // lab_lho2.boostCreep(creep)
    //         let lab_zho2: StructureLab = Game.getObjectById('615bb25d94d216562f056f23')
    //         lab_zho2.boostCreep(creep)
    //         // let lab_gho2: StructureLab = Game.getObjectById('615b2fe7b781a147a5c49b07')
    //         // lab_gho2.boostCreep(creep)
    //     }
    // }
    // else if (creep.room.name != 'W46S15') creep.moveTo(new RoomPosition(25, 25, 'W46S15'))
    // else {
    //     if (creep.hitsMax > creep.hits) creep.heal(creep)
    //     if (creep.pos.x < 1) creep.moveTo(new RoomPosition(25, 25, 'W46S15'))
    // }
    // if (creep.body[6].boost != undefined && Game.flags.attack){
    //     if (creep.hitsMax - creep.hits >= 1200){
    //         creep.moveTo(new RoomPosition(1, 41, 'W46S15'))
    //     }
    //     else{
    //         let li = ['61c0dd7d28ba3ca9d621bae2', '61c0a3d4d448f4e872ad27e7']
    //         for (let i in li){
    //             let obj: Structure = Game.getObjectById(li[i])
    //             if (obj != undefined){
    //                 if (creep.attack(obj) != OK){
    //                     creep.moveTo(obj)
    //                 }
    //                 break
    //             }
    //             if (i == '61c0dd7d28ba3ca9d621bae2'){
    //                 let code = creep.withdraw(Game.getObjectById('61c0dd7d28ba3c10a221bae0'), RESOURCE_PURIFIER)
    //                 if (code == ERR_NOT_IN_RANGE){
    //                     creep.moveTo(new RoomPosition(21, 30, 'W46S15'))
    //                 }
    //                 else {
    //                     if (creep.withdraw(Game.getObjectById('61c0dd7d28ba3c10a221bae0'), RESOURCE_UTRIUM_BAR) != OK){
    //                         creep.withdraw(Game.getObjectById('61c0dd7d28ba3c10a221bae0'), RESOURCE_PURIFIER)
    //                     }
    //                 }
    //                 if (creep.store.getFreeCapacity() == 0){
                        
    //                 }
    //             }
    //         }
    //     }
    // }

    // if (creep.room.name != 'W47S14') creep.moveTo(Game.rooms['W47S14'].terminal)
    // else{
    //     let code = creep.transfer(Game.rooms['W47S14'].terminal, RESOURCE_PURIFIER)
    //     if (code == ERR_NOT_IN_RANGE){
    //         creep.moveTo(new RoomPosition(21, 30, 'W46S15'))
    //     }
    //     else {
    //         if (creep.transfer(Game.rooms['W47S14'].terminal, RESOURCE_UTRIUM_BAR) != OK){
    //             creep.transfer(Game.rooms['W47S14'].terminal, RESOURCE_LIQUID)
    //         }
    //     }
    // }

    // if (creep.room.name != 'W41S7') creep.moveTo(new RoomPosition(25, 25, 'W41S7'))
    // else{
    //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //     creep.moveTo(new RoomPosition(25, 25, 'W41S7'))
    //     let obj: StructureSpawn = Game.getObjectById('61cbd70b3f190b3f79cf6b68')
    //     if (obj != undefined){
    //         if (creep.attack(obj) != OK){
    //             creep.moveTo(obj)
    //         }
    //     }
    //     else{
    //         let invade_targets = creep.room.find(FIND_HOSTILE_CREEPS, {
    //             filter: (creep) => (!global.white_list.has(creep.owner.username))
    //         });
    //         if (invade_targets.length > 0)
    //         {
    //             creep.room.memory.war_flag = true
    //             creep.room.memory.enemy_num = invade_targets.length
    //             if (creep.attack(invade_targets[0]) != OK)
    //             {
    //                 creep.moveTo(invade_targets[0])
    //             }
    //         }
    //     }
    // }

    // if (creep.room.name != 'W44S12'){
    //     creep.moveTo(new RoomPosition(25, 25, "W44S12"))
    // }
    // else{
    //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //         creep.moveTo(new RoomPosition(25, 25, "W44S12"))
    //     if (creep.claimController(creep.room.controller) != OK){
    //         creep.moveTo(creep.room.controller)
    //     }
    // }

    // ezberci
    // Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK], 'tmp_attack1', {memory: {role: 'tmp_attack'}});
    // if (creep.room.name != 'W13N13'){
    //     creep.moveTo(new RoomPosition(25, 25, "W13N13"))
    // }
    // else{
    //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //         creep.moveTo(new RoomPosition(25, 25, "W13N13"))
    //     else if (Game.getObjectById("62347cf4ef360790a2af5e76"))
    //     {
    //         if (creep.attack(Game.getObjectById("62347cf4ef360790a2af5e76")) != OK)
    //         {
    //             creep.moveTo(Game.getObjectById("62347cf4ef360790a2af5e76"))
    //         }
    //     }
    // }

    // Gribbit
    // let room_name = "W12N15"
    // if (creep.room.name != room_name){
    //     creep.moveTo(new RoomPosition(25, 25, room_name))
    // }
    // else{
    //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     else if (Game.getObjectById("6201a3222b249db1c02df43d"))
    //     {
    //         if (creep.attack(Game.getObjectById("6201a3222b249db1c02df43d")) != OK)
    //         {
    //             creep.moveTo(Game.getObjectById("6201a3222b249db1c02df43d"))
    //         }
    //     }
    // }

    // let room_name = "W12N13"
    // let dest_id: string = "6239c14f3199284539e18358" // wall
    // if (creep.room.name != room_name){
    //     creep.moveTo(new RoomPosition(25, 25, room_name))
    // }
    // else{
    //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     else if (Game.getObjectById(dest_id))
    //     {
    //         if (creep.attack(Game.getObjectById(dest_id)) != OK)
    //         {
    //             creep.moveTo(Game.getObjectById(dest_id))
    //         }
    //     }
    // }

    // Gribbit
    // Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM], 'tmp_attack1', {memory: {role: 'tmp_attack'}});
    // let room_name = "W12N15"
    // let dest_id: string = "5bbcac3c9099fc012e635237" // controller
    // if (creep.room.name != room_name){
    //     creep.moveTo(new RoomPosition(25, 25, room_name))
    // }
    // else{
    //     let c: StructureController = Game.getObjectById(dest_id)
    //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     else if (!c.my)
    //     {
    //         if (creep.attackController(Game.getObjectById(dest_id)) != OK)
    //         {
    //             creep.moveTo(Game.getObjectById(dest_id))
    //         }
    //     }
    // }
    
    // if (creep.getActiveBodyparts(CLAIM) != 0){
    //     // let room_name = "W12N15"
    //     // let dest_id: string = "5bbcac3c9099fc012e635237" // controller
    //     // if (creep.room.name != room_name){
    //     //     creep.moveTo(new RoomPosition(25, 25, room_name))
    //     // }
    //     // else{
    //     //     let c: StructureController = Game.getObjectById(dest_id)
    //     //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //     //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     //     else if (!c.my)
    //     //     {
    //     //         if (creep.attackController(Game.getObjectById(dest_id)) != OK)
    //     //         {
    //     //             creep.moveTo(Game.getObjectById(dest_id))
    //     //         }
    //     //     }
    //     // }

    //     let room_name = "W12N15"
    //     let dest_id: string = "5bbcac3c9099fc012e635237"
    //     if (creep.room.name != room_name){
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     }
    //     else{
    //         let c: StructureController = Game.getObjectById(dest_id)
    //         if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //             creep.moveTo(new RoomPosition(25, 25, room_name))
    //         try{
    //             if (creep.attackController(Game.getObjectById(dest_id)) != OK)
    //             {
    //                 creep.moveTo(Game.getObjectById(dest_id))
    //             }
    //             else{
    //                 creep.reserveController(Game.getObjectById(dest_id))
    //             }
    //         }
    //         catch{

    //         }
    //     }


    //         // else if (c.reservation? c.reservation.username == "Invader": false)
    //         // {
    //         //     if (creep.attackController(Game.getObjectById(dest_id)) != OK)
    //         //     {
    //         //         creep.moveTo(Game.getObjectById(dest_id))
    //         //     }
    //         // }
    //         // else{
    //         //     if (creep.reserveController(Game.getObjectById(dest_id)) != OK)
    //         //     {
    //         //         creep.moveTo(Game.getObjectById(dest_id))
    //         //     }
    //         // }
    // }
    // else{
    //     // Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK], 'tmp_attack1', {memory: {role: 'tmp_attack'}});
    //     let room_name: string = "W12N13"
    //     let invader_core_id: string = "6239e8070e2a57233b3c9c72"
    //     if (creep.room.name != room_name){
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     }
    //     else{
    //         if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //             creep.moveTo(new RoomPosition(25, 25, room_name))
    //         else if (Game.getObjectById(invader_core_id))
    //         {
    //             if (creep.attack(Game.getObjectById(invader_core_id)) != OK)
    //             {
    //                 creep.moveTo(Game.getObjectById(invader_core_id))
    //             }
    //         }
    //     }
    // }

    // if (creep.getActiveBodyparts(CLAIM) != 0){
    //     let room_name = "W44S12"
    //     let dest_id: string = "5bbcaaa49099fc012e631df8"
    //     if (creep.room.name != room_name){
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     }
    //     else{
    //         let c: StructureController = Game.getObjectById(dest_id)
    //         if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //             creep.moveTo(new RoomPosition(25, 25, room_name))
    //         try{
    //             if (c.reservation? c.reservation.username == "Invader": false)
    //             {
    //                 if (creep.attackController(Game.getObjectById(dest_id)) != OK)
    //                 {
    //                     creep.moveTo(Game.getObjectById(dest_id))
    //                 }
    //             }
    //             else{
    //                 if (creep.claimController(Game.getObjectById(dest_id)) != OK)
    //                 {
    //                     creep.moveTo(Game.getObjectById(dest_id))
    //                 }
    //             }
    //         }
    //         catch{

    //         }
    //     }
    // }
    // else{
    //     // Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK], 'tmp_attack1', {memory: {role: 'tmp_attack'}});
    //     let room_name: string = "W44S12"
    //     let invader_core_id: string = "62583374fcd74b24d7bac416"
    //     if (creep.room.name != room_name){
    //         creep.moveTo(new RoomPosition(25, 25, room_name))
    //     }
    //     else{
    //         if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47)
    //             creep.moveTo(new RoomPosition(25, 25, room_name))
    //         else if (Game.getObjectById(invader_core_id))
    //         {
    //             if (creep.attack(Game.getObjectById(invader_core_id)) != OK)
    //             {
    //                 creep.moveTo(Game.getObjectById(invader_core_id))
    //             }
    //         }
    //     }
    // }

    // // 拉扯 MrJakob64
    // Game.rooms['W12N13'].addSpawnTask(5, {name: "tmp_attack" + Game.time, bodyParts: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL],memory: {role: 'tmp_attack',}})
    // [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]
    // if (creep.getActiveBodyparts(HEAL) != 0){
    //     // if (creep.body[creep.body.length-1].boost == undefined){
    //     //     let lab_xlho2: StructureLab = Game.getObjectById('6256e8527e57d682008f93a4')
    //     //     if (!creep.pos.isNearTo(lab_xlho2)){
    //     //         creep.moveTo(lab_xlho2)
    //     //         return
    //     //     }
    //     //     else{
    //     //         lab_xlho2.boostCreep(creep)
    //     //         return
    //     //     }
    //     // }
    //     // creep.heal(creep)
    //     // if (creep.room.name != 'W12N12'){
    //     //     creep.moveTo(new RoomPosition(25, 25, 'W12N12'))
    //     // }
    //     // else{
    //     //     if (creep.pos.x < 2 || creep.pos.x > 47 || creep.pos.y < 2 || creep.pos.y > 47){
    //     //         creep.moveTo(new RoomPosition(25, 25, 'W12N12'))
    //     //         return
    //     //     }
    //     //     // 禁止踏入该区域 x < 34 && y > 21
    //     //     if (creep.pos.x == 33){
    //     //         creep.move(BOTTOM_RIGHT)
    //     //     }
    //     //     else if (creep.pos.y == 21){
    //     //         creep.move(RIGHT)
    //     //     }
    //     //     else{
    //     //         let link: StructureLink = Game.getObjectById('623c845931a34425f943e035')
    //     //         if (link){
    //     //             if (!creep.pos.isNearTo(link)){
    //     //                 creep.moveTo(link)
    //     //             }
    //     //             else{
    //     //                 let creep1: Creep = Game.getObjectById('625fa7910c3de0f47a19ccba')
    //     //                 if (creep1)
    //     //                     if (creep.rangedAttack(creep1) == OK)
    //     //                         creep.rangedMassAttack()
    //     //                 else
    //     //                     creep.rangedMassAttack()
    //     //             }
    //     //         }
    //     //     }
    //     // }

    //     // let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //     let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: s => s.structureType != STRUCTURE_STORAGE && s.structureType != STRUCTURE_ROAD&& s.structureType != STRUCTURE_CONTAINER})
    //     if (target)
    //         if (!creep.pos.isNearTo(target)) creep.moveTo(target)
    //     creep.rangedMassAttack()
    // }
    // else if (creep.getActiveBodyparts(ATTACK) != 0){
    //     // if (Game.flags.tmp_attack){
    //     //     if (!creep.pos.isNearTo(Game.flags.tmp_attack)){
    //     //         creep.moveTo(Game.flags.tmp_attack)
    //     //         return
    //     //     }
    //     // }
    //     // let link1: StructureLink = Game.getObjectById('625fb4ddae1c7464a7296f2e')
    //     // if (link1)
    //     //     if (creep.attack(link1) == OK)
    //     //         return
    //     // if (creep.room.name != 'W12N12'){
    //     //     creep.moveTo(new RoomPosition(25, 25, 'W12N12'))
    //     // }
    //     // else{
    //     //     if (creep.pos.x < 3 || creep.pos.x > 47 || creep.pos.y < 3 || creep.pos.y > 47) {
    //     //         creep.moveTo(new RoomPosition(25, 25, 'W12N12'))
    //     //         return
    //     //     }
    //     //     // let creep2: Creep = Game.getObjectById('625fb4ddae1c7464a7296f2e')
    //     //     // if (creep2)
    //     //     //     if (!creep.pos.isNearTo(creep2)){
    //     //     //         creep.moveTo(creep2)
    //     //     //     }
    //     //     //     else{
    //     //     //         creep.attack(creep2)
    //     //     //     }
    //     //     // let tower1: StructureTower = Game.getObjectById('62299f08475f3e52df4c46ae')
    //     //     // let tower2: StructureTower = Game.getObjectById('6234f9474cc76831ab4b9348')
    //     //     // if (tower1 && tower2)
    //     //     //     if (tower1.store.getUsedCapacity(RESOURCE_ENERGY) > 0 && tower2.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
    //     //     //         ;
    //     //     //     }
    //     //     //     else{
    //     //     //         if (tower1)
    //     //     //             if (!creep.pos.isNearTo(tower1)) creep.moveTo(tower1)
    //     //     //             else creep.attack(tower1)
    //     //     //         else if (tower2)
    //     //     //             if (!creep.pos.isNearTo(tower2)) creep.moveTo(tower2)
    //     //     //             else creep.attack(tower2)
    //     //     //     }
    //     //     // if (tower2)
    //     //     //     if (tower2.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
    //     //     //         ;
    //     //     //     }
    //     //     //     else{
    //     //     //         if (!creep.pos.isNearTo(tower2)) creep.moveTo(tower2)
    //     //     //         else creep.attack(tower2)
    //     //     //     }

    //     //     // let tower1: StructureTower = Game.getObjectById('623c845931a34425f943e035')
    //     //     // let res = creep.room.find(FIND_STRUCTURES, {filter: s => s.pos.x > 24 && s.pos.y > 29 && s.structureType != STRUCTURE_ROAD && s.structureType != STRUCTURE_CONTAINER})
    //     //     // let tower1 = res[0]

    //     //     // let tower1: StructureTower = Game.getObjectById('622779eb8de18e2d9324cf66')
    //     //     // if (tower1)
    //     //     //     if (!creep.pos.isNearTo(tower1)) creep.moveTo(tower1)
    //     //     //     else creep.attack(tower1)

    //     //     let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //     //     if (target){
    //     //         creep.attack(target)
    //     //     }
    //     // }

    //     // let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    //     let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: s => s.structureType != STRUCTURE_STORAGE && s.structureType != STRUCTURE_ROAD&& s.structureType != STRUCTURE_CONTAINER})
    //     if (target){
    //         if (!creep.pos.isNearTo(target)) creep.moveTo(target)
    //         else
    //         creep.attack(target)
    //     }
    // }

    // if (Game.flags.tmp_attack){
    //     if (!creep.pos.isNearTo(Game.flags.tmp_attack)){
    //         creep.moveTo(Game.flags.tmp_attack)
    //         return
    //     }
    //     creep.suicide()
    // }

//     let midwallid = '60b3eaa7f5d18ab1e5618094'
    
//     creep.heal(creep)
//     if (creep.room.name == 'W9N11'){
//         creep.moveTo(new RoomPosition(25, 25, 'W8N11'))
//         return
//     }
//     else if (creep.room.name == 'W8N11'){
//         if (creep.pos.x == 0){
//             creep.move(RIGHT)
//             return
//         }
//         else{
//             let target: StructureWall = Game.getObjectById(midwallid as Id<StructureWall>)
//             if (target != undefined){
//                 if (!creep.pos.isNearTo(target)) creep.moveTo(target)
//                 else creep.rangedMassAttack()
//                 return
//             }
//             else{
//                 creep.moveTo(new RoomPosition(49, 43, 'W8N11'))
//             }
//         }
//     }
//     else if (creep.room.name == 'W7N11'){
//         if (creep.pos.x == 0){
//             creep.move(RIGHT)
//             return
//         }
//         else{
//             let target: StructureWall = Game.getObjectById<StructureWall>(midwallid as Id<StructureWall>)
//             if (target != undefined){
//                 if (!creep.pos.isNearTo(target)) creep.moveTo(target)
//                 else creep.rangedMassAttack()
//                 return
//             }
//             else{
//                 creep.moveTo(new RoomPosition(49, 43, 'W8N11'))
//             }
//         }
//     }
// }

// Game.getObjectById('6231bded6a2b149d8da6247f').observeRoom('W7N11')
// Game.rooms.W9N11.find(FIND_STRUCTURES, {filter: s => s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL})
// new RoomVisual('W9N11').text("100M", 25, 42, {color: 'red', font: 0.5})

// Game.getObjectById('6231bded6a2b149d8da6247f').observeRoom('W7N11')
// Game.rooms.W7N11.find(FIND_STRUCTURES, {filter: s => (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)}).forEach(element => {
//     new RoomVisual('W7N11').text(element.hits > 1000000 ? String(Math.floor(element.hits/1000000)) + 'M': element.hits > 1000 ? String(Math.floor(element.hits/1000)) + 'K': String(Math.floor(element.hits)), element.pos.x, element.pos.y, {color: 'red', font: 0.3})
// });

// Game.getObjectById('6231bded6a2b149d8da6247f').observeRoom('W11N11')
// Game.rooms.W11N11.find(FIND_STRUCTURES, {filter: s => (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)}).forEach(element => {
//     new RoomVisual('W11N11').text(element.hits > 1000000 ? String(Math.floor(element.hits/1000000)) + 'M': element.hits > 1000 ? String(Math.floor(element.hits/1000)) + 'K': String(Math.floor(element.hits)), element.pos.x, element.pos.y, {color: 'red', font: 0.3})
// });

// Game.rooms.W7N11.find(FIND_STRUCTURES, {filter: s => (s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL)}).forEach(element => {
//     new RoomVisual('W7N11').text(element.hits > 1000000 ? String(Math.floor(element.hits/1000000)) + 'M': element.hits > 1000 ? String(Math.floor(element.hits/1000)) + 'K': String(Math.floor(element.hits)), element.pos.x, element.pos.y, {color: 'red', font: 0.3})
// });

// Game.creeps.forEach(creep => creep.moveTo(new RoomPosition(11, 35, 'W10N10')));

// for (creep in Game.creeps){
//     if (creep.memory == undefined){
//         console.log(creep.pos, creep.id, creep.name)
//         // if (Game.getObjectById(creep.id).pos.isNearTo(Game.rooms.W9N11.storage)){
//         //     creep.transfer(Game.rooms.W9N11.storage, RESOURCE_ENERGY, RESOURCE_CONDENSATE)
//         // }
//         // else{
//         //     creep.goTo(Game.rooms.W9N11.storage)
//         // }
//     }
// }
// for (creep in Game.creeps){
//     if (creep.memory == undefined){
//         creep.moveTo(Game.rooms.W9N11.storage)
//     }
// }

// Astro_angelfish