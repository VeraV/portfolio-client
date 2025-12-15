import { Link } from "react-router-dom";

function HeroSection({ technologies }) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Vera Fileyeva
        </h1>
        <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold mb-6">
          Junior Web Developer
        </h2>

        {/* Bio */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
          Full Stack Developer with a software engineering background, a fresh
          Ironhack bootcamp graduate, and a yoga teacher’s mindset — combining
          structure and creativity, logic and empathy to build thoughtful,
          user-focused applications.
        </p>

        {/* Social Links */}
        <div className="flex gap-4 justify-center mb-10">
          <a
            href="https://www.linkedin.com/in/veramei-webdeveloper/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/VeraV"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Technologies Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            {technologies.map((tech) => (
              <a
                key={tech.id}
                href={tech.official_site_url}
                target="_blank"
                rel="noopener noreferrer"
                title={tech.name}
                className="transition-transform hover:scale-110"
              >
                <img
                  src={tech.logo_url}
                  alt={tech.name}
                  className="w-12 h-12 object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Learn More Button */}
        <Link
          to="/about"
          className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          Learn More About Me
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
