import { game } from '../../../noname.js'
export const group = {
    laiyin: {
        short: '茵',
        name2: '莱茵生命',
        config: {
            color: 'wood',
        },
    },
    luodedao: {
        short: '罗',
        name2: '罗德岛',
        config: {
            color: 'water',
        },
    },
    zhenghe: {
        short: '整',
        name2: '整合运动',
        config: {
            color: 'soil',
        },
    },
    kaximiya: {
        short: '西',
        name2: '卡西米尔',
        config: {
            color: 'metal',
        },
    },
    geju: {
        short: '据',
        name2: '割据',
        config: {
            color: 'metal',
        },
    },
    kazidaier: {
        short: '卡',
        name2: '卡兹戴尔',
        config: {
            color: 'thunder',
        },
    },
    yan: {
        short: '炎',
        name2: '大炎',
        config: {
            color: 'zhenghe',
        },
    },
    yibiliya: {
        short: '伊',
        name2: '伊比利亚',
        config: {
            color: 'thunder',
        },
    },
    latelan: {
        short: '兰',
        name2: '拉特兰',
        config: {
            color: 'metal',
        },
    },
    wusasi: {
        short: '乌',
        name2: '乌萨斯',
        config: {
            color: 'thunder',
        },
    },
    laitaniya: {
        short: '莱',
        name2: '莱塔尼亚',
        config: {
            color: 'thunder',
        },
    },
    dongguo: {
        short: '东',
        name2: '东国',
        config: {
            color: 'thunder',
        },
    },
    shenchi: {
        short: '深',
        name2: '深池',
        config: {
            color: 'shenchi',
        },
    },
    weiduoliya: {
        short: '维',
        name2: '维多利亚',
        config: {
            color: 'key',
        },
    },
    xielage: {
        short: '格',
        name2: '谢拉格',
        config: {
            color: 'water',
        },
    },
    gelunbiya: {
        short: '伦',
        name2: '哥伦比亚',
        config: {
            color: 'water',
        },
    },
    boliwaer: {
        short: '玻',
        name2: '玻利瓦尔',
        config: {
            color: 'metal',
        },
    },
    esa: {
        short: '厄',
        name2: '厄撒',
        config: {
            color: 'esa',
        },
    },
    saergong: {
        short: '贡',
        name2: '萨尔贡',
        config: {
            color: 'metal',
        },
    },
    minuosi: {
        short: '米',
        name2: '米诺斯',
        config: {
            color: 'minuosi',
        },
    },
    xvlagu: {
        short: '叙',
        name2: '叙拉古',
        config: {
            color: 'xvlagu',
        },
    },
};

export function registerGroup() {
    for (const key in group) {
        const { short, name2, config } = group[key]
        game.addGroup(key, short, name2, config, 'all')
    }
}