import { Platform } from 'react-native';

const androidCredentials = {
    clientId: '477172201428-d4itaavfim965bvrq8m90369vnku6icb.apps.googleusercontent.com',
    appId: '1:477172201428:android:a3d0019a1ffcd1ee57c841',
    apiKey: 'AIzaSyCKc-eGyzJhDV5v2BCtt5CKQej75d2ldrc',
    databaseURL: 'https://memoria-dev.firebaseio.com',
    storageBucket: 'memoria-dev.appspot.com',
    messagingSenderId: '477172201428',
    projectId: 'memoria-dev',
    persistence: true,
};

const iosCredentials = {
    clientId: '477172201428-tat1iqarelcelvcdjvkp7lsbire0rk12.apps.googleusercontent.com',
    appId: '1:477172201428:ios:1b0e156ade8deb2c57c841',
    apiKey: 'AIzaSyD-SWFnwDI11RdWjHQY1T3hwW4KUE37K5A',
    databaseURL: 'https://memoria-dev.firebaseio.com',
    storageBucket: 'memoria-dev.appspot.com',
    messagingSenderId: '477172201428',
    projectId: 'memoria-dev',
    persistence: true,
};

const credentials = Platform.select({
    android: androidCredentials,
    ios: iosCredentials,
});

export default credentials;
