// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyB-fX55Mq9UPjV9iYUY1FAHzpkhalfkjCY',
    authDomain: 'projbirdie.firebaseapp.com',
    databaseURL: 'https://projbirdie.firebaseio.com',
    projectId: 'projbirdie',
    storageBucket: 'projbirdie.appspot.com',
    messagingSenderId: '919024764295',
    appId: '1:919024764295:web:7f57373bc85d9dfea9ff22',
    measurementId: 'G-MNDKQCCGD5',
  },
  database: 'http://localhost:5555/graphql',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
