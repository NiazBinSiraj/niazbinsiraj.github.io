// Portfolio Website JavaScript — Terminal Theme
document.addEventListener('DOMContentLoaded', function () {
    loadAllData();
    initializeSmoothScroll();
    initializeFadeOnScroll();
    initializeTerminalModal();
    initializeFixedNavbar();
});

// ============================
// FIXED NAVBAR ON SCROLL
// ============================
function initializeFixedNavbar() {
    const navbar = document.getElementById('fixed-navbar');
    const header = document.getElementById('header');
    if (!navbar || !header) return;

    window.addEventListener('scroll', function () {
        const headerBottom = header.getBoundingClientRect().bottom;
        if (headerBottom < 0) {
            navbar.classList.remove('-translate-y-full');
            navbar.classList.add('translate-y-0');
        } else {
            navbar.classList.add('-translate-y-full');
            navbar.classList.remove('translate-y-0');
        }
    });
}

// ============================
// TERMINAL MODAL
// ============================
function initializeTerminalModal() {
    const fab = document.getElementById('terminal-fab');
    const input = document.getElementById('terminal-input');

    fab.addEventListener('click', openTerminalModal);

    const TERMINAL_COMMANDS = ['about', 'projects', 'skills', 'experience', 'education', 'achievements', 'competitions', 'contact', 'whoami', 'help', 'clear'];

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const partial = this.value.trim().toLowerCase();
            if (!partial) return;
            const matches = TERMINAL_COMMANDS.filter(c => c.startsWith(partial));
            if (matches.length === 1) {
                this.value = matches[0];
            } else if (matches.length > 1) {
                // Show possible completions in output
                const output = document.getElementById('terminal-output');
                const hint = document.createElement('div');
                hint.className = 'text-gray-500 pb-1';
                hint.textContent = matches.join('  ');
                output.appendChild(hint);
                const termBody = document.getElementById('terminal-body');
                termBody.scrollTop = termBody.scrollHeight;
            }
        } else if (e.key === 'Enter') {
            const cmd = this.value.trim().toLowerCase();
            if (cmd) handleTerminalCommand(cmd);
            this.value = '';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeTerminalModal();
    });
}

function openTerminalModal() {
    const overlay = document.getElementById('terminal-modal-overlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    setTimeout(() => {
        document.getElementById('terminal-input').focus();
    }, 100);
}

