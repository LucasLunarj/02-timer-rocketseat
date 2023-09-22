import { Play, Watch } from "phosphor-react";
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
export function Home() {
  const { register, handleSubmit, watch } = useForm();

  function getSubmitData(data: any) {
    console.log(data, "test");
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
