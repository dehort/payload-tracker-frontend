import React, { useState } from 'react';
import { Dropdown, DropdownToggle } from '@patternfly/react-core';
import { ArrowRightIcon } from '@patternfly/react-icons'
import DateRangePicker from 'react-daterange-picker'
import { 
    setStartDate, setEndDate, addPayloadsFilter, removePayloadsFilter
} from '../actions';
import 'react-daterange-picker/dist/css/react-calendar.css'
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

const DateRangeFilter = props => {

    const [isOpen, setOpen] = useState(null)

    function _getId(array, type) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].type === type){
                return array[i].id
            }
        }
    }

    const setDates = (value, states) => {
        props.dispatch(removePayloadsFilter(_getId(props.filters, 'date_gte')));
        props.dispatch(setStartDate(value.start.format("YYYY-MM-DD")));
        props.dispatch(addPayloadsFilter('date_gte', value.start.format("YYYY-MM-DD")));
        props.dispatch(removePayloadsFilter(_getId(props.filters, 'date_lte')));
        props.dispatch(setEndDate(value.end.format("YYYY-MM-DD")));
        props.dispatch(addPayloadsFilter('date_lte', value.end.format("YYYY-MM-DD")));
        setOpen(false);
    }

    return (
        <Dropdown
            toggle={
                <DropdownToggle
                    onToggle={() => setOpen(!isOpen)}
                >
                    {props.start !== null ? props.start: "Start Date"} <ArrowRightIcon/> {props.end !== null ? props.end: "End Date"}
                </DropdownToggle>
            }
            isOpen={isOpen}
        >
            <DateRangePicker
                value={
                    (props.start && props.end) ? 
                    moment.range(
                    moment(props.start, 'YYYY-MM-DD'), 
                    moment(props.end, 'YYYY-MM-DD')) :
                    null
                }
                onSelect={setDates}
                singleDateRange={true}
            />
        </Dropdown>
    )
}

export default DateRangeFilter;