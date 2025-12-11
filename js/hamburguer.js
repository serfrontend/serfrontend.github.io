class HamburguerMenu {
    constructor(config = {}) {
        this.menuButton = document.querySelector(config.button || '[data-hamburger-toggle]');
        this.navMenu = document.querySelector(config.menu || 'nav.nav-menu');
        this.isOpen = false;

        if (!this.menuButton || !this.navMenu) {
            console.warn('Elementos do menu hamburger não encontrados');
            return;
        }

        this.init();
    }

    init() {
        this.setupAria();
        this.attachEventListeners();
        this.setupMenuLinkListeners();
    }

    setupAria() {

        this.menuButton.setAttribute('role', 'button');
        this.menuButton.setAttribute('aria-expanded', 'false');
        this.menuButton.setAttribute('aria-label', 'Abrir menu de navegação');
        this.menuButton.setAttribute('aria-controls', 'main-nav');

        this.navMenu.setAttribute('id', 'main-nav');
        this.navMenu.setAttribute('role', 'navigation');
        this.navMenu.setAttribute('aria-label', 'Menu de navegação principal');
        this.navMenu.setAttribute('aria-hidden', 'true'); // Inicialmente escondido para leitores de tela
    }

    attachEventListeners() {
        this.menuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        document.addEventListener('click', (e) => {
            // Se o menu está aberto e o clique não foi no botão ou no menu
            if (this.isOpen &&
                this.navMenu === e.target) {
                this.closeMenu();
            }
        });

        this.navMenu.addEventListener('click', (e) => {
            // Se clicou em um link
            if (e.target.tagName === 'A') {
                this.closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
                this.menuButton.focus();
            }
        });
    }

    setupMenuLinkListeners() {
        const links = this.navMenu.querySelectorAll('a');
        links.forEach((link) => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.closeMenu();
                }
            });
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.navMenu.classList.add('nav-menu--open');
        this.menuButton.classList.add('hamburger--active');
        this.menuButton.setAttribute('aria-expanded', 'true');
        this.menuButton.setAttribute('aria-label', 'Fechar menu de navegação');
        this.navMenu.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        this.isOpen = false;
        this.navMenu.classList.remove('nav-menu--open');
        this.menuButton.classList.remove('hamburger--active');
        this.menuButton.setAttribute('aria-expanded', 'false');
        this.menuButton.setAttribute('aria-label', 'Abrir menu de navegação');
        this.navMenu.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';
    }

}

