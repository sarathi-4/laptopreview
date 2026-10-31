/**
 * Sara Laptop Store & Tech Services - Interactive Shop Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Management (Synced with Main ByteBench Site)
  const themeState = {
    current: localStorage.getItem('bytebench-theme') || 'dark'
  };

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const toastContainer = document.getElementById('toastContainer');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeState.current = theme;
    localStorage.setItem('bytebench-theme', theme);

    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === 'dark'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    }
  }

  applyTheme(themeState.current);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = themeState.current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme} mode`);
    });
  }

  // Mobile Navigation
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Toast Notification System
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Set minimum date for booking input to today
  const bookingDateInput = document.getElementById('bookingDate');
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
    bookingDateInput.value = today;
  }

  /* ==========================================================================
     Service Category Filter Pills
     ========================================================================== */
  const serviceFilterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* ==========================================================================
     Quick Book Buttons on Service Cards & Packages
     ========================================================================== */
  const bookingServiceSelect = document.getElementById('bookingService');

  document.querySelectorAll('.btn-book-service').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service-name');
      if (bookingServiceSelect && serviceName) {
        // Find matching option or closest match
        for (let i = 0; i < bookingServiceSelect.options.length; i++) {
          if (bookingServiceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
              serviceName.toLowerCase().includes(bookingServiceSelect.options[i].value.toLowerCase())) {
            bookingServiceSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Smooth scroll to booking section
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Selected "${serviceName}" — Please complete your reservation.`);
      }
    });
  });

  document.querySelectorAll('.package-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg = btn.getAttribute('data-package');
      if (bookingServiceSelect) {
        let optFound = false;
        for (let i = 0; i < bookingServiceSelect.options.length; i++) {
          if (bookingServiceSelect.options[i].text.includes('Bundle') || bookingServiceSelect.options[i].text.includes('Thermal')) {
            bookingServiceSelect.selectedIndex = i;
            optFound = true;
            break;
          }
        }
      }

      const symptomsBox = document.getElementById('bookingSymptoms');
      if (symptomsBox) {
        symptomsBox.value = `Selected Package: ${pkg}. Please prepare bench allocation.`;
      }

      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        showToast(`Selected ${pkg}`);
      }
    });
  });

  /* ==========================================================================
     Interactive Cost Estimator Logic
     ========================================================================== */
  const calcDeviceBtns = document.querySelectorAll('.device-pill-btn');
  const calcPrimaryService = document.getElementById('calcPrimaryService');
  const addonExpedite = document.getElementById('addonExpedite');
  const addonLiquidMetal = document.getElementById('addonLiquidMetal');
  const addonBackup = document.getElementById('addonBackup');

  const summaryDeviceLabel = document.getElementById('summaryDeviceLabel');
  const calcTotalEstimate = document.getElementById('calcTotalEstimate');
  const breakdownBasePrice = document.getElementById('breakdownBasePrice');
  const breakdownMultiplier = document.getElementById('breakdownMultiplier');
  const breakdownAddons = document.getElementById('breakdownAddons');
  const breakdownTurnaround = document.getElementById('breakdownTurnaround');
  const btnApplyQuote = document.getElementById('btnApplyQuote');

  let currentMultiplier = 1.0;
  let currentDeviceName = 'Windows Ultrabook / Office';

  calcDeviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      calcDeviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMultiplier = parseFloat(btn.getAttribute('data-multiplier') || '1.0');
      currentDeviceName = btn.querySelector('span:last-child').textContent;
      updateCostCalculator();
    });
  });

  if (calcPrimaryService) {
    calcPrimaryService.addEventListener('change', updateCostCalculator);
  }

  [addonExpedite, addonLiquidMetal, addonBackup].forEach(checkbox => {
    if (checkbox) {
      checkbox.addEventListener('change', updateCostCalculator);
    }
  });

  function updateCostCalculator() {
    if (!calcPrimaryService) return;

    const selectedOption = calcPrimaryService.options[calcPrimaryService.selectedIndex];
    const basePrice = parseFloat(selectedOption.getAttribute('data-base') || '39');
    let baseTurnaround = selectedOption.getAttribute('data-time') || '2 Hours';

    // Calculate Addons
    let addonsCost = 0;
    if (addonExpedite && addonExpedite.checked) addonsCost += parseFloat(addonExpedite.value);
    if (addonLiquidMetal && addonLiquidMetal.checked) addonsCost += parseFloat(addonLiquidMetal.value);
    if (addonBackup && addonBackup.checked) addonsCost += parseFloat(addonBackup.value);

    // Calculate Subtotal & Range
    const adjustedBase = Math.round(basePrice * currentMultiplier);
    const lowEstimate = adjustedBase + addonsCost;
    const highEstimate = lowEstimate + Math.round(adjustedBase * 0.25);

    // Turnaround modification
    if (addonExpedite && addonExpedite.checked) {
      baseTurnaround = '⚡ Rush: ' + baseTurnaround.replace('Hours', 'Hrs Priority');
    }

    // Update UI elements
    if (summaryDeviceLabel) summaryDeviceLabel.textContent = currentDeviceName;
    if (calcTotalEstimate) calcTotalEstimate.textContent = `${lowEstimate} – ${highEstimate}`;
    if (breakdownBasePrice) breakdownBasePrice.textContent = `$${basePrice}`;
    if (breakdownMultiplier) breakdownMultiplier.textContent = `${currentMultiplier}x (${currentDeviceName.split('/')[0].trim()})`;
    if (breakdownAddons) breakdownAddons.textContent = `$${addonsCost}`;
    if (breakdownTurnaround) breakdownTurnaround.textContent = baseTurnaround;
  }

  // Initial Calculation Run
  updateCostCalculator();

  // Apply Quote to Booking Form
  if (btnApplyQuote) {
    btnApplyQuote.addEventListener('click', () => {
      const selectedOption = calcPrimaryService.options[calcPrimaryService.selectedIndex];
      const serviceName = selectedOption.text.split('(')[0].trim();

      if (bookingServiceSelect) {
        for (let i = 0; i < bookingServiceSelect.options.length; i++) {
          if (bookingServiceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) ||
              serviceName.toLowerCase().includes(bookingServiceSelect.options[i].text.toLowerCase())) {
            bookingServiceSelect.selectedIndex = i;
            break;
          }
        }
      }

      const symptomsBox = document.getElementById('bookingSymptoms');
      if (symptomsBox) {
        const estText = calcTotalEstimate ? calcTotalEstimate.textContent : '';
        symptomsBox.value = `Applied Calculator Quote for [${currentDeviceName}]: ${serviceName}. Estimated cost: $${estText}.`;
      }

      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        showToast('Quote applied to reservation form!');
      }
    });
  }

  /* ==========================================================================
     Booking Form Submission & Receipt Modal
     ========================================================================== */
  const shopBookingForm = document.getElementById('shopBookingForm');
  const bookingReceiptModal = document.getElementById('bookingReceiptModal');
  const bookingReceiptCloseBtn = document.getElementById('bookingReceiptCloseBtn');
  const receiptTicketCode = document.getElementById('receiptTicketCode');
  const receiptCustomerName = document.getElementById('receiptCustomerName');
  const receiptLaptopModel = document.getElementById('receiptLaptopModel');
  const receiptService = document.getElementById('receiptService');
  const receiptDateTime = document.getElementById('receiptDateTime');
  const receiptWhatsAppBtn = document.getElementById('receiptWhatsAppBtn');
  const receiptPrintBtn = document.getElementById('receiptPrintBtn');

  if (shopBookingForm) {
    shopBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookingName').value.trim();
      const phone = document.getElementById('bookingPhone').value.trim();
      const email = document.getElementById('bookingEmail').value.trim();
      const laptop = document.getElementById('bookingLaptopModel').value.trim();
      const service = document.getElementById('bookingService').value;
      const date = document.getElementById('bookingDate').value;
      const timeSlot = document.getElementById('bookingTimeSlot').value;
      const symptoms = document.getElementById('bookingSymptoms').value.trim();

      if (!name || !phone || !laptop || !date) {
        showToast('Please fill in all required fields marked with *');
        return;
      }

      // Generate Ticket Code
      const ticketId = 'SARA-' + Math.floor(10000 + Math.random() * 90000);

      // Save Booking to LocalStorage
      const bookingRecord = {
        ticketId,
        name,
        phone,
        email,
        laptop,
        service,
        date,
        timeSlot,
        symptoms,
        createdAt: new Date().toISOString()
      };

      const existingBookings = JSON.parse(localStorage.getItem('sara-shop-bookings') || '[]');
      existingBookings.push(bookingRecord);
      localStorage.setItem('sara-shop-bookings', JSON.stringify(existingBookings));

      // Populate Receipt Modal
      if (receiptTicketCode) receiptTicketCode.textContent = ticketId;
      if (receiptCustomerName) receiptCustomerName.textContent = name;
      if (receiptLaptopModel) receiptLaptopModel.textContent = laptop;
      if (receiptService) receiptService.textContent = service;
      if (receiptDateTime) receiptDateTime.textContent = `${date} (${timeSlot})`;

      // Prepare WhatsApp link with pre-filled message
      if (receiptWhatsAppBtn) {
        const waMsg = encodeURIComponent(
          `Hi Sara Laptop Store! I just scheduled service ticket #${ticketId}.\n` +
          `Name: ${name}\n` +
          `Laptop: ${laptop}\n` +
          `Service: ${service}\n` +
          `Preferred Slot: ${date} (${timeSlot})`
        );
        receiptWhatsAppBtn.href = `https://wa.me/18005557272?text=${waMsg}`;
      }

      // Open Modal
      if (bookingReceiptModal) {
        bookingReceiptModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      showToast(`Appointment confirmed! Ticket #${ticketId}`);
      shopBookingForm.reset();

      // Reset date to today
      if (bookingDateInput) {
        bookingDateInput.value = new Date().toISOString().split('T')[0];
      }
    });
  }

  // Close Receipt Modal
  if (bookingReceiptCloseBtn && bookingReceiptModal) {
    bookingReceiptCloseBtn.addEventListener('click', () => {
      bookingReceiptModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    bookingReceiptModal.addEventListener('click', (e) => {
      if (e.target === bookingReceiptModal) {
        bookingReceiptModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Print Receipt Ticket
  if (receiptPrintBtn) {
    receiptPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ==========================================================================
     Copy Address Button
     ========================================================================== */
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const address = "Suite 402, Tech Arcade Building, 742 Benchmark Boulevard, Silicon Corridor, SC 90210";
      navigator.clipboard.writeText(address).then(() => {
        showToast('Store address copied to clipboard!');
      }).catch(() => {
        showToast('Address: Suite 402, Tech Arcade Building, Silicon Corridor');
      });
    });
  }

  /* ==========================================================================
     FAQ Accordion Toggle
     ========================================================================== */
  document.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const ans = i.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
