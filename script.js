// script.js - обновленная версия с поддержкой умного хедера для мобильных

// Глобальные переменные для товаров
let allProducts = [];

// Общие функции для всего сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    initializeCart();
    
    // Инициализация избранного
    initializeWishlist();
    
    // Загрузка выбранного города
    loadSelectedCity();
    
    // Обновление счетчиков
    updateCartCount();
    updateFavoritesCount();
    
    // Обработка формы поиска
    setupSearch();
    
    // Настройка мобильного хедера
    setupMobileHeaderBehavior();
    
    // Загрузка товаров
    loadAllProducts();
});

// Настройка поведения хедера на мобильных
function setupMobileHeaderBehavior() {
    const header = document.querySelector('.main-header');
    if (!header) return;
    
    if (window.innerWidth <= 768) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateHeader() {
            if (window.innerWidth <= 768) {
                if (lastScrollY < 10) {
                    header.style.transform = 'translateY(calc(-100% + 60px))';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
        
        // Показываем хедер при наведении
        header.addEventListener('mouseenter', function() {
            if (window.innerWidth <= 768) {
                header.style.transform = 'translateY(0)';
            }
        });
        
        // Показываем хедер при таче
        header.addEventListener('touchstart', function() {
            if (window.innerWidth <= 768) {
                header.style.transform = 'translateY(0)';
            }
        });
        
        // Скрываем хедер через 3 секунды после скролла
        let hideTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(hideTimeout);
            if (window.innerWidth <= 768 && window.scrollY > 100) {
                hideTimeout = setTimeout(() => {
                    if (window.scrollY > 100) {
                        header.style.transform = 'translateY(calc(-100% + 60px))';
                    }
                }, 3000);
            }
        });
    }
}

// Загрузка всех товаров
function loadAllProducts(callback) {
    if (allProducts.length > 0 && callback) {
        callback(allProducts);
        return;
    }
    
    // Данные товаров
    allProducts = [
        {
            id: 1,
            name: "Ноутбук Acer 1540BA-CO065T (8GB)",
            description: "Прочный и надежный. Специальная схема эксплуатации. Черный цвет.",
            price: 15658,
            status: "Новый",
            category: "notebooks",
            cities: ["Уссурийск", "Хабаровск", "Владивосток"],
            specs: { ram: "8GB", color: "Черный", processor: "Intel Core i3", screen: "15.6 дюймов" }
        },
        {
            id: 2,
            name: "Ноутбук HP15-2Z7Zur (512GB)",
            description: "Прочный и надежный. Работает только от сети. Черный цвет.",
            price: 7199,
            status: "Уцененный",
            category: "notebooks",
            cities: ["Уссурийск", "Находка"],
            specs: { storage: "512GB", color: "Черный", processor: "Intel Celeron", screen: "15.6 дюймов" }
        },
        {
            id: 3,
            name: "Ноутбук Huawei Honor MagicBook 14 (13.6'/256GB)",
            description: "Ультрабук с тонким корпусом. Отличное состояние.",
            price: 22500,
            status: "Почти новый",
            category: "notebooks",
            cities: ["Хабаровск", "Большой Камень"],
            specs: { screen: "13.6'", storage: "256GB", processor: "AMD Ryzen 5", ram: "8GB" }
        },
        {
            id: 4,
            name: "Игровая приставка Sony Playstation 4 Pro (1TB)",
            description: "Мощная игровая консоль. В комплекте 1 контроллер.",
            price: 23999,
            status: "Почти новый",
            category: "consoles",
            cities: ["Хабаровск", "Уссурийск"],
            specs: { storage: "1TB", model: "CUH-7208B", hdmi: "2.0", wifi: "802.11ac" }
        },
        {
            id: 5,
            name: "Игровой контроллер Sony Playstation 4 Dualshock",
            description: "Оригинальный контроллер Dualshock 4. Цвет черный.",
            price: 899,
            status: "Уцененный",
            category: "consoles",
            cities: ["Все города"],
            specs: { color: "Черный", model: "Dualshock 4", battery: "Встроенная", connection: "Bluetooth" }
        },
        {
            id: 6,
            name: "Смартфон Samsung Galaxy S21 5G (8/256GB)",
            description: "Флагманский смартфон. Отличное состояние, полный комплект.",
            price: 34999,
            status: "Почти новый",
            category: "phones",
            cities: ["Владивосток", "Хабаровск"],
            specs: { ram: "8GB", storage: "256GB", model: "SM-G991N", screen: "6.2 дюймов" }
        },
        {
            id: 7,
            name: "Ноутбук Colorful EVOL X13 AT25 (13.6'/512GB)",
            description: "Игровой ноутбук с мощной видеокартой. Идеален для гейминга.",
            price: 68999,
            status: "Новый",
            category: "notebooks",
            cities: ["Уссурийск"],
            specs: { screen: "13.6'", storage: "512GB", processor: "Intel Core i7", gpu: "NVIDIA RTX 3050" }
        },
        {
            id: 8,
            name: "Ноутбук HP 15-6005sr (13.6'/1TB)",
            description: "Ноутбук для работы и учебы. Большой объем памяти.",
            price: 18999,
            status: "Уцененный",
            category: "notebooks",
            cities: ["Находка", "Большой Камень"],
            specs: { screen: "13.6'", storage: "1TB", processor: "AMD Ryzen 3", ram: "8GB" }
        }
    ];
    
    if (callback) {
        callback(allProducts);
    }
}

