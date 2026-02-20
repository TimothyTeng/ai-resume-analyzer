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
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
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
  Do not include any other text or comments.`;

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
Write a clear, concise, and compelling cover letter (300–400 words) for the position of ${jobTitle} at ${companyName} using this resume and the company information that follows ${jobDescription}.

Cover letter requirements:
Maintain a professional, confident, and natural tone (not generic or overly formal).
Open with a strong, engaging introduction that clearly states interest in the role and company.
Demonstrate clear alignment between the candidate’s skills, experiences, and the job role.
Reference specific qualifications, achievements, or experiences from the resume (do not repeat the resume verbatim).
Show genuine interest in the company by tying the candidate’s values, interests, or skills to the company’s mission, industry, or work.
Emphasize impact, problem-solving, and learning ability rather than listing duties.
Be concise, well-structured, and free of filler phrases.
End with a polite, confident closing that expresses enthusiasm and invites further discussion.

Formatting guidelines:
Use 3–4 short paragraphs.
No bullet points.
No clichés (e.g., “hard-working team player”).
Avoid repeating phrases like “I believe” or “I feel.”
`;