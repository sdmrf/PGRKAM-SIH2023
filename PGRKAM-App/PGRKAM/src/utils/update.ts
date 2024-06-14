import axios from 'axios';
import URL from '../constants/url';
export const handleUpdate = async (email: string, data: any) => {
  try {
    const response = await axios.patch(
      `${URL}/api/v1/job-seekers/${email}`,
      data,
    );
    return response.data.data.jobSeeker;
  } catch (error) {
    console.error('Error updating jobSeeker:', error);
  }
};
