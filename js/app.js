/* ============================================================
   Leisure Lab - Application Logic
   ============================================================ */
(function() {
  'use strict';

  // ===== DATA ACCESS =====
  var ACTIVITIES = window.LEISURE_ACTIVITIES || [];
  var CATEGORIES = window.LEISURE_CATEGORIES || [];
  var SPEECHES   = window.LEISURE_SPEECHES   || [];
  var SOURCES    = window.LEISURE_SOURCES    || [];

  // ===== STATE =====
  var state = {
    search: '',
    filters: { category: '', benefit: '', location: '', solo: '', cost: '' },
    favorites: [],
    compare: [],
    drafts: {},
    settings: { speechRate: 110, pauseTime: 20 },
    members: null,
    timer: { running: false, elapsed: 0, intervalId: null },
    activeMember: 1,
    workshopView: 'bilingual',
    fontSize: 'normal'
  };

  // ===== STORAGE =====
  function loadState() {
    try {
      state.favorites = JSON.parse(localStorage.getItem('ll_favorites') || '[]');
      state.compare   = JSON.parse(localStorage.getItem('ll_compare')   || '[]');
      var s = JSON.parse(localStorage.getItem('ll_settings') || '{}');
      state.settings.speechRate = s.speechRate || 110;
      state.settings.pauseTime  = s.pauseTime  || 20;
      state.drafts  = JSON.parse(localStorage.getItem('ll_drafts')  || '{}');
      state.members = JSON.parse(localStorage.getItem('ll_members') || 'null');
    } catch(e) { console.error('Load state error:', e); }
  }
  function saveFavorites() { localStorage.setItem('ll_favorites', JSON.stringify(state.favorites)); }
  function saveCompare()   { localStorage.setItem('ll_compare', JSON.stringify(state.compare)); updateCompareBadge(); }
  function saveSettings()  { localStorage.setItem('ll_settings', JSON.stringify(state.settings)); }
  function saveDrafts()    { localStorage.setItem('ll_drafts', JSON.stringify(state.drafts)); }
  function saveMembers()   { localStorage.setItem('ll_members', JSON.stringify(state.members)); }

  // ===== HELPERS =====
  function getActivity(id) { return ACTIVITIES.find(function(a){ return a.id === id; }); }
  function getCategory(id) { return CATEGORIES.find(function(c){ return c.id === id; }); }
  function getSpeech(memberId) { return SPEECHES.find(function(s){ return s.memberId === memberId; }); }
  function esc(str) { return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function countWords(text) {
    if (!text) return 0;
    return (text.trim().match(/\S+/g) || []).length;
  }
  function formatTime(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function toast(msg, type) {
    var c = document.getElementById('toastContainer');
    var t = document.createElement('div');
    t.className = 'toast ' + (type || '');
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(function(){ t.style.opacity = '0'; setTimeout(function(){ t.remove(); }, 200); }, 2500);
  }
  function updateCompareBadge() {
    var b = document.getElementById('compareBadge');
    if (state.compare.length > 0) { b.textContent = state.compare.length; b.style.display = 'inline-block'; }
    else { b.style.display = 'none'; }
  }
  function toggleMobileNav() {
    var m = document.getElementById('navMenu');
    var t = document.getElementById('navToggle');
    m.classList.toggle('open');
    t.setAttribute('aria-expanded', m.classList.contains('open'));
  }
  function closeMobileNav() {
    var m = document.getElementById('navMenu');
    if (m.classList.contains('open')) {
      m.classList.remove('open');
      document.getElementById('navToggle').setAttribute('aria-expanded','false');
    }
  }
  function updateActiveNav(hash) {
    var links = document.querySelectorAll('.nav-link');
    var base = hash.split('/')[1] || '';
    links.forEach(function(l) {
      var route = l.getAttribute('data-route') || '';
      var routeBase = route.split('/')[1] || '';
      l.classList.toggle('active', routeBase === base);
    });
  }

  // ===== INIT MEMBERS =====
  function initMembers() {
    if (state.members) return;
    state.members = [
      { id:1, name:'成员一', suggestedTopics:'阅读小说与写日记', activityIds:['reading-novels','journaling'], reason:'', experience:'', status:'未开始' },
      { id:2, name:'成员二', suggestedTopics:'篮球与骑行', activityIds:['basketball','cycling'], reason:'', experience:'', status:'未开始' },
      { id:3, name:'成员三', suggestedTopics:'听音乐与弹吉他', activityIds:['listening-to-music','playing-guitar'], reason:'', experience:'', status:'未开始' },
      { id:4, name:'成员四', suggestedTopics:'摄影与徒步', activityIds:['photography','hiking'], reason:'', experience:'', status:'未开始' },
      { id:5, name:'成员五', suggestedTopics:'烹饪与园艺', activityIds:['cooking','gardening'], reason:'', experience:'', status:'未开始' }
    ];
    saveMembers();
  }

  // ===== ROUTER =====
  function router() {
    var hash = window.location.hash.slice(1) || '/';
    closeMobileNav();
    window.scrollTo(0, 0);
    var app = document.getElementById('app');
    app.className = 'main-content font-' + state.fontSize;

    if (hash === '/' || hash === '') { renderLibrary(); }
    else if (hash.indexOf('/activity/') === 0) { renderDetail(hash.split('/')[2]); }
    else if (hash === '/compare') { renderCompare(); }
    else if (hash === '/team') { renderTeam(); }
    else if (hash === '/workshop') { renderWorkshop(); }
    else if (hash === '/sources') { renderSources(); }
    else { renderLibrary(); }

    updateActiveNav(hash);
  }

  // ===== LIBRARY PAGE =====
  function renderLibrary() {
    var app = document.getElementById('app');
    var benefits = ['身体','情绪','认知','技能','社交'];
    var benefitMap = {
      '身体': ['heart','stamina','leg','fitness','workout','reflexes','coordination','breathing','agility','cardiovascular','body','physical','joint'],
      '情绪': ['stress','mood','relax','calm','emotional','anxiety','happy','upset','stressful','meditation','meditative','refresh','peaceful'],
      '认知': ['vocabulary','reading','focus','observation','thinking','knowledge','creativity','pattern','problem','spatial','curiosity','brain','cognitive','memory','mind'],
      '技能': ['writing','handwriting','aesthetics','independence','survival','skill','achievement','coordination','fine motor','planning','foresight','breathing control','problem-solving'],
      '社交': ['teamwork','communication','social','community','friends','connection','bonding','together','confidence','bond','empathy']
    };

    var html = '<h1 class="page-title">活动资料库</h1>';
    html += '<p class="page-subtitle">收录 ' + ACTIVITIES.length + ' 种休闲活动，支持中英文搜索和筛选。点击卡片查看完整资料。</p>';

    // Filter bar
    html += '<div class="filter-bar">';
    html += '<div class="search-box"><input type="text" id="searchInput" placeholder="搜索活动名称或关键词（中英文）…" value="' + esc(state.search) + '"></div>';
    html += '<select class="filter-select" id="filterCategory"><option value="">全部分类</option>';
    CATEGORIES.forEach(function(c) {
      html += '<option value="' + c.id + '"' + (state.filters.category === c.id ? ' selected' : '') + '>' + c.icon + ' ' + c.nameCn + '</option>';
    });
    html += '</select>';
    html += '<select class="filter-select" id="filterBenefit"><option value="">主要益处</option>';
    benefits.forEach(function(b) {
      html += '<option value="' + b + '"' + (state.filters.benefit === b ? ' selected' : '') + '>' + b + '</option>';
    });
    html += '</select>';
    html += '<select class="filter-select" id="filterSolo"><option value="">独自/结伴</option>';
    html += '<option value="solo"' + (state.filters.solo === 'solo' ? ' selected' : '') + '>独自</option>';
    html += '<option value="group"' + (state.filters.solo === 'group' ? ' selected' : '') + '>结伴</option>';
    html += '<option value="both"' + (state.filters.solo === 'both' ? ' selected' : '') + '>均可</option>';
    html += '</select>';
    html += '<select class="filter-select" id="filterCost"><option value="">费用</option>';
    html += '<option value="free"' + (state.filters.cost === 'free' ? ' selected' : '') + '>免费</option>';
    html += '<option value="low"' + (state.filters.cost === 'low' ? ' selected' : '') + '>低</option>';
    html += '<option value="medium"' + (state.filters.cost === 'medium' ? ' selected' : '') + '>中</option>';
    html += '</select>';
    html += '<button class="btn-clear-filters" id="clearFilters">清除筛选</button>';
    html += '</div>';

    // Filter activities
    var filtered = ACTIVITIES.filter(function(a) {
      // Search
      if (state.search) {
        var q = state.search.toLowerCase();
        var hay = (a.nameEn + ' ' + a.nameCn + ' ' + a.shortIntroEn + ' ' + a.shortIntroCn + ' ' + a.introEn + ' ' + a.introCn).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      // Category
      if (state.filters.category && a.category !== state.filters.category) return false;
      // Solo
      if (state.filters.solo && a.howTo.solo !== state.filters.solo) return false;
      // Cost
      if (state.filters.cost && a.howTo.cost !== state.filters.cost && !(state.filters.cost === 'free' && a.howTo.cost === 'free')) return false;
      // Benefit
      if (state.filters.benefit) {
        var keywords = benefitMap[state.filters.benefit] || [];
        var allBenefitText = a.benefits.map(function(b) { return b.expressionEn + ' ' + b.expressionCn + ' ' + b.explanationCn; }).join(' ').toLowerCase();
        var hasKeyword = keywords.some(function(k) { return allBenefitText.indexOf(k.toLowerCase()) !== -1; });
        if (!hasKeyword) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      html += '<div class="no-results"><div class="no-results-icon">🔍</div><p>没有找到匹配的活动。</p><p>试试调整搜索词或清除筛选条件。</p></div>';
    } else {
      html += '<p style="font-size:.82rem;color:#95a5a6;margin-bottom:12px;">找到 ' + filtered.length + ' 个活动</p>';
      html += '<div class="activity-grid">';
      filtered.forEach(function(a) {
        var cat = getCategory(a.category);
        var isFav = state.favorites.indexOf(a.id) !== -1;
        var isComp = state.compare.indexOf(a.id) !== -1;
        var compareFull = state.compare.length >= 4 && !isComp;
        html += '<div class="activity-card">';
        html += '<div class="card-header" style="background:' + (cat ? cat.color : '#16a085') + '"></div>';
        html += '<div class="card-body">';
        html += '<div class="card-cat">' + (cat ? cat.icon + ' ' + cat.nameCn : '') + '</div>';
        html += '<div class="card-title">' + esc(a.nameCn) + '</div>';
        html += '<div class="card-title-en">' + esc(a.nameEn) + '</div>';
        html += '<p class="card-intro">' + esc(a.shortIntroCn) + '</p>';
        html += '<div class="card-tags">';
        var soloLabel = a.howTo.solo === 'solo' ? '独自' : a.howTo.solo === 'group' ? '结伴' : '均可';
        html += '<span class="card-tag ' + a.howTo.solo + '">' + soloLabel + '</span>';
        var costLabel = a.howTo.cost === 'free' ? '免费' : a.howTo.cost === 'low' ? '低费用' : a.howTo.cost === 'medium' ? '中费用' : a.howTo.cost;
        html += '<span class="card-tag">' + costLabel + '</span>';
        html += '<span class="card-tag">' + a.benefits.length + ' 项益处</span>';
        html += '</div>';
        html += '<div class="card-footer">';
        html += '<a href="#/activity/' + a.id + '" class="card-link">查看详情 →</a>';
        html += '<div class="card-actions">';
        html += '<button class="icon-btn ' + (isFav ? 'active' : '') + '" data-fav="' + a.id + '" title="' + (isFav ? '取消收藏' : '收藏') + '" aria-label="收藏">' + (isFav ? '★' : '☆') + '</button>';
        html += '<button class="icon-btn ' + (isComp ? 'compare-active' : '') + '" data-compare="' + a.id + '"' + (compareFull ? ' disabled title="最多比较4项"' : ' title="加入对比"') + ' aria-label="加入对比" ' + (compareFull ? 'style="opacity:.4"' : '') + '>⚖</button>';
        html += '</div></div></div></div>';
      });
      html += '</div>';
    }

    app.innerHTML = html;

    // Attach events
    var si = document.getElementById('searchInput');
    if (si) {
      si.addEventListener('input', function() {
        state.search = this.value;
        renderLibrary();
        // restore focus
        var ni = document.getElementById('searchInput');
        if (ni) { ni.focus(); ni.setSelectionRange(ni.value.length, ni.value.length); }
      });
    }
    ['filterCategory','filterBenefit','filterSolo','filterCost'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', function() {
          var key = id.replace('filter','').charAt(0).toLowerCase() + id.replace('filter','').slice(1);
          if (key === 'category') state.filters.category = this.value;
          else if (key === 'benefit') state.filters.benefit = this.value;
          else if (key === 'solo') state.filters.solo = this.value;
          else if (key === 'cost') state.filters.cost = this.value;
          renderLibrary();
        });
      }
    });
    var cf = document.getElementById('clearFilters');
    if (cf) {
      cf.addEventListener('click', function() {
        state.search = '';
        state.filters = { category: '', benefit: '', location: '', solo: '', cost: '' };
        renderLibrary();
      });
    }
    // Favorite & compare buttons via delegation
    app.querySelectorAll('[data-fav]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = this.getAttribute('data-fav');
        var idx = state.favorites.indexOf(id);
        if (idx === -1) { state.favorites.push(id); toast('已收藏：' + (getActivity(id) ? getActivity(id).nameCn : ''), 'success'); }
        else { state.favorites.splice(idx, 1); toast('已取消收藏', ''); }
        saveFavorites();
        renderLibrary();
      });
    });
    app.querySelectorAll('[data-compare]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        if (this.disabled) return;
        var id = this.getAttribute('data-compare');
        var idx = state.compare.indexOf(id);
        if (idx === -1) {
          if (state.compare.length >= 4) { toast('最多比较4项活动', 'warning'); return; }
          state.compare.push(id);
          toast('已加入对比：' + (getActivity(id) ? getActivity(id).nameCn : ''), 'success');
        } else {
          state.compare.splice(idx, 1);
          toast('已移出对比', '');
        }
        saveCompare();
        renderLibrary();
      });
    });
  }

  // ===== ACTIVITY DETAIL PAGE =====
  function renderDetail(id) {
    var app = document.getElementById('app');
    var a = getActivity(id);
    if (!a) {
      app.innerHTML = '<div class="no-results"><div class="no-results-icon">😕</div><p>未找到该活动。</p><a href="#/">返回资料库</a></div>';
      return;
    }
    var cat = getCategory(a.category);
    var isFav = state.favorites.indexOf(a.id) !== -1;
    var isComp = state.compare.indexOf(a.id) !== -1;
    var compareFull = state.compare.length >= 4 && !isComp;

    var html = '<div class="detail-back"><a href="#/">← 返回资料库</a></div>';
    html += '<div class="detail-header" style="border-top:4px solid ' + (cat ? cat.color : '#16a085') + '">';
    html += '<div class="detail-cat">' + (cat ? cat.icon + ' ' + cat.nameCn + ' · ' + cat.nameEn : '') + '</div>';
    html += '<div class="detail-title">' + esc(a.nameCn) + '</div>';
    html += '<div class="detail-title-en">' + esc(a.nameEn) + '</div>';
    html += '<p class="detail-intro-short">' + esc(a.shortIntroCn) + '</p>';
    html += '<div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">';
    html += '<button class="icon-btn ' + (isFav ? 'active' : '') + '" id="detailFav" title="' + (isFav ? '取消收藏' : '收藏') + '">' + (isFav ? '★ 已收藏' : '☆ 收藏') + '</button>';
    html += '<button class="icon-btn ' + (isComp ? 'compare-active' : '') + '" id="detailCompare" ' + (compareFull ? 'disabled style="opacity:.4"' : '') + '>⚖ ' + (isComp ? '已加入对比' : '加入对比') + '</button>';
    html += '</div></div>';

    // Intro
    html += '<div class="detail-section bilingual">';
    html += '<h3 class="section-heading">活动介绍 <span class="section-heading-en">Introduction</span></h3>';
    html += '<p class="text-en">' + esc(a.introEn) + '</p>';
    html += '<p class="text-cn">' + esc(a.introCn) + '</p>';
    html += '</div>';

    // How to
    html += '<div class="detail-section">';
    html += '<h3 class="section-heading">参与方式与实用信息 <span class="section-heading-en">How to & Practical Info</span></h3>';
    html += '<table class="info-table">';
    html += '<tr><th>如何进行</th><td>' + esc(a.howTo.howCn) + '<br><span class="text-cn">' + esc(a.howTo.howEn) + '</span></td></tr>';
    var soloLabel = a.howTo.solo === 'solo' ? '独自进行' : a.howTo.solo === 'group' ? '结伴进行' : '独自或结伴均可';
    html += '<tr><th>适合方式</th><td>' + soloLabel + '</td></tr>';
    html += '<tr><th>常见地点</th><td><div class="info-list">' + a.howTo.locationCn.map(esc).map(function(s){return '<span>'+s+'</span>';}).join('') + '</div></td></tr>';
    html += '<tr><th>参考时间</th><td>' + esc(a.howTo.timeCn) + '</td></tr>';
    var costLabel = a.howTo.cost === 'free' ? '免费' : a.howTo.cost === 'low' ? '低' : a.howTo.cost === 'medium' ? '中' : a.howTo.cost;
    html += '<tr><th>相对费用</th><td>' + costLabel + ' — ' + esc(a.howTo.costCn) + '</td></tr>';
    html += '<tr><th>必要准备</th><td><div class="info-list">' + a.howTo.preparationCn.map(esc).map(function(s){return '<span>'+s+'</span>';}).join('') + '</div></td></tr>';
    html += '</table>';
    html += '<p class="ref-note">以上时间和费用为参考，实际情况因地区和个人而异。</p>';
    html += '</div>';

    // Benefits
    html += '<div class="detail-section">';
    html += '<h3 class="section-heading">活动益处 <span class="section-heading-en">Benefits</span></h3>';
    a.benefits.forEach(function(b) {
      html += '<div class="benefit-item">';
      html += '<div class="benefit-expr">' + esc(b.expressionEn) + ' <span class="benefit-expr-cn">' + esc(b.expressionCn) + '</span></div>';
      html += '<div class="benefit-explain">' + esc(b.explanationCn) + '</div>';
      html += '<div class="benefit-example">' + esc(b.exampleEn) + '<span class="benefit-example-cn">' + esc(b.exampleCn) + '</span></div>';
      html += '</div>';
    });
    html += '</div>';

    // Vocabulary
    html += '<div class="detail-section">';
    html += '<h3 class="section-heading">实用词汇 <span class="section-heading-en">Key Vocabulary</span></h3>';
    html += '<div class="vocab-grid">';
    a.vocabulary.forEach(function(v) {
      html += '<div class="vocab-item"><div class="vocab-en">' + esc(v.en) + '</div><div class="vocab-cn">' + esc(v.cn) + '</div></div>';
    });
    html += '</div></div>';

    // Example sentences
    html += '<div class="detail-section">';
    html += '<h3 class="section-heading">演讲例句 <span class="section-heading-en">Example Sentences</span></h3>';
    a.exampleSentences.forEach(function(s) {
      html += '<div class="example-sentence"><div class="example-en">' + esc(s.en) + '</div><div class="example-cn">' + esc(s.cn) + '</div></div>';
    });
    html += '</div>';

    // Sample answer
    html += '<div class="detail-section">';
    html += '<h3 class="section-heading">示范回答 <span class="section-heading-en">Sample Answer</span></h3>';
    html += '<div class="sample-answer">';
    html += '<p class="text-en">' + esc(a.sampleAnswer.textEn) + '</p>';
    html += '<p class="text-cn">' + esc(a.sampleAnswer.textCn) + '</p>';
    html += '<p class="sample-note">示例经历，可按本人情况修改。</p>';
    html += '</div></div>';

    // Notes
    if (a.notesCn) {
      html += '<div class="detail-section">';
      html += '<h3 class="section-heading">注意事项 <span class="section-heading-en">Notes</span></h3>';
      html += '<p class="text-cn">' + esc(a.notesCn) + '</p>';
      html += '<p class="text-en" style="font-size:.82rem;">' + esc(a.notesEn) + '</p>';
      html += '</div>';
    }

    app.innerHTML = html;

    // Events
    var df = document.getElementById('detailFav');
    if (df) df.addEventListener('click', function() {
      var idx = state.favorites.indexOf(a.id);
      if (idx === -1) { state.favorites.push(a.id); toast('已收藏', 'success'); }
      else { state.favorites.splice(idx, 1); toast('已取消收藏', ''); }
      saveFavorites();
      renderDetail(id);
    });
    var dc = document.getElementById('detailCompare');
    if (dc) dc.addEventListener('click', function() {
      if (this.disabled) return;
      var idx = state.compare.indexOf(a.id);
      if (idx === -1) {
        if (state.compare.length >= 4) { toast('最多比较4项活动', 'warning'); return; }
        state.compare.push(a.id);
        toast('已加入对比', 'success');
      } else {
        state.compare.splice(idx, 1);
        toast('已移出对比', '');
      }
      saveCompare();
      renderDetail(id);
    });
  }

  // ===== COMPARE PAGE =====
  function renderCompare() {
    var app = document.getElementById('app');
    var html = '<h1 class="page-title">活动对比</h1>';
    html += '<p class="page-subtitle">最多选择 4 项活动并排比较。在资料库中点击 ⚖ 图标加入对比。</p>';

    if (state.compare.length === 0) {
      html += '<div class="compare-empty"><div style="font-size:2.5rem;margin-bottom:10px;">⚖</div><p>还没有选择活动进行对比。</p><a href="#/" class="btn btn-outline mt-12">去资料库选择</a></div>';
    } else {
      var activities = state.compare.map(getActivity).filter(Boolean);
      // Build table
      var cols = activities.length;
      html += '<div class="compare-table-wrap"><table class="compare-table"><thead><tr>';
      html += '<th>对比项</th>';
      activities.forEach(function(a) {
        html += '<th>' + esc(a.nameCn) + '<br><span style="font-size:.72rem;font-weight:400;">' + esc(a.nameEn) + '</span><br><button class="icon-btn" style="width:20px;height:20px;font-size:.7rem;margin-top:4px;" data-remove-compare="' + a.id + '" title="移除">✕</button></th>';
      });
      html += '</tr></thead><tbody>';

      // Row: Category
      html += '<tr><td>分类</td>';
      activities.forEach(function(a) {
        var c = getCategory(a.category);
        html += '<td>' + (c ? c.icon + ' ' + c.nameCn : '') + '</td>';
      });
      html += '</tr>';

      // Row: Main benefits
      html += '<tr><td>主要益处</td>';
      activities.forEach(function(a) {
        html += '<td>' + a.benefits.map(function(b){ return esc(b.expressionCn); }).join('；') + '</td>';
      });
      html += '</tr>';

      // Row: Time
      html += '<tr><td>参考时间</td>';
      activities.forEach(function(a) { html += '<td>' + esc(a.howTo.timeCn) + '</td>'; });
      html += '</tr>';

      // Row: Cost
      html += '<tr><td>相对费用</td>';
      activities.forEach(function(a) {
        var cl = a.howTo.cost === 'free' ? '免费' : a.howTo.cost === 'low' ? '低' : a.howTo.cost === 'medium' ? '中' : a.howTo.cost;
        html += '<td>' + cl + '</td>';
      });
      html += '</tr>';

      // Row: Solo/Group
      html += '<tr><td>独自/结伴</td>';
      activities.forEach(function(a) {
        var sl = a.howTo.solo === 'solo' ? '独自' : a.howTo.solo === 'group' ? '结伴' : '均可';
        html += '<td>' + sl + '</td>';
      });
      html += '</tr>';

      // Row: Preparation
      html += '<tr><td>准备要求</td>';
      activities.forEach(function(a) { html += '<td>' + a.howTo.preparationCn.map(esc).join('、') + '</td>'; });
      html += '</tr>';

      // Row: Key expressions
      html += '<tr><td>英文表达</td>';
      activities.forEach(function(a) {
        html += '<td>' + a.benefits.map(function(b){ return esc(b.expressionEn); }).join('；') + '</td>';
      });
      html += '</tr>';

      // Row: Vocab
      html += '<tr><td>实用词汇</td>';
      activities.forEach(function(a) {
        html += '<td>' + a.vocabulary.slice(0,5).map(function(v){ return esc(v.en); }).join('、') + '</td>';
      });
      html += '</tr>';

      html += '</tbody></table></div>';
      html += '<p class="ref-note">手机上可左右滑动表格。时间和费用为参考。</p>';
      html += '<button class="btn btn-outline" id="clearCompare">清空对比列表</button>';
    }

    app.innerHTML = html;

    app.querySelectorAll('[data-remove-compare]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var rid = this.getAttribute('data-remove-compare');
        var idx = state.compare.indexOf(rid);
        if (idx !== -1) { state.compare.splice(idx, 1); saveCompare(); renderCompare(); toast('已移出对比', ''); }
      });
    });
    var cc = document.getElementById('clearCompare');
    if (cc) cc.addEventListener('click', function() {
      state.compare = []; saveCompare(); renderCompare(); toast('已清空对比列表', '');
    });
  }

  // ===== TEAM PAGE =====
  function renderTeam() {
    var app = document.getElementById('app');
    var statuses = ['未开始','准备中','待练习','已准备好'];
    var html = '<h1 class="page-title">小组分工</h1>';
    html += '<p class="page-subtitle">5 人小组选题与准备进度管理。成员名字可修改，选题可从资料库选择。数据保存在当前浏览器。</p>';

    // Team actions
    html += '<div class="team-actions">';
    html += '<button class="btn btn-outline" id="exportTeam">导出 JSON</button>';
    html += '<button class="btn btn-outline" id="importTeamBtn">导入 JSON</button>';
    html += '<input type="file" id="importTeamFile" accept=".json" style="display:none;">';
    html += '</div>';

    // Member cards
    html += '<div class="member-grid">';
    state.members.forEach(function(m, idx) {
      html += '<div class="member-card">';
      html += '<input type="text" class="member-name-input" data-member-name="' + m.id + '" value="' + esc(m.name) + '" placeholder="成员名">';
      html += '<div class="member-topic-hint">建议选题：' + esc(m.suggestedTopics) + '</div>';

      // Activity selectors
      for (var i = 0; i < 2; i++) {
        var currentId = m.activityIds[i] || '';
        html += '<div class="member-field">';
        html += '<label>活动 ' + (i + 1) + '</label>';
        html += '<select class="member-activity-select" data-member="' + m.id + '" data-index="' + i + '">';
        html += '<option value="">— 未选择 —</option>';
        ACTIVITIES.forEach(function(a) {
          html += '<option value="' + a.id + '"' + (currentId === a.id ? ' selected' : '') + '>' + a.nameCn + ' (' + a.nameEn + ')</option>';
        });
        html += '</select></div>';
      }

      // Check for duplicate topics
      var dupInfo = '';
      if (m.activityIds.length > 0) {
        for (var j = 0; j < state.members.length; j++) {
          if (j === idx) continue;
          var other = state.members[j];
          for (var k = 0; k < m.activityIds.length; k++) {
            if (m.activityIds[k] && other.activityIds.indexOf(m.activityIds[k]) !== -1) {
              var act = getActivity(m.activityIds[k]);
              dupInfo = '注意："' + (act ? act.nameCn : '') + '" 与 ' + other.name + ' 选题重复（允许保留，因经历不同）';
              break;
            }
          }
          if (dupInfo) break;
        }
      }

      // Reason
      html += '<div class="member-field"><label>选题理由</label><textarea data-member-reason="' + m.id + '" placeholder="为什么选这个活动…">' + esc(m.reason) + '</textarea></div>';
      // Experience
      html += '<div class="member-field"><label>个人经历</label><textarea data-member-experience="' + m.id + '" placeholder="你的相关经历（可参考示范回答修改）…">' + esc(m.experience) + '</textarea></div>';
      // Status
      html += '<div class="member-field"><label>准备状态</label><div class="status-pills">';
      statuses.forEach(function(st) {
        html += '<button class="status-pill' + (m.status === st ? ' active' : '') + '" data-member-status="' + m.id + '" data-status="' + st + '">' + st + '</button>';
      });
      html += '</div></div>';
      if (dupInfo) html += '<div class="dup-warning">⚠ ' + esc(dupInfo) + '</div>';
    });
    html += '</div>';

    // Progress summary
    html += '<div class="team-progress"><h3>准备进度总览</h3>';
    state.members.forEach(function(m) {
      var pct = m.status === '未开始' ? 0 : m.status === '准备中' ? 33 : m.status === '待练习' ? 66 : 100;
      html += '<div class="progress-item"><span style="min-width:80px;">' + esc(m.name) + '</span>';
      html += '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>';
      html += '<span style="font-size:.75rem;color:#95a5a6;">' + m.status + '</span></div>';
    });
    html += '</div>';

    app.innerHTML = html;

    // Events
    app.querySelectorAll('[data-member-name]').forEach(function(inp) {
      inp.addEventListener('input', function() {
        var mid = parseInt(this.getAttribute('data-member-name'));
        var m = state.members.find(function(x){return x.id===mid;});
        if (m) { m.name = this.value; saveMembers(); }
      });
    });
    app.querySelectorAll('.member-activity-select').forEach(function(sel) {
      sel.addEventListener('change', function() {
        var mid = parseInt(this.getAttribute('data-member'));
        var idx = parseInt(this.getAttribute('data-index'));
        var m = state.members.find(function(x){return x.id===mid;});
        if (m) {
          if (!m.activityIds) m.activityIds = [];
          if (this.value) {
            m.activityIds[idx] = this.value;
          } else {
            m.activityIds.splice(idx, 1);
          }
          saveMembers();
          renderTeam();
        }
      });
    });
    app.querySelectorAll('[data-member-reason]').forEach(function(ta) {
      ta.addEventListener('input', function() {
        var mid = parseInt(this.getAttribute('data-member-reason'));
        var m = state.members.find(function(x){return x.id===mid;});
        if (m) { m.reason = this.value; saveMembers(); }
      });
    });
    app.querySelectorAll('[data-member-experience]').forEach(function(ta) {
      ta.addEventListener('input', function() {
        var mid = parseInt(this.getAttribute('data-member-experience'));
        var m = state.members.find(function(x){return x.id===mid;});
        if (m) { m.experience = this.value; saveMembers(); }
      });
    });
    app.querySelectorAll('[data-member-status]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var mid = parseInt(this.getAttribute('data-member-status'));
        var st = this.getAttribute('data-status');
        var m = state.members.find(function(x){return x.id===mid;});
        if (m) { m.status = st; saveMembers(); renderTeam(); }
      });
    });

    // Export
    var eb = document.getElementById('exportTeam');
    if (eb) eb.addEventListener('click', function() {
      var data = JSON.stringify(state.members, null, 2);
      var blob = new Blob([data], {type:'application/json'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'leisure-lab-team.json'; a.click();
      URL.revokeObjectURL(url);
      toast('已导出 JSON 文件', 'success');
    });

    // Import
    var ib = document.getElementById('importTeamBtn');
    var ifile = document.getElementById('importTeamFile');
    if (ib) ib.addEventListener('click', function() { ifile.click(); });
    if (ifile) ifile.addEventListener('change', function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        try {
          var data = JSON.parse(ev.target.result);
          if (!Array.isArray(data) || data.length === 0) {
            toast('文件格式不正确：需要成员数组', 'error');
            return;
          }
          // Validate structure
          for (var i = 0; i < data.length; i++) {
            if (typeof data[i].id !== 'number' || typeof data[i].name !== 'string') {
              toast('文件格式不正确：缺少必要字段', 'error');
              return;
            }
          }
          // Confirm
          showConfirm('确认导入', '导入将覆盖当前的 ' + state.members.length + ' 个成员数据，且无法撤销。确定继续吗？', function() {
            state.members = data;
            saveMembers();
            renderTeam();
            toast('导入成功！共 ' + data.length + ' 个成员', 'success');
          });
        } catch(err) {
          toast('文件解析失败：' + err.message + '（请确认是有效的 JSON 文件）', 'error');
        }
      };
      reader.onerror = function() { toast('文件读取失败', 'error'); };
      reader.readAsText(file);
      ifile.value = ''; // reset for re-import
    });
  }

  // ===== WORKSHOP PAGE =====
  function renderWorkshop() {
    var app = document.getElementById('app');
    var html = '<h1 class="page-title">演讲工作台</h1>';
    html += '<p class="page-subtitle">5 位成员各一篇完整双语示范稿。正文可编辑，自动保存草稿。英文编辑后请手动同步中文译文。</p>';

    // Member tabs
    html += '<div class="workshop-tabs">';
    SPEECHES.forEach(function(s) {
      var member = state.members ? state.members.find(function(m){return m.id===s.memberId;}) : null;
      var name = member ? member.name : s.memberName;
      html += '<button class="workshop-tab' + (state.activeMember === s.memberId ? ' active' : '') + '" data-member-tab="' + s.memberId + '">' + esc(name) + '</button>';
    });
    html += '</div>';

    var speech = getSpeech(state.activeMember);
    if (!speech) { app.innerHTML = html + '<p>未找到演讲稿。</p>'; return; }

    var member = state.members ? state.members.find(function(m){return m.id===speech.memberId;}) : null;
    var name = member ? member.name : speech.memberName;

    html += '<div class="workshop-layout">';
    html += '<div class="speech-area">';

    // Speech info
    html += '<div style="margin-bottom:14px;">';
    html += '<div style="font-size:.85rem;color:#95a5a6;">' + esc(name) + ' · 选题：' + esc(speech.topicsCn) + '</div>';
    html += '<div style="font-size:.78rem;color:#16a085;">' + esc(speech.topicsEn) + '</div>';
    html += '</div>';

    // Controls
    html += '<div class="speech-controls">';
    // View mode
    html += '<button class="view-mode-btn' + (state.workshopView==='bilingual'?' active':'') + '" data-view="bilingual">中英对照</button>';
    html += '<button class="view-mode-btn' + (state.workshopView==='english'?' active':'') + '" data-view="english">纯英文</button>';
    html += '<button class="view-mode-btn' + (state.workshopView==='prompt'?' active':'') + '" data-view="prompt">提示卡</button>';
    html += '<span style="flex:1"></span>';
    // Font size
    html += '<span style="font-size:.75rem;color:#95a5a6;">字号</span>';
    html += '<div class="font-size-controls">';
    html += '<button data-font="small" '+(state.fontSize==='small'?'style="background:#16a085;color:#fff"':'')+'>小</button>';
    html += '<button data-font="normal" '+(state.fontSize==='normal'?'style="background:#16a085;color:#fff"':'')+'>中</button>';
    html += '<button data-font="large" '+(state.fontSize==='large'?'style="background:#16a085;color:#fff"':'')+'>大</button>';
    html += '<button data-font="xlarge" '+(state.fontSize==='xlarge'?'style="background:#16a085;color:#fff"':'')+'>特大</button>';
    html += '</div>';
    html += '</div>';

    // Speech text
    var draft = state.drafts[state.activeMember];
    var paragraphs = draft ? draft.paragraphs : speech.speech.map(function(p) { return { en: p.en, cn: p.cn, edited: false }; });

    if (state.workshopView === 'prompt') {
      // Prompt card view
      html += '<div class="speech-text prompt-card-view">';
      speech.outline.forEach(function(o, i) {
        html += '<div class="speech-paragraph"><div class="prompt-card-key">' + (i+1) + '. ' + esc(o.pointCn) + '</div>';
        html += '<div class="prompt-card-bullets">' + esc(o.pointEn) + '</div></div>';
      });
      html += '</div>';
    } else {
      // Bilingual or English only
      html += '<div class="speech-text">';
      paragraphs.forEach(function(p, i) {
        html += '<div class="speech-paragraph' + (p.edited ? ' edited' : '') + '">';
        html += '<textarea class="para-en-edit" data-para="' + i + '" rows="' + Math.max(2, Math.ceil(p.en.length / 60)) + '">' + esc(p.en) + '</textarea>';
        if (state.workshopView === 'bilingual') {
          html += '<div class="para-cn">' + esc(p.cn) + '</div>';
          html += '<div class="warning-note">⚠ 英文已修改，中文译文可能需要同步更新。</div>';
        }
        html += '</div>';
      });
      html += '</div>';
    }

    // Outline (collapsible)
    html += '<details style="margin-top:16px;"><summary style="cursor:pointer;font-size:.85rem;color:#2980b9;font-weight:600;">演讲提纲</summary>';
    html += '<div style="margin-top:8px;">';
    speech.outline.forEach(function(o, i) {
      html += '<div style="font-size:.82rem;margin-bottom:4px;"><strong>' + (i+1) + '.</strong> ' + esc(o.pointCn) + ' <span style="color:#95a5a6;">— ' + esc(o.pointEn) + '</span></div>';
    });
    html += '</div></details>';

    // Cuttable
    html += '<details style="margin-top:12px;"><summary style="cursor:pointer;font-size:.85rem;color:#e76f51;font-weight:600;">可删减内容建议</summary>';
    html += '<ul class="tip-list" style="margin-top:8px;padding-left:20px;">';
    speech.cuttable.forEach(function(c) { html += '<li>' + esc(c) + '</li>'; });
    html += '</ul></details>';

    // Addable
    html += '<details style="margin-top:12px;"><summary style="cursor:pointer;font-size:.85rem;color:#16a085;font-weight:600;">可补充例子</summary>';
    html += '<ul class="tip-list" style="margin-top:8px;padding-left:20px;">';
    speech.addable.forEach(function(c) { html += '<li>' + esc(c) + '</li>'; });
    html += '</ul></details>';

    // Q&A
    html += '<details style="margin-top:12px;"><summary style="cursor:pointer;font-size:.85rem;color:#2980b9;font-weight:600;">可能的老师提问及参考回答</summary>';
    html += '<div style="margin-top:8px;">';
    speech.teacherQA.forEach(function(qa, i) {
      html += '<div class="qa-item"><div class="qa-q">Q' + (i+1) + ': ' + esc(qa.q) + '</div><div class="qa-a">' + esc(qa.a) + '</div></div>';
    });
    html += '</div></details>';

    html += '<p style="font-size:.78rem;color:#e76f51;margin-top:16px;font-style:italic;">' + esc(speech.note) + '</p>';
    html += '</div>'; // speech-area

    // Sidebar
    html += '<div class="workshop-sidebar">';
    // Word count & duration
    var totalWords = countWords(paragraphs.map(function(p){return p.en;}).join(' '));
    var duration = totalWords / state.settings.speechRate * 60 + state.settings.pauseTime;
    var durMin = Math.floor(duration / 60);
    var durSec = Math.round(duration % 60);
    html += '<div class="sidebar-card"><h4>📊 词数与时长</h4>';
    html += '<div class="stat-row"><span>英文词数</span><span class="stat-value">' + totalWords + ' 词</span></div>';
    html += '<div class="stat-row"><span>语速</span><input type="number" id="speechRate" value="' + state.settings.speechRate + '" min="60" max="200" step="5"> 词/分</div>';
    html += '<div class="stat-row"><span>停顿</span><input type="number" id="pauseTime" value="' + state.settings.pauseTime + '" min="0" max="120" step="5"> 秒</div>';
    html += '<div class="stat-row"><span>预计时长</span><span class="stat-value">' + durMin + '分' + durSec + '秒</span></div>';
    html += '<p style="font-size:.72rem;color:#bdc3c7;margin-top:6px;">实际时长以本人练习计时为准。</p>';
    html += '</div>';

    // Timer
    html += '<div class="sidebar-card"><h4>⏱ 练习计时</h4>';
    html += '<div class="timer-display" id="timerDisplay">' + formatTime(state.timer.elapsed) + '</div>';
    html += '<div class="timer-controls">';
    html += '<button class="timer-btn start" id="timerStart" title="开始/继续">▶</button>';
    html += '<button class="timer-btn pause" id="timerPause" title="暂停">⏸</button>';
    html += '<button class="timer-btn reset" id="timerReset" title="重置">↺</button>';
    html += '</div></div>';

    // Actions
    html += '<div class="sidebar-card"><h4>📤 操作</h4>';
    html += '<div class="action-btn-row">';
    html += '<button class="btn btn-secondary" id="copyText">复制正文</button>';
    html += '<button class="btn btn-secondary" id="downloadTxt">下载 TXT</button>';
    html += '<button class="btn btn-outline" id="printPdf">打印 / 另存 PDF</button>';
    html += '<button class="btn btn-outline" id="resetDraft">恢复原始稿件</button>';
    html += '</div></div>';

    html += '</div>'; // sidebar
    html += '</div>'; // layout

    app.innerHTML = html;

    // ===== Workshop Events =====
    // Member tabs
    app.querySelectorAll('[data-member-tab]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.activeMember = parseInt(this.getAttribute('data-member-tab'));
        stopTimer();
        state.timer.elapsed = 0;
        renderWorkshop();
      });
    });

    // View mode
    app.querySelectorAll('[data-view]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.workshopView = this.getAttribute('data-view');
        renderWorkshop();
      });
    });

    // Font size
    app.querySelectorAll('[data-font]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.fontSize = this.getAttribute('data-font');
        renderWorkshop();
      });
    });

    // Speech rate & pause
    var sr = document.getElementById('speechRate');
    if (sr) sr.addEventListener('change', function() {
      state.settings.speechRate = Math.max(60, Math.min(200, parseInt(this.value) || 110));
      saveSettings(); renderWorkshop();
    });
    var pt = document.getElementById('pauseTime');
    if (pt) pt.addEventListener('change', function() {
      state.settings.pauseTime = Math.max(0, Math.min(120, parseInt(this.value) || 20));
      saveSettings(); renderWorkshop();
    });

    // Paragraph edit (auto-save)
    app.querySelectorAll('[data-para]').forEach(function(ta) {
      ta.addEventListener('input', function() {
        var idx = parseInt(this.getAttribute('data-para'));
        var draft = state.drafts[state.activeMember];
        if (!draft) {
          draft = { paragraphs: speech.speech.map(function(p) { return { en: p.en, cn: p.cn, edited: false }; }) };
        }
        draft.paragraphs[idx].en = this.value;
        draft.paragraphs[idx].edited = draft.paragraphs[idx].en !== speech.speech[idx].en;
        state.drafts[state.activeMember] = draft;
        saveDrafts();
        // Update word count without full re-render
        var totalW = countWords(draft.paragraphs.map(function(p){return p.en;}).join(' '));
        var dur = totalW / state.settings.speechRate * 60 + state.settings.pauseTime;
        var dm = Math.floor(dur/60), ds = Math.round(dur%60);
        var sv = app.querySelector('.stat-value');
        if (sv) sv.textContent = totalW + ' 词';
        var sv2 = app.querySelectorAll('.stat-value')[1];
        if (sv2) sv2.textContent = dm + '分' + ds + '秒';
        // Show warning on edited paragraph
        var para = this.closest('.speech-paragraph');
        if (para) para.classList.add('edited');
      });
    });

    // Timer
    var ts = document.getElementById('timerStart');
    if (ts) ts.addEventListener('click', startTimer);
    var tp = document.getElementById('timerPause');
    if (tp) tp.addEventListener('click', pauseTimer);
    var tr = document.getElementById('timerReset');
    if (tr) tr.addEventListener('click', function() { stopTimer(); state.timer.elapsed = 0; updateTimerDisplay(); });

    // Copy text
    var ct = document.getElementById('copyText');
    if (ct) ct.addEventListener('click', function() {
      var text = paragraphs.map(function(p){return p.en;}).join('\n\n');
      navigator.clipboard.writeText(text).then(function() {
        toast('已复制英文正文到剪贴板', 'success');
      }).catch(function() {
        // Fallback
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); toast('已复制英文正文', 'success'); }
        catch(e) { toast('复制失败', 'error'); }
        document.body.removeChild(ta);
      });
    });

    // Download TXT
    var dt = document.getElementById('downloadTxt');
    if (dt) dt.addEventListener('click', function() {
      var lines = [];
      lines.push(name + ' - ' + speech.topicsCn);
      lines.push('');
      paragraphs.forEach(function(p, i) {
        lines.push('[段落 ' + (i+1) + ']');
        lines.push(p.en);
        if (state.workshopView !== 'english') { lines.push(p.cn); }
        lines.push('');
      });
      lines.push('---');
      lines.push('词数: ' + countWords(paragraphs.map(function(p){return p.en;}).join(' ')));
      lines.push('预计时长: ' + durMin + '分' + durSec + '秒 (语速' + state.settings.speechRate + '词/分, 停顿' + state.settings.pauseTime + '秒)');
      var blob = new Blob([lines.join('\n')], {type:'text/plain;charset=utf-8'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = name + '-speech.txt'; a.click();
      URL.revokeObjectURL(url);
      toast('已下载 TXT 文件', 'success');
    });

    // Print / PDF
    var pp = document.getElementById('printPdf');
    if (pp) pp.addEventListener('click', function() { window.print(); });

    // Reset draft
    var rd = document.getElementById('resetDraft');
    if (rd) rd.addEventListener('click', function() {
      showConfirm('恢复原始稿件', '将清除当前编辑内容，恢复为原始示范稿。确定继续吗？', function() {
        delete state.drafts[state.activeMember];
        saveDrafts();
        renderWorkshop();
        toast('已恢复原始稿件', 'success');
      });
    });
  }

  // ===== TIMER =====
  function startTimer() {
    if (state.timer.running) return;
    state.timer.running = true;
    state.timer.intervalId = setInterval(function() {
      state.timer.elapsed++;
      updateTimerDisplay();
    }, 1000);
  }
  function pauseTimer() {
    if (!state.timer.running) return;
    state.timer.running = false;
    clearInterval(state.timer.intervalId);
  }
  function stopTimer() {
    state.timer.running = false;
    if (state.timer.intervalId) { clearInterval(state.timer.intervalId); state.timer.intervalId = null; }
  }
  function updateTimerDisplay() {
    var el = document.getElementById('timerDisplay');
    if (el) el.textContent = formatTime(state.timer.elapsed);
  }

  // ===== SOURCES PAGE =====
  function renderSources() {
    var app = document.getElementById('app');
    var html = '<h1 class="page-title">资料来源</h1>';
    html += '<p class="page-subtitle">以下来源涉及健康和研究益处。个人感受与研究结论已区分，研究结论使用"can help""may support"等表达。访问日期：2026-09-11。</p>';
    html += '<div style="background:#fef9f0;border:1px solid #fdebd0;border-radius:8px;padding:12px 16px;margin-bottom:16px;font-size:.82rem;color:#7f8c8d;">';
    html += '<strong>说明：</strong>标注"已核验"的来源已通过直接访问确认；标注"待核验"的来源因网站限制自动化访问（如返回403），建议在浏览器中打开核实。未编造任何统计数字或参考文献。</div>';

    SOURCES.forEach(function(s) {
      html += '<div class="source-card ' + (s.verified ? 'verified' : 'unverified') + '">';
      html += '<div class="source-title">' + esc(s.title);
      html += '<span class="verify-badge ' + (s.verified ? 'ok' : 'pending') + '">' + (s.verified ? '已核验' : '待核验') + '</span></div>';
      html += '<div class="source-publisher">' + esc(s.publisher) + '</div>';
      html += '<div class="source-meta">发布：' + esc(s.publishDate) + ' ｜ 访问：' + esc(s.accessDate) + '</div>';
      html += '<p class="source-summary">' + esc(s.summary) + '</p>';
      html += '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" class="source-link">' + esc(s.url) + '</a>';
      if (s.relatedActivities && s.relatedActivities.length > 0) {
        var names = s.relatedActivities.map(function(id){ var a = getActivity(id); return a ? a.nameCn : id; });
        html += '<div class="source-related">关联活动：' + esc(names.join('、')) + '</div>';
      }
      html += '</div>';
    });

    // Note about evidence
    html += '<div class="detail-section" style="margin-top:20px;">';
    html += '<h3 class="section-heading">证据使用说明</h3>';
    html += '<ul class="tip-list" style="padding-left:20px;">';
    html += '<li>个人感受使用第一人称（如"I feel…"），不与研究结论混为一谈。</li>';
    html += '<li>研究结论使用谨慎表达（如"can help""may support""may be associated with"），不宣称因果关系。</li>';
    html += '<li>不宣称休闲活动能治疗疾病，不编造统计数字。</li>';
    html += '<li>同一来源可支持多项相关活动，均链接到具体页面而非机构首页。</li>';
    html += '</ul></div>';

    app.innerHTML = html;
  }

  // ===== MODAL =====
  function showConfirm(title, body, onConfirm) {
    var overlay = document.getElementById('modalOverlay');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').textContent = body;
    overlay.hidden = false;
    var cancel = document.getElementById('modalCancel');
    var confirm = document.getElementById('modalConfirm');
    function cleanup() { overlay.hidden = true; cancel.removeEventListener('click', onCancel); confirm.removeEventListener('click', onOk); }
    function onCancel() { cleanup(); }
    function onOk() { cleanup(); onConfirm(); }
    cancel.addEventListener('click', onCancel);
    confirm.addEventListener('click', onOk);
  }

  // ===== INIT =====
  function init() {
    loadState();
    initMembers();
    updateCompareBadge();
    document.getElementById('navToggle').addEventListener('click', toggleMobileNav);
    window.addEventListener('hashchange', router);
    window.addEventListener('beforeunload', function() {
      saveFavorites(); saveCompare(); saveSettings(); saveDrafts(); saveMembers();
    });
    router();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
