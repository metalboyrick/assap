import { useState } from "react";
import {
  usePrivy,
  useLoginWithEmail,
  useLoginWithOAuth,
  useLogin,
} from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { User, Mail, Twitter, Wallet } from "lucide-react";

export const PrivyLogin = () => {
  const { ready: isReady, authenticated: isAuthenticated } = usePrivy();
  const disableLogin = !isReady || (isReady && isAuthenticated);

  // Email OTP state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const {
    sendCode,
    loginWithCode,
    state: emailState,
  } = useLoginWithEmail({
    onComplete: () => setShowEmailModal(false),
    onError: () => {},
  });

  // Twitter/X OAuth
  // const { initOAuth, state: oauthState } = useLoginWithOAuth();

  // Solana Wallet
  const { login: walletLogin } = useLogin();

  return (
    <div className="flex flex-col gap-3 w-full max-w-xs mx-auto">
      {/* Email Login */}
      {/* <Button
        variant="outline"
        className="w-full flex items-center justify-start gap-2 border-zinc-700 py-4"
        disabled={
          disableLogin ||
          emailState.status === "sending-code" ||
          emailState.status === "submitting-code"
        }
        onClick={() => setShowEmailModal(true)}
      >
        <Mail className="w-4 h-4 mr-2 text-red-400" />
        Sign in with Email
      </Button> */}
      {/* Twitter/X Login */}
      {/* <Button
        variant="outline"
        className="w-full flex items-center justify-start gap-2 border-zinc-700 py-4"
        disabled={disableLogin || oauthState.status === "loading"}
        onClick={() => initOAuth({ provider: "twitter" })}
      >
        <Twitter className="w-4 h-4 mr-2 text-blue-400" />
        Sign in with Twitter/X
      </Button> */}
      {/* Solana Wallet Login */}
      <Button
        variant="outline"
        className="w-full flex items-center justify-start gap-2 border-zinc-700 py-4"
        disabled={disableLogin}
        onClick={() =>
          walletLogin({
            loginMethods: ["wallet"],
            walletChainType: "solana-only",
            disableSignup: false,
          })
        }
      >
        <Wallet className="w-4 h-4 mr-2 text-purple-400" />
        Sign in with Solana Wallet
      </Button>

      {/* Email OTP Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-200"
              onClick={() => setShowEmailModal(false)}
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-2">Sign in with Email</h3>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded border border-zinc-700 bg-zinc-800 text-zinc-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={
                  emailState.status === "sending-code" ||
                  emailState.status === "submitting-code"
                }
              />
              <Button
                onClick={() => sendCode({ email })}
                disabled={!email || emailState.status === "sending-code"}
                className="w-full"
              >
                {emailState.status === "sending-code"
                  ? "Sending..."
                  : "Send Code"}
              </Button>
              {["awaiting-code-input", "submitting-code"].includes(
                emailState.status,
              ) && (
                <>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="px-3 py-2 rounded border border-zinc-700 bg-zinc-800 text-zinc-100"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={emailState.status === "submitting-code"}
                  />
                  <Button
                    onClick={() => loginWithCode({ code })}
                    disabled={!code || emailState.status === "submitting-code"}
                    className="w-full"
                  >
                    {emailState.status === "submitting-code"
                      ? "Logging in..."
                      : "Login"}
                  </Button>
                </>
              )}
              {emailState.status === "error" && (
                <div className="text-red-500 text-sm">
                  {emailState.error?.message || "An error occurred."}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const PrivyLogout = () => {
  const { authenticated: isAuthenticated, logout } = usePrivy();
  const disableLogout = !isAuthenticated;

  return (
    <Button disabled={disableLogout} onClick={logout}>
      Logout
    </Button>
  );
};
