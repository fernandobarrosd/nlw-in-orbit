import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./icons/in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { GoalCompletedItem } from "./goal-completed-item";
import { GoalItem } from "./goal-item";

export function Summary() {
    return (
        <div className="max-w-[480px] py-10 px-5 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <InOrbitIcon/>
                    <span className="text-lg font-semibold">5 a 10 de Agosto</span>
                </div>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <Plus className="size-4"/> Cadastrar meta
                    </Button>
                </DialogTrigger>
            </div>
            <div className="flex flex-col gap-3">
                <Progress max={15} value={8}>
                    <ProgressIndicator style={{width: 200}}/>
                </Progress>
                <div className="flex items-center justify-between text-sm text-zinc-400">
                    <span>Você completou <span className="text-zinc-100">0</span> de <span className="text-zinc-100">15</span> metas nessa semana</span>
                    <span>50%</span>
                </div>
            </div>
            <Separator/>
            <div className="flex gap-3 flex-wrap">
                <GoalItem title="Meditar"/>
                <GoalItem title="Nadar"/>
                <GoalItem title="Estudar Node JS"/>
                <GoalItem title="Estudar React JS"/>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-medium">Sua semana</h2>
                <div className="flex flex-col gap-4">
                    <h3 className="font-medium">Domingo <span className="text-zinc-400 text-xs">(10 de agosto)</span></h3>
                    <ul className="flex flex-col gap-3">
                        <GoalCompletedItem 
                        goalTitle="Acordar cedo"
                        completedAt="08:13h"/>

                        <GoalCompletedItem 
                        goalTitle="Acordar cedo"
                        completedAt="08:13h"/>
                        
                        <GoalCompletedItem 
                        goalTitle="Acordar cedo"
                        completedAt="08:13h"/>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h3 className="font-medium">Segunda-Feira <span className="text-zinc-400 text-xs">(10 de agosto)</span></h3>
                    <ul className="flex flex-col gap-3">
                        <GoalCompletedItem 
                        goalTitle="Acordar cedo"
                        completedAt="08:13h"/>

                        <GoalCompletedItem 
                        goalTitle="Acordar cedo"
                        completedAt="08:13h"/>
                    </ul>
                </div>
                
            </div>
        </div>
    )
}