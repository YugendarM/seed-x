import React, { useEffect } from 'react'

const ProfilePage = () => {

    useEffect(() => {
        document.title = "My Profile | Seed'X"
    }, [])

  return (
    <div>
      ProfilePage
    </div>
  )
}

export default ProfilePage
