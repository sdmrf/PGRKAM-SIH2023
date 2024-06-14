export type Job = {
    id: number;
    jobTitle: string;
    jobDescription: string;
    jobImage: string;
    jobLink: string;
    jobLocation: string;
    jobType: string;
    jobInfo: string;
    jobRequirements: {
        salary: string
        experience: string
        level: string
        hours: string
    }
  };