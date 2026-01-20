import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="ProfilePage min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          About Me
        </h1>

        {/* Profile Photo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://res.cloudinary.com/dojvyjghs/image/upload/v1768305276/Vera-Fileyeva-Web-Developer_skh36m.png"
            alt="Vera Fileyeva"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hello! I'm Vera
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 m-5 text-justify">
            I’m a Junior Full Stack Developer with a background in software
            engineering and yoga teaching — combining clean code with
            creativity, structure, and user empathy.
          </p>
        </section>

        {/* Background */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            My Journey
          </h2>
          <p className="text-gray-700 leading-relaxed m-5 text-justify">
            I hold a Bachelor’s degree in Information Technology and spent six
            years working in software companies in Belarus, where I had the
            chance to try myself in three very different environments:
            scientific research, a startup-style team, and an enterprise
            software company. This experience helped me understand different
            development workflows, collaboration styles, and what suits me best
            as a developer.
          </p>
          <p className="text-gray-700 leading-relaxed m-5 text-justify">
            Early in my career, a Business Analysis course introduced me to
            requirements gathering and the fundamentals of the software
            development lifecycle. That foundation still influences how I
            approach development today — with a focus on planning, clarity, and
            communication.
          </p>
          <p className="text-gray-700 leading-relaxed m-5 text-justify">
            After returning to tech, I completed the Ironhack Web Development
            Bootcamp (400+ hours), where I built three full-stack applications
            using the MERN stack (MongoDB, Express, React, Node.js). I enjoy
            working across the stack, from front-end UI and UX to RESTful APIs,
            database design, and version control with Git.
          </p>
        </section>

        {/* Skills & Expertise */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Skills & Expertise
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 m-5">
            <li>
              Frontend Development: React, HTML5, CSS3, Bootstrap, Tailwind CSS
            </li>
            <li>
              Backend Development: Node.js, TypeScript, Express, RESTful APIs
            </li>
            <li>Database Management: PostgreSQL, MongoDB, Prisma ORM</li>
            <li>Deployment & DevOps: Docker, Render</li>
            <li>Version Control: Git & GitHub</li>
            <li>Agile methodologies and collaborative development</li>
          </ul>
        </section>

        {/* What I'm Passionate About */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What Drives Me
          </h2>
          <p className="text-gray-700 leading-relaxed m-5 text-justify">
            I’m passionate about creating meaningful, user-focused applications,
            continuously improving my skills, and collaborating with teams that
            value both technical quality and clear communication.
          </p>
          <p className="text-gray-700 leading-relaxed m-5 text-justify">
            When I’m not coding, I enjoy exploring new technologies, improving
            UX in side projects, teaching yoga, and singing in a choir in Lisbon
            — something I truly love and that helps me maintain balance.
          </p>
        </section>

        {/* Call to Action */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-gray-700 mb-4">
            🔍 Currently seeking Junior Full Stack Developer opportunities in
            Lisbon or remote.
          </p>
          <p className="text-gray-700 mb-6">
            Feel free to check what I've built or contact me directly
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              View My Work
            </Link>
            <a
              href="mailto:veremei.vera@gmail.com"
              className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors shadow-md hover:shadow-lg"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
