const apiUrl = "http://localhost:3000";

async function getLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  // show a loading placeholder
  list.innerHTML = '<li style="padding:12px;color:var(--muted)">Loading leaderboard…</li>';

  try {
    const res = await fetch(`${apiUrl}/leaderboard`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);

    const data = await res.json();

    // Support both { users: [...] } and [...] shapes
    const players = Array.isArray(data) ? data : (data.users || data.players || []);

    // If empty, show a friendly message
    if (!players || players.length === 0) {
      list.innerHTML = '<li style="padding:12px;color:var(--muted)">No players yet — be the first!</li>';
      return;
    }

    // Clear the list and render items
    list.innerHTML = '';

    players.forEach((player, idx) => {
      const rankNum = player.rank ?? (idx + 1);
      const points = player.points ?? (((player.level ?? 0) + 1) * 25);

      const li = document.createElement('li');
      li.className = 'leader-item';

      const rank = document.createElement('div');
      rank.className = 'rank ' + (rankNum === 1 ? 'gold' : rankNum === 2 ? 'silver' : rankNum === 3 ? 'bronze' : '');
      rank.textContent = rankNum;

      const avatar = document.createElement('div');
      avatar.className = 'avatar';
      // Use provided avatar url when available, otherwise show initial
      if (player.avatarUrl) {
        const img = document.createElement('img');
        img.src = player.avatarUrl;
        img.alt = player.username || 'avatar';
        img.style.width = '44px';
        img.style.height = '44px';
        img.style.borderRadius = '50%';
        img.style.objectFit = 'cover';
        avatar.innerHTML = '';
        avatar.appendChild(img);
      } else {
        avatar.textContent = (player.username || 'U').slice(0, 1).toUpperCase();
      }

      const meta = document.createElement('div');
      meta.className = 'meta';
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = player.username || player.name || 'Unknown';
      const pts = document.createElement('div');
      pts.className = 'points muted';
      pts.textContent = points.toLocaleString() + ' pts';

      meta.appendChild(name);
      meta.appendChild(pts);

      li.appendChild(rank);
      li.appendChild(avatar);
      li.appendChild(meta);

      list.appendChild(li);
    });

  } catch (err) {
    console.error('Error loading leaderboard:', err);
    list.innerHTML = `<li style="padding:12px;color:#c02f2f">Could not load leaderboard — ${err.message}</li>`;
  }
}

// call once on load
getLeaderboard();

// Enhanced interactive features
document.addEventListener('DOMContentLoaded', function() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        animation: ripple 0.6s linear;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Parallax effect for background
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.home__body');
    parallax.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  });

  // Animate features on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.cute-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });

  // Add fadeInUp animation
  const fadeStyle = document.createElement('style');
  fadeStyle.textContent = `
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(fadeStyle);
});