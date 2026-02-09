export default function Order() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black-900 via-gray-900 to-white px-4">
      <div className="max-w-lg text-center">
        {/* Glow circle */}
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-70" />

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white">
          Orders Coming Soon
        </h1>

        <p className="mb-8 text-gray-400">
          We’re crafting a seamless ordering experience just for you.
          Sit tight — something beautiful is on the way.
        </p>

        {/* Divider */}
        <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

        <span className="inline-block rounded-full border border-gray-700 px-4 py-1 text-sm text-gray-400">
          🚧 Under Construction
        </span>
      </div>
    </div>
  );
}
