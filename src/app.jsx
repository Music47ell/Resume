import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

const App = () => {
	const [resumeData, setResumeData] = useState(null);

	useEffect(() => {
		fetch("/data.json")
			.then((response) => response.json())
			.then((data) => setResumeData(data))
			.catch((error) => console.error("Error loading JSON:", error));
	}, []);

	if (!resumeData) {
		return <div>Loading...</div>;
	}

	const SectionHeader = ({ title, shownCount, totalCount }) => (
		<h3 className="mb-4 text-2xl font-semibold text-white print:text-black">
			{title}
			{totalCount && totalCount > shownCount && (
				<>
					{" "}
					({shownCount} of {totalCount})
				</>
			)}
		</h3>
	);

	return (
		<div class="max-w-4xl mx-auto p-6 bg-black print:bg-white">
			{/* Header */}
			<div class="flex items-center justify-between pb-6 border-b border-red-500">
				<img
					src={resumeData.basics.image}
					alt={resumeData.basics.name}
					class="w-32 h-32 object-cover rounded-full"
				/>
				<div class="text-center md:text-left mt-4 md:mt-0">
					<h1 class="text-3xl font-semibold text-white print:text-black">
						{resumeData.basics.name}
					</h1>
					<p class="text-lg text-white print:text-black">
						{resumeData.basics.label} from {resumeData.basics.location.country}{" "}
						{resumeData.basics.location.flagEmoji}
					</p>
					<p class="text-sm text-white print:text-black">
						<a href={`mailto:${resumeData.basics.email}`} class="text-red-500">
							{resumeData.basics.email}
						</a>{" "}
						|{" "}
						<a href={resumeData.basics.url} class="text-red-500">
							{resumeData.basics.url}
						</a>
					</p>
					<div class="flex justify-between space-x-6">
						{resumeData.basics.profiles.map((profile) => (
							<a
								key={profile.id}
								href={profile.url}
								class="text-red-500"
								target="_blank"
								rel="noopener noreferrer"
							>
								{profile.network}
							</a>
						))}
					</div>
				</div>
			</div>

			{/* Summary */}
			<div class="my-6">
				<p class="text-white print:text-black text-lg">
					{resumeData.basics.summary}
				</p>
			</div>

			{/* Experience */}
			<section className="my-6">
				<SectionHeader
					title="Experience"
					shownCount={3}
					totalCount={
						resumeData.work.length > 3 ? resumeData.work.length : null
					}
				/>
				<ul>
					{resumeData.work
						.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
						.slice(0, 3)
						.map((job, idx) => (
							<li key={idx}>
								<span className="font-semibold text-white print:text-black">
									{job.position}
								</span>
								<span className="ml-2">
									<a
										href={job.url}
										className="text-red-500"
										target="_blank"
										rel="noopener noreferrer"
									>
										{job.name}
									</a>
								</span>
							</li>
						))}
				</ul>
			</section>

			{/* Skills Section */}
			<section class="my-6">
				<SectionHeader title="Skills" />
				{resumeData.skills.map((skill) => (
					<ul key={skill.id}>
						<li>
							<span class="font-semibold text-white print:text-black">
								{skill.category}
							</span>
							<span class="ml-2 text-white print:text-black">
								{skill.keywords.join(", ")}
							</span>
						</li>
					</ul>
				))}
			</section>

			{/* Languages */}
			<section class="my-6">
				<SectionHeader title="Languages" />
				<ul>
					{resumeData.languages.map((lang) => (
						<li key={lang.id}>
							<span class="font-semibold text-white print:text-black">
								{lang.language}
							</span>
							<span class="ml-2 text-white print:text-black">
								{lang.fluency}
							</span>
						</li>
					))}
				</ul>
			</section>

			{/* Certificates Section */}
			<section className="my-6">
				<SectionHeader
					title="Certificates"
					shownCount={3}
					totalCount={
						resumeData.certificates.length > 3
							? resumeData.certificates.length
							: null
					}
				/>
				<ul>
					{resumeData.certificates
						.sort((a, b) => new Date(b.issued) - new Date(a.issued))
						.slice(0, 3)
						.map((certificate, idx) => (
							<li key={idx}>
								<span className="font-semibold text-white print:text-black">
									{certificate.name}
								</span>
								<span className="ml-2">
									<a
										href={certificate.url}
										className="text-red-500"
										target="_blank"
										rel="noopener noreferrer"
									>
										{certificate.issuer}
									</a>
								</span>
							</li>
						))}
				</ul>
			</section>

			{/* Projects Section */}
			<section className="my-6">
				<SectionHeader
					title="Projects"
					shownCount={3}
					totalCount={
						resumeData.projects.length > 3 ? resumeData.projects.length : null
					}
				/>
				<ul>
					{resumeData.projects.slice(0, 3).map((project, idx) => (
						<li key={idx}>
							<span className="font-semibold text-white print:text-black">
								{project.name}
							</span>
							<span className="ml-2">
								<a
									href={project.url}
									className="text-red-500"
									target="_blank"
									rel="noopener noreferrer"
								>
									Website
								</a>
							</span>
							<span className="ml-2">
								<a
									href={project.url}
									className="text-red-500"
									target="_blank"
									rel="noopener noreferrer"
								>
									Source Code
								</a>
							</span>
						</li>
					))}
				</ul>
			</section>

			<button
				class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md print:hidden"
				onClick={() => window.print()}
			>
				Download as PDF
			</button>
		</div>
	);
};

export default App;
