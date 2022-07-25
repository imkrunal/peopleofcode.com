import { Disclosure, Menu, Transition } from "@headlessui/react";
import { trpc } from "@lib/trpc";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactNode } from "react";
import { HiCode, HiMenu, HiX } from "react-icons/hi";
import Button from "./Button";

type NavLinkProps = LinkProps & {
  children?: ReactNode;
  current?: boolean;
};

const Navigation = () => {
  const session = trpc.useQuery(["auth.public.session"]).data;
  const router = useRouter();

  const NavLink = ({ href, children, ...props }: NavLinkProps) => (
    <Link href={href}>
      <a
        className={classNames(
          "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
          router.pathname === href
            ? "border-indigo-500 text-gray-900"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 "
        )}
        {...props}
      >
        {children}
      </a>
    </Link>
  );

  const MobileNavLink = ({ href, children, ...props }: NavLinkProps) => (
    <Link href={href}>
      <Disclosure.Button
        // @ts-ignore
        as="a"
        className={classNames(
          "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
          router.pathname === href
            ? "bg-indigo-50 border-indigo-500 text-indigo-700"
            : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
        )}
        {...props}
      >
        {children}
      </Disclosure.Button>
    </Link>
  );
  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-100">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <HiX className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <HiMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <a className="flex items-center">
                    <HiCode className="h-6 w-6 text-indigo-500" />
                    <span className="hidden md:block ml-2 text-xl font-semibold text-indigo-500">
                      People of Code
                    </span>
                  </a>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <NavLink href="/developers">Developers</NavLink>
                  <NavLink href="/pricing">Pricing</NavLink>
                  <NavLink href="/about">About</NavLink>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!session && (
                  <div className="hidden md:block space-x-2">
                    <Button href="/auth/login" size="sm">
                      Sign in
                    </Button>
                    <Button href="/auth/register" size="sm">
                      Register
                    </Button>
                  </div>
                )}
                {session && session !== null && (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              <MobileNavLink href="/developers">Developers</MobileNavLink>
              <MobileNavLink href="/pricing">Pricing</MobileNavLink>
              <MobileNavLink href="/about">About</MobileNavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;
