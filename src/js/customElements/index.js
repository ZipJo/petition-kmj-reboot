import KmjCollapse from './KmjCollapse';
import KmjSection from './KmjSection';

export default function registerElements() {
    customElements.define('kmj-section', KmjSection);
    customElements.define('kmj-collapse', KmjCollapse);
}
