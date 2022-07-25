import { Alert, Button, Checkbox, Input } from "@components/ui";
import { getSession } from "@lib/auth";
import { FormikProvider, useFormik } from "formik";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/router";
import { trpc } from "@lib/trpc";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const mutation = trpc.useMutation("auth.public.register", {
    onSuccess: () => router.push("/"),
    onError: (err) => setError(err.message),
  });
  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: true,
    },
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: async (values) => mutation.mutate(values),
  });

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Peopleofcode.com
        </h2>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={form.handleSubmit}>
            <FormikProvider value={form}>
              <Input name="name" label="Full Name" />
              <Input name="email" type="email" label="Email Address" />
              <Input name="password" type="password" label="Password" />
              <Checkbox
                name="terms"
                label="By signing up, you agree to our Terms of Service and Privacy
                Policy."
                disabled
              />
              {error && <Alert type="error">{error}</Alert>}
              <Button type="submit" loading={mutation.isLoading} fullWidth>
                Sign up
              </Button>
            </FormikProvider>
          </form>
        </div>
        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/auth/login">
            <a className="text-indigo-600">Sign In</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

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
