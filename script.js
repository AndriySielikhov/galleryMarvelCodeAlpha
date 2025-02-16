document.addEventListener('DOMContentLoaded', function () {
    const continueButton = document.getElementById('continue-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    
    const sections = {
        home: document.getElementById('home-section'),
        heroes: document.getElementById('heroes-section'),
        contacts: document.getElementById('contacts-section')
    };

    // Перехід з welcome screen до main
    continueButton.addEventListener('click', function () {
        welcomeScreen.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Додаємо обробники для меню
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Відміняємо перехід за посиланням

            // Отримуємо секцію з data-атрибуту
            const sectionName = this.getAttribute('href').replace('#', '');

            // Ховаємо всі секції
            Object.values(sections).forEach(section => {
                section.style.display = 'none';
            });

            // Показуємо вибрану секцію
            if (sections[sectionName]) {
                sections[sectionName].style.display = 'block';
            }
        });
    });
    
    // Перша частина - герої
    const heroItems = document.querySelectorAll('.hero-item'); // Елементи списку героїв
    const heroes = document.querySelectorAll('.hero'); // Всі герої (контейнери)

    // Об'єкт для зображень кожного героя
    const heroImages = {
        hero1: document.querySelectorAll('.hero1-images'),
        hero2: document.querySelectorAll('.hero2-images'),
        hero3: document.querySelectorAll('.hero3-images'),
        hero4: document.querySelectorAll('.hero4-images')
    };

    // Функція для зміни зображень героя
    function showHeroImages(hero) {
        // Спочатку приховуємо всі зображення
        Object.keys(heroImages).forEach(heroKey => {
            heroImages[heroKey].forEach(img => img.classList.add('hidden'));
        });

        // Потім показуємо зображення для вибраного героя
        heroImages[hero].forEach(img => img.classList.remove('hidden'));
    }

    // Обробник для вибору героя
    heroItems.forEach(item => {
        item.addEventListener('click', function() {
            const heroId = item.getAttribute('data-hero'); // Визначаємо героя за атрибутом data-hero

            // Приховуємо всіх героїв
            heroes.forEach(hero => {
                hero.classList.add('hidden');
            });

            // Відображаємо відповідного героя
            const selectedHero = document.querySelector(`.${heroId}`);
            selectedHero.classList.remove('hidden');

            // Оновлюємо зображення для цього героя
            showHeroImages(heroId);
        });
    });

    // Додаємо другий блок: активізація героїв при натисканні на кнопки
    const heroNameElement = document.getElementById('hero-name');
    const heroNameUnderline = document.querySelector('.hero-name-underline');

    // Отримуємо усі кнопки на правій панелі
    heroItems.forEach(item => {
        item.addEventListener('click', function() {
            // Видаляємо клас active з усіх кнопок і заголовків
            heroItems.forEach(button => button.classList.remove('active'));
            document.querySelectorAll('.hero1, .hero2, .hero3, .hero4').forEach(hero => hero.classList.remove('active'));

            // Додаємо клас active для поточної кнопки
            item.classList.add('active');

            // Змінюємо назву і кольорову підсвітку на основі натиснутого героя
            const heroType = item.getAttribute('data-hero');
            heroNameElement.textContent = item.textContent;

            // Оновлюємо кольорову підсвітку
            document.querySelector(`.${heroType}`).classList.add('active');
        });
    });


    // Оголошення змінних для модального вікна та кнопок
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    let currentHeroImages = []; // Массив для зображень поточного героя
    let currentImageIndex = 0; // Індекс поточного зображення

    // Функція для відкриття модального вікна
    function openModal(heroImages, index) {
        currentHeroImages = heroImages;
        currentImageIndex = index;
        modalImage.src = currentHeroImages[currentImageIndex].src;
        modal.style.display = 'block';
    }

    // Функція для закриття модального вікна
    function closeModalWindow() {
        modal.style.display = 'none';
    }

    // Функції для перелистування зображень
    function showPrevImage() {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentHeroImages.length - 1;
        modalImage.src = currentHeroImages[currentImageIndex].src;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex < currentHeroImages.length - 1) ? currentImageIndex + 1 : 0;
        modalImage.src = currentHeroImages[currentImageIndex].src;
    }

    // Додавання слухачів подій для кожного зображення
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
        container.addEventListener('click', function () {
            const heroImages = Array.from(container.parentElement.getElementsByClassName(container.classList[0]));
            const index = heroImages.indexOf(container);
            openModal(heroImages, index);
        });
    });

    // Кнопки навігації
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Закрити модальне вікно при натисканні на хрестик
    closeModal.addEventListener('click', closeModalWindow);

    // Закрити модальне вікно при натисканні за межами зображення
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModalWindow();
        }
    });

      
});






