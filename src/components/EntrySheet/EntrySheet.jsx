import React from 'react';
import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import './EntrySheet.css';
import { renameLabel, range } from '../../utils/utils.js';

const DataContext = createContext(null);
const isEditable = createContext(false);
const fieldTypes = createContext(null);

export const EntrySheet = ({id, layout, data, editable, field_types}) => {
    const entry_id = data[layout["id_field"]];
    const entry_name = data[layout["name_field"]];
    const entry_owner = data[layout["owner_field"]];

    return (
        <div className="entry-sheet" id={id}>
             
                <SheetHeader
                    entry_id={entry_id}
                    entry_name={entry_name}
                    owner={entry_owner}
                ></SheetHeader>

                <DataContext.Provider value={data}>
                <isEditable.Provider value={editable}>
                <fieldTypes.Provider value={field_types}>
                        {
                            Object.keys(layout['sections']).map((section) => {
                                return(
                                    
                                    <SheetSection
                                        header={section}
                                        fields={layout['sections'][section]}
                                    ></SheetSection>
                                    
                                )
                            })

                        }
                </fieldTypes.Provider>
                </isEditable.Provider>
                </DataContext.Provider>
        </div>
    );
};

EntrySheet.propTypes = {
    id: PropTypes.string,
    layout: PropTypes.object,
    data: PropTypes.object,
    editable: PropTypes.bool,
    field_types: PropTypes.object
};
  
EntrySheet.defaultProps = {
    id: "",
    layout: {},
    data: {},
    editable: true,
    field_types: {}
};

const SheetHeader = ({entry_id, entry_name, owner}) => {
    return (
        <header className="sheet-header">
            <textarea
                className='entry-name'
                value={entry_name}
            ></textarea>
            <p style={{gridColumn: 1}}>Owned by</p>
            <input
                type="text"
                value={owner}
                style={{gridColumn: 2}}
            ></input>
            { entry_id ? <span style={{gridColumn: 3}}>Entry ID: {entry_id}</span> : "" }
        </header>
    )
};

const SheetSection = ({header, fields}) => {
    const data = useContext(DataContext);
    const field_types = useContext(fieldTypes);

    const field_elements = fields.map((field) => {
        return(
            <div className='section-row'>
                <TextWidget
                    name={field}
                    value={data[field]}
                    label={field}
                    field_type={field_types[field]}
                />
            </div>

        )
    });

    return(
        <section className="sheet-section">
            <h1 className="section-header">{header}</h1>
            {
                field_elements
            }
        </section>
    )
};

const TextWidget = ({
    name, value = "", label, field_type = "text", multiline = false, char_max = false
}) => {
    const [curVal, setCurVal] = useState(value);

    const editable = useContext(isEditable);

    const id = `input-${name}`;

    let type_check, placeholder;
    
    switch (field_type) {
        case "text":
            type_check = /.*/; break;
        case "numeric":
            type_check = /^[0-9]*\.?[0-9]*$/; break;
        case "datestring":
            type_check = /^([0-9]{0,4})(-[0-9]{0,2})?(-[0-9]{0,2})?$/; placeholder = "YYYY-MM-DD"; break;
        case "picklist":
        case "multipicklist":
             // TODO;
        default:
            type_check = /.*/; break;
    }

    function handleInput(e) {
        let new_value = e.target.value;

        if (!editable) return;
        if (char_max && new_value.length > char_max) return;
        if (new_value !== "" && new_value.match(type_check) == null) return;

        if (["picklist", "multipicklist"].includes(field_type)) {
            // TODO
        }

        setCurVal(new_value);

        if (multiline) {
            let element = document.getElementById(id);
            element.style.height = "auto";
            element.style.height = `${element.scrollHeight}px`;
        }
    }

    return (
        <div
            className='sheet-input-container'
        >
            {
                label ? <label htmlFor={id}>{renameLabel(label)}</label> : null
            }    
            {
                multiline ?
                <textarea
                    type="text"
                    id={id}
                    className="text-widget"
                    value={curVal == null ? "" : curVal}
                    autoComplete="one-time-code"
                    placeholder={placeholder}
                    onChange={ handleInput }
                />
                :
                <input
                    type="text"
                    id={id}
                    className="text-widget"
                    value={curVal == null ? "" : curVal}
                    autoComplete="one-time-code"
                    onChange={ handleInput }
                    placeholder={placeholder}
                />
            }

        </div>
    )
}

