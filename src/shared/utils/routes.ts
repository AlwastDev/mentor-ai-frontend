export const ROUTES = {
	Home: "/",
	SignIn: "/auth/sign-in",
	SignUp: "/auth/sign-up",
	Profile: "/profile",
	Learning: {
		Roadmap: "/learning/roadmap",
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
			Edit: (id: string) => `/admin/subscriptions/edit/${id}`,
		},
	},
};
