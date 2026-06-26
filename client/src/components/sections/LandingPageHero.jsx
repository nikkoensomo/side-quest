const LandingPageHero = ({ onGetStarted, onLogin }) => {
    return (
        <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    Local errands, made simple
                </span>

                <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-tight text-zinc-950 md:text-6xl">
                    Post a quest. Accept a quest. Get things moving.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
                    SideQuest helps people post small delivery tasks and lets others accept them, complete them, and earn along the way.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={onGetStarted}
                        className="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                        Start a Quest
                    </button>

                    <button
                        type="button"
                        onClick={onLogin}
                        className="rounded-md border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                        Login
                    </button>
                </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <div className="rounded-lg bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-700">Available Quest</p>

                    <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
                        Deliver documents to USC Main
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                        Pick up from Talamban and deliver before 4:00 PM.
                    </p>

                    <div className="mt-5 grid gap-3">
                        <div className="rounded-md bg-white p-3">
                            <p className="text-xs font-medium text-gray-500">Pickup</p>
                            <p className="text-sm font-semibold text-zinc-900">Talamban Campus</p>
                        </div>

                        <div className="rounded-md bg-white p-3">
                            <p className="text-xs font-medium text-gray-500">Reward</p>
                            <p className="text-lg font-bold text-zinc-950">₱150</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onGetStarted}
                        className="mt-5 w-full rounded-md bg-zinc-950 px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
                    >
                        Accept Quest
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LandingPageHero;