import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import { type ReactNode, useEffect } from "react";
import ProposalCard from "../components/proposal";
import { TokenVotingPluginAbi } from "../artifacts/TokenVoting.sol";
import {
  Button,
  DataListContainer,
  DataListPagination,
  DataListRoot,
  IconType,
  ProposalDataListItemSkeleton,
  type DataListState,
} from "@aragon/gov-ui-kit";
import { useCanCreateProposal } from "../hooks/useCanCreateProposal";
import Link from "next/link";
import { Else, If, Then } from "@/components/if";
import { PUB_TOKEN_VOTING_PLUGIN_ADDRESS } from "@/constants";
import { MainSection } from "@/components/layout/main-section";
import { MissingContentView } from "@/components/MissingContentView";
import { useChainIdTypesafe } from "@/utils/chains";

const DEFAULT_PAGE_SIZE = 6;

const img = "/images/empty.png";

export default function Proposals() {
  const { isConnected } = useAccount();
  const canCreate = useCanCreateProposal();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const chainId = useChainIdTypesafe();

  const {
    data: proposalCountResponse,
    error: isError,
    isLoading,
    isFetching: isFetchingNextPage,
    refetch,
  } = useReadContract({
    address: PUB_TOKEN_VOTING_PLUGIN_ADDRESS[chainId],
    abi: TokenVotingPluginAbi,
    functionName: "proposalCount",
    chainId,
  });
  const proposalCount = Number(proposalCountResponse);

  useEffect(() => {
    refetch();
  }, [blockNumber, chainId]);

  const entityLabel = proposalCount === 1 ? "Proposal" : "Proposals";

  let dataListState: DataListState = "idle";
  if (isLoading && !proposalCount) {
    dataListState = "initialLoading";
  } else if (isError) {
    dataListState = "error";
  } else if (isFetchingNextPage) {
    dataListState = "fetchingNextPage";
  }

  return (
    <MainSection narrow>
      <SectionView>
        <h1 className="line-clamp-1 flex flex-1 shrink-0 text-2xl font-normal leading-tight text-neutral-800 md:text-3xl">
          Community Proposals
        </h1>
        <div className="justify-self-end">
          <Link href="#/community-voting/new">
            <Button disabled={!isConnected || !canCreate} iconLeft={IconType.PLUS} size="md" variant="secondary">
              Submit Proposal
            </Button>
          </Link>
        </div>
      </SectionView>

      <If not={proposalCount}>
        <Then>
          <MissingContentView img={img}>
            No proposals have been created yet. Here you will see the available proposals.{" "}
            <If true={canCreate}>Create your first proposal.</If>
          </MissingContentView>
        </Then>
        <Else>
          <DataListRoot
            entityLabel={entityLabel}
            itemsCount={proposalCount}
            pageSize={DEFAULT_PAGE_SIZE}
            state={dataListState}
            //onLoadMore={fetchNextPage}
          >
            <DataListContainer style={{ rowGap: "1rem" }} SkeletonElement={ProposalDataListItemSkeleton}>
              {proposalCount &&
                Array.from(Array(proposalCount || 0)?.keys())
                  .reverse()
                  ?.map((proposalIndex) => (
                    // TODO: update with router agnostic ODS DataListItem
                    <ProposalCard key={proposalIndex} proposalIndex={proposalIndex} />
                  ))}
            </DataListContainer>
            <DataListPagination />
          </DataListRoot>
        </Else>
      </If>
    </MainSection>
  );
}

function SectionView({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-row content-center justify-between">{children}</div>;
}
