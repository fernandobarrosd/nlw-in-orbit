import { X } from "lucide-react";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { RadioGroup } from "./ui/radio-group";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createGoal } from "../http/create-goal";
import { GoalWeeklyFrequencyRadioGroupItem } from "./goal-weekly-frequency-radio-group-item";
import { toast, Toaster } from "sonner";

const createGoalSchema = z.object({
  title: z.string().min(1, "Informe a atividade que deseja realizar"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7)
});

type CreateGoalForm = z.infer<typeof createGoalSchema>;


export function CreateGoalDialog() {
    const { register, control, handleSubmit, formState, reset } = 
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalSchema)
    });

    const queryClient = useQueryClient();

    async function handleCreateGoal(goal: CreateGoalForm) {
      await createGoal(goal);

      toast.success("Atividade cadastrada com sucesso!");

      queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      reset();
    }
    
    return (
    <DialogContent>
      <div className="h-full flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600"/>
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>
        <form className="flex-1 flex flex-col justify-between"
        onSubmit={handleSubmit(handleCreateGoal)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade</Label>
              <Input
              id="title"
              autoFocus
              placeholder="Praticar exercícios, meditar, etc..."
              className={`${formState.errors.title && "border-red-500"}`}
              {...register("title")}/>
              {formState.errors.title && (
                <span className="text-sm text-red-500">
                  {formState.errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="disered_weekly_frequency">Quantas vezes na semana</Label>
              <Controller 
              control={control}
              name="desiredWeeklyFrequency"
              defaultValue={1}
              render={({ field }) => {
                return (
                  <RadioGroup onValueChange={field.onChange} value={String(field.value)}>
                    <GoalWeeklyFrequencyRadioGroupItem
                    value="1"
                    desiredWeeklyFrequencyText="1x vez na semana"
                    desiredWeeklyFrequencyEmoji="🥱"/>

                    <GoalWeeklyFrequencyRadioGroupItem
                    value="2"
                    desiredWeeklyFrequencyText="2x vez na semana"
                    desiredWeeklyFrequencyEmoji="🙂"/>

                    <GoalWeeklyFrequencyRadioGroupItem
                    value="3"
                    desiredWeeklyFrequencyText="3x vez na semana"
                    desiredWeeklyFrequencyEmoji="😎"/>

                    <GoalWeeklyFrequencyRadioGroupItem
                    value="4"
                    desiredWeeklyFrequencyText="4x vez na semana"
                    desiredWeeklyFrequencyEmoji="😜"/>

                    <GoalWeeklyFrequencyRadioGroupItem
                    value="5"
                    desiredWeeklyFrequencyText="5x vez na semana"
                    desiredWeeklyFrequencyEmoji="🤨"/>

                    <GoalWeeklyFrequencyRadioGroupItem
                    value="6"
                    desiredWeeklyFrequencyText="6x vez na semana"
                    desiredWeeklyFrequencyEmoji="🤯"/>

                    <GoalWeeklyFrequencyRadioGroupItem
                    value="7"
                    desiredWeeklyFrequencyText="Todos os dias da semana"
                    desiredWeeklyFrequencyEmoji="🔥"/>
              </RadioGroup>
                )
              }}/>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">Fechar</Button>
            </DialogClose>
            <Button type="submit" className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
      
    </DialogContent>
    )
}