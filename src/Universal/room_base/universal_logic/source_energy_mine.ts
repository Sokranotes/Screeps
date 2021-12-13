const source_energy_mine_init = function(roomName: string, source_idx: number){
    /* 
    如果没开启自动挖矿, 则进行初始化操作
    初始化的值有:
    是否初始化, 初始化之后只能手动变化
    room.memory.auto_energy_mine 
    初始化之后永不变化
    room.memory.sources_id*/
    
    let containers: StructureContainer[]
    let link: StructureLink
    let links: StructureLink[]


    let room = Game.rooms[roomName]
    let source: Source = Game.getObjectById(room.memory.sources_id[source_idx])

    // 初始化, 找到该房间所有container
    containers = room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER);
        }
    });

    if (room.memory.source_container_ids == undefined){
        room.memory.source_container_ids = new Array(2)
    }
    for (let container of containers){
        if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 && 
        (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1){
            room.memory.source_container_ids[source_idx] = container.id
            break
        }
    }

    // source对应的link id
    if (room.memory.source_link_ids == undefined){
        room.memory.source_link_ids = new Array(2)
    }
    // 初始化, 找到该房间所有link并存id
    links = source_room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_LINK);
        }
    });
    links_num = links.length
    source_room.memory.links_num = links_num
    source_room.memory.links_id = new Array(links_num)
    for (let i: number = 0; i < links_num; i++){
        source_room.memory.links_id[i] = links[i].id;
    }

    // 遍历所有source 找到source旁边的link, 初始化source_link_ids
    for (let i: number = 0; i < sources_num; i++){
        source = Game.getObjectById(source_room.memory.sources_id[i])
        // 遍历所有link
        for (let j: number = 0; j < links_num; j++){
            link = Game.getObjectById(source_room.memory.links_id[j])
            if (link){
                // judge source是否有link, 只考虑source周围2距离的格子中最先扫描到的那一个
                if ((link.pos.x - source.pos.x) >= -2 && (link.pos.x - source.pos.x) <= 2 && 
                (link.pos.y - source.pos.y) >= -2 && (link.pos.y - source.pos.y) <= 2){
                    source_room.memory.source_link_ids[i] = link.id
                    source_room.memory.source_costs[i] += 5000
                    break
                }
            }
        }
    }
} // 初始化结束

