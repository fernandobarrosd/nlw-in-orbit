import { ReactNode } from "react"

type GoalsCompletedInWeekDayProps = {
    children: ReactNode;
    weekName: string;
    weekDay: string;
}


export function GoalsCompletedInWeekDay({ children, weekName, weekDay } : GoalsCompletedInWeekDayProps) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="font-medium"><span className="capitalize">{weekName}</span> <span className="text-zinc-400 text-xs">({weekDay})</span></h3>
            <ul className="flex flex-col gap-3">
                {children}
            </ul>
        </div>
    );
}