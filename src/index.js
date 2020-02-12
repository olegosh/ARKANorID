import './index.css';
import './loader.css';

import { addLoader } from './loader';
import { init } from './init';

addLoader();

window.addEventListener('load', init, false);