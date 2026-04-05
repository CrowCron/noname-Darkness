import { lib } from '../../../noname.js';
const rare = ['ark_shenhaise', 'ark_duanzuizhe', 'ark_nengtianshi', 'ark_ash', 'ark_dadi', 'ark_yifulite', 'ark_mandela', 'ark_huihou', 'ark_yanwei', 'ark_huihao', 'ark_baijin']
const epic = ['ark_wenyue', 'ark_Amy', 'ark_miuersaisi', 'ark_zongxia', 'ark_sikadi', 'ark_hemo', 'ark_mositima', 'ark_hongdou', 'ark_fengdi', 'ark_YQSlinguang']
const legend = ['ark_xingji', 'ark_aiguozhe', 'ark_weiyanwu', 'ark_midiexiang', 'ark_saixiliya', 'ark_saileiya', 'ark_teleixiya', 'ark_ling', 'ark_nian', 'ark_xi', 'ark_zhongyue']

export function registerRank() {
    if (lib.rank) {
        //s
        lib.rank.rarity.rare.addArray(rare);
        //ss
        lib.rank.rarity.epic.addArray(epic);
        //sss
        lib.rank.rarity.legend.addArray(legend);
    }
}

export { rare, epic, legend }