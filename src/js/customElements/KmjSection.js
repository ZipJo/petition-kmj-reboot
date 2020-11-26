import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { getEntry, CF } from '../contentful';

export default class KmjSection extends HTMLElement {
    // construct the custom Element, add a shadowDom and define local fields
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

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

    render() {
        if (this.loading) {
            this.shadowRoot.innerHTML = 'Loading...';
        } else {
            const { title, text, images } = this.entry.fields;
            if (!title) return this.shadowRoot.textContent = 'Something went wrong while loading the content!';
            console.log(this.entry.fields);
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
            this.shadowRoot.textContent = '';
            this.shadowRoot.appendChild(section);
        }
    }
}
