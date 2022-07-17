import { Alert, Button, Checkbox, Input } from "@components/ui";
import { ErrorCode, getSession } from "@lib/auth";
import { FormikProvider, useFormik } from "formik";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const errorMessages: { [key: string]: string } = {
  [ErrorCode.IncorrectPassword]: "Incorrect password. Please try again.",
  [ErrorCode.UserNotFound]: "Account does not exists.",
  [ErrorCode.InternalServerError]:
    "Something went wrong!! Try again or contact us.",
  [ErrorCode.ThirdPartyIdentityProviderEnabled]:
    "Account registered using social login.",
};

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      const res = await signIn<"credentials">("credentials", {
        ...values,
        redirect: false,
      });
      setLoading(false);
      if (!res) {
        setError("Something went wrong!! Please try later.");
      } else if (res.error) {
        setError(errorMessages[res.error]);
      } else {
        router.push("/");
      }
    },
  });

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Peopleofcode.com
        </h2>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={form.handleSubmit}>
            <FormikProvider value={form}>
              <Input name="email" type="email" label="Email Address" />
              <Input name="password" type="password" label="Password" />
              <div className="flex items-center justify-between">
                <Checkbox name="remember_me" label="Remember Me" />
                <div className="text-sm">
                  <Link href="/auth/forgot-password">
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>
              {error && <Alert type="error">{error}</Alert>}
              <Button type="submit" loading={loading} fullWidth>
                Submit
              </Button>
            </FormikProvider>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
