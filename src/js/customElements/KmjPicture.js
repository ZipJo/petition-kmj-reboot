import { getAsset, CF, getPictureNode } from '../contentful';

export default class KmjPicture extends HTMLElement {
    // construct the custom Element and define local fields
    constructor() {
        super();

        const defaultSize = {
            default: { w: 400 },
        };

        this.cfAssetKey = this.getAttribute('data-cf-asset');
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
        const cfAsset = await getAsset(CF.assets[key]);
        if (!cfAsset) return console.warn(`${key} is not a valid contentful asset key: ${CF.assets[key]}`);

        this.asset = cfAsset;
        this.loading = false;
        return Promise.resolve(true);
    }

    async connectedCallback() {
        await this.fetchData(this.cfAssetKey);
    }

    // call render anytime the observer notices a change
    attributeChangedCallback() {
        this.render();
    }

    render() {
        if (this.loading) {
            this.innerHTML = 'Wird geladen...';
        } else {
            const { title, description, file } = this.asset.fields;
            const { sizes } = this;
            if (!title) {
                this.innerHTML = 'Laden nicht möglich...';
                return false;
            }
            const picture = getPictureNode({
                title,
                description,
                file,
                sizes,
            });

            // replace this Element with newly created Element
            this.parentElement.replaceChild(picture, this);
        }
        return true;
    }
}
