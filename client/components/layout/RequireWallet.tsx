import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  currentAccount: string | undefined;
  connectWallet: () => void;
};

const RequireWallet: FC<Props> = ({
  children,
  currentAccount,
  connectWallet,
}) => {
  return (
    <>
      {!currentAccount && (
        <div className="w-full">
          <button
            className="block btn btn-lg btn-primary mx-auto"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      )}
      {currentAccount && <div>{children}</div>}
    </>
  );
};

export default RequireWallet;
