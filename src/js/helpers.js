const LINKS = {
    website: 'https://klima-mitbestimmung.jetzt/',
    petition: 'https://epetitionen.bundestag.de/content/petitionen/_2020/_09/_16/Petition_116046.html',
    constact: 'https://klima-mitbestimmung.jetzt/kontakt',
    press: 'https://klima-mitbestimmung.jetzt/presse',
    socialMediaKit: 'https://drive.google.com/file/d/10pcoM48CeBvVOIOTzN5sIlpCOVxSJiON/view?usp=sharing',
    faq: 'https://klima-mitbestimmung.jetzt/faq',
    instagram: 'https://www.instagram.com/klimamitbestimmung/',
    facebook: 'https://www.facebook.com/KlimaMitbestimmungJETZT/',
    twitter: 'https://twitter.com/KMitbestimmung',
    imprint: 'https://klima-mitbestimmung.jetzt/impressum',
};

export const addAutoplayVideoModal = () => {
    document.querySelectorAll('[data-toggle="modal"][data-youtube]').forEach((modalTrigger) => {
        const modalElem = document.querySelector(modalTrigger.getAttribute('data-target'));
        const src = modalTrigger.getAttribute('data-youtube');
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

export const setLinks = () => {
    document.querySelectorAll('[data-href]').forEach((a) => {
        const link = LINKS[a.getAttribute('data-href')];
        if (!link) return console.warn(a.getAttribute('data-href'), 'is not a valid link:', link);
        return a.setAttribute('href', link);
    });
};

export const scrollSpy = () => {
    const header = document.querySelector('[data-header]');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0 && !header.classList.contains('scroll')) {
            header.classList.add('scroll');
        } else if (window.scrollY === 0 && header.classList.contains('scroll')) {
            header.classList.remove('scroll');
        }
    });
};
