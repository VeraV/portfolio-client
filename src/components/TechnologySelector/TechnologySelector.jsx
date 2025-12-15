function TechnologySelector({ technologies, selectedIds, onChange, onAddNew }) {
  // Split technologies into selected and available
  const selectedTechs = technologies.filter((tech) => selectedIds.includes(tech.id));
  const availableTechs = technologies.filter((tech) => !selectedIds.includes(tech.id));

  const handleAdd = (techId) => {
    onChange([...selectedIds, techId]);
  };

  const handleRemove = (techId) => {
    onChange(selectedIds.filter((id) => id !== techId));
  };

  return (
    <div className="TechnologySelector">
      <div className="flex justify-between items-center mb-3">
        <label className="block text-sm font-semibold text-gray-700">
          Technologies *
        </label>
        <button
          type="button"
          onClick={onAddNew}
          className="w-8 h-8 text-lg bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-colors flex items-center justify-center"
          title="Add new technology"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Selected Technologies */}
        <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Selected ({selectedTechs.length})
          </h4>
          <div className="flex flex-wrap gap-2 min-h-[80px]">
            {selectedTechs.length === 0 ? (
              <p className="text-xs text-gray-500 italic w-full text-center py-6">
                Click technologies to add →
              </p>
            ) : (
              selectedTechs.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => handleRemove(tech.id)}
                  className="w-12 h-12 rounded-lg bg-white border-2 border-blue-400 hover:border-red-400 hover:bg-red-50 transition-all flex items-center justify-center shadow-sm"
                  title={`Remove ${tech.name}`}
                >
                  <img
                    src={tech.logo_url}
                    alt={tech.name}
                    className="w-9 h-9 object-contain"
                  />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Technologies */}
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">
            Available ({availableTechs.length})
          </h4>
          <div className="flex flex-wrap gap-2 min-h-[80px]">
            {availableTechs.length === 0 ? (
              <p className="text-xs text-gray-500 italic w-full text-center py-6">
                All technologies selected!
              </p>
            ) : (
              availableTechs.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => handleAdd(tech.id)}
                  className="w-12 h-12 rounded-lg bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center shadow-sm"
                  title={`Add ${tech.name}`}
                >
                  <img
                    src={tech.logo_url}
                    alt={tech.name}
                    className="w-9 h-9 object-contain"
                  />
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Click icons to move between sections
      </p>
    </div>
  );
}

export default TechnologySelector;
