export default class KmjCollapse extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // sets and returns 'this.shadowRoot'
    }
}
