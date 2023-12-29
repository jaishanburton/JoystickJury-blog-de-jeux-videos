import React from 'react';

function App() {
  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form method="POST" action="#">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="confirm-email" className="block text-sm font-medium text-gray-700">
                Confirm Email address
              </label>
              <div className="mt-1">
                <input id="confirm-email" name="confirm-email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input id="confirm-password" name="confirm-password" type="password" autoComplete="current-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="mt-1">
                <input id="dob" name="dob" type="date" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
            </div>

            <div className="flex items-center justify-center mt-6">
              <span className="mr-3 text-gray-700 font-medium">Gender:</span>
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio h-5 w-5 text-pink-600" name="gender" value="Male" />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input type="radio" className="form-radio h-5 w-5 text-purple-600" name="gender" value="Female" />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input id="terms-and-condition" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="terms-and-condition" className="ml-2 block text-sm text-gray-900">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
