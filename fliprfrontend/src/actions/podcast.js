import axios from "axios";

const API2 = "http://localhost:3001/api";
// const API2 = "https://elitmusbackend-6bsu.onrender.com";

// export const addGame = async (data) => {
//   try {
//     const res = await axios.post(`${API2}/add-games`, data);
//     if (res) {
//       return {
//         data: res.data,
//         status: res.status,
//         error: false,
//         message: "Game Added Successfully",
//       };
//     }
//   } catch (error) {
//     console.log(error, " error hai");
//     return {
//       data: null,
//       status: 500,
//       error: true,
//       message: error?.response?.data?.error || "Something went wrong",
//     };
//   }
// };

export const createPodcastInDatabase = async (data) => {
  try {
    const res = await axios.post(`${API2}/podcast/create-podcast`, data);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message:  res.status==200? "Podcast Added Successfully":"Something went wrong",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error ||error?.response?.data?.message || "Something went wrong",
    };
  }
};



// get-podcast-byuser/:id

export const getPodcastByUser = async (id) => {

  try {
    const res = await axios.get(`${API2}/podcast/get-podcast-byuser/${id}`);
    if (res) {
      return {
        data: res.data,
        status: res.status,
        error: false,
        message: res.status==200? "Podcast updated Successfully":"Something went wrong",
      };
    }
  } catch (error) {
    console.log(error, " error hai");
    return {
      data: null,
      status: 500,
      error: true,
      message: error?.response?.data?.error || "Something went wrong",
    };
  }
}
