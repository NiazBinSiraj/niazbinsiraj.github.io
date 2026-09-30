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
            // Also close mobile menu when scrolling back to top
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
        }
    });

    // Close mobile menu when a link inside it is clicked
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Toggle mobile hamburger menu in fixed navbar
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
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

// ============================
// GITHUB STATS MODAL
// ============================
const GITHUB_USERNAME = 'NiazBinSiraj';
const GITHUB_ORG = 'nbslabs';
let githubDataLoaded = false;

const LANG_COLORS = {
    'JavaScript': '#f1e05a',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Java': '#b07219',
    'Python': '#3572A5',
    'C#': '#178600',
    'TypeScript': '#2b7489',
    'Shell': '#89e051',
    'C++': '#f34b7d',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'Kotlin': '#A97BFF',
    'Swift': '#ffac45',
    'Dart': '#00B4AB',
};

function openGithubModal() {
    const overlay = document.getElementById('github-modal-overlay');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    document.body.style.overflow = 'hidden';

    if (!githubDataLoaded) {
        fetchGithubData();
        githubDataLoaded = true;
    }
}

function closeGithubModal() {
    const overlay = document.getElementById('github-modal-overlay');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    document.body.style.overflow = '';
}

function switchGithubTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.github-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    // Update tab panels
    document.querySelectorAll('.github-tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `tab-${tabName}`);
    });
}

async function fetchGithubData() {
    try {
        const [userRes, reposRes, orgRes, orgReposRes, eventsRes] = await Promise.all([
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`),
            fetch(`https://api.github.com/orgs/${GITHUB_ORG}`),
            fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?sort=updated&per_page=100`),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`)
        ]);

        const user = await userRes.json();
        const repos = await reposRes.json();
        const org = await orgRes.json();
        const orgRepos = await orgReposRes.json();
        const events = await eventsRes.json();

        // Tag org repos so we can badge them
        const taggedOrgRepos = (Array.isArray(orgRepos) ? orgRepos : []).map(r => ({ ...r, _org: GITHUB_ORG }));
        const personalRepos = Array.isArray(repos) ? repos : [];
        const allRepos = [...personalRepos, ...taggedOrgRepos];

        renderGithubProfile(user);
        renderGithubStats(user, allRepos, org);
        renderLanguageDistribution(allRepos);
        renderReposList(allRepos);
        renderActivityTab(user, allRepos, Array.isArray(events) ? events : []);

        // New render functions
        renderDerivedScores(user, allRepos);
        renderMostStarred(allRepos);
        renderInsightsTab(allRepos);
        renderEventsFeed(Array.isArray(events) ? events : []);
        renderOrgTab(org, personalRepos, taggedOrgRepos);

        // Fetch org members separately (doesn't block main render)
        fetchOrgMembers();

        document.getElementById('gh-last-updated').textContent =
            `Updated ${new Date().toLocaleTimeString()}`;

    } catch (err) {
        console.error('Failed to fetch GitHub data:', err);
    }
}

