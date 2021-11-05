import { print_err_info } from "./utils"

export const go_to_harvest = function(creep: Creep, source: Source, pos?: RoomPosition){
    if (creep.pos.isNearTo(source)){
        if (!creep.memory.dontPullMe){
            creep.memory.dontPullMe = true
        }
        let code: CreepActionReturnCode | ERR_NOT_FOUND | ERR_NOT_ENOUGH_RESOURCES = creep.harvest(source)
        if (code == ERR_NO_BODYPART){
            creep.suicide()
        }
        else if (code == ERR_NOT_ENOUGH_ENERGY){
            return code
        }
        else if (code != OK && code != ERR_BUSY && code != ERR_NOT_OWNER){
            // ERR_BUSY: spawning
            // ERR_NOT_ENOUGH_ENERGY
            // ERR_NOT_OWNER: controller is reserved by other player of Invader
            console.log(Game.time, global.harvest_err_code.get(code))
            print_err_info()
        }
    }
    else{
        if (!pos){
            creep.moveTo(source)
        }
        else{
            creep.moveTo(pos)
        }
    }
}