// Корзина
let cart = [];

function initializeCart() {
    const savedCart = localStorage.getItem('zelectronicCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function addToCart(productId, quantity = 1) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: getProductIcon(product.category)
            });
        }
        
        saveCart();
        updateCartCount();
        showNotification('Товар добавлен в корзину!');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    showNotification('Товар удален из корзины');
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function saveCart() {
    localStorage.setItem('zelectronicCart', JSON.stringify(cart));
}

// Избранное
let wishlist = [];

function initializeWishlist() {
    const savedWishlist = localStorage.getItem('zelectronicWishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

function toggleWishlist(productId, buttonElement = null) {
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
        // Добавляем в избранное
        wishlist.push(productId);
        
        if (buttonElement) {
            // Обновляем иконку и цвет кнопки
            const icon = buttonElement.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-heart';
                buttonElement.style.color = '#e74c3c';
            }
        }
        
        showNotification('Товар добавлен в избранное');
    } else {
        // Удаляем из избранного
        wishlist.splice(index, 1);
        
        if (buttonElement) {
            // Обновляем иконку и цвет кнопки
            const icon = buttonElement.querySelector('i');
            if (icon) {
                icon.className = 'far fa-heart';
                buttonElement.style.color = '#ccc';
            }
        }
        
        showNotification('Товар удален из избранного');
    }
    
    localStorage.setItem('zelectronicWishlist', JSON.stringify(wishlist));
    updateFavoritesCount();
}

function updateFavoritesCount() {
    const wishlistCountElements = document.querySelectorAll('.favorites-count');
    wishlistCountElements.forEach(element => {
        element.textContent = wishlist.length;
    });
}

// Города
function loadSelectedCity() {
    const selectedCity = localStorage.getItem('selectedCity') || 'Все города';
    const cityElements = document.querySelectorAll('.current-city');
    
    cityElements.forEach(element => {
        element.textContent = selectedCity;
    });
}

function selectCity(cityName) {
    localStorage.setItem('selectedCity', cityName);
    loadSelectedCity();
    showNotification(`Город изменен на: ${cityName}`);
}

// Поиск
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `catalog.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
        
        // На мобильных устройствах фокусируемся на поиске
        if (window.innerWidth <= 768) {
            searchInput.addEventListener('focus', () => {
                const header = document.querySelector('.main-header');
                if (header) {
                    header.style.transform = 'translateY(0)';
                }
            });
        }
    }
}

// Уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        min-width: 300px;
        max-width: 400px;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    /* Улучшение для мобильных уведомлений */
    @media (max-width: 768px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
            min-width: auto;
            text-align: center;
            font-size: 13px;
            padding: 12px 20px;
        }
    }
`;

if (!document.querySelector('#notification-styles')) {
    style.id = 'notification-styles';
    document.head.appendChild(style);
}

// Функции для работы с товарами
function getProductIcon(category) {
    switch(category) {
        case 'notebooks': return 'laptop';
        case 'phones': return 'mobile-alt';
        case 'consoles': return 'gamepad';
        case 'appliances': return 'tv';
        case 'audio': return 'headphones';
        case 'accessories': return 'keyboard';
        default: return 'box';
    }
}

// Функция для фильтрации товаров
function filterProducts(products, filters) {
    return products.filter(product => {
        // Фильтр по категории
        if (filters.category && product.category !== filters.category) {
            return false;
        }
        
        // Фильтр по статусу
        if (filters.status && product.status !== filters.status) {
            return false;
        }
        
        // Фильтр по городу
        const selectedCity = localStorage.getItem('selectedCity') || 'Все города';
        if (selectedCity !== 'Все города') {
            if (!product.cities.includes(selectedCity) && !product.cities.includes('Все города')) {
                return false;
            }
        }
        
        // Фильтр по цене
        if (filters.minPrice && product.price < filters.minPrice) {
            return false;
        }
        
        if (filters.maxPrice && product.price > filters.maxPrice) {
            return false;
        }
        
        // Фильтр по поиску
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            const productText = `${product.name} ${product.description}`.toLowerCase();
            if (!productText.includes(searchTerm)) {
                return false;
            }
        }
        
        return true;
    });
}

// Функция для сортировки товаров
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'price_asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price_desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name_asc':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'name_desc':
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return sorted;
    }
}

// Функция для проверки, есть ли товар в избранном
function isInWishlist(productId) {
    return wishlist.includes(productId);
}

// Функция для открытия страницы товара
function openProductPage(productId) {
    window.location.href = `product.html?id=${productId}`;
}