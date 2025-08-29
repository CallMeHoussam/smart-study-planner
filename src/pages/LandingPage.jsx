import React from "react";
import { Link } from "react-router-dom";

function FeatureCard({ icon, title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-3">
        <div className="h-12 w-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{children}</p>
    </div>
  );
}

export default function LandingPage({ tasks }) {
  const total = tasks?.length || 0;
  const completed = tasks?.filter((t) => t.completed).length || 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const recentTasks = tasks?.slice(0, 4) || [];

  return (
    <main className="">
        {}
        <div className="max-w-70xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Plan smarter.{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                Study calmer.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl">
              Organize tasks by subject, set priorities, estimate time, and track
              progress with a clean interface designed for focus and productivity.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                aria-label="Start planning - go to dashboard"
              >
                Start planning
                <svg
                  className="w-5 h-5"
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
                className="inline-flex items-center gap-2 px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all duration-300"
              >
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </a>
            </div>
          </div>

          {}
          <div className="relative">
            <div className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-xl overflow-hidden">
              <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-indigo-50 dark:bg-indigo-900/20 blur-3xl opacity-60 pointer-events-none"></div>

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Today's Tasks</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quick view of your priority tasks</p>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {total} tasks
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {recentTasks.length > 0 ? recentTasks.map((task, i) => (
                  <li key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <span
                      className={`h-3 w-3 rounded-full inline-block flex-shrink-0 ${
                        task.completed
                          ? "bg-green-400"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 dark:text-white truncate">{task.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {task.subject || "No subject"}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300 flex-shrink-0">
                      {task.completed ? "✅" : "🕒"}
                    </div>
                  </li>
                )) : (
                  <li className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-sm">No tasks yet. Start planning!</p>
                  </li>
                )}
              </ul>

              {}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Progress
                  </div>
                  <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    {progress}%
                  </div>
                </div>

                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <section id="features" className="py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Built for focus & simplicity
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to organize your study sessions and boost productivity
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard icon="🗂️" title="Organize by subject">
                Keep tasks grouped by subject. Filter, search and focus on what matters most.
              </FeatureCard>

              <FeatureCard icon="⏱️" title="Time estimates">
                Add estimated time to tasks and plan realistic study sessions with focus hours.
              </FeatureCard>

              <FeatureCard icon="🔔" title="Reminders & priorities">
                Set priorities and never miss important deadlines or exam preparations.
              </FeatureCard>

              <FeatureCard icon="💾" title="Offline-first">
                Works with LocalStorage — your data stays securely on your device.
              </FeatureCard>

              <FeatureCard icon="🍅" title="Pomodoro-ready">
                Built-in Pomodoro timer to keep you focused and avoid burnout during sessions.
              </FeatureCard>

              <FeatureCard icon="📊" title="Progress tracking">
                Visual progress indicators and statistics to monitor your study achievements.
              </FeatureCard>
            </div>
          </div>
        </section>
      
    </main>
  );
}