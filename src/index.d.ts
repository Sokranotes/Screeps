interface CreepMemory {
    /**
     * 该 creep 的角色
     */
    role: string
    is_working?: boolean // 工作中，区别于需要去取能量的状态
    sources?: Source[]
    source_idx?: number // 需要取能量的单位，获取能量的源头
    source_ids?: Id<Source>[]
    mine_idx?: number
    soldier_room_flag?: number
}

interface RoomMemory {
    source_ids?: Id<Source>[]
    source_ids_flag?: Id<Source>[]
    mine_ids?: Id<Mineral>[]
}