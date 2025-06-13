export const ROUTES = {
	Home: "/",
	SignIn: "/auth/sign-in",
	SignUp: "/auth/sign-up",
	Profile: "/profile",
	ChangePassword: "/profile/change-password",
	Learning: {
		Roadmap: "/learning/roadmap",
		Leaderboard: "/learning/leaderboard",
		Learning: (testId: string) => `/learning/${testId}`,
		TestAttempt: (testAttemptId: string) => `/learning/test/${testAttemptId}`,
	},
	Admin: {
		Tests: {
			Root: "/admin/tests",
			Create: "/admin/tests/create",
		},
		Subscriptions: {
			Root: "/admin/subscriptions",
			Create: "/admin/subscriptions/create",
			Edit: (id: string) => `/admin/subscriptions/${id}`,
		},
	},
};
