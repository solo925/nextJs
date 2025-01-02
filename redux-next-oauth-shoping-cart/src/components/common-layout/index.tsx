import { auth } from "@/auth";
import { ReactNode, Suspense } from "react";

const { default: ReduxProvider } = require("@/provider");


interface CommonLayoutProps {
  children: ReactNode;
}

async function CommonLayout({ children }: CommonLayoutProps) {
  const getSession = await auth();

  return (
    <ReduxProvider getSession={getSession}>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </ReduxProvider>
  );
}

export default CommonLayout;
