import { ApiInstance } from '../api/instance/instance.api'

const buildFormData = (data) => {
  let formData = new FormData()
  if (Array.isArray(data)) {
    // console.info('es un array')
  } else {
    for (const key in data) {
      formData.append(key, data[key])
    }
  }
  return formData
}

export const BASE_SERVICE = {
  /**
   * Post Data
   *
   * @param {string} path url path
   * @param {json} payload payload data
   * @returns
   */
  post: (path, payload) => {
    return ApiInstance.post(path, payload)
  },
  /**
   * Get Data
   *
   * @param {string} path url path
   * @returns
   */
  get: (path) => {
    return ApiInstance.get(path)
  },
  /**
   * Get File blob
   *
   * @param {string} path url path
   * @returns
   */
  getFile: (path) => {
    return ApiInstance.get(path, { responseType: 'blob' })
  },
  /**
   * Put Data
   *
   * @param {string} path url path
   * @param {json} payload payload data
   * @returns
   */
  put: (path, payload) => {
    return ApiInstance.put(path, payload)
  },
  /**
   * Delete Data
   *
   * @param {string} path url path
   * @param {json} payload payload data
   * @returns
   */
  delete: (path, payload) => {
    return ApiInstance.delete(path, payload)
  },
  /**
   * Post Form Data
   *
   * @param {string} path url path
   * @param {json} payload payload data
   * @returns
   */
  postFormData: (path, data) => {
    const payload = buildFormData(data)
    return ApiInstance.post(path, payload)
  },
  /**
   * Put Form Data
   *
   * @param {string} path url path
   * @param {json} payload payload data
   * @returns
   */
  putFormData: (path, data) => {
    const payload = buildFormData(data)
    return ApiInstance.put(path, payload)
  }
}
