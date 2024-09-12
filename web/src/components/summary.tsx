import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./icons/in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { GoalCompletedItem } from "./goal-completed-item";
import { GoalsCompletedInWeekDay } from "./goals-completed-in-week-day";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBr);

export function Summary() {
    const { data: summary } = useQuery({
        queryKey: ["summary"],
        queryFn: getSummary,
        staleTime: 1000 * 60
    });

    if (!summary) return null;

    const firstDayOfWeek = dayjs()
    .startOf("week")
    .format("D MMM");

    const lastDayOfWeek = dayjs()
    .endOf("week")
    .format("D MMM");

    

    const completedPercentage = Math.round((summary.completed * 100) / summary.total);
    return (
        <div className="max-w-[480px] py-10 px-5 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <InOrbitIcon/>
                    <span className="text-lg font-semibold capitalize">
                        {firstDayOfWeek} - {lastDayOfWeek}
                    </span>
                </div>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <Plus className="size-4"/> Cadastrar meta
                    </Button>
                </DialogTrigger>
            </div>
            <div className="flex flex-col gap-3">
                <Progress max={summary.total} value={summary.completed}>
                    <ProgressIndicator style={{width: `${completedPercentage}%`}}/>
                </Progress>
                <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Você completou <span className="text-zinc-100">{summary.completed}</span> de <span className="text-zinc-100">{summary.total}</span> metas nessa semana</span>
                    <span>{completedPercentage}%</span>
                </div>
            </div>
            <Separator/>
            <PendingGoals/>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-medium">Sua semana</h2>
                {summary.goalsPerDay != null ? 
                Object.entries(summary.goalsPerDay).map(([ date, goalsCompletions ]) => {
                    const weekDay = dayjs(date).format("dddd");
                    const formattedDate = dayjs(date).format("DD [de] MMMM")
                    return (
                        <GoalsCompletedInWeekDay
                        key={date}
                        weekName={weekDay}
                        weekDay={formattedDate}>
                            {goalsCompletions.map(({ id, title, completedAt }) => {
                                const completedAtFormatted = dayjs(completedAt)
                                .format("HH:mm[h]");
                                
                                return (
                                    <GoalCompletedItem
                                    key={id}
                                    goalTitle={title}
                                    completedAt={completedAtFormatted}/>
                                )
                            })}
                        </GoalsCompletedInWeekDay>
                    )
                }) : (
                    <span className="text-sm text-zinc-300">
                        Nenhuma atividade completada.
                    </span>
                )}
                
            </div>
        </div>
    )
}