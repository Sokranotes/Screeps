export const room_config = {
    'priority': {
        '_1hf': -1,
        '_1bs': -1,
        'hf': 0,
        'base_transfer': 0,
        'tower_transfer': 0,
        'hu': 1,
        'hus': 1,
        'carrier_W47S14': 2,
        'carrier_W48S12': 2,
        'carrier_W9N11': 2,
        'carrier_W44S12': 2,
        'hl': 3,
        'upgrader_link': 10,
        'hr': 15,
        'repairer': 15,
        'hb': 20,
        'builder': 20,
    },
    'W14N12': {
        // 'level3': {
        //     'hf': {
        //         'num': 3,
        //         'source_idx': 0,
        //         'ticksToLive': 200
        //     },
        //     'hu':{
        //         'num': 5,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //     },
        //     'hb': {
        //         'num': 3,
        //         'source_idx': 0,
        //         'ticksToLive': 150
        //     }
        // },
        // 'level7': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hl': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'hb': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 1,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 1,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        'level8': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    WORK, WORK, WORK, WORK, CARRY]
            },
            'hl': {
                'num': 0,
                'source_roomName': 'W14N12',
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    WORK, WORK, WORK, WORK, CARRY]
            },
            'hf': {
                'num': 1,
                'source_idx': 0,
                'source_roomName': 'W14N12',
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,]
            },
            'hu': {
                'num': 0,
                'source_idx': 1,
                'source_roomName': 'W14N12',
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
            },
            'hus': {
                'num': 1,
                'source_idx': 1,
                'source_roomName': 'W14N12',
                'ticksToLive': 100,
                'bodyParts': [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    WORK, WORK, WORK, WORK, CARRY]
            },
            'hr': {
                'num': 0,
                'source_roomName': 'W14N12',
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hb': {
                'num': 0,
                'source_idx': 0,
                'source_roomName': 'W14N12',
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'builder': {
                'num': 1,
                'source_idx': 0,
                'source_roomName': 'W14N12',
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'source_roomName': 'W14N12',
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hl': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hu':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
            },
            'hus':{
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hr': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
            },
            'hb': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE]
            },
            'builder': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
    'W11N19': {
        // 'level1': {
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hb': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     }
        // },
        // 'level2': {
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     }
        // },
        // 'level3': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level4': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level5': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level6': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level7': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        'level8': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
    'W12N13': {
        // 'level1': {
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hb': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     }
        // },
        // 'level2': {
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     }
        // },
        // 'level3': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level4': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level5': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level6': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level6': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level7': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        'level8': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
    'W12N15': {
        // 'level1': {
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     },
        //     'hb': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, MOVE]
        //     }
        // },
        // 'level2': {
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     }
        // },
        // 'level3': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level4': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level5': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level6': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level7': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        'level8': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
    'E29N3': {
        // 'level2': {
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     }
        // },
        // 'level3': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, CARRY, MOVE]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level4': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level5': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        // 'level6': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        'level7': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
    'W9N11': {
        // 'level3': {
        //     'hf': {
        //         'num': 6,
        //         'source_idx': 0,
        //         'ticksToLive': 200
        //     },
        //     'hu':{
        //         'num': 8,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //     },
        //     'hb': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150
        //     },
        // },
        // 'level7': {
        //     'upgrader_link': {
        //         'num': 1,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hl': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'hr': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //     },
        //     'hb': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150
        //     },
        //     'builder': {
        //         'num': 3,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 1,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 2,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        'level8': {
            'carrier_W9N11': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hus':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hu':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hr': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150
            },
            'builder': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hus':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hu':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hr': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150
            },
            'builder': {
                'num': 3,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 2,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
    'W41S6': {
        'level1': {
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [WORK, CARRY, MOVE]
            },
            'hu':{
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE]
            },
            'hb': {
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE]
            }
        },
        'level2': {
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            },
            'hu':{
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            },
            'hb': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            }
        },
        'level3': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [WORK, CARRY, MOVE]
            },
            'hu':{
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            },
            'hb': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, CARRY, MOVE, WORK, CARRY, MOVE]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'level4': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'level5': {
            'upgrader_link': {
                'num': 2,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'carrier_W41S6': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
            },
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 3,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'level6': {
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'upgrader_link': {
                'num': 4,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'carrier_W41S6': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
            },
            'hf': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY, 
                    MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'level7': {
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                // 'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                //     WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                //     WORK,WORK,WORK,WORK,CARRY]
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY]
            },
            'builder': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'carrier_W41S6': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'level8': {
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
                // 'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                //     WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                //     WORK,WORK,WORK,WORK,CARRY]
            },
            'builder': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'carrier_W41S6': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'builder': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'carrier_W41S6': {
                'num': 1,
                'ticksToLive': 50,
                'bodyParts': [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
    'W47S14': {
        'level8' : {
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'builder': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 2,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'carrier_W47S14': {
                'num': 1,
                'ticksToLive': 50,
                'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
            'tower_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            }
        }
    },
    'W48S12': {
        'level8' : {
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'builder': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'carrier_W48S12': {
                'num': 1,
                'ticksToLive': 100,
                // 'bodyParts': [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
                'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        }
    },
    'W44S12':{
        // 'level1': {
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,WORK,CARRY]
        //     },
        //     'hu':{
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,WORK,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,WORK,CARRY]
        //     }
        // },
        // 'level2': {
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,WORK,CARRY, MOVE,MOVE,WORK,CARRY]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,WORK,CARRY, MOVE,MOVE,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,WORK,CARRY, MOVE,MOVE,WORK,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,WORK,CARRY, MOVE,MOVE,WORK,CARRY]
        //     }
        // },
        // 'level3': {
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },

        // },
        // 'level4': {
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hu':{
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        // },
        // 'level5': {
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hu':{
        //         'num': 4,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        // },
        // 'level7': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 3,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        // },
        'level8': {
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'builder': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'carrier_W44S12': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hu':{
                'num': 3,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hus':{
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'hb': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 0,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
    'W46S11': {
        // 'level4': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 1,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hl': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 1,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        //     'carrier_W46S11': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        // },
        // 'level5': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hl': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        //     'carrier_W46S11': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        // },
        // 'level6': {
        //     'upgrader_link': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        //             WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
        //             WORK,WORK,WORK,WORK,CARRY]
        //     },
        //     'hf': {
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hl': {
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hu':{
        //         'num': 2,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hus':{
        //         'num': 0,
        //         'source_idx': 0,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hr': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'hb': {
        //         'num': 1,
        //         'source_idx': 1,
        //         'ticksToLive': 150,
        //         'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        //     'builder': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'repairer': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
        //             WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
        //     },
        //     'base_transfer': {
        //         'num': 0,
        //         'ticksToLive': 200,
        //         'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
        //     },
        //     'carrier_W46S11': {
        //         'num': 0,
        //         'ticksToLive': 100,
        //         'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
        //     },
        // },
        'level7': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hl': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 200,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hus':{
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hu':{
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 2,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
            'carrier_W46S11': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
        },
        'level8': {
            'upgrader_link': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hl': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 2,
                'source_idx': 1,
                'ticksToLive': 200,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hus':{
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hu':{
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hr': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150
            },
            'builder': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 0,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 2,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
            'carrier_W46S11': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
            },
        },
        'default': {
            'upgrader_link': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hl': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 100,
                'bodyParts': [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    WORK,WORK,WORK,WORK,CARRY]
            },
            'hf': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 200,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hus':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hu':{
                'num': 0,
                'source_idx': 1,
                'ticksToLive': 150,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'hr': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 0,
                'source_idx': 0,
                'ticksToLive': 150
            },
            'builder': {
                'num': 3,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'repairer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
            },
            'base_transfer': {
                'num': 2,
                'ticksToLive': 200,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        },
    },
}

global.room_config = room_config