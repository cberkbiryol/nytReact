import axios from "axios";

// retrieve News from the server
export default {
    // Fetch news based on the search input
    getNews: function ({topic, byear, eyear}) {
        const data = {
        params: {
            topic: topic,
            byear: byear,
            eyear: eyear
        }
    }
        return axios.get("/api/news/getnews",data);
    },
    // Create new saved news in the database
    saveNews: function (Data) {
        return axios.post("/api/news", Data);
    },
    // Get all saved news in the database
    getSaved: function () {
        return axios.get("/api/news");
    },
    // Update a saved news in the database
    updateSaved: function (id,Data) {
        return axios.put("/api/news/" + id,Data);
    },
    // Delete a saved news from database
    deleteSaved: function (id) {
        return axios.delete("/api/news/" + id);
    }

};