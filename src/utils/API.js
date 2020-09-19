import axios from "axios";

// Export an object containing methods we'll use for accessing the random user API
export default {
    fetchUsers () {
        return axios.get("https://randomuser.me/api?results=20").then((res) => {
            const users = res.data.results;
            return users.map((user) => {
                return {
                    image: user.picture.thumbnail,
                    name: `${user.name.first  } ${  user.name.last}`,
                    gender: user.gender,
                    email: user.email,
                    location: user.location.city + ", " + user.location.state,
                };
            });
        });
    },
};
