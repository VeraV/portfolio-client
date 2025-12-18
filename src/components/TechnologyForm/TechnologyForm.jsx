import { useState, useEffect, useCallback } from "react";

function TechnologyForm({ isOpen, onClose, onSubmit, categories }) {
  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    official_site_url: "",
    categoryId: "",
  });

  const [imageError, setImageError] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        logo_url: "",
        official_site_url: "",
        categoryId: categories.length > 0 ? categories[0].id : "",
      });
      setImageError(false);
    }
  }, [isOpen, categories]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset image error when logo_url changes
    if (name === "logo_url") {
      setImageError(false);
    }
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(formData);
    },
    [formData, onSubmit]
  );

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageError(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Add New Technology
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Technology Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Technology Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="React"
            />
          </div>

          {/* Logo URL */}
          <div>
            <label
              htmlFor="logo_url"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Logo URL *
            </label>
            <input
              type="url"
              id="logo_url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://example.com/logo.png"
            />

            {/* Logo Preview */}
            {formData.logo_url && formData.logo_url.trim() !== "" && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2">
                  Preview:
                </p>
                {!imageError ? (
                  <div className="flex items-center justify-center bg-white p-4 rounded border border-gray-200">
                    <img
                      src={formData.logo_url}
                      alt="Technology logo preview"
                      className="w-16 h-16 object-contain"
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-white p-4 rounded border border-red-200">
                    <p className="text-sm text-red-600">
                      Unable to load image. Please check the URL.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Official URL */}
          <div>
            <label
              htmlFor="official_site_url"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Official Website *
            </label>
            <input
              type="url"
              id="official_site_url"
              name="official_site_url"
              value={formData.official_site_url}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://reactjs.org"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label
              htmlFor="categoryId"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

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
              Create Technology
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TechnologyForm;
