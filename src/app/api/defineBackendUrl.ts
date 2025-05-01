export const defineBackendUrl = async () => {
	// AWS.config.update({
	// 	accessKeyId: env.AWS_ACCESS_KEY_ID,
	// 	secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
	// 	region: env.AWS_REGION,
	// });
	// const params = {
	// 	NamespaceName: "cb.internal",
	// 	ServiceName: "backend",
	// };

	// const cloudmap = new ServiceDiscovery();
	// const service = await cloudmap.discoverInstances(params).promise();

	// const backendUrl = service.Instances?.[0]?.Attributes?.AWS_INSTANCE_IPV4;
	// const dev = env.NODE_ENV === "development";
	// return dev ? "http://localhost:4444" : `http://${backendUrl}:4444`;
	return "http://localhost:7001";
};
