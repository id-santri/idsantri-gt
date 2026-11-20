import Api from './Api'

/**
 * Data profil yang dikembalikan API.
 *
 * @typedef {Object} ProfileData
 * @property {Object} gt Data profil Guru Tugas
 */

/**
 * Bentuk respons endpoint profil.
 *
 * @typedef {Object} ProfileResponse
 * @property {boolean} error Menandakan apakah permintaan mengalami error
 * @property {string} message Pesan status dari server
 * @property {?ProfileData} data Data respons yang berisi objek `gt`
 */
class Profile extends Api {
  #endPoint = 'me'

  /**
   * Mengambil profil Guru Tugas berdasarkan token autentikasi yang tersimpan.
   *
   * @async
   * @returns {Promise<ProfileResponse>} Respons dengan properti `message`, dan `data.gt`
   * @throws {ProfileResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const response = await Profile.get()
   * console.log(response.data.gt)
   */
  async get() {
    return this._performFetch(this.#endPoint, {
      method: 'GET',
    })
  }

  /**
   * Memperbarui nomor telepon Guru Tugas berdasarkan token autentikasi yang tersimpan.
   *
   * @async
   * @param {string} nomor_telepon Nomor telepon baru; gunakan string agar awalan seperti `0` tetap terjaga
   * @returns {Promise<ProfileResponse>} Respons dengan properti `message`, dan `data.gt`
   * @throws {ProfileResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const response = await Profile.update('081234567890')
   * console.log(response.message, response.data.gt)
   */
  async update(nomor_telepon) {
    return this._performFetch(this.#endPoint, {
      method: 'POST',
      body: JSON.stringify({ nomor_telepon }),
    })
  }
}

export default new Profile()
