import { useState, useEffect } from "react";
import projectService from "../../services/project.service";
import HeroSection from "../../components/HeroSection/HeroSection";
import ProjectsSection from "../../components/ProjectsSection/ProjectsSection";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import Loading from "../../components/Loading/Loading";

// Helper function to extract unique technologies from all projects
const extractUniqueTechnologies = (projects) => {
  const techMap = new Map();
  projects.forEach((project) => {
    project.techStack.forEach((ts) => {
      if (!techMap.has(ts.technology.id)) {
        techMap.set(ts.technology.id, ts.technology);
      }
    });
  });
  return Array.from(techMap.values());
};

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Fetch projects function (reusable)
  const fetchProjects = () => {
    setIsLoading(true);
    projectService
      .getAll()
      .then((response) => {
        const projectsData = response.data;
        setProjects(projectsData);

        // Extract unique technologies from projects
        const uniqueTechs = extractUniqueTechnologies(projectsData);
        setTechnologies(uniqueTechs);

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Fetch all projects on component mount
    fetchProjects();
  }, []);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
          <p className="font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  // Admin handlers
  const handleAddProject = () => {
    setEditingProject(null); // Clear any editing project
    setIsFormOpen(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleSubmitProject = (formData, projectId) => {
    if (projectId) {
      // UPDATE existing project
      projectService
        .update(projectId, formData)
        .then(() => {
          console.log("Project updated successfully!");
          handleCloseForm();
          fetchProjects(); // Refresh the list
        })
        .catch((err) => {
          console.error("Error updating project:", err);
          alert("Failed to update project. Please try again.");
        });
    } else {
      // CREATE new project
      projectService
        .create(formData)
        .then(() => {
          console.log("Project created successfully!");
          handleCloseForm();
          fetchProjects(); // Refresh the list
        })
        .catch((err) => {
          console.error("Error creating project:", err);
          alert("Failed to create project. Please try again.");
        });
    }
  };

  const handleDeleteProject = (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      projectService
        .delete(project.id)
        .then(() => {
          console.log("Project deleted successfully!");
          fetchProjects(); // Refresh the list
        })
        .catch((err) => {
          console.error("Error deleting project:", err);
          alert("Failed to delete project. Please try again.");
        });
    }
  };

  return (
    <div className="HomePage">
      <HeroSection technologies={technologies} />
      <ProjectsSection
        projects={projects}
        onAddProject={handleAddProject}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
      />

      {/* Project Form Modal */}
      <ProjectForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitProject}
        project={editingProject}
      />
    </div>
  );
}

export default HomePage;
