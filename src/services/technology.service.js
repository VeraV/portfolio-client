import axios from "axios";

class TechnologyService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token for authenticated requests (create)
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // GET /api/technology - Public
  getAll = () => {
    return this.api.get("/api/technology");
  };

  // POST /api/technology - Admin only
  create = (technologyData) => {
    return this.api.post("/api/technology", technologyData);
  };
}

// Create singleton instance
const technologyService = new TechnologyService();

export default technologyService;
