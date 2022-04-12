import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { NavigationBtn } from 'utils/navigationBtn';
import useRedirect from 'hooks/useRedirect';

const NavBar = () => {
  const { push } = useRedirect();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const navBts =
    session.user.role?.name === 'Admin'
      ? NavigationBtn.ADMIN_NAV_BTNS
      : NavigationBtn.USER_NAV_BTNS;

  const dynamicUrls = {
    userName: session.user.name,
  };

  const getDynamicUrl = (key: string): string => dynamicUrls[key];

  return (
    <div>
      <nav className='border-solid border-b-2 border-b-blue-500'>
        <div className='max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center w-full'>
              <div className='flex-shrink-0 ml-3 text-blue-500 font-semibold'>
                <Link href='/' passHref>
                  <span>Capacitation Management</span>
                </Link>
              </div>
              <div className='hidden md:flex flex-1 justify-end'>
                <div className='ml-10 flex space-x-4 items-center align-middle'>
                  {navBts.map((btn) => (
                    <button
                      key={btn.label}
                      onClick={() =>
                        push(
                          btn.isDynamic
                            ? `${btn.url}/${getDynamicUrl(btn.dynamicUrlKey)}`
                            : btn.url
                        )
                      }
                      type='button'
                      className='border border-transparent hover:border-blue-500 text-blue-500 px-3 py-2 rounded-md text-sm font-medium'
                    >
                      {btn.label}
                    </button>
                  ))}

                  <button
                    type='button'
                    className='m-0'
                    onClick={() => push('/profile')}
                  >
                    <Image
                      className='h-8 w-8 rounded-full'
                      src={
                        session.user.profile?.customImage ?? session.user.image
                      }
                      alt='Workflow'
                      width={40}
                      height={40}
                    />
                  </button>

                  <button
                    type='button'
                    className='text-white px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-200 hover:text-red-500'
                    onClick={() => signOut({})}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className='-mr-2 flex md:hidden'>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type='button'
                className='inline-flex text-blue-500 items-center border-blue-500 justify-center p-2 rounded-md hover:text-indigo-400  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white'
                aria-controls='mobile-menu'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                {!isOpen ? (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                ) : (
                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter='transition ease-out duration-100 transform'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='transition ease-in duration-75 transform'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div
            className='md:hidden absolute w-full border-y-2 border-y-blue-500 z-50 bg-gray-900'
            id='mobile-menu'
          >
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col '>
              {navBts.map((btn) => (
                <button
                  key={btn.label}
                  type='button'
                  className='border justify-start flex border-transparent hover:border-blue-500 text-blue-500 px-3 py-2 rounded-md text-sm font-medium'
                  onClick={() =>
                    push(
                      btn.isDynamic
                        ? `${btn.url}/${getDynamicUrl(btn.dynamicUrlKey)}`
                        : btn.url
                    )
                  }
                >
                  {btn.label}
                </button>
              ))}

              <button
                type='button'
                className='ml-3 flex justify-start'
                onClick={() => push('/profile')}
              >
                <Image
                  className='h-8 w-8 rounded-full'
                  src={session.user.profile?.customImage ?? session.user.image}
                  alt='Workflow'
                  width={40}
                  height={40}
                />
                <span className='border border-transparent text-blue-500 px-3 py-2 rounded-md text-sm font-medium'>
                  Profile
                </span>
              </button>

              <button
                type='button'
                className='text-white justify-start flex px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-200 hover:text-red-500'
                onClick={() => signOut({})}
              >
                Logout
              </button>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
};

export default NavBar;
