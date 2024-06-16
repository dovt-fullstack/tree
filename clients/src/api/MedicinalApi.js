import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

const MedicinalApi = {
  async getAll(page, limit) {
    const url = `${BASE_URL}medicinal/getall?page=${page}&limit=${limit}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async search(query, page, limit) {
    const url = `${BASE_URL}medicinal/search?query=${query}&page=${page}&limit=${limit}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getById(id) {
    const url = `${BASE_URL}medicinal/getById/` + id;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getByDiseaseId(diseaseId, page, limit) {
    const url = `${BASE_URL}medicinal/getByDiseaseId/${diseaseId}&page=${page}&limit=${limit}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async getComments(medicinalId) {
    const url = `${BASE_URL}comments/${medicinalId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  async addComment(commentData) {
    const url = `${BASE_URL}comments`;
    try {
      const response = await axios.post(url, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default MedicinalApi;
