import router from '../router'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faXmark, faArrowLeft,faArrowRight, faMagnifyingGlass,faCartShopping , faStar} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faSquareInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

library.add(faArrowLeft, faArrowRight, faFacebook, faSquareInstagram, faLinkedin, faMagnifyingGlass, faCartShopping, faStar, faXmark, faBars);
import type { App } from 'vue'
import { createPinia } from 'pinia';

const pinia = createPinia();

export function registerPlugins (app: App) {
  app
    .use(pinia)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon);
}