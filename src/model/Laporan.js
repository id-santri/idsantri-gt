import Api from './Api'

/**
 * Data laporan di dalam respons API.
 *
 * @typedef {Object} LaporanData
 * @property {Object} laporan Objek laporan yang dikembalikan server
 */

/**
 * Bentuk respons untuk operasi laporan.
 *
 * @typedef {Object} LaporanResponse
 * @property {string} message Pesan status dari server
 * @property {?LaporanData} data Data respons yang berisi objek `laporan`
 */

class Profile extends Api {
  #endPoint = 'laporan'

  /**
   * Mengambil data laporan.
   *
   * @async
   * @returns {Promise<LaporanResponse>} Respons dengan properti `message`, dan `data.laporan`
   * @throws {LaporanResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const response = await Laporan.getAll()
   * console.log(response.message)
   * console.log(response.data.laporan)
   * // Jika terjadi error
   * catch (error) {
   *   console.error(error.message)
   * }
   */
  async getAll() {
    return this._performFetch(this.#endPoint, {
      method: 'GET',
    })
  }

  /**
   * Mengambil laporan berdasarkan ID.
   *
   * @async
   * @param {string|number} id ID laporan
   * @returns {Promise<LaporanResponse>} Respons dengan properti `message`, dan `data.laporan`
   * @throws {LaporanResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const response = await Laporan.getById(123)
   * console.log(response.data.laporan)
   */
  async getById(id) {
    return this._performFetch(this.#endPoint + '/' + id, {
      method: 'GET',
    })
  }

  /**
   * Membuat laporan baru.
   * Objek `data` dikirim ke server sebagai JSON tanpa perubahan bentuk.
   *
   * @async
   * @param {Object} data Data laporan yang akan dibuat
   * @returns {Promise<LaporanResponse>} Respons dengan properti `message`, dan `data.laporan`
   * @throws {LaporanResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const payload = formData
   * const response = await Laporan.create(payload)
   * console.log(response.data.laporan)
   */
  async create(data) {
    return this._performFetch(this.#endPoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * Memperbarui laporan berdasarkan ID.
   * Objek `data` dikirim ke server sebagai JSON tanpa perubahan bentuk.
   *
   * @async
   * @param {string|number} id ID laporan yang akan diperbarui
   * @param {Object} data Data laporan yang akan diperbarui
   * @returns {Promise<LaporanResponse>} Respons dengan properti `message`, dan `data.laporan`
   * @throws {LaporanResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const payload = formData
   * const response = await Laporan.update(123, payload)
   * console.log(response.data.laporan)
   */
  async update(id, data) {
    return this._performFetch(this.#endPoint + '/' + id, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * Menghapus laporan berdasarkan ID.
   * Respons API tidak memiliki properti `data`.
   *
   * @async
   * @param {string|number} id ID laporan yang akan dihapus
   * @returns {Promise<LaporanResponse>} Respons dengan properti `error` dan `message`
   * @throws {LaporanResponse} Respons server saat status HTTP non-2xx
   * @throws {Error} Koneksi gagal atau permintaan dibatalkan
   *
   * @example
   * const response = await Laporan.remove(123)
   * console.log(response.message)
   */
  async remove(id) {
    return this._performFetch(this.#endPoint + '/' + id, {
      method: 'DELETE',
    })
  }
}

export default new Profile()
