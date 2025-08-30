// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initializeNavigation();
    loadAllData();
    initializeMobileMenu();
    initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's an external link (resume)
            if (href.startsWith('static/') || href.startsWith('http')) {
                return;
            }

            e.preventDefault();
            const targetSection = document.querySelector(href);

            if (targetSection) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');

                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // Close menu on window resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');

    sidebar.classList.toggle('show');
    overlay.classList.toggle('hidden');
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');

    sidebar.classList.remove('show');
    overlay.classList.add('hidden');
}

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for fade-in animations
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
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

// Load skills data
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
        { key: 'languages', title: 'Programming Languages', icon: 'fas fa-code' },
        { key: 'frameworks', title: 'Frameworks & Libraries', icon: 'fas fa-layer-group' },
        { key: 'databases', title: 'Databases & ORM', icon: 'fas fa-database' },
        { key: 'tools', title: 'Tools & Technologies', icon: 'fas fa-tools' },
        { key: 'ai_tools', title: 'AI & Development Tools', icon: 'fas fa-robot' },
        { key: 'testing', title: 'Testing & Quality', icon: 'fas fa-check-circle' }
    ];

    skillCategories.forEach((category, index) => {
        const skills = skillsData[category.key] || [];
        const skillCard = createSkillCard(category, skills, index);
        container.appendChild(skillCard);
    });
}

function createSkillCard(category, skills, index) {
    const card = document.createElement('div');
    card.className = `skill-card p-6 rounded-xl shadow-lg hover-lift stagger-${index + 1}`;

    card.innerHTML = `
        <div class="mb-3">
            <span class="text-green-500 font-mono text-sm">$</span>
            <span class="text-green-400 font-mono text-sm">ls -la ${category.title.toLowerCase().replace(/\s+/g, '_')}/</span>
        </div>
        <div class="flex items-center mb-4">
            <i class="${category.icon} text-2xl mr-3 text-green-400"></i>
            <h3 class="text-xl font-bold text-green-400 font-mono">${category.title}</h3>
        </div>
        <div class="flex flex-wrap gap-2">
            ${skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
        </div>
    `;

    return card;
}

// Load experience data
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

    experiences.forEach((exp, index) => {
        const expCard = createExperienceCard(exp, index);
        container.appendChild(expCard);
    });
}

