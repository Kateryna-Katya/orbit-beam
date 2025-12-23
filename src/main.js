document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация Lenis (Smooth Scroll)
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Мобильное меню
    const burger = document.getElementById('burger-trigger');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        mobileMenu.classList.toggle('mobile-menu--active');
        body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('burger--active');
            mobileMenu.classList.remove('mobile-menu--active');
            body.style.overflow = '';
        });
    });

    // 3. Анимация HERO (GSAP + SplitType)
    const heroTitle = new SplitType('#hero-title', { types: 'lines,words' });
    
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from('.hero__badge', {
        y: -50,
        opacity: 0,
        duration: 0.8
    })
    .from(heroTitle.words, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05
    }, "-=0.4")
    .from('.hero__subtitle', {
        x: -50,
        opacity: 0,
        duration: 0.8
    }, "-=0.6")
    .from('.hero__btns .btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2
    }, "-=0.4")
    .from('.hero__card', {
        y: 100,
        rotate: 5,
        opacity: 0,
        duration: 1
    }, "-=0.5");

    // 4. Инициализация иконок Lucide
    lucide.createIcons();
});