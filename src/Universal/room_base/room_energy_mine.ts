import { room_config } from "./config"

const room_energy_mine_init = function(roomName: string){
    /*   
    如果没开启自动挖矿, 则进行初始化操作
    初始化的值有:
    初始化之后永不变化
    room.memory.sources_id
    初始化之后只能手动变化
    room.memory.auto_energy_mine

    需要从配置中读取
    room.memory.source_harvester_num
    room.memory.source_transfer_num若link_harvester_pos_ys
    常规流程中每一次都需要更新（若干t更新一次）
    room.memory.source_harvester_states
    room.memory.source_transfer_states
    container相关状态量, 需要检查是否有变更并及时修改
    room.memory.container_ids
    room.memory.source_container_ids
    */
    let sources_num: number
    let containers_num: number
    let links_num: number
    let room = Game.rooms[roomName]
    if (room.memory.auto_energy_mine != true || Game.flags.check_energy_mine || room.memory.check_energy_mine == true){
        let source: Source
        let sources: Source[]
        let container: StructureContainer
        let containers: StructureContainer[]
        let link: StructureLink
        let links: StructureLink[]

        // 如果没有存source_ids, 找到该房间所有能量source并存id
        if (room.memory.sources_id == undefined){
            sources = room.find(FIND_SOURCES)
            sources_num = sources.length
            room.memory.sources_id = new Array(sources_num)
            for (let i: number = 0; i < sources_num; i++){
                room.memory.sources_id[i] = sources[i].id
            }
        }
        else{
            sources_num = room.memory.sources_id.length
        }

        // source对应的link id
        room.memory.source_link_ids = new Array(sources_num)

        // 找到该房间所有link并存id
        links = room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });
        links_num = links.length

        // 遍历所有source 找到source旁边的link, 初始化source_link_ids
        let count: number = 0
        for (let i: number = 0; i < sources_num; i++){
            source = Game.getObjectById(room.memory.sources_id[i])
            // 遍历所有link
            for (let j: number = 0; j < links_num; j++){
                link = Game.getObjectById(links[j].id)
                if (link){
                    // judge source是否有link, 只考虑source周围2距离的格子中最先扫描到的那一个
                    if ((link.pos.x - source.pos.x) >= -2 && (link.pos.x - source.pos.x) <= 2 && 
                    (link.pos.y - source.pos.y) >= -2 && (link.pos.y - source.pos.y) <= 2){
                        room.memory.source_link_ids[i] = link.id
                        count++
                        break
                    }
                }
            }
        }
        if (count != sources_num){
            // source对应的container id
            room.memory.source_container_ids = new Array(sources_num)

            // 初始化, 找到该房间所有container并存id
            containers = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });
            containers_num = containers.length

            // 遍历所有source 找到source旁边的container, 初始化source_container_ids
            for (let i: number = 0; i < sources_num; i++){
                if (room.memory.source_link_ids[i] == undefined){
                    source = Game.getObjectById(room.memory.sources_id[i])
                    // 遍历所有container
                    for (let j: number = 0; j < containers_num; j++){
                        container = Game.getObjectById(containers[j].id)
                        if (container){
                            // judge source是否有container, 只考虑source周围8个格子中最先扫描到的那一个
                            if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 && 
                            (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1){
                                room.memory.source_container_ids[i] = container.id
                                break
                            }
                        }
                    }
                }
            }
        }

        room.memory.auto_energy_mine = true
    }
} // 初始化结束

