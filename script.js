// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.1)";
  }
});

// Simulation réaliste d'Instagram/Facebook feed
const mockSocialPosts = [
  {
    id: 1,
    platform: "instagram",
    brand: "La Petite Maro",
    image: '<img src="/img/insta_1.jpg" alt="Jupe laureplusmax" />',
    description: "Coup de ❤️ pour ces deux jupes de chez @laureplusmax !",
    likes: 37,
    timeAgo: "2 sem",
    hashtags: ["#lapetitemaro", "#été2025", "#moncoeurvalence"],
  },
  {
    id: 2,
    platform: "facebook",
    brand: "Mademoiselle Jeanne",
    image: '<img src="/img/facebook_2.jpg" alt="Jupe laureplusmax" />',
    description: "Coup de ❤️ pour ces deux jupes de chez @laureplusmax !",
    likes: 3,
    timeAgo: "1j",
    hashtags: ["#éditionlimitée", "#exclusif", "#collector"],
  },
  {
    id: 3,
    platform: "instagram",
    brand: "La Petite Maro",
    image: '<img src="/img/insta_2.jpg" alt="Sac FOLK" />',
    description:
      "Les nouveautés de chez Paul Marius ! Découvrez la gamme FOLK ! 👜",
    likes: 23,
    timeAgo: "2 juillet",
    hashtags: [
      "#valence",
      "#moncoeurvalence",
      "#lapetitemaro",
      "#sac",
      "#nouveauté",
    ],
  },
  {
    id: 4,
    platform: "facebook",
    brand: "Mademoiselle Jeanne",
    image: '<img src="/img/facebook_1.jpg" alt="Sac FOLK" />',
    description:
      "Les nouveautés de chez Paul Marius ! Découvrez la gamme FOLK ! 👜",
    likes: 4,
    timeAgo: "25 juin",
    hashtags: [
      "#valence",
      "#moncoeurvalence",
      "#lapetitemaro",
      "#sac",
      "#nouveauté",
    ],
  },
  {
    id: 5,
    platform: "instagram",
    brand: "La Petite Maro",
    image: '<img src="/img/insta_3.jpg" alt="Soldes" />',
    description:
      "Venez profiter des -30% et -50% sur une grande sélection d’articles. À découvrir en boutique ! 🛍️",
    likes: 18,
    timeAgo: "2j",
    hashtags: ["#valence", "#moncoeurvalence", "#lapetitemaro", "#solde"],
  },
  {
    id: 6,
    platform: "facebook",
    brand: "Mademoiselle Jeanne",
    image: '<img src="/img/facebook_3.jpg" alt="Soldes" />',
    description:
      "Venez profiter des -30% et -50% sur une grande sélection d’articles. À découvrir en boutique ! 🛍️",
    likes: 8,
    timeAgo: "3j",
    hashtags: ["#valence", "#moncoeurvalence", "#lapetitemaro", "#solde"],
  },
];

let currentPostIndex = 4;
let isLiveDemo = false;

function createPostElement(post) {
  const platformIcon = post.platform === "instagram" ? "📷" : "📘";
  const platformColor = post.platform === "instagram" ? "#E4405F" : "#1877F2";

  return `
                <div class="instagram-post" data-platform="${
                  post.platform
                }" style="opacity: 0; transform: translateY(20px);">
                    <div class="post-header">
                        <div class="platform-badge" style="background: ${platformColor};">
                            ${platformIcon} ${
    post.platform === "instagram" ? "Instagram" : "Facebook"
  }
                        </div>
                        <div class="post-time">${post.timeAgo}</div>
                    </div>
                    <div class="post-image">
                        <span>${post.image}</span>
                        <div class="post-overlay">
                            <div class="post-likes">❤️ ${post.likes}</div>
                        </div>
                    </div>
                    <div class="post-content">
                        <div class="post-brand">${post.brand}</div>
                        <div class="post-description">${post.description}</div>
                        <div class="post-hashtags">
                            ${post.hashtags
                              .map(
                                (tag) => `<span class="hashtag">${tag}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            `;
}

function loadInstagramFeed() {
  const grid = document.getElementById("instagram-grid");

  // Vider le grid existant
  grid.innerHTML = "";

  // Charger les 4 premiers posts
  const postsToShow = mockSocialPosts.slice(0, 4);

  postsToShow.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.innerHTML = createPostElement(post);
    grid.appendChild(postElement.firstElementChild);

    // Animation d'entrée
    setTimeout(() => {
      const postEl = grid.children[index];
      postEl.style.transition = "all 0.6s ease";
      postEl.style.opacity = "1";
      postEl.style.transform = "translateY(0)";
    }, index * 200);
  });
}

function simulateRealTimeUpdate() {
  const grid = document.getElementById("instagram-grid");
  const posts = Array.from(grid.children);

  if (posts.length > 0) {
    // Supprimer le dernier post avec animation
    const lastPost = posts[posts.length - 1];
    lastPost.style.transform = "translateX(100%)";
    lastPost.style.opacity = "0";

    setTimeout(() => {
      lastPost.remove();

      // Ajouter un nouveau post en première position
      const newPost =
        mockSocialPosts[currentPostIndex % mockSocialPosts.length];
      const postElement = document.createElement("div");
      postElement.innerHTML = createPostElement(newPost);
      const newPostEl = postElement.firstElementChild;

      // Animation d'entrée depuis la gauche
      newPostEl.style.transform = "translateX(-100%)";
      newPostEl.style.opacity = "0";
      grid.insertBefore(newPostEl, grid.firstChild);

      setTimeout(() => {
        newPostEl.style.transition = "all 0.8s ease";
        newPostEl.style.transform = "translateX(0)";
        newPostEl.style.opacity = "1";
      }, 100);

      currentPostIndex++;

      // Notification de mise à jour
      showUpdateNotification(newPost);
    }, 500);
  }
}

function showUpdateNotification(post) {
  const notification = document.createElement("div");
  notification.className = "update-notification";
  notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">🔔</span>
                    <div>
                        <strong>Nouveau post ${
                          post.platform === "instagram"
                            ? "Instagram"
                            : "Facebook"
                        }</strong>
                        <div>${post.brand}</div>
                    </div>
                </div>
            `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-100px)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function toggleLiveDemo() {
  const button = document.getElementById("live-demo-btn");

  if (!isLiveDemo) {
    isLiveDemo = true;
    button.textContent = "⏸️ Arrêter la démo";
    button.style.background = "#dc3545";

    // Démarrer les mises à jour automatiques
    demoInterval = setInterval(simulateRealTimeUpdate, 5000);

    // Notification de démarrage
    showDemoStartNotification();
  } else {
    isLiveDemo = false;
    button.textContent = "▶️ Démo temps réel";
    button.style.background = "linear-gradient(45deg, #8b4513, #a0522d)";

    // Arrêter les mises à jour
    clearInterval(demoInterval);
  }
}

function showDemoStartNotification() {
  const notification = document.createElement("div");
  notification.className = "demo-notification";
  notification.innerHTML = `
                <div class="demo-notification-content">
                    <span class="demo-icon">🚀</span>
                    <div>
                        <strong>Démo temps réel activée</strong>
                        <div>Les posts vont se mettre à jour automatiquement</div>
                    </div>
                </div>
            `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-100px)";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Load Instagram feed when page loads
window.addEventListener("load", loadInstagramFeed);

let demoInterval;
