document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Плавный скролл
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Мобильное меню (уже было, закрепляем)
    const burger = document.getElementById('burger-trigger');
    const mobileMenu = document.getElementById('mobile-menu');
    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        mobileMenu.classList.toggle('mobile-menu--active');
    });

    // 3. GSAP ScrollTrigger Анимации для секций
    gsap.registerPlugin(ScrollTrigger);

    // Анимация появления карточек платформы
    gsap.from('.platform__card', {
        scrollTrigger: {
            trigger: '.platform__grid',
            start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });

    // Анимация списка преимуществ
    gsap.from('.benefit-item', {
        scrollTrigger: {
            trigger: '.benefits',
            start: 'top 70%',
        },
        x: -100,
        opacity: 0,
        stagger: 0.3,
        duration: 1
    });

    // 4. Валидация формы и Капча
    const contactForm = document.getElementById('main-contact-form');
    const phoneInput = document.getElementById('phone-input');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');
    
    // Генерируем случайную капчу
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const captchaResult = num1 + num2;
    captchaLabel.innerText = `Сколько будет ${num1} + ${num2}?`;

    // Валидация телефона (только цифры)
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (parseInt(captchaInput.value) !== captchaResult) {
            alert('Ошибка капчи! Попробуйте снова.');
            return;
        }

        // Имитация AJAX
        const btn = contactForm.querySelector('button');
        btn.innerText = 'Отправка...';
        btn.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            btn.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
        }, 1500);
    });

    // Инициализация иконок
    lucide.createIcons();
});