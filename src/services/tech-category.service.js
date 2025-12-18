import axios from "axios";

class TechCategoryService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });
  }

  // GET /api/tech-category - Public
  getAll = () => {
    return this.api.get("/api/tech-category");
  };
}

// Create singleton instance
const techCategoryService = new TechCategoryService();

export default techCategoryService;
