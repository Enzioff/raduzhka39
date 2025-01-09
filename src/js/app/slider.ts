import Swiper from "swiper";
import {EffectCoverflow, Navigation, Pagination, Thumbs} from "swiper/modules";

class Slider {
    el;
    sliderType;
    buttonPrev;
    buttonNext;
    slidesCount;
    pagination;
    desktopOnly;
    mobileOnly;
    media;
    isAuto;
    
    constructor(el: Element) {
        this.el = el;
        this.sliderType = this.el.getAttribute('data-slider');
        this.slidesCount = this.el.getAttribute('data-slides')
        this.isAuto = this.el.hasAttribute('data-auto');
        
        this.buttonPrev = this.el.querySelector('.swiper-btn-prev');
        this.buttonNext = this.el.querySelector('.swiper-btn-next');
        this.pagination = this.el.querySelector('.swiper-pagination');
        
        this.media = matchMedia('(max-width: 1199px)');
        this.desktopOnly = this.el.hasAttribute('data-desktop-only');
        this.mobileOnly = this.el.hasAttribute('data-mobile-only');
        
        this.init();
    }
    
    init() {
        switch (this.sliderType) {
        case 'default':
            this.initDefaultSlider();
            break;
        case 'cards':
            this.initCardsSlider();
            break;
        case 'thumbs':
            this.initThumbsSlider();
            break;
        case 'carousel':
            this.initCarouselSlider();
            break;
        case 'auto':
            this.initAutoSlider();
            break;
        }
    }
    
    initDefaultSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination],
            slidesPerView: this.slidesCount ? this.slidesCount : 1,
            spaceBetween: 35,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'slider__btn--disabled'
            },
            pagination: {
                el: '.swiper-pagination',
            }
        })
    }
    
    initCardsSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [Navigation, Pagination],
            slidesPerView: this.isAuto ? 'auto' : 1,
            spaceBetween: 10,
            watchSlidesProgress: true,
            navigation: {
                prevEl: this.buttonPrev,
                nextEl: this.buttonNext,
                disabledClass: 'slider__btn--disabled'
            },
            pagination: {
                el: '.swiper-pagination',
            },
            breakpoints: {
                1950: {
                    slidesPerView: 4,
                    spaceBetween: 35,
                },
                1399: {
                    slidesPerView: 3,
                    spaceBetween: 35,
                },
                768: {
                    slidesPerView: this.isAuto ? 'auto' : 2,
                    spaceBetween: 20,
                }
            },
        })
    }
    
    initThumbsSlider() {
        const slider = this.el.querySelector('.swiper');
        const thumb = document.querySelector('[data-slider="thumb"]');
        const thumbSwiper = thumb.querySelector('.swiper');
        
        const thumbSlider = new Swiper(thumbSwiper, {
            slidesPerView: 3,
            spaceBetween: 8,
            breakpoints: {
                1199: {
                    spaceBetween: 30,
                }
            }
        })
        
        new Swiper(slider, {
            modules: [Navigation, Pagination, Thumbs],
            slidesPerView: 1,
            spaceBetween: 10,
            thumbs: {
                swiper: thumbSlider,
            },
        })
    }
    
    initCarouselSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            modules: [EffectCoverflow],
            slidesPerView: 3,
            spaceBetween: 10,
            effect: "coverflow",
            centeredSlides: true,
            initialSlide: 2,
            loop: true,
            coverflowEffect: {
                rotate: 30,
                stretch: 0,
                depth: -30,
                modifier: 1,
                slideShadows: false,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                    coverflowEffect: {
                        rotate: 15,
                        stretch: -10,
                        depth: -80,
                        modifier: 1,
                        slideShadows: false,
                    },
                }
            }
        })
    }
    
    initAutoSlider() {
        const slider = this.el.querySelector('.swiper');
        new Swiper(slider, {
            slidesPerView: 'auto',
            spaceBetween: 16,
        })
    }
}

export default Slider
