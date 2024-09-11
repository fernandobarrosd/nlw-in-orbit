import logoInOrbit from "../assets/icons/logo-in-orbit.svg";
import letsStartIlustration from "../assets/icons/lets-start-ilustration.svg";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function EmptyGoals() {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-8">
            <img src={logoInOrbit} alt="In.Orbit logo"/>
            <img src={letsStartIlustration} alt="Lets Start Ilustration"/>
            <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
                Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora mesmo?
            </p>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="size-4"/> Cadastrar meta
                </Button>
            </DialogTrigger>
    </div>
    );
}