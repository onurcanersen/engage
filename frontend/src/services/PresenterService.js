import http from "../HttpCommon";

class PresenterService {
	findByEmail(email) {
		return http.get(`/presenters/${email}`);
	}
	create(data) {
		return http.post(`/presenters`, data);
	}
}

export default new PresenterService();
