export const room_base_running = function(roomName: string){
    var room: Room = Game.rooms[roomName]
    switch (room.controller.level){
        case 0:
            // claimController即可升级, road 5个container
            // 预留，已经是自己的房间不会进入到这个逻辑
            break
        case 1:
            // 200能量到2级, energy capacity max 300
            // 升级
            break
        case 2:
            // 45,000能量到3级 5个extension Rampart, energy capacity max 550
            // 建造extension, 升级
            break
        case 3:
            // 135,000到4级 10个extension Wall, energy capacity max 800
            // 建造extension, 升级
            break
        case 4:
            // 405,000到5级 20个extension Storage, energy capacity max 1300
            // 建造extension, 建造Storage, 升级
            break
        case 5:
            // 1,215,000到6级  30个extension, energy capacity max 1800
            // 建造extension, 升级
            break
        case 6:
            break
    }

    if (room.controller.level == 1){
        // 200能量升2级
    }
    else (room.controller.level == 2){

    }
    // check status
    // energy available
    // controller level
}