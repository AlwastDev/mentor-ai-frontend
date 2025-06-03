export const ROUTES = {
	Home: "/",
	SignIn: "/auth/sign-in",
	SignUp: "/auth/sign-up",
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
