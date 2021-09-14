interface CreepMemory {
    /**
     * 该 creep 的角色
     */
    role: string
    is_working?: boolean // 工作中，区别于需要去取能量的状态

    source_idx?: number // harvester.ts 存采集的source对应id的下标
    container_pos?: RoomPosition // 固定点取能量的creep的固定点，即container位置

    // transfer_start?:
    // transfer_type?:
    // transfer_dest?:

    // mine_idx?: number // mine.ts 暂未启用
    // soldier_room_flag?: number // soldier.ts 用于检查soldier出入房间状态 暂未启用
}

interface RoomMemory {
    source_ids?: Id<Source>[]
    
    // source_ids_flag?: Id<Source>[]

    // mine_ids?: Id<Mineral>[]  //暂未启用
}

interface MY_STRUCTURE_TOWER{ // main.ts Tower类型检查
    find?: Function
    attack?: Function
    repair?: Function
    pos?: RoomPosition
    hits?: number
    hitsMax?: number
}