interface Job {
  title: string;
  description: string;
  location: string;
  requiredSkills: string[];
}

interface Resume {
  id: string;
  companyName?: string;
  jobTitle?: string;
  imagePath: string;
  resumePath: string;
  feedback: Feedback;
}

interface Feedback {
  overallScore: number;
  ATS: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
    }[];
  };
  toneAndStyle: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
      explanation: string;
      originalSentence?: string;
      suggestedSentence?: string;
    }[];
  };
  content: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
      explanation: string;
      originalSentence?: string;
      suggestedSentence?: string;
    }[];
  };
  skills: {
    score: number;
    tips: {
      type: 'good' | 'improve';
      tip: string;
      explanation: string;
      suggestedProject1?: string;
      suggestedProject2?: string;
    }[];
  };
}