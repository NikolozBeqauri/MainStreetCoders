"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./SignIn.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "@/helpers/cookies";
import Image from 'next/image';
import { Spin } from "antd"; 

type FormValues = {
    email: string;
    password: string;
    checkbox: boolean;
};

export const SignIn = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); 
    const [passwordHide, setPasswordHide] = useState(true);
    const router = useRouter();

    const onSubmit = async (data: FormValues) => {
        setErrorMessage(null);
        setSuccessMessage(null);
        setLoading(true); 
        try {
            const response = await axios.post(`https://project-spotify-1.onrender.com/auth/login`, data);
            const dataString = response.config.data;
            const parsedData = JSON.parse(dataString);
            const email = parsedData.email;
            setCookie("token", response.data.access_token, 60);
            localStorage.setItem("email", email);
            setSuccessMessage("Login successful! Redirecting...");
            router.push("/");
        } catch (error) {
            console.error(error);
            setErrorMessage("Login failed. Please check your credentials and try again.");
            reset(); 
        } finally {
            setLoading(false); 
        }
    };

    const navigateToSignUp = () => {
        router.push('/signup');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.fromWrapper}>
            {loading ? (
                <Spin size="large" /> 
            ) : (
                <>
                    <input
                        placeholder="Email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}

                    <div className={styles.passwordWrapper}>
                        <input
                            placeholder="Password"
                            type={passwordHide ? "password" : "text"}
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
                        {passwordHide ? (
                            <Image
                                onClick={() => setPasswordHide(!passwordHide)}
                                src={`/images/passwordHide.png`}
                                alt="password Icon"
                                width={24}
                                height={24}
                            />
                        ) : (
                            <Image
                                onClick={() => setPasswordHide(!passwordHide)}
                                src={`/images/passwordshow.png`}
                                alt="password Icon"
                                width={24}
                                height={24}
                            />
                        )}
                    </div>
                    {errors.password && <span className={styles.errorMessage}>{errors.password.message}</span>}

                    <div className={styles.memoryWrapper}>
                        <div className={styles.checkbox}>
                            <input type="checkbox" id="remember" {...register("checkbox")} />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <span className={styles.forgotPassword}>Forgot your password?</span>
                    </div>

                    <input type="submit" value="Sign In" />

                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                    <p className={styles.haveAccount}>Already have an account? <span onClick={navigateToSignUp}>Sign Up</span></p>
                </>
            )}
        </form>
    );
};
