import Api from '@/services/Api';

export default {
    queryList(data) {
        return Api().post('calendar', data);
    }
}