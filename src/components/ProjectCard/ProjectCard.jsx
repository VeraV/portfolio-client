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
      className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg relative cursor-pointer"
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

      {/* Two Column Layout: Text (left) and Image (right) on desktop, Stack on mobile */}
      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Mobile: Image First */}
        <div className="md:hidden w-full">
          <img
            src={project.image_url}
            alt={project.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        {/* Left Column: Name, Tech Stack, Description */}
        <div className="flex-1 flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-gray-800">
            {project.name}
          </h3>

          <div className="flex flex-wrap gap-2">
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

          <p className="text-gray-600 leading-relaxed">
            {project.description_short}
          </p>
        </div>

        {/* Right Column: Image (Desktop only) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <img
            src={project.image_url}
            alt={project.name}
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
