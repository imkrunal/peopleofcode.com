import Link from "next/link";
import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div>
      <div>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          {/* <XIcon className="h-6 w-6 text-red-600" /> */}
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3
            className="text-lg font-medium leading-6 text-gray-900"
            id="modal-title"
          >
            {error}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Error</p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <Link href="/auth/login" passHref>
          <button className="flex w-full justify-center">Back to login</button>
        </Link>
      </div>
    </div>
  );
}
