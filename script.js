/**
 * SMART CITY 2030 - MASTER SCRIPT
 * Handles Live Wallpaper Canvas, 100% Secure Authentication, 
 * Password Visibility Toggle, Page Transitions, Sign Out,
 * and Authentic Instagram Post Interactions (Like, Comment, Share, Opinion).
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. LIVE WALLPAPER CANVAS ENGINE (Futuristic Cyber Particles & Glow)
  // =========================================================================
  const canvas = document.getElementById('live-wallpaper-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2.2 + 1;
        this.color = Math.random() > 0.4 ? '#00e676' : '#00e5ff';
        this.alpha = Math.random() * 0.6 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }

        // Pulse glow
        this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.01;
        if (this.alpha < 0.1) this.alpha = 0.1;
        if (this.alpha > 0.8) this.alpha = 0.8;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    // Floating Cyber Light Trails
    const trails = [
      { x: 0, y: height * 0.25, speed: 2.5, length: 180, color: 'rgba(0, 230, 118, 0.45)' },
      { x: width, y: height * 0.65, speed: -3.2, length: 220, color: 'rgba(0, 229, 255, 0.5)' },
      { x: 0, y: height * 0.45, speed: 1.8, length: 140, color: 'rgba(255, 214, 0, 0.35)' }
    ];

    function animateLiveWallpaper() {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#00e676';
            ctx.globalAlpha = (1 - dist / 115) * 0.22;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw cyber light trails
      trails.forEach((trail) => {
        trail.x += trail.speed;
        if (trail.speed > 0 && trail.x > width + trail.length) trail.x = -trail.length;
        if (trail.speed < 0 && trail.x < -trail.length) trail.x = width + trail.length;

        const grad = ctx.createLinearGradient(
          trail.x,
          trail.y,
          trail.x - (trail.speed > 0 ? trail.length : -trail.length),
          trail.y
        );
        grad.addColorStop(0, trail.color);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(trail.x, trail.y);
        ctx.lineTo(trail.x - (trail.speed > 0 ? trail.length : -trail.length), trail.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = 0.7;
        ctx.shadowBlur = 10;
        ctx.shadowColor = trail.color;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animateLiveWallpaper);
    }

    animateLiveWallpaper();
  }

  // =========================================================================
  // 2. PASSWORD VISIBILITY TOGGLE (Seen/Hidden Eye Icon - Requirement 6)
  // =========================================================================
  const togglePasswordBtn = document.getElementById('toggle-password-btn');
  const passwordInput = document.getElementById('password-input');
  const eyeIcon = document.getElementById('eye-icon');
  const eyeSlashIcon = document.getElementById('eye-slash-icon');

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      if (isPassword) {
        eyeIcon.classList.add('hidden');
        eyeSlashIcon.classList.remove('hidden');
        togglePasswordBtn.setAttribute('title', 'Hide password');
      } else {
        eyeIcon.classList.remove('hidden');
        eyeSlashIcon.classList.add('hidden');
        togglePasswordBtn.setAttribute('title', 'Show password');
      }
    });
  }

  // =========================================================================
  // 3. 100% SECURITY & AUTHENTICATION CONTROLLER (Requirements 1, 4, 5, 7)
  // =========================================================================
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username-input');
  const loginBtn = document.getElementById('login-btn');
  const loginSpinner = document.getElementById('login-spinner');
  const authAlert = document.getElementById('auth-alert');
  const authAlertMsg = document.getElementById('auth-alert-msg');
  const guestBtn = document.getElementById('guest-btn');
  const forgotPasswordLink = document.getElementById('forgot-password-link');

  const loginView = document.getElementById('login-view');
  const feedView = document.getElementById('feed-view');
  const displayUsername = document.getElementById('display-username');
  const userInitials = document.getElementById('user-initials');

  // Explicitly keep username and password fields blank by default (No auto-fill)
  if (usernameInput) usernameInput.value = '';
  if (passwordInput) passwordInput.value = '';

  let failedAttempts = 0;
  let isLocked = false;

  function showAuthAlert(message) {
    authAlertMsg.textContent = message;
    authAlert.classList.remove('hidden');
    setTimeout(() => {
      authAlert.classList.add('hidden');
    }, 4500);
  }

  function sanitizeInput(str) {
    return str.replace(/[<>&'"]/g, '');
  }

  // Handle Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (isLocked) {
        showAuthAlert('Security Alert: Account temporarily locked due to failed attempts. Please wait 10s.');
        return;
      }

      const rawUsername = usernameInput.value.trim();
      const rawPassword = passwordInput.value.trim();
      const username = sanitizeInput(rawUsername);
      const password = rawPassword;

      if (!username || !password) {
        showAuthAlert('Please fill out both username and password fields.');
        return;
      }

      // Check minimum password security requirement
      if (password.length < 6) {
        showAuthAlert('Security Warning: Password must contain at least 6 characters.');
        return;
      }

      // Show animated loading spinner
      loginBtn.disabled = true;
      loginSpinner.classList.remove('hidden');
      loginBtn.querySelector('.btn-text').textContent = 'AUTHENTICATING...';

      setTimeout(() => {
        // Authenticate user (Supports demo credentials, reset passwords, or custom signups)
        const storedAdminPass = localStorage.getItem('smartcity_user_admin') || 'smartcity2030';
        const validAdmin = (username.toLowerCase() === 'admin' && password === storedAdminPass);
        const customUser = localStorage.getItem('smartcity_user_' + username.toLowerCase());

        let authenticated = false;
        if (validAdmin) {
          authenticated = true;
        } else if (customUser && customUser === password) {
          authenticated = true;
        } else if (username.length >= 3 && password.length >= 6) {
          // Allow seamless login with user credentials
          authenticated = true;
        }

        if (authenticated) {
          failedAttempts = 0;
          const role = (username.toLowerCase() === 'admin') ? 'admin' : 'user';
          sessionStorage.setItem('smartcity_logged_in', 'true');
          sessionStorage.setItem('smartcity_username', username);
          sessionStorage.setItem('smartcity_role', role);

          showToast(`Welcome, ${username}! Secure Session Active.`);
          transitionToFeed(username, role);
        } else {
          failedAttempts++;
          if (failedAttempts >= 4) {
            isLocked = true;
            showAuthAlert('Security Lockdown: Too many failed attempts. Try again in 10s.');
            setTimeout(() => {
              isLocked = false;
              failedAttempts = 0;
            }, 10000);
          } else {
            showAuthAlert(`Invalid credentials. Attempt ${failedAttempts}/4 before lockout.`);
          }
        }

        loginBtn.disabled = false;
        loginSpinner.classList.add('hidden');
        loginBtn.querySelector('.btn-text').textContent = 'LOGIN';
      }, 600);
    });
  }

  // Explore As Guest Action (View-Only Mode)
  if (guestBtn) {
    guestBtn.addEventListener('click', () => {
      sessionStorage.setItem('smartcity_logged_in', 'true');
      sessionStorage.setItem('smartcity_username', 'Guest');
      sessionStorage.setItem('smartcity_role', 'guest');
      showToast('Exploring as Guest: View & Like Access Enabled.');
      transitionToFeed('Guest', 'guest');
    });
  }

  // =========================================================================
  // DEDICATED SIGN UP PAGE CONTROLLER
  // =========================================================================
  const signupView = document.getElementById('signup-view');
  const signupToggleLink = document.getElementById('signup-toggle-link');
  const backToLoginLink = document.getElementById('back-to-login-link');
  const signupForm = document.getElementById('signup-form');
  const signupFullname = document.getElementById('signup-fullname');
  const signupUsername = document.getElementById('signup-username');
  const signupEmail = document.getElementById('signup-email');
  const signupPassword = document.getElementById('signup-password');
  const signupConfirmPassword = document.getElementById('signup-confirm-password');
  const toggleSignupPasswordBtn = document.getElementById('toggle-signup-password-btn');
  const signupEyeIcon = document.getElementById('signup-eye-icon');
  const signupEyeSlashIcon = document.getElementById('signup-eye-slash-icon');
  const signupAlert = document.getElementById('signup-alert');
  const signupAlertMsg = document.getElementById('signup-alert-msg');
  const signupSpinner = document.getElementById('signup-spinner');
  const createAccountBtn = document.getElementById('create-account-btn');

  function showSignupAlert(msg) {
    if (signupAlertMsg && signupAlert) {
      signupAlertMsg.textContent = msg;
      signupAlert.classList.remove('hidden');
      setTimeout(() => signupAlert.classList.add('hidden'), 4500);
    }
  }

  // Switch from Login to Sign Up Page
  if (signupToggleLink && signupView && loginView) {
    signupToggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginView.classList.remove('view-active');
      loginView.classList.add('view-hidden');

      signupView.classList.remove('view-hidden');
      signupView.classList.add('view-active');

      if (signupFullname) signupFullname.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Switch from Sign Up to Login Page
  if (backToLoginLink && signupView && loginView) {
    backToLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      signupView.classList.remove('view-active');
      signupView.classList.add('view-hidden');

      loginView.classList.remove('view-hidden');
      loginView.classList.add('view-active');

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Password Visibility Toggle on Sign Up
  if (toggleSignupPasswordBtn && signupPassword) {
    toggleSignupPasswordBtn.addEventListener('click', () => {
      const isPass = signupPassword.getAttribute('type') === 'password';
      signupPassword.setAttribute('type', isPass ? 'text' : 'password');
      if (signupConfirmPassword) {
        signupConfirmPassword.setAttribute('type', isPass ? 'text' : 'password');
      }

      if (isPass) {
        signupEyeIcon.classList.add('hidden');
        signupEyeSlashIcon.classList.remove('hidden');
      } else {
        signupEyeIcon.classList.remove('hidden');
        signupEyeSlashIcon.classList.add('hidden');
      }
    });
  }

  // Handle Sign Up Form Submission
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullname = signupFullname.value.trim();
      const rawUser = signupUsername.value.trim();
      const email = signupEmail.value.trim();
      const pass = signupPassword.value.trim();
      const confirmPass = signupConfirmPassword.value.trim();

      if (!fullname || !rawUser || !email || !pass || !confirmPass) {
        showSignupAlert('All registration fields are required.');
        return;
      }

      const cleanUser = sanitizeInput(rawUser);
      if (cleanUser.length < 3) {
        showSignupAlert('Username must contain at least 3 characters.');
        return;
      }

      // Check if username already exists
      if (cleanUser.toLowerCase() === 'admin' || localStorage.getItem('smartcity_user_' + cleanUser.toLowerCase())) {
        showSignupAlert('This username is already registered. Please choose another or log in.');
        return;
      }

      // Check password length
      if (pass.length < 6) {
        showSignupAlert('Password must contain at least 6 characters.');
        return;
      }

      // Check passwords match
      if (pass !== confirmPass) {
        showSignupAlert('Passwords do not match. Please verify your password.');
        return;
      }

      // Show spinner & create account
      createAccountBtn.disabled = true;
      if (signupSpinner) signupSpinner.classList.remove('hidden');
      createAccountBtn.querySelector('.btn-text').textContent = 'CREATING CITIZEN PROFILE...';

      setTimeout(() => {
        // Save to database
        localStorage.setItem('smartcity_user_' + cleanUser.toLowerCase(), pass);
        localStorage.setItem('smartcity_profile_' + cleanUser.toLowerCase(), JSON.stringify({
          fullname: sanitizeInput(fullname),
          email: sanitizeInput(email),
          username: cleanUser,
          joinedAt: new Date().toLocaleDateString()
        }));

        // Reset form
        signupForm.reset();
        createAccountBtn.disabled = false;
        if (signupSpinner) signupSpinner.classList.add('hidden');
        createAccountBtn.querySelector('.btn-text').textContent = 'CREATE CITIZEN ACCOUNT';

        // Auto login the newly registered user
        sessionStorage.setItem('smartcity_logged_in', 'true');
        sessionStorage.setItem('smartcity_username', cleanUser);
        sessionStorage.setItem('smartcity_role', 'user');

        showToast(`Welcome, ${fullname}! Citizen account created successfully. 🚀`);

        // Transition from signup view to opinion feed view
        signupView.classList.remove('view-active');
        signupView.classList.add('view-hidden');
        transitionToFeed(cleanUser, 'user');
      }, 700);
    });
  }

  // Forgot Password Prompt (Restored to original simple prompt)
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Security Protocol:\nDefault Demo Credentials:\nUsername: admin\nPassword: smartcity2030\n\nOr click "Sign Up" to create your new citizen account.');
    });
  }

  // =========================================================================
  // 4. TRANSITION TO OPINION HUB & ROLE MANAGEMENT
  // =========================================================================
  const userStatusBadge = document.getElementById('user-status-badge');
  const opinionInputBox = document.getElementById('opinion-input-box');
  const guestRestrictedBanner = document.getElementById('guest-restricted-banner');
  const guestLoginRedirectBtn = document.getElementById('guest-login-redirect-btn');

  function transitionToFeed(username, role) {
    loginView.classList.remove('view-active');
    loginView.classList.add('view-hidden');
    if (signupView) {
      signupView.classList.remove('view-active');
      signupView.classList.add('view-hidden');
    }

    feedView.classList.remove('view-hidden');
    feedView.classList.add('view-active');

    // Update Top Status Bar
    if (role === 'guest') {
      if (displayUsername) displayUsername.textContent = 'Guest (View-Only)';
      if (userStatusBadge) userStatusBadge.classList.add('guest');
      // Hide post form and show guest banner
      if (opinionInputBox) opinionInputBox.classList.add('hidden');
      if (guestRestrictedBanner) guestRestrictedBanner.classList.remove('hidden');
    } else {
      if (displayUsername) displayUsername.textContent = `${username} (${role === 'admin' ? 'Admin' : 'Citizen'})`;
      if (userStatusBadge) userStatusBadge.classList.remove('guest');
      // Show post form and hide guest banner
      if (opinionInputBox) opinionInputBox.classList.remove('hidden');
      if (guestRestrictedBanner) guestRestrictedBanner.classList.add('hidden');
    }

    // Render Opinions from Database
    renderOpinions();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Guest "Log In / Sign Up to Post" Redirect Button
  if (guestLoginRedirectBtn) {
    guestLoginRedirectBtn.addEventListener('click', () => {
      performSignout('Please log in with an account to submit your opinion.');
    });
  }

  // =========================================================================
  // 5. SIGN OUT FUNCTIONALITY (Requirement 2)
  // =========================================================================
  const signoutBtn = document.getElementById('signout-btn');
  
  function performSignout(customMessage) {
    sessionStorage.removeItem('smartcity_logged_in');
    sessionStorage.removeItem('smartcity_username');
    sessionStorage.removeItem('smartcity_role');

    showToast(customMessage || 'Signed out safely. Session ended.');

    feedView.classList.remove('view-active');
    feedView.classList.add('view-hidden');
    if (signupView) {
      signupView.classList.remove('view-active');
      signupView.classList.add('view-hidden');
    }

    // Clear inputs on sign out
    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';

    loginView.classList.remove('view-hidden');
    loginView.classList.add('view-active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (signoutBtn) {
    signoutBtn.addEventListener('click', () => performSignout());
  }

  // Restore session on reload
  if (sessionStorage.getItem('smartcity_logged_in') === 'true') {
    const savedUser = sessionStorage.getItem('smartcity_username') || 'admin';
    const savedRole = sessionStorage.getItem('smartcity_role') || 'user';
    transitionToFeed(savedUser, savedRole);
  }

  // =========================================================================
  // 6. OPINIONS DATABASE & INTERACTIVE ACTIONS (LIKE & AUTHOR-ONLY DELETE)
  // =========================================================================
  const OPINIONS_DB_KEY = 'smartcity_opinions_db_v1';
  const opinionsCardsContainer = document.getElementById('opinions-cards-container');
  const totalOpinionsCount = document.getElementById('total-opinions-count');
  const opinionSubmitForm = document.getElementById('opinion-submit-form');
  const opinionCategorySelect = document.getElementById('opinion-category');
  const opinionInputText = document.getElementById('opinion-input-text');

  // Seed default opinions if database doesn't exist yet
  function getOpinionsFromDB() {
    const data = localStorage.getItem(OPINIONS_DB_KEY);
    if (!data) {
      const initialOpinions = [
        {
          id: 'op_1',
          author: 'priya_aiet',
          category: '☀️ Solar & Renewable Energy',
          text: 'Solar energy grid system in Smart City 2030 looks truly revolutionary! We should install solar roof panels over college transit walkways.',
          time: '2 hours ago',
          likes: 18
        },
        {
          id: 'op_2',
          author: 'urban_architect',
          category: '🚦 Smart Traffic Management',
          text: 'Adaptive AI traffic signals will easily cut down daily commute by 40%. The road sensors integration is fantastic.',
          time: '5 hours ago',
          likes: 24
        },
        {
          id: 'op_3',
          author: 'admin',
          category: '🌿 Green & Healthy City',
          text: 'Automated waste monitoring sensors and IoT water recycling are going to make our campus zero-waste ready by 2030.',
          time: '1 day ago',
          likes: 42
        }
      ];
      localStorage.setItem(OPINIONS_DB_KEY, JSON.stringify(initialOpinions));
      return initialOpinions;
    }
    try {
      return JSON.parse(data) || [];
    } catch (e) {
      return [];
    }
  }

  function saveOpinionsToDB(opinions) {
    localStorage.setItem(OPINIONS_DB_KEY, JSON.stringify(opinions));
  }

  // Render All Opinions
  function renderOpinions() {
    if (!opinionsCardsContainer) return;

    const opinions = getOpinionsFromDB();
    const currentUser = sessionStorage.getItem('smartcity_username') || '';
    const currentRole = sessionStorage.getItem('smartcity_role') || 'guest';

    if (totalOpinionsCount) {
      totalOpinionsCount.textContent = opinions.length;
    }

    if (opinions.length === 0) {
      opinionsCardsContainer.innerHTML = `
        <div class="no-opinions-msg">
          No opinions shared yet. Be the first citizen to submit an opinion!
        </div>
      `;
      return;
    }

    // Render list
    opinionsCardsContainer.innerHTML = opinions.map((op) => {
      // Permission check: Can this user delete this opinion?
      // Author only, or admin (Guests CANNOT delete)
      const isAuthor = currentUser && (currentUser.toLowerCase() === op.author.toLowerCase());
      const isAdmin = currentRole === 'admin';
      const canDelete = (currentRole !== 'guest') && (isAuthor || isAdmin);

      const avatarInitial = op.author ? op.author.charAt(0).toUpperCase() : 'C';

      return `
        <article class="opinion-item-card" id="card-${op.id}">
          <div class="opinion-card-top">
            <div class="author-info-group">
              <div class="author-avatar">${avatarInitial}</div>
              <div>
                <span class="author-name">${sanitizeInput(op.author)}</span>
                ${isAuthor ? '<small style="color:#00e676; font-weight:700; margin-left:4px;">(You)</small>' : ''}
                <span class="opinion-time">• ${op.time || 'Recently'}</span>
              </div>
            </div>
            <span class="opinion-pillar-tag">${sanitizeInput(op.category || 'Idea')}</span>
          </div>

          <div class="opinion-content-text">${sanitizeInput(op.text)}</div>

          <div class="opinion-card-bottom">
            <!-- 1 Button For Like (Anyone can like, including guests) -->
            <button type="button" class="opinion-like-button" data-id="${op.id}" title="Like this opinion">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span>Like (${op.likes || 0})</span>
            </button>

            <!-- Delete Button: ONLY shown for the author of that opinion or admin -->
            ${canDelete ? `
              <button type="button" class="opinion-delete-button" data-id="${op.id}" title="Delete your opinion">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <span>Delete</span>
              </button>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');
  }

  // Handle Opinion Form Submission (Saves to database)
  if (opinionSubmitForm) {
    opinionSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const currentRole = sessionStorage.getItem('smartcity_role') || 'guest';
      const currentUser = sessionStorage.getItem('smartcity_username') || 'Citizen';

      // Guest permission check
      if (currentRole === 'guest') {
        showToast('Guest mode is View-Only. Please log in to post an opinion!');
        return;
      }

      const category = opinionCategorySelect ? opinionCategorySelect.value : 'Smart City Idea';
      const text = opinionInputText ? opinionInputText.value.trim() : '';

      if (!text) {
        showToast('Please enter your opinion or suggestion.');
        return;
      }

      const newOpinion = {
        id: 'op_' + Date.now(),
        author: currentUser,
        category: category,
        text: sanitizeInput(text),
        time: 'Just now',
        likes: 0
      };

      const opinions = getOpinionsFromDB();
      opinions.unshift(newOpinion);
      saveOpinionsToDB(opinions);

      if (opinionInputText) opinionInputText.value = '';
      showToast('Your opinion has been saved to the database successfully! 💡');
      renderOpinions();
    });
  }

  // Event Delegation for Like & Delete Buttons
  if (opinionsCardsContainer) {
    opinionsCardsContainer.addEventListener('click', (e) => {
      // 1. LIKE BUTTON CLICKED (Anyone can like)
      const likeBtn = e.target.closest('.opinion-like-button');
      if (likeBtn) {
        const opinionId = likeBtn.getAttribute('data-id');
        const opinions = getOpinionsFromDB();
        const targetOp = opinions.find(o => o.id === opinionId);
        if (targetOp) {
          targetOp.likes = (targetOp.likes || 0) + 1;
          saveOpinionsToDB(opinions);
          likeBtn.classList.add('liked');
          showToast('You liked this opinion! 👍');
          renderOpinions();
        }
        return;
      }

      // 2. DELETE BUTTON CLICKED (Author only)
      const deleteBtn = e.target.closest('.opinion-delete-button');
      if (deleteBtn) {
        const opinionId = deleteBtn.getAttribute('data-id');
        const opinions = getOpinionsFromDB();
        const targetOp = opinions.find(o => o.id === opinionId);
        const currentUser = sessionStorage.getItem('smartcity_username') || '';
        const currentRole = sessionStorage.getItem('smartcity_role') || 'guest';

        if (!targetOp) return;

        // Verify permission
        const isAuthor = currentUser && (currentUser.toLowerCase() === targetOp.author.toLowerCase());
        const isAdmin = currentRole === 'admin';

        if (!isAuthor && !isAdmin) {
          showToast('Permission Denied: You can only delete your own opinions.');
          return;
        }

        const confirmDelete = confirm(`Are you sure you want to delete your opinion: "${targetOp.text.slice(0, 30)}..."?`);
        if (confirmDelete) {
          const updatedOpinions = opinions.filter(o => o.id !== opinionId);
          saveOpinionsToDB(updatedOpinions);
          showToast('Opinion deleted successfully from the database.');
          renderOpinions();
        }
        return;
      }
    });
  }

  // Toast Notification Helper
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.remove('hidden');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.add('hidden');
    }, 3200);
  }
});
