import 'bootstrap';
import './scss/main.scss';
import { setContent } from './js/contentful';
import registerElements from './js/customElements';
import { setLinks, addAutoplayVideoModal } from './js/helpers';

setContent();
registerElements();
setLinks();
addAutoplayVideoModal();
