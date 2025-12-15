import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import ProjectCard from "../ProjectCard/ProjectCard";

function ProjectsSection({ projects, onAddProject, onEditProject, onDeleteProject }) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
              My Projects
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              A collection of my recent work showcasing various technologies and skills
            </p>
          </div>

          {/* Admin: Add New Project Button */}
          {isLoggedIn && (
            <button
              onClick={onAddProject}
              className="ml-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <span className="text-xl">+</span>
              Add New Project
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
