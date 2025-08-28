import React from "react";
import { Link } from "react-router-dom";

function FeatureCard({ icon, title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-3">
        <div className="h-12 w-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{children}</p>
    </div>
  );
}

export default function LandingPage({ tasks }) {
  const total = tasks?.length || 0;
  const completed = tasks?.filter((t) => t.completed).length || 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Plan smarter.{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Study calmer.
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Organize tasks by subject, set priorities, estimate time, and track
              progress clean interface, and built for focus.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
                aria-label="Start planning - go to dashboard"
              >
                Start planning
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>

              <a
                href="#features"
                className="inline-flex items-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* right - Today card */}
          <aside className="relative">
            <div className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-lg overflow-hidden">
              {/* decorative */}
              <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-indigo-50 dark:bg-indigo-900/20 blur-3xl opacity-60 pointer-events-none"></div>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Today</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Quick view of your priority tasks</p>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {total} tasks
                </div>
              </div>

              <ul className="mt-5 space-y-4">
                {tasks?.map((task, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span
                      className={`h-3 w-3 rounded-full inline-block ${
                        task.completed
                          ? "bg-green-400"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-hidden
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{task.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {task.time || "No estimate"}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {task.completed ? "✅" : "🕒"}
                    </div>
                  </li>
                ))}
              </ul>

              {/* ✅ Dynamic progress bar */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Progress
                </div>
                <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  {progress}%
                </div>
              </div>

              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-2">
                <div
                  className="h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </aside>
        </div>

        {/* FEATURES */}
        <section id="features" className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Built for focus & simplicity
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon="🗂️" title="Organize by subject">
              Keep tasks grouped by subject. Filter, search and focus on what matters.
            </FeatureCard>

            <FeatureCard icon="⏱️" title="Time estimates">
              Add estimated time to tasks and plan realistic study sessions.
            </FeatureCard>

            <FeatureCard icon="🔔" title="Reminders & priorities">
              Set priorities and never miss important deadlines or exams.
            </FeatureCard>

            <FeatureCard icon="💾" title="Offline-first">
              Works with LocalStorage — your data stays on your device until you export it.
            </FeatureCard>

            <FeatureCard icon="🍅" title="Pomodoro-ready">
              Built-in Pomodoro support to keep you focused and avoid burnout.
            </FeatureCard>
          </div>
        </section>
      </div>
    </main>
  );
}
