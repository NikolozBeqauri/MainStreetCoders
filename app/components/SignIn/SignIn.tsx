'use client'
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.scss"
import axios from "axios";
import { useRouter } from "next/navigation";
type FormValues = {
    email: string;
    password: string;
    chackbox: boolean;
};

export const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const router = useRouter();

    const onSubmit = (data: any) => {
        axios.post(`https://auth.novatori.ge/auth/login`, data)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(response.data))
            })
            .catch(error => {
                console.error(error);
            });
    };

    const navigateToSignUp = () => {
        router.push('/signup');
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

            <div className={styles.memoryWrapper}>
                <div className={styles.checkbox}>
                    <input type="checkbox" id="remember" {...register("chackbox")} />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <span className={styles.forgotPassword}>Forgot your password?</span>
            </div>

            <input type="submit" value="Sign Up" />

            <p className={styles.haveAccount} >Already have  an account? <span onClick={navigateToSignUp}>Sign Up</span></p>
        </form>
    ); 
};
