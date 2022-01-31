import config from './../Config/index';

const googleLogin = () => window.open(config.api_url+"/auth/google", "_parent")

export default googleLogin