import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../auth/auth';
import { firebaseAuth } from '../../auth/firebase';
import Auth from './Auth';
import styles from './Auth.module.css';

interface SinUpInput {
    email: string;
    password: string;
    rept_password: string;
}

const SignUp = () => {
    const navigate = useNavigate();
    const [formError, setFormError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SinUpInput>();

    const handelSignUp = (data: any) => {
        if (data.password !== data.rept_password)
            setError(
                'rept_password',
                { message: "Passwords don't match" },
                { shouldFocus: true }
            );
        else {
            setIsLoading(true);
            setFormError('');
            signUp(data.email, data.password)
                .then(() => {
                    if (firebaseAuth.currentUser)
                        navigate('/', { replace: true });
                })
                .catch(() => {
                    setFormError(
                        'Error occurred trying to sign you up. Please check your inputs and try again.'
                    );
                    setIsLoading(false);
                });
        }
    };

    return (
        <Auth title="Sign Up">
            <form onSubmit={handleSubmit(handelSignUp)}>
                {formError.length > 0 && (
                    <div className={styles.formError}>
                        <span>{formError}</span>
                    </div>
                )}
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email" className={styles.inputLabel}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            {...register('email', {
                                required: 'Email Required',
                            })}
                        />
                        <div className={styles.errorContainer}>
                            <span>{errors.email?.message}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password" className={styles.inputLabel}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className={styles.input}
                            {...register('password', {
                                required: 'Password Required',
                                min: {
                                    value: 6,
                                    message:
                                        'should be at least 6 characters long',
                                },
                            })}
                        />
                        <div className={styles.errorContainer}>
                            <span>{errors.password?.message}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.inputRow}>
                    <div className={styles.inputContainer}>
                        <label
                            htmlFor="rept_password"
                            className={styles.inputLabel}
                        >
                            Password
                        </label>
                        <input
                            id="rept_password"
                            type="password"
                            className={styles.input}
                            {...register('rept_password', {
                                required: 'Password Required',
                                min: {
                                    value: 6,
                                    message:
                                        'should be at least 6 characters long',
                                },
                            })}
                        />
                        <div className={styles.errorContainer}>
                            <span>{errors.rept_password?.message}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.optionContainer}>
                    <span>Already have an account?</span>
                    <Link to="/auth/signin" className={styles.switchSpan}>
                        Sign In
                    </Link>
                </div>
                <div className={styles.buttonRow}>
                    <input
                        type="submit"
                        value="Sign Up"
                        className={styles.primaryBtn}
                        disabled={isLoading}
                    />
                </div>
            </form>
        </Auth>
    );
};

export default SignUp;
