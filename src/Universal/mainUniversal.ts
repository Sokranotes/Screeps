import { room_logic } from './room_logic';

if (Game.flags.Appassionata){
    console.log(Game.time, 'Appassionata new push')
}

export const mainUniversal = function(){
    let rooms = ['W16N18']
    for (let idx in rooms){
        room_logic(rooms[idx])
    }
}