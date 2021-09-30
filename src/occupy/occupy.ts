export const out_room_energy_mine = function(source_roomName: string, dest_roomName: string, spawnName: string){
    var source_room: Room = Game.rooms[source_roomName]
    var dest_room: Room = Game.rooms[dest_roomName]
    // room空值检查
    if (source_room == undefined){
        if (Game.spawns[spawnName].spawning){
            var spawningCreep = Game.creeps[Game.spawns[spawnName].spawning.name];
            Game.spawns[spawnName].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[spawnName].pos.x + 1, 
                Game.spawns[spawnName].pos.y, 
                {align: 'left', opacity: 0.8});
        }
        else{
            var scouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'out_scout' && creep.memory.dest_roomName == source_roomName);
            if (scouts.length < 1){
                var newName = 'out_Scout' + Game.time;
                Game.spawns[spawnName].spawnCreep([MOVE], newName, {memory: {role: 'out_scout', source_roomName: dest_roomName, dest_roomName: source_roomName}});
            }
        }
        // console.log(Game.time, " ", source_roomName, ' undefined', 'out_room_energy_mine')
        return
    }
}