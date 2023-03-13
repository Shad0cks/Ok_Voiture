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

  const startMoment = moment(rentCar.start);
  const endMoment = moment(rentCar.end);

  useEffect(() => {
    GetReservations(rentCar.id, setBookList, snackbar); // eslint-disable-next-line
  }, []);

  function checkSame(date1: moment.Moment, date2: moment.Moment): boolean {
    return (
      date1.date() === date2.date() &&
      date1.year() === date2.year() &&
      date1.month() === date2.month()
    );
  }

  //filtre les dates sur le calendrier pour rayer celle qui sont deja reserver
  const dateTemplate = (date: any) => {
    if (!bookList) return date.day;
    for (let i = 0; i < bookList.length; i++) {
      const s = moment(bookList[i].start);
      const en = moment(bookList[i].end);
      const curr = moment(new Date(date.year, date.month, date.day));
      if (curr.isBetween(s, en) || checkSame(s, curr) || checkSame(curr, en)) {
        date.selectable = false;
        return (
          <strong style={{ textDecoration: "line-through" }}>{date.day}</strong>
        );
      }
    }
    return date.day;
  };

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

    const cdate1 = moment(date[0]);
    const cdate2 = moment(date[1]);

    //annule de changement de fuseau horaire et l'heure local
    date[0].setHours(12);
    date[1].setHours(12);
    const date2 = new Date(
      date[0].toISOString().split("T")[0] + "T00:00:00.000+00:00"
    );
    const date3 = new Date(
      date[1].toISOString().split("T")[0] + "T00:00:00.000+00:00"
    );

    // calcule si cdate1 et cdate2 sont les dates de debut ou de fin
    if (cdate1.isBefore(cdate2)) {
      addReservation(
        rentCar.id,
        {
          start: date2.toISOString(),
          end: date3.toISOString(),
          carId: rentCar.id,
          id: undefined,
        },
        snackbar
      );
    } else if (cdate2.isBefore(cdate1)) {
      addReservation(
        rentCar.id,
        {
          start: date3.toISOString(),
          end: date2.toISOString(),
          carId: rentCar.id,
          id: undefined,
        },
        snackbar
      );
    }
    setModalIsOpen(false);
  };
  return (
    <>
      <div className="notranslate" translate="no">
        <div className="card overflow-hidden">
          <div className="p-fluid grid formgrid overflow-hidden">
            <div className="field col-12 md:col-4 overflow-hidden">
              <Calendar
                dateTemplate={dateTemplate}
                id="multiple"
                value={date}
                onChange={(e: any) => setDates(e)}
                inline
                maxDate={endMoment.toDate()}
                minDate={
                  startMoment.isBefore(moment(new Date()))
                    ? new Date()
                    : startMoment.toDate()
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
