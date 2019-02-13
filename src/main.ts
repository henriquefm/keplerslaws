import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();

  // Google Analytics
  if ( environment.GOOGLEANALYTICS_ENABLED ) {

    const gAnalyticsScriptSrc = document.createElement('script');
    gAnalyticsScriptSrc.async = true;
    gAnalyticsScriptSrc.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.GOOGLEANALYTICS_TRACKINGID;

    const gAnalyticsScript = document.createElement('script');
    gAnalyticsScript.text = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());

    gtag('config', '${environment.GOOGLEANALYTICS_TRACKINGID}');`;

    document.head.appendChild(gAnalyticsScriptSrc);
    document.head.appendChild(gAnalyticsScript);

  }


}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
