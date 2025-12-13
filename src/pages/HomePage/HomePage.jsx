import { useState, useEffect } from "react";
import projectService from "../../services/project.service";
import HeroSection from "../../components/HeroSection/HeroSection";
import ProjectsSection from "../../components/ProjectsSection/ProjectsSection";
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

  useEffect(() => {
    // Fetch all projects on component mount
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

  return (
    <div className="HomePage">
      <HeroSection technologies={technologies} />
      <ProjectsSection projects={projects} />
    </div>
  );
}

export default HomePage;
