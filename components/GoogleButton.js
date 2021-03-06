import {Button} from "@chakra-ui/button";
import {useRouter} from "next/router";

import {GoogleIcon} from "@/styles/theme";

const GoogleButton = ({mt, icon, children, callback, redirect}) => {
  const router = useRouter();

  return (
    <Button
      mt={mt ? mt : 0}
      aria-label="Continue whit google to login/register"
      onClick={async e => {
        await callback();
        router.push(`/dashboard/${redirect || ""}`);
      }}
      backgroundColor="white"
      color="gray.900"
      variant="outline"
      fontWeight="medium"
      leftIcon={icon ? icon : <GoogleIcon />}
      _hover={{bg: "gray.100"}}
      _active={{
        bg: "gray.100",
        transform: "scale(0.95)",
      }}
    >
      {children || "Continue with Google"}
    </Button>
  );
};

export default GoogleButton;
