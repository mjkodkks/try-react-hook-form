import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useGenerateRandomUser } from "../hooks/useGenerateRandomUser";

type TInputs = {
    user: string,
    password: string,
    phone: number,
};

function SimpleForm() {

    // validate by zod
    const mySchema = z.object({
        user: z.string().min(8).max(16),
        password: z.string().nonempty({ message: "Require Password" }).min(8),
        phone: z.string().min(10)
    })
    // init form
    const { register, handleSubmit, watch, formState: { errors, isValid }, setValue } = useForm<TInputs>({
        resolver: zodResolver(mySchema),
        mode: 'onChange'
    });

    function onSubmitForm(data: TInputs) {
        console.log("🚀 ~ file: App.tsx:10 ~ onSubmitForm ~ data:", data)
        alert(JSON.stringify(data))
    }

    console.log(errors)

    return (<>
        <div className="form">
            <div>Example Form Register - Simple Form</div>
            <form onSubmit={handleSubmit(onSubmitForm)} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "2rem" }}>
                <input {...register("user")} type="text" placeholder="user" />
                {errors.user?.message && <div>{errors.user?.message}</div>}
                <input {...register("password")} type="password" placeholder="password" />
                {errors.password?.message && <div>{errors.password?.message}</div>}
                <input {...register("phone")} type="text" inputMode="tel" placeholder="phone" />
                {errors.phone?.message && <div>{errors.phone?.message}</div>}
                <div onClick={(e) => setValue('user', useGenerateRandomUser().result, { shouldValidate: true })} style={{ cursor: "pointer", border: "solid 1px", borderRadius: "1rem" }}>
                    random username
                </div>
                <button type="submit" disabled={!isValid}>
                    Register
                </button>
            </form>
            <pre>
                {
                    JSON.stringify(watch())
                }
            </pre>
            <div>
                isForm Valid : {JSON.stringify(isValid)}
            </div>
        </div>
    </>
    );
}

export default SimpleForm;