const room_energy_mine_routine = function(source_roomName: string, dest_roomName: string, spawnName: string, 
    harvester_num: number[], transfer_num: number[], link_harvester_pos_xs: number[], link_harvester_pos_ys: number[]){
    let source_room: Room = Game.rooms[source_roomName]
    let dest_room: Room = Game.rooms[dest_roomName]
    // room空值检查
    if (source_room == undefined){
        console.log(Game.time, "room_energy_mine_routine", ' source_room:', source_roomName, ' undefined')
        return
    }
    if (dest_room == undefined){
        console.log(Game.time, "room_energy_mine_routine", 'dest_room:', dest_roomName, 'undefined')
        return
    }
    let source: Source
    let sources_num: number
    let container: StructureContainer
    let containers: StructureContainer[]
    let containers_num: number
    let link: StructureLink
    let links: StructureLink[]
    let links_num: number

    let energyCapacity: number = dest_room.energyCapacityAvailable

    containers_num = source_room.memory.containers_num
    sources_num = source_room.memory.sources_num
    links_num = source_room.memory.links_num

    if (source_roomName == 'W48S12'){
        source_room.memory.energy_mine_chain_ok = true
    }
    else{
        source_room.memory.energy_mine_chain_ok = false
    }

    // 读取creep个数配置并更新creep个数状态
    for (let i: number = 0; i < sources_num; i++){
        source_room.memory.source_transfer_num[i] = transfer_num[i]
        source_room.memory.source_harvester_num[i] = harvester_num[i]
        if (source_room.memory.source_link_ids[i] == undefined){
            let energy_harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'energy_harvester_no_carry' 
                                                                                || creep.memory.role == 'energy_harvester_with_carry')
                                                                                && creep.memory.source_idx == i 
                                                                                && creep.memory.source_roomName == source_roomName
                                                                                && creep.ticksToLive > 100);
            source_room.memory.source_harvester_states[i] = energy_harvesters.length

            let transfers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'active_transfer' && creep.memory.source_container_idx == i)
                                                            || (creep.memory.role == 'passive_transfer'  && creep.memory.source_idx == i)
                                                                    && creep.memory.source_roomName == source_roomName
                                                                    && creep.memory.dest_roomName == dest_roomName
                                                                    && creep.ticksToLive > 100);
            source_room.memory.source_transfer_states[i] = transfers.length
            if (source_room.memory.source_harvester_states[i] >=1 && source_room.memory.source_transfer_states[i] >= 1){
                source_room.memory.energy_mine_chain_ok = true
            }
        }
        else{
            let energy_harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role == 'energy_harvester_link')
                                                                                && creep.memory.source_idx == i 
                                                                                && creep.memory.source_roomName == source_roomName
                                                                                && creep.ticksToLive > 100);
            source_room.memory.source_harvester_states[i] = energy_harvesters.length
            if (source_room.memory.source_harvester_states[i] >=1){
                source_room.memory.energy_mine_chain_ok = true
            }
        }
    }

    // 根据配置决定是否更新containers信息
    if (source_room.memory.check_containers_state == true){
        // 初始化, 找到该房间所有container并存id
        containers = source_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        containers_num = containers.length
        source_room.memory.containers_num = containers_num
        source_room.memory.containers_id = new Array(containers_num)
        for (let i: number = 0; i < containers_num; i++){
            source_room.memory.containers_id[i] = containers[i].id;
        }
        source_room.memory.check_containers_state = false
    }

    // 是否新增container或原有的对应source的container有变化
    for (let i: number = 0; i < sources_num; i++){
        source = Game.getObjectById(source_room.memory.sources_id[i])
        // source旁原来没有container现在是否新建了
        if (source_room.memory.source_container_ids[i] == undefined){
            for (let j: number = 0; j < containers_num; j++){
                container = Game.getObjectById(source_room.memory.containers_id[j])
                if (container){
                    // judge source是否有container, 只考虑source周围8个格子中最先扫描到的那一个
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 && 
                    (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1){
                        source_room.memory.source_container_ids[i] = container.id
                        source_room.memory.source_costs[i] += 5000
                        break
                    }
                }
            }
        }
        // source原有的container是否有变化
        else if (Game.getObjectById(source_room.memory.source_container_ids[i]) == undefined){
            source_room.memory.source_container_ids[i] = undefined
            for (let j: number = 0; j < containers_num; j++){
                container = Game.getObjectById(source_room.memory.containers_id[j])
                if (container){
                    if ((container.pos.x - source.pos.x) >= -1 && (container.pos.x - source.pos.x) <= 1 && 
                    (container.pos.y - source.pos.y) >= -1 && (container.pos.y - source.pos.y) <= 1){
                        source_room.memory.source_container_ids[i] = container.id
                        source_room.memory.source_costs[i] += 5000
                        break
                    }
                }
            }
        }
    }

    // 根据配置决定是否更新links信息
    if (source_room.memory.check_links_state == true){
        // 初始化, 找到该房间所有link并存id
        links = source_room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_LINK);
            }
        });
        links_num = links.length
        source_room.memory.links_num = links_num
        source_room.memory.links_id = new Array(links_num)
        for (let i: number = 0; i < links_num; i++){
            source_room.memory.links_id[i] = links[i].id;
        }
        source_room.memory.check_links_state = false
    }

    // 是否新增link或原有的对应source的link有变化
    for (let i: number = 0; i < sources_num; i++){
        source = Game.getObjectById(source_room.memory.sources_id[i])
        // source旁原来没有link现在是否新建了
        if (source_room.memory.source_link_ids[i] == undefined){
            for (let j: number = 0; j < links_num; j++){
                link = Game.getObjectById(source_room.memory.links_id[j])
                if (link){
                    // judge source是否有link, 只考虑source周围2距离的格子中最先扫描到的那一个
                    if ((link.pos.x - source.pos.x) >= -2 && (link.pos.x - source.pos.x) <= 2 && 
                    (link.pos.y - source.pos.y) >= -2 && (link.pos.y - source.pos.y) <= 2){
                        source_room.memory.source_link_ids[i] = link.id
                        source_room.memory.source_costs[i] += 5000
                        break
                    }
                }
            }
        }
        // source原有的link是否有变化
        else if (Game.getObjectById(source_room.memory.source_link_ids[i]) == undefined){
            source_room.memory.source_link_ids[i] = undefined
            for (let j: number = 0; j < links_num; j++){
                link = Game.getObjectById(source_room.memory.links_id[j])
                if (link){
                    if ((link.pos.x - source.pos.x) >= -1 && (link.pos.x - source.pos.x) <= 1 && 
                    (link.pos.y - source.pos.y) >= -1 && (link.pos.y - source.pos.y) <= 1){
                        source_room.memory.source_link_ids[i] = link.id
                        source_room.memory.source_costs[i] += 5000
                        break
                    }
                }
            }
        }
    }

    // 为每个source生成creep
    for (let i: number = 0; i < sources_num; i++){
        // spawn需要在空闲状态
        if (!Game.spawns[spawnName].spawning){
            if (source_room.memory.source_harvester_states[i] < source_room.memory.source_harvester_num[i]){
                source = Game.getObjectById(source_room.memory.sources_id[i])
                if (source_room.memory.source_link_ids[i] == undefined || source_room.memory.source_link_ids[i] == null){ // 没有link
                    if (source_room.memory.source_container_ids[i] == undefined){ // 没有container
                        // 暂时不支持4000的source
                        if (source.energyCapacity == 3000){
                            if (source_room.memory.energy_mine_chain_ok){
                                if (energyCapacity >= 950){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Harvester_with_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName}}) == OK){
                                            source_room.memory.source_harvester_states[i] += 1
                                            source_room.memory.source_costs[i] += 950
                                            break
                                        }
                                }
                                else if (energyCapacity >= 500){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_with_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName}}) == OK){
                                            source_room.memory.source_harvester_states[i] += 1
                                            source_room.memory.source_costs[i] += 500
                                            break
                                        }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_with_carry' + Game.time, 
                                {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName}}) == OK){
                                    source_room.memory.source_harvester_states[i] += 1
                                    source_room.memory.source_costs[i] += 300
                                    break
                                }
                        }
                        else if (source.energyCapacity == 1500){
                            if (source_room.memory.energy_mine_chain_ok){
                                if (energyCapacity >= 500){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_with_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName}}) == OK){
                                            source_room.memory.source_harvester_states[i] += 1
                                            source_room.memory.source_costs[i] += 500
                                            break
                                        }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_with_carry' + Game.time, 
                                {memory: {role: 'energy_harvester_with_carry', source_idx: i, source_roomName: source_roomName}}) == OK){
                                    source_room.memory.source_harvester_states[i] += 1
                                    source_room.memory.source_costs[i] += 300
                                    break
                                }
                        }
                    }
                    else{ // 含有container
                        container = Game.getObjectById(source_room.memory.source_container_ids[i])
                        if (source.energyCapacity == 3000){
                            if (source_room.memory.energy_mine_chain_ok){
                                if (energyCapacity >= 650){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_no_carry' + Game.time, 
                                    {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                        source_room.memory.source_harvester_states[i] += 1
                                        source_room.memory.source_costs[i] += 650
                                        break
                                    }
                                }
                                else if (energyCapacity >= 400){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE], 'Harvester_no_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                            source_room.memory.source_harvester_states[i] += 1
                                            source_room.memory.source_costs[i] += 400
                                            break
                                        }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, MOVE], 'Harvester_no_carry' + Game.time, 
                                {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                    source_room.memory.source_harvester_states[i] += 1
                                    source_room.memory.source_costs[i] += 250
                                    break
                                }
                        }
                        else if (source.energyCapacity == 1500){
                            if (source_room.memory.energy_mine_chain_ok){
                                if (energyCapacity >= 450){
                                    if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, MOVE, MOVE, MOVE], 'Harvester_no_carry' + Game.time, 
                                        {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                            source_room.memory.source_harvester_states[i] += 1
                                            source_room.memory.source_costs[i] += 450
                                            break
                                        }
                                }
                            }
                            else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_no_carry' + Game.time, 
                                {memory: {role: 'energy_harvester_no_carry', source_idx: i, source_roomName: source_roomName, container_pos_x: container.pos.x, container_pos_y: container.pos.y}}) == OK){
                                    source_room.memory.source_harvester_states[i] += 1
                                    source_room.memory.source_costs[i] += 300
                                    break
                                }
                        }
                    }
                }
                else{ // 含有link
                    link = Game.getObjectById(source_room.memory.source_link_ids[i])
                    if (link_harvester_pos_xs[i] == undefined || link_harvester_pos_ys[i] == undefined){
                        console.log(Game.time, "room_energy_mine_routine link_harvester_pos_x/ys undefined room:", source_roomName, 'i:', i)
                    }
                    // 暂时不支持4000的source
                    if (source.energyCapacity == 3000){
                        if (source_room.memory.energy_mine_chain_ok){
                            if (energyCapacity >= 950){
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'Harvester_link' + Game.time, 
                                    {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName, 
                                    link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                        source_room.memory.source_harvester_states[i] += 1
                                        source_room.memory.source_costs[i] += 950
                                        break
                                    }
                            }
                            else if (energyCapacity >= 500){
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_link' + Game.time, 
                                    {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName, 
                                    link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                        source_room.memory.source_harvester_states[i] += 1
                                        source_room.memory.source_costs[i] += 500
                                        break
                                    }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_link' + Game.time, 
                            {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName, 
                            link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                source_room.memory.source_harvester_states[i] += 1
                                source_room.memory.source_costs[i] += 300
                                break
                            }
                    }
                    else if (source.energyCapacity == 1500){
                        if (source_room.memory.energy_mine_chain_ok){
                            if (energyCapacity >= 500){
                                if (Game.spawns[spawnName].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester_link' + Game.time, 
                                    {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName, 
                                    link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                        source_room.memory.source_harvester_states[i] += 1
                                        source_room.memory.source_costs[i] += 500
                                        break
                                    }
                            }
                        }
                        else if (Game.spawns[spawnName].spawnCreep([WORK, WORK, CARRY, MOVE], 'Harvester_link' + Game.time, 
                            {memory: {role: 'energy_harvester_link', source_idx: i, source_roomName: source_roomName, 
                            link_harvester_pos_x: link_harvester_pos_xs[i], link_harvester_pos_y: link_harvester_pos_ys[i]}}) == OK){
                                source_room.memory.source_harvester_states[i] += 1
                                source_room.memory.source_costs[i] += 300
                                break
                            }
                    }
                }
            }
            // 有harvester且没有link才会生成对应的transfer
            if (source_room.memory.source_harvester_states[i] != 0 && source_room.memory.source_link_ids[i] == undefined && (source_room.memory.source_transfer_states[i] < source_room.memory.source_transfer_num[i])){
                if (source_room.memory.source_container_ids[i] == undefined){ // 没有container
                    if (source_room.memory.energy_mine_chain_ok){
                        if (energyCapacity >= 1050){
                            if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'passive_transfer' + Game.time, 
                                {memory: {role: 'passive_transfer', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName}}) == OK){
                                    source_room.memory.source_transfer_states[i] += 1
                                    source_room.memory.source_costs[i] += 600
                                    break
                                }
                        }
                    }
                    else if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'passive_transfer' + Game.time, {memory: {role: 'passive_transfer', source_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName}}) == OK){
                        source_room.memory.source_transfer_states[i] += 1
                        source_room.memory.source_costs[i] += 300
                        break
                    }
                }
                else{ // 含有container
                    if (source_room.memory.energy_mine_chain_ok){
                        if (energyCapacity >= 600){
                            if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'active_transfer' + Game.time, 
                                {memory: {role: 'active_transfer', source_container_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName}}) == OK){
                                    source_room.memory.source_transfer_states[i] += 1
                                    source_room.memory.source_costs[i] += 600
                                    break
                                }
                        }
                    }
                    else if (Game.spawns[spawnName].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], 'active_transfer' + Game.time, 
                        {memory: {role: 'active_transfer', source_container_idx: i, source_roomName: source_roomName, dest_roomName: dest_roomName}}) == OK){
                            source_room.memory.source_transfer_states[i] += 1
                            source_room.memory.source_costs[i] += 300
                            break
                        }
                }
            }
        }
    }
} // 常规流程结束

export const room_energy_mine = function(source_roomName: string, dest_roomName: string, spawnName: string, harvester_num: number[], transfer_num: number[], 
    link_harvester_pos_xs: number[], link_harvester_pos_ys: number[]){
    /*
    自己控制的房间的能量采集逻辑
    找到能量采集点，并存储在RoomMemory中，如果有Container配合，存储对应的pos
    根据相关配置生成Creep
    */
    let source_room: Room = Game.rooms[source_roomName]
    let dest_room: Room = Game.rooms[dest_roomName]
    // room空值检查
    if (source_room == undefined){
        console.log(Game.time, 'room_energy_mine source_room', source_roomName, ' undefined')
        return
    }
    if (dest_room == undefined){
        console.log(Game.time, "room_energy_mine dest_room", dest_roomName, ' undefined')
        return
    }
    room_energy_mine_init(source_room)
    room_energy_mine_routine(source_roomName, dest_roomName, spawnName, harvester_num, transfer_num, link_harvester_pos_xs, link_harvester_pos_ys)
}