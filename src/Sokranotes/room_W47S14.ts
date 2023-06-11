import { room_energy_mine } from "@/Sokranotes/room_base/room_energy_mine"
import { tower_work } from "@/Universal/room_base/level3/tower";
import { check_one_role, clear_spawn_queue } from "@/Universal/room_base/universal_logic/check_spawn_queue";
import { source_energy_mine } from "@/Universal/room_base/universal_logic/source_energy_mine";

// const body_list: BodyPartConstant[][]= [
//     [WORK, WORK, CARRY, MOVE], // 300
//     [WORK, WORK, CARRY, MOVE, MOVE], // 350
//     [WORK, WORK, CARRY, MOVE, MOVE, MOVE], //400
//     [WORK, WORK, WORK, CARRY, MOVE, MOVE], //450
//     [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], //500
//     [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE], //550
//     [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], //600
//     [WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], //650
//     [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], // 700
//     [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], //750 
//     [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], // 800
// ];

export const room_W47S14_running = function(roomName: string){
    let room: Room = Game.rooms[roomName]
    tower_work(roomName)

    if (room.memory.spawning == undefined && (room.memory.check_spawn_queue_flag || 
        (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName))){
        if (Memory.rooms[roomName].check_spawn_queue_flag){
            delete Memory.rooms[roomName].check_spawn_queue_flag
        }
        if (Game.flags.check_spawn_queue_flag && Game.flags.check_spawn_queue_flag.room.name == roomName){
            Game.flags.check_spawn_queue_flag.remove()
        }
        let room = Game.rooms[roomName]
        clear_spawn_queue(roomName)

        // if (Game.rooms['W47S14'].controller.ticksToDowngrade < 150000)
        check_one_role(room, 'upgrader_link')
        check_one_role(room, 'builder')
        check_one_role(room, 'repairer')
        check_one_role(room, 'carrier_W47S14')
        check_one_role(room, 'base_transfer')
        check_one_role(room, 'tower_transfer')

        if (Game.rooms['W47S14'].storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0.5*Game.rooms['W47S14'].storage.store.getCapacity(RESOURCE_ENERGY)){
            if (Game.rooms['W41S6'].terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 0.6*Game.rooms['W41S6'].terminal.store.getCapacity(RESOURCE_ENERGY)){
                Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 100000, 'W41S6', 'free')
            }
            if (Game.rooms['W48S12'].terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 0.6*Game.rooms['W48S12'].terminal.store.getCapacity(RESOURCE_ENERGY)){
                Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 100000, 'W48S12', 'free')
            }
        }
    }
    // if (Game.time % 1000 == 999){
    //     let Ob: StructureObserver = Game.getObjectById("617ab31dd8dc485dfd4310d7")
    //     Ob.observeRoom("W41S11")
    // }
    // if (Game.time % 1000 == 0){
    //     let _6g3y: Room = Game.rooms['W41S11']
    //     if (_6g3y.storage.store.energy < 210000){
    //         let capacity: number = _6g3y.terminal.store.getFreeCapacity()
    //         let has_energy: number
    //         let send_energy: number
    //         if (Game.rooms["W41S11"].storage.store.energy >= 250000){
    //             has_energy = Game.rooms["W41S11"].terminal.store.energy
    //             send_energy = capacity <= has_energy ? capacity : has_energy
    //             if (send_energy > 100000) send_energy = 100000
    //         }
    //         else if (Game.rooms["W47S14"].storage.store.energy >= 250000){
    //             has_energy = Game.rooms["W47S14"].terminal.store.energy
    //             send_energy = capacity <= has_energy ? capacity : has_energy
    //             if (send_energy > 100000) send_energy = 100000
    //         }
    //         else if (Game.rooms["W48S12"].storage.store.energy >= 250000){
    //             has_energy = Game.rooms["W48S12"].terminal.store.energy
    //             send_energy = capacity <= has_energy ? capacity : has_energy
    //             if (send_energy > 100000) send_energy = 100000
    //         }
    //     }
    // }

    if (Game.time % 135 > 125){
        if (room.terminal.store.getFreeCapacity() < 5000 && room.storage.store.getFreeCapacity(RESOURCE_ENERGY) < 5000){
            let s: StructureStorage = Game.getObjectById('6185354e103ba6667086b991' as Id<StructureStorage>)
            if (s.store.getUsedCapacity(RESOURCE_ENERGY) < 0.5*s.store.getCapacity(RESOURCE_ENERGY)){
                Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 50000, 'W48S12', 'free')
            }
            else{
                switch ((Game.time/10000)%5){
                    case 0:
                        Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 50000, 'E39S51', 'free')
                        console.log(Game.time, 'send', 'E39S51', '20000')
                    case 1:
                    case 2:
                        Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 50000, 'W41S11', 'free')
                        console.log(Game.time, 'send', 'W41S11', '20000')
                        break
                    case 3:
                    case 4:
                        Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 100000, 'W39S23', 'free')
                        console.log(Game.time, 'send', 'W39S23', '20000')
                        break
                    // default:
                    //     Game.rooms['W47S14'].terminal.send(RESOURCE_ENERGY, 50000, 'W48S12', 'free')
                }
            }
        }
    }

    let source1_link: StructureLink = Game.getObjectById('615d6e761b8f40360c7387dd' as Id<StructureLink>)
    let source2_link: StructureLink = Game.getObjectById('61450b41047f4458ae00790f' as Id<StructureLink>)
    let dest_link: StructureLink = Game.getObjectById('6159d59ae59fcf2038ecf56c' as Id<StructureLink>)
    let upgrade_link: StructureLink = Game.getObjectById('615a13005237858c5056f75f' as Id<StructureLink>)
    if (source1_link.store.getUsedCapacity(RESOURCE_ENERGY) == 800){
        source1_link.transferEnergy(dest_link)
    }
    if (source2_link.store.getUsedCapacity(RESOURCE_ENERGY) == 800){
        source2_link.transferEnergy(dest_link)
    }
    if (dest_link.store.getUsedCapacity(RESOURCE_ENERGY) > 600 && upgrade_link.store.getUsedCapacity(RESOURCE_ENERGY) < 100){
        dest_link.transferEnergy(upgrade_link)
    }

    let source_link0: StructureLink = Game.getObjectById('61b71e864eb930d5d56d313c' as Id<StructureLink>)
    let source_link1: StructureLink = Game.getObjectById('61b721afb715dd95dcccacdb' as Id<StructureLink>)
    if (source_link0.store.getUsedCapacity(RESOURCE_ENERGY) == 800){
        source_link0.transferEnergy(dest_link)
    }
    if (source_link1.store.getUsedCapacity(RESOURCE_ENERGY) == 800){
        source_link1.transferEnergy(dest_link)
    }
    if (source_link1.store.getUsedCapacity(RESOURCE_ENERGY) > 600 && upgrade_link.store.getUsedCapacity(RESOURCE_ENERGY) < 100){
        source_link1.transferEnergy(upgrade_link)
    }

    if (Game.time % 100 == 2) source_energy_mine(roomName)
    
    // let transfer_num: number[] = [0, 0]
    // let harvester_num: number[] = [1, 1]
    // let link_harvester_pos_xs: number[] = [6, 12]
    // let link_harvester_pos_ys: number[] = [12, 28]
    // room_energy_mine(roomName, roomName, 'Spawn1', harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys)

    // switch (room.controller.level){
    //     // case 0:
    //     //     // claimController即可升级, road 5个container
    //     //     // 预留，已经是自己的房间不会进入到这个逻辑
    //     //     break
    //     case 1:
    //         // 升级
    //         // 1能量升1 controller
    //         // 1能量升Downgrade 100, 多余不返还

    //         // 200能量到2级, energy capacity max 300
    //         break
    //     case 2:
    //         // 45,000能量到3级 5个extension Rampart, Wall, energy capacity max 550
    //         // 建造extension, 给Spawn套上Rampart, 升级
    //         break
    //     case 3:
    //         // 135,000到4级 10个extension, energy capacity max 800
    //         // 建造extension, Tower, 升级
    //         break
    //     case 4:
    //         // 405,000到5级 20个extension Storage, energy capacity max 1300
    //         // 建造extension, 建造Storage, 升级
    //         break
    //     case 5:
    //         // 1,215,000到6级  30个extension, energy capacity max 1800
    //         // 建造extension, 建造Tower, 建造link, 升级
    //         break
    //     case 6:
    //         break
    // }
}