class MobileMenu {
    menuBtn;
    menu;
    dropdownHeaders;
    innerElements;
    
    constructor() {
        this.menuBtn = document.querySelector('.header__menu');
        this.menu = document.querySelector('.mobile-menu');
        
        if (!this.menuBtn || !this.menu) return
        
        this.dropdownHeaders = this.menu.querySelectorAll('.mobile-menu__item--dropdown');
        this.innerElements = Array.from(this.dropdownHeaders).map(el => el.querySelector('.mobile-menu__inner'))
        this.init()
    }
    
    init() {
        this.menuBtn.addEventListener('click', () => {
            this.toggle(this.menu)
            this.toggle(this.menuBtn)
            
            if (!this.menuBtn.classList.contains('active')) {
                this.innerElements.forEach(temp => {
                    temp.classList.remove('active')
                    const items = temp.querySelectorAll('.mobile-menu__item');
                    const dropdownEls = Array.from(items).map(el => el.querySelector('.mobile-menu__list'))
                    
                    dropdownEls.forEach(dropdownEl => {
                        if (dropdownEl) {
                            const parentEl = dropdownEl.parentElement;
                            parentEl.classList.remove('active');
                        }
                    })
                })
            }
        })
        
        this.dropdownHeaders.forEach((header) => {
            header.addEventListener('click', () => {
                const inner = header.querySelector('.mobile-menu__inner');
                this.toggle(inner);
            })
        })
        
        this.innerElements.forEach(el => {
            el.addEventListener('click', (evt) => evt.stopPropagation())
            
            const returnBtn = el.querySelector('.mobile-menu__back');
            const items = el.querySelectorAll('.mobile-menu__item');
            const dropdownEls = Array.from(items).map(el => el.querySelector('.mobile-menu__list'))
            
            returnBtn.addEventListener('click', () => {
                el.classList.remove('active');
            })
            dropdownEls.forEach(dropdownEl => {
                if (dropdownEl) {
                    const parentEl = dropdownEl.parentElement;
                    
                    parentEl.addEventListener('click', () => {
                        this.toggle(parentEl)
                    })
                }
            })
        })
    }
    
    toggle = (element: Element) => {
        element.classList.toggle('active');
    }
}

export default MobileMenu
