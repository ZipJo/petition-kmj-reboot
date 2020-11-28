import {
    getAsset, CF, getEntry, getPictureNode,
} from '../contentful';

const reasonEntry = getEntry(CF.entries.sixReasons);

export default class KmjReason extends HTMLElement {
    // construct the custom Element and define local fields
    constructor() {
        super();

        const defaultSize = {
            default: { w: 400 },
        };

        this.reason = this.getAttribute('data-reason');
        this.sizes = { ...defaultSize, ...JSON.parse(this.getAttribute('data-sizes') || '{}') };
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
        const { fields: { images } } = await reasonEntry;
        const { fields: cfAsset } = images[key];
        if (!cfAsset) return console.warn(`${key} is not a valid contentful asset key: ${images[key]}`);

        this.asset = cfAsset;
        this.loading = false;
        return Promise.resolve(true);
    }

    async connectedCallback() {
        await this.fetchData(this.reason);
    }

    // call render anytime the observer notices a change
    attributeChangedCallback() {
        this.render();
    }

    render() {
        if (this.loading) {
            this.innerHTML = 'Wird geladen...';
        } else {
            const { title, description, file } = this.asset;
            const { sizes } = this;
            if (!title) {
                this.innerHTML = 'Laden nicht möglich...';
                return false;
            }
            const containerElem = document.createElement('div');
            const picture = getPictureNode({
                title,
                description,
                file,
                sizes,
                className: this.getAttribute('class'),
            });
            const pictureElem = containerElem.appendChild(document.createElement('div'));
            pictureElem.appendChild(picture);
            const titleElem = containerElem.appendChild(document.createElement('h6'));
            titleElem.innerText = title;
            const textElem = containerElem.appendChild(document.createElement('p'));
            textElem.innerHTML = description;
            // replace this Element with newly created Element
            this.parentElement.replaceChild(containerElem, this);
        }
        return true;
    }
}