function renderGithubProfile(user) {
    document.getElementById('gh-avatar').src = user.avatar_url;
    document.getElementById('gh-name').textContent = user.name || user.login;
    document.getElementById('gh-bio').textContent = user.bio || 'Software Engineer • Backend Systems • AI-Native Architecture';
    document.getElementById('gh-location').textContent = user.location || 'Dhaka, Bangladesh';

    const joined = new Date(user.created_at);
    document.getElementById('gh-joined').textContent =
        joined.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    // Account age
    const now = new Date();
    const years = Math.floor((now - joined) / (365.25 * 24 * 60 * 60 * 1000));
    const months = Math.floor(((now - joined) % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    document.getElementById('gh-account-age').textContent =
        years > 0 ? `${years}y ${months}m on GitHub` : `${months}m on GitHub`;
}

function renderGithubStats(user, allRepos, org) {
    const totalRepos = user.public_repos + (org && org.public_repos ? org.public_repos : 0);
    document.getElementById('gh-repos-count').textContent = totalRepos;
    document.getElementById('gh-followers').textContent = user.followers + (org && org.followers ? org.followers : 0);
    document.getElementById('gh-following').textContent = user.following;

    const totalStars = allRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    document.getElementById('gh-stars-count').textContent = totalStars;

    // New metrics
    const totalForks = allRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
    const totalWatchers = allRepos.reduce((sum, r) => sum + (r.watchers_count || 0), 0);
    const avgStars = totalRepos > 0 ? (totalStars / totalRepos).toFixed(1) : '0';

    document.getElementById('gh-forks-count').textContent = totalForks;
    document.getElementById('gh-watchers-count').textContent = totalWatchers;
    document.getElementById('gh-avg-stars').textContent = avgStars;

    // Top language
    const langCounts = {};
    allRepos.forEach(r => {
        if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    });
    const topLang = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('gh-top-language').textContent = topLang ? topLang[0] : 'N/A';
}

function renderDerivedScores(user, allRepos) {
    // Code Diversity Score
    const uniqueLangs = new Set(allRepos.map(r => r.language).filter(Boolean));
    document.getElementById('gh-diversity-score').textContent = uniqueLangs.size;
    document.getElementById('gh-diversity-label').textContent =
        uniqueLangs.size === 1 ? 'language' : 'languages';

    // Open Source Impact
    const totalStars = allRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    const totalForks = allRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
    const totalWatchers = allRepos.reduce((sum, r) => sum + (r.watchers_count || 0), 0);
    document.getElementById('gh-impact-score').textContent = totalStars + totalForks + totalWatchers;

    // Consistency Score
    const latestPush = allRepos.reduce((latest, r) => {
        const d = new Date(r.pushed_at);
        return d > latest ? d : latest;
    }, new Date(0));
    const daysSinceLastPush = Math.floor((new Date() - latestPush) / (24 * 60 * 60 * 1000));
    const joined = new Date(user.created_at);
    const accountDays = Math.floor((new Date() - joined) / (24 * 60 * 60 * 1000));

    let consistencyLabel, consistencyValue;
    if (daysSinceLastPush <= 1) {
        consistencyValue = 'TODAY';
        consistencyLabel = 'last push';
    } else if (daysSinceLastPush <= 7) {
        consistencyValue = `${daysSinceLastPush}d`;
        consistencyLabel = 'ago · Active';
    } else if (daysSinceLastPush <= 30) {
        consistencyValue = `${daysSinceLastPush}d`;
        consistencyLabel = 'ago · Regular';
    } else {
        consistencyValue = `${daysSinceLastPush}d`;
        consistencyLabel = 'ago · Dormant';
    }
    document.getElementById('gh-consistency-score').textContent = consistencyValue;
    document.getElementById('gh-consistency-label').textContent = consistencyLabel;
}

function renderMostStarred(allRepos) {
    const container = document.getElementById('gh-most-starred');
    const top = allRepos.filter(r => !r.fork).sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))[0];

    if (!top) {
        container.innerHTML = '<div class="text-gray-500 text-xs">No repos found</div>';
        return;
    }

    const langColor = LANG_COLORS[top.language] || '#8b949e';
    const orgBadge = top._org
        ? `<span class="text-[9px] px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-sm">${top._org}</span>`
        : '';

    container.innerHTML = `
        <a href="${top.html_url}" target="_blank" class="block hover:border-neon-green/40 transition-colors">
            <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-star text-yellow-400"></i>
                <span class="text-neon-green font-bold text-sm">${top.name}</span>
                ${orgBadge}
            </div>
            <p class="text-gray-400 text-[11px] mb-2">${top.description || 'No description'}</p>
            <div class="flex items-center gap-4 text-[11px] text-gray-500">
                <span class="flex items-center"><span class="lang-dot" style="background:${langColor}"></span>${top.language || 'N/A'}</span>
                <span><i class="fas fa-star text-yellow-500/60 mr-1"></i>${top.stargazers_count}</span>
                <span><i class="fas fa-code-branch text-neon-cyan/60 mr-1"></i>${top.forks_count}</span>
            </div>
        </a>`;
}

function renderLanguageDistribution(repos) {
    const langCounts = {};
    repos.forEach(repo => {
        if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
        }
    });

    const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(langCounts).sort((a, b) => b[1] - a[1]);

    // Render bar
    const barsEl = document.getElementById('gh-lang-bars');
    barsEl.innerHTML = sorted.map(([lang, count]) => {
        const pct = ((count / total) * 100).toFixed(1);
        const color = LANG_COLORS[lang] || '#8b949e';
        return `<div style="width:${pct}%;background:${color};transition:width 0.5s ease" title="${lang} ${pct}%"></div>`;
    }).join('');

    // Render labels
    const labelsEl = document.getElementById('gh-lang-labels');
    labelsEl.innerHTML = sorted.map(([lang, count]) => {
        const pct = ((count / total) * 100).toFixed(1);
        const color = LANG_COLORS[lang] || '#8b949e';
        return `<span class="flex items-center">
            <span class="lang-dot" style="background:${color}"></span>
            <span class="text-gray-300">${lang}</span>
            <span class="text-gray-600 ml-1">${pct}%</span>
        </span>`;
    }).join('');

    // Contribution graph
    const contribImg = document.getElementById('gh-contrib-graph');
    contribImg.onerror = function() {
        this.parentElement.innerHTML = '<div class="py-4 px-4 text-center text-gray-600 text-[11px] font-mono"><i class="fas fa-exclamation-triangle text-yellow-500/50 mr-1.5"></i>Contribution graph unavailable</div>';
    };
    contribImg.src = `https://ghchart.rshah.org/00FF66/${GITHUB_USERNAME}`;
}

// ============================
// INSIGHTS TAB
// ============================

