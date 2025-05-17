// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

function toggleMenu() {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.mobile-menu-btn')) {
        toggleMenu();
    }
});

// Animação das barras de progresso de idiomas
const observerLanguage = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-progress');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-fill').forEach(bar => {
    observerLanguage.observe(bar);
});

// navegação suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada das seções
const observerOptions = {
    threshold: 0.25
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Formulário de contato
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Captura os valores do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;
        
        
        alert(`Obrigado ${nome}! Sua mensagem foi recebida.`);
        form.reset();
    });
}

// Adiciona classe ativa ao link de navegação atual
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// faz o controle de modais
function setupModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Função para abrir modal 
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Previne rolagem
        }
    }

    // Função para fechar modal
    function closeModal() {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restaura rolagem
        }
    }

    // Event listeners para os cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Event listeners para fechar
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Fechar ao clicar no overlay
    modalOverlay.addEventListener('click', closeModal);

    // Fechar com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Inicializar modais quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', setupModals);

// Controle da barra de progresso
function updateDesktopProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progressWidth = (scrolled / documentHeight) * 100;
    
    document.querySelector('.desktop-progress').style.width = `${progressWidth}%`;
}

window.addEventListener('scroll', updateDesktopProgress);
window.addEventListener('resize', updateDesktopProgress);
window.addEventListener('load', updateDesktopProgress);