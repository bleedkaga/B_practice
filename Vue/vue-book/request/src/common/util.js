import axios from 'axios'

// base config
const Util = {
	imgPath: 'http://127.0.0.1:8011/img/',
	apiPath: 'http://127.0.0.1:8010'
};

// ajax config
Util.ajax = axios.create({
	baseURL: Util.apiPath
})

Util.ajax.interceptors.response.use( res => {
	return res.data
})

export default Util;