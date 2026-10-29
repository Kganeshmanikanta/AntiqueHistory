
import axios from "axios";

const BASE_URL = "http://localhost:2222/antique";

class AntiqueService {
    insertAntique(antique) {
        return axios.post(`${BASE_URL}/addantique`, antique);
    }

    getAntique(id) {
        return axios.get(`${BASE_URL}/getantique/${id}`);
    }

    getAllAntiques() {
        return axios.get(`${BASE_URL}/getall`);
    }

    updateAntique(id, antique) {
        return axios.put(`${BASE_URL}/updateantique/${id}`, antique);
    }

    deleteAntique(id) {
        return axios.delete(`${BASE_URL}/deleteantique/${id}`);
    }
}

export default new AntiqueService();
