import { type ProposalStatus } from "@aragon/gov-ui-kit";
import { BreakdownApprovalThresholdResult, type IBreakdownApprovalThresholdResult } from "./approvalThresholdResult";
import { BreakdownMajorityVotingResult, type IBreakdownMajorityVotingResult } from "./majorityVotingResult";
import { type VotingCta } from "./types";

export type ProposalType = "majorityVoting" | "approvalThreshold";

export interface IVotingBreakdownProps<TType extends ProposalType = ProposalType> {
  variant: TType;
  result?: TType extends "approvalThreshold" ? IBreakdownApprovalThresholdResult : IBreakdownMajorityVotingResult;
  cta?: VotingCta;
  status?: ProposalStatus;
}

export const VotingBreakdown: React.FC<IVotingBreakdownProps> = (props) => {
  const { result, cta, variant, status } = props;

  if (!result) return <></>;
  else if (variant === "approvalThreshold") {
    return <BreakdownApprovalThresholdResult {...(result as IBreakdownApprovalThresholdResult)} cta={cta} />;
  } else if (variant === "majorityVoting") {
    return <BreakdownMajorityVotingResult {...(result as IBreakdownMajorityVotingResult)} cta={cta} status={status} />;
  }

  return <></>;
};
