import './scss/main.scss';
import 'bootstrap';
import registerElements from './js/customElements';
import { setContent } from './js/contentful';

const addAutoplayVideoModal = () => {
    document.querySelectorAll('[data-toggle="modal"]').forEach((modalTrigger) => {
        const modalElem = document.querySelector(modalTrigger.getAttribute('data-target'));
        const src = modalTrigger.getAttribute('data-src');
        const srcAuto = `${src}?autoplay=1`;
        if (!modalElem || !src) return;

        // for whatever weird reason, bootstrap events don't seem to fire - using a mutationObserver instead
        const modalObserver = new MutationObserver((mutations) => {
            mutations.forEach((mu) => {
                if (!mu.target.classList.contains('show')) {
                    modalElem.querySelector('iframe').setAttribute('src', src);
                }
            });
        });

        modalTrigger.addEventListener('click', () => {
            modalElem.querySelector('iframe').setAttribute('src', srcAuto);
        });
        modalObserver.observe(modalElem, { attributes: true, attributeFilter: ['class'] });
    });
};

setContent();
registerElements();
addAutoplayVideoModal();
