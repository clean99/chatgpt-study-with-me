import axios from 'axios'

export default function CallAPIView() {
  async function callAPIClicked() {
    const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/user`)
    window.alert('Session Information:\n' + JSON.stringify(response.data, null, 2))
  }

  return (
    <div onClick={callAPIClicked} className='sessionButton'>
      Call API
    </div>
  )
}
