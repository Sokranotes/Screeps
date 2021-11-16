import {clear_spawn_queue, get_role_workers, check_one_role} from './../universal_logic/check_spawn_queue'
import {room_config} from './../config'

export const level1_check_spawn_queue = function(roomName: string){
    let hu_priority: number = 10
    let huNum: number = 3
    let hu_source_idx: number = 1
    let hu_ticksToLive: number = 150
    if (room_config[roomName] != undefined){
        hu_priority = room_config[roomName]['hu_priority']
        huNum = room_config[roomName]['huNum']
        hu_source_idx = room_config[roomName]['hu_source_idx']
        hu_ticksToLive = room_config[roomName]['hu_ticksToLive']
    }

    clear_spawn_queue(roomName)
    let harvest_upgrade_workers = get_role_workers('hu', roomName, hu_ticksToLive)
    check_one_role(Game.rooms[roomName], 'hu', hu_priority, hu_source_idx, huNum, harvest_upgrade_workers.length)
}