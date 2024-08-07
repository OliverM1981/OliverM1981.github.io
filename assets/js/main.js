/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 200 }); 
sr.reveal('.home__social-icon', { interval: 100 }); 
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 100 }); 

/*===== EMAILJS INTEGRATION =====*/
// Inicialize o EmailJS
(function() {
    emailjs.init('UwqsJ4UJFOds2_6ML'); // Substitua pelo seu Public Key do EmailJS
})();

function sendEmail(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const form = document.getElementById('contact-form');
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    // Verificar se os campos estão vazios
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const serviceID = 'service_9z7d8oo';
    const templateID = 'template_1bdwe6b'; // Use o Template ID configurado no EmailJS

    emailjs.sendForm(serviceID, templateID, form)
        .then(function(response) {
            alert('Mensagem enviada com sucesso!');
            form.reset(); // Limpa o formulário
        }, function(error) {
            alert('Erro ao enviar mensagem. Tente novamente mais tarde.');
        });
}

// Adicione o event listener ao formulário
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}
