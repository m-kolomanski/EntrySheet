import { EntrySheet } from './EntrySheet';

export default {
    component: EntrySheet,
    parameters: {
        layout: "padded"
    }
};

const main_mockup_layout = {
    "id_field": "ID",
    "name_field": "Entry_name",
    "owner_field": "Owner",
    "sections": {
        "Main": ["Text_field", "Numeric_field", "Datestring_field"]
    }
}

const main_mockup_data = {
    "ID": 1,
    "Entry_name": "Test entry",
    "Owner": "Jan Kowalski",
    "Text_field": "some value",
    "Numeric_field": "123",
    "Datestring_field": "2024-03-03"
}

const main_mockup_field_types = {
    "Numeric_field": "numeric",
    "Datestring_field": "datestring"
}

export const Primary = {
    args: {
        id: 'test-id',
        layout: main_mockup_layout,
        data: main_mockup_data,
        editable: true,
        field_types: main_mockup_field_types
    }
};

export const notEditable = {
    args: {
        id: 'test-id',
        layout: main_mockup_layout,
        data: main_mockup_data,
        editable: false
    }
}
