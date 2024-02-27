import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/EntrySheet.css';

export const EntrySheet = ({id, layout, data}) => {
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

            {
                Object.keys(layout['sections']).map((section) => {
                    return(
                        <SheetSection
                            header={section}
                        ></SheetSection>
                    )
                })

            }
        </div>
    );
};

const SheetHeader = ({entry_id, entry_name, owner}) => {
    return (
        <header class="sheet-header">
            <input
                type="text"
                value={entry_name}
            ></input>
            <p>Owned by</p>
            <input
                type="text"
                value={owner}
            ></input>
            { entry_id ? <span>Entry ID: {entry_id}</span> : "" }
        </header>
    )
};

const SheetSection = ({header}) => {
    return(
        <section class="sheeet-section">
            <h1>{header}</h1>
            <div class="">
                Content
            </div>
        </section>
    )
}

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