function createExperienceCard(experience, index) {
    const card = document.createElement('div');
    card.className = `experience-card bg-gray-800 border border-green-500 rounded-xl shadow-lg p-8 hover-lift stagger-${index + 1}`;

    card.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
                <div class="mb-2">
                    <span class="text-green-500 font-mono text-sm">$</span>
                    <span class="text-green-400 font-mono text-sm">grep -r "${experience.company.toLowerCase().replace(/\s+/g, '_')}" ./career/</span>
                </div>
                <h3 class="text-xl font-bold text-green-400 font-mono">${experience.position}</h3>
                <h4 class="text-lg font-semibold text-green-300">${experience.company}</h4>
                <p class="text-gray-300">${experience.location}</p>
            </div>
            <span class="bg-gray-700 text-green-400 border border-green-600 px-3 py-1 rounded text-sm font-mono mt-2 md:mt-0 self-start">
                ${experience.duration}
            </span>
        </div>
        <div class="mb-3">
            <span class="text-green-500 font-mono text-sm">$</span>
            <span class="text-green-400 font-mono text-sm">cat responsibilities.txt</span>
        </div>
        <ul class="space-y-2">
            ${experience.responsibilities.map(resp => 
                `<li class="flex items-start">
                    <span class="text-green-500 mr-3 font-mono">></span>
                    <span class="text-gray-300">${resp}</span>
                </li>`
            ).join('')}
        </ul>
    `;

    return card;
}

// Load education data
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
    card.className = `bg-gray-800 border border-green-500 rounded-xl shadow-lg p-8 hover-lift stagger-${index + 1}`;

    card.innerHTML = `
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
                <div class="mb-2">
                    <span class="text-green-500 font-mono text-sm">$</span>
                    <span class="text-green-400 font-mono text-sm">cat ${education.institution.toLowerCase().replace(/\s+/g, '_')}.edu</span>
                </div>
                <h3 class="text-xl font-bold text-green-400 font-mono">${education.degree}</h3>
                <h4 class="text-lg font-semibold text-green-300">${education.institution}</h4>
                <p class="text-gray-300">CGPA: ${education.cgpa}</p>
                ${education.location ? `<p class="text-gray-400 text-sm">${education.location}</p>` : ''}
            </div>
            <span class="bg-gray-700 text-green-400 border border-green-600 px-3 py-1 rounded text-sm font-mono mt-2 md:mt-0 self-start">
                ${education.duration}
            </span>
        </div>
        <div>
            <div class="mb-3">
                <span class="text-green-500 font-mono text-sm">$</span>
                <span class="text-green-400 font-mono text-sm">ls coursework/</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${education.coursework.map(course => 
                    `<span class="tech-badge">${course}</span>`
                ).join('')}
            </div>
        </div>
        ${education.activities ? `
        <div class="mt-6">
            <div class="mb-3">
                <span class="text-green-500 font-mono text-sm">$</span>
                <span class="text-green-400 font-mono text-sm">grep -r activities</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${education.activities.map(activity => 
                    `<span class="bg-gray-700 text-gray-300 border border-gray-600 px-3 py-1 rounded text-xs font-mono">${activity}</span>`
                ).join('')}
            </div>
        </div>
        ` : ''}
        ${education.subjects ? `
        <div class="mt-6">
            <div class="mb-3">
                <span class="text-green-500 font-mono text-sm">$</span>
                <span class="text-green-400 font-mono text-sm">find subjects/ -name "*.txt"</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${education.subjects.map(subject => 
                    `<span class="bg-gray-700 text-gray-300 border border-gray-600 px-3 py-1 rounded text-xs font-mono">${subject}</span>`
                ).join('')}
            </div>
        </div>
        ` : ''}
    `;

    return card;
}

// Load projects data
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

    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        container.appendChild(projectCard);
    });
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = `project-card bg-gray-800 border border-green-500 rounded-xl shadow-lg p-6 hover-lift stagger-${index + 1}`;

    card.innerHTML = `
        <div class="mb-3">
            <span class="text-green-500 font-mono text-sm">$</span>
            <span class="text-green-400 font-mono text-sm">git log --oneline ${project.title.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
        <h3 class="text-xl font-bold text-green-400 font-mono mb-3">${project.title}</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">${project.description}</p>
        
        <div class="mb-4">
            <div class="mb-2">
                <span class="text-green-500 font-mono text-sm">$</span>
                <span class="text-green-400 font-mono text-sm">cat package.json | grep dependencies</span>
            </div>
            <div class="flex flex-wrap gap-2">
                ${project.techStack.map(tech => 
                    `<span class="tech-badge">${tech}</span>`
                ).join('')}
            </div>
        </div>
        
        <div class="mb-4">
            <div class="mb-2">
                <span class="text-green-500 font-mono text-sm">$</span>
                <span class="text-green-400 font-mono text-sm">grep -r "features" README.md</span>
            </div>
            <ul class="space-y-1">
                ${project.features.map(feature => 
                    `<li class="flex items-start">
                        <span class="text-green-500 mr-2 font-mono">></span>
                        <span class="text-gray-300 text-sm">${feature}</span>
                    </li>`
                ).join('')}
            </ul>
        </div>
        
        ${project.github || project.demo ? `
        <div class="border-t border-gray-600 pt-4 mt-4">
            <div class="flex gap-3">
                ${project.github ? `
                <a href="${project.github}" target="_blank" class="bg-gray-700 text-green-400 border border-green-600 px-3 py-1 rounded text-xs font-mono hover:bg-gray-600 transition-colors">
                    <i class="fab fa-github mr-1"></i>Code
                </a>
                ` : ''}
                ${project.demo ? `
                <a href="${project.demo}" target="_blank" class="bg-gray-700 text-green-400 border border-green-600 px-3 py-1 rounded text-xs font-mono hover:bg-gray-600 transition-colors">
                    <i class="fas fa-external-link-alt mr-1"></i>Demo
                </a>
                ` : ''}
            </div>
        </div>
        ` : ''}
    `;

    return card;
}

// Load achievements data
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
    card.className = `achievement-card bg-gray-800 border border-green-500 p-6 rounded-xl shadow-lg hover-lift stagger-${index + 1}`;

    card.innerHTML = `
        <div class="mb-3">
            <span class="text-green-500 font-mono text-sm">$</span>
            <span class="text-green-400 font-mono text-sm">find achievements/ -name "*${achievement.title.toLowerCase().split(' ')[0]}*"</span>
        </div>
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fas fa-trophy text-2xl text-green-400 mr-4"></i>
            </div>
            <div class="flex-1">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 class="text-lg font-bold text-green-400 font-mono">${achievement.title}</h3>
                    <span class="bg-gray-700 text-green-400 border border-green-600 px-3 py-1 rounded text-sm font-mono mt-1 md:mt-0 self-start">
                        ${achievement.date}
                    </span>
                </div>
                <p class="text-green-300 font-semibold mb-2">${achievement.issuer}</p>
                <p class="text-gray-300 mb-3">${achievement.description}</p>
                ${achievement.certificateUrl ? `
                <div class="mt-3">
                    <a href="${achievement.certificateUrl}" target="_blank" rel="noopener noreferrer" 
                       class="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-200 font-mono text-sm">
                        <i class="fas fa-certificate mr-2"></i>
                        View Certificate
                        <i class="fas fa-external-link-alt ml-2 text-xs"></i>
                    </a>
                </div>
                ` : ''}
            </div>
        </div>
    `;

    return card;
}

// Load competitions data
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

    competitions.forEach((competition, index) => {
        const competitionCard = createCompetitionCard(competition, index);
        container.appendChild(competitionCard);
    });
}

function createCompetitionCard(competition, index) {
    const card = document.createElement('div');
    card.className = `competition-card bg-gray-800 border border-green-500 p-6 rounded-xl shadow-lg hover-lift stagger-${index + 1}`;

    card.innerHTML = `
        <div class="mb-3">
            <span class="text-green-500 font-mono text-sm">$</span>
            <span class="text-green-400 font-mono text-sm">history | grep "${competition.name.toLowerCase().split(' ')[0]}"</span>
        </div>
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fas fa-medal text-2xl text-green-400 mr-4"></i>
            </div>
            <div class="flex-1">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 class="text-lg font-bold text-green-400 font-mono">${competition.name}</h3>
                    <span class="bg-gray-700 text-green-400 border border-green-600 px-3 py-1 rounded text-sm font-mono mt-1 md:mt-0 self-start">
                        ${competition.year}
                    </span>
                </div>
                <div class="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <span class="bg-gray-700 text-green-300 border border-green-600 px-2 py-1 rounded text-sm font-mono">
                        ${competition.rank}
                    </span>
                    <span class="text-gray-400 text-sm font-mono">${competition.team}</span>
                </div>
                <p class="text-gray-300">${competition.description}</p>
            </div>
        </div>
    `;

    return card;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
