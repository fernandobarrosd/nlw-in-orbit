import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";

type GoalItemProps = {
    title: string;
}

export function GoalItem({ title } : GoalItemProps) {
    return (
        <OutlineButton>
            <Plus className="size-4 text-zinc-400"/> {title}
        </OutlineButton>
    )
}