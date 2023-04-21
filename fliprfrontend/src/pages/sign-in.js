import ComplexNavbar from '@/components/Navbar'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Document() {
  const signIn = () => {
    window.open('http://localhost:3001/auth/google/callback', "_self");
  }
  return (
    <main className="flex min-h-screen flex-col p-0 items-center">
      <ComplexNavbar />
      <Card color="transparent" shadow={false} className='my-10'>
        <Typography variant="h4" className="text-blue-500">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome Back
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-4">
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
          </div>
          <Button className="my-3" fullWidth>
            Sign-in
          </Button>
          <div className='text-center'>OR</div>
          <Button className="my-3" variant="outlined" fullWidth onClick={signIn}>
            Sign-in with Google
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an Account?{" "}
            <a
              href="/sign-up"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Create a new one
            </a>
          </Typography>
        </form>
      </Card>
    </main>
  )
}
