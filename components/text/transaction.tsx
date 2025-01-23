import { formatHexString } from "@/utils/evm";
import { getChildrenText } from "@/utils/content";
import { type ReactNode, useState, useEffect } from "react";
import { getCurrentViemChain } from "@/utils/chains";
// import { Link } from '@aragon/gov-ui-kit'

export const TransactionText = ({ children }: { children: ReactNode }) => {
  const txHash = getChildrenText(children);
  const chain = getCurrentViemChain();
  const [link, setLink] = useState<string>();

  useEffect(() => {
    if (!chain) return;

    setLink(`${chain?.blockExplorers?.default?.url}/tx/${txHash}`);
  }, [txHash, chain]);

  const formattedHexValue = formatHexString(txHash.trim());
  if (!link) {
    return <span className="font-semibold text-primary-400 underline">{formattedHexValue}</span>;
  }
  return (
    <>
      {/**
        <Link href={link} iconRight="LINK_EXTERNAL">
          {formattedHexValue}
        </Link>
     */}
      <a href={link} target="_blank" className="font-semibold text-primary-400 underline">
        {formattedHexValue}
      </a>
    </>
  );
};