const room_energy_mine_routine = function(roomName: string, link_harvester_pos_xs: number[], link_harvester_pos_ys: number[]){
    let room: Room = Game.rooms[roomName]
    // room空值检查
    if (room == undefined){
        console.log(Game.time, "room_energy_mine_routine", ' room:', roomName, ' undefined')
        return
    }
    let source: Source
    let sources_num: number
    let container: StructureContainer
    let link: StructureLink

    let energyCapacity: number = room.energyCapacityAvailable
    sources_num = room.memory.sources_id.length

    // 读取creep个数配置并更新creep个数状态
    for (let i: number = 0; i < sources_num; i++){
        if (room.memory.source_link_ids[i] != undefined){
            let energy_harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'hl') 
                && creep.memory.source_idx == i && creep.room.name == roomName && creep.ticksToLive >= 100);
            for (let j: number = energy_harvesters.length; j < 1; j++){
                let bodyParts: BodyPartConstant[]
                if (energyCapacity >= 2550) bodyParts = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY]
                else if (energyCapacity >= 1950) bodyParts = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY]
                else if (energyCapacity >= 1300) bodyParts = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY]
                else if (energyCapacity >= 700) bodyParts = [MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY]
                let priority = room_config['priority']['hl']
                let data: spawnData = {
                    name: 'hl',
                    bodyParts: bodyParts,
                    memory: {
                        role: 'hl',
                        source_idx: i,
                    }
                }
                room.addSpawnTask(priority, data)
            }
        }
        else if (room.memory.source_link_ids[i] == undefined && room.memory.source_container_ids[i] == undefined){
            let energy_harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'hc') 
                && creep.memory.source_idx == i && creep.room.name == roomName && creep.ticksToLive > 100);
            for (let j: number = energy_harvesters.length; j < 1; j++){
                let bodyParts: BodyPartConstant[]
                if (energyCapacity >= 3000) bodyParts = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
                else if (energyCapacity >= 2000) bodyParts = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
                else if (energyCapacity >= 1000) bodyParts = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
                let priority = room_config['priority']['hl']
                let data: spawnData = {
                    name: 'hl',
                    bodyParts: bodyParts,
                    memory: {
                        role: 'hl',
                        source_idx: i,
                    }
                }
                room.addSpawnTask(priority, data)
            }
            let transfers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'passive_transfer'
              && creep.memory.source_idx == i) && creep.room.name == roomName && creep.ticksToLive > 100);
            room.memory.source_transfer_states[i] = transfers.length
        }
    }

    // 为每个source生成creep
    for (let i: number = 0; i < sources_num; i++){
        // spawn需要在空闲状态
        if (!Game.spawns[spawnName].spawning){
            if (room.memory.source_harvester_states[i] < room.memory.source_harvester_num[i]){
                source = Game.getObjectById(room.memory.sources_id[i])
                if (room.memory.source_link_ids[i] == undefined || room.memory.source_link_ids[i] == null){ // 没有link
                    if (room.memory.source_container_ids[i] == undefined){ // 没有container
                        // 暂时不支持4000的source
                        if (source.energyCapacity == 3000){
                            if (room.memory.energy_mine_chain_ok){
                                if (energyCapacity >= 950){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Harvester_with_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: roomName}}) == OK){
                                            room.memory.source_harvester_states[i] += 1
                                            break
                                        }
                                }
                                else if (energyCapacity >= 500){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_with_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: roomName}}) == OK){
                                            room.memory.source_harvester_states[i] += 1
                                            break
                                        }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_with_carry' + Game.time, 
                                {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: roomName}}) == OK){
                                    room.memory.source_harvester_states[i] += 1
                                    break
                                }
                        }
                        else if (source.energyCapacity == 1500){
                            if (room.memory.energy_mine_chain_ok){
                                if (energyCapacity >= 500){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_with_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: roomName}}) == OK){
                                            room.memory.source_harvester_states[i] += 1
                                            break
                                        }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_with_carry' + Game.time, 
                                {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: roomName}}) == OK){
                                    room.memory.source_harvester_states[i] += 1
                                    break
                                }
                        }
                    }
                    else{ // 含有container
                        container = Game.getObjectById(room.memory.source_container_ids[i])
                        if (source.energyCapacity == 3000){
                            if (room.memory.energy_mine_chain_ok){
                                if (energyCapacity >= 650){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_no_carry' + Game.time, 
                                    {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                        room.memory.source_harvester_states[i] += 1
                                        break
                                    }
                                }
                                else if (energyCapacity >= 400){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE], 'Harvester_no_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                            room.memory.source_harvester_states[i] += 1
                                            break
                                        }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, MOVE], 'Harvester_no_carry' + Game.time, 
                                {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                    room.memory.source_harvester_states[i] += 1
                                    break
                                }
                        }
                        else if (source.energyCapacity == 1500){
                            if (room.memory.energy_mine_chain_ok){
                                if (energyCapacity >= 450){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_no_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                            room.memory.source_harvester_states[i] += 1
                                            break
                                        }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_no_carry' + Game.time, 
                                {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                    room.memory.source_harvester_states[i] += 1
                                    break
                                }
                        }
                    }
                }
                else{ // 含有link
                    link = Game.getObjectById(room.memory.source_link_ids[i])
                    if (link_harvester_pos_xs[i] == undefined || link_harvester_pos_ys[i] == undefined){
                        console.log(Game.time, "room_energy_mine_routine link_harvester_pos_x/ys undefined room:", roomName, 'i:', i)
                    }
                    // 暂时不支持4000的source
                    if (source.energyCapacity == 3000){
                        if (room.memory.energy_mine_chain_ok){
                            if (energyCapacity >= 950){
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Harvester_link' + Game.time, 
                                    {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: roomName, 
                                    link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                        room.memory.source_harvester_states[i] += 1
                                        break
                                    }
                            }
                            else if (energyCapacity >= 500){
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_link' + Game.time, 
                                    {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: roomName, 
                                    link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                        room.memory.source_harvester_states[i] += 1
                                        break
                                    }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_link' + Game.time, 
                            {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: roomName, 
                            link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                room.memory.source_harvester_states[i] += 1
                                break
                            }
                    }
                    else if (source.energyCapacity == 1500){
                        if (room.memory.energy_mine_chain_ok){
                            if (energyCapacity >= 500){
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_link' + Game.time, 
                                    {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: roomName, 
                                    link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                        room.memory.source_harvester_states[i] += 1
                                        break
                                    }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_link' + Game.time, 
                            {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: roomName, 
                            link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                room.memory.source_harvester_states[i] += 1
                                break
                            }
                    }
                }
            }
            // 有harvester且没有link才会生成对应的transfer
            if (room.memory.source_harvester_states[i] != 0 && room.memory.source_link_ids[i] == undefined && (room.memory.source_transfer_states[i] < room.memory.source_transfer_num[i])){
                if (room.memory.source_container_ids[i] == undefined){ // 没有container
                    if (room.memory.energy_mine_chain_ok){
                        if (energyCapacity >= 1050){
                            if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'passive_transfer' + Game.time, 
                                {memory: {role: 'passive_transfer', source_idx: i, source_roomName: roomName, dest_roomName: roomName}}) == OK){
                                    room.memory.source_transfer_states[i] += 1
                                    break
                                }
                        }
                    }
                    else if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'passive_transfer' + Game.time, {memory: {role: 'passive_transfer', source_idx: i, source_roomName: roomName, dest_roomName: roomName}}) == OK){
                        room.memory.source_transfer_states[i] += 1
                        break
                    }
                }
                else{ // 含有container
                    if (room.memory.energy_mine_chain_ok){
                        if (energyCapacity >= 600){
                            if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'active_transfer' + Game.time, 
                                {memory: {role: 'active_transfer', source_container_idx: i, source_roomName: roomName, dest_roomName: roomName}}) == OK){
                                    room.memory.source_transfer_states[i] += 1
                                    break
                                }
                        }
                    }
                    else if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'active_transfer' + Game.time, 
                        {memory: {role: 'active_transfer', source_container_idx: i, source_roomName: roomName, dest_roomName: roomName}}) == OK){
                            room.memory.source_transfer_states[i] += 1
                            break
                        }
                }
            }
        }
    }
} // 常规流程结束

export const room_energy_mine = function(roomName: string, harvester_num: number[], transfer_num: number[], 
    link_harvester_pos_xs: number[], link_harvester_pos_ys: number[]){
    /*
    自己控制的房间的能量采集逻辑
    找到能量采集点，并存储在RoomMemory中，如果有Container配合，存储对应的pos
    根据相关配置生成Creep
    */
    let room: Room = Game.rooms[roomName]
    // room空值检查
    if (room == undefined){
        console.log(Game.time, 'room_energy_mine room', roomName, ' undefined')
        return
    }
    room_energy_mine_init(roomName)
    room_energy_mine_routine(roomName, link_harvester_pos_xs, link_harvester_pos_ys)
}