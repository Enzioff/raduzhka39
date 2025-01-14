import axios from "axios";
import {Fancybox} from "@fancyapps/ui";

enum ModalStatus {
    ACCEPTED = "ACCEPTED",
    ERROR = "ERROR",
}

class Form {
    form;
    url;
    sendBtn
    inputs;
    accept;
    successModal;
    errorModal;
    error;
    
    constructor(form: Element) {
        this.form = form;
        this.url = this.form.getAttribute('action');
        this.sendBtn = this.form.querySelector('button');
        this.accept = this.form.querySelector('[data-accept-form]') as HTMLInputElement;
        this.inputs = [...Array.from(this.form.querySelectorAll('input')), ...Array.from(this.form.querySelectorAll('textarea'))];
        this.successModal = document.querySelector('#success')
        this.errorModal = document.querySelector('#error')
        this.error = false;
        
        this.init()
    }
    
    init() {
        this.changeButtonVisible()
        
        this.accept.addEventListener('change', () => {
            this.changeButtonVisible()
        })
        
        this.form.addEventListener('submit', evt => {
            evt.preventDefault();
            
            this.sendData();
        })
    }
    
    getData = () => {
        const data = new FormData();
        
        this.inputs.forEach((input) => {
            data.append(input.name, input.value);
            
            this.error = input.value.length <= 2;
        })
        
        if (this.error) {
            return 'error';
        } else {
            return data;
        }
    }
    
    sendData = () => {
        if (this.getData() !== 'error') {
            axios.post(this.url, this.getData())
                .then(response => response.data)
                .then(data => {
                    this.showModal(ModalStatus.ACCEPTED);
                    console.log(data);
                    this.inputs.forEach((input) => {
                        input.value = '';
                    })
                })
                .catch(error => {
                    this.showModal(ModalStatus.ERROR, error.message);
                    console.log(error)
                });
        }
    }
    
    changeButtonVisible = () => {
        if (this.accept) {
            !this.accept.checked
                ? this.sendBtn.setAttribute('disabled', '')
                : this.sendBtn.removeAttribute('disabled');
        }
    }
    
    showModal = (status: ModalStatus, message?: string) => {
        if (status === ModalStatus.ACCEPTED) {
            Fancybox.show([this.successModal])
        } else {
            const text = this.errorModal.querySelector('p');
            text.textContent = message;
            Fancybox.show([this.errorModal])
        }
        
        setTimeout(() => {
            Fancybox.close()
        }, 2000)
    }
}

export default Form;