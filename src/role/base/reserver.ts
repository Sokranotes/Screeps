import * as $ from "./../../超级移动优化"

export const reserver_work = function(creep: Creep, roomName: string){
    creep.say('🔄 Here');
    // console.log("测试")
    // console.log(creep.pos.x != 22 || creep.pos.y != 27 || creep.room.name != "W48S14")
    // if (creep.room.name == roomName){
    //     creep.moveTo(new RoomPosition(0, 31, 'W47S14'), {visualizePathStyle: {stroke: '#00ff0e'}})
    // }
    // else{
    //     creep.moveTo(new RoomPosition(45, 29, 'W48S14'), {visualizePathStyle: {stroke: '#00ff0e'}})
    // }
    if (creep.pos.x != 15 || creep.pos.y != 13 || creep.room.name != "W48S14")
    {
        creep.moveTo(new RoomPosition(15, 13, 'W48S14'), {visualizePathStyle: {stroke: '#00ff0e'}})
    }
    else{
        var controller: StructureController = Game.getObjectById("5bbcaa729099fc012e631609")
        console.log('status:', creep.reserveController(controller))
        creep.signController(controller, '喵呜')
    }
}