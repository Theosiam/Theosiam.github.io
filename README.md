# Theofanis Siamatras — Portfolio

Personal portfolio website for **Theofanis Siamatras**, Computer Vision & Machine Learning Engineer.

Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build step.

## 🚀 Deploy to GitHub Pages

### Prerequisites
- A GitHub account
- Git installed on your machine

### Step 1: Create the repository on GitHub
1. Go to [github.com/new](https://github.com/new)
2. Name the repository **`Theosiam.github.io`** (must match your GitHub username exactly)
3. Keep it **Public** (required for GitHub Pages on free accounts)
4. Do NOT initialize with a README, .gitignore, or license (we already have files)
5. Click **Create repository**

### Step 2: Push your code
Run these commands from this project folder:

```bash
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/Theosiam/Theosiam.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repo on GitHub → **Settings** → **Pages** (left sidebar)
2. Under "Branch", select **main** and click **Save**
3. Wait 1–2 minutes, then visit: **[https://theosiam.github.io](https://theosiam.github.io)**

### Step 4: Update links
After deploying, replace placeholder links (`#`) in `index.html`:
- Projects: update `href="#"` on each "View Project" link
- Publications: update links for published papers
- Contact: update GitHub and LinkedIn URLs
- Replace `<LINKEDIN_URL>` and `<GITHUB_URL>` in the contact section

## 📁 File Structure

```
Theosiam.github.io/
├── index.html          # Single-page site (all sections)
├── css/
│   └── style.css       # Dark/techy theme styles
├── js/
│   └── main.js         # Typing effect, scroll reveal, nav, particles
├── assets/             # Images and icons (add your own)
└── README.md
```

## 🎨 Design

- **Theme:** Dark (#0a0e14) with electric cyan (#00e5ff) accents
- **Typography:** System font stack + JetBrains Mono for code accents
- **Animations:** Terminal typing effect, scroll-reveal, particle background, rotating geometric rings
- **Responsive:** Mobile-first with hamburger nav

## 🛠 Optional Enhancements

1. **Light/Dark mode toggle** — Add a theme switcher with CSS custom properties
2. **Project filtering** — Add category filter chips (All / Perception / Security / Tools) using JS
3. **Interactive demo embeds** — Embed a live demo of the annotation tool or detection results

---

&copy; 2026 Theofanis Siamatras
