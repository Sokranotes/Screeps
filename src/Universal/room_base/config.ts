export const room_config = {
    'priority': {
        'hf': 0,
        'base_transfer': 0,
        'tower_transfer': 0,
        'carrier_W47S14': 1,
        'carrier_W48S12': 1,
        'hl': 2,
        'hu': 10,
        'upgrader_link': 10,
        'hr': 15,
        'repairer': 15,
        'hb': 20,
        'builder': 20,
    },
    'W14N12': {
        'level3': {
            'hf': {
                'num': 3,
                'source_idx': 0,
                'ticksToLive': 200
            },
            'hu':{
                'num': 5,
                'source_idx': 1,
                'ticksToLive': 150,
            },
            'hr': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 3,
                'source_idx': 0,
                'ticksToLive': 150
            }
        }
    },
    'W9N11': {
        'level3': {
            'hf': {
                'num': 6,
                'source_idx': 0,
                'ticksToLive': 200
            },
            'hu':{
                'num': 8,
                'source_idx': 1,
                'ticksToLive': 150,
            },
            'hr': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 2,
                'source_idx': 0,
                'ticksToLive': 150
            }
        },
    },
    'W41S6': {
        'level7': {
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
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
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
            'carrier_W47S14': {
                'num': 1,
                'ticksToLive': 50,
                'bodyParts': [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
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
                'bodyParts': [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE]
            },
            'base_transfer': {
                'num': 1,
                'ticksToLive': 100,
                'bodyParts': [CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE]
            },
        }
    },
    'W44S12':{
        'level4': {
            'hf': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 200
            },
            'hu':{
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
            },
            'hr': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150
            }
        },
        'default': {
            'hf': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 200
            },
            'hu':{
                'num': 1,
                'source_idx': 1,
                'ticksToLive': 150,
            },
            'hr': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150,
            },
            'hb': {
                'num': 1,
                'source_idx': 0,
                'ticksToLive': 150
            }
        },
    }
}