function ProjectCard({ project }) {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
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
