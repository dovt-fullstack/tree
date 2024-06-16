import axios from "axios";

// Địa chỉ cơ bản của API
const BASE_URL = "http://localhost:8080/api/";

const DiseaseGroupApi = {
  async getAll() {
    const url = `${BASE_URL}disease/getAll`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default DiseaseGroupApi;
