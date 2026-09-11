// Leisure Lab - Outdoor Leisure Activities (5)
window.LEISURE_ACTIVITIES = window.LEISURE_ACTIVITIES || [];
window.LEISURE_ACTIVITIES.push(
{
  id: 'hiking',
  nameEn: 'Hiking',
  nameCn: '徒步',
  category: 'outdoor',
  shortIntroCn: '徒步是在自然步道上行走的活动，强度可调，适合亲近自然。',
  shortIntroEn: 'Hiking is walking on natural trails. The intensity is adjustable, and it is a great way to connect with nature.',
  introEn: 'Hiking means walking on trails in mountains, forests, or countryside. You can choose short, easy paths or longer, more difficult routes. It is one of the simplest outdoor activities — you just need comfortable shoes and a bottle of water. Hiking lets you see nature up close: trees, streams, rocks, and wildlife. Many people hike on weekends to escape busy city life and enjoy fresh air.',
  introCn: '徒步是在山间、森林或乡间小路上行走。你可以选择短而轻松的路线或更长更有难度的路线。这是最简单的户外活动之一——你只需要舒适的鞋子和一瓶水。徒步让你近距离接触自然：树木、溪流、岩石和野生动物。很多人在周末徒步以逃离忙碌的城市生活，享受新鲜空气。',
  howTo: {
    howCn: '选择适合体力的路线，携带水和少量食物，沿标记步道行走，控制速度，注意安全返回。',
    howEn: 'Choose a trail that matches your fitness, carry water and snacks, follow marked paths, control your pace, and return safely.',
    solo: 'both',
    locationCn: ['山区步道', '森林公园', '郊野绿道', '国家公园'],
    locationEn: ['mountain trails', 'forest parks', 'country greenways', 'national parks'],
    timeCn: '每次2-6小时，每月1-4次（参考）',
    timeEn: '2-6 hours per hike, 1-4 times per month (reference)',
    cost: 'low',
    costCn: '基本免费；徒步鞋约200-600元，部分景区门票约20-80元（参考）',
    costEn: 'Usually free; hiking shoes about 200-600 RMB; some parks charge 20-80 RMB entry (reference)',
    preparationCn: ['舒适的运动鞋或徒步鞋', '水壶', '防晒用品', '简单食物', '手机地图'],
    preparationEn: ['comfortable sports or hiking shoes', 'a water bottle', 'sunscreen', 'simple snacks', 'a phone with maps'],
    isReference: true
  },
  benefits: [
    {
      expressionEn: 'connects you with nature',
      expressionCn: '让你亲近自然',
      explanationCn: '在自然环境中行走可以远离电子屏幕和城市喧嚣，获得心理放松。',
      exampleEn: 'Every time I hike in the forest, I feel calmer and more focused for the rest of the week.',
      exampleCn: '每次在森林中徒步，我都觉得接下来的一周更平静、更专注。'
    },
    {
      expressionEn: 'builds stamina and leg strength',
      expressionCn: '增强耐力和腿部力量',
      explanationCn: '长时间行走尤其是上坡路段能有效锻炼下肢和心肺耐力。',
      exampleEn: 'After hiking every weekend for a month, I could walk up hills without stopping.',
      exampleCn: '每周末徒步一个月后，我能一口气走上坡了。'
    },
    {
      expressionEn: 'encourages social bonding',
      expressionCn: '促进社交联系',
      explanationCn: '徒步时可以和同伴长时间交流，是加深友谊的好方式。',
      exampleEn: 'My best conversations with friends always happen during long hikes together.',
      exampleCn: '我和朋友之间最好的对话总是发生在一起长途徒步时。'
    }
  ],
  vocabulary: [
    { en: 'trail', cn: '步道；小径' },
    { en: 'scenery', cn: '风景' },
    { en: 'steep', cn: '陡峭的' },
    { en: 'fresh air', cn: '新鲜空气' },
    { en: 'wildlife', cn: '野生动物' },
    { en: 'stamina', cn: '耐力' },
    { en: 'sunscreen', cn: '防晒霜' }
  ],
  exampleSentences: [
    { en: 'I go hiking in the mountains with my friends every month.', cn: '我每个月和朋友去山里徒步。' },
    { en: 'Hiking is a great way to escape the busy city for a day.', cn: '徒步是逃离繁忙城市生活一天的好方式。' },
    { en: 'Even a short hike can clear your mind and lift your mood.', cn: '即使是短暂的徒步也能让头脑清醒、心情变好。' }
  ],
  sampleAnswer: {
    textEn: 'My favourite leisure activity is hiking. I try to go hiking once a month with a small group of friends. We usually pick a mountain trail not too far from the city and spend half a day walking. I love hiking because every trail offers different scenery — streams, rocks, flowers, and sometimes wildlife. It is also a great workout without feeling like exercise. Hiking has helped me relax, make closer friends, and appreciate nature more.',
    textCn: '我最喜欢的休闲活动是徒步。我尽量每月和一小群朋友去徒步一次。我们通常选一条离城市不远的山间步道，走半天。我喜欢徒步是因为每条路线都有不同的风景——溪流、岩石、花朵，有时还有野生动物。它也是很好的锻炼，却不像在锻炼。徒步帮我放松、结交更亲密的朋友，也更加欣赏自然。（示例经历，可按本人情况修改）',
    isExample: true
  },
  notesCn: '注意：查看天气预报再出发，沿标记步道行走，携带足够饮水，不要独自进入无人区域。以上时间和费用为参考。',
  notesEn: 'Note: Check the weather before setting off, follow marked trails, carry enough water, and do not enter remote areas alone. Time and cost are for reference.'
},

{
  id: 'picnic',
  nameEn: 'Picnic',
  nameCn: '野餐',
  category: 'outdoor',
  shortIntroCn: '野餐是携带食物到户外就餐的活动，轻松愉快，适合社交。',
  shortIntroEn: 'A picnic is an outdoor meal where you bring food to a park or scenic spot. It is relaxed and social.',
  introEn: 'A picnic means packing food and drinks and eating them outdoors, usually in a park, by a river, or in a meadow. You do not need much — a blanket, some sandwiches, fruit, and drinks are enough. It is a wonderful way to enjoy good weather and spend time with family or friends. Many people add games, music, or a book to make the picnic even more enjoyable.',
  introCn: '野餐就是把食物和饮料带到户外就餐，通常在公园、河边或草地上。你不需要太多东西——一张毯子、三明治、水果和饮料就够了。这是享受好天气以及和家人朋友共度时光的好方式。很多人会加上游戏、音乐或一本书，让野餐更愉快。',
  howTo: {
    howCn: '准备便当和饮料，选好户外地点铺上毯子，用餐后整理垃圾不留痕迹。',
    howEn: 'Prepare food and drinks, find a nice outdoor spot, lay out a blanket, eat together, and clean up all trash afterward.',
    solo: 'group',
    locationCn: ['城市公园', '河边草地', '郊野绿地', '湖边'],
    locationEn: ['city parks', 'riverside meadows', 'country green spaces', 'lakeside areas'],
    timeCn: '每次2-4小时，每月1-2次（参考）',
    timeEn: '2-4 hours per picnic, 1-2 times per month (reference)',
    cost: 'low',
    costCn: '食物和饮料约30-100元/人，野餐毯约30-80元（参考）',
    costEn: 'Food and drinks about 30-100 RMB per person; a picnic blanket about 30-80 RMB (reference)',
    preparationCn: ['食物和饮料', '野餐毯', '一次性餐具', '垃圾袋', '防晒'],
    preparationEn: ['food and drinks', 'a picnic blanket', 'disposable or reusable utensils', 'trash bags', 'sunscreen'],
    isReference: true
  },
  benefits: [
    {
      expressionEn: 'is a simple way to relax outdoors',
      expressionCn: '是简单的户外放松方式',
      explanationCn: '野餐不需要复杂安排，在户外就餐就能让人放松心情。',
      exampleEn: 'Just lying on the grass after a picnic lunch made me feel completely relaxed.',
      exampleCn: '野餐午餐后躺在草地上让我感到完全放松。'
    },
    {
      expressionEn: 'brings people together',
      expressionCn: '增进人际感情',
      explanationCn: '在轻松的户外环境中用餐交谈，有助于增进彼此感情。',
      exampleEn: 'My classmates and I became much closer after a picnic together last spring.',
      exampleCn: '去年春天一起野餐后，我和同学变得更亲近了。'
    },
    {
      expressionEn: 'encourages time away from screens',
      expressionCn: '鼓励远离屏幕',
      explanationCn: '在户外野餐时通常不使用电子设备，有助于让眼睛和大脑休息。',
      exampleEn: 'During our picnic nobody looked at a phone — we just talked and played games.',
      exampleCn: '野餐时没有人看手机，我们只是聊天和玩游戏。'
    }
  ],
  vocabulary: [
    { en: 'blanket', cn: '毯子' },
    { en: 'meadow', cn: '草地' },
    { en: 'snacks', cn: '零食' },
    { en: 'scenic spot', cn: '风景点' },
    { en: 'disposable', cn: '一次性的' },
    { en: 'leftovers', cn: '剩菜剩饭' },
    { en: 'lay out', cn: '铺开' }
  ],
  exampleSentences: [
    { en: 'We had a lovely picnic in the park last Sunday.', cn: '上星期天我们在公园度过了愉快的野餐。' },
    { en: 'A picnic is a simple way to enjoy time outdoors with friends.', cn: '野餐是和朋友享受户外时光的简单方式。' },
    { en: 'Remember to take all your trash home after the picnic.', cn: '记得野餐后把所有垃圾带回家。' }
  ],
  sampleAnswer: {
    textEn: 'My favourite leisure activity is having a picnic. On sunny weekends, my friends and I pack some sandwiches, fruit, and drinks and go to a park by the river. We lay out a blanket, share food, and talk for hours. Sometimes we bring a deck of cards or a guitar. I love picnics because they are simple, cheap, and full of laughter. It is a break from screens and study, and a chance to enjoy nature and friendship at the same time.',
    textCn: '我最喜欢的休闲活动是野餐。在阳光明媚的周末，我和朋友们带上三明治、水果和饮料去河边公园。我们铺上毯子，分享食物，聊上几个小时。有时我们还带一副牌或一把吉他。我喜欢野餐因为它简单、便宜、充满笑声。这是远离屏幕和学习的休息，也是同时享受自然和友谊的机会。（示例经历，可按本人情况修改）',
    isExample: true
  },
  notesCn: '注意：选择天气晴好的日子，注意防晒和防虫，不留垃圾，在允许野餐的区域进行。以上时间和费用为参考。',
  notesEn: 'Note: Choose a sunny day, use sun protection and insect repellent, take all trash home, and picnic only in permitted areas. Time and cost are for reference.'
},

{
  id: 'camping',
  nameEn: 'Camping',
  nameCn: '露营',
  category: 'outdoor',
  shortIntroCn: '露营是在户外过夜的活动，体验自然生活和简单生活方式。',
  shortIntroEn: 'Camping is spending a night or more outdoors, experiencing nature and a simple way of living.',
  introEn: 'Camping means setting up a tent and sleeping outdoors, usually in a campsite or a national park. It is a way to slow down and live simply for a day or two. You cook simple meals, sleep in a sleeping bag, and wake up to birdsong. Camping can be a peaceful solo trip or a fun group adventure. It teaches you basic outdoor skills and helps you appreciate small comforts.',
  introCn: '露营是指在户外搭帐篷过夜，通常在营地或国家公园。这是一种放慢节奏、过简单生活一两天的方式。你做简单的饭菜、睡在睡袋里，伴着鸟鸣醒来。露营可以是宁静的独自旅行，也可以是有趣的团队冒险。它教你基本的户外技能，也让你更珍惜小小的舒适。',
  howTo: {
    howCn: '到达营地后搭帐篷，准备简单餐食，夜间注意保暖和安全，次日收拾营地不留痕迹。',
    howEn: 'Set up the tent on arrival, prepare simple meals, stay warm and safe at night, and leave no trace when packing up the next day.',
    solo: 'both',
    locationCn: ['商业露营地', '国家公园', '郊野营地', '湖边营地'],
    locationEn: ['commercial campsites', 'national parks', 'country camps', 'lakeside camps'],
    timeCn: '每次1-2晚，每季1-2次（参考）',
    timeEn: '1-2 nights per trip, 1-2 times per season (reference)',
    cost: 'medium',
    costCn: '帐篷约150-800元，睡袋约100-400元，营地费约0-100元/晚（参考）',
    costEn: 'A tent about 150-800 RMB; a sleeping bag 100-400 RMB; campsite fees 0-100 RMB per night (reference)',
    preparationCn: ['帐篷', '睡袋', '防潮垫', '食物和水', '头灯或手电', '保暖衣物'],
    preparationEn: ['a tent', 'a sleeping bag', 'a sleeping pad', 'food and water', 'a headlamp or flashlight', 'warm clothing'],
    isReference: true
  },
  benefits: [
    {
      expressionEn: 'builds outdoor survival skills',
      expressionCn: '培养户外生存技能',
      explanationCn: '搭帐篷、生火和户外烹饪是实用的生活技能。',
      exampleEn: 'I learned how to set up a tent and start a small camp stove during my first camping trip.',
      exampleCn: '第一次露营时我学会了如何搭帐篷和使用便携炉具。'
    },
    {
      expressionEn: 'helps you disconnect from screens',
      expressionCn: '帮助远离屏幕',
      explanationCn: '露营地通常没有网络，让人有机会远离电子设备。',
      exampleEn: 'During two days of camping, I did not check my phone once and felt much calmer.',
      exampleCn: '露营两天里我一次也没看手机，感觉平静了很多。'
    },
    {
      expressionEn: 'fosters appreciation for simple things',
      expressionCn: '培养对简单事物的感恩',
      explanationCn: '户外简单的生活让人重新认识到基本舒适和自然的价值。',
      exampleEn: 'After a night in a tent, a hot cup of tea felt like the most wonderful thing in the world.',
      exampleCn: '在帐篷里睡了一晚后，一杯热茶感觉像世界上最美好的东西。'
    }
  ],
  vocabulary: [
    { en: 'tent', cn: '帐篷' },
    { en: 'sleeping bag', cn: '睡袋' },
    { en: 'campsite', cn: '营地' },
    { en: 'campfire', cn: '篝火' },
    { en: 'headlamp', cn: '头灯' },
    { en: 'leave no trace', cn: '不留痕迹' },
    { en: 'pitch a tent', cn: '搭帐篷' }
  ],
  exampleSentences: [
    { en: 'We went camping by the lake for two nights.', cn: '我们在湖边露营了两晚。' },
    { en: 'Camping teaches you to live with fewer things.', cn: '露营教会你用更少的东西生活。' },
    { en: 'There is nothing like waking up to birdsong in a tent.', cn: '在帐篷里伴着鸟鸣醒来是无与伦比的。' }
  ],
  sampleAnswer: {
    textEn: 'My favourite leisure activity is camping. A few times a year, I go camping with my family at a site near a lake. We pitch our tent, cook simple meals on a small stove, and sit around a campfire at night. I love camping because it is so different from everyday life. There is no Wi-Fi, no homework, and no rush. I have learned how to set up a tent, cook outdoors, and appreciate small things like a warm sleeping bag on a cold night.',
    textCn: '我最喜欢的休闲活动是露营。每年有几次，我和家人去湖边的营地露营。我们搭帐篷、用小炉子做简单的饭、晚上围坐在篝火旁。我喜欢露营因为它和日常生活太不一样了。没有网络、没有作业、也不用赶时间。我学会了搭帐篷、户外做饭，也更加珍惜像寒冷夜晚里温暖睡袋这样的小事。（示例经历，可按本人情况修改）',
    isExample: true
  },
  notesCn: '注意：在指定营地露营，注意用火安全，查看天气预报，夜间注意保暖防虫。以上时间和费用为参考。',
  notesEn: 'Note: Camp in designated sites, follow fire safety rules, check the weather, and keep warm and protected from insects at night. Time and cost are for reference.'
},

{
  id: 'birdwatching',
  nameEn: 'Birdwatching',
  nameCn: '观鸟',
  category: 'outdoor',
  shortIntroCn: '观鸟是观察和记录野生鸟类的活动，培养观察力和耐心。',
  shortIntroEn: 'Birdwatching is observing and identifying wild birds. It develops patience and observation skills.',
  introEn: 'Birdwatching, or birding, means going outdoors to find, watch, and identify wild birds. You can do it in a park, a wetland, a forest, or even your own garden. All you really need is a pair of binoculars and a field guide or a birding app. Birdwatchers learn to recognize birds by their colors, size, shape, and songs. It is a calm, patient activity that makes you notice nature in a completely new way.',
  introCn: '观鸟是指到户外寻找、观察和识别野生鸟类。你可以在公园、湿地、森林甚至自家园子里进行。你只需要一副望远镜和一本鸟类图鉴或观鸟App。观鸟者学习通过颜色、体型、形状和鸣叫来辨认鸟类。这是一项宁静、需要耐心的活动，会让你以一种全新的方式注意自然。',
  howTo: {
    howCn: '带上望远镜和图鉴，在清晨或傍晚到鸟类聚集地安静等待观察，记录所见鸟种。',
    howEn: 'Bring binoculars and a guide, go to bird-rich areas in the early morning or evening, wait quietly, and record the species you see.',
    solo: 'both',
    locationCn: ['湿地公园', '森林公园', '湖边', '自然保护区'],
    locationEn: ['wetland parks', 'forest parks', 'lakesides', 'nature reserves'],
    timeCn: '每次1-3小时，每周1-2次（参考）',
    timeEn: '1-3 hours per session, 1-2 times per week (reference)',
    cost: 'low',
    costCn: '入门望远镜约50-200元，图鉴书约30-80元；多数观鸟地点免费（参考）',
    costEn: 'Entry binoculars about 50-200 RMB; a field guide book 30-80 RMB; most birding spots are free (reference)',
    preparationCn: ['望远镜', '鸟类图鉴或App', '笔记本', '舒适衣物', '耐心'],
    preparationEn: ['binoculars', 'a bird field guide or app', 'a notebook', 'comfortable clothing', 'patience'],
    isReference: true
  },
  benefits: [
    {
      expressionEn: 'develops patience and focus',
      expressionCn: '培养耐心和专注',
      explanationCn: '观鸟需要长时间安静等待，有助于锻炼耐心和注意力。',
      exampleEn: 'Birdwatching taught me to sit still and focus — I used to be much more restless.',
      exampleCn: '观鸟教会了我安静坐着和专注——我以前要坐不住得多。'
    },
    {
      expressionEn: 'deepens knowledge of nature',
      expressionCn: '加深对自然的了解',
      explanationCn: '识别不同鸟种促使你学习鸟类习性、生态和季节变化。',
      exampleEn: 'I can now identify over thirty bird species in my city, each by its song.',
      exampleCn: '我现在能辨认城市里三十多种鸟，每种都能通过叫声识别。'
    },
    {
      expressionEn: 'is calming and meditative',
      expressionCn: '让人平静和冥想',
      explanationCn: '在自然中安静等待和观察有助于减轻焦虑。',
      exampleEn: 'An hour of birdwatching feels like meditation — I always come back refreshed.',
      exampleCn: '一个小时的观鸟就像冥想，我回来时总是精神焕发。'
    }
  ],
  vocabulary: [
    { en: 'binoculars', cn: '望远镜' },
    { en: 'field guide', cn: '野外图鉴' },
    { en: 'species', cn: '物种' },
    { en: 'wetland', cn: '湿地' },
    { en: 'habitat', cn: '栖息地' },
    { en: 'migrate', cn: '迁徙' },
    { en: 'plumage', cn: '羽毛' }
  ],
  exampleSentences: [
    { en: 'I started birdwatching last year and I love it.', cn: '我去年开始观鸟，我很喜欢。' },
    { en: 'All you need is a pair of binoculars and a guide.', cn: '你只需要一副望远镜和一本图鉴。' },
    { en: 'The best time to see birds is early in the morning.', cn: '观鸟的最佳时间是清晨。' }
  ],
  sampleAnswer: {
    textEn: 'My favourite leisure activity is birdwatching. I started it last spring when I noticed colorful birds in the park near my home. Now I go birding almost every weekend, usually early in the morning. I bring a pair of binoculars and a notebook to record what I see. Birdwatching has taught me patience — you sometimes wait an hour to see one special bird. It has also made me notice seasons more, because different birds appear at different times of the year.',
    textCn: '我最喜欢的休闲活动是观鸟。去年春天我注意到家附近公园里有彩色的鸟，于是开始了观鸟。现在我几乎每周末去观鸟，通常在清晨。我带望远镜和笔记本记录所见。观鸟教会了我耐心——有时等一个小时才能看到一种特别的鸟。它也让我更关注季节变化，因为不同时节会出现不同的鸟。（示例经历，可按本人情况修改）',
    isExample: true
  },
  notesCn: '注意：不靠近或惊扰鸟类，不破坏栖息环境，在允许进入的区域观察。以上时间和费用为参考。',
  notesEn: 'Note: Do not approach or disturb birds, do not damage their habitat, and observe only in permitted areas. Time and cost are for reference.'
},

{
  id: 'stargazing',
  nameEn: 'Stargazing',
  nameCn: '观星',
  category: 'outdoor',
  shortIntroCn: '观星是在夜晚观察星空的活动，激发对宇宙的好奇心。',
  shortIntroEn: 'Stargazing is observing the night sky. It sparks curiosity about the universe.',
  introEn: 'Stargazing means going outside at night to look at the stars, the moon, and sometimes planets. You do not need a telescope to start — your eyes and a star map app are enough. The best spots are away from city lights, where the sky is truly dark. Stargazing is a quiet, peaceful activity that can make you feel small in a good way. It is also a wonderful excuse to sit outside on a clear, cool night.',
  introCn: '观星是指在夜晚到户外观察星星、月亮，有时还有行星。入门不需要望远镜——你的眼睛和一个星图App就够了。最佳地点是远离城市灯光、天空真正黑暗的地方。观星是一项安静平和的活动，会让你在好的意义上感到自己的渺小。它也是在晴朗凉爽的夜晚坐在户外的美好理由。',
  howTo: {
    howCn: '选择光污染少的地点，在晴朗夜晚用肉眼或望远镜观察，可用星图App辅助识别星座。',
    howEn: 'Choose a low-light-pollution spot, observe on a clear night with your eyes or a telescope, and use a star map app to identify constellations.',
    solo: 'both',
    locationCn: ['郊外空旷地', '山顶', '海边', '乡村'],
    locationEn: ['open countryside', 'hilltops', 'seaside', 'rural areas'],
    timeCn: '每次1-3小时，每月1-4次（参考）',
    timeEn: '1-3 hours per session, 1-4 times per month (reference)',
    cost: 'low',
    costCn: '肉眼即可入门；入门望远镜约100-500元；星图App多免费（参考）',
    costEn: 'You can start with your eyes; an entry telescope costs about 100-500 RMB; star map apps are often free (reference)',
    preparationCn: ['星图App', '望远镜（可选）', '保暖衣物', '躺椅或垫子', '手电（红色灯）'],
    preparationEn: ['a star map app', 'a telescope (optional)', 'warm clothing', 'a reclining chair or mat', 'a red-light flashlight'],
    isReference: true
  },
  benefits: [
    {
      expressionEn: 'sparks curiosity about science',
      expressionCn: '激发科学好奇心',
      explanationCn: '认识星座和行星会引发对天文学和宇宙的探索兴趣。',
      exampleEn: 'Stargazing made me curious about planets, so I started reading astronomy books.',
      exampleCn: '观星让我对行星产生了好奇，所以我开始读天文书。'
    },
    {
      expressionEn: 'is deeply calming',
      expressionCn: '让人深度平静',
      explanationCn: '安静仰望星空是一种令人放松和放慢节奏的体验。',
      exampleEn: 'Looking at the Milky Way on a dark night was the most peaceful moment of my year.',
      exampleCn: '在黑夜中仰望银河是我这一年最平静的时刻。'
    },
    {
      expressionEn: 'creates memorable shared experiences',
      expressionCn: '创造难忘的共同体验',
      explanationCn: '和朋友一起观星是独特而值得回忆的经历。',
      exampleEn: 'My friends and I still talk about the meteor shower we watched together last summer.',
      exampleCn: '我和朋友们到现在还在聊去年夏天一起看的流星雨。'
    }
  ],
  vocabulary: [
    { en: 'constellation', cn: '星座' },
    { en: 'telescope', cn: '望远镜' },
    { en: 'light pollution', cn: '光污染' },
    { en: 'the Milky Way', cn: '银河' },
    { en: 'meteor', cn: '流星' },
    { en: 'planet', cn: '行星' },
    { en: 'star map', cn: '星图' }
  ],
  exampleSentences: [
    { en: 'Stargazing is best done far from city lights.', cn: '观星最好在远离城市灯光的地方进行。' },
    { en: 'You can see several planets with just your eyes.', cn: '你用肉眼就能看到几颗行星。' },
    { en: 'Looking at the stars always makes me feel calm.', cn: '仰望星空总让我感到平静。' }
  ],
  sampleAnswer: {
    textEn: 'My favourite leisure activity is stargazing. On clear nights, I go to a hilltop near my home with a blanket and a star map app. I lie on my back and try to find constellations and planets. I started stargazing about a year ago, and it has completely changed how I see the night sky. It is a quiet, peaceful activity that makes everyday worries feel small. I have also learned the names of many stars and constellations, which makes me feel connected to the universe.',
    textCn: '我最喜欢的休闲活动是观星。在晴朗的夜晚，我带上一条毯子和星图App去家附近的山顶。我躺下来尝试寻找星座和行星。我大约一年前开始观星，它完全改变了我看夜空的方式。这是一项安静平和的活动，让日常烦恼显得渺小。我也学到了很多星星和星座的名字，让我感觉和宇宙有了联系。（示例经历，可按本人情况修改）',
    isExample: true
  },
  notesCn: '注意：夜间注意安全，不要独自去偏僻地点，注意保暖，使用红色灯光以保护夜视能力。以上时间和费用为参考。',
  notesEn: 'Note: Stay safe at night, do not go to remote places alone, keep warm, and use red light to protect your night vision. Time and cost are for reference.'
}
);
