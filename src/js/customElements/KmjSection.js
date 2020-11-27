import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getEntry, CF } from '../contentful';

export default class KmjSection extends HTMLElement {
    // construct the custom Element and define local fields
    constructor() {
        super();

        this.cfEntryKey = this.getAttribute('data-cf-entry');
        this.titleSize = this.getAttribute('data-title-size') || 4;
    }

    // observe the loading attribute
    static get observedAttributes() { return ['loading']; }

    // getter and setter for loading, they will be used by attributeChangedCallback
    get loading() {
        return JSON.parse(this.getAttribute('loading'));
    }

    set loading(v) {
        this.setAttribute('loading', JSON.stringify(v));
    }

    // get the stuff from contentful and set loading to true afterwards
    async fetchData(key) {
        this.loading = true;
        const cfEntry = await getEntry(CF.entries[key]);
        if (!cfEntry) return console.warn(`${key} is not a valid contentful entry key: ${CF.entries[key]}`);

        this.entry = cfEntry;
        this.loading = false;
        return Promise.resolve(true);
    }

    async connectedCallback() {
        await this.fetchData(this.cfEntryKey);
    }

    // call render anytime the observer notices a change
    attributeChangedCallback() {
        this.render();
    }

    // main render method
    render() {
        if (this.loading) {
            this.innerHTML = 'Wird geladen...';
        } else {
            const { title, text, images } = this.entry.fields;
            if (!title) {
                this.innerHTML = 'Laden nicht möglich...';
                return false;
            }
            const section = document.createElement('section');

            const titleElem = section.appendChild(document.createElement(`h${this.titleSize}`));
            titleElem.innerText = title;

            if (text) {
                const textElem = section.appendChild(document.createElement('p'));
                textElem.innerHTML = documentToHtmlString(text);
            }
            if (images) {
                console.log(images);
            }
            // replace this Element with newly created Element
            this.parentElement.replaceChild(section, this);
        }
        return true;
    }
}
