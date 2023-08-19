import { differenceInCalendarDays, format } from "date-fns";

export default function BookingDates({booking}){
    return (
        <>
        <div className="border-t border-gray-300 mt-2 py-1">
            {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr; {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
        </div>
        <div className="text-lg py-1">
            Number of Nights: {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))}
        </div>
        <div className="text-lg">
            Total Price: ${booking.price}
        </div>
        </>
    );
}