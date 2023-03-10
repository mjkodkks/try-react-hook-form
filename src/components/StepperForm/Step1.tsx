import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TInputs } from ".";

type AppProps = {
    formData: TInputs,
    onFormChange: (e: Partial<TInputs>) => void,
    onGoNext: (id:number)=> void
};

function Step1({ formData, onFormChange, onGoNext }: AppProps) {

    const mySchema = z.object({
        user: z.string().min(8).max(16),
        password: z.string().nonempty({ message: "Require Password" }).min(8),
    })
        // init form
        const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<TInputs>({
            resolver: zodResolver(mySchema),
            mode: 'onChange',
            defaultValues: {
                user: formData.user,
                password: formData.password
            }
        });

        function onSubmit(e: TInputs) {
            if(isValid) {
                onFormChange(e)
                onGoNext(2)
            }
        }
    
    return (<>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                Step 1
            </div>
            <div>
                <input {...register("user")} type="text" placeholder="user" />
                {errors.user?.message && <div>{errors.user?.message}</div>}
            </div>
            <div>
                <input {...register("password")} type="text" placeholder="password" />
                {errors.password?.message && <div>{errors.password?.message}</div>}
            </div>
            <div>
                <button type="submit">Next</button>
            </div>
        </form>
    </>
    );
}

export default Step1;
