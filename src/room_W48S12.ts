export const room_W48S12_running = function(roomName: string){
    let spawn_name = 'Spawn2'
    let home: Room = Game.rooms[roomName]
    let upgradersNum: number = 4;
    
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (Game.spawns[spawn_name].spawning){
        let spawningCreep = Game.creeps[Game.spawns[spawn_name].spawning.name];
        Game.spawns[spawn_name].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[spawn_name].pos.x + 1, 
            Game.spawns[spawn_name].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    else if (upgraders.length < upgradersNum){
        let newName = 'Upgrader' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader', source_idx: 0}});
    }
    else if (harvesters.length < upgradersNum){
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester', source_idx: 0}});
    }
}