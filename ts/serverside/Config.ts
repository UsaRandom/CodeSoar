
declare var process;

module CodeSoar.Server {
	
export class Config {
	
	constructor (socketHost : string, mongodbUser : string, mongodbPass : string,
				 mongodbHost : string, mongodbPort: number, mongodbName : string,
				 appPort : number, appIP : string, nodePort : number, nodeIP : string) {

		this.SOCKETIO_HOST = socketHost;
		this.MONGODB_USERNAME = mongodbUser;
		this.MONGODB_PASSWORD = mongodbPass;
		this.MONGODB_HOST = mongodbHost;
		this.MONGODB_PORT = mongodbPort;
		this.MONGODB_DB_NAME = mongodbName;
		this.APP_PORT = appPort;
		this.APP_IP = appIP;
		this.NODEJS_PORT = nodePort;
		this.NODEJS_IP = nodeIP;
	}

	static Get() : CodeSoar.Server.Config {
		//switch this when moving to production.
		return CodeSoar.Server.Config._DEV;
	}

	//Variables used for configuration
	public SOCKETIO_HOST : string;
	public MONGODB_USERNAME : string;
	public MONGODB_PASSWORD : string;
	public MONGODB_HOST : string;
	public MONGODB_PORT : number;
	public MONGODB_DB_NAME : string;
	public APP_PORT : number;
	public APP_IP : string;
	public NODEJS_PORT : number;
	public NODEJS_IP : string;


	//Development configuration
	private static _DEV : CodeSoar.Server.Config
		= new Config(

				"http://localhost",
				"dev",
				"pass",
				"localhost",
				27017,
				"codesoar",
				80,
				'127.0.0.1',
				8000,
				'127.0.0.1'
			  ); 



	//Production configuration
	private static _PROD : CodeSoar.Server.Config
		= new Config(

				"codesoar-nodejshost.rhcloud.com:8000",
				process.env.OPENSHIFT_MONGODB_DB_USERNAME || "",
				process.env.OPENSHIFT_MONGODB_DB_PASSWORD || "",
				process.env.OPENSHIFT_MONGODB_DB_HOST || "",
				parseInt(process.env.OPENSHIFT_MONGODB_DB_PORT) || 0,
				process.env.OPENSHIFT_APP_NAME || "",
				parseInt(process.env.OPENSHIFT_INTERNAL_PORT) || 8080,
				process.env.OPENSHIFT_INTERNAL_IP || "",
				parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8000,
				process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

			  );
}

}
