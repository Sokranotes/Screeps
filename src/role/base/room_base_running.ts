export const room_base_running = function(roomName: string){
    var room: Room = Game.rooms[roomName]
    switch (room.controller.level){
        case 0:
            // claimController即可升级
            // 预留，已经是自己的房间不会进入到这个逻辑
            // road 5个container
            break
        case 1:
            // 200能量到2级
            // energy capacity max 300
            break
        case 2:
            // 45,000能量到3级
            // 5个extension Rampart 
            // energy capacity max 550

            // 建造extension
            break
        case 3:
            // 135,000到4级
            break
        case 4:
            break
        case 5:
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