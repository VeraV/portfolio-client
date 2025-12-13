import axios from "axios";

class ProjectService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    // No JWT interceptor needed - these are public endpoints
  }

  getAll = () => {
    return this.api.get("/api/projects");
  };

  getOne = (id) => {
    return this.api.get(`/api/projects/${id}`);
  };
}

// Create one instance (object) of the service
const projectService = new ProjectService();

export default projectService;
