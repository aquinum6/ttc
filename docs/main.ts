import { platformBrowser }    from '@angular/platform-browser';

//noinspection TypeScriptCheckImport
import { AppModuleNgFactory } from '../aot/demo/app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);