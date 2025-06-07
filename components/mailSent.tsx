interface MailSuccessProps {
  access: string;
  password?: boolean;
}

const MailSuccess: React.FC<MailSuccessProps> = ({
  access,
  password = false,
}) => {
  return (
    <>
      <div className="relative min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
        <div className="p-8 md:p-12">
          <div className="flex justify-center">
            <div className={`${access === "link" ? "lg:w-1/2" : "lg:w-3/4"} w-full`}>
              <div className="text-center p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors duration-500">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-700 dark:text-white">
                  <i className="fa fa-envelope"></i>
                  <span className="block text-xl md:text-2xl font-semibold mt-5">
                    {access === "link"
                      ? "Password Reset Link Sent!"
                      : password
                      ? "Password Reset Successfully!"
                      : "Registered Successfully!"}
                  </span>
                </h1>
                <p className="py-6 text-gray-600 dark:text-gray-400">
                  {access === "link"
                    ? "Please check your email for a link to reset your password. If you don't receive it in a few minutes, check your spam folder or try again."
                    : password
                    ? "Your password has been reset successfully. You can now log in with your new password."
                    : "You have successfully registered. Please login to continue."}
                </p>
                <div className="mx-auto h-32 w-32 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 transition-colors duration-500">
                  {access === "link" ? (
                    <img
                      src="/images/check.svg"
                      className="h-full w-full rounded-full"
                      alt="check"
                    />
                  ) : (
                    <a
                      href="/auth/signin"
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300"
                    >
                      Login
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailSuccess;
