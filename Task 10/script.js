document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Mobile Navigation Menu Toggle
  // =========================================================================
  const navMenuBtn = document.getElementById('navMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isExpanded = mobileMenuDrawer.classList.contains('hidden');
    if (isExpanded) {
      // Open drawer
      mobileMenuDrawer.classList.remove('hidden');
      // Force repaint to allow transition
      mobileMenuDrawer.offsetHeight;
      mobileMenuDrawer.style.maxHeight = mobileMenuDrawer.scrollHeight + 'px';
      hamburgerIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    } else {
      // Close drawer
      mobileMenuDrawer.style.maxHeight = '0';
      hamburgerIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      
      // Wait for transition before hiding
      setTimeout(() => {
        if (mobileMenuDrawer.style.maxHeight === '0px') {
          mobileMenuDrawer.classList.add('hidden');
        }
      }, 300);
    }
  }

  if (navMenuBtn) {
    navMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile drawer when clicking links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenuDrawer.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  });


  // =========================================================================
  // 2. Typewriter Effect
  // =========================================================================
  const typewriterElement = document.getElementById('typewriterText');
  if (typewriterElement) {
    const words = [
      "web applications.",
      "interactive frontends.",
      "robust software solutions.",
      "clean user interfaces."
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 100; // standard typing delay

    function typeEffect() {
      const currentWord = words[wordIdx];
      
      if (isDeleting) {
        // Deleting characters
        typewriterElement.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        delay = 50; // faster deletion
      } else {
        // Typing characters
        typewriterElement.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        delay = 100; // normal speed
      }

      // If word is completely typed
      if (!isDeleting && charIdx === currentWord.length) {
        delay = 2000; // Pause at end of word
        isDeleting = true;
      } 
      // If word is completely deleted
      else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        delay = 500; // Pause before typing next word
      }

      setTimeout(typeEffect, delay);
    }

    // Start effect
    setTimeout(typeEffect, 1000);
  }


  // =========================================================================
  // 3. Sticky Header Scroll Effect & Active Scroll spy
  // =========================================================================
  const header = document.getElementById('portfolioHeader');
  
  function handleScroll() {
    if (window.scrollY > 20) {
      header.classList.add('bg-[#0b1120]/80', 'border-slate-800/60');
      header.classList.remove('bg-transparent', 'border-transparent');
    } else {
      header.classList.remove('bg-[#0b1120]/80', 'border-slate-800/60');
      header.classList.add('bg-transparent', 'border-transparent');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init on page load

  // Navigation Highlighting on Scroll (Scrollspy)
  const sections = document.querySelectorAll('section');
  const desktopLinks = {
    'home': document.getElementById('navLinkHome'),
    'about': document.getElementById('navLinkAbout'),
    'skills': document.getElementById('navLinkSkills'),
    'projects': document.getElementById('navLinkProjects'),
    'experience': document.getElementById('navLinkExperience'),
    'contact': document.getElementById('navLinkContact')
  };

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies mid section of screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Remove active class from all links
        Object.values(desktopLinks).forEach(link => {
          if (link) {
            link.classList.remove('text-cyan-400', 'font-semibold');
            link.classList.add('text-slate-300');
          }
        });

        // Add active class to corresponding link
        if (desktopLinks[id]) {
          desktopLinks[id].classList.add('text-cyan-400', 'font-semibold');
          desktopLinks[id].classList.remove('text-slate-300');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });


  // =========================================================================
  // 4. Interactive Projects Filter
  // =========================================================================
  const filterBtnAll = document.getElementById('filterBtnAll');
  const filterBtnApps = document.getElementById('filterBtnApps');
  const filterBtnApis = document.getElementById('filterBtnApis');
  const projectCards = document.querySelectorAll('.project-card');

  const filterButtons = [filterBtnAll, filterBtnApps, filterBtnApis];

  function setFilterActive(activeBtn) {
    filterButtons.forEach(btn => {
      if (btn) {
        btn.classList.remove('bg-gradient-to-r', 'from-indigo-500', 'to-cyan-500', 'text-[#0b1120]', 'shadow', 'shadow-cyan-900/30');
        btn.classList.add('border', 'border-slate-800', 'hover:border-slate-650', 'bg-slate-900/20', 'text-slate-300');
      }
    });

    if (activeBtn) {
      activeBtn.classList.remove('border', 'border-slate-800', 'hover:border-slate-650', 'bg-slate-900/20', 'text-slate-300');
      activeBtn.classList.add('bg-gradient-to-r', 'from-indigo-500', 'to-cyan-500', 'text-[#0b1120]', 'shadow', 'shadow-cyan-900/30');
    }
  }

  function filterProjects(category) {
    projectCards.forEach(card => {
      card.style.transform = 'scale(0.95)';
      card.style.opacity = '0';
      
      setTimeout(() => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.classList.remove('hidden');
          // Trigger transition
          setTimeout(() => {
            card.style.transform = 'scale(1)';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      }, 200);
    });
  }

  if (filterBtnAll) {
    filterBtnAll.addEventListener('click', () => {
      setFilterActive(filterBtnAll);
      filterProjects('all');
    });
  }
  
  if (filterBtnApps) {
    filterBtnApps.addEventListener('click', () => {
      setFilterActive(filterBtnApps);
      filterProjects('apps');
    });
  }
  
  if (filterBtnApis) {
    filterBtnApis.addEventListener('click', () => {
      setFilterActive(filterBtnApis);
      filterProjects('apis');
    });
  }


  // =========================================================================
  // 5. Contact Form Client-Side Validation & Mock Submission
  // =========================================================================
  const form = document.getElementById('globalContactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const validNameCheck = document.getElementById('validNameCheck');
  const validEmailCheck = document.getElementById('validEmailCheck');

  const submitBtn = document.getElementById('submitContactBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const contactToast = document.getElementById('contactToast');
  const closeToastBtn = document.getElementById('closeToastBtn');

  // Input regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  function validateName() {
    const value = nameInput.value.trim();
    if (value === "") {
      nameError.classList.remove('hidden');
      nameInput.classList.add('border-red-500');
      nameInput.classList.remove('border-emerald-500', 'focus:border-cyan-500');
      validNameCheck.classList.add('hidden');
      return false;
    } else {
      nameError.classList.add('hidden');
      nameInput.classList.remove('border-red-500', 'focus:border-cyan-500');
      nameInput.classList.add('border-emerald-500');
      validNameCheck.classList.remove('hidden');
      return true;
    }
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!emailRegex.test(value)) {
      emailError.classList.remove('hidden');
      emailInput.classList.add('border-red-500');
      emailInput.classList.remove('border-emerald-500', 'focus:border-cyan-500');
      validEmailCheck.classList.add('hidden');
      return false;
    } else {
      emailError.classList.add('hidden');
      emailInput.classList.remove('border-red-500', 'focus:border-cyan-500');
      emailInput.classList.add('border-emerald-500');
      validEmailCheck.classList.remove('hidden');
      return true;
    }
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (value === "") {
      messageError.classList.remove('hidden');
      messageInput.classList.add('border-red-500');
      messageInput.classList.remove('border-emerald-500', 'focus:border-cyan-500');
      return false;
    } else {
      messageError.classList.add('hidden');
      messageInput.classList.remove('border-red-500', 'focus:border-cyan-500');
      messageInput.classList.add('border-emerald-500');
      return true;
    }
  }

  // Live input validation on blur / input
  if (nameInput) {
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);
  }

  if (emailInput) {
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
  }

  if (messageInput) {
    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);
  }

  // Handle submit logic
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check all validations
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isMessageValid) {
        // Disable submit button & show loading state
        submitBtn.disabled = true;
        btnText.textContent = "Sending...";
        btnSpinner.classList.remove('hidden');

        // Mock API submission request delay
        setTimeout(() => {
          // Reset button state
          submitBtn.disabled = false;
          btnText.textContent = "Send Message";
          btnSpinner.classList.add('hidden');

          // Show Toast notification popup
          contactToast.classList.remove('hidden');
          // Add opacity transition
          contactToast.offsetHeight;
          contactToast.style.opacity = '1';
        }, 1500);
      }
    });
  }

  // Reset form / hide toast
  if (closeToastBtn) {
    closeToastBtn.addEventListener('click', () => {
      // Clear inputs
      form.reset();
      
      // Reset input styles & indicators
      nameInput.classList.remove('border-emerald-500', 'border-red-500');
      nameInput.classList.add('border-slate-800');
      validNameCheck.classList.add('hidden');

      emailInput.classList.remove('border-emerald-500', 'border-red-500');
      emailInput.classList.add('border-slate-800');
      validEmailCheck.classList.add('hidden');

      messageInput.classList.remove('border-emerald-500', 'border-red-500');
      messageInput.classList.add('border-slate-800');

      // Hide toast
      contactToast.style.opacity = '0';
      setTimeout(() => {
        contactToast.classList.add('hidden');
      }, 300);
    });
  }

});
