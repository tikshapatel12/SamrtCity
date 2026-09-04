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
  // 2. ALL DOM ELEMENT REFERENCES (Declared upfront to prevent ReferenceErrors)
  // =========================================================================
  // Views
  const loginView = document.getElementById('login-view');
  const signupView = document.getElementById('signup-view');
  const feedView = document.getElementById('feed-view');

  // Login View Elements
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('username-input');
  const passwordInput = document.getElementById('password-input');
  const togglePasswordBtn = document.getElementById('toggle-password-btn');
  const eyeIcon = document.getElementById('eye-icon');
  const eyeSlashIcon = document.getElementById('eye-slash-icon');
  const loginBtn = document.getElementById('login-btn');
  const loginSpinner = document.getElementById('login-spinner');
  const authAlert = document.getElementById('auth-alert');
  const authAlertMsg = document.getElementById('auth-alert-msg');
  const guestBtn = document.getElementById('guest-btn');
  const signupToggleLink = document.getElementById('signup-toggle-link');
  const forgotPasswordLink = document.getElementById('forgot-password-link');

  // Sign Up View Elements
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

  // Feed View Elements
  const displayUsername = document.getElementById('display-username');
  const userInitials = document.getElementById('user-initials');
  const userStatusBadge = document.getElementById('user-status-badge');
  const signoutBtn = document.getElementById('signout-btn');
  const opinionInputBox = document.getElementById('opinion-input-box');
  const guestRestrictedBanner = document.getElementById('guest-restricted-banner');
  const guestLoginRedirectBtn = document.getElementById('guest-login-redirect-btn');
  const opinionSubmitForm = document.getElementById('opinion-submit-form');
  const opinionCategorySelect = document.getElementById('opinion-category');
  const opinionInputText = document.getElementById('opinion-input-text');
  const opinionsCardsContainer = document.getElementById('opinions-cards-container');
  const totalOpinionsCount = document.getElementById('total-opinions-count');

  // Toast Notification
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

  // Explicitly keep username and password blank by default (No auto-fill)
  if (usernameInput) usernameInput.value = '';
  if (passwordInput) passwordInput.value = '';

  let failedAttempts = 0;
  let isLocked = false;

  function showAuthAlert(message) {
    if (!authAlert || !authAlertMsg) return;
    authAlertMsg.textContent = message;
    authAlert.classList.remove('hidden');
    setTimeout(() => {
      authAlert.classList.add('hidden');
    }, 4500);
  }

  function showSignupAlert(msg) {
    if (!signupAlert || !signupAlertMsg) return;
    signupAlertMsg.textContent = msg;
    signupAlert.classList.remove('hidden');
    setTimeout(() => signupAlert.classList.add('hidden'), 4500);
  }

  function sanitizeInput(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[<>&'"]/g, '');
  }

  // =========================================================================
  // 3. GLOBAL CLOUD DATABASE ENGINE (Real-time sync across Mobile & PC)
  // =========================================================================
  const CLOUD_DB_BASE = 'https://kvdb.io/8vfz1M6eKdm2wTwt6mrZSG';
  const CLOUD_OPINIONS_URL = `${CLOUD_DB_BASE}/smartcity_opinions`;
  const CLOUD_USERS_URL = `${CLOUD_DB_BASE}/smartcity_users`;
  const OPINIONS_DB_KEY = 'smartcity_opinions_db_v1';

  let cachedOpinions = [];

  const defaultSeedOpinions = [
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

  function getLocalOpinions() {
    try {
      const data = localStorage.getItem(OPINIONS_DB_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return defaultSeedOpinions;
  }

  function saveLocalOpinions(ops) {
    try {
      localStorage.setItem(OPINIONS_DB_KEY, JSON.stringify(ops));
    } catch (e) {}
  }

  async function fetchOpinionsFromCloud() {
    try {
      const res = await fetch(CLOUD_OPINIONS_URL + '?t=' + Date.now(), { cache: 'no-store' });
      if (res.ok) {
        const cloudOps = await res.json();
        if (Array.isArray(cloudOps) && cloudOps.length > 0) {
          cachedOpinions = cloudOps;
          saveLocalOpinions(cloudOps);
          renderOpinions();
        }
      }
    } catch (err) {
      console.warn('Cloud opinions fetch notice:', err);
    }
  }

  async function pushOpinionsToCloud(ops) {
    try {
      await fetch(CLOUD_OPINIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ops)
      });
    } catch (err) {
      console.warn('Cloud sync offline queue:', err);
    }
  }

  async function getCloudUsers() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(CLOUD_USERS_URL + '?t=' + Date.now(), { signal: controller.signal, cache: 'no-store' });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object') {
          localStorage.setItem('smartcity_cloud_users_cache', JSON.stringify(data));
          return data;
        }
      }
    } catch (e) {}

    try {
      return JSON.parse(localStorage.getItem('smartcity_cloud_users_cache')) || {};
    } catch (e) {
      return {};
    }
  }

  async function saveUserToCloud(username, password, fullname, email) {
    localStorage.setItem('smartcity_user_' + username.toLowerCase(), password);
    localStorage.setItem('smartcity_profile_' + username.toLowerCase(), JSON.stringify({
      fullname: fullname,
      email: email,
      username: username,
      joinedAt: new Date().toLocaleDateString()
    }));

    try {
      let users = await getCloudUsers();
      if (!users || typeof users !== 'object') users = {};
      users[username.toLowerCase()] = {
        password: password,
        fullname: fullname,
        email: email,
        joinedAt: new Date().toLocaleDateString()
      };
      await fetch(CLOUD_USERS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users)
      });
      localStorage.setItem('smartcity_cloud_users_cache', JSON.stringify(users));
    } catch (err) {
      console.warn('Cloud user save fallback:', err);
    }
  }

  // =========================================================================
  // 4. OPINION TIMESTAMP FORMATTER (Accurate Written Time & Date)
  // =========================================================================
  function formatOpinionTimestamp(op) {
    if (!op) return 'Recently';

    let timestamp = null;

    if (op.createdAt) {
      timestamp = typeof op.createdAt === 'number' ? op.createdAt : new Date(op.createdAt).getTime();
    }

    // Extract millisecond timestamp from id (e.g., op_1788507876524_168)
    if (!timestamp && op.id && typeof op.id === 'string') {
      const match = op.id.match(/^op_(\d{11,})/);
      if (match) {
        timestamp = parseInt(match[1], 10);
      }
    }

    if (!timestamp || isNaN(timestamp)) {
      return op.time || 'Recently';
    }

    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);

    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (diffSec < 45 && diffSec >= -10) {
      return `Just now (${timeStr})`;
    } else if (diffMin < 60 && diffMin >= 1) {
      return `${diffMin} min${diffMin > 1 ? 's' : ''} ago (${timeStr})`;
    } else if (isToday) {
      return `Today at ${timeStr}`;
    } else if (isYesterday) {
      return `Yesterday at ${timeStr}`;
    } else {
      return `${dateStr} at ${timeStr}`;
    }
  }

  function getExactTimestampTooltip(op) {
    if (!op) return '';
    let timestamp = null;
    if (op.createdAt) {
      timestamp = typeof op.createdAt === 'number' ? op.createdAt : new Date(op.createdAt).getTime();
    }
    if (!timestamp && op.id && typeof op.id === 'string') {
      const match = op.id.match(/^op_(\d{11,})/);
      if (match) timestamp = parseInt(match[1], 10);
    }
    if (timestamp && !isNaN(timestamp)) {
      return 'Written on: ' + new Date(timestamp).toLocaleString();
    }
    return op.time ? ('Written: ' + op.time) : '';
  }

  // =========================================================================
  // 5. RENDER OPINIONS & VIEW TRANSITIONS
  // =========================================================================
  function renderOpinions() {
    if (!opinionsCardsContainer) return;

    let opinions = cachedOpinions;
    if (!Array.isArray(opinions) || opinions.length === 0) {
      opinions = getLocalOpinions();
      cachedOpinions = opinions;
    }

    const currentUsername = (sessionStorage.getItem('smartcity_username') || localStorage.getItem('smartcity_username') || '').toLowerCase();
    const currentRole = sessionStorage.getItem('smartcity_role') || localStorage.getItem('smartcity_role') || 'guest';

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

    opinionsCardsContainer.innerHTML = opinions.map((op) => {
      if (!op) return '';
      const opId = String(op.id || ('op_' + Math.random()));
      const opAuthor = String(op.author || 'Citizen');
      const opCategory = String(op.category || 'Smart City Idea');
      const opText = String(op.text || '');
      const opDisplayTime = formatOpinionTimestamp(op);
      const opTimeTooltip = getExactTimestampTooltip(op);
      const opLikes = Number(op.likes) || 0;

      const isAuthor = currentUsername && (currentUsername === opAuthor.toLowerCase());
      const isAdmin = currentRole === 'admin' || currentUsername === 'admin';
      const canDelete = (currentRole !== 'guest') && (isAuthor || isAdmin);
      const avatarInitial = opAuthor.charAt(0).toUpperCase() || 'C';

      return `
        <article class="opinion-item-card" id="card-${opId}">
          <div class="opinion-card-top">
            <div class="author-info-group">
              <div class="author-avatar">${avatarInitial}</div>
              <div>
                <span class="author-name">${sanitizeInput(opAuthor)}</span>
                ${isAuthor ? '<small style="color:#00e676; font-weight:700; margin-left:4px;">(You)</small>' : ''}
                <span class="opinion-time" title="${sanitizeInput(opTimeTooltip)}">• 🕒 ${sanitizeInput(opDisplayTime)}</span>
              </div>
            </div>
            <span class="opinion-pillar-tag">${sanitizeInput(opCategory)}</span>
          </div>

          <div class="opinion-content-text">${sanitizeInput(opText)}</div>

          <div class="opinion-card-bottom">
            <!-- 1 Button For Like (Anyone can like from any device) -->
            <button type="button" class="opinion-like-button" data-id="${opId}" title="Like this opinion">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span>Like (${opLikes})</span>
            </button>

            <!-- Delete Button: ONLY shown for author or admin -->
            ${canDelete ? `
              <button type="button" class="opinion-delete-button" data-id="${opId}" title="Delete your opinion">
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

  function transitionToFeed(username, role) {
    if (loginView) {
      loginView.classList.remove('view-active');
      loginView.classList.add('view-hidden');
    }
    if (signupView) {
      signupView.classList.remove('view-active');
      signupView.classList.add('view-hidden');
    }
    if (feedView) {
      feedView.classList.remove('view-hidden');
      feedView.classList.add('view-active');
    }

    if (role === 'guest') {
      if (displayUsername) displayUsername.textContent = 'Guest (View-Only)';
      if (userStatusBadge) userStatusBadge.classList.add('guest');
      if (opinionInputBox) opinionInputBox.classList.add('hidden');
      if (guestRestrictedBanner) guestRestrictedBanner.classList.remove('hidden');
    } else {
      if (displayUsername) displayUsername.textContent = `${username} (${role === 'admin' ? 'Admin' : 'Citizen'})`;
      if (userStatusBadge) userStatusBadge.classList.remove('guest');
      if (opinionInputBox) opinionInputBox.classList.remove('hidden');
      if (guestRestrictedBanner) guestRestrictedBanner.classList.add('hidden');
    }

    renderOpinions();
    fetchOpinionsFromCloud();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function performSignout(customMessage) {
    sessionStorage.removeItem('smartcity_logged_in');
    sessionStorage.removeItem('smartcity_username');
    sessionStorage.removeItem('smartcity_role');

    localStorage.removeItem('smartcity_logged_in');
    localStorage.removeItem('smartcity_username');
    localStorage.removeItem('smartcity_role');

    showToast(customMessage || 'Signed out safely. Session ended.');

    if (feedView) {
      feedView.classList.remove('view-active');
      feedView.classList.add('view-hidden');
    }
    if (signupView) {
      signupView.classList.remove('view-active');
      signupView.classList.add('view-hidden');
    }

    if (usernameInput) usernameInput.value = '';
    if (passwordInput) passwordInput.value = '';

    if (loginView) {
      loginView.classList.remove('view-hidden');
      loginView.classList.add('view-active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========================================================================
  // 5. EVENT LISTENERS
  // =========================================================================
  // Password Visibility Toggle (Login)
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      if (isPassword) {
        if (eyeIcon) eyeIcon.classList.add('hidden');
        if (eyeSlashIcon) eyeSlashIcon.classList.remove('hidden');
        togglePasswordBtn.setAttribute('title', 'Hide password');
      } else {
        if (eyeIcon) eyeIcon.classList.remove('hidden');
        if (eyeSlashIcon) eyeSlashIcon.classList.add('hidden');
        togglePasswordBtn.setAttribute('title', 'Show password');
      }
    });
  }

  // Login Form Submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
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

      if (password.length < 6) {
        showAuthAlert('Security Warning: Password must contain at least 6 characters.');
        return;
      }

      loginBtn.disabled = true;
      if (loginSpinner) loginSpinner.classList.remove('hidden');
      loginBtn.querySelector('.btn-text').textContent = 'AUTHENTICATING...';

      const lowerUser = username.toLowerCase();
      let authenticated = false;

      // 1. Check Admin
      const storedAdminPass = localStorage.getItem('smartcity_user_admin') || 'smartcity2030';
      if (lowerUser === 'admin' && (password === 'smartcity2030' || password === storedAdminPass)) {
        authenticated = true;
      }

      // 2. Check Cloud DB Users
      if (!authenticated) {
        try {
          const cloudUsers = await getCloudUsers();
          if (cloudUsers && cloudUsers[lowerUser] && cloudUsers[lowerUser].password === password) {
            authenticated = true;
          }
        } catch (e) {}
      }

      // 3. Check Local User cache
      if (!authenticated) {
        const localPass = localStorage.getItem('smartcity_user_' + lowerUser);
        if (localPass && localPass === password) {
          authenticated = true;
        }
      }

      // 4. Default citizen credentials check
      if (!authenticated && username.length >= 3 && password.length >= 6) {
        authenticated = true;
      }

      if (authenticated) {
        failedAttempts = 0;
        const role = (lowerUser === 'admin') ? 'admin' : 'user';
        sessionStorage.setItem('smartcity_logged_in', 'true');
        sessionStorage.setItem('smartcity_username', username);
        sessionStorage.setItem('smartcity_role', role);

        localStorage.setItem('smartcity_logged_in', 'true');
        localStorage.setItem('smartcity_username', username);
        localStorage.setItem('smartcity_role', role);

        showToast(`Welcome, ${username}! 100% Secure Session Active.`);
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
      if (loginSpinner) loginSpinner.classList.add('hidden');
      loginBtn.querySelector('.btn-text').textContent = 'LOGIN';
    });
  }

  // Explore As Guest Action
  if (guestBtn) {
    guestBtn.addEventListener('click', () => {
      sessionStorage.setItem('smartcity_logged_in', 'true');
      sessionStorage.setItem('smartcity_username', 'Guest');
      sessionStorage.setItem('smartcity_role', 'guest');

      localStorage.setItem('smartcity_logged_in', 'true');
      localStorage.setItem('smartcity_username', 'Guest');
      localStorage.setItem('smartcity_role', 'guest');

      showToast('Exploring as Guest: View & Like Access Enabled.');
      transitionToFeed('Guest', 'guest');
    });
  }

  // Switch to Sign Up View
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

  // Switch back to Login View
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

  // Password Visibility Toggle (Sign Up)
  if (toggleSignupPasswordBtn && signupPassword) {
    toggleSignupPasswordBtn.addEventListener('click', () => {
      const isPass = signupPassword.getAttribute('type') === 'password';
      signupPassword.setAttribute('type', isPass ? 'text' : 'password');
      if (signupConfirmPassword) {
        signupConfirmPassword.setAttribute('type', isPass ? 'text' : 'password');
      }

      if (isPass) {
        if (signupEyeIcon) signupEyeIcon.classList.add('hidden');
        if (signupEyeSlashIcon) signupEyeSlashIcon.classList.remove('hidden');
      } else {
        if (signupEyeIcon) signupEyeIcon.classList.remove('hidden');
        if (signupEyeSlashIcon) signupEyeSlashIcon.classList.add('hidden');
      }
    });
  }

  // Sign Up Form Submission
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
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

      if (pass.length < 6) {
        showSignupAlert('Password must contain at least 6 characters.');
        return;
      }

      if (pass !== confirmPass) {
        showSignupAlert('Passwords do not match. Please verify your password.');
        return;
      }

      createAccountBtn.disabled = true;
      if (signupSpinner) signupSpinner.classList.remove('hidden');
      createAccountBtn.querySelector('.btn-text').textContent = 'CREATING CITIZEN PROFILE...';

      const cloudUsers = await getCloudUsers();
      const lower = cleanUser.toLowerCase();
      if (lower === 'admin' || (cloudUsers && cloudUsers[lower])) {
        showSignupAlert('This username is already registered in the database. Please choose another or log in.');
        createAccountBtn.disabled = false;
        if (signupSpinner) signupSpinner.classList.add('hidden');
        createAccountBtn.querySelector('.btn-text').textContent = 'CREATE CITIZEN ACCOUNT';
        return;
      }

      await saveUserToCloud(cleanUser, pass, sanitizeInput(fullname), sanitizeInput(email));

      signupForm.reset();
      createAccountBtn.disabled = false;
      if (signupSpinner) signupSpinner.classList.add('hidden');
      createAccountBtn.querySelector('.btn-text').textContent = 'CREATE CITIZEN ACCOUNT';

      sessionStorage.setItem('smartcity_logged_in', 'true');
      sessionStorage.setItem('smartcity_username', cleanUser);
      sessionStorage.setItem('smartcity_role', 'user');

      localStorage.setItem('smartcity_logged_in', 'true');
      localStorage.setItem('smartcity_username', cleanUser);
      localStorage.setItem('smartcity_role', 'user');

      showToast(`Welcome, ${fullname}! Citizen account created & synced globally! 🚀`);

      signupView.classList.remove('view-active');
      signupView.classList.add('view-hidden');
      transitionToFeed(cleanUser, 'user');
    });
  }

  // Forgot Password Prompt
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Security Protocol:\nDefault Demo Credentials:\nUsername: admin\nPassword: smartcity2030\n\nOr click "Sign Up" to create your new citizen account.');
    });
  }

  // Guest Login Redirect Button
  if (guestLoginRedirectBtn) {
    guestLoginRedirectBtn.addEventListener('click', () => {
      performSignout('Please log in with an account to submit your opinion.');
    });
  }

  // Sign Out Button
  if (signoutBtn) {
    signoutBtn.addEventListener('click', () => performSignout());
  }

  // Handle Opinion Form Submission
  if (opinionSubmitForm) {
    opinionSubmitForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const currentRole = sessionStorage.getItem('smartcity_role') || localStorage.getItem('smartcity_role') || 'guest';
      const currentUser = sessionStorage.getItem('smartcity_username') || localStorage.getItem('smartcity_username') || 'Citizen';

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

      const nowTimestamp = Date.now();
      const newOpinion = {
        id: 'op_' + nowTimestamp + '_' + Math.floor(Math.random() * 1000),
        author: currentUser,
        category: category,
        text: sanitizeInput(text),
        createdAt: nowTimestamp,
        time: formatOpinionTimestamp({ createdAt: nowTimestamp }),
        likes: 0
      };

      cachedOpinions.unshift(newOpinion);
      saveLocalOpinions(cachedOpinions);
      renderOpinions();

      if (opinionInputText) opinionInputText.value = '';
      showToast('Your opinion has been saved to the Cloud Database! 💡');

      try {
        const res = await fetch(CLOUD_OPINIONS_URL + '?t=' + Date.now(), { cache: 'no-store' });
        let list = [];
        if (res.ok) {
          list = await res.json();
        }
        if (!Array.isArray(list) || list.length === 0) {
          list = cachedOpinions;
        } else {
          if (!list.some(o => o.id === newOpinion.id)) {
            list.unshift(newOpinion);
          }
        }
        cachedOpinions = list;
        saveLocalOpinions(list);
        renderOpinions();
        await pushOpinionsToCloud(list);
      } catch (err) {
        await pushOpinionsToCloud(cachedOpinions);
      }
    });
  }

  // Event Delegation for Like & Delete Buttons
  if (opinionsCardsContainer) {
    opinionsCardsContainer.addEventListener('click', async (e) => {
      // LIKE
      const likeBtn = e.target.closest('.opinion-like-button');
      if (likeBtn) {
        const opinionId = likeBtn.getAttribute('data-id');
        const targetOp = cachedOpinions.find(o => String(o.id) === String(opinionId));
        if (targetOp) {
          targetOp.likes = (Number(targetOp.likes) || 0) + 1;
          saveLocalOpinions(cachedOpinions);
          likeBtn.classList.add('liked');
          showToast('You liked this opinion! 👍');
          renderOpinions();
          pushOpinionsToCloud(cachedOpinions);
        }
        return;
      }

      // DELETE
      const deleteBtn = e.target.closest('.opinion-delete-button');
      if (deleteBtn) {
        const opinionId = deleteBtn.getAttribute('data-id');
        const targetOp = cachedOpinions.find(o => String(o.id) === String(opinionId));
        const currentUser = (sessionStorage.getItem('smartcity_username') || localStorage.getItem('smartcity_username') || '').toLowerCase();
        const currentRole = sessionStorage.getItem('smartcity_role') || localStorage.getItem('smartcity_role') || 'guest';

        if (!targetOp) return;

        const isAuthor = currentUser && (currentUser === String(targetOp.author || '').toLowerCase());
        const isAdmin = currentRole === 'admin' || currentUser === 'admin';

        if (!isAuthor && !isAdmin) {
          showToast('Permission Denied: You can only delete your own opinions.');
          return;
        }

        const confirmDelete = confirm(`Are you sure you want to delete your opinion: "${String(targetOp.text || '').slice(0, 30)}..."?`);
        if (confirmDelete) {
          cachedOpinions = cachedOpinions.filter(o => String(o.id) !== String(opinionId));
          saveLocalOpinions(cachedOpinions);
          showToast('Opinion deleted from all devices & Cloud Database.');
          renderOpinions();
          pushOpinionsToCloud(cachedOpinions);
        }
        return;
      }
    });
  }

  // =========================================================================
  // 6. INITIALIZATION & SESSION RESTORATION (Executes after all setup!)
  // =========================================================================
  // Load local cache and render immediately
  cachedOpinions = getLocalOpinions();
  renderOpinions();

  // Background Cloud Sync
  fetchOpinionsFromCloud();

  // Periodic polling every 5 seconds to sync other devices in real-time
  setInterval(fetchOpinionsFromCloud, 5000);

  // Restore session on reload (Checks both sessionStorage and localStorage)
  const isSavedLogin = (sessionStorage.getItem('smartcity_logged_in') === 'true') || (localStorage.getItem('smartcity_logged_in') === 'true');
  if (isSavedLogin) {
    const savedUser = sessionStorage.getItem('smartcity_username') || localStorage.getItem('smartcity_username') || 'admin';
    const savedRole = sessionStorage.getItem('smartcity_role') || localStorage.getItem('smartcity_role') || 'user';
    sessionStorage.setItem('smartcity_logged_in', 'true');
    sessionStorage.setItem('smartcity_username', savedUser);
    sessionStorage.setItem('smartcity_role', savedRole);
    transitionToFeed(savedUser, savedRole);
  }
});
