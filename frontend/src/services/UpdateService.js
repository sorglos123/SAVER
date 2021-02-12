import Api from '@/services/Api';

export default {
    updateUser(data) {
        return Api().post('update', data);
    },
}