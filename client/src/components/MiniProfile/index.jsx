import React from 'react'
import { Alert } from 'react-bootstrap';

export default function MiniProfile(props) {
  const [error, setError] = useState("");
  const { userId } = props;
  const getIdDetails = async (userId) => {
    try {
      const url = `http://localhost:3000/users/get-user-data/${userId}`
      const res = await fetch(url);
      const profile = await res.json();
      console.log({ profile });

    }

    catch (error) {
      setError(error.message);
    }

  }
  return (
    <>
    <div>MiniProfile: {userId}</div>
    {error? <Alert variant="danger">{error}</Alert>:""}   
    </>
  )
}
