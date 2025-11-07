// Initialize data storage
let projects = [];
let skills = [];
let blogPosts = [];
let aboutText = '';

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    initializeNavigation();
    renderProjects();
    renderSkills();
    renderBlogPosts();
    updateAboutSection();
    setupDashboard();
    animateStats();
    setupScrollAnimations();
});

// Load data from localStorage
function loadData() {
    projects = JSON.parse(localStorage.getItem('portfolio_projects')) || getDefaultProjects();
    skills = JSON.parse(localStorage.getItem('portfolio_skills')) || getDefaultSkills();
    blogPosts = JSON.parse(localStorage.getItem('portfolio_blog')) || getDefaultBlogPosts();
    aboutText = localStorage.getItem('portfolio_about') || getDefaultAbout();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
    localStorage.setItem('portfolio_blog', JSON.stringify(blogPosts));
    localStorage.setItem('portfolio_about', aboutText);
}

// Default data
function getDefaultProjects() {
    return [
        {
            id: Date.now(),
            title: 'Portfolio Website',
            description: 'A modern, responsive portfolio website built with HTML, CSS, and JavaScript',
            tech: ['HTML', 'CSS', 'JavaScript'],
            link: '',
            github: ''
        }
    ];
}

function getDefaultSkills() {
    return [
        { id: Date.now(), name: 'JavaScript', level: 90, category: 'frontend' },
        { id: Date.now() + 1, name: 'HTML/CSS', level: 95, category: 'frontend' },
        { id: Date.now() + 2, name: 'React', level: 85, category: 'frontend' },
        { id: Date.now() + 3, name: 'Node.js', level: 80, category: 'backend' },
        { id: Date.now() + 4, name: 'Git', level: 85, category: 'tools' }
    ];
}

function getDefaultBlogPosts() {
    return [
        {
            id: Date.now(),
            title: 'Welcome to My Blog',
            content: 'This is my first blog post. I\'m excited to share my journey and learnings with you!',
            date: new Date().toISOString(),
            tags: ['welcome', 'first-post']
        }
    ];
}

function getDefaultAbout() {
    return "I'm a passionate developer who loves creating innovative solutions and exploring new technologies. With a focus on clean code and user experience, I strive to build applications that make a difference.";
}

// Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Render Projects
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    if (projects.length === 0) {
        projectsGrid.innerHTML = '<div class="empty-state"><p>No projects yet. Add some from the dashboard!</p></div>';
        return;
    }

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3 class="project-title">${escapeHtml(project.title)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.link ? `<a href="${escapeHtml(project.link)}" target="_blank" class="project-link">View Project</a>` : ''}
                ${project.github ? `<a href="${escapeHtml(project.github)}" target="_blank" class="project-link">GitHub</a>` : ''}
            </div>
        </div>
    `).join('');
}

// Render Skills
function renderSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;

    if (skills.length === 0) {
        skillsGrid.innerHTML = '<div class="empty-state"><p>No skills yet. Add some from the dashboard!</p></div>';
        return;
    }

    skillsGrid.innerHTML = skills.map(skill => `
        <div class="skill-card">
            <div class="skill-header">
                <span class="skill-name">${escapeHtml(skill.name)}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
            <span class="skill-category">${escapeHtml(skill.category)}</span>
        </div>
    `).join('');
}

// Render Blog Posts
function renderBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    if (blogPosts.length === 0) {
        blogGrid.innerHTML = '<div class="empty-state"><p>No blog posts yet. Write your first post from the dashboard!</p></div>';
        return;
    }

    blogGrid.innerHTML = blogPosts.map(post => {
        const date = new Date(post.date);
        const excerpt = post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '');
        
        return `
            <div class="blog-card" onclick="showBlogPost(${post.id})">
                <h3 class="blog-title">${escapeHtml(post.title)}</h3>
                <p class="blog-date">${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p class="blog-excerpt">${escapeHtml(excerpt)}</p>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// Show full blog post
function showBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    const date = new Date(post.date);
    alert(`${post.title}\n\n${date.toLocaleDateString()}\n\n${post.content}\n\nTags: ${post.tags.join(', ')}`);
}

// Update About Section
function updateAboutSection() {
    const aboutTextElement = document.getElementById('aboutText');
    if (aboutTextElement && aboutText) {
        aboutTextElement.textContent = aboutText;
    }
}

// Animate Statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                animateNumber(stat, 0, target, 2000);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-card, .blog-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Dashboard Setup
function setupDashboard() {
    setupTabNavigation();
    setupProjectForm();
    setupSkillForm();
    setupBlogForm();
    setupAboutForm();
    updateDashboardLists();
}

function setupTabNavigation() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Project Management
function setupProjectForm() {
    const form = document.getElementById('projectForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const id = document.getElementById('projectId').value;
        const title = document.getElementById('projectTitle').value;
        const description = document.getElementById('projectDescription').value;
        const tech = document.getElementById('projectTech').value.split(',').map(t => t.trim()).filter(t => t);
        const link = document.getElementById('projectLink').value;
        const github = document.getElementById('projectGithub').value;

        if (id) {
            // Update existing project
            const index = projects.findIndex(p => p.id == id);
            if (index !== -1) {
                projects[index] = { id: parseInt(id), title, description, tech, link, github };
            }
        } else {
            // Add new project
            projects.push({
                id: Date.now(),
                title,
                description,
                tech,
                link,
                github
            });
        }

        saveData();
        renderProjects();
        updateDashboardLists();
        clearProjectForm();
        alert('Project saved successfully!');
    });
}

