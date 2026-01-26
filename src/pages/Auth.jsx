import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock } from '../icons'
import api from '../api'

const Auth = ({ mode }) => {
    const isSignIn = mode === 'signin'
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        first_name: '',
        last_name: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (isSignIn) {
                // Sign in
                const response = await api.auth.login({
                    email: formData.email,
                    password: formData.password
                })
                
                // Store tokens
                localStorage.setItem('authToken', response.access)
                localStorage.setItem('refreshToken', response.refresh)
                
                // Redirect to home page
                navigate('/')
            } else {
                // Sign up
                const response = await api.auth.register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    password_confirm: formData.password_confirm,
                    first_name: formData.first_name,
                    last_name: formData.last_name
                })
                
                // After successful registration, sign in to get tokens
                const loginResponse = await api.auth.login({
                    email: formData.email,
                    password: formData.password
                })
                
                // Store tokens
                localStorage.setItem('authToken', loginResponse.access)
                localStorage.setItem('refreshToken', loginResponse.refresh)
                
                // Redirect to home page
                navigate('/')
            }
        } catch (err) {
            setError(err.message || 'Authentication failed. Please try again.')
            console.error('Auth error:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-aurora">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
            </div>
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="auth-top">
                    <h2>{isSignIn ? 'Welcome back' : 'Join Mind Matrix'}</h2>
                    <p>{isSignIn ? 'Sign in to continue' : 'Create your account to start writing'}</p>
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error-message" style={{
                            backgroundColor: 'rgba(255, 59, 48, 0.1)',
                            border: '1px solid rgba(255, 59, 48, 0.3)',
                            color: '#ff3b30',
                            padding: '12px 16px',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            {error}
                        </div>
                    )}
                    {!isSignIn && (
                        <>
                            <label className="field">
                                <span>
                                    <User />
                                    Username
                                </span>
                                <input 
                                    type="text" 
                                    name="username"
                                    placeholder="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <label className="field" style={{ flex: 1 }}>
                                    <span>
                                        <User />
                                        First Name
                                    </span>
                                    <input 
                                        type="text" 
                                        name="first_name"
                                        placeholder="First"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label className="field" style={{ flex: 1 }}>
                                    <span>
                                        <User />
                                        Last Name
                                    </span>
                                    <input 
                                        type="text" 
                                        name="last_name"
                                        placeholder="Last"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                        </>
                    )}
                    <label className="field">
                        <span>
                            <Mail />
                            Email
                        </span>
                        <input 
                            type="email" 
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="field">
                        <span>
                            <Lock />
                            Password
                        </span>
                        <input 
                            type="password" 
                            name="password"
                            placeholder="•••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {!isSignIn && (
                        <label className="field">
                            <span>
                                <Lock />
                                Confirm Password
                            </span>
                            <input 
                                type="password" 
                                name="password_confirm"
                                placeholder="•••••••••"
                                value={formData.password_confirm}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    )}
                    {isSignIn && (
                        <div className="form-row">
                            <label className="checkbox">
                                <input type="checkbox" /> <span>Remember me</span>
                            </label>
                            <a href="#" className="link-soft">Forgot password?</a>
                        </div>
                    )}
                    {!isSignIn && (
                        <label className="checkbox">
                            <input type="checkbox" /> <span>I agree to the Terms and Privacy</span>
                        </label>
                    )}
                    <button 
                        type="submit" 
                        className="primary wide"
                        disabled={loading}
                    >
                        {loading ? (isSignIn ? 'Signing in...' : 'Creating account...') : (isSignIn ? 'Sign in' : 'Create account')}
                    </button>
                    <div className="splitter">
                        <span />
                        <p>or</p>
                        <span />
                    </div>
                    <div className="social-row">
                        <button type="button" className="ghost wide">
                            Continue with Google
                        </button>
                        <button type="button" className="ghost wide">
                            Continue with Apple
                        </button>
                    </div>
                </form>
                <div className="auth-footer">
                    {isSignIn ? (
                        <>
                            <span>No account?</span>
                            <Link to="/signup" className="link-strong">
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            <span>Already have an account?</span>
                            <Link to="/signin" className="link-strong">
                                Sign in
                            </Link>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    )
}

export default Auth

