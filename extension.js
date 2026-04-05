import { lib, game, ui, get, ai, _status } from "../../noname.js";
import { characterTitle, card, character, skill, translate, register as registerCharacters } from "./character/index.js";

export const type = "extension";

export default function (lib, game, ui, get, ai, _status) {
	var url = lib.assetURL + 'extension/天灾之下';
	return {
		name: "天灾之下",
		editable: false,
		content: function (config, pack) {
			lib.skill['ark_kuiduo'] = {
				trigger: {
					player: "damageEnd"
				},
				direct: true,
				filter: function (event, player) {
					return event.source != undefined;
				},
				content: function () {
					"step 0"
					if (trigger.card && get.type2(trigger.card) == 'trick') {
						var posi = 'ej';
						if (trigger.source != player) posi = 'hej';
						if (player.countGainableCards(trigger.source, posi) > 0) {
							player.logSkill('ark_kuiduo', trigger.source);
							event.isForced = true;
							event.goto(2);
						} else event.finish();
					} else if (trigger.source != player) {
						var next = player.chooseBool(
							get.prompt('ark_kuiduo', trigger.source),
							'当你受到其他角色造成的伤害后，可以和伤害来源交换手牌。且若你因此增加了手牌数，伤害来源可以对你发动【利驭】。'
						);
						next.set('ai', function () {
							return trigger.source.countCards('h') -
								player.countCards('h') > 1 ||
								player.attitudeTo(trigger.source > 0);
						});
					} else event.finish();
					"step 1"
					if (result.bool) {
						player.logSkill('ark_kuiduo', trigger.source);
						event.hs = player.countCards('h');
						player.swapHandcards(trigger.source);
					} else event.finish();
					"step 2"
					if (event.isForced || player.countCards('h') > event.hs) {
						var next = trigger.source.gainPlayerCard(player, 'visibleMove');
						next.set('position', trigger.source == player ? 'ej' : 'hej');
						next.set('forced', event.isForced);
						next.set('ai', function (button) {
							var player = _status.event.player,
								target = _status.event.getTrigger().player;
							if (player.attitudeTo(target) > 0 && get.position(button.link) == 'j')
								return 4 + get.value(button.link);
							if (get.type(button.link) == 'equip') {
								if (player.attitudeTo(target) > 0 && game.hasPlayer(function (current) {
									return (player.canUse({ name: 'juedou' }, current) && current != target && get.effect(current, { name: 'juedou' }, player, player) > 2);
								})) {
									return 5;
								}
								else if (game.hasPlayer(function (current) {
									return (player.canUse({ name: 'juedou' }, current) && current != target && current != player && get.effect(current, { name: 'juedou' }, player, player) < 0);
								})) {
									return 1;
								}
								else return 4;
							}
							return 3;
						})
					}
					next.set('logSkill', ['new_liyu', player]);
					"step 3"
					if (result.bool) {
						if (get.type(result.cards[0]) != 'equip') {
							player.draw();
							event.finish();
						} else {
							if (game.hasPlayer(function (current) {
								return current != trigger.source && current != player && trigger.source.canUse('juedou', current);
							})) {
								var next = player.chooseTarget(true);
								next.set('filterTarget', function (card, player, target) {
									var evt = _status.event.getTrigger();
									return evt.source.canUse({ name: 'juedou' }, target) && target != _status.event.player;
								});
								next.set('ai', function (target) {
									var evt = _status.event.getTrigger();
									return get.effect(target, { name: 'juedou' }, evt.source, _status.event.player) - 2;
								});
								next.set('prompt', '请选择一名角色，视为' + get.translation(trigger.source) + '对其使用【决斗】');
								next.set('')
							}
						}
					}
					"step 4"
					if (result.bool) {
						trigger.source.useCard({ name: 'juedou', isCard: true }, result.targets, 'noai');
					}
				}
			};
			lib.translate['ark_kuiduo_info'] = '「<span style=color:rgba(0,101,255,0.7); >雄志四方</span>」<br><li>当你受到伤害后，你可与伤害来源交换手牌，若你手牌数因此增加，则令伤害来源对你发动一次〖利驭〗；且若你因锦囊牌受伤，则其无条件发动。';
			lib.skill['_ark_moyu_damage'] = {
				audio: 'ark_moyu',
				trigger: {
					global: 'damageEnd',
				},
				filter: function (event, player) {
					return player.hasSkill('ark_moyu', true) && player.classList.contains('unseen') && event.player != player && _status.currentPhase != event.player && !player.hasSkill('ark_liezhu_limit');
				},
				logTarget: 'player',
				prompt2: '你主动登场并令其进入<b>隐匿</b>状态',
				content: function () {
					'step 0'
					player.showCharacter(0);
					'step 1'
					var next = game.createEvent('ark_moyu_hidden');
					next.player = trigger.player;
					next.setContent(lib.skill['ark_moyu'].hidden_Al);
				},
			};
			lib.translate['_ark_moyu_damage'] = '漠毓';
			lib.translate["ark_jique_rewrite"] = "继却·改";
			lib.translate["ark_jique_rewrite_info"] = "出牌阶段限一次，你可以令含你在内至多X名角色各弃置一张牌（X为你体力值）。其中：<br>①弃置【杀】的角色检索1张伤害类即时牌；<br>②弃置装备牌的角色回复1点体力；<br>③除上述以外的角色与你各摸1张牌。<br>若你选的项不止有你选择，此项数值加倍、且下次无效。";

			//全局技能

			//角色评级
			if (lib.rank) {
				//s
				lib.rank.rarity.rare.addArray(['ark_shenhaise', 'ark_duanzuizhe', 'ark_nengtianshi', 'ark_ash', 'ark_dadi', 'ark_yifulite', 'ark_mandela', 'ark_huihou', 'ark_yanwei', 'ark_huihao', 'ark_baijin']);
				//ss
				lib.rank.rarity.epic.addArray(['ark_wenyue', 'ark_Amy', 'ark_miuersaisi', 'ark_zongxia', 'ark_sikadi', 'ark_hemo', 'ark_mositima', 'ark_hongdou', 'ark_fengdi', 'ark_YQSlinguang']);
				//sss
				lib.rank.rarity.legend.addArray(['ark_xingji', 'ark_aiguozhe', 'ark_weiyanwu', 'ark_midiexiang', 'ark_saixiliya', 'ark_saileiya', 'ark_teleixiya', 'ark_ling', 'ark_nian', 'ark_xi', 'ark_zhongyue']);
			};
			//禁止ai
			if (config.disEnableCharacter) {
				var savedFilter = lib.filter.characterDisabled;
				lib.filter.characterDisabled = function (i, libCharacter) {
					if (i && i.indexOf('ark') != 0) {
						return true;
					}
					return savedFilter(i, libCharacter);
				};
			};
			var f = function (英文名) { if (config[英文名]) { for (var i in lib.characterPack[英文名]) { if (lib.character[i][4].indexOf("forbidai") < 0) lib.character[i][4].push("forbidai"); } } };
			f("kazidaier");
			//隐藏武将
			if (!lib.config.mode_config.identity.double_character) {
				if (lib.config.ark_gezhe == 10) {
					var ark_gezhe = ["female", "zmfa", 4, ["zhuayuewusheng", "zyutubanshen", "zguanghanlingshuang", "zjiyuelianyan", "ztaiyinjungao"], ['ext:天灾之下/audio/ark_gezhe.jpg', "zhu", "des:"]];
					lib.character.ark_gezhe = ark_gezhe;
					lib.characterPack.mode_extension_天灾之下.ark_gezhe = lib.character.ark_gezhe;
				}
			};
			if (lib.config.ark_gezhe == true) game.saveConfig('ark_gezhe', 10);
			if (lib.config.ark_gezhe != 0 && lib.config.ark_gezhe != 10) game.saveConfig('ark_gezhe', 0);
			// lib.init.js(lib.assetURL + 'extension/天灾之下', "update", function () {
			// },
			// 	function () {
			// 		alert("更新文件有误");
			// 	});
			var num = Object.keys(lib.characterPack.tianzaizhixia).length;
			if (lib.config.tzzxCN != num) {
				game.saveConfig("tzzxCN", num);
			}
			lib.extensionMenu.extension_天灾之下.ark_kzjs2.item["5"] = "<li>现共实装" + num + "个干员";
			lib.characterSort.tianzaizhixia = (function () {
				var obj = {};
				for (var i in lib.characterPack.tianzaizhixia) {
					var info = lib.character[i];
					if (info[1]) {
						var name = info[1] + '2' || info[1];
						obj[name] = (obj[name] || []).concat(i);
					};
				};
				return obj;
			}());
			lib.skill._restoreSkills = {
				trigger: (function () {
					var trigger = { player: [], global: [], target: [], source: [] };
					for (var i in lib.skill) {
						var info = get.info(i) || {};
						if (info.restoreSkill) {
							var obj = info.restoreSkill.trigger;
							for (var j in trigger) {
								if (obj[j]) trigger[j] = trigger[j].concat(obj[j]);
							};
						};
					};
					return trigger;
				}()),
				filter: function (event, player, name, skill) {
					var list = get.players(null, true).map(function (key) {
						var skills = key.getSkills(null, null, false);
						for (var i of skills) if (get.info(i) && get.info(i).group) skills.concat(get.info(i).group);
						return {
							player: key,
							skills: skills
						};
					}), restoreSkills = [];
					if (!event._restoreSkills) event._restoreSkills = [];
					for (var i of list) {
						var skills = [];
						for (var j of i.skills) {
							var info = get.info(j) || {};
							if (info.restoreSkill) {
								var info = info.restoreSkill, filter = info.filter;
								if (info.trigger) {
									for (var k in info.trigger) {
										var trs = [].concat(info.trigger[k]), bool = k == 'global' || event[k] == i.player;
										if (bool && trs.contains(name)) {
											if (typeof filter == 'function' ? filter(event, i.player, name, j, skills, restoreSkills, list) : filter !== false ? true : false) skills.add(j);
										};
									};
								};
							};
						};
						restoreSkills.add({ player: i.player, skills: skills });
						event._restoreSkills.addArray(restoreSkills);
					};
					return restoreSkills.some(function (key) {
						return key.skills.length;
					});
				},
				silent: true,
				priority: 1145,
				firstDo: true,
				charlotte: true,
				content: function () {
					'step 0'
					var restoreSkills = trigger._restoreSkills;
					if (restoreSkills) {
						var skills = [], bit = function (key) {
							if (key.firstDo) return Infinity;
							if (key.lastDo) return -Infinity;
							return key.priority || 0;
						};
						for (var i of restoreSkills) {
							for (var j of i.skills) {
								var info = (get.info(j) || {}).restoreSkill, obj = Object.assign(Object.assign({}, info), { skill: j, source: i.player });
								skills.add(obj);
							};
						};
						skills.sort(function (a, b) {
							return bit(b) - bit(a);
						});
						if (!skills.length) event.finish();
						event.skills = skills;
					} else event.finish();
					'step 1'
					var i = event.skills.shift(), player = i.source;
					if (typeof i.content == 'function') {
						var next = game.createEvent(i.skill + '_restoreSkill_content', false);
						next.player = player;
						next._trigger = trigger;
						next.triggername = event.triggername;
						next.skill = i.skill;
						next.setContent(i.content);
						if (i.forceDie) next.forceDie = true;
					};
					if (player) {
						if (typeof i.logTarget == 'function') target = i.logTarget(trigger, player, event);
						if (typeof i.logTarget == 'string') target = trigger[i.logTarget];
						if (i.log) player.logSkill(i, target, i.line);
						if (!i.no) player.restoreSkill(i.skill);
					};
					if (event.skills.length) event.redo();
				},
			};
			lib.skill.icesha_skill = Object.assign(lib.skill.icesha_skill, {
				filter: function (event) {
					return event.nature == 'ice' && (event.notLink() || event.canLink) && event.player.getCards('he').length > 0;
				},
			});
			if (lib.config.ark_derivation_card) {
				var change = lib.card.ark_derivation_change, i;
				for (i in change) {
					if (!change[i]) continue;
					if (change[i].info) lib.translate[i + '_info'] = change[i].info;
					if (typeof change[i].content == 'function') change[i].content.call(change[i], i);
				};
			};
			if (!window.ark_clone_ui) window.ark_clone_ui = ui;
			if (!window.ark_clone_lib) window.ark_clone_lib = lib;
			if (!window.ark_clone_get) window.ark_clone_get = get;
		},
		precontent: function (tianzaizhixia) { //启动代码
			try {
				//——————————分割线——————————//
				if (tianzaizhixia.enable) {
					registerCharacters();
					game.import("character", function () {
						var tianzaizhixia = {
							name: "tianzaizhixia",
							connect: true,
							characterSort: {
								tianzaizhixia: {},
							},
							///衍生卡牌
							card,
							character,
							characterIntro: {},
							characterTitle,

							//技能代码
							skill,
							translate
						}

						for (var i in tianzaizhixia.character) {
							if (!tianzaizhixia.character[i][4]) tianzaizhixia.character[i][4] = [];
							tianzaizhixia.character[i][4].push('ext:天灾之下/image/character/' + i + '.jpg')
						}
						return tianzaizhixia;
					});
					lib.config.all.characters.push('tianzaizhixia');
					lib.translate['tianzaizhixia_character_config'] = '天灾之下';
					if (!lib.config.tianzaizhixiaCharacterOpen) {
						lib.config.characters.push('tianzaizhixia')
						game.saveConfig('characters', lib.config.characters);
						game.saveConfig('tianzaizhixiaCharacterOpen', true);
					};
					if (lib.config.ark_derivation_card) {
						var i, j, list = lib.card.ark_derivation_list;
						for (i in list) {
							var info = [], known = list[i];
							if (get.is.object(known)) {
								for (j in known) {
									info = [];
									info[0] = known[j].suit;
									info[1] = known[j].number;
									info[2] = i;
									info[3] = known[j].nature;
									lib.card.list.push(info);
								};
							} else if (isArray(known)) {
								for (j of known) {
									info = [j[0], j[1], i, j[2]];
									lib.card.list.push(info);
								};
							};
						};
					};
				}
			}
			catch (e) {
				alert("天灾之下\n扩展启动代码出现错误:\n" + decodeURI(e.stack));
			};
			lib.tzzx_originalChangeHp = lib.element.content.changeHp;
			if (lib.tzzx_originalChangeHp && lib.config.tzzx_changeHujia) {
				var str = lib.tzzx_originalChangeHp.toString();
				eval(`lib.element.content.changeHp=function (){${str.slice(str.indexOf('//old part'))}`);
			};
		}, help: {}, config: {
			"ark_xian0": {
				"name": "—·—·—·—·—·—·—·",
				"clear": true
			},
			"ark_kzjs1": {
				"name": "<b><li>【扩展介绍】</b>",
				"clear": true
			},
			"ark_kzjs2": {
				"name": "<li><font color=silver>[点击查看详细内容]</font>",
				"init": "1",
				"intro": "点我查看详细内容",
				"item": {
					"1": " ",
					"2": "<b><font color=cyan>扩展介绍</font>>>>",
					"3": "<li>本扩展为明日方舟同人Diy，技能解释权为本设计小组所有。</font>",
					"4": "<li>本扩展代码编写者为：俺杀、正弦、无冕黎明、苍穹单推人、Argon、美妙的世界、<br/>我永远单推狗妈、琉璃菠萝、愉渊、缘绊随行，感谢诸位大佬的鼎力支持。</font>",
					"5": "<li>现共实装" + (lib.config.tzzxCN || '56+1') + "个干员</font>"
				}
			},
			"ark_xian1": { "name": "—·—·—·—·—·—·—·", "clear": true },
			"ark_kzgx1": { "name": "<b><li>更新内容</b>", "clear": true },
			"ark_kzgx2": {
				"name": "<li><font color=silver>[点击查看详细内容]</font>", "init": "1",
				"intro": "点我查看详细内容",
				clear: true,
				onclick: function () {
					game.showUpdateDialog("天灾之下");
				}
			},
			"ark_xian2": { "name": "—·—·—·—·—·—·—·", "clear": true },
			"ark_nnew1": { "name": "<b><li>新概念介绍</b>", "clear": true },
			"ark_nnew2": {
				"name": "<li><font color=silver>[点击查看详细内容]</font>", "init": "1",
				"intro": "点我查看详细内容",
				clear: true,
				onclick: function () {
					game.showUpdateDialog("新概念");
				}
			},
			"ark_xian3": { "name": "—·—·—·—·—·—·—·", "clear": true },
			"ark_group": { "name": "<b><li>扩展交流群</b>", "clear": true },
			"ark_group2": {
				"name": "<li><font color=silver>[点击查看详细内容]</font>",
				"init": "1",
				"intro": "点我查看详细内容",
				"item": {
					"1": " ",
					"2": "<li>交流群：926335239（方舟：天灾之下）</font>"
				}
			},
			"disEnableCharacter": {
				"name": "禁选其他扩展武将",
				"intro": "开启后，将禁止AI选择其他扩展武将，关闭后恢复正常。", "init": false
			},
			"tzzx_changeHujia": {
				"name": "天灾护甲",
				"intro": "开启后，护甲扣减不再记入伤害结算<br/>（立即生效）",
				onclick: function (bool) {
					game.saveConfig('extension_天灾之下_tzzx_changeHujia', bool);
					game.saveConfig('tzzx_changeHujia', bool);
					if (lib.tzzx_originalChangeHp) {
						var str = lib.tzzx_originalChangeHp.toString();
						if (bool) eval(`lib.element.content.changeHp=function (){${str.slice(str.indexOf('//old part'))}`);
						else lib.element.content.changeHp = lib.tzzx_originalChangeHp;
					};
				},
			},
			'ark_backgroundpicture': {
				name: "切换背景图片",
				init: lib.config.ark_backgroundpicture !== undefined ? lib.config.ark_backgroundpicture : "origin",
				item: {
					'origin': '默认',
					'yanfengcheng': "盐风城",
					'pinghengyushiheng': '平衡与失衡',
					'yinqiangtianma': "银枪天马",
					'fengbaoliaowang': "风暴瞭望",
					'qie': "空运",
					'wuyeliuguang': "午夜流光",
					'tanchengxiangjian': "坦诚相见",
					'shuanglong': "双龙",
					'shengdi': "蔓珠院",
					'kaximier': "卡西米尔之夜",
					'kaximier2': "大骑士领",
					'lundinimu': "大烟花",
					'bg_lungmen_m': "龙门",
					'yurenhao': "愚人号",
					'xiudaoyuan': "修道院",
					'wangtinghuiyi': "王庭会议",
					'wenming': "文明",
					'saergongbuluo': "沙海",
					'eshen': "恶神",
					'huazhongshijie': "画中世界",
					'huanghun': "黄昏",
					'changyelinguang': "长夜临光",
					'shasha': "鲨鲨培养皿",
					'pinganxile': "平安喜乐",
					'kuyanshenghua': "枯焰生花",
					'yulintanxian': "雨林探险",
					'qiewuliu': "企鹅物流",
					'nianye': "年夜",
					'rujing': "入境",
					'longmeng': "企鹅物流2.0",
					'mingri': "明日",
					'sakazizhishang': "萨卡兹之殇",
					'yinglingdian': "卡兹戴尔英灵殿",
					'zuiciling': "醉辞令",
					'chongfeng': "重逢",
					'jiuribuyecheng': "旧日不夜城",
					'changyanguxiang': "长烟古巷",
					'bifang': "彼方",
					'shenhailieren': "踏入深海",
					'yingxiao': "影霄",
					'shendanliwu': "格雷伊的圣诞礼物",
					'shenyuheiye': "生于黑夜",
					'dianqiweixiu': "电路维护",
					'xiaoke': "很傻的狗，小刻哒哒哒！",
					'shidai': "时代",
					'xiongtuan': "乌萨斯学生自治团",
					'wuhou': "午后",
					'keyan': "莱茵生命",
					'latelan': "拉特兰",
					'linguang': "耀骑士临光",
					'fuchaozhixia': "覆巢之下",
					'xichao': "息潮的代价",
					'ganguiyunjiansu': "敢归云间宿",
					'nianxiling': "年、夕、令",
					'wugoushengxue': "吴钩胜雪",
					'sangzhong': "丧钟的王庭",
					'kuiyong': "歌者的最后幕台",
					'wangchao': "观潮",
					'falanxi': "光耀法兰西",
					'caodiyufengdi': "草地与风笛",
					'xinghai': "飞升星空",
					'longmengrichang': "龙门日常",
					'degou': "流浪狗",
					'guimingshasha': "归溟",
					'sanfenzhiyi': "三分之一",
					'shenpanguan': "花间",
					'jygy': "精英干员",
					'kaierxi': "凯尔希",
					'zhongmodi': "终末地",
				},
				onclick: function (item) {
					game.saveConfig('extension_天灾之下_ark_backgroundpicture', item);
					game.saveConfig('ark_backgroundpicture', item);
					game.arkBgp();
				}
			},
			'ark_backgroundMusicPicture': {
				name: "切换背景音乐",
				init: lib.config.ark_backgroundMusicPicture !== undefined ? lib.config.ark_backgroundMusicPicture : "origin",
				item: {
					//	'origin':'默认',
					'default': '默认（三国杀）',
					'kaier': '凯尔希小队（苦难摇篮）',
					'shalu': '杀戮之塔（怒号光明）',
					'shenchi': '深池（风暴瞭望）',
					'mande': '曼德拉（风暴瞭望）',
					'Kaltsit': 'Kal\'tsit（遗尘漫步）',
					'rudiguo': "如帝国之影（遗尘漫步）",
					'UnderTides': "UnderTides（覆潮之下）",
					'jiaotang': "教堂（覆潮之下）",
					'changye': '长夜临光（长夜临光）',
					'qianchang': "浅尝不止（猩红血钻）",
					'shenceng': "深层迷醉（猩红血钻）",
					'xinghong': "猩红血钻（猩红血钻）",
					'dixmu': "第■幕（猩红血钻）",
					'kuilei': "傀儡的狂喜（猩红血钻）",
					'shijiu': '诗酒乘兴（将进酒）',
					'suixiang': '岁相（将进酒）',
					'yuren': '愚人曲（愚人号）',
					'changxia': '长夏狂欢季（理想城）',
					'huangtie': '黄铁重铸（黄铁行动）',
					'ranhui': '燃灰不息（燃灰行动）',
					'qianfeng': '铅封将裂（铅封行动）',
					'guangpu': '光谱逸散（光谱行动）',
					'xunzhou': '寻昼燃炬（寻昼行动）',
					'songyan': '松烟留痕（松烟行动）',
					'yuanmo': '渊默潮涌（渊默行动）',
					'lghuanjue': '幻觉（黎光自制）',
					'lgjueze': '抉择（黎光自制）',
					'lgweixianbianyuan': '危险边缘（黎光自制）',
					'lgyinmou': '阴谋（黎光自制）',
					'0_00_01': '0_00_01',
					'Dash!': 'Dash！',
					'duanbingxiangjie': '短兵相接',
					'fengyuyulai': '风雨欲来',
					'jiaofeng': '交锋',
					'jinguishuangxue': '尽归霜雪',
					'lvtuqianfang': '旅途前方',
					'qibingtianzhui': '奇兵天坠',
					'jixingjun': '切尔诺伯格急行军',
					'renxing': '人性',
					'shengmingliu': '生命流',
					'shisirugui': '视死如归',
					'yateliyasi': '塔露拉_雅特利亚斯',
					'zhiqizhezhigu': '执棋者之骨',
					'zhongjvdikangzhe': '终局抵抗者',
				},
				onclick: function (item) {
					game.saveConfig('extension_天灾之下_ark_backgroundMusicPicture', item);
					game.saveConfig('ark_backgroundMusicPicture', item);
					game.broadcastAll(function (item) {
						game.lullabye(item);
					}, item);
				}
			},
			ark_derivation_card: {
				name: '衍生牌堆',
				intro: function () {
					return `开启后牌堆内将添加此扩展的<span style=text-decoration:underline; onclick="(function (){
						var rect=this.getBoundingClientRect(),get=(get||window.ark_clone_get),lib=(lib||window.ark_clone_lib),ui=(ui||window.ark_clone_ui);
						this._customintro=function (dialog){
							dialog.add('衍生牌');
							var i,card,j,buttons=ui.create.div('.buttons',dialog.content),create=function (item){
								card=ui.create.button(item,'vcard',buttons);
								lib.setIntro(card);
							},list=lib.card.ark_derivation_list;
							for(i in lib.card){
								if(lib.card[i].ark_derivation){
									if(list&&list[i]){
										if(get.is.object(list[i])){
											for(j in list[i]){
												create(Object.assign(list[i][j],{name:i}));
											};
										}
										else if(Array.isArray(list[i])){
											for(j of list[i]){
												create({name:i,suit:j[0],number:j[1],nature:j[2]});
											};
										};
									}
									else {
										create({name:i});
									};
								};
							};
						};
						if(ui)ui.click.intro.call(this,{
							clientX:rect.left+35,
							clientY:rect.top+15
						});
						 }).call(this)" 
					>衍生牌</span>并修改部分<span style=text-decoration:underline; onclick="(function (){
						var rect=this.getBoundingClientRect(),lib=(lib||window.ark_clone_lib),ui=(ui||window.ark_clone_ui);
						this._customintro=function (dialog){
							var i,card,j,buttons=ui.create.div('.buttons',dialog.content),create=function (item){
								card=ui.create.button(item,'vcard',buttons);
								lib.setIntro(card);
							},list=lib.card.ark_derivation_list;
							for(i in lib.card.ark_derivation_change){
								create({name:i});
							};
							buttons.cardMod={
								ark_derivation_card:function (name){
									var change=lib.card.ark_derivation_change;
									if(change&&change[name]&&change[name].info){
										return [get.translation(name),change[name].info];
									};
								}
							};
						};
						if(ui)ui.click.intro.call(this,{
							clientX:rect.left+35,
							clientY:rect.top+15
						});
						 }).call(this)">原版卡牌</span>(重启后生效)
				`;
				},
				onclick: function (item) {
					game.saveConfig('extension_天灾之下_ark_derivation_card', item);
					game.saveConfig('ark_derivation_card', item);
				},
			},
		}, package: {
			character: {
				character: {
				},
				translate: {
				},
			},
			card: {
				card: {
				},
				translate: {
				},
				list: [],
			},
			skill: {
				skill: {
				},
				translate: {
				},
			},
			intro: "<img style=width:238px src=extension/天灾之下/tzzx_001.jpg><div></img><ul><span style='font-family: yuanli'><li>当前版本:v1.26.1</span><li>在此特别感谢红枫制作组全体成员的不懈努力和3D各位朋友的鼎力支持！</ul></div>",
			author: "无冕黎明",
			diskURL: "",
			forumURL: "627208835",
			version: "1.26.9",
		}, files: { "character": [], "card": [], "skill": [] }
	};
}