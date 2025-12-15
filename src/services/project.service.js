import axios from "axios";

class ProjectService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token for authenticated requests (create, update, delete)
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // GET /api/projects - Public
  getAll = () => {
    return this.api.get("/api/projects");
  };

  // GET /api/projects/:id - Public
  getOne = (id) => {
    return this.api.get(`/api/projects/${id}`);
  };

  // POST /api/projects - Admin only
  create = (projectData) => {
    return this.api.post("/api/projects", projectData);
  };

  // PUT /api/projects/:id - Admin only
  update = (id, projectData) => {
    return this.api.put(`/api/projects/${id}`, projectData);
  };

  // DELETE /api/projects/:id - Admin only
  delete = (id) => {
    return this.api.delete(`/api/projects/${id}`);
  };
}

// Create one instance (object) of the service
const projectService = new ProjectService();

export default projectService;
