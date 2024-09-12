import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";

type GoalItemProps = {
    title: string;
    disabled: boolean
    onClick: () => void;
}

export function GoalItem({ title, disabled, onClick } : GoalItemProps) {
    return (
        <OutlineButton 
        disabled={disabled}
        onClick={onClick}>
            <Plus className="size-4 text-zinc-400"/> {title}
        </OutlineButton>
    )
}