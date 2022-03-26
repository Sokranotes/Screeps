import { check_one_role, clear_spawn_queue, get_role_workers } from '../universal_logic/check_spawn_queue'
import {room_config} from './../config'

export const level3_check_spawn_queue = function(roomName: string){
    let room = Game.rooms[roomName]
    clear_spawn_queue(roomName)

    check_one_role(room, 'hf')
    check_one_role(room, 'hu')
    check_one_role(room, 'hb')
    check_one_role(room, 'hr')
    check_one_role(room, 'builder')
    check_one_role(room, 'repairer')
    check_one_role(room, 'base_transfer')
    check_one_role(room, 'hus')
    check_one_role(room, 'upgrader_link')
}