import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function ProjectCard({ project, onEdit, onDelete }) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg relative">
      {/* Admin: Edit/Delete Buttons */}
      {isLoggedIn && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={() => onEdit(project)}
            className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded shadow-sm hover:bg-gray-50 transition-colors"
            title="Edit project"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(project)}
            className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded shadow-sm hover:bg-red-700 transition-colors"
            title="Delete project"
          >
            Delete
          </button>
        </div>
      )}

      <img
        src={project.image_url}
        alt={project.name}
        className="w-full h-48 object-cover"
      />

      <h3 className="mx-4 mt-4 mb-2 text-2xl font-semibold text-gray-800">
        {project.name}
      </h3>

      <div className="flex flex-wrap gap-2 px-4 mb-3">
        {project.techStack.map((ts) => (
          <img
            key={ts.id}
            src={ts.technology.logo_url}
            alt={ts.technology.name}
            title={ts.technology.name}
            className="w-6 h-6 object-contain"
          />
        ))}
      </div>

      <p className="px-4 mb-4 text-gray-600 leading-relaxed flex-grow">
        {project.description_short}
      </p>

      <div className="flex gap-2 px-4 pb-4">
        <a
          href={project.client_deploy_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded text-center transition-colors hover:bg-blue-700 active:scale-98"
        >
          View Live
        </a>

        <a
          href={project.client_github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-800 text-sm font-semibold rounded text-center border border-gray-300 transition-colors hover:bg-gray-200 active:scale-98"
        >
          GitHub
        </a>

        {/* Future: Link to project detail page */}
        {/* <button className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-800 text-sm font-semibold rounded border border-gray-300">See More</button> */}
      </div>
    </div>
  );
}

export default ProjectCard;