function renderInsightsTab(allRepos) {
    renderTopicsCloud(allRepos);
    renderRepoTimeline(allRepos);
    renderMostActiveRepos(allRepos);
    renderOldestRepos(allRepos);
    renderLicenseBreakdown(allRepos);
    renderForkRatio(allRepos);
    renderSizeDistribution(allRepos);
}

function renderTopicsCloud(repos) {
    const container = document.getElementById('gh-topics-cloud');
    const topicCounts = {};
    repos.forEach(r => {
        (r.topics || []).forEach(t => {
            topicCounts[t] = (topicCounts[t] || 0) + 1;
        });
    });

    const sorted = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) {
        container.innerHTML = '<span class="text-gray-600 text-xs italic">No topics found across repos</span>';
        return;
    }

    const maxCount = sorted[0][1];
    container.innerHTML = sorted.map(([topic, count]) => {
        const weight = Math.max(0.5, count / maxCount);
        const size = Math.round(10 + weight * 4);
        const opacity = (0.4 + weight * 0.6).toFixed(2);
        return `<span class="gh-topic-tag" style="font-size:${size}px;opacity:${opacity}" title="${count} repo${count > 1 ? 's' : ''}">${topic}<sup class="text-gray-600 ml-0.5">${count}</sup></span>`;
    }).join('');
}

// Timeline data cache
const timelineCache = { repos: null, prs: null, commits: null };

function renderRepoTimeline(repos) {
    // Cache repo year data for switching
    const nonFork = repos.filter(r => !r.fork);
    const yearCounts = {};
    nonFork.forEach(r => {
        const year = new Date(r.created_at).getFullYear();
        yearCounts[year] = (yearCounts[year] || 0) + 1;
    });
    timelineCache.repos = { yearCounts, total: nonFork.length, singular: 'repo', plural: 'repos' };
    renderTimelineChart(timelineCache.repos);
}

function renderTimelineChart(data) {
    const container = document.getElementById('gh-timeline');
    const { yearCounts, total, singular, plural } = data;

    const years = Object.keys(yearCounts).sort();
    if (years.length === 0) {
        container.innerHTML = '<span class="text-gray-600 text-xs italic">No data found</span>';
        return;
    }

    const maxCount = Math.max(...Object.values(yearCounts));

    container.innerHTML = `
        <div class="flex items-end gap-2 sm:gap-3" style="height:140px;padding-bottom:24px">
            ${years.map(y => {
                const count = yearCounts[y];
                const barHeight = Math.max(12, (count / maxCount) * 100);
                const label = count === 1 ? singular : plural;
                return `<div class="flex-1 flex flex-col items-center justify-end h-full" title="${count} ${label} in ${y}">
                    <span class="text-neon-green text-[11px] font-bold mb-1">${count}</span>
                    <div class="w-full rounded-sm" style="height:${barHeight}%;background:linear-gradient(180deg, rgba(0,255,102,0.7) 0%, rgba(0,255,102,0.25) 100%);min-height:8px;transition:height 0.5s ease"></div>
                    <span class="text-gray-400 text-[10px] font-semibold mt-1.5">${y}</span>
                </div>`;
            }).join('')}
        </div>
        <div class="text-center text-gray-600 text-[9px] mt-1">${total} total ${plural} across ${years.length} years</div>`;
}

