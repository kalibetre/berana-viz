import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../auth/auth';
import { firebaseAuth } from '../../auth/firebase';
import Auth from './Auth';
import styles from './Auth.module.css';

interface SinInInput {
    email: string;
    password: string;
}

const SignIn = () => {
    const navigate = useNavigate();
    const [formError, setFormError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SinInInput>();

    const handelSignIn = (data: any) => {
        setIsLoading(true);
        setFormError('');
        signIn(data.email, data.password)
            .then(() => {
                if (firebaseAuth.currentUser) navigate('/', { replace: true });
            })
            .catch(() => {
                setFormError(
                    'Invalid email address or password. Please try again.'
                );
                setIsLoading(false);
            });
    };

    return (
        <Auth title="Sign In" isLoading={isLoading}>
            <form onSubmit={handleSubmit(handelSignIn)}>
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
                <div className={styles.optionContainer}>
                    <span>Need account?</span>
                    <Link to="/auth/signup" className={styles.switchSpan}>
                        Sign Up
                    </Link>
                </div>
                <div className={styles.buttonRow}>
                    <input
                        type="submit"
                        value="Sign In"
                        className={styles.primaryBtn}
                        disabled={isLoading}
                    />
                </div>
            </form>
        </Auth>
    );
};

export default SignIn;
