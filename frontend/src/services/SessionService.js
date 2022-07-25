import http from "../HttpCommon";

class SessionService {
	findByPresenterId(presenterId) {
		return http.get(`/presenters/${presenterId}/sessions`);
	}
	create(presenterId, data) {
		return http.post(`/presenters/${presenterId}/sessions`, data);
	}
}

export default new SessionService();
