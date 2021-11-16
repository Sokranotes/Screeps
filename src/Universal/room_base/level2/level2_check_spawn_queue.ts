import {clear_spawn_queue, get_role_workers, check_one_role} from './../universal_logic/check_spawn_queue'
import {room_config} from './../config'

export const level2_check_spawn_queue = function(roomName: string){
    let hf_priority: number = 0
    let hfNum: number = 3
    let hf_source_idx: number = 0
    let hf_ticksToLive: number = 200

    let hu_priority: number = 10
    let huNum: number = 5
    let hu_source_idx: number = 1
    let hu_ticksToLive: number = 150

    let hb_priority: number = 20
    let hbNum: number = 2
    let hb_source_idx: number = 0
    let hb_ticksToLive: number = 150

    let hr_priority: number = 15
    let hrNum: number = 1
    let hr_source_idx: number = 0
    let hr_ticksToLive: number = 150
    if (room_config[roomName] != undefined){
        let config = room_config[roomName]['level2']
        
        hf_priority = config['hf_priority']
        hfNum = config['hfNum']
        hf_source_idx = config['hf_source_idx']
        hf_ticksToLive = config['hf_ticksToLive']

        hu_priority = config['hu_priority']
        huNum = config['huNum']
        hu_source_idx = config['hu_source_idx']
        hu_ticksToLive = config['hu_ticksToLive']
        
        hb_priority = config['hb_priority']
        hbNum = config['hbNum']
        hb_source_idx = config['hb_source_idx']
        hb_ticksToLive = config['hb_ticksToLive']

        hr_priority = config['hb_priority']
        hrNum = config['hrNum']
        hr_source_idx = config['hr_source_idx']
        hr_ticksToLive = config['hb_ticksToLive']
    }

    let room = Game.rooms[roomName]
    clear_spawn_queue(roomName)

    let harvest_fill_workers = get_role_workers('hf', roomName, hf_ticksToLive)
    if (harvest_fill_workers.length == 0){
        global.restart_flag = true
    }
    else{
        global.restart_flag = false
    }
    let harvest_upgrade_workers = get_role_workers('hu', roomName, hu_ticksToLive)
    let harvest_build_workers: Creep[] = []
    let harvest_repair_workers: Creep[]
    if (room.find(FIND_MY_CONSTRUCTION_SITES).length == 0){
        hbNum = 0
        harvest_repair_workers = get_role_workers('hb', roomName, hr_ticksToLive, 'hr')
    }
    else{
        harvest_build_workers = get_role_workers('hb', roomName, hb_ticksToLive)
        harvest_repair_workers = get_role_workers('hr', roomName, hr_ticksToLive)
    }

    check_one_role(room, 'hf', hf_priority, hf_source_idx, hfNum, harvest_fill_workers.length)
    check_one_role(room, 'hu', hu_priority, hu_source_idx, huNum, harvest_upgrade_workers.length)
    check_one_role(room, 'hb', hb_priority, hb_source_idx, hbNum, harvest_build_workers.length)
    check_one_role(room, 'hr', hr_priority, hr_source_idx, hrNum, harvest_repair_workers.length)
}