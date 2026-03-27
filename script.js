const siteConfig = {
  siteTitle: "DiablOMG! Comics",
  logoMode: "text", // use "image" later if you want a custom logo file
  logoImageUrl: "assets/diablomg-logo.png",
  donateUrl: "https://venmo.com/agentonee",
  donateLabel: "Donate via Venmo",
};

const comics = [
  {
    id: 1,
    title: "Server Merge Support Group",
    date: "2026-03-26",
    displayDate: "March 26, 2026",
    series: "Agent",
    month: "March 2026",
    image: "assets/featured-placeholder.jpg",
    excerpt: "A featured homepage post with room for a title, full image, date, and previous or next navigation.",
  },
  {
    id: 2,
    title: "Whale War Games",
    date: "2026-03-25",
    displayDate: "March 25, 2026",
    series: "Agent",
    month: "March 2026",
    image: "assets/comic-2-placeholder.jpg",
    excerpt: "Massive egos, expensive builds, and a deeply irresponsible amount of chaos.",
  },
  {
    id: 3,
    title: "Dead Server Announcement",
    date: "2026-03-24",
    displayDate: "March 24, 2026",
    series: "DiablOMG!",
    month: "March 2026",
    image: "assets/comic-3-placeholder.jpg",
    excerpt: "A public service announcement that somehow manages to make things worse.",
  },
  {
    id: 4,
    title: "Treasure Goblin Promo",
    date: "2026-03-19",
    displayDate: "March 19, 2026",
    series: "DiablOMG!",
    month: "March 2026",
    image: "assets/comic-4-placeholder.jpg",
    excerpt: "Marketing strategy by exhausted necromancers. We all suffer for it.",
  },
  {
    id: 5,
    title: "Spring Battlegrounds",
    date: "2026-03-12",
    displayDate: "March 12, 2026",
    series: "Agent",
    month: "March 2026",
    image: "assets/comic-5-placeholder.jpg",
    excerpt: "An inspirational story involving hammers, disappointment, and a trash can.",
  },
  {
    id: 6,
    title: "Pilot First Class Agent",
    date: "2026-02-09",
    displayDate: "February 9, 2026",
    series: "Special",
    month: "February 2026",
    image: "assets/comic-6-placeholder.jpg",
    excerpt: "A special post using the same viewer and archive layout, because consistency is not a crime.",
  },
];

const filters = ["All", "Agent", "DiablOMG!", "Special"];
let activeFilter = "All";
let activeMonth = "All Months";
let selectedComic = comics[0];

const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");
const heroDate = document.getElementById("heroDate");
const donateButton = document.getElementById("donateButton");
const readLatestBtn = document.getElementById("readLatestBtn");
const viewerTitle = document.getElementById("viewerTitle");
const viewerMeta = document.getElementById("viewerMeta");
const viewerImage = document.getElementById("viewerImage");
const viewerExcerpt = document.getElementById("viewerExcerpt");
const prevComicBtn = document.getElementById("prevComicBtn");
const nextComicBtn = document.getElementById("nextComicBtn");
const galleryGrid = document.getElementById("galleryGrid");
const archiveList = document.getElementById("archiveList");
const seriesFilters = document.getElementById("seriesFilters");
const monthFilter = document.getElementById("monthFilter");
const logoText = document.getElementById("logoText");
const logoImage = document.getElementById("logoImage");

function setupSiteConfig() {
  document.title = siteConfig.siteTitle;
  donateButton.href = siteConfig.donateUrl;
  donateButton.textContent = siteConfig.donateLabel;

  if (siteConfig.logoMode === "image") {
    logoText.classList.add("hidden");
    logoImage.classList.remove("hidden");
    logoImage.src = siteConfig.logoImageUrl;
  } else {
    logoText.classList.remove("hidden");
    logoImage.classList.add("hidden");
  }
}

function monthCounts() {
  return comics.reduce((acc, comic) => {
    acc[comic.month] = (acc[comic.month] || 0) + 1;
    return acc;
  }, {});
}

