import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/Redux/UserSlice";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";

export default function Document() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernamealert, setusernamealert] = useState(false);
  const [emailalert, setemailalert] = useState(false);

  const dispatch = useDispatch();

  const signIn = () => {
    window.open(
      "https://fipr-backend.onrender.com/auth/google/callback",
      "_self"
    );
  };
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const signup = async () => {
    if (!validateEmail(email)) {
      setemailalert(true);
      return;
    } else {
      const user = {
        name: name,
        password: password,
        email: email,
      };
      const { data } = await axios.post(
        `https://fipr-backend.onrender.com/create-user`,
        user,
        { withCredentials: true }
      );
      if (data.message == "user exist") {
        setusernamealert(true);
        return;
      }
      if (data.user) {
        dispatch(setUser(data.user));
        window.open("https://flipr-hackathon-project.vercel.app", "_self");
      }
    }
  };
  return (
    <Layout>
      <div className="flex justify-center">
        <Card color="transparent" shadow={false} className="my-10">
          <Typography variant="h4" className="text-blue-500">
            Sign Up
          </Typography>
          <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-4">
              <div>
                {emailalert && (
                  <p className="mb-2 text-red-700">Invalid email*</p>
                )}
                {usernamealert && (
                  <p className="mb-2 text-red-700">Email already exists*</p>
                )}
                <Input
                  value={email}
                  onClick={() => setemailalert(false)}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  label="Email"
                />
              </div>
              <div>
                {usernamealert && (
                  <p className="mb-2 text-red-700">Email already exists*</p>
                )}
                <Input
                  value={name}
                  onClick={() => setusernamealert(false)}
                  onChange={(e) => setName(e.target.value)}
                  size="lg"
                  label="Name"
                />
              </div>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                size="lg"
                label="Password"
              />
            </div>
            <Button className="my-3" fullWidth onClick={signup}>
              Sign-up
            </Button>
            <div className="text-center text-white">OR</div>
            <Button
              className="my-3"
              variant="outlined"
              fullWidth
              onClick={signIn}
            >
              Sign-up with Google
            </Button>
            <Typography
              color="white"
              className="mt-4 text-center font-normal text-white "
            >
              Already have an account?
              <Link href="/sign-in">
                <button
                  href="/sign-in"
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Sign In
                </button>{" "}
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
