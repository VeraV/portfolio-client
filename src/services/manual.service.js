import axios from "axios";

class ManualService {
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

  // GET /api/manuals/:projectId - Get all manuals for a project
  getAllByProject = (projectId) => {
    return this.api.get(`/api/manuals/${projectId}`);
  };

  // POST /api/manuals - Create new manual (Admin only)
  create = (manualData) => {
    return this.api.post("/api/manuals", manualData);
  };

  // PATCH /api/manuals/:id - Update manual (Admin only)
  update = (id, manualData) => {
    return this.api.patch(`/api/manuals/${id}`, manualData);
  };

  // PATCH /api/manuals/:projectId/:id/set-active - Set active manual (Admin only)
  setActive = (projectId, manualId) => {
    return this.api.patch(`/api/manuals/${projectId}/${manualId}/set-active`);
  };

  // DELETE /api/manuals/:id - Delete manual (Admin only)
  delete = (id) => {
    return this.api.delete(`/api/manuals/${id}`);
  };
}

// Create singleton instance
const manualService = new ManualService();

export default manualService;
