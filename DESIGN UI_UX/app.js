// Global app state
const appState = {
    currentUser: null,
    selectedCrops: [],
    currentScreen: 'splash-screen',
    carouselIndex: 0
};

// DOM Elements
const screens = document.querySelectorAll('.screen');
const splashScreen = document.getElementById('splash-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const loginScreen = document.getElementById('login-screen');
const signupScreen = document.getElementById('signup-screen');
const configScreen = document.getElementById('config-screen');
const cropConfigScreen = document.getElementById('crop-config-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const irrigationScreen = document.getElementById('irrigation-screen');
const aiAnalysisScreen = document.getElementById('ai-analysis-screen');
const profileScreen = document.getElementById('profile-screen');
const settingsScreen = document.getElementById('settings-screen');

// Navigation
function navigateTo(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    appState.currentScreen = screenId;
    
    // Update bottom navigation active state
    if (['dashboard-screen', 'irrigation-screen', 'ai-analysis-screen', 'profile-screen'].includes(screenId)) {
        updateBottomNavActiveState(screenId);
    }
    
    // Initialize chart when navigating to AI screen
    if (screenId === 'ai-analysis-screen') {
        initCharts();
    }
}

// Update the active state in bottom navigation
function updateBottomNavActiveState(screenId) {
    const navLinks = document.querySelectorAll('.bottom-nav .nav-item');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkTarget = link.getAttribute('href').substring(1);
        if (screenId.includes(linkTarget)) {
            link.classList.add('active');
        }
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Start with splash screen and transition to welcome screen
    setTimeout(() => {
        navigateTo('welcome-screen');
        startCarouselAnimation();
    }, 3000);

    // Initialize event listeners
    initWelcomeListeners();
    initAuthListeners();
    initConfigListeners();
    initCropConfigListeners();
    initDashboardListeners();
    initIrrigationListeners();
    initAIAnalysisListeners();
    initProfileListeners();
    initSettingsListeners();
});

// Carousel Animation
function startCarouselAnimation() {
    const carouselSlide = document.querySelector('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carouselSlide || !indicators.length) return;
    
    // Auto rotate carousel
    setInterval(() => {
        appState.carouselIndex = (appState.carouselIndex + 1) % 3;
        updateCarousel();
    }, 5000);
    
    // Click on indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            appState.carouselIndex = index;
            updateCarousel();
        });
    });
    
    // Update carousel position and indicators
    function updateCarousel() {
        carouselSlide.style.transform = `translateX(-${appState.carouselIndex * 33.333}%)`;
        
        indicators.forEach((indicator, index) => {
            if (index === appState.carouselIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
}

// Welcome Screen
function initWelcomeListeners() {
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        navigateTo('signup-screen');
    });
}

// Auth Screens
function initAuthListeners() {
    // Signup to Login navigation
    const goToLoginBtn = document.getElementById('go-to-login');
    goToLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('login-screen');
    });

    // Login to Signup navigation
    const goToSignupBtn = document.getElementById('go-to-signup');
    goToSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('signup-screen');
    });

    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;

        if (password !== confirmPassword) {
            showNotification('Erreur', 'Les mots de passe ne correspondent pas', 'error');
            return;
        }

        // Simulate signup success
        appState.currentUser = { name: username, email: email };
        document.getElementById('user-name').textContent = username;
        document.getElementById('profile-name').textContent = username;
        document.getElementById('profile-email').textContent = email;
        
        navigateTo('config-screen');
        showNotification('Succès', 'Inscription réussie', 'success');
    });

    // Login form submission
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Simulate login success
        appState.currentUser = { name: 'Utilisateur', email: email };
        document.getElementById('user-name').textContent = 'Utilisateur';
        document.getElementById('profile-name').textContent = 'Utilisateur';
        document.getElementById('profile-email').textContent = email;
        
        navigateTo('config-screen');
        showNotification('Succès', 'Connexion réussie', 'success');
    });
}