function clearProjectForm() {
    document.getElementById('projectId').value = '';
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectTech').value = '';
    document.getElementById('projectLink').value = '';
    document.getElementById('projectGithub').value = '';
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    document.getElementById('projectId').value = project.id;
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectTech').value = project.tech.join(', ');
    document.getElementById('projectLink').value = project.link || '';
    document.getElementById('projectGithub').value = project.github || '';

    // Scroll to form
    document.querySelector('#projects-tab').scrollIntoView({ behavior: 'smooth' });
}

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(p => p.id !== id);
        saveData();
        renderProjects();
        updateDashboardLists();
    }
}

// Skill Management
function setupSkillForm() {
    const form = document.getElementById('skillForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const id = document.getElementById('skillId').value;
        const name = document.getElementById('skillName').value;
        const level = parseInt(document.getElementById('skillLevel').value);
        const category = document.getElementById('skillCategory').value;

        if (id) {
            // Update existing skill
            const index = skills.findIndex(s => s.id == id);
            if (index !== -1) {
                skills[index] = { id: parseInt(id), name, level, category };
            }
        } else {
            // Add new skill
            skills.push({
                id: Date.now(),
                name,
                level,
                category
            });
        }

        saveData();
        renderSkills();
        updateDashboardLists();
        clearSkillForm();
        alert('Skill saved successfully!');
    });
}

function clearSkillForm() {
    document.getElementById('skillId').value = '';
    document.getElementById('skillName').value = '';
    document.getElementById('skillLevel').value = '';
    document.getElementById('skillCategory').value = '';
}

function editSkill(id) {
    const skill = skills.find(s => s.id === id);
    if (!skill) return;

    document.getElementById('skillId').value = skill.id;
    document.getElementById('skillName').value = skill.name;
    document.getElementById('skillLevel').value = skill.level;
    document.getElementById('skillCategory').value = skill.category;

    // Scroll to form
    document.querySelector('#skills-tab').scrollIntoView({ behavior: 'smooth' });
}

function deleteSkill(id) {
    if (confirm('Are you sure you want to delete this skill?')) {
        skills = skills.filter(s => s.id !== id);
        saveData();
        renderSkills();
        updateDashboardLists();
    }
}

// Blog Management
function setupBlogForm() {
    const form = document.getElementById('blogForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const id = document.getElementById('blogId').value;
        const title = document.getElementById('blogTitle').value;
        const content = document.getElementById('blogContent').value;
        const tags = document.getElementById('blogTags').value.split(',').map(t => t.trim()).filter(t => t);

        if (id) {
            // Update existing post
            const index = blogPosts.findIndex(p => p.id == id);
            if (index !== -1) {
                blogPosts[index] = { 
                    id: parseInt(id), 
                    title, 
                    content, 
                    tags,
                    date: blogPosts[index].date
                };
            }
        } else {
            // Add new post
            blogPosts.unshift({
                id: Date.now(),
                title,
                content,
                tags,
                date: new Date().toISOString()
            });
        }

        saveData();
        renderBlogPosts();
        updateDashboardLists();
        clearBlogForm();
        alert('Blog post saved successfully!');
    });
}

function clearBlogForm() {
    document.getElementById('blogId').value = '';
    document.getElementById('blogTitle').value = '';
    document.getElementById('blogContent').value = '';
    document.getElementById('blogTags').value = '';
}

function editBlogPost(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('blogId').value = post.id;
    document.getElementById('blogTitle').value = post.title;
    document.getElementById('blogContent').value = post.content;
    document.getElementById('blogTags').value = post.tags.join(', ');

    // Scroll to form
    document.querySelector('#blog-tab').scrollIntoView({ behavior: 'smooth' });
}

function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        blogPosts = blogPosts.filter(p => p.id !== id);
        saveData();
        renderBlogPosts();
        updateDashboardLists();
    }
}

// About Management
function setupAboutForm() {
    const form = document.getElementById('aboutForm');
    const textarea = document.getElementById('aboutDescription');
    
    if (!form || !textarea) return;

    // Load current about text
    textarea.value = aboutText;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        aboutText = textarea.value;
        saveData();
        updateAboutSection();
        alert('About section updated successfully!');
    });
}

// Update Dashboard Lists
function updateDashboardLists() {
    updateProjectsList();
    updateSkillsList();
    updateBlogsList();
}

function updateProjectsList() {
    const list = document.getElementById('projectsList');
    if (!list) return;

    if (projects.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>No projects yet</p></div>';
        return;
    }

    list.innerHTML = projects.map(project => `
        <div class="list-item">
            <div class="item-info">
                <h4>${escapeHtml(project.title)}</h4>
                <p>${escapeHtml(project.description.substring(0, 100))}${project.description.length > 100 ? '...' : ''}</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editProject(${project.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateSkillsList() {
    const list = document.getElementById('skillsList');
    if (!list) return;

    if (skills.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>No skills yet</p></div>';
        return;
    }

    list.innerHTML = skills.map(skill => `
        <div class="list-item">
            <div class="item-info">
                <h4>${escapeHtml(skill.name)}</h4>
                <p>Level: ${skill.level}% | Category: ${escapeHtml(skill.category)}</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editSkill(${skill.id})">Edit</button>
                <button class="btn-delete" onclick="deleteSkill(${skill.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function updateBlogsList() {
    const list = document.getElementById('blogsList');
    if (!list) return;

    if (blogPosts.length === 0) {
        list.innerHTML = '<div class="empty-state"><p>No blog posts yet</p></div>';
        return;
    }

    list.innerHTML = blogPosts.map(post => {
        const date = new Date(post.date);
        return `
            <div class="list-item">
                <div class="item-info">
                    <h4>${escapeHtml(post.title)}</h4>
                    <p>${date.toLocaleDateString()} - ${escapeHtml(post.content.substring(0, 100))}${post.content.length > 100 ? '...' : ''}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editBlogPost(${post.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteBlogPost(${post.id})">Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
