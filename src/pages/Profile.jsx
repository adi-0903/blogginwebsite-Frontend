import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, X } from '../icons'
import Footer from '../components/Footer'
import api from '../api'

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editForm, setEditForm] = useState({
        first_name: '',
        last_name: '',
        bio: '',
        location: '',
        website: '',
        twitter: '',
        github: ''
    })

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('authToken')
            if (!token) {
                navigate('/signin')
                return
            }

            const response = await api.auth.getUser()
            setUser(response)
            setEditForm({
                first_name: response.first_name || '',
                last_name: response.last_name || '',
                bio: response.bio || '',
                location: response.location || '',
                website: response.website || '',
                twitter: response.twitter || '',
                github: response.github || ''
            })
        } catch (err) {
            setError('Failed to load profile')
            console.error('Profile fetch error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleEditToggle = () => {
        setIsEditing(!isEditing)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSaveProfile = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await api.auth.updateUser(editForm)
            setUser(response)
            setIsEditing(false)
        } catch (err) {
            setError('Failed to update profile')
            console.error('Profile update error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
        navigate('/')
    }

    if (loading) {
        return (
            <div className="profile-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading profile...</p>
                </div>
            </div>
        )
    }

    if (error && !user) {
        return (
            <div className="profile-page">
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button onClick={fetchUserProfile} className="retry-button">Try Again</button>
                </div>
            </div>
        )
    }

    return (
        <div className="profile-page">
            <div className="profile-aurora">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />
            </div>

            <motion.div
                className="profile-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="profile-header">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" />
                            ) : (
                                <span className="profile-icon">👤</span>
                            )}
                        </div>
                        <h1>{user?.full_name || user?.username}</h1>
                        <p className="profile-username">@{user?.username}</p>
                    </div>

                    <div className="profile-actions">
                        <button onClick={handleEditToggle} className="btn-primary">
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                        <button onClick={handleSignOut} className="btn-ghost">
                            Sign Out
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-message">{error}</div>
                )}

                {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="profile-form">
                        <div className="form-grid">
                            <div className="form-main">
                                <div className="form-group">
                                    <label>
                                        <span className="label-text">First Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={editForm.first_name}
                                        onChange={handleInputChange}
                                        className="input-large"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <span className="label-text">Last Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={editForm.last_name}
                                        onChange={handleInputChange}
                                        className="input-large"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <span className="label-text">Bio</span>
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={editForm.bio}
                                        onChange={handleInputChange}
                                        className="textarea-large"
                                        rows={6}
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <span className="label-text">Location</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={editForm.location}
                                        onChange={handleInputChange}
                                        className="input-large"
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>

                            <div className="form-sidebar">
                                <div className="form-group">
                                    <label>
                                        <span className="label-text">Website</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={editForm.website}
                                        onChange={handleInputChange}
                                        className="input-large"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <span className="label-text">Twitter</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="twitter"
                                        value={editForm.twitter}
                                        onChange={handleInputChange}
                                        className="input-large"
                                        placeholder="@username"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <span className="label-text">GitHub</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="github"
                                        value={editForm.github}
                                        onChange={handleInputChange}
                                        className="input-large"
                                        placeholder="username"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn-primary" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="profile-info">
                        <div className="info-section">
                            <h3>About</h3>
                            <p>{user?.bio || 'No bio added yet.'}</p>
                        </div>

                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">
                                    <Mail />
                                    Email
                                </span>
                                <span className="info-value">{user?.email}</span>
                            </div>

                            {user?.location && (
                                <div className="info-item">
                                    <span className="info-label">📍 Location</span>
                                    <span className="info-value">{user.location}</span>
                                </div>
                            )}

                            {user?.website && (
                                <div className="info-item">
                                    <span className="info-label">🌐 Website</span>
                                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="info-value link">
                                        {user.website}
                                    </a>
                                </div>
                            )}

                            {user?.twitter && (
                                <div className="info-item">
                                    <span className="info-label">🐦 Twitter</span>
                                    <a href={`https://twitter.com/${user.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="info-value link">
                                        @{user.twitter}
                                    </a>
                                </div>
                            )}

                            {user?.github && (
                                <div className="info-item">
                                    <span className="info-label">💻 GitHub</span>
                                    <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="info-value link">
                                        {user.github}
                                    </a>
                                </div>
                            )}

                            <div className="info-item">
                                <span className="info-label">📅 Joined</span>
                                <span className="info-value">
                                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                                </span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">👥 Followers</span>
                                <span className="info-value">{user?.followers_count || 0}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">👥 Following</span>
                                <span className="info-value">{user?.following_count || 0}</span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            <Footer />
        </div>
    )
}

export default Profile
