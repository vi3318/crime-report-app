'use client'

import { useState } from "react"
import { ReportForm } from "./ReportForm";
import { ReportSubmitted } from "./ReportFormCompleted";

// report form
// report submitted

export function ReportWizard(){
    const [currentStep, setCurrentStep] = useState(1);
    const [reportData, setReportData] = useState<unknown>(null);

    const handleStepComplete = async (data: unknown) =>{
        setReportData({...reportData, ...data});

        if(currentStep === 3){
            return;
        }
        setCurrentStep((prev)=>prev+1);
    }

    return (
        <div className="rounded-2xl bg-zinc-900 p-8">
            {currentStep === 1 && <ReportForm onComplete={handleStepComplete}/>}
            {currentStep === 2 && (
        <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
      )}
        </div>
    )

}