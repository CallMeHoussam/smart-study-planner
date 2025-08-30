import { Link } from "react-router-dom";

export default function Header() {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Plan smarter. Study calmer.
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Organize your tasks by subject, estimate time, and track progress —
            all in a clean, responsive interface.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard" className="btn primary">Start Planning</Link>
            <Link
              to="/about"
              className="btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-100 to-white dark:from-indigo-900/30 dark:to-gray-800 shadow">
            <div className="h-48 rounded-xl bg-white/70 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 grid place-content-center text-center">
              <div className="text-2xl font-semibold">Your day at a glance</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">Tasks • Estimates • Progress</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}