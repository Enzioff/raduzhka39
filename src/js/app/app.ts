import Slider from "./slider";
import {Fancybox} from "@fancyapps/ui";
import Mask from "./mask";
import MobileMenu from "./mobile-menu";
import Tabs from "./tabs";
import Video from "./video";
import Form from "./form";

class App {
    constructor() {
        this.init();
    }
    
    init = () => {
        this.createSlider()
        this.createFancybox()
        this.createMask()
        this.createMobileMenu()
        this.createShowMore()
        this.createTabs()
        this.createVideo()
        this.createForm()
    }
    
    createSlider = () => {
        const sliders = document.querySelectorAll('[data-slider]')
        if (!sliders) return
        sliders.forEach(slider => {
            new Slider(slider)
        })
    }
    
    createFancybox = () => {
        Fancybox.bind('[data-fancybox]', {
            defaultType: 'inline',
        })
    }
    
    createMask = () => {
        new Mask();
    }
    
    createMobileMenu = () => {
        new MobileMenu()
    }
    
    createShowMore = () => {
        const showMoreBtn = document.querySelectorAll('[data-show-more]');
        if (!showMoreBtn) return
        
        showMoreBtn.forEach(el => {
            const textElement = el.querySelector('span')
            const innerText = textElement.textContent.trim();
            
            el.addEventListener('click', (evt) => {
                evt.preventDefault()
                const content = el.parentElement.querySelector('[data-content]');
                const textContent = el.parentElement.querySelector('[data-text-content]')
                if (content) {
                    content.classList.toggle('active')
                    if (content.classList.contains('active')) {
                        textElement.textContent = 'Свернуть'
                        el.classList.add('active')
                    } else {
                        textElement.textContent = innerText
                        el.classList.remove('active')
                    }
                }
                if (textContent) {
                    textContent.classList.toggle('text-visible')
                    if (textContent.classList.contains('text-visible')) {
                        textElement.textContent = 'Свернуть'
                        el.classList.add('active')
                    } else {
                        textElement.textContent = innerText
                        el.classList.remove('active')
                    }
                }
            })
        })
    }
    
    createTabs = () => {
        const tabs = document.querySelectorAll('[data-tabs]');
        if (!tabs) return
        
        tabs.forEach(tab => {
            new Tabs(tab)
        })
    }
    
    createVideo = () => {
        const videos = document.querySelectorAll('[data-video]');
        if (!videos) return
        
        videos.forEach(video => {
            new Video(video)
        })
    }
    
    createForm = () => {
        const forms = document.querySelectorAll('.form');
        if (!forms) return
        forms.forEach(form => {
            new Form(form)
        })
    }
}

export {App};



