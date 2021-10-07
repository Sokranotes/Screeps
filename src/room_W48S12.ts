export const room_W48S12_running = function(roomName: string){
    let spawn_name = 'Spawn2'
    // let home: Room = Game.rooms[roomName]
    let upgradersNum: number = 4;
    let buildersNum: number = 2;
    if (Game.rooms['W48S12'].find(FIND_CONSTRUCTION_SITES).length == 0){
        buildersNum = 0
    }
    let repairersNum: number = 1;
    
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    let harvester0s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.source_idx == 0);
    let harvester1s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.source_idx == 1);
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
    else if (harvester0s.length < upgradersNum){
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester', source_idx: 0}});
    }
    else if (harvester1s.length < upgradersNum){
        let newName = 'Harvester' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester', source_idx: 1}});
    }
    else if (builders.length < buildersNum){
        let newName = 'Builder' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'builder', source_idx: 1}});
    }
    else if (repairers.length < repairersNum){
        let newName = 'Repairer' + Game.time;
        Game.spawns[spawn_name].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {memory: {role: 'harvester', source_idx: 1}});
    }
}