/**
 * ByteBench - Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    laptops: [...LAPTOPS_DATA],
    filteredLaptops: [...LAPTOPS_DATA],
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'rating-desc',
    compareList: [], // Array of laptop IDs (max 3)
    activeModalLaptop: null,
    quiz: {
      currentStep: 0,
      answers: {}
    },
    theme: localStorage.getItem('bytebench-theme') || 'dark'
  };

  // DOM Elements Cache
  const elements = {
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    navMenu: document.getElementById('navMenu'),
    headerSearchInput: document.getElementById('headerSearchInput'),
    categoryFilterContainer: document.getElementById('categoryFilters'),
    sortSelect: document.getElementById('sortSelect'),
    resultsCountText: document.getElementById('resultsCountText'),
    laptopsGrid: document.getElementById('laptopsGrid'),
    compareBtnBadge: document.getElementById('compareBtnBadge'),
    compareCountPill: document.getElementById('compareCountPill'),
    compareDock: document.getElementById('compareDock'),
    compareDockCount: document.getElementById('compareDockCount'),
    compareThumbsContainer: document.getElementById('compareThumbsContainer'),
    openCompareModalBtn: document.getElementById('openCompareModalBtn'),
    clearCompareBtn: document.getElementById('clearCompareBtn'),
    // Review Modal
    reviewModal: document.getElementById('reviewModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalHeroImg: document.getElementById('modalHeroImg'),
    modalTitle: document.getElementById('modalTitle'),
    modalSubtitle: document.getElementById('modalSubtitle'),
    modalScoreNum: document.getElementById('modalScoreNum'),
    modalTabs: document.querySelectorAll('.modal-tab-btn'),
    modalTabPanes: document.querySelectorAll('.tab-pane'),
    // Modal Tab Panes
    verdictHeadline: document.getElementById('verdictHeadline'),
    verdictSummary: document.getElementById('verdictSummary'),
    verdictProsList: document.getElementById('verdictProsList'),
    verdictConsList: document.getElementById('verdictConsList'),
    verdictIdealFor: document.getElementById('verdictIdealFor'),
    modalSpecsTableBody: document.getElementById('modalSpecsTableBody'),
    benchmarksContainer: document.getElementById('benchmarksContainer'),
    userReviewsList: document.getElementById('userReviewsList'),
    addReviewForm: document.getElementById('addReviewForm'),
    reviewLaptopIdInput: document.getElementById('reviewLaptopIdInput'),
    // Compare Modal
    compareModal: document.getElementById('compareModal'),
    compareModalCloseBtn: document.getElementById('compareModalCloseBtn'),
    comparisonTableContainer: document.getElementById('comparisonTableContainer'),
    // Quiz Elements
    quizProgressBar: document.getElementById('quizProgressBar'),
    quizStepNum: document.getElementById('quizStepNum'),
    quizQuestionTitle: document.getElementById('quizQuestionTitle'),
    quizOptionsGrid: document.getElementById('quizOptionsGrid'),
    quizPrevBtn: document.getElementById('quizPrevBtn'),
    quizNextBtn: document.getElementById('quizNextBtn'),
    quizResultWrapper: document.getElementById('quizResultWrapper'),
    quizQuestionWrapper: document.getElementById('quizQuestionWrapper'),
    quizRestartBtn: document.getElementById('quizRestartBtn'),
    quizResultCard: document.getElementById('quizResultCard'),
    // Newsletter & FAQ
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterInput: document.getElementById('newsletterInput'),
    toastContainer: document.getElementById('toastContainer')
  };

  /* ==========================================================================
     Theme Management
     ========================================================================== */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    state.theme = theme;
    localStorage.setItem('bytebench-theme', theme);
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.innerHTML = theme === 'dark' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  applyTheme(state.theme);

  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener('click', () => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  /* ==========================================================================
     Mobile Navigation
     ========================================================================== */
  if (elements.mobileMenuBtn && elements.navMenu) {
    elements.mobileMenuBtn.addEventListener('click', () => {
      elements.navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        elements.navMenu.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     Filter, Search and Sort Logic
     ========================================================================== */
  function filterAndSortLaptops() {
    let list = [...state.laptops];

    // Filter by Category
    if (state.activeCategory !== 'all') {
      list = list.filter(item => item.category === state.activeCategory);
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(item => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.specs.processor.toLowerCase().includes(q) ||
          item.specs.graphics.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q)
        );
      });
    }

    // Sort
    switch (state.sortBy) {
      case 'rating-desc':
        list.sort((a, b) => b.overallScore - a.overallScore);
        break;
      case 'battery-desc':
        list.sort((a, b) => b.benchmarks.batteryWebHours - a.benchmarks.batteryWebHours);
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'performance-desc':
        list.sort((a, b) => b.benchmarks.cinebenchR24Multi - a.benchmarks.cinebenchR24Multi);
        break;
    }

    state.filteredLaptops = list;
    renderLaptopsGrid();
    if (elements.resultsCountText) {
      elements.resultsCountText.textContent = `Showing ${list.length} of ${state.laptops.length} laptops`;
    }
  }

  // Category Pills
  if (elements.categoryFilterContainer) {
    elements.categoryFilterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.category-pill-btn');
      if (!btn) return;
      document.querySelectorAll('.category-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category;
      filterAndSortLaptops();
    });
  }

  // Sort Dropdown
  if (elements.sortSelect) {
    elements.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      filterAndSortLaptops();
    });
  }

  // Search Input with Debounce
  let searchTimeout = null;
  if (elements.headerSearchInput) {
    elements.headerSearchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.searchQuery = e.target.value;
        filterAndSortLaptops();
      }, 200);
    });
  }

  /* ==========================================================================
     Render Laptop Review Cards Grid
     ========================================================================== */
  function renderLaptopsGrid() {
    if (!elements.laptopsGrid) return;

    if (state.filteredLaptops.length === 0) {
      elements.laptopsGrid.innerHTML = `
        <div class="no-results-msg">
          <h3>No matching laptops found</h3>
          <p>Try refining your search keyword or clearing the active category filters.</p>
        </div>
      `;
      return;
    }

    elements.laptopsGrid.innerHTML = state.filteredLaptops.map(laptop => {
      const isCompared = state.compareList.includes(laptop.id);
      return `
        <article class="laptop-card" data-id="${laptop.id}">
          <div class="card-header-img">
            <span class="card-badge ${laptop.badgeType}">${laptop.badge}</span>
            <div class="card-score-badge">
              ${laptop.overallScore} <span>/10</span>
            </div>
            <img src="${laptop.image}" alt="${laptop.title}" loading="lazy">
          </div>

          <div class="card-body">
            <div class="card-category-brand">
              <span class="brand-name">${laptop.brand}</span>
              <span>${laptop.categoryLabel}</span>
            </div>
            <h3 class="card-title">${laptop.title}</h3>
            <p class="card-subtitle">${laptop.subtitle}</p>

            <div class="card-specs-list">
              <div class="spec-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
                <span><strong>CPU:</strong> ${laptop.specs.processor}</span>
              </div>
              <div class="spec-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span><strong>GPU:</strong> ${laptop.specs.graphics}</span>
              </div>
              <div class="spec-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                <span><strong>Display:</strong> ${laptop.specs.display.split(',')[0]}</span>
              </div>
              <div class="spec-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg>
                <span><strong>Battery:</strong> ${laptop.benchmarks.batteryWebHours} hrs Lab Test</span>
              </div>
            </div>

            <!-- Score breakdown bars -->
            <div class="score-bars-container">
              <div class="score-bar-item">
                <span class="score-label">Performance</span>
                <div class="score-track"><div class="score-fill" style="width: ${laptop.scores.performance * 10}%"></div></div>
                <span class="score-value">${laptop.scores.performance}</span>
              </div>
              <div class="score-bar-item">
                <span class="score-label">Battery</span>
                <div class="score-track"><div class="score-fill" style="width: ${laptop.scores.battery * 10}%"></div></div>
                <span class="score-value">${laptop.scores.battery}</span>
              </div>
              <div class="score-bar-item">
                <span class="score-label">Display</span>
                <div class="score-track"><div class="score-fill" style="width: ${laptop.scores.display * 10}%"></div></div>
                <span class="score-value">${laptop.scores.display}</span>
              </div>
            </div>

            <p class="card-highlight-quote">"${laptop.verdict.headline}"</p>

            <div class="card-footer">
              <div class="card-price-block">
                <span class="card-price-label">Tested Price</span>
                <span class="card-price-val">${laptop.priceFormatted}</span>
              </div>
              <div class="card-action-btns">
                <button class="btn-card-compare ${isCompared ? 'active' : ''}" data-action="toggle-compare" title="${isCompared ? 'Remove from compare' : 'Add to compare'}">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
                </button>
                <button class="btn-card-details" data-action="open-details">
                  Read Review
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Card click delegation
  if (elements.laptopsGrid) {
    elements.laptopsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.laptop-card');
      if (!card) return;
      const laptopId = card.dataset.id;

      const compareBtn = e.target.closest('[data-action="toggle-compare"]');
      if (compareBtn) {
        toggleCompare(laptopId);
        return;
      }

      const detailsBtn = e.target.closest('[data-action="open-details"]');
      if (detailsBtn || e.target.closest('.card-header-img')) {
        openReviewModal(laptopId);
      }
    });
  }

  /* ==========================================================================
     Comparison System (Dock & Modal)
     ========================================================================== */
  function toggleCompare(laptopId) {
    const idx = state.compareList.indexOf(laptopId);
    if (idx > -1) {
      state.compareList.splice(idx, 1);
      showToast('Removed laptop from comparison');
    } else {
      if (state.compareList.length >= 3) {
        showToast('You can compare a maximum of 3 laptops at once');
        return;
      }
      state.compareList.push(laptopId);
      const laptop = state.laptops.find(l => l.id === laptopId);
      showToast(`Added ${laptop.title} to comparison`);
    }
    updateCompareDock();
    renderLaptopsGrid();
  }

  function updateCompareDock() {
    const count = state.compareList.length;
    if (elements.compareCountPill) {
      elements.compareCountPill.textContent = count;
    }
    if (elements.compareDockCount) {
      elements.compareDockCount.textContent = `${count} Selected`;
    }

    if (count > 0) {
      elements.compareDock.classList.add('visible');
    } else {
      elements.compareDock.classList.remove('visible');
    }

    if (elements.compareThumbsContainer) {
      const slots = [0, 1, 2].map(i => {
        const id = state.compareList[i];
        if (id) {
          const item = state.laptops.find(l => l.id === id);
          return `
            <div class="compare-thumb-slot filled" title="${item.title}">
              <img src="${item.image}" alt="${item.title}">
              <span class="compare-thumb-remove" data-remove-id="${item.id}">×</span>
            </div>
          `;
        }
        return `<div class="compare-thumb-slot">+</div>`;
      }).join('');
      elements.compareThumbsContainer.innerHTML = slots;

      // Handle remove click on thumb
      elements.compareThumbsContainer.querySelectorAll('.compare-thumb-remove').forEach(rmBtn => {
        rmBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleCompare(rmBtn.dataset.removeId);
        });
      });
    }
  }

  if (elements.clearCompareBtn) {
    elements.clearCompareBtn.addEventListener('click', () => {
      state.compareList = [];
      updateCompareDock();
      renderLaptopsGrid();
      showToast('Comparison list cleared');
    });
  }

  if (elements.compareBtnBadge) {
    elements.compareBtnBadge.addEventListener('click', () => {
      if (state.compareList.length < 2) {
        showToast('Please select at least 2 laptops to compare');
        return;
      }
      openComparisonModal();
    });
  }

  if (elements.openCompareModalBtn) {
    elements.openCompareModalBtn.addEventListener('click', () => {
      if (state.compareList.length < 2) {
        showToast('Select at least 2 laptops to open comparison table');
        return;
      }
      openComparisonModal();
    });
  }

  function openComparisonModal() {
    const laptopsToCompare = state.compareList.map(id => state.laptops.find(l => l.id === id)).filter(Boolean);
    if (laptopsToCompare.length < 2) return;

    // Determine highest values for winning indicators
    const maxScore = Math.max(...laptopsToCompare.map(l => l.overallScore));
    const maxBattery = Math.max(...laptopsToCompare.map(l => l.benchmarks.batteryWebHours));
    const maxCinebench = Math.max(...laptopsToCompare.map(l => l.benchmarks.cinebenchR24Multi));
    const minPrice = Math.min(...laptopsToCompare.map(l => l.price));

    const html = `
      <div class="comparison-table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Feature / Metric</th>
              ${laptopsToCompare.map(l => `
                <th>
                  <div class="comp-laptop-header">
                    <img src="${l.image}" alt="${l.title}">
                    <h4>${l.title}</h4>
                    <span class="comp-price">${l.priceFormatted}</span>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Overall Lab Score</td>
              ${laptopsToCompare.map(l => `
                <td class="${l.overallScore === maxScore ? 'comp-winner' : ''}">
                  ${l.overallScore} / 10 ${l.overallScore === maxScore ? '🏆 Best' : ''}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td>Category</td>
              ${laptopsToCompare.map(l => `<td>${l.categoryLabel}</td>`).join('')}
            </tr>
            <tr>
              <td>Battery Run-down (Web Test)</td>
              ${laptopsToCompare.map(l => `
                <td class="${l.benchmarks.batteryWebHours === maxBattery ? 'comp-winner' : ''}">
                  ${l.benchmarks.batteryWebHours} Hours ${l.benchmarks.batteryWebHours === maxBattery ? '⚡ Longest' : ''}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td>Cinebench 2024 Multi-Core</td>
              ${laptopsToCompare.map(l => `
                <td class="${l.benchmarks.cinebenchR24Multi === maxCinebench ? 'comp-winner' : ''}">
                  ${l.benchmarks.cinebenchR24Multi} pts ${l.benchmarks.cinebenchR24Multi === maxCinebench ? '🚀 Fast' : ''}
                </td>
              `).join('')}
            </tr>
            <tr>
              <td>Processor</td>
              ${laptopsToCompare.map(l => `<td>${l.specs.processor}</td>`).join('')}
            </tr>
            <tr>
              <td>Graphics (GPU)</td>
              ${laptopsToCompare.map(l => `<td>${l.specs.graphics}</td>`).join('')}
            </tr>
            <tr>
              <td>RAM / Memory</td>
              ${laptopsToCompare.map(l => `<td>${l.specs.ram}</td>`).join('')}
            </tr>
            <tr>
              <td>Display</td>
              ${laptopsToCompare.map(l => `<td>${l.specs.display}</td>`).join('')}
            </tr>
            <tr>
              <td>Weight</td>
              ${laptopsToCompare.map(l => `<td>${l.specs.weight}</td>`).join('')}
            </tr>
            <tr>
              <td>Thermal Max Load</td>
              ${laptopsToCompare.map(l => `<td>${l.benchmarks.temperatureMaxC}°C / ${l.benchmarks.noiseDecibels} dB</td>`).join('')}
            </tr>
            <tr>
              <td>Price Value</td>
              ${laptopsToCompare.map(l => `
                <td class="${l.price === minPrice ? 'comp-winner' : ''}">
                  ${l.priceFormatted} ${l.price === minPrice ? '💰 Best Price' : ''}
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    elements.comparisonTableContainer.innerHTML = html;
    elements.compareModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (elements.compareModalCloseBtn) {
    elements.compareModalCloseBtn.addEventListener('click', () => {
      elements.compareModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  /* ==========================================================================
     In-Depth Review Modal
     ========================================================================== */
  function openReviewModal(laptopId) {
    const laptop = state.laptops.find(l => l.id === laptopId);
    if (!laptop) return;

    state.activeModalLaptop = laptop;

    // Header info
    elements.modalHeroImg.src = laptop.image;
    elements.modalHeroImg.alt = laptop.title;
    elements.modalTitle.textContent = laptop.title;
    elements.modalSubtitle.textContent = `${laptop.brand} • ${laptop.subtitle} • Tested at ${laptop.priceFormatted}`;
    elements.modalScoreNum.textContent = laptop.overallScore;

    // Tab 1: Overview
    elements.verdictHeadline.textContent = laptop.verdict.headline;
    elements.verdictSummary.textContent = laptop.verdict.summary;
    elements.verdictIdealFor.textContent = laptop.verdict.idealFor;

    elements.verdictProsList.innerHTML = laptop.verdict.pros.map(pro => `<li>${pro}</li>`).join('');
    elements.verdictConsList.innerHTML = laptop.verdict.cons.map(con => `<li>${con}</li>`).join('');

    // Tab 2: Specs Table
    elements.modalSpecsTableBody.innerHTML = Object.entries(laptop.specs).map(([key, val]) => `
      <tr>
        <td>${key.charAt(0).toUpperCase() + key.slice(1)}</td>
        <td>${val}</td>
      </tr>
    `).join('');

    // Tab 3: Lab Benchmarks
    renderBenchmarksTab(laptop);

    // Tab 4: User Reviews
    renderUserReviews(laptop);
    if (elements.reviewLaptopIdInput) {
      elements.reviewLaptopIdInput.value = laptop.id;
    }

    // Switch to Overview Tab by default
    switchModalTab('overview');

    elements.reviewModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderBenchmarksTab(laptop) {
    if (!elements.benchmarksContainer) return;

    const cbPercent = Math.min(100, Math.round((laptop.benchmarks.cinebenchR24Multi / 2000) * 100));
    const batteryPercent = Math.min(100, Math.round((laptop.benchmarks.batteryWebHours / 24) * 100));
    const noisePercent = Math.min(100, Math.round((laptop.benchmarks.noiseDecibels / 55) * 100));

    elements.benchmarksContainer.innerHTML = `
      <div class="benchmark-visual-item">
        <div class="benchmark-meta">
          <strong>Cinebench 2024 Multi-Core (CPU Power)</strong>
          <span><strong>${laptop.benchmarks.cinebenchR24Multi}</strong> pts</span>
        </div>
        <div class="benchmark-bar-track">
          <div class="benchmark-bar-fill" style="width: ${cbPercent}%"></div>
        </div>
        <div class="benchmark-legend">
          <span>Database Avg: ${BENCHMARK_AVERAGES.cinebenchR24Multi} pts</span>
          <span>Difference: ${laptop.benchmarks.cinebenchR24Multi >= BENCHMARK_AVERAGES.cinebenchR24Multi ? '+' : ''}${Math.round(((laptop.benchmarks.cinebenchR24Multi - BENCHMARK_AVERAGES.cinebenchR24Multi) / BENCHMARK_AVERAGES.cinebenchR24Multi) * 100)}%</span>
        </div>
      </div>

      <div class="benchmark-visual-item">
        <div class="benchmark-meta">
          <strong>Continuous 150-Nit Web Battery Life</strong>
          <span><strong>${laptop.benchmarks.batteryWebHours}</strong> Hours</span>
        </div>
        <div class="benchmark-bar-track">
          <div class="benchmark-bar-fill" style="width: ${batteryPercent}%; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);"></div>
        </div>
        <div class="benchmark-legend">
          <span>Database Avg: ${BENCHMARK_AVERAGES.batteryWebHours} Hours</span>
          <span>Endurance: ${laptop.benchmarks.batteryWebHours > 12 ? 'Excellent' : 'Moderate'}</span>
        </div>
      </div>

      <div class="benchmark-visual-item">
        <div class="benchmark-meta">
          <strong>Acoustic Fan Noise under Heavy Render</strong>
          <span><strong>${laptop.benchmarks.noiseDecibels}</strong> dB (A-Weighted)</span>
        </div>
        <div class="benchmark-bar-track">
          <div class="benchmark-bar-fill" style="width: ${noisePercent}%; background: linear-gradient(135deg, #f59e0b 0%, #f43f5e 100%);"></div>
        </div>
        <div class="benchmark-legend">
          <span>Database Avg: ${BENCHMARK_AVERAGES.noiseDecibels} dB</span>
          <span>Peak Thermals: ${laptop.benchmarks.temperatureMaxC}°C chassis core</span>
        </div>
      </div>
    `;
  }

  function renderUserReviews(laptop) {
    if (!elements.userReviewsList) return;

    // Load any user added reviews from localStorage
    const storedReviewsKey = `bytebench-reviews-${laptop.id}`;
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(storedReviewsKey) || '[]');
    } catch(e) { saved = []; }

    const combinedReviews = [...laptop.userReviews, ...saved];

    elements.userReviewsList.innerHTML = combinedReviews.map(r => {
      const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
      return `
        <div class="user-review-card">
          <div class="review-author-row">
            <span class="review-author-name">${r.name}</span>
            <span class="review-stars">${stars}</span>
          </div>
          <p class="review-comment">${r.comment}</p>
        </div>
      `;
    }).join('');
  }

  // Handle Review Submission
  if (elements.addReviewForm) {
    elements.addReviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const laptopId = elements.reviewLaptopIdInput.value;
      const name = document.getElementById('reviewerName').value.trim() || 'Verified Tech Reader';
      const rating = parseInt(document.getElementById('reviewerRating').value, 10);
      const comment = document.getElementById('reviewerComment').value.trim();

      if (!comment) return;

      const newReview = { name, rating, comment, date: 'Just now' };

      const storedReviewsKey = `bytebench-reviews-${laptopId}`;
      let saved = [];
      try {
        saved = JSON.parse(localStorage.getItem(storedReviewsKey) || '[]');
      } catch(err) { saved = []; }

      saved.push(newReview);
      localStorage.setItem(storedReviewsKey, JSON.stringify(saved));

      // Re-render
      const laptop = state.laptops.find(l => l.id === laptopId);
      if (laptop) {
        renderUserReviews(laptop);
      }

      elements.addReviewForm.reset();
      showToast('Thank you! Your community review has been published.');
    });
  }

  // Modal Tabs Navigation
  function switchModalTab(targetTabId) {
    elements.modalTabs.forEach(btn => {
      if (btn.dataset.tab === targetTabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    elements.modalTabPanes.forEach(pane => {
      if (pane.id === `tab-${targetTabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }

  elements.modalTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      switchModalTab(btn.dataset.tab);
    });
  });

  // Modal Close
  if (elements.modalCloseBtn) {
    elements.modalCloseBtn.addEventListener('click', () => {
      elements.reviewModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close modals when clicking outside container
  window.addEventListener('click', (e) => {
    if (e.target === elements.reviewModal) {
      elements.reviewModal.classList.remove('open');
      document.body.style.overflow = '';
    }
    if (e.target === elements.compareModal) {
      elements.compareModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      elements.reviewModal.classList.remove('open');
      elements.compareModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ==========================================================================
     Interactive Laptop Matchmaker Quiz
     ========================================================================== */
  function renderQuizStep() {
    const currentQ = QUIZ_QUESTIONS[state.quiz.currentStep];
    if (!currentQ) return;

    elements.quizQuestionWrapper.style.display = 'block';
    elements.quizResultWrapper.style.display = 'none';

    elements.quizStepNum.textContent = `Question ${state.quiz.currentStep + 1} of ${QUIZ_QUESTIONS.length}`;
    elements.quizQuestionTitle.textContent = currentQ.title;
    elements.quizProgressBar.style.width = `${((state.quiz.currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`;

    const savedAnswer = state.quiz.answers[currentQ.id];

    elements.quizOptionsGrid.innerHTML = currentQ.options.map(opt => `
      <button class="quiz-option-btn ${savedAnswer === opt.value ? 'selected' : ''}" data-value="${opt.value}">
        <span class="option-icon">${opt.icon}</span>
        <span class="option-text">${opt.label}</span>
      </button>
    `).join('');

    // Previous Button Visibility
    if (state.quiz.currentStep === 0) {
      elements.quizPrevBtn.style.visibility = 'hidden';
    } else {
      elements.quizPrevBtn.style.visibility = 'visible';
    }

    // Next Button text
    elements.quizNextBtn.textContent = state.quiz.currentStep === QUIZ_QUESTIONS.length - 1 ? 'Find My Laptop ⚡' : 'Next Step →';
  }

  if (elements.quizOptionsGrid) {
    elements.quizOptionsGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-option-btn');
      if (!btn) return;
      const currentQ = QUIZ_QUESTIONS[state.quiz.currentStep];
      state.quiz.answers[currentQ.id] = btn.dataset.value;

      elements.quizOptionsGrid.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  }

  if (elements.quizNextBtn) {
    elements.quizNextBtn.addEventListener('click', () => {
      const currentQ = QUIZ_QUESTIONS[state.quiz.currentStep];
      if (!state.quiz.answers[currentQ.id]) {
        showToast('Please pick an option to continue');
        return;
      }

      if (state.quiz.currentStep < QUIZ_QUESTIONS.length - 1) {
        state.quiz.currentStep++;
        renderQuizStep();
      } else {
        calculateQuizRecommendation();
      }
    });
  }

  if (elements.quizPrevBtn) {
    elements.quizPrevBtn.addEventListener('click', () => {
      if (state.quiz.currentStep > 0) {
        state.quiz.currentStep--;
        renderQuizStep();
      }
    });
  }

  function calculateQuizRecommendation() {
    const { usecase, budget, priority } = state.quiz.answers;
    let matchedLaptop = null;

    // Primary matching by usecase
    if (usecase === 'gaming') {
      matchedLaptop = state.laptops.find(l => l.id === 'aorus-master-16x');
    } else if (usecase === 'creator') {
      matchedLaptop = budget === 'midrange' 
        ? state.laptops.find(l => l.id === 'zenith-xps-14') 
        : state.laptops.find(l => l.id === 'macbook-pro-16');
    } else if (usecase === 'convertible') {
      matchedLaptop = state.laptops.find(l => l.id === 'titan-360-flip');
    } else if (usecase === 'student' || budget === 'budget') {
      matchedLaptop = state.laptops.find(l => l.id === 'aurabook-horizon-14');
    } else {
      matchedLaptop = priority === 'battery' 
        ? state.laptops.find(l => l.id === 'macbook-pro-16')
        : state.laptops.find(l => l.id === 'zenith-xps-14');
    }

    if (!matchedLaptop) {
      matchedLaptop = state.laptops[0];
    }

    elements.quizQuestionWrapper.style.display = 'none';
    elements.quizResultWrapper.style.display = 'block';

    elements.quizResultCard.innerHTML = `
      <img src="${matchedLaptop.image}" alt="${matchedLaptop.title}" class="quiz-result-img">
      <div class="quiz-result-details">
        <span class="card-badge ${matchedLaptop.badgeType}" style="margin-bottom: 0.5rem; display: inline-block;">
          Perfect Match for Your Needs
        </span>
        <h4>${matchedLaptop.title}</h4>
        <p>${matchedLaptop.verdict.headline}</p>
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <span style="font-size: 1.25rem; font-weight: 800; color: var(--accent-cyan);">${matchedLaptop.priceFormatted}</span>
          <button class="btn-primary" onclick="window.appOpenDetails('${matchedLaptop.id}')" style="padding: 0.5rem 1.25rem; font-size: 0.88rem;">
            Read Full Review
          </button>
        </div>
      </div>
    `;
  }

  // Global helper for quiz card CTA
  window.appOpenDetails = function(laptopId) {
    openReviewModal(laptopId);
  };

  if (elements.quizRestartBtn) {
    elements.quizRestartBtn.addEventListener('click', () => {
      state.quiz.currentStep = 0;
      state.quiz.answers = {};
      renderQuizStep();
    });
  }

  /* ==========================================================================
     FAQ Accordion
     ========================================================================== */
  document.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     Newsletter Subscription
     ========================================================================== */
  if (elements.newsletterForm) {
    elements.newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = elements.newsletterInput.value.trim();
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address');
        return;
      }
      elements.newsletterInput.value = '';
      showToast('Subscribed! Check your inbox for our latest benchmark digests.');
    });
  }

  /* ==========================================================================
     Toast Notifications Helper
     ========================================================================== */
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /* ==========================================================================
     Initial App Bootstrap
     ========================================================================== */
  renderLaptopsGrid();
  updateCompareDock();
  renderQuizStep();

  // Spotlight card in hero: wire up button
  const spotlightBtn = document.getElementById('heroSpotlightBtn');
  if (spotlightBtn) {
    spotlightBtn.addEventListener('click', () => {
      openReviewModal('macbook-pro-16');
    });
  }
});
