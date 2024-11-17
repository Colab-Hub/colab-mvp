import { OpportunitiesSchema } from "./schema/OpportunitiesSchema";

export class Opportunity {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly description: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly location: string;
  readonly isRemote: boolean;
  readonly isPaid: boolean;
  readonly contractType: string[];
  readonly activityArea: string[];
  readonly experienceLevel: string[];
  readonly requiredSkills: string[];
  readonly timeCommitment: string;
  readonly languages: string[];
  readonly feedbackTime: string;
  readonly _applicantsEmails: string[];
  readonly _howManyApplicants: number;
  readonly hirerEmail: string;
  readonly hirerName: string;
  readonly hirerPhone: string;
  readonly hirerCompany: string;
  readonly hirerCompanyWebsite: string;
  readonly hirerCompanyLogo: string;
  readonly areasOfInterest: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly additionalInfo: string;

  constructor(init: OpportunitiesSchema) {
    Object.assign(this as ObjectConstructor, init);
    this._applicantsEmails = [];
    this._howManyApplicants = 0;
  }
  get applicantsEmails(): string[] {
    return [...this._applicantsEmails];
  }

  get howManyApplicants(): number {
    return this._howManyApplicants;
  }
}