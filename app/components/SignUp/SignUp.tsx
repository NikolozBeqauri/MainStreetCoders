'use client';
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormValues>();
    const router = useRouter();

    const onSubmit = (data: FormValues) => {
        axios.post(`https://project-spotify-1.onrender.com/user/register`, data)
            .then(response => {
                console.log(response);
                router.push("/signin");
            })
            .catch(error => {
                console.error(error);
                reset();
            });
    };

    const navigateToSignIn = () => {
        router.push('/signin');
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
                        hasNumber: value => /\d/.test(value) || "Password must contain at least one number",
                        hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character (!, @, #, etc.)"
                    }
                })}
            />
            {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}
            <div className={styles.passwordRules}>
                <p>Password must contain: </p>
                <p>* 8 or more characters</p>
                <p>* At least one capital letter</p>
                <p>* At least one number</p>
                <p>* At least one special character (!, @, #, etc.)</p>
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

            <p className={styles.haveAccount}>
                Already have an account? <span onClick={navigateToSignIn}>Sign In</span>
            </p>
        </form>
    );
};
