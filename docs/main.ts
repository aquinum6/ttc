import { platformBrowser }    from '@angular/platform-browser';

import { AppModuleNgFactory } from '../aot/demo/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);