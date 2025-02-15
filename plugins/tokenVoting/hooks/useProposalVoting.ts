import { TokenVotingPluginAbi } from "@/plugins/tokenVoting/artifacts/TokenVoting.sol";
import { useRouter } from "next/router";
import { PUB_TOKEN_VOTING_PLUGIN_ADDRESS } from "@/constants";
import { useTransactionManager } from "@/hooks/useTransactionManager";
import { useChainIdTypesafe } from "@/utils/chains";

export function useProposalVoting(proposalIdx: number) {
  const { reload } = useRouter();
  const chainId = useChainIdTypesafe();

  const {
    writeContract,
    status: votingStatus,
    isConfirming,
    isConfirmed,
  } = useTransactionManager({
    onSuccessMessage: "Vote registered",
    onSuccess: reload,
    onErrorMessage: "Could not submit the vote",
  });

  // TODO remove autoExecute
  const voteProposal = (votingOption: number, autoExecute: boolean = false) => {
    writeContract({
      chainId,
      abi: TokenVotingPluginAbi,
      address: PUB_TOKEN_VOTING_PLUGIN_ADDRESS[chainId],
      functionName: "vote",
      args: [BigInt(proposalIdx), votingOption],
    });
  };

  return {
    voteProposal,
    status: votingStatus,
    isConfirming,
    isConfirmed,
  };
}
