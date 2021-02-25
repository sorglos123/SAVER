import Api from '@/services/Api';

export default {
    queryUserList(data) {
        return Api().post('receipts', data);
    },
    queryCalendarList(data) {
        return Api().post('calendar', data);
    }
}