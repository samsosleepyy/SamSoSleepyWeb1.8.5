export function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-full p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-gray-900 dark:text-gray-100">Welcome to SamSoSleepyWeb</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Explore our collection of addons, UI modifications, and various tools for your gaming experience.
        </p>
        <div className="pt-4">
          <a
            href="https://discord.gg/FnmWw7nWyq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            My Discord: discord.gg/FnmWw7nWyq
          </a>
        </div>
      </div>
    </div>
  );
}