function closeTerminalModal() {
    const overlay = document.getElementById('terminal-modal-overlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
}

function handleTerminalCommand(cmd) {
    const output = document.getElementById('terminal-output');

    // Echo the command
    const cmdLine = document.createElement('div');
    cmdLine.innerHTML = `<span class="text-neon-green">niaz@backend:~$</span> <span class="text-white">${cmd}</span>`;
    output.appendChild(cmdLine);

    const response = document.createElement('div');
    response.className = 'text-gray-300 pb-1';

    const commands = {
        'about': `<span class="text-emerald-300">Niaz Bin Siraj — Software Engineer II @ Therap (BD) Ltd.</span>\n<span class="text-gray-400">3+ years building enterprise-grade backend systems with Java/Spring Boot and AI-native architecture. Built LLM-powered documentation systems, AI Data Assistants, and context-aware dev workflows. Passionate about context engineering, LLM integration, and scalable microservices.</span>`,

        'projects': `<span class="text-neon-cyan">Featured Projects:</span>\n<span class="text-gray-400">• ag-analytics — AI Coding IDE Usage Analytics Platform (Node.js, SVG Charts, Gemini AI)</span>\n<span class="text-gray-400">• sdd-kit — Spec Driven Development CLI Toolkit (Node.js, Commander.js, YAML)</span>\n<span class="text-gray-400">• Intelligent Personal Assistant Robot (Python, Flask, C#, Unity)</span>\n<span class="text-gray-400">• Professional Email Service API (Node.js, Express.js, Nodemailer)</span>\n<span class="text-gray-400">• Shape Run — 2D Endless Runner Android Game (C#, Unity, Google AdMob)</span>`,

        'skills': `<span class="text-neon-cyan">Core Skills:</span>\n<span class="text-gray-400">Languages: Java 8/21, JavaScript, Python, SQL, HTML/CSS</span>\n<span class="text-gray-400">Frameworks: Spring, Spring Boot, MyBatis, Hibernate, FastAPI, React, JQuery</span>\n<span class="text-gray-400">Databases: Oracle, PostgreSQL, DuckDB, RabbitMQ, Redis, Coherence, HikariCP</span>\n<span class="text-gray-400">DevOps: Git, Bitbucket, Docker, Nginx, Jenkins, CI/CD, Gradle</span>\n<span class="text-gray-400">AI/LLM: LangGraph, RAG System, MCP, LLM Integration, Antigravity, Gemini CLI</span>\n<span class="text-gray-400">Testing: JUnit, TestNG, Playwright, Postman</span>`,

        'experience': `<span class="text-neon-cyan">Career Timeline:</span>\n<span class="text-emerald-300">Software Engineer II @ Therap (BD) Ltd.</span> <span class="text-gray-500">Jun 2022 — Present</span>\n<span class="text-gray-400">• Built LLM-powered code documentation system (Python/FastAPI, React, Oracle, Gemini)</span>\n<span class="text-gray-400">• Architected AI-powered Data Assistant for natural-language querying over millions of claims</span>\n<span class="text-gray-400">• Engineered context-aware AI dev workflow using MCP, reducing dev time by 40%</span>\n<span class="text-gray-400">• Developed Aging Report Generation System across 30K+ healthcare providers</span>\n<span class="text-gray-400">• Led Nebraska State Integration Billing Flow with 100% accurate claim submissions</span>\n<span class="text-gray-400">• Optimized APIs reducing query execution time by 50–60%, mentoring 5+ engineers</span>`,

        'education': `<span class="text-neon-cyan">Academic Background:</span>\n<span class="text-emerald-300">BSc in CSE — University of Rajshahi</span> <span class="text-gray-500">2017 — 2022</span> <span class="text-neon-green">CGPA: 3.30/4.00</span>\n<span class="text-emerald-300">HSC, Science — Bogra Cantonment Public School & College</span> <span class="text-gray-500">2014 — 2016</span> <span class="text-neon-green">GPA: 5.00/5.00</span>\n<span class="text-emerald-300">SSC, Science — Savar Cantonment Public School & College</span> <span class="text-gray-500">2012 — 2014</span> <span class="text-neon-green">GPA: 5.00/5.00</span>`,

        'achievements': `<span class="text-neon-cyan">Awards & Certifications:</span>\n<span class="text-gray-400">• Champion, National Round — Children Science Congress (2014)</span>\n<span class="text-gray-400">• Certificate of Appreciation — The American Center, U.S. Embassy Dhaka (2020)</span>\n<span class="text-gray-400">• Participant, IC⁴ME² 2021 — University of Rajshahi (2021)</span>`,

        'competitions': `<span class="text-neon-cyan">Programming Competitions:</span>\n<span class="text-gray-400">• ACM ICPC Dhaka Regional Online Preliminary — 118th (2020)</span>\n<span class="text-gray-400">• ACM ICPC Dhaka Regional Onsite — 120th (2019)</span>\n<span class="text-gray-400">• ACM ICPC Dhaka Regional Online Preliminary — 137th (2019)</span>\n<span class="text-gray-400">• ACM ICPC Dhaka Regional Online Preliminary — 247th (2021)</span>\n<span class="text-gray-400">• Google Code Jam — 5901st / 40,000+ (2020)</span>\n<span class="text-gray-400">• SRBD Coding Contest — 89th (2018)</span>`,

        'contact': `<span class="text-neon-cyan">Get In Touch:</span>\n<span class="text-gray-400">Email: niazbinsiraj@gmail.com</span>\n<span class="text-gray-400">Phone: +880 1755 931 751</span>\n<span class="text-gray-400">GitHub: github.com/NiazBinSiraj</span>\n<span class="text-gray-400">LinkedIn: linkedin.com/in/niazbinsiraj</span>\n<span class="text-gray-400">Location: Dhaka, Bangladesh</span>`
    };

    if (commands[cmd]) {
        response.innerHTML = commands[cmd].replace(/\n/g, '<br>');
        output.appendChild(response);
    } else if (cmd === 'help') {
        response.innerHTML = `Available commands: <span class="text-neon-green">about</span>, <span class="text-neon-green">projects</span>, <span class="text-neon-green">skills</span>, <span class="text-neon-green">experience</span>, <span class="text-neon-green">education</span>, <span class="text-neon-green">achievements</span>, <span class="text-neon-green">competitions</span>, <span class="text-neon-green">contact</span>, <span class="text-neon-green">whoami</span>, <span class="text-neon-green">clear</span>`;
        output.appendChild(response);
    } else if (cmd === 'clear') {
        output.innerHTML = '';
        return;
    } else if (cmd === 'whoami') {
        response.innerHTML = `<span class="text-emerald-300">Niaz Bin Siraj — Software Engineer II @ Therap (BD) Ltd.</span>`;
        output.appendChild(response);
    } else {
        response.innerHTML = `<span class="text-red-400">Command not found: ${cmd}</span>. Type <span class="text-neon-green">help</span> for available commands.`;
        output.appendChild(response);
    }

    const termBody = document.getElementById('terminal-body');
    termBody.scrollTop = termBody.scrollHeight;
}

// Fade-in on scroll — IntersectionObserver for all sections
function initializeFadeOnScroll() {
    const fadeTargets = document.querySelectorAll(
        'section, header, footer, .term-box, #projects > .grid'
    );

    // Set initial hidden state
    fadeTargets.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // only animate once
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    fadeTargets.forEach(el => observer.observe(el));
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Load all data from JSON files
async function loadAllData() {
    try {
        await Promise.all([
            loadSkills(),
            loadExperience(),
            loadEducation(),
            loadProjects(),
            loadAchievements(),
            loadCompetitions()
        ]);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// ============================
// SKILLS
// ============================
async function loadSkills() {
    try {
        const response = await fetch('static/db/skills.json');
        const data = await response.json();
        renderSkills(data);
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

function renderSkills(skillsData) {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';

    const skillCategories = [
        { key: 'languages', title: 'PROGRAMMING LANGUAGES', colorClass: 'neon-green' },
        { key: 'frameworks', title: 'FRAMEWORKS & LIBRARIES', colorClass: 'neon-cyan' },
        { key: 'databases', title: 'DATABASES & MESSAGING', colorClass: 'emerald-400' },
        { key: 'tools', title: 'CLOUD & DEVOPS', colorClass: 'neon-green' },
        { key: 'ai_tools', title: 'AI & LLM TOOLS', colorClass: 'neon-cyan' },
        { key: 'testing', title: 'TESTING & QUALITY', colorClass: 'emerald-400' }
    ];

    skillCategories.forEach((category, index) => {
        const skills = skillsData[category.key] || [];
        const card = createSkillCard(category, skills, index);
        container.appendChild(card);
    });

    // Update tech count metric
    const totalSkills = Object.values(skillsData).reduce((sum, arr) => sum + arr.length, 0);
    const statTechEl = document.getElementById('stat-tech-count');
    if (statTechEl) statTechEl.textContent = `${totalSkills}+`;
}

function createSkillCard(category, skills, index) {
    const card = document.createElement('div');
    card.className = 'bg-terminal-950/70 border border-emerald-900/50 p-3.5 flex flex-col justify-between hover-lift';

    const num = String(index + 1).padStart(2, '0');
    const colorMap = {
        'neon-green': { header: 'text-neon-green', primary: 'border-neon-green/40 bg-neon-green/10 text-neon-green', secondary: 'border-emerald-500/30 bg-terminal-950 text-emerald-300', footer: 'text-neon-green' },
        'neon-cyan': { header: 'text-neon-cyan', primary: 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan', secondary: 'border-emerald-500/30 bg-terminal-950 text-emerald-300', footer: 'text-neon-cyan' },
        'emerald-400': { header: 'text-emerald-400', primary: 'border-emerald-500/30 bg-terminal-950 text-emerald-300', secondary: 'border-emerald-500/30 bg-terminal-950 text-gray-300', footer: 'text-emerald-400' }
    };
    const colors = colorMap[category.colorClass];

    card.innerHTML = `
        <div>
            <div class="${colors.header} text-[11px] font-bold mb-2.5 flex items-center gap-1.5 border-b border-emerald-900/40 pb-1.5">
                <span class="">#</span> ${num} // ${category.title}
            </div>
            <div class="flex flex-wrap gap-1.5">
                ${skills.map((skill, i) =>
                    `<span class="px-2 py-0.5 border ${i === 0 ? colors.primary + ' font-medium' : colors.secondary}">${skill}</span>`
                ).join('')}
            </div>
        </div>
        <div class="mt-3 pt-2 text-[10px] text-gray-500 font-mono flex justify-between">
            <span class="">PROFICIENCY</span>
            <span class="${colors.footer} font-semibold">PRODUCTION LEVEL</span>
        </div>
    `;

    return card;
}

// ============================
// PROJECTS
// ============================
async function loadProjects() {
    try {
        const response = await fetch('static/db/projects.json');
        const data = await response.json();
        renderProjects(data.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    // Show count
    const countEl = document.getElementById('projects-count');
    if (countEl) countEl.textContent = `${projects.length} ENGINEERING PROJECTS`;

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        container.appendChild(projectCard);
    });

    // Update projects built metric
    const statProjEl = document.getElementById('stat-projects-count');
    if (statProjEl) statProjEl.textContent = `${projects.length}`;
}

function createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'term-box corner-mark p-4 flex flex-col justify-between hover-lift';

    const num = String(index + 1).padStart(2, '0');
    const colorVariants = [
        { label: 'neon-green', badge: 'bg-emerald-950 text-neon-green border border-neon-green/40', title: 'glow-green', techColor: 'text-neon-green', footerColor: 'text-neon-cyan', statusText: 'BUILT' },
        { label: 'neon-cyan', badge: 'bg-emerald-950 text-neon-cyan border border-neon-cyan/40', title: 'glow-cyan', techColor: 'text-neon-cyan', footerColor: 'text-emerald-400', statusText: 'SHIPPED' },
        { label: 'emerald-400', badge: 'bg-emerald-950 text-emerald-300 border border-emerald-500/40', title: 'glow-green', techColor: 'text-emerald-300', footerColor: 'text-neon-green', statusText: 'RELEASED' }
    ];
    const variant = colorVariants[index % colorVariants.length];

    const hasLinks = project.github || project.demo;

    card.innerHTML = `
        <div>
            <div class="flex items-center justify-between text-[11px] border-b border-emerald-900/50 pb-1.5 mb-2.5">
                <span class="text-${variant.label} font-semibold">PROJECT_${num} // ${project.techStack[0] ? project.techStack[0].toUpperCase() : 'BUILD'}</span>
                <span class="${variant.badge} px-1.5 py-0.2 font-mono">${variant.statusText}</span>
            </div>
            <h3 class="text-sm font-bold text-white tracking-wide ${variant.title} font-mono leading-snug">${project.title}</h3>
            <p class="text-gray-300 text-xs mt-2 leading-relaxed">
                ${project.description}
            </p>
            <div class="mt-3.5 flex flex-wrap gap-1 text-[11px]">
                ${project.techStack.map(tech =>
                    `<span class="bg-terminal-950 border border-emerald-800/60 px-2 py-0.5 ${variant.techColor}">${tech}</span>`
                ).join('')}
            </div>
        </div>
        <div class="mt-4 pt-3 border-t border-emerald-950 flex items-center justify-between text-xs">
            <span class="${variant.footerColor} font-bold font-mono">${project.techStack.length} TECHNOLOGIES</span>
            ${hasLinks ? `
                <div class="flex gap-2">
                    ${project.github ? `<a class="text-neon-green hover:underline font-semibold flex items-center gap-1" href="${project.github}" rel="noreferrer" target="_blank">CODE →</a>` : ''}
                    ${project.demo ? `<a class="text-neon-cyan hover:underline font-semibold flex items-center gap-1" href="${project.demo}" rel="noreferrer" target="_blank">DEMO →</a>` : ''}
                </div>
            ` : '<span class="text-gray-500 font-mono text-[11px]">PRIVATE</span>'}
        </div>
    `;

    return card;
}

// ============================
// EXPERIENCE
// ============================
async function loadExperience() {
    try {
        const response = await fetch('static/db/experience.json');
        const data = await response.json();
        renderExperience(data.experiences);
    } catch (error) {
        console.error('Error loading experience:', error);
    }
}

function renderExperience(experiences) {
    const container = document.getElementById('experience-container');
    container.innerHTML = '';

    // Calculate total years of experience from earliest start date
    const expEl = document.getElementById('exp-years');
    if (expEl && experiences.length > 0) {
        const monthMap = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
        let earliest = new Date();
        experiences.forEach(exp => {
            const parts = exp.duration.split(' - ')[0].trim().split(' ');
            const month = monthMap[parts[0].toLowerCase().slice(0, 3)] || 0;
            const year = parseInt(parts[parts.length - 1]);
            if (!isNaN(year)) {
                const startDate = new Date(year, month, 1);
                if (startDate < earliest) earliest = startDate;
            }
        });
        const years = Math.floor((Date.now() - earliest.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        expEl.textContent = `EXP: ${years}+ YEARS`;
        // Also update the metric card
        const statExpEl = document.getElementById('stat-exp-years');
        if (statExpEl) statExpEl.textContent = `${years}+`;
    }

    experiences.forEach((exp, index) => {
        const expCard = createExperienceCard(exp, index);
        container.appendChild(expCard);
    });
}

function createExperienceCard(experience, index) {
    const card = document.createElement('div');

    const borderColors = ['border-neon-green', 'border-neon-cyan', 'border-emerald-600', 'border-emerald-400'];
    const dateColors = ['text-neon-green', 'text-neon-cyan', 'text-emerald-400', 'text-emerald-300'];
    const borderColor = borderColors[index % borderColors.length];
    const dateColor = dateColors[index % dateColors.length];

    card.className = `border-l-2 ${borderColor} pl-3.5 relative`;

    const responsibilitiesList = experience.responsibilities
        .map(r => `<li class="text-gray-300 leading-relaxed">${r}</li>`)
        .join('');

    card.innerHTML = `
        <div class="flex items-baseline justify-between gap-2 flex-wrap">
            <span class="font-bold text-white text-sm">${experience.position} @ ${experience.company}</span>
            <span class="${dateColor} font-mono text-[11px]">${experience.duration.toUpperCase().replace(' - ', ' — ')}</span>
        </div>
        <p class="text-gray-400 text-[11px] mt-0.5">${experience.location}</p>
        <ul class="mt-2 space-y-1.5 list-disc list-outside pl-4">
            ${responsibilitiesList}
        </ul>
    `;

    return card;
}

// ============================
// EDUCATION
// ============================
async function loadEducation() {
    try {
        const response = await fetch('static/db/education.json');
        const data = await response.json();
        renderEducation(data.education);
    } catch (error) {
        console.error('Error loading education:', error);
    }
}

function renderEducation(education) {
    const container = document.getElementById('education-container');
    container.innerHTML = '';

    education.forEach((edu, index) => {
        const eduCard = createEducationCard(edu, index);
        container.appendChild(eduCard);
    });
}

function createEducationCard(education, index) {
    const card = document.createElement('div');

    const borderColors = ['border-neon-green', 'border-neon-cyan', 'border-emerald-600'];
    const dateColors = ['text-neon-green', 'text-neon-cyan', 'text-emerald-400'];
    const borderColor = borderColors[index % borderColors.length];
    const dateColor = dateColors[index % dateColors.length];

    card.className = `border-l-2 ${borderColor} pl-3.5 relative`;

    card.innerHTML = `
        <div class="flex items-baseline justify-between gap-2 flex-wrap">
            <span class="font-bold text-white text-sm">${education.degree}</span>
            <span class="${dateColor} font-mono text-[11px]">${education.duration}</span>
        </div>
        <p class="text-emerald-300 text-[11px] mt-0.5 font-semibold">${education.institution}</p>
        ${education.location ? `<p class="text-gray-400 text-[11px]">${education.location}</p>` : ''}
        <div class="flex items-center gap-2 mt-1">
            <span class="text-[11px] text-gray-400">CGPA:</span>
            <span class="text-neon-green font-bold text-[11px]">${education.cgpa}</span>
        </div>
        ${education.coursework ? `
        <div class="mt-2 flex flex-wrap gap-1">
            ${education.coursework.slice(0, 4).map(course =>
                `<span class="px-1.5 py-0.5 border border-emerald-500/30 bg-terminal-950 text-gray-300 text-[10px]">${course}</span>`
            ).join('')}
            ${education.coursework.length > 4 ? `<span class="px-1.5 py-0.5 text-gray-500 text-[10px]">+${education.coursework.length - 4} more</span>` : ''}
        </div>
        ` : ''}
    `;

    return card;
}

// ============================
// ACHIEVEMENTS
// ============================
async function loadAchievements() {
    try {
        const response = await fetch('static/db/achievements.json');
        const data = await response.json();
        renderAchievements(data.achievements);
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

function renderAchievements(achievements) {
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';

    achievements.forEach((achievement, index) => {
        const achievementCard = createAchievementCard(achievement, index);
        container.appendChild(achievementCard);
    });
}

function createAchievementCard(achievement, index) {
    const card = document.createElement('div');
    const borderColors = ['border-neon-green', 'border-neon-cyan', 'border-emerald-600'];
    const borderColor = borderColors[index % borderColors.length];

    card.className = `border-l-2 ${borderColor} pl-3.5 relative`;

    card.innerHTML = `
        <div class="flex items-baseline justify-between gap-2 flex-wrap">
            <span class="font-bold text-white text-sm">${achievement.title}</span>
            <span class="text-emerald-400 font-mono text-[11px]">${achievement.date}</span>
        </div>
        <p class="text-emerald-300 text-[11px] mt-0.5 font-semibold">${achievement.issuer}</p>
        <p class="text-gray-300 mt-1 leading-relaxed">${achievement.description}</p>
        ${achievement.certificateUrl ? `
        <a class="text-neon-green hover:underline font-semibold text-[11px] mt-1 inline-flex items-center gap-1" href="${achievement.certificateUrl}" rel="noreferrer" target="_blank">
            VIEW_CERTIFICATE →
        </a>
        ` : ''}
    `;

    return card;
}

// ============================
// COMPETITIONS
// ============================
async function loadCompetitions() {
    try {
        const response = await fetch('static/db/competitions.json');
        const data = await response.json();
        renderCompetitions(data.competitions);
    } catch (error) {
        console.error('Error loading competitions:', error);
    }
}

function renderCompetitions(competitions) {
    const container = document.getElementById('competitions-container');
    container.innerHTML = '';

    // Show count
    const countEl = document.getElementById('competitions-count');
    if (countEl) countEl.textContent = `${competitions.length} CONTESTS`;

    competitions.forEach((competition, index) => {
        const competitionCard = createCompetitionCard(competition, index);
        container.appendChild(competitionCard);
    });
}

function createCompetitionCard(competition, index) {
    const card = document.createElement('div');

    card.className = 'flex items-center justify-between bg-terminal-950 p-2 border border-emerald-900/50 hover:border-neon-green/40 transition-all';

    card.innerHTML = `
        <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
                <span class="font-semibold text-white text-[11px] truncate">${competition.name}</span>
                <span class="bg-emerald-950 text-neon-green border border-neon-green/40 px-1.5 py-0 font-mono text-[10px] flex-shrink-0">${competition.rank}</span>
            </div>
            <div class="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                <span>${competition.team}</span>
            </div>
        </div>
        <span class="text-emerald-400 font-mono text-[11px] flex-shrink-0 ml-2">${competition.year}</span>
    `;

    return card;
}

// ============================
// PRELOADER
// ============================
(function () {
    const MIN_DISPLAY_MS = 4000;
    const startTime = Date.now();

    const statusMessages = [
        'INITIALIZING SYSTEM...',
        'LOADING MODULES...',
        'COMPILING ASSETS...',
        'ESTABLISHING CONNECTIONS...',
        'RENDERING INTERFACE...',
        'SYSTEM READY'
    ];

    const progressBar = document.getElementById('preloader-progress');
    const statusText = document.getElementById('preloader-status');
    const preloader = document.getElementById('preloader');

    if (!preloader) return;

    statusText.style.transition = 'opacity 0.15s ease';

    let progress = 0;
    let msgIndex = 0;
    let pageLoaded = false;

    const progressInterval = setInterval(() => {
        progress += Math.random() * 2 + 0.5;
        const cap = pageLoaded ? 95 : 70;
        if (progress > cap) progress = cap;

        progressBar.style.width = progress + '%';

        const newIndex = Math.min(
            Math.floor((progress / 100) * statusMessages.length),
            statusMessages.length - 2
        );
        if (newIndex !== msgIndex) {
            msgIndex = newIndex;
            statusText.style.opacity = '0';
            setTimeout(() => {
                statusText.textContent = statusMessages[msgIndex];
                statusText.style.opacity = '1';
            }, 150);
        }
    }, 300);

    function dismissPreloader() {
        clearInterval(progressInterval);

        progressBar.style.width = '100%';
        statusText.style.opacity = '0';
        setTimeout(() => {
            statusText.textContent = 'SYSTEM READY';
            statusText.style.opacity = '1';
        }, 150);

        setTimeout(() => {
            preloader.classList.add('fade-out');
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            }, { once: true });
        }, 500);
    }

    window.addEventListener('load', () => {
        pageLoaded = true;
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(dismissPreloader, remaining);
    });
})();
