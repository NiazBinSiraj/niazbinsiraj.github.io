# GEMINI.md — Project Guide for AI Agents

## Project Overview

This is a **personal portfolio website** for Niaz Bin Siraj, a Software Engineer specializing in backend development. The site is hosted on **GitHub Pages** at [niazbinsiraj.com](https://niazbinsiraj.com) and uses a **terminal/CLI-themed** design aesthetic — dark backgrounds, neon green/cyan monospace text, terminal-box card containers with corner marks, and a full-width centered single-page layout.

## Tech Stack

- **HTML5** — Single-page layout in `index.html`
- **Tailwind CSS** — Loaded via CDN (`cdn.tailwindcss.com` with forms and container-queries plugins), with custom theme config for terminal colors
- **Vanilla CSS** — Custom terminal-themed styles in `style.css` (preloader animations, term-box cards, corner marks, glow effects)
- **Vanilla JavaScript** — All interactivity in `script.js` (data loading, rendering, preloader)
- **JetBrains Mono** — Primary font loaded via Google Fonts
- **Font Awesome 6.5** — Icon library loaded via CDN
- **Google Analytics** — Tracking via `gtag.js` (ID: `G-JPS05NB1F4`)

There is **no build step, no bundler, no package manager**. The site is served as static files directly.

## Project Structure

```
├── index.html              # Single-page HTML (all sections)
├── script.js               # All JavaScript logic (data loading, rendering, preloader)
├── style.css               # Custom CSS with terminal-theme styles
├── niaz.png                # Pixel-art profile image (hero section)
├── CNAME                   # Custom domain: niazbinsiraj.com
├── .gitignore              # Comprehensive ignore rules
├── reference/              # Design reference files (not part of the live site)
│   ├── screen.png          # Reference screenshot
│   └── code.html           # Reference code
└── static/
    ├── db/                 # JSON data files (content source of truth)
    │   ├── skills.json
    │   ├── experience.json
    │   ├── education.json
    │   ├── projects.json
    │   ├── achievements.json
    │   └── competitions.json
    └── images/
        └── profile.jpg     # Profile photo (used in preloader)
```

## Architecture & Data Flow

### Layout Design

The site uses a **single-page, full-width centered layout** (max-width: 6xl / 1152px). There is **no sidebar navigation**. Instead, sections flow vertically with terminal-box containers (`term-box` class) and corner mark decorations (`corner-mark` class). Navigation is via anchor links in the header.

### Data-Driven Rendering

All section content (skills, experience, education, projects, achievements, competitions) is stored in **JSON files under `static/db/`** and loaded at runtime via `fetch()`. The `script.js` file:

1. On `DOMContentLoaded`, calls `loadAllData()` which fetches all 6 JSON files in parallel.
2. Each data type has a `load*()` → `render*()` → `create*Card()` function chain.
3. Cards are dynamically created as DOM elements and appended to container `<div>`s in `index.html`.

**To update portfolio content**, edit the JSON files in `static/db/` — do **not** hard-code content into `index.html`.

### Sections (in page order)

| Section ID       | Description                                     | Layout              |
|------------------|-------------------------------------------------|---------------------|
| `#header`        | Terminal bar, name, title, quick action links    | Full-width          |
| `#about`         | Executive summary with metrics + profile image  | 7-col + 5-col grid  |
| `#projects`      | Featured engineering projects                    | 3-column cards      |
| `#skills`        | Technical competency matrix                      | 3-column grid       |
| `#experience`    | Career timeline + education                      | 7-col + 5-col grid  |
| `#education`     | Academic background (in same grid as experience)| Part of above grid   |
| `#achievements`  | Awards and certifications                        | 6-col + 6-col grid  |
| `#competitions`  | Programming contest results                      | Part of above grid   |
| `#contact`       | Contact details in 2-column grid                 | Full-width          |
| Footer           | Status line with stack info                      | Full-width          |

## Data Formats (`static/db/`)

All portfolio content lives in JSON files under `static/db/`. Each file is fetched at runtime and rendered into cards. Below is the schema for each file.

### `skills.json`

A flat object where each key is a skill category and the value is an array of skill name strings. The category keys rendered by `script.js` are:

| Key            | Card Title                | Color Variant   |
|----------------|---------------------------|-----------------|
| `languages`    | PROGRAMMING LANGUAGES     | neon-green      |
| `frameworks`   | FRAMEWORKS & LIBRARIES    | neon-cyan       |
| `databases`    | DATABASES & MESSAGING     | emerald-400     |
| `tools`        | CLOUD & DEVOPS            | neon-green      |
| `ai_tools`     | AI & LLM TOOLS            | neon-cyan       |
| `testing`      | TESTING & QUALITY         | emerald-400     |

```json
{
  "languages": ["Java 8/21", "JavaScript", "Python"],
  "frameworks": ["Spring", "Spring Boot"],
  "databases": ["Oracle", "PostgreSQL"],
  "tools": ["Git", "Docker"],
  "ai_tools": ["LangGraph", "MCP"],
  "testing": ["JUnit", "Playwright"]
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
| `activities`   | `string[]` | ❌       | Extracurricular activities              |
| `subjects`     | `string[]` | ❌       | Key subjects                            |

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

---

### `achievements.json`

Wrapped in an `"achievements"` array. Each entry has:

| Field            | Type     | Required | Description                               |
|------------------|----------|----------|-------------------------------------------|
| `title`          | `string` | ✅       | Achievement name                          |
| `issuer`         | `string` | ✅       | Awarding organization                     |
| `date`           | `string` | ✅       | Date or year                              |
| `description`    | `string` | ✅       | Brief description of the achievement      |
| `certificateUrl` | `string` | ❌       | Link to certificate                       |

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
   - Add a new `<section>` element with `id="publications"` and appropriate `term-box corner-mark` classes, following the existing section patterns.
   - Add an empty container `<div id="publications-container">`.
   - Add a header link in the header's quick action area.
3. **Add JS rendering** in `script.js`:
   - Create `loadPublications()`, `renderPublications()`, and `createPublicationCard()` functions following the existing pattern.
   - Add `loadPublications()` to the `Promise.all()` call inside `loadAllData()`.

## Design Conventions

### Terminal Theme

The entire site follows a **terminal/command-line** visual metaphor:
- All sections use `term-box` containers with `corner-mark` decorations (+ signs at corners)
- Section headers use bracket notation (e.g., `[EXEC_SUMMARY]`, `[TECH_ARSENAL]`)
- Color palette uses Tailwind custom colors defined in the config:
  - `neon-green`: `#00FF66` (primary accent)
  - `neon-mint`: `#10B981` (secondary accent)
  - `neon-emerald`: `#05DF72` (tertiary accent)
  - `neon-cyan`: `#00F0FF` (highlights)
  - Terminal background: `#060908` (body), `#090e0c` (cards)
- Font: JetBrains Mono (Google Fonts)
- Grid background pattern with subtle green lines

### CSS Organization

- **Preloader styles** at the top of `style.css`
- **Core terminal theme** — body background, `term-box`, `corner-mark`, glow effects
- **Animation classes** — `hover-lift`, `fade-in-up`, stagger delays
- **Responsive adjustments** for mobile

### Naming Conventions

- Container IDs follow the pattern: `{section}-container` (e.g., `skills-container`, `experience-container`)
- CSS classes use kebab-case (e.g., `term-box`, `corner-mark`, `glow-green`)
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
2. **Styling**: Use the Tailwind custom theme config and existing CSS patterns. New cards should use `term-box corner-mark` classes.
3. **New sections**: Add HTML skeleton in `index.html`, create a corresponding JSON data file, and add `load*()` / `render*()` / `create*Card()` functions in `script.js`.
4. **Preserve the terminal aesthetic**: All new UI elements should use the neon-green/cyan color scheme, JetBrains Mono font, term-box containers, and bracket-style headers.
5. **No build tools**: Keep the site as plain static files. Do not introduce bundlers, transpilers, or package managers unless explicitly requested.
6. **External link**: The header includes a link to the blog at `blog.niazbinsiraj.com` which opens in a new tab.
