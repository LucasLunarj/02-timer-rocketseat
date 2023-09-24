import { Play } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  Countdowncontainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  TaskInput,
} from "./syles";
import { useForm } from "react-hook-form";
import { useState } from "react";
interface inputValueProps {
  task: string;
  minutes: number;
}
interface cycle {
  id: string;
  task: string;
  minutes: number;
}

export function Home() {
  const [cycles, setCycles] = useState<cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1),
    minutes: zod.number().min(5).max(60),
  });

  const { register, handleSubmit, watch, reset } = useForm<inputValueProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutes: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  console.log(activeCycle);
  function getSubmitData(data: inputValueProps) {
    const id = String(new Date().getTime());
    const newCycle: cycle = {
      id,
      task: data.task,
      minutes: data.minutes,
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    reset();
  }
  const task = watch("task");
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(getSubmitData)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            placeholder="Dê um nome para o seu projeto"
            type="text"
            id="task"
            list="task-suggestions"
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="projeto1"></option>
            <option value="projeto2"></option>
            <option value="projeto3"></option>
            <option value="projeto4"></option>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            placeholder="00"
            type="number"
            id="minutesAmount"
            step={5}
            min={5}
            max={60}
            {...register("minutes", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <Countdowncontainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </Countdowncontainer>

        <StartCountDownButton type="submit" disabled={!task}>
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
}
