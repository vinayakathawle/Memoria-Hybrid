import { put, call, takeEvery } from 'redux-saga/effects';
import * as types from 'app/actions/types';
import axios from 'axios';
import * as refreshTokenActions from 'app/actions/refreshTokenActions';
import * as loginActions from 'app/actions/loginActions';
import AsyncStorage from '@react-native-community/async-storage';
import apiconstants from 'app/config/apiconstants';

async function refreshToken() {
    const params = {
        token: await AsyncStorage.getItem('authRefresh')
    };
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8'
    }
    return axios.post(apiconstants.BASE_URL + 'refresh-token', params, {
        headers: headers
    })
    .then((response) => response)
    .catch((error) => {
        if (error.response) {
            return error.response.data
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    });
}

// Our worker Saga that refresh Token
function* refreshTokenAsync() {
    try {
        yield put(refreshTokenActions.enableLoader());

        const response = yield call(refreshToken);

        if (response.status === 200) {
            yield put(refreshTokenActions.disableLoader());
            yield call(storeAuth, response.headers.authorization);
            yield call(storeAuthRefresh, response.headers.x-authorization);
            yield put(loginActions.getUserAccounts());
            return;
        } else if (response.status === 401) {
            yield put(refreshTokenActions.requestRefreshToken());
        } else {
            yield put(refreshTokenActions.disableLoader());
        }
    } catch (error) {
        yield put(refreshTokenActions.disableLoader());
    }
}


function storeAuth(auth) {
    AsyncStorage.setItem('auth', auth);
}

function storeAuthRefresh(authRefresh) {
    AsyncStorage.setItem('authRefresh', authRefresh);
}

export default function* refreshTokenSaga() {
    yield takeEvery(types.REFRESH_TOKEN_REQUEST, refreshTokenAsync);
}
