import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"] });

const monthAndYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export type TrainingLog = {
  id: string | number;
  title: string;
  date: string;
  userName: string;
  animalName: string;
  breed: string;
  hours: number;
  description: string;
};

export default function TrainingLogCard({ log }: { log: TrainingLog }) {
  const date = new Date(log.date);

  return (
    <article className="flex overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-md">
      <time
        dateTime={log.date}
        className={`${oswald.className} flex w-20 shrink-0 flex-col items-center justify-center bg-[#2C2D68] px-2 py-4 text-center text-white sm:w-[139px]`}
      >
        <span className="text-3xl font-medium sm:text-5xl">
          {date.getUTCDate()}
        </span>
        <span className="mt-2 text-sm sm:text-xl">
          {monthAndYear.format(date)}
        </span>
      </time>

      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-xl font-bold text-[#260101] sm:text-[30px]">
            {log.title}
          </h2>
          <span className="font-medium text-gray-600">
            {log.hours} {log.hours === 1 ? "hour" : "hours"}
          </span>
        </div>

        <p className="mt-1 text-gray-600">
          {log.userName} · {log.breed} · {log.animalName}
        </p>
        <p className="mt-3">{log.description}</p>
      </div>
    </article>
  );
}