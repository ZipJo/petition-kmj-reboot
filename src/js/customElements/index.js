import KmjCollapse from './KmjCollapse';
import KmjPicture from './KmjPicture';
import KmjSection from './KmjSection';

export default function registerElements() {
    customElements.define('kmj-section', KmjSection);
    customElements.define('kmj-collapse', KmjCollapse);
    customElements.define('kmj-picture', KmjPicture);
}
