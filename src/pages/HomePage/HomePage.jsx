import { useState, useEffect } from "react";
import projectService from "../../services/project.service";
import HeroSection from "../../components/HeroSection/HeroSection";
import ProjectsSection from "../../components/ProjectsSection/ProjectsSection";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import Loading from "../../components/Loading/Loading";
import technologyService from "../../services/technology.service";

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Fetch projects function (reusable)
  const fetchData = () => {
    setIsLoading(true);
    Promise.all([projectService.getAll(), technologyService.getAll()])
      .then(([responseProjects, responceTech]) => {
        const projectsData = responseProjects.data;
        const techData = responceTech.data;
        setProjects(projectsData);
        setTechnologies(techData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects or technology stach:", err);
        setError(
          "Failed to load projects or technologies. Please try again later."
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
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
          fetchData(); // Refresh the list
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
          fetchData(); // Refresh the list
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
          fetchData(); // Refresh the list
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
