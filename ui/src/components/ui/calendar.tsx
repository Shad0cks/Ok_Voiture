import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

import React, { useEffect, useState } from "react";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { ReservedDateDTO } from "../../dtos/revervedDates.dto";
import { GetReservations } from "../../services/getBook";
import { SnackbarHook } from "../hooks/useSnakbar";
import moment from "moment";
import { addReservation } from "../../services/postBook";
import { carDTO } from "../../dtos/car.dto";

function OwnCalendar({
  rentCar,
  snackbar,
  setModalIsOpen,
}: {
  rentCar: carDTO;
  snackbar: SnackbarHook;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [bookList, setBookList] = useState<ReservedDateDTO[]>();
  const [date, setDate] = useState<Date[]>();

  useEffect(() => {
    GetReservations(rentCar.id, setBookList, snackbar); // eslint-disable-next-line
  }, []);

  function isDateInRange(date: Date, startDate: Date, endDate: Date) {
    const cdate1 = moment(date, "DD-MM-YYYY");
    const cdate2 = moment(startDate, "DD-MM-YYYY");
    const cdate3 = moment(endDate, "DD-MM-YYYY");
    return cdate1.isBetween(cdate2, cdate3);
  }

  const dateTemplate = (date: any) => {
    if (!bookList) return date.day;

    for (let i = 0; i < bookList.length; i++) {
      const s = new Date(bookList[i].start);
      const en = new Date(bookList[i].end);
      const curr = new Date(date.year, date.month, date.day);

      if (isDateInRange(curr, s, en) || s === curr || en === curr) {
        console.log(date);
        date.selectable = false;
        return (
          <strong style={{ textDecoration: "line-through" }}>{date.day}</strong>
        );
      }
    }
    return date.day;
  };

  function cpmDateInf(date1: Date, date2: Date) {
    const formDate1 = moment(date1).format("DD-MM-YYYY");
    const formDate2 = moment(date2).format("DD-MM-YYYY");

    const cdate1 = moment(formDate1, "DD-MM-YYYY");
    const cdate2 = moment(formDate2, "DD-MM-YYYY");
    if (cdate1.isBefore(cdate2)) {
      return true;
    } else if (cdate2.isBefore(cdate1)) {
      return false;
    } else {
      return false;
    }
  }

  const setDates = (e: CalendarChangeEvent) => {
    if (
      e.value &&
      typeof e.value !== "string" &&
      typeof e.value === "object" &&
      Array.isArray(e.value)
    )
      setDate(e.value);
  };

  const tryBook = () => {
    if (!date || date.length !== 2) return;

    if (cpmDateInf(date[0], date[1])) {
      addReservation(
        rentCar.id,
        { start: date[0], end: date[1], carId: rentCar.id },
        snackbar
      );
    } else {
      addReservation(
        rentCar.id,
        { start: date[1], end: date[0], carId: rentCar.id },
        snackbar
      );
    }
    setModalIsOpen(false);
  };
  return (
    <>
      <div>
        <div className="card overflow-hidden">
          <div className="p-fluid grid formgrid overflow-hidden">
            <div className="field col-12 md:col-4 overflow-hidden">
              <Calendar
                dateTemplate={dateTemplate}
                id="multiple"
                value={date}
                onChange={(e: any) => setDates(e)}
                inline
                maxDate={new Date(rentCar.end)}
                minDate={
                  cpmDateInf(new Date(), new Date(rentCar.start))
                    ? new Date(rentCar.start)
                    : new Date()
                }
                selectionMode="multiple"
                maxDateCount={2}
              />
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
