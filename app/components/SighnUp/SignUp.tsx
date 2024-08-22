'use client'
import { useForm } from "react-hook-form";

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const SignUp = () => {
    const { register, handleSubmit, watch,formState: { errors } } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input 
                placeholder="Email"
                {...register("email", { required: "Email is required" })} 
            />
            {errors.email && <span>{errors.email.message}</span>}

            <input 
                placeholder="Password"
                type="password"
                {...register("password", { 
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    },
                    validate: {
                        hasUpperCase: value => /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                        hasNumber: value => /\d/.test(value) || "Password must contain at least one number"
                    }
                })}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <input 
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (value) => value === watch('password') || "Passwords do not match"
                })}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

            <input type="submit" value="Sign Up" />
        </form>
    );
};
