import './scss/main.scss';
import 'bootstrap';
import registerElements from './js/customElements';
import { setContent } from './js/contentful';

setContent();
registerElements();
