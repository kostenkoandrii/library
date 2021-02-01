import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const getUrl = window.location;
const baseUrl = `${getUrl.protocol}//${getUrl.host}${getUrl.pathname.split("/")[0]}`;

const initialState = {
    alertSuccess: {
        title: "",
        status: false
    },
    alertError: {
        title: "",
        status: false
    },
    booksNavigation: {
        books: [],
        totalPages: 0,
    },
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    user : {}
}

document.initialState = initialState

export default new Vuex.Store({
    state: initialState,
    getters: {
        getBooksNavigation: state => {
            return state.booksNavigation
        },
        getAlertSuccess: state => {
            return state.alertSuccess
        },
        getAlertError: state => {
            return state.alertError
        },
        userIsAuthenticated: state => {
            return Boolean(state.accessToken)
        },
    },
    mutations: {
        setAlertSuccess(state, alert) {
            state.alertSuccess.status = alert.status;
            state.alertSuccess.title = alert.title;
            setTimeout(() => state.alertSuccess.status = false, 3000);
            setTimeout(() => state.alertSuccess.title = "", 4000);
        },
        setAlertError(state, alert) {
            state.alertError.status = alert.status;
            state.alertError.title = alert.title;
            setTimeout(() => state.alertError.status = false, 3000);
            setTimeout(() => state.alertError.title = "", 4000);
        },
        setBooksNavigation(state, data) {
            state.booksNavigation.books = data.results
            state.booksNavigation.totalPages = data.total_pages
        },
        setCreatedBook(state, books) {
            state.booksNavigation.books.unshift(books)
        },
        deleteBook(state, pk) {
            const itemIndex = state.booksNavigation.books.findIndex((item) => item.id === pk);
            state.booksNavigation.books.splice(itemIndex, 1);
        },
        setUser(state, user) {
            state.user = user
        },
        deleteTokens(state) {
            state.accessToken = ''
            state.refreshToken = ''
        },
        setTokens(state, access, refresh) {
            state.accessToken = access
            state.refreshToken = refresh
        }
    },
    actions: {
        createUser({commit}, user) {
            return new Promise((resolve, reject) => {
                axios({url: `${baseUrl}/api/book//api/auth/users/`, data: user, method: 'POST'})
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                axios({url: `${baseUrl}/api/auth/jwt/create/`, data: user, method: 'POST'})
                    .then(resp => {
                        const accessToken = resp.data.access
                        const refreshToken = resp.data.refresh
                        localStorage.setItem('accessToken', accessToken)
                        localStorage.setItem('refreshToken', refreshToken)

                        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                        commit('setUser', user.username)
                        commit('setTokens', accessToken, refreshToken)
                        resolve(resp)
                    })
                    .catch(err => {
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        reject(err)
                    })
            })
        },
        updateBook({commit}, payloads) {
            let formData = new FormData();
            Object.entries(payloads.data).forEach((el) => {
                formData.append(el[0], el[1])
            });
            return new Promise((resolve, reject) => {
                axios({url: `${baseUrl}/api/book/${payloads.id}/`, data: formData, method: 'PUT'})
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        createBook({commit}, payloads) {
            let formData = new FormData();
            Object.entries(payloads).forEach((el) => {
                formData.append(el[0], el[1])
            });
            return new Promise((resolve, reject) => {
                axios({url: `${baseUrl}/api/book/`, data: formData, method: 'POST'})
                    .then(resp => {
                        commit('setCreatedBook', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getCurrentBook({commit}, pk) {
            return new Promise((resolve, reject) => {
                axios({url: `${baseUrl}/api/book/${pk}/`, method: 'GET'})
                    .then(resp => {
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        deleteRecord({commit}, pk) {
            return new Promise((resolve, reject) => {
                axios({url: `${baseUrl}/api/book/${pk}/`, method: 'DELETE'})
                    .then(resp => {
                        commit('deleteBook', pk)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        getBooks({commit}, pg) {
            return new Promise((resolve, reject) => {
                axios({url: `${baseUrl}/api/book/?page=${pg}`, method: 'GET'})
                    .then(resp => {
                        commit('setBooksNavigation', resp.data)
                        resolve(resp)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            commit('deleteTokens')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }

    }
})
