import * as $ from "../../modules/超级移动优化"

export const doctor_work = function(creep: Creep, roomName: string){

    if (creep.room.name == roomName){
        creep.moveTo(new RoomPosition(5, 30, roomName))
        var harders = _.filter(Game.creeps, (creep) => creep.memory.role == 'harder');
        if (creep.heal(harders[0]) != OK){
            var code: number = creep.heal(harders[0])
            if (code != -4 && code != -9 && code != 7){
                console.log('doctor' + creep.heal(harders[0]))
            }
        }
    }
    else{
        ;
    }
}