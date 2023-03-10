import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TInputs } from ".";

type AppProps = {
    formData: TInputs,
    onFormChange: (e: Partial<TInputs>) => void,
    onGoPrev: (id: number) => void,
    onSubmit: () => void
};

function Step2({ formData, onFormChange, onGoPrev, onSubmit }: AppProps) {

    const mySchema = z.object({
        phone: z.string().regex(/^[0-9]+$/, { message: 'Please Enter Phone Number Only'}).min(10)
    })
    // init form
    const { register, watch, handleSubmit, formState: { errors, isValid }, setValue } = useForm<TInputs>({
        resolver: zodResolver(mySchema),
        mode: 'onChange',
        defaultValues: {
            phone: formData.phone,
            address: formData.address
        }
    });

    function finalSubmit() {
        if (isValid) {
            onSubmit()
        }
    }

    return (<>
        <form className="form" onSubmit={handleSubmit(finalSubmit)}>
            <div>
                Step 2
            </div>
            <div>
                <input {...register("phone")} type="text" placeholder="phone" />
                {errors.phone?.message && <div>{errors.phone?.message}</div>}
            </div>
            <div style={{marginTop: '1rem'}}>
                <textarea {...register("address")} rows={6} style={{ width: '100%' }} placeholder="address" />
                {errors.address?.message && <div>{errors.address?.message}</div>}
            </div>
            <div>
                <button onClick={() => {
                    onFormChange(watch())
                    onGoPrev(1)
                }}>Prev</button>
                <button type="submit">Submit</button>
            </div>
        </form>
    </>
    );
}

export default Step2;
