import { level1_logic } from "./room_base/level1/level1_logic"
import { level2_logic } from "./room_base/level2/level2_logic"

export const room_logic = function(roomName){
    if (Game.rooms[roomName]){
        if (Game.rooms[roomName].controller){
            if (Game.rooms[roomName].controller.my){
                switch(Game.rooms[roomName].controller.level){
                    case 1:
                        level1_logic(roomName)
                        break
                    case 2:
                        level2_logic(roomName)
                        break
                    default:
                        console.log('controller is bigger than 2')
                        level2_logic(roomName)
                        break
                }
            }
            else{
                console.log(Game.time, 'room_logic', roomName, 'controller is not my')
            }
        }
        else{
            console.log(Game.time, 'room_logic', roomName, 'without controller')
        }
    }
    else{
        console.log(Game.time, 'room_logic', roomName, 'undefined')
    }
}