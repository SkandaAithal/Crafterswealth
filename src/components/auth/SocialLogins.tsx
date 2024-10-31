import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useApp } from "@/lib/provider/app-provider";
import { AppActionTypes } from "@/lib/types/common/app";

const SocialLogins = () => {
  const { appDispatch } = useApp();
  const handleGoogleSignIn = () => {
    appDispatch({
      type: AppActionTypes.SET_TO_DEFAULT,
    });
    signIn("google");
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-[340px] !h-auto mx-auto rounded-full !p-2.5 flex justify-center items-center gap-3 shadow-md"
        loaderTheme="dark"
        onClick={handleGoogleSignIn}
      >
        <FcGoogle size={25} />
        <p className="text-base">Continue with Google</p>
      </Button>

      <div className="flex items-center w-full mt-2">
        <div className="flex-1 h-[0.25px] bg-slate-400"></div>
        <div className="text-slate-400 text-center mx-2">or</div>
        <div className="flex-1 h-[0.25px] bg-slate-400"></div>
      </div>
    </>
  );
};

export default SocialLogins;
