import { Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const features = [
  {
    icon: '/icons/check.svg',
    title: 'Resume Analysis',
    description:
      'Get detailed AI-powered feedback on your resume across tone, structure, content, and skills — with actionable suggestions.',
  },
  {
    icon: '/icons/check.svg',
    title: 'ATS Score',
    description:
      'Find out how well your resume performs against Applicant Tracking Systems used by top employers before you even apply.',
  },
  {
    icon: '/icons/check.svg',
    title: 'Project Suggestions',
    description:
      'Receive personalised project ideas to fill skill gaps and make your resume stand out for your target role.',
  },
  {
    icon: '/icons/check.svg',
    title: 'Cover Letters',
    description:
      'Generate tailored cover letters for any job in seconds — crafted to match the role and highlight your strengths.',
  },
  {
    icon: '/icons/check.svg',
    title: 'Email Drafts',
    description:
      'Instantly draft professional follow-up and outreach emails that leave a strong impression with recruiters.',
  },
  {
    icon: '/icons/check.svg',
    title: 'Track Applications',
    description:
      'Keep all your resume submissions and feedback in one place, so you can monitor progress and improve over time.',
  },
];

const steps = [
  { step: '01', title: 'Upload your resume', description: 'Drop your PDF resume into Resumind.' },
  { step: '02', title: 'Add the job details', description: 'Enter the company, job title, and description.' },
  { step: '03', title: 'Get instant feedback', description: 'Receive your score, tips, and generated documents.' },
];

const LandingPage = () => {
  const {auth} = usePuterStore()
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero */}
      <section className="main-section text-center max-w-4xl">
        <div className="page-heading py-10">
          <h1>
            Smart Feedback for
            <br />
            Your Dream Job
          </h1>
          <h2 className="text-lg sm:text-2xl">
            Upload your resume and get AI-powered analysis, ATS scoring, cover
            letters, and more — in seconds.
          </h2>
        </div>
        <div className="flex flex-row gap-4 flex-wrap justify-center">
          <a
            onClick={auth.signIn}
            className="primary-button w-fit px-8 py-3 text-lg font-semibold"
          >
            Get Started Free
          </a>
          <a
            onClick={auth.signIn}
            className="border border-gray-300 rounded-full px-8 py-3 text-lg font-semibold text-dark-200 hover:bg-gray-50 transition-colors"
          >
            Sign In
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-5xl px-6 py-16 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">
            Everything you need to land the role
          </h2>
          <p className="text-dark-200 mt-2 text-lg">
            Resumind gives you the tools to stand out at every stage of the job
            search.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="gradient-border flex flex-col gap-3 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-row items-center gap-2">
                <div className="primary-gradient rounded-full p-2 w-fit">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="size-4 brightness-[10]"
                  />
                </div>
                <h3 className="font-semibold text-lg text-black">
                  {feature.title}
                </h3>
              </div>
              <p className="text-dark-200 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-4xl px-6 py-10 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black">How it works</h2>
          <p className="text-dark-200 mt-2 text-lg">
            Three steps to a stronger resume.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="flex flex-col items-center text-center gap-3 flex-1"
            >
              <div className="primary-gradient rounded-full w-14 h-14 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {s.step}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute" />
              )}
              <h3 className="font-semibold text-xl text-black">{s.title}</h3>
              <p className="text-dark-200 text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full max-w-4xl px-6 py-10 mx-auto mb-16">
        <div className="primary-gradient rounded-3xl p-10 flex flex-col items-center text-center gap-4 shadow-lg">
          <h2 className="text-3xl font-bold text-white">
            Ready to get hired faster?
          </h2>
          <p className="text-white/80 text-lg max-w-xl">
            Join thousands of job seekers using Resumind to sharpen their
            resumes and land more interviews.
          </p>
          <a
            onClick={auth.signIn}
            className="bg-white text-[#606beb] font-bold rounded-full px-8 py-3 text-lg hover:bg-gray-100 transition-colors mt-2"
          >
            Start for Free
          </a>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;