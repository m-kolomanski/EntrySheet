import { EntrySheet } from './EntrySheet';

export default {
    component: EntrySheet,
    parameters: {
        layout: "padded"
    }
};

export const Primary = {
    args: {
        id: 'test-id',
        layout: {
            "id_field": "ID",
            "name_field": "Entry_name",
            "owner_field": "Owner",
            "sections": {
                "Main": []
            }
        },
        data: {
            "ID": 1,
            "Entry_name": "Test entry",
            "Owner": "Jan Kowalski"
        }
    }
};
