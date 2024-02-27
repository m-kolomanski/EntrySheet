import React from 'react';
import { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import './EntrySheet.css';
import { renameLabel, range } from '../../utils/utils.js';

const DataContext = createContext(null);

export const EntrySheet = ({id, layout, data}) => {
    const entry_id = data[layout["id_field"]];
    const entry_name = data[layout["name_field"]];
    const entry_owner = data[layout["owner_field"]];

    //const DataContext = createContext('test'); 

    return (
        <div className="entry-sheet" id={id}>
             
                <SheetHeader
                    entry_id={entry_id}
                    entry_name={entry_name}
                    owner={entry_owner}
                ></SheetHeader>

                <DataContext.Provider value={data}>
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
                </DataContext.Provider>
            
        </div>
    );
};

EntrySheet.propTypes = {
    id: PropTypes.string,
    layout: PropTypes.object,
    data: PropTypes.object
};
  
EntrySheet.defaultProps = {
    id: "",
    layout: {},
    data: {}

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

    const field_elements = fields.map((field) => {
        return(
            <div className='section-row'>
                <TextWidget
                    name={field}
                    value={data[field]}
                    label={field}
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
    name, value = "", label, multiline = false
}) => {
    const [curVal, setCurVal] = useState(value);

    const id = `input-${name}`;

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
                />
                :
                <input
                    type="text"
                    id={id}
                    className="text-widget"
                    value={curVal == null ? "" : curVal}
                    autoComplete="one-time-code"    
                />
            }

        </div>
    )
}

