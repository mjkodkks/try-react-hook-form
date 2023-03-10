import { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";

export type TInputs = {
    user: string,
    password: string,
    phone: string,
    address: string
};

function StepperForm() {
    const [currentStep, setCurrentStep] = useState(1)
    // setup form dataß
    const [formData, setFormData] = useState<TInputs>({
        user: '',
        password: '',
        phone: '',
        address: ''
    })

    // submit all final data
    function onSubmitForm() {
        console.log("🚀 ~ file: App.tsx:10 ~ onSubmitForm ~ data:", formData)
        alert(JSON.stringify(formData))
    }

    // upddate formData form event action Step1, Step2
    function updateForm(e: Partial<TInputs>) {
        console.log(e);
        setFormData(prev => {
            return {
                ...prev,
                ...e
            }
        })
    }

    function goNext(step: number) {
        setCurrentStep(step)
    }

    function goPrev(step: number) {
        setCurrentStep(step)
    }

    return (<>
        <div className="form">
            <div>Example Form Register - Stepper Form</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
                {
                    currentStep === 1 &&
                    <Step1 formData={formData} onFormChange={updateForm} onGoNext={goNext}></Step1>
                }
                {
                    currentStep === 2 &&
                    <Step2 formData={formData} onGoPrev={goPrev} onFormChange={updateForm} onSubmit={onSubmitForm}></Step2>
                }
            </div>
        </div>
    </>
    );
}

export default StepperForm;
