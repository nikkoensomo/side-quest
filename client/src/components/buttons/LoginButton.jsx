const LoginButton = ({ onClick }) => {
  return (
    <>
      <button
        className="text-black hover:text-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
        onClick={onClick}
      >
        Login
      </button>
    </>
  );
}

export default LoginButton;