'use client'
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss"
import { signInState, signUpState } from "@/app/states";
import { useRecoilState } from "recoil";
type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const SignUp = () => {
    const { register, handleSubmit, watch,formState: { errors } } = useForm<FormValues>();

    const [signUp, setsignUp] = useRecoilState(signUpState);
    const [signIn, setsignIn] = useRecoilState(signInState);
    
    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.fromWrapper}>
            <input 
                placeholder="Email"
                type="email"
                {...register("email", { required: "Email is required" })} 
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

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
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <div className={styles.passwordRules}>
                <p>Password must contain: </p>
                <p>*8 or more characters </p>
                <p>*at least one capital letter</p>
                <p>*at least one number</p>
            </div>
            <input 
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (value) => value === watch('password') || "Passwords do not match"
                })}
            />
            {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>}

            <input type="submit" value="Sign Up" />

            <p className={styles.haveAccount} >Already have  an account? <span 
            onClick={() => {
                setsignIn(true);
                setsignUp(false);
            }}>Sign In</span></p>
        </form>
    );
};
