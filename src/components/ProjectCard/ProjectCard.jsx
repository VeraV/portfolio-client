import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";

function ProjectCard({ project, onEdit, onDelete }) {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSeeManual = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div
      onClick={handleSeeManual}
      className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg relative cursor-pointer"
    >
      {/* Admin: Edit/Delete Buttons */}
      {isLoggedIn && (
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            className="p-2 bg-white border border-gray-300 text-gray-700 rounded shadow-sm hover:bg-gray-50 transition-colors"
            title="Edit project"
          >
            <PencilSquareIcon className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
            className="p-2 bg-red-600 text-white rounded shadow-sm hover:bg-red-700 transition-colors"
            title="Delete project"
          >
            <XMarkIcon className="w-5 h-5" />
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

      <p className="px-4 pb-4 text-gray-600 leading-relaxed flex-grow">
        {project.description_short}
      </p>
    </div>
  );
}

export default ProjectCard;
