import Api from '@/services/Api';

export default {
    uploadReceiptData(data) {
        return Api().post('uploadReceiptData', data);
    },
}