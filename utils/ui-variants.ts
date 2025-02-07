import { ProposalStatus, TagVariant } from "@aragon/gov-ui-kit";

export function getTagVariantFromStatus(status: ProposalStatus | undefined): TagVariant {
  switch (status) {
    case ProposalStatus.ACCEPTED:
      return "success";
    case ProposalStatus.ACTIVE:
      return "primary";
    case ProposalStatus.CHALLENGED:
      return "warning";
    case ProposalStatus.DRAFT:
      return "neutral";
    case ProposalStatus.EXECUTED:
      return "success";
    case ProposalStatus.EXPIRED:
      return "critical";
    case ProposalStatus.FAILED:
      return "critical";
    case ProposalStatus.PARTIALLY_EXECUTED:
      return "warning";
    case ProposalStatus.PENDING:
      return "neutral";
    case ProposalStatus.REJECTED:
      return "critical";
    case ProposalStatus.VETOED:
      return "warning";
    default:
      return "neutral";
  }
}
