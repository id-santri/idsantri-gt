import config from '../config'
class Api {
  #BASE_URL = config.BASE_API + config.END_API
  #TOKEN_KEY = 'gt-app-token'

  _saveToken(token) {
    localStorage.setItem(this.#TOKEN_KEY, token)
  }

  _getToken() {
    return localStorage.getItem(this.#TOKEN_KEY)
  }

  _removeToken() {
    localStorage.removeItem(this.#TOKEN_KEY)
  }

  async _performFetch(endPoint, options = {}) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const token = this._getToken()

    const finalOptions = {
      ...options,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'X-Timezone': timezone,
        'Content-Type': 'application/json',
      },
    }
    let response
    let responseText
    try {
      response = await fetch(this.#BASE_URL + '/' + endPoint, finalOptions)
      responseText = await response.text()
    } catch (error) {
      throw new Error(
        error.name === 'AbortError' ? 'Permintaan dibatalkan' : 'Gagal terhubung ke server',
        { cause: error },
      )
    }

    let responseJson = null
    if (responseText) {
      try {
        responseJson = JSON.parse(responseText)
      } catch {
        return {
          error: true,
          message: response.ok
            ? 'Respons server bukan JSON yang valid'
            : `Permintaan gagal (HTTP ${response.status})`,
          type: 'error',
          data: responseText,
        }
      }
    }

    if (!response.ok) {
      throw responseJson
    }
    return responseJson
  }
}

export default Api
