/* 
dependency: 超级移动优化
*/

import { errorMapper } from './../../../modules/errorMapper'

global.harvest_err_code = new Map([
    [0, 'OK'],
    [-1, 'ERR_NOT_OWNER'],
    [-4, 'ERR_BUSY'],
    [-5, 'ERR_NOT_FOUND'],
    [-6, 'ERR_NOT_ENOUGH_RESOURCES'],
    [-7, 'ERR_INVALID_TARGET'],
    [-9, 'ERR_NOT_IN_RANGE'],
    [-11, 'ERR_TIRED'],
    [-12, 'ERR_NO_BODYPART']
])

export const print_err_info = errorMapper(() => {
    let e = new Error()
    throw e
})

export const go_to_harvest = function(creep: Creep, source: Source, pos?: RoomPosition){
    if (creep.pos.isNearTo(source)){
        if (!creep.memory.dontPullMe){
            creep.memory.dontPullMe = true
        }
        let code: CreepActionReturnCode | ERR_NOT_FOUND | ERR_NOT_ENOUGH_RESOURCES = creep.harvest(source)
        if (code == ERR_NO_BODYPART){
            creep.suicide()
        }
        else if (code != OK && code != ERR_BUSY && code != ERR_NOT_ENOUGH_ENERGY){
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
