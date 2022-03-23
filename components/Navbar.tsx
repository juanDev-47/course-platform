import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
// import Image from 'next/image';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className='border-solid border-b-2 border-b-blue-500'>
        <div className='max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center w-full'>
              <div className='flex-shrink-0'>
                {/* <Link href='/' passHref> */}
                {/* <Image
                    className='h-8 w-8 rounded-full'
                    src='https://drive.google.com/uc?export=view&id=0B6wwyazyzml-OGQ3VUo0Z2thdmc'
                    alt='Workflow'
                    layout='fill'
                  /> */}
                {/* </Link> */}
              </div>
              <div className='flex-shrink-0 ml-3 text-blue-500 font-semibold'>
                <span>Capacitation Management</span>
              </div>
              <div className='hidden md:flex flex-1 justify-end'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <Link href='/' passHref>
                    <span className='border border-transparent hover:border-blue-500 text-blue-500 px-3 py-2 rounded-md text-sm font-medium'>
                      Test
                    </span>
                  </Link>

                  <Link href='/' passHref>
                    <span className='border border-transparent hover:border-blue-500 text-blue-500 px-3 py-2 rounded-md text-sm font-medium'>
                      Test2
                    </span>
                  </Link>

                  <a href='/profile'>
                    <button
                      type='button'
                      className='inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-green-500 text-white hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 '
                    >
                      Profile
                    </button>
                  </a>
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
            className='md:hidden absolute w-full bg-white border-y-2 border-y-blue-500'
            id='mobile-menu'
          >
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col '>
              <Link href='/' passHref>
                <span className='border border-transparent hover:border-blue-500 text-blue-500 px-3 py-2 rounded-md text-sm font-medium'>
                  Test
                </span>
              </Link>

              <Link href='/' passHref>
                <span className='border border-transparent hover:border-blue-500 text-blue-500 px-3 py-2 rounded-md text-sm font-medium'>
                  Test2
                </span>
              </Link>

              <a href='/profile'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium bg-green-500 text-white hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Profile
                </button>
              </a>
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
};

export default NavBar;
