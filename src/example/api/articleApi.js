/**
 * 文章相关接口
 * @Author: ${USER}
 * @Date: ${DATE} ${TIME}
 * @Project: ${PROJECT_NAME}
 */
// import http from '../../api/http';
//
// export default {
//   fetchArticleList: params => http.get(`/article`, params), //获取文章列表
//   fetchArticle: id => http.get(`/article/${id}`), //获取文章详情
//   removeArticle: id => http.delete(`/article/${id}`), //删除文章
//   pushArticle: (id, params) => {
//     if (id) return http.patch(`/article/${id}`, params); //修改文章
//     return http.post(`/article`, params); //添加文章
//   },
//   updateArticleIsFeatured: (id, params) => http.patch(`/article/${id}/isFeatured`, params), //是否精选
//   updateArticleIsCurrentPageCarousel: (id, params = {}) => http.patch(`/article/${id}/isCurrentPageCarousel`, params), //是否本页轮播
//   updateArticleIsHomepageCarousel: (id, params = {}) => http.patch(`/article/${id}/isHomepageCarousel`, params), //是否首页轮播
//   updateArticleIsRecommend: id => http.patch(`/article/${id}/isRecommend`), //是否置顶
//   updateArticleState: (id, params = {}) => http.patch(`/article/${id}/state`, params), //审核文章
//
//   //投稿类型
//   fetchAllArticleCategoryList: params => http.get(`/manager/article/category/all`, params), //文章分类所有列表
//
//   fetchArticleComment: id => http.get(`/article/comment/${id}`), //获取评论列表
//   removeArticleComment: id => http.delete(`/comment/${id}`), //删除评论
//   removeArticleCommentReply: id => http.delete(`/reply/${id}`), //删除评论回复
// };

