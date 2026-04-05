import { lib, game, ui, get, ai, _status } from "../../../noname.js";
export const card = {
	"baibanbingqi_1": {
		type: "equip",
		subtype: "equip1",
		distance: {

		},
		fullimage: true,
		image: "ext:天灾之下/image/card/baibanbingqi_1.PNG",
	},
	"baibanbingqi_2": {
		type: "equip",
		subtype: "equip1",
		distance: {
			attackFrom: -1,
		},
		ai: {
			basic: {
				equipValue: 1,
				order: function (card, player) {
					if (player && player.hasSkillTag('reverseEquip')) {
						return 8.5 - get.equipValue(card, player) / 20;
					}
					else {
						return 8 + get.equipValue(card, player) / 20;
					}
				},
				useful: 2,
				value: function (card, player, index, method) {
					if (player.isDisabled(get.subtype(card))) return 0.01;
					var value = 0;
					var info = get.info(card);
					var current = player.getEquip(info.subtype);
					if (current && card != current) {
						value = get.value(current, player);
					}
					var equipValue = info.ai.equipValue;
					if (equipValue == undefined) {
						equipValue = info.ai.basic.equipValue;
					}
					if (typeof equipValue == 'function') {
						if (method == 'raw') return equipValue(card, player);
						if (method == 'raw2') return equipValue(card, player) - value;
						return Math.max(0.1, equipValue(card, player) - value);
					}
					if (typeof equipValue != 'number') equipValue = 0;
					if (method == 'raw') return equipValue;
					if (method == 'raw2') return equipValue - value;
					return Math.max(0.1, equipValue - value);
				},
			},
			result: {
				target: function (player, target, card) {
					return get.equipResult(player, target, card.name);
				},
			},
		},
		enable: true,
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return target == player;
		},
		modTarget: true,
		allowMultiple: false,
		content: function () {
			if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
		},
		toself: true,
		fullimage: true,
		image: "ext:天灾之下/image/card/baibanbingqi_2.PNG",
	},
	"baibanbingqi_3": {
		type: "equip",
		subtype: "equip1",
		distance: {
			attackFrom: -2,
		},
		ai: {
			basic: {
				equipValue: 1,
				order: function (card, player) {
					if (player && player.hasSkillTag('reverseEquip')) {
						return 8.5 - get.equipValue(card, player) / 20;
					}
					else {
						return 8 + get.equipValue(card, player) / 20;
					}
				},
				useful: 2,
				value: function (card, player, index, method) {
					if (player.isDisabled(get.subtype(card))) return 0.01;
					var value = 0;
					var info = get.info(card);
					var current = player.getEquip(info.subtype);
					if (current && card != current) {
						value = get.value(current, player);
					}
					var equipValue = info.ai.equipValue;
					if (equipValue == undefined) {
						equipValue = info.ai.basic.equipValue;
					}
					if (typeof equipValue == 'function') {
						if (method == 'raw') return equipValue(card, player);
						if (method == 'raw2') return equipValue(card, player) - value;
						return Math.max(0.1, equipValue(card, player) - value);
					}
					if (typeof equipValue != 'number') equipValue = 0;
					if (method == 'raw') return equipValue;
					if (method == 'raw2') return equipValue - value;
					return Math.max(0.1, equipValue - value);
				},
			},
			result: {
				target: function (player, target, card) {
					return get.equipResult(player, target, card.name);
				},
			},
		},
		enable: true,
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return target == player;
		},
		modTarget: true,
		allowMultiple: false,
		content: function () {
			if (cards.length && get.position(cards[0], true) == 'o') target.equip(cards[0]);
		},
		toself: true,
		fullimage: true,
		image: "ext:天灾之下/image/card/baibanbingqi_3.PNG",
	},
	////白卷
	ark_baijuan: {
		enable: function (card) {
			return card.storage.skills && card.storage.skills.length;
		},
		global: 'ark_baijuan_deleteSkill',
		fullimage: true,
		fullskin: true,
		type: 'skillcard',
		derivation: 'ark_geleixiu',
		image: "extension/天灾之下/image/card/ark_baijuan.jpg",
		selectTarget: -1,
		filterTarget: function (card, player, target) {
			return target == player;
		},
		content: function () {
			'step 0'
			target.removeAdditionalSkill(card.name);
			if (isArray(card.storage.skills)) {
				if (card.storage.skills.length < 2) {
					if (card.storage.skills[0]) {
						event._result = { control: card.storage.skills[0] };
					};
					card.storage.skills = [];
				} else {
					target.chooseControl(card.storage.skills).set('dialog', ['请选择要获得的技能', [card.storage.skills.map(function (skill) {
						return '【' + get.translation(skill) + '】<br>' + get.translation(skill + '_info');
					}), 'tdnodes']]);
				};
			} else event.finish();
			'step 1'
			if (result.control) {
				target.popup(result.control);
				game.log(target, '获得了技能', '#g【' + get.translation(result.control) + '】');
				target.addAdditionalSkill(card.name, result.control);
				card.storage.skills = [];
			};
		},
		ai: {
			basic: {
				order: function (card, player) {
					if (Array.isArray(card.storage.skills) && card.storage.skills.length) {
						var order = card.storage.skills.map(function (skill) {
							var info = get.info(skill);
							if (info.ai && info.ai.order) return get.order(skill) + 0.5;
							return 12;
						});
						if (player.getSkills(true).some(function (skill) {
							return card.storage.skills.contains(skill);
						})) return player.needsToDiscard() ? 0.1 : 0;
						return Math.max(...order);
					};
					return 6;
				},
				useful: 2.1,
				value: 8.6
			},
			result: {
				target: function (player, target, card, isLink) {
					if (Array.isArray(card.storage.skills) && card.storage.skills.length) {
						var val = 0, i;
						for (i of card.storage.skills) {
							if (player.getSkills().contains(i)) continue;
							val += get.skillRank(i, 'in');
						};
						if (isArray(player.additionalSkills.ark_baijuan) && player.additionalSkills.ark_baijuan.length > card.storage.skills.length) return 0;
						return val;
					};
					return 0;
				},
			},
			tag: {
				gainskill: 1
			}
		}
	},

	Lævateinn: {
		fullskin: true,
		derivation: 'ark_shierteer',
		ark_derivation: true,
		type: 'equip',
		subtype: 'equip1',
		distance: {
			attackFrom: -1,
		},
		skills: ['Lævateinn_skill1', 'Lævateinn_skill2'],
		ai: {
			basic: {
				equipValue: 2,
			},
		},
	},
};
