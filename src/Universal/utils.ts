export const CalculateEnergy = function(bodyParts:BodyPartConstant[]):number{
    var num = 0
    for (var part of bodyParts)
    {
        if (part == WORK) num += 100
        if (part == MOVE) num += 50
        if (part == CARRY) num += 50
        if (part == ATTACK) num += 80
        if (part == RANGED_ATTACK) num += 150
        if (part == HEAL) num += 250
        if (part == CLAIM) num += 600
        if (part == TOUGH) num += 10
    }
    return num
}

export const showControllerInfo = {
    run: function(){
        for (let idx in Game.rooms){
            let room = Game.rooms[idx]
            if (room.controller != undefined){
                if (room.controller.my){
                    if (room.controller.level == 8){
                        console.log(idx, ' level:', room.controller.level, ' ticksToDowngrade:', room.controller.ticksToDowngrade)
                    }
                    else
                        console.log(idx, ' level:', room.controller.level, ' ticksToDowngrade:', room.controller.ticksToDowngrade, ' rate:', (room.controller.progress/room.controller.progressTotal).toFixed(4), ' need:', room.controller.progressTotal - room.controller.progress)
                }
            }
        }
    }
}