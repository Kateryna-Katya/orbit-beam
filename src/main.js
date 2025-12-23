document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация Lenis (Плавный скролл)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Мобильное меню
    const burger = document.getElementById('burger-trigger');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('burger--active');
            mobileMenu.classList.toggle('mobile-menu--active');
            body.classList.toggle('no-scroll');
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.mobile-nav__link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('burger--active');
                mobileMenu.classList.remove('mobile-menu--active');
                body.classList.remove('no-scroll');
            });
        });
    }

    // 3. GSAP Анимации
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // --- РЕФАКТОРИНГ: СЕКЦИЯ ПЛАТФОРМЫ (forEach) ---
        // Теперь каждая карточка анимируется независимо при скролле
        const platformCards = gsap.utils.toArray('.platform__card');
        
        platformCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,            // Триггер — сама карточка
                    start: 'top 90%',         // Анимация начнется, когда карточка на 90% высоты экрана
                    toggleActions: 'play none none none'
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                // Небольшая задержка, если карточки стоят в ряд и появляются одновременно
                delay: (index % 3) * 0.1 
            });
        });

        // Анимация преимуществ (Benefits)
        const benefitItems = gsap.utils.toArray('.benefit-item');
        benefitItems.forEach((item) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                x: -30,
                opacity: 0,
                duration: 0.6
            });
        });
    }

    // 4. Валидация формы и капча
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
        const captchaLabel = document.getElementById('captcha-label');
        const captchaInput = document.getElementById('captcha-input');
        const phoneInput = document.getElementById('phone-input');

        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 5);
        const result = n1 + n2;
        if (captchaLabel) captchaLabel.innerText = `Сколько будет ${n1} + ${n2}?`;

        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (parseInt(captchaInput.value) !== result) {
                alert('Неверный ответ на капчу!');
                return;
            }
            
            const btn = contactForm.querySelector('button');
            btn.disabled = true;
            btn.innerText = 'Отправка...';

            setTimeout(() => {
                contactForm.reset();
                btn.style.display = 'none';
                const successMsg = document.getElementById('form-success');
                if (successMsg) successMsg.style.display = 'block';
            }, 1500);
        });
    }

    // 5. COOKIE POPUP
    const setupCookies = () => {
        if (!localStorage.getItem('cookies-accepted')) {
            const cookieHtml = `
                <div id="cookie-popup" class="cookie-popup card-neo">
                    <p>Этот сайт использует cookies для улучшения работы. Подробнее — в нашей <a href="cookies.html">Cookie политике</a>.</p>
                    <button id="accept-cookies" class="btn btn--main">Принять</button>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', cookieHtml);

            const acceptBtn = document.getElementById('accept-cookies');
            if (acceptBtn) {
                acceptBtn.addEventListener('click', () => {
                    const popup = document.getElementById('cookie-popup');
                    if (popup) popup.remove();
                    localStorage.setItem('cookies-accepted', 'true');
                });
            }
        }
    };
    setupCookies();

    // 6. Инициализация иконок Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});