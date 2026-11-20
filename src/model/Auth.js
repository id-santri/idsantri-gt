import Api from './Api'

/**
 * Bentuk respons standar dari API.
 *
 * @typedef {Object} AuthResponse
 * @property {string} message Pesan status dari server
 * @property {Object|null} data Data respons; dapat `null` jika tidak ada data
 */
class Auth extends Api {
  /**
   * Menghapus token autentikasi dari penyimpanan lokal browser.
   * Tidak mengirim permintaan untuk mengakhiri sesi di server.
   *
   * @returns {void}
   *
   * @example
   * Auth.logout()
   */
  logout() {
    this._removeToken()
  }

  /**
   * Memeriksa apakah token autentikasi tersimpan di browser.
   * Pemeriksaan ini tidak memastikan token masih berlaku atau diterima server.
   *
   * @returns {boolean} `true` jika token tersedia, selain itu `false`
   *
   * @example
   * if (Auth.isLoggedIn()) {
   *   console.log('Token tersedia di browser')
   * }
   */
  isLoggedIn() {
    return !!this._getToken()
  }

  /**
   * Mendaftarkan pengguna dengan ID GT, kode OTP, dan email.
   *
   * @async
   * @param {string|number} gt_id ID GT pengguna
   * @param {string|number} otp Kode OTP; gunakan string agar nol di depan tetap terjaga
   * @param {string} email Alamat email pengguna
   * @returns {Promise<AuthResponse>} Respons dengan properti, `message`, dan `data`
   * @throws {AuthResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const response = await Auth.register('GT00123', '012345', 'user@mail.com')
   * console.log(response.message)
   * console.log(response.data)
   * // Jika terjadi error
   * catch (error) {
   *   console.error(error.message)
   * }
   */
  async register(gt_id, otp, email) {
    return this._performFetch('register', {
      method: 'POST',
      body: JSON.stringify({ gt_id, otp, email }),
    })
  }

  /**
   * Meminta server mengirim kode OTP ke alamat email.
   *
   * @async
   * @param {string} email Alamat email tujuan pengiriman OTP
   * @returns {Promise<AuthResponse>} Respons dengan properti `message`, dan `data`
   * @throws {AuthResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const response = await Auth.requestOtp('user@mail.com')
   */
  async requestOtp(email) {
    return this._performFetch('request-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  /**
   * Memverifikasi OTP. Jika respons sukses berisi token, token disimpan di browser.
   *
   * @async
   * @param {string} email Alamat email pengguna
   * @param {string|number} otp Kode OTP dari email; gunakan string agar nol di depan tetap terjaga
   * @returns {Promise<AuthResponse>} Respons dengan properti `message`, dan `data`
   * @throws {AuthResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const response = await Auth.verifyOtp('user@mail.com', '012345')
   * console.log(response.message, response.data)
   */
  async verifyOtp(email, otp) {
    const response = await this._performFetch('verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    })
    if (!response.error && response.data?.token) {
      this._saveToken(response.data.token)
    }
    return response
  }
}

export default new Auth()