export default {
  fetchArticleList: () => new Promise(resolve => {
    setTimeout(() => resolve({
      'data': {
        'list': [
          {
            'author': '漂洋过海',
            'comments': 0,
            'content': '<p>作者：张小凡</p><p>链接：https://www.zhihu.com/question/321691735/answer/663602952</p><p>来源：知乎</p><p>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p><p><br></p><p>灭霸原本就是一个坦度和输出兼备的泰坦人，如果说一般角色只有六个装备槽，那他有12个。</p><p>横向对比来看，即使健壮如浩克，也是在经过很长一段挣扎之后才打响了手套的响指，并且在之后重伤，在得到钢铁侠的治疗之后，虽不致死，但也倒地不起。</p><p>反观复联3中的灭霸，集齐六颗宝石后，当即有一个力量反噬的过程，但他很快就能适应并驾驭，在被雷神斧子砍中的情况下，依然能淡然的打响响指。</p><p><img src="https://pic2.zhimg.com/v2-42bfa5b2b47183e748ec95e95b4cf607_b.jpg" width="2048"></p><p>并且在复联4的开头我们得知，灭霸之后又再次打响了响指，将原石销毁。我想他大概是目前为止出现的人物中，唯一一个能在短时间内两次利用无限手套打响指，还依旧能种田采茶的人物（惊奇队长未知，不做讨论。）</p><p>由此可见，灭霸的体格不是一般的强悍。</p><p>一般的物理和魔法攻击，他都可以单手抗下，回想复联3中，灭霸时常被限制使用宝石的那段战斗，众英雄已然倾尽全力，而灭霸只是一句，“All that for a drop of blood?”</p><p><img src="https://pic4.zhimg.com/v2-03fb391fd764ea9eda7dcf072689227a_b.jpg" width="2048"></p><p>回到复联4中，三英战吕布。雷电、脉冲、盾牌，对于灭霸而言都无法造成致命伤，只能短暂的压制灭霸，强如雷神和钢铁侠新战甲的组合技，也被灭霸强行抗下。可以说，能打得动灭霸的，只有雷神的风暴战斧。奈何此时的雷神只是一个拥有一整块腹肌的死肥宅，千钧一发召唤来的斧子还被灭霸给抓住了。</p><p>另外，灭霸的武器也值得一说，在原著漫画中似乎并没有出现过，暂且称他为双刃刀，材质不详，但就凭他能把美队的盾牌砍废，其坚硬程度可见一斑，同时我们不妨大胆的作出推测，倘若灭霸身披的战甲也是同款材质，那真的是一个很逆天的存在了，也难怪三巨头歇斯底里，也难伤他分毫</p>',
            'cover': '',
            'group': { 'id': 12, 'name': '企业访谈' },
            'id': 18,
            'isCurrentPageCarousel': 0,
            'isFeatured': 0,
            'isHomepageCarousel': 0,
            'isPlatform': 1,
            'media': '',
            'praises': 0,
            'publishTime': 1557021890000,
            'service': 'S013',
            'serviceId': 'S013',
            category: { 'id': 12, 'name': '电影' },
            'shares': 0,
            'state': 'CERTIFICATION_PASS',
            'title': '为什么复联4中的灭霸变强了？',
            'type': 'NOTE',
            'views': 1
          },
          {
            'author': '漂洋过海',
            'comments': 0,
            'content': '<p>谢邀。最近怎么老邀我，不过这是一个有趣的问题。</p><p>问题的关键有两点：一，不改变整体故事框架；二，单指《复仇者联盟4》。</p><p>先说第二点，强调《复仇者联盟4》，那么讨论的重点就应该围绕这部电影，而不是过多地笼统回答，把《复仇者联盟4》换成3、2、1，甚至《钢铁侠》《美国队长》之类都行。</p><p>那么，《复仇者联盟4》是怎样一部电影？一部优秀的商业电影，商业电影最直接的就是盈利，不过很重要的一点，从1到4，每一部票房都获得巨大成功。不像有些系列电影，票房是波动的，或波动上升，或下降，或稳定。这就像一个项目每一个周期都在赚大钱。</p><p>那么前三部都是大好的情况下，系列商业电影对导演的选择，会从合适，划算，慢慢地偏向更好，可以说资本的选择都是求稳的。再找个一个合适的平衡点后，选择了罗素兄弟。</p><p>但资本这块算盘打得好，导演个人不一定接受。举个极端的例子，国内足球俱乐部，引进C罗梅西内马尔、莫德里奇德布劳内博格巴、瓦拉内拉莫斯佩佩之类（随便举的，球迷不要激动）是不是最好的？但有两点，愿意出这个钱吗？对方有这个意愿吗？</p><p>一个导演，去导一部电影是有钱的成分，但这是个从0-100的区间，不是所有导演都100%为了钱，类似的行业也是如此。而且随着个人的命运不同，这个百分比是波动的。这就很自然地引出另一点：</p><p>在不改变整体框架下，谁的掌控力更好?掌控力这词用得很精准，避免了不必要的麻烦。那么我们就来分析这个前提。</p><p>《复仇者联盟4》是怎样一个故事框架？一帮各具特色，分分合合的角色打倒反派的故事。</p><p>诺兰，很多人肯定会想到，确实，诺兰毫无疑问是当代能把商业与艺术结合得最好的导演，没有之一。但你看了他很多电影，从《追随》到《记忆碎片》到《致命魔术》到“蝙蝠侠系列”到《盗梦空间》到《星际穿越》到《敦刻尔克》，“悬疑”二字是离不开的，诺兰的电影是让观众去想而后再爽，而《复仇者联盟4》是让观众直接去爽，大致就是钓鱼和吃鱼的区别。我不否仍诺兰有重新解构的能力，但他肯定没有这个精力，大量剧情的联系和彩蛋的安排势必拖垮他。另外一点，他喜欢弱化绝对的对与错，正反派的对立，很可能无法引起大量吃瓜群众简单粗暴的情感共鸣。</p><p>温子仁，有《速度与激情7》《海王》的试水，从这两部电影中可以看到他的一些亮点，但与这种系列团队，磨合得还不够，抛去故事上的因素，整体的风格不算太统一，而《复4》势必要一次酣畅淋漓的爽快，对风格的统一有极高的要求。</p><p>其他不太合适的大概也是这个思路，那我们来想象到底什么样的可以做得更好？</p><p>大致有三种：一，更稳定能力更高；二，在故事框架上即使有很大的限制，保障说得过去，还也能玩出花来；三，本身就不太擅长或者喜欢在故事框架上做文章，其他方面很强，这么一来反而是好事。</p><p>马修沃恩，《X战警：第一战》导演编剧，《X战警：逆转未来》编剧，《王牌特工》1，2导演编剧制片人，《海扁王》导演编剧制片人。其实类似的其他系列的导演也有比罗素兄弟强的，比如《钢铁侠》1，2的导演，乔恩费儒。对这类感兴趣的自己可以去总结和对比，每个人的精力和方面都是有限的，这不是我专攻的方向。</p><p>我们不妨也考虑考虑中国的导演，说不准，这种商业电影哪一天在资本的运作下启用我国导演了？毕竟商业电影就是商品，从资本的角度，能更赚钱的商品就是好商品。我们不仅要留意在高科技领域的发展，这种文化商品也是可以赚很多外币的。从电影史来看，美国在出口商业影片方面做了相当大的文章，从大局的角度考虑，这不是好不好看的问题，这是可以为国家赚钱，使国家强大的问题。但目前而言，中国大陆靠电影出口赚钱，相比之下总量上有多少了？</p><p>引进比制作赚钱，资本下就会引进，当引进大于制作，国内电影市场就陷入恶性循环，一两部叫座不过是杯水车薪……额，扯远了，回到本问题。</p><p>张艺谋，陈凯歌：想想《无极》和《满城尽带黄金甲》，还会有那么强烈的批评吗？最起码这是那一代导演的觉悟，想做点和美国抗衡的商业电影，只是失败了而已，对比现在同类电影，骨子里有这种觉悟吗？压根就是想赚甚至骗自己人的钱。张艺谋强烈的中国风格不一定被西方普通观众接受，尤其是他对色彩的执着，《影》也只是表演上的突破而已。相比之下，陈凯歌更合适一点，近期的《妖猫传》，抛去故事框架，单论导演把控还是不错的，另外我们不要忽略这两位在导演生涯上的尝试，比如《山楂树之恋》《搜索》。</p><p>姜文，成也风格，败也风格，离开风格，注定败北。</p><p>徐克，他是一个爱玩敢玩，一直玩下去的导演，从《蜀山传》的大胆尝试，到《七剑》，到《龙门飞甲》，甚至《智取威虎山》，又到《狄仁杰系列》，老顽童一般，对视觉刺激、新鲜玩意的追求孜孜不倦，可以说如果《复4》考虑中国导演，他是不二人选了。特别是在本问题下的在整体故事框架不变的情况下。另外，他的兼容性也比张艺谋和陈凯歌好点。</p><p>其实就国内观众而言，这三导演导《复仇者联盟4》，肯定各有特色各有看点。但如果考虑全球观众，徐克更国际化，更富娱乐性。</p><p>最后美国搞这种电影最大的目的就是为了赚钱，没必要盲目吹捧，我们要学习的是这种赚钱的态度：有一定的品质保障。说点有些人不爱听的，《复仇者联盟4》好看，我十分赞同，但本质就是一个很好的玩具而已，没必要夸大它的内核和真正价值，搞得好像离不开似的，也听不进反对意见。世界很大，有趣的事很多，如何发现，靠自己喽。</p>',
            'cover': '',
            'group': { 'id': 9, 'name': '上岸经验' },
            'id': 12,
            'isCurrentPageCarousel': 0,
            'isFeatured': 0,
            'isHomepageCarousel': 0,
            'isPlatform': 1,
            'media': '',
            'praises': 0,
            'publishTime': 1557020775000,
            'service': 'S012',
            category: { 'id': 12, 'name': '音乐' },
            'serviceId': 'S012',
            'shares': 0,
            'state': 'CERTIFICATION_PASS',
            'title': '在不改变《复仇者联盟4》整体故事框架的情况下，你觉得哪位导',
            'type': 'NOTE',
            'views': 0
          },
          {
            'author': '漂洋过海',
            'comments': 0,
            'content': '<h2><br></h2>',
            'cover': 'https://dayukeji-test.oss-cn-beijing.aliyuncs.com/p18001/dev/manager/image/1556961903643-632080269.png',
            'group': { 'id': 15, 'name': '人物访谈' },
            category: { 'id': 12, 'name': '直播' },
            'id': 11,
            'isCurrentPageCarousel': 0,
            'isFeatured': 0,
            'isHomepageCarousel': 0,
            'isPlatform': 1,
            'media': '',
            'praises': 0,
            'publishTime': 1556961966000,
            'service': 'S014',
            'serviceId': 'S014',
            'shares': 0,
            'state': 'CERTIFICATION_PASS',
            'title': '窦唯为什么说红磡演唱会是场阴谋?',
            'type': 'NOTE',
            'views': 2
          },
          {
            'author': '漂洋过海',
            'comments': 0,
            'content': '<h2><br></h2>',
            'cover': 'https://dayukeji-test.oss-cn-beijing.aliyuncs.com/p18001/dev/manager/image/1556961903643-632080269.png',
            'group': { 'id': 15, 'name': '人物访谈' },
            category: { 'id': 12, 'name': '直播' },
            'id': 43,
            'isCurrentPageCarousel': 0,
            'isFeatured': 0,
            'isHomepageCarousel': 0,
            'isPlatform': 1,
            'media': '',
            'praises': 0,
            'publishTime': 1556961966000,
            'service': 'S009',
            'serviceId': 'S009',
            'shares': 0,
            'state': 'CERTIFICATION_PASS',
            'title': '雷神胖的跟猪一样?',
            'type': 'NOTE',
            'views': 2
          },
          {
            'author': '漂洋过海',
            'comments': 0,
            'content': '<h2><br></h2>',
            'cover': 'https://dayukeji-test.oss-cn-beijing.aliyuncs.com/p18001/dev/manager/image/1556961903643-632080269.png',
            'group': { 'id': 15, 'name': '人物访谈' },
            category: { 'id': 12, 'name': '直播' },
            'id': 32,
            'isCurrentPageCarousel': 0,
            'isFeatured': 0,
            'isHomepageCarousel': 0,
            'isPlatform': 1,
            'media': '',
            'praises': 0,
            'publishTime': 1556961966000,
            'service': 'S010',
            'serviceId': 'S010',
            'shares': 0,
            'state': 'CERTIFICATION_PASS',
            'title': '钢铁侠死了?',
            'type': 'NOTE',
            'views': 2
          },
          {
            'author': '漂洋过海',
            'comments': 0,
            'content': '<h2><br></h2>',
            'cover': 'https://dayukeji-test.oss-cn-beijing.aliyuncs.com/p18001/dev/manager/image/1556961903643-632080269.png',
            'group': { 'id': 15, 'name': '人物访谈' },
            category: { 'id': 12, 'name': '直播' },
            'id': 21,
            'isCurrentPageCarousel': 0,
            'isFeatured': 0,
            'isHomepageCarousel': 0,
            'isPlatform': 1,
            'media': '',
            'praises': 0,
            'publishTime': 1556961966000,
            'service': 'S010',
            'serviceId': 'S010',
            'shares': 0,
            'state': 'CERTIFICATION_PASS',
            'title': '美队穿越还无限宝石',
            'type': 'NOTE',
            'views': 2
          },
        ],
        'total': 18
      },
      'msg': '成功',
      'notice': '成功',
      'status': 0
    }), 1000);
  }),
  fetchArticle: () => Promise.resolve({
    'data': {
      'author': '漂洋过海',
      'comments': 0,
      'content': '<p>作者：张小凡</p><p>链接：https://www.zhihu.com/question/321691735/answer/663602952</p><p>来源：知乎</p><p>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p><p><img src="https://dayukeji-test.oss-cn-beijing.aliyuncs.com/p18001/dev/manager/image/1557473867495-338280060.png"></p><p>灭霸原本就是一个坦度和输出兼备的泰坦人，如果说一般角色只有六个装备槽，那他有12个。</p><p>横向对比来看，即使健壮如浩克，也是在经过很长一段挣扎之后才打响了手套的响指，并且在之后重伤，在得到钢铁侠的治疗之后，虽不致死，但也倒地不起。</p><p>反观复联3中的灭霸，集齐六颗宝石后，当即有一个力量反噬的过程，但他很快就能适应并驾驭，在被雷神斧子砍中的情况下，依然能淡然的打响响指。</p><p><br></p><p>并且在复联4的开头我们得知，灭霸之后又再次打响了响指，将原石销毁。我想他大概是目前为止出现的人物中，唯一一个能在短时间内两次利用无限手套打响指，还依旧能种田采茶的人物（惊奇队长未知，不做讨论。）</p><p>由此可见，灭霸的体格不是一般的强悍。</p><p>一般的物理和魔法攻击，他都可以单手抗下，回想复联3中，灭霸时常被限制使用宝石的那段战斗，众英雄已然倾尽全力，而灭霸只是一句，“All that for a drop of blood?”</p><p><br></p><p>回到复联4中，三英战吕布。雷电、脉冲、盾牌，对于灭霸而言都无法造成致命伤，只能短暂的压制灭霸，强如雷神和钢铁侠新战甲的组合技，也被灭霸强行抗下。可以说，能打得动灭霸的，只有雷神的风暴战斧。奈何此时的雷神只是一个拥有一整块腹肌的死肥宅，千钧一发召唤来的斧子还被灭霸给抓住了。</p><p>另外，灭霸的武器也值得一说，在原著漫画中似乎并没有出现过，暂且称他为双刃刀，材质不详，但就凭他能把美队的盾牌砍废，其坚硬程度可见一斑，同时我们不妨大胆的作出推测，倘若灭霸身披的战甲也是同款材质，那真的是一个很逆天的存在了，也难怪三巨头歇斯底里，也难伤他分毫</p>',
      'cover': 'https://dayukeji-test.oss-cn-beijing.aliyuncs.com/p18001/dev/manager/image/1557473857169-235435783.png',
      'group': {
        'id': 12,
        'name': '企业访谈'
      },
      'id': 18,
      'isCurrentPageCarousel': 0,
      'isFeatured': 0,
      'isHomepageCarousel': 0,
      'isPlatform': 1,
      'media': 'https://dayukeji-test.oss-cn-beijing.aliyuncs.com/p18001/dev/manager/video/1557473901146-603857676.mp4',
      'praises': 0,
      'publishTime': 1557021890000,
      'service': 'S013',
      'serviceId': 'S013',
      'shares': 0,
      'state': 'CERTIFICATION_PASS',
      'title': '为什么复联4中的灭霸变强了？',
      'type': 'VIDEO',
      'views': 1
    },
    'msg': '成功',
    'notice': '成功',
    'status': 0
  }), //获取文章详情
  removeArticle: () => Promise.resolve({ status: 0 }), //删除文章
  pushArticle: (id, params) => {
    if (id) return Promise.resolve({ status: 0 }); //修改文章
    return Promise.resolve({ status: 0 }); //添加文章
  },
  updateArticleIsFeatured: () => Promise.resolve({ status: 0 }), //是否精选
  updateArticleIsCurrentPageCarousel: () => Promise.resolve({ status: 0 }), //是否本页轮播
  updateArticleIsHomepageCarousel: () => Promise.resolve({ status: 0 }), //是否首页轮播
  updateArticleIsRecommend: () => Promise.resolve({ status: 0 }), //是否置顶
  updateArticleState: () => Promise.resolve({ status: 0 }), //审核文章

  fetchArticleComment: () => Promise.resolve({
    status: 0,
    data: {
      'list': [
        {
          'author': 'pygh429480',
          'avatar': 'https://tst.dayukeji.xin/p18001/api/static/logo.jpg',
          'content': '让我婆婆说',
          'hasPraise': 0,
          'id': 12,
          'praises': 0,
          'reply': [],
          'time': 1556601850000
        },
        {
          'author': '灭霸',
          'avatar': 'https://dayukeji-test.oss-cn-beijing.aliyuncs.com/p18001/dev/app/chat-img/1557047633228-266995.jpg',
          'content': '嘿嘿😁',
          'hasPraise': 0,
          'id': 3,
          'praises': 0,
          'reply': [
            { 'content': '吃我鼻屎', 'id': 16, 'recipient': '钢铁侠', 'sponsor': '灭霸' },
            { 'content': '你才吃我鼻屎', 'id': 17, 'recipient': '美国队长', 'sponsor': '灭霸' },
            {
              'content': '你们都吃我鼻屎，你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎，你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎你们都吃我鼻屎',
              'id': 18,
              'recipient': '钢铁侠',
              'sponsor': '灭霸'
            },
            { 'content': '吃我以雷电', 'id': 19, 'recipient': '雷神', 'sponsor': '灭霸' }
          ],
          'time': 1556531996000
        },
        {
          'author': 'pygh429480',
          'avatar': 'https://tst.dayukeji.xin/p18001/api/static/logo.jpg',
          'content': '拼手速图',
          'hasPraise': 0,
          'id': 11,
          'praises': 0,
          'reply': [
            { 'content': '无敌县令', 'id': 15, 'recipient': 'pygh429480', 'sponsor': '灭霸' }
          ],
          'time': 1556601839000
        },
      ],
      'total': 12
    }
  }), //获取评论列表
  removeArticleComment: () => Promise.resolve({ status: 0 }), //删除评论
  removeArticleCommentReply: () => Promise.resolve({ status: 2000, notice: '删除失败' }), //删除评论回复
};
