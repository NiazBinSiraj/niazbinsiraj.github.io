# GEMINI.md — Project Guide for AI Agents

## Project Overview

This is a **personal portfolio website** for Niaz Bin Siraj, a Software Engineer specializing in backend development. The site is hosted on **GitHub Pages** at [niazbinsiraj.com](https://niazbinsiraj.com) and uses a **terminal/CLI-themed** design aesthetic — dark backgrounds, green monospace text, and command-prompt style section headers.

## Tech Stack

- **HTML5** — Single-page layout in `index.html`
- **Tailwind CSS** — Loaded via CDN (`cdn.tailwindcss.com`), used for utility-first styling
- **Vanilla CSS** — Custom terminal-themed styles in `style.css` (CSS custom properties, animations, component styles)
- **Vanilla JavaScript** — All interactivity in `script.js` (no framework, no build step)
- **Font Awesome 6.4** — Icon library loaded via CDN
- **Google Analytics** — Tracking via `gtag.js` (ID: `G-JPS05NB1F4`)

There is **no build step, no bundler, no package manager**. The site is served as static files directly.

## Project Structure

```
├── index.html              # Single-page HTML (all sections)
├── script.js               # All JavaScript logic (navigation, data loading, rendering)
├── style.css               # Custom CSS with terminal-theme variables and component styles
├── CNAME                   # Custom domain: niazbinsiraj.com
├── .gitignore              # Comprehensive ignore rules
└── static/
    ├── db/                 # JSON data files (content source of truth)
    │   ├── skills.json
    │   ├── experience.json
    │   ├── education.json
    │   ├── projects.json
    │   ├── achievements.json
    │   └── competitions.json
    └── images/
        └── profile.jpg     # Profile photo
```

## Architecture & Data Flow

### Data-Driven Rendering

All section content (skills, experience, education, projects, achievements, competitions) is stored in **JSON files under `static/db/`** and loaded at runtime via `fetch()`. The `script.js` file:

1. On `DOMContentLoaded`, calls `loadAllData()` which fetches all 6 JSON files in parallel.
2. Each data type has a `load*()` → `render*()` → `create*Card()` function chain.
3. Cards are dynamically created as DOM elements and appended to container `<div>`s in `index.html`.

**To update portfolio content**, edit the JSON files in `static/db/` — do **not** hard-code content into `index.html`.

### Navigation

- **Desktop**: Fixed left sidebar (`#sidebar`, 320px wide) with navigation links, profile photo, and social icons.
- **Mobile**: Sidebar is hidden off-screen and toggled via a hamburger button (`#mobile-menu-btn`) with an overlay (`#mobile-overlay`).
- Active section highlighting is handled by an `IntersectionObserver`-based scroll listener.

### Sections (in page order)

| Section ID       | Description                       |
|------------------|-----------------------------------|
| `#about`         | Bio and specializations           |
| `#skills`        | Technical skills by category      |
| `#experience`    | Work history timeline             |
| `#education`     | Academic background               |
| `#projects`      | Portfolio projects with tech stack |
| `#achievements`  | Awards and certifications         |
| `#competitions`  | Programming contest results       |
| `#contacts`      | Email, phone, social links        |

## Data Formats (`static/db/`)

All portfolio content lives in JSON files under `static/db/`. Each file is fetched at runtime and rendered into cards. Below is the schema for each file.

### `skills.json`

A flat object where each key is a skill category and the value is an array of skill name strings. The category keys rendered by `script.js` are:

| Key            | Card Title                | Icon               |
|----------------|---------------------------|--------------------|
| `languages`    | Programming Languages     | `fas fa-code`      |
| `frameworks`   | Frameworks & Libraries    | `fas fa-layer-group`|
| `databases`    | Databases & ORM           | `fas fa-database`  |
| `tools`        | Tools & Technologies      | `fas fa-tools`     |
| `ai_tools`     | AI & Development Tools    | `fas fa-robot`     |
| `testing`      | Testing & Quality         | `fas fa-check-circle` |

> **Note**: The `methodologies` key exists in the JSON but is **not** rendered — it has no matching entry in the `skillCategories` array in `script.js`. To display it, add a new entry to that array.

```json
{
  "languages": ["Java", "JavaScript", "TypeScript"],
  "frameworks": ["Spring Boot", "React"],
  "databases": ["Oracle", "MySQL"],
  "tools": ["Docker", "Git"],
  "ai_tools": ["Github Copilot"],
  "testing": ["JUnit", "Mockito"]
}
```

---

### `experience.json`

Wrapped in an `"experiences"` array. Each entry has:

| Field               | Type       | Required | Description                          |
|---------------------|------------|----------|--------------------------------------|
| `company`           | `string`   | ✅       | Company or organization name         |
| `position`          | `string`   | ✅       | Job title                            |
| `location`          | `string`   | ✅       | City, country                        |
| `duration`          | `string`   | ✅       | Time range (e.g., `"Jun 2022 - Present"`) |
| `responsibilities`  | `string[]` | ✅       | List of bullet points for the role   |

```json
{
  "experiences": [
    {
      "company": "Therap (BD) Ltd.",
      "position": "Software Engineer II",
      "location": "Dhaka, Bangladesh",
      "duration": "Jun 2022 - Present",
      "responsibilities": [
        "Designed and implemented a history-based Aging Report Generation System...",
        "Led development of the Nebraska State Integration Billing Flow..."
      ]
    }
  ]
}
```

---

### `education.json`

Wrapped in an `"education"` array. Each entry has:

| Field          | Type       | Required | Description                             |
|----------------|------------|----------|-----------------------------------------|
| `institution`  | `string`   | ✅       | School or university name               |
| `degree`       | `string`   | ✅       | Degree title (e.g., `"BSc in CSE"`)     |
| `duration`     | `string`   | ✅       | Year range (e.g., `"2017 - 2022"`)      |
| `cgpa`         | `string`   | ✅       | GPA with scale (e.g., `"3.30/4.00"`)    |
| `location`     | `string`   | ❌       | City, country. Rendered only if present |
| `coursework`   | `string[]` | ✅       | List of relevant courses                |
| `activities`   | `string[]` | ❌       | Extracurricular activities. Rendered only if present |
| `subjects`     | `string[]` | ❌       | Key subjects. Rendered only if present  |

```json
{
  "education": [
    {
      "institution": "University of Rajshahi",
      "degree": "Bachelor of Science in Computer Science and Engineering",
      "duration": "2017 - 2022",
      "cgpa": "3.30/4.00",
      "location": "Dhaka, Bangladesh",
      "coursework": ["Data Structures and Algorithms", "Database Management Systems"],
      "activities": ["Programming Club Member"]
    }
  ]
}
```

---

### `projects.json`

Wrapped in a `"projects"` array. Each entry has:

| Field         | Type       | Required | Description                                        |
|---------------|------------|----------|----------------------------------------------------|
| `title`       | `string`   | ✅       | Project name                                       |
| `description` | `string`   | ✅       | Brief summary of the project                       |
| `techStack`   | `string[]` | ✅       | Technologies used (rendered as badges)             |
| `features`    | `string[]` | ✅       | Key feature bullet points                          |
| `github`      | `string`   | ❌       | GitHub repo URL. Pass `""` to hide the button      |
| `demo`        | `string`   | ❌       | Live demo URL. Pass `""` to hide the button        |

```json
{
  "projects": [
    {
      "title": "Professional Email Service API",
      "description": "A clean, secure REST API for sending emails via Gmail SMTP.",
      "techStack": ["Node.js", "Express.js", "Nodemailer"],
      "features": [
        "Modular clean architecture with separation of concerns",
        "Gmail SMTP integration with support for multiple recipients"
      ],
      "github": "https://github.com/NiazBinSiraj/email-service",
      "demo": "https://niazbinsiraj.github.io/email-service/"
    }
  ]
}
```

---

### `achievements.json`

Wrapped in an `"achievements"` array. Each entry has:

| Field            | Type     | Required | Description                               |
|------------------|----------|----------|-------------------------------------------|
| `title`          | `string` | ✅       | Achievement name                          |
| `issuer`         | `string` | ✅       | Awarding organization                     |
| `date`           | `string` | ✅       | Date or year                              |
| `description`    | `string` | ✅       | Brief description of the achievement      |
| `certificateUrl` | `string` | ❌       | Link to certificate. Rendered only if present |

```json
{
  "achievements": [
    {
      "title": "Champion, National Round",
      "issuer": "Children Science Congress",
      "date": "2014",
      "description": "Awarded first place in the Research Paper Presentation.",
      "certificateUrl": "https://drive.google.com/file/d/..."
    }
  ]
}
```

---

### `competitions.json`

Wrapped in a `"competitions"` array. Each entry has:

| Field         | Type     | Required | Description                                   |
|---------------|----------|----------|-----------------------------------------------|
| `name`        | `string` | ✅       | Competition name                              |
| `year`        | `string` | ✅       | Year of participation                         |
| `rank`        | `string` | ✅       | Placement (e.g., `"118th"`, `"Top 10"`)       |
| `team`        | `string` | ✅       | Team name or `"Individual"`                   |
| `description` | `string` | ✅       | Brief description of the result               |

```json
{
  "competitions": [
    {
      "name": "ACM ICPC Dhaka Regional Online Preliminary",
      "year": "2020",
      "rank": "118th",
      "team": "RU_Baby_Step_Giant_Step",
      "description": "Represented University of Rajshahi in the ACM ICPC Dhaka Regional."
    }
  ]
}
```

---

### How to Modify Existing Data

1. Open the relevant JSON file in `static/db/`.
2. Edit the field values directly. Keep the JSON structure intact.
3. Ensure valid JSON (no trailing commas, proper quoting). Validate with `python3 -m json.tool static/db/<file>.json` if unsure.
4. Push to `master` — the changes go live automatically via GitHub Pages.

### How to Add a New Data Section

Adding a completely new section (e.g., "Publications") requires changes in **three files**:

1. **Create the data file** — `static/db/publications.json` with your chosen schema.
2. **Add HTML skeleton** in `index.html`:
   - Add a new `<section>` element with `id="publications"` and `class="section"`, following the terminal-header pattern.
   - Add an empty container `<div id="publications-container">`.
   - Add a sidebar navigation `<li>` entry.
3. **Add JS rendering** in `script.js`:
   - Create `loadPublications()`, `renderPublications()`, and `createPublicationCard()` functions following the existing pattern.
   - Add `loadPublications()` to the `Promise.all()` call inside `loadAllData()`.

## Design Conventions

### Terminal Theme

The entire site follows a **terminal/command-line** visual metaphor:
- Section headers are styled as shell commands (e.g., `$ cat about.txt`, `$ ls -la skills/`)
- Cards include terminal prompts (`niaz@backend:~$`)
- Color palette is defined in CSS custom properties:
  - `--terminal-bg`: `#0f172a` (dark navy)
  - `--terminal-secondary`: `#1e293b` (slightly lighter)
  - `--terminal-accent`: `#22c55e` (green)
  - `--terminal-text`: `#10b981` (emerald)
  - `--terminal-border`: `#22c55e` (green)
- Font: `font-mono` (Tailwind) and `'Courier New', monospace` (CSS)

### CSS Organization

- **CSS custom properties** for theming are defined in `:root` in `style.css`
- **Component classes** (`.skill-card`, `.experience-card`, `.project-card`, `.achievement-card`, `.competition-card`) handle card-specific styling
- **Animation classes** (`.hover-lift`, `.fade-in-up`, `.stagger-1` through `.stagger-6`) provide entrance and interaction animations
- **Tailwind CSS** handles layout, spacing, and responsive utilities in `index.html`

### Naming Conventions

- Container IDs follow the pattern: `{section}-container` (e.g., `skills-container`, `experience-container`)
- Navigation links use class `.nav-link`
- CSS classes use kebab-case (e.g., `hover-lift`, `skill-card`, `tech-badge`)
- JavaScript functions follow `camelCase` with patterns:
  - `load*()` — fetches JSON data
  - `render*()` — orchestrates rendering
  - `create*Card()` — builds individual DOM elements

## Deployment

- **Hosting**: GitHub Pages (from the `master` branch)
- **Custom Domain**: `niazbinsiraj.com` (configured via `CNAME` file)
- **Deployment**: Push to `master` branch triggers automatic GitHub Pages deployment
- **No CI/CD pipeline** — no build step required

## Guidelines for Changes

1. **Content updates**: Modify JSON files in `static/db/`. Do not inline content into HTML.
2. **Styling**: Prefer using existing CSS custom properties and Tailwind utilities. Add new component classes to `style.css` following the terminal theme.
3. **New sections**: Add the HTML skeleton in `index.html`, create a corresponding JSON data file, and add `load*()` / `render*()` / `create*Card()` functions in `script.js`. Update the sidebar navigation.
4. **Preserve the terminal aesthetic**: All new UI elements should use the green-on-dark color scheme, monospace fonts, and terminal-command-style headers.
5. **No build tools**: Keep the site as plain static files. Do not introduce bundlers, transpilers, or package managers unless explicitly requested.
6. **External link**: The sidebar includes a link to the blog at `blog.niazbinsiraj.com` which opens in a new tab.
