interface CreepMemory {
    /**
     * 该 creep 的角色
     */
    role: string
    is_working?: boolean // 工作中，区别于需要去取能量的状态

    source_roomName?: string
    dest_roomName?: string

    source_idx?: number // harvester.ts 存采集的source对应id的下标
    source_container_idx?: number
    container_pos_x?: number // 固定点取能量的creep的固定点，即container位置
    container_pos_y?: number
    reservation_tick?: number

    link_harvester_pos_x?: number
    link_harvester_pos_y?: number

    // transfer_start?:
    // transfer_type?:
    // transfer_dest?:

    // mine_idx?: number // mine.ts 暂未启用
    // soldier_room_flag?: number // soldier.ts 用于检查soldier出入房间状态 暂未启用
}

interface RoomMemory {
    // 本房间内所有source的ID, 永远不会改变, 只需要判断undefined
    sources_num?: number
    sources_id?: Id<Source>[]

    // 对应不同source的harvester的个数，通常为1个
    // 对于3000能量的源, 只要有一个5WORK组件的creep在工作, 就能够保持最大效率
    source_harvester_states?: number[]
    source_harvester_num?: number[]
    source_transfer_states?: number[] // 对应不同source的transfer的个数
    source_transfer_num?: number[] // 对应不同source, transfer的限制个数

    source_container_ids?: Id<StructureContainer>[] // 对应下标的source的container的ID
    containers_id?: Id<StructureContainer>[] // 同一房间内所有container的ID, 避免多次重复扫描查找
    containers_num?: number
    check_containers_state?: boolean

    source_link_ids?: Id<StructureLink>[]
    links_id?: Id<StructureLink>[]
    links_num?: number
    link_harvester_pos_xs: number[]
    link_harvester_pos_ys: number[]
    check_links_state?: boolean

    // mine_ids?: Id<Mineral>[]  //暂未启用

    source_distance?: number[]
    source_gets?: number[]
    source_costs?: number[]
    room_harvester_energy_total: number

    auto_energy_mine?: boolean
    energy_mine_chain_ok?: boolean

    controller_id?: Id<StructureController>

    war_flag?: boolean
    enemy_num?: number
    transfer_to_terminal?: number
}