import { CheckCircle2 } from "lucide-react";

type GoalCompletedItemProps = {
    goalTitle: string;
    completedAt: string;
}

export function GoalCompletedItem({ goalTitle, completedAt } : GoalCompletedItemProps) {
    return (
        <li className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-pink-500"/>
            <span className="text-sm text-zinc-400">Você completou "<span className="text-zinc-100">{goalTitle}</span>" ás <span className="text-zinc-100">{completedAt}</span></span>
            <span className="text-zinc-500 underline text-xs cursor-pointer">Desfazer</span>
        </li>
    )
}