import { RadioGroupIndicator, RadioGroupItem } from "./ui/radio-group";


type GoalWeeklyFrequencyRadioGroupItemProps = {
    value: string;
    desiredWeeklyFrequencyText: string;
    desiredWeeklyFrequencyEmoji: string;
};

export function GoalWeeklyFrequencyRadioGroupItem({ 
    value,
    desiredWeeklyFrequencyEmoji,
    desiredWeeklyFrequencyText
 } : GoalWeeklyFrequencyRadioGroupItemProps) {
    return (
        <RadioGroupItem value={value}>
            <RadioGroupIndicator/>
            <span className="text-zinc-300 text-sm font-medium leading-none">
                {desiredWeeklyFrequencyText}
            </span>
            <span className="text-lg leading-none">{desiredWeeklyFrequencyEmoji}</span>
        </RadioGroupItem>
    )
}