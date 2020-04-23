import axios from "axios"

import BasePlatformAPI from './basePlatform'
import Song from './../realm/v2/models/Song'
import realm from './../realm/realm'


export default class OnBeatAPI extends BasePlatformAPI {

    async _handleErrors(response) {
        var errors = {}
        if (response.status === 400) {
            // bad request ish

        }
        if (response.status === 401) {
            // unauthorized ish
            await this.refreshToken()
        }
        if (response.status === 403) {
            // forbidden ish

        }
        if (response.status === 404) {
            // not found ish

        }
        else if (response.status === 409) {
            // conflict ish
            var errorKeys = Object.keys(response.data)
            for (var x = 0; x < errorKeys.length; x++) {
                errors[errorKeys[x]] = response.data[errorKeys[x]]
            }
        }
        else if (response.status === 415) {
            // unsupported media type ish
            var errorKeys = Object.keys(response.data)
            for (var x = 0; x < errorKeys.length; x++) {
                errors[errorKeys[x]] = response.data[errorKeys[x]]
            }
        }
        else if (response.status === 417) {
            var errorKeys = Object.keys(response.data)
            for (var x = 0; x < errorKeys.length; x++) {
                if (errorKeys[x] === "profile") {
                    var errorKey2 = Object.keys(response.data[errorKeys[x]])[0]
                    errors[errorKey2] = response.data[errorKeys[x]][errorKey2]
                }
                else {
                    errors[errorKeys[x]] = response.data[errorKeys[x]]
                }
            }
        }
        else if (response.status === 500) {
            // internal server error ish

        }
        else if (response.status === 501) {
            // not implemented error ish

        }
        else if (response.status === 503) {

            // Service unavailable error ish

        }
        return errors
    }

    async _request(endpoint, method, body, authenticated = false) {
        var headers = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        if (authenticated) {
            headers['Authorization'] = `Token ${await this.getToken().accessToken}`
        }
        var numRequestsSent = 0
        var maxRequestAttempts = 2
        var response = null
        var request = { method: method, headers: headers, responseType: "json", data: body } // must assign url before passing to axios
        while (numRequestsSent < maxRequestAttempts) {
            try {
                request.url = `http://127.0.0.1:3380/${endpoint}`
                response = await axios(request)
                break
            }
            catch (error) {
                // console.log(error);
                response = error.response
                response.data = await this._handleErrors(error.response)
                numRequestsSent += 1
            }
        }
        return response
    }

    async makeRequest(endpoint, method, body, authenticated = false, handlePagination = false, pageSize = 100, limit = null) {
        /**
        * Summary: expose this endpoint to make variable requests
        *
        *
        */

        return await this._request(endpoint, method, body, authenticated, handlePagination, pageSize, limit)
    }

    async register(username, email, password) {
        /**
        * Summary: Register new Revibe account.
        *
        * @param {string}   username          username for new account
        * @param {string}   password          password for new account
        * @param {string}   firstName         first name for new account
        * @param {string}   lastName          last name for new account
        * @param {Object}   profile           profile object
        * @param {string}   profile.email     email in profile object
        * @param {string}   [profile.image]   image in profile (optional)
        *
        * @return {Object} Revibe user object, access token, and refresh token
        */

        var data = {
            username: username,
            email: email,
            password1: password,
            password2: password,
        }
        var response = await this._request("account/rest-auth/registration/", "POST", data)
        // console.log(response)
        if (response.data.hasOwnProperty("key")) {
            var token = response.data.key
            console.log(token);
            
            await this.saveToken(token)
        }
        console.log(await this.getToken());
        
        return response.data
    }

    // async login(username, password) {
    //     /**
    //     * Summary: Login to Revibe account (required implementation).
    //     *
    //     * @see  BasePlatformAPI
    //     *
    //     * @param {string}   username    username associated with an account
    //     * @param {string}   password    password associated with an account
    //     *
    //     * @return {Object} Revibe user object, access token, and refresh token
    //     */

    //     var data = {
    //         username: username,
    //         password: password,
    //     }
    //     var response = await this._request("account/rest-auth/login/", "POST", data)
    //     if (response.data.hasOwnProperty("key")) {
    //         var token = response.data.key,
    //         // save token to realm
    //         this.saveToken(token)

    //         return response.data.user
    //     }
    //     return response.data
    // }

    async logout() {
        /**
        * Summary: Logout of Revibe account (required implementation).
        *
        * @see  BasePlatformAPI
        *
        */

        var token = await this.getToken()
        var data = { token: token.accessToken }
        await this._request("account/auth/logout/", "POST", data)
        token.delete()
        this.library.delete()
    }

}
