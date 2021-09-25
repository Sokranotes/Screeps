// 引入外部依赖
import { errorMapper } from './modules/errorMapper'
import { room_base_running } from './room_base/room_base_running';

var roomName: string = 'W47S14'

export const loop = errorMapper(() => {

    // 清楚死亡的creep的内存，对于一些未完成的操作也可以在此时检查
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }

    room_base_running(roomName)
    // room_energy_mine("W47S15", spawnName)

    // 控制creep的生成
    // spawn_work(roomName)

    // for (var room_name in Game.rooms){
    //     if (Game.rooms[room_name].controller.my){
    //         room_base_running(roomName)
    //     }
    // }
    // if (Game.rooms["W48S14"] != undefined){
    //     var closestHostile1 = Game.rooms["W48S14"].find(FIND_HOSTILE_CREEPS);
    //     if(closestHostile1.length > 0) {
    //         for (var i: number = 0; i < closestHostile1.length; i++){
    //             console.log(Game.time + ' 发现敌军 ' + closestHostile1[0].pos.x + " " + closestHostile1[0].pos.y + closestHostile1[0].owner)
    //         }
    //     }
    // }

    // 不同role的creep工作
    // for(var name in Game.creeps) {
    //     var creep = Game.creeps[name];
    //     if (creep.memory.role == 'soldier'){
    //         soldier_work(creep, roomName);
    //     }
    //     if (creep.memory.role == 'carrier'){
    //         carrier_work(creep, roomName)
    //     }
    //     if (creep.memory.role == 'reserver'){
    //         reserver_work(creep, roomName)
    //     }
    //     if(creep.memory.role == 'harvester') {
    //         harvester_work(creep, roomName);
    //     }
    //     if (creep.memory.role == 'outharvester'){
    //         outharvester_work(creep, roomName);
    //     }
    //     if (creep.memory.role == 'transfer'){
    //         transfer_work(creep, roomName);
    //     }
    //     if (creep.memory.role == 'outharvester1'){
    //         outharvester1_work(creep, roomName);
    //     }
    //     if (creep.memory.role == 'transfer1'){
    //         transfer1_work(creep, roomName);
    //     }
    //     if(creep.memory.role == 'upgrader') {
    //         upgrader_work(creep, roomName);
    //     }
    //     if(creep.memory.role == 'builder') {
    //         builder_work(creep, roomName);
    //     }
    //     if(creep.memory.role == 'repairer') {
    //         repairer_work(creep, roomName);
    //     }
    //     if (creep.memory.role == 'cleaner'){
    //         cleaner_work(creep, roomName)
    //     }
    //     if (creep.memory.role == 'base_transfer'){
    //         base_transfer_work(creep, roomName)
    //     }
    //     // if (creep.memory.role == 'harder'){
    //     //     harder_work(creep, roomName)
    //     // }
    //     // if (creep.memory.role == 'doctor'){
    //     //     doctor_work(creep, roomName)
    //     // }
    //     // if (creep.memory.role == 'miner'){
    //     //     miner_work(creep, roomName)
    //     // }
    // }
})