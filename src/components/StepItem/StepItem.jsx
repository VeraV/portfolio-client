import { useState, useCallback } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import CloudinaryUpload from "../CloudinaryUpload/CloudinaryUpload";
import stepService from "../../services/step.service";

function StepItem({ step, isLastStep, isAdmin, onStepUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: step.description,
    image_url: step.image_url,
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      description: step.description,
      image_url: step.image_url,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      description: step.description,
      image_url: step.image_url,
    });
  };

  const handleSave = () => {
    stepService
      .update(step.id, editData)
      .then(() => {
        setIsEditing(false);
        onStepUpdated();
      })
      .catch((err) => {
        console.error("Error updating step:", err);
        alert("Failed to update step. Please try again.");
      });
  };

  const handleDescriptionChange = useCallback((e) => {
    setEditData((prev) => ({ ...prev, description: e.target.value }));
  }, []);

  const handleImageUpload = useCallback((imageUrl) => {
    setEditData((prev) => ({ ...prev, image_url: imageUrl }));
  }, []);

  return (
    <div className="relative">
      {/* Connecting Line */}
      {!isLastStep && (
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-blue-400 z-0"></div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
        {/* Left Column: Step Number + Description */}
        <div className="flex flex-col items-start">
          {/* Step Number Circle */}
          <div className="flex justify-center w-full mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
              {step.step_number}
            </div>
          </div>

          {/* Edit Mode */}
          {isEditing ? (
            <div className="w-full space-y-3 bg-gray-50 p-4 rounded-lg">
              <textarea
                value={editData.description}
                onChange={handleDescriptionChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                placeholder="Step description"
              />
              <CloudinaryUpload
                imageUrl={editData.image_url}
                onImageUpload={handleImageUpload}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 px-3 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Read Mode
            <div className="w-full">
              <div className="flex items-start justify-between mb-2">
                <p className="text-gray-700 leading-relaxed flex-grow">
                  {step.description}
                </p>
                {isAdmin && (
                  <button
                    onClick={handleEdit}
                    className="ml-3 p-2 text-blue-600 hover:text-blue-700 transition-colors"
                    title="Edit step"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Image */}
        <div className="flex items-start justify-center">
          {!isEditing && step.image_url && step.image_url.trim() !== "" && (
            <img
              src={step.image_url}
              alt={`Step ${step.step_number}`}
              className="w-full max-w-md h-auto rounded-lg border border-gray-300 shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default StepItem;
