import KmjCaret from './KmjCaret';
import KmjPicture from './KmjPicture';
import KmjReason from './KmjReason';

export default function registerElements() {
    customElements.define('kmj-caret', KmjCaret);
    customElements.define('kmj-picture', KmjPicture);
    customElements.define('kmj-reason', KmjReason);
}
