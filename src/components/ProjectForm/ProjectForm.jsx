import { useState, useEffect } from "react";
import technologyService from "../../services/technology.service";
import TechnologySelector from "../TechnologySelector/TechnologySelector";
import CloudinaryUpload from "../CloudinaryUpload/CloudinaryUpload";

function ProjectForm({ isOpen, onClose, onSubmit, project }) {
  // All available technologies
  const [allTechnologies, setAllTechnologies] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description_short: "",
    client_github_url: "",
    client_deploy_url: "",
    server_github_url: "",
    server_deploy_url: "",
    image_url: "",
    technologyIds: [], // Will add selector in next step
  });

  // Fetch all technologies when modal opens
  useEffect(() => {
    if (isOpen) {
      technologyService
        .getAll()
        .then((response) => {
          setAllTechnologies(response.data);
        })
        .catch((err) => {
          console.error("Error fetching technologies:", err);
        });
    }
  }, [isOpen]);

  // Populate form when editing or reset when adding new
  useEffect(() => {
    // Only populate when modal opens or project ID changes
    if (isOpen) {
      if (project) {
        // Editing existing project - populate with project data
        setFormData({
          name: project.name || "",
          description_short: project.description_short || "",
          client_github_url: project.client_github_url || "",
          client_deploy_url: project.client_deploy_url || "",
          server_github_url: project.server_github_url || "",
          server_deploy_url: project.server_deploy_url || "",
          image_url: project.image_url || "",
          technologyIds: project.techStack?.map((ts) => ts.technology.id) || [],
        });
      } else {
        // Adding new project - reset form to empty
        setFormData({
          name: "",
          description_short: "",
          client_github_url: "",
          client_deploy_url: "",
          server_github_url: "",
          server_deploy_url: "",
          image_url: "",
          technologyIds: [],
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, project?.id]); // Only re-run when modal opens or project ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnologyChange = (selectedIds) => {
    setFormData((prev) => ({
      ...prev,
      technologyIds: selectedIds,
    }));
  };

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      image_url: imageUrl,
    }));
  };

  const handleAddNewTechnology = () => {
    console.log("Add new technology");
    // TODO: Open technology modal (Step 6)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, project?.id);
  };

  // Don't render if modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form
          key={project?.id || 'new-project'}
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >
          {/* Project Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="My Awesome Project"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description_short" className="block text-sm font-semibold text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              id="description_short"
              name="description_short"
              value={formData.description_short}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              placeholder="A brief description of your project..."
            />
          </div>

          {/* Cloudinary Image Upload */}
          <CloudinaryUpload
            imageUrl={formData.image_url}
            onImageUpload={handleImageUpload}
          />

          {/* Client GitHub URL */}
          <div>
            <label htmlFor="client_github_url" className="block text-sm font-semibold text-gray-700 mb-2">
              Client GitHub URL *
            </label>
            <input
              type="url"
              id="client_github_url"
              name="client_github_url"
              value={formData.client_github_url}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://github.com/username/project-client"
            />
          </div>

          {/* Client Deploy URL */}
          <div>
            <label htmlFor="client_deploy_url" className="block text-sm font-semibold text-gray-700 mb-2">
              Client Deploy URL *
            </label>
            <input
              type="url"
              id="client_deploy_url"
              name="client_deploy_url"
              value={formData.client_deploy_url}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://my-project.netlify.app"
            />
          </div>

          {/* Server GitHub URL (Optional) */}
          <div>
            <label htmlFor="server_github_url" className="block text-sm font-semibold text-gray-700 mb-2">
              Server GitHub URL <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="url"
              id="server_github_url"
              name="server_github_url"
              value={formData.server_github_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://github.com/username/project-server"
            />
          </div>

          {/* Server Deploy URL (Optional) */}
          <div>
            <label htmlFor="server_deploy_url" className="block text-sm font-semibold text-gray-700 mb-2">
              Server Deploy URL <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="url"
              id="server_deploy_url"
              name="server_deploy_url"
              value={formData.server_deploy_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://my-project-api.herokuapp.com"
            />
          </div>

          {/* Technology Selector */}
          <TechnologySelector
            technologies={allTechnologies}
            selectedIds={formData.technologyIds}
            onChange={handleTechnologyChange}
            onAddNew={handleAddNewTechnology}
          />

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {project ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectForm;
