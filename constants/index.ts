export const resumes: Resume[] = [
  {
    id: '1',
    companyName: 'Google',
    jobTitle: 'Frontend Developer',
    imagePath: '/images/resume_01.png',
    resumePath: '/resumes/resume-1.pdf',
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '2',
    companyName: 'Microsoft',
    jobTitle: 'Cloud Engineer',
    imagePath: '/images/resume_02.png',
    resumePath: '/resumes/resume-2.pdf',
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '3',
    companyName: 'Apple',
    jobTitle: 'iOS Developer',
    imagePath: '/images/resume_03.png',
    resumePath: '/resumes/resume-3.pdf',
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '4',
    companyName: 'Google',
    jobTitle: 'Frontend Developer',
    imagePath: '/images/resume_01.png',
    resumePath: '/resumes/resume-1.pdf',
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '5',
    companyName: 'Microsoft',
    jobTitle: 'Cloud Engineer',
    imagePath: '/images/resume_02.png',
    resumePath: '/resumes/resume-2.pdf',
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: '6',
    companyName: 'Apple',
    jobTitle: 'iOS Developer',
    imagePath: '/images/resume_03.png',
    resumePath: '/resumes/resume-3.pdf',
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          originalSentence?: string; //the exact sentence from the resume that needs to be changed, if applicable
          suggestedSentence?: string; //a suggested replacement sentence, if applicable
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          originalSentence?: string; //the exact sentence from the resume that needs to be changed, if applicable
          suggestedSentence?: string; //a suggested replacement sentence, if applicable
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
          suggestedProject1?: string; //all tips of type "improve", use suggestedProject1, suggestedProject2 to suggest 2 specific projects the user could build to strengthen their skills for this role with regard to the tip, where to find them (e.g. GitHub, freeCodeCamp, official docs, specific websites), and how each project would improve their resume
          suggestedProject2?: string;
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `
  You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}

  Additional instructions:
  - For any tip of type "improve" (across all sections), if the feedback references a specific part of the resume, populate "originalSentence" with the exact quoted text from the resume and "suggestedSentence" with a concrete improved version. Leave both fields out for tips that are general or structural in nature.

  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.
  `;

export const coverLetterInstructions = ({
  companyName,
  jobTitle,
  jobDescription,
}: {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
}) => `
You are an expert career coach and professional cover-letter writer.
Write a concise, compelling cover letter (200–280 words) for the position of ${jobTitle} 
at ${companyName} using this resume and the job description that follows: ${jobDescription}.

Cover letter requirements:
- Begin with "Dear Hiring Manager," as the salutation.
- Open with the candidate's single strongest, most relevant achievement or skill — 
  do not open with "I am applying for" or any variation of it.
- Naturally incorporate 2–3 specific keywords or phrases from the job description 
  in the first two paragraphs to pass ATS screening.
- Where the resume contains measurable results (numbers, percentages, scale), 
  use them. Do not invent metrics that are not present.
- Draw a direct, honest connection between the candidate's actual experience 
  and the role's core requirements.
- Show genuine interest in the company without hollow flattery — tie one specific 
  aspect of the company's work or mission to the candidate's background.
- Close with a single confident sentence inviting next steps. No "I look forward 
  to hearing from you at your earliest convenience."

Formatting guidelines:
- 3 short paragraphs maximum.
- No bullet points.
- No clichés ("hard-working", "team player", "passionate about", "dynamic").
- Never repeat "I believe", "I feel", or "I think".
- Do not repeat the resume verbatim.
`;

export const emailInstructions = ({
  companyName,
  jobTitle,
  jobDescription,
}: {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
}) => `
You are an expert career coach and professional recruiter communication specialist.
Write a concise, direct cold outreach email (150–200 words) to a recruiter at ${companyName} for the position of ${jobTitle}.

Use only the information provided in this resume and the job description that follows: ${jobDescription}.

Email requirements:
- Write only from what is explicitly present in the resume. Do not invent, assume, or embellish any skills, experiences, or achievements.
- Open with one sentence stating the role you are applying for and where you found it (keep generic: "I came across the ${jobTitle} role at ${companyName}").
- In 2–3 sentences, draw a direct and honest connection between the candidate's actual experience and the specific requirements in the job description.
- Mention one concrete, verifiable achievement or project from the resume that is relevant to the role.
- Express genuine interest in the company or role without hollow flattery.
- Close with a single, confident call to action — requesting a brief call or next steps.
- No filler phrases ("I am passionate about", "I would love the opportunity", "I think I would be a great fit").
- No clichés, no buzzwords, no fluff.
- Do not repeat the resume verbatim.

Formatting guidelines:
- Plain prose, no bullet points.
- 3 short paragraphs maximum.
- Include a subject line at the top in the format: Subject: [your subject line here]
- Sign off professionally with "Best regards," followed by the candidate's name from the resume.
`;