async function switchTimelineView(type) {
    // Update active button
    document.querySelectorAll('.gh-timeline-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.timeline === type);
    });

    // Use cache if available
    if (timelineCache[type]) {
        renderTimelineChart(timelineCache[type]);
        return;
    }

    const container = document.getElementById('gh-timeline');
    container.innerHTML = '<div class="text-gray-500 text-xs py-8 text-center"><i class="fas fa-spinner fa-spin mr-1.5"></i>Fetching data...</div>';

    try {
        if (type === 'prs') {
            const res = await fetch(`https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=100&sort=created`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const yearCounts = {};
            (data.items || []).forEach(pr => {
                const year = new Date(pr.created_at).getFullYear();
                yearCounts[year] = (yearCounts[year] || 0) + 1;
            });
            const itemTotal = Object.values(yearCounts).reduce((a, b) => a + b, 0);
            timelineCache.prs = { yearCounts, total: data.total_count || itemTotal, singular: 'PR', plural: 'PRs' };
            renderTimelineChart(timelineCache.prs);

        } else if (type === 'commits') {
            const res = await fetch(`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}&per_page=100&sort=author-date`, {
                headers: { 'Accept': 'application/vnd.github.cloak-preview+json' }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const yearCounts = {};
            (data.items || []).forEach(c => {
                const date = c.commit?.author?.date || c.commit?.committer?.date;
                if (date) {
                    const year = new Date(date).getFullYear();
                    yearCounts[year] = (yearCounts[year] || 0) + 1;
                }
            });
            const itemTotal = Object.values(yearCounts).reduce((a, b) => a + b, 0);
            timelineCache.commits = { yearCounts, total: data.total_count || itemTotal, singular: 'commit', plural: 'commits' };
            renderTimelineChart(timelineCache.commits);
        }
    } catch (err) {
        container.innerHTML = `<div class="text-gray-600 text-xs py-4 text-center"><i class="fas fa-exclamation-triangle text-yellow-500/50 mr-1.5"></i>Could not load ${type} data</div>`;
        console.warn('Timeline fetch error:', err);
    }
}

function renderMostActiveRepos(repos) {
    const container = document.getElementById('gh-most-active');
    const active = repos.filter(r => !r.fork)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 5);

    container.innerHTML = active.map(r => {
        const updated = new Date(r.pushed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `<a href="${r.html_url}" target="_blank" class="gh-mini-repo-card block">
            <div class="flex items-center justify-between">
                <span class="text-neon-green text-[11px] font-semibold truncate flex-1">${r.name}</span>
                <span class="text-gray-600 text-[10px] ml-2 shrink-0">${updated}</span>
            </div>
        </a>`;
    }).join('');
}

function renderOldestRepos(repos) {
    const container = document.getElementById('gh-oldest-repos');
    const oldest = repos.filter(r => !r.fork)
        .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        .slice(0, 5);

    container.innerHTML = oldest.map(r => {
        const created = new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return `<a href="${r.html_url}" target="_blank" class="gh-mini-repo-card block">
            <div class="flex items-center justify-between">
                <span class="text-purple-400 text-[11px] font-semibold truncate flex-1">${r.name}</span>
                <span class="text-gray-600 text-[10px] ml-2 shrink-0">${created}</span>
            </div>
        </a>`;
    }).join('');
}

function renderLicenseBreakdown(repos) {
    const container = document.getElementById('gh-license-breakdown');
    const licenseCounts = {};
    repos.forEach(r => {
        const lic = r.license ? r.license.spdx_id : 'None';
        licenseCounts[lic] = (licenseCounts[lic] || 0) + 1;
    });

    const total = repos.length;
    const sorted = Object.entries(licenseCounts).sort((a, b) => b[1] - a[1]);

    const colors = {
        'MIT': '#00FF66', 'Apache-2.0': '#00F0FF', 'GPL-3.0': '#A97BFF',
        'GPL-2.0': '#A97BFF', 'BSD-2-Clause': '#f1e05a', 'BSD-3-Clause': '#f1e05a',
        'None': '#4b5563', 'NOASSERTION': '#6b7280'
    };

    container.innerHTML = sorted.map(([lic, count]) => {
        const pct = ((count / total) * 100).toFixed(0);
        const color = colors[lic] || '#8b949e';
        return `<div class="flex items-center gap-2">
            <div class="flex-1 h-2 bg-terminal-800 rounded-full overflow-hidden">
                <div style="width:${pct}%;background:${color}" class="h-full rounded-full transition-all duration-500"></div>
            </div>
            <span class="text-[10px] text-gray-400 w-24 text-right shrink-0">${lic === 'NOASSERTION' ? 'Other' : lic} <span class="text-gray-600">${pct}%</span></span>
        </div>`;
    }).join('');
}

function renderForkRatio(repos) {
    const container = document.getElementById('gh-fork-ratio');
    const forks = repos.filter(r => r.fork).length;
    const originals = repos.length - forks;
    const total = repos.length;

    const origPct = total > 0 ? ((originals / total) * 100).toFixed(0) : 0;
    const forkPct = total > 0 ? ((forks / total) * 100).toFixed(0) : 0;

    container.innerHTML = `
        <div class="flex h-4 rounded-full overflow-hidden bg-terminal-800">
            <div style="width:${origPct}%" class="bg-neon-green/70 transition-all duration-500" title="Original ${origPct}%"></div>
            <div style="width:${forkPct}%" class="bg-neon-cyan/50 transition-all duration-500" title="Forked ${forkPct}%"></div>
        </div>
        <div class="flex justify-between text-[10px]">
            <span class="text-neon-green flex items-center gap-1"><span class="inline-block w-2 h-2 rounded-full bg-neon-green/70"></span>Original: ${originals} (${origPct}%)</span>
            <span class="text-neon-cyan flex items-center gap-1"><span class="inline-block w-2 h-2 rounded-full bg-neon-cyan/50"></span>Forked: ${forks} (${forkPct}%)</span>
        </div>`;
}

function renderSizeDistribution(repos) {
    const container = document.getElementById('gh-size-distribution');
    const buckets = { 'Tiny (<100KB)': 0, 'Small (100KB–1MB)': 0, 'Medium (1–10MB)': 0, 'Large (10–100MB)': 0, 'Huge (>100MB)': 0 };
    const bucketColors = ['#00FF66', '#00F0FF', '#f1e05a', '#ff9800', '#ff4444'];

    repos.forEach(r => {
        const sizeKB = r.size || 0;
        if (sizeKB < 100) buckets['Tiny (<100KB)']++;
        else if (sizeKB < 1024) buckets['Small (100KB–1MB)']++;
        else if (sizeKB < 10240) buckets['Medium (1–10MB)']++;
        else if (sizeKB < 102400) buckets['Large (10–100MB)']++;
        else buckets['Huge (>100MB)']++;
    });

    const total = repos.length;
    const entries = Object.entries(buckets).filter(([, c]) => c > 0);

    container.innerHTML = entries.map(([label, count], i) => {
        const pct = ((count / total) * 100).toFixed(0);
        const color = bucketColors[Object.keys(buckets).indexOf(label)];
        return `<div class="flex items-center gap-2">
            <span class="text-[10px] text-gray-400 w-28 shrink-0 truncate">${label}</span>
            <div class="flex-1 h-2.5 bg-terminal-800 rounded-full overflow-hidden">
                <div style="width:${pct}%;background:${color}" class="h-full rounded-full transition-all duration-500"></div>
            </div>
            <span class="text-[10px] text-gray-500 w-14 text-right shrink-0">${count} <span class="text-gray-600">(${pct}%)</span></span>
        </div>`;
    }).join('');
}

// ============================
// REPOS TAB (unchanged)
// ============================

function renderReposList(repos) {
    const container = document.getElementById('gh-repos-list');
    const nonForkRepos = repos.filter(r => !r.fork)
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

    container.innerHTML = nonForkRepos.map(repo => {
        const lang = repo.language || 'N/A';
        const langColor = LANG_COLORS[lang] || '#8b949e';
        const desc = repo.description || 'No description';
        const updated = new Date(repo.pushed_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
        const topics = (repo.topics || []).slice(0, 3);
        const orgBadge = repo._org
            ? `<span class="text-[9px] px-1.5 py-0.5 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-sm">${repo._org}</span>`
            : '';

        return `
        <a href="${repo.html_url}" target="_blank" class="github-repo-card block">
            <div class="flex items-start justify-between gap-3">
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        <i class="fas fa-book text-neon-green/60 text-xs"></i>
                        <span class="text-neon-green font-semibold text-xs truncate">${repo.name}</span>
                        <span class="text-[9px] px-1.5 py-0.5 border border-emerald-900/40 text-gray-500 rounded-sm">${repo.visibility}</span>
                        ${orgBadge}
                    </div>
                    <p class="text-gray-500 text-[11px] leading-relaxed mb-2 line-clamp-2">${desc}</p>
                    ${topics.length ? `<div class="flex flex-wrap gap-1.5 mb-2">
                        ${topics.map(t => `<span class="text-[9px] px-1.5 py-0.5 bg-emerald-950/60 border border-emerald-900/30 text-emerald-400 rounded-sm">${t}</span>`).join('')}
                    </div>` : ''}
                </div>
                <div class="flex items-center gap-3 text-[11px] text-gray-500 shrink-0 pt-1">
                    <span class="flex items-center gap-1" title="Stars">
                        <i class="fas fa-star text-yellow-500/60"></i>${repo.stargazers_count}
                    </span>
                    <span class="flex items-center gap-1" title="Forks">
                        <i class="fas fa-code-branch text-neon-cyan/60"></i>${repo.forks_count}
                    </span>
                </div>
            </div>
            <div class="flex items-center justify-between text-[10px] text-gray-600 mt-1">
                <span class="flex items-center">
                    <span class="lang-dot" style="background:${langColor}"></span>${lang}
                </span>
                <span>Updated ${updated}</span>
            </div>
        </a>`;
    }).join('');
}

// ============================
// ACTIVITY TAB
// ============================

function renderActivityTab(user, allRepos, events) {
    renderGithubAchievements(user, allRepos);
    renderTopLangsCustom(allRepos);
    renderActivitySummary(user, allRepos, events);
    renderWeeklyActivity(events);
}

function renderGithubAchievements(user, repos) {
    const container = document.getElementById('gh-achievements');
    const totalStars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const totalForks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);
    const uniqueLangs = new Set(repos.map(r => r.language).filter(Boolean)).size;
    const originals = repos.filter(r => !r.fork).length;
    const totalRepos = user.public_repos;
    const followers = user.followers;

    const badges = [
        { icon: 'fa-star', label: 'Stargazer', value: totalStars >= 50 ? '🥇' : totalStars >= 10 ? '🥈' : '🥉', desc: `${totalStars} total stars`, color: 'text-yellow-400', unlocked: totalStars > 0 },
        { icon: 'fa-code-branch', label: 'Forked', value: totalForks >= 20 ? '🥇' : totalForks >= 5 ? '🥈' : '🥉', desc: `${totalForks} total forks`, color: 'text-neon-cyan', unlocked: totalForks > 0 },
        { icon: 'fa-book', label: 'Creator', value: originals >= 20 ? '🥇' : originals >= 10 ? '🥈' : '🥉', desc: `${originals} original repos`, color: 'text-neon-green', unlocked: originals > 0 },
        { icon: 'fa-users', label: 'Popular', value: followers >= 100 ? '🥇' : followers >= 20 ? '🥈' : '🥉', desc: `${followers} followers`, color: 'text-emerald-400', unlocked: followers > 0 },
        { icon: 'fa-globe', label: 'Polyglot', value: uniqueLangs >= 8 ? '🥇' : uniqueLangs >= 4 ? '🥈' : '🥉', desc: `${uniqueLangs} languages`, color: 'text-purple-400', unlocked: uniqueLangs > 1 },
        { icon: 'fa-fire', label: 'Prolific', value: totalRepos >= 30 ? '🥇' : totalRepos >= 15 ? '🥈' : '🥉', desc: `${totalRepos} public repos`, color: 'text-orange-400', unlocked: totalRepos >= 5 },
        { icon: 'fa-clock', label: 'Veteran', value: (() => { const y = Math.floor((new Date() - new Date(user.created_at)) / (365.25*24*60*60*1000)); return y >= 5 ? '🥇' : y >= 2 ? '🥈' : '🥉'; })(), desc: `Since ${new Date(user.created_at).getFullYear()}`, color: 'text-amber-400', unlocked: true },
        { icon: 'fa-building', label: 'Team Player', value: '🏅', desc: 'Org member', color: 'text-yellow-300', unlocked: repos.some(r => r._org) },
    ];

    container.innerHTML = badges.map(b => `
        <div class="gh-achievement-card ${b.unlocked ? '' : 'opacity-30'}">
            <div class="text-lg mb-1">${b.value}</div>
            <div class="flex items-center justify-center gap-1 mb-0.5">
                <i class="fas ${b.icon} ${b.color} text-[10px]"></i>
                <span class="text-gray-300 text-[10px] font-bold uppercase">${b.label}</span>
            </div>
            <div class="text-gray-600 text-[9px]">${b.desc}</div>
        </div>
    `).join('');
}

function renderTopLangsCustom(repos) {
    const container = document.getElementById('gh-top-langs-custom');
    const langCounts = {};
    repos.forEach(r => {
        if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    });

    const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const sorted = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

    if (sorted.length === 0) {
        container.innerHTML = '<span class="text-gray-600 text-xs italic">No language data available</span>';
        return;
    }

    const maxCount = sorted[0][1];
    container.innerHTML = sorted.map(([lang, count]) => {
        const pct = ((count / total) * 100).toFixed(1);
        const barWidth = ((count / maxCount) * 100).toFixed(0);
        const color = LANG_COLORS[lang] || '#8b949e';
        return `<div class="flex items-center gap-3">
            <span class="text-[11px] text-gray-400 w-24 text-right shrink-0 truncate">${lang}</span>
            <div class="flex-1 h-3 bg-terminal-800 rounded-sm overflow-hidden">
                <div style="width:${barWidth}%;background:${color}" class="h-full rounded-sm transition-all duration-700"></div>
            </div>
            <span class="text-[10px] text-gray-500 w-12 shrink-0">${pct}%</span>
        </div>`;
    }).join('');
}

function renderActivitySummary(user, repos, events) {
    const container = document.getElementById('gh-activity-summary');

    // Count events by type
    const pushEvents = events.filter(e => e.type === 'PushEvent').length;
    const prEvents = events.filter(e => e.type === 'PullRequestEvent').length;
    const issueEvents = events.filter(e => e.type === 'IssuesEvent' || e.type === 'IssueCommentEvent').length;
    const totalCommits = events.filter(e => e.type === 'PushEvent').reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0);

    // Most active day
    const dayCounts = {};
    events.forEach(e => {
        const day = new Date(e.created_at).toLocaleDateString('en-US', { weekday: 'short' });
        dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const mostActiveDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0];

    // Latest push
    const latestPush = repos.reduce((latest, r) => {
        const d = new Date(r.pushed_at);
        return d > latest ? d : latest;
    }, new Date(0));
    const daysSince = Math.floor((new Date() - latestPush) / (24 * 60 * 60 * 1000));

    const cards = [
        { label: 'RECENT COMMITS', value: totalCommits, color: 'text-neon-green', icon: 'fa-code-commit' },
        { label: 'PUSH EVENTS', value: pushEvents, color: 'text-neon-cyan', icon: 'fa-arrow-up' },
        { label: 'PR EVENTS', value: prEvents, color: 'text-purple-400', icon: 'fa-code-branch' },
        { label: 'MOST ACTIVE', value: mostActiveDay ? mostActiveDay[0] : '—', color: 'text-yellow-400', icon: 'fa-calendar-day' },
    ];

    container.innerHTML = cards.map(c => `
        <div class="github-metric-card">
            <div class="text-[10px] text-gray-500 uppercase tracking-wider mb-1"><i class="fas ${c.icon} mr-1 opacity-50"></i>${c.label}</div>
            <div class="${c.color} font-bold text-lg">${c.value}</div>
        </div>
    `).join('');
}

function renderWeeklyActivity(events) {
    const container = document.getElementById('gh-weekly-activity');
    if (events.length === 0) {
        container.innerHTML = '<span class="text-gray-600 text-xs italic">No recent events</span>';
        return;
    }

    // Build last 7 calendar days (today + 6 days back)
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        days.push({
            date: d,
            key: d.toISOString().slice(0, 10), // "YYYY-MM-DD"
            label: d.toLocaleDateString('en-US', { weekday: 'short' }),
            dateLabel: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            isToday: i === 0,
            count: 0
        });
    }

    // Count events per day
    events.forEach(e => {
        const eventDay = new Date(e.created_at).toISOString().slice(0, 10);
        const match = days.find(d => d.key === eventDay);
        if (match) match.count++;
    });

    const maxCount = Math.max(...days.map(d => d.count), 1);

    container.innerHTML = `
        <div class="flex items-end gap-1 sm:gap-2 h-20">
            ${days.map(d => {
                const pct = d.count > 0 ? Math.max(8, (d.count / maxCount) * 100) : 4;
                const barColor = d.isToday ? 'background:rgba(0,240,255,0.6)' : 'background:rgba(0,255,102,0.4)';
                const emptyBar = d.count === 0 ? 'opacity:0.2' : '';
                return `<div class="flex-1 flex flex-col items-center gap-1">
                    <span class="text-neon-green text-[10px] font-bold">${d.count || ''}</span>
                    <div class="w-full rounded-sm" style="height:${pct}%;${barColor};${emptyBar};min-height:3px;transition:height 0.5s ease"></div>
                    <span class="text-[9px] ${d.isToday ? 'text-neon-cyan font-bold' : 'text-gray-600'}">${d.label}</span>
                    <span class="text-[8px] text-gray-700">${d.dateLabel}</span>
                </div>`;
            }).join('')}
        </div>
        <div class="text-center text-gray-600 text-[9px] mt-2">Last 7 days</div>
    `;
}

const EVENT_ICONS = {
    'PushEvent': { icon: 'fa-arrow-up', color: 'text-neon-green', label: 'pushed to' },
    'CreateEvent': { icon: 'fa-plus', color: 'text-neon-cyan', label: 'created' },
    'DeleteEvent': { icon: 'fa-trash', color: 'text-red-400', label: 'deleted' },
    'WatchEvent': { icon: 'fa-star', color: 'text-yellow-400', label: 'starred' },
    'ForkEvent': { icon: 'fa-code-branch', color: 'text-purple-400', label: 'forked' },
    'IssuesEvent': { icon: 'fa-exclamation-circle', color: 'text-orange-400', label: '' },
    'IssueCommentEvent': { icon: 'fa-comment', color: 'text-gray-400', label: 'commented on' },
    'PullRequestEvent': { icon: 'fa-code-branch', color: 'text-emerald-400', label: '' },
    'PullRequestReviewEvent': { icon: 'fa-eye', color: 'text-neon-cyan', label: 'reviewed PR in' },
    'ReleaseEvent': { icon: 'fa-tag', color: 'text-neon-green', label: 'released in' },
    'PublicEvent': { icon: 'fa-globe', color: 'text-neon-green', label: 'made public' },
};

function getEventDescription(event) {
    const meta = EVENT_ICONS[event.type] || { icon: 'fa-circle', color: 'text-gray-500', label: event.type };
    const repoName = event.repo ? event.repo.name.split('/').pop() : '';

    let action = meta.label;
    if (event.type === 'PushEvent') {
        const commits = event.payload?.commits?.length || 0;
        action = `pushed ${commits} commit${commits !== 1 ? 's' : ''} to`;
    } else if (event.type === 'IssuesEvent') {
        action = `${event.payload?.action || 'updated'} issue in`;
    } else if (event.type === 'PullRequestEvent') {
        action = `${event.payload?.action || 'updated'} PR in`;
    } else if (event.type === 'CreateEvent') {
        action = `created ${event.payload?.ref_type || 'repo'}${event.payload?.ref ? ' ' + event.payload.ref : ''} in`;
    }

    return { ...meta, action, repoName, repoUrl: `https://github.com/${event.repo?.name}` };
}

function renderEventsFeed(events) {
    const container = document.getElementById('gh-events-feed');
    if (events.length === 0) {
        container.innerHTML = '<div class="text-gray-600 text-xs py-4 text-center italic">No recent public events</div>';
        return;
    }

    container.innerHTML = events.slice(0, 15).map(event => {
        const { icon, color, action, repoName, repoUrl } = getEventDescription(event);
        const time = getRelativeTime(new Date(event.created_at));

        return `<div class="gh-event-row">
            <i class="fas ${icon} ${color} text-[10px] w-4 shrink-0"></i>
            <span class="text-gray-400 text-[11px] flex-1 truncate">
                ${action} <a href="${repoUrl}" target="_blank" class="text-neon-green hover:underline">${repoName}</a>
            </span>
            <span class="text-gray-600 text-[10px] shrink-0 ml-2">${time}</span>
        </div>`;
    }).join('');
}

function getRelativeTime(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d`;
    const months = Math.floor(days / 30);
    return `${months}mo`;
}

// ============================
// ORG TAB
// ============================

function renderOrgTab(org, personalRepos, orgRepos) {
    renderOrgSpotlight(org);
    renderOrgSplit(personalRepos, orgRepos);
}

function renderOrgSpotlight(org) {
    const container = document.getElementById('gh-org-spotlight');
    if (!org || org.message) {
        container.innerHTML = '<div class="text-gray-600 text-xs py-4 text-center italic">Organization data unavailable</div>';
        return;
    }

    container.innerHTML = `
        <div class="flex items-center gap-4">
            <img src="${org.avatar_url}" alt="${org.login}" class="w-14 h-14 rounded-lg border-2 border-yellow-500/30 shadow-[0_0_12px_rgba(255,215,0,0.1)]">
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                    <span class="text-white font-bold text-sm">${org.name || org.login}</span>
                    <a href="${org.html_url || `https://github.com/${org.login}`}" target="_blank" class="text-gray-500 hover:text-yellow-400 transition-colors text-xs">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <p class="text-gray-400 text-[11px] mb-2">${org.description || 'No description'}</p>
                <div class="flex items-center gap-4 text-[11px]">
                    <span class="text-gray-400"><i class="fas fa-book text-yellow-400/60 mr-1"></i>${org.public_repos || 0} repos</span>
                    <span class="text-gray-400"><i class="fas fa-users text-yellow-400/60 mr-1"></i>${org.followers || 0} followers</span>
                    ${org.location ? `<span class="text-gray-400"><i class="fas fa-map-marker-alt text-yellow-400/60 mr-1"></i>${org.location}</span>` : ''}
                </div>
            </div>
        </div>`;
}

function renderOrgSplit(personalRepos, orgRepos) {
    const container = document.getElementById('gh-org-split');

    const pStars = personalRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const oStars = orgRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
    const pForks = personalRepos.reduce((s, r) => s + (r.forks_count || 0), 0);
    const oForks = orgRepos.reduce((s, r) => s + (r.forks_count || 0), 0);

    const metrics = [
        { label: 'REPOS', personal: personalRepos.length, org: orgRepos.length, pColor: '#00FF66', oColor: '#eab308' },
        { label: 'STARS', personal: pStars, org: oStars, pColor: '#00FF66', oColor: '#eab308' },
        { label: 'FORKS', personal: pForks, org: oForks, pColor: '#00FF66', oColor: '#eab308' },
    ];

    container.innerHTML = metrics.map(m => {
        const total = m.personal + m.org;
        const pPct = total > 0 ? ((m.personal / total) * 100).toFixed(0) : 50;
        const oPct = total > 0 ? ((m.org / total) * 100).toFixed(0) : 50;
        return `<div>
            <div class="flex justify-between text-[10px] mb-1">
                <span class="text-neon-green">Personal: ${m.personal}</span>
                <span class="text-gray-500 font-semibold">${m.label}</span>
                <span class="text-yellow-400">Org: ${m.org}</span>
            </div>
            <div class="flex h-2.5 rounded-full overflow-hidden bg-terminal-800">
                <div style="width:${pPct}%;background:${m.pColor}" class="transition-all duration-500 opacity-70"></div>
                <div style="width:${oPct}%;background:${m.oColor}" class="transition-all duration-500 opacity-70"></div>
            </div>
        </div>`;
    }).join('');
}

async function fetchOrgMembers() {
    const container = document.getElementById('gh-org-members');
    try {
        const res = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}/members`);
        const members = await res.json();

        if (!Array.isArray(members) || members.length === 0) {
            container.innerHTML = '<span class="text-gray-600 text-xs italic">No public members</span>';
            return;
        }

        container.innerHTML = members.map(m => `
            <a href="${m.html_url}" target="_blank" class="gh-member-card flex items-center gap-2" title="${m.login}">
                <img src="${m.avatar_url}" alt="${m.login}" class="w-8 h-8 rounded-full border border-emerald-900/40">
                <span class="text-gray-300 text-[11px] font-semibold">${m.login}</span>
            </a>
        `).join('');
    } catch (err) {
        container.innerHTML = '<span class="text-gray-600 text-xs italic">Could not load members</span>';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const ghModal = document.getElementById('github-modal-overlay');
        if (ghModal && !ghModal.classList.contains('hidden')) {
            closeGithubModal();
        }
    }
});

