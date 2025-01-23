import { formatHexString } from "@/utils/evm";
import { getChildrenText } from "@/utils/content";
import { type ReactNode, useState, useEffect } from "react";
import { getCurrentViemChain } from "@/utils/chains";
// import { Link } from '@aragon/gov-ui-kit'

export const AddressText = ({ children, bold }: { children: ReactNode; bold?: boolean }) => {
  const address = getChildrenText(children);
  const chain = getCurrentViemChain();
  const [link, setLink] = useState<string>();

  const useBold = bold === undefined ? true : bold;

  useEffect(() => {
    if (!chain) return;

    setLink(`${chain?.blockExplorers?.default?.url}/address/${address}`);
  }, [address, chain]);

  const formattedAddress = formatHexString(address.trim());
  if (!link) {
    return <span className={`${useBold ? "font-semibold" : ""} text-primary-400 underline`}>{formattedAddress}</span>;
  }
  return (
    <>
      <a href={link} target="_blank" className={`${useBold ? "font-semibold" : ""} text-primary-400 underline`}>
        {formattedAddress}
      </a>
    </>
  );
};