// Initial Configuration
function initConfigListeners() {
    // Language selection
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            languageOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    // Configuration step navigation
    const nextBtns = configScreen.querySelectorAll('.next-btn');
    const backBtns = configScreen.querySelectorAll('.back-btn');
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.closest('.config-step');
            const nextStep = currentStep.nextElementSibling;
            
            if (nextStep) {
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            } else {
                navigateTo('crop-config-screen');
            }
        });
    });
    
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.closest('.config-step');
            const prevStep = currentStep.previousElementSibling;
            
            if (prevStep) {
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
            }
        });
    });

    // Map location selection
    const mapContainer = document.querySelector('.map-container');
    const locationMarker = document.getElementById('location-marker');
    
    mapContainer.addEventListener('click', (e) => {
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        locationMarker.style.left = `${x}px`;
        locationMarker.style.top = `${y}px`;
        locationMarker.style.display = 'block';
    });
}

// Crop Configuration
function initCropConfigListeners() {
    const cropOptions = document.querySelectorAll('.crop-option');
    const cropDetailsForm = document.getElementById('crop-details-form');
    const noCropSelected = cropDetailsForm.querySelector('.no-crop-selected');
    const cropForm = cropDetailsForm.querySelector('.crop-form');
    const selectedCropsList = document.getElementById('selected-crops-list');
    const saveCropBtn = document.querySelector('.save-crop-btn');
    const completeSetupBtn = document.getElementById('complete-setup');
    const backToConfigBtn = document.getElementById('back-to-config');
    
    let selectedCrop = null;

    // Crop selection
    cropOptions.forEach(option => {
        option.addEventListener('click', () => {
            cropOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedCrop = option.getAttribute('data-crop');
            
            noCropSelected.style.display = 'none';
            cropForm.classList.remove('hidden');
        });
    });
    
    // Save crop
    saveCropBtn.addEventListener('click', () => {
        if (!selectedCrop) {
            showNotification('Erreur', 'Veuillez sélectionner une culture', 'error');
            return;
        }
        
        const soilType = document.getElementById('soil-type').value;
        const area = document.getElementById('area').value;
        const plantingDate = document.getElementById('planting-date').value;
        
        if (!soilType || !area || !plantingDate) {
            showNotification('Erreur', 'Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Add to selected crops
        const crop = {
            type: selectedCrop,
            soilType: soilType,
            area: area,
            plantingDate: plantingDate
        };
        
        appState.selectedCrops.push(crop);
        updateSelectedCropsList();
        
        // Reset form
        document.getElementById('soil-type').value = '';
        document.getElementById('area').value = '';
        document.getElementById('planting-date').value = '';
        cropOptions.forEach(opt => opt.classList.remove('selected'));
        noCropSelected.style.display = 'block';
        cropForm.classList.add('hidden');
        selectedCrop = null;
        
        showNotification('Succès', 'Culture ajoutée avec succès', 'success');
    });
    
    // Update crops list
    function updateSelectedCropsList() {
        selectedCropsList.innerHTML = '';
        
        appState.selectedCrops.forEach((crop, index) => {
            const li = document.createElement('li');
            
            let cropName;
            let cropImage;
            
            switch (crop.type) {
                case 'tomate':
                    cropName = 'Tomate';
                    cropImage = 'images/culture_tomate.jpg.png';
                    break;
                case 'laitue':
                    cropName = 'Laitue';
                    cropImage = 'images/lettuce.png';
                    break;
                case 'mais':
                    cropName = 'Maïs';
                    cropImage = 'images/corn.png';
                    break;
            }
            
            li.innerHTML = `
                <div class="crop-info">
                    <img src="${cropImage}" alt="${cropName}" class="crop-icon">
                    <div>
                        <strong>${cropName}</strong>
                        <div>${crop.soilType}, ${crop.area} m²</div>
                    </div>
                </div>
                <div class="crop-actions">
                    <button class="delete-crop" data-index="${index}"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            selectedCropsList.appendChild(li);
        });
        
        // Add delete event listeners
        const deleteButtons = document.querySelectorAll('.delete-crop');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = btn.getAttribute('data-index');
                appState.selectedCrops.splice(index, 1);
                updateSelectedCropsList();
            });
        });
    }
    
    // Complete setup
    completeSetupBtn.addEventListener('click', () => {
        if (appState.selectedCrops.length === 0) {
            showNotification('Erreur', 'Veuillez ajouter au moins une culture', 'error');
            return;
        }
        
        // Navigate to dashboard
        navigateTo('dashboard-screen');
        showNotification('Bienvenue', 'Configuration terminée, bienvenue sur SmartIrrigation!', 'success');
    });
    
    // Back to configuration
    backToConfigBtn.addEventListener('click', () => {
        navigateTo('config-screen');
    });
}

// Dashboard
function initDashboardListeners() {
    const settingsBtn = document.getElementById('settings-access');
    const bottomNavLinks = document.querySelectorAll('.bottom-nav .nav-item');
    
    // Settings access
    settingsBtn.addEventListener('click', () => {
        navigateTo('settings-screen');
    });
    
    // Bottom navigation
    bottomNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            navigateTo(`${target}-screen`);
        });
    });
    
    // Irrigation done button
    const irrigationDoneBtn = document.querySelector('.irrigation-done-btn');
    if (irrigationDoneBtn) {
        irrigationDoneBtn.addEventListener('click', () => {
            showNotification('Irrigation', 'Irrigation marquée comme terminée', 'success');
            irrigationDoneBtn.textContent = 'Irrigation terminée aujourd\'hui';
            irrigationDoneBtn.disabled = true;
        });
    }
}

// Irrigation screen
function initIrrigationListeners() {
    const settingsBtn = document.getElementById('irrigation-settings');
    const tabs = document.querySelectorAll('.detail-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    settingsBtn.addEventListener('click', () => {
        navigateTo('settings-screen');
    });
    
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

// AI Analysis screen
function initAIAnalysisListeners() {
    const settingsBtn = document.getElementById('ai-settings');
    
    settingsBtn.addEventListener('click', () => {
        navigateTo('settings-screen');
    });
}

// Profile screen
function initProfileListeners() {
    const settingsBtn = document.getElementById('profile-settings');
    
    settingsBtn.addEventListener('click', () => {
        navigateTo('settings-screen');
    });
}

// Settings screen
function initSettingsListeners() {
    const backBtn = document.getElementById('settings-back');
    const logoutBtn = document.querySelector('.logout-btn');
    
    backBtn.addEventListener('click', () => {
        // Return to previous screen based on which bottom nav item is active
        const activeNavItem = document.querySelector('.bottom-nav .nav-item.active');
        if (activeNavItem) {
            const target = activeNavItem.getAttribute('href').substring(1);
            navigateTo(`${target}-screen`);
        } else {
            navigateTo('dashboard-screen');
        }
    });
    
    logoutBtn.addEventListener('click', () => {
        // Reset app state
        appState.currentUser = null;
        appState.selectedCrops = [];
        
        // Navigate to welcome screen
        navigateTo('welcome-screen');
        startCarouselAnimation();
    });
}

// Notification system
function showNotification(title, message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationTitle = notification.querySelector('.notification-title');
    const notificationMessage = notification.querySelector('.notification-message');
    const notificationIcon = notification.querySelector('.notification-icon i');
    
    // Set content
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    // Set icon based on type
    notification.className = 'notification';
    notification.classList.add(type);
    
    switch (type) {
        case 'success':
            notificationIcon.className = 'fas fa-check-circle';
            break;
        case 'error':
            notificationIcon.className = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            notificationIcon.className = 'fas fa-exclamation-triangle';
            break;
        default:
            notificationIcon.className = 'fas fa-info-circle';
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
    });
}

// Chart initialization
function initCharts() {
    const chartEl = document.getElementById('irrigation-chart');
    
    if (chartEl && !chartEl.getAttribute('data-initialized')) {
        chartEl.setAttribute('data-initialized', 'true');
        const ctx = chartEl.getContext('2d');
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [
                    {
                        label: 'Tomate (L/m²)',
                        data: [2.5, 2.2, 3.0, 2.8, 2.5, 2.3, 2.7],
                        borderColor: '#E57373',
                        backgroundColor: 'rgba(229, 115, 115, 0.1)',
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Laitue (L/m²)',
                        data: [1.8, 1.5, 2.0, 1.9, 1.7, 1.5, 1.8],
                        borderColor: '#81C784',
                        backgroundColor: 'rgba(129, 199, 132, 0.1)',
                        borderWidth: 2,
                        tension: 0.4
                    },
                    {
                        label: 'Maïs (L/m²)',
                        data: [3.2, 3.0, 3.5, 3.3, 3.1, 3.0, 3.4],
                        borderColor: '#FFD54F',
                        backgroundColor: 'rgba(255, 213, 79, 0.1)',
                        borderWidth: 2,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Besoin en eau (L/m²)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
} 