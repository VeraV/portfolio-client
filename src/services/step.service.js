import axios from "axios";

class StepService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token for authenticated requests
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // POST /api/steps - Create new step (Admin only)
  create = (stepData) => {
    return this.api.post("/api/steps", stepData);
  };

  // PATCH /api/steps/:stepId - Update step (Admin only)
  update = (stepId, stepData) => {
    return this.api.patch(`/api/steps/${stepId}`, stepData);
  };
}

// Create singleton instance
const stepService = new StepService();

export default stepService;