function renderHero() {
  const latest = comics[0];
  heroImage.src = latest.image;
  heroImage.alt = latest.title;
  heroTitle.textContent = `Today's Comic: ${latest.title}`;
  heroDate.textContent = latest.displayDate;
}

function renderViewer() {
  viewerTitle.textContent = selectedComic.title;
  viewerMeta.textContent = `${selectedComic.displayDate} • ${selectedComic.series}`;
  viewerImage.src = selectedComic.image;
  viewerImage.alt = selectedComic.title;
  viewerExcerpt.textContent = selectedComic.excerpt;

  const selectedIndex = comics.findIndex((comic) => comic.id === selectedComic.id);
  prevComicBtn.disabled = selectedIndex === comics.length - 1;
  nextComicBtn.disabled = selectedIndex === 0;
}

function filteredComics() {
  return comics.filter((comic) => {
    const seriesMatch = activeFilter === "All" || comic.series === activeFilter;
    const monthMatch = activeMonth === "All Months" || comic.month === activeMonth;
    return seriesMatch && monthMatch;
  });
}

function renderGallery() {
  const items = filteredComics();
  galleryGrid.innerHTML = "";

  items.forEach((comic) => {
    const card = document.createElement("article");
    card.className = "comic-card";
    card.innerHTML = `
      <button type="button" data-id="${comic.id}">
        <img class="card-image" src="${comic.image}" alt="${comic.title}" />
        <div class="card-body">
          <div class="card-meta">
            <span class="badge">${comic.series}</span>
            <span>${comic.displayDate}</span>
          </div>
          <h3 class="card-title">${comic.title}</h3>
          <p class="card-excerpt">${comic.excerpt}</p>
          <span class="card-link">View Comic</span>
        </div>
      </button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      selectedComic = comic;
      renderViewer();
      document.getElementById("viewer").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    galleryGrid.appendChild(card);
  });
}

function renderFilters() {
  seriesFilters.innerHTML = "";
  filters.forEach((filter) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `btn ${filter === activeFilter ? "btn-primary" : "btn-secondary"}`;
    btn.textContent = filter;
    btn.addEventListener("click", () => {
      activeFilter = filter;
      renderFilters();
      renderGallery();
    });
    seriesFilters.appendChild(btn);
  });

  const months = Object.keys(monthCounts());
  monthFilter.innerHTML = `<option>All Months</option>${months.map((month) => `<option ${month === activeMonth ? "selected" : ""}>${month}</option>`).join("")}`;
  monthFilter.value = activeMonth;
  monthFilter.addEventListener("change", (event) => {
    activeMonth = event.target.value;
    renderArchive();
    renderGallery();
  });
}

function renderArchive() {
  const counts = monthCounts();
  archiveList.innerHTML = "";
  Object.entries(counts).forEach(([month, count]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `archive-button ${month === activeMonth ? "active" : ""}`;
    button.innerHTML = `
      <span>
        <strong>${month}</strong><br />
        <span class="hero-date">${count} comic${count === 1 ? "" : "s"}</span>
      </span>
      <span>Open</span>
    `;
    button.addEventListener("click", () => {
      activeMonth = month;
      monthFilter.value = month;
      renderArchive();
      renderGallery();
      document.getElementById("gallery").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    archiveList.appendChild(button);
  });
}

prevComicBtn.addEventListener("click", () => {
  const selectedIndex = comics.findIndex((comic) => comic.id === selectedComic.id);
  if (selectedIndex < comics.length - 1) {
    selectedComic = comics[selectedIndex + 1];
    renderViewer();
  }
});

nextComicBtn.addEventListener("click", () => {
  const selectedIndex = comics.findIndex((comic) => comic.id === selectedComic.id);
  if (selectedIndex > 0) {
    selectedComic = comics[selectedIndex - 1];
    renderViewer();
  }
});

readLatestBtn.addEventListener("click", () => {
  selectedComic = comics[0];
  renderViewer();
  document.getElementById("viewer").scrollIntoView({ behavior: "smooth", block: "start" });
});

setupSiteConfig();
renderHero();
renderViewer();
renderFilters();
renderArchive();
renderGallery();
