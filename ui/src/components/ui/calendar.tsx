import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

import { format } from "date-fns";
import React, { useEffect, useState } from 'react';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { ReservedDateDTO } from '../../dtos/revervedDates.dto';
import { GetReservations } from '../../services/getBook';
import { SnackbarHook } from '../hooks/useSnakbar';
import moment from 'moment';
import { addReservation } from '../../services/postBook';
import { carDTO } from '../../dtos/car.dto';

function OwnCalendar({rentCar, snackbar} : {rentCar: carDTO, snackbar: SnackbarHook}) {
    let today = new Date();

    const bookLists = React.useRef<ReservedDateDTO[]>();
    const [bookList, setBookList] = useState<ReservedDateDTO[]>()
    const [date, setDate] = useState<Date[]>();

    
    useEffect(() => {
        GetReservations(rentCar.id, setBookList, snackbar);
    }, [])

    useEffect(() => {

        bookLists.current = bookList;
    }, [bookList])
    
    const dateTemplate = (date: any) => {
        console.log(bookList)
        if (bookLists.current){
            bookLists.current.map((e, i) => {
                console.log(e.start.getMonth , date.month , e.start.getFullYear , date.year)

                if (e.start.getMonth == date.month && e.start.getFullYear == date.year)
                {
                    if (e.start.getDay <= date.day && e.end.getMonth <= date.month && e.end.getFullYear <= date.year)
                    {
                        return (
                            <strong  style={{ textDecoration: 'line-through' }}>{date.day}</strong>
                        );
                    }
                }
            })
            return date.day;
        }
    }

    function cpmDateInf(date1 : Date, date2 : Date)
    {
        const formDate1 = moment(date1).format('DD-MM-YYYY');
        const formDate2 = moment(date2).format('DD-MM-YYYY');

        const cdate1 = moment(formDate1, 'DD-MM-YYYY');
        const cdate2 = moment(formDate2, 'DD-MM-YYYY');
        if (cdate1.isBefore(cdate2)) {
            return true
        } else if (cdate2.isBefore(cdate1)) {
            return false
          } else {
            return false
          }
    }

    const setDates = (e: CalendarChangeEvent) => 
    {
        
       if (e.value && typeof e.value !== "string" && typeof e.value === 'object' && Array.isArray(e.value))
            setDate(e.value)
    }
    
    const tryBook = () => {
        if (!date || date.length != 2)
            return;

            const formDate1 = moment(date[0]).format('DD-MM-YYYY');
        const formDate2 = moment(date[1]).format('DD-MM-YYYY');

        const date1 = moment(formDate1, 'DD-MM-YYYY');
        const date2 = moment(formDate2, 'DD-MM-YYYY');

        if (cpmDateInf(date[0], date[1]))
        {
            addReservation(rentCar.id, {start: date[0], end: date[1], carId: rentCar.id}, snackbar);
        } else  
        {
            addReservation(rentCar.id, {start: date[1], end: date[0] , carId: rentCar.id}, snackbar);
          } 
    }
    
  return (
    <>
    <div>
            <div className="card overflow-hidden">
                <div className="p-fluid grid formgrid overflow-hidden">
                    <div className="field col-12 md:col-4 overflow-hidden">
                        <Calendar dateTemplate={dateTemplate} id="multiple"  value={date} onChange={(e) => setDates(e)} inline minDate={new Date()} selectionMode="multiple" maxDateCount={2}  /> 
                    </div>
                </div>
            </div>
        </div> 
        <button
        type="button"
        onClick={() => tryBook()}
        className=" rounded-md border border-transparent bg-blue-100 px-4 py-2 mt-5 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Book !
      </button>
      </>
  );
}

export default OwnCalendar;
