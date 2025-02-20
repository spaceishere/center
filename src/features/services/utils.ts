import dayjs from "dayjs";

export interface TimeInterval {
  start: string;
  end: string;
  status: boolean;
}
type Props = {
  // interval: any;
  valueDate?: any;
  checkTimes: any;
  selectedBoard: string;
};

const yarmagBoard = "EksTXPBx8x3m5Jy44";
const amgalanBoard = "LysH6fNzHj2XGrajC";
const validTimes = ["10:00", "11:00", "12:00", "15:00"];
const OtherValidTimes = ["09:00", "10:00", "11:00", "12:00", "15:00"];
const endHour = "17:00";
const startHour = "08:00";
const inter = 30;
const today = new Date();
const todayInDateOnly = dayjs(today).format("YYYY-MM-DD");
export const availableTimes = (selectedDate?: Date) => {
  const tempDate = dayjs(selectedDate).format("YYYY-MM-DD");
  function generateTimeIntervals(
    start: string,
    end: string,
    interval: number,
  ): TimeInterval[] {
    const availability: TimeInterval[] = [];
    const idag = new Date().toISOString().slice(0, 10);
    const startTime = new Date(`${idag}T${start}:00`);
    const endTime = new Date(`${idag}T${end}:00`);

    // Generate time intervals without skipping lunch time
    while (startTime < endTime) {
      const timeSlotStart = startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      startTime.setMinutes(startTime.getMinutes() + interval);
      const timeSlotEnd = startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });

      availability.push({
        start: timeSlotStart,
        end: timeSlotEnd,
        status: false,
      });
    }

    return availability;
  }
  const beforeLunch = generateTimeIntervals(startHour, endHour, inter);
  const hours = [...beforeLunch];

  const availableTimesWithDate = hours.map((time) => {
    const adjust = timeStringToFloat(time.start) - 8;
    const convert = numToTime(adjust);
    if (!selectedDate) {
      return;
    }
    return {
      startTime: dayjs(tempDate + " " + convert).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]",
      ),
      endTime: dayjs(tempDate + " " + convert)
        .add(inter, "minute")
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
    };
  });

  return availableTimesWithDate;
};

export function timeStringToFloat(time: string) {
  if (!time) {
    return 0; // or handle the case when time is undefined/null
  }

  var hoursMinutes = time.split(/[.:]/);
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
}

export function numToTime(number: number) {
  // Check sign of given number
  var sign = number >= 0 ? 1 : -1;

  // Set positive value of number of sign negative
  number = number * sign;

  // Separate the int from the decimal part
  var hour = Math.floor(number);
  var decpart = number - hour;

  var min = 1 / 60;
  // Round to nearest minute
  decpart = min * Math.round(decpart / min);

  var minute = Math.floor(decpart * 60) + "";

  // Add padding if need
  if (minute.length < 2) {
    minute = "0" + minute;
  }

  //@ts-ignore Add Sign in final result
  sign = sign === 1 ? "" : "-";

  // Concate hours and minutes
  let time = sign + hour + ":" + minute;

  return time;
}

export const TimeTableGenerate = ({
  valueDate,
  checkTimes,
  selectedBoard,
}: Props) => {
  function checkAvailability(): TimeInterval[] {
    const availability: TimeInterval[] = [];
    const idag = valueDate.toISOString().slice(0, 10);

    const items =
      selectedBoard === yarmagBoard || selectedBoard === amgalanBoard
        ? OtherValidTimes
        : validTimes;

    items.forEach((validTime) => {
      const start = validTime;
      const end = dayjs(`${idag}T${validTime}:00`)
        .add(1, "hour")
        .format("HH:mm");

      const free = checkTimes?.filter((free: any) => {
        return (
          dayjs(free.startTime).format("HH:mm") === validTime &&
          free?.freeTags?.at(1)?._id
        );
      });

      availability.push({
        start: start,
        end: end,
        status:
          free?.length === 0
            ? true
            : dayjs(valueDate).isSame(todayInDateOnly) &&
                dayjs(`${todayInDateOnly}T${"16:00"}`).isBefore(
                  dayjs(new Date()),
                )
              ? true
              : false,
      });
    });

    return availability;
  }

  const availableTimes = checkAvailability();

  return availableTimes;
};

// export const TimeTableGenerate = ({
//   interval,
//   valueDate,
//   checkTimes,
// }: Props) => {
//   function generateTimeIntervals(
//     start: string,
//     end: string,
//     interval: number,
//   ): TimeInterval[] {
//     const availability: TimeInterval[] = [];
//     const idag = valueDate.toISOString().slice(0, 10);
//     const startTime = new Date(`${idag}T${start}:00`);
//     const endTime = new Date(`${idag}T${end}:00`);

//     while (startTime < endTime) {
//       const timeSlotStart = startTime.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: false,
//       });
//       startTime.setMinutes(startTime.getMinutes() + interval);
//       const timeSlotEnd = startTime.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: false,
//       });

//       const free =
//         checkTimes &&
//         checkTimes?.filter((free: any) => {
//           return (
//             dayjs(free.startTime).format("HH:mm") === timeSlotStart &&
//             free?.freeTags?.at(1)?._id
//           );
//         });

//       availability.push({
//         start: timeSlotStart,
//         end: timeSlotEnd,
//         status:
//           free?.length === 0
//             ? true
//             : dayjs(valueDate).isSame(todayInDateOnly) &&
//                 dayjs(`${todayInDateOnly}T${"16:00"}`).isBefore(
//                   dayjs(new Date()),
//                 )
//               ? true
//               : false,
//       });
//     }
//     return availability;
//   }

//   const beforeLunch = generateTimeIntervals(startHour, endHour, interval);
//   const hours = [...beforeLunch];

//   const availableTimes = hours.filter((time) => {
//     return (
//       timeStringToFloat(time.start) >= timeStringToFloat(startHour) &&
//       timeStringToFloat(time.end) <= timeStringToFloat(endHour)
//     );
//   });

//   return availableTimes;
// };
