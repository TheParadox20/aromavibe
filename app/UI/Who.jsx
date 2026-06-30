"use client";

import { useState } from "react";
import { UserRound, Gift, HelpCircle } from "lucide-react";
import QuestionBase from "@/app/UI/QuestionBase";
import OptionRow from "@/app/UI/OptionRow";

const Men = ({strokeWidth, className})=>{
    return <img className={className} src="/svg/male.svg"/>
}
const Female = ({strokeWidth, className})=>{
    return <img className={'w-4 h-4'} src="/svg/female.svg"/>
}


const OPTIONS = [
    { id: 'male',         icon: Men,  label: 'Male' },
    { id: 'female',   icon: Female,       label: 'Female' },
    { id: 'unisex', icon: UserRound, label: "Unisex" },
];

export default function Who({ control, initial }) {
    const [selected, setSelected] = useState(initial ?? null);

    return (
        <QuestionBase
            step={1}
            label="Who's it for"
            title="Who are we playing this for?"
            canContinue={!!selected}
            onNext={() => control('volume', { gender: selected })}
        >
            {OPTIONS.map(opt => (
                <OptionRow
                    key={opt.id}
                    icon={opt.icon}
                    label={opt.label}
                    selected={selected === opt.id}
                    onClick={() => setSelected(opt.id)}
                />
            ))}
        </QuestionBase>
    );
}
