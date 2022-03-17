import React from 'react'
import Link from "next/link";
import { matchRoles } from 'utils/matchRoles';

export async function getServerSideProps(context: any) {
  return {
    props: { ...(await matchRoles(context)) },
  };
}

  
export default function CreateCourse() {

  // crear funcion para guardar curso
  const createCourse = async e => {
    e.preventDefault();


  }


  return (
    <div className="container px-8 py-12 h-screen bg-gray-100 m-z">
      <div className=" px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
        <h1 className="block text-gray-700 text-center max-w-full font-bold mb-2">
          Create new course
        </h1>
      </div>
      <form onSubmit={createCourse} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl">
        <div className="m-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Course name
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="text"
            id="name"
          />
        </div>
        <div className="m-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hours"
          >
            Time
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            id="hours"
            type="number"
            min={1}
            defaultValue="1"
          />
        </div>
        <div className="m-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="link"
          >
            Link to course
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            id="link"
            type="text"
          />
        </div>
        <div className="m-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="platform"
          >
            Platform:
          </label>
          <select id="Platform" name="Platform" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal">
            <option value="Platzi">Platzi</option>
            <option value="Udemy">Udemy</option>
            <option value="Udacity">Udacity</option>
            <option value="Edx">Edx</option>
            <option value="Coursera">Coursera</option>
            <option value="Acamica">Acamica</option>
            <option value="Youtube">Youtube</option>
          </select>
        </div>
        <div className="m-4 grid grid-rows-2">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Create
          </button>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <Link href="/courses">Back to courses</Link>
          </button>
        </div>
      </form>
      <p className="text-center text-indigo-500 text-xs">
        &copy;2022 Ing Web. All rights reserved.
      </p>
    </div>
  );
}
