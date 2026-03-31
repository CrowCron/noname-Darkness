window.tianzaizhixia_import(function (lib,game,ui,get,ai,_status){
	try {
		function char(name){
 			var str="";
 			if(isArray(name))for(var i of name)str+=char(i);
 			else {
 				if(!lib.character[name]||!isArray(lib.character[name]))throw name+"？，该武将不存在！";
 				str+=ui.create.button(name,"character").outerHTML;	
 			};
 			return str;
		};
		function card(name){	       
			var str="";
 			if(isArray(name))for(var i of name)str+=card(i);
 			else {
 				if(!lib.card[name]||!isObject(lib.card[name]))throw name+"？，该卡牌不存在！";
 				str+=ui.create.button(name,"vcard").outerHTML;
 			};	
 			return str;
		};
		function spaces(num){
			for(var i=0,str="";i<num;i++)str+="&nbsp;";
			return str;
		};
		function text(str,style){
			return "<div style='width:96%;left:2%;position:relative;"+style+"'>"+str+"</div>";
		};
		game.extUpdateImport({
  	  		name:"天灾之下",
   	 		update:"1.26.2",
			//align:"left",//左侧对齐，right右，center中，不填默认左
			//<font color=slategrey>戒律·深罪之槛——阿波尼亚</font>上线（崩崩崩 扩展联动武将）<br>
  	 		content:`
				${text(`<span style=font-size:36px;>〖天灾之下〗更新公告</span></div>`,"text-align:center;")}<br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.26.3</div>`)}<br>
				${text(`①初升艳阳——临光重做；<br>
				②迅登之铳——灰烬重做；<br>
				③极北之陷——霜华上线；<br>
				④殛海斫浪——贝纳尔多上线；<br>
				⑤歧衢决程——莱昂图索上线；<br>
				⑥竭黯辰焉——阿尔贝托上线；<br>
				⑦荒芜命途——拉普兰德上线；<br>
				⑧斩荆碎路——切利尼娜上线；<br>
				⑨出湍离尘——乔万娜上线；<br>
				⑩沸温难凉——瓦拉赫上线；<br>
				⑪泞沦腥雨——丹布朗上线；<br>
				⑫沉疴噤声——文上线；<br>
				⑬秩序之光——西西里夫人上线；<br>
				⑭此即秩序——阿格尼尔上线；<br>
				⑮头狼獠牙——子月上线；<br>
				⑯碧羽凌霄——霍尔海雅上线；<br>
				⑰多萝西【清界】【长风】可玩性调整；<br>
				⑱斐尔迪南【揣度】重做；<br>
				⑲帕尔维斯【辞心】削弱；<br>
				⑳封印部分体验下来并不好玩的角色。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.26.2</div>`)}<br>
				${text(`①冬桃开知否——梁洵上线；<br>
				②花语向枝头——宁辞秋上线；<br>
				③青雷伯——白定山上线；<br>
				④浮萍雨师——慎楼上线；<br>
				⑤谋事在人——左乐上线；<br>
				⑥天有洪炉——年上线；<br>
				⑦星藏点雪——夕上线；<br>
				⑧万象为宾——重岳上线；<br>
				⑨檐下听雨——乌有上线；<br>
				⑩乾远春归——桑葚上线；<br>
				⑪春江逢雪——仇白上线；<br>
				⑫貘拳破野——食铁兽上线；<br>
				⑬夜莺【静佑】削弱；<br>
				⑭渺海炬烛——流明&✪流明上线；<br>
				⑮涌潮悲歌——斯卡蒂重做；<br>
				⑯黑骑士与锈铜加强；<br>
				⑰云烁身捷——罗小黑上线；<br>
				⑱修复一些描述错误；<br>
				⑲凛冬【领袖】重做；<br>
				⑳新增部分背景图片、BGM以及干员语音。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.26.1</div>`)}<br>
				${text(`①轻岚渡岭——薄绿上线；<br>
				②旧章新曲——微风上线；<br>
				③萧萧难鸣——暴雨上线；<br>
				④砂中莹璞——蜜蜡上线；<br>
				⑤餮噬残沙——卡涅利安上线；<br>
				⑥滴滤涩香——别格勒上线；<br>
				⑦纵横恣肆——魏彦吾重做；<br>
				⑧江山作裘——太傅重做；<br>
				⑨不化磐石——大长老上线；<br>
				⑩遏北悍锋——阿克托斯上线；<br>
				⑪殚心竭虑——切斯特上线；<br>
				⑫三冠武王——锏上线；<br>
				⑬影隐翼伏——瓦莱丝上线；<br>
				⑭疏略豪行——古罗上线；<br>
				⑮浅见明思——菈塔托斯上线；<br>
				⑯智明无邪——休露丝上线；<br>
				⑰比翼连枝——尤卡坦上线；<br>
				⑱无垠纤尘——莫希上线；<br>
				⑲极昼捕手——极光上线；<br>
				⑳崖心新增技能【天涯】。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.26.0</div>`)}<br>
				${text(`①血荆王座——特雷西斯上线；<br>
				②赴烈不归——曼弗雷德上线；<br>
				③心芒影重——伊内丝重做；<br>
				④敛涛藏锋——赫德雷上线；<br>
				⑤死生枯荣——食腐者之王上线；<br>
				⑥粲世红莲——血魔大君上线；<br>
				⑦流漫陆离——变形者集群上线；<br>
				⑧纯白碎梦——夜莺上线；<br>
				⑨闪灵重做，称号改为：〖缁黯渺黎〗；<br>
				⑩阿米娅重做，称号改为：〖至善魔王〗；<br>
				⑪特蕾西娅重做，称号改为：〖芳卉皇冕〗；<br>
				⑫修复了塔露拉和切斯柏二技能可以重置的bug；<br>
				⑬白金重做，称号改为：〖弦上行路〗；<br>
				⑭星极【启明】重做；<br>
				⑮断罪者重做，势力现改为“米诺斯”，修改了部分存在歧义的技能描述；<br>
				⑯远牙【婉乐】增强；<br>
				⑰修复了老鲤【洞心】与银灰的一些bug；<br>
				⑱新增衍生牌堆功能，现在某些卡牌只有在开启此功能后才会加入游戏了；<br>
				⑲号角重做，修复OL护甲bug；<br>
				⑳伊芙利特【灼地】bug修复。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.9</div>`)}<br>
				${text(`①匠心独运——火神上线；<br>
				②西风之信——玫兰莎上线；<br>
				③炽盛光芒——天火上线；<br>
				④血祭血神——血骑士重做；<br>
				⑤血峰残月——赫拉格重做；<br>
				⑥棼霭炊香——古米上线；<br>
				⑦轻步淡渐——夜烟上线；<br>
				⑧阴渠秘灵——林雨霞重做；<br>
				⑨末日黄昏——史尔特尔重做；<br>
				⑩举目破败——切斯柏上线；<br>
				⑪<font color=slategrey>螺旋·愚戏之匣——维尔薇</font>上线（崩崩崩 扩展联动武将）；<br>
				⑫新增一个拉特兰小彩蛋；<br>
				⑬玛恩纳、白面鸮、夜烟语音实装；<br>
				⑭斐尔迪南与琴柳的体力下调至3点；<br>
				⑮优化莫斯提马的技能显示；<br>
				⑯新增一系列背景图片；<br>
				⑰调整薇薇安娜技能的显示顺序；<br>
				⑱补全了一部分角色的技能后缀；<br>
				⑲赫拉格势力现改为“乌萨斯”；<br>
				⑳新增OL护甲开关，失去护甲时不会再触发武将的卖血技能。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.8</div>`)}<br>
				${text(`①烁启长夜——阿丽娜重做；<br>
				②焰向光明——塔露拉上线；<br>
				③蜷隐喧市——伊桑上线；<br>
				④恶魔之吻——梅菲斯特重做；<br>
				⑤陌上花开——九上线；<br>
				⑥秽壤终裔——泥岩重做；<br>
				⑦引恨双生——碎骨上线；<br>
				⑧行莫移尘——弑君者上线；<br>
				⑨炽恸冬痕——霜星重做；<br>
				⑩不败战神——爱国者重做；<br>
				⑪赤领鬼——雷德上线；<br>
				⑫梦想火花——澄闪重做；<br>
				⑬丹书铁契——黛丝特上线；<br>
				⑭多萝西、sharp、赫拉格等语音实装；<br>
				⑮深海色的称号改为：〖聚瀚凝蜃〗；<br>
				⑯伊芙利特【灼地】加强；<br>
				⑰玛恩纳·临光【展锋】描述修改为和实际效果一致；<br>
				⑱莫斯提马、玫兰莎、伊桑、风笛、灰喉语音实装；<br>
				⑲修复了新概念描述页面的部分内容；<br>
				⑳令的体力上限提升为4。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.7</div>`)}<br>
				${text(`①赤焰无霾——菲亚梅塔重做；<br>
				②蚕轮时域——莫斯提马重做；<br>
				③光明乐园——伊万杰利斯塔十一世上线；<br>
				④二象折跃——白面鸮上线；<br>
				⑤孤星擎夜——斐尔迪南上线；<br>
				⑥独木成林——梅尔上线；<br>
				⑦固本活新——末药上线；<br>
				⑧役血砥锋——号角上线；<br>
				⑨凶吉莫问——老鲤上线；<br>
				⑩庭染秾芳——调香师上线；<br>
				⑪巍峨崇峻——山上线；<br>
				⑫爱国者增强，称号改动；<br>
				⑬深靛技能描述修复；<br>
				⑭银灰【韬略】增强；<br>
				⑮泥岩的称号改为：〖秽壤终裔〗；<br>
				⑯炎熔插画更换；<br>
				⑰林雨霞的称号改为：〖阴渠秘灵〗；<br>
				⑱调整了一些角色AI（或许有用？）；<br>
				⑲凛冬【号令】增强；<br>
				⑳红的技能名修改。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.6</div>`)}<br>
				${text(`①炳若日星——瑕光重做；<br>
				②巴别塔之恶灵——博士上线；<br>
				③荣辉之帜——琴柳上线；<br>
				④砂原之怒——Sharp上线；<br>
				⑤抱负恣睢——汉密尔顿上线；<br>
				⑥寤寐余音——格特鲁德上线；<br>
				⑦骓踏苍溪——格拉尼上线；<br>
				⑧波谲云诡——帕尔维斯上线；<br>
				⑨绿野幻梦——多萝西上线；<br>
				⑩菀枯何如——灵知上线；<br>
				⑪初雪【天威】修复；<br>
				⑫棘刺【故土】增强，描述修改；<br>
				⑬部分角色缺失的称号已补全；<br>
				⑭实装了部分角色的语音；<br>
				⑮部分技能的描述修改，现在会更加美观了；<br>
				⑯修复了一些会造成程序崩溃的bug；<br>
				⑰现在可以兼容手杀UI了；<br>
				⑱修复了因为武将包不自动开启导致首次导入扩展时更新公告出现错误的bug；<br>
				⑲调整了一些技能结算流程中的问题；<br>
				⑳移除深靛，爱国者等老将的技能优化修改提上日程。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.5</div>`)}<br>
				${text(`①吉兆显祥——九色鹿上线；<br>
				②执隼击苍——银灰上线；<br>
				③霜威轶漠——初雪上线（预备中）；<br>
				④人胜天高——崖心上线；<br>
				⑤焰淬狱火——炎熔上线；<br>
				⑥濯尘愈心——芙蓉上线；<br>
				⑦阿丽娜技能组重做；<br>
				⑧能天使技能组重做；<br>
				⑨阿赫茉妮技能组重做；<br>
				⑩凛冬、临光角色等语音实装；<br>
				⑪梅比乌斯技能组优化，称号改为逐火英桀统一版式；<br>
				⑫令的称号改为：〖卿饮尘寰〗；<br>
				⑬太傅等角色技能描述优化；<br>
				⑭临光【举耀】平衡性调整；<br>
				⑮星极【寰宇】可以通过点击牌来关闭页面了；<br>
				⑯风笛【闭膛】重做；<br>
				⑰修复一些会造成弹窗的bug；<br>
				⑱移除澄闪、傀影、菲亚梅塔；<br>
				⑲新增背景【大烟花】，背景页面的修改现在是永继了，不需要在重启时重新切换；<br>
				⑳新增BGM四首，感谢 黎光 扩展主的友情赞助。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.4</div>`)}<br>
				${text(`①权变筹捷——灰毫上线；<br>
				②挑灯看剑——艾丽妮上线；<br>
				③心芒影重——伊内丝上线；<br>
				④绘作无限天机——深海色重做；<br>
				⑤深渊守望——深靛上线；<br>
				⑥修复远牙动态描述错误；<br>
				⑦薇薇安娜和血骑士操作询问优化；<br>
				⑧伊内丝技能名更换，【观心】现在不会造成濒死插接了；<br>
				⑨菲亚梅塔技能名更换；<br>
				⑩临光技能组再次重做；<br>
				⑪玛恩纳【焕辉】增强；<br>
				⑫腐败凋零【郁怒】重做；<br>
				⑬瑟奇亚克技能组重做；<br>
				⑭修复了战车攻击范围丢失的bug；<br>
				⑮太傅觉醒条件修改；<br>
				⑯刻俄柏【寻蜜】修改；<br>
				⑰马丁【定风】强度再次回调；<br>
				⑱移除梅菲斯特。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.3</div>`)}<br>
				${text(`①秘焰深隐——阿赫茉妮上线；<br>
				②江山作裘——太傅上线；<br>
				③守暗待明——科瓦尔上线；<br>
				④篱壁困兽——瑟奇亚克上线；<br>
				⑤持筹握算——罗素上线；<br>
				⑥梅菲斯特【催化】加强，【活牧】删除多余效果，【梦乡】现在不可指定主公为目标；<br>
				⑦浮士德【寒芒】【默语】加强；<br>
				⑧霜星【残冬】的扣血机制优化，【冰环】加强；<br>
				⑨蔓德拉兼容性修改；<br>
				⑩伊芙利特【灼地】增强；<br>
				⑪移除干员斯卡蒂；<br>
				⑫林雨霞【灰尾】重做；<br>
				⑬铃兰【舞乐】再次重做；<br>
				⑭马科维茨【笃志】削弱；<br>
				⑮马丁【定风】强度回调；<br>
				⑯临光的技能组重做；<br>
				⑰焰尾【赤流】削弱；<br>
				⑱浊心斯卡蒂【无光】削弱；<br>
				⑲刻俄柏【佰刃】洗入牌堆的武器牌数量下调；<br>
				⑳新增联机背景页面，现在可以自由切换联机背景了。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.2</div>`)}<br>
				${text(`①伶牙俐齿——莫布上线；<br>
				②循故自封——泰特斯·白杨上线；<br>
				③伴风秋声——远牙上线；<br>
				④潜光隐耀——玛恩纳上线；<br>
				⑤炳若日星——瑕光上线；<br>
				⑥星星点灯——薇薇安娜上线；<br>
				⑦血祭血神——狄开俄波利斯上线；<br>
				⑧腐败凋零【郁怒】修改为“每回合限一次”；<br>
				⑨弗格瓦尔德【盘弓】修改为“明置一张类别不同的手牌”；<br>
				⑩远牙【簌飕】删除条件“若未均造成伤害”；<br>
				⑪罗伊【围镞】将条件“邻座均横置”改为“邻家均横置”（描述上并未进行修改）；<br>
				⑫恰尔内【权要·改】现在可以正常的因弃置转化【毒】而失去体力了；<br>
				⑬奥尔默·英格拉【凌轹】修改为“一至两张牌名字数共计X的牌”；<br>
				⑭阿米娅【黑冠】削弱，【不义】重做；<br>
				⑮爱国者【扼命】每回合限一次；<br>
				⑯凛冬【号令】【战吼】加强；<br>
				⑰大帝【摇滚】重做；<br>
				⑱闪击技能组重做；<br>
				⑲迷迭香【如愿】现在每回合限用一次；<br>
				⑳缪尔塞斯【隐水】调整。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.1</div>`)}<br>
				${text(`①霁月光风——鞭刃上线；<br>
				②永矢弗谖——野鬃上线；<br>
				③丹心碧血——杰米上线；<br>
				④夕惕朝乾——莫妮克上线；<br>
				⑤不立危墙——罗伊上线；<br>
				⑥飞鹰走马——弗格瓦尔德上线；<br>
				⑦铁马埋戈——马丁上线；<br>
				⑧涸辙腐草——腐败凋零上线；<br>
				⑨处官言权——麦基上线；<br>
				⑩沐猴而冠——奥尔默上线；<br>
				⑪幕台傀偶——恰尔内上线；<br>
				⑫相须而行——马科维茨上线；<br>
				⑬游侠骑士——托兰上线；<br>
				⑭剑走偏锋——龙舌兰上线；<br>
				⑮焰尾技能组重做，临光技能组加强；<br>
				⑯刻俄柏体力上限下调；<br>
				⑰星极优化【寰宇】的描述与消耗，添加AI；<br>
				⑱澄闪【寸梦】重做；<br>
				⑲卡夫卡技能现在不会再错误地提供回合；<br>
				⑳背景和BGM现在可根据个人喜好在一定范围内更换。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.25.0</div>`)}<br>
				${text(`①焉有火光——星极上线；<br>
				②魏彦吾【捭阖】判定牌选取bug修复；<br>
				③战车【重武】削弱；<br>
				④红豆【激浪】修复决斗时不限次数的bug，酒单独计算次数；<br>
				⑤爱国者觉醒后摸牌数减少至3；<br>
				⑥大帝【摇滚】历史遗留bug修复，描述与效果不对应问题修复，额外增加了摸牌数；<br>
				⑦文月【同心】描述问题与实际生效时间改为“直到你下个回合开始前”；<br>
				⑧阿米娅【奔夜】等一系列技能描述优化；<br>
				⑨修复了阿丽娜【止恨】无限被刀bug；<br>
				⑩修复了缪尔塞斯死亡后，标记单方面提供负面效果的bug；<br>
				⑪铃兰【舞乐】重做，【九尾】牌现在对其他角色不可见；<br>
				⑫焰尾、临光技能组重做；<br>
				⑬斯卡蒂、浊心斯卡蒂与伊芙利特中文语音已经实装；<br>
				⑭浊心斯卡蒂【无光】历史遗留bug修复，摸牌不再会额外多出一张；<br>
				⑮菲亚梅塔【残恨】削弱；<br>
				⑯刻俄柏【佰刃】武器牌计入使用次数的bug修复；【寻蜜】大改；<br>
				⑰拓拉【天途】削弱；<br>
				⑱莫斯提马与令的AI优化；<br>
				⑲干员稀有度等级部分划分（十周年UI可见）；<br>
				⑳干员换肤系统部分实装（千幻聆音可见）。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.24.6</div>`)}<br>
				${text(`①蚕轮时域——莫斯提马上线；<br>
				②能天使AI优化；<br>
				③请不要使用蔓德拉与梅菲斯特联机，以免发生夺舍事件；<br>
				④白金【残心】加强；<br>
				⑤阿米娅【黑冠】加强，【不义】重做；<br>
				⑥迷迭香【如愿】加强；<br>
				⑦实装白金、迷迭香、能天使、令、澄闪、菲亚梅塔、傀影语音。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.24.5</div>`)}<br>
				${text(`①挑灯问梦——令重做技能组；<br>
				②临光、水月、史尔特尔、红暂时禁用，会在之后的版本中重做技能组；<br>
				③赫默【喷雾】削弱；<br>
				④红豆【激浪】削弱；<br>
				⑤魏彦吾、文月夫妇的技能组重做。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.24.4</div>`)}<br>
				${text(`①<font color=green>吞噬星空——梅比乌斯</font>上线（不，这里不是崩三，你走错地方了蛇蛇）；<br>
				②万物一府——迷迭香上线；<br>
				③烁启长夜——阿丽娜上线；<br>
				④明台非空——嵯峨上线；<br>
				⑤缪尔塞斯【隐水】【粼粼】削弱；<br>
				⑥修复蔓德拉【石骸】联机错误。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.24.3</div>`)}<br>
				${text(`①不霁何虹——灰烬上线；<br>
				②刹那光华——闪击上线；<br>
				③机枪壁垒——战车上线；<br>
				④掘墓岩鬼——蔓德拉上线；<br>
				⑤修复爱国者【扼命】无损拼点。<br>
				⑥菲亚梅塔技能组重做；<br>
				⑦棘刺【故土】觉醒条件修改；<br>
				⑧赫默体力上限减少。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.24.2</div>`)}<br>
				${text(`①赤焰无霾——菲亚梅塔上线；<br>
				②奈非天——塞西莉亚上线；<br>
				③可攻城厦——风笛上线；<br>
				④爱国者技能组重做；<br>
				⑤刻俄柏、白金增强；<br>
				⑥红豆、断罪者削弱；<br>
				⑦闪灵AI错误和断罪者伤害平方问题已修复。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.24.1</div>`)}<br>
				${text(`①末日黄昏——史尔特尔上线；<br>
				②初升艳阳——临光上线；<br>
				③镜中虚影——傀影上线；<br>
				④现在已经有部分罗德岛干员语音实装；<br>
				⑤修复了深海色【旧日】的判定检索；<br>
				⑥浊心斯卡蒂【殊途】现在会根据你移去的标记数摸等量的牌了（其实反而多了一张）。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.24.0</div>`)}<br>
				${text(`①秽壤的血脉——泥岩上线；<br>
				②赤焰红松鼠——焰尾上线；<br>
				③斑羽飘布——赫默上线；<br>
				④幻海潮什——缪尔塞斯上线；<br>
				⑤修复了部分bug；<br>
				⑥大帝摸牌数调整。`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.23.7</div>`)}<br>
				${text(`①天马视域——白金上线；<br>
				②感染者之盾——爱国者上线；<br>
				③织雨寻晴——灰喉上线；<br>
				④长路独行——刻俄柏上线；<br>
				⑤乱世巨星——大帝上线。<br>
				⑥镜花水月——水月上线；<br>
				⑦涌潮悲歌——斯卡蒂上线；<br>
				⑧梅菲斯特技能组重做`,"text-align:left;")}<br><br>
				${text(`<div style=font-size:22px;left:5%;position:relative;>v1.23.2</div>`)}<br>
				${text(`①坚城铁律——塞雷娅上线；<br>
				②炎魔共主——伊芙利特上线；<br>
				③卡夫卡原二技能【悬剪】现已重做；<br>
				④特雷西斯再次移除；<br>
				⑤已知闪灵AI弹窗问题；<br>
				⑥断罪者削弱；<br>
				⑦赫拉格增强。`,"text-align:left;")}<br><br>
  	 		`,
		});
		game.extUpdateImport({
 	   		name:"新概念",
			align:"left",//左侧对齐，right右，不写默认居中
  	 		content:`		
		 	  	${text(char("ark_mandela"),"text-align:center;")}
		 	  	<br>
				${text('—封锁—<br>“直到技能规定的时机，不能使用、打出、或主动弃置被封锁的牌。若技能中未规定失效时机，则默认为直到该角色下次受到伤害前。”',"text-align:center;")}
				<br>
				${text(char("ark_teleixiya"),"text-align:center;")}
				<br>
				${text('—明置—<br>“一般指明置手牌。明置即此牌对所有角色均可见，直到其进入弃牌堆或离开一名角色的手牌区才会失去明置状态，之后即使因为某些角色的技能（如张昭张纭〖固政〗）而返回非弃牌堆区域或游戏中，也不会重新回到明置状态。牌堆中明置的牌进入手牌区后仍然可见，不会因此暗置。场上正面朝上的牌，即装备牌和延时锦囊牌，也属于明置牌。”',"text-align:center;")}
				<br>
				${text(char("ark_paerweisi"),"text-align:center;")}
				<br>
				${text('—致命—<br>“当一名角色受到伤害时，若此伤害大于或等于其当前的体力值，则为致命伤害。”',"text-align:center;")}
				<br>
			
				${text(char("ark_shierteer"),"text-align:center;")}
		 	  	<br>
				${text('—检索—<br>“从给定的区域中顺序查找一张指定的牌，如果没有查找到，则称“检索失败”。<br/>如果没有给定牌的去向，默认由发起者获得之。<br/>若没有描述给定区域，将按照牌堆、弃牌堆、场上的顺序依次查找。”',"text-align:center;")}
				<br>
			
				${text(char("ark_tiaoxiangshi"),"text-align:center;")}
				<br>
				${text('—中央区—<br>“指于当前进行回合的角色的回合内置入弃牌堆的牌的集合的所在区域，可以看成弃牌堆的一个子集，即任何涉及到“弃牌堆”的操作会同时考虑到中央区和真正的弃牌堆，而涉及到“中央区”的操作则不会考虑到“真正的”弃牌堆。”',"text-align:center;")}
				<br>
				${text(char("ark_Amy"),"text-align:center;")}
				<br>
				${text('—进攻/防御距离—<br>“进攻/防御距离是关于角色间距离计算的概念。<br/>①每名角色的初始进攻/防御距离均为0<br/>②一名角色每有1点进攻/防御距离,其与除其外的角色/除其外的角色与其计算距离时便-1/+1。”',"text-align:center;")}
				<br>
				${text(char("ark_miuersaisi"),"text-align:center;")}
				<br>
				${text('—即时牌—<br>“即时牌是对多种牌的一种合称,与非即时牌对应。<br/>①即时牌的范围:所有基本牌、所有普通锦囊牌。<br/>②非即时牌的范围:所有装备牌、所有延时锦囊牌。”',"text-align:center;")}
				<br>
				${text(char("ark_mositima"),"text-align:center;")}
				<br>
				${text('—重置技—<br>““重置技”是一种技能标签类型。带有“重置技”标签的技能拥有如下特点:<br/>①技能包含至少两个分支选项;②每个分支选项的可选择次数均为1。<br/>③每个分支选项均被选择过后,所有分支选项的可选择次数均恢复至1。”',"text-align:center;")}
				<br>
				${text(char("ark_meibiwusi"),"text-align:center;")}
				<br>
				${text('—转移—<br>“转移是将一名角色的技能交给另一名角色的操作。<br/>成为技能转移目标的角色失去被转移的技能,然后发起转移者令一名没有该技能的角色获得之。”',"text-align:center;")}
				<br>
				${text(char("ark_fugewaerde"),"text-align:center;")}
				<br>
				${text('—主要阶段—<br>“主要阶段是一种合称;摸牌阶段、出牌阶段、弃牌阶段均为主要阶段。”',"text-align:center;")}
				<br>			
				
  	 		`,
   			/*
   			写在content内
			<br>换行
			${char(武将名)}添加武将牌
			${card(卡牌名)}添加卡牌
			*/
   		});
   	}
   	catch(e){  		
   		if(!e.stack){
   			var e={
   				stack:e,
   			};
   		};
   		if(lib.config.tzzxbEtx?e.stack!=lib.config.tzzxbEtx:true){
   			alert("天灾之下\n更新公告代码语法有错误，请仔细检查:\n"+e.stack);
   			game.saveConfig("tzzxbEtx",e.stack);
   		};
	}
});
/*
${text(`<div style=font-size:22px;left:5%;position:relative;>v1.26.0</div>`)}<br>
${text(`①血荆王座——特雷西斯上线；<br>
②赴烈不归——曼弗雷德上线；<br>
③——w上线；<br>
④敛涛藏锋——赫德雷上线；<br>
⑤死生枯荣——食腐者之王上线；<br>
⑥粲世红莲——血魔大君上线；<br>
⑦流漫陆离——变形者之王上线；<br>
⑧——logos上线；<br>
⑨纯白碎梦——夜莺上线；<br>
⑩；<br>
⑪特蕾西娅重做，称号改为：〖芳卉皇冕〗；<br>
⑫伊内丝【通明】重做；<br>
⑬；<br>
⑭；<br>
⑮断罪者势力现改为“米诺斯”；<br>
⑯；<br>
⑰；<br>
⑱；<br>
⑲；<br>
⑳。`,"text-align:left;")}<br><br>

	${text(char("ark_xmk"),"text-align:center;")}
		 	  	<br>
				${text('—吸取—<br>“吸取是一种缩写：令目标失去X点体力，然后执行者回复X点体力。”',"text-align:center;")}
				<br>

	${text(char("ark_mila"),"text-align:center;")}
		 	  	<br>
				${text('—施法—<br>“施法时，设施法等级X和施法倒计时Y为你声明的一个不大于3的正整数。<br/>每个“回合结束时”时机Y减1，当Y减至0时执行施法效果。”',"text-align:center;")}
				<br>
				${text(char("ark_kanielian"),"text-align:center;")}
		 	  	<br>
				${text('—蓄势—<br>“蓄势技”是一种技能标签类型。<br/>带有“蓄势技”标签的技能拥有如下特点:①可发动次数为1,牌堆重洗后恢复至1;<br/>②出牌阶段，若你的蓄势技已发动且本轮未发动过，你可以弃置三张牌，恢复可发动次数至1。”',"text-align:center;")}
				<br>
*/