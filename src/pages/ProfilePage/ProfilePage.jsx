import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="ProfilePage min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          About Me
        </h1>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hello! I'm [Your Name]
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            I'm a passionate Junior Web Developer with a strong foundation in
            modern web technologies. My journey into web development started
            when I discovered the power of creating interactive and meaningful
            digital experiences.
          </p>
          <p className="text-gray-700 leading-relaxed">
            I love turning complex problems into simple, beautiful, and
            intuitive solutions. Whether it's building responsive user
            interfaces or developing robust backend systems, I approach every
            project with enthusiasm and attention to detail.
          </p>
        </section>

        {/* Background */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            My Journey
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            After completing an intensive web development bootcamp, I've been
            continuously expanding my skills through personal projects and
            staying up-to-date with the latest industry trends. I believe in
            learning by doing and constantly challenging myself with new
            technologies.
          </p>
        </section>

        {/* Skills & Expertise */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Skills & Expertise
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Frontend Development: React, HTML5, CSS3, Tailwind CSS</li>
            <li>Backend Development: Node.js, Express, RESTful APIs</li>
            <li>Database Management: PostgreSQL, MongoDB, Prisma ORM</li>
            <li>Version Control: Git & GitHub</li>
            <li>Agile methodologies and collaborative development</li>
          </ul>
        </section>

        {/* What I'm Passionate About */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What Drives Me
          </h2>
          <p className="text-gray-700 leading-relaxed">
            I'm passionate about creating accessible, user-friendly applications
            that make a real difference. Clean code, best practices, and
            continuous learning are at the core of my development philosophy. I'm
            always excited to collaborate with other developers and contribute to
            innovative projects.
          </p>
        </section>

        {/* Call to Action */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-gray-700 mb-4">
            Want to see what I've built? Check out my projects!
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            View My Work
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
