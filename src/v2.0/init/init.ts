import { AppLifecycleCallbacks } from "../HoHoFramework/types";

export const globalInit = function (): void{
    // 初始化
    if (Memory.rooms == undefined){
        Memory.rooms = {}
    }

    // 白名单及好友房间
    global.white_list = new Set(['scp002', 'Mr-tang']);
    global.group_friends = new Set(['6g3y', 'mikumikumiku', 'scp002', 'MiHack', 'Nemophilist'])
    global.group_friends_rooms = new Set(['W49S15', 'W49S17', 'W49S19', 'W48S18', 'W47S19', 'W41S41', 'W39S23', 'W39S35', 'W38S28', 'W31S39', 'W42S43', 'W46S11', 'W44S2', 'W42S2', 'W39S8', 'W14N12', 'W12N15', 'W12N13', 'W11N19', 'E29N3', 'W41S11', 'W19N21', 'W9N51', 'W9S49', 'E19N19', 'E19N11', 'E29S21', 'E29S29'])

    // storage terminal能量策略
    global.terminal_energy_bottom_limit = 50000 // terminal中最低能量，少于该值且storage中更多时，能量往里放
    global.terminal_energy_top_limit = 150000 // terminal中最高能量
    global.terminal_energy_bottom_free_limit = 50000 // free capacity 大于该值往terminal中放能量
    global.terminal_energy_top_free_limit = 30000 // free capacity小于该值从terminal中取出能量
    global.storage_energy_bottom_limit = 50000 // storage中最低能量限制

    // storage及terminal的能量超过下列限制时，开始卖能量
    global.storage_limit = global.terminal_energy_top_limit + global.storage_energy_bottom_limit // 保证能量卖光了之后，storage中能量数量不少于最低能量限制
    global.terminal_limit = 80000 // terminal中能量达到这个数开始卖，最多卖卖光，即global.terminal_energy_top_limit
    global.sell_price = 0
}

export const check = function (): void{

}

export const bornInit = function (): void {
    globalInit() // 全局初始化

    check()      // 扫描全局状态

    console.log(Game.time, 'new push')
}

export const tickStartInit = function (): void {
    
}

export const init: AppLifecycleCallbacks = {
    born: bornInit,
    tickStart: tickStartInit
}