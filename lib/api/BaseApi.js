import axios from 'axios'

class BaseApi {
  constructor(accessToken, apiUrl) {
    this.config = {}
    if (accessToken) {
      this.config.headers = { Authorization: `Bearer ${accessToken}` }
    }
    this.apiUrl = process.env.PORTFOLIO_API_URL + apiUrl
  }

  getAll() {
    return axios.get(this.apiUrl)
  }

  getById(id) {
    return axios.get(`${this.apiUrl}/${id}`)
  }

  create(data) {
    return axios.post(this.apiUrl, data, this.config)
  }

  update(id, data) {
    return axios.patch(`${this.apiUrl}/${id}`, data, this.config)
  }

  delete(id) {
    return axios.delete(`${this.apiUrl}/${id}`, this.config)
  }
}

export default BaseApi