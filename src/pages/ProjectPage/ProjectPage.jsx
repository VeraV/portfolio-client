import { useState, useEffect, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import projectService from "../../services/project.service";
import manualService from "../../services/manual.service";
import stepService from "../../services/step.service";
import Loading from "../../components/Loading/Loading";
import CloudinaryUpload from "../../components/CloudinaryUpload/CloudinaryUpload";
import StepItem from "../../components/StepItem/StepItem";
import {
  PencilSquareIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

function ProjectPage() {
  const { projectId } = useParams();
  const { isLoggedIn } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [manuals, setManuals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Manual management state
  const [editingManualId, setEditingManualId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    title: "",
    description: "",
    version: "",
  });

  // Step management state
  const [showCreateStepForm, setShowCreateStepForm] = useState(false);
  const [createStepData, setCreateStepData] = useState({
    description: "",
    image_url: "",
  });

  // Fetch project and manuals
  useEffect(() => {
    if (projectId) {
      fetchProjectData();
    }
  }, [projectId, isLoggedIn]);

  const fetchProjectData = () => {
    setIsLoading(true);
    Promise.all([
      projectService.getOne(projectId),
      isLoggedIn
        ? manualService.getAllByProject(projectId)
        : Promise.resolve({ data: [] }),
    ])
      .then(([projectRes, manualsRes]) => {
        setProject(projectRes.data);
        setManuals(manualsRes.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project data:", err);
        setError("Failed to load project. Please try again later.");
        setIsLoading(false);
      });
  };

  // Manual CRUD handlers
  const handleEditManual = (manual) => {
    setEditingManualId(manual.id);
    setEditFormData({
      title: manual.title,
      description: manual.description,
      version: manual.version,
    });
  };

  const handleCancelEdit = () => {
    setEditingManualId(null);
    setEditFormData({});
  };

  const handleSaveEdit = (manualId) => {
    manualService
      .update(manualId, editFormData)
      .then(() => {
        setEditingManualId(null);
        setEditFormData({});
        fetchProjectData();
      })
      .catch((err) => {
        console.error("Error updating manual:", err);
        alert("Failed to update manual. Please try again.");
      });
  };

  const handleDeleteManual = (manualId) => {
    if (window.confirm("Are you sure you want to delete this manual?")) {
      manualService
        .delete(manualId)
        .then(() => {
          fetchProjectData();
        })
        .catch((err) => {
          console.error("Error deleting manual:", err);
          alert("Failed to delete manual. Please try again.");
        });
    }
  };

  const handleSetActive = (manualId) => {
    manualService
      .setActive(projectId, manualId)
      .then(() => {
        fetchProjectData();
      })
      .catch((err) => {
        console.error("Error setting active manual:", err);
        alert("Failed to set active manual. Please try again.");
      });
  };

  const handleCreateManual = () => {
    const manualData = {
      projectId,
      ...createFormData,
    };

    manualService
      .create(manualData)
      .then(() => {
        setShowCreateForm(false);
        setCreateFormData({ title: "", description: "", version: "" });
        fetchProjectData();
      })
      .catch((err) => {
        console.error("Error creating manual:", err);
        alert("Failed to create manual. Please try again.");
      });
  };

  // Step CRUD handlers

  const handleImageUploadStep = useCallback((imageUrl) => {
    setCreateStepData((prev) => ({ ...prev, image_url: imageUrl }));
  }, []);

  const handleCreateStep = useCallback(() => {
    const activeManual = project?.manuals?.find((m) => m.isActive);
    if (!activeManual) {
      alert("No active manual found. Please set a manual as active first.");
      return;
    }

    const stepData = {
      manualId: activeManual.id,
      ...createStepData,
    };

    stepService
      .create(stepData)
      .then(() => {
        setShowCreateStepForm(false);
        setCreateStepData({ description: "", image_url: "" });
        fetchProjectData();
      })
      .catch((err) => {
        console.error("Error creating step:", err);
        alert("Failed to create step. Please try again.");
      });
  }, [project, createStepData]);

  // Get active manual's steps
  const activeManual = project?.manuals?.find((m) => m.isActive);
  const steps = activeManual?.steps || [];

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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Project not found</p>
      </div>
    );
  }

  return (
    <div className="ProjectPage min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* TOP SECTION - Project Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Project Image */}
            <div>
              <img
                src={project.image_url}
                alt={project.name}
                className="w-full h-64 object-cover rounded-lg border border-gray-300"
              />
            </div>

            {/* Column 2: Description + Tech Stack */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {project.name}
              </h1>
              <p className="text-gray-700 mb-4 flex-grow">
                {project.description_short}
              </p>

              {/* Tech Stack Logos */}
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Technologies:
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((ts) => (
                    <img
                      key={ts.id}
                      src={ts.technology.logo_url}
                      alt={ts.technology.name}
                      title={ts.technology.name}
                      className="w-8 h-8 object-contain"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Links */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">
                Project Links:
              </h3>
              <a
                href={project.client_deploy_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Live Site
              </a>
              <a
                href={project.client_github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white text-center font-semibold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Client GitHub
              </a>
              {project.server_github_url && (
                <a
                  href={project.server_github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-700 text-white text-center font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Server GitHub
                </a>
              )}
              {project.server_deploy_url && (
                <a
                  href={project.server_deploy_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-600 text-white text-center font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Server Deploy
                </a>
              )}
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION - User Manuals (Admin Only) */}
        {isLoggedIn && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              User Manuals
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Existing Manuals */}
              {manuals.map((manual) => (
                <div
                  key={manual.id}
                  className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                >
                  {editingManualId === manual.id ? (
                    // EDIT MODE
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editFormData.title}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Title"
                      />
                      <textarea
                        value={editFormData.description}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        value={editFormData.version}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            version: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Version"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(manual.id)}
                          className="flex-1 px-3 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // READ MODE
                    <>
                      {/* Edit and Delete Buttons */}
                      <div className="flex gap-2 mb-3">
                        <button
                          onClick={() => handleEditManual(manual)}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                          title="Edit manual"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteManual(manual.id)}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                          title="Delete manual"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Manual Info */}
                      <h3 className="font-bold text-gray-900 mb-2">
                        {manual.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {manual.description}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Version: {manual.version}
                      </p>

                      {/* Radio Button for Active */}
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`active-${manual.id}`}
                          name="activeManual"
                          checked={manual.isActive}
                          onChange={() => handleSetActive(manual.id)}
                          className="w-4 h-4 text-blue-600 cursor-pointer"
                        />
                        <label
                          htmlFor={`active-${manual.id}`}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          Active
                        </label>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Create New Manual Column */}
              {!showCreateForm ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                  >
                    + Create New Manual
                  </button>
                </div>
              ) : (
                <div className="border border-gray-300 rounded-lg p-4 bg-green-50">
                  <h3 className="font-bold text-gray-900 mb-3">New Manual</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={createFormData.title}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="Title"
                    />
                    <textarea
                      value={createFormData.description}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={createFormData.version}
                      onChange={(e) =>
                        setCreateFormData({
                          ...createFormData,
                          version: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="Version"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleCreateManual}
                        className="flex-1 px-3 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Create
                      </button>
                      <button
                        onClick={() => {
                          setShowCreateForm(false);
                          setCreateFormData({
                            title: "",
                            description: "",
                            version: "",
                          });
                        }}
                        className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* BOTTOM SECTION - Manual Steps */}
        {steps.length > 0 || isLoggedIn ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {activeManual ? `${activeManual.title} - Steps` : "Manual Steps"}
            </h2>

            {/* Steps Display */}
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <StepItem
                  key={step.id}
                  step={step}
                  isLastStep={index === steps.length - 1}
                  isAdmin={isLoggedIn}
                  onStepUpdated={fetchProjectData}
                />
              ))}

              {/* Add New Step Button (Admin Only) */}
              {isLoggedIn && !showCreateStepForm && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowCreateStepForm(true)}
                    className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
                    title="Add new step"
                  >
                    <PlusIcon className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Create New Step Form */}
              {showCreateStepForm && (
                <div className="mt-8 bg-green-50 p-6 rounded-lg border-2 border-green-200">
                  <h3 className="font-bold text-gray-900 mb-4">Add New Step</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={createStepData.description}
                        onChange={(e) =>
                          setCreateStepData({
                            ...createStepData,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                        placeholder="Describe this step..."
                      />
                    </div>

                    <CloudinaryUpload
                      imageUrl={createStepData.image_url}
                      onImageUpload={(url) => handleImageUploadStep(url, false)}
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={handleCreateStep}
                        disabled={
                          !createStepData.description ||
                          !createStepData.image_url
                        }
                        className="flex-1 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setShowCreateStepForm(false);
                          setCreateStepData({ description: "", image_url: "" });
                        }}
                        className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProjectPage;
